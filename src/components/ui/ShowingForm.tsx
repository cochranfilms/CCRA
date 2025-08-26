"use client";
import { useEffect, useState } from 'react';
import type { Listing } from '@/types/data';

type Props = { address: string; listing?: Partial<Listing> & { id?: string; slug?: string } };

export default function ShowingForm({ address, listing }: Props) {
  const [pending, setPending] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entries: Record<string, string> = {};
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach((k) => {
      const v = params.get(k);
      if (v) entries[k] = v;
    });
    setUtm(entries);
  }, []);

  async function onSubmit(formData: FormData) {
    setPending(true);
    const base: Record<string, unknown> = Object.fromEntries(formData.entries());
    const body = {
      ...base,
      preferredDate: base.date,
      role: 'Buyer',
      source: 'ShowingForm',
      address,
      ...utm,
      listingId: listing?.id,
      listingSlug: listing?.slug,
      price: listing?.price,
      beds: listing?.beds,
      baths: listing?.baths,
      sqft: listing?.sqft,
      lat: listing?.lat,
      lng: listing?.lng,
      communitySlug: (listing as { communitySlug?: string } | undefined)?.communitySlug,
    } as Record<string, unknown>;
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => void 0);
    window.location.href = '/thank-you';
  }
  return (
    <form action={onSubmit} className="card p-4 grid gap-3" id="book">
      <div className="text-lg font-semibold">Schedule a Showing</div>
      <input name="name" placeholder="Full Name" className="p-3 rounded-none bg-transparent border" />
      <input name="email" placeholder="Email" className="p-3 rounded-none bg-transparent border" />
      <input name="phone" placeholder="Phone" className="p-3 rounded-none bg-transparent border" />
      <input name="address" defaultValue={address} className="hidden" readOnly />
      {/* Hidden UTM fields for future CRM mapping */}
      {Object.entries(utm).map(([k,v]) => (
        <input key={k} name={k} defaultValue={v} className="hidden" readOnly />
      ))}
      {/* Hidden property context */}
      {listing?.id && <input name="listingId" defaultValue={String(listing.id)} className="hidden" readOnly />}
      {listing?.slug && <input name="listingSlug" defaultValue={String(listing.slug)} className="hidden" readOnly />}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Preferred Date</span>
        <input name="date" type="date" className="p-3 rounded-none bg-transparent border" />
      </label>
      <button disabled={pending} className="btn-primary">{pending ? 'Submitting…' : 'Request Showing'}</button>
    </form>
  );
}


