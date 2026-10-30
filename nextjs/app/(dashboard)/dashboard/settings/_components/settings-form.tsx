import { Field, FieldLabel } from '@/components/base_ui/field';
import { Input } from '@/components/base_ui/input';
import Select from '@/components/base_ui/select';

function SettingsForm() {
  return (
    <form className=' backdrop-blur-lg bg-gray-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-left'>
      <h3 className='text-base font-bold text-white'>
        Restaurant Profile Settings
      </h3>
      <div className='grid sm:grid-cols-2 gap-4'>
        <Field>
          <FieldLabel>Restaurant Name</FieldLabel>
          <Input type='text' placeholder='Bella Italia Trattoria' />
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
          <Select>
            <option value={'in'}>India</option>
            <option value='us'>United States of America</option>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Currency Symbol</FieldLabel>
          <Select>
            <option value={'inr'}>र (INR)</option>
            <option value='usd'>$ (USD)</option>
          </Select>
        </Field>
        <button
          type='submit'
          className='w-fit px-5 py-2.5 rounded-xl bg-amber-500 text-navy-900 font-bold text-xs'
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export { SettingsForm };
