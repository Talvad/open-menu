import Link from 'next/link';
import Button from './ui/button';
import { getSession } from '@/lib/auth/session';

export async function AppNavbar() {
  const session = await getSession();
  return (
    <nav className='flex items-center gap-5 text-sm ml-auto'>
      {!session && (
        <Link
          href={'/auth/login'}
          className='px-1 py-3 font-medium text-foreground transition-opacity hover:opacity-80'
        >
          Sign in
        </Link>
      )}
      <Link href={'/dashboard'}>
        <Button className='font-semibold'>
          {session ? 'Dashboard' : 'Create your shop'}
        </Button>
      </Link>
    </nav>
  );
}

export function AppNavbarSkeleton() {
  return (
    <nav>
      <Button className='font-semibold'>Loading...</Button>
    </nav>
  );
}
