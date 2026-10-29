import { Metadata } from 'next';
import { LoginForm } from '@/components/login-form';

export const metadata: Metadata = {
  title: 'Login',
};
export default function LoginPage() {
  return (
    <>
      <section className='flex min-h-svh w-full items-center justify-center relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden'>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
