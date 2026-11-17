'use server'

// Used by both the owner dashboard and the admin "edit as owner" screen.
// Authorization is NOT decided here: the API checks the token against shop ownership / admin role.

import type { UploadTicket } from '@open-menu/shared'
import { api } from '@/lib/api'
import { requireSession } from '@/lib/auth/session'
import type { ActionState } from './types'
import { attributesFrom, bool, bustShopCache, fail, int, str, tagsFrom } from './util'

/* ------------------------------ groups ------------------------------ */

export async function saveGroupAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireSession()
  const shopId = str(fd, 'shopId')
  const groupId = str(fd, 'groupId')
  const body = { name: str(fd, 'name'), sortOrder: int(fd, 'sortOrder'), visible: bool(fd, 'visible') }
  try {
    if (groupId) await api(`/shops/${shopId}/groups/${groupId}`, { method: 'PUT', body })
    else await api(`/shops/${shopId}/groups`, { method: 'POST', body })
    await bustShopCache(shopId)
    return { ok: true, message: 'Saved' }
  } catch (e) {
    return fail(e)
  }
}

export async function deleteGroupAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireSession()
  const shopId = str(fd, 'shopId')
  try {
    await api(`/shops/${shopId}/groups/${str(fd, 'groupId')}`, { method: 'DELETE' })
    await bustShopCache(shopId)
    return { ok: true }
  } catch (e) {
    return fail(e)
  }
}

/* ------------------------------ items ------------------------------- */

export async function saveItemAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireSession()
  const shopId = str(fd, 'shopId')
  const itemId = str(fd, 'itemId')
  const price = Number(str(fd, 'price') || '0')
  if (!Number.isFinite(price)) return { error: 'Enter a valid price' }

  const body = {
    groupId: str(fd, 'groupId'),
    name: str(fd, 'name'),
    description: str(fd, 'description'),
    price,
    imageKey: str(fd, 'imageKey'),
    available: bool(fd, 'available'),
    visible: bool(fd, 'visible'),
    sortOrder: int(fd, 'sortOrder'),
    tags: tagsFrom(fd, 'tags'),
    attributes: attributesFrom(fd, 'attributes'),
  }
  try {
    if (itemId) await api(`/shops/${shopId}/items/${itemId}`, { method: 'PUT', body })
    else await api(`/shops/${shopId}/items`, { method: 'POST', body })
    await bustShopCache(shopId)
    return { ok: true, message: 'Saved' }
  } catch (e) {
    return fail(e)
  }
}

/** One-click toggles on the item row: field = "available" | "visible". */
export async function toggleItemAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireSession()
  const shopId = str(fd, 'shopId')
  const field = str(fd, 'field')
  if (field !== 'available' && field !== 'visible') return { error: 'Invalid field' }
  try {
    await api(`/shops/${shopId}/items/${str(fd, 'itemId')}`, {
      method: 'PUT',
      body: { [field]: str(fd, 'value') === 'true' },
    })
    await bustShopCache(shopId)
    return { ok: true }
  } catch (e) {
    return fail(e)
  }
}

export async function deleteItemAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireSession()
  const shopId = str(fd, 'shopId')
  try {
    await api(`/shops/${shopId}/items/${str(fd, 'itemId')}`, { method: 'DELETE' })
    await bustShopCache(shopId)
    return { ok: true }
  } catch (e) {
    return fail(e)
  }
}

/* ------------------------------ images ------------------------------ */

/** Called from the browser (ImageUpload) to get a presigned S3 POST. */
export async function createUploadUrlAction(
  shopId: string,
  contentType: string,
): Promise<{ ticket?: UploadTicket; error?: string }> {
  await requireSession()
  try {
    const ticket = await api<UploadTicket>(`/shops/${shopId}/upload-url`, {
      method: 'POST',
      body: { contentType },
    })
    return { ticket }
  } catch (e) {
    return { error: fail(e).error }
  }
}
