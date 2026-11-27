import { ComponentProps } from 'react';

function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={`box-border w-full rounded-xl border border-[#d9d0c3] bg-paper px-3.5 py-3 text-sm text-foreground placeholder:text-[#989184] focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none ${className}`}
      {...props}
    />
  );
}

export default Input;
