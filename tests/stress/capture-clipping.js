import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  const { server } = await startServer(3848);
  const browser = await chromium.launch({ executablePath: SYSTEM_CHROME_PATH, headless: true });
  
  for (const w of [390, 320]) {
    const context = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3848/');
    await page.waitForTimeout(200);

    const showcase = page.locator('.stockist-showcase');
    await showcase.screenshot({ path: `tests/stress/screenshot-stockist-${w}px.png` });

    const header = page.locator('.site-header');
    await header.screenshot({ path: `tests/stress/screenshot-header-${w}px.png` });

    await context.close();
  }

  await browser.close();
  server.close();
  console.log('Screenshots captured successfully.');
})();
