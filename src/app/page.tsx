import DownloadForm from '@/components/DownloadForm';
import PlatformIcons from '@/components/PlatformIcons';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import { generateWebAppSchema, generateFAQSchema } from '@/lib/schemas';

const homeFaqs = [
  { question: 'What is QuicklySave?', answer: 'QuicklySave is a free online tool that lets you download videos, photos, and audio from popular social media platforms including Instagram, YouTube, TikTok, Twitter/X, and Facebook.' },
  { question: 'Is QuicklySave free to use?', answer: 'Yes, QuicklySave is completely free. There are no hidden fees, subscriptions, or premium tiers. All features are available to everyone.' },
  { question: 'Do I need to install anything?', answer: 'No. QuicklySave works entirely in your browser. There is no app or software to install.' },
  { question: 'What platforms are supported?', answer: 'QuicklySave supports Instagram (Reels, videos, photos, audio), YouTube (videos, MP3), TikTok (with and without watermark), Twitter/X, and Facebook.' },
  { question: 'Is it safe to use QuicklySave?', answer: 'Absolutely. QuicklySave does not require any login credentials or personal information. Your downloads are processed securely.' },
  { question: 'Can I use QuicklySave on my phone?', answer: 'Yes, QuicklySave is fully responsive and works perfectly on iPhone, Android, tablets, and desktop computers.' },
];

const features = [
  { title: 'Lightning Fast', description: 'Downloads start in seconds. No waiting around.', icon: '⚡' },
  { title: 'HD Quality', description: 'Save videos in their original resolution up to 4K.', icon: '🎬' },
  { title: 'No Registration', description: 'Start downloading immediately. No account needed.', icon: '🔓' },
  { title: 'All Platforms', description: 'Instagram, YouTube, TikTok, Twitter, Facebook.', icon: '🌐' },
];

export default function HomePage() {
  const webAppSchema = generateWebAppSchema(
    'QuicklySave',
    'Free social media video downloader for Instagram, YouTube, TikTok, Twitter, and Facebook',
    'https://quicklysave.com',
  );
  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <AdSlot position="banner" className="max-w-6xl mx-auto mt-4 px-4" />

      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-4">
            Download Videos from{' '}
            <span className="text-accent">Instagram</span>,{' '}
            <span className="text-accent">YouTube</span>,{' '}
            <span className="text-accent">TikTok</span>{' '}
            and more
          </h1>
          <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
            Paste any social media link and download videos, photos, and audio in HD quality. Free and instant.
          </p>
          <DownloadForm />
        </div>
      </section>

      {/* Platform icons */}
      <section className="pb-16 px-4">
        <PlatformIcons />
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Why Choose QuicklySave</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular tools */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Popular Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-card transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tool.color}15` }}
                >
                  <span style={{ color: tool.color }} className="text-lg font-bold">
                    {tool.platform[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-accent transition-colors">{tool.title}</h3>
                  <p className="text-xs text-muted mt-0.5 line-clamp-1">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot position="in-content" className="max-w-3xl mx-auto px-4" />

      {/* FAQ */}
      <section className="py-16 px-4">
        <FAQ items={homeFaqs} />
      </section>
    </>
  );
}
