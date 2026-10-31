import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3989;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function inspectStudioBleed() {
  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const width of [390, 320]) {
      console.log(`\n=== INSPECTING VIEWPORT: ${width}px ===`);
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#studio', { state: 'visible', timeout: 5000 });
      await page.waitForSelector('.jar-mockup-workbench', { state: 'visible', timeout: 5000 });

      const bleeding = await page.evaluate((vpWidth) => {
        const allElements = Array.from(document.querySelectorAll('#studio *'));
        const offending = [];

        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;
          if (rect.right > vpWidth + 1.5) {
            offending.push({
              tag: el.tagName.toLowerCase(),
              className: el.className,
              id: el.id,
              text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
              right: Math.round(rect.right),
              excess: Math.round(rect.right - vpWidth),
              outerHTML: el.outerHTML.slice(0, 120)
            });
          }
        }
        return offending;
      }, width);

      console.log(`Offending elements at ${width}px: ${bleeding.length}`);
      for (const b of bleeding) {
        console.log(` - Tag: <${b.tag}> Class: "${b.className}" ID: "${b.id}" Right: ${b.right}px Excess: ${b.excess}px`);
        console.log(`   Text: "${b.text}"`);
        console.log(`   HTML: ${b.outerHTML}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

inspectStudioBleed().catch(console.error);
