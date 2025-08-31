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

  return (
    <div
      role="menu"
      id={id}
      aria-hidden={!open}
      className={(anchorClassName || '') + ' z-[60]'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Premium Dropdown Panel */}
      <div
        ref={panelRef}
        className="p-4 w-[min(90vw,320px)] animate-dropdown shadow-2xl shadow-black/20 bg-white/95 backdrop-blur-xl border border-white/20 overflow-hidden"
      >
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"></div>
        
        {/* Content Container */}
        <div className="flex flex-col gap-2 pt-2">
          {items.map((child, index) => (
            <Link
              key={child.label}
              href={child.href}
              className="group relative px-4 py-3 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                  {child.label}
                </div>
                {child.description && (
                  <div className="text-sm text-slate-600 group-hover:text-slate-700 mt-1 line-clamp-2 transition-colors duration-300">
                    {child.description}
                  </div>
                )}
              </div>
              
              {/* Subtle border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-amber-200/50 transition-all duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>
        
        {/* Premium CTA Section */}
        {(ctaHref && ctaLabel) && (
          <div className="mt-4 pt-4 border-t border-slate-200/50">
            <Link 
              href={ctaHref} 
              className="relative w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-center transition-all duration-300 ease-out hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 inline-flex items-center justify-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{ctaLabel}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


