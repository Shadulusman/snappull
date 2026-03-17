import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Instagram</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/instagram-reels-downloader" className="hover:text-foreground transition-colors">Reels Downloader</Link></li>
              <li><Link href="/instagram-video-downloader" className="hover:text-foreground transition-colors">Video Downloader</Link></li>
              <li><Link href="/instagram-photo-downloader" className="hover:text-foreground transition-colors">Photo Downloader</Link></li>
              <li><Link href="/instagram-audio-extractor" className="hover:text-foreground transition-colors">Audio Extractor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">YouTube</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/youtube-video-downloader" className="hover:text-foreground transition-colors">Video Downloader</Link></li>
              <li><Link href="/youtube-to-mp3" className="hover:text-foreground transition-colors">YouTube to MP3</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">TikTok</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/tiktok-video-downloader" className="hover:text-foreground transition-colors">Video Downloader</Link></li>
              <li><Link href="/tiktok-no-watermark-downloader" className="hover:text-foreground transition-colors">No Watermark</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">More</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/twitter-video-downloader" className="hover:text-foreground transition-colors">Twitter/X Downloader</Link></li>
              <li><Link href="/facebook-video-downloader" className="hover:text-foreground transition-colors">Facebook Downloader</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} QuicklySave. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
