import { ComponentProps } from 'react';

function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={` box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-2.75 text-[15px] text-foreground focus:border-primary focus:outline-none  ${className}`}
      {...props}
    />
  );
}

export default Input;
