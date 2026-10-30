import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | QR Code Generator',
};
export default function DashboardQrCodeGeneratorPage() {
  return (
    <div id='tab-content-qr' className=' space-y-6'>
      <div className='glass-card p-6 rounded-3xl border border-slate-800 space-y-6'>
        <div className='text-left space-y-1'>
          <h3 className='text-base font-bold text-white'>
            Table QR Stand Generator
          </h3>
          <p className='text-xs text-slate-400'>
            Download high-resolution vector QR stands for your tables or bar
            counter.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 gap-6 items-center'>
          <div className='p-6 rounded-2xl bg-white text-navy-900 text-center space-y-3 shadow-2xl max-w-xs mx-auto w-full'>
            <p
              className='text-xs font-extrabold tracking-wider uppercase'
              id='qr-frame-text'
            >
              SCAN TO VIEW MENU
            </p>
            <div className='w-40 h-40 mx-auto p-2 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center'>
              <img
                id='qr-generator-img'
                src='https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://openmenu.io/demo'
                alt='Table QR Code'
                className='w-full h-full'
              />
            </div>
            <p className='text-[10px] font-bold text-slate-500' id='qr-subtext'>
              Table #12 • Bella Italia
            </p>
          </div>

          <div className='space-y-4 text-left'>
            <div>
              <label className='block text-xs font-semibold text-slate-300 mb-1'>
                Header Frame Text
              </label>
              <input
                type='text'
                id='qr-input-header'
                className='w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-slate-300 mb-1'>
                Table / Counter Label
              </label>
              <input
                type='text'
                id='qr-input-subtext'
                className='w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white'
              />
            </div>
            <button className='w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-900 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2'>
              <i data-lucide='download' className='w-4 h-4'></i>
              Download Printable PDF / PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
