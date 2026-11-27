import Link from 'next/link';
import { SHOP_STATUSES, TYPE_LABELS } from '@/lib/constants';
import { StatusBadge } from '@/components/status-badge';
import { getAdminShops } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Suspense } from 'react';
import { ShopLogo } from '@/components/shop-logo';

const FILTERS = [
  'PENDING',
  ...SHOP_STATUSES.filter((s) => s !== 'PENDING'),
  'ALL',
] as const;

export default function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  return (
    <Suspense fallback={<div className='text-sm text-[#716e63]'>Opening the review desk…</div>}>
      <AdminHome searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const raw = (await searchParams).status?.toUpperCase() ?? 'PENDING';
  const status = (FILTERS as readonly string[]).includes(raw) ? raw : 'PENDING';
  const { shops } = await getAdminShops(status);
  const filterLabel = (filter: string) => {
    if (filter === 'ALL') return 'All shops';
    if (filter === 'PENDING') return 'Needs review';
    return filter.charAt(0) + filter.slice(1).toLowerCase();
  };

  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <header className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
            Operations desk
          </p>
          <h1 className='mt-2 font-bricolage text-4xl font-bold tracking-[-0.06em] text-forest'>
            Shop review
          </h1>
          <p className='mt-2 text-sm text-[#716e63]'>
            Review submissions and keep the marketplace in good shape.
          </p>
        </div>
        <p className='rounded-full bg-[#e5eadf] px-4 py-2 text-xs font-semibold text-forest'>
          {shops.length} {shops.length === 1 ? 'shop' : 'shops'} in this view
        </p>
      </header>

      <nav aria-label='Filter shops' className='flex flex-wrap gap-2'>
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={`/admin?status=${f}`}
            className={
              f === status
                ? 'inline-flex items-center justify-center rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e]'
                : 'inline-flex items-center justify-center rounded-full border border-[#d9d0c3] bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#eee8dd]'
            }
            aria-current={f === status ? 'page' : undefined}
          >
            {filterLabel(f)}
          </Link>
        ))}
      </nav>

      {shops.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-[#d9d0c3] bg-paper px-6 py-12 text-center'>
          <h2 className='font-bricolage text-xl font-bold text-forest'>
            Nothing in this pile.
          </h2>
          <p className='mt-2 text-sm text-[#716e63]'>
            No shops match this filter right now.
          </p>
        </div>
      ) : (
        <ul className='divide-y divide-[#e6ddd0] overflow-hidden rounded-2xl border border-[#e6ddd0] bg-paper'>
          {shops.map((shop) => (
            <li key={shop.id}>
              <Link
                href={`/admin/shops/${shop.id}`}
                className='group flex flex-wrap items-center gap-4 px-4 py-4 transition-colors hover:bg-white sm:px-6'
              >
                <div className='flex min-w-0 flex-1 items-start gap-4'>
                  <ShopLogo
                    name={shop.name}
                    logoUrl={shop.logoUrl}
                    size='sm'
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='font-bricolage text-lg font-bold tracking-[-0.03em] text-forest'>
                      {shop.name}
                    </p>
                    <p className='truncate text-sm text-[#716e63]'>
                    /{shop.slug} · {TYPE_LABELS[shop.type]} · {shop.ownerEmail}
                    </p>
                    <p className='mt-1 text-[11px] text-[#898477]'>
                      Joined {formatDate(shop.createdAt)}
                    </p>
                  </div>
                </div>
                <StatusBadge status={shop.status} />
                <span className='hidden text-xs font-semibold text-primary group-hover:inline'>
                  Open file →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
