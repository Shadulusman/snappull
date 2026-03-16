import { NextRequest, NextResponse } from 'next/server';
import type { DownloadResult, Platform } from '@/types';

function detectPlatform(url: string): Platform | null {
  const u = url.toLowerCase();
  if (u.includes('instagram.com') || u.includes('instagr.am')) return 'instagram';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('facebook.com') || u.includes('fb.watch') || u.includes('fb.com')) return 'facebook';
  return null;
}

function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, platform: null, error: 'Please provide a valid URL' } satisfies DownloadResult,
        { status: 400 },
      );
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { success: false, platform: null, error: 'Invalid URL format' } satisfies DownloadResult,
        { status: 400 },
      );
    }

    const platform = detectPlatform(url);

    if (!platform) {
      return NextResponse.json(
        { success: false, platform: null, error: 'Unsupported platform. We support Instagram, YouTube, TikTok, Twitter/X, and Facebook.' } satisfies DownloadResult,
        { status: 400 },
      );
    }

    // Placeholder response — integrate real download services here
    // Each platform would have its own service module for fetching media
    const result: DownloadResult = {
      success: true,
      platform,
      title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`,
      thumbnail: `https://placehold.co/640x360/1c1c1e/ffffff?text=${platform}`,
      duration: '0:30',
      qualities: [
        { label: '1080p', format: 'mp4', size: '12 MB', url: '#' },
        { label: '720p', format: 'mp4', size: '8 MB', url: '#' },
        { label: '480p', format: 'mp4', size: '4 MB', url: '#' },
      ],
    };

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '99',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, platform: null, error: 'Internal server error' } satisfies DownloadResult,
      { status: 500 },
    );
  }
}
