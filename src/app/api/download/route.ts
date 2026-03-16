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

async function fetchMediaInfo(url: string, platform: Platform): Promise<DownloadResult> {
  // Use the free cobalt.tools API for downloading
  try {
    const res = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url,
        vCodec: 'h264',
        vQuality: '1080',
        aFormat: 'mp3',
        isAudioOnly: false,
        filenamePattern: 'basic',
      }),
    });

    if (!res.ok) {
      // Fallback: try allsave API
      return await fetchWithAllSave(url, platform);
    }

    const data = await res.json();

    if (data.status === 'stream' || data.status === 'redirect') {
      return {
        success: true,
        platform,
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`,
        thumbnail: data.thumb || undefined,
        qualities: [
          { label: 'Download', format: 'mp4', url: data.url },
        ],
      };
    }

    if (data.status === 'picker' && data.picker) {
      return {
        success: true,
        platform,
        title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Media`,
        thumbnail: data.picker[0]?.thumb || undefined,
        qualities: data.picker.map((item: { url: string; thumb?: string }, i: number) => ({
          label: `Item ${i + 1}`,
          format: item.url?.includes('.mp4') ? 'mp4' : 'jpg',
          url: item.url,
        })),
      };
    }

    return await fetchWithAllSave(url, platform);
  } catch {
    return await fetchWithAllSave(url, platform);
  }
}

async function fetchWithAllSave(url: string, platform: Platform): Promise<DownloadResult> {
  try {
    // Use a second free API as fallback
    const apiUrl = `https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?url=${encodeURIComponent(url)}`;
    const rapidApiKey = process.env.RAPIDAPI_KEY;

    if (rapidApiKey) {
      const res = await fetch(apiUrl, {
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.links && data.links.length > 0) {
          return {
            success: true,
            platform,
            title: data.title || `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`,
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
      }
    }

    // Final fallback: return a helpful message
    return {
      success: false,
      platform,
      error: 'Unable to fetch this video right now. Please try again in a moment or try a different link.',
    };
  } catch {
    return {
      success: false,
      platform,
      error: 'Unable to fetch this video right now. Please try again in a moment.',
    };
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

    const result = await fetchMediaInfo(url, platform);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, platform: null, error: 'Internal server error' } satisfies DownloadResult,
      { status: 500 },
    );
  }
}
