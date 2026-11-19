export const SHOP_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'] as const
export type ShopStatus = (typeof SHOP_STATUSES)[number]

export const SHOP_TYPES = ['restaurant', 'grocery', 'furniture', 'hotel', 'store', 'other'] as const
export type ShopType = (typeof SHOP_TYPES)[number]

export const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED'] as const
export type Currency = (typeof CURRENCIES)[number]

/** Public menus live at /{slug}, so these can never be used as a slug. */
export const RESERVED_SLUGS: readonly string[] = [
  'admin',
  'api',
  'auth',
  'dashboard',
  'login',
  'logout',
  'signup',
  'static',
  'public',
  'about',
  'pricing',
  'terms',
  'privacy',
  'help',
  'support',
  'www',
  'app',
  'menu',
  'm',
  's',
  '_next',
]

/**
 * OAuth scopes enforced by API Gateway on every private route.
 * They are added to the ACCESS token by the pre-token-generation Lambda, based on Cognito group membership.
 * They are deliberately NOT defined as a Cognito resource server / allowed on the app client, so a user can never
 * request one by editing the authorize URL: only the trigger can grant them.
 */
export const SCOPES = {
  shopRead: 'openmenu/shop.read',
  shopWrite: 'openmenu/shop.write',
  admin: 'openmenu/admin',
} as const
export type Scope = (typeof SCOPES)[keyof typeof SCOPES]

export const IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} as const
export type ImageContentType = keyof typeof IMAGE_TYPES

export const LIMITS = {
  maxGroupsPerShop: 50,
  maxItemsPerShop: 500,
  maxImageBytes: 3 * 1024 * 1024,
  maxTagsPerItem: 8,
  maxAttributesPerItem: 10,
} as const

export const STATUS_LABELS: Record<ShopStatus, string> = {
  PENDING: 'Pending approval',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  SUSPENDED: 'Suspended',
}

export const TYPE_LABELS: Record<ShopType, string> = {
  restaurant: 'Restaurant / cafe',
  grocery: 'Grocery',
  furniture: 'Furniture',
  hotel: 'Hotel',
  store: 'Store',
  other: 'Other',
}
