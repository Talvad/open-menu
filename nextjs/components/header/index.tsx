import Link from 'next/link';
import Logo from '../logo';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className=' px-10'>
      <nav className='border-b border-gray-200 p-4 flex items-center justify-between'>
        <div className='flex gap-8 items-center'>
          <Link href='/'>
            <Logo />
          </Link>
          <Link href='/about' className='text-sm font-semibold'>
            About
          </Link>
        </div>
        <div className='flex gap-4'>
          <Link href={'/login'}>
            <Button size={'sm'}>Login</Button>
          </Link>
          <Link href={'/signup'}>
            <Button size={'sm'} variant={'outline'}>
              Signup
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
