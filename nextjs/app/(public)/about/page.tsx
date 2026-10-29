import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};
export default function AboutPage() {
  return (
    <>
      <section className='min-h-svh w-full relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <h1>About Page</h1>
      </section>
    </>
  );
}
