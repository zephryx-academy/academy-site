import type { Metadata } from 'next';
import CoursesIndex from '@/components/CoursesIndex';
import { COURSES } from '@/lib/courses';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Structured offensive security and detection engineering courses — modules, labs and the log trail every technique leaves behind.',
  alternates: { canonical: `${SITE.url}/courses/` },
};

export default function CoursesPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-10 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">LEARN</p>
        <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">Courses</h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-dim">
          Structured paths that follow the{' '}
          <a href="/roadmap/" className="text-red-blood/90 hover:text-red-blood">roadmap</a>. Each course
          is built around manual technique first, then the telemetry it leaves, then the rule that
          catches it.
        </p>

        <div className="mt-7 flex max-w-2xl gap-3 border border-warn/30 bg-warn/5 px-4 py-3 text-xs leading-relaxed text-ink-dim">
          <span className="font-mono text-warn" aria-hidden>!</span>
          <p>
            <strong className="font-mono font-medium text-ink">Design preview.</strong> The courses below
            are sample entries used to lay out the catalog and player. None of the lessons exist yet.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <CoursesIndex courses={COURSES} />
      </div>
    </>
  );
}
