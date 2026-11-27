import { getMe, getShopMenu } from '@/lib/api';
import { redirect } from 'next/navigation';
import MenuManager from '../_components/menu/menu-manager';
import { Suspense } from 'react';

export default function OwnerMenuPage() {
  return (
    <Suspense fallback={<MenuFallback />}>
      <OwnerMenu />
    </Suspense>
  );
}

async function OwnerMenu() {
  const { shop } = await getMe();
  if (!shop) redirect('/dashboard');
  const menu = await getShopMenu(shop.id);
  return (
    <section className='mx-auto max-w-5xl space-y-5'>
      <header>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
          Make it yours
        </p>
        <h1 className='mt-1 font-bricolage text-3xl font-bold tracking-[-0.05em] text-forest'>
          Menu studio
        </h1>
        <p className='mt-2 text-sm text-[#716e63]'>
          Add the details that help people find their next favourite.
        </p>
      </header>
      <MenuManager menu={menu} />
    </section>
  );
}

function MenuFallback() {
  return (
    <section className='space-y-4' role='status'>
      <p className='font-bricolage text-2xl font-bold text-forest'>Getting your menu ready…</p>
      <div aria-hidden='true' className='h-24 animate-pulse rounded-2xl bg-[#e9e2d6]' />
    </section>
  );
}
