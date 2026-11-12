// Link-preview images (1200×630) for every built page, taken from the site
// itself: the holder for the home, the open folio for the rest.
//   npm run build, serve dist, then: PORTFOLIO_URL=http://127.0.0.1:4321 npm run og
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url)));
const out = new URL('../public/og/', import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: 'light' });
  await page.addInitScript(() => { try { localStorage.setItem('lang', 'en'); localStorage.setItem('theme', 'light'); } catch {} });
  // Vito's greeting would sit over the work in every picture.
  await page.route('**/assets/vito/**', route => route.abort());
  for (const [name, route] of [['home', '/'], ['work', '/work'], ['about', '/about'], ['contact', '/contact'], ...projects.map(p => [p.slug, `/work/${p.slug}`])]) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2200);
    await page.screenshot({ path: fileURLToPath(new URL(`${name}.jpg`, out)), type: 'jpeg', quality: 84 });
    process.stdout.write(`${name}.jpg `);
  }
} finally {
  await browser.close();
}
