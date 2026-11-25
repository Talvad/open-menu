'use server';

import { api } from '@/lib/api';
import { requireAdmin } from '@/lib/auth/session';

import { bustShopCache, fail, FormState, str } from './util';

/** Approve / reject / suspend / reopen a shop. The API re-checks the admin role. */
export async function setStatusAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const shopId = str(fd, 'shopId');
  try {
    await api(`/admin/shops/${shopId}/status`, {
      method: 'POST',
      body: { status: str(fd, 'status'), reason: str(fd, 'reason') },
    });
    await bustShopCache(shopId); // approval makes /{slug} public; suspension hides it
    return { message: 'Status updated' };
  } catch (e) {
    return fail(e);
  }
}
