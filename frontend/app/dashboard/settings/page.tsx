import { getMe } from '@/lib/api';
import { redirect } from 'next/navigation';
import CreateShopForm from '../_components/home/create-shop-form';
import { Suspense } from 'react';

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsFallback />}>
      <SettingsContent />
    </Suspense>
  );
}

async function SettingsContent() {
  const { shop } = await getMe();
  if (!shop) redirect('/dashboard');
  return (
    <section className='mx-auto max-w-5xl'>
      <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
        The details behind the menu
      </p>
      <h1 className='mt-2 font-bricolage text-3xl font-bold tracking-[-0.05em] text-forest'>
        Shop details
      </h1>
      <p className='mt-2 text-sm text-[#716e63]'>
        Your menu lives at <span className='font-semibold text-forest'>/{shop.slug}</span>
      </p>
      <div className='mt-6'>
        <CreateShopForm shop={shop} />
      </div>
    </section>
  );
}

function SettingsFallback() {
  return (
    <section className='space-y-3' role='status'>
      <p className='font-bricolage text-2xl font-bold text-forest'>Loading your shop details…</p>
      <div aria-hidden='true' className='h-24 animate-pulse rounded-2xl bg-[#e9e2d6]' />
    </section>
  );
}
