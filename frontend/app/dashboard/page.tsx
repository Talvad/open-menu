import { getMe } from '@/lib/api';
import CreateShop from './_components/home/create-shop';

export default async function DashboardPage() {
  const { shop } = await getMe();
  if (!shop) {
    return <CreateShop />;
  }
  return (
    <main>
      <h1>Dashboard Page</h1>
    </main>
  );
}
