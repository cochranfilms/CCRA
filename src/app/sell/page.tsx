import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Sell | Cross Creek Realty' };

export default function SellPage() {
  return (
    <>
      <Section variant="light">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Sell for Maximum Value</h1>
          <p className="mb-6 max-w-2xl">Concierge prep, luxury marketing, and negotiation expertise to deliver standout results.</p>
          <div className="flex gap-3">
            <Link href="/?role=Seller#contact" className="btn-primary">Request a Consultation</Link>
            <Link href="/calculator" className="btn-outline">Payment Calculator</Link>
          </div>
        </div>
      </Section>
      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Our listing process</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4">Preparation & staging</div>
            <div className="card p-4">Launch & marketing</div>
            <div className="card p-4">Negotiation & closing</div>
          </div>
        </div>
      </Section>
      <Section variant="light">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <Link href="/?role=Seller#contact" className="btn-outline">Talk to an Advisor</Link>
        </div>
      </Section>
    </>
  );
}


