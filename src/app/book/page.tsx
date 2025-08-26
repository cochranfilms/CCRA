import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function BookPage() {
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="mb-6">We moved our contact form to the homepage for a better experience.</p>
        <Link href="/#contact" className="btn-primary">Go to Contact Form</Link>
      </div>
    </Section>
  );
}


