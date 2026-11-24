import AppHeader from '@/components/app-header';
import { requireOwner } from '@/lib/auth/session';

const menu = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/menu', label: 'Menu' },
  { href: '/dashboard/settings', label: 'Settings' },
];
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireOwner();
  return (
    <>
      <AppHeader links={menu}>
        <span className='font-bricolage text-xl sm:text-2xl font-bold leading-none tracking-[-0.02em] text-foreground'>
          Open <span className='text-primary'>Menu</span>
        </span>
        <span className='bg-gray-300 text-gray-600 text-xs rounded font-semibold px-1 py-px'>
          {session?.role}
        </span>
      </AppHeader>
      <main className='mx-auto max-w-4xl px-4 py-8'>{children}</main>
    </>
  );
}
