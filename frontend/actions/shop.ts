'use server';

import { api } from '@/lib/api';
import { shopCreateSchema, shopUpdateSchema } from './schema';
import { bustShopCache, fail, FormState, parse, str } from './util';
import { requireOwner } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export async function saveShopAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireOwner();
  const shopId = str(formData, 'shopId');
  if (shopId) {
    const parsed = parse(shopUpdateSchema, formData);
    if (!parsed.ok) return parsed.state;
    const body = parsed.data;
    try {
      await api(`/shops/${shopId}`, { method: 'PUT', body });
    } catch (error) {
      return fail(error);
    }
  } else {
    const parsed = parse(shopCreateSchema, formData, [
      'name',
      'slug',
      'type',
      'description',
      'phone',
      'whatsapp',
      'address',
      'currency',
      'timeZone',
    ]);
    if (!parsed.ok) return parsed.state;
    const body = parsed.data;
    try {
      await api('/shops', { method: 'POST', body });
    } catch (error) {
      return fail(error);
    }
  }
  redirect('/dashboard');
}

/** A rejected shop goes back to the admin queue. */
export async function resubmitShopAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireOwner();
  const shopId = str(fd, 'shopId');
  try {
    await api(`/shops/${shopId}/submit`, { method: 'POST' });
    await bustShopCache(shopId);
    return { message: 'Submitted for review' };
  } catch (e) {
    return fail(e);
  }
}
