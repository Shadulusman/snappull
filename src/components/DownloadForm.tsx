'use client';

import { useState, useRef, useCallback } from 'react';
import type { DownloadResult } from '@/types';

interface Props {
  placeholder?: string;
  platform?: string;
}

export default function DownloadForm({ placeholder = 'Paste your video link here...', platform }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitUrl = useCallback(async (inputUrl: string) => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setError('Please paste a valid link');
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed, platform }),
      });
      const data: DownloadResult = await res.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to process the link. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [platform]);

  const handleSubmit = useCallback(() => {
    submitUrl(url);
  }, [url, submitUrl]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    try {
      new URL(text);
      setTimeout(() => submitUrl(text), 50);
    } catch {
      // not a URL, just let it paste normally
    }
  }, [submitUrl]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleDownload = (mediaUrl: string, label: string) => {
    setDownloading(label);
    const filename = `${(result?.title || 'video').replace(/[^a-zA-Z0-9 _-]/g, '')}-${label}`.trim();

    // Navigate directly to the proxy URL — the server sets Content-Disposition: attachment
    // This works reliably on all platforms including iOS Safari
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
    window.location.href = proxyUrl;

    // Reset button state after a delay (download starts in background)
    setTimeout(() => setDownloading(null), 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-card rounded-2xl border border-border focus-within:border-accent transition-colors shadow-sm">
        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(''); }}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-5 py-4 text-base placeholder:text-muted outline-none"
          aria-label="Video URL"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mr-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
              </svg>
              Processing
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-error text-center animate-fade-in">{error}</p>
      )}

      {result && result.success && (
        <div className="mt-6 bg-card rounded-2xl border border-border p-5 animate-fade-in">
          <div className="flex gap-4">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title || 'Video thumbnail'}
                className="w-32 h-20 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{result.title || 'Video'}</h3>
              {result.duration && <p className="text-xs text-muted mt-1">Duration: {result.duration}</p>}
              {result.qualities && result.qualities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.qualities.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleDownload(q.url, q.label)}
                      disabled={downloading === q.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-xs rounded-lg transition-colors disabled:opacity-60"
                    >
                      {downloading === q.label ? (
                        <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      )}
                      {downloading === q.label ? 'Saving...' : `${q.label} ${q.format.toUpperCase()}`}
                      {q.size && <span className="opacity-70">({q.size})</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
