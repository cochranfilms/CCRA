"use client";
import { useEffect, useMemo, useState } from 'react';

type Props = { title: string; url?: string };

export default function ShareButtons({ title, url }: Props) {
  // Avoid hydration mismatch: compute URL after mount when window is available
  const [shareUrl, setShareUrl] = useState<string>(url || '');
  useEffect(() => {
    if (!url) {
      setShareUrl(window.location.href);
    }
  }, [url]);

  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  return (
    <div className="flex items-center gap-2">
      <a className="btn-outline" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className="btn-outline" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">X</a>
      <a className="btn-outline" href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
      <button className="btn-outline" onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy Link</button>
    </div>
  );
}


