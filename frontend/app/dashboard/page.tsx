import { getMe } from '@/lib/api';
import CreateShop from './_components/home/create-shop';
import OwnerOverview from './_components/home/overview';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const { shop } = await getMe();
  if (!shop) {
    return <CreateShop />;
  }
  return <OwnerOverview shop={shop} />;
}

function DashboardFallback() {
  return (
    <section className='space-y-3' role='status'>
      <p className='text-sm text-[#716e63]'>Getting your shop ready…</p>
      <div aria-hidden='true' className='h-24 animate-pulse rounded-2xl bg-[#e9e2d6]' />
    </section>
  );
}
