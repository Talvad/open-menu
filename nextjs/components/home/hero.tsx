import {
  ArrowRight,
  Globe,
  QrCode,
  Smartphone,
  Star,
  StarCheck,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Chip from '../ui/chip';

const Hero = () => {
  return (
    <section className='relative py-12 overflow-hidden'>
      <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none'></div>
      <div className='absolute top-1/3 right-10 w-100 h-100 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          <div className='lg:col-span-7 text-center lg:text-left space-y-6'>
            <Chip>
              <span className='w-2 h-2 rounded-full bg-amber-400 animate-pulse'></span>
              AI-POWERED MENU MANAGEMENT PLATFORM
            </Chip>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]'>
              Your Menu, Everywhere. <br className='hidden sm:inline' />
              <span className='text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-orange-400'>
                In Seconds.
              </span>
            </h1>

            <p className='text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed'>
              Transform paper menus, photos, or spreadsheets into interactive
              digital contactless menus. Empower guests with real-time stock
              updates, instant translations, and table QR codes.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2'>
              <a
                href='#demo'
                className='w-full sm:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-900 font-bold text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2'
              >
                <span>Upload Your Menu Free</span>
                <ArrowRight className='size-5' />
              </a>
              <a
                href='#preview-modal'
                className='w-full sm:w-auto px-7 py-4 rounded-xl glass-panel-light hover:bg-white/10 text-white font-semibold text-base transition-all border border-white/15 text-center flex items-center justify-center gap-2'
              >
                <Smartphone className='size-5 text-amber-400' />
                <span>View Live Customer Menu</span>
              </a>
            </div>

            <div className='pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-400 text-sm'>
              <div className='flex items-center gap-2'>
                <div className='flex -space-x-2'>
                  <span className='w-8 h-8 rounded-full bg-slate-700 border-2 border-navy-900 flex items-center justify-center text-xs font-bold text-amber-400'>
                    ☕
                  </span>
                  <span className='w-8 h-8 rounded-full bg-slate-700 border-2 border-navy-900 flex items-center justify-center text-xs font-bold text-emerald-400'>
                    🍕
                  </span>
                  <span className='w-8 h-8 rounded-full bg-slate-700 border-2 border-navy-900 flex items-center justify-center text-xs font-bold text-orange-400'>
                    🍔
                  </span>
                </div>
                <span className='font-medium text-slate-300'>
                  Trusted by 2,400+ venues
                </span>
              </div>
              <div className='flex items-center gap-1.5 text-amber-400'>
                <div className='flex'>
                  <Star className='size-4 text-amber-400 ' />
                  <Star className='size-4 text-amber-400' />
                  <Star className='size-4 text-amber-400' />
                  <Star className='size-4 text-amber-400' />
                  <Star className='size-4 text-amber-400' />
                </div>
                <span className='text-slate-300 font-semibold text-xs'>
                  4.9/5 Merchant Rating
                </span>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 flex justify-center'>
            <div className='relative w-full max-w-85'>
              <div className='relative z-10 rounded-[40px] p-3 bg-linear-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/80 glow-amber'>
                <div className='relative rounded-[32px] bg-navy-900 overflow-hidden border border-slate-800 h-155 flex flex-col'>
                  <div className='w-32 h-5 bg-slate-900 rounded-b-xl mx-auto absolute top-0 left-0 right-0 z-20 flex justify-center items-center'>
                    <div className='w-3 h-3 bg-black rounded-full mr-2'></div>
                    <div className='w-8 h-1 bg-slate-700 rounded-full'></div>
                  </div>

                  <div className='pt-8 px-4 pb-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs'>
                        LG
                      </div>
                      <div>
                        <h4 className='text-xs font-bold text-white'>
                          Le Bistro Gourmet
                        </h4>
                        <p className='text-[10px] text-emerald-400 flex items-center gap-1'>
                          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>{' '}
                          Open Now • Table 12
                        </p>
                      </div>
                    </div>
                    <button className='p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 text-xs'>
                      <Globe className='size-4' />
                    </button>
                  </div>

                  <div className='p-4 overflow-y-auto space-y-4 custom-scroll flex-1 text-left'>
                    <div className='flex gap-2 overflow-x-auto pb-1 text-xs'>
                      <span className='px-3 py-1 rounded-full bg-amber-500 text-navy-900 font-bold whitespace-nowrap'>
                        🔥 Popular
                      </span>
                      <span className='px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium whitespace-nowrap'>
                        Starters
                      </span>
                      <span className='px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium whitespace-nowrap'>
                        Mains
                      </span>
                      <span className='px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium whitespace-nowrap'>
                        Drinks
                      </span>
                    </div>

                    <div className='p-3 rounded-2xl glass-panel-light flex gap-3 items-center border border-slate-800 hover:border-amber-500/30 transition-all'>
                      <div className='w-16 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative'>
                        <Image
                          src={'/images/artisan-pizza.jpg'}
                          alt='Artisan Pizza'
                          fill
                          className='objec-cover'
                          sizes='size-16'
                        />
                        <span className='absolute top-1 left-1 bg-emerald-500 text-[9px] font-extrabold text-navy-900 px-1 rounded'>
                          VEG
                        </span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex justify-between items-start'>
                          <h5 className='text-xs font-bold text-white truncate'>
                            Truffle Margherita
                          </h5>
                          <span className='text-xs font-extrabold text-amber-400'>
                            $18.50
                          </span>
                        </div>
                        <p className='text-[10px] text-slate-400 line-clamp-2 mt-0.5'>
                          San Marzano tomatoes, fresh mozzarella, wild
                          mushrooms.
                        </p>
                      </div>
                    </div>

                    <div className='p-3 rounded-2xl glass-panel-light flex gap-3 items-center border border-slate-800 hover:border-amber-500/30 transition-all'>
                      <div className='w-16 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative'>
                        <Image
                          src={'/images/gourmet-burger.jpg'}
                          alt='Gourmet Burger'
                          fill
                          className='objec-cover'
                          sizes='size-16'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex justify-between items-start'>
                          <h5 className='text-xs font-bold text-white truncate'>
                            Smokey Wagyu Burger
                          </h5>
                          <span className='text-xs font-extrabold text-amber-400'>
                            $22.00
                          </span>
                        </div>
                        <p className='text-[10px] text-slate-400 line-clamp-2 mt-0.5'>
                          Aged cheddar, caramelized onions, brioche bun.
                        </p>
                      </div>
                    </div>

                    <div className='p-3 rounded-2xl glass-panel-light flex gap-3 items-center border border-slate-800 opacity-60'>
                      <div className='w-16 h-16 rounded-xl bg-slate-800 overflow-hidden shrink-0 relative'>
                        <Image
                          src={'/images/dessert.jpg'}
                          alt='Dessert'
                          fill
                          className='objec-cover'
                          sizes='size-16'
                        />

                        <span className='absolute inset-0 bg-slate-900/80 flex items-center justify-center text-[9px] font-bold text-red-400 uppercase'>
                          Sold Out
                        </span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex justify-between items-start'>
                          <h5 className='text-xs font-bold text-slate-300 line-through'>
                            Berry Cheesecake
                          </h5>
                          <span className='text-xs font-bold text-slate-500'>
                            $9.00
                          </span>
                        </div>
                        <p className='text-[10px] text-slate-500 line-clamp-1 mt-0.5'>
                          Fresh raspberry coulis, vanilla bean.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <QrCode className='size-8 rounded bg-white p-1 text-black' />

                      <div className='text-left'>
                        <p className='text-[10px] text-slate-400'>
                          Table QR Active
                        </p>
                        <p className='text-[11px] font-bold text-amber-400'>
                          Scan to Order / View
                        </p>
                      </div>
                    </div>
                    <span className='text-[10px] px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full font-bold'>
                      Instant Sync
                    </span>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-15 -left-10 z-20 bg-gray-900/10 backdrop-blur-lg p-3.5 rounded-2xl border border-amber-500/30  items-center gap-3 shadow-xl hidden sm:flex'>
                <div className='w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center'>
                  <Zap className='size-5' />
                </div>
                <div>
                  <div className='text-xs font-bold text-white'>
                    Menu Updated!
                  </div>
                  <div className='text-[10px] text-slate-400'>
                    Price changed live instantly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
