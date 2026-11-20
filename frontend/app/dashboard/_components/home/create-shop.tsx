'use client';

import { saveShopAction } from '@/actions/shop';
import Button from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FormError,
} from '@/components/ui/field';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { CURRENCIES, SHOP_TYPES } from '@/lib/constants';
import { useActionState } from 'react';

export default function CreateShop() {
  const [state, formAction, isPending] = useActionState(
    saveShopAction,
    undefined,
  );
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
          action={formAction}
          className='box-border flex max-w-xl flex-[1_1_480px] flex-col gap-4.5 rounded-[14px] border border-[#E7E5E4] bg-white p-6'
        >
          <FormError state={state} />
          <Field>
            <FieldLabel htmlFor='name'>Shop name</FieldLabel>
            <Input
              name='name'
              id='name'
              type='text'
              defaultValue={state?.values?.name}
              required
              placeholder='Demo Cafe'
            />
            <FieldError errors={state?.fieldErrors?.name || []} />
          </Field>

          <Field>
            <FieldLabel htmlFor='slug'>slug</FieldLabel>
            <div className='flex items-center gap-2'>
              <span className='text-[15px] text-[#57534E]'>/</span>
              <Input
                id='slug'
                type='text'
                name='slug'
                defaultValue={state?.values?.slug}
                required
                placeholder='demo-cafe'
              />
            </div>
            <FieldDescription>
              Lowercase letters, numbers and hyphens. It cannot be changed
              later.
            </FieldDescription>
            <FieldError errors={state?.fieldErrors?.slug || []} />
          </Field>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='type'>Type of shop</FieldLabel>
                <Select
                  id='type'
                  name='type'
                  className='capitalize'
                  defaultValue={state?.values?.type}
                >
                  {SHOP_TYPES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <FieldError errors={state?.fieldErrors?.type || []} />
              </Field>
            </div>

            <div className='flex-[1_1_140px]'>
              <Field>
                <FieldLabel htmlFor='currency'>Currency</FieldLabel>
                <Select
                  id='currency'
                  name='currency'
                  defaultValue={state?.values?.currency}
                >
                  {CURRENCIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <FieldError errors={state?.fieldErrors?.currency || []} />
              </Field>
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor='description'>Short description</FieldLabel>
            <Textarea
              rows={2}
              id='description'
              name='description'
              defaultValue={state?.values?.description}
            />
            <FieldError errors={state?.fieldErrors?.description || []} />
          </Field>

          <div className='flex flex-wrap gap-4'>
            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='phone'>Phone</FieldLabel>
                <Input
                  id='phone'
                  name='phone'
                  type='text'
                  defaultValue={state?.values?.phone}
                  placeholder='9876543210'
                />
                <FieldError errors={state?.fieldErrors?.phone || []} />
              </Field>
            </div>

            <div className='flex-[1_1_200px]'>
              <Field>
                <FieldLabel htmlFor='whatsapp'>WhatsApp number</FieldLabel>
                <Input
                  id='whatsapp'
                  name='whatsapp'
                  type='text'
                  defaultValue={state?.values?.whatsapp}
                  placeholder='+919876543210'
                />
                <FieldError errors={state?.fieldErrors?.whatsapp || []} />
              </Field>
            </div>
            <FieldDescription>
              With country code. Adds a “Send on WhatsApp” button to your menu.
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor='address'>Address</FieldLabel>
            <Input
              id='address'
              name='address'
              type='text'
              defaultValue={state?.values?.address}
            />
            <FieldError errors={state?.fieldErrors?.address || []} />
          </Field>

          <Field>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating shop...' : 'Create shop'}
            </Button>
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
