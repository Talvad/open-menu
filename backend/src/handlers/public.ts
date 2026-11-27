import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { slugSchema } from '../lib/schemas';
import { ddb, keys, listByPrefix, TABLE, type Rec } from '../lib/db';
import { errorResponse, json } from '../lib/http';
import { bySort, toGroup, toItem } from '../lib/mappers';

/**
 * GET /public/shops/{slug}  (no auth)
 * Only APPROVED shops are visible, and only visible groups/items are returned.
 * Unknown, unapproved and suspended shops all look identical: 404.
 */
export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const slug = (event.pathParameters?.slug ?? '').toLowerCase();
    if (!slugSchema.safeParse(slug).success)
      return json(404, { message: 'Not found' });

    const slugRec = await ddb.send(
      new GetCommand({ TableName: TABLE, Key: keys.slug(slug) }),
    );
    const shopId = slugRec.Item?.shopId as string | undefined;
    if (!shopId) return json(404, { message: 'Not found' });

    const [shopRes, groups, items] = await Promise.all([
      ddb.send(new GetCommand({ TableName: TABLE, Key: keys.shop(shopId) })),
      listByPrefix(shopId, 'GROUP#'),
      listByPrefix(shopId, 'ITEM#'),
    ]);
    const shop = shopRes.Item as Rec | undefined;
    if (!shop || shop.status !== 'APPROVED')
      return json(404, { message: 'Not found' });

    const now = Date.now();
    let nextTransitionAt = Number.POSITIVE_INFINITY;
    const visibleItems = items.map(toItem).filter((item) => item.visible);
    for (const item of visibleItems) {
      if (!item.schedule) continue;
      const start = Date.parse(item.schedule.startsAt);
      const end = Date.parse(item.schedule.endsAt);
      if (start > now) nextTransitionAt = Math.min(nextTransitionAt, start);
      else if (end > now) nextTransitionAt = Math.min(nextTransitionAt, end);
    }

    const publicGroups = groups
      .map(toGroup)
      .filter((g) => g.visible)
      .sort(bySort)
      .map((g) => ({
        id: g.id,
        name: g.name,
        items: visibleItems
          .filter((i) => i.groupId === g.id)
          .sort(bySort)
          .map((i) => {
            const schedule = i.schedule;
            const active =
              schedule !== undefined &&
              Date.parse(schedule.startsAt) <= now &&
              now < Date.parse(schedule.endsAt);
            const specialPrice = active ? schedule?.specialPrice : undefined;
            return {
              id: i.id,
              name: i.name,
              description: i.description,
              price: specialPrice ?? i.price,
              ...(specialPrice !== undefined && specialPrice < i.price
                ? { originalPrice: i.price }
                : {}),
              ...(active && schedule?.label
                ? { specialLabel: schedule.label }
                : {}),
              imageUrl: i.imageUrl,
              available:
                active && schedule?.availability !== undefined
                  ? schedule.availability
                  : i.available,
              tags: i.tags,
              attributes: i.attributes,
              ...(i.variant ? { variant: i.variant } : {}),
              extras: i.extras,
            };
          }),
      }))
      .filter((g) => g.items.length > 0);

    const body = {
      shop: {
        id: shop.shopId,
        name: shop.name,
        slug: shop.slug,
        type: shop.type,
        description: shop.description ?? '',
        phone: shop.phone ?? '',
        whatsapp: shop.whatsapp ?? '',
        address: shop.address ?? '',
        currency: shop.currency,
        timeZone: shop.timeZone ?? 'Asia/Kolkata',
      },
      groups: publicGroups,
      ...(Number.isFinite(nextTransitionAt)
        ? {
            nextTransitionInSeconds: Math.max(
              1,
              Math.ceil((nextTransitionAt - now) / 1000),
            ),
          }
        : {}),
    };
    return json(200, body, {
      'cache-control': 'public, max-age=0, must-revalidate',
    });
  } catch (e) {
    return errorResponse(e);
  }
};
