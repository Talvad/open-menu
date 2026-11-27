import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import { BrandLockup } from '@/components/brand-mark';
import { requireAdmin } from '@/lib/auth/session';
import { Suspense } from 'react';
import type { Metadata } from 'next';

const menu = [
  { href: '/admin?status=PENDING', label: 'Review queue' },
  { href: '/admin?status=ALL', label: 'All shops' },
];
export const metadata: Metadata = {
  title: 'Admin dashboard',
  robots: { index: false, follow: false },
};
export const instant = false;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminAreaFallback />}>
      <AdminArea>{children}</AdminArea>
    </Suspense>
  );
}

async function AdminArea({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return (
    <>
      <AppHeader links={menu}>
        <BrandLockup subtitle='Operations' />
        <span className='rounded-full bg-[#f5dfd9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#943f32]'>
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

function AdminAreaFallback() {
  return (
    <main className='mx-auto max-w-4xl px-4 py-8' role='status'>
      <p className='text-sm text-stone-500'>Loading admin area…</p>
    </main>
  );
}
