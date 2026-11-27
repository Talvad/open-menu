import { ComponentProps } from 'react';

type Props = ComponentProps<'select'>;

export default function Select({ className = '', ...props }: Props) {
  return (
    <select
      className={`box-border w-full rounded-xl border border-[#d9d0c3] bg-paper px-3.5 py-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none ${className}`}
      {...props}
    />
  );
}
