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
import { Shop } from '@/lib/types';
import { useActionState } from 'react';

type Props = { shop?: Shop | null };

export default function CreateShopForm({ shop }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveShopAction,
    undefined,
  );
  return (
    <form
      action={formAction}
      className='box-border flex max-w-xl flex-[1_1_480px] flex-col gap-4.5 rounded-[14px] border border-[#E7E5E4] bg-white p-6'
    >
      <FormError state={state} />
      {shop && <input type='hidden' name='shopId' value={shop.id} />}
      <Field>
        <FieldLabel htmlFor='name'>Shop name</FieldLabel>
        <Input
          name='name'
          id='name'
          type='text'
          defaultValue={shop?.name ?? state?.values?.name}
          required
          placeholder='Demo Cafe'
        />
        <FieldError errors={state?.fieldErrors?.name || []} />
      </Field>

      {!shop && (
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
            Lowercase letters, numbers and hyphens. It cannot be changed later.
          </FieldDescription>
          <FieldError errors={state?.fieldErrors?.slug || []} />
        </Field>
      )}

      <div className='flex flex-wrap gap-4'>
        <div className='flex-[1_1_200px]'>
          <Field>
            <FieldLabel htmlFor='type'>Type of shop</FieldLabel>
            <Select
              id='type'
              name='type'
              className='capitalize'
              defaultValue={shop?.type ?? state?.values?.type}
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
              defaultValue={shop?.currency ?? state?.values?.currency}
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
          defaultValue={shop?.description ?? state?.values?.description}
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
              defaultValue={shop?.phone ?? state?.values?.phone}
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
              defaultValue={shop?.whatsapp ?? state?.values?.whatsapp}
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
          defaultValue={shop?.address ?? state?.values?.address}
        />
        <FieldError errors={state?.fieldErrors?.address || []} />
      </Field>

      <Field>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creating shop...' : 'Create shop'}
        </Button>
      </Field>
    </form>
  );
}
