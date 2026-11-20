import { api } from '@/lib/api';
import Link from 'next/link';
import Button from './ui/button';

type Props = {
  loggedIn: boolean;
};
export async function AppNavbar({ loggedIn }: Props) {
  const me = await api('/me');
  console.log('ME', me);
  return (
    <nav className='flex items-center gap-5 text-sm ml-auto'>
      <Link
        href={'/signin'}
        className='px-1 py-3 font-medium text-foreground transition-opacity hover:opacity-80'
      >
        Sign in
      </Link>
      <Link href={loggedIn ? '/dashboard' : '/auth/login'}>
        <Button className='font-semibold'>
          {loggedIn ? 'Dashboard' : 'Create your shop'}
        </Button>
      </Link>
    </nav>
  );
}

export function AppNavbarSkeleton() {
  return <nav>Loading</nav>;
}
