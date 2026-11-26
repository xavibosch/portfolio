import gsap from 'gsap';
import { t } from './i18n.js';

/* The first screen of a visit. The head script decides whether it shows
   (html.is-loading); this plays it: the three verbs of the headline in turn,
   a window flicking through the work, a count to 100 that waits for the
   fonts and the first images, then the screen lifts away. A click or a key
   skips it. `done` runs when the page underneath is uncovered. */
export function runLoader(done) {
  const root = document.documentElement;
  const el = document.querySelector('.loader');
  if (!root.classList.contains('is-loading') || !el) { done(); return; }

  const words = [...el.querySelectorAll('.loader-words span')];
  t('loader.words').split('|').forEach((text, i) => { if (words[i]) words[i].textContent = text; });
  const shots = [...el.querySelectorAll('.loader-window img')];
  shots.forEach(img => { img.loading = 'eager'; });
  const count = el.querySelector('.loader-count');
  const bar = el.querySelector('.loader-bar span');

  let shot = 0;
  shots[0]?.classList.add('is-on');
  const flick = setInterval(() => {
    shots[shot]?.classList.remove('is-on');
    shot = (shot + 1) % shots.length;
    shots[shot]?.classList.add('is-on');
  }, 240);

  const progress = { value: 0 };
  const show = () => { count.textContent = String(Math.round(progress.value)).padStart(3, '0'); bar.style.transform = `scaleX(${progress.value / 100})`; };
  const ready = Promise.race([
    Promise.all([document.fonts?.ready, ...shots.slice(0, 3).map(img => img.decode?.().catch(() => {}))]),
    new Promise(resolve => setTimeout(resolve, 2600)),
  ]);

  const words_ = gsap.timeline();
  // Each verb leaves before the next one arrives, so two never share the line.
  words.forEach((word, i) => {
    words_.fromTo(word, { yPercent: 110 }, { yPercent: 0, duration: .5, ease: 'expo.out' }, i * .7);
    if (i < words.length - 1) words_.to(word, { yPercent: -110, duration: .2, ease: 'power2.in' }, i * .7 + .48);
  });

  // The count runs to 90 on its own and only finishes once the page is ready.
  const run = gsap.timeline()
    .to(progress, { value: 90, duration: 1.9, ease: 'power2.inOut', onUpdate: show })
    .add(() => { run.pause(); ready.then(() => run.play()); })
    .to(progress, { value: 100, duration: .35, ease: 'power1.out', onUpdate: show })
    .to(el.querySelector('.loader-window'), { scale: 1.08, duration: .5, ease: 'power2.in' }, '>-.1')
    .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: .95, ease: 'expo.inOut' }, '>-.2')
    .add(finish, '>-.45');

  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    done();
    setTimeout(() => {
      clearInterval(flick);
      words_.kill();
      root.classList.remove('is-loading');
      el.remove();
      try { sessionStorage.setItem('xb-intro', '1'); } catch {}
    }, 500);
  }
  // Anyone in a hurry: the rest plays four times as fast.
  const skip = () => { run.play(); run.timeScale(4); words_.timeScale(4); };
  el.addEventListener('click', skip, { once: true });
  addEventListener('keydown', skip, { once: true });
}
