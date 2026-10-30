import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';

/* Phone checks: the headline clears the holder, the case studies loop as a
   carousel, Vito's chat fills the screen from any view without iOS zoom,
   and the collection filters to one group. Run against `npm run dev`. */
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4186';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  for (const device of ['iPhone SE', 'iPhone 14 Pro Max']) {
    const page = await (await browser.newContext({ ...devices[device], colorScheme: 'dark' })).newPage();
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/api/chat', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'Hi.' }));
    await page.goto(base);
    await page.waitForTimeout(1800);
    const gap = await page.evaluate(() => Math.min(...[...document.querySelectorAll('.wallet-card')].map(c => c.getBoundingClientRect().top)) - document.querySelector('.studio-note').getBoundingClientRect().bottom);
    assert.ok(gap >= 18, `${device}: headline overlaps the cards (${gap}px)`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, `${device}: page scrolls sideways`);
    assert.ok(await page.locator('.header-lang [data-set-lang="ca"]').isVisible(), `${device}: language switch not in the header`);

    // The holder keeps one size whatever the project or the language, and the
    // caption below never reaches it.
    const holder = () => page.evaluate(() => {
      const sleeve = document.querySelector('.sleeve-front').getBoundingClientRect();
      return { width: Math.round(sleeve.width), gap: Math.round(document.querySelector('.selected-project').getBoundingClientRect().top - sleeve.bottom) };
    });
    const first = await holder();
    for (const step of ['next', 'next', 'lang-ca', 'lang-es', 'lang-en']) {
      if (step === 'next') await page.tap('#next-project');
      else await page.tap(`.header-lang [data-set-lang="${step.slice(5)}"]`);
      await page.waitForTimeout(500);
      const now = await holder();
      assert.ok(Math.abs(now.width - first.width) <= 1 && now.gap >= 10, `${device} ${step}: holder ${now.width}px (was ${first.width}), gap ${now.gap}`);
    }
    // Vito keeps clear of the caption's open button.
    assert.equal(await page.evaluate(() => {
      const a = document.querySelector('.vito-launch').getBoundingClientRect(), b = document.querySelector('#open-project').getBoundingClientRect();
      return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    }), false, `${device}: Vito covers the open button`);

    // Three swipes from the first card go round to the first card again.
    await page.locator('#home-more').scrollIntoViewIfNeeded();
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => { const list = document.querySelector('.hm-list'); list.scrollBy({ left: list.querySelector('.hm-card').offsetWidth + 12, behavior: 'smooth' }); });
      await page.waitForTimeout(700);
    }
    assert.equal(await page.getAttribute('[data-hm-dot][aria-current="true"]', 'data-hm-dot'), '0', `${device}: carousel does not loop`);

    await page.evaluate(() => scrollTo(0, 0));
    await page.locator('.vito-launch').click();
    await page.waitForTimeout(800);
    const chat = await page.locator('.vito-chat').boundingBox();
    const size = page.viewportSize();
    assert.ok(chat.x === 0 && chat.y === 0 && chat.width === size.width && Math.abs(chat.height - size.height) < 2, `${device}: chat is not full screen`);
    assert.equal(await page.locator('#vito-input').evaluate(e => getComputedStyle(e).fontSize), '16px');
    assert.notEqual(await page.evaluate(() => document.activeElement.id), 'vito-input', `${device}: opening the chat raised the keyboard`);
    await page.locator('.vito-close').click();
    await page.waitForTimeout(500);
    assert.equal(await page.locator('.vito-chat').isHidden(), true);

    await page.goto(`${base}/#/about`);
    await page.waitForTimeout(1400);
    await page.tap('.id-card');
    await page.waitForTimeout(600);
    assert.equal(await page.locator('.id-card').evaluate(el => el.classList.contains('is-flipped')), true, `${device}: About card does not turn on a tap`);

    await page.goto(`${base}/#/index`);
    await page.waitForTimeout(1400);
    await page.locator('.col-jump [data-group="prototype"]').click();
    await page.waitForTimeout(600);
    assert.equal(await page.locator('.col-group:visible').count(), 1, `${device}: filter shows other groups`);
    await page.locator('.col-jump [data-group="all"]').click();
    await page.waitForTimeout(400);
    assert.ok(await page.locator('.col-group:visible').count() > 1);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS (mobile): headline clear of the holder, one holder size across projects and languages, header language switch, Vito clear of the open button, looping case-study carousel, full-screen Vito chat without the keyboard, About card turns on tap, collection filter.');
} finally {
  await browser.close();
}
