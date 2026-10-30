// Review screenshots for the redesign. Not part of the test suite.
import { chromium } from 'playwright';
const out = process.argv[2];
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
async function page(w, h) { const p = await browser.newPage({ viewport: { width: w, height: h } }); p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); return p; }
let p = await page(1440, 900);
await p.goto(base); await p.waitForTimeout(2200); await p.screenshot({ path: `${out}/home-1440.png` });
await p.goto(base + '/#/index'); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/collection-1440.png` });
await p.locator('.panel-content').evaluate(el => el.scrollTo(0, 900)); await p.waitForTimeout(900); await p.screenshot({ path: `${out}/collection-1440-b.png` });
for (const slug of ['jeffrey-desk', 'reps', 'betsy']) {
  await p.goto(`${base}/#/work/${slug}`); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/${slug}-card.png` });
  const h = await p.locator('.panel-content').evaluate(el => el.scrollHeight);
  let i = 0;
  for (let y = 700; y < h && i < 14; y += 760, i++) {
    await p.locator('.panel-content').evaluate((el, y) => el.scrollTo(0, y), y); await p.waitForTimeout(1100);
    await p.screenshot({ path: `${out}/${slug}-${String(i).padStart(2, '0')}.png` });
  }
}
await p.goto(base + '/#/about'); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/about-1440.png` });
await p.goto(base + '/#/contact'); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/contact-1440.png` });
p = await page(390, 844);
await p.goto(base); await p.waitForTimeout(2200); await p.screenshot({ path: `${out}/home-390.png`, fullPage: true });
await p.goto(base + '/#/work/reps'); await p.waitForTimeout(1500);
await p.locator('.panel-content').evaluate(el => el.scrollTo(0, 1500)); await p.waitForTimeout(1100); await p.screenshot({ path: `${out}/reps-390.png` });
await p.goto(base + '/#/index'); await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/collection-390.png` });
console.log('errors:', JSON.stringify(errors));
await browser.close();
