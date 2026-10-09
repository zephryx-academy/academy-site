import type { Course } from '@/lib/courses';

/**
 * Generated cover art — a hue-shifted grid and glow, so the design needs no
 * image assets and every course still looks distinct.
 */
export default function CourseCover({ course, className = '', bare = false }: { course: Course; className?: string; bare?: boolean }) {
  const h = course.hue;
  return (
    <div
      className={`relative overflow-hidden border-b border-line ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, hsl(${h} 80% 45% / 0.35), transparent 60%), linear-gradient(160deg, hsl(${h} 40% 10%), var(--color-void))`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(${h} 80% 60% / 0.12) 1px, transparent 1px), linear-gradient(to bottom, hsl(${h} 80% 60% / 0.12) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom, #000, transparent)',
        }}
      />
      {bare ? null : (
      <>
      <span
        className="absolute bottom-3 left-4 font-mono text-5xl font-bold tracking-tighter"
        style={{ color: `hsl(${h} 85% 62% / 0.9)` }}
      >
        {course.stage}
      </span>
      <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.25em] text-ink-dim">
        {course.topic.toUpperCase()}
      </span>
      </>
      )}
    </div>
  );
}
