import { Metadata } from 'next';
import { AddCategoryForm } from '../../_components/add-category-form';

export const metadata: Metadata = {
  title: 'Dashboard | Categories',
};
export default function DashboardCategoriesPage() {
  return (
    <div id='tab-content-categories' className=' space-y-6'>
      <div className='backdrop-blur-lg bg-gray-900 p-6 rounded-3xl border border-slate-800 space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-sm font-bold text-white'>
            Manage Menu Categories
          </h3>
          <AddCategoryForm />
        </div>
        {/* <div id='categories-list' className='space-y-2'></div> */}
      </div>
    </div>
  );
}
