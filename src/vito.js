import gsap from 'gsap';
import { icon } from './icons';
import { getLang } from './i18n.js';

/* ── Vito ─────────────────────────────────────────────────────────────
   The little robot who lives in the portfolio and answers questions about
   Xavi. He is never completely still: he breathes, sways, blinks, follows
   the cursor, and now and then types a line in a speech bubble. His poses
   are Xavi's own renders (sitting, lying, waving, thinking, presenting the
   cardholder); each has a closed-eye twin for blinking.

   On the home page he sits on the footer line, turned towards the page.
   Inside the folio he lies on the header line, reading. Hovering him makes
   him get up and say hello in the site's language.

   The chat sends the conversation and the site's language to /api/chat,
   which answers only from the portfolio's own content. */

const POSES = ['sit', 'lie', 'wave', 'think', 'card'];
const TEXT = {
  en: {
    hello: 'Hi!', intro: "Hi! I'm Vito. I know what's in Xavi's portfolio, and I'm honest about what isn't. What would you like to know?",
    about: "Xavi's little assistant. He only knows what this portfolio says.", placeholder: 'Ask anything about Xavi',
    label: 'Your question for Vito', send: 'Send', close: 'Close the chat', open: 'Ask Vito about Xavi', tag: 'Ask Vito', you: 'You',
    expand: 'Make the chat bigger', shrink: 'Make the chat smaller',
    suggestions: ['What does Xavi do, in one line?', 'Which project shows his product thinking best?', 'When and where can he do an internship?'],
    phrases: ['Any questions?', 'Ask me about Xavi', 'I know his projects by heart', 'Psst… ask me about Reps', 'Curious about Jeffrey Desk?', 'I read every case study'],
    error: 'Something went wrong. You can always email Xavi at bosch.xavii@gmail.com.', offline: 'I could not reach my notes just now. You can email Xavi at bosch.xavii@gmail.com.',
  },
  es: {
    hello: '¡Hola!', intro: '¡Hola! Soy Vito. Sé lo que hay en el portfolio de Xavi, y soy sincero con lo que no hay. ¿Qué te gustaría saber?',
    about: 'El pequeño asistente de Xavi. Solo sabe lo que dice este portfolio.', placeholder: 'Pregunta sobre Xavi',
    label: 'Tu pregunta para Vito', send: 'Enviar', close: 'Cerrar el chat', open: 'Pregunta a Vito por Xavi', tag: 'Pregunta a Vito', you: 'Tú',
    expand: 'Ampliar el chat', shrink: 'Reducir el chat',
    suggestions: ['¿Qué hace Xavi, en una frase?', '¿Qué proyecto muestra mejor su visión de producto?', '¿Cuándo y dónde puede hacer prácticas?'],
    phrases: ['¿Alguna pregunta?', 'Pregúntame por Xavi', 'Me sé sus proyectos de memoria', 'Psst… pregúntame por Reps', '¿Te cuento algo de Jeffrey Desk?', 'Me he leído todos los casos'],
    error: 'Algo ha fallado. Siempre puedes escribir a Xavi a bosch.xavii@gmail.com.', offline: 'Ahora no llego a mis notas. Puedes escribir a Xavi a bosch.xavii@gmail.com.',
  },
  ca: {
    hello: 'Hola!', intro: "Hola! Sóc en Vito. Sé el que hi ha al portfoli d'en Xavi, i sóc sincer amb el que no hi és. Què vols saber?",
    about: "El petit assistent d'en Xavi. Només sap el que diu aquest portfoli.", placeholder: "Pregunta sobre en Xavi",
    label: 'La teva pregunta per a en Vito', send: 'Envia', close: 'Tanca el xat', open: "Pregunta a en Vito per en Xavi", tag: 'Pregunta a Vito', you: 'Tu',
    expand: 'Amplia el xat', shrink: 'Redueix el xat',
    suggestions: ["Què fa en Xavi, en una frase?", 'Quin projecte mostra millor la seva visió de producte?', 'Quan i on pot fer pràctiques?'],
    phrases: ['Alguna pregunta?', "Pregunta'm per en Xavi", 'Em sé els seus projectes de memòria', "Psst… pregunta'm per Reps", "Vols que t'expliqui Jeffrey Desk?", "M'he llegit tots els casos"],
    error: 'Alguna cosa ha fallat. Sempre pots escriure a en Xavi a bosch.xavii@gmail.com.', offline: "Ara no arribo a les meves notes. Pots escriure a en Xavi a bosch.xavii@gmail.com.",
  },
};
const DOODLES = {
  think: `<svg viewBox="0 0 70 70" aria-hidden="true"><path class="d-line" d="M30 18c0-8 7-13 15-13s14 5 14 12c0 9-11 10-11 19v4"/><path class="d-line" d="M48 49v1"/><path class="d-line" d="M8 40l10-6M10 56h12"/></svg>`,
  card: `<svg viewBox="0 0 70 70" aria-hidden="true"><path class="d-line" d="M44 6l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z"/><path class="d-line" d="M12 36l10-10M8 52h13"/></svg>`,
};

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pick = list => list[Math.floor(Math.random() * list.length)];

/* Answers are plain text. Only two kinds of links are turned into links:
   portfolio paths (#/...) and https addresses. Everything else stays text. */
function format(text) {
  let html = esc(text.replace(/\*\*(.+?)\*\*/g, '$1'));
  html = html.replace(/\[([^\]]+)\]\((#\/[a-z0-9/-]*|https:\/\/[^\s)]+)\)/gi, (_, label, href) =>
    `<a href="${href}"${href.startsWith('https') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label} ${icon(href.startsWith('https') ? 'arrow-up-right' : 'arrow-right')}</a>`);
  html = html.replace(/\[#\/[a-z0-9/-]*\]/gi, '');
  return html.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`).join('');
}

export function mountVito({ panel }) {
  let lang = getLang();
  const t = () => TEXT[lang];
  const root = document.createElement('div');
  root.className = 'vito';
  root.innerHTML = `
    <span class="vito-veil" data-vito="shrink" aria-hidden="true"></span>
    <section class="vito-chat" id="vito-chat" role="dialog" tabindex="-1" hidden>
      <span class="vito-grip" data-edge="corner" aria-hidden="true"></span><span class="vito-grip" data-edge="top" aria-hidden="true"></span><span class="vito-grip" data-edge="left" aria-hidden="true"></span>
      <header class="vito-head">
        <div><strong>Vito</strong><span class="vito-about"></span></div>
        <button class="vito-size" data-vito="expand" aria-pressed="false">${icon('expand')}${icon('shrink')}</button>
        <button class="vito-close" data-vito="close">${icon('close')}</button>
      </header>
      <div class="vito-log" role="log" aria-live="polite"></div>
      <div class="vito-suggest"></div>
      <form class="vito-form">
        <label class="sr-only" for="vito-input"></label>
        <input id="vito-input" name="q" maxlength="500" autocomplete="off" />
        <button type="submit">${icon('arrow-up')}</button>
      </form>
    </section>
    <button class="vito-launch" aria-expanded="false" aria-controls="vito-chat">
      <span class="vito-figure" aria-hidden="true">
        <span class="vito-shadow"></span>
        <span class="vito-move"><span class="vito-body">${POSES.map(p => `<img class="vito-pose" data-pose="${p}" src="/assets/vito/${p}.webp" alt="" draggable="false" decoding="async"${p === 'sit' || p === 'lie' ? ' fetchpriority="high"' : ''} /><img class="vito-pose is-blink" data-pose="${p}" src="/assets/vito/${p}-blink.webp" alt="" draggable="false" decoding="async" />`).join('')}</span></span>
        <span class="vito-doodle"></span>
        <span class="vito-say"><span class="vito-say-text"></span><i class="vito-caret"></i></span>
      </span>
      <span class="vito-tag"></span>
    </button>`;
  document.body.appendChild(root);

  const launch = root.querySelector('.vito-launch');
  const chat = root.querySelector('.vito-chat');
  const log = root.querySelector('.vito-log');
  const form = root.querySelector('.vito-form');
  const input = root.querySelector('#vito-input');
  const figure = root.querySelector('.vito-figure');
  // GSAP moves this layer; the CSS breathing runs on the one inside it.
  const body = root.querySelector('.vito-move');
  const doodle = root.querySelector('.vito-doodle');
  const say = root.querySelector('.vito-say');
  const sayText = root.querySelector('.vito-say-text');
  let messages = [];
  try { messages = JSON.parse(sessionStorage.getItem('vito') || '[]'); } catch { messages = []; }
  let pose = '';
  let busy = false;
  let hovering = false;
  let poseTimer;
  // On a phone the open chat fills the screen and he stands in its corner,
  // where there is only room for him sitting.
  const phone = matchMedia('(max-width: 760px)');
  const coarse = matchMedia('(pointer: coarse)');
  const rest = () => (panel.open && !(phone.matches && !chat.hidden) ? 'lie' : 'sit');

  /* ── Language: the site's own switch sets it. The chat's words, his
     greetings and his idle lines follow it. The
     model answers in whatever language the visitor writes in, and falls
     back to this one when it cannot tell. ── */
  function applyLang() {
    root.querySelector('.vito-about').textContent = t().about;
    root.querySelector('label[for="vito-input"]').textContent = t().label;
    input.placeholder = t().placeholder;
    form.querySelector('button').setAttribute('aria-label', t().send);
    root.querySelector('.vito-close').setAttribute('aria-label', t().close);
    root.querySelector('.vito-size').setAttribute('aria-label', root.classList.contains('is-expanded') ? t().shrink : t().expand);
    chat.setAttribute('aria-label', `Vito: ${t().about}`);
    launch.setAttribute('aria-label', t().open);
    root.querySelector('.vito-tag').textContent = t().tag;
    root.querySelector('.vito-suggest').innerHTML = t().suggestions.map(q => `<button data-ask="${esc(q)}">${esc(q)}</button>`).join('');
    if (!chat.hidden) renderHistory();
  }

  /* ── Poses, blinking and doodles ── */
  function setPose(next, { hold = 0 } = {}) {
    clearTimeout(poseTimer);
    if (next !== pose) {
      pose = next;
      root.dataset.pose = next;
      if (!reduced.matches) gsap.fromTo(body, { scale: .94, y: 4 }, { scale: 1, y: 0, duration: .55, ease: 'back.out(2.2)', overwrite: 'auto' });
    }
    showDoodle(DOODLES[next] ? next : null);
    if (hold) poseTimer = setTimeout(() => { if (!hovering) setPose(busy ? 'think' : rest()); }, hold);
  }
  function showDoodle(kind) {
    if (!kind) { doodle.innerHTML = ''; return; }
    doodle.innerHTML = DOODLES[kind];
    doodle.dataset.kind = kind;
    if (reduced.matches) return;
    doodle.querySelectorAll('.d-line').forEach(path => {
      const length = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: .7, ease: 'power2.out' });
    });
  }
  function blink() {
    if (!reduced.matches && !document.hidden) {
      root.classList.add('is-blinking');
      setTimeout(() => root.classList.remove('is-blinking'), 120);
      if (Math.random() < .25) setTimeout(() => { root.classList.add('is-blinking'); setTimeout(() => root.classList.remove('is-blinking'), 110); }, 260);
    }
    setTimeout(blink, 2200 + Math.random() * 4200);
  }
  setTimeout(blink, 1800);

  /* ── Speech bubble, typed a letter at a time like someone writing ── */
  let typing = 0;
  function speak(line, hold = 2400) {
    const run = ++typing;
    say.classList.add('is-on');
    sayText.textContent = '';
    if (reduced.matches) { sayText.textContent = line; setTimeout(() => { if (run === typing) say.classList.remove('is-on'); }, hold + 800); return; }
    let i = 0;
    const next = () => {
      if (run !== typing) return;
      if (i <= line.length) {
        sayText.textContent = line.slice(0, i++);
        const char = line[i - 2];
        setTimeout(next, char === ' ' ? 90 : /[,.…?!]/.test(char || '') ? 220 : 38 + Math.random() * 55);
      } else {
        setTimeout(erase, hold);
      }
    };
    const erase = () => {
      if (run !== typing) return;
      if (sayText.textContent.length) { sayText.textContent = sayText.textContent.slice(0, -1); setTimeout(erase, 18); }
      else say.classList.remove('is-on');
    };
    next();
  }
  function hush() { typing++; say.classList.remove('is-on'); }

  /* ── He follows the cursor with his whole body, gently ── */
  let look = { x: 0, y: 0 }, target = { x: 0, y: 0 }, frame = 0;
  function follow() {
    look.x += (target.x - look.x) * .08;
    look.y += (target.y - look.y) * .08;
    figure.style.setProperty('--look-x', look.x.toFixed(3));
    figure.style.setProperty('--look-y', look.y.toFixed(3));
    frame = Math.abs(target.x - look.x) + Math.abs(target.y - look.y) > .002 ? requestAnimationFrame(follow) : 0;
  }
  addEventListener('pointermove', e => {
    if (reduced.matches || e.pointerType !== 'mouse') return;
    const box = figure.getBoundingClientRect();
    const dx = (e.clientX - (box.left + box.width / 2)) / innerWidth;
    const dy = (e.clientY - (box.top + box.height / 3)) / innerHeight;
    target = { x: Math.max(-1, Math.min(1, dx * 2.2)), y: Math.max(-1, Math.min(1, dy * 2.2)) };
    if (!frame) frame = requestAnimationFrame(follow);
  }, { passive: true });

  /* ── What he does on his own while the chat is closed ── */
  let lastLine = '';
  function idle() {
    if (!busy && chat.hidden && !hovering && !document.hidden) {
      const roll = Math.random();
      if (roll < .55) {
        let line = pick(t().phrases);
        if (line === lastLine) line = pick(t().phrases);
        lastLine = line;
        speak(line);
      } else if (!reduced.matches && pose === 'sit') {
        if (roll < .72) gsap.timeline().to(body, { y: -10, scaleY: 1.04, duration: .22, ease: 'power2.out' }).to(body, { y: 0, scaleY: .97, duration: .2, ease: 'power2.in' }).to(body, { scaleY: 1, duration: .35, ease: 'elastic.out(1, .5)' });
        else if (roll < .86) setPose('think', { hold: 2600 });
        else showDoodle('card');
      } else if (!reduced.matches) {
        // Lying down: a lazy kick, then back to reading.
        gsap.timeline().to(body, { rotate: -2, y: -2, duration: .3, ease: 'power2.out' }).to(body, { rotate: 0, y: 0, duration: .6, ease: 'elastic.out(1, .45)' });
      }
    }
    setTimeout(idle, 7000 + Math.random() * 7000);
  }
  setTimeout(idle, 6500);
  setTimeout(() => { if (chat.hidden && !hovering) { setPose('wave', { hold: 3000 }); speak(t().hello, 1600); } }, 2600);

  // Hovering makes him get up and say hello in the site's language.
  // Getting up changes his shape (lying is wide, standing is narrow), which
  // used to move the edge under a still cursor and make him flicker between
  // the two. So the hover area keeps the size it had when the cursor arrived,
  // and leaving waits a moment in case the cursor comes straight back.
  let leaveTimer;
  launch.addEventListener('pointerenter', e => {
    if (e.pointerType !== 'mouse' || !chat.hidden) return;
    clearTimeout(leaveTimer);
    if (hovering) return;
    const box = figure.getBoundingClientRect();
    figure.style.minWidth = `${box.width}px`;
    figure.style.minHeight = `${box.height}px`;
    hovering = true;
    setPose('wave');
    speak(t().hello, 1800);
  });
  launch.addEventListener('pointerleave', e => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
      hovering = false;
      figure.style.minWidth = figure.style.minHeight = '';
      if (chat.hidden) setPose(rest(), {});
    }, 180);
  });

  /* ── The conversation ── */
  function bubble(role, html) {
    const item = document.createElement('div');
    item.className = `vito-msg is-${role}`;
    item.innerHTML = `<span class="vito-who">${role === 'user' ? esc(t().you) : 'Vito'}</span><div class="vito-text">${html}</div>`;
    log.appendChild(item);
    if (!reduced.matches) gsap.fromTo(item, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'expo.out' });
    log.scrollTop = log.scrollHeight;
    return item.querySelector('.vito-text');
  }
  function renderHistory() {
    log.innerHTML = '';
    bubble('assistant', format(t().intro));
    messages.forEach(m => bubble(m.role, m.role === 'user' ? `<p>${esc(m.content)}</p>` : format(m.content)));
    root.querySelector('.vito-suggest').hidden = messages.length > 0;
  }
  function save() { try { sessionStorage.setItem('vito', JSON.stringify(messages.slice(-12))); } catch {} }

  async function ask(question) {
    question = question.trim().slice(0, 500);
    if (!question || busy) return;
    busy = true;
    root.querySelector('.vito-suggest').hidden = true;
    messages.push({ role: 'user', content: question });
    bubble('user', `<p>${esc(question)}</p>`);
    input.value = '';
    const out = bubble('assistant', '<p class="vito-typing"><i></i><i></i><i></i></p>');
    log.setAttribute('aria-busy', 'true');
    setPose('think');
    let answer = '';
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: messages.slice(-6), lang }) });
      if (!response.ok || !response.body) {
        answer = (await response.text()) || t().error;
        out.innerHTML = format(answer);
      } else {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let first = true;
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          if (first && answer.trim()) { first = false; setPose('card'); }
          out.innerHTML = format(answer);
          log.scrollTop = log.scrollHeight;
        }
      }
    } catch {
      answer = t().offline;
      out.innerHTML = format(answer);
    }
    busy = false;
    log.removeAttribute('aria-busy');
    messages.push({ role: 'assistant', content: answer });
    save();
    setPose('card', { hold: 2600 });
  }

  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
  root.addEventListener('click', e => {
    const suggestion = e.target.closest('[data-ask]');
    if (suggestion) ask(suggestion.dataset.ask);
    if (e.target.closest('[data-vito="close"]')) toggle(false);
    if (e.target.closest('[data-vito="expand"]')) expand(!root.classList.contains('is-expanded'));
    if (e.target.closest('[data-vito="shrink"]')) expand(false);
  });

  /* ── Size. The chat grows from Vito's corner: dragging its top edge, its
     left edge or the top-left corner makes it taller or wider, never lower,
     and the size is remembered. Inside the folio it hangs from the header,
     so there only the width changes. The expand button makes it as big as
     an open project. Double-clicking an edge goes back to the default. ── */
  const SIZE_KEY = 'vito-size';
  function applySize(size) {
    for (const side of ['w', 'h']) {
      if (size?.[side]) root.style.setProperty(`--vito-${side}`, `${size[side]}px`);
      else root.style.removeProperty(`--vito-${side}`);
    }
  }
  try { applySize(JSON.parse(localStorage.getItem(SIZE_KEY) || 'null')); } catch {}

  chat.addEventListener('pointerdown', e => {
    const grip = e.target.closest('.vito-grip');
    if (!grip || e.button !== 0) return;
    e.preventDefault();
    const edge = grip.dataset.edge;
    const box = chat.getBoundingClientRect();
    const inPanel = root.classList.contains('is-in-panel');
    // At home it stops under the header, so the navigation stays usable.
    const bounds = inPanel ? panel.querySelector('.panel-shell').getBoundingClientRect() : { left: 0, top: document.querySelector('.header').getBoundingClientRect().bottom };
    const start = { x: e.clientX, y: e.clientY, w: box.width, h: box.height };
    const wide = edge !== 'top', tall = edge !== 'left' && !inPanel;
    grip.setPointerCapture(e.pointerId);
    root.classList.add('is-resizing');
    const move = ev => {
      const size = {};
      if (wide) size.w = Math.round(Math.min(Math.max(start.w + start.x - ev.clientX, 320), box.right - bounds.left - 16));
      if (tall) size.h = Math.round(Math.min(Math.max(start.h + start.y - ev.clientY, 260), box.bottom - bounds.top - 12));
      if (size.w) root.style.setProperty('--vito-w', `${size.w}px`);
      if (size.h) root.style.setProperty('--vito-h', `${size.h}px`);
    };
    const end = () => {
      grip.removeEventListener('pointermove', move);
      root.classList.remove('is-resizing');
      const read = side => parseFloat(root.style.getPropertyValue(`--vito-${side}`)) || undefined;
      try { localStorage.setItem(SIZE_KEY, JSON.stringify({ w: read('w'), h: read('h') })); } catch {}
    };
    grip.addEventListener('pointermove', move);
    grip.addEventListener('lostpointercapture', end, { once: true });
  });
  chat.addEventListener('dblclick', e => {
    if (!e.target.closest('.vito-grip')) return;
    applySize(null);
    try { localStorage.removeItem(SIZE_KEY); } catch {}
  });

  // Grows from where it is to the size of an open project, and back.
  function expand(on) {
    if (on === root.classList.contains('is-expanded') || (on && chat.hidden)) return;
    const from = chat.getBoundingClientRect();
    root.classList.toggle('is-expanded', on);
    const button = root.querySelector('.vito-size');
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', on ? t().shrink : t().expand);
    const to = chat.getBoundingClientRect();
    if (!reduced.matches && to.width) {
      gsap.fromTo(chat, { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: '0 0' },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: .6, ease: 'expo.out', clearProps: 'transform' });
    }
    log.scrollTop = log.scrollHeight;
  }

  function toggle(open = chat.hidden) {
    if (open === !chat.hidden) return;
    launch.setAttribute('aria-expanded', String(open));
    root.dataset.open = String(open);
    // On a phone the open chat is the whole screen, so the page behind stops scrolling.
    document.documentElement.classList.toggle('vito-open', open);
    if (open) {
      hush();
      renderHistory();
      chat.hidden = false;
      setPose('wave', { hold: 1800 });
      if (!reduced.matches) gsap.fromTo(chat, { opacity: 0, y: 18, scale: .94, transformOrigin: getComputedStyle(root).flexDirection === 'column-reverse' ? '88% 0%' : '88% 100%' }, { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'expo.out' });
      // On a touch screen focusing the field would raise the keyboard before
      // the visitor has seen the suggestions, so only a tap on it does that.
      if (coarse.matches) chat.focus({ preventScroll: true });
      else input.focus({ preventScroll: true });
    } else {
      const done = () => { chat.hidden = true; expand(false); launch.focus({ preventScroll: true }); };
      if (reduced.matches) done();
      else gsap.to(chat, { opacity: 0, y: 12, scale: .96, duration: .22, ease: 'power2.in', onComplete: done });
      setPose(rest());
    }
  }
  launch.addEventListener('click', () => toggle());
  root.addEventListener('keydown', e => {
    // Escape closes the chat first, without closing the folio behind it.
    if (e.key === 'Escape' && !chat.hidden) { e.preventDefault(); e.stopPropagation(); toggle(false); }
  });

  /* The folio is a modal dialog, which makes everything outside it inert,
     so Vito moves inside it while it is open and back out when it closes.
     Out there he sits; in there he lies on the header's line. */
  const place = () => {
    const home = panel.open ? panel.querySelector('.panel-shell') : document.body;
    if (root.parentElement !== home) home.appendChild(root);
    root.classList.toggle('is-in-panel', panel.open);
    // On a phone the chat covers everything, so going into or out of a
    // project (a link in his answer, say) closes it to show where you went.
    if (phone.matches && !chat.hidden) toggle(false);
    if (chat.hidden && !hovering) setPose(rest());
  };
  new MutationObserver(place).observe(panel, { attributes: true, attributeFilter: ['open'] });
  addEventListener('hashchange', () => { if (phone.matches && !chat.hidden) toggle(false); });

  // The visible part of the screen, which shrinks when the phone keyboard opens.
  const viewport = window.visualViewport;
  const fitViewport = () => {
    if (!viewport) return;
    root.style.setProperty('--vv-h', `${viewport.height}px`);
    root.style.setProperty('--vv-top', `${viewport.offsetTop}px`);
  };
  viewport?.addEventListener('resize', fitViewport);
  viewport?.addEventListener('scroll', fitViewport);
  fitViewport();

  applyLang();
  addEventListener('langchange', () => { lang = getLang(); applyLang(); });
  place();
  setPose(rest());
  // He jumps in once his first pose has loaded, never as an empty shadow.
  const first = root.querySelector(`.vito-pose[data-pose="${rest()}"]:not(.is-blink)`);
  const arrive = () => {
    root.classList.add('is-ready');
    if (!reduced.matches) gsap.fromTo(body, { y: 26, opacity: 0, scale: .9 }, { y: 0, opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.8)' });
  };
  if (first.complete && first.naturalWidth) arrive(); else first.addEventListener('load', arrive, { once: true });
  return { ask, toggle };
}
