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

  const columns = Math.min(3, Math.max(2, Math.ceil(items.length / 3)));

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
        className="card p-4 border shadow-xl bg-[var(--surface)] w-[min(80vw,720px)] animate-dropdown"
      >
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
          {items.map((child) => (
            <div key={child.label} className="min-w-0">
              <Link href={child.href} className="block rounded-none px-3 py-2 hover:bg-[var(--muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]">
                <div className="font-medium text-[color:var(--brand-deep)]">{child.label}</div>
                {child.description && (
                  <div className="text-sm opacity-80 line-clamp-2">{child.description}</div>
                )}
              </Link>
            </div>
          ))}
        </div>
        {(ctaHref && ctaLabel) && (
          <div className="mt-3 flex justify-end">
            <Link href={ctaHref} className="btn-primary">{ctaLabel}</Link>
          </div>
        )}
      </div>
    </div>
  );
}


