import { icon } from './icons';
import { t } from './i18n.js';

const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
// Small copies in /assets/thumbs for the places that show an image small.
export const thumb = src => /\.webp$/.test(src) ? src.replace('/assets/', '/assets/thumbs/') : src;
const number = value => String(value + 1).padStart(2, '0');

/* Notes to myself such as [Cal afegir: ...] live in projects.json so the gaps
   stay visible while editing. They are never shown to a visitor. */
const publicText = value => String(value || '').replace(/\[Cal [^\]]*\]/g, '').replace(/SENSE PROVA VISUAL REAL\.?/g, '').trim();


export function caseView(project, index, total, neighbours, fullCase = '') {
  const team = publicText(project.team);
  const real = project.imageMeta.filter(m => m.type === 'screenshot' || m.type === 'photo').length;
  const pending = publicText(project.pending);
  const links = [project.live && `<a href="${esc(project.live)}" target="_blank" rel="noopener noreferrer">${t('card.visit')} ${icon('arrow-up-right')}</a>`,
    project.repo && `<a href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">${t('card.source')} ${icon('arrow-up-right')}</a>`].filter(Boolean).join('');
  const story = [
    [t('story.who'), [project.builtFor, project.problem]],
    [t('story.what'), [project.description]],
    [t('story.decision'), [project.changed]],
    ...(project.research ? [[t('story.research'), [project.research]]] : []),
    [t('story.learned'), [project.learning]],
  ];
  const chapters = [
    ...story.map(([title, texts]) => [title, texts.map(x => `<p>${esc(x)}</p>`).join('')]),
    [t('story.stands'), `<dl><div><dt>${t('story.status')}</dt><dd>${esc(project.status)}</dd></div><div><dt>${t('story.role')}</dt><dd>${esc(project.role)}</dd></div>${team ? `<div><dt>${t('story.built')}</dt><dd>${esc(team)}</dd></div>` : ''}</dl>
          <p>${real ? t('story.real', { real, total: project.imageMeta.length }) : t('story.noReal')}</p>
          ${pending ? `<p><strong>${t('story.open')}</strong> ${esc(pending)}</p>` : ''}
          ${links ? `<div class="story-links">${links}</div>` : ''}`],
  ];
  const crumbs = `<nav class="pcase-crumbs" aria-label="${t('crumbs.label')}"><button data-action="collection">${t('crumbs.collection')}</button><span aria-hidden="true">/</span><span>${project.featured ? t('crumbs.featured') : esc(project.category)}</span><span aria-hidden="true">/</span><span aria-current="page">${esc(project.name)}</span></nav>`;
  return `<article class="pcase${fullCase ? ' is-featured' : ''}" style="--tint:${esc(project.color)}">
    <div class="pcase-stage">
      ${crumbs}
      <div class="pcard-area"><div class="pcard-size"><div class="pcard-hover"><div class="pcard" data-side="front">
        <section class="pcard-face pcard-front" aria-label="${esc(t('card.label', { name: project.name }))}">
          <span class="pcard-sheen" aria-hidden="true"></span>
          <header class="pcard-top">
            <span class="pcard-serial">${number(index)}<small>/ ${total}</small></span>
            <span class="pcard-kicker">${esc(project.context)}<span>${esc(project.role)}</span></span>
            <span class="pcard-stamp"><i aria-hidden="true"></i>${esc(project.status)}</span>
          </header>
          <span class="pcard-chip" aria-hidden="true"></span>
          <div class="pcard-title"><h2>${esc(project.name)}</h2><p>${esc(project.tagline)}</p></div>
          <dl class="pcard-story">
            <div><dt>${t('card.problem')}</dt><dd>${esc(project.card.problem)}</dd></div>
            <div><dt>${t('card.decision')}</dt><dd>${esc(project.card.decision)}</dd></div>
            <div><dt>${t('card.learned')}</dt><dd>${esc(project.card.learned)}</dd></div>
          </dl>
          <footer class="pcard-foot">
            <span class="pcard-hood">${t('card.hood')}</span>
            <ul class="pcard-tech" aria-label="${t('card.hood')}">${project.tech.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            ${team ? `<span class="pcard-team">${esc(team)}</span>` : ''}
            ${links ? `<span class="pcard-links">${links}</span>` : ''}
            <button class="pcard-turn" data-action="turn" aria-label="${t('card.turnLabel', { n: project.images.length })}"><span>${t('card.see')}</span><span class="pcard-count">${project.images.length}</span>${icon('turn')}</button>
          </footer>
        </section>
        <section class="pcard-face pcard-back" aria-label="${esc(t('card.images', { name: project.name }))}" hidden>
          <header class="pcard-back-top">
            <p class="pcard-caption" id="gallery-caption" aria-live="polite"></p>
            <span class="pcard-counter" id="image-counter"></span>
            <button class="pcard-tool" data-action="expand" aria-label="${t('card.expand')}">${icon('expand')}</button>
            <button class="pcard-tool pcard-back-turn" data-action="turn" aria-label="${t('card.turnBackLabel')}">${icon('turn')}<span>${t('card.turnBack')}</span></button>
          </header>
          <div class="pcard-track" tabindex="0" aria-label="${t('card.track')}">${project.images.map((src, i) => `<figure class="pcard-slide" data-slide="${i}"><img src="${esc(src)}" alt="${esc(project.imageMeta[i]?.caption || `${project.name} ${t('lightbox.image', { n: i + 1 })}`)}" decoding="async" draggable="false" /></figure>`).join('')}</div>
          <footer class="pcard-back-foot">
            <button class="pcard-tool" data-gallery="-1" aria-label="${t('card.prevImage')}">${icon('arrow-left')}</button>
            <div class="pcard-dots">${project.images.map((_, i) => `<button data-image="${i}" aria-label="${t('card.imageN', { n: i + 1 })}" aria-pressed="${i === 0}"></button>`).join('')}</div>
            <button class="pcard-tool" data-gallery="1" aria-label="${t('card.nextImage')}">${icon('arrow-right')}</button>
          </footer>
        </section>
      </div></div></div></div>
      <nav class="pcase-nav" aria-label="${t('case.more')}">
        <button data-action="prev-case">${icon('arrow-left')}<span><small>${t('case.previous')}</small>${esc(neighbours[0].name)}</span></button>
        ${fullCase ? `<button class="pcase-more" data-action="case">${t('case.readCase')} ${icon('arrow-down')}</button>` : `<button class="pcase-more" data-action="story">${t('case.readStory')} ${icon('arrow-down')}</button>`}
        <button data-action="next-case"><span><small>${t('case.next')}</small>${esc(neighbours[1].name)}</span>${icon('arrow-right')}</button>
      </nav>
    </div>
    ${fullCase || `    <section class="pcase-story" id="full-story" aria-labelledby="story-title">
      <header class="story-head">
        <div><span class="eyebrow">${t('story.eyebrow', { n: number(chapters.length - 1) })}</span><h3 id="story-title">${esc(t('story.title', { name: project.name }))}</h3></div>
        <div class="deck-controls"><button class="pcard-tool" data-deck="-1" aria-label="${t('story.prevCard')}">${icon('arrow-left')}</button><span class="deck-count" id="deck-count" aria-live="polite">01 / ${number(chapters.length - 1)}</span><button class="pcard-tool" data-deck="1" aria-label="${t('story.nextCard')}">${icon('arrow-right')}</button></div>
      </header>
      <div class="story-layout">
        <div class="deck-index" role="tablist" aria-label="${t('story.chapters')}" aria-orientation="vertical"><span class="deck-marker" aria-hidden="true"></span>${chapters.map(([title], i) => `<button role="tab" id="deck-tab-${i}" data-deck-to="${i}" aria-selected="${i === 0}" aria-controls="deck-card-${i}" tabindex="${i ? -1 : 0}"><span>${number(i)}</span>${title}</button>`).join('')}</div>
        <div class="deck" aria-label="${t('story.deck')}">
          ${chapters.map(([title, body], i) => `<article class="deck-card" id="deck-card-${i}" data-deck-card="${i}" role="tabpanel" aria-labelledby="deck-tab-${i}"${i ? ' hidden' : ''}><span class="deck-card-no">${number(i)} / ${number(chapters.length - 1)}</span><h4>${title}</h4>${body}<footer class="deck-card-foot"><span>XB—${number(index)} / ${esc(project.name.toUpperCase())}</span><span class="deck-hint">${t('story.drag')} ${icon('arrow-left')}</span></footer></article>`).join('')}
        </div>
      </div>
      <p class="story-tags">${project.tech.map(x => `<span>${esc(x)}</span>`).join('')}</p>
    </section>
`}
  </article>`;
}

const IMAGE_TYPES = ['screenshot', 'photo', 'concept', 'diagram', 'mockup'];
export const imageLabel = type => t(`img.${IMAGE_TYPES.includes(type) ? type : 'unknown'}`);

// Titles and notes live in src/i18n/ui.js as group.<id> and group.<id>.note.
export const GROUPS = ['case-study', 'small', 'prototype', 'experiment', 'university', 'wip'];

export function collectionView(projects) {
  const card = (p, i) => `<a class="col-card${p.featured ? ' is-featured' : ''}" href="#/work/${esc(p.slug)}" data-project="${i}" style="--tint:${esc(p.color)}">
      <span class="col-card-media"><img src="${esc(thumb(p.images[0]))}" alt="" loading="lazy" decoding="async" />${['mockup', 'concept'].includes(p.imageMeta[0]?.type) ? `<span class="col-media-tag">${t(p.imageMeta[0].type === 'mockup' ? 'col.mockup' : 'col.concept')}</span>` : ''}</span>
      <span class="col-card-body">
        <span class="col-card-top"><span class="col-num">${number(i)}</span><span class="col-status"><i aria-hidden="true"></i>${esc(p.status)}</span></span>
        <span class="col-name">${esc(p.name)}</span>
        <span class="col-what">${esc(p.summary)}</span>
        <span class="col-facts">
          <span><b>${t('col.why')}</b>${esc(p.card.problem)}</span>
          <span><b>${t('col.did')}</b>${esc(p.role)}</span>
          <span><b>${t('col.shows')}</b>${esc(p.capability)}</span>
        </span>
        <span class="col-tags">${p.tags.map(tag => `<span>${esc(t(`tag.${tag}`))}</span>`).join('')}</span>
        <span class="col-open">${t(p.featured ? 'col.readCase' : 'col.openProject')} ${icon('arrow-up-right')}</span>
      </span>
    </a>`;
  const groups = GROUPS.map(id => [id, t(`group.${id}`), t(`group.${id}.note`), projects.map((p, i) => [p, i]).filter(([p]) => p.group === id)]).filter(g => g[3].length);
  return `<section class="collection">
    <header class="col-head"><div><span class="eyebrow">${t('col.eyebrow', { n: projects.length })}</span><h2>${t('col.title')}</h2></div>
      <p>${t('col.intro')}</p></header>
    <nav class="col-jump" aria-label="${t('col.groups')}"><button data-group="all" aria-pressed="true">${t('col.all')}<sup>${projects.length}</sup></button>${groups.map(([id, title, , items]) => `<button data-group="${id}" aria-pressed="false">${title}<sup>${items.length}</sup></button>`).join('')}</nav>
    ${groups.map(([id, title, note, items]) => `<section class="col-group" id="group-${id}" aria-labelledby="group-${id}-title">
      <header><h3 id="group-${id}-title">${title} <sup>${items.length}</sup></h3><p>${note}</p></header>
      <div class="col-grid${id === 'case-study' ? ' is-featured' : ''}">${items.map(([p, i]) => card(p, i)).join('')}</div>
    </section>`).join('')}
  </section>`;
}

/* More photos can go on the About card later: working, building hardware,
   presenting. Add them here; empty entries show as placeholders only while
   editing. */
export const aboutPhotos = [
  { src: '', alt: '', need: 'Photograph working at the desk, ideally with Jeffrey Desk on screen.' },
  { src: '', alt: '', need: 'Photograph building hardware, for example the Wake Station or the robot car.' },
  { src: '', alt: '', need: 'Photograph presenting a project at La Salle.' },
];

export function aboutView(links, editing) {
  const extra = aboutPhotos.filter(p => p.src || editing).map(p => p.src
    ? `<figure class="about-photo"><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy" /></figure>`
    : `<figure class="about-photo is-placeholder"><span>${t('about.photoNeeded')}</span><p>${esc(p.need)}</p></figure>`).join('');
  return `<section class="human">
    <div class="personal-display"><span class="eyebrow personal-edition">${t('about.edition')}</span>
      <div class="card-stage"><div class="personal-underlay underlay-one" aria-hidden="true"></div><div class="personal-underlay underlay-two" aria-hidden="true"></div><div class="card-tilt">
        <div class="id-card" role="button" tabindex="0" aria-pressed="false" aria-label="${t('about.flip')}"><span class="card-inner">
          <span class="card-face card-front"><span class="card-sheen" aria-hidden="true"></span><span class="card-top"><span class="card-mark">xb.</span><span class="card-label">${t('about.pass')}</span><span class="card-chip" aria-hidden="true"></span></span><span class="card-name">Xavi Bosch.</span><span class="card-role">${t('about.role')}</span><span class="card-foot"><span>${t('about.year')}</span><span class="card-bars" aria-hidden="true"></span><span>XB—001</span></span></span>
          <span class="card-face card-back"><img src="/assets/xavi-portrait.webp" alt="${t('about.photo')}" decoding="async" /></span>
        </span></div>
      </div><p class="card-hint"><span class="hint-hover">${t('about.hintHover')}</span><span class="hint-touch">${t('about.hintTouch')}</span><span aria-hidden="true">${icon('turn')}</span></p></div>
      ${extra ? `<div class="about-photos">${extra}</div>` : ''}
    </div>
    <div class="human-copy"><span class="eyebrow">${t('about.eyebrow')}</span><h2>${t('about.hi')}</h2>
      <p class="human-lede">${t('about.lede')}</p>
      <p>${t('about.p1')}</p>
      <p>${t('about.p2')}</p>
      <p>${t('about.p3')}</p>
      <dl class="human-facts">
        <div><dt>${t('about.howT')}</dt><dd>${t('about.how')}</dd></div>
        <div><dt>${t('about.bringT')}</dt><dd>${t('about.bring')}</dd></div>
        ${editing ? `<div><dt>${t('about.learningT')}</dt><dd><aside class="edit-note"><strong>[CONTENT NEEDED]</strong> What you are learning at the moment, in one line.</aside></dd></div>` : ''}
      </dl>
      <div class="availability-inlay"><div><strong>${t('about.available')}</strong><p>${t('about.availableDetail')}</p></div></div>${links}
    </div>
  </section>`;
}

export function contactView(email, links) {
  return `<section class="contact">
    <div class="contact-intro"><span class="eyebrow">${t('contact.eyebrow')}</span><p>${t('contact.intro')}</p></div>
    <div class="contact-card-wrap"><div class="contact-card-shadow" aria-hidden="true"></div><article class="contact-card metal-surface" data-reflect><div class="contact-card-top"><span>${t('contact.top')}</span><span class="contact-waves" aria-hidden="true">)))</span><span class="contact-serial">${t('contact.serial')}</span></div><div class="contact-card-title"><h2>${t('contact.title')}</h2><span class="contact-engraved-arrow" aria-hidden="true">${icon('arrow-up-right')}</span></div><div class="contact-mail"><a href="mailto:${esc(email)}">${esc(email)} <span aria-hidden="true">${icon('arrow-up-right')}</span></a><button class="copy-email" data-action="copy" aria-label="${t('copy.label')}">${icon('copy')}</button></div><div class="contact-card-bottom"><span>${t('contact.bottomLeft')}</span><span class="card-bars" aria-hidden="true"></span><span>${t('contact.bottomRight')}</span></div></article></div>
    <dl class="contact-facts">
      <div><dt>${t('contact.basedT')}</dt><dd>${t('contact.based')}</dd></div>
      <div><dt>${t('contact.availT')}</dt><dd>${t('contact.avail')}</dd></div>
      <div><dt>${t('contact.lookingT')}</dt><dd>${t('contact.looking')}</dd></div>
      <div><dt>${t('contact.whereT')}</dt><dd>${t('contact.where')}</dd></div>
    </dl>
    <div class="contact-links">${links}<span class="contact-smallprint">${t('contact.smallprint')}</span></div>
  </section>`;
}

/* On a phone the holder stays as the opening image, and this is what you
   scroll into: the three case studies as large cards, the collection and a
   way to get in touch, readable without any 3D. */
export function homeMoreView(featured, { email, linkedin, github, cv }) {
  return `<header class="hm-head"><span class="eyebrow">${t('hm.eyebrow')}</span><h2>${t('hm.title')}</h2></header>
    <div class="hm-carousel">
      <div class="hm-list" tabindex="0" role="region" aria-roledescription="carousel" aria-label="${t('hm.eyebrow')}">${[featured.length - 1, ...featured.keys(), 0].map((i, slot, all) => {
        // The first and last slots are copies, so swiping past either end lands on the other: an endless wheel.
        const copy = slot === 0 || slot === all.length - 1;
        const p = featured[i];
        return `<a class="hm-card" href="#/work/${esc(p.slug)}" data-slide="${i}" style="--tint:${esc(p.color)}"${copy ? ' data-copy aria-hidden="true" tabindex="-1"' : ''}>
        <span class="hm-media"><img src="${esc(thumb(p.images[0]))}" alt="" loading="lazy" decoding="async" /></span>
        <span class="hm-body"><span class="hm-num">${String(i + 1).padStart(2, '0')} / 03 · ${esc(p.category)}</span><span class="hm-name">${esc(p.name)}</span><span class="hm-line">${esc(p.capability)}.</span><span class="hm-open">${t('hm.open')} ${icon('arrow-right')}</span></span>
      </a>`;
      }).join('')}</div>
      <div class="hm-dots">${featured.map((p, i) => `<button data-hm-dot="${i}" aria-label="${esc(p.name)}" aria-current="${i === 0}"></button>`).join('')}</div>
    </div>
    <a class="hm-collection" href="#/index"><span><span class="eyebrow">${t('hm.colEyebrow')}</span><strong>${t('hm.colTitle')}</strong><span>${t('hm.colText')}</span></span>${icon('arrow-right')}</a>
    <div class="hm-contact"><span class="eyebrow">${t('hm.available')}</span><p>${t('hm.availableText')}</p>
      <a class="hm-mail" href="mailto:${esc(email)}">${esc(email)}</a>
      <div class="hm-links"><a href="${esc(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('arrow-up-right')}</a><a href="${esc(github)}" target="_blank" rel="noopener noreferrer">GitHub ${icon('arrow-up-right')}</a><a href="${esc(cv)}" download>CV ${icon('arrow-down')}</a><a href="#/about">${t('hm.about')} ${icon('arrow-right')}</a></div></div>`;
}
