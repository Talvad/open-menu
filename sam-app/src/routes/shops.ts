import { randomUUID } from 'node:crypto'
import { GetCommand, TransactWriteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { shopCreateSchema, shopUpdateSchema, type Me } from '@open-menu/shared'
import { requireShop, getShopRecord } from '../lib/auth'
import { audit } from '../lib/audit'
import { buildUpdate, ddb, keys, TABLE, type Rec } from '../lib/db'
import { created, HttpError, ok, parseBody } from '../lib/http'
import { toShop } from '../lib/mappers'
import { pathParam, type Handler } from './types'

/** GET /me - who am I, and which shop (if any) do I own? */
export const getMe: Handler = async ({ auth }) => {
  let shop: Rec | null = null
  if (auth.role === 'owner') {
    const lock = await ddb.send(new GetCommand({ TableName: TABLE, Key: keys.ownerShop(auth.sub) }))
    const shopId = lock.Item?.shopId as string | undefined
    if (shopId) shop = await getShopRecord(shopId)
  }
  const body: Me = {
    user: { sub: auth.sub, email: auth.email, role: auth.role },
    shop: shop ? toShop(shop) : null,
  }
  return ok(body)
}

/** POST /shops - owner creates their shop (status PENDING until an admin approves). */
export const createShop: Handler = async ({ event, auth }) => {
  if (auth.role === 'admin') throw new HttpError(403, 'Admins cannot own shops')
  const input = parseBody(event, shopCreateSchema)

  const shopId = randomUUID()
  const now = new Date().toISOString()
  const record: Rec = {
    ...keys.shop(shopId),
    entity: 'SHOP',
    shopId,
    ...input,
    status: 'PENDING',
    statusReason: '',
    ownerSub: auth.sub,
    ownerEmail: auth.email,
    createdAt: now,
    updatedAt: now,
    GSI1PK: 'STATUS#PENDING',
    GSI1SK: now,
  }

  try {
    // One transaction: reserve the slug, lock "one shop per owner", write the shop.
    await ddb.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: TABLE,
              Item: { ...keys.slug(input.slug), entity: 'SLUG', shopId },
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          },
          {
            Put: {
              TableName: TABLE,
              Item: { ...keys.ownerShop(auth.sub), entity: 'OWNER_SHOP', shopId },
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          },
          { Put: { TableName: TABLE, Item: record, ConditionExpression: 'attribute_not_exists(PK)' } },
        ],
      }),
    )
  } catch (e) {
    const err = e as { name?: string; CancellationReasons?: { Code?: string }[] }
    if (err.name === 'TransactionCanceledException') {
      const reasons = err.CancellationReasons ?? []
      if (reasons[0]?.Code === 'ConditionalCheckFailed') throw new HttpError(409, 'That web address is already taken')
      if (reasons[1]?.Code === 'ConditionalCheckFailed') throw new HttpError(409, 'You already have a shop')
    }
    throw e
  }

  await audit(auth, shopId, 'SHOP_CREATED', `Created shop "${input.name}" (/${input.slug})`)
  return created({ shop: toShop(record) })
}

/** GET /shops/{shopId} */
export const getShop: Handler = async ({ event, auth }) => {
  const shop = await requireShop(auth, pathParam(event, 'shopId'))
  return ok({ shop: toShop(shop) })
}

/** PUT /shops/{shopId} - slug and status cannot be changed here. */
export const updateShop: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId')
  await requireShop(auth, shopId, { write: true })
  const input = parseBody(event, shopUpdateSchema)

  const res = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: keys.shop(shopId),
      ConditionExpression: 'attribute_exists(PK)',
      ...buildUpdate({ ...input, updatedAt: new Date().toISOString() }),
      ReturnValues: 'ALL_NEW',
    }),
  )
  await audit(auth, shopId, 'SHOP_UPDATED', `Updated shop details: ${Object.keys(input).join(', ') || 'none'}`)
  return ok({ shop: toShop(res.Attributes as Rec) })
}

/** POST /shops/{shopId}/submit - a rejected shop is edited and sent back for review. */
export const submitShop: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId')
  const shop = await requireShop(auth, shopId, { write: true })
  if (shop.status !== 'REJECTED') throw new HttpError(409, 'Only rejected shops can be resubmitted')

  const now = new Date().toISOString()
  const res = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: keys.shop(shopId),
      ...buildUpdate({ status: 'PENDING', statusReason: '', GSI1PK: 'STATUS#PENDING', GSI1SK: now, updatedAt: now }),
      ReturnValues: 'ALL_NEW',
    }),
  )
  await audit(auth, shopId, 'SHOP_RESUBMITTED', 'Resubmitted for review')
  return ok({ shop: toShop(res.Attributes as Rec) })
}
