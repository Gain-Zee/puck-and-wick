import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3889;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function main() {
  console.log('============================================================');
  console.log(' CHALLENGER M4 ITERATION 4 DEEP VERIFICATION & STRESS HARNESS');
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
    // CRITERION 1: window.BRAND_STUDIO_CONFIG = { enabled: false } pre-boot
    // -------------------------------------------------------------------------
    console.log('\n--- Criterion 1: window.BRAND_STUDIO_CONFIG = { enabled: false } pre-boot ---');
    const disabledContext = await browser.newContext();
    const disabledConsoleErrors = [];
    await disabledContext.addInitScript(() => {
      window.BRAND_STUDIO_CONFIG = { enabled: false };
    });
    const disabledPage = await disabledContext.newPage();
    disabledPage.on('pageerror', (err) => disabledConsoleErrors.push(err.message));
    disabledPage.on('console', (msg) => {
      if (msg.type() === 'error') disabledConsoleErrors.push(msg.text());
    });

    await disabledPage.goto(`${BASE_URL}/#studio`, { waitUntil: 'networkidle' });
    await disabledPage.waitForTimeout(300);

    const disabledEvaluation = await disabledPage.evaluate(() => {
      const studioSec = document.getElementById('studio');
      const navLinks = Array.from(document.querySelectorAll('.nav-item-studio'));
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioComputedDisplay: studioSec ? window.getComputedStyle(studioSec).display : 'missing',
        navComputedDisplays: navLinks.map((el) => window.getComputedStyle(el).display),
        currentHash: window.location.hash,
        storeShowStudio: window.PuckWickStore?.state?.showBrandStudio,
        storeStudioVisible: window.PuckWickStore?.state?.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });

    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } zero console errors',
      disabledConsoleErrors.length === 0,
      { disabledConsoleErrors }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } body data-brand-studio-visible === "false"',
      disabledEvaluation.bodyAttr === 'false',
      { bodyAttr: disabledEvaluation.bodyAttr }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } studio display === "none"',
      disabledEvaluation.studioComputedDisplay === 'none',
      { display: disabledEvaluation.studioComputedDisplay }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } all studio nav items hidden',
      disabledEvaluation.navComputedDisplays.length > 0 &&
      disabledEvaluation.navComputedDisplays.every((d) => d === 'none'),
      { navDisplays: disabledEvaluation.navComputedDisplays }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } redirects #studio hash to #shop',
      disabledEvaluation.currentHash === '#shop',
      { hash: disabledEvaluation.currentHash }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } store state and config synchronized',
      disabledEvaluation.storeShowStudio === false &&
      disabledEvaluation.storeStudioVisible === false &&
      disabledEvaluation.configEnabled === false,
      disabledEvaluation
    );
    await disabledContext.close();

    // -------------------------------------------------------------------------
    // CRITERION 2: window.BRAND_STUDIO_CONFIG = { enabled: true } pre-boot
    // -------------------------------------------------------------------------
    console.log('\n--- Criterion 2: window.BRAND_STUDIO_CONFIG = { enabled: true } pre-boot ---');
    const enabledContext = await browser.newContext();
    const enabledConsoleErrors = [];
    await enabledContext.addInitScript(() => {
      window.BRAND_STUDIO_CONFIG = { enabled: true };
    });
    const enabledPage = await enabledContext.newPage();
    enabledPage.on('pageerror', (err) => enabledConsoleErrors.push(err.message));
    enabledPage.on('console', (msg) => {
      if (msg.type() === 'error') enabledConsoleErrors.push(msg.text());
    });

    await enabledPage.goto(`${BASE_URL}/#studio`, { waitUntil: 'networkidle' });
    await enabledPage.waitForTimeout(300);

    const enabledEvaluation = await enabledPage.evaluate(() => {
      const studioSec = document.getElementById('studio');
      const navLinks = Array.from(document.querySelectorAll('.nav-item-studio'));
      const cards = document.querySelectorAll('.logo-concept-card');
      const jarStage = document.querySelector('.jar-mockup-workbench');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studioSec ? window.getComputedStyle(studioSec).display : 'missing',
        navDisplays: navLinks.map((el) => window.getComputedStyle(el).display),
        currentHash: window.location.hash,
        cardsCount: cards.length,
        jarStageDisplay: jarStage ? window.getComputedStyle(jarStage).display : 'missing',
        storeShowStudio: window.PuckWickStore?.state?.showBrandStudio,
        storeStudioVisible: window.PuckWickStore?.state?.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });

    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } zero console errors',
      enabledConsoleErrors.length === 0,
      { enabledConsoleErrors }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } studio section visible',
      enabledEvaluation.studioDisplay !== 'none' && enabledEvaluation.studioDisplay !== 'missing',
      { studioDisplay: enabledEvaluation.studioDisplay }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } exactly 4 concept cards rendered',
      enabledEvaluation.cardsCount === 4,
      { cardsCount: enabledEvaluation.cardsCount }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } jar workbench visible and interactive',
      enabledEvaluation.jarStageDisplay !== 'none' && enabledEvaluation.jarStageDisplay !== 'missing',
      { jarStageDisplay: enabledEvaluation.jarStageDisplay }
    );
    record(
      'Pre-boot BRAND_STUDIO_CONFIG = { enabled: true } studio nav items displayed and hash preserved',
      enabledEvaluation.navDisplays.some((d) => d !== 'none') && enabledEvaluation.currentHash === '#studio',
      { navDisplays: enabledEvaluation.navDisplays, hash: enabledEvaluation.currentHash }
    );
    await enabledContext.close();

    // -------------------------------------------------------------------------
    // CRITERION 3: Store actions reactivity & DOM synchronization
    // -------------------------------------------------------------------------
    console.log('\n--- Criterion 3: Store actions reactivity & DOM updates ---');
    const storePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await storePage.goto(BASE_URL, { waitUntil: 'networkidle' });

    // 3.1 SET_ACTIVE_LOGO across 1..4
    for (let c = 1; c <= 4; c++) {
      const activeRes = await storePage.evaluate((cid) => {
        window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', cid);
        const headerSvg = document.getElementById('brand-mark-header')?.innerHTML || '';
        const footerSvg = document.getElementById('brand-mark-footer')?.innerHTML || '';
        const storeConcept = window.PuckWickStore.state.activeLogoConcept;
        const lsConcept = localStorage.getItem('pw_active_brand_concept');
        const lsLogo = localStorage.getItem('puck_wick_logo');
        return {
          storeConcept,
          lsConcept,
          lsLogo,
          headerHasSvg: headerSvg.includes('<svg') && !headerSvg.includes('<image'),
          footerHasSvg: footerSvg.includes('<svg') && !footerSvg.includes('<image')
        };
      }, c);

      record(
        `SET_ACTIVE_LOGO(${c}) reactively updates store state, localStorage keys, and header/footer SVGs`,
        activeRes.storeConcept === c &&
        activeRes.lsConcept === String(c) &&
        activeRes.lsLogo === String(c) &&
        activeRes.headerHasSvg &&
        activeRes.footerHasSvg,
        activeRes
      );
    }

    // 3.2 SET_STUDIO_VISIBLE(false) and SET_STUDIO_VISIBLE(true)
    const setVisibleFalse = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', false);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'SET_STUDIO_VISIBLE(false) sets data-brand-studio-visible="false" and studio display="none"',
      setVisibleFalse.bodyAttr === 'false' &&
      setVisibleFalse.studioDisplay === 'none' &&
      setVisibleFalse.storeVisible === false &&
      setVisibleFalse.configEnabled === false,
      setVisibleFalse
    );

    const setVisibleTrue = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', true);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'SET_STUDIO_VISIBLE(true) sets data-brand-studio-visible="true" and studio display=""',
      setVisibleTrue.bodyAttr === 'true' &&
      setVisibleTrue.studioDisplay !== 'none' &&
      setVisibleTrue.storeVisible === true &&
      setVisibleTrue.configEnabled === true,
      setVisibleTrue
    );

    // 3.3 TOGGLE_BRAND_STUDIO(false) and TOGGLE_BRAND_STUDIO(true)
    const toggleFalse = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('TOGGLE_BRAND_STUDIO', false);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'TOGGLE_BRAND_STUDIO(false) dispatches and updates DOM & config reactively',
      toggleFalse.bodyAttr === 'false' &&
      toggleFalse.studioDisplay === 'none' &&
      toggleFalse.storeVisible === false &&
      toggleFalse.configEnabled === false,
      toggleFalse
    );

    const toggleTrue = await storePage.evaluate(() => {
      window.PuckWickStore.dispatch('TOGGLE_BRAND_STUDIO', true);
      const studio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: studio ? studio.style.display : null,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });
    record(
      'TOGGLE_BRAND_STUDIO(true) dispatches and restores DOM & config reactively',
      toggleTrue.bodyAttr === 'true' &&
      toggleTrue.studioDisplay !== 'none' &&
      toggleTrue.storeVisible === true &&
      toggleTrue.configEnabled === true,
      toggleTrue
    );

    // 3.4 SET_STUDIO_PREVIEW_CONCEPT across 1..4
    for (let c = 1; c <= 4; c++) {
      const previewRes = await storePage.evaluate((cid) => {
        window.PuckWickStore.dispatch('SET_STUDIO_PREVIEW_CONCEPT', cid);
        const selectedCard = document.querySelector('.logo-concept-card.selected');
        const selectedCardId = selectedCard ? selectedCard.getAttribute('data-concept-id') : null;
        const jarSvg = document.querySelector('.jar-svg-mount svg')?.outerHTML || '';
        const previewConcept = window.PuckWickStore.state.studioPreviewConcept;
        return {
          cid,
          previewConcept,
          selectedCardId,
          hasEmblem: jarSvg.length > 500
        };
      }, c);

      record(
        `SET_STUDIO_PREVIEW_CONCEPT(${c}) updates store.studioPreviewConcept (${previewRes.previewConcept}), selected card (${previewRes.selectedCardId}), and jar mockup stage`,
        previewRes.previewConcept === c &&
        previewRes.selectedCardId === String(c) &&
        previewRes.hasEmblem,
        previewRes
      );
    }

    // -------------------------------------------------------------------------
    // CRITERION 4: Rapid Concept Switching, Interleaved Actions & Persistence
    // -------------------------------------------------------------------------
    console.log('\n--- Criterion 4: Rapid Concept Switching, Interleaving & Persistence ---');

    // 4.1 Rapid 30-step pseudo-random switching between active concepts
    const rapid30 = await storePage.evaluate(() => {
      const sequence = [
        2, 4, 1, 3, 4, 2, 1, 1, 3, 2, 4, 3, 1, 4, 2,
        3, 1, 2, 4, 1, 3, 4, 2, 3, 1, 4, 2, 1, 3, 4
      ];
      const records = [];
      for (const target of sequence) {
        window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', target);
        records.push({
          target,
          storeVal: window.PuckWickStore.state.activeLogoConcept,
          lsConcept: localStorage.getItem('pw_active_brand_concept'),
          lsLogo: localStorage.getItem('puck_wick_logo')
        });
      }
      return records;
    });

    const rapid30Passed = rapid30.every(
      (r) => r.target === r.storeVal &&
             r.lsConcept === String(r.target) &&
             r.lsLogo === String(r.target)
    );
    record(
      'Rapid active concept switching (30 consecutive dispatches) preserves store and dual localStorage sync at every step',
      rapid30Passed,
      { count: rapid30.length, sample: rapid30.slice(-3) }
    );

    // 4.2 Interleaved SET_STUDIO_PREVIEW_CONCEPT and SET_ACTIVE_LOGO
    // Ensure that previewing concept 1 does NOT overwrite active logo 4, and vice versa
    const interleaveRes = await storePage.evaluate(() => {
      // Set active logo to 4
      window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', 4);
      // Set preview concept to 2
      window.PuckWickStore.dispatch('SET_STUDIO_PREVIEW_CONCEPT', 2);

      const activeConcept = window.PuckWickStore.state.activeLogoConcept;
      const previewConcept = window.PuckWickStore.state.studioPreviewConcept;
      const selectedCard = document.querySelector('.logo-concept-card.selected')?.getAttribute('data-concept-id');
      const headerHtml = document.getElementById('brand-mark-header')?.innerHTML || '';

      return {
        activeConcept,
        previewConcept,
        selectedCard,
        headerHasSvg: headerHtml.includes('<svg')
      };
    });

    record(
      'Interleaving SET_STUDIO_PREVIEW_CONCEPT(2) with active logo 4 keeps preview isolated from active site logo',
      interleaveRes.activeConcept === 4 &&
      interleaveRes.previewConcept === 2 &&
      interleaveRes.selectedCard === '2' &&
      interleaveRes.headerHasSvg,
      interleaveRes
    );

    // 4.3 Malformed boundary inputs to SET_STUDIO_PREVIEW_CONCEPT
    const malformedPreviewRes = await storePage.evaluate(() => {
      const inputs = [0, 5, -100, 9999, 'bogus', null, undefined, {}];
      const outcomes = [];
      for (const val of inputs) {
        window.PuckWickStore.dispatch('SET_STUDIO_PREVIEW_CONCEPT', val);
        outcomes.push({
          val: String(val),
          previewVal: window.PuckWickStore.state.studioPreviewConcept
        });
      }
      return outcomes;
    });

    const allMalformedClamped = malformedPreviewRes.every(
      (o) => o.previewVal >= 1 && o.previewVal <= 4
    );
    record(
      'Malformed/boundary inputs to SET_STUDIO_PREVIEW_CONCEPT clamp safely to range [1, 4]',
      allMalformedClamped,
      { malformedPreviewRes }
    );

    // 4.4 Hard page reload persistence
    // Active logo was left at 4; reload page and assert Concept 4 is cleanly hydrated
    await storePage.reload({ waitUntil: 'networkidle' });
    const reloadHydration = await storePage.evaluate(() => {
      return {
        activeLogoConcept: window.PuckWickStore.state.activeLogoConcept,
        headerHtml: document.getElementById('brand-mark-header')?.innerHTML || '',
        footerHtml: document.getElementById('brand-mark-footer')?.innerHTML || '',
        lsConcept: localStorage.getItem('pw_active_brand_concept'),
        lsLogo: localStorage.getItem('puck_wick_logo')
      };
    });

    record(
      'Hard page reload preserves active logo (Concept 4) in Store and renders valid SVGs in Header & Footer',
      reloadHydration.activeLogoConcept === 4 &&
      reloadHydration.lsConcept === '4' &&
      reloadHydration.lsLogo === '4' &&
      reloadHydration.headerHtml.includes('<svg') &&
      reloadHydration.footerHtml.includes('<svg'),
      reloadHydration
    );

    // 4.5 Rapid rapid toggle burst stress
    const burstToggleRes = await storePage.evaluate(() => {
      for (let i = 0; i < 20; i++) {
        window.PuckWickStore.dispatch('TOGGLE_BRAND_STUDIO', i % 2 === 0);
      }
      const finalStudio = document.getElementById('studio');
      return {
        bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
        studioDisplay: finalStudio ? finalStudio.style.display : null,
        storeVisible: window.PuckWickStore.state.brandStudioVisible,
        configEnabled: window.BRAND_STUDIO_CONFIG?.enabled
      };
    });

    record(
      'Burst toggling (20 rapid alternating TOGGLE_BRAND_STUDIO dispatches) ends in expected coherent state without desync',
      burstToggleRes.bodyAttr === 'false' &&
      burstToggleRes.studioDisplay === 'none' &&
      burstToggleRes.storeVisible === false &&
      burstToggleRes.configEnabled === false,
      burstToggleRes
    );

    await storePage.close();

    console.log('\n============================================================');
    console.log(' SUMMARY');
    console.log('============================================================');
    const passedCount = results.filter((r) => r.passed).length;
    const failedCount = results.filter((r) => !r.passed).length;
    console.log(`  Total Executed : ${results.length}`);
    console.log(`  Total Passed   : \x1b[32m${passedCount}\x1b[0m`);
    console.log(`  Total Failed   : \x1b[31m${failedCount}\x1b[0m`);

    return { total: results.length, passed: passedCount, failed: failedCount, results };
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Fatal error in challenger test runner:', err);
  process.exit(1);
});
