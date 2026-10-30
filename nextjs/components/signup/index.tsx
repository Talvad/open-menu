'use client';
import { ArrowRight, Lock, Mail, Store, User } from 'lucide-react';
import { Input } from '../base_ui/input';
import Link from 'next/link';
import { useActionState } from 'react';
import { signupAction, SignupFormState } from '@/actions';
import { Field, FieldError, FieldLabel, FromError } from '../base_ui/field';

const initialState: SignupFormState = {
  success: false,
  message: '',
};

const Signup = () => {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );
  return (
    <form id='signup-form' className='space-y-4' action={formAction}>
      <FromError state={state} />
      <Field>
        <FieldLabel>Full Name</FieldLabel>
        <Input
          icon={User}
          type='text'
          id='name'
          name='name'
          defaultValue={state.inputs?.name}
          required
          placeholder='Chef Mario Rossi'
        />
        {state.errors?.name && <FieldError errors={state.errors.name} />}
      </Field>
      <Field>
        <FieldLabel>Shop / Restaurant Name</FieldLabel>
        <Input
          icon={Store}
          type='text'
          id='shopName'
          name='shopName'
          defaultValue={state.inputs?.shopName}
          required
          placeholder='Bella Italia Trattoria'
        />
        {state.errors?.shopName && (
          <FieldError errors={state.errors.shopName} />
        )}
      </Field>

      <Field>
        <FieldLabel>Business Email</FieldLabel>
        <Input
          icon={Mail}
          type='email'
          id='email'
          name='email'
          defaultValue={state.inputs?.email}
          required
          placeholder='owner@restaurant.com'
        />
        {state.errors?.email && <FieldError errors={state.errors.email} />}
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
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
      <Field>
        <FieldLabel>Confirm Password</FieldLabel>
        <Input
          icon={Lock}
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          required
          placeholder='••••••••••••'
        />
        {state.errors?.confirmPassword && (
          <FieldError errors={state.errors.confirmPassword} />
        )}
      </Field>

      <button
        disabled={isPending}
        type='submit'
        className='w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2'
      >
        <span>Create Shop Owner Account</span>
        <ArrowRight className='size-4' />
      </button>
      <hr className='h-px bg-gray-600 border-0' />
      <p className='text-center text-sm text-gray-400'>
        Already have an account ?{' '}
        <Link href={'/login'} className='underline underline-offset-2'>
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
