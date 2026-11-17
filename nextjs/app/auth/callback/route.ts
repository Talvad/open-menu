import { NextResponse, type NextRequest } from 'next/server'
import { exchangeCode } from '@/lib/auth/cognito'
import { baseCookie, COOKIE, ID_COOKIE_MAX_AGE, REFRESH_COOKIE_MAX_AGE, safeNext } from '@/lib/auth/cookies'
import { env } from '@/lib/env'

export async function GET(request: NextRequest) {
  const fail = () => {
    const res = NextResponse.redirect(new URL('/?error=auth', env.appUrl))
    res.cookies.delete(COOKIE.pkce)
    return res
  }

  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const raw = request.cookies.get(COOKIE.pkce)?.value

  // Known Cognito quirk: when the pre-signup Lambda links a Google identity to an existing account during the very
  // first Google sign-in, Cognito redirects back with this error. The link now exists, so one retry succeeds.
  const description = request.nextUrl.searchParams.get('error_description') ?? ''
  if (!code && /already found an entry for username/i.test(description) && !request.cookies.get(COOKIE.retry)) {
    let next = '/dashboard'
    try {
      next = safeNext(JSON.parse(raw ?? '{}').next)
    } catch {
      /* use the default */
    }
    const retry = new URL('/auth/login', env.appUrl)
    retry.searchParams.set('provider', 'google')
    retry.searchParams.set('next', next)
    const res = NextResponse.redirect(retry)
    res.cookies.set(COOKIE.retry, '1', { ...baseCookie, maxAge: 60 }) // one retry only, never a loop
    return res
  }

  if (!code || !state || !raw) return fail()

  let saved: { verifier: string; state: string; next: string }
  try {
    saved = JSON.parse(raw)
  } catch {
    return fail()
  }
  if (saved.state !== state) return fail() // CSRF / mixed-up login attempts

  try {
    const tokens = await exchangeCode(code, saved.verifier)
    const response = NextResponse.redirect(new URL(safeNext(saved.next), env.appUrl))
    response.cookies.set(COOKIE.id, tokens.id_token, { ...baseCookie, maxAge: ID_COOKIE_MAX_AGE })
    response.cookies.set(COOKIE.access, tokens.access_token, { ...baseCookie, maxAge: ID_COOKIE_MAX_AGE })
    if (tokens.refresh_token) {
      response.cookies.set(COOKIE.refresh, tokens.refresh_token, { ...baseCookie, maxAge: REFRESH_COOKIE_MAX_AGE })
    }
    response.cookies.delete(COOKIE.pkce)
    response.cookies.delete(COOKIE.retry)
    return response
  } catch (e) {
    console.error('Auth callback failed', e)
    return fail()
  }
}
