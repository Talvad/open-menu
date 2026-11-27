import Link from 'next/link';
import { connection } from 'next/server';
import { getSession, Session } from '@/lib/auth/session';
import {
  DropdownItem,
  DropdownMenu,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger,
} from './ui/dropdown';
import { cn } from '@/lib/utils';

export async function AppNavbar() {
  await connection();
  const session = await getSession();
  return (
    <nav className='ml-auto flex items-center gap-2 text-sm'>
      {!session && (
        <Link
          href='/auth/login' prefetch={false}
          className='rounded-full px-4 py-2 font-semibold text-foreground transition-colors hover:bg-[#efe8dc]'
        >
          Sign in
        </Link>
      )}
      {session && <DashboardLinks session={session} />}
    </nav>
  );
}

function DashboardLinks({ session }: { session: Session }) {
  return (
    <DropdownRoot>
      <DropdownTrigger>
        <div
          className={cn(
            'inline-flex select-none items-center justify-center gap-2 rounded-full border border-[#d9d0c3] bg-paper px-3.5 py-2 text-sm font-semibold text-foreground shadow-sm transition',
            'hover:bg-white data-popup-open:bg-[#efe8dc]',
            'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          <span
            aria-label={`Signed in as ${session.email}`}
            title={session.email}
            className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest text-xs font-bold uppercase text-paper'
          >
            {session.email.charAt(0)}
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem href='/dashboard'>Dashboard</DropdownItem>
        <DropdownSeparator />
        <DropdownItem className='p-0!'>
          <form action='/auth/logout' method='post' className='w-full'>
            <button type='submit' className=' w-full py-2 cursor-pointer'>
              Sign out
            </button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </DropdownRoot>
  );
}

export function AppNavbarSkeleton() {
  return (
    <nav aria-label='Account menu' className='ml-auto'>
      <span className='inline-block h-9 w-20 animate-pulse rounded-full bg-[#e9e2d6]' />
    </nav>
  );
}
