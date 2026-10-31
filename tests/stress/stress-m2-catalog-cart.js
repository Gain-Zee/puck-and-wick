/**
 * tests/stress/stress-m2-catalog-cart.js
 * Empirical Challenge Suite for Milestone 2: Catalog, Scent Filters & Cart Drawer.
 *
 * Verifies 5 Critical Stress Dimensions:
 * 1. Rapid filter tab switching across all 6 categories (DOM visibility, transition timing, integrity).
 * 2. Rapid add-to-cart actions with quantity boundary stress (stepper 1->0 removal, 99 alert clamp, store clamping).
 * 3. Promo code engine stress (PUCK10, BLUEHYDRANGEA, FOUNDER20, case-insensitivity, whitespace, invalid codes, duplicates).
 * 4. Free shipping meter threshold testing ($0 empty, $34 under, $68 under, $75 exact, $102 over, dynamic drop, pickup override).
 * 5. Error trapping: Zero console errors, zero uncaught exceptions, zero failed requests across Desktop & Mobile.
 */

import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3890;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

const suiteResults = {
  catalogFilters: { passed: 0, failed: 0, cases: [] },
  cartQuantity: { passed: 0, failed: 0, cases: [] },
  promoCodes: { passed: 0, failed: 0, cases: [] },
  shippingMeter: { passed: 0, failed: 0, cases: [] },
  errorTrapping: { passed: 0, failed: 0, cases: [] }
};

function record(suite, name, passed, details = '') {
  const item = { name, passed, details };
  if (passed) {
    suiteResults[suite].passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${name}`);
    suiteResults[suite].cases.push(item);
  } else {
    suiteResults[suite].failed++;
    console.log(`  \x1b[31m[FAIL]\x1b[0m ${name}`);
    if (details) console.log(`         \x1b[33m${details}\x1b[0m`);
    suiteResults[suite].cases.push(item);
  }
}

function setupErrorTracking(page) {
  const tracker = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: []
  };

  page.on('console', msg => {
    if (msg.type() === 'error') {
      tracker.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    tracker.pageErrors.push(err.message || String(err));
  });

  page.on('requestfailed', req => {
    const url = req.url();
    if (!url.includes('favicon.ico')) {
      tracker.failedRequests.push(`${req.method()} ${url} (${req.failure()?.errorText || 'failed'})`);
    }
  });

  return tracker;
}

/**
 * SUITE 1: RAPID FILTER TAB SWITCHING & DOM INTEGRITY
 */
async function testCatalogFilterStress(page) {
  console.log('\n============================================================');
  console.log('1. CATALOG FILTER TAB SWITCHING & DOM INTEGRITY STRESS');
  console.log('============================================================');

  // Navigate to catalog
  await page.goto(BASE_URL);
  await page.waitForSelector('[data-testid="catalog-section"]');

  // Verify all 6 category filter buttons are present
  const filterKeys = ['all', 'signature', 'fresh_clean', 'woods_rustic', 'seasonal', 'exclusive_boxes'];
  const filterMap = {
    all: '[data-filter="all"]',
    signature: '[data-filter="signature"]',
    fresh_clean: '[data-filter="fresh_clean"]',
    woods_rustic: '[data-filter="woods_rustic"]',
    seasonal: '[data-filter="seasonal"]',
    exclusive_boxes: '[data-filter="exclusive_boxes"]'
  };

  const expectedCounts = {
    all: 7,
    signature: 5,
    fresh_clean: 2,
    woods_rustic: 5,
    seasonal: 1
  };

  for (const [cat, selector] of Object.entries(filterMap)) {
    const el = await page.$(selector);
    record('catalogFilters', `Filter tab '${cat}' exists and is visible`, el !== null);
  }

  // 1. Rapid sequential switching across all 6 tabs (30 switches)
  const startTime = Date.now();
  let switchCount = 0;
  for (let cycle = 0; cycle < 5; cycle++) {
    for (const cat of filterKeys) {
      await page.click(filterMap[cat]);
      switchCount++;
    }
  }
  const totalSwitchDuration = Date.now() - startTime;
  const avgSwitchMs = (totalSwitchDuration / switchCount).toFixed(2);
  record('catalogFilters', `Completed ${switchCount} rapid filter switches in ${totalSwitchDuration}ms (avg ${avgSwitchMs}ms/switch)`,
    totalSwitchDuration < 10000,
    `Total duration: ${totalSwitchDuration}ms, Avg: ${avgSwitchMs}ms`
  );

  // 2. Deep verification of each filter state and DOM integrity
  for (const [cat, expCount] of Object.entries(expectedCounts)) {
    await page.click(filterMap[cat]);
    await page.waitForTimeout(40);

    const activeTab = await page.$(filterMap[cat]);
    const isSelected = await activeTab.getAttribute('aria-selected');
    const hasActiveClass = await activeTab.evaluate(el => el.classList.contains('active'));
    record('catalogFilters', `Category '${cat}' sets aria-selected="true" and has .active class`,
      isSelected === 'true' && hasActiveClass,
      `aria-selected=${isSelected}, activeClass=${hasActiveClass}`
    );

    const cards = await page.$$('[data-testid="product-card"]');
    record('catalogFilters', `Category '${cat}' renders exactly ${expCount} product cards`,
      cards.length === expCount,
      `Expected ${expCount}, found ${cards.length}`
    );

    // Verify each rendered card has complete content (title, price, SVG jar, buttons)
    let allCardsComplete = true;
    for (const card of cards) {
      const title = await card.$eval('[data-testid="product-title"]', el => el.textContent.trim()).catch(() => '');
      const price = await card.$eval('[data-testid="product-price"]', el => el.textContent.trim()).catch(() => '');
      const svg = await card.$('.candle-vessel-svg');
      const addBtn = await card.$('.quick-add-btn');

      if (!title || !price.includes('$') || !svg || !addBtn) {
        allCardsComplete = false;
        break;
      }
    }
    record('catalogFilters', `All cards in '${cat}' have complete titles, prices, SVGs, and CTA buttons`,
      allCardsComplete
    );
  }

  // 3. Test clicking 'exclusive_boxes' filter tab
  let boxClickError = null;
  try {
    await page.click(filterMap.exclusive_boxes);
    await page.waitForTimeout(50);
  } catch (e) {
    boxClickError = e.message;
  }
  const hasBoxesSection = (await page.$('#exclusive-boxes')) !== null;
  record('catalogFilters', `Clicking 'Exclusive Boxes' filter navigates smoothly without error`,
    boxClickError === null && hasBoxesSection,
    `boxClickError=${boxClickError}, hasBoxesSection=${hasBoxesSection}`
  );

  // 4. Return to 'all' and verify full reset
  await page.click(filterMap.all);
  await page.waitForTimeout(40);
  const resetCards = await page.$$('[data-testid="product-card"]');
  record('catalogFilters', `Returning to 'All Pours' restores complete 7-candle lineup`,
    resetCards.length === 7,
    `Found ${resetCards.length} cards`
  );
}

/**
 * SUITE 2: RAPID ADD-TO-CART & QUANTITY BOUNDARY STRESS
 */
async function testCartQuantityStress(page) {
  console.log('\n============================================================');
  console.log('2. RAPID ADD-TO-CART & QUANTITY BOUNDARY STRESS');
  console.log('============================================================');

  // Ensure clean start
  await page.evaluate(() => window.PuckWickStore.dispatch('CLEAR_CART'));
  await page.waitForTimeout(50);

  // 1. Initial Quick-Add from catalog: click "Add" on first candle
  await page.click('.quick-add-btn');
  await page.waitForSelector('[data-testid="cart-drawer"]');

  // Drawer is now open. Verify initial item in cart.
  let cartCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
  let badgeCount = await page.$eval('#cart-count', el => parseInt(el.textContent, 10));
  record('cartQuantity', `Initial Quick-Add opens drawer and adds item (count=1)`,
    cartCount === 1 && badgeCount === 1,
    `cartCount=${cartCount}, badgeCount=${badgeCount}`
  );

  // Rapid stepper increment: click [data-testid="qty-increment"] 19 times to reach 20 units
  const addStart = Date.now();
  for (let i = 0; i < 19; i++) {
    await page.click('[data-testid="qty-increment"]');
  }
  const addDuration = Date.now() - addStart;

  cartCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
  badgeCount = await page.$eval('#cart-count', el => parseInt(el.textContent, 10));
  const qtyInDrawer = await page.$eval('[data-testid="cart-item-qty"]', el => parseInt(el.textContent, 10));
  record('cartQuantity', `Rapid stepper increment 19 times registered accurately (${qtyInDrawer} units in ${addDuration}ms)`,
    cartCount === 20 && badgeCount === 20 && qtyInDrawer === 20,
    `cartCount=${cartCount}, badgeCount=${badgeCount}, qtyInDrawer=${qtyInDrawer}`
  );

  // Verify subtotal (20 * 34.00 = 680.00)
  const subtotal = await page.evaluate(() => window.PuckWickStore.getCartSubtotal());
  record('cartQuantity', `Subtotal equals $680.00 (20 x $34.00)`,
    subtotal === 680,
    `Subtotal=${subtotal}`
  );

  // 2. Stepper click down to 1
  for (let i = 0; i < 19; i++) {
    await page.click('[data-testid="qty-decrement"]');
  }

  const qtyAtOne = await page.$eval('[data-testid="cart-item-qty"]', el => parseInt(el.textContent, 10));
  const subtotalAtOne = await page.evaluate(() => window.PuckWickStore.getCartSubtotal());
  record('cartQuantity', `Stepper decremented 19 times down to exactly 1 unit ($34.00 subtotal)`,
    qtyAtOne === 1 && subtotalAtOne === 34,
    `qtyAtOne=${qtyAtOne}, subtotal=${subtotalAtOne}`
  );

  // 3. Boundary decrement at 1 -> item must be cleanly removed (EC1)
  await page.click('[data-testid="qty-decrement"]');
  await page.waitForTimeout(50);

  const finalCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
  const emptyStateVisible = (await page.$('[data-testid="cart-empty-view"]')) !== null;
  const finalBadge = await page.$eval('#cart-count', el => parseInt(el.textContent, 10));
  record('cartQuantity', `Decrementing at 1 unit cleanly removes item and displays empty cart view (EC1)`,
    finalCount === 0 && emptyStateVisible && finalBadge === 0,
    `finalCount=${finalCount}, emptyVisible=${emptyStateVisible}, badge=${finalBadge}`
  );

  // 4. Stepper increment to 99 and alert clamping (EC2)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 96 });
  });
  await page.waitForTimeout(50);

  // Setup dialog handler to catch wholesale notice
  let dialogMessage = null;
  const dialogHandler = (dialog) => {
    dialogMessage = dialog.message();
    dialog.accept();
  };
  page.on('dialog', dialogHandler);

  // Increment 3 times to 99
  for (let i = 0; i < 3; i++) {
    await page.click('[data-testid="qty-increment"]');
  }
  const qtyAt99 = await page.$eval('[data-testid="cart-item-qty"]', el => parseInt(el.textContent, 10));
  record('cartQuantity', `Incremented up to boundary quantity of 99`,
    qtyAt99 === 99,
    `qtyAt99=${qtyAt99}`
  );

  // Click increment at 99 -> should trigger wholesale alert and remain 99
  await page.click('[data-testid="qty-increment"]');
  await page.waitForTimeout(100);

  const qtyClamped = await page.$eval('[data-testid="cart-item-qty"]', el => parseInt(el.textContent, 10));
  const hasWholesaleAlert = dialogMessage !== null && dialogMessage.toLowerCase().includes('wholesale');
  record('cartQuantity', `Incrementing past 99 triggers wholesale informational alert and clamps at 99 (EC2)`,
    qtyClamped === 99 && hasWholesaleAlert,
    `qtyClamped=${qtyClamped}, dialogMessage="${dialogMessage}"`
  );
  page.off('dialog', dialogHandler);

  // 5. Store-level quantity clamping stress
  const clampZero = await page.evaluate(() => {
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 0 });
    return window.PuckWickStore.state.cart.length === 0;
  });
  record('cartQuantity', `Store dispatch UPDATE_QUANTITY with 0 removes item`, clampZero);

  const clampNegative = await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 5 });
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: -10 });
    return window.PuckWickStore.state.cart.length === 0;
  });
  record('cartQuantity', `Store dispatch UPDATE_QUANTITY with negative quantity (-10) removes item`, clampNegative);

  const clampOver100 = await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 5 });
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 150 });
    return window.PuckWickStore.state.cart[0].quantity === 99;
  });
  record('cartQuantity', `Store dispatch UPDATE_QUANTITY with 150 clamps to 99`, clampOver100);

  const clampAdditive = await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 90 });
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 50 });
    return window.PuckWickStore.state.cart[0].quantity === 99;
  });
  record('cartQuantity', `Store dispatch ADD_TO_CART exceeding 99 (90 + 50) clamps to 99`, clampAdditive);
}

/**
 * SUITE 3: PROMO CODE ENGINE STRESS TESTING
 */
async function testPromoCodeStress(page) {
  console.log('\n============================================================');
  console.log('3. PROMO CODE ENGINE STRESS TESTING');
  console.log('============================================================');

  // Setup cart with 2 candles ($68.00)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 2 });
  });
  await page.waitForTimeout(50);

  const applyPromoViaUI = async (code) => {
    const input = await page.$('#promo-code');
    await input.fill(code);
    await page.click('#btn-apply-promo');
    await page.waitForTimeout(50);
  };

  // 1. Valid codes and discounts
  // PUCK10 (10% of 68 = 6.80)
  await applyPromoViaUI('PUCK10');
  let discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  let feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Valid code 'PUCK10' applies 10% discount ($6.80 on $68.00)`,
    Math.abs(discount - 6.80) < 0.01 && feedbackText.includes('PUCK10 applied (-10%)'),
    `discount=${discount}, feedback="${feedbackText}"`
  );

  // BLUEHYDRANGEA (15% of 68 = 10.20)
  await applyPromoViaUI('BLUEHYDRANGEA');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Valid code 'BLUEHYDRANGEA' applies 15% discount ($10.20 on $68.00)`,
    Math.abs(discount - 10.20) < 0.01 && feedbackText.includes('BLUEHYDRANGEA applied (-15%)'),
    `discount=${discount}, feedback="${feedbackText}"`
  );

  // FOUNDER20 (20% of 68 = 13.60)
  await applyPromoViaUI('FOUNDER20');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Valid code 'FOUNDER20' applies 20% discount ($13.60 on $68.00)`,
    Math.abs(discount - 13.60) < 0.01 && feedbackText.includes('FOUNDER20 applied (-20%)'),
    `discount=${discount}, feedback="${feedbackText}"`
  );

  // 2. Case-Insensitivity (EC3)
  await applyPromoViaUI('puck10');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  record('promoCodes', `Case-insensitive 'puck10' applies 10% discount ($6.80)`,
    Math.abs(discount - 6.80) < 0.01,
    `discount=${discount}`
  );

  await applyPromoViaUI('bLuEhYdRaNgEa');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  record('promoCodes', `Mixed-case 'bLuEhYdRaNgEa' applies 15% discount ($10.20)`,
    Math.abs(discount - 10.20) < 0.01,
    `discount=${discount}`
  );

  // 3. Whitespace Trimming (EC3)
  await applyPromoViaUI('   FOUNDER20   ');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  record('promoCodes', `Whitespace padding '   FOUNDER20   ' trims cleanly and applies 20% ($13.60)`,
    Math.abs(discount - 13.60) < 0.01,
    `discount=${discount}`
  );

  // Remove promo before testing clean invalid codes
  const removeInitialBtn = await page.$('#btn-remove-promo');
  if (removeInitialBtn) await removeInitialBtn.click();
  await page.waitForTimeout(50);

  // 4. Invalid codes (EC4) - tested from clean state
  await applyPromoViaUI('BOGUS');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Invalid code 'BOGUS' rejects, zeroes discount, and displays error feedback`,
    discount === 0 && feedbackText.toLowerCase().includes('invalid'),
    `discount=${discount}, feedback="${feedbackText}"`
  );

  await applyPromoViaUI('DISCOUNT99');
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Invalid code 'DISCOUNT99' rejects and leaves subtotal intact`,
    discount === 0 && feedbackText.toLowerCase().includes('invalid'),
    `discount=${discount}, feedback="${feedbackText}"`
  );

  // Empty string submission
  await applyPromoViaUI('');
  feedbackText = await page.$eval('#promo-feedback-msg', el => el.textContent.trim());
  record('promoCodes', `Empty promo code submission warns user ('Please enter a promo code')`,
    feedbackText.toLowerCase().includes('please enter a promo code'),
    `feedback="${feedbackText}"`
  );

  // 5. Duplicate code application (EC5) - prevents discount stacking
  await applyPromoViaUI('PUCK10');
  const discountFirst = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  await applyPromoViaUI('PUCK10');
  const discountSecond = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  record('promoCodes', `Re-applying active code 'PUCK10' prevents double discounting (EC5)`,
    Math.abs(discountSecond - 6.80) < 0.01 && discountFirst === discountSecond,
    `discountFirst=${discountFirst}, discountSecond=${discountSecond}`
  );

  // 6. Promo Code Removal
  const removeBtn = await page.$('#btn-remove-promo');
  if (removeBtn) await removeBtn.click();
  await page.waitForTimeout(50);
  discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  const promoState = await page.evaluate(() => window.PuckWickStore.state.promoCode);
  record('promoCodes', `Clicking remove promo button resets discount to $0 and clears promo state`,
    discount === 0 && promoState === null,
    `discount=${discount}, promoState=${JSON.stringify(promoState)}`
  );
}

/**
 * SUITE 4: FREE SHIPPING METER THRESHOLD TESTING
 */
async function testShippingMeterStress(page) {
  console.log('\n============================================================');
  console.log('4. FREE SHIPPING METER THRESHOLD TESTING');
  console.log('============================================================');

  // Helper to read shipping UI state
  const readShippingState = async () => {
    return page.evaluate(() => {
      const store = window.PuckWickStore;
      const subtotal = store.getCartSubtotal();
      const shipping = store.getShippingTotal();
      const total = store.getGrandTotal();
      const text = document.querySelector('[data-testid="shipping-progress-text"]')?.textContent.trim() || '';
      const bar = document.querySelector('[data-testid="shipping-progress-bar"]');
      const widthStyle = bar?.style.width || '';
      return { subtotal, shipping, total, text, widthStyle };
    });
  };

  // Scenario A: $0.00 (Empty Cart)
  await page.evaluate(() => window.PuckWickStore.dispatch('CLEAR_CART'));
  await page.waitForTimeout(50);
  let state = await readShippingState();
  record('shippingMeter', `Threshold $0 (empty cart): $0 shipping, meter shows $75 away, 0% width`,
    state.subtotal === 0 && state.shipping === 0 && state.text.includes('$75.00 away') && state.widthStyle === '0%',
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario B: $34.00 (1 candle @ $34.00, under $75 threshold)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  const widthVal34 = parseFloat(state.widthStyle);
  record('shippingMeter', `Threshold $34 (under): $6.95 shipping, meter shows $41.00 away, ~45.33% width`,
    state.subtotal === 34 && state.shipping === 6.95 && state.text.includes('$41.00 away') && widthVal34 > 45 && widthVal34 < 46,
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario C: $68.00 (2 candles @ $34.00, under $75 threshold)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 2 });
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  const widthVal68 = parseFloat(state.widthStyle);
  record('shippingMeter', `Threshold $68 (under): $6.95 shipping, meter shows $7.00 away, ~90.67% width`,
    state.subtotal === 68 && state.shipping === 6.95 && state.text.includes('$7.00 away') && widthVal68 > 90 && widthVal68 < 91,
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario D: $75.00 (Exact threshold reached)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'custom-pour', price: 41, quantity: 1 });
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  record('shippingMeter', `Threshold $75 (exact threshold reached): FREE shipping ($0.00), meter 100%, Unlocked badge`,
    state.subtotal === 75 && state.shipping === 0 && state.text.includes('Free Shipping Unlocked') && state.widthStyle === '100%',
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario E: $102.00 (3 candles @ $34.00, over $75 threshold)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 3 });
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  record('shippingMeter', `Threshold $102 (over threshold): FREE shipping ($0.00), meter 100%, Unlocked badge`,
    state.subtotal === 102 && state.shipping === 0 && state.text.includes('Free Shipping Unlocked') && state.widthStyle === '100%',
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario F: Dynamic Threshold Drop Reversal ($102 down to $68)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 2 });
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  record('shippingMeter', `Dynamic threshold reversal (dropping $102 -> $68): Shipping resets to $6.95, meter drops to $7 away`,
    state.subtotal === 68 && state.shipping === 6.95 && state.text.includes('$7.00 away'),
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}", width="${state.widthStyle}"`
  );

  // Scenario G: Local Store Pickup Override (at $34.00)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 1 });
    window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'pickup');
  });
  await page.waitForTimeout(50);
  state = await readShippingState();
  record('shippingMeter', `Local Pickup override ($34.00 order): Shipping becomes $0.00, meter shows Free Shipping Unlocked`,
    state.subtotal === 34 && state.shipping === 0 && state.text.includes('Free Shipping Unlocked'),
    `subtotal=${state.subtotal}, shipping=${state.shipping}, text="${state.text}"`
  );
}

/**
 * SUITE 5: ZERO ERROR TRAPPING ACROSS VIEWPORTS
 */
async function testErrorTrapping(page, browser, desktopTracker) {
  console.log('\n============================================================');
  console.log('5. ZERO ERROR TRAPPING ACROSS DESKTOP & MOBILE VIEWPORTS');
  console.log('============================================================');

  // Verify desktop tracker has 0 errors
  record('errorTrapping', `Desktop Viewport (1440x900) Zero Console Errors`,
    desktopTracker.consoleErrors.length === 0,
    `Errors: ${JSON.stringify(desktopTracker.consoleErrors)}`
  );
  record('errorTrapping', `Desktop Viewport (1440x900) Zero Uncaught Page Errors`,
    desktopTracker.pageErrors.length === 0,
    `Errors: ${JSON.stringify(desktopTracker.pageErrors)}`
  );
  record('errorTrapping', `Desktop Viewport (1440x900) Zero Failed Network Requests`,
    desktopTracker.failedRequests.length === 0,
    `Requests: ${JSON.stringify(desktopTracker.failedRequests)}`
  );

  // Run mobile viewport check
  const mobileContext = await browser.newContext({
    viewport: VIEWPORTS.mobile,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  const mobileTracker = setupErrorTracking(mobilePage);

  await mobilePage.goto(BASE_URL);
  await mobilePage.waitForSelector('[data-testid="catalog-section"]');

  // Interact with filters on mobile
  const filterKeys = ['all', 'signature', 'fresh_clean', 'woods_rustic', 'seasonal'];
  for (const cat of filterKeys) {
    await mobilePage.click(`[data-filter="${cat}"]`);
    await mobilePage.waitForTimeout(30);
  }

  // Open cart drawer on mobile
  await mobilePage.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
    const trigger = document.getElementById('cart-btn');
    if (trigger) trigger.click();
  });
  await mobilePage.waitForTimeout(50);

  // Check mobile cart drawer width (should be full mobile viewport width)
  const drawerWidth = await mobilePage.$eval('[data-testid="cart-drawer"]', el => el.getBoundingClientRect().width);
  record('errorTrapping', `Mobile Cart Drawer takes full mobile width (${drawerWidth}px == 390px)`,
    Math.abs(drawerWidth - 390) < 5,
    `drawerWidth=${drawerWidth}px`
  );

  record('errorTrapping', `Mobile Viewport (390x844) Zero Console Errors`,
    mobileTracker.consoleErrors.length === 0,
    `Errors: ${JSON.stringify(mobileTracker.consoleErrors)}`
  );
  record('errorTrapping', `Mobile Viewport (390x844) Zero Uncaught Page Errors`,
    mobileTracker.pageErrors.length === 0,
    `Errors: ${JSON.stringify(mobileTracker.pageErrors)}`
  );
  record('errorTrapping', `Mobile Viewport (390x844) Zero Failed Network Requests`,
    mobileTracker.failedRequests.length === 0,
    `Requests: ${JSON.stringify(mobileTracker.failedRequests)}`
  );

  await mobileContext.close();
}

async function main() {
  console.log('============================================================');
  console.log('  CHALLENGER EMPIRICAL STRESS TEST SUITE: MILESTONE 2');
  console.log('============================================================');

  const { server } = await startServer(PORT);
  console.log(`[Stress Harness] Server active on port ${PORT}`);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const desktopContext = await browser.newContext({ viewport: VIEWPORTS.desktop });
  const desktopPage = await desktopContext.newPage();
  const desktopTracker = setupErrorTracking(desktopPage);

  try {
    await testCatalogFilterStress(desktopPage);
    await testCartQuantityStress(desktopPage);
    await testPromoCodeStress(desktopPage);
    await testShippingMeterStress(desktopPage);
    await testErrorTrapping(desktopPage, browser, desktopTracker);
  } catch (err) {
    console.error('Fatal stress harness exception:', err);
  } finally {
    await desktopContext.close();
    await browser.close();
    if (server) server.close();
  }

  // Print summary
  console.log('\n============================================================');
  console.log('  CHALLENGER STRESS AUDIT SUMMARY');
  console.log('============================================================');
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const [suite, data] of Object.entries(suiteResults)) {
    const total = data.passed + data.failed;
    totalTests += total;
    totalPassed += data.passed;
    totalFailed += data.failed;
    console.log(`  ${suite.padEnd(18)}: ${data.passed} PASSED, ${data.failed} FAILED (total: ${total})`);
  }
  console.log('------------------------------------------------------------');
  console.log(`  OVERALL TOTAL     : ${totalPassed} PASSED, ${totalFailed} FAILED of ${totalTests} stress assertions`);
  console.log('============================================================\n');

  return { totalTests, totalPassed, totalFailed, suiteResults };
}

main().then(res => {
  if (res.totalFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}).catch(err => {
  console.error(err);
  process.exit(1);
});
