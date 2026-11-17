import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { SCOPES } from '../constants'
import { env } from '../env'
import { COOKIE } from './cookies'

export interface Session {
  sub: string
  email: string
  role: 'admin' | 'owner'
  /** The ACCESS token, forwarded to API Gateway as the Bearer token. It lives in an httpOnly cookie, never in browser JS. */
  accessToken: string
}

function makeVerifiers() {
  return {
    id: CognitoJwtVerifier.create({ userPoolId: env.userPoolId, tokenUse: 'id', clientId: env.clientId }),
    access: CognitoJwtVerifier.create({ userPoolId: env.userPoolId, tokenUse: 'access', clientId: env.clientId }),
  }
}
let verifiers: ReturnType<typeof makeVerifiers> | undefined

/**
 * Verified session from the httpOnly cookies, or null. Memoised per request.
 * - ID token   -> identity (sub, email)
 * - access token -> role, taken from the openmenu/* scopes the pre-token Lambda put there (same source of truth as the API)
 * Token refresh happens in proxy.ts (cookies can't be written from Server Components).
 * Must be called inside <Suspense> because it reads cookies().
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const jar = await cookies()
  const idToken = jar.get(COOKIE.id)?.value
  const accessToken = jar.get(COOKIE.access)?.value
  if (!idToken || !accessToken) return null
  try {
    verifiers ??= makeVerifiers()
    const [idPayload, accessPayload] = await Promise.all([
      verifiers.id.verify(idToken),
      verifiers.access.verify(accessToken),
    ])
    if (idPayload.sub !== accessPayload.sub) return null // tokens from two different users: refuse

    const scopes = String(accessPayload.scope ?? '').split(/\s+/)
    if (!scopes.includes(SCOPES.shopRead)) return null // issued before scopes existed, or not an Open Menu token
    return {
      sub: accessPayload.sub,
      email: (idPayload.email as string | undefined) ?? '',
      role: scopes.includes(SCOPES.admin) ? 'admin' : 'owner',
      accessToken,
    }
  } catch {
    return null
  }
})

export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) redirect('/auth/login')
  return session
}

export async function requireAdmin(): Promise<Session> {
  const session = await requireSession()
  if (session.role !== 'admin') redirect('/dashboard')
  return session
}

/** Owner pages: admins have their own area. */
export async function requireOwner(): Promise<Session> {
  const session = await requireSession()
  if (session.role === 'admin') redirect('/admin')
  return session
}
