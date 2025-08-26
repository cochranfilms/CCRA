import { NextRequest, NextResponse } from 'next/server';
import { normalizeLead, sendLeadToIntegrations } from '@/lib/crm';

export async function POST(req: NextRequest) {
  let input: Record<string, unknown> = {};
  const contentType = req.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      input = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      input = Object.fromEntries(form.entries());
    } else {
      // Fallback try JSON
      input = await req.json().catch(() => ({}));
    }
  } catch {
    input = {};
  }

  // Add request context
  const url = new URL(req.url);
  input = {
    ...input,
    landing_page: input['landing_page'] ?? url.pathname,
    referrer: input['referrer'] ?? req.headers.get('referer') ?? undefined,
    _source: input['_source'] ?? 'api/leads',
  } as Record<string, unknown>;

  const payload = normalizeLead(input);
  const result = await sendLeadToIntegrations(payload);

  return NextResponse.json({ ok: result.ok });
}


