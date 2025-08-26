import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Buy | Cross Creek Realty' };

export default function BuyPage() {
  return (
    <>
      <Section variant="light">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Buy with Confidence</h1>
          <p className="mb-6 max-w-2xl">Search homes, tour properties, and make competitive offers with a data-driven strategy and white-glove guidance.</p>
          <div className="flex gap-3">
            <Link href="/listings" className="btn-primary">Browse Listings</Link>
            <Link href="/#contact" className="btn-outline">Talk to an Advisor</Link>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4">Consultation & criteria</div>
            <div className="card p-4">Tours & analysis</div>
            <div className="card p-4">Offers & closing</div>
          </div>
        </div>
      </Section>

      <Section variant="light">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Tools</h2>
          <div className="flex gap-3">
            <Link href="/calculator" className="btn-outline">Payment Calculator</Link>
            <Link href="/featured-areas" className="btn-outline">Featured Areas</Link>
          </div>
        </div>
      </Section>
    </>
  );
}


