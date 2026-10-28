import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};
export default function HomePage() {
  return (
    <>
      <section className='min-h-svh w-full p-6 md:p-10'>
        <h1>Home Page</h1>
      </section>
    </>
  );
}
