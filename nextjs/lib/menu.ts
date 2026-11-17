import { cacheLife, cacheTag } from 'next/cache'
import type { PublicMenu } from '@open-menu/shared'

/**
 * Public menu for /[slug]. This is the hot path, so it is cached ('use cache', Cache Components):
 *  - the page's static shell is prerendered (PPR) and the menu streams in from this cache
 *  - dashboard mutations call updateTag(`shop:${slug}`), so owners see their edits immediately
 *  - cacheLife('hours') is a safety net if an invalidation is ever missed
 *
 * No cookies/headers here on purpose: this cache is shared between all visitors.
 */
export async function getPublicMenu(slug: string): Promise<PublicMenu | null> {
  'use cache'
  cacheTag(`shop:${slug}`)
  cacheLife('hours')

  const base = process.env.API_URL?.replace(/\/$/, '')
  if (!base) throw new Error('Missing environment variable API_URL')

  const res = await fetch(`${base}/public/shops/${encodeURIComponent(slug)}`)
  if (res.status === 404) {
    cacheLife('minutes') // misses (typos, not-yet-approved shops) should not stay cached for hours
    return null
  }
  if (!res.ok) throw new Error(`Menu API responded with ${res.status}`) // errors are not cached
  return (await res.json()) as PublicMenu
}
