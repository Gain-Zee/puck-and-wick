import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3881;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log('============================================================');
  console.log(' ADVERSARIAL BRAND STUDIO STATE & CONFIG TEST HARNESS');
  console.log('============================================================');

  const { server } = await startServer(PORT);
  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  const results = [];
  function record(testName, passed, details = {}) {
    results.push({ testName, passed, details });
    const status = passed ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
    console.log(`  ${status} ${testName}`);
    if (!passed && details) {
      console.log(`         \x1b[33mDetails: ${JSON.stringify(details)}\x1b[0m`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: window.BRAND_STUDIO_CONFIG = { enabled: false } pre-boot
    // -------------------------------------------------------------------------
    console.log('\n--- Test 1: window.BRAND_STUDIO_CONFIG = { enabled: false } pre-boot ---');
    const disabledContext = await browser.newContext();
    const disabledErrors = [];
    await disabledContext.addInitScript(() => {
      window.BRAND_STUDIO_CONFIG = { enabled: false };
    });
    const disabledPage = await disabledContext.newPage();
    disabledPage.on('pageerror', (err) => disabledErrors.push(err.message));
    disabledPage.on('console', (msg) => {
      if (msg.type() === 'error') disabledErrors.push(msg.text());
    });

    await disabledPage.goto(`${BASE_URL}/#studio`, { waitUntil: 'networkidle' });
    await disabledPage.waitForTimeout(300);

    const disabledState = await disabledPage.evaluate(() => {
      const studioSection = document.getElementById('studio');
      const navStudioLinks = Array.from(document.querySelectorAll('.nav-item-studio'));
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studioSection ? window.getComputedStyle(studioSection).display : 'missing',
        navDisplays: navStudioLinks.map((el) => window.getComputedStyle(el).display),
        hash: window.location.hash,
        storeShow: window.PuckWickStore?.state?.showBrandStudio,
        storeVisible: window.PuckWickStore?.state?.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });

    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } disables studio cleanly without errors',
      disabledErrors.length === 0 &&
      disabledState.bodyAttr === 'false' &&
      disabledState.studioDisplay === 'none' &&
      disabledState.navDisplays.every((d) => d === 'none') &&
      disabledState.hash === '#shop' &&
      disabledState.configEnabled === false,
      { disabledErrors, disabledState }
    );
    await disabledContext.close();

    // -------------------------------------------------------------------------
    // TEST 2: window.BRAND_STUDIO_CONFIG = { enabled: true } pre-boot
    // -------------------------------------------------------------------------
    console.log('\n--- Test 2: window.BRAND_STUDIO_CONFIG = { enabled: true } pre-boot ---');
    const enabledContext = await browser.newContext();
    const enabledErrors = [];
    await enabledContext.addInitScript(() => {
      window.BRAND_STUDIO_CONFIG = { enabled: true };
    });
    const enabledPage = await enabledContext.newPage();
    enabledPage.on('pageerror', (err) => enabledErrors.push(err.message));
    enabledPage.on('console', (msg) => {
      if (msg.type() === 'error') enabledErrors.push(msg.text());
    });

    await enabledPage.goto(`${BASE_URL}/#studio`, { waitUntil: 'networkidle' });
    await enabledPage.waitForTimeout(300);

    const enabledState = await enabledPage.evaluate(() => {
      const studioSection = document.getElementById('studio');
      const navStudioLinks = Array.from(document.querySelectorAll('.nav-item-studio'));
      const conceptCards = document.querySelectorAll('.logo-concept-card');
      const jarWorkbench = document.querySelector('.jar-mockup-workbench');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studioSection ? window.getComputedStyle(studioSection).display : 'missing',
        navDisplays: navStudioLinks.map((el) => window.getComputedStyle(el).display),
        hash: window.location.hash,
        storeShow: window.PuckWickStore?.state?.showBrandStudio,
        storeVisible: window.PuckWickStore?.state?.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled,
        conceptCardsCount: conceptCards.length,
        jarWorkbenchVisible: jarWorkbench !== null && window.getComputedStyle(jarWorkbench).display !== 'none'
      };
    });

    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } enables studio and UI correctly',
      enabledErrors.length === 0 &&
      (enabledState.bodyAttr === 'true' || enabledState.bodyAttr === null) &&
      enabledState.studioDisplay !== 'none' &&
      enabledState.navDisplays.some((d) => d !== 'none') &&
      enabledState.hash === '#studio' &&
      enabledState.configEnabled === true &&
      enabledState.conceptCardsCount === 4 &&
      enabledState.jarWorkbenchVisible,
      { enabledErrors, enabledState }
    );
    await enabledContext.close();

    // -------------------------------------------------------------------------
    // TEST 3: Store actions SET_ACTIVE_LOGO, SET_STUDIO_PREVIEW_CONCEPT, TOGGLE_BRAND_STUDIO, SET_STUDIO_VISIBLE
    // -------------------------------------------------------------------------
    console.log('\n--- Test 3: Store actions reactivity ---');
    const storePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await storePage.goto(BASE_URL, { waitUntil: 'networkidle' });

    // 3.1 SET_ACTIVE_LOGO
    for (let cid = 1; cid <= 4; cid++) {
      const activeRes = await storePage.evaluate((targetId) => {
        window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', targetId);
        const headerSvg = document.getElementById('brand-mark-header')?.innerHTML || '';
        const footerSvg = document.getElementById('brand-mark-footer')?.innerHTML || '';
        const storeId = window.PuckWickStore.state.activeLogoConcept;
        const localConcept = localStorage.getItem('pw_active_brand_concept');
        const localLogo = localStorage.getItem('puck_wick_logo');
        return {
          storeId,
          localConcept,
          localLogo,
          headerHasSvg: headerSvg.includes('<svg') && !headerSvg.includes('<image'),
          footerHasSvg: footerSvg.includes('<svg') && !footerSvg.includes('<image')
        };
      }, cid);

      record(
        `SET_ACTIVE_LOGO(${cid}) dispatches, updates store (${activeRes.storeId}), localStorage (${activeRes.localConcept}), and header/footer DOM`,
        activeRes.storeId === cid &&
        activeRes.localConcept === String(cid) &&
        activeRes.localLogo === String(cid) &&
        activeRes.headerHasSvg &&
        activeRes.footerHasSvg,
        activeRes
      );
    }

    // 3.2 SET_STUDIO_VISIBLE(false) and SET_STUDIO_VISIBLE(true)
    const setStudioVisibleFalse = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', false);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeShow: window.PuckWickStore.state.showBrandStudio,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'SET_STUDIO_VISIBLE(false) hides studio in DOM and state',
      setStudioVisibleFalse.bodyAttr === 'false' &&
      setStudioVisibleFalse.studioDisplay === 'none' &&
      setStudioVisibleFalse.storeVisible === false &&
      setStudioVisibleFalse.configEnabled === false,
      setStudioVisibleFalse
    );

    const setStudioVisibleTrue = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', true);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeShow: window.PuckWickStore.state.showBrandStudio,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'SET_STUDIO_VISIBLE(true) reveals studio in DOM and state',
      setStudioVisibleTrue.bodyAttr === 'true' &&
      setStudioVisibleTrue.studioDisplay !== 'none' &&
      setStudioVisibleTrue.storeVisible === true &&
      setStudioVisibleTrue.configEnabled === true,
      setStudioVisibleTrue
    );

    // 3.3 TOGGLE_BRAND_STUDIO action
    const toggleBrandStudioFalse = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('TOGGLE_BRAND_STUDIO', false);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeShow: window.PuckWickStore.state.showBrandStudio,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'TOGGLE_BRAND_STUDIO(false) dispatches and updates DOM reactively',
      toggleBrandStudioFalse.bodyAttr === 'false' &&
      toggleBrandStudioFalse.studioDisplay === 'none' &&
      toggleBrandStudioFalse.storeVisible === false,
      toggleBrandStudioFalse
    );

    const toggleBrandStudioTrue = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('TOGGLE_BRAND_STUDIO', true);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeShow: window.PuckWickStore.state.showBrandStudio,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'TOGGLE_BRAND_STUDIO(true) dispatches and updates DOM reactively',
      toggleBrandStudioTrue.bodyAttr === 'true' &&
      toggleBrandStudioTrue.studioDisplay !== 'none' &&
      toggleBrandStudioTrue.storeVisible === true,
      toggleBrandStudioTrue
    );

    // 3.4 SET_STUDIO_PREVIEW_CONCEPT action
    for (let cid = 1; cid <= 4; cid++) {
      const previewRes = await storePage.evaluate((targetId) => {
        window.PuckWickStore.dispatch('SET_STUDIO_PREVIEW_CONCEPT', targetId);
        const jarSvg = document.querySelector('.jar-svg-mount svg')?.outerHTML || '';
        const selectedCard = document.querySelector('.logo-concept-card.selected');
        const selectedCardId = selectedCard ? selectedCard.getAttribute('data-concept-id') : null;
        return {
          targetId,
          selectedCardId,
          hasEmblem: jarSvg.includes(`concept-${targetId}`) || jarSvg.includes(`Concept ${targetId}`) || jarSvg.length > 500
        };
      }, cid);

      record(
        `SET_STUDIO_PREVIEW_CONCEPT(${cid}) updates preview card and jar mockup stage`,
        previewRes.selectedCardId === String(cid) && previewRes.hasEmblem,
        previewRes
      );
    }

    // -------------------------------------------------------------------------
    // TEST 4: Rapid Concept Switching & Persistence in localStorage
    // -------------------------------------------------------------------------
    console.log('\n--- Test 4: Rapid Concept Switching & localStorage Persistence ---');
    const rapidSwitchingRes = await storePage.evaluate(async () => {
      const history = [];
      const sequence = [1, 3, 2, 4, 1, 4, 2, 3, 1, 2, 4, 3, 2, 1, 4, 3, 4, 2, 1, 3];
      for (const cid of sequence) {
        window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', cid);
        history.push({
          dispatched: cid,
          state: window.PuckWickStore.state.activeLogoConcept,
          storageConcept: localStorage.getItem('pw_active_brand_concept'),
          storageLogo: localStorage.getItem('puck_wick_logo')
        });
      }
      return history;
    });

    const rapidAllSynced = rapidSwitchingRes.every(
      (h) => h.dispatched === h.state &&
             h.storageConcept === String(h.dispatched) &&
             h.storageLogo === String(h.dispatched)
    );

    record(
      'Rapid concept switching (20 consecutive dispatches) preserves exact sync across store and localStorage',
      rapidAllSynced,
      { stepsCount: rapidSwitchingRes.length, sample: rapidSwitchingRes.slice(-3) }
    );

    // Reload and check final state
    await storePage.reload({ waitUntil: 'networkidle' });
    const finalReloadState = await storePage.evaluate(() => ({
      activeLogoConcept: window.PuckWickStore?.state?.activeLogoConcept,
      headerHtml: document.getElementById('brand-mark-header')?.innerHTML || '',
      footerHtml: document.getElementById('brand-mark-footer')?.innerHTML || ''
    }));

    record(
      'Page reload after rapid switching restores final concept (Concept 3) in Store & Header/Footer DOM',
      finalReloadState.activeLogoConcept === 3 &&
      finalReloadState.headerHtml.includes('<svg') &&
      finalReloadState.footerHtml.includes('<svg'),
      finalReloadState
    );

    await storePage.close();

    console.log('\n============================================================');
    console.log(' SUMMARY');
    console.log('============================================================');
    const passedCount = results.filter((r) => r.passed).length;
    const failedCount = results.filter((r) => !r.passed).length;
    console.log(`  Total: ${results.length}`);
    console.log(`  Passed: \x1b[32m${passedCount}\x1b[0m`);
    console.log(`  Failed: \x1b[31m${failedCount}\x1b[0m`);

    return { total: results.length, passed: passedCount, failed: failedCount, results };
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Fatal error in test script:', err);
  process.exit(1);
});
