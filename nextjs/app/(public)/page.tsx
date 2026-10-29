import Demo from '@/components/home/demo';
import Features from '@/components/home/features';
import Hero from '@/components/home/hero';
import HowItWorks from '@/components/home/how-it-works';
import Pricing from '@/components/home/pricing';
import Subscribe from '@/components/home/subscribe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};
export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Demo />
      <Features />
      <Pricing />
      <Subscribe />
    </>
  );
}
