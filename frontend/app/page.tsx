import AppHeader from '@/components/app-header';
import Button from '@/components/ui/button';
import Link from 'next/link';

function BrandLogo({
  size = 40,
  clipId = 'logo-clip',
}: {
  size?: number;
  clipId?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 64 64'
      aria-hidden='true'
      className='shrink-0'
    >
      <defs>
        <clipPath id={clipId}>
          <rect x='32' width='32' height='64' />
        </clipPath>
      </defs>
      <rect width='64' height='64' rx='15' fill='#D97706' />
      <path
        d='M18 47V18L32 34L46 18V47'
        fill='none'
        stroke='#FFF3DC'
        strokeWidth='9'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18 47V18L32 34L46 18V47'
        fill='none'
        stroke='#F6C77A'
        strokeWidth='9'
        strokeLinecap='round'
        strokeLinejoin='round'
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className={`min-h-350`}>
      <AppHeader>
        <span className='font-bricolage text-xl sm:text-2xl font-bold leading-none tracking-[-0.02em] text-foreground'>
          Open <span className='text-primary'>Menu</span>
        </span>
      </AppHeader>

      {/* Hero */}
      <section className='mx-auto flex max-w-280 flex-wrap items-center gap-14 px-6 pb-22 pt-14'>
        <div className='flex min-w-0 flex-[1_1_460px] flex-col items-start gap-6'>
          <span className='rounded-full bg-[#FEF3C7] px-3 py-1.5 text-[13px] font-semibold text-[#92400E]'>
            For restaurants, hotels, groceries and stores
          </span>

          <h1 className='m-0 font-bricolage text-[clamp(38px,6vw,60px)] font-bold leading-[1.04] tracking-[-0.03em]'>
            A menu your customers can open with one scan.
          </h1>

          <p className='m-0 max-w-130 text-lg leading-[1.55] text-[#44403C]'>
            List your products in groups with prices and photos, mark what is
            out of stock, and let customers add up their total on their own
            phone.
          </p>

          <div className='flex flex-wrap items-center gap-3'>
            <Link href='/create'>
              <Button size='lg'>Create your shop</Button>
            </Link>
            <Link href='/auth/google'>
              <Button variant='outline' size='lg'>
                Continue with Google
              </Button>
            </Link>
          </div>

          <p className='m-0 text-sm text-[#57534E]'>
            An administrator reviews each shop before its menu goes live.
          </p>
        </div>

        {/* Phone Preview */}
        <div className='flex min-w-0 flex-[1_1_340px] justify-center'>
          <div className='box-border w-75 rounded-[40px] bg-foreground p-2.5 shadow-[0_24px_48px_rgba(28,25,23,0.18)]'>
            <div className='flex h-140 flex-col overflow-hidden rounded-4xl bg-background'>
              <div className='bg-primary px-4.5 pb-4 pt-7 text-white'>
                <div className='font-bricolage text-2xl font-bold tracking-[-0.02em]'>
                  Demo Cafe
                </div>
                <div className='mt-0.5 text-xs text-[#FFF3DC]'>Kuzhithurai</div>
              </div>

              <div className='flex grow flex-col gap-2.5 px-3.5 pt-3.5'>
                <div className='text-base font-bold'>Breakfast</div>

                {/* Item 1 */}
                <div className='flex items-center justify-between gap-2 rounded-xl border border-[#E7E5E4] bg-white px-3 py-2.5'>
                  <div>
                    <div className='text-sm font-semibold'>Veg Sandwich</div>
                    <div className='mt-0.5 text-[13px] text-[#44403C]'>
                      ₹80.00
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <Button size='sm' variant='outline' className='p-1! '>
                      -
                    </Button>

                    <span className='font-semibold'>1</span>
                    <Button size='sm' className='p-1!'>
                      +
                    </Button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className='flex items-center justify-between gap-2 rounded-xl border border-[#E7E5E4] bg-white px-3 py-2.5'>
                  <div>
                    <div className='text-sm font-semibold'>Masala Dosa</div>
                    <div className='mt-0.5 text-[13px] text-[#44403C]'>
                      ₹95.00
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <Button size='sm' variant='outline' className='p-1!'>
                      -
                    </Button>
                    <span className='font-semibold'>2</span>
                    <Button size='sm' className='p-1!'>
                      +
                    </Button>
                  </div>
                </div>

                {/* Item 3 (Sold Out) */}
                <div className='flex items-center justify-between gap-2 rounded-xl border border-[#E7E5E4] bg-white px-3 py-2.5 opacity-65'>
                  <div>
                    <div className='text-sm font-semibold'>Egg Omelette</div>
                    <div className='mt-0.5 text-[13px] text-[#44403C]'>
                      ₹60.00
                    </div>
                  </div>
                  <span className='rounded-full bg-[#E7E5E4] px-2.5 py-1 text-xs font-semibold text-[#44403C]'>
                    Sold out
                  </span>
                </div>
              </div>

              <div className='border-t border-[#E7E5E4] bg-white p-3'>
                <Button className='w-full flex justify-between'>
                  <span>3 items · View total</span>
                  <span>₹270.00</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='mx-auto grid max-w-280 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 px-6 pb-22'>
        <div className='flex flex-col gap-3 rounded-2xl border border-[#E7E5E4] bg-white p-6'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7]'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#B45309'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M12 3L3 8l9 5 9-5-9-5z' />
              <path d='M3 13l9 5 9-5' />
            </svg>
          </div>
          <h2
            className='m-0 text-xl font-bold tracking-[-0.01em]'
            style={{
              fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
            }}
          >
            Group your items
          </h2>
          <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
            Breakfast, Drinks, Tables, Cots: organise anything into groups, with
            prices and photos.
          </p>
        </div>

        <div className='flex flex-col gap-3 rounded-2xl border border-[#E7E5E4] bg-white p-6'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7]'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#B45309'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' />
              <circle cx='12' cy='12' r='3' />
            </svg>
          </div>
          <h2
            className='m-0 text-xl font-bold tracking-[-0.01em]'
            style={{
              fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
            }}
          >
            Control availability
          </h2>
          <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
            Hide an item or mark it sold out in one tap. Changes show on your
            menu right away.
          </p>
        </div>

        <div className='flex flex-col gap-3 rounded-2xl border border-[#E7E5E4] bg-white p-6'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF3C7]'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#B45309'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <rect x='5' y='3' width='14' height='18' rx='2' />
              <path d='M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01' />
            </svg>
          </div>
          <h2
            className='m-0 text-xl font-bold tracking-[-0.01em]'
            style={{
              fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
            }}
          >
            Built-in calculator
          </h2>
          <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
            Customers pick items and see the running total. They can send it to
            you on WhatsApp.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className='mx-auto flex max-w-280 flex-col gap-8 px-6 pb-22'>
        <h2
          className='m-0 text-4xl font-bold tracking-[-0.02em]'
          style={{ fontFamily: 'var(--font-bricolage), system-ui, sans-serif' }}
        >
          How it works
        </h2>

        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8'>
          <div className='flex gap-4'>
            <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C1917] font-bold text-[#FFF3DC]'>
              1
            </span>
            <div>
              <h3 className='m-0 mb-1 text-lg font-bold'>
                Sign up with email or Google
              </h3>
              <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
                Create your account in a minute.
              </p>
            </div>
          </div>

          <div className='flex gap-4'>
            <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C1917] font-bold text-[#FFF3DC]'>
              2
            </span>
            <div>
              <h3 className='m-0 mb-1 text-lg font-bold'>Create your shop</h3>
              <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
                Add your details, then your groups and items with photos.
              </p>
            </div>
          </div>

          <div className='flex gap-4'>
            <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C1917] font-bold text-[#FFF3DC]'>
              3
            </span>
            <div>
              <h3 className='m-0 mb-1 text-lg font-bold'>
                Get approved and share
              </h3>
              <p className='m-0 text-[15px] leading-[1.55] text-[#44403C]'>
                Once an administrator approves your shop, share the link with
                your customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className='mx-auto max-w-280 px-6 pb-18'>
        <div className='flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-[#1C1917] px-10 py-12'>
          <div className='max-w-140'>
            <h2
              className='m-0 text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-[#FFF3DC]'
              style={{
                fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
              }}
            >
              Put your menu online today.
            </h2>
            <p className='m-0 mt-3 text-base leading-normal text-[#D6D3D1]'>
              Set up your shop, add your items, and share one link.
            </p>
          </div>
          <Link
            href='/create'
            className='rounded-xl bg-[#F59E0B] px-6 py-3.5 text-base font-bold text-[#1C1917] transition-colors hover:bg-[#D97706]'
          >
            Create your shop
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='mx-auto flex max-w-280 flex-wrap items-center justify-between gap-3 px-6 pb-10 text-sm text-[#57534E]'>
        <span className='inline-flex items-center gap-2'>
          <BrandLogo size={24} clipId='l2' />
          <span>Open Menu</span>
        </span>
        <span className='inline-flex gap-5'>
          <Link href='/demo-menu' className='text-[#44403C] hover:underline'>
            Demo menu
          </Link>
          <Link href='/signin' className='text-[#44403C] hover:underline'>
            Sign in
          </Link>
        </span>
      </footer>
    </div>
  );
}
