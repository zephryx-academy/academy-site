import Link from 'next/link';

/** Design stand-in: enrolling just opens the player. No account, no storage. */
export default function EnrollButton({ slug, className = '' }: { slug: string; className?: string }) {
  return (
    <Link
      href={`/courses/${slug}/learn/`}
      className={`clip-tab inline-flex items-center justify-center gap-2 border border-red-deep bg-red-core px-7 py-3.5 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)] ${className}`}
    >
      Enroll in this course →
    </Link>
  );
}
