import { Sparkles, Zap, RefreshCcw, Percent, QrCode } from 'lucide-react';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <section className='relative z-10 my-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden max-w-7xl mx-auto w-full'>
        <div className='grid lg:grid-cols-12 gap-8 items-start'>
          <div className='lg:col-span-7 xl:col-span-6 space-y-6'>
            <div className='space-y-2 text-left'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold'>
                <Sparkles className='size-3.5' />

                <span>Start Free - No Credit Card Needed</span>
              </div>
              <h1
                id='auth-heading'
                className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'
              >
                Get Started with Open Menu
              </h1>
              <p
                id='auth-subheading'
                className='text-sm sm:text-base text-slate-400'
              >
                Join over 2,400+ restaurants transforming their dining
                experience.
              </p>
            </div>

            <div className='glass-card rounded-3xl p-6 sm:p-8 shadow-2xl glow-amber border border-slate-700/60 backdrop-blur-lg bg-gray-900'>
              {children}
            </div>

            <div className='grid grid-cols-3 gap-3 pt-2 text-center'>
              <div className='p-3 rounded-2xl glass-card border border-slate-800'>
                <Zap className='w-4 h-4 text-amber-400 mx-auto mb-1' />

                <p className='text-[11px] font-bold text-white'>Instant QR</p>
                <p className='text-[9px] text-slate-400'>Ready in seconds</p>
              </div>
              <div className='p-3 rounded-2xl glass-card border border-slate-800'>
                <RefreshCcw className='w-4 h-4 text-amber-400 mx-auto mb-1' />

                <p className='text-[11px] font-bold text-white'>
                  Real-Time Sync
                </p>
                <p className='text-[9px] text-slate-400'>Zero menu reprints</p>
              </div>
              <div className='p-3 rounded-2xl glass-card border border-slate-800'>
                <Percent className='w-4 h-4 text-amber-400 mx-auto mb-1' />

                <p className='text-[11px] font-bold text-white'>
                  0% Commission
                </p>
                <p className='text-[9px] text-slate-400'>Keep 100% earnings</p>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 xl:col-span-6 flex flex-col items-center justify-center'>
            <div className='w-full max-w-sm sticky top-8 space-y-4'>
              <div className='flex items-center justify-between px-2'>
                <span className='text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5'>
                  <span className='w-2 h-2 rounded-full bg-amber-400 animate-pulse'></span>
                  Live Profile & Table QR Preview
                </span>
                <span className='text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20'>
                  Auto Sync
                </span>
              </div>

              <div className='glass-card rounded-3xl p-6 border border-slate-700/80 shadow-2xl relative overflow-hidden group'>
                <div className='h-24 -mx-6 -mt-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 relative p-4 flex justify-between items-start'>
                  <span className='text-[10px] bg-navy-950/70 text-white font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border border-gray-300'>
                    openmenu.io/preview
                  </span>
                  <div className='w-10 h-10 rounded-full p-1 bg-navy-900/60 backdrop-blur-md flex items-center justify-center text-amber-400 text-xs'>
                    ★ 4.9
                  </div>
                </div>

                <div className='relative -mt-8 mb-4 flex justify-between items-end'>
                  <div
                    className='w-16 h-16 rounded-2xl bg-navy-900 border-2 border-amber-400 p-1 shadow-xl flex items-center justify-center text-2xl font-extrabold text-amber-400'
                    id='preview-avatar'
                  >
                    B
                  </div>
                  <span
                    className='text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 '
                    id='preview-badge'
                  >
                    Active Menu
                  </span>
                </div>

                <div className='space-y-1 mb-6 text-left'>
                  <h3
                    className='text-xl font-extrabold text-white truncate'
                    id='preview-title'
                  >
                    Bella Italia Trattoria
                  </h3>
                  <p
                    className='text-xs text-slate-400 flex items-center gap-1'
                    id='preview-cuisine-text'
                  >
                    🍕 Italian Pizza & Pasta
                  </p>
                </div>

                <div className='p-4 rounded-2xl bg-navy-950/90 border border-slate-800 flex items-center gap-4'>
                  <div className='w-24 h-24 bg-white p-2 rounded-xl shrink-0 shadow-lg relative flex items-center justify-center'>
                    <img
                      id='preview-qr'
                      src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://openmenu.io/demo'
                      alt='Restaurant QR Code'
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <div className='text-left space-y-1'>
                    <p className='text-xs font-bold text-white flex items-center gap-1'>
                      <QrCode className='size-3.5 text-amber-400' />
                      Table QR Stand
                    </p>
                    <p className='text-[11px] text-slate-400 leading-tight'>
                      Dinning guests scan this QR to browse your real-time menu.
                    </p>
                    <span className='inline-block text-[10px] text-amber-400 font-medium pt-1'>
                      Ready to print on signup ✓
                    </span>
                  </div>
                </div>
              </div>

              <p className='text-center text-xs text-slate-500 italic'>
                "No app download required for diners. Works directly in web
                browser."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
