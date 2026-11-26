/* The Product view: the whole portfolio as one page to scan. A portrait and
   a headline that changes with who is reading, the three case studies as
   large tiles, a wall of every screen from the other work, three working
   principles, and how to reach me. The cardholder is the other view, a
   switch away. Pure markup, like views.js: the build writes it into every
   page, so a reader or a crawler that never runs a script gets all of it.
   The motion lives in product-motion.js. */

import { icon } from './icons.js';
import { t } from './i18n.js';
import { email, linkedin, github } from './site.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pad = n => String(n).padStart(2, '0');
const thumb = src => /\.webp$/.test(src) ? src.replace('/assets/', '/assets/thumbs/') : src;
// Words in their own spans, so the headline can rise and the statement light up word by word.
const words = text => String(text).split(/\s+/).filter(Boolean).map(w => `<span class="pw-word"><span>${esc(w)}</span></span>`).join(' ');

export const AUDIENCES = ['anyone', 'recruiters', 'designers', 'engineers'];
const SECTIONS = ['intro', 'work', 'archive', 'principles', 'more', 'contact'];

// The switch between the two views. Two buttons rather than one toggle: the
// choice reads as words, and each is a plain target for a finger.
export function modeSwitch(className = '') {
  return `<div class="mode-switch ${className}" role="group" aria-label="${esc(t('mode.label'))}" data-i18n-attr="aria-label:mode.label"><span class="mode-thumb" aria-hidden="true"></span><button type="button" data-set-mode="product" aria-pressed="true" data-i18n="mode.product">${esc(t('mode.product'))}</button><button type="button" data-set-mode="creative" aria-pressed="false" data-i18n="mode.creative">${esc(t('mode.creative'))}</button></div>`;
}

const tags = p => String(p.role).split('·').map(s => s.trim()).filter(Boolean).map(s => `<span>${esc(s)}</span>`).join('');

/* `heading` is false on a page whose folio already carries the page's h1. */
export function productView(projects, { cv, heading = true }) {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const title = heading ? 'h1' : 'p';

  const cases = featured.map((p, i) => `<article class="pw-case${i === 0 ? ' is-wide' : ''}" style="--tint:${esc(p.color)}" data-rise>
      <a class="pw-case-link" href="/work/${esc(p.slug)}" data-cursor="${esc(t('pw.cursorCase'))}">
        <span class="pw-case-top"><span class="pw-case-name"><span class="pw-case-num">${pad(i + 1)}</span>${esc(p.name)}</span><span class="pw-tags">${tags(p)}</span></span>
        <span class="pw-case-media"><img src="${esc(p.images[0])}" alt="${esc(p.imageMeta?.[0]?.caption || p.name)}" loading="${i ? 'lazy' : 'eager'}" decoding="async" width="1600" height="1000" /></span>
      </a>
      <div class="pw-case-text"><p class="pw-case-tagline">${esc(p.tagline)}</p>
        <dl class="pw-case-facts"><div><dt>${t('glance.problem')}</dt><dd>${esc(p.card.problem)}</dd></div><div><dt>${t('glance.outcome')}</dt><dd>${esc(p.card.outcome)}</dd></div></dl></div>
    </article>`).join('');

  // Every screen of the other projects, dealt into five columns that drift at different speeds.
  // Every column is filled past the wall's height, so no column runs short while it drifts.
  const tiles = rest.flatMap(p => p.images.map((src, i) => ({ p, src, caption: p.imageMeta?.[i]?.caption || p.name })));
  const columns = Array.from({ length: 4 }, () => []);
  [...tiles, ...tiles].forEach((tile, i) => columns[i % 4].push(tile));
  const wall = columns.map((col, c) => `<div class="pw-wall-col" data-speed="${[0.1, -0.12, 0.16, -0.08][c]}">${col.map(({ p, src, caption }, i) =>
    `<a class="pw-tile" href="/work/${esc(p.slug)}" data-cursor="${esc(p.name)}" style="--tint:${esc(p.color)}"${i >= col.length / 2 ? ' aria-hidden="true" tabindex="-1"' : ''}><img src="${esc(thumb(src))}" alt="${esc(`${p.name}: ${caption}`)}" loading="lazy" decoding="async" /></a>`).join('')}</div>`).join('');

  const index = rest.map((p, i) => `<details class="pw-row" style="--tint:${esc(p.color)}">
      <summary><span class="pw-row-num">${pad(featured.length + i + 1)}</span><span class="pw-row-name">${esc(p.name)}</span><span class="pw-row-what">${esc(p.summary)}</span><span class="pw-row-tag">${esc(p.status)}</span><span class="pw-row-plus" aria-hidden="true"></span></summary>
      <div class="pw-row-body"><dl class="pw-answers">
        <div><dt>${t('glance.problem')}</dt><dd>${esc(p.card.problem)}</dd></div>
        <div><dt>${t('glance.role')}</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>${t('glance.decision')}</dt><dd>${esc(p.card.decision)}</dd></div>
        <div><dt>${t('glance.outcome')}</dt><dd>${esc(p.card.outcome)}</dd></div>
      </dl><a class="pw-link" href="/work/${esc(p.slug)}">${t('col.openProject')} ${icon('arrow-right')}</a></div>
    </details>`).join('');

  const principles = [1, 2, 3].map(n => `<li data-rise><span class="pw-principle-num">${pad(n)}</span><h3>${t(`pw.p${n}`)}</h3><p>${t(`pw.p${n}Text`)}</p></li>`).join('');
  const marquee = Array.from({ length: 4 }, () => `<span>${t('pm.contact')}</span><span aria-hidden="true" class="pw-dot">●</span><span>${esc(email)}</span><span aria-hidden="true" class="pw-dot">●</span>`).join('');

  return `<a class="pw-brand" href="/" aria-label="${esc(t('identity'))}"><span class="pw-mark" aria-hidden="true">xb<sup>®</sup></span><span class="pw-brand-text">XAVIER BOSCH<br />DESIGN + CODE</span></a>
    <nav class="pw-pill" aria-label="${esc(t('nav.main'))}">
      <a href="#pw-work">${t('pm.navWork')}</a><a href="#pw-more">${t('panel.navAbout')}</a><a href="#pw-contact">${t('panel.navContact')}</a>
      <span class="pw-pill-sep" aria-hidden="true"></span>
      <span class="lang-slot pw-lang" data-lang-slot="product"></span>
      <button class="theme-button pw-theme" type="button" data-theme-toggle aria-pressed="false" aria-label="${esc(t('theme.toDark'))}">${icon('theme')}</button>
      ${modeSwitch('pm-switch')}
    </nav>
    <nav class="pw-index" aria-label="${esc(t('pw.sections'))}"><ol>${SECTIONS.map((id, i) => `<li><a href="#pw-${id}" data-spy="pw-${id}"><span>${pad(i + 1)}</span>${t(`pw.s.${id}`)}</a></li>`).join('')}</ol></nav>

    <section class="pw-hero" id="pw-intro" aria-labelledby="pm-title">
      <div class="pw-hero-text">
        <div class="pw-audience" role="group" aria-label="${esc(t('pw.audienceLabel'))}">${AUDIENCES.map((a, i) => `<button type="button" data-audience="${a}" aria-pressed="${i === 0}">${t(`pw.a.${a}`)}</button>`).join('')}</div>
        <${title} class="pm-title pw-title" id="pm-title" aria-live="polite">${words(t('about.lede'))}</${title}>
        <p class="pw-available"><span class="pw-pulse" aria-hidden="true"></span><b>${t('home.available')}</b><span>${t('home.availableDetail')}</span></p>
        <div class="pw-quick"><a class="pw-button" href="${esc(cv)}" download>${t('links.cv')} ${icon('arrow-down')}</a><a class="pw-button is-quiet" href="mailto:${esc(email)}">${esc(email)} ${icon('arrow-up-right')}</a></div>
      </div>
      <figure class="pw-portrait"><img src="/assets/xavi-portrait.webp" alt="${esc(t('about.photo'))}" width="900" height="1310" decoding="async" fetchpriority="high" /><figcaption><span>Xavier Bosch</span><span>Barcelona · <span data-clock></span></span></figcaption></figure>
    </section>

    <section class="pw-statement" aria-label="${esc(t('pw.statementLabel'))}"><p class="pw-reveal">${words(t('about.p2'))}</p></section>

    <section class="pw-section" id="pw-work" aria-labelledby="pw-work-title">
      <header class="pw-head" data-rise><h2 id="pw-work-title">${t('pm.cases')}</h2><p>${t('pm.casesNote')}</p></header>
      <div class="pw-cases">${cases}</div>
    </section>

    <section class="pw-section pw-archive" id="pw-archive" aria-labelledby="pw-archive-title">
      <header class="pw-head" data-rise><h2 id="pw-archive-title">${t('pm.index', { n: rest.length })}</h2><p>${t('pm.indexNote')}</p></header>
      <div class="pw-wall" aria-hidden="false">${wall}</div>
      <div class="pw-index-list">${index}</div>
    </section>

    <section class="pw-section" id="pw-principles" aria-labelledby="pw-principles-title">
      <header class="pw-head" data-rise><h2 id="pw-principles-title">${t('pw.principles')}</h2><p>${t('pw.principlesNote')}</p></header>
      <ol class="pw-principles">${principles}</ol>
    </section>

    <section class="pw-section pw-about" id="pw-more" aria-labelledby="pw-more-title">
      <header class="pw-head" data-rise><h2 id="pw-more-title">${t('pm.about')}</h2></header>
      <div class="pw-about-body" data-rise><p class="pw-lede">${t('about.p1')}</p><div><p>${t('about.p3')}</p><p class="pw-bring"><b>${t('about.bringT')}</b> ${t('about.bring')}</p>
        <div class="pw-about-links"><a class="pw-link" href="/about">${t('pm.moreAbout')} ${icon('arrow-right')}</a><a class="pw-link" href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('arrow-up-right')}</a><a class="pw-link" href="${esc(github)}" target="_blank" rel="noopener noreferrer">GitHub ${icon('arrow-up-right')}</a></div></div></div>
    </section>

    <footer class="pw-contact" id="pw-contact" aria-labelledby="pw-contact-title">
      <h2 class="sr-only" id="pw-contact-title">${t('pm.contact')}</h2>
      <a class="pw-marquee" href="mailto:${esc(email)}" data-cursor="${esc(t('pw.cursorMail'))}"><span class="pw-marquee-track">${marquee}</span><span class="pw-marquee-track" aria-hidden="true">${marquee}</span></a>
      <div class="pw-contact-grid" data-rise>
        <dl class="pw-facts"><div><dt>${t('contact.basedT')}</dt><dd>${t('contact.based')}</dd></div><div><dt>${t('contact.availT')}</dt><dd>${t('contact.avail')}</dd></div><div><dt>${t('contact.lookingT')}</dt><dd>${t('contact.looking')}</dd></div></dl>
        <button class="pw-holder" type="button" data-set-mode="creative"><span class="pw-holder-chip" aria-hidden="true"></span><span><b>${t('pw.holderTitle')}</b><span>${t('pw.holderText')}</span></span>${icon('arrow-up-right')}</button>
      </div>
      <p class="pw-colophon"><span>© Xavier Bosch</span><span>${t('pw.colophon')}</span></p>
    </footer>
    <span class="pw-cursor" aria-hidden="true"><span></span></span>`;
}

// The headline for each reader, as words ready to rise.
export const audienceHeadline = audience => words(t(audience === 'anyone' ? 'about.lede' : `pw.h.${audience}`));
