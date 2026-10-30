import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Menu Builder',
};
export default function DashboardMenuBuilderPage() {
  return (
    <div id='tab-content-builder' className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='relative w-full sm:w-64'>
          <i
            data-lucide='search'
            className='w-4 h-4 absolute left-3 top-3 text-slate-500'
          ></i>
          <input
            type='text'
            id='builder-search'
            placeholder='Search menu items...'
            className='w-full glass-input pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-500'
          />
        </div>
        <div
          className='flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1'
          id='category-filter-buttons'
        ></div>
      </div>

      <div id='menu-items-container' className='space-y-3'>
        {/* <!-- Dynamic items rendered here --> */}
      </div>
    </div>
  );
}
