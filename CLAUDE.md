# Working notes for this repo

Next.js 15 App Router, static export (`out/`) served by Cloudflare Workers.
Sibling of `zephryx.in` and deliberately a separate Worker — the two deploy
independently so a bad push here can't take the main site down.

**No waitlist, no paid tracks, no lead capture.** That was the earlier
posture; it was deliberately removed. This site is free offensive security and
pentesting education, full stop, for now. `/cheatsheets/` is the free
quick-reference PDF library (migrated over from `zephryx.in` so all study
material lives on this domain).

A course section is back as a **design preview**. An earlier catalog
(`/tracks/`, a `COURSES` array in `site.ts`) was removed because the courses
were mostly unwritten and a page that half-delivered on that promise did more
harm than none. The current one was added deliberately to design the catalog,
course page and player ahead of content, and it carries that honesty with it:

- `/courses/`, `/courses/[slug]/` and `/courses/[slug]/learn/` render entirely
  from `src/lib/courses.ts`. Every entry there is **sample data** (`sample:
  true`) and the UI says so ("design preview" banners, "SAMPLE" badges). Don't
  remove those labels from a course until its lessons actually exist.
- The player is a mock: no media, "play" only advances the scrubber, progress
  is in-memory. The CSP is `default-src 'self'`, so real video needs a
  deliberate `public/_headers` change. `/learn/` is `noindex`.
- "Enroll" just links to the player. There is no account, storage, form or
  endpoint, so the no-attack-surface posture below still holds.
- Statuses stay `'Writing now'` or `'Planned'`. Still no price, plan tier,
  enrolment count, or "open"/"closed" language, and still no waitlist or
  "coming soon, join to hear first" framing. Whether any of it is ever paid is
  a separate decision that hasn't been made; it'll be made explicitly, here.
- `/roadmap/` still points only at cheatsheets. Don't add a `courseId`/course
  link onto a `Stage` in `roadmap/page.tsx` until that course's content exists.
- `/tracks/` stays gone; courses live under `/courses/`.

There is currently **no attack surface**: the site accepts no input anywhere.
`worker/index.ts` does nothing but forward every request to the static
assets. If a form or endpoint gets added back, give it the same layered
treatment the old waitlist handler had (same-origin check, size caps, a
honeypot, DNS check on any email domain) — that discipline was correct, it's
just unused right now.

## Where things live

- `src/lib/site.ts` is the single source of truth for identity and nav.
  Nothing else should hardcode a link or an email address. The course list
  is deliberately not here; it lives in `src/lib/courses.ts` (see above).
- `src/lib/courses.ts` is the single source for courses: modules, lessons and
  the duration/count helpers. Adding a course is a one-place edit, and
  `generateStaticParams` on both course routes picks it up. Cover art is
  generated from each course's `hue`, so there are no image assets to add.
- `content/cheatsheets/` + `src/lib/cheatsheets.ts` are the cheatsheets
  pipeline, ported from `zephryx.in`'s: frontmatter-only `.md` files, each
  naming a PDF under `public/cheatsheets/`. The build throws if a cheatsheet's
  `file` field is malformed or the PDF is missing — the build is the
  validator, same rule as the sibling repo. `CheatsheetsIndex.tsx` is a
  standalone client filter (category + local text match); it does not pull in
  `zephryx.in`'s cross-content search machinery, because this site has no
  writeups or detections to cross-link against.
- `public/_headers` carries the CSP and the rest of the security headers,
  applied at the edge because a static export has no server to set them.

## Visual tone: premium, not a terminal emulator

The dark base + red accent + monospace kicker labels are the brand and stay.
What doesn't belong is anything that reads as a literal terminal widget —
fake shell prompts (`$ ./cmd`), traffic-light window chrome, blinking
cursors standing in for a console. The old waitlist form had exactly that
(a fake `zephryx@academy — ./enroll` title bar); it's gone with the form.
Keep the technical identity in typography and structure, not in cosplay.

## Other things worth knowing

- `npm run lint` is not usable — there's no ESLint config, so `next lint` drops
  into an interactive setup prompt. Use `npx tsc --noEmit` plus `npm run build`.
- The CSP is `default-src 'self'`. Any external script, font or analytics origin
  needs `public/_headers` widened first, and that should be a deliberate
  decision rather than a fix for a broken embed.
- When the paid course content arrives, follow the same shape the cheatsheets
  pipeline already established: Markdown under `content/`, rendered at build
  time, with the build acting as the validator. `zephryx.in`'s CLAUDE.md also
  carries a standing rule about copy controls on anything a reader might take
  (fenced code blocks, single values); it applies here the moment this site
  publishes commands or rules, not just PDFs.
