import Link from 'next/link';
import { ReactNode, Suspense } from 'react';
import { AppNavbar, AppNavbarSkeleton } from './app-navbar';
import AppNavLinks from './app-navlinks';
import { BrandLockup } from './brand-mark';

type Props = {
  links?: { href: string; label: string }[];
  homeLink?: string;
  children?: ReactNode;
};
export default function AppHeader({
  links = [],
  homeLink = '/',
  children = null,
}: Props) {
  const isMarketingHeader = links.length === 0;
  const navigation = isMarketingHeader
    ? [{ href: '/demo-menu', label: 'See the menu' }]
    : links;

  return (
    <header className='sticky top-0 z-30 border-b border-[#e6ddd0] bg-background/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 sm:px-8 lg:px-12'>
        <Link
          href={homeLink}
          className='shrink-0 rounded-lg'
        >
          {children ?? <BrandLockup />}
        </Link>
        <AppNavLinks links={navigation} />
        {isMarketingHeader && (
          <Link
            href='/auth/login?mode=signup&next=/dashboard'
            prefetch={false}
            className='ml-auto hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e] sm:inline-flex'
          >
            Build your menu
          </Link>
        )}
        <Suspense fallback={<AppNavbarSkeleton />}>
          <AppNavbar />
        </Suspense>
      </div>
    </header>
  );
}
