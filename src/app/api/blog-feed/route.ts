import { NextResponse } from 'next/server';
import { getDailyCachedPosts } from '@/lib/blogAggregator';

export const revalidate = 86400; // 24 hours ISR for edge/CDN

export async function GET() {
  try {
    const posts = await getDailyCachedPosts(48);
    return NextResponse.json({ posts }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch external blog feed' }, { status: 500 });
  }
}


