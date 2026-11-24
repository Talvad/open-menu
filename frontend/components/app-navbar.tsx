import Link from 'next/link';
import Button from './ui/button';
import { getSession, Session } from '@/lib/auth/session';
import {
  DropdownItem,
  DropdownMenu,
  DropdownRoot,
  DropdownTrigger,
} from './ui/dropdown';
import { cn } from '@/lib/utils';

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
      {session && <DashboardLinks session={session} />}
      {/* <Link href={'/dashboard'}>
        <Button className='font-semibold'>
          {session ? 'Dashboard' : 'Create your shop'}
        </Button>
      </Link> */}
    </nav>
  );
}

function DashboardLinks({ session }: { session: Session }) {
  return (
    <DropdownRoot>
      <DropdownTrigger>
        <div
          className={cn(
            'inline-flex select-none items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition',
            'hover:bg-gray-50 data-popup-open:bg-gray-100',
            'focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:data-popup-open:bg-gray-800',
          )}
        >
          {session.email.charAt(0)}
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem href='/dashboard'>Dashboard</DropdownItem>
        <DropdownItem className='p-0!'>
          <button className='bg-red-400 w-full'>Logout</button>
        </DropdownItem>
      </DropdownMenu>
    </DropdownRoot>
  );
}

export function AppNavbarSkeleton() {
  return (
    <nav>
      <Button className='font-semibold'>Loading...</Button>
    </nav>
  );
}
