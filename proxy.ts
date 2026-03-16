import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rute publice — accesibile fără autentificare
  const isPublicRoute = pathname === '/login' || pathname === '/register';

  // Rute de admin
  const isAdminRoute = pathname.startsWith('/admin');

  // Cookie setat de client după login (vezi AuthProvider)
  const isLoggedIn = request.cookies.has('auth-session');

  // 1. Utilizator nelogat încearcă să acceseze o pagină protejată → redirecționează la /login
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Utilizator deja logat încearcă să acceseze /login sau /register → redirecționează la /
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // TODO: reactivează verificarea de rol când adminul e gata
  // if (isAdminRoute) {
  //   const userRole = request.cookies.get('user-role')?.value;
  //   if (userRole !== 'admin') {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
