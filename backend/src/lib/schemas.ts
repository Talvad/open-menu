import { z } from 'zod';
import {
  CURRENCIES,
  IMAGE_TYPES,
  LIMITS,
  RESERVED_SLUGS,
  SHOP_STATUSES,
  SHOP_TYPES,
} from './constants';

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
    }, 'Enter a valid IANA time zone'),
};

export const shopCreateSchema = z.object({ ...shopFields, slug: slugSchema });
export const shopUpdateSchema = z.object(shopFields).partial();

export const statusSchema = z.object({
  status: z.enum(SHOP_STATUSES),
  reason: text(300).optional(),
});

/* ------------------------------------------------------------------ */
/* Groups                                                              */
/* ------------------------------------------------------------------ */

export const groupCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(60),
  sortOrder: z.number().int().min(0).max(100000).default(0),
  visible: z.boolean().default(true),
});

export const groupUpdateSchema = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  sortOrder: z.number().int().min(0).max(100000).optional(),
  visible: z.boolean().optional(),
});

/* ------------------------------------------------------------------ */
/* Items                                                               */
/* ------------------------------------------------------------------ */

const tagsSchema = z
  .array(z.string().trim().min(1).max(24))
  .max(LIMITS.maxTagsPerItem);

const attributesSchema = z
  .record(z.string().max(40), z.string().max(120))
  .refine(
    (r) => Object.keys(r).length <= LIMITS.maxAttributesPerItem,
    `At most ${LIMITS.maxAttributesPerItem} extra details`,
  );

const priceSchema = z
  .number()
  .min(0, 'Price cannot be negative')
  .max(10_000_000);

const priceOptionSchema = z.object({
  name: z.string().trim().min(1).max(40),
  priceAdjustment: z.number().min(0).max(1_000_000),
});

const variantSchema = z.object({
  name: z.string().trim().min(1).max(40),
  options: z.array(priceOptionSchema).min(1).max(10),
});

const scheduleSchema = z
  .object({
    startsAt: z.string().datetime(),
    endsAt: z.string().datetime(),
    availability: z.boolean().optional(),
    label: z.string().trim().max(60).optional(),
    specialPrice: priceSchema.optional(),
  })
  .refine(
    (schedule) => Date.parse(schedule.endsAt) > Date.parse(schedule.startsAt),
    {
      message: 'Schedule end must be after its start',
      path: ['endsAt'],
    },
  )
  .refine(
    (schedule) =>
      schedule.availability !== undefined ||
      schedule.specialPrice !== undefined ||
      Boolean(schedule.label),
    { message: 'Set availability, a special price, or a label' },
  );

export const itemCreateSchema = z.object({
  groupId: z.string().min(1).max(64),
  name: z.string().trim().min(1, 'Name is required').max(100),
  description: text(400).optional(),
  price: priceSchema,
  imageKey: z.string().max(200).optional(),
  available: z.boolean().default(true),
  visible: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(100000).default(0),
  tags: tagsSchema.default([]),
  attributes: attributesSchema.default({}),
  variant: variantSchema.optional(),
  extras: z.array(priceOptionSchema).max(20).default([]),
  schedule: scheduleSchema.nullable().optional(),
}).refine(
  (item) =>
    item.schedule?.specialPrice === undefined ||
    item.schedule.specialPrice <= item.price,
  {
    message: 'Special price cannot exceed the regular item price',
    path: ['schedule', 'specialPrice'],
  },
);

/** Separate from itemCreateSchema on purpose: an update must never re-apply defaults. */
export const itemUpdateSchema = z.object({
  groupId: z.string().min(1).max(64).optional(),
  name: z.string().trim().min(1).max(100).optional(),
  description: text(400).optional(),
  price: priceSchema.optional(),
  imageKey: z.string().max(200).optional(),
  available: z.boolean().optional(),
  visible: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(100000).optional(),
  tags: tagsSchema.optional(),
  attributes: attributesSchema.optional(),
  variant: variantSchema.nullable().optional(),
  extras: z.array(priceOptionSchema).max(20).optional(),
  schedule: scheduleSchema.nullable().optional(),
}).refine(
  (item) =>
    item.schedule?.specialPrice === undefined ||
    item.price === undefined ||
    item.schedule.specialPrice <= item.price,
  {
    message: 'Special price cannot exceed the regular item price',
    path: ['schedule', 'specialPrice'],
  },
);

export const itemImportSchema = z.object({
  items: z.array(itemCreateSchema).min(1).max(LIMITS.maxItemsPerImport),
});

/* ------------------------------------------------------------------ */
/* Uploads                                                             */
/* ------------------------------------------------------------------ */

export const uploadSchema = z.object({
  contentType: z.enum(
    Object.keys(IMAGE_TYPES) as [
      keyof typeof IMAGE_TYPES,
      ...(keyof typeof IMAGE_TYPES)[],
    ],
  ),
});

/* ------------------------------------------------------------------ */
/* Inferred input types                                                */
/* ------------------------------------------------------------------ */

export type ShopCreateInput = z.infer<typeof shopCreateSchema>;
export type ShopUpdateInput = z.infer<typeof shopUpdateSchema>;
export type StatusInput = z.infer<typeof statusSchema>;
export type GroupCreateInput = z.infer<typeof groupCreateSchema>;
export type GroupUpdateInput = z.infer<typeof groupUpdateSchema>;
export type ItemCreateInput = z.infer<typeof itemCreateSchema>;
export type ItemUpdateInput = z.infer<typeof itemUpdateSchema>;
