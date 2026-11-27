import { CURRENCIES, RESERVED_SLUGS, SHOP_TYPES } from '@/lib/constants';
import z from 'zod';

const text = (max: number) => z.string().trim().max(max);

/* ------------------------------------------------------------------ */
/* Shop                                                                */
/* ------------------------------------------------------------------ */

export const slugSchema = z
  .string()
  .min(3, 'At least 3 characters')
  .max(40, 'At most 40 characters')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Use lowercase letters, numbers and single hyphens',
  )
  .refine((s) => !RESERVED_SLUGS.includes(s), 'That address is reserved');

const shopFields = {
  name: z.string().trim().min(2, 'At least 2 characters').max(80),
  type: z.enum(SHOP_TYPES),
  description: text(300).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{0,20}$/, 'Invalid phone number')
    .optional(),
  whatsapp: z
    .string()
    .trim()
    .regex(
      /^(\d{8,15})?$/,
      'Digits only, with country code (e.g. 919876543210)',
    )
    .optional(),
  address: text(200).optional(),
  currency: z.enum(CURRENCIES),
  timeZone: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .default('Asia/Kolkata')
    .refine((value) => {
      try {
        new Intl.DateTimeFormat('en', { timeZone: value });
        return true;
      } catch {
        return false;
      }
    }, 'Enter a valid IANA time zone, such as Asia/Kolkata'),
};

export const shopCreateSchema = z.object({ ...shopFields, slug: slugSchema });
export const shopUpdateSchema = z
  .object({
    ...shopFields,
    logoKey: z.string().max(200).nullable().optional(),
  })
  .partial()

/* ------------------------------------------------------------------ */
/* Inferred input types                                                */
/* ------------------------------------------------------------------ */

export type ShopCreateInput = z.infer<typeof shopCreateSchema>;
export type ShopUpdateInput = z.infer<typeof shopUpdateSchema>;
