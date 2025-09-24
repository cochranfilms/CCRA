import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isStagingRequest(req: NextRequest): boolean {
  const flag = process.env.NEXT_PUBLIC_IS_STAGING === 'true' || process.env.VERCEL_ENV === 'preview';
  const host = req.headers.get('host') || '';
  return flag || host.startsWith('staging.');
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname || '/';

  // Maintenance mode: when enabled via env, route all non-exempt paths to /maintenance
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' || process.env.MAINTENANCE_MODE === 'true';
  const isExemptFromMaintenance =
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/maintenance.html';

  if (isMaintenance && !isExemptFromMaintenance) {
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  // Staging basic auth protection
  if (!isStagingRequest(req)) {
    return NextResponse.next();
  }

  const username = process.env.STAGING_BASIC_AUTH_USER || '';
  const password = process.env.STAGING_BASIC_AUTH_PASS || '';
  if (!username || !password) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization') || '';
  if (!authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Staging"' },
    });
  }

  const base64 = authHeader.slice(6);
  let decoded = '';
  try {
    decoded = atob(base64);
  } catch {
    return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Staging"' } });
  }
  const [user, pass] = decoded.split(':');
  if (user !== username || pass !== password) {
    return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Staging"' } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)'],
};


