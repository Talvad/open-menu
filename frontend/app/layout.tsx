import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';
import { WebVitals } from '@/components/web-vitals';
import { siteUrl } from '@/lib/seo';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bricolage',
});
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Open Menu — menus made to be shared',
    template: '%s · Open Menu',
  },
  description:
    'Create a polished digital menu or catalogue for your restaurant, cafe, hotel, grocery shop, or store. Keep it current and easy to share.',
  applicationName: 'Open Menu',
  keywords: [
    'digital menu',
    'online menu',
    'restaurant menu',
    'cafe menu',
    'shop catalogue',
    'QR code menu',
  ],
  authors: [{ name: 'Open Menu' }],
  creator: 'Open Menu',
  publisher: 'Open Menu',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Open Menu',
    locale: 'en_IN',
    title: 'Open Menu — menus made to be shared',
    description:
      'Create a polished digital menu or catalogue for your restaurant, cafe, hotel, grocery shop, or store.',
  },
  twitter: {
    card: 'summary',
    title: 'Open Menu — menus made to be shared',
    description:
      'Create a polished digital menu or catalogue for your restaurant, cafe, hotel, grocery shop, or store.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f2e9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body
        className={`${bricolage.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <WebVitals />
        <div className='isolate min-h-screen'>{children}</div>
      </body>
    </html>
  );
}
