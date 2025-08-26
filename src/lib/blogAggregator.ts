import Parser from 'rss-parser';

export type AggregatedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  cover?: string;
  author?: string;
  date?: string;
  source: string;
};

const parser = new Parser({
  headers: {
    'User-Agent': 'CrossCreekRealtyBot/1.0 (+https://example.com)'
  },
  customFields: {
    item: [
      'content:encoded',
      ['media:content', 'mediaContent', { keepArray: true }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: true }],
      'enclosure'
    ]
  }
});

// Curated real estate sources (RSS/Atom)
// Add/remove as needed. Only reputable, evergreen publishers.
const FEED_URLS: { url: string; source: string }[] = [
  { url: 'https://www.nar.realtor/rss/all-headlines', source: 'NAR' },
  { url: 'https://www.redfin.com/news/feed/', source: 'Redfin News' },
  { url: 'https://www.zillow.com/blog/feed/', source: 'Zillow Porchlight' },
  { url: 'https://www.housingwire.com/feed/', source: 'HousingWire' },
  { url: 'https://www.mba.org/rss', source: 'MBA' },
];

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function createExcerpt(htmlOrText: string | undefined, max = 180): string {
  if (!htmlOrText) return '';
  const text = htmlOrText
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function dedupeByUrl(posts: AggregatedPost[]): AggregatedPost[] {
  const seen = new Set<string>();
  const result: AggregatedPost[] = [];
  for (const p of posts) {
    if (seen.has(p.url)) continue;
    seen.add(p.url);
    result.push(p);
  }
  return result;
}

export async function fetchAggregatedPosts(limit = 36): Promise<AggregatedPost[]> {
  const results = await Promise.allSettled(
    FEED_URLS.map(async (f) => {
      const feed = await parser.parseURL(f.url);
      return (feed.items || []).map((item) => {
        const title = item.title || 'Untitled';
        const url = item.link || '';
        const date = (item.isoDate || item.pubDate) as string | undefined;
        const author = getField<string>(item, 'creator') || getField<string>(item, 'author');
        const summary = (item['contentSnippet'] as string | undefined) || (item['summary'] as string | undefined) || (item['content'] as string | undefined);
        const excerpt = createExcerpt(summary);
        const id = url || `${f.source}:${title}`;
        const slug = `${toSlug(title)}-${Math.abs(id.hashCode?.() ?? 0)}`;
        // Try to extract a media thumbnail from multiple sources
        type MediaEntry = { url?: string; type?: string; $?: { url?: string; type?: string } } | string;

        function getField<T>(obj: unknown, key: string): T | undefined {
          if (obj && typeof obj === 'object' && key in (obj as Record<string, unknown>)) {
            return (obj as Record<string, unknown>)[key] as T;
          }
          return undefined;
        }

        const contentHtml = getField<string>(item, 'content:encoded') || getField<string>(item, 'content') || '';

        function normalizeUrlCandidate(candidate: unknown): string | undefined {
          if (!candidate) return undefined;
          if (typeof candidate === 'string') return candidate;
          if (typeof candidate === 'object') {
            const obj = candidate as { url?: string; $?: { url?: string } };
            return obj.url || obj.$?.url;
          }
          return undefined;
        }

        function extractFromMediaContent(): string | undefined {
          const mediaUnknown = getField<unknown>(item, 'mediaContent');
          const entries: MediaEntry[] = Array.isArray(mediaUnknown)
            ? (mediaUnknown as MediaEntry[])
            : mediaUnknown
            ? [mediaUnknown as MediaEntry]
            : [];
          for (const m of entries) {
            const mObj = typeof m === 'string' ? { url: m } : m;
            const type = (mObj.type || mObj.$?.type || '').toLowerCase();
            const urlCandidate = normalizeUrlCandidate(mObj);
            if (urlCandidate && (type.includes('image') || type === '')) return urlCandidate;
          }
          return undefined;
        }

        function extractFromMediaThumbnail(): string | undefined {
          const mediaUnknown = getField<unknown>(item, 'mediaThumbnail');
          const entries: MediaEntry[] = Array.isArray(mediaUnknown)
            ? (mediaUnknown as MediaEntry[])
            : mediaUnknown
            ? [mediaUnknown as MediaEntry]
            : [];
          for (const m of entries) {
            const urlCandidate = normalizeUrlCandidate(m);
            if (urlCandidate) return urlCandidate;
          }
          return undefined;
        }

        function extractFromEnclosure(): string | undefined {
          const enc = getField<{ url?: string; type?: string }>(item, 'enclosure');
          if (!enc) return undefined;
          if (enc.type && enc.type.toLowerCase().includes('image') && enc.url) return enc.url;
          return undefined;
        }

        function extractFromContentImages(): string | undefined {
          const imgMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
          return imgMatch?.[1];
        }

        function extractYoutubeIdFromHtml(html: string): string | undefined {
          const patterns = [
            /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
            /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/i,
            /youtu\.be\/([A-Za-z0-9_-]{6,})/i
          ];
          for (const re of patterns) {
            const m = html.match(re);
            if (m?.[1]) return m[1];
          }
          return undefined;
        }

        function extractFromYoutube(): string | undefined {
          const id = extractYoutubeIdFromHtml(contentHtml || '');
          if (!id) return undefined;
          return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        }

        const cover =
          extractFromMediaContent() ||
          extractFromMediaThumbnail() ||
          extractFromEnclosure() ||
          extractFromContentImages() ||
          extractFromYoutube();
        const post: AggregatedPost = {
          id,
          slug,
          title,
          excerpt,
          url,
          cover,
          author,
          date,
          source: f.source,
        };
        return post;
      });
    })
  );

  const flattened = results
    .filter((r): r is PromiseFulfilledResult<AggregatedPost[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value);

  const deduped = dedupeByUrl(flattened)
    // Keep only posts with useful media (image/video thumbnail available)
    .filter((p) => !!p.url && !!p.title && !!p.excerpt && !!p.cover)
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    })
    .slice(0, limit);

  return deduped;
}

// Daily cache helper for server-only usage
let cachedAt: number | null = null;
let cachedPosts: AggregatedPost[] | null = null;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function getDailyCachedPosts(limit = 36): Promise<AggregatedPost[]> {
  const now = Date.now();
  if (cachedAt && cachedPosts && now - cachedAt < ONE_DAY_MS) {
    return cachedPosts.slice(0, limit);
  }
  const fresh = await fetchAggregatedPosts(limit);
  cachedAt = now;
  cachedPosts = fresh;
  return fresh;
}

// String hash helper (non-crypto) for slug uniqueness best-effort
declare global {
  interface String {
    hashCode(): number;
  }
}

if (!String.prototype.hashCode) {
  String.prototype.hashCode = function hashCode(): number {
    let hash = 0;
    for (let i = 0; i < this.length; i += 1) {
      hash = (hash << 5) - hash + this.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}


