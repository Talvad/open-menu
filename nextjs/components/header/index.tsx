import Link from 'next/link';
// import Logo from '../logo';
// import { Button } from '../ui/button';
import { UtensilsCrossed } from 'lucide-react';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 bg-gray-900/10 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Link href='/' className='flex items-center gap-3 group'>
            <div className='w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-navy-900 font-extrabold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform'>
              <UtensilsCrossed className='size-5' />
            </div>
            <span className='text-xl font-bold tracking-tight text-white flex items-center gap-1.5'>
              OPEN <span className='text-amber-400 font-extrabold'>MENU</span>
            </span>
          </Link>

          <div className=''>
            <Link
              href='/login'
              className='px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold text-sm shadow-md hover:shadow-amber-500/2 transition-all transform hover:-translate-y-0.5'
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
