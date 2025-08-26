import { Section } from '@/components/ui/section';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Section>
      <div className="container-wide text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Page not found</h1>
        <p className="opacity-80 mt-2">The page you’re looking for doesn’t exist.</p>
        <div className="mt-6"><Link href="/" className="btn-primary">Go Home</Link></div>
      </div>
    </Section>
  );
}


