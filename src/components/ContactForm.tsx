"use client";
import { useEffect, useState } from 'react';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  // EmailJS configuration (hard-coded service and templates)
  const SERVICE_ID = 'service_onh65w5';
  const TEMPLATE_BUYER = 'template_nady0sm';
  const TEMPLATE_SELLER = 'template_38ynpx7';
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'wEnObaDmdJFEGMFq8';

  const [role, setRole] = useState<'Buyer' | 'Seller'>('Buyer');
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  // Initialize role from URL and set up EmailJS public key
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRole = params.get('role');
    const hash = window.location.hash || '';
    if (urlRole === 'Seller' || /seller/i.test(hash)) {
      setRole('Seller');
    } else if (urlRole === 'Buyer' || /buyer/i.test(hash)) {
      setRole('Buyer');
    }

    try {
      if (EMAILJS_PUBLIC_KEY) {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
    } catch {
      // no-op if already initialized or key missing
    }
  }, []);

  const baseSchema = z.object({
    role: z.enum(['Buyer', 'Seller']),
    zip: z.string().min(3).max(10),
    timeline: z.string().min(2),
    budget: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    consent: z.literal(true, { errorMap: () => ({ message: 'Consent required' }) }),
  });
  const buyerExtra = z.object({ preferences: z.string().optional() });
  const sellerExtra = z.object({ property: z.string().optional() });

  async function onSubmit(formData: FormData) {
    setPending(true);
    setErrors({});
    const entries = Object.fromEntries(formData.entries());
    const data = { ...entries, consent: entries.consent === 'on', role } as Record<string, unknown>;

    const schema = role === 'Buyer' ? baseSchema.merge(buyerExtra) : baseSchema.merge(sellerExtra);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { map[i.path.join('.')] = i.message; });
      setErrors(map);
      setPending(false);
      return;
    }

    const body = { ...parsed.data, source: 'ContactForm', ...utm } as Record<string, unknown>;

    // Send to backend CRM endpoint
    await fetch('/api/leads', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }).catch(() => void 0);

    // Attempt EmailJS send (non-blocking if env not configured yet)
    try {
      const templateId = role === 'Buyer' ? TEMPLATE_BUYER : TEMPLATE_SELLER;
      const hasEmailConfig = !!EMAILJS_PUBLIC_KEY;
      if (hasEmailConfig) {
        const params: Record<string, string> = {};
        Object.entries(body).forEach(([k, v]) => { if (v != null) params[k] = String(v); });
        params.page_url = window.location.href;
        await emailjs.send(SERVICE_ID, templateId, params);
      }
    } catch {
      // ignore email errors to avoid blocking UX
    }
    window.location.href = '/thank-you';
  }

  return (
    <div className="card p-6">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setRole('Buyer')}
          className={`px-4 py-2 border ${role==='Buyer' ? 'bg-[var(--brand-primary)] text-[color:var(--brand-deep)] border-[var(--brand-primary)] font-semibold' : 'btn-outline'}`}
          aria-pressed={role==='Buyer'}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole('Seller')}
          className={`px-4 py-2 border ${role==='Seller' ? 'bg-[var(--brand-primary)] text-[color:var(--brand-deep)] border-[var(--brand-primary)] font-semibold' : 'btn-outline'}`}
          aria-pressed={role==='Seller'}
        >
          Seller
        </button>
      </div>
      <form action={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input name="zip" placeholder="ZIP / Neighborhood" className="p-3 rounded-none bg-transparent border" />
        <input name="timeline" placeholder="Timeline (e.g., 0-3 months)" className="p-3 rounded-none bg-transparent border" />
        <input name="budget" placeholder={role==='Buyer' ? 'Budget' : 'Price Point'} className="p-3 rounded-none bg-transparent border md:col-span-2" />
        <input name="name" placeholder="Full Name" className="p-3 rounded-none bg-transparent border" />
        <input name="email" placeholder="Email" className="p-3 rounded-none bg-transparent border" />
        <input name="phone" placeholder="Phone" className="p-3 rounded-none bg-transparent border" />
        {role === 'Buyer' ? (
          <textarea name="preferences" placeholder="Property preferences (beds/baths/sqft/notes)" className="p-3 rounded-none bg-transparent border md:col-span-2" />
        ) : (
          <textarea name="property" placeholder="Property details (beds/baths/sqft/notes)" className="p-3 rounded-none bg-transparent border md:col-span-2" />
        )}
        <label className="md:col-span-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="consent" /> I agree to be contacted about my inquiry.
        </label>
        <div className="text-sm text-red-600 md:col-span-2">
          {Object.values(errors).slice(0,1)}
        </div>
        {/* Hidden UTM fields for future CRM mapping */}
        {Object.entries(utm).map(([k,v]) => (
          <input key={k} name={k} defaultValue={v} className="hidden" readOnly />
        ))}
        <button disabled={pending} className="btn-primary md:col-span-2">{pending ? 'Submitting…' : 'Submit'}</button>
      </form>
    </div>
  );
}


