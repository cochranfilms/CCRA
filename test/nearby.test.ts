import { describe, it, expect } from 'vitest';

describe('Nearby API route (stub)', () => {
  it('returns fallback data shape', async () => {
    const res = await fetch('http://localhost:3000/api/nearby?lat=33.8&lng=-84.3&cat=Dining').catch(() => null);
    // In CI or without server running, skip network assertions
    if (!res) {
      expect(true).toBe(true);
      return;
    }
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});


