import { icon } from './icons';
import { SECTIONS } from './case-studies';
import { t } from './i18n.js';

/* Renders a case study from src/case-studies.js. The page is a reading
   surface: neutral background, one column of text, large media, and a
   section index on the side. The metal stays in the frame around it. */

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pad = value => String(value).padStart(2, '0');

// Notes and placeholders are for editing. They show while developing or
// with ?edit in the address, and never in the public build.
export const EDITING = import.meta.env.DEV || new URLSearchParams(location.search).has('edit');

const CLAIMS = ['known', 'observed', 'assumed', 'tested', 'validated', 'not-validated', 'planned'];
const claimLabel = status => t(`claim.${status}`);
const NOTE = { content: 'CONTENT NEEDED', evidence: 'EVIDENCE NEEDED', validation: 'VALIDATION NEEDED', video: 'VIDEO NEEDED', decision: 'DECISION NEEDED' };
const evidenceLabel = kind => ['screenshot', 'photo', 'concept', 'diagram', 'video', 'mockup', 'placeholder'].includes(kind) ? t(`img.${kind}`) : t('img.unknown');

const editNote = (kind, text) => EDITING ? `<aside class="edit-note" data-kind="${kind}"><strong>[${NOTE[kind] || 'TO DO'}]</strong> ${esc(text)}</aside>` : '';

export function figure(item, zoomIndex) {
  if (!item) return '';
  const ratio = esc(item.ratio || '16/10');
  if (item.kind === 'placeholder') {
    if (!EDITING) return '';
    const label = item.evidence === 'video' ? 'VIDEO NEEDED' : 'EVIDENCE NEEDED';
    return `<figure class="cs-media is-placeholder" style="--ratio:${ratio}"><div class="cs-frame"><span class="ph-kind">${label}</span><p>${esc(item.need)}</p></div></figure>`;
  }
  const tag = `<span class="cs-tag" data-evidence="${esc(item.evidence)}">${esc(evidenceLabel(item.evidence))}</span>`;
  const body = item.kind === 'video'
    // Never autoplays, never with sound: the reader starts it.
    ? `<video controls playsinline preload="none"${item.poster ? ` poster="${esc(item.poster)}"` : ''} aria-label="${esc(item.alt)}">${item.src ? `<source src="${esc(item.src)}" />` : ''}${item.captions ? `<track kind="captions" src="${esc(item.captions)}" srclang="en" label="English" default />` : ''}</video>`
    : `<button class="cs-zoom" data-zoom="${zoomIndex}" aria-label="${esc(t('cs.enlarge', { alt: item.alt }))}"><img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" decoding="async" /><span class="cs-zoom-icon" aria-hidden="true">${icon('expand')}</span></button>`;
  return `<figure class="cs-media" style="--ratio:${ratio}"><div class="cs-frame">${body}</div><figcaption>${tag}${esc(item.caption)}</figcaption></figure>`;
}

function block(b, zoom) {
  switch (b.type) {
    case 'text': return b.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
    case 'claims': return `<ul class="cs-claims">${b.items.map(([status, text]) => `<li data-status="${status}"><span class="cs-claim-tag">${claimLabel(status)}</span><span>${esc(text)}</span></li>`).join('')}</ul>`;
    case 'media': return figure(b.item, zoom(b.item));
    case 'gallery': {
      const items = b.items.map(item => figure(item, zoom(item))).filter(Boolean);
      return items.length ? `<div class="cs-gallery" data-count="${items.length}">${items.join('')}</div>` : '';
    }
    case 'options': return `<div class="cs-options">${b.items.map(o => `<article class="cs-option" data-verdict="${o.verdict.startsWith('kept') ? 'kept' : 'discarded'}">
        <header><h4>${esc(o.title)}</h4><span class="cs-verdict">${esc(t(`verdict.${o.verdict}`))}</span></header>
        <dl><div><dt>${t('opt.solving')}</dt><dd>${esc(o.solving)}</dd></div><div><dt>${t('opt.pros')}</dt><dd>${esc(o.pros)}</dd></div><div><dt>${t('opt.cons')}</dt><dd>${esc(o.cons)}</dd></div><div><dt>${t('opt.what')}</dt><dd>${esc(o.why)}</dd></div></dl>
      </article>`).join('')}</div>`;
    case 'decision': return `<div class="cs-decision"><h4>${esc(b.title)}</h4><dl>
        <div><dt>${t('dec.situation')}</dt><dd>${esc(b.situation)}</dd></div>
        <div><dt>${t('dec.options')}</dt><dd><ol>${b.options.map(o => `<li>${esc(o)}</li>`).join('')}</ol></dd></div>
        <div class="is-key"><dt>${t('dec.decision')}</dt><dd>${esc(b.decision)}</dd></div>
        <div><dt>${t('dec.reasoning')}</dt><dd>${esc(b.reasoning)}</dd></div>
        <div><dt>${t('dec.tradeoff')}</dt><dd>${esc(b.tradeoff)}</dd></div>
        <div><dt>${t('dec.consequence')}</dt><dd>${esc(b.consequence)}</dd></div>
      </dl></div>`;
    case 'stack': return `<dl class="cs-stack">${b.items.map(([name, why]) => `<div><dt>${esc(name)}</dt><dd>${esc(why)}</dd></div>`).join('')}</dl>`;
    case 'checks': return `<ul class="cs-checks">${b.items.map(([state, text]) => `<li data-state="${state}"><span class="cs-check-tag">${t(`check.${state}`)}</span><span>${esc(text)}</span></li>`).join('')}</ul>`;
    case 'testPlan': {
      const list = (title, items) => `<div><h5>${title}</h5><ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`;
      return `<div class="cs-plan"><h4>${t('plan.title')}</h4><p class="cs-plan-who"><span>${t('plan.participants')}</span>${esc(b.participants)}</p><div class="cs-plan-grid">
        ${list(t('plan.tasks'), b.tasks)}${list(t('plan.questions'), b.questions)}${list(t('plan.observe'), b.observe)}${list(t('plan.success'), b.success)}${list(t('plan.priorities'), b.priorities)}
      </div></div>`;
    }
    case 'note': return editNote(b.kind, b.text);
    default: return '';
  }
}

export function fullCaseView(project, cs, position, nextProject) {
  // Every zoomable image on the page, in reading order, for the enlarged view.
  const zoomable = [];
  const zoom = item => {
    if (!item || item.kind !== 'image') return -1;
    zoomable.push(item);
    return zoomable.length - 1;
  };
  const heroItem = cs.hero.kind === 'placeholder' && !EDITING ? cs.heroFallback : cs.hero;
  const hero = figure(heroItem, zoom(heroItem));
  const fact = (label, value, editing) => value ? `<div><dt>${label}</dt><dd>${esc(value)}</dd></div>` : (editing ? `<div><dt>${label}</dt><dd>${editNote('content', editing)}</dd></div>` : '');
  const sections = SECTIONS.map(([id], i) => `<section class="cs-section" id="cs-${id}" aria-labelledby="cs-${id}-title">
      <header class="cs-section-head"><span class="cs-num">${pad(i + 1)}</span><h3 id="cs-${id}-title" tabindex="-1">${t(`sec.${id}`)}</h3></header>
      <div class="cs-section-body">${(cs.sections[id] || []).map(b => block(b, zoom)).join('')}</div>
    </section>`).join('');
  const html = `<section class="cs" id="full-case" aria-labelledby="cs-title">
    <header class="cs-hero">
      <div class="cs-hero-text">
        <span class="eyebrow">${t('cs.eyebrow', { n: pad(position + 1) })}</span>
        <h2 id="cs-title" tabindex="-1"><span class="sr-only">${t('cs.sr')}</span>${esc(project.name)}</h2>
        <p class="cs-lede">${esc(cs.oneLiner)}</p>
        <dl class="cs-facts">
          ${fact(t('cs.role'), cs.role)}${fact(t('cs.type'), cs.type)}${fact(t('cs.team'), cs.team)}${cs.teamNote ? editNote('content', cs.teamNote) : ''}
          ${fact(t('cs.timeline'), cs.timeline, cs.timelineNote)}${fact(t('cs.status'), cs.status)}
          <div class="cs-fact-wide"><dt>${t('cs.built')}</dt><dd>${cs.stack.map(s => `<span>${esc(s)}</span>`).join('')}</dd></div>
        </dl>
        ${cs.links.length ? `<div class="cs-links">${cs.links.map(([label, href]) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} ${icon('arrow-up-right')}</a>`).join('')}</div>` : ''}
      </div>
      <div class="cs-hero-media">${hero}</div>
    </header>
    <div class="cs-legend" aria-label="${t('cs.legendLabel')}">
      <span>${t('cs.legend')}</span>${CLAIMS.map(key => `<span class="cs-claim-tag" data-status="${key}">${claimLabel(key)}</span>`).join('')}
    </div>
    <div class="cs-body">
      <nav class="cs-toc" aria-label="${t('cs.tocLabel')}"><span class="cs-toc-title">${t('cs.toc')}</span><ol>${SECTIONS.map(([id], i) => `<li><button data-goto="cs-${id}" aria-controls="cs-${id}"><span>${pad(i + 1)}</span>${t(`sec.${id}`)}</button></li>`).join('')}</ol></nav>
      <div class="cs-sections">${sections}
        <footer class="cs-next">
          <span class="eyebrow">${t('cs.nextEyebrow')}</span>
          <button class="cs-next-card" data-open-project="${esc(nextProject.slug)}"><span class="cs-next-name">${esc(nextProject.name)} ${icon('arrow-right')}</span><span class="cs-next-line">${esc(cs.next.line)}</span></button>
          <div class="cs-next-links"><button data-action="collection">${icon('arrow-left')} ${t('cs.back')}</button><button data-action="top">${t('cs.top')} ${icon('arrow-up')}</button></div>
        </footer>
      </div>
    </div>
  </section>`;
  return { html, zoomable };
}
