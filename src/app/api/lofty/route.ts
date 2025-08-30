import { NextRequest, NextResponse } from 'next/server';
import { getLoftyAccessToken } from '@/lib/loftyAuth';

function getLoftyConfig() {
  const apiKey = process.env.LOFTY_API_KEY;
  const baseUrl = process.env.LOFTY_API_BASE_URL || 'https://api.lofty.com/v1';
  const listingsPath = process.env.LOFTY_LISTINGS_PATH || '/listings';
  const authHeader = process.env.LOFTY_AUTH_HEADER || 'Authorization';
  const authPrefix = process.env.LOFTY_AUTH_PREFIX ?? 'Bearer'; // set to '' to send raw key
  const authIn = (process.env.LOFTY_AUTH_IN || 'header').toLowerCase(); // 'header' | 'query'
  const authQueryKey = process.env.LOFTY_AUTH_QUERY_KEY || 'api_key';
  const tenantId = process.env.LOFTY_TENANT_ID || process.env.LOFTY_ACCOUNT_ID || '';
  const teamId = process.env.LOFTY_TEAM_ID || '';
  const userId = process.env.LOFTY_USER_ID || '';
  const siteId = process.env.LOFTY_SITE_ID || '';
  const headerTenant = process.env.LOFTY_HEADER_TENANT || 'X-Tenant-Id';
  const headerTeam = process.env.LOFTY_HEADER_TEAM || 'X-Team-Id';
  const headerSite = process.env.LOFTY_HEADER_SITE || 'X-Site-Id';
  const headerUser = process.env.LOFTY_HEADER_USER || 'X-User-Id';
  if (!apiKey) {
    throw new Error('Missing LOFTY_API_KEY');
  }
  return { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, tenantId, teamId, userId, siteId, headerTenant, headerTeam, headerSite, headerUser } as const;
}

export async function GET(req: NextRequest) {
  try {
    const { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, tenantId, teamId, userId, siteId, headerTenant, headerTeam, headerSite, headerUser } = getLoftyConfig();
    const incomingUrl = new URL(req.url);
    const url = new URL(listingsPath, baseUrl);
    // forward all query params
    incomingUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const headers: Record<string, string> = { Accept: 'application/json' };
    // Prefer a user token from cookies if present, else app token
    const cookieToken = req.cookies.get('lofty_access_token')?.value;
    const oauthToken = cookieToken || await getLoftyAccessToken();
    if (oauthToken) {
      headers['Authorization'] = `Bearer ${oauthToken}`;
    } else if (authIn === 'header') {
      headers[authHeader] = authPrefix ? `${authPrefix} ${apiKey}` : apiKey;
    } else if (authIn === 'query') {
      url.searchParams.set(authQueryKey, apiKey);
    }
    if (tenantId) headers[headerTenant] = tenantId;
    if (teamId) headers[headerTeam] = teamId;
    if (userId) headers[headerUser] = userId;
    if (siteId) headers[headerSite] = siteId;

    const upstream = await fetch(url.toString(), {
      headers,
      // Prevent revalidation during request in Next
      cache: 'no-store',
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const bodyText = await upstream.text();
    if (!upstream.ok) {
      const payload = process.env.NODE_ENV === 'production'
        ? { error: 'Upstream error', status: upstream.status }
        : { error: 'Upstream error', status: upstream.status, upstream: bodyText };
      return NextResponse.json(payload, { status: upstream.status || 502 });
    }
    return new NextResponse(bodyText, { status: upstream.status, headers: { 'content-type': contentType } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


