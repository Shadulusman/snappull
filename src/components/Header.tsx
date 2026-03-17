'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 512 512" className="shrink-0">
            <rect width="512" height="512" rx="108" fill="currentColor" className="text-accent"/>
            <g transform="translate(256,240)">
              <line x1="0" y1="-100" x2="0" y2="80" stroke="white" strokeWidth="48" strokeLinecap="round"/>
              <polyline points="-70,20 0,90 70,20" fill="none" stroke="white" strokeWidth="48" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <line x1="136" y1="380" x2="376" y2="380" stroke="white" strokeWidth="48" strokeLinecap="round"/>
          </svg>
          Quickly<span className="text-accent">Save</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/instagram-reels-downloader" className="text-muted hover:text-foreground transition-colors">Instagram</Link>
          <Link href="/youtube-video-downloader" className="text-muted hover:text-foreground transition-colors">YouTube</Link>
          <Link href="/tiktok-video-downloader" className="text-muted hover:text-foreground transition-colors">TikTok</Link>
          <Link href="/twitter-video-downloader" className="text-muted hover:text-foreground transition-colors">Twitter/X</Link>
          <Link href="/blog" className="text-muted hover:text-foreground transition-colors">Blog</Link>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link href="/instagram-reels-downloader" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Instagram</Link>
          <Link href="/youtube-video-downloader" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>YouTube</Link>
          <Link href="/tiktok-video-downloader" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>TikTok</Link>
          <Link href="/twitter-video-downloader" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Twitter/X</Link>
          <Link href="/facebook-video-downloader" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Facebook</Link>
          <Link href="/blog" className="block text-sm text-muted hover:text-foreground" onClick={() => setMenuOpen(false)}>Blog</Link>
        </div>
      )}
    </header>
  );
}
