import Link from 'next/link';

const platformLinks = [
  { name: 'Instagram', href: '/instagram-reels-downloader', color: '#E4405F', icon: InstagramIcon },
  { name: 'YouTube', href: '/youtube-video-downloader', color: '#FF0000', icon: YouTubeIcon },
  { name: 'TikTok', href: '/tiktok-video-downloader', color: 'currentColor', icon: TikTokIcon },
  { name: 'Twitter/X', href: '/twitter-video-downloader', color: '#1DA1F2', icon: TwitterIcon },
  { name: 'Facebook', href: '/facebook-video-downloader', color: '#1877F2', icon: FacebookIcon },
];

export default function PlatformIcons() {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      {platformLinks.map((p) => (
        <Link
          key={p.name}
          href={p.href}
          className="flex flex-col items-center gap-2 group"
          title={`${p.name} Downloader`}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card group-hover:bg-card-hover flex items-center justify-center transition-all group-hover:scale-105">
            <p.icon color={p.color} />
          </div>
          <span className="text-xs text-muted group-hover:text-foreground transition-colors">{p.name}</span>
        </Link>
      ))}
    </div>
  );
}

function InstagramIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.5.5c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.5 9.5.5 9.5.5s7.6 0 9.5-.5c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/>
    </svg>
  );
}

function TikTokIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.93 2.93 0 0 1 .88.13V9.01a6.27 6.27 0 0 0-1-.07 6.33 6.33 0 0 0-6.33 6.33A6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.19a8.16 8.16 0 0 0 4.77 1.53V7.27a4.85 4.85 0 0 1-.88-.58z"/>
    </svg>
  );
}

function TwitterIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
