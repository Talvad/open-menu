import React from 'react';

type FieldProps = React.ComponentProps<'div'>;

function Field({ className, ...props }: FieldProps) {
  return <div className={` ${className}`} {...props} />;
}

type FieldLabelProps = React.ComponentProps<'label'>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={`block text-xs font-semibold text-slate-300 mb-1.5 ${className}`}
      {...props}
    />
  );
}

type FieldErrorType = { errors: string[] };
function FieldError({ errors = [] }: FieldErrorType) {
  if (errors.length === 0) return null;
  return (
    <ul className='ml-4 flex list-disc flex-col gap-1 py-1'>
      {errors.map((error) => (
        <li key={error} className='text-sm font-normal text-red-500'>
          {error}
        </li>
      ))}
    </ul>
  );
}

type FormErrorType = { state: { success: boolean; message?: string } };

function FromError({ state }: FormErrorType) {
  if (!state.message) return null;
  return (
    <div
      className={`rounded-lg border ${state.success ? 'border-green-500 bg-green-400/10' : 'border-red-500 bg-red-400/10'}`}
    >
      <p
        className={` py-2 text-center text-sm font-light ${state.success ? 'text-green-500' : 'text-red-500'} `}
      >
        {state.message}
      </p>
    </div>
  );
}

export { Field, FieldLabel, FieldError, FromError };
