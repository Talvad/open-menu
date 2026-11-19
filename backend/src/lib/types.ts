import type { Currency, ShopStatus, ShopType } from './constants'

/** Shop as seen by its owner or an admin. */
export interface Shop {
  id: string
  name: string
  slug: string
  type: ShopType
  description: string
  phone: string
  whatsapp: string
  address: string
  currency: Currency
  status: ShopStatus
  statusReason: string
  ownerEmail: string
  createdAt: string
  updatedAt: string
}

export interface MenuGroup {
  id: string
  name: string
  sortOrder: number
  visible: boolean
}

export interface MenuItem {
  id: string
  groupId: string
  name: string
  description: string
  /** Decimal price in the shop currency, e.g. 129.5 */
  price: number
  imageKey: string
  imageUrl: string | null
  available: boolean
  visible: boolean
  sortOrder: number
  tags: string[]
  attributes: Record<string, string>
}

/** Full menu for the dashboard (includes hidden groups and items). */
export interface ShopMenu {
  shop: Shop
  groups: MenuGroup[]
  items: MenuItem[]
}

export interface Me {
  user: { sub: string; email: string; role: 'admin' | 'owner' }
  shop: Shop | null
}

export interface AuditEntry {
  id: string
  at: string
  actorEmail: string
  actorRole: 'admin' | 'owner'
  action: string
  summary: string
}

export interface UploadTicket {
  url: string
  fields: Record<string, string>
  key: string
}

/* ----------------------- public (customer) shapes ----------------------- */

export interface PublicItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  available: boolean
  tags: string[]
  attributes: Record<string, string>
}

export interface PublicGroup {
  id: string
  name: string
  items: PublicItem[]
}

export interface PublicMenu {
  shop: {
    id: string
    name: string
    slug: string
    type: ShopType
    description: string
    phone: string
    whatsapp: string
    address: string
    currency: Currency
  }
  groups: PublicGroup[]
}
