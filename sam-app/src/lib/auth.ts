import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { SCOPES } from '@open-menu/shared'
import { ddb, keys, TABLE, type Rec } from './db'
import { HttpError, type ApiEvent } from './http'

export interface Auth {
  sub: string
  email: string
  scopes: string[]
  /** admin = holds the openmenu/admin scope (granted by the pre-token Lambda to the "admin" group). Everyone else is an owner. */
  role: 'admin' | 'owner'
}

/**
 * Identity comes from the ACCESS token that API Gateway already verified (signature, expiry, audience, scopes).
 * The pre-token Lambda adds the openmenu/* scopes plus om_email / om_role claims.
 */
export function getAuth(event: ApiEvent): Auth {
  const claims = event.requestContext.authorizer?.jwt?.claims ?? {}
  const sub = claims.sub
  if (typeof sub !== 'string' || !sub) throw new HttpError(401, 'Unauthenticated')
  // An ID token must never work against the API, even if it somehow got past the authorizer.
  if (claims.token_use !== 'access') throw new HttpError(401, 'An access token is required')

  const scopes = String(claims.scope ?? '')
    .split(/\s+/)
    .filter(Boolean)
  return {
    sub,
    email: typeof claims.om_email === 'string' ? claims.om_email : '',
    scopes,
    role: scopes.includes(SCOPES.admin) ? 'admin' : 'owner',
  }
}

/**
 * Scope required by a route. The SAME rule is declared per route in template.yaml (AuthorizationScopes), where API
 * Gateway enforces it first; this re-check is defence in depth in case a route is ever added without a scope.
 *   /admin/*            → openmenu/admin
 *   other GET           → openmenu/shop.read
 *   POST / PUT / DELETE → openmenu/shop.write
 */
export function requiredScope(routeKey: string): string {
  const [method = '', path = ''] = routeKey.split(' ')
  if (path.startsWith('/admin/')) return SCOPES.admin
  return method === 'GET' ? SCOPES.shopRead : SCOPES.shopWrite
}

export function assertScope(auth: Auth, routeKey: string) {
  if (!auth.scopes.includes(requiredScope(routeKey))) throw new HttpError(403, 'Insufficient scope')
}

const SHOP_ID = /^[0-9a-f-]{36}$/

export async function getShopRecord(shopId: string): Promise<Rec | null> {
  if (!SHOP_ID.test(shopId)) return null
  const res = await ddb.send(new GetCommand({ TableName: TABLE, Key: keys.shop(shopId) }))
  return (res.Item as Rec) ?? null
}

/**
 * The one place that decides "may this caller touch THIS shop?" (scopes only say what KIND of call is allowed).
 * - admins: any shop
 * - owners: only shops whose ownerSub matches the verified token `sub` (404 otherwise, so ids can't be probed)
 * - suspended shops are read-only for owners
 */
export async function requireShop(auth: Auth, shopId: string, opts: { write?: boolean } = {}): Promise<Rec> {
  const shop = await getShopRecord(shopId)
  if (!shop) throw new HttpError(404, 'Shop not found')
  if (auth.role !== 'admin' && shop.ownerSub !== auth.sub) throw new HttpError(404, 'Shop not found')
  if (opts.write && auth.role !== 'admin' && shop.status === 'SUSPENDED') {
    throw new HttpError(403, 'This shop is suspended. Please contact support.')
  }
  return shop
}
