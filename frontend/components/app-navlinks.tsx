'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { links: { href: string; label: string }[] };

export default function AppNavLinks({ links }: Props) {
  return (
    <nav aria-label='Main navigation' className='flex flex-wrap items-center gap-1'>
      {links.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href.includes('?') ? false : pathname === href;
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`rounded-full px-3 py-2 text-sm transition-colors hover:bg-[#efe8dc] hover:text-foreground ${
        isActive
          ? 'bg-[#e9e2d6] font-semibold text-forest'
          : 'font-medium text-[#68665b]'
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}
