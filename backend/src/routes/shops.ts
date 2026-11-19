import { GetCommand } from "@aws-sdk/lib-dynamodb";

import { getShopRecord } from "../lib/auth";
import { ddb, keys, TABLE, type Rec } from "../lib/db";
import { ok } from "../lib/http";
import { toShop } from "../lib/mappers";
import { type Handler } from "./types";
import { Me } from "../lib/types";

/** GET /me - who am I, and which shop (if any) do I own? */
export const getMe: Handler = async ({ auth }) => {
  let shop: Rec | null = null;
  if (auth.role === "owner") {
    const lock = await ddb.send(
      new GetCommand({ TableName: TABLE, Key: keys.ownerShop(auth.sub) }),
    );
    const shopId = lock.Item?.shopId as string | undefined;
    if (shopId) shop = await getShopRecord(shopId);
  }
  const body: Me = {
    user: { sub: auth.sub, email: auth.email, role: auth.role },
    shop: shop ? toShop(shop) : null,
  };
  return ok(body);
};
