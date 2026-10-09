import Link from 'next/link';
import { formatDuration, lessonCount, totalMinutes, type Course } from '@/lib/courses';
import CourseCover from './CourseCover';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}/`}
      className="panel clip-corner group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-red-deep hover:shadow-[0_0_40px_-12px_rgba(255,45,75,0.5)]"
    >
      <CourseCover course={course} className="h-36" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.15em]">
          <span className="border border-line px-2 py-0.5 text-ink-dim">{course.level.toUpperCase()}</span>
          <span className="border border-warn/40 px-2 py-0.5 text-warn">{course.status.toUpperCase()}</span>
        </div>
        <h3 className="mt-3 font-mono text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-red-blood">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{course.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-ink-faint">
          <span>
            {course.modules.length} modules · {lessonCount(course)} lessons
          </span>
          <span>{formatDuration(totalMinutes(course))}</span>
        </div>
      </div>
    </Link>
  );
}
