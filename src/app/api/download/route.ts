import { NextRequest, NextResponse } from 'next/server';
import type { DownloadResult, Platform } from '@/types';

function detectPlatform(url: string): Platform | null {
  const u = url.toLowerCase();
  if (u.includes('instagram.com') || u.includes('instagr.am')) return 'instagram';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('tiktok.com') || u.includes('vm.tiktok.com')) return 'tiktok';
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

// Primary: Social Download All In One (RapidAPI)
async function fetchWithRapidAPI(url: string, platform: Platform): Promise<DownloadResult | null> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) return null;

  try {
    const res = await fetch('https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Handle different response structures
    if (data.medias && data.medias.length > 0) {
      return {
        success: true,
        platform,
        title: data.title || `${capitalize(platform)} Video`,
        thumbnail: data.thumbnail || undefined,
        duration: data.duration ? formatDuration(data.duration) : undefined,
        qualities: data.medias
          .filter((m: { url?: string }) => m.url)
          .slice(0, 6)
          .map((m: { quality?: string; url: string; extension?: string; formattedSize?: string; type?: string }) => ({
            label: m.quality || m.type || 'Download',
            format: m.extension || (m.type === 'audio' ? 'mp3' : 'mp4'),
            size: m.formattedSize || undefined,
            url: m.url,
          })),
      };
    }

    // Some responses have a direct URL
    if (data.url) {
      return {
        success: true,
        platform,
        title: data.title || `${capitalize(platform)} Video`,
        thumbnail: data.thumbnail || undefined,
        qualities: [
          { label: 'Download', format: 'mp4', url: data.url },
        ],
      };
    }

    return null;
  } catch {
    return null;
  }
}

// Secondary: SMVD API (RapidAPI)
async function fetchWithSMVD(url: string, platform: Platform): Promise<DownloadResult | null> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) return null;

  try {
    const apiUrl = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com',
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.success && data.links && data.links.length > 0) {
      return {
        success: true,
        platform,
        title: data.title || `${capitalize(platform)} Video`,
        thumbnail: data.picture || undefined,
        duration: data.duration || undefined,
        qualities: data.links
          .filter((l: { link: string }) => l.link)
          .slice(0, 5)
          .map((l: { quality: string; link: string; mimeType?: string }) => ({
            label: l.quality || 'Download',
            format: l.mimeType?.includes('audio') ? 'mp3' : 'mp4',
            url: l.link,
          })),
      };
    }

    return null;
  } catch {
    return null;
  }
}

// Tertiary: Cobalt API (self-hosted or public instance)
async function fetchWithCobalt(url: string, platform: Platform): Promise<DownloadResult | null> {
  const cobaltUrl = process.env.COBALT_API_URL || 'https://api.cobalt.tools';

  try {
    const res = await fetch(cobaltUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url,
        videoQuality: '1080',
        audioFormat: 'mp3',
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (data.status === 'tunnel' || data.status === 'redirect') {
      return {
        success: true,
        platform,
        title: data.filename || `${capitalize(platform)} Video`,
        qualities: [
          { label: 'Download', format: 'mp4', url: data.url },
        ],
      };
    }

    if (data.status === 'picker' && data.picker) {
      return {
        success: true,
        platform,
        title: `${capitalize(platform)} Media`,
        thumbnail: data.picker[0]?.thumb || undefined,
        qualities: data.picker
          .slice(0, 6)
          .map((item: { url: string; thumb?: string }, i: number) => ({
            label: `Item ${i + 1}`,
            format: item.url?.includes('.mp4') ? 'mp4' : 'jpg',
            url: item.url,
          })),
      };
    }

    return null;
  } catch {
    return null;
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
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

    // Try APIs in order: RapidAPI primary → SMVD fallback → Cobalt fallback
    const result =
      (await fetchWithRapidAPI(url, platform)) ||
      (await fetchWithSMVD(url, platform)) ||
      (await fetchWithCobalt(url, platform));

    if (result) {
      return NextResponse.json(result);
    }

    // All APIs failed
    const hasApiKey = !!process.env.RAPIDAPI_KEY;
    return NextResponse.json({
      success: false,
      platform,
      error: hasApiKey
        ? 'Unable to fetch this video. The link may be private or expired. Please try a different link.'
        : 'Download service is not configured. Please add your RAPIDAPI_KEY in environment variables.',
    } satisfies DownloadResult);
  } catch {
    return NextResponse.json(
      { success: false, platform: null, error: 'Internal server error' } satisfies DownloadResult,
      { status: 500 },
    );
  }
}
