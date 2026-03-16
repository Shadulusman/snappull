import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog - Video Download Guides & Tips',
  description: 'Learn how to download videos from Instagram, YouTube, TikTok, and more. Guides, tips, and best practices for saving social media content.',
  alternates: { canonical: 'https://snappull.com/blog' },
};

export default function BlogPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4">Blog</h1>
        <p className="text-muted text-center mb-12 max-w-xl mx-auto">
          Guides, tips, and tutorials for downloading and saving social media content.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
