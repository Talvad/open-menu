import Image from 'next/image';

type Props = {
  name: string;
  logoUrl: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: { className: 'h-10 w-10 rounded-xl text-sm', sizes: '40px' },
  md: { className: 'h-14 w-14 rounded-2xl text-lg', sizes: '56px' },
  lg: { className: 'h-20 w-20 rounded-3xl text-2xl', sizes: '80px' },
};

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return words.map((word) => word[0]?.toLocaleUpperCase() ?? '').join('') || '?';
}

export function ShopLogo({
  name,
  logoUrl,
  size = 'md',
  className = '',
}: Props) {
  const dimensions = sizes[size];

  return (
    <span
      aria-hidden='true'
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-forest/10 bg-[#e5eadf] font-bricolage font-bold text-forest ${dimensions.className} ${className}`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt=''
          fill
          sizes={dimensions.sizes}
          className='bg-paper object-contain p-1'
        />
      ) : (
        <span>{initials(name)}</span>
      )}
    </span>
  );
}
