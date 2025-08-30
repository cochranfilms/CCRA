import { NextRequest, NextResponse } from 'next/server';

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
  // Allow arbitrary extra fields from the provider
  [key: string]: unknown;
};

function isTokenResponse(value: unknown): value is TokenResponse {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.access_token === 'string';
}

export async function GET(req: NextRequest) {
  const tokenUrl = process.env.LOFTY_OAUTH_TOKEN_URL;
  const clientId = process.env.LOFTY_CLIENT_ID;
  const redirectUri = process.env.LOFTY_AUTH_REDIRECT_URI;
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const expectedState = req.cookies.get('lofty_oauth_state')?.value;
  const verifier = req.cookies.get('lofty_pkce_verifier')?.value;
  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    return NextResponse.json({ error: 'Invalid OAuth callback' }, { status: 400 });
  }
  if (!tokenUrl || !clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing OAuth configuration' }, { status: 500 });
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    code_verifier: verifier,
    redirect_uri: redirectUri,
  });

  const resp = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    cache: 'no-store',
  });

  const parsed: unknown = await resp.json().catch(() => null);
  if (!resp.ok || !isTokenResponse(parsed)) {
    return NextResponse.json({ error: 'Token exchange failed', details: parsed }, { status: 500 });
  }
  const json = parsed; // narrowed to TokenResponse

  const res = NextResponse.redirect(new URL('/', req.url));
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: json.expires_in ? Number(json.expires_in) : 60 * 60, // 1h default
  };
  res.cookies.set('lofty_access_token', json.access_token, cookieOptions);
  if (json.refresh_token) {
    res.cookies.set('lofty_refresh_token', json.refresh_token, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 });
  }
  res.cookies.delete('lofty_pkce_verifier');
  res.cookies.delete('lofty_oauth_state');
  return res;
}


