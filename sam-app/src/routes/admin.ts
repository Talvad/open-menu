import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { SHOP_STATUSES, statusSchema, type ShopStatus } from '@open-menu/shared'
import { audit } from '../lib/audit'
import { requireShop } from '../lib/auth'
import { buildUpdate, ddb, keys, listByPrefix, queryAll, TABLE, type Rec } from '../lib/db'
import { HttpError, ok, parseBody } from '../lib/http'
import { toAudit, toShop } from '../lib/mappers'
import { pathParam, type Handler } from './types'

/** GET /admin/shops?status=PENDING|APPROVED|REJECTED|SUSPENDED|ALL */
export const adminListShops: Handler = async ({ event }) => {
  const q = (event.queryStringParameters?.status ?? 'PENDING').toUpperCase()
  const statuses: readonly string[] = q === 'ALL' ? SHOP_STATUSES : [q]
  if (!statuses.every((s) => (SHOP_STATUSES as readonly string[]).includes(s))) {
    throw new HttpError(400, 'Invalid status')
  }

  const lists = await Promise.all(
    statuses.map((s) =>
      queryAll({
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :p',
        ExpressionAttributeValues: { ':p': `STATUS#${s}` },
        ScanIndexForward: false,
      }),
    ),
  )
  const shops = lists
    .flat()
    .map(toShop)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return ok({ shops })
}

/** POST /admin/shops/{shopId}/status  { status, reason? } */
export const adminSetStatus: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId')
  await requireShop(auth, shopId)
  const { status, reason } = parseBody(event, statusSchema)

  const now = new Date().toISOString()
  const res = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: keys.shop(shopId),
      ...buildUpdate({
        status,
        statusReason: reason ?? '',
        GSI1PK: `STATUS#${status as ShopStatus}`,
        GSI1SK: now,
        updatedAt: now,
      }),
      ReturnValues: 'ALL_NEW',
    }),
  )
  await audit(auth, shopId, 'STATUS_CHANGED', `Status set to ${status}${reason ? `: ${reason}` : ''}`)
  return ok({ shop: toShop(res.Attributes as Rec) })
}

/** GET /admin/shops/{shopId}/audit - newest first, last 50 entries */
export const adminAudit: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId')
  await requireShop(auth, shopId)
  const entries = (await listByPrefix(shopId, 'AUDIT#')).map(toAudit).sort((a, b) => b.at.localeCompare(a.at))
  return ok({ entries: entries.slice(0, 50) })
}
