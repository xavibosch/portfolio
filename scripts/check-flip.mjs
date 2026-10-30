import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { webkit } from 'playwright';

const output = new URL('../screenshots/flip-fixed/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await webkit.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  for (const selector of ['#contact-button', '#index-button', '#theme-button', '#archive-button']) {
    await page.locator(selector).hover();
    const style = await page.locator(selector).evaluate(el => ({ outline: getComputedStyle(el).outlineStyle, shadow: getComputedStyle(el).boxShadow }));
    assert.equal(style.outline, 'none', `${selector} must highlight without a hover outline`);
    assert.notEqual(style.shadow, 'none');
  }
  await page.locator('#about-button').click();
  await page.locator('.id-card').waitFor();
  await page.waitForTimeout(700);
  const photoStyle = await page.locator('.card-back img').evaluate(el => ({ filter: getComputedStyle(el).filter, position: getComputedStyle(el).objectPosition }));
  assert.deepEqual(photoStyle, { filter: 'none', position: '50% 22%' });
  assert.equal(await page.locator('.card-back-tag').evaluate(el => getComputedStyle(el).backdropFilter), 'none');
  const box = await page.locator('.id-card').boundingBox();
  for (const side of [.3, .7]) {
    await page.mouse.move(1400, 50);
    await page.waitForTimeout(950);
    await page.mouse.move(box.x + box.width * side, box.y + box.height * .5);
    for (const [label, delay] of [['turning', 150], ['settled', 950]]) {
      await page.waitForTimeout(delay);
      await page.screenshot({ path: fileURLToPath(new URL(`webkit-${side}-${label}.png`, output)), clip: { x: 70, y: 205, width: 650, height: 540 } });
    }
    assert.equal(await page.locator('.id-card').getAttribute('aria-pressed'), 'true');
  }
  await page.locator('#close-panel').click();
  await page.locator('#panel').waitFor({ state: 'hidden' });
  await page.keyboard.press('Space');
  await page.waitForFunction(() => document.querySelector('.case-heading h2')?.textContent === 'Jeffrey Desk');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('.case-heading h2')?.textContent === 'Reps');
  await page.keyboard.press('ArrowLeft');
  await page.waitForFunction(() => document.querySelector('.case-heading h2')?.textContent === 'Jeffrey Desk');
  assert.deepEqual(errors, []);
  console.log('PASS: WebKit portrait crop, filter-free flip, hover without outlines, Space, next/right and previous/left.');
} finally { await browser.close(); }
