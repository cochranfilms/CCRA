"use client";
import { useEffect } from 'react';

export default function MaintenanceGuard({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    function shouldBlockAnchor(anchor: HTMLAnchorElement): boolean {
      const href = anchor.getAttribute('href') || '';
      // Allow tel/mailto and empty anchors
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return false;

      try {
        const url = new URL(href, window.location.origin);
        const sameOrigin = url.origin === window.location.origin;
        const exempt = url.pathname.startsWith('/maintenance') ||
          url.pathname.startsWith('/api') ||
          url.pathname.startsWith('/_next') ||
          url.pathname === '/favicon.ico' ||
          url.pathname === '/robots.txt' ||
          url.pathname === '/sitemap.xml';
        return sameOrigin && !exempt;
      } catch {
        return false;
      }
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (shouldBlockAnchor(anchor)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', onClick, true);

    // Mark anchors as disabled for a11y
    const anchors = Array.from(document.querySelectorAll('a')) as HTMLAnchorElement[];
    anchors.forEach((a) => {
      if (shouldBlockAnchor(a)) {
        a.setAttribute('aria-disabled', 'true');
        a.setAttribute('title', 'Temporarily unavailable during maintenance');
      }
    });

    return () => document.removeEventListener('click', onClick, true);
  }, [enabled]);

  return null;
}


