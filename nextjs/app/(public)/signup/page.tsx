import { SignupForm } from '@/components/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
};
export default function SignupPage() {
  return (
    <>
      <section className='flex min-h-svh w-full items-center justify-center relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='w-full max-w-sm'>
          <SignupForm />
        </div>
      </section>
    </>
  );
}
