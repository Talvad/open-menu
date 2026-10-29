import { BarChart3, Languages, QrCode, ToggleRight } from 'lucide-react';

const Features = () => {
  return (
    <section
      id='features'
      className='py-20 bg-slate-900/40 relative border-t border-slate-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
          <span className='text-amber-400 font-bold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20'>
            Powerful Capabilities
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>
            Built Specifically for Modern Food Businesses
          </h2>
          <p className='text-slate-400 text-base'>
            Everything cafe, restaurant, and bar owners need to drive higher
            order values and run smooth operations.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all group'>
            <div className='w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform'>
              <QrCode className='size-6' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>
              Dynamic QR Codes
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Never re-print physical codes when prices or menu items change.
              Your table QR code stays constant while your digital menu updates
              instantly.
            </p>
          </div>

          <div className='glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all group'>
            <div className='w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform'>
              <ToggleRight className='size-6' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>
              Real-Time Stock Toggle
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Ran out of a popular item during dinner rush? Mark it "86'd / Sold
              Out" from your smartphone with 1 tap to prevent guest
              disappointment.
            </p>
          </div>

          <div className='glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all group'>
            <div className='w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform'>
              <Languages className='size-6' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>
              30+ Instant Translations
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Welcome tourists effortlessly. Open Menu automatically translates
              your dishes and ingredients into international guest languages.
            </p>
          </div>

          <div className='glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all group'>
            <div className='w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform'>
              <BarChart3 className='size-6' />
            </div>
            <h3 className='text-lg font-bold text-white mb-2'>
              Insights & Analytics
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Track what guests scan most, peak viewing hours, and most popular
              menu categories to optimize your pricing strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
