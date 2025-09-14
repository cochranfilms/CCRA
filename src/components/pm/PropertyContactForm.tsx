"use client";
import { useEffect, useState } from 'react';

export default function PropertyContactForm() {
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
    const base = Object.fromEntries(formData.entries());
    const body = {
      ...base,
      role: 'PropertyManagement',
      source: 'PropertyContactForm',
      ...utm,
    } as Record<string, unknown>;
    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => void 0);
    window.location.href = '/thank-you';
  }

  return (
    <form className="card p-6 grid gap-3 bg-white/95 border" action={onSubmit}>
      <div className="text-lg font-semibold">Request a Free Rental Analysis</div>
      <input name="name" placeholder="Name" className="p-3 rounded-none bg-transparent border" required />
      <input name="email" placeholder="Email" className="p-3 rounded-none bg-transparent border" required />
      <input name="phone" placeholder="Phone" className="p-3 rounded-none bg-transparent border" required />
      <input name="address" placeholder="Property Address" className="p-3 rounded-none bg-transparent border" />
      <textarea name="message" placeholder="Message" className="p-3 rounded-none bg-transparent border min-h-28" />
      {Object.entries(utm).map(([k,v]) => (
        <input key={k} name={k} defaultValue={v} className="hidden" readOnly />
      ))}
      <button className="btn-primary" type="submit" disabled={pending}>{pending ? 'Submitting…' : 'Request a Free Rental Analysis'}</button>
    </form>
  );
}


