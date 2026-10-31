import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  const { server } = await startServer(3846);
  const browser = await chromium.launch({ executablePath: SYSTEM_CHROME_PATH, headless: true });
  const context = await browser.newContext({ viewport: { width: 320, height: 568 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:3846/');
  await page.waitForTimeout(200);

  const diag = await page.evaluate(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const vpWidth = window.innerWidth;

    const overflowingElements = [];
    for (const el of document.querySelectorAll('body *')) {
      if (['SCRIPT', 'STYLE', 'DEFS', 'PATTERN', 'LINEARGRADIENT', 'RADIALGRADIENT', 'FILTER', 'CLIPPATHTEMPLATE'].includes(el.tagName)) continue;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      if (rect.width > vpWidth || rect.right > vpWidth) {
        overflowingElements.push({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          textSnippet: el.innerText ? el.innerText.slice(0, 30).replace(/\n/g, ' ') : '',
          width: Math.round(rect.width),
          right: Math.round(rect.right),
          padding: `${style.paddingLeft} ${style.paddingRight}`,
          margin: `${style.marginLeft} ${style.marginRight}`
        });
      }
    }

    return {
      windowInnerWidth: vpWidth,
      docScrollWidth: docEl.scrollWidth,
      docClientWidth: docEl.clientWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
      overflowingCount: overflowingElements.length,
      overflowingElements: overflowingElements.slice(0, 15)
    };
  });

  console.log('DIAGNOSTIC RESULTS @ 320px:\n', JSON.stringify(diag, null, 2));

  await browser.close();
  server.close();
})();
