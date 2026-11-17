import { assertScope, getAuth } from '../lib/auth'
import { errorResponse, HttpError, json, type ApiEvent } from '../lib/http'
import { adminAudit, adminListShops, adminSetStatus } from '../routes/admin'
import {
  createGroup,
  createItem,
  deleteGroup,
  deleteItem,
  getMenu,
  updateGroup,
  updateItem,
} from '../routes/menu'
import { createShop, getMe, getShop, submitShop, updateShop } from '../routes/shops'
import type { Handler } from '../routes/types'
import { createUploadUrl } from '../routes/uploads'

/** Keys must match the routes declared in template.yaml (API Gateway's routeKey). */
const routes: Record<string, Handler> = {
  'GET /me': getMe,
  'POST /shops': createShop,
  'GET /shops/{shopId}': getShop,
  'PUT /shops/{shopId}': updateShop,
  'POST /shops/{shopId}/submit': submitShop,
  'GET /shops/{shopId}/menu': getMenu,
  'POST /shops/{shopId}/groups': createGroup,
  'PUT /shops/{shopId}/groups/{groupId}': updateGroup,
  'DELETE /shops/{shopId}/groups/{groupId}': deleteGroup,
  'POST /shops/{shopId}/items': createItem,
  'PUT /shops/{shopId}/items/{itemId}': updateItem,
  'DELETE /shops/{shopId}/items/{itemId}': deleteItem,
  'POST /shops/{shopId}/upload-url': createUploadUrl,
  'GET /admin/shops': adminListShops,
  'POST /admin/shops/{shopId}/status': adminSetStatus,
  'GET /admin/shops/{shopId}/audit': adminAudit,
}

export const handler = async (event: ApiEvent) => {
  try {
    const route = routes[event.routeKey]
    if (!route) throw new HttpError(404, 'Not found')

    // API Gateway already rejected tokens without the route's scope; this is the second, in-code check.
    const auth = getAuth(event)
    assertScope(auth, event.routeKey)

    const result = await route({ event, auth })
    return json(result.status, result.body)
  } catch (e) {
    return errorResponse(e)
  }
}
