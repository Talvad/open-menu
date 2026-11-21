import { getMe } from '@/lib/api';
import { redirect } from 'next/navigation';
import CreateShopForm from '../_components/home/create-shop-form';

type Props = {};

export default async function SettingsPage({}: Props) {
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
