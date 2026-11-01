import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Store',
};
export default function AllStoresPage() {
  return (
    <>
      {/* <!-- SEARCH & HERO SECTION --> */}
      <section className='relative pt-8 pb-6 bg-slate-900/40 border-b border-slate-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl space-y-3 mb-6'>
            <h1 className='text-2xl sm:text-4xl font-extrabold text-white tracking-tight'>
              Explore Digital Menus Near You
            </h1>
            <p className='text-slate-400 text-sm'>
              Browse real-time digital menus, dietary tags, and scanned table
              offerings from local venues.
            </p>
          </div>

          {/* <!-- Main Search Bar --> */}
          <div className='relative max-w-4xl'>
            <div className='relative flex items-center'>
              <i
                data-lucide='search'
                className='w-5 h-5 text-slate-400 absolute left-4 pointer-events-none'
              ></i>
              <input
                type='text'
                id='searchInput'
                placeholder='Search stores, cuisines, dishes (e.g. Wagyu, Pizza, Matcha Latte...)'
                className='w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 shadow-xl transition-all'
              />
              <button
                id='clearSearchBtn'
                className='hidden absolute right-4 text-slate-400 hover:text-white'
              >
                <i data-lucide='x' className='w-4 h-4'></i>
              </button>
            </div>
          </div>

          {/* <!-- Category Pills Bar --> */}
          <div
            id='categories'
            className='flex gap-2.5 overflow-x-auto pt-6 pb-2 custom-scroll scroll-smooth'
          >
            {/* <!-- Dynamically rendered category pills --> */}
          </div>
        </div>
      </section>

      {/* <!-- FILTER & VIEW CONTROLS --> */}
      <section className='py-4 bg-navy-900 border-b border-slate-800/80 sticky top-20 z-30 glass-panel'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            {/* <!-- Filter Dropdowns & Toggles --> */}
            <div className='flex flex-wrap items-center gap-2.5 text-xs'>
              {/* <!-- Dietary Filter --> */}
              <select
                id='dietaryFilter'
                className='px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium focus:outline-none focus:border-amber-500'
              >
                <option value='all'>All Dietary</option>
                <option value='vegan'>Vegan</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value='gluten-free'>Gluten-Free</option>
              </select>

              {/* <!-- Price Filter --> */}
              <select
                id='priceFilter'
                className='px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium focus:outline-none focus:border-amber-500'
              >
                <option value='all'>All Prices</option>
                <option value='$'>$ (Inexpensive)</option>
                <option value='$$'>$$ (Moderate)</option>
                <option value='$$$'>$$$ (Upscale)</option>
              </select>

              {/* <!-- Rating Filter Toggle --> */}
              <button
                id='ratingToggle'
                className='px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium flex items-center gap-1.5 hover:border-amber-500 transition-colors'
              >
                <i
                  data-lucide='star'
                  className='w-3.5 h-3.5 text-amber-400 fill-amber-400'
                ></i>
                <span>4.5+ Rating</span>
              </button>

              {/* <!-- Open Now Toggle --> */}
              <button
                id='openNowToggle'
                className='px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium flex items-center gap-1.5 hover:border-emerald-500 transition-colors'
              >
                <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
                <span>Open Now</span>
              </button>
            </div>

            {/* <!-- Sorting & View Switcher --> */}
            <div className='flex items-center gap-3 ml-auto text-xs'>
              <div className='flex items-center gap-1.5 text-slate-400'>
                <span className='hidden sm:inline'>Sort:</span>
                <select
                  id='sortSelect'
                  className='px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-medium focus:outline-none focus:border-amber-500'
                >
                  <option value='recommended'>Recommended</option>
                  <option value='rating'>Highest Rated</option>
                  <option value='distance'>Nearest Distance</option>
                </select>
              </div>

              {/* <!-- View Switcher Tabs (Grid vs Map) --> */}
              <div className='flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700'>
                <button
                  id='viewGridBtn'
                  className='p-1.5 rounded-lg bg-amber-500 text-navy-900 transition-all'
                >
                  <i data-lucide='grid' className='w-4 h-4'></i>
                </button>
                <button
                  id='viewMapBtn'
                  className='p-1.5 rounded-lg text-slate-400 hover:text-white transition-all'
                >
                  <i data-lucide='map' className='w-4 h-4'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- MAIN CONTENT AREA --> */}
      <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* <!-- Results Counter --> */}
        <div className='flex justify-between items-center mb-6'>
          <p className='text-xs text-slate-400'>
            Showing{' '}
            <span id='resultsCount' className='font-bold text-white'>
              0
            </span>{' '}
            venues matching your criteria
          </p>
        </div>

        {/* <!-- GRID VIEW CONTENT --> */}
        <div id='gridView' className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* <!-- Dynamic Store Cards Rendered Here --> */}
        </div>

        {/* <!-- MAP VIEW CONTENT (SIMULATED INTERACTIVE MAP) --> */}
        <div
          id='mapView'
          className='hidden rounded-3xl border border-slate-800 overflow-hidden h-[600px] relative map-grid-bg shadow-2xl'
        >
          {/* <!-- Simulated Map Pin overlay --> */}
          <div id='mapPinContainer' className='absolute inset-0 p-8 relative'>
            <div className='absolute top-4 left-4 z-10 glass-panel px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping'></span>
              <span>Interactive Venue Radar • Click pins to preview menu</span>
            </div>
            {/* <!-- Dynamic Pins map layout --> */}
            <div id='mapPinsGrid' className='w-full h-full relative'></div>
          </div>
        </div>

        {/* <!-- EMPTY STATE (No search results found) --> */}
        <div id='emptyState' className='hidden py-16 text-center space-y-4'>
          <div className='w-16 h-16 rounded-full bg-slate-800 text-amber-400 mx-auto flex items-center justify-center'>
            <i data-lucide='search-x' className='w-8 h-8'></i>
          </div>
          <h3 className='text-lg font-bold text-white'>
            No venues match your filters
          </h3>
          <p className='text-slate-400 text-xs max-w-md mx-auto'>
            Try clearing your search query or relaxing your dietary and price
            filter options.
          </p>
          <button className='px-5 py-2.5 bg-amber-500 text-navy-900 rounded-xl font-bold text-xs hover:bg-amber-400'>
            Reset All Filters
          </button>
        </div>

        {/* <!-- ADD YOUR STORE CTA BANNER --> */}
        <section className='mt-16 rounded-3xl glass-panel border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden'>
          <div className='space-y-2 text-center md:text-left z-10'>
            <span className='px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20'>
              Own a Restaurant or Cafe?
            </span>
            <h3 className='text-2xl font-extrabold text-white'>
              List Your Menu on Open Menu Free
            </h3>
            <p className='text-slate-400 text-xs sm:text-sm max-w-xl'>
              Join hundreds of merchants sharing instant QR digital menus,
              real-time stock updates, and foreign translation tools.
            </p>
          </div>
          <a
            href='index.html#demo'
            className='px-6 py-3.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-900 font-extrabold text-xs rounded-xl shadow-lg shrink-0 z-10 flex items-center gap-2'
          >
            <span>Upload Menu Now</span>
            <i data-lucide='arrow-right' className='w-4 h-4'></i>
          </a>
        </section>
      </main>
    </>
  );
}
