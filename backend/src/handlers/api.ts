import { assertScope, getAuth } from "../lib/auth";
import { errorResponse, HttpError, json, type ApiEvent } from "../lib/http";
import { getMe } from "../routes/shops";
import type { Handler } from "../routes/types";

/** Keys must match the routes declared in template.yaml (API Gateway's routeKey). */
const routes: Record<string, Handler> = {
  "GET /me": getMe,
};

export const handler = async (event: ApiEvent) => {
  try {
    const route = routes[event.routeKey];
    if (!route) throw new HttpError(404, "Not found");

    // API Gateway already rejected tokens without the route's scope; this is the second, in-code check.
    const auth = getAuth(event);
    assertScope(auth, event.routeKey);

    const result = await route({ event, auth });
    return json(result.status, result.body);
  } catch (e) {
    return errorResponse(e);
  }
};
