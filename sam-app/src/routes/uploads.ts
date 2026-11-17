import { randomUUID } from 'node:crypto';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

import { requireShop } from '../lib/auth';
import { ok, parseBody } from '../lib/http';
import { pathParam, type Handler } from './types';
import { uploadSchema } from '../lib/schemas';
import { IMAGE_TYPES, LIMITS } from '../lib/constants';
import { UploadTicket } from '../lib/types';

const s3 = new S3Client({});

/**
 * POST /shops/{shopId}/upload-url
 * Returns a presigned POST. S3 itself enforces the size limit and content type,
 * and the key is pinned to this shop's prefix.
 */
export const createUploadUrl: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  await requireShop(auth, shopId, { write: true });
  const { contentType } = parseBody(event, uploadSchema);

  const key = `shops/${shopId}/${randomUUID()}.${IMAGE_TYPES[contentType]}`;
  const post = await createPresignedPost(s3, {
    Bucket: process.env.MEDIA_BUCKET as string,
    Key: key,
    Conditions: [
      ['content-length-range', 1, LIMITS.maxImageBytes],
      ['eq', '$Content-Type', contentType],
    ],
    Fields: { 'Content-Type': contentType },
    Expires: 300,
  });

  const ticket: UploadTicket = { url: post.url, fields: post.fields, key };
  return ok(ticket);
};
