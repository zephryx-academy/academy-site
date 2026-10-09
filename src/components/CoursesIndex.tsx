'use client';

import { useState } from 'react';
import { LEVELS, type Course, type Level } from '@/lib/courses';
import CourseCard from './CourseCard';

export default function CoursesIndex({ courses }: { courses: Course[] }) {
  const [level, setLevel] = useState<Level | 'All'>('All');
  const shown = level === 'All' ? courses : courses.filter((c) => c.level === level);

  return (
    <div>
      <div role="group" aria-label="Filter by level" className="flex flex-wrap gap-2">
        {(['All', ...LEVELS] as const).map((lv) => {
          const active = level === lv;
          return (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              aria-pressed={active}
              className={`border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? 'border-red-blood bg-red-ash/40 text-red-blood'
                  : 'border-line text-ink-dim hover:border-red-deep hover:text-ink'
              }`}
            >
              {lv}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status">
        {shown.length} {shown.length === 1 ? 'course' : 'courses'} shown
      </p>

      {shown.length ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <li key={c.slug} className="flex">
              <div className="flex w-full flex-col [&>a]:flex-1">
                <CourseCard course={c} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="panel mt-6 p-6 font-mono text-sm text-ink-dim">No sample courses at this level yet.</p>
      )}
    </div>
  );
}
