import { getMe } from '@/lib/api';
import { redirect } from 'next/navigation';

type Props = {};

export default async function SettingsPage({}: Props) {
  const { shop } = await getMe();
  if (!shop) redirect('/dashboard');
  return (
    <section>
      <h1>Settings Page</h1>
    </section>
  );
}
