import { FileUp, QrCode, Sparkle } from 'lucide-react';
import Chip from '../ui/chip';

const HowItWorks = () => {
  return (
    <section
      id='how-it-works'
      className='py-20 bg-slate-900/60 relative border-t border-b border-slate-800'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
          <Chip className='bg-amber-500/10 border-amber-500/20'>
            Ultra Simple Setup
          </Chip>

          <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>
            From Paper to Digital in 3 Steps
          </h2>
          <p className='text-slate-400 text-base'>
            No complex software or designer needed. Our AI automatically parses
            your existing menu into a beautifully formatted digital showcase.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 relative'>
          <div className='glass-panel p-8 rounded-2xl relative flex flex-col items-start hover:border-amber-500/40 transition-all group'>
            <div className='w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-extrabold text-xl mb-6 group-hover:scale-110 transition-transform'>
              01
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>Snap & Upload</h3>
            <p className='text-slate-400 text-sm leading-relaxed mb-4'>
              Upload a photo, PDF, or CSV file of your current menu. Our smart
              OCR reader detects items, descriptions, and prices automatically.
            </p>
            <div className='mt-auto pt-4 flex items-center text-xs font-semibold text-amber-400 gap-1'>
              <span>Supports PDF, JPG, PNG & CSV</span>
              <FileUp className='size-4' />
            </div>
          </div>

          <div className='glass-panel p-8 rounded-2xl relative flex flex-col items-start hover:border-amber-500/40 transition-all group'>
            <div className='w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-extrabold text-xl mb-6 group-hover:scale-110 transition-transform'>
              02
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>
              AI Auto-Structure & Customize
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed mb-4'>
              Refine categories, attach mouth-watering dish photos, configure
              dietary tags (Vegan, Gluten-Free), and set your theme branding.
            </p>
            <div className='mt-auto pt-4 flex items-center text-xs font-semibold text-amber-400 gap-1'>
              <span>Auto allergen tagging</span>
              <Sparkle className='size-4' />
            </div>
          </div>

          <div className='glass-panel p-8 rounded-2xl relative flex flex-col items-start hover:border-amber-500/40 transition-all group'>
            <div className='w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-extrabold text-xl mb-6 group-hover:scale-110 transition-transform'>
              03
            </div>
            <h3 className='text-xl font-bold text-white mb-2'>
              Instant QR & Web Link
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed mb-4'>
              Download high-res QR codes for table tents or stickers. Any menu
              changes update in real-time without reprinting stickers!
            </p>
            <div className='mt-auto pt-4 flex items-center text-xs font-semibold text-amber-400 gap-1'>
              <span>Ready-to-print vectors</span>
              <QrCode className='size-4' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
