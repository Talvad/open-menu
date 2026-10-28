import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};
export default function AboutPage() {
  return (
    <>
      <section className='min-h-svh w-full p-6 md:p-10'>
        <h1>About Page</h1>
      </section>
    </>
  );
}
