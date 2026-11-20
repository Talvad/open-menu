import { getMe } from '@/lib/api';
import CreateShop from './_components/home/create-shop';
import OwnerOverview from './_components/home/overview';

export default async function DashboardPage() {
  const { shop } = await getMe();
  if (!shop) {
    return <CreateShop />;
  }
  return <OwnerOverview />;
}
