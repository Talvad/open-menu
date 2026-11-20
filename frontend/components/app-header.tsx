import Image from 'next/image';
import Link from 'next/link';
import Button from './ui/button';
import { ReactNode, Suspense } from 'react';
import { AppNavbar, AppNavbarSkeleton } from './app-navbar';

type Props = {
  logo?: string;
  loggedIn?: boolean;
  title?: string;
  email?: string;
  links?: { href: string; label: string }[];
  homeLink?: string;
  children?: ReactNode;
};
export default function AppHeader({
  logo = '/logo.svg',
  loggedIn = false,
  title = 'OpenMenu',
  email = '',
  links = [],
  homeLink = '/',
  children = null,
}: Props) {
  return (
    <header className='px-5 sm:px-10 py-2 sm:py-4 border-b border-b-gray-300 flex items-center justify-between flex-wrap gap-2'>
      <Link href={homeLink}>
        {logo ? (
          <div className='inline-flex items-center gap-2.5'>
            <Image src={logo} alt={title} width={40} height={40} priority />
            {children && children}
          </div>
        ) : (
          <h2>{title}</h2>
        )}
      </Link>
      <Suspense fallback={<AppNavbarSkeleton />}>
        <AppNavbar loggedIn={loggedIn} />
      </Suspense>
    </header>
  );
}
