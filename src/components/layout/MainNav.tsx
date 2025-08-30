"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem } from './nav.config';
import NavDropdown from '@/components/layout/NavDropdown';

type Props = {
  items: NavItem[];
  scrolled?: boolean;
};

export default function MainNav({ items, scrolled = false }: Props) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on Escape or outside click
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
    }
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpenIndex(null);
    }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  const isActive = useCallback(
    (href?: string) => (!!href && pathname.startsWith(href)),
    [pathname]
  );

  const primaryCtas = useMemo(() => {
    return {
      contact: items.find((i) => i.label === 'Contact'),
      blog: items.find((i) => i.label === 'Blog'),
    };
  }, [items]);

  const navItems = useMemo(() => items.filter((i) => !['Contact', 'Blog', 'Start Your Search'].includes(i.label)), [items]);

  function onHover(idx: number | null) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenIndex(idx);
  }

  function onLeave(idx: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setOpenIndex((v) => (v === idx ? null : v));
    }, 120);
  }

  // Keyboard roving for top-level
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  function onTopKeyDown(e: React.KeyboardEvent, idx: number, hasChildren: boolean) {
    const total = navItems.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % total;
      buttonsRef.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + total) % total;
      buttonsRef.current[prev]?.focus();
    } else if (e.key === 'ArrowDown') {
      if (hasChildren) {
        e.preventDefault();
        setOpenIndex(idx);
      }
    } else if (e.key === 'Escape') {
      setOpenIndex(null);
    }
  }

  return (
    <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center gap-4" ref={containerRef}>
      <div className="flex-1" />
      
      {/* Premium Navigation Items */}
      <ul className="flex items-center gap-1">
        {navItems.map((item, idx) => {
          const active = isActive(item.href);
          const hasChildren = !!item.children?.length;
          return (
            <li key={item.label} className="relative z-[70]" onMouseEnter={() => onHover(idx)} onMouseLeave={() => onLeave(idx)}>
              {hasChildren ? (
                <Link
                  href={item.href || '#'}
                  ref={(el) => { buttonsRef.current[idx] = el as unknown as HTMLButtonElement; }}
                  className={[
                    'relative px-6 py-3 h-12 transition-all duration-300 ease-out whitespace-nowrap leading-none',
                    'inline-flex items-center justify-center text-center text-[15px] font-medium tracking-wide',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
                    'group overflow-hidden',
                    active 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 border border-amber-400/50' 
                      : 'bg-white/10 hover:bg-white/20 text-white hover:text-white shadow-md hover:shadow-xl hover:shadow-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm'
                  ].join(' ')}
                  aria-haspopup="menu"
                  aria-expanded={openIndex === idx}
                  aria-controls={`menu-${idx}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={(e) => {
                    // Toggle dropdown on click without navigating away
                    e.preventDefault();
                    setOpenIndex((v) => (v === idx ? null : idx));
                  }}
                  onFocus={() => setOpenIndex(idx)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenIndex(null);
                  }}
                  onKeyDown={(e) => onTopKeyDown(e as unknown as React.KeyboardEvent, idx, hasChildren)}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Text with enhanced styling */}
                  <span className="relative z-10 font-semibold">
                    {item.label}
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] opacity-0 group-hover:opacity-100"></div>
                </Link>
              ) : (
                <Link
                  href={item.href || '#'}
                  ref={(el) => { buttonsRef.current[idx] = el as unknown as HTMLButtonElement; }}
                  className={[
                    'relative px-6 py-3 h-12 transition-all duration-300 ease-out whitespace-nowrap leading-none',
                    'inline-flex items-center justify-center text-center text-[15px] font-medium tracking-wide',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
                    'group overflow-hidden',
                    active 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 border border-amber-400/50' 
                      : 'bg-white/10 hover:bg-white/20 text-white hover:text-white shadow-md hover:shadow-xl hover:shadow-white/10 border border-white/20 hover:border-white/40 backdrop-blur-sm'
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                  onKeyDown={(e) => onTopKeyDown(e as unknown as React.KeyboardEvent, idx, false)}
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Text with enhanced styling */}
                  <span className="relative z-10 font-semibold">
                    {item.label}
                  </span>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] opacity-0 group-hover:opacity-100"></div>
                </Link>
              )}

              {hasChildren && (
                <NavDropdown
                  id={`menu-${idx}`}
                  open={openIndex === idx}
                  onClose={() => setOpenIndex(null)}
                  anchorClassName="absolute left-0 top-full mt-1 z-50"
                  items={item.children!}
                  ctaHref={item.ctaHref}
                  ctaLabel={item.ctaLabel}
                  onMouseEnter={() => onHover(idx)}
                  onMouseLeave={() => onLeave(idx)}
                />
              )}
            </li>
          );
        })}
      </ul>
      
      {/* Premium CTA Buttons */}
      <div className="flex-1 flex items-center justify-end gap-3">
        {primaryCtas.contact && (
          <Link 
            href={primaryCtas.contact.href || '/#contact'} 
            className="relative px-6 py-3 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold transition-all duration-300 ease-out hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{primaryCtas.contact.label}</span>
          </Link>
        )}
        {primaryCtas.blog && (
          <Link 
            href={primaryCtas.blog.href || '/blog'} 
            className="text-white font-semibold px-6 py-3 border border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            {primaryCtas.blog.label}
          </Link>
        )}
      </div>
    </nav>
  );
}


