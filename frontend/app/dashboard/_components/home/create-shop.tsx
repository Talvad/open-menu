'use client';

import { useState, FormEvent } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bricolage',
});

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

  const handleSubmit = (e: FormEvent) => {
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
    <section
      className={`${bricolage.variable} mx-auto max-w-[896px] px-4 pb-14 pt-10 font-sans text-[#1C1917]`}
    >
      <h1
        className='m-0 text-[34px] font-bold tracking-[-0.02em]'
        style={{ fontFamily: 'var(--font-bricolage), system-ui, sans-serif' }}
      >
        Create your shop
      </h1>
      <p className='m-0 mt-2 max-w-[560px] text-base text-[#44403C]'>
        Tell us about your shop. An administrator reviews new shops before the
        public menu goes live.
      </p>

      <div className='mt-7 flex flex-wrap items-start gap-6'>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='box-border flex max-w-[576px] flex-[1_1_480px] flex-col gap-[18px] rounded-[14px] border border-[#E7E5E4] bg-white p-6'
        >
          <div>
            <label
              htmlFor='name'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
            >
              Shop name
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='slug'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
            >
              Web address
            </label>
            <div className='flex items-center gap-2'>
              <span className='text-[15px] text-[#57534E]'>/</span>
              <input
                id='slug'
                type='text'
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
                className='box-border min-w-0 flex-1 rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
              />
            </div>
            <p className='m-0 mt-1.5 text-[13px] text-[#57534E]'>
              Lowercase letters, numbers and hyphens. It cannot be changed
              later.
            </p>
          </div>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <label
                htmlFor='type'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
              >
                Type of shop
              </label>
              <select
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
              >
                {SHOP_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex-[1_1_140px]'>
              <label
                htmlFor='cur'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
              >
                Currency
              </label>
              <select
                id='cur'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
              >
                {CURRENCIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor='desc'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
            >
              Short description
            </label>
            <textarea
              id='desc'
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='box-border w-full resize-y rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
            />
          </div>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <label
                htmlFor='phone'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
              >
                Phone
              </label>
              <input
                id='phone'
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
              />
            </div>

            <div className='flex-[1_1_200px]'>
              <label
                htmlFor='wa'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
              >
                WhatsApp number
              </label>
              <input
                id='wa'
                type='text'
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
              />
            </div>
          </div>

          <p className='m-0 -mt-2 text-[13px] text-[#57534E]'>
            With country code. Adds a “Send on WhatsApp” button to your menu.
          </p>

          <div>
            <label
              htmlFor='addr'
              className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.05em] text-[#57534E]'
            >
              Address
            </label>
            <input
              id='addr'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='box-border w-full rounded-[10px] border border-[#D6D3D1] bg-white px-3 py-[11px] text-[15px] text-[#1C1917] focus:border-[#B45309] focus:outline-none'
            />
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='submit'
              className='rounded-[10px] border-0 bg-[#B45309] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#92400E]'
            >
              Create shop
            </button>
          </div>
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
