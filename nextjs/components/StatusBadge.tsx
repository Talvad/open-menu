import { STATUS_LABELS, type ShopStatus } from '@open-menu/shared'

const COLORS: Record<ShopStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  SUSPENDED: 'bg-stone-200 text-stone-700',
}

export function StatusBadge({ status }: { status: ShopStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}
