import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bricolage',
});
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
      <body
        className={`${bricolage.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <main className='isolate'>{children}</main>
      </body>
    </html>
  );
}
