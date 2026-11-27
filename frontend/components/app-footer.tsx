import Link from 'next/link';
import { BrandLockup } from './brand-mark';

export default function AppFooter() {
  return (
    <footer className='border-t border-[#e6ddd0] bg-[#f0e9dd]'>
      <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12'>
        <div>
          <Link href='/' className='rounded-lg'>
            <BrandLockup />
          </Link>
          <p className='mt-3 max-w-sm text-sm leading-relaxed text-[#625f55]'>
            A little more appetite in every menu.
          </p>
        </div>
        <nav aria-label='Footer navigation' className='flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium'>
          <Link className='text-[#55564d] transition-colors hover:text-primary' href='/demo-menu'>
            Try the demo
          </Link>
          <Link className='text-[#55564d] transition-colors hover:text-primary' href='/auth/login?mode=signup&next=/dashboard' prefetch={false}>
            Create a shop
          </Link>
          <Link className='text-[#55564d] transition-colors hover:text-primary' href='/auth/login' prefetch={false}>
            Merchant sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
}
