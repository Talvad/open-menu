import { randomUUID } from 'node:crypto';
import {
  BatchWriteCommand,
  DeleteCommand,
  GetCommand,
  PutCommand,
  TransactWriteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

import { audit } from '../lib/audit';
import { requireShop } from '../lib/auth';
import {
  buildUpdate,
  ddb,
  keys,
  listByPrefix,
  TABLE,
  type Rec,
} from '../lib/db';
import { created, HttpError, ok, parseBody } from '../lib/http';
import { bySort, toGroup, toItem, toShop } from '../lib/mappers';
import { pathParam, type Handler } from './types';
import { LIMITS } from '../lib/constants';
import {
  groupCreateSchema,
  groupUpdateSchema,
  itemImportSchema,
  itemCreateSchema,
  itemUpdateSchema,
} from '../lib/schemas';
import { ShopMenu } from '../lib/types';

const round2 = (n: number) => Math.round(n * 100) / 100;

/** An image key must live under this shop's prefix, so nobody can point at another shop's files. */
function assertImageKey(shopId: string, key: string | undefined) {
  if (key && !key.startsWith(`shops/${shopId}/`))
    throw new HttpError(400, 'Invalid image');
}

/* ------------------------------------------------------------------ */
/* Menu                                                                */
/* ------------------------------------------------------------------ */

/** GET /shops/{shopId}/menu - everything, including hidden groups/items (dashboard view). */
export const getMenu: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  const shop = await requireShop(auth, shopId);
  const [groups, items] = await Promise.all([
    listByPrefix(shopId, 'GROUP#'),
    listByPrefix(shopId, 'ITEM#'),
  ]);
  const body: ShopMenu = {
    shop: toShop(shop),
    groups: groups.map(toGroup).sort(bySort),
    items: items.map(toItem).sort(bySort),
  };
  return ok(body);
};

/* ------------------------------------------------------------------ */
/* Groups                                                              */
/* ------------------------------------------------------------------ */

export const createGroup: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  await requireShop(auth, shopId, { write: true });
  const input = parseBody(event, groupCreateSchema);

  const existing = await listByPrefix(shopId, 'GROUP#');
  if (existing.length >= LIMITS.maxGroupsPerShop) {
    throw new HttpError(
      409,
      `You can have at most ${LIMITS.maxGroupsPerShop} groups`,
    );
  }

  const groupId = randomUUID();
  const now = new Date().toISOString();
  const record: Rec = {
    ...keys.group(shopId, groupId),
    entity: 'GROUP',
    groupId,
    ...input,
    createdAt: now,
    updatedAt: now,
  };
  await ddb.send(new PutCommand({ TableName: TABLE, Item: record }));
  await audit(auth, shopId, 'GROUP_CREATED', `Created group "${input.name}"`);
  return created({ group: toGroup(record) });
};

export const updateGroup: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  const groupId = pathParam(event, 'groupId');
  await requireShop(auth, shopId, { write: true });
  const input = parseBody(event, groupUpdateSchema);

  try {
    const res = await ddb.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: keys.group(shopId, groupId),
        ConditionExpression: 'attribute_exists(PK)',
        ...buildUpdate({ ...input, updatedAt: new Date().toISOString() }),
        ReturnValues: 'ALL_NEW',
      }),
    );
    await audit(
      auth,
      shopId,
      'GROUP_UPDATED',
      `Updated group "${res.Attributes?.name}"`,
    );
    return ok({ group: toGroup(res.Attributes as Rec) });
  } catch (e) {
    if ((e as { name?: string }).name === 'ConditionalCheckFailedException')
      throw new HttpError(404, 'Group not found');
    throw e;
  }
};

/** Deleting a group also deletes the items inside it. */
export const deleteGroup: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  const groupId = pathParam(event, 'groupId');
  await requireShop(auth, shopId, { write: true });

  const group = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: keys.group(shopId, groupId) }),
  );
  if (!group.Item) throw new HttpError(404, 'Group not found');

  const items = (await listByPrefix(shopId, 'ITEM#')).filter(
    (i) => i.groupId === groupId,
  );
  const keysToDelete = [
    ...items.map((i) => ({ PK: i.PK, SK: i.SK })),
    keys.group(shopId, groupId),
  ];
  for (let i = 0; i < keysToDelete.length; i += 25) {
    const chunk = keysToDelete.slice(i, i + 25);
    await ddb.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE]: chunk.map((Key) => ({ DeleteRequest: { Key } })),
        },
      }),
    );
  }
  await audit(
    auth,
    shopId,
    'GROUP_DELETED',
    `Deleted group "${group.Item.name}" and ${items.length} item(s)`,
  );
  return ok({ ok: true });
};

/* ------------------------------------------------------------------ */
/* Items                                                               */
/* ------------------------------------------------------------------ */

async function assertGroupExists(shopId: string, groupId: string) {
  const g = await ddb.send(
    new GetCommand({ TableName: TABLE, Key: keys.group(shopId, groupId) }),
  );
  if (!g.Item) throw new HttpError(400, 'Group does not exist');
}

export const createItem: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  await requireShop(auth, shopId, { write: true });
  const input = parseBody(event, itemCreateSchema);
  assertImageKey(shopId, input.imageKey);
  await assertGroupExists(shopId, input.groupId);

  const existing = await listByPrefix(shopId, 'ITEM#');
  if (existing.length >= LIMITS.maxItemsPerShop) {
    throw new HttpError(
      409,
      `You can have at most ${LIMITS.maxItemsPerShop} items`,
    );
  }

  const itemId = randomUUID();
  const now = new Date().toISOString();
  const record: Rec = {
    ...keys.item(shopId, itemId),
    entity: 'ITEM',
    itemId,
    ...input,
    price: round2(input.price),
    createdAt: now,
    updatedAt: now,
  };
  await ddb.send(new PutCommand({ TableName: TABLE, Item: record }));
  await audit(auth, shopId, 'ITEM_CREATED', `Created item "${input.name}"`);
  return created({ item: toItem(record) });
};

export const importItems: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  await requireShop(auth, shopId, { write: true });
  const { items: input } = parseBody(event, itemImportSchema);

  const [existingItems, existingGroups] = await Promise.all([
    listByPrefix(shopId, 'ITEM#'),
    listByPrefix(shopId, 'GROUP#'),
  ]);
  if (existingItems.length + input.length > LIMITS.maxItemsPerShop) {
    throw new HttpError(
      409,
      `This import would exceed the ${LIMITS.maxItemsPerShop}-item menu limit`,
    );
  }

  const groups = new Set(existingGroups.map((group) => group.groupId));
  const existingNames = new Set(
    existingItems.map(
      (item) => `${item.groupId}:${String(item.name).normalize('NFKC').trim().toLowerCase()}`,
    ),
  );
  const importedNames = new Set<string>();
  const duplicates: string[] = [];

  for (const item of input) {
    if (!groups.has(item.groupId))
      throw new HttpError(400, `Group does not exist: ${item.groupId}`);
    const key = `${item.groupId}:${item.name.normalize('NFKC').trim().toLowerCase()}`;
    if (existingNames.has(key) || importedNames.has(key))
      duplicates.push(item.name);
    importedNames.add(key);
  }
  if (duplicates.length) {
    throw new HttpError(
      409,
      `Import contains duplicate item names: ${[...new Set(duplicates)].join(', ')}`,
    );
  }

  const now = new Date().toISOString();
  const groupIds = [...new Set(input.map((item) => item.groupId))];
  const itemRecords = input.map((item) => {
    const itemId = randomUUID();
    return {
      ...keys.item(shopId, itemId),
      entity: 'ITEM',
      itemId,
      ...item,
      price: round2(item.price),
      createdAt: now,
      updatedAt: now,
    };
  });
  const auditId = randomUUID().slice(0, 8);

  try {
    await ddb.send(
      new TransactWriteCommand({
        TransactItems: [
          ...groupIds.map((groupId) => ({
            ConditionCheck: {
              TableName: TABLE,
              Key: keys.group(shopId, groupId),
              ConditionExpression: 'attribute_exists(PK)',
            },
          })),
          ...itemRecords.map((Item) => ({
            Put: {
              TableName: TABLE,
              Item,
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          })),
          {
            Put: {
              TableName: TABLE,
              Item: {
                PK: `SHOP#${shopId}`,
                SK: `AUDIT#${now}#${auditId}`,
                entity: 'AUDIT',
                at: now,
                actorSub: auth.sub,
                actorEmail: auth.email,
                actorRole: auth.role,
                action: 'ITEMS_IMPORTED',
                summary: `Imported ${itemRecords.length} menu item(s)`,
              },
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          },
        ],
      }),
    );
  } catch (error) {
    if ((error as { name?: string }).name === 'TransactionCanceledException')
      throw new HttpError(
        409,
        'The menu changed while importing. Refresh it and try again.',
      );
    throw error;
  }

  return created({ imported: itemRecords.length });
};

export const updateItem: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  const itemId = pathParam(event, 'itemId');
  await requireShop(auth, shopId, { write: true });
  const input = parseBody(event, itemUpdateSchema);
  assertImageKey(shopId, input.imageKey);
  if (input.groupId) await assertGroupExists(shopId, input.groupId);

  try {
    const res = await ddb.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: keys.item(shopId, itemId),
        ConditionExpression: 'attribute_exists(PK)',
        ...buildUpdate({
          ...input,
          price: input.price === undefined ? undefined : round2(input.price),
          updatedAt: new Date().toISOString(),
        }),
        ReturnValues: 'ALL_NEW',
      }),
    );
    await audit(
      auth,
      shopId,
      'ITEM_UPDATED',
      `Updated item "${res.Attributes?.name}": ${Object.keys(input).join(', ')}`,
    );
    return ok({ item: toItem(res.Attributes as Rec) });
  } catch (e) {
    if ((e as { name?: string }).name === 'ConditionalCheckFailedException')
      throw new HttpError(404, 'Item not found');
    throw e;
  }
};

export const deleteItem: Handler = async ({ event, auth }) => {
  const shopId = pathParam(event, 'shopId');
  const itemId = pathParam(event, 'itemId');
  await requireShop(auth, shopId, { write: true });

  try {
    const res = await ddb.send(
      new DeleteCommand({
        TableName: TABLE,
        Key: keys.item(shopId, itemId),
        ConditionExpression: 'attribute_exists(PK)',
        ReturnValues: 'ALL_OLD',
      }),
    );
    await audit(
      auth,
      shopId,
      'ITEM_DELETED',
      `Deleted item "${res.Attributes?.name}"`,
    );
    return ok({ ok: true });
  } catch (e) {
    if ((e as { name?: string }).name === 'ConditionalCheckFailedException')
      throw new HttpError(404, 'Item not found');
    throw e;
  }
};
