import 'server-only';
import type { AuditEntry, Me, Shop, ShopMenu } from './types';
import { requireSession } from './auth/session';
import { env } from './env';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Server-side call to API Gateway with the signed-in user's ACCESS token. API Gateway checks the token and the
 * route's required scope before any Lambda runs. The token lives in an httpOnly cookie, only read on the server.
 */
export async function api<T>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<T> {
  const session = await requireSession();
  const hasBody = init.body !== undefined;
  const res = await fetch(`${env.apiUrl}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      authorization: `Bearer ${session.accessToken}`,
      ...(hasBody ? { 'content-type': 'application/json' } : {}),
    },
    body: hasBody ? JSON.stringify(init.body) : undefined,
    cache: 'no-store',
  });
  const data = (await res.json().catch(() => null)) as {
    message?: string;
  } | null;
  if (!res.ok)
    throw new ApiError(
      res.status,
      data?.message ?? `Request failed (${res.status})`,
    );
  return data as T;
}

export const getMe = () => api<Me>('/me');
export const getShopMenu = (shopId: string) =>
  api<ShopMenu>(`/shops/${shopId}/menu`);
export const getAdminShops = (status: string) =>
  api<{ shops: Shop[] }>(`/admin/shops?status=${encodeURIComponent(status)}`);
export const getAudit = (shopId: string) =>
  api<{ entries: AuditEntry[] }>(`/admin/shops/${shopId}/audit`);
