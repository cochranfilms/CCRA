import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = { title: 'Join as an Agent | Cross Creek Realty' };

export default function JoinAgentPage() {
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Join Cross Creek Realty</h1>
        <p className="mb-6 max-w-2xl">We equip advisors with luxury marketing, high-intent leads, and collaborative culture. If you are growth-minded and client-obsessed, we want to talk.</p>
        <Link href="/#contact" className="btn-primary">Start the Conversation</Link>
      </div>
    </Section>
  );
}


