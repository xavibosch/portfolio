// Review screenshots in one theme. Not part of the test suite.
import { chromium } from 'playwright';
const [out, theme = 'dark', w = 1440, h = 900] = process.argv.slice(2);
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const browser = await chromium.launch({ channel: 'chrome' });
const p = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
const errors = []; p.on('pageerror', e => errors.push(e.message));
await p.addInitScript(t => localStorage.setItem('theme', t), theme);
const shot = async name => p.screenshot({ path: `${out}/${theme}-${w}-${name}.png` });
await p.goto(base); await p.waitForTimeout(2300); await shot('home');
for (const view of ['index', 'about', 'contact', 'work/jeffrey-desk', 'work/haptic-hunter']) {
  await p.goto(`${base}/#/${view}`); await p.waitForTimeout(1500); await shot(view.replace('/', '-'));
  const fit = await p.locator('.panel-content').evaluate(el => ({ scroll: el.scrollHeight, client: el.clientHeight }));
  console.log(view, JSON.stringify(fit));
}
await p.locator('.pcard-front').click({ position: { x: 300, y: 200 } }); await p.waitForTimeout(1500); await shot('card-back');
await p.goto(`${base}/#/work/reps`); await p.waitForTimeout(1300);
await p.locator('[data-action="case"]').click(); await p.waitForTimeout(1300); await shot('case-top');
await p.locator('[data-goto="cs-decision"]').click(); await p.waitForTimeout(1300); await shot('case-decision');
await p.locator('[data-goto="cs-validation"]').click(); await p.waitForTimeout(1300); await shot('case-validation');
console.log('errors', JSON.stringify(errors));
await browser.close();
