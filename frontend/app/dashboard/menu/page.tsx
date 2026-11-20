import { getMe } from '@/lib/api';
import { redirect } from 'next/navigation';

export default async function OwnerMenuPage() {
  const { shop } = await getMe();
  if (!shop) redirect('/dashboard');
  return (
    <section>
      <h2>Owner Menu</h2>
    </section>
  );
}
