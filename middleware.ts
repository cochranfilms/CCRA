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
  const isStaticAsset = /\.(?:png|jpg|jpeg|webp|svg|gif|ico|mp4|webm|mov|m4v|mp3|wav|css|js|json|txt|xml|pdf|woff2?|ttf|eot)$/i.test(pathname);
  const isExemptFromMaintenance =
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/maintenance.html' ||
    isStaticAsset;

  if (isMaintenance && !isExemptFromMaintenance) {
    const maintenanceUrl = new URL('/maintenance', req.url);
    const accept = req.headers.get('accept') || '';
    if (accept.includes('text/html')) {
      const rewrite = NextResponse.rewrite(maintenanceUrl);
      rewrite.headers.set('Cache-Control', 'no-store');
      rewrite.headers.set('x-maintenance', '1');
      try { rewrite.cookies.set('maintenance', '1', { path: '/', sameSite: 'lax' }); } catch {}
      return rewrite;
    }
    const res = NextResponse.redirect(maintenanceUrl, { status: 302 });
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('x-maintenance', '1');
    try { res.cookies.set('maintenance', '1', { path: '/', sameSite: 'lax' }); } catch {}
    return res;
  }

  // Staging basic auth protection
  if (!isStagingRequest(req)) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store');
    if (isMaintenance) res.headers.set('x-maintenance', '1');
    try { res.cookies.set('maintenance', isMaintenance ? '1' : '0', { path: '/', sameSite: 'lax' }); } catch {}
    return res;
  }

  const username = process.env.STAGING_BASIC_AUTH_USER || '';
  const password = process.env.STAGING_BASIC_AUTH_PASS || '';
  if (!username || !password) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store');
    if (isMaintenance) res.headers.set('x-maintenance', '1');
    try { res.cookies.set('maintenance', isMaintenance ? '1' : '0', { path: '/', sameSite: 'lax' }); } catch {}
    return res;
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

  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store');
  if (isMaintenance) res.headers.set('x-maintenance', '1');
  try { res.cookies.set('maintenance', isMaintenance ? '1' : '0', { path: '/', sameSite: 'lax' }); } catch {}
  return res;
}

export const config = {
  matcher: ['/(.*)'],
};


