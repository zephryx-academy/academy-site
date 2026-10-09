import { formatDuration, type Course, type LessonKind } from '@/lib/courses';

const KIND: Record<LessonKind, string> = { video: 'VIDEO', lab: 'LAB', reading: 'READ' };

/** Native <details>: works without JavaScript and is keyboard-accessible for free. */
export default function CurriculumList({ course }: { course: Course }) {
  return (
    <div className="space-y-3">
      {course.modules.map((m, i) => {
        const mins = m.lessons.reduce((n, ls) => n + ls.minutes, 0);
        return (
          <details key={m.id} open={i === 0} className="panel group">
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-xs text-red-blood/80">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 font-mono text-sm font-semibold text-ink">{m.title}</span>
              <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">
                {m.lessons.length} lessons · {formatDuration(mins)}
              </span>
              <span className="font-mono text-ink-faint transition-transform group-open:rotate-90" aria-hidden>
                ›
              </span>
            </summary>
            <ul className="border-t border-line">
              {m.lessons.map((ls) => (
                <li
                  key={ls.id}
                  className="flex items-start gap-4 border-b border-line/60 px-5 py-3 last:border-0"
                >
                  <span className="mt-0.5 w-12 shrink-0 font-mono text-[10px] tracking-wider text-ink-faint">
                    {KIND[ls.kind]}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-ink">{ls.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-faint">{ls.summary}</p>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">{formatDuration(ls.minutes)}</span>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
}
