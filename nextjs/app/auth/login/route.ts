import { NextResponse, type NextRequest } from 'next/server'
import { buildAuthorizeUrl, createPkce, createState } from '@/lib/auth/cognito'
import { baseCookie, COOKIE, safeNext } from '@/lib/auth/cookies'

// GET /auth/login            -> Cognito Hosted UI sign-in
// GET /auth/login?mode=signup -> Cognito Hosted UI sign-up
// GET /auth/login?provider=google -> straight to Google (needs GoogleClientId set in the SAM stack)
// GET /auth/login?next=/dashboard/menu
export async function GET(request: NextRequest) {
  const { verifier, challenge } = createPkce()
  const state = createState()
  const next = safeNext(request.nextUrl.searchParams.get('next'))
  const signup = request.nextUrl.searchParams.get('mode') === 'signup'
  const google = request.nextUrl.searchParams.get('provider') === 'google'

  const response = NextResponse.redirect(buildAuthorizeUrl({ state, challenge, signup, google }))
  response.cookies.set(COOKIE.pkce, JSON.stringify({ verifier, state, next }), {
    ...baseCookie,
    maxAge: 10 * 60,
  })
  return response
}
