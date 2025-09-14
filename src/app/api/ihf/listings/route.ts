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
  const siteIn = (process.env.IHF_SITE_IN || 'header').toLowerCase(); // 'header' | 'query'
  const accountIn = (process.env.IHF_ACCOUNT_IN || 'header').toLowerCase(); // 'header' | 'query'
  const siteParam = process.env.IHF_SITE_PARAM || 'siteId';
  const accountParam = process.env.IHF_ACCOUNT_PARAM || 'accountId';
  const debug = process.env.IHF_DEBUG === '1';
  const forwardReferer = process.env.IHF_REFERER || '';
  const forwardOrigin = process.env.IHF_ORIGIN || '';
  if (!apiKey) {
    throw new Error('Missing IHF_API_KEY (or IHOMEFINDER_API_KEY)');
  }
  if (!baseUrl) {
    throw new Error('Missing IHF_BASE_URL (or IHOMEFINDER_BASE_URL)');
  }
  return { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, siteId, accountId, headerSite, headerAccount, siteIn, accountIn, siteParam, accountParam, debug, forwardReferer, forwardOrigin } as const;
}

export async function GET(req: NextRequest) {
  try {
    const { apiKey, baseUrl, listingsPath, authHeader, authPrefix, authIn, authQueryKey, siteId, accountId, headerSite, headerAccount, siteIn, accountIn, siteParam, accountParam, debug, forwardReferer, forwardOrigin } = getIHFConfig();
    const incomingUrl = new URL(req.url);
    const url = new URL(listingsPath, baseUrl);
    // forward all query params
    incomingUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const headers: Record<string, string> = { Accept: 'application/json' };
    if (forwardReferer) headers['Referer'] = forwardReferer;
    if (forwardOrigin) headers['Origin'] = forwardOrigin;
    if (authIn === 'header') {
      headers[authHeader] = authPrefix ? `${authPrefix} ${apiKey}` : apiKey;
    } else if (authIn === 'query') {
      url.searchParams.set(authQueryKey, apiKey);
    }
    if (siteId) {
      if (siteIn === 'header') headers[headerSite] = siteId; else url.searchParams.set(siteParam, siteId);
    }
    if (accountId) {
      if (accountIn === 'header') headers[headerAccount] = accountId; else url.searchParams.set(accountParam, accountId);
    }

    const sanitizedUrlForDiag = (() => {
      const u = new URL(url.toString());
      if (u.searchParams.has(authQueryKey)) u.searchParams.set(authQueryKey, '***');
      return u.toString();
    })();
    const controller = new AbortController();
    const timeoutMs = Number(process.env.IHF_TIMEOUT_MS || 8000);
    const t = setTimeout(() => controller.abort(), timeoutMs);
    const upstream = await fetch(url.toString(), {
      headers,
      cache: 'no-store',
      signal: controller.signal,
    }).finally(() => clearTimeout(t));

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const bodyText = await upstream.text();
    if (!upstream.ok) {
      const payload = (process.env.NODE_ENV === 'production' && !debug)
        ? { error: 'Upstream error', status: upstream.status }
        : { error: 'Upstream error', status: upstream.status, upstream: bodyText, url: sanitizedUrlForDiag };
      return NextResponse.json(payload, { status: upstream.status || 502 });
    }
    return new NextResponse(bodyText, { status: upstream.status, headers: { 'content-type': contentType } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    const debugEnabled = process.env.IHF_DEBUG === '1';
    const diag = debugEnabled
      ? {
          baseUrl: process.env.IHF_BASE_URL || '',
          listingsPath: process.env.IHF_LISTINGS_PATH || '/listings',
          authIn: (process.env.IHF_AUTH_IN || 'header'),
          authHeader: process.env.IHF_AUTH_HEADER || 'Authorization',
          authPrefixSet: Boolean(process.env.IHF_AUTH_PREFIX),
          authQueryKey: process.env.IHF_AUTH_QUERY_KEY || 'api_key',
          siteIdSet: Boolean(process.env.IHF_SITE_ID),
          siteIn: process.env.IHF_SITE_IN || 'header',
          siteParam: process.env.IHF_SITE_PARAM || 'siteId',
          accountIdSet: Boolean(process.env.IHF_ACCOUNT_ID),
          accountIn: process.env.IHF_ACCOUNT_IN || 'header',
          accountParam: process.env.IHF_ACCOUNT_PARAM || 'accountId',
          refererSet: Boolean(process.env.IHF_REFERER),
          originSet: Boolean(process.env.IHF_ORIGIN),
          headerAuthUsed: (process.env.IHF_AUTH_IN || 'header') === 'header',
        }
      : undefined;
    return NextResponse.json({ error: message, diag }, { status: 500 });
  }
}


