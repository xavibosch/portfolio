import gsap from 'gsap';
import { audienceHeadline } from './product-view.js';

/* The motion of the Product view. Everything here starts from markup that
   already reads in full without it, and everything stops when the view is
   redrawn (a language change) or hidden (the cardholder is showing), so
   nothing runs twice and nothing runs unseen. Returns a cleanup and a way to
   replay the entrance when the view comes back. */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const showing = () => document.documentElement.dataset.mode === 'product';

export function initProductMotion(root) {
  const abort = new AbortController();
  const on = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal: abort.signal });
  const observers = [];
  let frame = 0;
  if (!reduced.matches) root.classList.add('pw-anim');

  // Who is reading. The headline's words drop out, the new ones rise in.
  const title = root.querySelector('.pw-title');
  let swapping;
  on(root, 'click', e => {
    const button = e.target.closest('[data-audience]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    root.querySelectorAll('[data-audience]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const next = audienceHeadline(button.dataset.audience);
    // A longer sentence is set smaller, so every version stays a headline of three or four lines.
    const fit = () => { title.innerHTML = next; title.classList.toggle('is-long', title.textContent.length > 90); };
    swapping?.kill();
    if (reduced.matches) { fit(); return; }
    swapping = gsap.timeline()
      .to(title.querySelectorAll('.pw-word > span'), { yPercent: -105, duration: .28, stagger: .008, ease: 'power2.in' })
      .add(fit)
      .fromTo(() => title.querySelectorAll('.pw-word > span'), { yPercent: 105 }, { yPercent: 0, duration: .7, stagger: .018, ease: 'expo.out' });
  });

  // Entrances as each part arrives.
  const rise = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    rise.unobserve(entry.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  observers.push(rise);
  root.querySelectorAll('[data-rise]').forEach(el => rise.observe(el));

  // The section rail follows the reading position.
  const links = [...root.querySelectorAll('[data-spy]')];
  const spy = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(a => a.toggleAttribute('aria-current', a.dataset.spy === entry.target.id));
      // The address runs edge to edge at the end; the rail steps aside for it.
      root.classList.toggle('rail-off', entry.target.id === 'pw-contact');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  observers.push(spy);
  links.forEach(a => { const section = root.querySelector(`#${a.dataset.spy}`); if (section) spy.observe(section); });

  // Scroll-linked parts: the statement lights up word by word, the wall's
  // columns drift, the portrait settles. One frame per scroll.
  const statement = [...root.querySelectorAll('.pw-reveal .pw-word')];
  const wall = root.querySelector('.pw-wall');
  const columns = [...root.querySelectorAll('.pw-wall-col')];
  const portrait = root.querySelector('.pw-portrait img');
  const update = () => {
    frame = 0;
    if (!showing()) return;
    const vh = innerHeight;
    if (statement.length) {
      const box = statement[0].closest('.pw-reveal').getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh * .82 - box.top) / (box.height + vh * .35)));
      const lit = Math.round(progress * statement.length);
      statement.forEach((word, i) => word.classList.toggle('is-lit', i < lit));
    }
    if (wall && !reduced.matches && innerWidth > 760) {
      const box = wall.getBoundingClientRect();
      if (box.bottom > 0 && box.top < vh) {
        const offset = (box.top + box.height / 2 - vh / 2);
        columns.forEach(col => { col.style.transform = `translate3d(0, ${(offset * Number(col.dataset.speed)).toFixed(1)}px, 0)`; });
      }
    }
    if (portrait && !reduced.matches) {
      const y = Math.min(scrollY, vh);
      portrait.style.transform = `translate3d(0, ${(y * .08).toFixed(1)}px, 0) scale(${(1 + y / vh * .06).toFixed(3)})`;
    }
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(update); };
  on(window, 'scroll', request, { passive: true });
  on(window, 'resize', request);
  update();

  // A cursor that names what is under it.
  const cursor = root.querySelector('.pw-cursor'), label = cursor?.firstElementChild;
  if (cursor && fine.matches && !reduced.matches) {
    const to = { x: -100, y: -100 }, at = { x: -100, y: -100 };
    let moving = 0;
    const follow = () => {
      at.x += (to.x - at.x) * .22; at.y += (to.y - at.y) * .22;
      cursor.style.transform = `translate3d(${at.x}px, ${at.y}px, 0)`;
      moving = Math.abs(to.x - at.x) + Math.abs(to.y - at.y) > .3 ? requestAnimationFrame(follow) : 0;
    };
    on(document, 'pointermove', e => {
      if (!showing() || e.pointerType !== 'mouse' || document.querySelector('#panel')?.open) { cursor.classList.remove('is-on'); return; }
      to.x = e.clientX; to.y = e.clientY;
      const target = e.target.closest?.('#product [data-cursor]');
      cursor.classList.add('is-on');
      cursor.classList.toggle('has-label', Boolean(target));
      if (target && label.textContent !== target.dataset.cursor) label.textContent = target.dataset.cursor;
      if (!target) label.textContent = '';
      if (!moving) moving = requestAnimationFrame(follow);
    });
    on(document, 'pointerleave', () => cursor.classList.remove('is-on'));
  }

  // The time in Barcelona, under the portrait.
  const clock = root.querySelector('[data-clock]');
  const tick = () => { if (clock) clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date()); };
  tick();
  const clockTimer = setInterval(tick, 30000);

  // The first screen arrives: the headline's words rise, the portrait opens.
  function intro() {
    if (reduced.matches || !showing()) return;
    gsap.fromTo(title.querySelectorAll('.pw-word > span'), { yPercent: 105 }, { yPercent: 0, duration: 1, stagger: .022, ease: 'expo.out', delay: .1 });
    gsap.fromTo(root.querySelector('.pw-portrait'), { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' });
    gsap.fromTo(root.querySelectorAll('.pw-audience, .pw-available, .pw-quick'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .9, stagger: .08, delay: .35, ease: 'expo.out', clearProps: 'transform,opacity' });
  }

  return {
    intro,
    update: request,
    destroy() {
      abort.abort();
      observers.forEach(o => o.disconnect());
      if (frame) cancelAnimationFrame(frame);
      clearInterval(clockTimer);
      swapping?.kill();
    },
  };
}
