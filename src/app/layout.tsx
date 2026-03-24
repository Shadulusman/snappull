import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://quicklysave.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'QuicklySave - Free Social Media Video Downloader',
    template: '%s | QuicklySave',
  },
  description: 'Download videos from Instagram, YouTube, TikTok, Twitter/X, and Facebook for free. Save social media content in HD quality.',
  keywords: ['video downloader', 'instagram downloader', 'youtube downloader', 'tiktok downloader', 'social media downloader'],
  openGraph: {
    type: 'website',
    siteName: 'QuicklySave',
    title: 'QuicklySave - Free Social Media Video Downloader',
    description: 'Download videos from Instagram, YouTube, TikTok, Twitter/X, and Facebook for free.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuicklySave - Free Social Media Video Downloader',
    description: 'Download videos from Instagram, YouTube, TikTok, Twitter/X, and Facebook for free.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                const d = t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches);
                if (d) document.documentElement.classList.add('dark');
              } catch {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
