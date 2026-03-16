import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-semibold mb-4">404</h1>
      <p className="text-lg text-muted mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-medium transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
