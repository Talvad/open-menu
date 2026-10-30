import { Metadata } from 'next';
import Login from '@/components/login';

export const metadata: Metadata = {
  title: 'Login',
};
export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}
