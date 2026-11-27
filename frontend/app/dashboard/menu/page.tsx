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
    <section className='space-y-4'>
      <h2 className='font-bricolage text-2xl font-bold'>Menu</h2>
      <MenuManager menu={menu} />
    </section>
  );
}

function MenuFallback() {
  return (
    <section className='space-y-4' role='status'>
      <p className='font-bricolage text-2xl font-bold'>Menu</p>
      <div aria-hidden='true' className='h-24 animate-pulse rounded-xl bg-stone-200' />
    </section>
  );
}
