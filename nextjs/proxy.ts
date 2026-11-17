// Next.js 16 "proxy" (formerly middleware).
// Deliberately coarse: it only keeps the session fresh and redirects anonymous visitors.
// Real authorization happens in lib/auth/session.ts and in API Gateway (scopes) + the Lambdas (shop ownership).
import { connection, NextResponse, type NextRequest } from 'next/server';
import { refreshTokens } from './lib/auth/cognito';
import {
  baseCookie,
  COOKIE,
  ID_COOKIE_MAX_AGE,
  jwtExp,
} from './lib/auth/cookies';

export async function proxy(request: NextRequest) {
  const id = request.cookies.get(COOKIE.id)?.value;
  const access = request.cookies.get(COOKIE.access)?.value;
  const refresh = request.cookies.get(COOKIE.refresh)?.value;
  await connection();
  const now = Date.now() / 1000;

  // Both tokens fresh: nothing to do.
  if (id && access && jwtExp(id) - now > 60 && jwtExp(access) - now > 60)
    return NextResponse.next();

  // Either token expired or missing (this also covers sessions created before access-token auth existed),
  // but we have a refresh token: fetch a new pair. Cognito also re-runs the pre-token Lambda, so scopes are re-evaluated.
  if (refresh) {
    try {
      const tokens = await refreshTokens(refresh);
      request.cookies.set(COOKIE.id, tokens.id_token); // so Server Components in this request see them
      request.cookies.set(COOKIE.access, tokens.access_token);
      const response = NextResponse.next({ request });
      response.cookies.set(COOKIE.id, tokens.id_token, {
        ...baseCookie,
        maxAge: ID_COOKIE_MAX_AGE,
      });
      response.cookies.set(COOKIE.access, tokens.access_token, {
        ...baseCookie,
        maxAge: ID_COOKIE_MAX_AGE,
      });
      return response;
    } catch {
      // refresh token expired or revoked -> fall through to login
    }
  }

  const login = new URL('/auth/login', request.url);
  login.searchParams.set(
    'next',
    request.nextUrl.pathname + request.nextUrl.search,
  );
  const response = NextResponse.redirect(login);
  response.cookies.delete(COOKIE.id);
  response.cookies.delete(COOKIE.access);
  response.cookies.delete(COOKIE.refresh);
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
