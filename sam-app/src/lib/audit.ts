import { randomUUID } from 'node:crypto'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import type { Auth } from './auth'
import { ddb, TABLE } from './db'

/** Best-effort audit trail: never fail the user's request because logging failed. */
export async function audit(auth: Auth, shopId: string, action: string, summary: string) {
  try {
    const at = new Date().toISOString()
    await ddb.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          PK: `SHOP#${shopId}`,
          SK: `AUDIT#${at}#${randomUUID().slice(0, 8)}`,
          entity: 'AUDIT',
          at,
          actorSub: auth.sub,
          actorEmail: auth.email,
          actorRole: auth.role,
          action,
          summary: summary.slice(0, 300),
        },
      }),
    )
  } catch (e) {
    console.error('audit write failed', e)
  }
}
