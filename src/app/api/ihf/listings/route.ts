import { NextRequest, NextResponse } from 'next/server';

function getIHFConfig() {
  const apiKey = process.env.IHF_API_KEY || process.env.IHOMEFINDER_API_KEY;
  const baseUrl = process.env.IHF_BASE_URL || process.env.IHOMEFINDER_BASE_URL || '';
  const listingsPath = process.env.IHF_LISTINGS_PATH || process.env.IHOMEFINDER_LISTINGS_PATH || '/listings';
  const authHeader = process.env.IHF_AUTH_HEADER || process.env.IHOMEFINDER_AUTH_HEADER || 'Authorization';
  const authPrefix = process.env.IHF_AUTH_PREFIX ?? process.env.IHOMEFINDER_AUTH_PREFIX ?? ''; // e.g., 'Bearer' or ''
  const authIn = (process.env.IHF_AUTH_IN || process.env.IHOMEFINDER_AUTH_IN || 'header').toLowerCase(); // 'header' | 'query'
  const authQueryKey = process.env.IHF_AUTH_QUERY_KEY || process.env.IHOMEFINDER_AUTH_QUERY_KEY || 'api_key';
  const siteId = process.env.IHF_SITE_ID || process.env.IHOMEFINDER_SITE_ID || '';
  const accountId = process.env.IHF_ACCOUNT_ID || process.env.IHOMEFINDER_ACCOUNT_ID || '';
  const headerSite = process.env.IHF_HEADER_SITE || process.env.IHOMEFINDER_HEADER_SITE || 'X-Site-Id';
  const headerAccount = process.env.IHF_HEADER_ACCOUNT || process.env.IHOMEFINDER_HEADER_ACCOUNT || 'X-Account-Id';
  if (!apiKey) {
    throw new Error('Missing IHF_API_KEY (or IHOMEFINDER_API_KEY)');
  }
  if (!baseUrl) {
    throw new Error('Missing IHF_BASE_URL (or IHOMEFINDER_BASE_URL)');
  }
  return { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, siteId, accountId, headerSite, headerAccount } as const;
}

export async function GET(req: NextRequest) {
  try {
    const { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, siteId, accountId, headerSite, headerAccount } = getIHFConfig();
    const incomingUrl = new URL(req.url);
    const url = new URL(listingsPath, baseUrl);
    // forward all query params
    incomingUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const headers: Record<string, string> = { Accept: 'application/json' };
    if (authIn === 'header') {
      headers[authHeader] = authPrefix ? `${authPrefix} ${apiKey}` : apiKey;
    } else if (authIn === 'query') {
      url.searchParams.set(authQueryKey, apiKey);
    }
    if (siteId) headers[headerSite] = siteId;
    if (accountId) headers[headerAccount] = accountId;

    const upstream = await fetch(url.toString(), {
      headers,
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


