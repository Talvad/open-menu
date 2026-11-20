'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { links: { href: string; label: string }[] };

export default function AppNavLinks({ links }: Props) {
  return (
    <nav className='flex items-center gap-4'>
      {links.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={` text-gray-600 ${isActive && 'font-semibold border-b-2 border-b-primary'}`}
      href={href}
    >
      {label}
    </Link>
  );
}
