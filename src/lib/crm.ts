import { type LeadPayload } from '@/types/data';

export type CRMResult = { ok: true } | { ok: false; error: string };

export interface CRMAdapter {
  sendLead: (payload: LeadPayload) => Promise<CRMResult>;
}

function redact(value: unknown): unknown {
  if (typeof value === 'string') return value.slice(0, 1024);
  return value;
}

export function normalizeLead(input: Record<string, unknown>): LeadPayload {
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','referrer','landing_page'] as const;
  const utm = Object.fromEntries(
    utmKeys.map((k) => [k, (input[k] as string | undefined) || undefined])
  );

  const property = {
    listingId: (input.listingId as string) || (input.listing_id as string),
    listingSlug: (input.listingSlug as string) || (input.listing_slug as string),
    address: input.address as string | undefined,
    price: input.price ? Number(input.price) : undefined,
    beds: input.beds ? Number(input.beds) : undefined,
    baths: input.baths ? Number(input.baths) : undefined,
    sqft: input.sqft ? Number(input.sqft) : undefined,
    lat: input.lat ? Number(input.lat) : undefined,
    lng: input.lng ? Number(input.lng) : undefined,
    communitySlug: (input.communitySlug as string) || (input.community_slug as string) || undefined,
  };

  const payload: LeadPayload = {
    name: (input.name as string) || undefined,
    email: (input.email as string) || undefined,
    phone: (input.phone as string) || undefined,
    message: (input.message as string) || (input.notes as string) || undefined,
    role: (input.role as 'Buyer' | 'Seller' | 'Renter' | 'Agent' | 'General') || undefined,
    consent: input.consent === true || input.consent === 'true' || input.consent === 'on',
    source: (input.source as string) || (input._source as string) || undefined,
    utm,
    property,
    meta: {
      ...('preferredDate' in input ? { preferredDate: input.preferredDate } : {}),
      ...('budget' in input ? { budget: input.budget } : {}),
      ...('timeline' in input ? { timeline: input.timeline } : {}),
      ...('zip' in input ? { zip: input.zip } : {}),
      ...('preferences' in input ? { preferences: input.preferences } : {}),
      ...('property' in input ? { propertyNotes: input.property } : {}),
    },
  };

  // Redact oversized strings in meta
  if (payload.meta) {
    Object.keys(payload.meta).forEach((k) => {
      payload.meta![k] = redact(payload.meta![k]);
    });
  }

  return payload;
}

class ConsoleCRM implements CRMAdapter {
  async sendLead(payload: LeadPayload): Promise<CRMResult> {
    try {
      // eslint-disable-next-line no-console
      console.log('CRM lead payload:', JSON.stringify(payload));
      return { ok: true };
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      return { ok: false, error };
    }
  }
}

export function getCRM(): CRMAdapter {
  // In the future: choose adapter by env var, e.g., HUBSPOT, SALESFORCE, FOLLOWUP_BOSS, etc.
  // For now, default to console adapter as a no-op stub.
  return new ConsoleCRM();
}

export async function sendLeadToIntegrations(payload: LeadPayload): Promise<CRMResult> {
  const crm = getCRM();
  const result = await crm.sendLead(payload);
  return result;
}


