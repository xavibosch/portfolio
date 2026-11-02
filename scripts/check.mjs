import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const output = new URL('../screenshots/', import.meta.url);
const screenshotPath = filename => fileURLToPath(new URL(filename, output));
const projects = JSON.parse(await readFile(new URL('../src/projects.json', import.meta.url)));
const featured = projects.filter(p => p.featured);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', deviceScaleFactor: 1 });
page.on('pageerror', error => errors.push(error.message));

async function closePanel() {
  await page.locator('#close-panel').click();
  await page.locator('#panel').waitFor({ state: 'hidden' });
}

// Pick an actually exposed area of a fanned card, not its covered centre.
async function clickExposed(selector) {
  const point = async () => page.locator(selector).evaluate(element => {
    const box = element.getBoundingClientRect();
    const points = [];
    for (let y = Math.max(0, box.top) + 12; y < Math.min(innerHeight, box.bottom); y += 12) {
      for (let x = Math.max(0, box.left) + 12; x < Math.min(innerWidth, box.right); x += 12) {
        if (element.contains(document.elementFromPoint(x, y))) points.push({ x, y });
      }
    }
    return points[Math.floor(points.length / 3)];
  });
  let p = await point();
  assert.ok(p, `${selector} has no exposed hit area`);
  await page.mouse.move(p.x, p.y);
  await page.waitForTimeout(650);
  p = await point();
  assert.ok(p);
  await page.mouse.click(p.x, p.y);
}

try {
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  assert.match(await page.locator('h1').textContent(), /I design the interface/);
  // The holder carries five cards: the human, the three case studies, contact.
  assert.equal(await page.locator('.wallet-card').count(), 5);
  assert.deepEqual(featured.map(p => p.slug), ['jeffrey-desk', 'reps', 'betsy']);
  assert.deepEqual((await page.locator('.project-slip .slip-title').allTextContents()).sort(), featured.map(p => p.name).sort());
  assert.deepEqual(await page.locator('.featured-chip').allTextContents(), featured.map((p, i) => `0${i + 1}${p.name}`));
  assert.match(await page.locator('.availability').textContent(), /SUMMER 2027/);
  await page.screenshot({ path: screenshotPath('desktop.png'), fullPage: true });

  await page.mouse.move(720, 350);
  await page.mouse.wheel(0, -80);
  await page.waitForFunction(name => document.querySelector('#project-title').textContent === name, featured.at(-1).name);
  await page.waitForTimeout(170);
  await page.mouse.wheel(0, -80);
  await page.waitForFunction(name => document.querySelector('#project-title').textContent === name, featured.at(-2).name);
  await page.mouse.wheel(80, 0);
  await page.waitForFunction(name => document.querySelector('#project-title').textContent === name, featured.at(-1).name);
  await page.mouse.wheel(-80, 0);
  await page.waitForFunction(name => document.querySelector('#project-title').textContent === name, featured.at(-2).name);
  await page.locator('.featured-chip').first().click();
  await page.keyboard.press('Space');
  await page.locator('.pcard-title h2').waitFor();
  assert.equal(await page.locator('.pcard-title h2').textContent(), projects[0].name);
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(name => document.querySelector('.pcard-title h2')?.textContent === name, projects[1].name);
  await page.keyboard.press('ArrowLeft');
  await page.waitForFunction(name => document.querySelector('.pcard-title h2')?.textContent === name, projects[0].name);
  await closePanel();

  await page.locator('#next-project').click();
  assert.equal(await page.locator('#project-title').textContent(), 'Reps');
  await page.waitForTimeout(350);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#project-title').textContent(), 'Betsy');
  await page.waitForTimeout(350);
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#project-title').textContent(), 'Reps');
  await page.locator('.featured-chip').first().click();
  await clickExposed('.slip-current .card-lift');
  await page.locator('.pcard-title h2').waitFor();
  assert.equal(await page.locator('.pcard-title h2').textContent(), 'Jeffrey Desk');
  // The card turns over to show the work; while it is turned the arrows
  // browse images, and Escape turns it back before it closes anything.
  await page.locator('.pcard-front').click({ position: { x: 300, y: 200 } });
  await page.waitForFunction(() => document.querySelector('.pcard')?.dataset.side === 'back');
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.pcard-front').isHidden(), true);
  await page.getByRole('button', { name: 'Next image', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#image-counter')?.textContent.startsWith('02'));
  assert.equal(await page.locator('.pcard-dots [data-image="1"]').getAttribute('aria-pressed'), 'true');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('#image-counter')?.textContent.startsWith('03'));
  assert.equal(await page.locator('.pcard-title h2').textContent(), projects[0].name);
  await page.waitForTimeout(500);
  await page.screenshot({ path: screenshotPath('card-back.png') });
  await page.getByRole('button', { name: 'Enlarge this image' }).click();
  await page.locator('.lightbox[open]').waitFor();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.lightbox img').getAttribute('src'), projects[0].images[3]);
  await page.keyboard.press('Escape');
  await page.locator('.lightbox').waitFor({ state: 'hidden' });
  await page.waitForFunction(() => document.querySelector('#image-counter')?.textContent.startsWith('04'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.pcard')?.dataset.side === 'front');
  assert.equal(await page.locator('#panel').evaluate(el => el.open), true);
  // A featured project has the full case study under the card.
  await page.getByRole('button', { name: /Read full case study/ }).click();
  await page.waitForFunction(() => document.querySelector('#full-case').getBoundingClientRect().top < innerHeight / 2);
  assert.equal(await page.locator('.cs-section').count(), 13);
  assert.ok(await page.locator('.cs-claims li').count() > 5);
  assert.equal(await page.locator('.cs-decision').count(), 1);
  await page.locator('.cs-toc [data-goto="cs-decision"]').click();
  await page.waitForFunction(() => document.querySelector('.cs-toc [data-goto="cs-decision"]')?.hasAttribute('aria-current'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: screenshotPath('case-decision.png') });
  await page.locator('#cs-interaction [data-zoom]').first().click();
  await page.locator('.lightbox[open]').waitFor();
  assert.match(await page.locator('.lightbox-caption').textContent(), /REAL SCREENSHOT|Real screenshot/i);
  await page.keyboard.press('Escape');
  await page.locator('.lightbox').waitFor({ state: 'hidden' });
  assert.equal(await page.locator('#panel').evaluate(el => el.open), true);
  await page.getByRole('button', { name: /Back to the collection/ }).click();
  await page.locator('.col-card').first().waitFor();
  // Other projects keep the interactive story deck.
  await page.evaluate(() => { location.hash = '#/work/haptic-hunter'; });
  await page.waitForFunction(() => document.querySelector('.pcard-title h2')?.textContent === 'Haptic Hunter');
  assert.equal(await page.locator('#full-case').count(), 0);
  await page.getByRole('button', { name: /Read the story/ }).click();
  await page.waitForFunction(() => document.querySelector('#full-story').getBoundingClientRect().top < innerHeight / 2);
  // The story is a deck: the arrows deal the top card to the back, a
  // chapter tab jumps straight to its card, and a drag deals it away.
  await page.getByRole('button', { name: 'Next story card' }).click();
  await page.waitForFunction(() => document.querySelector('#deck-count')?.textContent.startsWith('02'));
  assert.equal(await page.locator('#deck-tab-1').getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('#deck-card-0').evaluate(el => el.inert), true);
  await page.locator('#deck-tab-3').click();
  await page.waitForFunction(() => document.querySelector('#deck-count')?.textContent.startsWith('04'));
  await page.waitForTimeout(900);
  const top = await page.locator('#deck-card-3').boundingBox();
  await page.mouse.move(top.x + top.width / 2, top.y + top.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(top.x + top.width / 2 - i * 20, top.y + top.height / 2);
  await page.mouse.up();
  await page.waitForFunction(() => document.querySelector('#deck-count')?.textContent.startsWith('05'));
  await page.waitForTimeout(900);
  await page.screenshot({ path: screenshotPath('story-deck.png') });
  await closePanel();

  await clickExposed('.identity-slip .card-lift');
  await page.locator('.id-card').waitFor();
  await page.mouse.move(1400, 50);
  await page.waitForTimeout(600);
  await page.locator('.id-card').focus();
  const beforeFlip = await page.locator('.id-card').getAttribute('aria-pressed');
  await page.keyboard.press('Enter');
  assert.notEqual(await page.locator('.id-card').getAttribute('aria-pressed'), beforeFlip);
  await page.waitForTimeout(600);
  await page.screenshot({ path: screenshotPath('about.png'), fullPage: true });
  await closePanel();

  await clickExposed('.contact-slip .card-lift');
  await page.locator('.contact-mail').waitFor();
  assert.match(await page.locator('.contact-mail').textContent(), /bosch.xavii@gmail.com/);
  await closePanel();

  await page.locator('.eject-switch').click();
  assert.equal(await page.locator('.eject-switch').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('.wallet-cards').evaluate(el => el.inert), true);
  await page.mouse.move(1400, 50);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: screenshotPath('closed.png'), fullPage: true });
  await page.locator('.eject-switch').click();
  assert.equal(await page.locator('.eject-switch').getAttribute('aria-expanded'), 'true');

  // The collection: every project, grouped, each card saying what it is.
  await page.locator('#archive-button').click();
  await page.locator('.col-card').first().waitFor();
  assert.equal(await page.locator('.col-card').count(), 11);
  assert.equal(await page.locator('#group-case-study .col-card').count(), 3);
  for (const label of ['Why', 'What I did', 'Shows']) assert.equal(await page.locator(`.col-facts b:text-is("${label}")`).count(), 11);
  await page.locator('.col-jump [data-group="university"]').click();
  await page.waitForFunction(() => { const g = document.querySelector('#group-university').getBoundingClientRect(); return g.top < innerHeight * .6; });
  await page.locator('.col-card', { hasText: 'Remote Robot Car' }).click();
  await page.waitForFunction(() => document.querySelector('.pcard-title h2')?.textContent === 'Remote Robot Car');
  await page.locator('.pcase-crumbs [data-action="collection"]').click();
  await page.locator('.col-card').first().waitFor();
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  await page.screenshot({ path: screenshotPath('collection.png') });
  await page.locator('.panel-nav [data-view="about"]').click();
  await page.locator('.id-card').waitFor();
  assert.equal(await page.locator('.panel-nav [data-view="about"]').getAttribute('aria-current'), 'page');
  await page.locator('.panel-nav [data-view="contact"]').click();
  await page.locator('.contact-card').waitFor();
  assert.equal(await page.locator('.panel-nav [data-view="contact"]').getAttribute('aria-current'), 'page');
  await closePanel();

  // Vito: opens, answers (from a stubbed endpoint, so the test never spends
  // the free API quota), turns portfolio links into links, follows the folio
  // into the panel, and Escape closes his chat before the folio.
  await page.route('**/api/chat', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'Xavi built Reps for his garage gym. [Read the decision](#/work/reps)' }));
  await page.locator('.vito-launch').click();
  await page.locator('.vito-chat').waitFor();
  assert.equal(await page.locator('.vito-launch').getAttribute('aria-expanded'), 'true');
  // Scrolling inside the chat must not flip the cardholder's case studies.
  const before = await page.locator('#project-title').textContent();
  const log = await page.locator('.vito-log').boundingBox();
  await page.mouse.move(log.x + log.width / 2, log.y + log.height / 2);
  await page.mouse.wheel(0, 240);
  await page.waitForTimeout(400);
  assert.equal(await page.locator('#project-title').textContent(), before);
  // The open chat keeps a clear gap under the header.
  await page.waitForTimeout(700);
  const chatBox = await page.locator('.vito-chat').boundingBox();
  const headerBottom = await page.locator('.header').evaluate(el => el.getBoundingClientRect().bottom);
  assert.ok(chatBox.y >= headerBottom, 'Vito chat overlaps the header');
  // Dragging the top-left corner grows it up and to the left; its bottom-right stays put.
  await page.mouse.move(chatBox.x + 12, chatBox.y + 12);
  await page.mouse.down();
  await page.mouse.move(chatBox.x - 140, chatBox.y - 400, { steps: 6 });
  await page.mouse.up();
  const grown = await page.locator('.vito-chat').boundingBox();
  assert.ok(grown.width > chatBox.width + 100, 'chat did not get wider');
  assert.ok(Math.abs(grown.x + grown.width - chatBox.x - chatBox.width) < 2 && Math.abs(grown.y + grown.height - chatBox.y - chatBox.height) < 2, 'chat moved instead of growing');
  assert.ok(grown.y >= headerBottom, 'resized chat went over the header');
  // Expanded, it takes the size of an open project, and shrinks back.
  await page.locator('[data-vito="expand"]').click();
  await page.waitForTimeout(800);
  const big = await page.locator('.vito-chat').boundingBox();
  assert.ok(big.width > 1200 && big.height > 750, `expanded chat too small: ${big.width}x${big.height}`);
  await page.locator('[data-vito="expand"]').click();
  await page.waitForTimeout(800);
  assert.ok(Math.abs((await page.locator('.vito-chat').boundingBox()).width - grown.width) < 2);
  await page.locator('.vito-chat').evaluate(el => el.querySelector('.vito-grip').dispatchEvent(new MouseEvent('dblclick', { bubbles: true })));
  // One language switch for the whole site: the header, the cards and Vito follow it.
  assert.equal(await page.locator('.vito-langs').count(), 0);
  await page.locator('.location [data-set-lang="ca"]').click();
  assert.match(await page.locator('#vito-input').getAttribute('placeholder'), /Pregunta sobre/);
  assert.equal(await page.locator('#index-button [data-i18n]').textContent(), 'La col·lecció');
  assert.equal(await page.locator('html').getAttribute('lang'), 'ca');
  assert.equal(await page.getAttribute('.footer-cv', 'href'), '/Xavi-Bosch-CV-CA.pdf', 'the CV link follows the language');
  assert.equal(await page.locator('.location [data-set-lang="ca"]').getAttribute('aria-pressed'), 'true');
  await page.locator('.location [data-set-lang="en"]').click();
  assert.equal(await page.locator('#index-button [data-i18n]').textContent(), 'The collection');
  await page.locator('#vito-input').fill('What is Reps?');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('.vito-msg:last-child .vito-text a[href="#/work/reps"]'));
  await page.locator('.vito-msg:last-child .vito-text a').click();
  await page.waitForFunction(() => document.querySelector('.pcard-title h2')?.textContent === 'Reps');
  assert.equal(await page.locator('.vito').evaluate(el => el.classList.contains('is-in-panel')), true);
  // The switch in the folio's rim re-renders the open case study in place.
  await page.locator('.panel-lang [data-set-lang="es"]').click();
  await page.waitForFunction(() => document.querySelector('.cs-toc-title')?.textContent === 'En este caso');
  assert.equal(await page.locator('.pcard-title h2').textContent(), 'Reps');
  assert.match(await page.locator('.cs-lede').textContent(), /gimnasio de garaje/);
  await page.locator('.panel-lang [data-set-lang="en"]').click();
  await page.waitForFunction(() => document.querySelector('.cs-toc-title')?.textContent === 'In this case');
  await page.locator('.vito-close').click();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.vito').getAttribute('data-pose'), 'lie');
  await page.locator('.vito-launch').click();
  await page.locator('.vito-chat').waitFor();
  assert.equal(await page.locator('.vito-chat').isVisible(), true);
  await page.locator('#vito-input').focus();
  await page.keyboard.press('Escape');
  await page.locator('.vito-chat').waitFor({ state: 'hidden' });
  assert.equal(await page.locator('#panel').evaluate(el => el.open), true);
  await page.unroute('**/api/chat');
  await closePanel();
  assert.equal(await page.locator('.vito').evaluate(el => el.parentElement === document.body), true);

  for (const project of projects) {
    await page.evaluate(slug => { location.hash = `#/work/${slug}`; }, project.slug);
    await page.waitForFunction(name => document.querySelector('.pcard-title h2')?.textContent === name, project.name);
    await page.waitForFunction(() => {
      const img = document.querySelector('.pcard-slide img');
      return img?.complete && img.naturalWidth > 0;
    });
    assert.equal(await page.locator('#project-title').textContent(), project.name);
    assert.doesNotMatch(await page.locator('.pcase').innerText(), /\[Cal |SENSE PROVA/, `${project.name} shows an editing note`);
  }
  // Every card's engraved text has to fit on the card at small laptop sizes.
  for (const [width, height] of [[1280, 720], [1024, 768], [1366, 680]]) {
    await page.setViewportSize({ width, height });
    for (const project of projects) {
      await page.evaluate(slug => { location.hash = `#/work/${slug}`; }, project.slug);
      await page.waitForFunction(name => document.querySelector('.pcard-title h2')?.textContent === name, project.name);
      const fit = await page.locator('.pcard-front').evaluate(el => ({ fits: el.scrollHeight <= el.clientHeight + 1, card: el.getBoundingClientRect().width }));
      assert.ok(fit.fits && fit.card > 500, `${project.name} card does not fit at ${width}x${height}`);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const view of ['', 'index', 'about', 'contact', 'work/reps']) {
    await page.evaluate(view => { location.hash = `#/${view}`; }, view);
    await page.waitForTimeout(400);
    assert.doesNotMatch(await page.locator('body').innerText(), /[↗↻⤢⧉✓◐◑]/u, `A Unicode symbol that iOS draws as emoji is back in #/${view}`);
  }
  await closePanel();
  await page.locator('.featured-chip').first().click();
  await page.locator('#theme-button').click();
  await page.mouse.move(1400, 20);
  await page.waitForTimeout(700);
  await page.screenshot({ path: screenshotPath('dark.png'), fullPage: true });
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.evaluate(() => { location.hash = '#/contact'; });
  await page.locator('.contact-card').waitFor();
  await page.waitForTimeout(650);
  await page.screenshot({ path: screenshotPath('contact-dark.png'), fullPage: true });
  await closePanel();
  await page.locator('#theme-button').click();

  for (const [width, height] of [[1920,1080], [1024,768], [768,1024], [390,844], [360,740]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(100);
    const geometry = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
      scale: parseFloat(getComputedStyle(document.querySelector('.wallet-fit')).scale),
    }));
    assert.ok(geometry.width <= geometry.viewport, `Horizontal overflow at ${width}`);
    assert.ok(geometry.scale > .2 && geometry.scale < 1.2);
    if (width === 390) await page.screenshot({ path: screenshotPath('mobile.png'), fullPage: true });
    for (const view of ['index', 'about', 'contact', 'work/jeffrey-desk']) {
      await page.evaluate(view => { location.hash = `#/${view}`; }, view);
      await page.waitForFunction(view => document.querySelector('#panel')?.open && document.querySelector('#panel')?.dataset.view === view.split('/')[0], view);
      const panelGeometry = await page.locator('.panel-content').evaluate(el => ({ width: el.scrollWidth, viewport: el.clientWidth }));
      assert.ok(panelGeometry.width <= panelGeometry.viewport + 1, `Panel overflow in ${view} at ${width}`);
      if (view.startsWith('work') && width <= 430) {
        await page.locator('.pcard-turn').click();
        await page.waitForFunction(() => document.querySelector('.pcard')?.dataset.side === 'back');
        await page.waitForTimeout(1000);
        const back = await page.locator('.pcard-track').evaluate(el => el.getBoundingClientRect().height);
        assert.ok(back > 200, `Image track too small on a phone at ${width}: ${back}`);
        if (width === 390) await page.screenshot({ path: screenshotPath('card-back-390.png') });
        await page.getByRole('button', { name: 'Turn the card back over' }).click();
        await page.waitForFunction(() => document.querySelector('.pcard')?.dataset.side === 'front');
      }
      if (width === 390 || width === 1920) {
        await page.waitForTimeout(650);
        await page.screenshot({ path: screenshotPath(`${view.split('/')[0]}-${width}.png`), fullPage: true });
      }
    }
    await closePanel();
  }
  await page.locator('#open-project').click();
  await page.locator('.pcard-title h2').waitFor();
  await closePanel();

  const reduced = await browser.newPage({ viewport: {width: 1440, height: 900}, reducedMotion: 'reduce', colorScheme: 'light' });
  reduced.on('pageerror', error => errors.push(error.message));
  await reduced.goto(base);
  await reduced.locator('.wallet-card').first().waitFor();
  assert.equal(await reduced.locator('.wallet-fit').evaluate(el => getComputedStyle(el).opacity), '1');
  await reduced.locator('#open-project').click();
  await reduced.locator('.pcard-title h2').waitFor();
  await reduced.keyboard.press('Escape');
  await reduced.locator('#panel').waitFor({state: 'hidden'});
  await reduced.close();
  assert.deepEqual(errors, []);
  console.log('PASS: Vito, five-card holder, featured picker, grouped collection, three full case studies with section index and zoom, project cards and story deck, About, Contact, eject, theme, keyboard, reduced motion, and panel layouts at five viewport sizes.');
} finally {
  await browser.close();
}
