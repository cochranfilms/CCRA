import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Real Estate Resources | Cross Creek Realty',
};

export default function ResourcesPage() {
  const guides = [
    { title: 'First-Time Homebuyer Guide', href: '#', desc: 'Everything from saving for down payment to closing day.' },
    { title: 'Home Selling Checklist', href: '#', desc: 'Step-by-step to prep, list, and maximize your sale.' },
    { title: 'Mortgage Guide', href: '#', desc: 'Loan types, documents, and how to shop rates effectively.' },
    { title: 'Atlanta Neighborhood Guide', href: '#', desc: 'Explore Atlanta’s diverse neighborhoods and amenities.' },
  ];

  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Real Estate Resources</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((g) => (
            <div key={g.title} className="card p-4">
              <div className="font-medium mb-1">{g.title}</div>
              <div className="text-sm opacity-80 mb-3">{g.desc}</div>
              <Link href={g.href} className="btn-outline">Download Guide</Link>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
          <div className="grid gap-3">
            <div className="card p-4"><div className="font-medium">How long does it take to close?</div><div className="opacity-80 text-sm mt-1">Typically 30-45 days for financed purchases; cash can close sooner.</div></div>
            <div className="card p-4"><div className="font-medium">Do I need to be pre-approved?</div><div className="opacity-80 text-sm mt-1">Pre-approval strengthens offers and clarifies your budget.</div></div>
            <div className="card p-4"><div className="font-medium">What are typical closing costs?</div><div className="opacity-80 text-sm mt-1">Plan for ~2-3% of purchase price in buyer closing costs.</div></div>
          </div>
        </div>
      </div>
    </Section>
  );
}


