'use client';
import { Lock, LogIn, Mail } from 'lucide-react';
import { Input } from '../base_ui/input';
import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction, LoginFormState } from '@/actions';
import { Field, FieldError, FieldLabel, FromError } from '../base_ui/field';

const initialState: LoginFormState = {
  success: false,
  message: '',
};

const Login = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  return (
    <form className=' space-y-4' action={formAction}>
      <FromError state={state} />
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <Input
          icon={Mail}
          type='email'
          id='email'
          name='email'
          required
          placeholder='you@example.com'
          defaultValue={state.inputs?.email}
        />
        {state.errors?.email && <FieldError errors={state.errors.email} />}
      </Field>

      <Field>
        <FieldLabel htmlFor='password'>Password</FieldLabel>
        <Input
          icon={Lock}
          type='password'
          id='password'
          name='password'
          required
          placeholder='••••••••••••'
        />
        {state.errors?.password && (
          <FieldError errors={state.errors.password} />
        )}
      </Field>

      <button
        disabled={isPending}
        type='submit'
        className='w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2'
      >
        <span>Sign In to Dashboard</span>
        <LogIn className='size-4' />
      </button>
      <hr className='h-px bg-gray-600 border-0' />
      <p className='text-center text-sm text-gray-400'>
        Don't have an account ?{' '}
        <Link href={'/signup'} className='underline underline-offset-2'>
          Create New One
        </Link>
      </p>
    </form>
  );
};

export default Login;
