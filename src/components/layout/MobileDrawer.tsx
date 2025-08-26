"use client";
import Link from 'next/link';
import { useState } from 'react';
import type { NavItem } from './nav.config';

type Props = {
  items: NavItem[];
};

export default function MobileDrawer({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const contact = items.find((i) => i.label === 'Contact');
  const search = items.find((i) => i.label === 'Start Your Search');
  const navItems = items.filter((i) => !['Contact', 'Start Your Search'].includes(i.label));

  return (
    <>
      <button
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-none border border-[var(--brand-deep)] text-[color:var(--brand-deep)]"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        ☰
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <aside
            className="fixed inset-y-0 right-0 w-[92%] max-w-sm bg-[var(--surface)] shadow-2xl p-4 flex flex-col"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Start your search..."
                className="flex-1 rounded-none border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
              <button
                className="w-10 h-10 rounded-none border"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mt-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b">
                  <button
                    className="w-full text-left py-3 font-medium flex items-center justify-between"
                    aria-expanded={!!expanded[item.label]}
                    onClick={() => setExpanded((s) => ({ ...s, [item.label]: !s[item.label] }))}
                  >
                    {item.label}
                    <span>{expanded[item.label] ? '−' : '+'}</span>
                  </button>
                  <div className={expanded[item.label] ? 'pb-3 space-y-1' : 'hidden'}>
                    {item.children?.map((child) => (
                      <Link key={child.label} href={child.href} className="block px-1 py-2 rounded-none hover:bg-[var(--muted)]/50">
                        {child.label}
                      </Link>
                    ))}
                    {item.href && (
                      <Link href={item.href} className="block px-1 py-2 rounded-none hover:bg-[var(--muted)]/50">
                        View {item.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-4 flex items-center gap-2">
              {contact && (
                <Link href={contact.href || '/book'} className="btn-primary flex-1 text-center">{contact.label}</Link>
              )}
              {search && (
                <Link href={search.href || '/listings'} className="btn-gold flex-1 text-center">{search.label}</Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}


