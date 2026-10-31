/**
 * tests/adversarial-state-nav-m1.js
 * Empirical Challenger Test Harness for Milestone 1:
 * State Management, Store Reactivity, Anchor Navigation, and Modal Interactivity.
 *
 * Covers:
 * 1. Cart Reactivity Stress (50 rapid-fire randomized actions & badge sync)
 * 2. Anchor Navigation (smooth scroll, hash updates, zero-reload, mobile drawer)
 * 3. Wholesale Inquiry Modal (focus trap, Escape key, backdrop click, form validation)
 * 4. Logo Concept State Switching (action names, concept 1-4 rendering, boundary clamping)
 */

import { chromium } from 'playwright';
import { startServer } from '../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEST_PORT = 3458;

// Test result logger
const results = {
  cartReactivity: [],
  navigation: [],
  modal: [],
  logoState: []
};

function recordResult(category, testName, passed, details = {}) {
  const entry = { testName, passed, details, timestamp: new Date().toISOString() };
  results[category].push(entry);
  const statusStr = passed ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`  ${statusStr} ${testName}`);
  if (!passed && details.error) {
    console.log(`         \x1b[33mReason: ${details.error}\x1b[0m`);
  }
}

async function runCartReactivityHarness(page) {
  console.log('\n--- 1. Cart Reactivity Stress Testing ---');

  // Check 1.1: Selector presence for `#cart-count` vs `#cart-badge`
  const cartCountElem = await page.$('#cart-count');
  const cartBadgeElem = await page.$('#cart-badge');
  const dataTestIdBadge = await page.$('[data-testid="cart-badge-count"]');

  recordResult('cartReactivity', 'DOM Check: #cart-count element exists in DOM', cartCountElem !== null, {
    foundCartCount: cartCountElem !== null,
    foundCartBadge: cartBadgeElem !== null,
    foundDataTestId: dataTestIdBadge !== null,
    error: cartCountElem === null ? 'Element with id="cart-count" is absent; DOM uses id="cart-badge" and data-testid="cart-badge-count"' : null
  });

  // Check 1.2: Store Action Name Compatibility: ADD_ITEM vs ADD_TO_CART
  const initialCount = await page.evaluate(() => window.PuckWickStore?.getCartCount() || 0);

  // Dispatch ADD_ITEM
  await page.evaluate(() => {
    window.PuckWickStore?.dispatch('ADD_ITEM', { id: 'test-item-1', title: 'Test Candle', price: 34, quantity: 2 });
  });
  const countAfterAddItem = await page.evaluate(() => window.PuckWickStore?.getCartCount() || 0);
  const addItemSupported = (countAfterAddItem === initialCount + 2);

  recordResult('cartReactivity', 'Store Action Contract: "ADD_ITEM" action is accepted by dispatch()', addItemSupported, {
    initialCount,
    countAfterAddItem,
    error: !addItemSupported ? 'dispatch("ADD_ITEM", ...) is not handled in PuckWickStore (only "ADD_TO_CART" is implemented)' : null
  });

  // Dispatch standard ADD_TO_CART
  await page.evaluate(() => {
    window.PuckWickStore?.dispatch('ADD_TO_CART', { id: 'test-candle-1', title: 'Top Shelf', price: 34, quantity: 2 });
  });
  const countAfterAddToCart = await page.evaluate(() => window.PuckWickStore?.getCartCount() || 0);
  const addToCartWorking = (countAfterAddToCart === countAfterAddItem + 2);

  recordResult('cartReactivity', 'Store Action Contract: "ADD_TO_CART" action increments count correctly', addToCartWorking, {
    countBefore: countAfterAddItem,
    countAfter: countAfterAddToCart
  });

  // Check 1.3: 50 Rapid-Fire Randomized Actions Stress Test
  // Clear cart first
  await page.evaluate(() => {
    window.PuckWickStore?.dispatch('CLEAR_CART');
  });

  const candleTypes = [
    { id: 'top-shelf', title: 'Top Shelf', price: 34, scent: 'Bourbon & Oak' },
    { id: 'fresh-cut', title: 'Fresh Cut', price: 34, scent: 'Eucalyptus & Pine' },
    { id: 'balsam-fir', title: 'Balsam Fir', price: 38, scent: 'Balsam & Amber' },
    { id: 'exclusive-men', title: 'Men Athlete Box', price: 78, scent: 'Top Shelf' },
    { id: 'exclusive-women', title: 'Women Luxe Box', price: 78, scent: 'Fresh Cut' }
  ];

  let simCart = []; // Mirror model of expected cart
  let desyncCount = 0;
  const actionLog = [];

  for (let i = 0; i < 50; i++) {
    const actionType = Math.random() < 0.6 ? 'ADD' : (Math.random() < 0.5 ? 'UPDATE' : 'REMOVE');
    const candle = candleTypes[Math.floor(Math.random() * candleTypes.length)];

    if (actionType === 'ADD') {
      const qty = Math.floor(Math.random() * 3) + 1;
      await page.evaluate(({ candle, qty }) => {
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: candle.id,
          title: candle.title,
          price: candle.price,
          scent: candle.scent,
          quantity: qty
        });
      }, { candle, qty });

      const existing = simCart.find(it => it.id === candle.id && it.scent === candle.scent);
      if (existing) {
        existing.quantity = Math.min(99, existing.quantity + qty);
      } else {
        simCart.push({ id: candle.id, scent: candle.scent, quantity: Math.min(99, qty) });
      }
      actionLog.push(`[${i+1}] ADD ${qty}x ${candle.id}`);
    } else if (actionType === 'UPDATE' && simCart.length > 0) {
      const target = simCart[Math.floor(Math.random() * simCart.length)];
      const newQty = Math.floor(Math.random() * 5); // 0 means remove
      await page.evaluate(({ id, scent, quantity }) => {
        window.PuckWickStore.dispatch('UPDATE_CART_QUANTITY', { id, scent, quantity });
      }, { id: target.id, scent: target.scent, quantity: newQty });

      if (newQty <= 0) {
        simCart = simCart.filter(it => !(it.id === target.id && it.scent === target.scent));
      } else {
        target.quantity = Math.min(99, newQty);
      }
      actionLog.push(`[${i+1}] UPDATE ${target.id} to qty ${newQty}`);
    } else if (actionType === 'REMOVE' && simCart.length > 0) {
      const target = simCart[Math.floor(Math.random() * simCart.length)];
      await page.evaluate(({ id, scent }) => {
        window.PuckWickStore.dispatch('REMOVE_FROM_CART', { id, scent });
      }, { id: target.id, scent: target.scent });

      simCart = simCart.filter(it => !(it.id === target.id && it.scent === target.scent));
      actionLog.push(`[${i+1}] REMOVE ${target.id}`);
    }

    // Verify immediate synchronization between store count and DOM badge
    const expectedCount = simCart.reduce((sum, it) => sum + it.quantity, 0);
    const storeCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
    const badgeText = await page.evaluate(() => {
      const b = document.getElementById('cart-badge') || document.querySelector('.cart-badge');
      return b ? parseInt(b.textContent, 10) : -1;
    });

    if (storeCount !== expectedCount || badgeText !== expectedCount) {
      desyncCount++;
    }
  }

  const finalExpected = simCart.reduce((sum, it) => sum + it.quantity, 0);
  const finalStoreCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
  const finalBadgeText = await page.evaluate(() => {
    const b = document.getElementById('cart-badge') || document.querySelector('.cart-badge');
    return b ? parseInt(b.textContent, 10) : -1;
  });

  recordResult('cartReactivity', '50 Rapid-Fire Cart Actions: Zero desync between model, store, and DOM badge', desyncCount === 0, {
    totalActions: 50,
    desyncEvents: desyncCount,
    finalExpected,
    finalStoreCount,
    finalBadgeText,
    error: desyncCount > 0 ? `${desyncCount} desyncs observed during 50 rapid-fire operations` : null
  });

  // Check 1.4: Extreme Quantity Boundaries (qty > 99 and negative qty)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'overflow-test', title: 'Overflow', price: 10, quantity: 999 });
  });
  const overflowQty = await page.evaluate(() => {
    const item = window.PuckWickStore.state.cart.find(it => it.id === 'overflow-test');
    return item ? item.quantity : -1;
  });

  recordResult('cartReactivity', 'Quantity Clamping: Input exceeding 99 is clamped to 99', overflowQty === 99, {
    overflowQty,
    error: overflowQty !== 99 ? `Expected quantity clamped to 99, got ${overflowQty}` : null
  });
}

async function runNavigationHarness(page, browser, baseUrl) {
  console.log('\n--- 2. Anchor Navigation Testing ---');

  const navLinks = [
    { name: 'Shop Candles', hash: '#shop', targetId: 'shop' },
    { name: 'Exclusive Boxes', hash: '#exclusive-boxes', targetId: 'exclusive-boxes' },
    { name: 'Our Story & QC', hash: '#story', targetId: 'story' },
    { name: 'Retail Stockists', hash: '#stockists', targetId: 'stockists' },
    { name: 'Brand Studio', hash: '#studio', targetId: 'studio' }
  ];

  // 2.1 Desktop Navigation Anchor Checks
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl);

  // Set a canary marker on window to detect full page reloads
  await page.evaluate(() => { window.__PW_PAGE_CANARY__ = 12345; });

  for (const link of navLinks) {
    const anchorSelector = `header nav a[href="${link.hash}"]`;
    const anchor = page.locator(anchorSelector).first();
    const count = await anchor.count();

    if (count === 0) {
      recordResult('navigation', `Desktop: Navigation link for ${link.name} (${link.hash}) exists in header`, false, {
        error: `Selector ${anchorSelector} not found in header`
      });
      continue;
    }

    // Click navigation link
    await anchor.click();
    await page.waitForTimeout(400); // allow smooth scroll frame

    // Verify hash
    const currentUrl = page.url();
    const hashMatches = currentUrl.endsWith(link.hash);

    // Verify canary is intact (no page reload occurred)
    const canary = await page.evaluate(() => window.__PW_PAGE_CANARY__);
    const noReload = canary === 12345;

    // Verify target section exists and is in viewport
    const targetElement = page.locator(`#${link.targetId}`);
    const targetExists = (await targetElement.count()) > 0;
    const isInViewport = await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }, link.targetId);

    recordResult('navigation', `Desktop Anchor: Click "${link.name}" updates hash to ${link.hash} without reload`, hashMatches && noReload && targetExists && isInViewport, {
      hashMatches,
      noReload,
      targetExists,
      isInViewport,
      currentUrl,
      error: !hashMatches ? `Hash did not update to ${link.hash}` : (!noReload ? 'Page reload occurred' : (!isInViewport ? `Target #${link.targetId} is not in viewport` : null))
    });
  }

  // 2.2 Mobile Drawer & Anchor Interactivity (Viewport 390x844)
  console.log('\n--- 2.2 Mobile Navigation & Drawer Testing (390x844) ---');
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl);
  await mobilePage.evaluate(() => { window.__PW_MOBILE_CANARY__ = 54321; });

  const hamburger = mobilePage.locator('#nav-toggle, [data-testid="mobile-menu-toggle"]').first();
  const mobileNav = mobilePage.locator('#mobile-nav, [data-testid="mobile-nav"]').first();

  // Test opening mobile menu
  await hamburger.click();
  await mobilePage.waitForTimeout(200);
  const isOpenAfterClick = await mobilePage.evaluate(() => {
    const nav = document.getElementById('mobile-nav');
    return nav && nav.classList.contains('open');
  });

  recordResult('navigation', 'Mobile Drawer: Clicking hamburger opens mobile drawer (.open)', isOpenAfterClick, {
    isOpenAfterClick,
    error: !isOpenAfterClick ? 'mobile-nav did not gain .open class' : null
  });

  // Test clicking link in mobile drawer closes drawer and scrolls to target
  for (const link of navLinks) {
    // Open menu if closed
    const isCurrentlyOpen = await mobilePage.evaluate(() => document.getElementById('mobile-nav')?.classList.contains('open'));
    if (!isCurrentlyOpen) {
      await hamburger.click();
      await mobilePage.waitForTimeout(200);
    }

    const mobileLink = mobilePage.locator(`#mobile-nav a[href="${link.hash}"]`).first();
    const linkCount = await mobileLink.count();

    if (linkCount === 0) {
      recordResult('navigation', `Mobile Drawer: Link for ${link.hash} exists in mobile drawer`, false, {
        error: `#mobile-nav a[href="${link.hash}"] not found in DOM`
      });
      continue;
    }

    await mobileLink.click();
    await mobilePage.waitForTimeout(400);

    // Verify drawer closed
    const isClosedAfterClick = await mobilePage.evaluate(() => !document.getElementById('mobile-nav')?.classList.contains('open'));
    const hashUpdated = mobilePage.url().endsWith(link.hash);
    const canaryIntact = await mobilePage.evaluate(() => window.__PW_MOBILE_CANARY__ === 54321);

    recordResult('navigation', `Mobile Drawer: Clicking "${link.name}" closes drawer and updates hash to ${link.hash}`, isClosedAfterClick && hashUpdated && canaryIntact, {
      isClosedAfterClick,
      hashUpdated,
      canaryIntact,
      error: !isClosedAfterClick ? 'Mobile drawer remained open after clicking anchor link' : (!hashUpdated ? `Hash failed to update to ${link.hash}` : null)
    });
  }

  await mobileContext.close();
}

async function runWholesaleModalHarness(page, baseUrl) {
  console.log('\n--- 3. Wholesale Inquiry Modal Testing ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl);

  const inquireBtn = page.locator('#btn-inquire-wholesale, [data-testid="inquire-wholesale-btn"]').first();
  const btnExists = (await inquireBtn.count()) > 0;

  recordResult('modal', 'Trigger: "Inquire Wholesale & Custom Pours" button exists in Stockist Hub', btnExists, {
    btnExists,
    error: !btnExists ? 'Wholesale inquiry button not found' : null
  });

  if (!btnExists) return;

  // Open modal
  await inquireBtn.scrollIntoViewIfNeeded();
  await inquireBtn.click();
  await page.waitForTimeout(200);

  const modalContainer = page.locator('#modal-container').first();
  const modalCard = page.locator('[data-testid="wholesale-modal"], .wholesale-modal').first();
  const modalVisible = (await modalCard.count()) > 0 && await modalCard.isVisible();

  recordResult('modal', 'Open Modal: Clicking trigger opens the wholesale inquiry modal overlay', modalVisible, {
    modalVisible,
    error: !modalVisible ? 'Modal dialog did not become visible in #modal-container' : null
  });

  // 3.1 Test Backdrop Click Dismiss
  const backdrop = page.locator('#wholesale-modal-backdrop');
  if ((await backdrop.count()) > 0) {
    // Click outside modal card (e.g. at coordinate x:10, y:10)
    await page.mouse.click(10, 10);
    await page.waitForTimeout(200);
    const closedAfterBackdrop = (await modalCard.count()) === 0 || !(await modalCard.isVisible());

    recordResult('modal', 'Dismiss: Clicking overlay backdrop dismisses modal', closedAfterBackdrop, {
      closedAfterBackdrop,
      error: !closedAfterBackdrop ? 'Modal remained open after clicking outside the modal card' : null
    });
  } else {
    recordResult('modal', 'Dismiss: Clicking overlay backdrop dismisses modal', false, {
      error: '#wholesale-modal-backdrop element not found'
    });
  }

  // Re-open modal for keyboard tests
  await inquireBtn.click();
  await page.waitForTimeout(200);

  // 3.2 Test Escape Key Dismiss
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const closedAfterEscape = (await modalCard.count()) === 0 || !(await modalCard.isVisible());

  recordResult('modal', 'Accessibility: Pressing Escape key dismisses modal dialog', closedAfterEscape, {
    closedAfterEscape,
    error: !closedAfterEscape ? 'Modal did not dismiss when Escape key was pressed' : null
  });

  // Re-open modal for Focus Trap & Form Validation tests
  if (closedAfterEscape) {
    await inquireBtn.click();
    await page.waitForTimeout(200);
  }

  // 3.3 Test Tab Focus Trapping
  const focusTrapCheck = await page.evaluate(async () => {
    const modal = document.querySelector('[data-testid="wholesale-modal"], .wholesale-modal');
    if (!modal) return { trapped: false, reason: 'Modal not found' };

    const focusables = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    if (focusables.length === 0) return { trapped: false, reason: 'No focusable elements inside modal' };

    // Check if initial focus moved inside modal
    const initialFocused = document.activeElement;
    const initialInside = modal.contains(initialFocused);

    return {
      focusableCount: focusables.length,
      initialFocusInside: initialInside,
      activeTag: initialFocused ? initialFocused.tagName : 'none'
    };
  });

  // Press Tab multiple times and verify activeElement stays inside modal
  let focusEscaped = false;
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const isInside = await page.evaluate(() => {
      const modal = document.querySelector('[data-testid="wholesale-modal"], .wholesale-modal');
      return modal && modal.contains(document.activeElement);
    });
    if (!isInside) {
      focusEscaped = true;
      break;
    }
  }

  const focusTrapped = !focusEscaped && focusTrapCheck.initialFocusInside;
  recordResult('modal', 'Accessibility: Keyboard Tab focus is trapped inside modal dialog', focusTrapped, {
    focusEscaped,
    initialFocusInside: focusTrapCheck.initialFocusInside,
    focusableCount: focusTrapCheck.focusableCount,
    error: focusEscaped ? 'Keyboard focus escaped outside modal during Tab cycling' : (!focusTrapCheck.initialFocusInside ? 'Initial focus was not moved inside modal upon opening' : null)
  });

  // 3.4 Test Form Presence & Submission Validation
  const formCheck = await page.evaluate(() => {
    const modal = document.querySelector('[data-testid="wholesale-modal"], .wholesale-modal');
    if (!modal) return { hasForm: false };
    const form = modal.querySelector('form');
    const inputs = Array.from(modal.querySelectorAll('input, textarea, select'));
    const submitBtn = modal.querySelector('button[type="submit"], input[type="submit"]');
    return {
      hasForm: form !== null,
      inputCount: inputs.length,
      hasSubmitBtn: submitBtn !== null
    };
  });

  const formValid = formCheck.hasForm && formCheck.inputCount > 0;
  recordResult('modal', 'Form Interactivity: Wholesale modal contains an interactive inquiry submission form', formValid, {
    hasForm: formCheck.hasForm,
    inputCount: formCheck.inputCount,
    hasSubmitBtn: formCheck.hasSubmitBtn,
    error: !formValid ? 'Wholesale modal does not contain an interactive <form> or input fields (static info card only)' : null
  });

  // Close modal via close button
  const closeBtn = page.locator('#btn-close-wholesale, #btn-done-wholesale').first();
  if ((await closeBtn.count()) > 0) {
    await closeBtn.click();
    await page.waitForTimeout(100);
  }
}

async function runLogoStateHarness(page, baseUrl) {
  console.log('\n--- 4. Logo Concept State & Dynamic Rendering Testing ---');
  await page.goto(baseUrl);

  // Check 4.1: Dispatch action name compatibility: SET_LOGO_CONCEPT vs SET_ACTIVE_LOGO
  const initialConcept = await page.evaluate(() => window.PuckWickStore?.state?.activeLogoConcept || 1);

  // Dispatch SET_LOGO_CONCEPT
  await page.evaluate(() => {
    window.PuckWickStore?.dispatch('SET_LOGO_CONCEPT', 2);
  });
  const conceptAfterSetLogoConcept = await page.evaluate(() => window.PuckWickStore?.state?.activeLogoConcept);
  const setLogoConceptSupported = (conceptAfterSetLogoConcept === 2);

  recordResult('logoState', 'Store Action Contract: "SET_LOGO_CONCEPT" updates activeLogoConcept state', setLogoConceptSupported, {
    initialConcept,
    conceptAfterSetLogoConcept,
    error: !setLogoConceptSupported ? 'dispatch("SET_LOGO_CONCEPT", ...) is not handled; store expects "SET_ACTIVE_LOGO"' : null
  });

  // Dispatch SET_ACTIVE_LOGO
  await page.evaluate(() => {
    window.PuckWickStore?.dispatch('SET_ACTIVE_LOGO', 2);
  });
  const conceptAfterSetActiveLogo = await page.evaluate(() => window.PuckWickStore?.state?.activeLogoConcept);
  const setActiveLogoSupported = (conceptAfterSetActiveLogo === 2);

  recordResult('logoState', 'Store Action Contract: "SET_ACTIVE_LOGO" updates activeLogoConcept state', setActiveLogoSupported, {
    conceptAfterSetActiveLogo
  });

  // Check 4.2: Dynamic Header & Footer SVG Mark Updates for Concepts 1, 2, 3, 4
  const concepts = [
    { id: 1, label: 'Concept 1: Minimalist Crossed Sticks & Flame', signature: 'c1-gold-metallic' },
    { id: 2, label: 'Concept 2: Heritage Crest / Shield', signature: 'c2-crest-shield' },
    { id: 3, label: 'Concept 3: Modern Luxury Apothecary Stamp', signature: 'c3-apothecary' },
    { id: 4, label: 'Concept 4: Rustic Stamped-Leather Badge', signature: 'c4-gold-foil' }
  ];

  for (const c of concepts) {
    await page.evaluate((conceptId) => {
      window.PuckWickStore?.dispatch('SET_ACTIVE_LOGO', conceptId);
    }, c.id);

    await page.waitForTimeout(100);

    const headerSvgContent = await page.evaluate(() => {
      const headerMark = document.getElementById('brand-mark-header');
      return headerMark ? headerMark.innerHTML : '';
    });

    const footerSvgContent = await page.evaluate(() => {
      const footerMark = document.getElementById('brand-mark-footer');
      return footerMark ? footerMark.innerHTML : '';
    });

    const headerHasSignature = headerSvgContent.includes(c.signature) || headerSvgContent.includes(`Concept ${c.id}`) || headerSvgContent.includes(`<svg`);
    const footerHasSignature = footerSvgContent.includes(c.signature) || footerSvgContent.includes(`Concept ${c.id}`) || footerSvgContent.includes(`<svg`);
    const passed = headerHasSignature && footerHasSignature;

    recordResult('logoState', `Dynamic Mark Render: ${c.label} renders in header and footer`, passed, {
      conceptId: c.id,
      headerHasSignature,
      footerHasSignature,
      error: !passed ? `Header or footer did not render SVG for Concept ${c.id}` : null
    });
  }

  // Check 4.3: Out-of-bounds Clamping (conceptId = 0, 5, -1, 'invalid')
  const boundaryTests = [
    { input: 0, expected: 1 },
    { input: 5, expected: 4 },
    { input: -1, expected: 1 },
    { input: 'invalid', expected: 1 }
  ];

  for (const bt of boundaryTests) {
    await page.evaluate((val) => {
      window.PuckWickStore?.dispatch('SET_ACTIVE_LOGO', val);
    }, bt.input);

    const resultingConcept = await page.evaluate(() => window.PuckWickStore?.state?.activeLogoConcept);
    const clampedOk = resultingConcept === bt.expected;

    recordResult('logoState', `Boundary Clamping: SET_ACTIVE_LOGO with value ${JSON.stringify(bt.input)} clamps to ${bt.expected}`, clampedOk, {
      input: bt.input,
      expected: bt.expected,
      resultingConcept,
      error: !clampedOk ? `Expected ${bt.expected}, got ${resultingConcept}` : null
    });
  }
}

async function main() {
  console.log('============================================================');
  console.log('  Milestone 1 State & Navigation Empirical Challenge Suite');
  console.log('============================================================\n');

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
    await page.goto(baseUrl);

    // Run test suites
    await runCartReactivityHarness(page);
    await runNavigationHarness(page, browser, baseUrl);
    await runWholesaleModalHarness(page, baseUrl);
    await runLogoStateHarness(page, baseUrl);

  } catch (err) {
    console.error('Fatal Test Harness Exception:', err);
  } finally {
    await browser.close();
    server.close();
  }

  // Print Summary
  console.log('\n============================================================');
  console.log('  CHALLENGE TEST SUITE EXECUTION SUMMARY');
  console.log('============================================================');

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const [cat, testList] of Object.entries(results)) {
    const passed = testList.filter(t => t.passed).length;
    const failed = testList.filter(t => !t.passed).length;
    totalTests += testList.length;
    totalPassed += passed;
    totalFailed += failed;
    console.log(`  ${cat.padEnd(16)}: ${passed} passed, ${failed} failed (total: ${testList.length})`);
  }

  console.log('------------------------------------------------------------');
  console.log(`  TOTAL RESULTS   : ${totalPassed} PASSED, \x1b[31m${totalFailed} FAILED\x1b[0m of ${totalTests} tests`);
  console.log('============================================================\n');

  // Output JSON report to stdout for capture
  console.log('__JSON_START__');
  console.log(JSON.stringify(results, null, 2));
  console.log('__JSON_END__');
}

main().catch((err) => {
  console.error('[Fatal Error]:', err);
  process.exit(1);
});
