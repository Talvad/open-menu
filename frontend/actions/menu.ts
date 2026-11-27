'use server';

// Used by both the owner dashboard and the admin "edit as owner" screen.
// Authorization is NOT decided here: the API checks the token against shop ownership / admin role.

import type { UploadTicket } from '@/lib/types';
import { api } from '@/lib/api';
import { requireSession } from '@/lib/auth/session';
import { localDateTimeToUtc } from '@/lib/time-zone';
import {
  attributesFrom,
  bool,
  bustShopCache,
  fail,
  FormState,
  int,
  str,
  tagsFrom,
} from './util';

function parsePriceOptions(value: string, field: string) {
  const options = [];
  for (const [index, rawLine] of value.split('\n').entries()) {
    const line = rawLine.trim();
    if (!line) continue;
    const separator = line.lastIndexOf(':');
    if (separator <= 0) {
      throw new Error(`${field} row ${index + 1} must use Name: price format.`);
    }
    const name = line.slice(0, separator).trim();
    const priceAdjustment = Number(line.slice(separator + 1).trim());
    if (!name || !Number.isFinite(priceAdjustment) || priceAdjustment < 0) {
      throw new Error(`${field} row ${index + 1} has an invalid name or price.`);
    }
    options.push({ name, priceAdjustment });
  }
  return options;
}

function itemScheduleFromForm(fd: FormData, timeZone: string) {
  const startsAt = str(fd, 'scheduleStartsAt');
  const endsAt = str(fd, 'scheduleEndsAt');
  const availabilityChoice = str(fd, 'scheduleAvailability');
  const label = str(fd, 'scheduleLabel');
  const specialPriceText = str(fd, 'scheduleSpecialPrice');
  if (
    !startsAt &&
    !endsAt &&
    availabilityChoice === 'unchanged' &&
    !label &&
    !specialPriceText
  )
    return null;

  if (!startsAt || !endsAt)
    throw new Error('Choose both a start and end time for the schedule.');

  const specialPrice = specialPriceText ? Number(specialPriceText) : undefined;
  if (specialPriceText && (!Number.isFinite(specialPrice) || specialPrice! < 0))
    throw new Error('Enter a valid special price.');

  const availability =
    availabilityChoice === 'available'
      ? true
      : availabilityChoice === 'sold-out'
        ? false
        : undefined;

  return {
    startsAt: localDateTimeToUtc(startsAt, timeZone),
    endsAt: localDateTimeToUtc(endsAt, timeZone),
    ...(availability !== undefined ? { availability } : {}),
    ...(label ? { label } : {}),
    ...(specialPrice !== undefined ? { specialPrice } : {}),
  };
}

/* ------------------------------ groups ------------------------------ */

export async function saveGroupAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireSession();
  const shopId = str(fd, 'shopId');
  const groupId = str(fd, 'groupId');
  const body = {
    name: str(fd, 'name'),
    sortOrder: int(fd, 'sortOrder'),
    visible: bool(fd, 'visible'),
  };
  try {
    if (groupId)
      await api(`/shops/${shopId}/groups/${groupId}`, { method: 'PUT', body });
    else await api(`/shops/${shopId}/groups`, { method: 'POST', body });
    await bustShopCache(shopId);
    return { message: 'Saved' };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteGroupAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireSession();
  const shopId = str(fd, 'shopId');
  try {
    await api(`/shops/${shopId}/groups/${str(fd, 'groupId')}`, {
      method: 'DELETE',
    });
    await bustShopCache(shopId);
    return { message: 'Deleted' };
  } catch (e) {
    return fail(e);
  }
}

/* ------------------------------ items ------------------------------- */

export async function saveItemAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireSession();
  const shopId = str(fd, 'shopId');
  const itemId = str(fd, 'itemId');
  const price = Number(str(fd, 'price') || '0');
  if (!Number.isFinite(price)) return { error: 'Enter a valid price' };
  const variantName = str(fd, 'variantName');
  let variant;
  let extras;
  let schedule;
  try {
    const options = parsePriceOptions(str(fd, 'variantOptions'), 'Variant');
    if (options.length && !variantName)
      throw new Error('Name the required variant group.');
    if (!options.length && variantName)
      throw new Error('Add at least one choice to the required variant group.');
    variant = options.length ? { name: variantName, options } : null;
    extras = parsePriceOptions(str(fd, 'extras'), 'Extra');
    schedule = bool(fd, 'clearSchedule')
      ? null
      : itemScheduleFromForm(fd, str(fd, 'shopTimeZone'));
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid item options.' };
  }

  const body = {
    groupId: str(fd, 'groupId'),
    name: str(fd, 'name'),
    description: str(fd, 'description'),
    price,
    imageKey: str(fd, 'imageKey'),
    available: bool(fd, 'available'),
    visible: bool(fd, 'visible'),
    sortOrder: int(fd, 'sortOrder'),
    tags: tagsFrom(fd, 'tags'),
    attributes: attributesFrom(fd, 'attributes'),
    variant,
    extras,
    schedule,
  };
  try {
    if (itemId)
      await api(`/shops/${shopId}/items/${itemId}`, { method: 'PUT', body });
    else await api(`/shops/${shopId}/items`, { method: 'POST', body });
    await bustShopCache(shopId);
    return { message: 'Saved' };
  } catch (e) {
    return fail(e);
  }
}

export async function importItemsAction(
  shopId: string,
  items: Array<Record<string, unknown>>,
): Promise<{ imported?: number; error?: string }> {
  await requireSession();
  try {
    const result = await api<{ imported: number }>(
      `/shops/${shopId}/items/import`,
      { method: 'POST', body: { items } },
    );
    await bustShopCache(shopId);
    return { imported: result.imported };
  } catch (error) {
    const result = fail(error);
    return {
      error:
        result?.error ??
        'Could not import menu items. Please review the file and try again.',
    };
  }
}

/** One-click toggles on the item row: field = "available" | "visible". */
export async function toggleItemAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireSession();
  const shopId = str(fd, 'shopId');
  const field = str(fd, 'field');
  if (field !== 'available' && field !== 'visible')
    return { error: 'Invalid field' };
  try {
    await api(`/shops/${shopId}/items/${str(fd, 'itemId')}`, {
      method: 'PUT',
      body: { [field]: str(fd, 'value') === 'true' },
    });
    await bustShopCache(shopId);
    return { message: 'Updated Items' };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteItemAction(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireSession();
  const shopId = str(fd, 'shopId');
  try {
    await api(`/shops/${shopId}/items/${str(fd, 'itemId')}`, {
      method: 'DELETE',
    });
    await bustShopCache(shopId);
    return { message: 'Deleted item' };
  } catch (e) {
    return fail(e);
  }
}

/* ------------------------------ images ------------------------------ */

/** Called from the browser (ImageUpload) to get a presigned S3 POST. */
export async function createUploadUrlAction(
  shopId: string,
  contentType: string,
): Promise<{ ticket?: UploadTicket; error?: string }> {
  await requireSession();
  try {
    const ticket = await api<UploadTicket>(`/shops/${shopId}/upload-url`, {
      method: 'POST',
      body: { contentType },
    });
    return { ticket };
  } catch (e) {
    return { error: 'Error occured while uploading' };
  }
}
