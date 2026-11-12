/* What goes inside the folio for each view, as markup. The same functions
   run at build time, to write each page's HTML, and in the browser, when the
   folio changes view, so the two can never drift apart. */

import { caseView, collectionView, aboutView, contactView } from './views.js';
import { fullCaseView, EDITING } from './case-view.js';
import { icon } from './icons.js';
import { t, getLang } from './i18n.js';
import { email, linkedin, github } from './site.js';

// The CV in the language the site is showing: /Xavi-Bosch-CV-EN.pdf, -ES, -CA.
// /Xavi-Bosch-CV.pdf keeps all three, for links shared before this existed.
export const cvFor = () => `/Xavi-Bosch-CV-${getLang().toUpperCase()}.pdf`;

export const featuredOf = projects => projects.filter(p => p.featured);

// A project's folio. `study` is its full case study, or undefined for the
// projects told as a story deck. Returns the zoomable images too.
export function caseMarkup(projects, index, study) {
  const project = projects[index], n = projects.length;
  let full = '', zoomable = [];
  if (study) {
    const next = projects.find(p => p.slug === study.next.slug);
    ({ html: full, zoomable } = fullCaseView(project, study, featuredOf(projects).indexOf(project), next));
  }
  return { html: caseView(project, index, n, [projects[(index - 1 + n) % n], projects[(index + 1) % n]], full), zoomable };
}

export function socialLinks() {
  return `<div class="about-links"><a class="cv-link" href="${cvFor()}" download>${t('links.cv')} <span aria-hidden="true">${icon('arrow-down')}</span></a><a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('arrow-up-right')}</a><a href="${github}" target="_blank" rel="noopener noreferrer">GitHub ${icon('arrow-up-right')}</a><a href="mailto:${email}">${t('links.email')} ${icon('arrow-up-right')}</a></div>`;
}
export const collectionMarkup = projects => collectionView(projects);
export const aboutMarkup = () => aboutView(socialLinks(), EDITING);
export const contactMarkup = () => contactView(email, socialLinks());

// The label in the folio's top bar and the document title for each view.
export const panelLabel = view => t(view === 'work' ? 'panel.work' : view === 'index' ? 'panel.index' : view === 'about' ? 'panel.about' : 'panel.contact');
export function titleFor(view, project) {
  if (!view) return t('title.home');
  if (view === 'work') return `${project.name} — Xavier Bosch`;
  return `${t(view === 'index' ? 'title.index' : view === 'about' ? 'title.about' : 'title.contact')} — Xavier Bosch`;
}
// The folio's heading, for screen readers and search engines: the page's h1.
export function headingFor(view, project) {
  if (view === 'work') return project.name;
  return t(view === 'index' ? 'panel.navCollection' : view === 'about' ? 'panel.navAbout' : 'panel.navContact');
}
