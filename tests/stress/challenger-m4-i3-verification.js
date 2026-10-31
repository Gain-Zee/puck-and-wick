import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3995;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function verifyGateCriteria() {
  console.log('Starting Gate 3 Empirical Verification...');
  const { server, port } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    for (const width of [1440, 390, 320]) {
      console.log(`\n======================================================`);
      console.log(` VERIFYING VIEWPORT: ${width}px`);
      console.log(`======================================================`);

      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#studio', { state: 'visible', timeout: 5000 });
      await page.waitForSelector('.jar-mockup-workbench', { state: 'visible', timeout: 5000 });

      const evaluation = await page.evaluate((vpWidth) => {
        // 1. Verify nav-toggle and cart-btn
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
            bleeds: r.right > vpWidth + 1.5
          };
        });

        // 3. .studio-toolbar-right
        const toolbarRight = document.querySelector('.studio-toolbar-right');
        const toolbarRightRect = toolbarRight ? toolbarRight.getBoundingClientRect() : null;
        const toolbarRightBleeds = toolbarRightRect ? toolbarRightRect.right > vpWidth + 1.5 : false;

        // 4. .studio-primary-cta-row a.btn
        const primaryCta = document.querySelector('.studio-primary-cta-row a.btn');
        const primaryCtaRect = primaryCta ? primaryCta.getBoundingClientRect() : null;
        const primaryCtaBleeds = primaryCtaRect ? primaryCtaRect.right > vpWidth + 1.5 : false;

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

        // 6. Check images across the entire page
        const images = Array.from(document.querySelectorAll('img'));
        const brokenImages = images.map(img => ({
          src: img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          broken: !img.complete || img.naturalWidth === 0
        })).filter(img => img.broken);

        return {
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
          totalImages: images.length,
          brokenImagesCount: brokenImages.length,
          brokenImages
        };
      }, width);

      console.log(`- Nav Toggle: ${JSON.stringify(evaluation.navToggle)}`);
      console.log(`- Cart Btn: ${JSON.stringify(evaluation.cartBtn)}`);
      console.log(`- Studio Buttons Total: ${evaluation.studioButtonsCount}`);
      console.log(`- Studio Buttons Failing Touch (>=44x44px): ${evaluation.studioButtonsFailingTouch.length}`);
      if (evaluation.studioButtonsFailingTouch.length > 0) {
        console.log(`  Failing buttons: ${JSON.stringify(evaluation.studioButtonsFailingTouch)}`);
      }
      console.log(`- Studio Buttons Bleeding: ${evaluation.studioButtonsBleeding.length}`);
      console.log(`- Toolbar Right: ${JSON.stringify(evaluation.toolbarRight)}`);
      console.log(`- Primary CTA: ${JSON.stringify(evaluation.primaryCta)}`);
      console.log(`- Total Bleeding Elements in #studio: ${evaluation.bleedingElementsCount}`);
      if (evaluation.bleedingElementsCount > 0) {
        console.log(`  Bleeders: ${JSON.stringify(evaluation.bleedingElements)}`);
      }
      console.log(`- Total Page Images: ${evaluation.totalImages}, Broken: ${evaluation.brokenImagesCount}`);

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

verifyGateCriteria().catch(console.error);
