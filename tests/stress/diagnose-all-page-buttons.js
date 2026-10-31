import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3992;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function auditAllPageButtons() {
  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const width of [390, 320]) {
      console.log(`\n========================================`);
      console.log(` AUDITING ALL BUTTONS AT ${width}px`);
      console.log(`========================================`);
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      const report = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button:not([hidden]), a.btn:not([hidden]), [role="button"]:not([hidden])'));
        const visible = buttons.filter(b => {
          const r = b.getBoundingClientRect();
          const cs = window.getComputedStyle(b);
          return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
        });

        const below44px = visible.map(b => {
          const r = b.getBoundingClientRect();
          return {
            tag: b.tagName.toLowerCase(),
            id: b.id || '',
            className: b.className || '',
            text: (b.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meetsMinHeight: r.height >= 43.95,
            meetsMinWidth: r.width >= 43.95
          };
        }).filter(b => !b.meetsMinHeight);

        return {
          totalVisible: visible.length,
          failingCount: below44px.length,
          failing: below44px
        };
      });

      console.log(`Total visible buttons/actions: ${report.totalVisible}`);
      console.log(`Failing height < 44px: ${report.failingCount}`);
      for (const f of report.failing) {
        console.log(` - <${f.tag} id="${f.id}" class="${f.className}"> height=${f.height}px width=${f.width}px text="${f.text}"`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

auditAllPageButtons().catch(console.error);
