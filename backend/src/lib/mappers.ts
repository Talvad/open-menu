import type { AuditEntry, MenuGroup, MenuItem, Shop } from './types';
import type { Rec } from './db';

const MEDIA = process.env.MEDIA_BASE_URL ?? '';

export const mediaUrl = (key?: string): string | null =>
  key ? `${MEDIA}/${key}` : null;

export function toShop(r: Rec): Shop {
  return {
    id: r.shopId,
    name: r.name,
    slug: r.slug,
    type: r.type,
    description: r.description ?? '',
    phone: r.phone ?? '',
    whatsapp: r.whatsapp ?? '',
    address: r.address ?? '',
    currency: r.currency,
    timeZone: r.timeZone ?? 'Asia/Kolkata',
    logoKey: r.logoKey ?? '',
    logoUrl: mediaUrl(r.logoKey),
    status: r.status,
    statusReason: r.statusReason ?? '',
    ownerEmail: r.ownerEmail ?? '',
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

export function toGroup(r: Rec): MenuGroup {
  return {
    id: r.groupId,
    name: r.name,
    sortOrder: r.sortOrder ?? 0,
    visible: r.visible !== false,
  };
}

export function toItem(r: Rec): MenuItem {
  return {
    id: r.itemId,
    groupId: r.groupId,
    name: r.name,
    description: r.description ?? '',
    price: r.price ?? 0,
    imageKey: r.imageKey ?? '',
    imageUrl: mediaUrl(r.imageKey),
    available: r.available !== false,
    visible: r.visible !== false,
    sortOrder: r.sortOrder ?? 0,
    tags: r.tags ?? [],
    attributes: r.attributes ?? {},
    variant: r.variant ?? undefined,
    extras: r.extras ?? [],
    schedule: r.schedule ?? undefined,
  };
}

export function toAudit(r: Rec): AuditEntry {
  return {
    id: r.SK,
    at: r.at,
    actorEmail: r.actorEmail ?? '',
    actorRole: r.actorRole,
    action: r.action,
    summary: r.summary,
  };
}

export const bySort = <T extends { sortOrder: number; name: string }>(
  a: T,
  b: T,
) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);
