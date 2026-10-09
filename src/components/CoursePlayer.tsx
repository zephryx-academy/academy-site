'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { allLessons, formatDuration, type Course } from '@/lib/courses';
import CourseCover from './CourseCover';

const TABS = ['Overview', 'Notes', 'Resources'] as const;

const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

/**
 * Player shell — DESIGN ONLY. There is no media behind it: "playing" just
 * advances the scrubber so the states can be reviewed. Layout follows the
 * YouTube pattern: player + details on the left, a sticky scrollable
 * curriculum on the right (stacked under the player on narrow screens).
 */
export default function CoursePlayer({ course }: { course: Course }) {
  const lessons = useMemo(() => allLessons(course), [course]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  const lesson = lessons[index];
  const total = lesson.minutes * 60;
  const pct = Math.min(100, (elapsed / total) * 100);
  const progress = Math.round((done.size / lessons.length) * 100);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setElapsed((e) => Math.min(total, e + 1)), 1000);
    return () => clearInterval(t);
  }, [playing, total]);

  useEffect(() => {
    if (elapsed >= total && playing) {
      setPlaying(false);
      setDone((d) => new Set(d).add(lesson.id));
    }
  }, [elapsed, total, playing, lesson.id]);

  const select = (i: number) => {
    setIndex(i);
    setElapsed(0);
    setPlaying(false);
  };

  const toggleDone = () =>
    setDone((d) => {
      const n = new Set(d);
      if (n.has(lesson.id)) n.delete(lesson.id);
      else n.add(lesson.id);
      return n;
    });

  return (
    <div className="mx-auto max-w-[96rem] px-4 pt-24 pb-16 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
        <Link href="/courses/" className="hover:text-red-blood">courses</Link>
        <span aria-hidden>/</span>
        <Link href={`/courses/${course.slug}/`} className="hover:text-red-blood">{course.slug}</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-dim">learn</span>
        <span className="ml-auto border border-warn/40 px-2 py-0.5 text-[10px] tracking-[0.15em] text-warn">
          DESIGN PREVIEW · NO MEDIA
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
        {/* ---------- player column ---------- */}
        <div>
          <div className="panel relative aspect-video overflow-hidden">
            <div className="absolute inset-0"><CourseCover course={course} className="h-full !border-0" bare /></div>
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-void/40" />

            <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-red-blood/80">
                  {lesson.moduleTitle.toUpperCase()}
                </p>
                <p className="mt-1 font-mono text-sm text-ink sm:text-base">{lesson.title}</p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">{lesson.kind.toUpperCase()}</span>
            </div>

            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause' : 'Play'}
              className={`absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-blood/70 bg-void/60 text-red-blood backdrop-blur transition hover:bg-red-blood hover:text-void sm:h-20 sm:w-20 ${
                playing ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : 'animate-pulse-ring'
              }`}
            >
              {playing ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>

            {/* control bar */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8">
              <input
                type="range"
                min={0}
                max={total}
                value={elapsed}
                onChange={(e) => setElapsed(Number(e.target.value))}
                aria-label="Seek"
                className="h-1 w-full cursor-pointer accent-red-blood"
                style={{ background: `linear-gradient(to right, var(--color-red-blood) ${pct}%, rgba(255,255,255,0.15) ${pct}%)` }}
              />
              <div className="mt-2 flex items-center gap-4 font-mono text-xs text-ink-dim">
                <button type="button" onClick={() => select(index - 1)} disabled={index === 0} aria-label="Previous lesson" className="hover:text-red-blood disabled:opacity-30">⏮</button>
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'} className="hover:text-red-blood">{playing ? '⏸' : '▶'}</button>
                <button type="button" onClick={() => select(index + 1)} disabled={index === lessons.length - 1} aria-label="Next lesson" className="hover:text-red-blood disabled:opacity-30">⏭</button>
                <span>{fmt(elapsed)} / {fmt(total)}</span>
                <span className="ml-auto hidden gap-4 sm:flex" aria-hidden>
                  <span>1×</span><span>CC</span><span>⛶</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-mono text-xl font-bold text-ink sm:text-2xl">{lesson.title}</h1>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                Lesson {index + 1} of {lessons.length} · {formatDuration(lesson.minutes)}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleDone}
              aria-pressed={done.has(lesson.id)}
              className={`clip-tab border px-4 py-2 font-mono text-xs transition-colors ${
                done.has(lesson.id)
                  ? 'border-signal/60 bg-signal/10 text-signal'
                  : 'border-red-deep text-red-blood hover:bg-red-blood hover:text-void'
              }`}
            >
              {done.has(lesson.id) ? '✓ Completed' : 'Mark complete'}
            </button>
          </div>

          <div className="mt-6 border-b border-line" role="tablist" aria-label="Lesson details">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`-mb-px border-b-2 px-4 py-2.5 font-mono text-xs transition-colors ${
                  tab === t ? 'border-red-blood text-ink' : 'border-transparent text-ink-faint hover:text-ink-dim'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="panel mt-4 p-5 text-sm leading-relaxed text-ink-dim">
            {tab === 'Overview' && (
              <>
                <p>{lesson.summary}</p>
                <p className="mt-3 text-ink-faint">
                  Placeholder copy. The real lesson page carries the written walkthrough, the commands
                  (each with a copy control) and the log trail the technique leaves behind.
                </p>
              </>
            )}
            {tab === 'Notes' && (
              <p className="text-ink-faint">Your notes for this lesson will live here — saved in your browser, never uploaded.</p>
            )}
            {tab === 'Resources' && (
              <ul className="space-y-2 font-mono text-xs">
                <li className="flex items-center justify-between border border-line px-3 py-2"><span>lesson-{index + 1}-commands.txt</span><span className="text-ink-faint">sample</span></li>
                <li className="flex items-center justify-between border border-line px-3 py-2"><span>cheatsheet.pdf</span><span className="text-ink-faint">sample</span></li>
              </ul>
            )}
          </div>
        </div>

        {/* ---------- curriculum column ---------- */}
        <aside aria-label="Course content" className="lg:sticky lg:top-24 lg:self-start">
          <div className="panel flex flex-col lg:max-h-[calc(100vh-7rem)]">
            <div className="border-b border-line p-4">
              <Link href={`/courses/${course.slug}/`} className="font-mono text-sm font-semibold text-ink hover:text-red-blood">
                {course.title}
              </Link>
              <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-ink-faint">
                <div className="h-1 flex-1 bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
                  <div className="h-full bg-signal transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span>{done.size}/{lessons.length}</span>
              </div>
            </div>

            <div className="overflow-y-auto">
              {course.modules.map((m, mi) => (
                <section key={m.id}>
                  <h2 className="sticky top-0 border-b border-line bg-elevated px-4 py-2.5 font-mono text-[11px] tracking-wider text-ink-dim">
                    {String(mi + 1).padStart(2, '0')} · {m.title.toUpperCase()}
                  </h2>
                  <ul>
                    {m.lessons.map((ls) => {
                      const i = lessons.findIndex((x) => x.id === ls.id && x.moduleId === m.id);
                      const current = i === index;
                      const complete = done.has(ls.id);
                      return (
                        <li key={ls.id}>
                          <button
                            type="button"
                            onClick={() => select(i)}
                            aria-current={current ? 'true' : undefined}
                            className={`flex w-full items-start gap-3 border-b border-line/50 px-4 py-3 text-left transition-colors ${
                              current ? 'border-l-2 border-l-red-blood bg-red-ash/25' : 'hover:bg-elevated'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                                complete ? 'border-signal bg-signal/15 text-signal' : current ? 'border-red-blood text-red-blood' : 'border-ink-faint text-transparent'
                              }`}
                              aria-hidden
                            >
                              {complete ? '✓' : current ? '▶' : '·'}
                            </span>
                            <span className="flex-1">
                              <span className={`block text-[13px] leading-snug ${current ? 'text-ink' : 'text-ink-dim'}`}>{ls.title}</span>
                              <span className="mt-0.5 block font-mono text-[10px] text-ink-faint">
                                {ls.kind} · {formatDuration(ls.minutes)}
                              </span>
                            </span>
                            {complete ? <span className="sr-only">completed</span> : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
