/**
 * tests/reviewer-m4-stress.js
 * Independent Reviewer & Adversarial Stress Suite for Milestone 4 Iteration 2
 * Focuses on:
 * 1. Pre-boot config preservation (window.BRAND_STUDIO_CONFIG and window.APP_CONFIG)
 * 2. Non-clobbering of extra properties during Object.assign
 * 3. SET_STUDIO_VISIBLE handling across store, DOM, nav, hash, and configs
 * 4. All 4 custom SVG logos and live switcher reactivity
 * 5. Mockup jar rendering and controls
 */

import { chromium } from 'playwright';
import { startServer } from '../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEST_PORT = 3499;

let passed = 0;
let failed = 0;
const results = [];

function check(desc, ok, extra = '') {
  if (ok) {
    passed++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${desc} ${extra}`);
  }
  results.push({ desc, ok, extra });
}

async function run() {
  console.log('============================================================');
  console.log('REVIEWER M4 ITERATION 2 ADVERSARIAL VERIFICATION SUITE');
  console.log('============================================================\n');

  const { server } = await startServer(TEST_PORT);
  const baseUrl = `http://127.0.0.1:${TEST_PORT}`;

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    // -------------------------------------------------------------
    // Test 1: Pre-boot BRAND_STUDIO_CONFIG = { enabled: false, customMeta: 'alpha' }
    // -------------------------------------------------------------
    console.log('1. Testing pre-boot BRAND_STUDIO_CONFIG preservation...');
    const ctx1 = await browser.newContext();
    await ctx1.addInitScript(() => {
      window.BRAND_STUDIO_CONFIG = { enabled: false, customMeta: 'alpha' };
    });
    const page1 = await ctx1.newPage();
    await page1.goto(`${baseUrl}/#studio`);
    await page1.waitForTimeout(300);

    const res1 = await page1.evaluate(() => ({
      brandStudioConfig: window.BRAND_STUDIO_CONFIG,
      appConfig: window.APP_CONFIG,
      storeStateStudio: window.PuckWickStore.state.showBrandStudio,
      storeStateVisible: window.PuckWickStore.state.brandStudioVisible,
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      studioDisplay: document.getElementById('studio')?.style.display,
      navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map(el => el.style.display),
      hash: window.location.hash
    }));

    check('Pre-boot BRAND_STUDIO_CONFIG.enabled: false is preserved', res1.brandStudioConfig?.enabled === false);
    check('Pre-boot BRAND_STUDIO_CONFIG customMeta is preserved', res1.brandStudioConfig?.customMeta === 'alpha');
    check('APP_CONFIG.showBrandStudio inherits false', res1.appConfig?.showBrandStudio === false);
    check('PuckWickStore.state.showBrandStudio is false', res1.storeStateStudio === false);
    check('PuckWickStore.state.brandStudioVisible is false', res1.storeStateVisible === false);
    check('body data-brand-studio-visible is "false"', res1.bodyAttr === 'false');
    check('studio section style.display is "none"', res1.studioDisplay === 'none');
    check('nav-item-studio elements are hidden ("none")', res1.navDisplays.every(d => d === 'none'));
    check('hash #studio redirected to #shop', res1.hash === '#shop');

    await ctx1.close();

    // -------------------------------------------------------------
    // Test 2: Pre-boot APP_CONFIG = { showBrandStudio: false, theme: 'dark-obsidian' } (BRAND_STUDIO_CONFIG absent)
    // -------------------------------------------------------------
    console.log('\n2. Testing pre-boot APP_CONFIG preservation...');
    const ctx2 = await browser.newContext();
    await ctx2.addInitScript(() => {
      window.APP_CONFIG = { showBrandStudio: false, theme: 'dark-obsidian' };
    });
    const page2 = await ctx2.newPage();
    await page2.goto(`${baseUrl}/#studio`);
    await page2.waitForTimeout(300);

    const res2 = await page2.evaluate(() => ({
      brandStudioConfig: window.BRAND_STUDIO_CONFIG,
      appConfig: window.APP_CONFIG,
      storeStateStudio: window.PuckWickStore.state.showBrandStudio,
      storeStateVisible: window.PuckWickStore.state.brandStudioVisible,
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      studioDisplay: document.getElementById('studio')?.style.display,
      hash: window.location.hash
    }));

    check('Pre-boot APP_CONFIG.showBrandStudio: false is preserved', res2.appConfig?.showBrandStudio === false);
    check('Pre-boot APP_CONFIG theme is preserved', res2.appConfig?.theme === 'dark-obsidian');
    check('BRAND_STUDIO_CONFIG.enabled inherits false', res2.brandStudioConfig?.enabled === false);
    check('PuckWickStore.state.showBrandStudio is false', res2.storeStateStudio === false);
    check('body data-brand-studio-visible is "false"', res2.bodyAttr === 'false');
    check('studio section style.display is "none"', res2.studioDisplay === 'none');
    check('hash redirected to #shop', res2.hash === '#shop');

    await ctx2.close();

    // -------------------------------------------------------------
    // Test 3: Standard load & SET_STUDIO_VISIBLE handling
    // -------------------------------------------------------------
    console.log('\n3. Testing dynamic SET_STUDIO_VISIBLE dispatches...');
    const ctx3 = await browser.newContext();
    const page3 = await ctx3.newPage();
    await page3.goto(`${baseUrl}/`);
    await page3.waitForTimeout(200);

    // Initial state check
    const initialCheck = await page3.evaluate(() => ({
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      studioDisplay: document.getElementById('studio')?.style.display,
      navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map(el => el.style.display),
      storeFlag: window.PuckWickStore.state.showBrandStudio
    }));
    check('Initial state: studio is visible', initialCheck.bodyAttr === 'true' && initialCheck.storeFlag === true);

    // Dispatch SET_STUDIO_VISIBLE(false)
    const afterHide = await page3.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', false);
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: document.getElementById('studio')?.style.display,
        navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map(el => el.style.display),
        storeFlag: window.PuckWickStore.state.showBrandStudio,
        storeVis: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG.enabled,
        appConfigShow: window.APP_CONFIG.showBrandStudio
      };
    });

    check('SET_STUDIO_VISIBLE(false) updates bodyAttr to "false"', afterHide.bodyAttr === 'false');
    check('SET_STUDIO_VISIBLE(false) sets studioDisplay to "none"', afterHide.studioDisplay === 'none');
    check('SET_STUDIO_VISIBLE(false) hides all nav links ("none")', afterHide.navDisplays.every(d => d === 'none'));
    check('SET_STUDIO_VISIBLE(false) sets store showBrandStudio to false', afterHide.storeFlag === false);
    check('SET_STUDIO_VISIBLE(false) sets store brandStudioVisible to false', afterHide.storeVis === false);
    check('SET_STUDIO_VISIBLE(false) sets BRAND_STUDIO_CONFIG.enabled to false', afterHide.configEnabled === false);
    check('SET_STUDIO_VISIBLE(false) sets APP_CONFIG.showBrandStudio to false', afterHide.appConfigShow === false);

    // Test hash redirection while disabled
    await page3.evaluate(() => {
      window.location.hash = '#studio';
    });
    await page3.waitForTimeout(100);
    const hashRedirect = await page3.evaluate(() => window.location.hash);
    check('Attempting navigation to #studio while hidden redirects to #shop', hashRedirect === '#shop');

    // Dispatch SET_STUDIO_VISIBLE(true)
    const afterRestore = await page3.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', true);
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: document.getElementById('studio')?.style.display,
        navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map(el => el.style.display),
        storeFlag: window.PuckWickStore.state.showBrandStudio,
        configEnabled: window.BRAND_STUDIO_CONFIG.enabled
      };
    });

    check('SET_STUDIO_VISIBLE(true) restores bodyAttr to "true"', afterRestore.bodyAttr === 'true');
    check('SET_STUDIO_VISIBLE(true) restores studioDisplay to ""', afterRestore.studioDisplay === '');
    check('SET_STUDIO_VISIBLE(true) restores nav items to ""', afterRestore.navDisplays.every(d => d === ''));
    check('SET_STUDIO_VISIBLE(true) restores store and config flags', afterRestore.storeFlag === true && afterRestore.configEnabled === true);

    // -------------------------------------------------------------
    // Test 4: All 4 Custom SVG Logos and Live Switcher Reactivity
    // -------------------------------------------------------------
    console.log('\n4. Testing 4 custom SVG logos and live switcher reactivity...');
    for (let cid = 1; cid <= 4; cid++) {
      const applyBtn = page3.locator(`[data-apply-concept="${cid}"]`).first();
      await applyBtn.click();
      await page3.waitForTimeout(150);

      const status = await page3.evaluate((id) => {
        const headerSvg = document.querySelector('#site-header .brand-mark svg');
        const footerSvg = document.querySelector('footer .brand-mark svg');
        const jarSvg = document.querySelector('.jar-svg-mount svg');
        const activeConcept = window.PuckWickStore.state.activeLogoConcept;
        const storedLogo = localStorage.getItem('puck_wick_logo');
        const storedBrandConcept = localStorage.getItem('pw_active_brand_concept');

        return {
          activeConcept,
          storedLogo,
          storedBrandConcept,
          headerLabel: headerSvg?.getAttribute('aria-label') || '',
          footerLabel: footerSvg?.getAttribute('aria-label') || '',
          jarConceptAttr: jarSvg?.getAttribute('data-concept') || '',
          headerHasSvg: !!headerSvg,
          footerHasSvg: !!footerSvg,
          jarHasSvg: !!jarSvg
        };
      }, cid);

      check(`Concept ${cid}: Store activeLogoConcept is ${cid}`, status.activeConcept === cid);
      check(`Concept ${cid}: localStorage saved both keys`, status.storedLogo === String(cid) && status.storedBrandConcept === String(cid));
      check(`Concept ${cid}: Header brand mark has valid SVG`, status.headerHasSvg && status.headerLabel.includes(`Concept ${cid}`));
      check(`Concept ${cid}: Footer brand mark has valid SVG`, status.footerHasSvg && status.footerLabel.includes(`Concept ${cid}`));
      check(`Concept ${cid}: Jar Mockup reflects concept ${cid}`, status.jarHasSvg && status.jarConceptAttr === String(cid));
    }

    // -------------------------------------------------------------
    // Test 5: Jar Mockup Scent & Vessel Finish Controls
    // -------------------------------------------------------------
    console.log('\n5. Testing jar mockup scent and vessel controls...');
    await page3.click('[data-testid="mockup-scent-fresh-cut"]');
    await page3.waitForTimeout(100);
    const freshCutCheck = await page3.evaluate(() => {
      const jarHtml = document.querySelector('.jar-svg-mount')?.innerHTML || '';
      return jarHtml.includes('GLACIAL OZONE') && jarHtml.includes('SILVER FIR');
    });
    check('Mockup scent toggle switches to Fresh Cut (Ozone & Fir notes)', freshCutCheck);

    await page3.click('[data-testid="mockup-vessel-amber"]');
    await page3.waitForTimeout(100);
    const amberCheck = await page3.evaluate(() => {
      const jarHtml = document.querySelector('.jar-svg-mount')?.innerHTML || '';
      return jarHtml.includes('#5C2406'); // Deep amber gradient
    });
    check('Mockup vessel finish switches to Deep Amber Glass', amberCheck);

    await ctx3.close();

  } finally {
    await browser.close();
    if (server) server.close();
  }

  console.log('\n============================================================');
  console.log(`TOTAL PASSED: ${passed} | TOTAL FAILED: ${failed}`);
  console.log('============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Test run failed with error:', err);
  process.exit(1);
});
