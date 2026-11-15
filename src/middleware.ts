import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'sdn07_admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya periksa rute yang diawali dengan /admin
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    const isLoginPage = pathname === '/admin/login';

    // Jika belum login dan mencoba mengakses dashboard/halaman admin lain
    if (!sessionToken && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Jika sudah memiliki token dan mencoba mengakses halaman login kembali
    if (sessionToken && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
