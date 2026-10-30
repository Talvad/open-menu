import React from 'react';

type SelectProps = React.ComponentProps<'select'>;

function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={`appearance-none bg-black w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-shadow focus:shadow-md border border-black focus:border-amber-200 ${className}`}
      {...props}
    />
  );
}

export default Select;
