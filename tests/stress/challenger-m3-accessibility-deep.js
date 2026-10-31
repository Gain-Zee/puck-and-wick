/**
 * tests/stress/challenger-m3-accessibility-deep.js
 * Empirical Challenger Deep Accessibility & Vector Integrity Stress Test
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3795;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let passed = 0;
let failed = 0;

function assert(condition, message, details = '') {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${message}${details ? ' (' + details + ')' : ''}`);
  } else {
    failed++;
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${message}${details ? ' — ' + details : ''}`);
  }
}

async function runDeepStress() {
  console.log('\n============================================================');
  console.log('  Milestone 3 Deep Accessibility & Dynamic SVG Stress Test');
  console.log('============================================================\n');

  // Step 1: Disk & Static Verification
  console.log('--- Step 1: Disk & Static Code Verification ---');
  const athleteJpgExists = fs.existsSync(path.join(ROOT_DIR, 'assets/images/box-athlete.jpg'));
  const womensJpgExists = fs.existsSync(path.join(ROOT_DIR, 'assets/images/box-womens.jpg'));
  assert(!athleteJpgExists, 'assets/images/box-athlete.jpg is permanently removed from filesystem');
  assert(!womensJpgExists, 'assets/images/box-womens.jpg is permanently removed from filesystem');

  const boxBuilderJs = fs.readFileSync(path.join(ROOT_DIR, 'js/modules/box-builder.js'), 'utf8');
  assert(!boxBuilderJs.includes('<image'), 'js/modules/box-builder.js contains zero <image> tags');
  assert(!boxBuilderJs.includes('.jpg'), 'js/modules/box-builder.js contains zero .jpg references');
  assert(!boxBuilderJs.includes('.png'), 'js/modules/box-builder.js contains zero .png references');
  assert(boxBuilderJs.includes('foam-inset-shadow'), 'js/modules/box-builder.js contains foam-inset-shadow filter');
  assert(boxBuilderJs.includes('#0F2417'), 'js/modules/box-builder.js defines Emerald glass tint #0F2417');
  assert(boxBuilderJs.includes('#2B1706'), 'js/modules/box-builder.js defines Amber glass tint #2B1706');
  assert(boxBuilderJs.includes('#1E2530'), 'js/modules/box-builder.js defines Frosted Ice glass tint #1E2530');
  assert(boxBuilderJs.includes('#16181F'), 'js/modules/box-builder.js defines Matte Obsidian glass tint #16181F');

  // Step 2: Headless Browser Dynamic Accessibility & Vessel Verification
  console.log('\n--- Step 2: Headless Browser Accessibility & Dynamic SVG State ---');
  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL);
    await page.waitForSelector('#exclusive-boxes');

    // 2.1 Men's Edition Default State
    console.log('Testing Men\'s Edition SVG Accessibility...');
    const menSvgInfo = await page.evaluate(() => {
      const svg = document.querySelector('.box-presentation-svg');
      if (!svg) return null;
      const title = svg.querySelector('title');
      return {
        role: svg.getAttribute('role'),
        ariaLabel: svg.getAttribute('aria-label'),
        titleText: title ? title.textContent.trim() : null,
        outerStart: svg.outerHTML.slice(0, 120)
      };
    });

    assert(menSvgInfo !== null, 'Men\'s Box presentation SVG exists in DOM');
    assert(menSvgInfo?.role === 'img', 'Men\'s Box SVG has role="img"');
    assert(menSvgInfo?.ariaLabel?.includes("Men's"), `Men's Box SVG aria-label is descriptive: "${menSvgInfo?.ariaLabel}"`);
    assert(menSvgInfo?.titleText?.includes("Men's"), `Men's Box SVG <title> contains "Men's": "${menSvgInfo?.titleText}"`);

    // 2.2 Toggle to Women's Edition
    console.log('\nTesting Women\'s Edition SVG Accessibility...');
    await page.click('[data-testid="edition-toggle-women"]');
    await page.waitForTimeout(100);

    const womenSvgInfo = await page.evaluate(() => {
      const svg = document.querySelector('.box-presentation-svg');
      if (!svg) return null;
      const title = svg.querySelector('title');
      const textNodes = Array.from(svg.querySelectorAll('text')).map(t => t.textContent.trim());
      return {
        role: svg.getAttribute('role'),
        ariaLabel: svg.getAttribute('aria-label'),
        titleText: title ? title.textContent.trim() : null,
        textNodes
      };
    });

    assert(womenSvgInfo !== null, 'Women\'s Box presentation SVG exists in DOM');
    assert(womenSvgInfo?.role === 'img', 'Women\'s Box SVG has role="img"');
    assert(womenSvgInfo?.ariaLabel?.includes("Women's"), `Women's Box SVG aria-label is descriptive: "${womenSvgInfo?.ariaLabel}"`);
    assert(womenSvgInfo?.titleText?.includes("Women's"), `Women's Box SVG <title> contains "Women's": "${womenSvgInfo?.titleText}"`);
    assert(womenSvgInfo?.textNodes.some(t => t.includes('LUXE SPA BODY WA')), 'Women\'s Box SVG includes "LUXE SPA BODY WA" label');
    assert(womenSvgInfo?.textNodes.some(t => t.includes('BOTANICAL LINEN PUCK')), 'Women\'s Box SVG includes "BOTANICAL LINEN PUCK" label');

    // 2.3 Scent Vessel Tint Verification Across All 7 Candle Scents
    console.log('\nTesting Dynamic Vessel Tints for All 7 Scents...');
    const scentOptions = await page.evaluate(() => {
      const select = document.querySelector('[data-testid="box-scent-select"]');
      if (!select) return [];
      return Array.from(select.options).map(o => ({ value: o.value, text: o.text }));
    });

    for (const opt of scentOptions) {
      await page.selectOption('[data-testid="box-scent-select"]', opt.value);
      await page.waitForTimeout(50);

      const jarData = await page.evaluate(() => {
        // Slot 1 candle jar rect is inside the first g element
        const slot1 = document.querySelector('.box-presentation-svg g');
        if (!slot1) return null;
        // In slot 1, the jar body rect has x="25" y="56" width="80" height="106"
        const rects = Array.from(slot1.querySelectorAll('rect'));
        const jarRect = rects.find(r => r.getAttribute('x') === '25');
        return {
          fill: jarRect ? jarRect.getAttribute('fill') : null
        };
      });

      let expectedColor = '#16181F'; // default
      if (opt.value.includes('balsam-fir')) {
        expectedColor = '#0F2417'; // emerald
      } else if (opt.value.includes('barnwood-bourbon') || opt.value.includes('warm-amber')) {
        expectedColor = '#2B1706'; // amber
      } else if (opt.value.includes('fresh-cut')) {
        expectedColor = '#1E2530'; // frosted ice
      }

      assert(
        jarData?.fill === expectedColor,
        `Vessel tint for "${opt.text}" matches ${expectedColor}`,
        `Actual: ${jarData?.fill}`
      );
    }

    // 2.4 Verify Section Kicker and All UI SVGs in #exclusive-boxes
    console.log('\nAuditing All SVGs in #exclusive-boxes for Accessibility Compliance...');
    const allSvgs = await page.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('#exclusive-boxes svg'));
      return svgs.map((s, idx) => ({
        idx,
        outerHtmlStart: s.outerHTML.slice(0, 100),
        ariaHidden: s.getAttribute('aria-hidden'),
        role: s.getAttribute('role'),
        ariaLabel: s.getAttribute('aria-label'),
        hasTitle: !!s.querySelector('title')
      }));
    });

    for (const s of allSvgs) {
      const isCompliant = (s.ariaHidden === 'true') || (s.role === 'img' && (s.ariaLabel || s.hasTitle));
      assert(
        isCompliant,
        `SVG #${s.idx + 1} in #exclusive-boxes is accessible or hidden`,
        s.ariaHidden === 'true' ? 'aria-hidden="true"' : `role="${s.role}", title=${s.hasTitle}, aria-label="${s.ariaLabel}"`
      );
    }

    await page.close();
  } finally {
    await browser.close();
    if (server) server.close();
  }

  console.log('\n============================================================');
  console.log(`  Deep Stress Summary: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================================\n');

  return { passed, failed };
}

runDeepStress().then(res => {
  process.exit(res.failed > 0 ? 1 : 0);
}).catch(err => {
  console.error('[Stress Crash]', err);
  process.exit(1);
});
