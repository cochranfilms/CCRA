"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NavItem } from './nav.config';
import NavDropdown from '@/components/layout/NavDropdown';

type Props = {
  items: NavItem[];
};

export default function MainNav({ items }: Props) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      search: items.find((i) => i.label === 'Start Your Search'),
    };
  }, [items]);

  const navItems = useMemo(() => items.filter((i) => !['Contact', 'Start Your Search'].includes(i.label)), [items]);

  function onHover(idx: number | null) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenIndex(idx), 80); // hover intent ~80ms
  }

  function onLeave(idx: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setOpenIndex((v) => (v === idx ? null : v));
    }, 80);
  }

  // Keyboard roving for top-level
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  function onTopKeyDown(e: React.KeyboardEvent, idx: number, hasPanel: boolean) {
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
      if (hasPanel) {
        e.preventDefault();
        setOpenIndex(idx);
      }
    } else if (e.key === 'Escape') {
      setOpenIndex(null);
    }
  }

  return (
    <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center gap-3" ref={containerRef}>
      <div className="flex-1" />
      <ul className="flex items-center gap-2">
        {navItems.map((item, idx) => {
          const active = isActive(item.href);
          const hasChildren = !!item.children?.length;
          return (
            <li key={item.label} className="relative" onMouseEnter={() => onHover(idx)} onMouseLeave={() => onLeave(idx)}>
              {hasChildren ? (
                <button
                  ref={(el) => { buttonsRef.current[idx] = el; }}
                  className={[
                    'px-3 py-2 rounded-full border text-[color:var(--brand-deep)] bg-white transition shadow-[0_1px_0_rgba(1,0,70,0.08)]',
                    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]',
                    'font-medium',
                    active ? 'bg-[var(--brand-deep)] text-white border-[var(--brand-deep)] font-semibold' : 'border-[var(--brand-deep)]',
                  ].join(' ')}
                  aria-haspopup="menu"
                  aria-expanded={openIndex === idx}
                  aria-controls={`menu-${idx}`}
                  onFocus={() => setOpenIndex(idx)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenIndex(null);
                  }}
                  onKeyDown={(e) => onTopKeyDown(e, idx, hasChildren)}
                >
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  ref={(el) => { buttonsRef.current[idx] = el as unknown as HTMLButtonElement; }}
                  className={[
                    'px-3 py-2 rounded-full border text-[color:var(--brand-deep)] bg-white transition shadow-[0_1px_0_rgba(1,0,70,0.08)]',
                    'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]',
                    'font-medium',
                    active ? 'bg-[var(--brand-deep)] text-white border-[var(--brand-deep)] font-semibold' : 'border-[var(--brand-deep)]',
                  ].join(' ')}
                  onKeyDown={(e) => onTopKeyDown(e as unknown as React.KeyboardEvent, idx, false)}
                >
                  {item.label}
                </Link>
              )}

              {hasChildren && (
                <NavDropdown
                  id={`menu-${idx}`}
                  open={openIndex === idx}
                  onClose={() => setOpenIndex(null)}
                  anchorClassName="absolute left-1/2 -translate-x-1/2 mt-2"
                  items={item.children!}
                  ctaHref={item.ctaHref}
                  ctaLabel={item.ctaLabel}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex-1 flex items-center justify-end gap-2">
        {primaryCtas.contact && (
          <Link href={primaryCtas.contact.href || '/book'} className="btn-primary">{primaryCtas.contact.label}</Link>
        )}
        {primaryCtas.search && (
          <Link
            href={primaryCtas.search.href || '/listings'}
            className="btn-gold text-[color:var(--brand-deep)] font-semibold"
          >
            {primaryCtas.search.label}
          </Link>
        )}
      </div>
    </nav>
  );
}


