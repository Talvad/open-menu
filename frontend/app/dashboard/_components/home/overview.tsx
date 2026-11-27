import Link from 'next/link';
import { ArrowUpRight, Check, Clock3, Eye, PencilLine } from 'lucide-react';

import { env } from '@/lib/env';
import { Shop } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';
import { ResubmitButton } from './resubmit-form';

type Props = { shop: Shop };

export default function OwnerOverview({ shop }: Props) {
  const publicMenuUrl = `${env.appUrl}/${shop.slug}`;

  return (
    <div className='space-y-8'>
      <section className='relative isolate overflow-hidden rounded-[2rem] bg-forest px-6 py-8 text-paper sm:px-9 sm:py-10'>
        <div
          aria-hidden='true'
          className='absolute -right-10 -top-20 -z-10 h-64 w-64 rounded-full border-[28px] border-white/[0.06]'
        />
        <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#efb08c]'>
          Your shop, your way
        </p>
        <div className='mt-3 flex flex-wrap items-center gap-3'>
          <h1 className='font-bricolage text-3xl font-bold tracking-[-0.06em] sm:text-5xl'>
            {shop.name}
          </h1>
          <StatusBadge status={shop.status} />
        </div>
        <p className='mt-3 max-w-xl text-sm leading-6 text-white/70'>
          A good menu is always a work in progress. Here’s where yours stands.
        </p>
      </section>

      {shop.status === 'PENDING' && (
        <div className='flex gap-4 rounded-2xl border border-[#e6d6ba] bg-[#fbf0dc] p-5 text-sm text-[#72532e]'>
          <Clock3 aria-hidden='true' className='mt-0.5 h-5 w-5 shrink-0' />
          <p>
            Your shop is in the review queue. You can keep adding groups and
            items while we take a look; your public menu goes live once approved.
          </p>
        </div>
      )}

      {shop.status === 'REJECTED' && (
        <div className='space-y-3 rounded-2xl border border-[#edc8bd] bg-[#fbebe6] p-5 text-sm text-[#853c31]'>
          <div className='flex gap-3'>
            <span className='font-semibold'>A quick update needed.</span>
            <span>
              {shop.statusReason
                ? shop.statusReason
                : 'Your shop needs a few changes before approval.'}{' '}
              Update your details, then send it back for review.
            </span>
          </div>
          <ResubmitButton shopId={shop.id} />
        </div>
      )}

      {shop.status === 'SUSPENDED' && (
        <div className='flex gap-4 rounded-2xl border border-[#ded5c7] bg-[#eee8dd] p-5 text-sm text-[#5f5c52]'>
          <span className='font-semibold'>Your menu is paused.</span>
          <span>
            {shop.statusReason
              ? shop.statusReason
              : 'Please contact support to get your shop back online.'}
          </span>
        </div>
      )}

      {shop.status === 'APPROVED' && (
        <section className='rounded-2xl border border-[#d9e2d3] bg-[#edf1e8] p-5 sm:p-6'>
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div>
              <p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest'>
                <Check aria-hidden='true' className='h-4 w-4' />
                Your menu is live
              </p>
              <Link
                href={`/${shop.slug}`}
                className='mt-2 inline-block break-all font-bricolage text-xl font-bold tracking-[-0.03em] text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest'
              >
                {publicMenuUrl}
              </Link>
              <p className='mt-2 max-w-xl text-sm leading-6 text-[#586657]'>
                Share your link anywhere—or print a QR code for your tables and
                counter.
              </p>
            </div>
            <Link
              href={`/${shop.slug}`}
              className='inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-[#19382e]'
            >
              <Eye aria-hidden='true' className='h-4 w-4' />
              View menu
              <ArrowUpRight aria-hidden='true' className='h-4 w-4' />
            </Link>
          </div>
        </section>
      )}

      <section>
        <div className='mb-4'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-primary'>
            Keep things fresh
          </p>
          <h2 className='mt-1 font-bricolage text-2xl font-bold tracking-[-0.05em] text-forest'>
            Your next steps
          </h2>
        </div>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Link
            href='/dashboard/menu'
            className='group rounded-2xl border border-[#e6ddd0] bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-[#c5b8a5] hover:shadow-[0_12px_30px_rgba(47,54,43,0.07)]'
          >
            <span className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5dfd9] text-primary'>
              <PencilLine aria-hidden='true' className='h-5 w-5' />
            </span>
            <div className='mt-5 flex items-center justify-between gap-3'>
              <h3 className='font-bricolage text-xl font-bold tracking-[-0.04em] text-forest'>
                Shape your menu
              </h3>
              <ArrowUpRight
                aria-hidden='true'
                className='h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              />
            </div>
            <p className='mt-2 text-sm leading-6 text-[#716e63]'>
              Arrange groups, add photos, tune prices, and keep availability up
              to date.
            </p>
          </Link>
          <Link
            href='/dashboard/settings'
            className='group rounded-2xl border border-[#e6ddd0] bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-[#c5b8a5] hover:shadow-[0_12px_30px_rgba(47,54,43,0.07)]'
          >
            <span className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5eadf] text-forest'>
              <PencilLine aria-hidden='true' className='h-5 w-5' />
            </span>
            <div className='mt-5 flex items-center justify-between gap-3'>
              <h3 className='font-bricolage text-xl font-bold tracking-[-0.04em] text-forest'>
                Shop details
              </h3>
              <ArrowUpRight
                aria-hidden='true'
                className='h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              />
            </div>
            <p className='mt-2 text-sm leading-6 text-[#716e63]'>
              Keep your shop name, contact details, and address just right.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
