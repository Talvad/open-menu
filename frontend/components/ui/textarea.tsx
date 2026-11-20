import { ComponentProps } from 'react';

type Props = ComponentProps<'textarea'>;

export default function Textarea({ className = '', ...props }: Props) {
  return (
    <textarea
      className={`box-border w-full resize-y rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-2.75 text-[15px] text-foreground focus:border-primary focus:outline-none ${className}`}
      {...props}
    />
  );
}
