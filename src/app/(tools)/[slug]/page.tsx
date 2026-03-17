import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DownloadForm from '@/components/DownloadForm';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { tools, getToolBySlug } from '@/lib/tools';
import { seoPages, getSEOPageBySlug } from '@/lib/seo-pages';
import { generateFAQSchema, generateHowToSchema, generateWebAppSchema, generateBreadcrumbSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

function getPageData(slug: string) {
  const tool = getToolBySlug(slug);
  if (tool) return { type: 'tool' as const, tool, seoPage: null };

  const seoPage = getSEOPageBySlug(slug);
  if (seoPage) {
    const parentTool = getToolBySlug(seoPage.toolSlug);
    if (parentTool) return { type: 'seo' as const, tool: parentTool, seoPage };
  }

  return null;
}

export async function generateStaticParams() {
  const toolSlugs = tools.map((t) => ({ slug: t.slug }));
  const seoSlugs = seoPages.map((p) => ({ slug: p.slug }));
  return [...toolSlugs, ...seoSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getPageData(slug);
  if (!data) return {};

  const { tool, seoPage } = data;
  const title = seoPage?.metaTitle || tool.metaTitle;
  const description = seoPage?.metaDescription || tool.metaDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://quicklysave.com/${slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://quicklysave.com/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const data = getPageData(slug);
  if (!data) notFound();

  const { tool, seoPage } = data;
  const heading = seoPage?.heading || tool.title;
  const subheading = seoPage?.subheading || tool.description;

  const faqSchema = generateFAQSchema(tool.faqs);
  const howToSchema = generateHowToSchema(`How to use ${tool.title}`, tool.steps);
  const webAppSchema = generateWebAppSchema(tool.title, tool.description, `https://quicklysave.com/${slug}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://quicklysave.com' },
    { name: heading, url: `https://quicklysave.com/${slug}` },
  ]);

  const relatedTools = tools.filter((t) => t.slug !== tool.slug && t.platform === tool.platform);
  const otherTools = tools.filter((t) => t.platform !== tool.platform).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <AdSlot position="banner" className="max-w-6xl mx-auto mt-4 px-4" />

      {/* Hero */}
      <section className="pt-16 md:pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-sm text-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{heading}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
            {heading}
          </h1>
          <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
            {subheading}
          </p>
          <DownloadForm placeholder={tool.placeholder} platform={tool.platform} />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {tool.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-card/50">
        <HowItWorks steps={tool.steps} title={`How to Use ${tool.title}`} />
      </section>

      <AdSlot position="in-content" className="max-w-3xl mx-auto my-12 px-4" />

      {/* FAQ */}
      <section className="py-16 px-4">
        <FAQ items={tool.faqs} />
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Related {tool.platform.charAt(0).toUpperCase() + tool.platform.slice(1)} Tools</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="p-4 rounded-xl border border-border hover:bg-card transition-colors"
                >
                  <h3 className="font-medium text-sm">{t.title}</h3>
                  <p className="text-xs text-muted mt-1">{t.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other tools */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">More Download Tools</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {otherTools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="p-4 rounded-xl border border-border hover:bg-card transition-colors"
              >
                <h3 className="font-medium text-sm">{t.title}</h3>
                <p className="text-xs text-muted mt-1">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
