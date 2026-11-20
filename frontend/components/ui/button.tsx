import { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  variant?: 'normal' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};
const classNames: Record<string, string> = {
  default: 'cursor-pointer',
  normal: 'bg-primary text-white transition-colors hover:bg-[#92400E]',
  outline:
    'border border-primary text-primary bg-transparent transition-colors hover:bg-stone-50',
  sm: 'px-3 py-1 rounded-sm',
  md: 'px-4 py-2 rounded-md',
  lg: 'px-6 py-2.5 rounded-lg',
};
export default function Button({
  variant = 'normal',
  size = 'md',
  className = '',
  ...props
}: Props) {
  return (
    <button
      className={`${classNames.default} ${classNames[variant]} ${classNames[size]} ${className}`}
      {...props}
    />
  );
}
