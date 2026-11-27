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
      className='box-border flex flex-col gap-3 rounded-2xl border border-[#e6ddd0] bg-paper p-5 shadow-[0_12px_34px_rgba(47,54,43,0.05)] sm:p-7'
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
          <FieldLabel htmlFor='slug'>Menu address</FieldLabel>
          <div className='flex items-center gap-0'>
            <span className='rounded-l-xl border border-r-0 border-[#d9d0c3] bg-[#eee8dd] px-3 py-3 text-sm text-[#716e63]'>
              /
            </span>
            <Input
              id='slug'
              type='text'
              name='slug'
              defaultValue={state?.values?.slug}
              required
              className='rounded-l-none'
              placeholder='your-shop-name'
            />
          </div>
          <FieldDescription>
            This becomes your unique share link and cannot be changed later.
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
        <FieldLabel htmlFor='timeZone'>Shop time zone</FieldLabel>
        <Input
          id='timeZone'
          name='timeZone'
          defaultValue={shop?.timeZone ?? state?.values?.timeZone ?? 'Asia/Kolkata'}
          required
          placeholder='Asia/Kolkata'
        />
        <FieldDescription>
          Use an IANA time zone such as Asia/Kolkata or America/New_York.
          Scheduled menu changes use this time zone.
        </FieldDescription>
        <FieldError errors={state?.fieldErrors?.timeZone || []} />
      </Field>

      <Field>
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Setting up your shop…' : shop ? 'Save shop details' : 'Create my shop'}
        </Button>
      </Field>
    </form>
  );
}
