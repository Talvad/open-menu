import { Eye, Leaf, QrCode, TrendingUp, Utensils, Zap } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};
export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        <div className='glass-card p-4 rounded-2xl border border-slate-800'>
          <div className='flex items-center justify-between text-slate-400 mb-2'>
            <span className='text-[11px] font-semibold'>Total Menu Views</span>
            <Eye className='size-4 text-amber-400' />
          </div>
          <div className='text-2xl font-extrabold text-white'>4,820</div>
          <span className='text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1'>
            <TrendingUp className='size-3' />
            +14.2% this week
          </span>
        </div>

        <div className='glass-card p-4 rounded-2xl border border-slate-800'>
          <div className='flex items-center justify-between text-slate-400 mb-2'>
            <span className='text-[11px] font-semibold'>Table QR Scans</span>
            <QrCode className='size-4 text-amber-400' />
          </div>
          <div className='text-2xl font-extrabold text-white'>1,249</div>
          <span className='text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-1'>
            <TrendingUp className='size-3' />
            +8.1% today
          </span>
        </div>

        <div className='glass-card p-4 rounded-2xl border border-slate-800'>
          <div className='flex items-center justify-between text-slate-400 mb-2'>
            <span className='text-[11px] font-semibold'>Active Menu Items</span>
            <Utensils className='size-4 text-amber-400' />
          </div>
          <div
            className='text-2xl font-extrabold text-white'
            id='metric-active-items'
          >
            4
          </div>
          <span className='text-[10px] text-amber-400 font-semibold block mt-1'>
            Across 3 categories
          </span>
        </div>

        <div className='glass-card p-4 rounded-2xl border border-slate-800'>
          <div className='flex items-center justify-between text-slate-400 mb-2'>
            <span className='text-[11px] font-semibold'>Est. Saved Paper</span>
            <Leaf className='size-4 text-amber-400' />
          </div>
          <div className='text-2xl font-extrabold text-white'>$450</div>
          <span className='text-[10px] text-amber-400 font-semibold block mt-1'>
            Zero reprint costs
          </span>
        </div>
      </div>

      <div className='glass-card p-6 rounded-3xl border border-amber-500/30 bg-linear-to-r from-amber-950/40 via-navy-900 to-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='space-y-1 text-center sm:text-left'>
          <h3 className='text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start'>
            <Zap className='size-4 text-amber-400' />
            Instant Menu Updates
          </h3>
          <p className='text-xs text-slate-300'>
            Any changes made in the Menu Builder reflect live on customer phones
            immediately.
          </p>
        </div>
        <Link href={'/dashboard/menu-builder'}>
          <button className='px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-xs whitespace-nowrap shadow-lg cursor-pointer'>
            Open Menu Builder →
          </button>
        </Link>
      </div>

      <div className='glass-card p-6 rounded-3xl border border-slate-800 space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-bold text-white'>
            Most Viewed Items Today
          </h3>
          <span className='text-xs text-slate-400'>Live Analytics</span>
        </div>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-slate-800'>
            <div className='flex items-center gap-3'>
              <span className='w-6 text-center text-xs font-extrabold text-amber-400'>
                #1
              </span>
              <div>
                <p className='text-xs font-bold text-white'>
                  Truffle Margherita Pizza
                </p>
                <p className='text-[10px] text-slate-400'>
                  Starters • 342 views
                </p>
              </div>
            </div>
            <span className='text-xs font-bold text-amber-400'>$18.50</span>
          </div>
          <div className='flex items-center justify-between p-3 rounded-xl bg-navy-950/80 border border-slate-800'>
            <div className='flex items-center gap-3'>
              <span className='w-6 text-center text-xs font-extrabold text-slate-400'>
                #2
              </span>
              <div>
                <p className='text-xs font-bold text-white'>
                  Smokey Wagyu Burger
                </p>
                <p className='text-[10px] text-slate-400'>Mains • 289 views</p>
              </div>
            </div>
            <span className='text-xs font-bold text-amber-400'>$22.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
