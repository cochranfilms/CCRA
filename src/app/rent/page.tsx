import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Rent | Cross Creek Realty' };

export default function RentPage() {
  return (
    <>
      <Section variant="light">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Find Your Next Rental</h1>
          <p className="mb-6 max-w-2xl">Explore available rentals across metro Atlanta and apply online.</p>
          <div className="flex gap-3">
            <Link href="/listings?mode=rent" className="btn-primary">View Rentals</Link>
            <Link href="/resources" className="btn-outline">Renter Resources</Link>
          </div>
        </div>
      </Section>
      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Why rent with us</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4">Responsive maintenance</div>
            <div className="card p-4">Easy online portal</div>
            <div className="card p-4">Great neighborhoods</div>
          </div>
        </div>
      </Section>
      <Section variant="light">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Get started</h2>
          <Link href="/#contact" className="btn-outline">Talk to our team</Link>
        </div>
      </Section>
    </>
  );
}


