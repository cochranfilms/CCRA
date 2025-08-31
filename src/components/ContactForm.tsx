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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    <div className="card p-6 md:p-8 bg-white/95 backdrop-blur-sm border border-slate-200">
      {/* Buyer/Seller Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setRole('Buyer')}
          className={[
            'px-5 py-2 h-10 inline-flex items-center justify-center border transition-colors',
            role==='Buyer'
              ? 'bg-[var(--brand-primary)] text-[color:var(--brand-deep)] border-[var(--brand-primary)] font-semibold'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          ].join(' ')}
          aria-pressed={role==='Buyer'}
        >
          Buyer
        </button>
        <button
          type="button"
          onClick={() => setRole('Seller')}
          className={[
            'px-5 py-2 h-10 inline-flex items-center justify-center border transition-colors',
            role==='Seller'
              ? 'bg-[var(--brand-primary)] text-[color:var(--brand-deep)] border-[var(--brand-primary)] font-semibold'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          ].join(' ')}
          aria-pressed={role==='Seller'}
        >
          Seller
        </button>
      </div>
      <form action={onSubmit} className="grid md:grid-cols-2 gap-4">
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">ZIP / Neighborhood<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="zip"
            placeholder="ZIP / Neighborhood"
            required
            aria-invalid={!!errors.zip}
            onBlur={() => setTouched((t) => ({ ...t, zip: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.zip && touched.zip ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.zip && touched.zip && <span className="text-xs text-red-600" role="alert">{errors.zip}</span>}
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Timeline<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="timeline"
            placeholder="Timeline (e.g., 0-3 months)"
            required
            aria-invalid={!!errors.timeline}
            onBlur={() => setTouched((t) => ({ ...t, timeline: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.timeline && touched.timeline ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.timeline && touched.timeline && <span className="text-xs text-red-600" role="alert">{errors.timeline}</span>}
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm text-slate-700">{role==='Buyer' ? 'Budget' : 'Price Point'}<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="budget"
            placeholder={role==='Buyer' ? 'Budget' : 'Price Point'}
            required
            aria-invalid={!!errors.budget}
            onBlur={() => setTouched((t) => ({ ...t, budget: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.budget && touched.budget ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.budget && touched.budget && <span className="text-xs text-red-600" role="alert">{errors.budget}</span>}
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Full Name<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="name"
            placeholder="Full Name"
            required
            aria-invalid={!!errors.name}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.name && touched.name ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.name && touched.name && <span className="text-xs text-red-600" role="alert">{errors.name}</span>}
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-slate-700">Email<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            aria-invalid={!!errors.email}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.email && touched.email ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.email && touched.email && <span className="text-xs text-red-600" role="alert">{errors.email}</span>}
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm text-slate-700">Phone<span className="text-[var(--brand-primary)]"> *</span></span>
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            required
            aria-invalid={!!errors.phone}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            className={`p-3 rounded-none bg-transparent border ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]`}
          />
          {errors.phone && touched.phone && <span className="text-xs text-red-600" role="alert">{errors.phone}</span>}
        </label>
        {role === 'Buyer' ? (
          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm text-slate-700">Property preferences</span>
            <textarea
              name="preferences"
              placeholder="Property preferences (beds/baths/sqft/notes)"
              className="p-3 rounded-none bg-transparent border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              rows={4}
            />
          </label>
        ) : (
          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm text-slate-700">Property details</span>
            <textarea
              name="property"
              placeholder="Property details (beds/baths/sqft/notes)"
              className="p-3 rounded-none bg-transparent border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              rows={4}
            />
          </label>
        )}
        <label className="md:col-span-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="consent" required aria-invalid={!!errors.consent} />
          <span>I agree to be contacted about my inquiry.<span className="text-[var(--brand-primary)]"> *</span></span>
        </label>
        {/* Hidden UTM fields for future CRM mapping */}
        {Object.entries(utm).map(([k,v]) => (
          <input key={k} name={k} defaultValue={v} className="hidden" readOnly />
        ))}
        <button disabled={pending} className="md:col-span-2 relative px-6 py-3 h-12 bg-[var(--brand-deep)] text-white font-semibold transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[var(--brand-deep)]/20 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2">
          {pending ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}


