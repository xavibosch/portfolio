import gsap from 'gsap';
import { icon } from './icons';
import { t, applyStatic } from './i18n.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const sleevePath = 'M24 0H250C269 0 267 27 294 27H366C393 27 391 0 410 0H636Q660 0 660 24V300Q660 324 636 324H24Q0 324 0 300V24Q0 0 24 0Z';

export function createWallet(element, projects, { onSelect, onOpen, onAbout, onContact }) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let active = true;
  let expanded = true;
  let frame = 0;
  let point = { x: 0, y: 0 };
  let touchStart;
  let ignoreClickUntil = 0;
  const projectCard = slot => `<div class="wallet-card project-slip slip-${slot}"><button class="card-lift" data-slot="${slot}"><span class="slip-top"><span class="slip-number"></span><span class="slip-category" data-i18n="wallet.caseStudy">CASE STUDY</span><span class="slip-arrow" aria-hidden="true">${icon('arrow-up-right')}</span></span><span class="slip-title"></span><span class="slip-role"></span><span class="slip-image"><img alt="" draggable="false" /></span><span class="slip-foot"><span class="slip-type"></span><span class="slip-open"><span data-i18n="wallet.openCase">OPEN CASE STUDY</span> ${icon('arrow-up-right')}</span></span></button></div>`;
  element.innerHTML = `
    <div class="wallet-fit">
      <div class="wallet-shadow" aria-hidden="true"></div>
      <div class="wallet-object">
        <div class="sleeve-back" aria-hidden="true"></div>
        <div class="wallet-cards" id="wallet-cards">
          <div class="wallet-card identity-slip"><button class="card-lift" data-card="about" data-i18n-attr="aria-label:wallet.aboutLabel"><span class="slip-top"><span data-i18n="wallet.about">ABOUT ME</span><span aria-hidden="true">${icon('arrow-up-right')}</span></span><span class="identity-slip-mark">xb.</span><span class="identity-slip-name">Xavi Bosch</span><span class="identity-slip-role" data-i18n-html="wallet.aboutRole"></span><span class="identity-slip-photo"><img src="/assets/xavi-portrait.webp" alt="" draggable="false" /></span><span class="slip-foot" data-i18n="wallet.aboutFoot"></span></button></div>
          ${projectCard('previous')}${projectCard('next')}${projectCard('current')}
          <div class="wallet-card contact-slip"><button class="card-lift" data-card="contact" data-i18n-attr="aria-label:wallet.contactLabel"><span class="slip-top"><span data-i18n="wallet.connect"></span><span aria-hidden="true">${icon('arrow-up-right')}</span></span><span class="contact-slip-title" data-i18n-html="wallet.hello"></span><span class="contact-slip-symbol" aria-hidden="true">${icon('arrow-up-right')}</span><span class="slip-foot" data-i18n="wallet.contactFoot"></span></button></div>
        </div>
        <div class="sleeve-edge" aria-hidden="true"></div>
        <div class="sleeve-front">
          <div class="metal-face">
            <div class="metal-reflection" aria-hidden="true"></div>
            <div class="engraving">
              <div class="engraving-top"><span data-i18n="wallet.edition"></span><span data-i18n="wallet.est"></span></div>
              <p class="engraving-name">XAVI BOSCH<span data-i18n="wallet.portfolio"></span></p>
              <div class="engraving-description"><p data-i18n-html="wallet.desc"></p><span class="engraved-monogram" aria-hidden="true">xb.</span></div>
              <div class="engraving-bottom"><span data-i18n="wallet.bottom"></span><span>XB—001</span></div>
            </div>
          </div>
          <svg class="sleeve-outline" viewBox="0 0 660 324" fill="none" aria-hidden="true"><path d="${sleevePath}" stroke="url(#metal-rim)" stroke-width="2.5"/><defs><linearGradient id="metal-rim" x1="150" y1="0" x2="350" y2="324" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset=".45" stop-color="#fff" stop-opacity=".2"/><stop offset=".75" stop-color="#51545b"/><stop offset="1" stop-color="#eff0f3"/></linearGradient></defs></svg>
          <span class="sleeve-screw screw-left" aria-hidden="true"></span><span class="sleeve-screw screw-right" aria-hidden="true"></span>
        </div>
        <button class="eject-switch" aria-expanded="true" aria-controls="wallet-cards"><span class="eject-grip" aria-hidden="true"></span><span class="eject-label" data-i18n="wallet.push"></span></button>
      </div>
    </div>`;
  applyStatic(element);

  const fit = element.querySelector('.wallet-fit');
  const object = element.querySelector('.wallet-object');
  const shadow = element.querySelector('.wallet-shadow');
  const cards = element.querySelector('.wallet-cards');
  const eject = element.querySelector('.eject-switch');
  const slips = [...element.querySelectorAll('.project-slip')];
  const labelEject = () => eject.setAttribute('aria-label', t(expanded ? 'wallet.putAway' : 'wallet.eject'));
  labelEject();

  function size() {
    const { width, height } = element.getBoundingClientRect();
    // On a phone the side cards may run off the edges: the holder itself is
    // what has to read, and the fan shrank it to a third of the screen.
    const designWidth = width < 600 ? 870 : 1060;
    fit.style.setProperty('--wallet-scale', Math.min(width / designWidth, height / 770, 1.16));
  }
  const observer = new ResizeObserver(size);
  observer.observe(element);
  size();

  function select(index, direction = 1, animate = true) {
    selected = index;
    for (const slip of slips) {
      const button = slip.querySelector('button');
      const offset = button.dataset.slot === 'previous' ? -1 : button.dataset.slot === 'next' ? 1 : 0;
      const projectIndex = (index + offset + projects.length) % projects.length;
      const project = projects[projectIndex];
      button.dataset.index = projectIndex;
      button.setAttribute('aria-label', t('home.openLabel', { name: project.name }));
      button.querySelector('.slip-number').textContent = `${String(projectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
      button.querySelector('.slip-title').textContent = project.name;
      // The caption under the holder already names the discipline, so the
      // card itself says what the project shows.
      button.querySelector('.slip-role').textContent = project.capability || project.role;
      button.querySelector('.slip-type').textContent = project.context.toUpperCase();
      const img = button.querySelector('img');
      img.src = /\.webp$/.test(project.images[0]) ? project.images[0].replace('/assets/', '/assets/thumbs/') : project.images[0];
      slip.style.setProperty('--project-tint', project.color);
    }
    if (animate && !reduced.matches) {
      gsap.fromTo('.project-slip .slip-image, .project-slip .slip-title', { opacity: 0, x: direction * 15 }, { opacity: 1, x: 0, duration: .35, stagger: .025, ease: 'power2.out', overwrite: true });
    }
  }

  element.addEventListener('click', event => {
    const button = event.target.closest('.card-lift');
    if (!button || !active || !expanded || performance.now() < ignoreClickUntil) return;
    const projectIndex = Number(button.dataset.index);
    const open = () => {
      if (button.dataset.card === 'about') onAbout();
      else if (button.dataset.card === 'contact') onContact();
      else { onSelect(projectIndex); onOpen(); }
    };
    if (reduced.matches) { open(); return; }
    active = false;
    gsap.to(button, { y: -150, duration: .28, ease: 'power2.in', onComplete: () => {
      open();
      gsap.set(button, { clearProps: 'transform' });
    } });
  });

  element.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
  });
  element.addEventListener('pointercancel', () => { touchStart = undefined; });
  element.addEventListener('pointerup', event => {
    if (!touchStart || event.pointerType !== 'touch') return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = undefined;
    if (active && expanded && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      ignoreClickUntil = performance.now() + 400;
      onSelect((selected + (dx < 0 ? 1 : -1) + projects.length) % projects.length);
    }
  });

  eject.addEventListener('click', () => {
    expanded = !expanded;
    object.classList.toggle('is-closed', !expanded);
    cards.inert = !expanded;
    eject.setAttribute('aria-expanded', String(expanded));
    labelEject();
    element.dispatchEvent(new CustomEvent('wallet:eject', { bubbles: true }));
  });

  function updateLight() {
    frame = 0;
    object.style.setProperty('--tilt-x', `${-point.y * 5}deg`);
    object.style.setProperty('--tilt-y', `${point.x * 7}deg`);
    object.style.setProperty('--light-x', `${50 + point.x * 30}%`);
    object.style.setProperty('--light-y', `${30 + point.y * 25}%`);
    shadow.style.translate = `${point.x * -12}px ${point.y * -5}px`;
  }
  element.addEventListener('pointermove', event => {
    if (!active || reduced.matches || event.pointerType !== 'mouse') return;
    const box = element.getBoundingClientRect();
    point = { x: (event.clientX - box.left) / box.width * 2 - 1, y: (event.clientY - box.top) / box.height * 2 - 1 };
    if (!frame) frame = requestAnimationFrame(updateLight);
  });
  element.addEventListener('pointerleave', () => { point = {x: 0, y: 0}; if (!frame) frame = requestAnimationFrame(updateLight); });

  select(0, 1, false);
  if (!reduced.matches) {
    gsap.fromTo(fit, { opacity: 0 }, { opacity: 1, duration: .8, ease: 'power3.out' });
    // Animate the inner face so GSAP does not reset the responsive scale or fan angles.
    gsap.fromTo('.wallet-card .card-lift', { y: 180 }, { y: 0, duration: 1.05, stagger: .07, delay: .15, ease: 'power3.out', clearProps: 'transform' });
  }

  return {
    select,
    retranslate() { applyStatic(element); labelEject(); select(selected, 0, false); },
    setTheme() {},
    setActive(value) { active = value; },
    zoomIn() { object.classList.add('is-inspecting'); },
    zoomOut() { object.classList.remove('is-inspecting'); },
    destroy() { observer.disconnect(); if (frame) cancelAnimationFrame(frame); }
  };
}
