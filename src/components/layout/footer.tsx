import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-wide py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold">Cross Creek Realty</div>
          <div className="text-sm opacity-80 mt-2">Atlanta, GA</div>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-1">
            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Contact</div>
          <div>info@crosscreekrealty.com</div>
        </div>
      </div>
    </footer>
  );
}


