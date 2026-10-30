import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Categories',
};
export default function DashboardCategoriesPage() {
  return (
    <div id='tab-content-categories' className=' space-y-6'>
      <div className='glass-card p-6 rounded-3xl border border-slate-800 space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-sm font-bold text-white'>
            Manage Menu Categories
          </h3>
          <button className='px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-xs font-semibold border border-amber-500/30'>
            + New Category
          </button>
        </div>
        <div id='categories-list' className='space-y-2'></div>
      </div>
    </div>
  );
}
