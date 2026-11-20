'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bricolage',
});

type ShopStatus = 'approved' | 'pending' | 'rejected' | 'suspended';

export default function OwnerOverview() {
  const [status, setStatus] = useState<ShopStatus>('approved');
  const [resubmitted, setResubmitted] = useState(false);

  const shopSlug = 'demo-cafe';
  const publicMenuUrl = `https://your-app.vercel.app/${shopSlug}`;

  const handleResubmit = () => {
    setResubmitted(true);
    setStatus('pending');
  };

  return (
    <section
      className={`${bricolage.variable} mx-auto flex max-w-[896px] flex-col gap-6 px-4 pb-14 pt-10 font-sans text-[#1C1917]`}
    >
      {/* Title & Status Badge */}
      <div className='flex flex-wrap items-center gap-3'>
        <h1
          className='m-0 text-[34px] font-bold tracking-[-0.02em]'
          style={{ fontFamily: 'var(--font-bricolage), system-ui, sans-serif' }}
        >
          Demo Cafe
        </h1>

        {status === 'approved' && (
          <span className='rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#166534]'>
            Approved
          </span>
        )}
        {status === 'pending' && (
          <span className='rounded-full bg-[#FEF3C7] px-2.5 py-1 text-xs font-semibold text-[#92400E]'>
            Pending approval
          </span>
        )}
        {status === 'rejected' && (
          <span className='rounded-full bg-[#FEE2E2] px-2.5 py-1 text-xs font-semibold text-[#991B1B]'>
            Rejected
          </span>
        )}
        {status === 'suspended' && (
          <span className='rounded-full bg-[#E7E5E4] px-2.5 py-1 text-xs font-semibold text-[#44403C]'>
            Suspended
          </span>
        )}
      </div>

      {/* Public Menu Link Card */}
      <div className='rounded-[14px] border border-[#E7E5E4] bg-white p-5'>
        <p className='m-0 text-[13px] text-[#57534E]'>Your public menu</p>
        <Link
          href={`/${shopSlug}`}
          className='mt-1 inline-block break-all text-[17px] font-semibold text-[#B45309] underline hover:text-[#92400E]'
        >
          {publicMenuUrl}
        </Link>
        <p className='m-0 mt-2 text-[13px] text-[#57534E]'>
          Share this link or turn it into a QR code for your tables and counter.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
        <Link
          href='/owner/menu'
          className='block rounded-[14px] border border-[#E7E5E4] bg-white p-5 text-[#1C1917] transition-colors hover:border-[#D6D3D1] hover:bg-stone-50/50'
        >
          <h2 className='m-0 text-[17px] font-bold'>Manage menu →</h2>
          <p className='m-0 mt-1.5 text-sm leading-normal text-[#44403C]'>
            Groups, items, prices, photos and availability.
          </p>
        </Link>

        <Link
          href='/owner/details'
          className='block rounded-[14px] border border-[#E7E5E4] bg-white p-5 text-[#1C1917] transition-colors hover:border-[#D6D3D1] hover:bg-stone-50/50'
        >
          <h2 className='m-0 text-[17px] font-bold'>Shop details →</h2>
          <p className='m-0 mt-1.5 text-sm leading-normal text-[#44403C]'>
            Name, contact, WhatsApp number and currency.
          </p>
        </Link>
      </div>

      {/* Other States Preview / Reference Section */}
      <div className='mt-4 flex flex-col gap-4 border-t border-[#E7E5E4] pt-7'>
        <h2 className='m-0 text-[13px] font-bold uppercase tracking-[0.08em] text-[#57534E]'>
          Other states the owner can see on this page
        </h2>

        {/* Pending */}
        <div className='flex flex-col gap-1.5'>
          <span className='text-[13px] font-semibold text-[#44403C]'>
            Pending
          </span>
          <p className='m-0 rounded-[10px] border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-sm leading-normal text-[#78350F]'>
            {resubmitted
              ? 'Your shop was resubmitted and is waiting for approval. You can already add groups and items; the public menu goes live once an administrator approves it.'
              : 'Your shop is waiting for approval. You can already add groups and items; the public menu goes live once an administrator approves it.'}
          </p>
        </div>

        {/* Rejected */}
        <div className='flex flex-col gap-1.5'>
          <span className='text-[13px] font-semibold text-[#44403C]'>
            Rejected
          </span>
          <div className='flex flex-col items-start gap-3 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3'>
            <p className='m-0 text-sm leading-normal text-[#7F1D1D]'>
              Your shop was not approved: the address and photos are missing.
              Update your details, then submit it again.
            </p>
            <button
              type='button'
              onClick={handleResubmit}
              className='rounded-[10px] border-0 bg-[#B45309] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#92400E]'
            >
              Submit for review again
            </button>
          </div>
        </div>

        {/* Suspended */}
        <div className='flex flex-col gap-1.5'>
          <span className='text-[13px] font-semibold text-[#44403C]'>
            Suspended
          </span>
          <p className='m-0 rounded-[10px] border border-[#D6D3D1] bg-[#F5F5F4] px-4 py-3 text-sm leading-normal text-[#292524]'>
            Your shop is suspended: reported by a customer. Please contact
            support.
          </p>
        </div>
      </div>
    </section>
  );
}
