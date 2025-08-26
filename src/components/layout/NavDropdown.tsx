"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { NavChild } from './nav.config';

type Props = {
  id: string;
  open: boolean;
  items: NavChild[];
  ctaHref?: string;
  ctaLabel?: string;
  anchorClassName?: string;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function NavDropdown({ id, open, items, ctaHref, ctaLabel, anchorClassName, onClose, onMouseEnter, onMouseLeave }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap within open panel
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  // Render items as a single vertical column for compact menus

  return (
    <div
      role="menu"
      id={id}
      aria-hidden={!open}
      className={(anchorClassName || '') + ' z-50'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={panelRef}
        className="p-2 md:p-3 w-[min(90vw,280px)] animate-dropdown rounded-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] bg-[var(--brand-deep)] text-white border border-white/10"
      >
        <div className="flex flex-col gap-1 md:gap-2">
          {items.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-3 py-2 rounded-none hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            >
              <div className="font-medium text-white">{child.label}</div>
              {child.description && (
                <div className="text-xs md:text-sm text-white/80 line-clamp-2">{child.description}</div>
              )}
            </Link>
          ))}
        </div>
        {(ctaHref && ctaLabel) && (
          <div className="mt-2 md:mt-3 flex justify-end">
            <Link href={ctaHref} className="btn-gold">{ctaLabel}</Link>
          </div>
        )}
      </div>
    </div>
  );
}


