import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  // Stub: log and return OK. Integrate email provider later.
  console.log('Lead submission:', body);
  return NextResponse.json({ ok: true });
}


