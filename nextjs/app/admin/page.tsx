import Link from 'next/link'
import { SHOP_STATUSES, TYPE_LABELS } from '@open-menu/shared'
import { StatusBadge } from '@/components/StatusBadge'
import { ui } from '@/components/ui'
import { getAdminShops } from '@/lib/api'
import { formatDate } from '@/lib/format'

const FILTERS = ['PENDING', ...SHOP_STATUSES.filter((s) => s !== 'PENDING'), 'ALL'] as const

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const raw = (await searchParams).status?.toUpperCase() ?? 'PENDING'
  const status = (FILTERS as readonly string[]).includes(raw) ? raw : 'PENDING'
  const { shops } = await getAdminShops(status)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shops</h1>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={`/admin?status=${f}`}
            className={f === status ? ui.btnPrimary : ui.btn}
            aria-current={f === status ? 'page' : undefined}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      {shops.length === 0 ? (
        <p className="text-stone-500">No shops with this status.</p>
      ) : (
        <ul className="space-y-3">
          {shops.map((shop) => (
            <li key={shop.id}>
              <Link href={`/admin/shops/${shop.id}`} className={`${ui.card} flex flex-wrap items-center gap-3 hover:border-amber-400`}>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{shop.name}</p>
                  <p className="truncate text-sm text-stone-500">
                    /{shop.slug} · {TYPE_LABELS[shop.type]} · {shop.ownerEmail}
                  </p>
                  <p className="text-xs text-stone-400">Created {formatDate(shop.createdAt)}</p>
                </div>
                <StatusBadge status={shop.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
