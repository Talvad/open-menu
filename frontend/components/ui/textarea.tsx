import { ComponentProps } from 'react';

type Props = ComponentProps<'textarea'>;

export default function Textarea({ className = '', ...props }: Props) {
  return (
    <textarea
      className={`box-border w-full resize-y rounded-xl border border-[#d9d0c3] bg-paper px-3.5 py-3 text-sm text-foreground placeholder:text-[#989184] focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none ${className}`}
      {...props}
    />
  );
}
