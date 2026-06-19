import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const session = req.cookies.get('better-auth.session_token')?.value;
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === '/admin/login';

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
