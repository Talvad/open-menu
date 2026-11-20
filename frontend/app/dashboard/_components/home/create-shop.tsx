'use client';

import Button from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { useState, SubmitEvent } from 'react';

const SHOP_TYPES = [
  'Restaurant / cafe',
  'Grocery',
  'Furniture',
  'Hotel',
  'Store',
  'Other',
];

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'];

export default function CreateShop() {
  const [name, setName] = useState('Demo Cafe');
  const [slug, setSlug] = useState('demo-cafe');
  const [slugTouched, setSlugTouched] = useState(false);
  const [type, setType] = useState('Restaurant / cafe');
  const [currency, setCurrency] = useState('INR');
  const [description, setDescription] = useState(
    'Breakfast, coffee and fresh juices.',
  );
  const [phone, setPhone] = useState('98765 43210');
  const [whatsapp, setWhatsapp] = useState('919876543210');
  const [address, setAddress] = useState('Kuzhithurai');

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) {
      const generated = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log({
      name,
      slug,
      type,
      currency,
      description,
      phone,
      whatsapp,
      address,
    });
  };

  return (
    <section className={` mx-auto max-w-4xl px-4 pb-14 pt-10 font-sans`}>
      <h1 className='font-bricolage m-0 text-[34px] font-bold tracking-[-0.02em]'>
        Create your shop
      </h1>
      <p className='m-0 mt-2 max-w-140 text-base text-[#44403C]'>
        Tell us about your shop. An administrator reviews new shops before the
        public menu goes live.
      </p>

      <div className='mt-7 flex flex-wrap items-start gap-6'>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='box-border flex max-w-xl flex-[1_1_480px] flex-col gap-4.5 rounded-[14px] border border-[#E7E5E4] bg-white p-6'
        >
          <Field>
            <FieldLabel htmlFor='shopName'>Shop name</FieldLabel>
            <Input
              name='shopName'
              id='shopName'
              type='text'
              required
              placeholder='Demo Cafe'
            />
          </Field>

          <Field>
            <FieldLabel htmlFor='slug'>slug</FieldLabel>
            <div className='flex items-center gap-2'>
              <span className='text-[15px] text-[#57534E]'>/</span>
              <Input
                id='slug'
                type='text'
                name='slug'
                required
                placeholder='demo-cafe'
              />
            </div>
            <FieldDescription>
              Lowercase letters, numbers and hyphens. It cannot be changed
              later.
            </FieldDescription>
          </Field>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='type'>Type of shop</FieldLabel>
                <Select id='type' name='type'>
                  {SHOP_TYPES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className='flex-[1_1_140px]'>
              <Field>
                <FieldLabel htmlFor='currency'>Currency</FieldLabel>
                <Select id='currency' name='currency'>
                  {CURRENCIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor='description'>Short description</FieldLabel>
            <Textarea rows={2} id='description' name='description' />
          </Field>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='phone'>Phone</FieldLabel>
                <Input id='phone' name='phone' type='text' />
              </Field>
            </div>

            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='wa'>WhatsApp number</FieldLabel>
                <Input id='wa' name='wa' type='text' />
              </Field>
            </div>
            <FieldDescription>
              With country code. Adds a “Send on WhatsApp” button to your menu.
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor='address'>Address</FieldLabel>
            <Input id='address' name='address' type='text' />
          </Field>

          <Field>
            <Button type='submit'>Create shop</Button>
          </Field>
        </form>

        {/* Info Sidebar */}
        <aside className='box-border max-w-[320px] flex-[1_1_260px] rounded-[14px] border border-[#FDE68A] bg-[#FFFBEB] p-5'>
          <h2 className='m-0 mb-3 text-base font-bold text-[#78350F]'>
            What happens next
          </h2>
          <ol className='m-0 flex list-decimal flex-col gap-2.5 pl-5 text-sm leading-normal text-[#44403C]'>
            <li>
              Your shop is saved as <strong>Pending approval</strong>.
            </li>
            <li>Add your groups and items while you wait.</li>
            <li>An administrator reviews and approves it.</li>
            <li>Your menu goes live at its web address.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
