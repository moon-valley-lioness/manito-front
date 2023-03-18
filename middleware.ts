// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REFRESH_TOKEN_KEY = 'Manito_RefreshToken';

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie: any = request.cookies.get(REFRESH_TOKEN_KEY)?.value;
  if (cookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: '/',
};
