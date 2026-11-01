import Header from '@/components/header';
import Footer from '@/components/footer';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Header />
      <main className='min-h-svh w-full relative py-20 overflow-hidden'>
        {children}
      </main>
      <Footer />
    </>
  );
}
