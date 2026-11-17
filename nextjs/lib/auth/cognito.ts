// Cognito Hosted UI helpers: Authorization Code flow with PKCE.
// Used by the /auth route handlers and by proxy.ts (token refresh), so no 'server-only' import.
import { createHash, randomBytes } from 'node:crypto'
import { env } from '../env'

export interface TokenSet {
  id_token: string
  access_token: string
  refresh_token?: string
  expires_in: number
}

const b64url = (buf: Buffer) => buf.toString('base64url')

export function createPkce() {
  const verifier = b64url(randomBytes(32))
  const challenge = b64url(createHash('sha256').update(verifier).digest())
  return { verifier, challenge }
}

export const createState = () => b64url(randomBytes(16))

export const redirectUri = () => `${env.appUrl}/auth/callback`

export function buildAuthorizeUrl(opts: { state: string; challenge: string; signup?: boolean; google?: boolean }) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.clientId,
    redirect_uri: redirectUri(),
    scope: 'openid email profile',
    state: opts.state,
    code_challenge: opts.challenge,
    code_challenge_method: 'S256',
  })
  // identity_provider skips the Hosted UI screen and goes straight to Google.
  if (opts.google) params.set('identity_provider', 'Google')
  const page = opts.signup && !opts.google ? 'signup' : 'oauth2/authorize'
  return `${env.cognitoDomain}/${page}?${params}`
}

async function tokenRequest(body: Record<string, string>): Promise<TokenSet> {
  const res = await fetch(`${env.cognitoDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: env.clientId, ...body }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Cognito token endpoint returned ${res.status}`)
  return res.json()
}

export const exchangeCode = (code: string, verifier: string) =>
  tokenRequest({
    grant_type: 'authorization_code',
    code,
    code_verifier: verifier,
    redirect_uri: redirectUri(),
  })

export const refreshTokens = (refreshToken: string) =>
  tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken })

export const logoutUrl = () =>
  `${env.cognitoDomain}/logout?${new URLSearchParams({ client_id: env.clientId, logout_uri: env.appUrl })}`
