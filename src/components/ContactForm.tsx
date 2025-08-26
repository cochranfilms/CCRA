"use client";
import { useState } from 'react';
import { z } from 'zod';

export default function ContactForm() {
  const [role, setRole] = useState<'Buyer' | 'Seller'>('Buyer');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

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

    await fetch('/api/leads', { method: 'POST', body: JSON.stringify(parsed.data), headers: { 'Content-Type': 'application/json' } });
    window.location.href = '/thank-you';
  }

  return (
    <div className="card p-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setRole('Buyer')}
          className={`px-4 py-2 border ${role==='Buyer' ? 'bg-[var(--brand-primary)] text-[color:var(--brand-deep)] border-[var(--brand-primary)] font-semibold' : 'btn-outline'}`}
          aria-pressed={role==='Buyer'}
        >
          Buyer
        </button>
        <button
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
        <button disabled={pending} className="btn-primary md:col-span-2">{pending ? 'Submitting…' : 'Submit'}</button>
      </form>
    </div>
  );
}


