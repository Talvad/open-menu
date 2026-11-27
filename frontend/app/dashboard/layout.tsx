import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import { BrandLockup } from '@/components/brand-mark';
import { requireOwner } from '@/lib/auth/session';
import { Suspense } from 'react';
import type { Metadata } from 'next';

const menu = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/menu', label: 'Menu' },
  { href: '/dashboard/settings', label: 'Settings' },
];
export const metadata: Metadata = {
  title: 'Merchant dashboard',
  robots: { index: false, follow: false },
};
export const instant = false;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<OwnerAreaFallback />}>
      <OwnerArea>{children}</OwnerArea>
    </Suspense>
  );
}

async function OwnerArea({ children }: { children: React.ReactNode }) {
  const session = await requireOwner();
  return (
    <>
      <AppHeader links={menu}>
        <BrandLockup subtitle='Merchant studio' />
        <span className='rounded-full bg-[#e5eadf] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-forest'>
          {session?.role}
        </span>
      </AppHeader>
      <main className='mx-auto min-h-[65vh] max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12'>
        {children}
      </main>
      <AppFooter />
    </>
  );
}

function OwnerAreaFallback() {
  return (
    <main className='mx-auto max-w-4xl px-4 py-8' role='status'>
      <p className='text-sm text-stone-500'>Loading your dashboard…</p>
    </main>
  );
}
