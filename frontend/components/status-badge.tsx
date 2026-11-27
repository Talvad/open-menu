import { ShopStatus, STATUS_LABELS } from '@/lib/constants';

const COLORS: Record<ShopStatus, string> = {
  PENDING: 'bg-[#f8e6c6] text-[#815223]',
  APPROVED: 'bg-[#e2eadb] text-[#315842]',
  REJECTED: 'bg-[#f5dfd9] text-[#943f32]',
  SUSPENDED: 'bg-[#e9e5dd] text-[#57564e]',
};

export function StatusBadge({ status }: { status: ShopStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
