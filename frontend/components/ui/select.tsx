import { ComponentProps } from 'react';

type Props = ComponentProps<'select'>;

export default function Select({ className = '', ...props }: Props) {
  return (
    <select
      className={`box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-2.75 text-[15px] text-foreground focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
}
