'use client';
import {
  LayoutDashboard,
  Utensils,
  FolderTree,
  QrCode,
  Settings,
} from 'lucide-react';
import { SideNavItem, SideNavItemProps } from './side-navitem';

const sideNavItems: SideNavItemProps[] = [
  { slug: '/dashboard', icon: LayoutDashboard, text: 'Overview' },
  { slug: '/dashboard/menu-builder', icon: Utensils, text: 'Menu Builder' },
  { slug: '/dashboard/categories', icon: FolderTree, text: 'Categories' },
  {
    slug: '/dashboard/qr-code-generator',
    icon: QrCode,
    text: 'Qr Code Generator',
  },
  { slug: '/dashboard/settings', icon: Settings, text: 'Settings' },
];
function SideNavbar() {
  return (
    <nav className='p-4 space-y-1.5 text-xs font-semibold'>
      {sideNavItems.map((sideNavItem) => (
        <SideNavItem key={sideNavItem.slug} {...sideNavItem} />
      ))}
    </nav>
  );
}

export { SideNavbar };
