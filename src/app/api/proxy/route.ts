import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
// Enable edge runtime for streaming (no 4.5MB body size limit)
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get('url');
  const filename = request.nextUrl.searchParams.get('filename') || 'download';

  if (!fileUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const parsed = new URL(fileUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const origin = new URL(fileUrl).origin;
    const response = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': origin + '/',
        'Origin': origin,
      },
      redirect: 'follow',
    });

    if (!response.ok || !response.body) {
      // If proxy fetch fails, redirect user directly to the media URL
      return NextResponse.redirect(fileUrl);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');

    let ext = 'mp4';
    if (contentType.includes('audio') || contentType.includes('mpeg')) ext = 'mp3';
    else if (contentType.includes('image/jpeg')) ext = 'jpg';
    else if (contentType.includes('image/png')) ext = 'png';
    else if (contentType.includes('webm')) ext = 'webm';

    const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'no-cache',
    };

    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    return new Response(response.body, { headers });
  } catch {
    // On any error, redirect to the original URL as fallback
    return NextResponse.redirect(fileUrl);
  }
}
