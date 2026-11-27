import Link from 'next/link';
import { notFound } from 'next/navigation';

import { StatusBadge } from '@/components/status-badge';
import { ApiError, getAudit, getShopMenu } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { TYPE_LABELS } from '@/lib/constants';
import MenuManager from '@/app/dashboard/_components/menu/menu-manager';
import { StatusActions } from '@/components/status-actions';
import { Suspense } from 'react';
import { ShopLogo } from '@/components/shop-logo';

export default function AdminShopPage({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) {
  return (
    <Suspense fallback={<AdminShopFallback />}>
      <AdminShopContent params={params} />
    </Suspense>
  );
}

async function AdminShopContent({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) {
  const { shopId } = await params;

  let menu, audit;
  try {
    [menu, audit] = await Promise.all([getShopMenu(shopId), getAudit(shopId)]);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }
  const { shop } = menu;

  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <Link
        href='/admin'
        className='inline-flex items-center gap-2 text-sm font-semibold text-[#716e63] transition-colors hover:text-primary'
      >
        <span aria-hidden='true'>←</span> Back to review queue
      </Link>

      <section className='overflow-hidden rounded-[1.75rem] border border-[#e6ddd0] bg-paper shadow-[0_12px_34px_rgba(47,54,43,0.05)]'>
        <div className='bg-forest px-5 py-6 text-paper sm:px-8 sm:py-8'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#efb08c]'>
            Shop profile
          </p>
          <div className='mt-2 flex flex-wrap items-center gap-3'>
            <ShopLogo
              name={shop.name}
              logoUrl={shop.logoUrl}
              size='lg'
              className='border-white/20'
            />
            <h1 className='font-bricolage text-3xl font-bold tracking-[-0.05em] sm:text-4xl'>
              {shop.name}
            </h1>
            <StatusBadge status={shop.status} />
          </div>
        </div>
        <div className='space-y-6 p-5 sm:p-8'>
          <dl className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            <Detail label='Owner' value={shop.ownerEmail} />
            <Detail label='Business type' value={TYPE_LABELS[shop.type]} />
            <Detail label='Menu address' value={`/${shop.slug}`} />
            <Detail label='Currency' value={shop.currency} />
            <Detail label='Phone' value={shop.phone} />
            <Detail label='WhatsApp' value={shop.whatsapp} />
            <Detail label='Address' value={shop.address} />
            <Detail label='Joined' value={formatDate(shop.createdAt)} />
            {shop.statusReason && (
              <Detail label='Review note' value={shop.statusReason} />
            )}
          </dl>
          {shop.description && (
            <p className='max-w-3xl border-t border-[#eee7dc] pt-5 text-sm leading-6 text-[#626258]'>
              {shop.description}
            </p>
          )}
          <div className='flex flex-wrap items-center justify-between gap-4 border-t border-[#eee7dc] pt-5'>
            {shop.status === 'APPROVED' ? (
              <Link
                href={`/${shop.slug}`}
                className='text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary'
              >
                Preview public menu ↗
              </Link>
            ) : (
              <span className='text-xs text-[#898477]'>
                Review changes are recorded in the shop history.
              </span>
            )}
            <StatusActions shop={shop} />
          </div>
        </div>
      </section>

      <section className='space-y-4'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
            Menu editor
          </p>
          <h2 className='mt-1 font-bricolage text-2xl font-bold tracking-[-0.04em] text-forest'>
            The shop’s menu
          </h2>
          <p className='mt-1 text-sm text-[#716e63]'>
            Changes made here are recorded in the activity log below.
          </p>
        </div>
        <MenuManager menu={menu} />
      </section>

      <section className='space-y-4'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
            Shop history
          </p>
          <h2 className='mt-1 font-bricolage text-2xl font-bold tracking-[-0.04em] text-forest'>
            Activity log
          </h2>
        </div>
        {audit.entries.length === 0 ? (
          <p className='rounded-2xl border border-dashed border-[#d9d0c3] bg-paper px-5 py-8 text-sm text-[#716e63]'>
            No activity has been recorded yet.
          </p>
        ) : (
          <ul
            className='divide-y divide-[#eee7dc] rounded-2xl border border-[#e6ddd0] bg-paper px-5 text-sm sm:px-6'
          >
            {audit.entries.map((e) => (
              <li
                key={e.id}
                className='flex flex-wrap gap-x-3 gap-y-1 py-4'
              >
                <span className='w-40 shrink-0 text-xs text-[#898477]'>
                  {formatDate(e.at)}
                </span>
                <span className='font-medium'>
                  {e.actorRole === 'admin' ? 'Admin' : 'Owner'}
                </span>
                <span className='text-[#716e63]'>{e.actorEmail}</span>
                <span className='basis-full text-foreground sm:basis-auto'>
                  {e.summary}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AdminShopFallback() {
  return (
    <div className='mx-auto max-w-5xl space-y-4' role='status'>
      <p className='text-sm text-[#716e63]'>Opening the shop file…</p>
      <div aria-hidden='true' className='h-32 animate-pulse rounded-[1.75rem] bg-[#e9e2d6]' />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-[10px] font-semibold uppercase tracking-[0.14em] text-[#898477]'>
        {label}
      </dt>
      <dd className='mt-1 break-words text-sm font-medium text-foreground'>{value || '—'}</dd>
    </div>
  );
}
