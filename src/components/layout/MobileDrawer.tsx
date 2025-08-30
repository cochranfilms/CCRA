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
  const blog = items.find((i) => i.label === 'Blog');
  const navItems = items.filter((i) => !['Contact', 'Blog', 'Start Your Search'].includes(i.label));

  return (
    <>
      {/* Premium Mobile Menu Button */}
      <button
        className="md:hidden relative inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300 ease-out group"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10 text-lg font-semibold">☰</span>
      </button>

      {/* Premium Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out" onClick={() => setOpen(false)}>
          <aside
            className="fixed inset-y-0 right-0 w-[92%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-l border-white/20 transition-all duration-300 ease-out"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Header */}
            <div className="p-6 border-b border-slate-200/50">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="search"
                    placeholder="Start your search..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:border-amber-400 transition-all duration-300 bg-slate-50/50 backdrop-blur-sm"
                  />
                </div>
                <button
                  className="w-12 h-12 rounded-xl border border-slate-200 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 transition-all duration-300 ease-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 group"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-lg font-semibold">✕</span>
                </button>
              </div>
            </div>

            {/* Premium Navigation */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-200/50 pb-2">
                  <button
                    className="w-full text-left py-4 font-semibold flex items-center justify-between text-slate-800 hover:text-slate-900 transition-colors duration-300 group"
                    aria-expanded={!!expanded[item.label]}
                    onClick={() => setExpanded((s) => ({ ...s, [item.label]: !s[item.label] }))}
                  >
                    <span className="group-hover:text-amber-600 transition-colors duration-300">{item.label}</span>
                    <span className="text-amber-500 group-hover:text-amber-600 transition-colors duration-300 text-xl font-bold">
                      {expanded[item.label] ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`transition-all duration-300 ease-out overflow-hidden ${
                    expanded[item.label] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pb-3 space-y-2 pl-4">
                      {item.children?.map((child) => (
                        <Link 
                          key={child.label} 
                          href={child.href} 
                          className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 ease-out group/item"
                        >
                          <div className="font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors duration-300">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-sm text-slate-500 group-hover/item:text-slate-600 mt-1 line-clamp-2 transition-colors duration-300">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                      {item.href && (
                        <Link 
                          href={item.href} 
                          className="block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300 ease-out text-slate-600 hover:text-slate-800 font-medium"
                        >
                          View {item.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Premium CTA Section */}
            <div className="p-6 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-amber-50/50">
              <div className="grid grid-cols-2 gap-3">
                {contact && (
                  <Link 
                    href={contact.href || '/#contact'} 
                    className="relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl text-center transition-all duration-300 ease-out hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <span className="relative z-10">{contact.label}</span>
                  </Link>
                )}
                {blog && (
                  <Link 
                    href={blog.href || '/blog'} 
                    className="relative px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl text-center transition-all duration-300 ease-out hover:shadow-lg hover:shadow-slate-600/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <span className="relative z-10">{blog.label}</span>
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}


