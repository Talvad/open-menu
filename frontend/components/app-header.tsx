import Image from 'next/image';
import Link from 'next/link';

type Props = {
  logo?: string;
  loggedIn?: boolean;
  title?: string;
  email?: string;
  links?: { href: string; label: string }[];
  homeLink?: string;
};
export default function AppHeader({
  logo = '/logo.svg',
  loggedIn = false,
  title = 'OpenMenu',
  email = '',
  links = [],
  homeLink = '/',
}: Props) {
  return (
    <header className='px-10 py-4 border-b border-b-gray-300 flex items-center justify-between'>
      <Link href={homeLink}>
        {logo ? (
          <Image src={logo} alt={title} width={40} height={40} priority />
        ) : (
          <h2>{title}</h2>
        )}
      </Link>
      <Link href={loggedIn ? '/dashboard' : '/auth/login'}>
        {loggedIn ? 'Dashboard' : 'Login'}
      </Link>
    </header>
  );
}
