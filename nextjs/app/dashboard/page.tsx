import Link from 'next/link';
import { ResubmitButton } from '@/components/ResubmitButton';
import { ShopForm } from '@/components/ShopForm';
import { StatusBadge } from '@/components/StatusBadge';
import { ui } from '@/components/ui';
import { getMe } from '@/lib/api';
import { env } from '@/lib/env';

export default async function DashboardHome() {
  const { shop } = await getMe();

  // Step 1: no shop yet -> create one.
  if (!shop) {
    return (
      <div className='max-w-xl'>
        <h1 className='text-2xl font-bold'>Create your shop</h1>
        <p className='mt-1 text-stone-600'>
          Tell us about your shop. An administrator reviews new shops before the
          public menu goes live.
        </p>
        <div className={`${ui.card} mt-6`}>
          <ShopForm />
        </div>
      </div>
    );
  }

  const publicUrl = `${env.appUrl}/${shop.slug}`;

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center gap-3'>
        <h1 className='text-2xl font-bold'>{shop.name}</h1>
        <StatusBadge status={shop.status} />
      </div>

      {shop.status === 'PENDING' && (
        <p className='rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
          Your shop is waiting for approval. You can already add groups and
          items; the public menu goes live once an administrator approves it.
        </p>
      )}
      {shop.status === 'REJECTED' && (
        <div className='space-y-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900'>
          <p>
            Your shop was not approved
            {shop.statusReason ? `: ${shop.statusReason}` : '.'} Update your
            details, then submit it again.
          </p>
          <ResubmitButton shopId={shop.id} />
        </div>
      )}
      {shop.status === 'SUSPENDED' && (
        <p className='rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-sm'>
          Your shop is suspended
          {shop.statusReason ? `: ${shop.statusReason}` : '.'} Please contact
          support.
        </p>
      )}

      {shop.status === 'APPROVED' && (
        <div className={ui.card}>
          <p className='text-sm text-stone-500'>Your public menu</p>
          <Link
            href={`/${shop.slug}`}
            className='break-all font-medium text-amber-700 underline'
          >
            {publicUrl}
          </Link>
          <p className='mt-2 text-xs text-stone-500'>
            Share this link or turn it into a QR code for your tables and
            counter.
          </p>
        </div>
      )}

      <div className='grid gap-4 sm:grid-cols-2'>
        <Link
          href='/dashboard/menu'
          className={`${ui.card} hover:border-amber-400`}
        >
          <h2 className='font-semibold'>Manage menu →</h2>
          <p className='mt-1 text-sm text-stone-600'>
            Groups, items, prices, photos and availability.
          </p>
        </Link>
        <Link
          href='/dashboard/settings'
          className={`${ui.card} hover:border-amber-400`}
        >
          <h2 className='font-semibold'>Shop details →</h2>
          <p className='mt-1 text-sm text-stone-600'>
            Name, contact, WhatsApp number and currency.
          </p>
        </Link>
      </div>
    </div>
  );
}
