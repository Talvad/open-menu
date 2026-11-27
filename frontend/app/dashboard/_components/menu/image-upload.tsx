'use client';

import { ImagePlus, LoaderCircle, X } from 'lucide-react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { createUploadUrlAction } from '@/actions/menu';

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

  useEffect(() => {
    if (!preview?.startsWith('blob:')) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

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
    <div className='space-y-2'>
      <input type='hidden' name='imageKey' value={key} readOnly />
      <p className='text-xs font-semibold uppercase tracking-wide text-stone-500'>
        Photo
      </p>
      <div className='flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm'>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt='Selected menu item'
            className='h-16 w-16 shrink-0 rounded-lg border border-stone-200 object-cover'
          />
        ) : (
          <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 text-stone-400'>
            <ImagePlus aria-hidden='true' className='h-6 w-6' />
          </div>
        )}
        <div className='min-w-28 flex-1'>
          <p className='text-sm font-medium text-stone-800'>
            {preview ? 'Photo selected' : 'Add a menu photo'}
          </p>
          <p
            className='mt-0.5 text-xs text-stone-500'
            aria-live='polite'
            aria-atomic='true'
          >
            {busy ? 'Uploading…' : 'Choose an image from your device'}
          </p>
        </div>
        <label
          className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
            busy ? 'cursor-wait opacity-60' : ''
          }`}
          aria-disabled={busy}
        >
          {busy ? (
            <LoaderCircle aria-hidden='true' className='h-4 w-4 animate-spin' />
          ) : (
            <ImagePlus aria-hidden='true' className='h-4 w-4' />
          )}
          {busy ? 'Uploading…' : preview ? 'Change' : 'Upload'}
          <input
            type='file'
            accept='image/*'
            className='sr-only'
            onChange={onChange}
            disabled={busy}
            aria-label={preview ? 'Change item photo' : 'Upload item photo'}
            aria-describedby={error ? 'image-upload-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </label>
        {preview && !busy && (
          <button
            type='button'
            aria-label='Remove item photo'
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            onClick={() => {
              setKey('');
              setPreview(null);
            }}
          >
            <X aria-hidden='true' className='h-4 w-4' />
          </button>
        )}
      </div>
      {error && (
        <p id='image-upload-error' role='alert' className='text-sm text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}
