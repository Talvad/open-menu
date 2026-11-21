import { getMe, getShopMenu } from '@/lib/api';
import { redirect } from 'next/navigation';
import MenuManager from '../_components/menu/menu-manager';

export default async function OwnerMenuPage() {
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
