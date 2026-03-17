import type { Platform } from '@/types';

interface Props {
  platform: Platform;
  size?: number;
  className?: string;
}

export default function PlatformIcon({ platform, size = 24, className = '' }: Props) {
  const s = size;

  switch (platform) {
    case 'instagram':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="140%">
              <stop offset="0%" stopColor="#fdf497"/>
              <stop offset="20%" stopColor="#fd5949"/>
              <stop offset="60%" stopColor="#d6249f"/>
              <stop offset="100%" stopColor="#285AEB"/>
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
          <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="17.2" cy="6.8" r="1.1" fill="white"/>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.6" fill="none"/>
        </svg>
      );

    case 'youtube':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="5" fill="#FF0000"/>
          <path d="M19.6 8.2a2 2 0 0 0-1.4-1.4C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.2.3a2 2 0 0 0-1.4 1.4C4.1 9.5 4.1 12 4.1 12s0 2.5.3 3.8a2 2 0 0 0 1.4 1.4c1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3a2 2 0 0 0 1.4-1.4c.3-1.3.3-3.8.3-3.8s0-2.5-.3-3.8z" fill="white"/>
          <polygon points="10.2,14.7 14.8,12 10.2,9.3" fill="#FF0000"/>
        </svg>
      );

    case 'tiktok':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="5" fill="#010101"/>
          <path d="M16.6 5.8a3.8 3.8 0 0 1-3.8-3.8h-2.4v11.1L10.3 17a2.2 2.2 0 1 1-2.2-2.3c.2 0 .5 0 .7.1v-2.5a4.6 4.6 0 0 0-.7-.1 4.6 4.6 0 0 0-4.6 4.6 4.6 4.6 0 0 0 4.6 4.6 4.6 4.6 0 0 0 4.6-4.6V9.4a6.2 6.2 0 0 0 3.8 1.3V8.3a3.8 3.8 0 0 1-1.9-.5l-.6-.4" fill="white"/>
          <path d="M17.8 7.6a3.8 3.8 0 0 0 1.7.4V5.6a3.8 3.8 0 0 1-2.1-1.5 3.8 3.8 0 0 1-.8-2.3h-2.4v11.1a2.2 2.2 0 0 1-2.2 2.1 2.2 2.2 0 0 1-1.5-.6v2.5a4.6 4.6 0 0 0 1.5.3 4.6 4.6 0 0 0 4.6-4.6V9.4a6.2 6.2 0 0 0 1.7.3" fill="#69C9D0"/>
        </svg>
      );

    case 'twitter':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="5" fill="#000000"/>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" fill="white"/>
        </svg>
      );

    case 'facebook':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect width="24" height="24" rx="5" fill="#1877F2"/>
          <path d="M16.7 15.5l.5-3.2h-3.1V10c0-.9.4-1.7 1.7-1.7h1.3V5.6S15.9 5.4 14.8 5.4c-2.5 0-4.2 1.5-4.2 4.3v2.6H7.9v3.2h2.7V22c.5.1 1.1.1 1.6.1s1.1 0 1.6-.1v-6.5h2.9z" fill="white"/>
        </svg>
      );

    default:
      return null;
  }
}
