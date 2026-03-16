# SnapPull - Social Media Video Downloader

A fast, minimal, SEO-optimized social media downloader built with Next.js 16, TailwindCSS 4, and TypeScript.

## Features

- 10 dedicated downloader tools (Instagram, YouTube, TikTok, Twitter/X, Facebook)
- 15 programmatic SEO pages targeting long-tail keywords
- 20 SEO blog articles with FAQ schema markup
- Apple-style minimal UI with dark mode
- Mobile-first responsive design
- JSON-LD structured data (FAQ, HowTo, WebApplication, Article, Breadcrumb)
- Auto-generated sitemap.xml and robots.txt
- Ad-ready layout (banner, sidebar, in-content slots)
- Paste-and-detect URL input with loading states

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Generation)
- **Styling**: TailwindCSS 4
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── not-found.tsx               # 404 page
│   ├── sitemap.ts                  # Dynamic sitemap
│   ├── api/download/route.ts       # Download API
│   ├── (tools)/[slug]/page.tsx     # Tool + SEO pages (25 pages)
│   └── blog/
│       ├── page.tsx                # Blog index
│       └── [slug]/page.tsx         # Blog articles (20 pages)
├── components/                     # Reusable UI components
├── lib/                            # Data and utilities
│   ├── tools.ts                    # 10 tool definitions
│   ├── seo-pages.ts                # 15 SEO page variations
│   ├── blog-data.ts                # 20 blog articles
│   └── schemas.ts                  # JSON-LD generators
└── types/                          # TypeScript interfaces
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO meta tags |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense client ID (optional) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) |

## Deployment on Vercel

1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy

The project uses static generation — 52 pages are pre-rendered at build time.

## API

The download API (`/api/download`) accepts POST requests:

```json
{
  "url": "https://www.instagram.com/reel/...",
  "platform": "instagram"
}
```

Currently returns placeholder responses. Integrate real download services by adding platform-specific modules in `src/lib/`.

## SEO

- All pages have unique meta titles and descriptions
- FAQ schema on every tool and blog page
- HowTo schema on tool pages
- WebApplication schema on homepage
- Breadcrumb schema on all inner pages
- Canonical URLs on every page
- Auto-generated sitemap.xml
