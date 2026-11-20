import { ApiError } from '@/lib/api';
import z from 'zod';

export type FormState =
  | {
      error?: string;
      message?: string;
      fieldErrors?: Record<string, string[] | undefined>;
      /** Non-secret field values, so inputs are not wiped when a submit fails. */
      values?: Record<string, string>;
    }
  | undefined;

export function pick(
  raw: Record<string, unknown>,
  keys: string[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of keys) if (typeof raw[key] === 'string') out[key] = raw[key];
  return out;
}
export type Parsed<S extends z.ZodType> =
  | { ok: true; data: z.infer<S> }
  | { ok: false; state: NonNullable<FormState> };

export function parse<S extends z.ZodType>(
  schema: S,
  formData: FormData,
  keep: string[] = [],
): Parsed<S> {
  const raw = Object.fromEntries(formData);
  const result = schema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  return {
    ok: false,
    state: {
      fieldErrors: result.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >,
      values: pick(raw, keep),
    },
  };
}

export const str = (fd: FormData, key: string) =>
  String(fd.get(key) ?? '').trim();
export const bool = (fd: FormData, key: string) => fd.get(key) === 'on';
export const int = (fd: FormData, key: string, fallback = 0) => {
  const n = Number.parseInt(str(fd, key), 10);
  return Number.isFinite(n) ? n : fallback;
};

export const tagsFrom = (fd: FormData, key: string) =>
  str(fd, key)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

export function fail(e: unknown): FormState {
  if (e instanceof ApiError) return { error: e.message };
  console.error(e);
  return { error: 'Something went wrong. Please try again.' };
}
