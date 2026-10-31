/**
 * tests/stress/challenger-m4-stress.js
 * Adversarial Empirical Test Harness for Milestone 4:
 * Interactive Brand Logo Studio, Dynamic DOM Reactivity, localStorage Synchronization,
 * Boundary Clamping, Slug Resolution, Production Config Toggle & Hash Redirection.
 */

import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEST_PORT = 3459;

const testResults = {
  domReactivity: [],
  localStorageSync: [],
  boundaryClamping: [],
  slugResolution: [],
  productionToggle: [],
  mobileTouchA11y: []
};

let totalPassed = 0;
let totalFailed = 0;

function record(category, testName, passed, details = {}) {
  if (passed) totalPassed++;
  else totalFailed++;
  testResults[category].push({ testName, passed, details, timestamp: new Date().toISOString() });
  const statusStr = passed ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`  ${statusStr} ${testName}`);
  if (!passed && details.error) {
    console.log(`         \x1b[33mError / Observation: ${details.error}\x1b[0m`);
  }
}

async function runDomReactivitySuite(page) {
  console.log('\n============================================================');
  console.log('1. DOM REACTIVITY & LOGO SIGNATURE INTEGRITY (ALL 4 CONCEPTS)');
  console.log('============================================================');

  const concepts = [
    {
      id: 1,
      name: 'Concept 1: Minimalist Crossed Sticks & Flame',
      signatures: ['c1-gold', 'c1-gold-metallic', 'Crossed Sticks', 'PUCK & WICK']
    },
    {
      id: 2,
      name: 'Concept 2: Heritage Crest / Shield',
      signatures: ['c2-crest-shield', 'c2-gold', 'XX YRS', 'ON THE ICE']
    },
    {
      id: 3,
      name: 'Concept 3: Modern Luxury Apothecary Stamp',
      signatures: ['c3-apothecary', 'c3-gold', '39.1368° N • 77.7144° W', 'Apothecary']
    },
    {
      id: 4,
      name: 'Concept 4: Rustic Stamped-Leather & Gold Foil Badge',
      signatures: ['c4-badge', 'c4-foil', 'c4-gold-foil', 'HAND-POURED IN VIRGINIA']
    }
  ];

  for (const c of concepts) {
    // 1.1 UI interaction: Click card apply button
    const applyBtnSelector = `[data-apply-concept="${c.id}"]`;
    const applyBtn = page.locator(applyBtnSelector).first();
    const btnExists = (await applyBtn.count()) > 0;

    if (!btnExists) {
      record('domReactivity', `UI Apply Button exists for ${c.name}`, false, {
        error: `Could not find button with selector: ${applyBtnSelector}`
      });
      continue;
    }

    await applyBtn.click();
    await page.waitForTimeout(100);

    // 1.2 Verify Header and Footer DOM elements
    const headerHtml = await page.evaluate(() => document.getElementById('brand-mark-header')?.innerHTML || '');
    const footerHtml = await page.evaluate(() => document.getElementById('brand-mark-footer')?.innerHTML || '');

    const headerHasSvg = headerHtml.includes('<svg') && !headerHtml.includes('<image');
    const footerHasSvg = footerHtml.includes('<svg') && !footerHtml.includes('<image');

    const headerHasSig = c.signatures.some((sig) => headerHtml.includes(sig));
    const footerHasSig = c.signatures.some((sig) => footerHtml.includes(sig));

    const headerA11y = headerHtml.includes('<title>') && headerHtml.includes('role="img"');
    const footerA11y = footerHtml.includes('<title>') && footerHtml.includes('role="img"');

    const passedReactivity = headerHasSvg && footerHasSvg && headerHasSig && footerHasSig && headerA11y && footerA11y;

    record('domReactivity', `UI Click Apply -> Immediate header/footer DOM reactivity for ${c.name}`, passedReactivity, {
      conceptId: c.id,
      headerHasSvg,
      footerHasSvg,
      headerHasSig,
      footerHasSig,
      headerA11y,
      footerA11y,
      error: !passedReactivity ? `Signatures missing or invalid SVG in header/footer for Concept ${c.id}` : null
    });

    // 1.3 Verify Jar Mockup Stage SVG emblem synchronization
    const mockupSvg = await page.evaluate(() => {
      const el = document.querySelector('.jar-svg-mount svg');
      return el ? el.outerHTML : '';
    });
    const mockupHasEmblem = mockupSvg.length > 500 && (mockupSvg.includes(`concept-${c.id}`) || mockupSvg.includes(`Concept ${c.id}`) || mockupSvg.includes('jar-mockup-vessel'));

    record('domReactivity', `Jar Mockup Stage SVG updates with active concept ${c.id}`, mockupHasEmblem, {
      conceptId: c.id,
      mockupSvgLen: mockupSvg.length,
      error: !mockupHasEmblem ? `Jar mockup did not render expected emblem for concept ${c.id}` : null
    });
  }

  // 1.4 Mockup scent layout toggles
  const freshCutBtn = page.locator('[data-testid="mockup-scent-fresh-cut"]').first();
  if ((await freshCutBtn.count()) > 0) {
    await freshCutBtn.click();
    await page.waitForTimeout(80);
    const text = await page.evaluate(() => document.querySelector('.jar-mockup-workbench')?.innerText || '');
    const hasFreshCut = /fresh\s*cut/i.test(text) && /glacial\s*ozone/i.test(text);
    record('domReactivity', 'Mockup scent toggle updates to Fresh Cut (Ozone & Fir notes)', hasFreshCut, {
      hasFreshCut,
      error: !hasFreshCut ? 'Mockup scent toggle did not update text specs to Fresh Cut' : null
    });
  }

  // 1.5 Mockup vessel finish toggles
  const amberVesselBtn = page.locator('[data-testid="mockup-vessel-amber"]').first();
  if ((await amberVesselBtn.count()) > 0) {
    await amberVesselBtn.click();
    await page.waitForTimeout(80);
    const text = await page.evaluate(() => document.querySelector('.jar-mockup-workbench')?.innerText || '');
    const hasAmber = /amber\s*apothecary/i.test(text);
    record('domReactivity', 'Mockup vessel toggle updates to Deep Amber glass finish', hasAmber, {
      hasAmber,
      error: !hasAmber ? 'Mockup vessel toggle did not update finish to Amber' : null
    });
  }
}

async function runLocalStorageSuite(page, baseUrl) {
  console.log('\n============================================================');
  console.log('2. PERSISTENT LOCALSTORAGE & RELOAD SYNCHRONIZATION');
  console.log('============================================================');

  for (let cid = 1; cid <= 4; cid++) {
    // Apply concept cid
    await page.evaluate((targetId) => {
      window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', targetId);
    }, cid);

    // Verify localStorage keys
    const storageValues = await page.evaluate(() => ({
      conceptKey: localStorage.getItem('pw_active_brand_concept'),
      logoKey: localStorage.getItem('puck_wick_logo')
    }));

    const keysSynced = storageValues.conceptKey === String(cid) && storageValues.logoKey === String(cid);

    record('localStorageSync', `SET_LOGO_CONCEPT(${cid}) writes to both localStorage keys immediately`, keysSynced, {
      cid,
      storageValues,
      error: !keysSynced ? `Expected "pw_active_brand_concept" & "puck_wick_logo" to equal "${cid}", got ${JSON.stringify(storageValues)}` : null
    });

    // Hard reload page
    await page.reload({ waitUntil: 'networkidle' });

    // Verify state restored after reload
    const stateAfterReload = await page.evaluate(() => ({
      activeLogoConcept: window.PuckWickStore?.state?.activeLogoConcept,
      headerContent: document.getElementById('brand-mark-header')?.innerHTML || '',
      footerContent: document.getElementById('brand-mark-footer')?.innerHTML || ''
    }));

    const restoredOk = stateAfterReload.activeLogoConcept === cid;
    const headerRendered = stateAfterReload.headerContent.includes('<svg');
    const footerRendered = stateAfterReload.footerContent.includes('<svg');

    record('localStorageSync', `Full page reload preserves Concept ${cid} in Store & Header/Footer DOM`, restoredOk && headerRendered && footerRendered, {
      cid,
      activeLogoConcept: stateAfterReload.activeLogoConcept,
      headerRendered,
      footerRendered,
      error: !restoredOk ? `Store did not restore Concept ${cid} after reload: got ${stateAfterReload.activeLogoConcept}` : null
    });
  }

  // 2.2 Test slug pre-population in localStorage before boot
  const slugTests = [
    { slug: 'concept-2-heritage-shield', expectedId: 2 },
    { slug: 'concept-3-modern-luxury-apothecary-stamp', expectedId: 3 },
    { slug: 'concept-4-rustic-stamped-leather-badge', expectedId: 4 },
    { slug: 'corrupted-bogus-random-string', expectedId: 1 }
  ];

  for (const st of slugTests) {
    await page.evaluate((slug) => {
      localStorage.setItem('pw_active_brand_concept', slug);
      localStorage.setItem('puck_wick_logo', slug);
    }, st.slug);

    await page.reload({ waitUntil: 'networkidle' });

    const activeConcept = await page.evaluate(() => window.PuckWickStore?.state?.activeLogoConcept);
    const passed = activeConcept === st.expectedId;

    record('localStorageSync', `Pre-boot localStorage slug "${st.slug}" resolves safely to Concept ${st.expectedId}`, passed, {
      slug: st.slug,
      expected: st.expectedId,
      actual: activeConcept,
      error: !passed ? `Expected ${st.expectedId}, got ${activeConcept}` : null
    });
  }
}

async function runBoundaryClampingSuite(page) {
  console.log('\n============================================================');
  console.log('3. ADVERSARIAL BOUNDARY CLAMPING & MALFORMED INPUTS');
  console.log('============================================================');

  const boundaryCases = [
    { name: 'Lower numeric boundary 0 -> 1', input: 0, expected: 1 },
    { name: 'Upper numeric boundary 5 -> 4', input: 5, expected: 4 },
    { name: 'Negative integer -1 -> 1', input: -1, expected: 1 },
    { name: 'Extreme negative integer -9999 -> 1', input: -9999, expected: 1 },
    { name: 'Extreme positive integer 99 -> 4', input: 99, expected: 4 },
    { name: 'Extreme positive integer 10000 -> 4', input: 10000, expected: 4 },
    { name: 'Float value 1.4 -> 1', input: 1.4, expected: 1 },
    { name: 'Float value 3.8 -> 4', input: 3.8, expected: 4 },
    { name: 'Numeric string "0" -> 1', input: '0', expected: 1 },
    { name: 'Numeric string "5" -> 4', input: '5', expected: 4 },
    { name: 'Numeric string "-1" -> 1', input: '-1', expected: 1 },
    { name: 'Numeric string "99" -> 4', input: '99', expected: 4 },
    { name: 'Whitespace numeric string "  2  " -> 2', input: '  2  ', expected: 2 },
    { name: 'Arbitrary string "invalid" -> 1', input: 'invalid', expected: 1 },
    { name: 'String "undefined" -> 1', input: 'undefined', expected: 1 },
    { name: 'String "null" -> 1', input: 'null', expected: 1 },
    { name: 'Empty string "" -> 1', input: '', expected: 1 },
    { name: 'JavaScript null -> 1', input: null, expected: 1 },
    { name: 'JavaScript undefined -> 1', input: undefined, expected: 1 },
    { name: 'JavaScript NaN -> 1', input: NaN, expected: 1 },
    { name: 'JavaScript Infinity -> 4', input: Infinity, expected: 4 },
    { name: 'JavaScript -Infinity -> 1', input: -Infinity, expected: 1 },
    { name: 'JavaScript Object {} -> 1', input: {}, expected: 1 },
    { name: 'JavaScript Array [] -> 1', input: [], expected: 1 }
  ];

  for (const bc of boundaryCases) {
    const res = await page.evaluate((val) => {
      try {
        window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', val);
        const concept = window.PuckWickStore.state.activeLogoConcept;
        const header = document.getElementById('brand-mark-header')?.innerHTML || '';
        const footer = document.getElementById('brand-mark-footer')?.innerHTML || '';
        return {
          concept,
          headerOk: header.includes('<svg') && !header.includes('<image'),
          footerOk: footer.includes('<svg') && !footer.includes('<image')
        };
      } catch (err) {
        return { error: err.message };
      }
    }, bc.input);

    const isClamped = res.concept === bc.expected;
    const domValid = res.headerOk && res.footerOk;
    const passed = isClamped && domValid && !res.error;

    record('boundaryClamping', `Boundary: ${bc.name}`, passed, {
      input: bc.input,
      expected: bc.expected,
      actual: res.concept,
      res,
      error: !passed ? `Failed: expected concept ${bc.expected}, got ${res.concept} (domValid: ${domValid}, error: ${res.error})` : null
    });
  }
}

async function runSlugResolutionSuite(page) {
  console.log('\n============================================================');
  console.log('4. SLUG STRING & KEYWORD RESOLUTION STRESS');
  console.log('============================================================');

  const slugCases = [
    { slug: 'concept-1-crossed-sticks', expected: 1 },
    { slug: 'concept-2-heritage-shield', expected: 2 },
    { slug: 'concept-3-modern-luxury-apothecary-stamp', expected: 3 },
    { slug: 'concept-4-rustic-stamped-leather-badge', expected: 4 },
    { slug: 'concept-1', expected: 1 },
    { slug: 'concept-2', expected: 2 },
    { slug: 'concept-3', expected: 3 },
    { slug: 'concept-4', expected: 4 },
    { slug: 'CONCEPT-2-HERITAGE-SHIELD', expected: 2 }, // uppercase
    { slug: '  concept-3-monogram  ', expected: 3 }, // surrounding spaces
    { slug: 'crossed sticks flame', expected: 1 }, // keyword crossed
    { slug: 'heritage shield 20 years', expected: 2 }, // keyword heritage / shield
    { slug: 'luxury apothecary seal', expected: 3 }, // keyword apothecary
    { slug: 'stamped leather workshop badge', expected: 4 }, // keyword stamped / leather / badge
    { slug: 'concept-0-underflow', expected: 1 }, // concept-0 clamps to 1
    { slug: 'concept-99-overflow', expected: 4 } // concept-99 clamps to 4
  ];

  for (const sc of slugCases) {
    const actual = await page.evaluate((slug) => {
      window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', slug);
      return window.PuckWickStore.state.activeLogoConcept;
    }, sc.slug);

    const passed = actual === sc.expected;
    record('slugResolution', `Slug / Keyword "${sc.slug}" -> Concept ${sc.expected}`, passed, {
      slug: sc.slug,
      expected: sc.expected,
      actual,
      error: !passed ? `Expected ${sc.expected}, got ${actual}` : null
    });
  }
}

async function runProductionToggleSuite(page, browser, baseUrl) {
  console.log('\n============================================================');
  console.log('5. PRODUCTION TOGGLE FLAG & HASH REDIRECTION STRESS');
  console.log('============================================================');

  // 5.1 Dynamic Toggle via window.BRAND_STUDIO_CONFIG.enabled = false
  await page.goto(baseUrl);

  // Check initial state (enabled)
  const initialStatus = await page.evaluate(() => ({
    bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
    sectionDisplay: document.getElementById('studio')?.style.display,
    navVisible: Array.from(document.querySelectorAll('.nav-item-studio')).map((el) => el.style.display)
  }));
  record('productionToggle', 'Default Initial State: Brand Studio is visible and enabled', initialStatus.bodyAttr === 'true' || initialStatus.bodyAttr === null || initialStatus.sectionDisplay !== 'none', { initialStatus });

  // 5.2 Disable via store action TOGGLE_STUDIO
  const disabledViaStore = await page.evaluate(() => {
    window.PuckWickStore.dispatch('TOGGLE_STUDIO', false);
    return {
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      sectionDisplay: document.getElementById('studio')?.style.display,
      storeFlag: window.PuckWickStore.state.brandStudioVisible,
      configFlag: window.BRAND_STUDIO_CONFIG?.enabled,
      navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map((el) => el.style.display)
    };
  });

  const storeDisabledOk =
    disabledViaStore.bodyAttr === 'false' &&
    disabledViaStore.sectionDisplay === 'none' &&
    disabledViaStore.storeFlag === false &&
    disabledViaStore.configFlag === false &&
    disabledViaStore.navDisplays.every((d) => d === 'none');

  record('productionToggle', 'TOGGLE_STUDIO(false) hides #studio section, nav links, and updates config flag', storeDisabledOk, {
    disabledViaStore,
    error: !storeDisabledOk ? `Studio elements not cleanly hidden: ${JSON.stringify(disabledViaStore)}` : null
  });

  // 5.3 Test hash redirection: #studio -> #shop when disabled
  await page.evaluate(() => {
    window.location.hash = '#studio';
  });
  await page.waitForTimeout(150);

  const hashAfterRedirect = await page.evaluate(() => window.location.hash);
  const hashRedirected = hashAfterRedirect === '#shop';

  record('productionToggle', 'Accessing #studio while studio is disabled redirects hash to #shop', hashRedirected, {
    hashAfterRedirect,
    error: !hashRedirected ? `Expected #shop, got ${hashAfterRedirect}` : null
  });

  // 5.4 Re-enable via TOGGLE_STUDIO(true)
  const reEnabled = await page.evaluate(() => {
    window.PuckWickStore.dispatch('TOGGLE_STUDIO', true);
    return {
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      sectionDisplay: document.getElementById('studio')?.style.display,
      storeFlag: window.PuckWickStore.state.brandStudioVisible,
      configFlag: window.BRAND_STUDIO_CONFIG?.enabled
    };
  });

  const reEnabledOk = reEnabled.bodyAttr === 'true' && reEnabled.sectionDisplay !== 'none' && reEnabled.storeFlag === true;
  record('productionToggle', 'TOGGLE_STUDIO(true) restores studio section and nav items', reEnabledOk, { reEnabled });

  // 5.5 Test SET_STUDIO_VISIBLE action alias
  const setVisibleDisabled = await page.evaluate(() => {
    window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', false);
    return {
      bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
      sectionDisplay: document.getElementById('studio')?.style.display,
      storeFlag: window.PuckWickStore.state.brandStudioVisible,
      configFlag: window.BRAND_STUDIO_CONFIG?.enabled,
      navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map((el) => el.style.display)
    };
  });

  const setVisibleOk =
    setVisibleDisabled.bodyAttr === 'false' &&
    setVisibleDisabled.sectionDisplay === 'none' &&
    setVisibleDisabled.storeFlag === false &&
    setVisibleDisabled.configFlag === false;

  record('productionToggle', 'SET_STUDIO_VISIBLE(false) cleanly hides studio and nav items', setVisibleOk, {
    setVisibleDisabled,
    error: !setVisibleOk ? `SET_STUDIO_VISIBLE failed: ${JSON.stringify(setVisibleDisabled)}` : null
  });

  // Re-enable
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('SET_STUDIO_VISIBLE', true);
  });

  // 5.6 Test Fresh Context with Pre-injected config flag (window.BRAND_STUDIO_CONFIG = { enabled: false })
  const newContext = await browser.newContext();
  await newContext.addInitScript(() => {
    window.BRAND_STUDIO_CONFIG = { enabled: false };
  });
  const newPage = await newContext.newPage();
  await newPage.goto(`${baseUrl}/#studio`);
  await newPage.waitForTimeout(200);

  const preInjectedResult = await newPage.evaluate(() => ({
    hash: window.location.hash,
    bodyAttr: document.body.getAttribute('data-brand-studio-visible'),
    sectionDisplay: document.getElementById('studio')?.style.display,
    navDisplays: Array.from(document.querySelectorAll('.nav-item-studio')).map((el) => el.style.display)
  }));

  const preInjectedOk =
    preInjectedResult.hash === '#shop' &&
    preInjectedResult.bodyAttr === 'false' &&
    preInjectedResult.sectionDisplay === 'none' &&
    preInjectedResult.navDisplays.every((d) => d === 'none');

  record('productionToggle', 'Pre-boot BRAND_STUDIO_CONFIG = { enabled: false } redirects #studio -> #shop & hides UI on initial load', preInjectedOk, {
    preInjectedResult,
    error: !preInjectedOk ? `Pre-injected flag failed: ${JSON.stringify(preInjectedResult)}` : null
  });

  await newContext.close();
}

async function runMobileA11ySuite(page) {
  console.log('\n============================================================');
  console.log('6. MOBILE VIEWPORT & TOUCH TARGET ACCESSIBILITY (390x844)');
  console.log('============================================================');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });

  // 6.1 Check touch targets >= 44px
  const touchTargets = await page.evaluate(() => {
    const applyBtns = Array.from(document.querySelectorAll('.apply-logo-btn'));
    const toggleBtns = Array.from(document.querySelectorAll('.studio-toggle-btn'));

    const evaluateElements = (elements) =>
      elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          text: el.innerText.slice(0, 30),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          valid: rect.height >= 43.5 // allow subpixel 44px
        };
      });

    return {
      applyBtns: evaluateElements(applyBtns),
      toggleBtns: evaluateElements(toggleBtns)
    };
  });

  const allApplyValid = touchTargets.applyBtns.length > 0 && touchTargets.applyBtns.every((b) => b.valid);
  const allToggleValid = touchTargets.toggleBtns.length > 0 && touchTargets.toggleBtns.every((b) => b.valid);

  record('mobileTouchA11y', 'All .apply-logo-btn buttons meet min 44px touch target height on mobile', allApplyValid, {
    buttonCount: touchTargets.applyBtns.length,
    buttons: touchTargets.applyBtns,
    error: !allApplyValid ? 'Some apply-logo-btn touch targets are smaller than 44px' : null
  });

  record('mobileTouchA11y', 'All .studio-toggle-btn buttons meet min 44px touch target height on mobile', allToggleValid, {
    buttonCount: touchTargets.toggleBtns.length,
    buttons: touchTargets.toggleBtns,
    error: !allToggleValid ? 'Some studio-toggle-btn touch targets are smaller than 44px' : null
  });

  // 6.2 Check horizontal overflow
  const overflow = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    return {
      scrollWidth,
      clientWidth,
      hasOverflow: scrollWidth > clientWidth
    };
  });

  record('mobileTouchA11y', 'Mobile viewport (390px) has ZERO horizontal overflow in Brand Studio', !overflow.hasOverflow, {
    overflow,
    error: overflow.hasOverflow ? `Horizontal overflow detected: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}` : null
  });
}

async function main() {
  console.log('============================================================');
  console.log('  CHALLENGER ADVERSARIAL STRESS HARNESS: MILESTONE 4');
  console.log('============================================================');

  const { server } = await startServer(TEST_PORT);
  const baseUrl = `http://127.0.0.1:${TEST_PORT}`;
  console.log(`[Test Server] Running on ${baseUrl}`);

  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  if (SYSTEM_CHROME_PATH) {
    launchOptions.executablePath = SYSTEM_CHROME_PATH;
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    await runDomReactivitySuite(page);
    await runLocalStorageSuite(page, baseUrl);
    await runBoundaryClampingSuite(page);
    await runSlugResolutionSuite(page);
    await runProductionToggleSuite(page, browser, baseUrl);
    await runMobileA11ySuite(page);

    console.log('\n============================================================');
    console.log('  CHALLENGER STRESS SUITE SUMMARY');
    console.log('============================================================');
    console.log(`  Total Executed : ${totalPassed + totalFailed}`);
    console.log(`  Total Passed   : \x1b[32m${totalPassed}\x1b[0m`);
    console.log(`  Total Failed   : \x1b[31m${totalFailed}\x1b[0m`);
    console.log('============================================================\n');

    return { totalPassed, totalFailed, testResults };
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
