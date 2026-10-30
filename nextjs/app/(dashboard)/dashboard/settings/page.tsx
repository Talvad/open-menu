import { Field, FieldLabel } from '@/components/base_ui/field';
import { Input } from '@/components/base_ui/input';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Settings',
};
export default function DashboardSettingsPage() {
  return (
    <div className='space-y-6'>
      <form className=' backdrop-blur-lg bg-gray-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-left'>
        <h3 className='text-base font-bold text-white'>
          Restaurant Profile Settings
        </h3>
        <div className='grid sm:grid-cols-2 gap-4'>
          <Field>
            <FieldLabel>Restaurant Name</FieldLabel>
            <Input type='text' />
          </Field>
          <Field>
            <FieldLabel>Address</FieldLabel>
            <Input type='text' placeholder='Land Mark, Town, District' />
          </Field>
          <Field>
            <FieldLabel>State</FieldLabel>
            <Input type='text' placeholder='State' />
          </Field>
          <Field>
            <FieldLabel>Contact</FieldLabel>
            <Input type='text' placeholder='Mobile number' />
          </Field>
          <Field>
            <FieldLabel>Country</FieldLabel>
            <Input type='text' placeholder='India' />
          </Field>
          <Field>
            <FieldLabel>Currency Symbol</FieldLabel>
            <Input type='text' placeholder='र (INR)' />
          </Field>
          <button
            type='submit'
            className='w-fit px-5 py-2.5 rounded-xl bg-amber-500 text-navy-900 font-bold text-xs'
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
