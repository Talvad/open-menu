import { FormState } from '@/actions/util';
import { ComponentProps } from 'react';

function Field({ className = '', ...props }: ComponentProps<'div'>) {
  return <div className={`space-y-1.5 py-2 ${className}`} {...props} />;
}

function FieldLabel({ className = '', ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={`block text-xs font-semibold uppercase tracking-[0.12em] text-[#615e53] ${className}`}
      {...props}
    />
  );
}

function FieldDescription({ className = '', ...props }: ComponentProps<'p'>) {
  return <p className={`text-xs leading-relaxed text-[#716e63] ${className}`} {...props} />;
}

function FieldError({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  const uniquErrors = [...new Set(errors)];
  return (
    <ul className='ml-4 flex list-disc flex-col gap-1 py-1 text-xs font-normal text-red-700'>
      {uniquErrors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}

function FormError({ state }: { state: FormState }) {
  if (state?.error)
    return (
      <Field>
        <p
          role='alert'
          className='rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800'
        >
          {state.error}
        </p>
      </Field>
    );
  if (state?.message)
    return (
      <Field>
        <p
          role='status'
          className='rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-800'
        >
          {state.message}
        </p>
      </Field>
    );
}

export { Field, FieldLabel, FieldDescription, FieldError, FormError };
