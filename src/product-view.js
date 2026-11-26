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

const SECTIONS = ['intro', 'work', 'archive', 'principles', 'more', 'contact'];

// The switch between the two views. Two buttons rather than one toggle: the
// choice reads as words, and each is a plain target for a finger.
export function modeSwitch(className = '') {
  return `<div class="mode-switch ${className}" role="group" aria-label="${esc(t('mode.label'))}" data-i18n-attr="aria-label:mode.label"><span class="mode-thumb" aria-hidden="true"></span><button type="button" data-set-mode="product" aria-pressed="true" data-i18n="mode.product">${esc(t('mode.product'))}</button><button type="button" data-set-mode="creative" aria-pressed="false" data-i18n="mode.creative">${esc(t('mode.creative'))}</button></div>`;
}

const BRANDS = {
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
};
const brand = name => `<svg class="pw-brandmark" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${BRANDS[name]}"/></svg>`;

/* How I think, shown through each case study in four general steps. Each
   step brings up one real image of the project (the concept images are
   labelled as such in their captions). */
const STEPS = 4;
const SHOTS = { 'jeffrey-desk': [4, 5, 2, 0], reps: [1, 0, 3, 4], betsy: [0, 6, 2, 3] };

const tags = p => String(p.role).split('·').map(s => s.trim()).filter(Boolean).map(s => `<span>${esc(s)}</span>`).join('');

/* `heading` is false on a page whose folio already carries the page's h1. */
export function productView(projects, { cv, heading = true }) {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const title = heading ? 'h1' : 'p';

  const cases = featured.map((p, i) => {
    const shots = (SHOTS[p.slug] || [0, 1, 2, 3]).map(n => ({ src: p.images[n] || p.images[0], caption: p.imageMeta?.[n]?.caption || p.name }));
    return `<article class="pw-story" id="story-${esc(p.slug)}" style="--tint:${esc(p.color)}">
      <header class="pw-story-head" data-rise>
        <p class="pw-story-num">${pad(i + 1)} <span>/ ${pad(featured.length)}</span></p>
        <h3><a href="/work/${esc(p.slug)}">${esc(p.name)}</a></h3>
        <p class="pw-story-tagline">${esc(p.tagline)}</p>
        <span class="pw-tags">${tags(p)}</span>
      </header>
      <div class="pw-story-body">
        <div class="pw-story-media">
          <a class="pw-story-frame" href="/work/${esc(p.slug)}" data-cursor="${esc(t('pw.cursorCase'))}" tabindex="-1" aria-hidden="true">${shots.map((shot, k) => `<img class="pw-shot${k ? '' : ' is-on'}" data-shot="${k}" src="${esc(shot.src)}" alt="" loading="lazy" decoding="async" />`).join('')}</a>
          <p class="pw-story-caption" aria-hidden="true">${shots.map((shot, k) => `<span data-caption="${k}"${k ? '' : ' class="is-on"'}>${esc(shot.caption)}</span>`).join('')}</p>
          <div class="pw-story-progress" aria-hidden="true">${shots.map((_, k) => `<span data-dot="${k}"${k ? '' : ' class="is-on"'}></span>`).join('')}</div>
        </div>
        <ol class="pw-steps">${Array.from({ length: STEPS }, (_, k) => `<li class="pw-step${k ? '' : ' is-on'}" data-step="${k}">
            <p class="pw-step-label"><span>${pad(k + 1)}</span>${t(`pt.s${k + 1}`)}</p>
            <h4>${t(`pt.q${k + 1}`)}</h4>
            <p class="pw-step-text">${t(`pt.${p.slug}.${k + 1}`)}</p>
          </li>`).join('')}</ol>
      </div>
      <footer class="pw-story-foot" data-rise><div><span class="pw-story-outcome">${t('glance.outcome')}</span><p>${esc(p.card.outcome)}</p></div><a class="pw-button" href="/work/${esc(p.slug)}">${t('pt.read')} ${icon('arrow-right')}</a></footer>
    </article>`;
  }).join('');

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
    <nav class="pw-index" aria-label="${esc(t('pw.sections'))}"><ol>${SECTIONS.map((id, i) => `<li><a href="#pw-${id}" data-spy="pw-${id}"><span>${pad(i + 1)}</span>${t(`pw.s.${id}`)}</a></li>`).join('')}</ol></nav>

    <section class="pw-hero" id="pw-intro" aria-labelledby="pm-title">
      <div class="pw-hero-text">
        <${title} class="pm-title pw-title" id="pm-title" aria-live="polite">${words(t('about.lede'))}</${title}>
        <p class="pw-available"><span class="pw-pulse" aria-hidden="true"></span><b>${t('home.available')}</b><span>${t('home.availableDetail')}</span></p>
        <div class="pw-quick"><a class="pw-button" href="${esc(cv)}" download>${t('links.cv')} ${icon('arrow-down')}</a><a class="pw-button is-quiet" href="mailto:${esc(email)}">${esc(email)} ${icon('arrow-up-right')}</a><a class="pw-circle" href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${brand('linkedin')}</a><a class="pw-circle" href="${esc(github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${brand('github')}</a></div>
      </div>
      <figure class="pw-portrait"><img src="/assets/xavi-portrait.webp" alt="${esc(t('about.photo'))}" width="900" height="1310" decoding="async" fetchpriority="high" /><figcaption><span>Xavier Bosch</span><span>Barcelona · <span data-clock></span></span></figcaption></figure>
    </section>

    <section class="pw-statement" aria-label="${esc(t('pw.statementLabel'))}"><p class="pw-reveal">${words(t('about.p2'))}</p></section>

    <section class="pw-section" id="pw-work" aria-labelledby="pw-work-title">
      <header class="pw-head" data-rise><h2 id="pw-work-title">${t('pt.title')}</h2><p>${t('pt.note')}</p></header>
      <div class="pw-stories">${cases}</div>
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
