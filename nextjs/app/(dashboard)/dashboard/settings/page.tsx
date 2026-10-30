import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
};
export default function DashboardSettingsPage() {
  return (
    <div id='tab-content-settings' className='space-y-6'>
      <div className='glass-card p-6 rounded-3xl border border-slate-800 space-y-4 text-left'>
        <h3 className='text-base font-bold text-white'>
          Restaurant Profile Settings
        </h3>
        <div className='grid sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs font-semibold text-slate-300 mb-1'>
              Restaurant Name
            </label>
            <input
              type='text'
              //   value='Bella Italia Trattoria'
              className='w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white'
            />
          </div>
          <div>
            <label className='block text-xs font-semibold text-slate-300 mb-1'>
              Currency Symbol
            </label>
            <input
              type='text'
              //   value='$ (USD)'
              className='w-full glass-input px-3.5 py-2 rounded-xl text-xs text-white'
            />
          </div>
        </div>
        <button className='px-5 py-2.5 rounded-xl bg-amber-500 text-navy-900 font-bold text-xs'>
          Save Changes
        </button>
      </div>
    </div>
  );
}
