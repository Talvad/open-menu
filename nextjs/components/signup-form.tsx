'use client';
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
import { signupAction, SignupFormState } from '@/actions';

const initialState: SignupFormState = {
  success: false,
  message: '',
};

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
              <FieldLabel htmlFor='name'>Full Name</FieldLabel>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='John Doe'
                defaultValue={state.inputs?.name}
                required
              />
              {state.errors?.name && (
                <FieldError
                  errors={state.errors.name.map((msg) => ({
                    message: msg,
                  }))}
                />
              )}
            </Field>
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              {state.errors?.email && (
                <FieldError
                  errors={state.errors.email.map((msg) => ({
                    message: msg,
                  }))}
                />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input id='password' name='password' type='password' required />

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              {state.errors?.password && (
                <FieldError
                  errors={state.errors.password.map((msg) => ({
                    message: msg,
                  }))}
                />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='confirmPassword'>
                Confirm Password
              </FieldLabel>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {state.errors?.confirmPassword && (
                <FieldError
                  errors={state.errors.confirmPassword.map((msg) => ({
                    message: msg,
                  }))}
                />
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending ? 'Creating Account...' : 'Create Account'}
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className='px-6 text-center'>
                  Already have an account? <Link href='/login'>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
