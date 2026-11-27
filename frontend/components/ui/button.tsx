import { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  variant?: 'normal' | 'outline' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
};
const classNames: Record<string, string> = {
  default:
    'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-55',
  normal: 'rounded-full bg-primary text-white hover:bg-[#a43d30]',
  outline:
    'rounded-full border border-foreground/20 bg-paper text-foreground hover:border-foreground/50 hover:bg-white',
  secondary:
    'rounded-full bg-[#e6eadf] text-forest hover:bg-[#d9e0d1]',
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};
export default function Button({
  variant = 'normal',
  size = 'md',
  className = '',
  ...props
}: Props) {
  return (
    <button
      className={`${classNames.default} ${classNames[variant]}  ${classNames[size]} ${className}`}
      {...props}
    />
  );
}
