export const COOKIE = {
  id: 'om_id', // ID token: who the user is (email), used by the web app only
  access: 'om_access', // access token: what the user may do, sent to API Gateway (carries the openmenu/* scopes)
  refresh: 'om_refresh',
  pkce: 'om_pkce',
  retry: 'om_retry',
} as const

const secure = process.env.NODE_ENV === 'production'

export const baseCookie = {
  httpOnly: true,
  secure,
  sameSite: 'lax' as const,
  path: '/',
}

export const ID_COOKIE_MAX_AGE = 60 * 60 // matches the 60 minute ID / access token validity in template.yaml
export const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // matches RefreshTokenValidity (30 days)

/** Read `exp` (seconds) from a JWT without verifying it. Only for deciding when to refresh. */
export function jwtExp(token: string): number {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64url').toString('utf8'))
    return typeof payload.exp === 'number' ? payload.exp : 0
  } catch {
    return 0
  }
}

/** Only allow same-site relative redirects after login. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/dashboard'
  return value
}
