import Link from 'next/link';
import { notFound } from 'next/navigation';

import { StatusBadge } from '@/components/status-badge';
import { ApiError, getAudit, getShopMenu } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { TYPE_LABELS } from '@/lib/constants';
import MenuManager from '@/app/dashboard/_components/menu/menu-manager';
import { StatusActions } from '@/components/status-actions';

export default async function AdminShopPage({
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
    <div className='space-y-8'>
      <Link
        href='/admin'
        className='text-sm text-stone-500 hover:text-stone-800'
      >
        ← All shops
      </Link>

      <section
        className={`rounded-xl border border-stone-200 bg-white p-4 shadow-sm space-y-4`}
      >
        <div className='flex flex-wrap items-center gap-3'>
          <h1 className='text-2xl font-bold'>{shop.name}</h1>
          <StatusBadge status={shop.status} />
        </div>
        <dl className='grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2'>
          <Detail label='Owner' value={shop.ownerEmail} />
          <Detail label='Type' value={TYPE_LABELS[shop.type]} />
          <Detail label='Web address' value={`/${shop.slug}`} />
          <Detail label='Currency' value={shop.currency} />
          <Detail label='Phone' value={shop.phone} />
          <Detail label='WhatsApp' value={shop.whatsapp} />
          <Detail label='Address' value={shop.address} />
          <Detail label='Created' value={formatDate(shop.createdAt)} />
          {shop.statusReason && (
            <Detail label='Status note' value={shop.statusReason} />
          )}
        </dl>
        {shop.description && (
          <p className='text-sm text-stone-600'>{shop.description}</p>
        )}
        {shop.status === 'APPROVED' && (
          <Link
            href={`/${shop.slug}`}
            className='inline-block text-sm text-amber-700 underline'
          >
            Open public menu
          </Link>
        )}
        <StatusActions shop={shop} />
      </section>

      <section className='space-y-4'>
        <div>
          <h2 className='text-xl font-bold'>Menu (editing as admin)</h2>
          <p className='text-sm text-stone-500'>
            Every change you make here is recorded in the audit log below.
          </p>
        </div>
        <MenuManager menu={menu} />
      </section>

      <section className='space-y-3'>
        <h2 className='text-xl font-bold'>Audit log</h2>
        {audit.entries.length === 0 ? (
          <p className='text-sm text-stone-500'>No activity yet.</p>
        ) : (
          <ul
            className={`rounded-xl border border-stone-200 bg-white p-4 shadow-sm divide-y divide-stone-100 text-sm`}
          >
            {audit.entries.map((e) => (
              <li
                key={e.id}
                className='flex flex-wrap gap-x-3 gap-y-0.5 py-2 first:pt-0 last:pb-0'
              >
                <span className='w-40 shrink-0 text-stone-400'>
                  {formatDate(e.at)}
                </span>
                <span className='font-medium'>
                  {e.actorRole === 'admin' ? 'Admin' : 'Owner'}
                </span>
                <span className='text-stone-500'>{e.actorEmail}</span>
                <span className='basis-full text-stone-700 sm:basis-auto'>
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-xs uppercase tracking-wide text-stone-400'>
        {label}
      </dt>
      <dd>{value || '-'}</dd>
    </div>
  );
}
