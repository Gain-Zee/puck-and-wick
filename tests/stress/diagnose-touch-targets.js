import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3991;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function checkTouchTargets() {
  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const width of [390, 320]) {
      console.log(`\n=== CHECKING TOUCH TARGETS AT ${width}px ===`);
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#studio', { state: 'visible', timeout: 5000 });

      const targets = await page.evaluate(() => {
        // Find all interactive elements (buttons, a.btn, inputs, etc.) in #studio
        const elements = Array.from(document.querySelectorAll('#studio button, #studio a.btn, #studio .studio-toggle-btn, #studio .apply-logo-btn'));
        return elements.map(el => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            className: el.className,
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets44px: r.height >= 43.95 && r.width >= 43.95
          };
        });
      });

      console.log(`Total interactive studio elements evaluated: ${targets.length}`);
      const failing = targets.filter(t => !t.meets44px);
      console.log(`Failing (< 44px): ${failing.length}`);
      for (const f of failing) {
        console.log(` - <${f.tag} class="${f.className}"> height=${f.height}px width=${f.width}px text="${f.text}"`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

checkTouchTargets().catch(console.error);
