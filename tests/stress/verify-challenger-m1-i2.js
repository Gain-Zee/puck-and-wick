/**
 * tests/stress/verify-challenger-m1-i2.js
 * Independent Empirical Verification Harness for Milestone 1 Iteration 2 Gate.
 *
 * Verifies elimination of all 4 Iteration 1 failure modes:
 * 1. 320px viewport horizontal overflow (scrollWidth <= clientWidth, zero bleeding elements).
 * 2. Stockist showcase card and button bounds at 390px and 320px (zero clipping, zero horizontal bleed).
 * 3. Sticky header CLS (measured score < 0.05, zero height jump).
 * 4. Outside-click and Escape key dismiss for mobile drawer and wholesale modal.
 * 5. Zero console errors, zero uncaught page errors, zero broken network requests.
 */

import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3870;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const verificationResults = {
  passed: 0,
  failed: 0,
  checks: []
};

function pass(name, detail = '') {
  verificationResults.passed++;
  verificationResults.checks.push({ name, status: 'PASS', detail });
  console.log(`  \x1b[32m[PASS]\x1b[0m ${name}${detail ? ' — ' + detail : ''}`);
}

function fail(name, error) {
  verificationResults.failed++;
  verificationResults.checks.push({ name, status: 'FAIL', error: error.message || String(error) });
  console.error(`  \x1b[31m[FAIL]\x1b[0m ${name} — ${error.message || String(error)}`);
}

function createErrorWatcher(page) {
  const errors = {
    console: [],
    uncaught: [],
    failedRequests: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') errors.console.push(msg.text());
  });
  page.on('pageerror', err => {
    errors.uncaught.push(err.message || String(err));
  });
  page.on('requestfailed', req => {
    const url = req.url();
    if (!url.includes('favicon.ico')) {
      errors.failedRequests.push(`${req.method()} ${url} (${req.failure()?.errorText || 'failed'})`);
    }
  });

  return errors;
}

function assertCleanWatcher(watcher, context) {
  if (watcher.console.length > 0) {
    throw new Error(`Console errors in ${context}: ${watcher.console.join('; ')}`);
  }
  if (watcher.uncaught.length > 0) {
    throw new Error(`Uncaught page errors in ${context}: ${watcher.uncaught.join('; ')}`);
  }
  if (watcher.failedRequests.length > 0) {
    throw new Error(`Failed network requests in ${context}: ${watcher.failedRequests.join('; ')}`);
  }
}

async function run() {
  console.log('========================================================================');
  console.log('  EMPIRICAL CHALLENGER VERIFICATION HARNESS — MILESTONE 1 ITERATION 2');
  console.log('========================================================================\n');

  const { server } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    // -------------------------------------------------------------------------
    // ASSERTION 1: 320px Viewport Horizontal Overflow (scrollWidth <= clientWidth)
    // -------------------------------------------------------------------------
    console.log('--- 1. Viewport 320px Horizontal Overflow Check ---');
    {
      const context = await browser.newContext({ viewport: { width: 320, height: 568 } });
      const page = await context.newPage();
      const watcher = createErrorWatcher(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(100);

        const docMetrics = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          return {
            windowInnerWidth: window.innerWidth,
            docScrollWidth: doc.scrollWidth,
            docClientWidth: doc.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            bodyClientWidth: body.clientWidth
          };
        });

        if (docMetrics.docScrollWidth > docMetrics.docClientWidth) {
          throw new Error(`document.documentElement.scrollWidth (${docMetrics.docScrollWidth}) > clientWidth (${docMetrics.docClientWidth})`);
        }
        if (docMetrics.bodyScrollWidth > docMetrics.docClientWidth) {
          throw new Error(`document.body.scrollWidth (${docMetrics.bodyScrollWidth}) > clientWidth (${docMetrics.docClientWidth})`);
        }
        pass('320px Document & Body scrollWidth <= clientWidth', `doc=${docMetrics.docScrollWidth}/${docMetrics.docClientWidth}px, body=${docMetrics.bodyScrollWidth}/${docMetrics.bodyClientWidth}px`);

        // Scan every child element for bounding box bleed
        const bleeders = await page.evaluate(() => {
          const bad = [];
          for (const el of document.querySelectorAll('body *')) {
            if (['SCRIPT', 'STYLE', 'DEFS', 'PATTERN', 'LINEARGRADIENT', 'RADIALGRADIENT', 'FILTER', 'CLIPPATHTEMPLATE'].includes(el.tagName)) continue;
            const r = el.getBoundingClientRect();
            const s = window.getComputedStyle(el);
            if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') continue;
            if (r.width > 0 && r.height > 0 && r.right > 320.5) {
              bad.push({
                tag: el.tagName,
                id: el.id,
                cls: el.className,
                right: Math.round(r.right),
                width: Math.round(r.width)
              });
            }
          }
          return bad;
        });

        if (bleeders.length > 0) {
          throw new Error(`Found ${bleeders.length} elements bleeding horizontally past 320px: ${JSON.stringify(bleeders.slice(0, 3))}`);
        }
        pass('320px Child elements zero horizontal bleed past 320px', '0 bleeding elements found');

        assertCleanWatcher(watcher, '320px Viewport Check');
        pass('320px Zero console errors and zero failed requests', 'Clean');
      } catch (err) {
        fail('320px Viewport Horizontal Overflow', err);
      } finally {
        await context.close();
      }
    }

    // -------------------------------------------------------------------------
    // ASSERTION 2: Stockist Showcase Card and Button Bounds at 390px and 320px
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Stockist Showcase Card & Button Bounds (390px and 320px) ---');
    for (const w of [390, 320]) {
      const context = await browser.newContext({ viewport: { width: w, height: 800 } });
      const page = await context.newPage();
      const watcher = createErrorWatcher(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(100);

        const stockistBounds = await page.evaluate((vpW) => {
          const showcase = document.querySelector('.stockist-showcase');
          const content = document.querySelector('.stockist-content');
          const details = document.querySelector('.stockist-details-card');
          const buttons = Array.from(showcase.querySelectorAll('button, a.btn, .stockist-actions *'));

          if (!showcase) return { error: 'showcase not found' };

          const sRect = showcase.getBoundingClientRect();
          const cRect = content ? content.getBoundingClientRect() : null;
          const dRect = details ? details.getBoundingClientRect() : null;

          const buttonData = buttons.map(b => {
            const bRect = b.getBoundingClientRect();
            const bStyle = window.getComputedStyle(b);
            return {
              tag: b.tagName,
              id: b.id,
              text: b.innerText?.trim().slice(0, 25),
              width: Math.round(bRect.width),
              left: Math.round(bRect.left),
              right: Math.round(bRect.right),
              whiteSpace: bStyle.whiteSpace,
              overflow: bStyle.overflow,
              scrollWidth: b.scrollWidth,
              clientWidth: b.clientWidth,
              hasInternalOverflow: b.scrollWidth > b.clientWidth
            };
          });

          return {
            vpW,
            showcase: {
              width: Math.round(sRect.width),
              left: Math.round(sRect.left),
              right: Math.round(sRect.right)
            },
            content: cRect ? {
              width: Math.round(cRect.width),
              left: Math.round(cRect.left),
              right: Math.round(cRect.right),
              bleedsCard: cRect.right > sRect.right + 0.5,
              bleedsVp: cRect.right > vpW + 0.5
            } : null,
            details: dRect ? {
              width: Math.round(dRect.width),
              left: Math.round(dRect.left),
              right: Math.round(dRect.right),
              bleedsCard: dRect.right > sRect.right + 0.5,
              bleedsVp: dRect.right > vpW + 0.5
            } : null,
            buttons: buttonData
          };
        }, w);

        if (stockistBounds.error) throw new Error(stockistBounds.error);

        // Verify showcase card stays inside viewport
        if (stockistBounds.showcase.right > w + 0.5 || stockistBounds.showcase.left < 0) {
          throw new Error(`Showcase card bounds out of viewport @ ${w}px: left=${stockistBounds.showcase.left}, right=${stockistBounds.showcase.right}`);
        }
        pass(`Stockist showcase card bounds within viewport @ ${w}px`, `width=${stockistBounds.showcase.width}px [left:${stockistBounds.showcase.left}, right:${stockistBounds.showcase.right}]`);

        // Verify content column does not bleed past card right edge
        if (stockistBounds.content.bleedsCard || stockistBounds.content.bleedsVp) {
          throw new Error(`Stockist content column bleeds @ ${w}px! content.right=${stockistBounds.content.right}, card.right=${stockistBounds.showcase.right}, vp=${w}`);
        }
        pass(`Stockist content column zero bleed past gold card border @ ${w}px`, `content.right=${stockistBounds.content.right} <= card.right=${stockistBounds.showcase.right}`);

        // Verify buttons bounds and no text clipping
        for (const btn of stockistBounds.buttons) {
          if (btn.right > stockistBounds.showcase.right + 0.5 || btn.right > w + 0.5) {
            throw new Error(`Button "${btn.text}" (${btn.id}) bleeds past bounds @ ${w}px! btn.right=${btn.right}, card.right=${stockistBounds.showcase.right}`);
          }
          if (btn.hasInternalOverflow) {
            throw new Error(`Button "${btn.text}" has internal text clipping/overflow: scrollWidth (${btn.scrollWidth}) > clientWidth (${btn.clientWidth})`);
          }
        }
        pass(`All stockist action buttons contained with zero clipping @ ${w}px`, `${stockistBounds.buttons.length} buttons verified, white-space wrapped, zero overflow`);

        assertCleanWatcher(watcher, `Stockist @ ${w}px`);
      } catch (err) {
        fail(`Stockist Bounds @ ${w}px`, err);
      } finally {
        await context.close();
      }
    }

    // -------------------------------------------------------------------------
    // ASSERTION 3: Sticky Header CLS (Measured Score < 0.05)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Sticky Header Cumulative Layout Shift (CLS) ---');
    for (const vp of [{ name: 'Desktop (1440x900)', w: 1440, h: 900 }, { name: 'Mobile (390x844)', w: 390, h: 844 }]) {
      const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
      const page = await context.newPage();
      const watcher = createErrorWatcher(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        // Setup CLS PerformanceObserver
        await page.evaluate(() => {
          window.__clsScore = 0;
          window.__shiftEntries = [];
          try {
            const observer = new PerformanceObserver(entryList => {
              for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                  window.__clsScore += entry.value;
                  window.__shiftEntries.push({
                    value: entry.value,
                    sources: entry.sources?.map(s => ({
                      tag: s.node?.nodeName,
                      currentRect: s.currentRect,
                      previousRect: s.previousRect
                    }))
                  });
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
          } catch (e) {
            window.__clsError = e.message;
          }
        });

        // Verify initial header height
        const initialHeight = await page.evaluate(() => {
          const header = document.querySelector('.site-header');
          return header ? header.getBoundingClientRect().height : -1;
        });

        // Perform 15 rapid vertical scroll oscillations
        for (let i = 0; i < 15; i++) {
          await page.evaluate(y => window.scrollTo(0, y), 300 + (i % 3) * 200);
          await page.waitForTimeout(20);

          const scrolledHeight = await page.evaluate(() => {
            const header = document.querySelector('.site-header');
            return header ? header.getBoundingClientRect().height : -1;
          });

          if (Math.abs(scrolledHeight - initialHeight) > 1) {
            throw new Error(`Sticky header height altered on scroll! Initial: ${initialHeight}px, Scrolled: ${scrolledHeight}px`);
          }

          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(20);
        }

        const clsReport = await page.evaluate(() => ({
          score: window.__clsScore || 0,
          shifts: window.__shiftEntries || []
        }));

        if (clsReport.score >= 0.05) {
          throw new Error(`CLS score (${clsReport.score.toFixed(5)}) exceeds 0.05 limit! Shifts: ${JSON.stringify(clsReport.shifts)}`);
        }

        pass(`Sticky header height stability during 15 scroll oscillations @ ${vp.name}`, `Height unchanged at ${initialHeight}px (zero jump)`);
        pass(`Sticky header measured CLS @ ${vp.name}`, `CLS = ${clsReport.score.toFixed(4)} (< 0.05 threshold)`);

        assertCleanWatcher(watcher, `CLS @ ${vp.name}`);
      } catch (err) {
        fail(`CLS @ ${vp.name}`, err);
      } finally {
        await context.close();
      }
    }

    // -------------------------------------------------------------------------
    // ASSERTION 4: Outside-Click & Escape Key Dismiss for Mobile Drawer & Wholesale Modal
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Outside-Click & Escape Dismiss Testing ---');
    {
      // 4A: Mobile Drawer (390x844)
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      const watcher = createErrorWatcher(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        const toggle = page.locator('#nav-toggle');
        const mobileNav = page.locator('#mobile-nav');

        // Test 4A.1: Escape key dismiss
        await toggle.click();
        await page.waitForTimeout(50);
        let isOpen = await mobileNav.evaluate(el => el.classList.contains('open'));
        if (!isOpen) throw new Error('Mobile drawer did not open on toggle click');

        await page.keyboard.press('Escape');
        await page.waitForTimeout(100);
        let isClosed = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!isClosed) throw new Error('Mobile drawer failed to close on Escape key');
        pass('Mobile Navigation: Escape key dismiss', 'Closed successfully');

        // Test 4A.2: Outside-click dismiss
        await toggle.click();
        await page.waitForTimeout(50);
        isOpen = await mobileNav.evaluate(el => el.classList.contains('open'));
        if (!isOpen) throw new Error('Mobile drawer did not open on second toggle click');

        // Click outside drawer at bottom of screen
        await page.mouse.click(20, 800);
        await page.waitForTimeout(100);
        isClosed = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!isClosed) throw new Error('Mobile drawer failed to close when tapping outside the drawer overlay');
        pass('Mobile Navigation: Outside-click dismiss', 'Closed successfully on document click outside');

        // Test 4A.3: Anchor link dismiss
        await toggle.click();
        await page.waitForTimeout(50);
        const storyLink = page.locator('#mobile-nav a[href="#story"]');
        await storyLink.click();
        await page.waitForTimeout(150);
        isClosed = await mobileNav.evaluate(el => !el.classList.contains('open'));
        if (!isClosed) throw new Error('Mobile drawer failed to close after clicking nav anchor link');
        pass('Mobile Navigation: Anchor link click dismiss', 'Closed and scrolled to section');

        assertCleanWatcher(watcher, 'Mobile Drawer Dismiss');
      } catch (err) {
        fail('Mobile Drawer Dismiss', err);
      } finally {
        await context.close();
      }
    }

    {
      // 4B: Wholesale Inquiry Modal (1440x900 and 390x844)
      for (const vp of [{ name: 'Desktop', w: 1440, h: 900 }, { name: 'Mobile', w: 390, h: 844 }]) {
        const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
        const page = await context.newPage();
        const watcher = createErrorWatcher(page);

        try {
          await page.goto(BASE_URL, { waitUntil: 'networkidle' });

          const inquireBtn = page.locator('#btn-inquire-wholesale');
          await inquireBtn.scrollIntoViewIfNeeded();
          await inquireBtn.click();
          await page.waitForTimeout(100);

          const backdrop = page.locator('#wholesale-modal-backdrop');
          const modalCard = page.locator('.wholesale-modal');

          let isRendered = (await backdrop.count()) > 0 && await modalCard.isVisible();
          if (!isRendered) throw new Error('Wholesale modal failed to open');

          // Verify form fields inside modal
          const formCheck = await page.evaluate(() => {
            const m = document.querySelector('.wholesale-modal');
            const f = m?.querySelector('form#wholesale-form');
            const inputs = m ? Array.from(m.querySelectorAll('input, textarea')) : [];
            return {
              hasForm: !!f,
              inputNames: inputs.map(i => i.name || i.id),
              inputCount: inputs.length
            };
          });

          if (!formCheck.hasForm || formCheck.inputCount < 3) {
            throw new Error(`Wholesale modal missing interactive form fields: ${JSON.stringify(formCheck)}`);
          }

          // Test 4B.1: Escape key dismiss
          await page.keyboard.press('Escape');
          await page.waitForTimeout(100);
          let dismissed = (await backdrop.count()) === 0;
          if (!dismissed) throw new Error('Wholesale modal failed to dismiss on Escape key');
          pass(`Wholesale Modal: Escape key dismiss @ ${vp.name}`, 'Closed cleanly and removed backdrop');

          // Test 4B.2: Outside backdrop click dismiss
          await inquireBtn.click();
          await page.waitForTimeout(100);
          await page.mouse.click(10, 10); // click in backdrop corner
          await page.waitForTimeout(100);
          dismissed = (await backdrop.count()) === 0;
          if (!dismissed) throw new Error('Wholesale modal failed to dismiss on outside backdrop click');
          pass(`Wholesale Modal: Outside click dismiss @ ${vp.name}`, 'Closed cleanly on backdrop click');

          // Test 4B.3: Close button dismiss
          await inquireBtn.click();
          await page.waitForTimeout(100);
          const closeBtn = page.locator('#btn-close-wholesale');
          await closeBtn.click();
          await page.waitForTimeout(100);
          dismissed = (await backdrop.count()) === 0;
          if (!dismissed) throw new Error('Wholesale modal failed to dismiss on #btn-close-wholesale click');
          pass(`Wholesale Modal: Close button dismiss @ ${vp.name}`, 'Closed cleanly on close button click');

          assertCleanWatcher(watcher, `Wholesale Modal @ ${vp.name}`);
        } catch (err) {
          fail(`Wholesale Modal @ ${vp.name}`, err);
        } finally {
          await context.close();
        }
      }
    }

    // -------------------------------------------------------------------------
    // ASSERTION 5: Zero Console Errors, Zero Uncaught Page Errors, Zero Broken Requests
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Zero Error Trapping & Asset Integrity Audit ---');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const watcher = createErrorWatcher(page);

      try {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });

        // Trigger interactive user journey actions across the page
        // 1. Click all section navigation anchors
        for (const hash of ['#shop', '#exclusive-boxes', '#story', '#stockists', '#studio']) {
          const link = page.locator(`header nav a[href="${hash}"]`).first();
          if ((await link.count()) > 0) {
            await link.click();
            await page.waitForTimeout(50);
          }
        }

        // 2. Open and dismiss cart drawer trigger
        const cartBtn = page.locator('#cart-btn');
        if ((await cartBtn.count()) > 0) {
          await cartBtn.click();
          await page.waitForTimeout(50);
        }

        // 3. Open wholesale modal, fill form, submit
        const inquireBtn = page.locator('#btn-inquire-wholesale');
        if ((await inquireBtn.count()) > 0) {
          await inquireBtn.scrollIntoViewIfNeeded();
          await inquireBtn.click();
          await page.waitForTimeout(50);

          await page.fill('#wholesale-name', 'Challenger Retailer');
          await page.fill('#wholesale-email', 'challenger@boutique.com');
          await page.fill('#wholesale-business', 'Artisan Outpost');
          await page.fill('#wholesale-notes', 'Sample wholesale inquiry test from empirical challenger.');
          
          const submitBtn = page.locator('.wholesale-modal button[type="submit"]');
          if ((await submitBtn.count()) > 0) {
            await submitBtn.click();
            await page.waitForTimeout(100);
          }
        }

        // 4. Verify no broken assets (images, svgs, stylesheets)
        const assetAudit = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0);
          const emptySvgs = Array.from(document.querySelectorAll('svg')).filter(s => s.children.length === 0 && !s.textContent.trim());
          return {
            brokenImgCount: imgs.length,
            emptySvgCount: emptySvgs.length
          };
        });

        if (assetAudit.brokenImgCount > 0 || assetAudit.emptySvgCount > 0) {
          throw new Error(`Asset audit failed: ${assetAudit.brokenImgCount} broken images, ${assetAudit.emptySvgCount} empty SVGs`);
        }
        pass('Asset integrity check', '0 broken images, 0 empty SVGs');

        assertCleanWatcher(watcher, 'Full Site User Flow Audit');
        pass('Zero-tolerance error trap audit', '0 console errors, 0 uncaught exceptions, 0 failed network requests');
      } catch (err) {
        fail('Full Site Error Audit', err);
      } finally {
        await context.close();
      }
    }

  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n========================================================================');
  console.log(`  VERIFICATION SUMMARY: ${verificationResults.passed} PASSED | ${verificationResults.failed} FAILED`);
  console.log('========================================================================\n');

  return verificationResults;
}

run().then(res => {
  if (res.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}).catch(err => {
  console.error('Fatal verification runner error:', err);
  process.exit(1);
});
