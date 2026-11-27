import type { Metadata } from 'next';
import DemoMenu from '@/components/demo-menu';

const description =
  'Explore a sample cafe menu, search dishes, browse categories, and try the quick order total. See how an Open Menu link works for your customers.';

export const metadata: Metadata = {
  title: 'Interactive Digital Menu Demo',
  description,
  alternates: { canonical: '/demo-menu' },
  openGraph: {
    title: 'Interactive Digital Menu Demo · Open Menu',
    description,
    url: '/demo-menu',
  },
  twitter: {
    title: 'Interactive Digital Menu Demo · Open Menu',
    description,
  },
};

export default function DemoMenuPage() {
  return <DemoMenu />;
}
