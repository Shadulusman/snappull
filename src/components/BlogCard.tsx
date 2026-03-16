import Link from 'next/link';
import type { BlogPost } from '@/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-card hover:bg-card-hover rounded-2xl border border-border p-6 transition-all hover:shadow-sm group"
    >
      <span className="text-xs font-medium text-accent">{post.category}</span>
      <h3 className="font-semibold mt-2 mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-muted line-clamp-2 mb-3">{post.excerpt}</p>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{post.date}</span>
        <span>&middot;</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
