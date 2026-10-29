import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  subsets: ['latin'],
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className='bg-navy-900 text-slate-100 selection:bg-amber-500 selection:text-navy-900 overflow-x-hidden min-h-full flex flex-col'>
        {children}
      </body>
    </html>
  );
}
