import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  const { server } = await startServer(3847);
  const browser = await chromium.launch({ executablePath: SYSTEM_CHROME_PATH, headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:3847/');
  await page.waitForTimeout(200);

  const stockistDiag = await page.evaluate(() => {
    const section = document.querySelector('.stockist-section');
    const container = document.querySelector('.stockist-section .container');
    const showcase = document.querySelector('.stockist-showcase');
    const content = document.querySelector('.stockist-content');
    const details = document.querySelector('.stockist-details-card');

    function getInfo(el, name) {
      if (!el) return { name, exists: false };
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        name,
        width: Math.round(rect.width),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        padding: `${style.paddingLeft} ${style.paddingRight}`,
        margin: `${style.marginLeft} ${style.marginRight}`,
        boxSizing: style.boxSizing,
        display: style.display,
        gridTemplateColumns: style.gridTemplateColumns
      };
    }

    return {
      vpWidth: window.innerWidth,
      section: getInfo(section, 'section'),
      container: getInfo(container, 'container'),
      showcase: getInfo(showcase, 'showcase'),
      content: getInfo(content, 'content'),
      details: getInfo(details, 'details')
    };
  });

  console.log('STOCKIST DIAGNOSTIC @ 390px:\n', JSON.stringify(stockistDiag, null, 2));

  await browser.close();
  server.close();
})();
