import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Better Auth sets this cookie on successful sign-in via the NestJS API
  const session = req.cookies.get('better-auth.session_token')?.value;
  const isLoginPage = req.nextUrl.pathname.includes('/login');

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
