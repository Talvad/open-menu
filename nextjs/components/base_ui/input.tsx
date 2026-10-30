import { Eye, LucideIcon } from 'lucide-react';
import React from 'react';
type InputProps = React.ComponentProps<'input'> & { icon?: LucideIcon };
function Input({ className, type, icon: Icon, ...props }: InputProps) {
  return (
    <div className='relative'>
      {Icon && (
        <Icon className='size-4 absolute left-3.5 top-3.5 text-slate-500' />
      )}
      <input
        type={type}
        className={`bg-black w-full pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-shadow border border-black focus:border-amber-200 ${Icon ? 'pl-10' : 'pl-4'} ${className}`}
        {...props}
      />
      {type === 'password' && (
        <button
          type='button'
          className='absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300'
        >
          <Eye className='size-4' />
        </button>
      )}
    </div>
  );
}

export { Input };
