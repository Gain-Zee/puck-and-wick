/**
/**
 * tests/stress/challenger-m3-i3-adversarial-viewport.js
 * Adversarial Challenger M3-I3 Stress Suite:
 * 1. Viewport scaling across 1440px, 768px, 390px, 320px across all states (Men/Women, 7 scents).
 * 2. Deep verification of zero 20px SVG collapse (bounding client rects checked across all states).
 * 3. Deep verification of zero horizontal overflow (documentElement.scrollWidth <= window.innerWidth) across all viewports and interaction cycles.
 * 4. Clean sticky navigation clearance (rect.top >= 70, clearance >= 0) for #exclusive-boxes and #odor-science.
 * 5. Full SVG accessibility audit (role="img", <title>, aria-label, aria-hidden="true").
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
const PORT = 3899; // Dedicated isolated port
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = [
  { name: '1440px Desktop', width: 1440, height: 900 },
  { name: '768px Tablet', width: 768, height: 1024 },
  { name: '390px Mobile', width: 390, height: 844 },
  { name: '320px Ultra-Compact', width: 320, height: 568 }
];

let passedCount = 0;
let failedCount = 0;
const failures = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedCount++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else {
    failedCount++;
    failures.push({ testName, details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runAdversarialHarness() {
  console.log('\n============================================================');
  console.log('  CHALLENGER M3-I3: Adversarial Viewport & Accessibility Test');
  console.log('============================================================\n');

  const { server, port, alreadyRunning } = await startServer(PORT);
  console.log(`[Static Server] Running on http://127.0.0.1:${port}`);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    // -------------------------------------------------------------
    // TEST SUITE 1: Viewport Scaling & Zero 20px Collapse Across All States
    // -------------------------------------------------------------
    console.log('--- Test Suite 1: SVG Dimensions & Zero 20px Collapse Across All States ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      // Check initial dimensions of .box-presentation-svg and .science-diagram-svg
      const initialMetrics = await page.evaluate(() => {
        const boxSvg = document.querySelector('.box-presentation-svg');
        const scienceSvgs = Array.from(document.querySelectorAll('.science-diagram-svg'));
        const bRect = boxSvg ? boxSvg.getBoundingClientRect() : null;
        return {
          boxWidth: bRect ? bRect.width : 0,
          boxHeight: bRect ? bRect.height : 0,
          science: scienceSvgs.map(s => {
            const r = s.getBoundingClientRect();
            return { width: r.width, height: r.height };
          })
        };
      });

      assert(initialMetrics.boxWidth > 150, `[${vp.name}] Box Presentation SVG width > 150px`, `Width: ${initialMetrics.boxWidth.toFixed(1)}px`);
      assert(initialMetrics.boxWidth !== 20, `[${vp.name}] Box Presentation SVG is NOT 20px collapsed`);

      for (let sIdx = 0; sIdx < initialMetrics.science.length; sIdx++) {
        const sci = initialMetrics.science[sIdx];
        assert(sci.width > 150, `[${vp.name}] Science diagram #${sIdx + 1} width > 150px`, `Width: ${sci.width.toFixed(1)}px`);
        assert(sci.width !== 20, `[${vp.name}] Science diagram #${sIdx + 1} is NOT 20px collapsed`);
      }

      // Now toggle Women Edition and check again
      await page.click('[data-testid="edition-toggle-women"]');
      await page.waitForTimeout(50);

      const womenMetrics = await page.evaluate(() => {
        const boxSvg = document.querySelector('.box-presentation-svg');
        const bRect = boxSvg ? boxSvg.getBoundingClientRect() : null;
        return {
          boxWidth: bRect ? bRect.width : 0,
          boxHeight: bRect ? bRect.height : 0
        };
      });

      assert(womenMetrics.boxWidth > 150, `[${vp.name}] Women's Edition Box SVG width > 150px`, `Width: ${womenMetrics.boxWidth.toFixed(1)}px`);
      assert(womenMetrics.boxWidth !== 20, `[${vp.name}] Women's Edition Box SVG is NOT 20px collapsed`);

      // Cycle all 7 scents and assert SVG does not collapse
      const scentValues = await page.evaluate(() => {
        const select = document.querySelector('[data-testid="box-scent-select"]');
        return select ? Array.from(select.options).map(o => o.value) : [];
      });

      for (const val of scentValues) {
        await page.selectOption('[data-testid="box-scent-select"]', val);
        const w = await page.evaluate(() => {
          const el = document.querySelector('.box-presentation-svg');
          return el ? el.getBoundingClientRect().width : 0;
        });
        assert(w > 150 && w !== 20, `[${vp.name}] Scent ${val} SVG width remains robust`, `Width: ${w.toFixed(1)}px`);
      }

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST SUITE 2: Zero Horizontal Page Overflow Across All Viewports
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 2: Deep Zero Horizontal Page Overflow ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      // Scroll through entire page at intervals and test overflow
      const scrollSteps = [0, 500, 1200, 2000, 3000, 4000, 5000];
      let hasBleedAtAnyPoint = false;
      let maxScrollWidth = 0;

      for (const y of scrollSteps) {
        await page.evaluate((targetY) => window.scrollTo(0, targetY), y);
        await page.waitForTimeout(30);

        const check = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const w = window.innerWidth;
          const sw = Math.max(docEl.scrollWidth, body.scrollWidth);
          return { sw, w, overflow: sw > w };
        });

        if (check.sw > maxScrollWidth) maxScrollWidth = check.sw;
        if (check.overflow) hasBleedAtAnyPoint = true;
      }

      assert(
        !hasBleedAtAnyPoint && maxScrollWidth <= vp.width,
        `[${vp.name}] Full page scroll causes zero horizontal bleed`,
        `Max scrollWidth: ${maxScrollWidth}px <= viewport: ${vp.width}px`
      );

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST SUITE 3: Sticky Navigation Clearance for Both Sections
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 3: Sticky Navigation Scroll Clearance ---');

    // 3.1 Desktop (1440x900) Sticky Clearance
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#site-header');

      const targetSections = ['exclusive-boxes', 'odor-science'];
      for (const secId of targetSections) {
        await page.evaluate((id) => {
          const target = document.getElementById(id);
          if (target) target.scrollIntoView({ behavior: 'instant' });
        }, secId);
        await page.waitForTimeout(100);

        const clearanceMetrics = await page.evaluate((id) => {
          const header = document.getElementById('site-header');
          const section = document.getElementById(id);
          const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
          const sRect = section ? section.getBoundingClientRect() : { top: 0 };
          return {
            headerHeight: hRect.height,
            headerBottom: hRect.bottom,
            sectionTop: sRect.top,
            clearance: sRect.top - hRect.bottom
          };
        }, secId);

        assert(
          clearanceMetrics.sectionTop >= 70,
          `[Desktop] #${secId} scroll top is >= 70px`,
          `rect.top: ${clearanceMetrics.sectionTop.toFixed(1)}px`
        );
        assert(
          clearanceMetrics.clearance >= 0,
          `[Desktop] #${secId} is NOT covered by sticky header`,
          `Clearance: ${clearanceMetrics.clearance.toFixed(1)}px`
        );
      }

      await page.close();
    }

    // 3.2 Mobile (390x844) Sticky Clearance via Mobile Nav
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#nav-toggle');

      await page.click('#nav-toggle');
      await page.waitForTimeout(100);

      const boxLink = page.locator('.mobile-nav-link[href="#exclusive-boxes"]').first();
      await boxLink.click();
      await page.waitForTimeout(300);

      const mobileClearance = await page.evaluate(() => {
        const header = document.getElementById('site-header');
        const section = document.getElementById('exclusive-boxes');
        const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
        const sRect = section ? section.getBoundingClientRect() : { top: 0 };
        return {
          headerHeight: hRect.height,
          headerBottom: hRect.bottom,
          sectionTop: sRect.top,
          clearance: sRect.top - hRect.bottom
        };
      });

      assert(
        mobileClearance.sectionTop >= 60,
        `[Mobile] #exclusive-boxes scroll top is >= 60px`,
        `rect.top: ${mobileClearance.sectionTop.toFixed(1)}px`
      );
      assert(
        mobileClearance.clearance >= 0,
        `[Mobile] #exclusive-boxes has positive clearance below mobile header`,
        `Clearance: ${mobileClearance.clearance.toFixed(1)}px`
      );

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST SUITE 4: Full Accessibility Audit for SVGs in M3 Sections
    // -------------------------------------------------------------
    console.log('\n--- Test Suite 4: Exhaustive SVG Accessibility Audit ---');

    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      const svgAudit = await page.evaluate(() => {
        const sections = ['#exclusive-boxes', '#odor-science'];
        const results = [];

        for (const sec of sections) {
          const container = document.querySelector(sec);
          if (!container) continue;

          const svgs = Array.from(container.querySelectorAll('svg'));
          for (const [idx, s] of svgs.entries()) {
            const role = s.getAttribute('role');
            const ariaLabel = s.getAttribute('aria-label');
            const ariaHidden = s.getAttribute('aria-hidden');
            const titleEl = s.querySelector('title');
            const titleText = titleEl ? titleEl.textContent.trim() : null;
            const className = s.getAttribute('class') || '';

            results.push({
              section: sec,
              index: idx,
              className,
              role,
              ariaLabel,
              ariaHidden,
              titleText,
              isInformative: className.includes('science-diagram-svg') || className.includes('box-presentation-svg'),
              isDecorative: !className.includes('science-diagram-svg') && !className.includes('box-presentation-svg')
            });
          }
        }
        return results;
      });

      for (const item of svgAudit) {
        if (item.isInformative) {
          assert(
            item.role === 'img',
            `Informative SVG in ${item.section} (#${item.index + 1}) has role="img"`,
            `role: ${item.role}`
          );
          assert(
            typeof item.ariaLabel === 'string' && item.ariaLabel.length > 5,
            `Informative SVG in ${item.section} (#${item.index + 1}) has descriptive aria-label`,
            `aria-label: "${item.ariaLabel}"`
          );
          assert(
            typeof item.titleText === 'string' && item.titleText.length > 5,
            `Informative SVG in ${item.section} (#${item.index + 1}) has descriptive <title>`,
            `title: "${item.titleText}"`
          );
        } else {
          // Decorative
          const isAriaHidden = item.ariaHidden === 'true';
          const hasAccessibleAlt = item.role === 'img' && item.ariaLabel;
          assert(
            isAriaHidden || hasAccessibleAlt,
            `Decorative SVG in ${item.section} (#${item.index + 1}) is hidden or labelled`,
            `aria-hidden="${item.ariaHidden}", role="${item.role}"`
          );
        }
      }

      await page.close();
    }

  } finally {
    await browser.close();
    if (server) server.close();
  }

  console.log('\n============================================================');
  console.log(`  Adversarial Challenge Complete: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('============================================================\n');

  return { passedCount, failedCount, failures };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  runAdversarialHarness().then((res) => {
    process.exit(res.failedCount > 0 ? 1 : 0);
  }).catch((err) => {
    console.error('[Harness Crash]', err);
    process.exit(1);
  });
}
