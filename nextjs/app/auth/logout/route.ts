import { NextResponse } from 'next/server'
import { logoutUrl } from '@/lib/auth/cognito'
import { COOKIE } from '@/lib/auth/cookies'

// POST only, so a random page can't log users out with an <img> tag.
export async function POST() {
  // 303 so the browser follows the redirect with GET.
  const response = NextResponse.redirect(logoutUrl(), 303)
  response.cookies.delete(COOKIE.id)
  response.cookies.delete(COOKIE.access)
  response.cookies.delete(COOKIE.refresh)
  response.cookies.delete(COOKIE.pkce)
  return response
}
