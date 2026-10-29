const Pricing = () => {
  return (
    <section id='pricing' className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
          <span className='text-amber-400 font-bold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20'>
            Transparent Pricing
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>
            Simple Plans for Every Venue
          </h2>
          <p className='text-slate-400 text-base'>
            Start free, upgrade as your business expands. No hidden setup fees.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <div className='glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between'>
            <div>
              <h3 className='text-xl font-bold text-white mb-1'>Starter</h3>
              <p className='text-xs text-slate-400 mb-6'>
                Perfect for small cafes & food trucks
              </p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-extrabold text-white'>$0</span>
                <span className='text-slate-400 text-sm ml-1'>
                  / forever free
                </span>
              </div>
              <ul className='space-y-3.5 text-xs text-slate-300 mb-8'>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Up to 1 Active Digital Menu
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Max 35 Menu Items
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Standard Dynamic QR Code
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Basic Stock Toggle
                </li>
              </ul>
            </div>
            <button className='w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors'>
              Get Started Free
            </button>
          </div>

          <div className='glass-panel p-8 rounded-3xl border-2 border-amber-500 relative flex flex-col justify-between glow-amber'>
            <div className='absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-navy-900 font-extrabold text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider'>
              Most Popular
            </div>
            <div>
              <h3 className='text-xl font-bold text-white mb-1'>Growth</h3>
              <p className='text-xs text-slate-400 mb-6'>
                Ideal for restaurants & busy bars
              </p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-extrabold text-white'>$19</span>
                <span className='text-slate-400 text-sm ml-1'>/ month</span>
              </div>
              <ul className='space-y-3.5 text-xs text-slate-300 mb-8'>
                <li className='flex items-center gap-2'>
                  <i data-lucide='check' className='w-4 h-4 text-amber-400'></i>{' '}
                  Unlimited Menu Items & Photos
                </li>
                <li className='flex items-center gap-2'>
                  <i data-lucide='check' className='w-4 h-4 text-amber-400'></i>{' '}
                  AI PDF & Photo Auto-Extract
                </li>
                <li className='flex items-center gap-2'>
                  <i data-lucide='check' className='w-4 h-4 text-amber-400'></i>{' '}
                  Custom Branding & Logo Colors
                </li>
                <li className='flex items-center gap-2'>
                  <i data-lucide='check' className='w-4 h-4 text-amber-400'></i>{' '}
                  Multi-language Auto Translate
                </li>
                <li className='flex items-center gap-2'>
                  <i data-lucide='check' className='w-4 h-4 text-amber-400'></i>{' '}
                  Scan Analytics & Popular Items
                </li>
              </ul>
            </div>
            <button className='w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20'>
              Start 14-Day Free Trial
            </button>
          </div>

          <div className='glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between'>
            <div>
              <h3 className='text-xl font-bold text-white mb-1'>Multi-Venue</h3>
              <p className='text-xs text-slate-400 mb-6'>
                For chains, franchises & hotels
              </p>
              <div className='flex items-baseline mb-6'>
                <span className='text-4xl font-extrabold text-white'>$49</span>
                <span className='text-slate-400 text-sm ml-1'>/ month</span>
              </div>
              <ul className='space-y-3.5 text-xs text-slate-300 mb-8'>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Multi-Location Central Control
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  POS & Order System Integration
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Dedicated Account Manager
                </li>
                <li className='flex items-center gap-2'>
                  <i
                    data-lucide='check'
                    className='w-4 h-4 text-emerald-400'
                  ></i>{' '}
                  Custom Domain & Removal of Branding
                </li>
              </ul>
            </div>
            <button className='w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors'>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
