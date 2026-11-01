import {
  ArrowLeft,
  Calendar,
  Clock,
  Info,
  MapPin,
  Search,
  Star,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store Name',
};
export default function StorePage() {
  return (
    <>
      <section className='min-h-svh w-full relative pt-20 pb-20 overflow-hidden'>
        <div className='max-w-xl mx-auto relative min-h-screen border-x border-slate-800/80 bg-navy-950 shadow-2xl'>
          {/* <!-- 1. HERO & RESTAURANT BRANDING --> */}
          <header className='relative'>
            <div className='h-56 w-full relative overflow-hidden'>
              <img
                src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
                alt='The Artisanal Bistro Interior'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/50 to-black/30'></div>

              {/* <!-- Table / Mode Indicator --> */}
              <div className='absolute top-4 right-4 bg-navy-900/90 text-amber-400 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-lg'>
                <span className='w-2 h-2 rounded-full bg-amber-400 animate-pulse'></span>
                <span>Dine-In & Takeout</span>
              </div>

              <a
                href='index.html'
                className='absolute top-4 left-4 bg-navy-900/80 text-white p-2.5 rounded-xl border border-white/10 backdrop-blur-md hover:bg-navy-900 transition-colors'
              >
                <ArrowLeft className='size-4' />
              </a>
            </div>

            {/* <!-- Profile Info --> */}
            <div className='px-5 -mt-12 relative z-10 space-y-4'>
              <div className='flex items-end justify-between'>
                <div className='w-24 h-24 rounded-3xl bg-navy-900 border-2 border-amber-400 p-1 shadow-2xl flex items-center justify-center font-extrabold text-4xl text-amber-400'>
                  🍷
                </div>
                <div className='flex items-center gap-2'>
                  <button className='px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-colors'>
                    <Calendar className='size-3.5' />

                    <span>Reserve Table</span>
                  </button>
                  <button className='p-2 rounded-xl glass-card text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-colors'>
                    <Info className='size-4' />
                  </button>
                </div>
              </div>

              <div className='space-y-1.5 text-left'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-2xl font-extrabold text-white tracking-tight'>
                    The Artisanal Bistro
                  </h1>
                  <span className='text-xs bg-amber-500/20 text-amber-400 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30'>
                    Open Now
                  </span>
                </div>
                <p className='text-xs text-slate-400 flex items-center gap-2'>
                  <span>🍳 Fine Dining & Craft Cocktails</span>
                  <span>•</span>
                  <span className='flex items-center gap-1 text-amber-400 font-bold'>
                    <Star className='size-3 fill-amber-400' /> 4.9 (480 reviews)
                  </span>
                </p>
                <div className='flex items-center justify-between text-[11px] text-slate-400 pt-1'>
                  <span className='flex items-center gap-1'>
                    <Clock className='size-3.5 text-amber-400' />

                    <span>11:00 AM - 11:00 PM</span>
                  </span>
                  <span className='flex items-center gap-1'>
                    <MapPin className='size-3.5 text-amber-400' />

                    <span>45 Grand Avenue</span>
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* <!-- 2. SEARCH & DIETARY FILTERS --> */}
          <div className='p-5 space-y-3'>
            <div className='relative'>
              <Search className='size-4 absolute left-3.5 top-3.5 text-slate-500' />

              <input
                type='text'
                id='menu-search'
                placeholder='Search dishes, pasta, wine, desserts...'
                className='w-full glass-input pl-10 pr-4 py-2.5 rounded-2xl text-xs text-white placeholder-slate-500'
              />
            </div>

            <div
              className='flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs'
              id='dietary-pills-container'
            >
              {/* <!-- Dynamic Dietary Filter Pills --> */}
            </div>
          </div>

          {/* <!-- 3. STICKY CATEGORY NAV --> */}
          <nav
            className='sticky top-0 z-30 bg-navy-900/95 backdrop-blur-md border-y border-slate-800 px-5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar'
            id='category-sticky-bar'
          >
            {/* <!-- Dynamic Category Navigation Tabs --> */}
          </nav>

          {/* <!-- 4. MENU ITEMS CONTAINER --> */}
          <main
            className='p-5 space-y-8 text-left'
            id='menu-sections-container'
          >
            {/* <!-- Dynamic Category Groups & Dish Items --> */}
          </main>
        </div>
      </section>
    </>
  );
}
