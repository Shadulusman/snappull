import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // Allow up to 60s for large files

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
    const response = await fetch(fileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': new URL(fileUrl).origin + '/',
        'Origin': new URL(fileUrl).origin,
      },
      redirect: 'follow',
    });

    if (!response.ok || !response.body) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 502 });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');

    let ext = 'mp4';
    if (contentType.includes('audio') || contentType.includes('mpeg')) ext = 'mp3';
    else if (contentType.includes('image/jpeg')) ext = 'jpg';
    else if (contentType.includes('image/png')) ext = 'png';
    else if (contentType.includes('webm')) ext = 'webm';

    const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'no-cache',
    };

    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    return new NextResponse(response.body, { headers });
  } catch {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
