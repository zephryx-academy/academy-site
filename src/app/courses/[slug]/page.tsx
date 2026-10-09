import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseCover from '@/components/CourseCover';
import CurriculumList from '@/components/CurriculumList';
import EnrollButton from '@/components/EnrollButton';
import { COURSES, formatDuration, getCourse, lessonCount, totalMinutes } from '@/lib/courses';
import { SITE } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.tagline,
    alternates: { canonical: `${SITE.url}/courses/${course.slug}/` },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const stats = [
    ['LEVEL', course.level],
    ['MODULES', String(course.modules.length)],
    ['LESSONS', String(lessonCount(course))],
    ['RUNTIME', formatDuration(totalMinutes(course))],
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-faint">
        <Link href="/courses/" className="hover:text-red-blood">courses</Link>
        <span aria-hidden> / </span>
        <span className="text-ink-dim">{course.slug}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.15em]">
            <span className="border border-line px-2 py-0.5 text-ink-dim">STAGE {course.stage}</span>
            <span className="border border-warn/40 px-2 py-0.5 text-warn">SAMPLE · {course.status.toUpperCase()}</span>
          </div>
          <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">{course.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim">{course.tagline}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{course.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {stats.map(([k, v]) => (
              <div key={k} className="bg-surface px-4 py-3">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-ink-faint">{k}</dt>
                <dd className="mt-1 font-mono text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-12" aria-labelledby="outcomes">
            <h2 id="outcomes" className="font-mono text-lg font-semibold text-ink">What you will be able to do</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="panel flex gap-3 p-4 text-sm leading-relaxed text-ink-dim">
                  <span className="font-mono text-signal" aria-hidden>✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="curriculum">
            <h2 id="curriculum" className="font-mono text-lg font-semibold text-ink">Curriculum</h2>
            <div className="mt-4">
              <CurriculumList course={course} />
            </div>
          </section>

          <section className="mt-12" aria-labelledby="prereq">
            <h2 id="prereq" className="font-mono text-lg font-semibold text-ink">Before you start</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-dim">
              {course.prerequisites.map((p) => (
                <li key={p} className="flex gap-3"><span className="font-mono text-red-blood/70" aria-hidden>›</span>{p}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="panel clip-corner overflow-hidden">
            <CourseCover course={course} className="h-44" />
            <div className="p-6">
              <EnrollButton slug={course.slug} className="w-full" />
              <p className="mt-3 text-center font-mono text-[11px] text-ink-faint">
                Opens the player preview — no account needed.
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-5 font-mono text-xs text-ink-dim">
                <li className="flex justify-between"><span className="text-ink-faint">Format</span>Video + labs</li>
                <li className="flex justify-between"><span className="text-ink-faint">Pace</span>Self-paced</li>
                <li className="flex justify-between"><span className="text-ink-faint">Companion</span>Cheatsheets</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
