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
    <section>
      <h1 className='text-2xl font-bold'>Shop details</h1>
      <p className='mt-1 text-sm text-stone-500'>
        Web address: <span className='font-mono'>/{shop.slug}</span>
      </p>
      <CreateShopForm shop={shop} />
    </section>
  );
}

function SettingsFallback() {
  return (
    <section className='space-y-3' role='status'>
      <p className='text-2xl font-bold'>Shop details</p>
      <div aria-hidden='true' className='h-24 animate-pulse rounded-xl bg-stone-200' />
    </section>
  );
}
