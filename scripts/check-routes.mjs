// Real addresses: every view has its own built page, the folio follows the
// address bar without reloading, old hash links still land, and a browser
// without JavaScript gets a complete page. Run against a build:
//   npm run build && PORTFOLIO_URL=http://127.0.0.1:4321 node scripts/check-routes.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url)));
const browser = await chromium.launch();
const errors = [];
const open = async (mode = 'creative') => {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  page.on('pageerror', e => errors.push(e.message));
  if (mode) await page.addInitScript(m => { try { localStorage.setItem('mode', m); } catch {} }, mode);
  await page.route('**/api/chat', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'Hi.' }));
  return page;
};
const path = page => new URL(page.url()).pathname + new URL(page.url()).hash;
const panelOpen = page => page.evaluate(() => document.querySelector('#panel').matches('[open]:modal'));

try {
  // Every built page names itself: one h1, its own title, canonical and preview.
  for (const route of ['/', '/work', '/about', '/contact', ...projects.map(p => `/work/${p.slug}`)]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, `${route} is not built`);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, `https://boschwebs.website${route === '/' ? '' : route}`, `${route}: canonical`);
    for (const tag of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card', 'twitter:image']) assert.match(html, new RegExp(`(property|name)="${tag}" content="[^"]+"`), `${route}: ${tag}`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: needs exactly one h1`);
  }
  const betsy = await (await fetch(`${base}/work/betsy`)).text();
  assert.match(betsy, /The Firestore rules are where the truth lives/, 'the case study text is not in the built page');
  assert.match(betsy, /<title>Betsy — Xavier Bosch<\/title>/);
  assert.equal((await fetch(`${base}/no-such-page`)).status, 404, 'an unknown address should be a 404');

  // Opened straight from its address, a project opens in the folio as before.
  let page = await open();
  await page.goto(`${base}/work/betsy`);
  await page.waitForTimeout(1500);
  assert.equal(await panelOpen(page), true, '/work/betsy does not open the folio');
  assert.match(await page.locator('#panel-content .pcard-title h2').innerText(), /Betsy/);
  assert.equal(await page.title(), 'Betsy — Xavier Bosch');

  // Moving around changes the address without reloading the page.
  await page.evaluate(() => { window.__sameDocument = true; });
  await page.locator('[data-action="next-case"]').click();
  await page.waitForTimeout(1200);
  assert.equal(path(page), '/work/nevera-bosch', 'next project does not change the address');
  await page.locator('.panel-nav a[href="/work"]').click();
  await page.waitForTimeout(1200);
  assert.equal(path(page), '/work');
  await page.locator('.col-card[href="/work/reps"]').click();
  await page.waitForTimeout(1200);
  assert.equal(path(page), '/work/reps');
  assert.equal(await page.evaluate(() => window.__sameDocument), true, 'a link inside the site reloaded the page');

  // Back and forward walk the same history the hash links did.
  await page.goBack(); await page.waitForTimeout(1000);
  assert.equal(path(page), '/work');
  assert.ok(await page.locator('.collection').isVisible(), 'back did not return to the collection');
  await page.goForward(); await page.waitForTimeout(1000);
  assert.equal(path(page), '/work/reps');
  await page.keyboard.press('Escape'); await page.waitForTimeout(900);
  assert.equal(path(page), '/', 'Escape does not put the card back');
  assert.equal(await panelOpen(page), false);
  assert.equal(await page.evaluate(() => window.__sameDocument), true, 'closing reloaded the page');

  // From the holder, Space opens the selected case study (still Reps) at its address.
  await page.keyboard.press('Space'); await page.waitForTimeout(1200);
  assert.equal(path(page), '/work/reps');
  await page.close();

  // A link shared before the site had addresses lands on the real one.
  page = await open();
  await page.goto(`${base}/#/work/reps`);
  await page.waitForTimeout(1500);
  assert.equal(path(page), '/work/reps', 'the old hash link was not moved onto the real address');
  assert.equal(await panelOpen(page), true);
  await page.goto(`${base}/#/index`); await page.waitForTimeout(1500);
  assert.equal(path(page), '/work');
  // An unknown address falls back to the holder, as an unknown hash did.
  await page.goto(`${base}/no-such-page`); await page.waitForTimeout(1200);
  assert.equal(path(page), '/');
  assert.equal(await panelOpen(page), false);
  await page.close();

  // A first visit lands on the Product view; the switch moves to the
  // cardholder and the choice survives a reload.
  page = await open(null);
  await page.goto(`${base}/`); await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(() => document.documentElement.dataset.mode), 'product', 'a first visit should land on Product');
  assert.ok(await page.locator('#product .pm-title').isVisible());
  assert.equal(await page.locator('#app').isVisible(), false, 'the holder shows in Product');
  assert.equal(await page.locator('h1:visible').count(), 1, 'Product needs exactly one visible h1');
  await page.locator('.pm-switch [data-set-mode="creative"]').click(); await page.waitForTimeout(1400);
  assert.equal(await page.locator('.wallet-card').count(), 5, 'the holder was not built on the switch');
  await page.reload(); await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(() => document.documentElement.dataset.mode), 'creative', 'the choice was not remembered');
  await page.locator('.holder-switch [data-set-mode="product"]').click(); await page.waitForTimeout(1200);
  assert.ok(await page.locator('#product').isVisible());
  // Arrow keys and the wheel scroll the Product page instead of moving cards.
  await page.mouse.wheel(0, 600); await page.waitForTimeout(600);
  assert.ok(await page.evaluate(() => scrollY) > 200, 'the wheel does not scroll the Product page');
  // A project opens in the folio from Product too, and closing goes back to it.
  await page.locator('.pm-row summary').first().click();
  assert.ok(await page.locator('.pm-row[open] .pm-answers').first().isVisible(), 'an index row does not open');
  await page.locator('.pm-case h3 a[href="/work/reps"]').click(); await page.waitForTimeout(1200);
  assert.equal(path(page), '/work/reps');
  await page.keyboard.press('Escape'); await page.waitForTimeout(900);
  assert.equal(path(page), '/');
  assert.ok(await page.locator('#product').isVisible());
  await page.close();

  // Without JavaScript: the Product view, with every project and real links.
  const plain = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })).newPage();
  await plain.goto(`${base}/`);
  const links = await plain.locator('#product a[href^="/work/"]').evaluateAll(as => [...new Set(as.map(a => a.getAttribute('href')))]);
  assert.equal(links.length, projects.length, 'no-JS home should link every project');
  assert.ok(await plain.locator('#product .pm-title').isVisible());
  assert.equal(await plain.locator('#app').isVisible(), false);
  await plain.goto(`${base}/work/betsy`);
  assert.ok(await plain.locator('#panel').isVisible(), 'no-JS project page hides its folio');
  assert.ok(await plain.getByText('The Firestore rules are where the truth lives').first().isVisible());
  assert.ok(await plain.locator('.noscript-close').isVisible(), 'no-JS page has no way back');
  await plain.goto(`${base}/work/gesture-tv`);
  assert.equal(await plain.locator('.deck-card:visible').count(), await plain.locator('.deck-card').count(), 'no-JS story deck hides chapters');
  await plain.close();

  assert.deepEqual(errors, [], 'page errors');
  console.log('PASS (routes): Product by default and the switch remembered, every page built with its own title, canonical and preview, one h1 each, folio from a real address, links and history without reloading, old hash links, 404, and a complete page without JavaScript.');
} finally {
  await browser.close();
}
