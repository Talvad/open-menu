import { PropsWithChildren } from 'react';

type ChipProps = PropsWithChildren & { className?: string };
const Chip = ({ children, className = '' }: ChipProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-light text-amber-400 text-xs font-semibold tracking-wide border border-amber-500/30 uppercase ${className}`}
    >
      {children}
    </div>
  );
};

export default Chip;
