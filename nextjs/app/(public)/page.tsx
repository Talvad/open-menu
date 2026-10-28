import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};
export default function HomePage() {
  return (
    <>
      <section>
        <h1>Home Page</h1>
      </section>
    </>
  );
}
