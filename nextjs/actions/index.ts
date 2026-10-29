// src/app/actions.ts
'use server';

import { loginSchema, signupSchema } from '@/lib/schemas';

export type SignupFormState = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  inputs?: {
    name?: string;
    email?: string;
  };
  message?: string;
};

export async function signupAction(
  _prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  // Convert FormData to a standard object
  const name = String(formData.get('name') ?? '');
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  // Validate the data against our Zod schema
  const validatedFields = signupSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  // If validation fails, format and return the field errors
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fix the errors below.',
      inputs: {
        name,
        email,
      },
    };
  }

  try {
    // 💡 Proceed with your server-side database logic here (e.g., hash password, save user)
    return {
      success: true,
      message: 'Account created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Database error. Failed to register user.',
      inputs: {
        name,
        email,
      },
    };
  }
}

export type LoginFormState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  inputs?: {
    email?: string;
  };
  message?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  // Convert FormData to a standard object
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  // Validate the data against our Zod schema
  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  // If validation fails, format and return the field errors
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fix the errors below.',
      inputs: {
        email,
      },
    };
  }

  try {
    // 💡 Proceed with your server-side database logic here (e.g., hash password, save user)
    return {
      success: true,
      message: 'Logged In successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Database error. Failed to register user.',
      inputs: {
        email,
      },
    };
  }
}
