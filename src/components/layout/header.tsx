"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainNav from './MainNav';
import MobileDrawer from './MobileDrawer';
import { NAV_ITEMS } from './nav.config';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-[var(--surface)] transition backdrop-blur ${scrolled ? 'shadow-sm backdrop-blur-md' : ''}`}>
      <div className="hidden md:block bg-[var(--brand-deep)] text-white text-[12px]">
        <div className="container-wide h-8 flex items-center justify-between opacity-95">
          <div className="flex items-center gap-4">
            <span>☎ (404) 555-0123</span>
            <span>✉ info@crosscreekrealty.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/#contact" className="underline">Contact</Link>
            <Link href="/" className="underline">Sign In</Link>
          </div>
        </div>
      </div>
      <div className="border-b bg-[var(--brand-deep)]">
        <div className={`container-wide flex items-center justify-between ${scrolled ? 'h-[56px]' : 'h-16'} transition-[height]`}>
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="Cross Creek Realty" className="h-8 md:h-9 w-auto" />
              <span className="sr-only">Cross Creek Realty</span>
            </Link>
          </div>
          <MainNav items={NAV_ITEMS} />
          <div className="md:hidden flex items-center gap-2">
            <MobileDrawer items={NAV_ITEMS} />
          </div>
        </div>
      </div>
    </header>
  );
}
