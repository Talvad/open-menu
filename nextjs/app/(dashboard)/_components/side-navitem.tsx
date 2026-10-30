'use client';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideNavItemProps = {
  slug: string;
  icon: LucideIcon;
  text: string;
};
function SideNavItem({ slug, icon: Icon, text }: SideNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === slug;
  return (
    <Link
      href={slug}
      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl  transition-all ${isActive ? 'bg-amber-500 text-navy-900 font-bold shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
    >
      <Icon className='size-4' />
      <span>{text}</span>
    </Link>
  );
}

export { SideNavItem };
export type { SideNavItemProps };
