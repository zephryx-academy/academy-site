/**
 * Single source of truth for identity, links and metadata.
 * Nothing else in the app should hardcode a link or an email address.
 */

export const SITE = {
  name: 'Zephryx Academy',
  short: 'Academy',
  parentName: 'Zephryx',
  parentUrl: 'https://zephryx.in',
  domain: 'academy.zephryx.in',
  url: 'https://academy.zephryx.in',
  tagline: 'Free, hands-on offensive security education, from the person who breaks in for a living.',
  description:
    'Zephryx Academy is free offensive security and pentesting education — Active Directory attack paths, adversary emulation and detection engineering, taught by a working penetration tester. Cheatsheets, guides and labs, no paywall.',
  locale: 'en_IN',
} as const;

export const MAILBOX = {
  address: 'academy@zephryx.in',
} as const;

/**
 * The rest of the network.
 *
 * Hostnames belong here rather than inline in a page, same rule as everything
 * else in this file. The research corpus moved to its own domain, which is the
 * sort of change that quietly falsifies any hostname written out by hand
 * somewhere else in the tree.
 */
export const NETWORK = [
  {
    href: 'https://zephryx.in/',
    host: 'zephryx.in',
    blurb: 'portfolio & tooling',
  },
  {
    href: 'https://writeups.zephryx.in/',
    host: 'writeups.zephryx.in',
    blurb: 'research & writeups',
  },
  {
    href: 'https://security.zephryx.in/',
    host: 'security.zephryx.in',
    blurb: 'pentest services',
  },
] as const;

export const NAV = [
  { href: '/', label: 'Home', cmd: '~' },
  { href: '/roadmap/', label: 'Roadmap', cmd: 'map' },
  { href: '/courses/', label: 'Courses', cmd: 'run' },
  { href: '/cheatsheets/', label: 'Cheatsheets', cmd: 'find' },
  { href: '/glossary/', label: 'Glossary', cmd: 'grep' },
  { href: '/about/', label: 'About', cmd: 'whoami' },
] as const;
