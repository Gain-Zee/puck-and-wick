/**
 * tests/stress/challenger-m4-i4-viewport-stress.js
 * Milestone 4 (R4) Iteration 4 Viewport, Touch Target & Visual Stress Verification
 */

import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3996;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let failures = 0;
let passed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else {
    failures++;
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runVerification() {
  console.log('======================================================');
  console.log('  CHALLENGER M4-2 (i4) EMPIRICAL VERIFICATION HARNESS');
  console.log('======================================================\n');

  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const width of [1440, 390, 320]) {
      console.log(`\n------------------------------------------------------`);
      console.log(`  Testing Viewport: ${width}px`);
      console.log(`------------------------------------------------------`);

      const page = await browser.newPage({ viewport: { width, height: 844 } });
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#studio', { state: 'visible', timeout: 5000 });
      await page.waitForSelector('.jar-mockup-workbench', { state: 'visible', timeout: 5000 });

      // If box builder exists on the page, wait for its elements too
      await page.waitForSelector('#exclusive-box', { state: 'attached', timeout: 5000 }).catch(() => {});

      const data = await page.evaluate((vpWidth) => {
        // 1. Navigation controls (#nav-toggle, #cart-btn)
        const navToggle = document.querySelector('#nav-toggle');
        const cartBtn = document.querySelector('#cart-btn');
        const navToggleRect = navToggle ? navToggle.getBoundingClientRect() : null;
        const cartBtnRect = cartBtn ? cartBtn.getBoundingClientRect() : null;

        // 2. Studio buttons and links
        const studioButtons = Array.from(document.querySelectorAll('#studio button, #studio a.btn, #studio .studio-toggle-btn, #studio .apply-logo-btn'));
        const studioBtnDetails = studioButtons.map(btn => {
          const r = btn.getBoundingClientRect();
          return {
            tag: btn.tagName.toLowerCase(),
            className: btn.className,
            text: (btn.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            left: Math.round(r.left * 10) / 10,
            right: Math.round(r.right * 10) / 10,
            width: Math.round(r.width * 10) / 10,
            height: Math.round(r.height * 10) / 10,
            meets44x44: r.height >= 43.95 && r.width >= 43.95,
            bleeds: r.right > vpWidth + 1.5 || r.left < -1.5
          };
        });

        // 3. .studio-toolbar-right
        const toolbarRight = document.querySelector('.studio-toolbar-right');
        const toolbarRightRect = toolbarRight ? toolbarRight.getBoundingClientRect() : null;
        const toolbarRightStyle = toolbarRight ? window.getComputedStyle(toolbarRight) : null;
        const toolbarRightBleeds = toolbarRightRect ? (toolbarRightRect.right > vpWidth + 1.5 || toolbarRightRect.left < -1.5) : false;

        // 4. .studio-primary-cta-row a.btn
        const primaryCta = document.querySelector('.studio-primary-cta-row a.btn');
        const primaryCtaRect = primaryCta ? primaryCta.getBoundingClientRect() : null;
        const primaryCtaBleeds = primaryCtaRect ? (primaryCtaRect.right > vpWidth + 1.5 || primaryCtaRect.left < -1.5) : false;

        // 5. Check all elements inside #studio for bleed
        const allStudioElements = Array.from(document.querySelectorAll('#studio *'));
        const bleedingElements = [];
        for (const el of allStudioElements) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) continue;
          if (r.right > vpWidth + 1.5) {
            bleedingElements.push({
              tag: el.tagName.toLowerCase(),
              className: el.className,
              id: el.id,
              text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
              right: Math.round(r.right * 10) / 10,
              excess: Math.round((r.right - vpWidth) * 10) / 10
            });
          }
        }

        // 6. Check images across entire page (including box builder thumbnails)
        const allImages = Array.from(document.querySelectorAll('img'));
        const boxImages = Array.from(document.querySelectorAll('#exclusive-box img, .box-builder img, [class*="box"] img'));
        const brokenImages = allImages.map(img => ({
          src: img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          broken: !img.complete || img.naturalWidth === 0
        })).filter(img => img.broken);

        return {
          docScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          navToggle: navToggleRect ? {
            width: Math.round(navToggleRect.width * 10) / 10,
            height: Math.round(navToggleRect.height * 10) / 10,
            meets44x44: navToggleRect.width >= 43.95 && navToggleRect.height >= 43.95
          } : null,
          cartBtn: cartBtnRect ? {
            width: Math.round(cartBtnRect.width * 10) / 10,
            height: Math.round(cartBtnRect.height * 10) / 10,
            meets44x44: cartBtnRect.width >= 43.95 && cartBtnRect.height >= 43.95
          } : null,
          studioButtonsCount: studioButtons.length,
          studioButtonsFailingTouch: studioBtnDetails.filter(b => !b.meets44x44),
          studioButtonsBleeding: studioBtnDetails.filter(b => b.bleeds),
          toolbarRight: toolbarRightRect ? {
            left: Math.round(toolbarRightRect.left * 10) / 10,
            right: Math.round(toolbarRightRect.right * 10) / 10,
            width: Math.round(toolbarRightRect.width * 10) / 10,
            height: Math.round(toolbarRightRect.height * 10) / 10,
            flexWrap: toolbarRightStyle ? toolbarRightStyle.flexWrap : null,
            display: toolbarRightStyle ? toolbarRightStyle.display : null,
            bleeds: toolbarRightBleeds
          } : null,
          primaryCta: primaryCtaRect ? {
            left: Math.round(primaryCtaRect.left * 10) / 10,
            right: Math.round(primaryCtaRect.right * 10) / 10,
            width: Math.round(primaryCtaRect.width * 10) / 10,
            height: Math.round(primaryCtaRect.height * 10) / 10,
            bleeds: primaryCtaBleeds,
            meets44x44: primaryCtaRect.width >= 43.95 && primaryCtaRect.height >= 43.95
          } : null,
          bleedingElementsCount: bleedingElements.length,
          bleedingElements,
          totalImages: allImages.length,
          boxImagesCount: boxImages.length,
          brokenImagesCount: brokenImages.length,
          brokenImages
        };
      }, width);

      // Assertions for this viewport:
      assert(
        data.docScrollWidth <= width,
        `[${width}px] Document scrollWidth (${data.docScrollWidth}px) <= viewport width (${width}px)`
      );

      assert(
        data.bleedingElementsCount === 0,
        `[${width}px] Zero elements inside #studio bleed past viewport right`,
        `Bleed count: ${data.bleedingElementsCount}`
      );

      if (data.primaryCta) {
        assert(
          !data.primaryCta.bleeds,
          `[${width}px] .studio-primary-cta-row a.btn does not bleed horizontally`,
          `right=${data.primaryCta.right}px, vpWidth=${width}px`
        );
        assert(
          data.primaryCta.meets44x44,
          `[${width}px] .studio-primary-cta-row a.btn meets >= 44x44px touch target`,
          `${data.primaryCta.width}x${data.primaryCta.height}px`
        );
      }

      if (data.toolbarRight) {
        assert(
          !data.toolbarRight.bleeds,
          `[${width}px] .studio-toolbar-right remains within viewport bounds`,
          `left=${data.toolbarRight.left}px, right=${data.toolbarRight.right}px, vpWidth=${width}px`
        );
        if (width <= 390) {
          assert(
            data.toolbarRight.flexWrap === 'wrap',
            `[${width}px] .studio-toolbar-right has flex-wrap: wrap`,
            `flexWrap: ${data.toolbarRight.flexWrap}`
          );
        }
      }

      // Studio buttons bleed check
      assert(
        data.studioButtonsBleeding.length === 0,
        `[${width}px] Zero studio buttons bleed horizontally`,
        `Bleeding count: ${data.studioButtonsBleeding.length}`
      );

      // Studio buttons touch target check (mobile viewports: width <= 768)
      if (width <= 768) {
        assert(
          data.studioButtonsFailingTouch.length === 0,
          `[${width}px] ALL ${data.studioButtonsCount} studio buttons meet >= 44x44px touch target`,
          data.studioButtonsFailingTouch.length === 0 ? 'All meet >=44x44' : `Failing: ${JSON.stringify(data.studioButtonsFailingTouch)}`
        );
      }

      // Nav toggle and cart button touch targets
      if (data.navToggle && width <= 768) {
        assert(
          data.navToggle.meets44x44,
          `[${width}px] #nav-toggle meets >= 44x44px touch target`,
          `${data.navToggle.width}x${data.navToggle.height}px`
        );
      }

      if (data.cartBtn) {
        assert(
          data.cartBtn.meets44x44,
          `[${width}px] #cart-btn meets >= 44x44px touch target`,
          `${data.cartBtn.width}x${data.cartBtn.height}px`
        );
      }

      // Broken images check
      assert(
        data.brokenImagesCount === 0,
        `[${width}px] Zero broken images across entire page (including box builder thumbnails)`,
        `Total: ${data.totalImages}, Box thumbs: ${data.boxImagesCount}, Broken: ${data.brokenImagesCount}`
      );

      assert(
        consoleErrors.length === 0,
        `[${width}px] Zero console errors`,
        `Errors: ${consoleErrors.join('; ')}`
      );

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n======================================================');
  console.log(`  VERIFICATION RESULTS: ${passed} PASSED, ${failures} FAILED`);
  console.log('======================================================\n');

  process.exit(failures > 0 ? 1 : 0);
}

runVerification().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
