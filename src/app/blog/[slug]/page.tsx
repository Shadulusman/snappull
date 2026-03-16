import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';
import { blogPosts, getBlogBySlug, getAllBlogSlugs } from '@/lib/blog-data';
import { getToolBySlug } from '@/lib/tools';
import { generateFAQSchema, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemas';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://snappull.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: { card: 'summary_large_image', title: post.metaTitle, description: post.metaDescription },
    alternates: { canonical: `https://snappull.com/blog/${slug}` },
  };
}

function renderContent(content: string) {
  // Simple markdown link parser for internal links
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <Link key={i} href={match[2]} className="text-accent hover:underline">
          {match[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const faqSchema = generateFAQSchema(post.faqs);
  const articleSchema = generateArticleSchema(
    post.title,
    post.metaDescription,
    `https://snappull.com/blog/${slug}`,
    post.date,
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://snappull.com' },
    { name: 'Blog', url: 'https://snappull.com/blog' },
    { name: post.title, url: `https://snappull.com/blog/${slug}` },
  ]);

  // Get recent posts for sidebar
  const recentPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <header className="mb-10">
                <span className="text-xs font-medium text-accent">{post.category}</span>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2 mb-4">{post.title}</h1>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </header>

              <AdSlot position="in-content" className="mb-8" />

              <div className="space-y-8">
                {post.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
                    <div className="text-muted leading-relaxed space-y-4">
                      {section.content.split('\n\n').map((paragraph, j) => (
                        <p key={j}>{renderContent(paragraph)}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Related tools */}
              {post.relatedTools.length > 0 && (
                <div className="mt-12 p-6 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-4">Related Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedTools.map((toolSlug) => {
                      const tool = getToolBySlug(toolSlug);
                      if (!tool) return null;
                      return (
                        <Link
                          key={toolSlug}
                          href={`/${toolSlug}`}
                          className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors"
                        >
                          {tool.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {post.faqs.length > 0 && (
                <div className="mt-12">
                  <FAQ items={post.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-20 space-y-6">
                <AdSlot position="sidebar" />

                <div className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-semibold text-sm mb-4">Recent Articles</h3>
                  <ul className="space-y-3">
                    {recentPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="text-sm text-muted hover:text-foreground transition-colors line-clamp-2">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
