type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export async function getLoftyAccessToken(): Promise<string | null> {
  // If user provides a static token, use it as-is.
  const staticToken = process.env.LOFTY_ACCESS_TOKEN;
  if (staticToken && staticToken.trim().length > 0) {
    return staticToken.trim();
  }

  // If a cached token exists and is valid for at least 60s, reuse it
  if (cachedToken && cachedToken.expiresAt > nowSeconds() + 60) {
    return cachedToken.token;
  }

  const tokenUrl = process.env.LOFTY_OAUTH_TOKEN_URL;
  const clientId = process.env.LOFTY_CLIENT_ID;
  const clientSecret = process.env.LOFTY_CLIENT_SECRET;
  const authStyle = (process.env.LOFTY_OAUTH_AUTH_STYLE || 'basic').toLowerCase(); // 'basic' | 'body'
  const audience = process.env.LOFTY_OAUTH_AUDIENCE;
  const scope = process.env.LOFTY_OAUTH_SCOPE; // optional

  if (!tokenUrl || !clientId || !clientSecret) {
    // OAuth not configured
    return null;
  }

  const body = new URLSearchParams({ grant_type: 'client_credentials' });
  if (audience) body.set('audience', audience);
  if (scope) body.set('scope', scope);

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (authStyle === 'basic') {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    headers.Authorization = `Basic ${basic}`;
  } else {
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);
  }

  const resp = await fetch(tokenUrl, {
    method: 'POST',
    headers,
    body: body.toString(),
    cache: 'no-store',
  });
  if (!resp.ok) {
    return null;
  }
  const json = (await resp.json().catch(() => null)) as TokenResponse | null;
  if (!json || !json.access_token) {
    return null;
  }
  const ttl = typeof json.expires_in === 'number' && json.expires_in > 0 ? json.expires_in : 300; // default 5m
  cachedToken = { token: json.access_token, expiresAt: nowSeconds() + ttl };
  return json.access_token;
}


