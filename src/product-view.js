/* The Product view: the whole portfolio as one page to scan. Who I am and
   whether I am available, the three case studies with their four answers,
   every other project in an index that opens in place, and how to reach me.
   It is the default view. The cardholder is the other one, a switch away.
   Pure markup, like views.js: the build writes it into every page, so a
   reader or a crawler that never runs a script gets all of it. */

import { icon } from './icons.js';
import { t } from './i18n.js';
import { email, linkedin, github } from './site.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pad = n => String(n).padStart(2, '0');

// The switch between the two views. Two buttons rather than one toggle: the
// choice reads as words, and each is a plain target for a finger.
export function modeSwitch(className = '') {
  return `<div class="mode-switch ${className}" role="group" aria-label="${esc(t('mode.label'))}" data-i18n-attr="aria-label:mode.label"><span class="mode-thumb" aria-hidden="true"></span><button type="button" data-set-mode="product" aria-pressed="true" data-i18n="mode.product">${esc(t('mode.product'))}</button><button type="button" data-set-mode="creative" aria-pressed="false" data-i18n="mode.creative">${esc(t('mode.creative'))}</button></div>`;
}

const answers = (p, role = p.role) => `<dl class="pm-answers">
      <div><dt>${t('glance.problem')}</dt><dd>${esc(p.card.problem)}</dd></div>
      <div><dt>${t('glance.role')}</dt><dd>${esc(role)}</dd></div>
      <div><dt>${t('glance.decision')}</dt><dd>${esc(p.card.decision)}</dd></div>
      <div><dt>${t('glance.outcome')}</dt><dd>${esc(p.card.outcome)}</dd></div>
    </dl>`;

/* `heading` is false on a page whose folio already carries the page's h1. */
export function productView(projects, { cv, heading = true }) {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const title = heading ? 'h1' : 'p';
  const cases = featured.map((p, i) => `<article class="pm-case" style="--tint:${esc(p.color)}">
      <a class="pm-case-media" href="/work/${esc(p.slug)}" tabindex="-1" aria-hidden="true"><img src="${esc(p.images[0])}" alt="" loading="${i ? 'lazy' : 'eager'}" decoding="async" width="1600" height="1000" /></a>
      <div class="pm-case-body">
        <p class="pm-meta"><span>${pad(i + 1)}</span>${esc(p.category || p.context)}</p>
        <h3><a href="/work/${esc(p.slug)}">${esc(p.name)}</a></h3>
        <p class="pm-tagline">${esc(p.tagline)}</p>
        ${answers(p)}
        <a class="pm-link" href="/work/${esc(p.slug)}">${t('col.readCase')} ${icon('arrow-right')}</a>
      </div>
    </article>`).join('');
  const index = rest.map((p, i) => `<details class="pm-row" style="--tint:${esc(p.color)}">
      <summary><span class="pm-row-num">${pad(featured.length + i + 1)}</span><span class="pm-row-name">${esc(p.name)}</span><span class="pm-row-what">${esc(p.summary)}</span><span class="pm-row-tag">${esc(p.status)}</span><span class="pm-row-chevron" aria-hidden="true">${icon('arrow-down')}</span></summary>
      <div class="pm-row-body">${answers(p)}<a class="pm-link" href="/work/${esc(p.slug)}">${t('col.openProject')} ${icon('arrow-right')}</a></div>
    </details>`).join('');
  return `<header class="pm-header">
      <a class="pm-id" href="/" aria-label="${esc(t('identity'))}"><span class="pm-mark" aria-hidden="true">xb<sup>®</sup></span><span class="pm-id-text">XAVIER BOSCH<br />DESIGN + CODE</span></a>
      <nav class="pm-nav" aria-label="${esc(t('nav.main'))}"><a href="#pm-work">${t('pm.navWork')}</a><a href="/about">${t('panel.navAbout')}</a><a href="/contact">${t('panel.navContact')}</a></nav>
      <div class="pm-tools"><span class="lang-slot pm-lang" data-lang-slot="product"></span><button class="theme-button pm-theme" type="button" data-theme-toggle aria-pressed="false" aria-label="${esc(t('theme.toDark'))}">${icon('theme')}</button>${modeSwitch('pm-switch')}</div>
    </header>
    <section class="pm-hero" aria-labelledby="pm-title">
      <p class="pm-eyebrow">${t('home.eyebrow')}</p>
      <${title} class="pm-title" id="pm-title">${t('home.positioning')}</${title}>
      <p class="pm-available"><b>${t('home.available')}</b><span>${t('home.availableDetail')}</span></p>
      <div class="pm-quick"><a class="pm-button" href="${esc(cv)}" download>${t('links.cv')} ${icon('arrow-down')}</a><a class="pm-button is-quiet" href="mailto:${esc(email)}">${esc(email)} ${icon('arrow-up-right')}</a><a href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('arrow-up-right')}</a><a href="${esc(github)}" target="_blank" rel="noopener noreferrer">GitHub ${icon('arrow-up-right')}</a></div>
    </section>
    <section class="pm-section" id="pm-work" aria-labelledby="pm-cases-title">
      <header class="pm-section-head"><h2 id="pm-cases-title">${t('pm.cases')}</h2><p>${t('pm.casesNote')}</p></header>
      <div class="pm-cases">${cases}</div>
    </section>
    <section class="pm-section" aria-labelledby="pm-index-title">
      <header class="pm-section-head"><h2 id="pm-index-title">${t('pm.index', { n: rest.length })}</h2><p>${t('pm.indexNote')}</p></header>
      <div class="pm-index">${index}</div>
    </section>
    <section class="pm-section pm-about" aria-labelledby="pm-about-title">
      <header class="pm-section-head"><h2 id="pm-about-title">${t('pm.about')}</h2></header>
      <div class="pm-about-body"><p class="pm-lede">${t('about.p1')}</p><p>${t('about.p2')}</p>
        <dl class="pm-facts"><div><dt>${t('about.howT')}</dt><dd>${t('about.how')}</dd></div><div><dt>${t('about.bringT')}</dt><dd>${t('about.bring')}</dd></div></dl>
        <a class="pm-link" href="/about">${t('pm.moreAbout')} ${icon('arrow-right')}</a></div>
    </section>
    <footer class="pm-footer" aria-labelledby="pm-contact-title">
      <h2 id="pm-contact-title">${t('pm.contact')}</h2>
      <a class="pm-email" href="mailto:${esc(email)}">${esc(email)} ${icon('arrow-up-right')}</a>
      <dl class="pm-facts"><div><dt>${t('contact.basedT')}</dt><dd>${t('contact.based')}</dd></div><div><dt>${t('contact.availT')}</dt><dd>${t('contact.avail')}</dd></div><div><dt>${t('contact.lookingT')}</dt><dd>${t('contact.looking')}</dd></div></dl>
      <button class="pm-holder" type="button" data-set-mode="creative"><span>${t('pm.holder')}</span>${icon('arrow-up-right')}</button>
    </footer>`;
}
