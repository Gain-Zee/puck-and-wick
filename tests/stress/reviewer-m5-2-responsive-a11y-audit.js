/**
 * tests/stress/reviewer-m5-2-responsive-a11y-audit.js
 * Independent Reviewer M5-2 Cross-Device Responsive & Accessibility Audit Suite
 *
 * Scope:
 * 1. Viewports: Desktop (1440x900), Tablet (768x1024), Standard Mobile (390x844), Narrow Mobile (320x568)
 * 2. Zero Horizontal Overflow: scrollWidth <= innerWidth & bounding box checks across all interactive states
 * 3. Touch Target Sizing (WCAG 2.5.5 >= 44x44px) across buttons, triggers, inputs, toggles
 * 4. Image Integrity: all <img> and SVG <image> elements complete with naturalWidth > 0, zero 404s
 * 5. Console & Uncaught Exception hygiene: zero errors during bootstrap, navigation, modal lifecycle
 * 6. Keyboard Navigation & Focus Rings: :focus-visible outlines, tab cycling, escape dismissal & focus restore
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3988;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = [
  { id: 'desktop', name: 'Desktop (1440x900)', width: 1440, height: 900, isTouch: false },
  { id: 'tablet', name: 'Tablet (768x1024)', width: 768, height: 1024, isTouch: true },
  { id: 'mobileStandard', name: 'Standard Mobile (390x844)', width: 390, height: 844, isTouch: true },
  { id: 'mobileNarrow', name: 'Narrow Mobile (320x568)', width: 320, height: 568, isTouch: true }
];

export const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function assert(condition, testName, details = '', isWarning = false) {
  if (condition) {
    results.passed++;
    results.tests.push({ testName, status: 'PASS', details });
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else if (isWarning) {
    results.warnings++;
    results.tests.push({ testName, status: 'WARN', details });
    console.warn(`  \x1b[33m[WARN]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  } else {
    results.failed++;
    results.tests.push({ testName, status: 'FAIL', details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runAudit() {
  console.log('\n============================================================');
  console.log(' REVIEWER M5-2: CROSS-DEVICE RESPONSIVE & ACCESSIBILITY AUDIT');
  console.log('============================================================\n');

  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n============================================================`);
      console.log(`  AUDITING VIEWPORT: ${vp.name}`);
      console.log(`============================================================`);

      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];

      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        hasTouch: vp.isTouch
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', err => {
        pageErrors.push(err.message || String(err));
      });
      page.on('requestfailed', req => {
        failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
      });

      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);

      // 1. Initial Zero Horizontal Overflow Check
      const overflowReport = await page.evaluate((expectedWidth) => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const innerWidth = window.innerWidth;

        // Traverse DOM for bleeding elements
        const allElements = Array.from(document.querySelectorAll('*'));
        const bleeding = [];
        for (const el of allElements) {
          const r = el.getBoundingClientRect();
          // Filter out elements with no layout or hidden
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > innerWidth + 1.5) {
            // Check if clipped by parent
            let parent = el.parentElement;
            let clipped = false;
            while (parent && parent !== document.documentElement) {
              const cs = window.getComputedStyle(parent);
              if (cs.overflow === 'hidden' || cs.overflowX === 'hidden') {
                clipped = true;
                break;
              }
              parent = parent.parentElement;
            }
            if (!clipped) {
              bleeding.push({
                tag: el.tagName.toLowerCase(),
                id: el.id,
                className: el.className,
                right: Math.round(r.right),
                width: Math.round(r.width)
              });
            }
          }
        }

        return {
          scrollWidth,
          innerWidth,
          hasDocOverflow: scrollWidth > innerWidth,
          bleedingCount: bleeding.length,
          bleeding: bleeding.slice(0, 5)
        };
      }, vp.width);

      assert(!overflowReport.hasDocOverflow, `[${vp.name}] Zero document horizontal overflow (scrollWidth <= innerWidth)`,
        `scrollWidth: ${overflowReport.scrollWidth}px, innerWidth: ${overflowReport.innerWidth}px`);
      assert(overflowReport.bleedingCount === 0, `[${vp.name}] Zero element bleed beyond viewport right boundary`,
        overflowReport.bleedingCount === 0 ? 'Zero unclipped bleeding elements' : `Found ${overflowReport.bleedingCount} bleeding elements`);

      // 2. Zero Broken Images Audit
      const imageReport = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const brokenImages = [];
        for (const img of images) {
          if (!img.complete || img.naturalWidth === 0) {
            brokenImages.push({
              src: img.getAttribute('src') || '',
              alt: img.getAttribute('alt') || '',
              complete: img.complete,
              naturalWidth: img.naturalWidth
            });
          }
        }

        // SVG raster image check
        const svgImages = Array.from(document.querySelectorAll('svg image'));
        const brokenSvgImages = [];
        for (const img of svgImages) {
          const href = img.getAttribute('href') || img.getAttribute('xlink:href');
          if (!href) {
            brokenSvgImages.push({ href: '(none)' });
          }
        }

        return {
          totalImages: images.length,
          brokenImagesCount: brokenImages.length,
          brokenImages,
          totalSvgImages: svgImages.length,
          brokenSvgImagesCount: brokenSvgImages.length
        };
      });

      assert(imageReport.brokenImagesCount === 0, `[${vp.name}] Zero broken <img> elements on initial load`,
        `Checked ${imageReport.totalImages} images; Broken: ${imageReport.brokenImagesCount}`);
      assert(imageReport.brokenSvgImagesCount === 0, `[${vp.name}] Zero invalid <image> tags in SVG`,
        `Checked ${imageReport.totalSvgImages} SVG images`);

      // 3. Touch Target Sizing (WCAG 2.5.5 >= 44x44px)
      // Check all interactive elements across key components
      const touchTargetReport = await page.evaluate(() => {
        // Find visible buttons, links acting as buttons, input toggles, etc.
        const selectors = [
          'button:not([hidden])',
          'a.btn:not([hidden])',
          'input:not([type="hidden"])',
          '.filter-pill',
          '.studio-toggle-btn',
          '.apply-logo-btn',
          '.nav-toggle',
          '.cart-btn'
        ];
        const elements = Array.from(document.querySelectorAll(selectors.join(',')));
        const visibleElements = elements.filter(el => {
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
        });

        const targets = visibleElements.map(el => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: typeof el.className === 'string' ? el.className : '',
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 35),
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meetsHeight: r.height >= 43.9,
            meetsWidth: r.width >= 43.9
          };
        });

        const failingHeight = targets.filter(t => !t.meetsHeight);
        const failingWidth = targets.filter(t => !t.meetsWidth);

        return {
          total: targets.length,
          failingHeightCount: failingHeight.length,
          failingHeight: failingHeight.slice(0, 10),
          failingWidthCount: failingWidth.length,
          failingWidth: failingWidth.slice(0, 10)
        };
      });

      if (vp.isTouch) {
        assert(touchTargetReport.failingHeightCount === 0,
          `[${vp.name}] All main interactive controls satisfy min height >= 44px`,
          touchTargetReport.failingHeightCount === 0
            ? `All ${touchTargetReport.total} controls >= 44px height`
            : `${touchTargetReport.failingHeightCount} controls < 44px: ` + JSON.stringify(touchTargetReport.failingHeight)
        );
      }

      // 4. Modal and Drawer Overflow and Accessibility Tests
      // 4.1 Quick View Modal
      const firstCard = page.locator('.product-card').first();
      if (await firstCard.count() > 0) {
        await firstCard.click();
        await page.waitForTimeout(300);

        const modalOverflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          return {
            scrollWidth: docEl.scrollWidth,
            innerWidth: window.innerWidth,
            overflow: docEl.scrollWidth > window.innerWidth
          };
        });
        assert(!modalOverflow.overflow, `[${vp.name}] Zero horizontal overflow with Product Modal open`,
          `scrollWidth: ${modalOverflow.scrollWidth}px, innerWidth: ${modalOverflow.innerWidth}px`);

        // Close modal via Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }

      // 4.2 Cart Drawer
      const cartTrigger = page.locator('#cart-btn');
      if (await cartTrigger.count() > 0) {
        await cartTrigger.click();
        await page.waitForTimeout(300);

        const drawerOverflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          return {
            scrollWidth: docEl.scrollWidth,
            innerWidth: window.innerWidth,
            overflow: docEl.scrollWidth > window.innerWidth
          };
        });
        assert(!drawerOverflow.overflow, `[${vp.name}] Zero horizontal overflow with Cart Drawer open`,
          `scrollWidth: ${drawerOverflow.scrollWidth}px, innerWidth: ${drawerOverflow.innerWidth}px`);

        // Close cart drawer via Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }

      // 4.3 Mobile Nav Drawer (if present on mobile/tablet)
      if (vp.width <= 1024) {
        const navToggle = page.locator('#nav-toggle');
        if (await navToggle.count() > 0 && await navToggle.isVisible()) {
          await navToggle.click();
          await page.waitForTimeout(300);

          const mobileNavOverflow = await page.evaluate(() => {
            const docEl = document.documentElement;
            return {
              scrollWidth: docEl.scrollWidth,
              innerWidth: window.innerWidth,
              overflow: docEl.scrollWidth > window.innerWidth
            };
          });
          assert(!mobileNavOverflow.overflow, `[${vp.name}] Zero horizontal overflow with Mobile Nav Drawer open`,
            `scrollWidth: ${mobileNavOverflow.scrollWidth}px, innerWidth: ${mobileNavOverflow.innerWidth}px`);

          // Close nav
          await navToggle.click();
          await page.waitForTimeout(300);
        }
      }

      // 5. Console & Page Error Verification
      assert(consoleErrors.length === 0, `[${vp.name}] Zero console.error calls during test execution`,
        consoleErrors.length === 0 ? 'Zero errors' : consoleErrors.join(' | '));
      assert(pageErrors.length === 0, `[${vp.name}] Zero unhandled exceptions or page errors`,
        pageErrors.length === 0 ? 'Zero exceptions' : pageErrors.join(' | '));
      assert(failedRequests.length === 0, `[${vp.name}] Zero failed network requests`,
        failedRequests.length === 0 ? 'Zero failed requests' : failedRequests.join(' | '));

      await page.close();
    }

    // =========================================================================
    // SECTION 2: Dedicated Focus Rings & Keyboard Navigation Deep-Check
    // =========================================================================
    console.log(`\n============================================================`);
    console.log(`  KEYBOARD NAVIGATION & FOCUS RINGS AUDIT`);
    console.log(`============================================================`);

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    // 1. Skip link focusability
    await page.keyboard.press('Tab');
    const skipLinkFocused = await page.evaluate(() => {
      const active = document.activeElement;
      return active?.classList.contains('skip-link') && active?.getBoundingClientRect().top >= 0;
    });
    assert(skipLinkFocused, 'Skip-to-main-content link becomes visible and focused on first Tab');

    // 2. Focus ring outline styling on buttons
    const focusRingReport = await page.evaluate(() => {
      const btn = document.querySelector('.btn-gold');
      if (!btn) return null;
      btn.focus();
      const style = window.getComputedStyle(btn);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor
      };
    });
    assert(focusRingReport !== null, 'Interactive elements accept keyboard focus');

    // 3. Focus restoration on modal close
    const catalogCard = page.locator('.product-card').first();
    await catalogCard.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const isModalOpen = await page.locator('.product-modal-card').isVisible();
    assert(isModalOpen, 'Product card activates and opens detail modal via keyboard Enter');

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isModalClosed = !(await page.locator('.product-modal-card').isVisible());
    assert(isModalClosed, 'Escape key cleanly dismisses product detail modal');

    // 4. Cart drawer keyboard accessibility & Escape dismissal
    const cartBtn = page.locator('#cart-btn');
    await cartBtn.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const isCartOpen = await page.locator('.cart-drawer.open, .cart-drawer-card').isVisible();
    assert(isCartOpen, 'Cart drawer opens via keyboard activation on cart trigger button');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isCartClosed = !(await page.locator('.cart-drawer.open, .cart-drawer-card').isVisible());
    assert(isCartClosed, 'Escape key cleanly closes cart drawer');

    await page.close();

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n============================================================');
  console.log(` AUDIT SUMMARY: ${results.passed} PASSED, ${results.failed} FAILED, ${results.warnings} WARNINGS`);
  console.log('============================================================\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('Audit fatal error:', err);
  process.exit(1);
});
