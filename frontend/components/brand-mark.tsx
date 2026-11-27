export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 48 48'
      aria-hidden='true'
      className={className}
      fill='none'
    >
      <rect width='48' height='48' rx='15' fill='#24463b' />
      <path
        d='M13 34V14l11 12 11-12v20'
        stroke='#f7f2e9'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='36' cy='12' r='4' fill='#c94f3d' />
    </svg>
  );
}

export function BrandLockup({
  subtitle,
  light = false,
}: {
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <span className='inline-flex items-center gap-3'>
      <BrandMark className='h-10 w-10 shrink-0' />
      <span className='flex flex-col'>
        <span
          className={`font-bricolage text-lg font-bold leading-none tracking-[-0.04em] ${
            light ? 'text-paper' : 'text-foreground'
          }`}
        >
          open<span className='text-primary'>menu</span>
        </span>
        {subtitle && (
          <span
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              light ? 'text-paper/60' : 'text-[#777468]'
            }`}
          >
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
