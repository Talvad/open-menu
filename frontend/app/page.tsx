import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Layers3,
  MessageCircle,
  QrCode,
  Sparkles,
} from 'lucide-react';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import { BrandLockup } from '@/components/brand-mark';

const benefits = [
  {
    number: '01',
    icon: Layers3,
    title: 'Your whole menu, in good order.',
    body: 'Give every dish, drink, room, or product a place of its own. Easy to browse, even easier to keep fresh.',
  },
  {
    number: '02',
    icon: CircleDot,
    title: 'The details are in your hands.',
    body: 'Update a price, hide a favourite, or mark something sold out. Your menu follows along.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'From “that looks good” to your inbox.',
    body: 'Guests can build a quick order total and send it straight to you on WhatsApp.',
  },
];

export default function HomePage() {
  return (
    <div className='min-h-screen overflow-hidden'>
      <AppHeader>
        <BrandLockup />
      </AppHeader>

      <main>
        <section className='relative isolate mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-28 lg:pt-24'>
          <div aria-hidden='true' className='pointer-events-none absolute -left-44 top-8 -z-10 h-96 w-96 rounded-full bg-[#e9dfcc]/70 blur-3xl' />
          <div className='max-w-2xl'>
            <p className='mb-6 inline-flex items-center gap-2 rounded-full border border-[#dfd2c0] bg-paper/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-forest'>
              <Sparkles aria-hidden='true' className='h-4 w-4 text-primary' />
              A fresh take on the shop menu
            </p>
            <h1 className='font-bricolage text-[clamp(3.2rem,7vw,6.6rem)] font-bold leading-[0.94] tracking-[-0.075em] text-forest'>
              Good things
              <br />
              deserve a
              <br />
              <span className='relative text-primary'>
                good menu.
                <svg
                  aria-hidden='true'
                  viewBox='0 0 360 17'
                  className='absolute -bottom-2 left-0 w-full'
                  fill='none'
                >
                  <path
                    d='M4 12.5C96 3.5 238 2.5 355 10'
                    stroke='#d99167'
                    strokeWidth='5'
                    strokeLinecap='round'
                  />
                </svg>
              </span>
            </h1>
            <p className='mt-8 max-w-xl text-lg leading-8 text-[#626258] sm:text-xl sm:leading-9'>
              From a family-run cafe to a corner store, make it a joy to see
              what’s on the menu—and simple to keep it that way.
            </p>
            <div className='mt-9 flex flex-wrap items-center gap-3'>
              <Link
                href='/auth/login?mode=signup&next=/dashboard'
                className='inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(174,65,48,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#a43d30]'
              >
                Make your menu
                <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
              </Link>
              <Link
                href='/demo-menu'
                className='inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-forest transition-colors hover:bg-[#eae2d5]'
              >
                Take a look around
                <ArrowDownRight aria-hidden='true' className='h-4 w-4' />
              </Link>
            </div>
            <p className='mt-4 text-xs text-[#716e63]'>
              Already use Google?{' '}
              <Link
                href='/auth/login?provider=google&next=/dashboard'
                className='font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest'
              >
                Sign up with Google
              </Link>
            </p>
            <p className='mt-6 flex items-center gap-2 text-xs font-medium text-[#716e63]'>
              <Check aria-hidden='true' className='h-4 w-4 text-forest' />
              Free to set up · Reviewed before your menu goes live
            </p>
          </div>

          <div className='relative mx-auto w-full max-w-[34rem] lg:ml-auto'>
            <div
              aria-hidden='true'
              className='absolute -right-3 top-2 h-44 w-44 rounded-full bg-[#ead5b1] sm:-right-8 sm:h-56 sm:w-56'
            />
            <div
              aria-hidden='true'
              className='absolute -bottom-5 left-2 h-28 w-28 rounded-full bg-[#dbe1cf] sm:-left-10 sm:h-36 sm:w-36'
            />
            <div className='relative rounded-[2rem] border border-[#e6ddd0] bg-[#f0e7d8] p-3 shadow-[0_30px_90px_rgba(48,55,43,0.12)] sm:p-5'>
              <div className='grid grid-cols-[0.8fr_1.2fr] gap-3 sm:gap-4'>
                <div className='flex min-h-[22rem] flex-col justify-between rounded-[1.5rem] bg-forest p-4 text-paper sm:min-h-[27rem] sm:p-6'>
                  <div>
                    <span className='inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75'>
                      <span className='h-1.5 w-1.5 rounded-full bg-[#e89d72]' />
                      Today’s menu
                    </span>
                    <h2 className='mt-7 font-bricolage text-3xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-4xl'>
                      Little
                      <br />
                      morning
                      <br />
                      ritual.
                    </h2>
                    <p className='mt-3 text-xs leading-5 text-white/65 sm:text-sm'>
                      Good coffee. Warm bread. No guesswork.
                    </p>
                  </div>
                  <div className='rounded-2xl bg-[#315849] p-3 sm:p-4'>
                    <div className='flex items-center justify-between text-[10px] text-white/65 sm:text-xs'>
                      <span>OPEN TODAY</span>
                      <span>8 am – 4 pm</span>
                    </div>
                    <div className='mt-3 flex items-center gap-2 text-xs font-semibold sm:text-sm'>
                      <QrCode aria-hidden='true' className='h-4 w-4 text-[#efb08c]' />
                      Scan to explore
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4'>
                  <div className='relative flex min-h-40 flex-1 items-end overflow-hidden rounded-[1.5rem] bg-[#cf704d] p-4 sm:min-h-52 sm:p-6'>
                    <div
                      aria-hidden='true'
                      className='absolute -right-8 -top-10 h-44 w-44 rounded-full border-[18px] border-[#edb98f]/65 bg-[#f2d5a7] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.26)] sm:h-56 sm:w-56'
                    >
                      <div className='absolute left-1/4 top-1/3 h-5 w-8 rotate-[-28deg] rounded-full bg-[#6b8b59]' />
                      <div className='absolute right-1/4 top-1/2 h-4 w-7 rotate-[32deg] rounded-full bg-[#789761]' />
                      <div className='absolute bottom-1/4 left-1/2 h-3 w-3 rounded-full bg-[#c94f3d]' />
                    </div>
                    <div className='relative'>
                      <span className='rounded-full bg-paper/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-forest'>
                        Made to be browsed
                      </span>
                    </div>
                  </div>
                  <div className='rounded-[1.5rem] bg-paper p-4 shadow-sm sm:p-5'>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-[#858174]'>
                      From the counter
                    </p>
                    <div className='mt-3 divide-y divide-[#eee7dc]'>
                      {[
                        ['Avocado toast', '₹180'],
                        ['House filter coffee', '₹60'],
                        ['Orange & cardamom cake', '₹120'],
                      ].map(([name, price], index) => (
                        <div
                          key={name}
                          className='flex items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0'
                        >
                          <span className='flex items-center gap-2 text-xs font-semibold text-forest sm:text-sm'>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                index === 1 ? 'bg-[#83986d]' : 'bg-primary'
                              }`}
                            />
                            {name}
                          </span>
                          <span className='text-xs font-medium text-[#777468] sm:text-sm'>
                            {price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className='mt-4 flex items-center justify-between rounded-full bg-[#f1ece2] px-4 py-2.5 text-xs font-semibold text-forest sm:text-sm'>
                      <span>See the whole menu</span>
                      <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
                    </div>
                  </div>
                </div>
              </div>
              <p className='px-2 pb-1 pt-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#747064]'>
                A little more appetite in every menu
              </p>
            </div>
            <div className='absolute -left-3 top-1/2 hidden -translate-y-1/2 -rotate-6 rounded-2xl border border-[#e6ddd0] bg-paper px-4 py-3 shadow-[0_12px_30px_rgba(48,55,43,0.12)] sm:block lg:-left-10'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.15em] text-[#858174]'>
                Good to know
              </p>
              <p className='mt-1 font-bricolage text-sm font-bold text-forest'>
                Always up to date.
              </p>
            </div>
          </div>
        </section>

        <section id='why-open-menu' className='bg-paper'>
          <div className='mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
                  The good stuff
                </p>
                <h2 className='mt-3 max-w-2xl font-bricolage text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-forest sm:text-5xl'>
                  All the flavour.
                  <br />
                  None of the fuss.
                </h2>
              </div>
              <p className='max-w-sm text-sm leading-6 text-[#716e63]'>
                Your business has its own rhythm. Your menu should be easy to
                shape around it.
              </p>
            </div>
            <div className='mt-12 grid gap-4 md:grid-cols-3'>
              {benefits.map(({ number, icon: Icon, title, body }) => (
                <article
                  key={number}
                  className='group rounded-[1.5rem] border border-[#e6ddd0] bg-background p-6 transition-transform hover:-translate-y-1 sm:p-7'
                >
                  <div className='flex items-center justify-between'>
                    <span className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5eadf] text-forest'>
                      <Icon aria-hidden='true' className='h-5 w-5' />
                    </span>
                    <span className='font-bricolage text-sm font-bold text-[#aaa293]'>
                      {number}
                    </span>
                  </div>
                  <h3 className='mt-9 max-w-xs font-bricolage text-2xl font-bold leading-tight tracking-[-0.04em] text-forest'>
                    {title}
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-[#716e63]'>
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className='mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[0.75fr_1.25fr] lg:px-12 lg:py-24'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
              Three easy steps
            </p>
            <h2 className='mt-3 font-bricolage text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-forest sm:text-5xl'>
              From your shop
              <br />
              to every screen.
            </h2>
          </div>
          <ol className='divide-y divide-[#ded5c7]'>
            {[
              ['Tell us about your shop', 'A few details are all we need to get started.'],
              ['Add what you offer', 'Arrange your items into groups, with the prices and details people need.'],
              ['Share it with the world', 'Once approved, your live link is ready for tables, counters, and customers.'],
            ].map(([title, body], index) => (
              <li key={title} className='flex gap-5 py-5 first:pt-0 last:pb-0'>
                <span className='font-bricolage text-sm font-bold text-primary'>
                  0{index + 1}
                </span>
                <div>
                  <h3 className='font-bricolage text-xl font-bold tracking-[-0.03em] text-forest'>
                    {title}
                  </h3>
                  <p className='mt-1.5 max-w-lg text-sm leading-6 text-[#716e63]'>
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className='px-4 pb-14 sm:px-8 lg:px-12'>
          <div className='relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-forest px-6 py-12 text-paper sm:px-10 sm:py-16 lg:px-16'>
            <div aria-hidden='true' className='absolute -right-14 -top-32 h-80 w-80 rounded-full border-[35px] border-white/[0.06]' />
            <div aria-hidden='true' className='absolute -bottom-28 right-40 h-56 w-56 rounded-full bg-[#c94f3d]/25 blur-2xl' />
            <div className='relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
              <div className='max-w-2xl'>
                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#efb08c]'>
                  Your next great first impression
                </p>
                <h2 className='mt-3 font-bricolage text-4xl font-bold leading-[1.02] tracking-[-0.06em] sm:text-6xl'>
                  Let’s make
                  <br />
                  your menu memorable.
                </h2>
                <p className='mt-4 max-w-lg text-sm leading-6 text-white/70 sm:text-base'>
                  Start with your shop details. Add the good stuff whenever
                  you’re ready.
                </p>
              </div>
              <div className='flex flex-col items-start gap-3 sm:items-end'>
                <Link
                  href='/auth/login?mode=signup&next=/dashboard'
                  className='inline-flex items-center gap-3 rounded-full bg-[#f0c49f] px-6 py-3.5 text-sm font-bold text-forest transition-colors hover:bg-paper'
                >
                  Create your shop
                  <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
                </Link>
                <Link
                  href='/demo-menu'
                  className='text-xs font-semibold text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white'
                >
                  Or explore the demo menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
