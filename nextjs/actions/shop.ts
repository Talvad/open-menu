'use server'

import { redirect } from 'next/navigation'
import { api } from '@/lib/api'
import { requireOwner } from '@/lib/auth/session'
import type { ActionState } from './types'
import { bustShopCache, fail, str } from './util'

/** Create (no shopId) or update (shopId) the owner's shop details. */
export async function saveShopAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireOwner()
  const shopId = str(fd, 'shopId')
  const body = {
    name: str(fd, 'name'),
    type: str(fd, 'type'),
    description: str(fd, 'description'),
    phone: str(fd, 'phone'),
    whatsapp: str(fd, 'whatsapp').replace(/[\s+\-()]/g, ''),
    address: str(fd, 'address'),
    currency: str(fd, 'currency'),
  }

  if (shopId) {
    try {
      await api(`/shops/${shopId}`, { method: 'PUT', body })
      await bustShopCache(shopId)
      return { ok: true, message: 'Saved' }
    } catch (e) {
      return fail(e)
    }
  }

  try {
    await api('/shops', { method: 'POST', body: { ...body, slug: str(fd, 'slug').toLowerCase() } })
  } catch (e) {
    return fail(e)
  }
  redirect('/dashboard') // outside try/catch: redirect() works by throwing
}

/** A rejected shop goes back to the admin queue. */
export async function resubmitShopAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  await requireOwner()
  const shopId = str(fd, 'shopId')
  try {
    await api(`/shops/${shopId}/submit`, { method: 'POST' })
    await bustShopCache(shopId)
    return { ok: true, message: 'Submitted for review' }
  } catch (e) {
    return fail(e)
  }
}
