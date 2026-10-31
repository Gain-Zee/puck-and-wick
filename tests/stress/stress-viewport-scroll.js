/**
 * tests/stress/stress-viewport-scroll.js
 * Adversarial Stress & Viewport Resilience Harness for Milestone 1.
 *
 * Uses system Google Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
 * Asserts across viewports:
 *   - Desktop: 1440x900
 *   - Tablet: 768x1024
 *   - Mobile: 390x844
 *   - Ultra-narrow: 320x568
 *   - Large: 2560x1440
 * Dynamic breakpoint sweep: 2560 -> 1920 -> 1440 -> 1024 -> 768 -> 480 -> 390 -> 320
 *
 * Enforces Zero-Tolerance Quality Gates:
 *   1. Horizontal Overflow: scrollWidth <= clientWidth across all viewports and elements.
 *   2. Rapid Scrolling: 10+ rapid oscillation cycles, sticky header stability, class toggling, CLS <= 0.05.
 *   3. Error Trapping: 0 console.error, 0 pageerror, 0 requestfailed.
 *   4. Mobile menu rapid cycling & outside-click dismiss.
 *   5. Modal interactions & keyboard dismiss.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3850;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = [
  { name: 'Ultra-narrow Mobile', width: 320, height: 568 },
  { name: 'Standard Mobile (iPhone 14)', width: 390, height: 844 },
  { name: 'Tablet Portrait (iPad Mini/Air)', width: 768, height: 1024 },
  { name: 'Standard Desktop (MacBook Pro)', width: 1440, height: 900 },
  { name: 'Large Desktop / 4K Monitor', width: 2560, height: 1440 }
];

const RESIZE_SWEEP = [2560, 1920, 1600, 1440, 1280, 1024, 960, 834, 768, 640, 480, 414, 390, 360, 320];

export const stressResults = {
  passed: 0,
  failed: 0,
  details: []
};

function recordPass(suite, name, extra = '') {
  stressResults.passed++;
  const msg = `  [PASS] [${suite}] ${name}${extra ? ' (' + extra + ')' : ''}`;
  console.log(msg);
  stressResults.details.push({ suite, name, status: 'PASS', extra });
}

function recordFail(suite, name, error) {
  stressResults.failed++;
  const msg = `  [FAIL] [${suite}] ${name}: ${error.message || error}`;
  console.error(msg);
  stressResults.details.push({ suite, name, status: 'FAIL', error: error.message || String(error) });
}

function setupErrorTracker(page) {
  const tracker = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: []
  };

  page.on('console', (msg) => {
    if (msg.type() === 'error') tracker.consoleErrors.push(msg.text());
  });

  page.on('pageerror', (err) => {
    tracker.pageErrors.push(err.message || String(err));
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    if (!url.includes('favicon.ico')) {
      tracker.failedRequests.push({
        url,
        method: req.method(),
        failure: req.failure()?.errorText || 'Unknown failure'
      });
    }
  });

  return tracker;
}

function assertZeroErrors(tracker, context) {
  if (tracker.consoleErrors.length > 0) {
    throw new Error(`Console errors in ${context} (${tracker.consoleErrors.length}):\n    ${tracker.consoleErrors.join('\n    ')}`);
  }
  if (tracker.pageErrors.length > 0) {
    throw new Error(`Page errors in ${context} (${tracker.pageErrors.length}):\n    ${tracker.pageErrors.join('\n    ')}`);
  }
  if (tracker.failedRequests.length > 0) {
    throw new Error(`Failed requests in ${context} (${tracker.failedRequests.length}):\n    ${tracker.failedRequests.map(r => `${r.method} ${r.url} (${r.failure})`).join('\n    ')}`);
  }
}

export async function runAllStressTests() {
  console.log('======================================================================');
  console.log('  PUCK & WICK — ADVERSARIAL STRESS & VIEWPORT RESILIENCE HARNESS');
  console.log(`  Engine: Google Chrome (${SYSTEM_CHROME_PATH})`);
  console.log(`  Target: ${BASE_URL}`);
  console.log('======================================================================\n');

  const server = await startServer(PORT);
  console.log(`Static test server listening on port ${PORT}.\n`);

  let browser;
  try {
    browser = await chromium.launch({
      executablePath: SYSTEM_CHROME_PATH,
      headless: true
    });
  } catch (err) {
    console.error(`Failed to launch Google Chrome at ${SYSTEM_CHROME_PATH}:`, err);
    process.exit(1);
  }

  try {
    // =========================================================================
    // SUITE 1: VIEWPORT STRESS & HORIZONTAL OVERFLOW CHECK
    // =========================================================================
    console.log('--- SUITE 1: Fixed Viewports & Horizontal Overflow ---');
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(150);

        // 1. Root scrollWidth <= clientWidth
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          return {
            docScrollWidth: docEl.scrollWidth,
            docClientWidth: docEl.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth,
            hasDocOverflow: docEl.scrollWidth > docEl.clientWidth,
            hasBodyOverflow: body.scrollWidth > docEl.clientWidth
          };
        });

        if (overflow.hasDocOverflow || overflow.hasBodyOverflow) {
          throw new Error(`Horizontal scroll detected at ${vp.width}x${vp.height}! docScrollWidth=${overflow.docScrollWidth}, docClientWidth=${overflow.docClientWidth}`);
        }

        // 2. Child Element Boundary Scan: verify no rendered element bleeds past viewport
        const bleedingElements = await page.evaluate((vpWidth) => {
          const bleeders = [];
          const allEls = document.querySelectorAll('body *');
          for (const el of allEls) {
            if (['SCRIPT', 'STYLE', 'DEFS', 'PATTERN', 'LINEARGRADIENT', 'RADIALGRADIENT', 'FILTER', 'CLIPPATHTEMPLATE'].includes(el.tagName)) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              const style = window.getComputedStyle(el);
              if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                if (rect.right > vpWidth + 1) {
                  bleeders.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    right: Math.round(rect.right),
                    vpWidth
                  });
                }
              }
            }
          }
          return bleeders.slice(0, 5);
        }, vp.width);

        if (bleedingElements.length > 0) {
          throw new Error(`Elements bleeding horizontally past ${vp.width}px:\n` + JSON.stringify(bleedingElements, null, 2));
        }

        assertZeroErrors(tracker, `${vp.name} (${vp.width}x${vp.height})`);
        recordPass('SUITE 1', `Zero horizontal overflow & zero errors @ ${vp.name} (${vp.width}x${vp.height})`, `docClientWidth=${overflow.docClientWidth}px`);
      } catch (err) {
        recordFail('SUITE 1', `Horizontal overflow @ ${vp.name} (${vp.width}x${vp.height})`, err);
      } finally {
        await context.close();
      }
    }

    // =========================================================================
    // SUITE 2: DYNAMIC RESIZE SWEEP (Stress Responsive Fluidity)
    // =========================================================================
    console.log('\n--- SUITE 2: Dynamic Window Resize Sweep ---');
    {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        for (const width of RESIZE_SWEEP) {
          await page.setViewportSize({ width, height: 800 });
          await page.waitForTimeout(40);

          const overflow = await page.evaluate(() => {
            return {
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth
            };
          });

          if (overflow.scrollWidth > overflow.clientWidth) {
            throw new Error(`Resize sweep failed at width=${width}px: scrollWidth (${overflow.scrollWidth}) > clientWidth (${overflow.clientWidth})`);
          }
        }

        assertZeroErrors(tracker, 'Dynamic Resize Sweep');
        recordPass('SUITE 2', 'Dynamic resize sweep across 15 breakpoints (2560px -> 320px)', 'Zero overflow, zero errors');
      } catch (err) {
        recordFail('SUITE 2', 'Dynamic resize sweep', err);
      } finally {
        await context.close();
      }
    }

    // =========================================================================
    // SUITE 3: RAPID VERTICAL SCROLLING & STICKY HEADER STABILITY
    // =========================================================================
    console.log('\n--- SUITE 3: Rapid Vertical Scrolling & Sticky Header ---');
    for (const vp of [VIEWPORTS[3], VIEWPORTS[1]]) { // Desktop (1440x900) & Mobile (390x844)
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        // Setup CLS observer in the browser context
        await page.evaluate(() => {
          window.__clsScore = 0;
          try {
            const observer = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                  window.__clsScore += entry.value;
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
          } catch (e) {
            window.__clsError = e.message;
          }
        });

        // Test 1: Verify Header Initial State at Top (scrollY = 0)
        const initialHeader = await page.evaluate(() => {
          const header = document.querySelector('.site-header');
          const rect = header.getBoundingClientRect();
          return {
            hasHeader: !!header,
            top: rect.top,
            isScrolled: header.classList.contains('scrolled'),
            height: rect.height
          };
        });

        if (!initialHeader.hasHeader) throw new Error('Site header (.site-header) not found');
        if (initialHeader.top !== 0) throw new Error(`Initial header top is not 0 (got ${initialHeader.top})`);
        if (initialHeader.isScrolled) throw new Error('Header should NOT have .scrolled class at scrollY=0');

        // Test 2: Rapid vertical scroll oscillations (10 oscillation loops)
        for (let i = 0; i < 10; i++) {
          await page.evaluate((y) => window.scrollTo(0, y), 500 + i * 150);
          await page.waitForTimeout(25);

          const midState = await page.evaluate(() => {
            const header = document.querySelector('.site-header');
            const rect = header.getBoundingClientRect();
            return {
              top: rect.top,
              isScrolled: header.classList.contains('scrolled'),
              scrollY: window.scrollY
            };
          });

          if (midState.top !== 0) {
            throw new Error(`Sticky header detached from top! rect.top=${midState.top} at scrollY=${midState.scrollY}`);
          }
          if (!midState.isScrolled) {
            throw new Error(`Header missing .scrolled class at scrollY=${midState.scrollY}`);
          }

          // Scroll directly to bottom
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(25);

          // Scroll back to top
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(25);

          const topState = await page.evaluate(() => {
            const header = document.querySelector('.site-header');
            const rect = header.getBoundingClientRect();
            return {
              top: rect.top,
              isScrolled: header.classList.contains('scrolled')
            };
          });

          if (topState.top !== 0) {
            throw new Error(`Header top is not 0 after scroll to top (got ${topState.top})`);
          }
          if (topState.isScrolled) {
            throw new Error('Header retained .scrolled class after returning to top');
          }
        }

        // Measure CLS after rapid scroll oscillations
        const cls = await page.evaluate(() => window.__clsScore || 0);
        if (cls > 0.05) {
          throw new Error(`Cumulative Layout Shift during rapid scrolling exceeded threshold! CLS=${cls.toFixed(4)} (threshold: 0.05, Google Good: <=0.10). Caused by .scrolled altering sticky header height from 78px to 68px.`);
        }

        assertZeroErrors(tracker, `Rapid Scrolling @ ${vp.name}`);
        recordPass('SUITE 3', `10 rapid scroll oscillations & sticky header stability @ ${vp.name}`, `CLS=${cls.toFixed(4)}, header pinned at top:0`);
      } catch (err) {
        recordFail('SUITE 3', `Rapid scroll stability @ ${vp.name}`, err);
      } finally {
        await context.close();
      }
    }

    // =========================================================================
    // SUITE 4: MOBILE NAVIGATION INTERACTION & DISMISS RESILIENCE
    // =========================================================================
    console.log('\n--- SUITE 4: Mobile Navigation Interaction & Dismiss Testing ---');
    for (const vp of [VIEWPORTS[0], VIEWPORTS[1]]) { // 320x568 and 390x844
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(4000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        const toggle = page.locator('#nav-toggle');
        const mobileNav = page.locator('#mobile-nav');

        // 1. Rapid open/close cycling (5 cycles)
        for (let i = 0; i < 5; i++) {
          await toggle.click();
          await page.waitForTimeout(50);
          const isOpen = await mobileNav.evaluate(el => el.classList.contains('open'));
          if (!isOpen) throw new Error(`Mobile nav failed to open on toggle cycle ${i + 1}`);

          await toggle.click();
          await page.waitForTimeout(50);
          const isClosed = await mobileNav.evaluate(el => !el.classList.contains('open'));
          if (!isClosed) throw new Error(`Mobile nav failed to close on toggle cycle ${i + 1}`);
        }

        // 2. Escape key dismiss
        await toggle.click();
        await page.waitForTimeout(50);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
        const closedByEsc = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!closedByEsc) throw new Error('Escape key failed to dismiss mobile navigation drawer');

        // 3. Anchor link dismiss & smooth scroll
        await toggle.click();
        await page.waitForTimeout(50);
        const storyLink = page.locator('#mobile-nav a[href="#story"]');
        await storyLink.click();
        await page.waitForTimeout(150);
        const closedByLink = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!closedByLink) throw new Error('Clicking mobile nav link failed to dismiss mobile menu');

        // 4. Outside-click dismiss check (Adversarial check: does menu dismiss when tapping outside?)
        await toggle.click();
        await page.waitForTimeout(50);
        await page.mouse.click(5, vp.height - 20); // tap at bottom of screen
        await page.waitForTimeout(150);
        const closedByOutside = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!closedByOutside) {
          throw new Error('Clicking outside mobile navigation drawer fails to dismiss mobile menu (missing document click dismiss listener)');
        }

        assertZeroErrors(tracker, `Mobile Nav Interaction @ ${vp.name}`);
        recordPass('SUITE 4', `Mobile navigation toggle, ESC, anchor & outside-click dismiss @ ${vp.name}`, 'Verified');
      } catch (err) {
        recordFail('SUITE 4', `Mobile navigation dismiss @ ${vp.name}`, err);
      } finally {
        await context.close();
      }
    }

    // =========================================================================
    // SUITE 5: WHOLESALE INQUIRY MODAL & KEYBOARD TRAP STRESS
    // =========================================================================
    console.log('\n--- SUITE 5: Wholesale Inquiry Modal & Keyboard Trap Stress ---');
    for (const vp of [VIEWPORTS[0], VIEWPORTS[3]]) { // 320x568 and 1440x900
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(4000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        const openBtn = page.locator('#btn-inquire-wholesale');
        await openBtn.click();
        await page.waitForTimeout(100);

        const modalBackdrop = page.locator('#wholesale-modal-backdrop');
        const count = await modalBackdrop.count();
        if (count === 0) throw new Error('Wholesale modal backdrop (#wholesale-modal-backdrop) was not rendered into #modal-container upon click');

        // Verify modal card bounding box fits within viewport
        const modalCard = page.locator('.wholesale-modal');
        const box = await modalCard.boundingBox();
        if (!box) throw new Error('Wholesale modal card not visible');
        if (box.x + box.width > vp.width + 1) {
          throw new Error(`Wholesale modal card overflows viewport horizontally at ${vp.width}px! (right=${Math.round(box.x + box.width)}px)`);
        }

        // Close via close button
        const closeBtn = page.locator('#btn-close-wholesale');
        await closeBtn.click();
        await page.waitForTimeout(100);
        const closed = (await modalBackdrop.count()) === 0;
        if (!closed) throw new Error('Wholesale modal did not dismiss when clicking #btn-close-wholesale');

        // Re-open and test Escape key dismiss
        await openBtn.click();
        await page.waitForTimeout(100);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
        const closedEsc = (await modalBackdrop.count()) === 0;
        if (!closedEsc) {
          throw new Error('Wholesale modal fails to close on Escape key press (missing keydown Escape listener)');
        }

        assertZeroErrors(tracker, `Wholesale Modal @ ${vp.name}`);
        recordPass('SUITE 5', `Wholesale modal fit & ESC dismiss @ ${vp.name}`, 'Verified');
      } catch (err) {
        recordFail('SUITE 5', `Wholesale modal stress @ ${vp.name}`, err);
      } finally {
        await context.close();
      }
    }

    // =========================================================================
    // SUITE 6: STRICT QUALITY GATE ERROR AUDIT ACROSS ALL SECTIONS
    // =========================================================================
    console.log('\n--- SUITE 6: Strict Quality Gate Error Audit ---');
    {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      const tracker = setupErrorTracker(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        const sectionIds = ['#hero', '#shop', '#exclusive-boxes', '#story', '#stockists', '#studio', 'footer'];
        for (const id of sectionIds) {
          await page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (el) el.scrollIntoView();
          }, id);
          await page.waitForTimeout(50);
        }

        const placeholders = await page.evaluate(() => {
          const text = document.body.innerText;
          const banned = [/\bTODO\b/i, /\bTBD\b/i, /\bLOREM IPSUM\b/i, /\bPLACEHOLDER TEXT\b/i, /\bCOMING SOON\b/i];
          return banned.filter(regex => regex.test(text)).map(r => r.toString());
        });

        if (placeholders.length > 0) {
          throw new Error(`Forbidden placeholder text found: ${placeholders.join(', ')}`);
        }

        const brokenAssets = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          const broken = [];
          for (const img of imgs) {
            if (!img.complete || img.naturalWidth === 0) {
              broken.push(img.src || 'img-without-src');
            }
          }
          const svgs = Array.from(document.querySelectorAll('svg'));
          for (const s of svgs) {
            if (s.children.length === 0 && !s.textContent.trim()) {
              broken.push('Empty SVG: ' + s.outerHTML.slice(0, 40));
            }
          }
          return broken;
        });

        if (brokenAssets.length > 0) {
          throw new Error(`Broken assets found: ${brokenAssets.join(', ')}`);
        }

        assertZeroErrors(tracker, 'Full Site Sweep');
        recordPass('SUITE 6', 'Zero console errors, zero uncaught page exceptions, zero failed network requests, zero broken assets', 'Clean 100%');
      } catch (err) {
        recordFail('SUITE 6', 'Quality Gate Error Audit', err);
      } finally {
        await context.close();
      }
    }

  } finally {
    if (browser) await browser.close();
    if (server?.server) server.server.close();
  }

  console.log('\n======================================================================');
  console.log(`  STRESS TEST SUMMARY: ${stressResults.passed} PASSED | ${stressResults.failed} FAILED`);
  console.log('======================================================================\n');

  return stressResults;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  runAllStressTests().then(res => {
    if (res.failed > 0) {
      console.error(`Stress test suite ended with ${res.failed} failures.`);
      process.exit(1);
    } else {
      console.log('All stress tests PASSED.');
      process.exit(0);
    }
  }).catch(err => {
    console.error('Fatal stress test runner error:', err);
    process.exit(1);
  });
}
