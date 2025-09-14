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
    <header className={`sticky top-0 z-[100] transition-all duration-500 ease-out bg-gradient-to-r from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-md ${
      scrolled ? 'shadow-2xl shadow-black/20' : ''
    }`}>
      {/* Premium Utility Bar */}
      <div className="hidden md:block bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-sm border-b border-white/10">
        <div className="container-wide h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium tracking-wide">☎ (404) 555-0123</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium tracking-wide">✉ info@crosscreekrealty.com</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/#contact" 
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/" 
              className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-500 ease-out py-4 bg-gradient-to-r from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-md ${
        scrolled ? 'py-3' : 'py-4'
      }`}>
        <div className="container-wide flex items-center justify-between">
          {/* Enhanced Logo Section */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group relative">
              <div className="relative">
                <img 
                  src="/logo.webp" 
                  alt="Cross Creek Realty" 
                  className="h-12 w-auto max-w-none object-contain transition-all duration-500 ease-out group-hover:scale-105" 
                  style={{ aspectRatio: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="sr-only">Cross Creek Realty</span>
            </Link>
            
            {/* Premium Tagline */}
            <div className="hidden lg:block">
              <div className="text-white/90 text-sm font-light tracking-wider">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-medium">
                  EXCELLENCE
                </span>
                <span className="text-white/70"> • </span>
                <span className="text-white/80">DEFINED BY RESULTS</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <MainNav items={NAV_ITEMS} scrolled={scrolled} />
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <MobileDrawer items={NAV_ITEMS} />
          </div>
        </div>
      </div>
    </header>
  );
}
