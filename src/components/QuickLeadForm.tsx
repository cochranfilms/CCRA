"use client";
import { useEffect, useState } from 'react';

export default function QuickLeadForm() {
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
    const body = {
      ...Object.fromEntries(formData.entries()),
      role: 'General',
      source: 'FindAgentQuickLead',
      ...utm,
    } as Record<string, unknown>;
    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => void 0);
    window.location.href = '/thank-you';
  }

  return (
    <form className="card p-4 grid md:grid-cols-4 gap-3" action={onSubmit}>
      <input className="p-3 rounded-none bg-transparent border" name="name" placeholder="Name" required />
      <input className="p-3 rounded-none bg-transparent border" name="email" placeholder="Email" required />
      <input className="p-3 rounded-none bg-transparent border" name="zip" placeholder="ZIP" />
      {Object.entries(utm).map(([k,v]) => (
        <input key={k} name={k} defaultValue={v} className="hidden" readOnly />
      ))}
      <button className="btn-primary" type="submit" disabled={pending}>{pending ? 'Submitting…' : 'Match Me'}</button>
    </form>
  );
}


