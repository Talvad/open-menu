import 'server-only'
import { refresh, updateTag } from 'next/cache'
import type { Shop } from '@/lib/types'
import { api, ApiError } from '@/lib/api'
import type { ActionState } from './types'

export const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()
export const bool = (fd: FormData, key: string) => fd.get(key) === 'on'
export const int = (fd: FormData, key: string, fallback = 0) => {
  const n = Number.parseInt(str(fd, key), 10)
  return Number.isFinite(n) ? n : fallback
}

export const tagsFrom = (fd: FormData, key: string) =>
  str(fd, key)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

/** "Material: Teak" lines -> { Material: 'Teak' } */
export function attributesFrom(fd: FormData, key: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of String(fd.get(key) ?? '').split('\n')) {
    const idx = line.indexOf(':')
    if (idx < 1) continue
    const k = line.slice(0, idx).trim()
    const v = line.slice(idx + 1).trim()
    if (k && v) out[k] = v
  }
  return out
}

export function fail(e: unknown): ActionState {
  if (e instanceof ApiError) return { error: e.message }
  console.error(e)
  return { error: 'Something went wrong. Please try again.' }
}

/**
 * Invalidate the cached public menu of a shop (read-your-own-writes).
 * Call from Server Actions only: updateTag is not available elsewhere.
 */
export async function bustShopCache(shopId: string) {
  try {
    const { shop } = await api<{ shop: Shop }>(`/shops/${shopId}`)
    updateTag(`shop:${shop.slug}`)
  } catch (e) {
    console.error('Cache invalidation failed', e)
  }
  refresh() // re-render the dashboard/admin page the user is on so they see the change
}
