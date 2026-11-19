import type { Shop } from "./types";
import type { Rec } from "./db";

export function toShop(r: Rec): Shop {
  return {
    id: r.shopId,
    name: r.name,
    slug: r.slug,
    type: r.type,
    description: r.description ?? "",
    phone: r.phone ?? "",
    whatsapp: r.whatsapp ?? "",
    address: r.address ?? "",
    currency: r.currency,
    status: r.status,
    statusReason: r.statusReason ?? "",
    ownerEmail: r.ownerEmail ?? "",
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}
