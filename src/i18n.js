import ui from './i18n/ui.js';
import projectsEs from './i18n/projects.es.js';
import projectsCa from './i18n/projects.ca.js';

/* One language for the whole site. English is the source; Spanish and
   Catalan are overlays on top of it, so anything not translated yet falls
   back to English instead of disappearing.

   - Interface text: src/i18n/ui.js, used with t('key').
   - Static markup in index.html: data-i18n="key" (text), data-i18n-html
     (markup), data-i18n-attr="aria-label:key; title:key".
   - Projects: src/i18n/projects.<lang>.js, by slug, same fields as
     projects.json.
   - Case studies: src/case-studies.<lang>.js, same shape as the English one. */

export const LANGS = { en: 'EN', es: 'ES', ca: 'CA' };
const OVERLAYS = { es: projectsEs, ca: projectsCa };

function initial() {
  try { const saved = localStorage.getItem('lang'); if (LANGS[saved]) return saved; } catch {}
  const browser = (globalThis.navigator?.language || 'en').slice(0, 2);
  return LANGS[browser] ? browser : 'en';
}
// The knowledge build (Node) imports the case studies, which import this
// file, so nothing here may assume a browser.
const inBrowser = typeof document !== 'undefined';
let lang = initial();
if (inBrowser) document.documentElement.lang = lang;

export const getLang = () => lang;

export function setLang(next) {
  if (!LANGS[next] || next === lang) return;
  lang = next;
  try { localStorage.setItem('lang', next); } catch {}
  document.documentElement.lang = next;
  dispatchEvent(new CustomEvent('langchange', { detail: next }));
}

export function t(key, vars) {
  let text = ui[lang]?.[key] ?? ui.en[key];
  if (text === undefined) { if (import.meta.env.DEV) console.warn(`i18n: missing "${key}"`); return key; }
  if (vars) text = text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
  return text;
}

/* Projects are translated in place, so every part of the site that holds a
   project object sees the new language without being rebuilt. */
const originals = new WeakMap();
export function localizeProjects(projects) {
  for (const project of projects) {
    if (!originals.has(project)) originals.set(project, structuredClone(project));
    const base = structuredClone(originals.get(project));
    const overlay = OVERLAYS[lang]?.[project.slug] || {};
    const { captions, ...fields } = overlay;
    Object.assign(project, base, fields);
    if (fields.card) project.card = { ...base.card, ...fields.card };
    if (captions) project.imageMeta = base.imageMeta.map((meta, i) => ({ ...meta, caption: captions[i] ?? meta.caption }));
  }
}

export function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-attr]').forEach(el => {
    for (const pair of el.dataset.i18nAttr.split(';')) {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    }
  });
}

/* The switch itself: three words with the site's underline. Several copies
   can exist (header, folio rim, phone); they all stay in sync. */
export function langSwitch(className = '') {
  return `<div class="lang-switch ${className}" role="group" aria-label="${t('lang.label')}">${Object.entries(LANGS).map(([code, label]) =>
    `<button data-set-lang="${code}" lang="${code}" aria-pressed="${code === lang}" aria-label="${t(`lang.${code}`)}">${label}</button>`).join('')}</div>`;
}
export function syncSwitches() {
  document.querySelectorAll('.lang-switch').forEach(group => {
    group.setAttribute('aria-label', t('lang.label'));
    group.querySelectorAll('[data-set-lang]').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
      b.setAttribute('aria-label', t(`lang.${b.dataset.setLang}`));
    });
  });
}
if (inBrowser) addEventListener('click', e => {
  const button = e.target.closest?.('[data-set-lang]');
  if (button) setLang(button.dataset.setLang);
});
