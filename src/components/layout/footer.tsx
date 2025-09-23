import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[color:var(--brand-deep)] text-white">
      {/* Accent gradient top border */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

      {/* Main footer */}
      <div className="container-wide py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt="Cross Creek Realty" className="h-10 w-auto" />
          <p className="mt-3 text-white/85 max-w-xs">Excellence defined by results. Boutique advisory for buying, selling, investing, and property management across metro Atlanta.</p>
          <div className="mt-4 text-sm text-white/80 space-y-1">
            <div>1234 (Insert Office Address), Atlanta, GA</div>
            <div>
              <a href="tel:14043552833" className="hover:underline">(404) 355-2833</a>
            </div>
            <div>
              <a href="mailto:info@crosscreekrealtyatl.com" className="hover:underline">info@crosscreekrealtyatl.com</a>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div className="text-sm">
          <div className="font-medium tracking-wide mb-3 text-white/90">Explore</div>
          <ul className="space-y-2">
            <li><Link href="/buy" className="hover:underline">Buy</Link></li>
            <li><Link href="/sell" className="hover:underline">Sell</Link></li>
            <li><Link href="/rent" className="hover:underline">Rent</Link></li>
            <li><Link href="/property-management" className="hover:underline">Property Management</Link></li>
            <li><Link href="/communities" className="hover:underline">Communities</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="text-sm">
          <div className="font-medium tracking-wide mb-3 text-white/90">Resources</div>
          <ul className="space-y-2">
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/featured-areas" className="hover:underline">Featured Areas</Link></li>
            <li><Link href="/calculator" className="hover:underline">Mortgage Calculator</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="text-sm">
          <div className="font-medium tracking-wide mb-3 text-white/90">Get in Touch</div>
          <div className="space-y-3">
            <Link href="/contact" className="btn-gold">Contact Us</Link>
            <div className="text-white/80">Licensed in Georgia. Equal Housing Opportunity.</div>
          </div>
        </div>
      </div>

      {/* MLS/IDX Compliance Band */}
      <div className="bg-black/15">
        <div className="container-wide py-6 text-xs leading-relaxed text-white/80">
          <div className="font-semibold text-white/90">IDX/MLS Disclaimer</div>
          <p className="mt-2">
            Information is deemed reliable but not guaranteed. All listings are provided by IDX through participating
            Brokers and the Multiple Listing Service and are for consumers' personal, non‑commercial use and may not be
            used for any purpose other than to identify prospective properties consumers may be interested in purchasing.
            Listing data is provided by iHomefinder/IDX and may be sourced, in whole or in part, from First Multiple
            Listing Service (FMLS) and Georgia MLS (GAMLS). Data is subject to change without notice and may not be
            independently verified by Cross Creek Realty. Properties may be subject to prior sale, change, or withdrawal.
          </p>
          <p className="mt-2">
            © {year} First Multiple Listing Service, Inc. and Georgia MLS. All rights reserved. Display of MLS data is
            usually deemed reliable but is NOT guaranteed accurate by the MLS. Equal Housing Opportunity.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-4 text-xs text-white/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>© {year} Cross Creek Realty. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">{/* Equal Housing */}
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11.5 12 5l9 6.5v1.5H3V11.5Zm0 4h18V18H3v-2.5Z"/></svg>
              Equal Housing
            </span>
            <span className="inline-flex items-center gap-1">{/* Realtor badge (textual) */}
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h16v18H4V3Zm4 4v10h2V9h4a3 3 0 0 0 0-6H8v4Z"/></svg>
              REALTOR®
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}


