import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ==========================================
// AUTH MIDDLEWARE - Protects admin routes
// ==========================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only check admin routes
  if (pathname.startsWith('/admin')) {

    // Get all cookies
    const cookies = request.cookies.getAll();

    // Check if any session/auth cookie exists
    const hasSession = cookies.some(cookie => {
      const name = cookie.name.toLowerCase();
      return name.includes('session') || name.includes('auth') || name.includes('token');
    });

    // No session = redirect to login
    if (!hasSession) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
