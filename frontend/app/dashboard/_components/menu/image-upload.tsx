'use client';

import { useState, type ChangeEvent } from 'react';
import { createUploadUrlAction } from '@/actions/menu';
// import { ui } from './ui'

const MAX_DIMENSION = 900;

/** Downscale in the browser so phones don't upload 5 MB photos and customers don't download them. */
async function toJpeg(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not process the image');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) =>
        b ? resolve(b) : reject(new Error('Could not process the image')),
      'image/jpeg',
      0.85,
    ),
  );
}

interface Props {
  shopId: string;
  initialKey?: string;
  initialUrl?: string | null;
}

/**
 * Browser -> S3 direct upload using a presigned POST. Renders a hidden `imageKey` input
 * that the surrounding ActionForm submits together with the rest of the item.
 */
export function ImageUpload({
  shopId,
  initialKey = '',
  initialUrl = null,
}: Props) {
  const [key, setKey] = useState(initialKey);
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/'))
      return setError('Please choose an image file');

    setBusy(true);
    setError('');
    try {
      const blob = await toJpeg(file);
      const { ticket, error: ticketError } = await createUploadUrlAction(
        shopId,
        'image/jpeg',
      );
      if (!ticket) throw new Error(ticketError ?? 'Could not start the upload');

      const body = new FormData();
      for (const [k, v] of Object.entries(ticket.fields)) body.append(k, v);
      body.append('file', blob); // must be the last field for S3 POST uploads
      const res = await fetch(ticket.url, { method: 'POST', body });
      if (!res.ok) throw new Error('Upload failed. Try a smaller image.');

      setKey(ticket.key);
      setPreview(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type='hidden' name='imageKey' value={key} readOnly />
      <span className='mb-1 block text-xs font-medium uppercase tracking-wide text-stone-500'>
        Photo
      </span>
      <div className='flex items-center gap-3'>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt=''
            className='h-16 w-16 rounded-lg object-cover'
          />
        ) : (
          <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-stone-100 text-xs text-stone-400'>
            none
          </div>
        )}
        <label
          className={`inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-2 py-1 text-sm font-medium hover:bg-stone-100 disabled:opacity-50 cursor-pointer`}
        >
          {busy ? 'Uploading…' : preview ? 'Change' : 'Upload'}
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={onChange}
            disabled={busy}
          />
        </label>
        {preview && !busy && (
          <button
            type='button'
            className='rounded-md border border-stone-300 bg-white px-2 py-1 text-xs font-medium hover:bg-stone-100 disabled:opacity-50'
            onClick={() => {
              setKey('');
              setPreview(null);
            }}
          >
            Remove
          </button>
        )}
      </div>
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
}
