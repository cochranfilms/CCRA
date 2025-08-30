import { NextRequest, NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallengeS256, generateState } from '@/lib/pkce';

export async function GET(req: NextRequest) {
  const authUrl = process.env.LOFTY_AUTH_AUTHORIZE_URL; // e.g., https://<tenant>.auth0.com/authorize
  const clientId = process.env.LOFTY_CLIENT_ID;
  const redirectUri = process.env.LOFTY_AUTH_REDIRECT_URI; // e.g., https://your-site.com/api/auth/lofty/callback
  const audience = process.env.LOFTY_OAUTH_AUDIENCE;
  const scope = process.env.LOFTY_OAUTH_SCOPE || 'openid profile email offline_access';
  if (!authUrl || !clientId || !redirectUri || !audience) {
    return NextResponse.json({ error: 'Missing OAuth configuration' }, { status: 500 });
  }

  const state = generateState();
  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallengeS256(verifier);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 10, // 10 minutes
  };

  const res = NextResponse.redirect(new URL(
    `${authUrl}?` + new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      audience,
      scope,
      state,
    }).toString()
  ));

  res.cookies.set('lofty_pkce_verifier', verifier, cookieOptions);
  res.cookies.set('lofty_oauth_state', state, cookieOptions);
  return res;
}


