import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <Section>
      <div className="container-wide text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Thank you</h1>
        <p className="mt-2 opacity-80">We received your request and will reach out shortly.</p>
        <div className="mt-6">
          <Link href="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    </Section>
  );
}


