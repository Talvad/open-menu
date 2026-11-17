import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand, type QueryCommandInput } from '@aws-sdk/lib-dynamodb'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rec = Record<string, any>

export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
})

export const TABLE = process.env.TABLE_NAME as string

export const keys = {
  shop: (shopId: string) => ({ PK: `SHOP#${shopId}`, SK: 'META' }),
  group: (shopId: string, groupId: string) => ({ PK: `SHOP#${shopId}`, SK: `GROUP#${groupId}` }),
  item: (shopId: string, itemId: string) => ({ PK: `SHOP#${shopId}`, SK: `ITEM#${itemId}` }),
  slug: (slug: string) => ({ PK: `SLUG#${slug}`, SK: 'META' }),
  ownerShop: (sub: string) => ({ PK: `OWNER#${sub}`, SK: 'SHOP' }),
  ownerProfile: (sub: string) => ({ PK: `OWNER#${sub}`, SK: 'PROFILE' }),
}

/** Query that follows LastEvaluatedKey (bounded, so a bug can't loop forever). */
export async function queryAll(input: Omit<QueryCommandInput, 'TableName'>, maxPages = 20): Promise<Rec[]> {
  const out: Rec[] = []
  let startKey: Rec | undefined
  for (let page = 0; page < maxPages; page++) {
    const res = await ddb.send(new QueryCommand({ ...input, TableName: TABLE, ExclusiveStartKey: startKey }))
    out.push(...((res.Items as Rec[]) ?? []))
    startKey = res.LastEvaluatedKey
    if (!startKey) break
  }
  return out
}

export function listByPrefix(shopId: string, prefix: string) {
  return queryAll({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: { ':pk': `SHOP#${shopId}`, ':sk': prefix },
  })
}

/** Build a SET expression from a plain object, skipping undefined values. */
export function buildUpdate(fields: Record<string, unknown>) {
  const names: Record<string, string> = {}
  const values: Record<string, unknown> = {}
  const sets: string[] = []
  let i = 0
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue
    names[`#f${i}`] = key
    values[`:v${i}`] = value
    sets.push(`#f${i} = :v${i}`)
    i++
  }
  return {
    UpdateExpression: `SET ${sets.join(', ')}`,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
  }
}
