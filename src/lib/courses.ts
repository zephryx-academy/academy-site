/**
 * Course catalog — DESIGN PREVIEW DATA.
 *
 * Every course below is a sample used to design the catalog, detail and player
 * pages. None of the lessons exist yet. Each course carries `sample: true` and
 * the UI says so out loud; flip it per course only when the real content
 * ships. Deliberately no price, plan tier or enrolment-count field.
 */

export type LessonKind = 'video' | 'lab' | 'reading';

export type Lesson = {
  id: string;
  title: string;
  kind: LessonKind;
  /** minutes */
  minutes: number;
  summary: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: Level;
  /** Matches the roadmap stage numbering. */
  stage: string;
  topic: string;
  status: 'Writing now' | 'Planned';
  sample: true;
  /** Accent hue for the generated cover art (no image assets needed). */
  hue: number;
  outcomes: string[];
  prerequisites: string[];
  modules: Module[];
};

const l = (id: string, title: string, kind: LessonKind, minutes: number, summary: string): Lesson => ({
  id,
  title,
  kind,
  minutes,
  summary,
});

export const COURSES: Course[] = [
  {
    slug: 'active-directory-attack-paths',
    title: 'Active Directory Attack Paths',
    tagline: 'From a single low-priv foothold to Domain Admin — and the log trail every step leaves.',
    description:
      'The deepest stage of the roadmap, taught the slow way. You build a small domain, attack it by hand, then read the Windows event trail your own attack produced and write the rule that catches it.',
    level: 'Intermediate',
    stage: '03',
    topic: 'Active Directory',
    status: 'Writing now',
    sample: true,
    hue: 350,
    outcomes: [
      'Enumerate a domain with and without credentials',
      'Execute Kerberoasting and AS-REP roasting without a one-click tool',
      'Abuse ACLs and delegation to move laterally',
      'Name the event IDs each technique generates',
    ],
    prerequisites: ['Comfortable in a Linux shell', 'Basic Windows admin concepts', 'A machine that can run 3 VMs'],
    modules: [
      {
        id: 'm1',
        title: 'Build the lab',
        lessons: [
          l('l1', 'What we are attacking, and why', 'video', 8, 'The shape of a small enterprise domain and the trust boundaries inside it.'),
          l('l2', 'Stand up a DC and two workstations', 'lab', 35, 'A reproducible lab: one domain controller, two joined hosts, deliberate misconfigurations.'),
          l('l3', 'Snapshot discipline', 'reading', 6, 'How to break things repeatedly without rebuilding for an hour each time.'),
        ],
      },
      {
        id: 'm2',
        title: 'Enumeration',
        lessons: [
          l('l4', 'Unauthenticated enumeration', 'video', 14, 'What a domain gives away before you hold a single credential.'),
          l('l5', 'LDAP by hand', 'video', 18, 'Querying the directory directly so the tool output stops being magic.'),
          l('l6', 'Reading BloodHound without trusting it', 'video', 16, 'Graph paths versus paths that actually work.'),
          l('l7', 'Enumeration checkpoint', 'lab', 25, 'Map the lab domain and write down three candidate paths.'),
        ],
      },
      {
        id: 'm3',
        title: 'Kerberos abuse',
        lessons: [
          l('l8', 'Kerberos in 15 minutes', 'video', 15, 'TGT, TGS, and where the offline-crackable material comes from.'),
          l('l9', 'Kerberoasting', 'video', 19, 'Request, extract, crack — and why service account hygiene decides the outcome.'),
          l('l10', 'AS-REP roasting', 'video', 11, 'The pre-authentication flag nobody should have unset.'),
          l('l11', 'Detection: 4769 and 4768', 'video', 17, 'What the SOC sees, and the Sigma rule that fires on it.'),
        ],
      },
      {
        id: 'm4',
        title: 'ACLs, delegation and lateral movement',
        lessons: [
          l('l12', 'ACL abuse primer', 'video', 20, 'GenericAll, WriteDACL, and reading permissions as an attacker.'),
          l('l13', 'Delegation, all three kinds', 'video', 24, 'Unconstrained, constrained and resource-based.'),
          l('l14', 'Full chain lab', 'lab', 60, 'Foothold to Domain Admin, no tool you cannot explain.'),
        ],
      },
    ],
  },
  {
    slug: 'web-app-testing-by-hand',
    title: 'Web App Testing, By Hand',
    tagline: 'Methodology first. Burp finds what you already know to look for.',
    description:
      'Auth, access control and injection explored with a proxy and your own head — no scanner in the loop. Every bug class ends with the server-side log line it leaves behind.',
    level: 'Beginner',
    stage: '02',
    topic: 'Web',
    status: 'Writing now',
    sample: true,
    hue: 200,
    outcomes: [
      'Break authentication and session handling manually',
      'Find IDOR and broken access control by reasoning, not fuzzing',
      'Recognise injection classes from the response alone',
      'Write up a finding someone can reproduce',
    ],
    prerequisites: ['Basic HTTP knowledge', 'Burp Suite Community installed'],
    modules: [
      {
        id: 'm1',
        title: 'Reading the application',
        lessons: [
          l('l1', 'HTTP, but as an attacker', 'video', 12, 'Requests worth caring about and the headers that matter.'),
          l('l2', 'Mapping an app without crawling it', 'video', 15, 'Build the sitemap from behaviour, not from a spider.'),
        ],
      },
      {
        id: 'm2',
        title: 'Auth & access control',
        lessons: [
          l('l3', 'Session handling failures', 'video', 18, 'Tokens, cookies, and what "logged in" actually means to the server.'),
          l('l4', 'IDOR by reasoning', 'video', 14, 'Spotting object references before you touch a wordlist.'),
          l('l5', 'Access control lab', 'lab', 40, 'Three deliberately broken endpoints, find all three.'),
        ],
      },
      {
        id: 'm3',
        title: 'Injection',
        lessons: [
          l('l6', 'SQL injection from the response', 'video', 22, 'Error, boolean and time — telling them apart by hand.'),
          l('l7', 'Command injection', 'video', 13, 'Where input becomes a shell and how to confirm it safely.'),
          l('l8', 'Writing the finding up', 'reading', 9, 'Reproducible steps, impact, and a fix the developer will act on.'),
        ],
      },
    ],
  },
  {
    slug: 'detection-engineering-with-sigma',
    title: 'Detection Engineering with Sigma',
    tagline: 'For every attack, ask what it left behind — then write the rule.',
    description:
      'Take attacks you have already run and turn their telemetry into portable Sigma rules, mapped to ATT&CK and tuned against noise before you ever call them done.',
    level: 'Intermediate',
    stage: '04',
    topic: 'Detection',
    status: 'Planned',
    sample: true,
    hue: 155,
    outcomes: [
      'Pick the right log source for a technique',
      'Write, test and tune a Sigma rule',
      'Map rules to ATT&CK honestly, not decoratively',
      'Measure false-positive cost before shipping',
    ],
    prerequisites: ['Seen at least one attack run end to end', 'Basic SIEM query experience'],
    modules: [
      {
        id: 'm1',
        title: 'Telemetry foundations',
        lessons: [
          l('l1', 'Log sources worth having', 'video', 16, 'Sysmon, Windows Security, EDR — what each one can and cannot see.'),
          l('l2', 'Reading an event like an analyst', 'video', 13, 'Fields that matter, fields that lie.'),
        ],
      },
      {
        id: 'm2',
        title: 'Writing rules',
        lessons: [
          l('l3', 'Sigma anatomy', 'video', 14, 'logsource, detection, condition — and what the converter does with them.'),
          l('l4', 'Your first rule', 'lab', 30, 'Take a captured attack and write the rule from the log alone.'),
          l('l5', 'Tuning and false positives', 'video', 19, 'Why a rule that fires on everything is a rule nobody reads.'),
        ],
      },
    ],
  },
  {
    slug: 'recon-and-enumeration',
    title: 'Recon & Enumeration',
    tagline: 'What is running, on what port, with what version — and where that points next.',
    description:
      'Host discovery, port and service scanning, and the part most people skip: reading the output properly before deciding what to touch.',
    level: 'Beginner',
    stage: '01',
    topic: 'Recon',
    status: 'Planned',
    sample: true,
    hue: 38,
    outcomes: [
      'Run discovery that matches the engagement rules',
      'Fingerprint services and versions accurately',
      'Turn raw scan output into a prioritised target list',
    ],
    prerequisites: ['Linux terminal basics', 'IP, DNS and ports at a conceptual level'],
    modules: [
      {
        id: 'm1',
        title: 'Finding hosts',
        lessons: [
          l('l1', 'Scope before scanning', 'reading', 7, 'Why the rules of engagement come before the first packet.'),
          l('l2', 'Host discovery', 'video', 14, 'ARP, ICMP, TCP — what each tells you and what each costs in noise.'),
        ],
      },
      {
        id: 'm2',
        title: 'Services',
        lessons: [
          l('l3', 'Port scanning without the cargo cult', 'video', 17, 'Scan types and the trade-offs behind the flags.'),
          l('l4', 'Version fingerprinting', 'video', 12, 'Banners lie. Corroborate.'),
          l('l5', 'Reading output, not running it', 'lab', 25, 'Given raw results, produce the target list.'),
        ],
      },
    ],
  },
];

export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function allLessons(course: Course): (Lesson & { moduleId: string; moduleTitle: string })[] {
  return course.modules.flatMap((m) =>
    m.lessons.map((ls) => ({ ...ls, moduleId: m.id, moduleTitle: m.title })),
  );
}

export function totalMinutes(course: Course): number {
  return allLessons(course).reduce((n, ls) => n + ls.minutes, 0);
}

export function lessonCount(course: Course): number {
  return allLessons(course).length;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
