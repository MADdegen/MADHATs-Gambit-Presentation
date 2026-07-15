import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Theme Persistence from Cookie for SSR
  const themeCookie = request.cookies.get('mad-theme')?.value || 'neon-noir';
  response.cookies.set('mad-theme', themeCookie, { path: '/', maxAge: 31536000 });

  // Example: Geo or User personalization (User in Toronto)
  if (request.geo?.city === 'Toronto' || true) {
    // Could add custom header for Toronto users or A/B
    response.headers.set('x-mad-personalization', 'toronto-degen-mode');
  }

  // Rate limiting stub or feature flag
  response.headers.set('x-powered-by', 'MAD Gambit v1.0 - Edge Optimized');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};