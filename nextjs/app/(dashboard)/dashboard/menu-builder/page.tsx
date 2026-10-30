import { Input } from '@/components/base_ui/input';
import { Search } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Menu Builder',
};
export default function DashboardMenuBuilderPage() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='relative w-full sm:w-64'>
          <Input icon={Search} type='text' placeholder='Search menu items' />
        </div>
        <div
          className='flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1'
          id='category-filter-buttons'
        ></div>
      </div>
    </div>
  );
}
