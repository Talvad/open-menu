import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Open Menu', template: '%s · Open Menu' },
  description:
    'Digital menus and catalogues for restaurants, stores, hotels and grocery shops.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d97706',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='min-h-screen antialiased'>{children}</body>
    </html>
  );
}
