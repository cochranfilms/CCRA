"use client";
import { useState } from 'react';

type Props = { address: string };

export default function ShowingForm({ address }: Props) {
  const [pending, setPending] = useState(false);
  async function onSubmit(formData: FormData) {
    setPending(true);
    // For now we just simulate a submit and redirect to thank you
    await new Promise((r) => setTimeout(r, 500));
    window.location.href = '/thank-you';
  }
  return (
    <form action={onSubmit} className="card p-4 grid gap-3" id="book">
      <div className="text-lg font-semibold">Schedule a Showing</div>
      <input name="name" placeholder="Full Name" className="p-3 rounded-none bg-transparent border" />
      <input name="email" placeholder="Email" className="p-3 rounded-none bg-transparent border" />
      <input name="phone" placeholder="Phone" className="p-3 rounded-none bg-transparent border" />
      <input name="address" defaultValue={address} className="hidden" readOnly />
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Preferred Date</span>
        <input name="date" type="date" className="p-3 rounded-none bg-transparent border" />
      </label>
      <button disabled={pending} className="btn-primary">{pending ? 'Submitting…' : 'Request Showing'}</button>
    </form>
  );
}


