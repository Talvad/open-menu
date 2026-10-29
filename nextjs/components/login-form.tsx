'use client';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction, LoginFormState } from '@/actions';

const initialState: LoginFormState = {
  success: false,
  message: '',
};
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.message && (
            <p
              className={` py-2 text-center text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}
            >
              {state.message}
            </p>
          )}
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='m@example.com'
                  defaultValue={state.inputs?.email}
                  required
                />
                {state.errors?.email && (
                  <FieldError
                    errors={state.errors.email.map((msg) => ({
                      message: msg,
                    }))}
                  />
                )}
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id='password' name='password' type='password' required />
                {state.errors?.password && (
                  <FieldError
                    errors={state.errors.password.map((msg) => ({
                      message: msg,
                    }))}
                  />
                )}
              </Field>
              <Field>
                <Button type='submit'>Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup'>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
