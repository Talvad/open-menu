import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='border-t border-slate-800 py-12 bg-navy-900 text-slate-400 text-xs'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex items-center gap-2'>
          <div className='w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-navy-900 font-extrabold'>
            <UtensilsCrossed className='size-4' />
          </div>
          <span className='text-sm font-bold text-white'>OPEN MENU</span>
          <span className='text-slate-500 ml-2'>
            © 2026 Open Menu Inc. All rights reserved.
          </span>
        </div>

        <div className='flex gap-6'>
          <Link href='/' className='hover:text-white transition-colors'>
            Privacy Policy
          </Link>
          <Link href='/' className='hover:text-white transition-colors'>
            Terms of Service
          </Link>
          <Link href='/' className='hover:text-white transition-colors'>
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
