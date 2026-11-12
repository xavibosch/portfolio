/* Addresses of the site. Every view has a real path, built as its own page,
   and the same paths drive the folio once the page is running:
     /               the cardholder
     /work           the collection
     /work/<slug>    a project
     /about, /contact
   The old hash addresses (#/work/betsy, #/index) still arrive from links
   shared before, so they are mapped onto these. */

export const SITE = 'https://boschwebs.website';
export const email = 'bosch.xavii@gmail.com';
export const linkedin = 'https://www.linkedin.com/in/xavier-bosch-galilea-9b3876410';
export const github = 'https://github.com/xavibosch';

// A view as main.js names it ('', 'index', 'about', 'contact', 'work/<slug>').
export function pathFor(view) {
  if (!view) return '/';
  if (view === 'index') return '/work';
  return `/${view}`;
}

export function viewFromPath(pathname) {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (!parts.length) return { view: '' };
  if (parts[0] === 'work') return parts.length === 1 ? { view: 'index' } : parts.length === 2 ? { view: 'work', slug: parts[1] } : { view: null };
  if (parts.length === 1 && (parts[0] === 'about' || parts[0] === 'contact')) return { view: parts[0] };
  return { view: null };
}

// '#/work/betsy' → '/work/betsy', '#/index' → '/work', '#/' → '/'. Anything else is not ours.
export function pathForHash(hash) {
  if (!/^#\/?/.test(hash) || !hash.startsWith('#/')) return null;
  const view = hash.slice(2).replace(/\/+$/, '');
  return pathFor(view);
}
