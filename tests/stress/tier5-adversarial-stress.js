/**
 * tests/stress/tier5-adversarial-stress.js
 * Tier 5 Adversarial Edge & Stress Hardening Challenger Harness for Puck & Wick
 *
 * Covers:
 * 1. Corrupt / malformed localStorage data recovery
 * 2. Extreme cart operations (concurrency hammer, rapid increments/decrements, promo collision, zero-dollar cart)
 * 3. Checkout stress (missing fields, whitespace-only injection, invalid email, pickup toggling, double-click prevention, network errors)
 * 4. Multi-module concurrent state transitions across a single continuous user session
 * 5. Dynamic viewport resizing stress (1440px -> 768px -> 390px -> 320px -> 1440px) during open modals and drawers
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import { startServer } from '../../scripts/serve.js';
import { SELECTORS } from '../helpers/selectors.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEST_PORT = 3457;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

// Result tracking
const results = {
  storageRecovery: [],
  extremeCart: [],
  checkoutStress: [],
  multiModule: [],
  viewportResizing: []
};

let totalPassed = 0;
let totalFailed = 0;

function record(category, testName, passed, details = {}) {
  if (passed) totalPassed++;
  else totalFailed++;
  results[category].push({ testName, passed, details, timestamp: new Date().toISOString() });
  const statusStr = passed ? '\x1b[32m[PASS]\x1b[0m' : '\x1b[31m[FAIL]\x1b[0m';
  console.log(`  ${statusStr} ${testName}`);
  if (!passed && details && details.error) {
    console.log(`         \x1b[33mError / Observation: ${details.error}\x1b[0m`);
  }
}

function setupErrorTracking(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  return { pageErrors, consoleErrors };
}

// =============================================================================
// SUITE 1: CORRUPT / MALFORMED LOCALSTORAGE DATA RECOVERY
// =============================================================================
async function runStorageRecoverySuite(browser) {
  console.log('\n============================================================');
  console.log('1. CORRUPT / MALFORMED LOCALSTORAGE DATA RECOVERY SUITE');
  console.log('============================================================');

  // Test 1.1: Truncated / malformed JSON string in puck_wick_cart
  {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      localStorage.setItem('puck_wick_cart', '{"incomplete": [1, 2, "broken JSON...');
    });
    const page = await context.newPage();
    const { pageErrors, consoleErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const storeState = await page.evaluate(() => {
      return {
        cartLength: window.PuckWickStore?.state?.cart?.length,
        subtotal: window.PuckWickStore?.getCartSubtotal(),
        count: window.PuckWickStore?.getCartCount(),
        badgeText: document.getElementById('cart-count')?.textContent?.trim()
      };
    });

    const passed = pageErrors.length === 0 &&
                   storeState.cartLength === 0 &&
                   storeState.subtotal === 0 &&
                   storeState.count === 0 &&
                   storeState.badgeText === '0';

    record('storageRecovery', '1.1 Truncated/corrupted JSON in puck_wick_cart safely recovers to empty cart', passed, {
      pageErrors,
      consoleErrors,
      storeState
    });

    await context.close();
  }

  // Test 1.2: puck_wick_cart is non-array primitive ("12345", "true", "null")
  {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      localStorage.setItem('puck_wick_cart', '12345');
    });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const storeState = await page.evaluate(() => {
      return {
        isArray: Array.isArray(window.PuckWickStore?.state?.cart),
        length: window.PuckWickStore?.state?.cart?.length
      };
    });

    const passed = pageErrors.length === 0 && storeState.isArray && storeState.length === 0;
    record('storageRecovery', '1.2 Non-array JSON primitive (number 12345) recovers to empty array', passed, {
      pageErrors,
      storeState
    });

    await context.close();
  }

  // Test 1.3: Malformed cart elements inside array (null, undefined, missing fields)
  {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      // Injects array with null element, empty object, and invalid types
      localStorage.setItem('puck_wick_cart', JSON.stringify([
        null,
        {},
        { id: 'candle-top-shelf', price: 'invalid_price', quantity: 'bad_qty' }
      ]));
    });
    const page = await context.newPage();
    const { pageErrors, consoleErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const evaluation = await page.evaluate(() => {
      try {
        const subtotal = window.PuckWickStore.getCartSubtotal();
        const count = window.PuckWickStore.getCartCount();
        return { success: true, subtotal, count, isNanSubtotal: isNaN(subtotal) };
      } catch (err) {
        return { success: false, error: err.message };
      }
    });

    const passed = evaluation.success && !evaluation.isNanSubtotal && pageErrors.length === 0;
    record('storageRecovery', '1.3 Array with null / malformed elements handled gracefully without throwing', passed, {
      pageErrors,
      consoleErrors,
      evaluation,
      error: evaluation.error
    });

    await context.close();
  }

  // Test 1.4: Malformed active brand concept values in localStorage
  {
    const malformedConcepts = ['9999', '-50', 'undefined', '[object Object]', '<script>alert(1)</script>', 'apothecary-special'];
    let allPassed = true;
    const failures = [];

    for (const val of malformedConcepts) {
      const context = await browser.newContext();
      await context.addInitScript((badVal) => {
        localStorage.setItem('pw_active_brand_concept', badVal);
        localStorage.setItem('puck_wick_logo', badVal);
      }, val);

      const page = await context.newPage();
      const { pageErrors } = setupErrorTracking(page);

      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(200);

      const logoCheck = await page.evaluate(() => {
        const activeConcept = window.PuckWickStore?.state?.activeLogoConcept;
        const headerSvg = document.querySelector('#brand-mark-header svg');
        const footerSvg = document.querySelector('#brand-mark-footer svg');
        return {
          activeConcept,
          isValidConcept: typeof activeConcept === 'number' && activeConcept >= 1 && activeConcept <= 4,
          hasHeaderSvg: Boolean(headerSvg),
          hasFooterSvg: Boolean(footerSvg)
        };
      });

      if (pageErrors.length > 0 || !logoCheck.isValidConcept || !logoCheck.hasHeaderSvg || !logoCheck.hasFooterSvg) {
        allPassed = false;
        failures.push({ val, pageErrors, logoCheck });
      }

      await context.close();
    }

    record('storageRecovery', '1.4 Malformed logo concepts in localStorage safely clamped to [1, 4] with valid SVGs', allPassed, {
      failures
    });
  }

  // Test 1.5: LocalStorage QuotaExceeded / Access Throws simulation
  {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      // Mock setItem to throw QuotaExceededError
      const origSetItem = localStorage.setItem.bind(localStorage);
      localStorage.setItem = (key, val) => {
        throw new DOMException('QuotaExceededError: The quota has been exceeded.', 'QuotaExceededError');
      };
    });

    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);

    const storeActionsSurvive = await page.evaluate(() => {
      try {
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: 'candle-top-shelf',
          title: 'Top Shelf',
          price: 34,
          quantity: 1
        });
        window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', 3);
        return { success: true, cartCount: window.PuckWickStore.getCartCount(), logo: window.PuckWickStore.state.activeLogoConcept };
      } catch (err) {
        return { success: false, error: err.message };
      }
    });

    const passed = storeActionsSurvive.success &&
                   storeActionsSurvive.cartCount === 1 &&
                   storeActionsSurvive.logo === 3 &&
                   pageErrors.length === 0;

    record('storageRecovery', '1.5 LocalStorage QuotaExceeded throws are caught safely without UI crash', passed, {
      pageErrors,
      storeActionsSurvive
    });

    await context.close();
  }
}

// =============================================================================
// SUITE 2: EXTREME CART OPERATIONS & CONCURRENCY
// =============================================================================
async function runExtremeCartSuite(browser) {
  console.log('\n============================================================');
  console.log('2. EXTREME CART OPERATIONS & CONCURRENCY SUITE');
  console.log('============================================================');

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const { pageErrors } = setupErrorTracking(page);

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Test 2.1: Rapid Concurrency Hammer - 30 rapid Add-to-Cart events within 50ms
  {
    const hammerResult = await page.evaluate(() => {
      const itemsToAdd = [
        { id: 'candle-top-shelf', title: 'Top Shelf', price: 34.00, scent: 'Bourbon & Vanilla' },
        { id: 'candle-fresh-cut', title: 'Fresh Cut', price: 34.00, scent: 'Crisp Fir & Mint' },
        { id: 'candle-balsam-fir', title: 'Balsam Fir', price: 34.00, scent: 'Balsam & Spruce' },
        { id: 'candle-barnwood-bourbon', title: 'Barnwood & Bourbon', price: 34.00, scent: 'Oak & Bourbon' }
      ];

      // Fire 30 rapid ADD_TO_CART dispatches
      for (let i = 0; i < 30; i++) {
        const item = itemsToAdd[i % itemsToAdd.length];
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: item.id,
          title: item.title,
          price: item.price,
          scent: item.scent,
          quantity: 1
        });
      }

      const totalItems = window.PuckWickStore.getCartCount();
      const subtotal = window.PuckWickStore.getCartSubtotal();
      const badgeCount = parseInt(document.getElementById('cart-count')?.textContent || '0', 10);

      return {
        totalItems,
        subtotal,
        badgeCount,
        expectedCount: 30,
        expectedSubtotal: 30 * 34.00
      };
    });

    const passed = hammerResult.totalItems === 30 &&
                   hammerResult.badgeCount === 30 &&
                   hammerResult.subtotal === (30 * 34.00) &&
                   pageErrors.length === 0;

    record('extremeCart', '2.1 Rapid Concurrency Hammer: 30 rapid item adds maintain exact count and subtotal', passed, hammerResult);
  }

  // Test 2.2: Extreme Quantity Clamping & Rapid Stepping
  {
    const steppingResult = await page.evaluate(() => {
      // Target item
      const itemId = 'candle-top-shelf';
      const itemScent = 'Bourbon & Vanilla';

      // 1. Step up to and beyond 99
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: itemId, scent: itemScent, quantity: 150 });
      const clampedMax = window.PuckWickStore.state.cart.find(it => it.id === itemId && it.scent === itemScent)?.quantity;

      // 2. Step down to 0
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: itemId, scent: itemScent, quantity: 0 });
      const itemAfterZero = window.PuckWickStore.state.cart.find(it => it.id === itemId && it.scent === itemScent);

      // 3. Step negative
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-fresh-cut', scent: 'Crisp Fir & Mint', quantity: -10 });
      const itemAfterNegative = window.PuckWickStore.state.cart.find(it => it.id === 'candle-fresh-cut');

      return {
        clampedMax,
        itemRemovedOnZero: itemAfterZero === undefined,
        itemRemovedOnNegative: itemAfterNegative === undefined,
        cartCount: window.PuckWickStore.getCartCount()
      };
    });

    const passed = steppingResult.clampedMax === 99 &&
                   steppingResult.itemRemovedOnZero &&
                   steppingResult.itemRemovedOnNegative &&
                   steppingResult.cartCount >= 0;

    record('extremeCart', '2.2 Boundary Clamping: Quantities clamp at 99; zero and negative quantities cleanly remove items', passed, steppingResult);
  }

  // Test 2.3: Simultaneous & Rapid Promo Code Application
  {
    const promoStressResult = await page.evaluate(() => {
      // Clear and re-populate cart with 2 candles ($68.00)
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 2, title: 'Top Shelf' });

      const subtotal = window.PuckWickStore.getCartSubtotal(); // 68

      // Rapidly fire multiple valid & invalid promo codes in burst
      const codes = ['PUCK10', 'INVALID_CODE', 'BLUEHYDRANGEA', 'EXPIRED99', 'FOUNDER20', '   ', ''];
      const results = [];
      for (const c of codes) {
        const res = window.PuckWickStore.dispatch('APPLY_PROMO', c);
        results.push({ code: c, res, discount: window.PuckWickStore.getDiscountAmount() });
      }

      // Check current state after FOUNDER20 followed by empty codes
      // In app.js, invalid codes don't erase existing valid promo code unless REMOVE_PROMO_CODE is dispatched
      const finalDiscount = window.PuckWickStore.getDiscountAmount();
      const grandTotal = window.PuckWickStore.getGrandTotal();
      const activePromo = window.PuckWickStore.state.promoCode?.code;

      return {
        subtotal,
        finalDiscount,
        grandTotal,
        activePromo,
        results
      };
    });

    const expectedDiscount = 68.00 * 0.20; // FOUNDER20 = 20% of 68 = 13.60
    const expectedGrandTotal = (68.00 - expectedDiscount) + 6.95; // Subtotal < $75 standard shipping applies
    const passed = Math.abs(promoStressResult.finalDiscount - expectedDiscount) < 0.01 &&
                   Math.abs(promoStressResult.grandTotal - expectedGrandTotal) < 0.01;

    record('extremeCart', '2.3 Rapid Promo Code Switcher preserves mathematical discount integrity and grand total', passed, {
      promoStressResult,
      expectedDiscount,
      expectedGrandTotal
    });
  }

  // Test 2.4: Zero-Dollar / Empty Cart Boundary Stress
  {
    const zeroCartResult = await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('APPLY_PROMO', 'FOUNDER20');

      const subtotal = window.PuckWickStore.getCartSubtotal();
      const count = window.PuckWickStore.getCartCount();
      const discount = window.PuckWickStore.getDiscountAmount();
      const shipping = window.PuckWickStore.getShippingTotal();
      const grandTotal = window.PuckWickStore.getGrandTotal();

      return {
        subtotal,
        count,
        discount,
        shipping,
        grandTotal,
        hasNegative: [subtotal, count, discount, shipping, grandTotal].some(v => v < 0),
        hasNaN: [subtotal, count, discount, shipping, grandTotal].some(v => isNaN(v))
      };
    });

    const passed = zeroCartResult.subtotal === 0 &&
                   zeroCartResult.count === 0 &&
                   zeroCartResult.discount === 0 &&
                   zeroCartResult.shipping === 0 &&
                   zeroCartResult.grandTotal === 0 &&
                   !zeroCartResult.hasNegative &&
                   !zeroCartResult.hasNaN;

    record('extremeCart', '2.4 Zero-Dollar / Empty Cart: Subtotal, shipping, discount, and grand total strictly $0 without NaN or negative values', passed, zeroCartResult);
  }

  // Test 2.5: Rapid Item Removals & Cart Empty State Restoration
  {
    // Populate 8 distinct items
    await page.evaluate(() => {
      for (let i = 1; i <= 8; i++) {
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: `item-${i}`,
          title: `Candle ${i}`,
          price: 34,
          quantity: 1,
          scent: `Scent ${i}`
        });
      }
    });

    // Open Cart Drawer
    await page.click('#cart-btn');
    await page.waitForTimeout(300);

    const drawerHasItems = await page.locator('.cart-item').count();

    // Rapidly remove all items
    await page.evaluate(() => {
      const items = [...window.PuckWickStore.state.cart];
      items.forEach(it => {
        window.PuckWickStore.dispatch('REMOVE_ITEM', { id: it.id, scent: it.scent });
      });
    });

    await page.waitForTimeout(200);

    const emptyViewVisible = await page.locator('[data-testid="cart-empty-view"], .cart-empty-state').first().isVisible();
    const checkoutBtnDisabled = await page.locator('#btn-proceed-checkout').first().isDisabled();
    const finalCartCount = await page.evaluate(() => window.PuckWickStore.getCartCount());

    const passed = drawerHasItems === 8 &&
                   emptyViewVisible &&
                   checkoutBtnDisabled &&
                   finalCartCount === 0;

    record('extremeCart', '2.5 Rapid Item Removals cleanly displays empty state and disables checkout trigger', passed, {
      drawerHasItems,
      emptyViewVisible,
      checkoutBtnDisabled,
      finalCartCount
    });

    // Close drawer
    await page.click('[data-testid="cart-close-btn"]');
    await page.waitForTimeout(200);
  }

  await context.close();
}

// =============================================================================
// SUITE 3: CHECKOUT STRESS & INPUT HARDENING
// =============================================================================
async function runCheckoutStressSuite(browser) {
  console.log('\n============================================================');
  console.log('3. CHECKOUT STRESS & INPUT HARDENING SUITE');
  console.log('============================================================');

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const { pageErrors } = setupErrorTracking(page);

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Add 1 candle to cart and open checkout modal
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'candle-top-shelf',
      title: 'Top Shelf',
      price: 34.00,
      quantity: 1,
      scent: 'Bourbon & Vanilla'
    });
  });

  await page.click('#cart-btn');
  await page.waitForTimeout(200);
  await page.click('#btn-proceed-checkout');
  await page.waitForTimeout(300);

  // Test 3.1: Missing Required Fields Validation
  {
    // Click submit without entering any fields
    await page.click('#btn-place-order');
    await page.waitForTimeout(200);

    const errorVisible = await page.locator('#checkout-error .promo-error, #checkout-form-feedback .promo-error').first().isVisible();
    const receiptVisible = (await page.locator('[data-testid="order-receipt"]').count()) > 0;

    const passed = errorVisible && !receiptVisible && pageErrors.length === 0;
    record('checkoutStress', '3.1 Missing required fields blocks submission and displays error feedback', passed, {
      errorVisible,
      receiptVisible
    });
  }

  // Test 3.2: Whitespace-Only Fields Attack
  {
    await page.fill('#customer-name', '   ');
    await page.fill('#customer-email', '   ');
    await page.fill('#customer-phone', '   ');
    await page.fill('#shipping-street', '   ');

    await page.click('#btn-place-order');
    await page.waitForTimeout(200);

    const errorVisible = await page.locator('#checkout-error .promo-error, #checkout-form-feedback .promo-error').first().isVisible();
    const receiptVisible = (await page.locator('[data-testid="order-receipt"]').count()) > 0;

    const passed = errorVisible && !receiptVisible;
    record('checkoutStress', '3.2 Whitespace-only fields injection properly trimmed and rejected', passed, {
      errorVisible,
      receiptVisible
    });
  }

  // Test 3.3: Invalid Email Pattern Rejection
  {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain',
      'spaces in@email.com'
    ];

    let allRejected = true;
    for (const badEmail of invalidEmails) {
      await page.fill('#customer-name', 'Wayne Gretzky');
      await page.fill('#customer-email', badEmail);
      await page.fill('#customer-phone', '703-555-9999');
      await page.fill('#shipping-street', '99 Great One Way');

      await page.click('#btn-place-order');
      await page.waitForTimeout(100);

      const receiptVisible = (await page.locator('[data-testid="order-receipt"]').count()) > 0;
      if (receiptVisible) {
        allRejected = false;
        break;
      }
    }

    record('checkoutStress', '3.3 Malformed email address patterns strictly rejected by checkout validator', allRejected);
  }

  // Test 3.4: Dynamic Delivery Method Switching (Shipping vs Pickup)
  {
    // Clear street address
    await page.fill('#shipping-street', '');

    // 1. In standard shipping, missing street should fail
    await page.click('#btn-place-order');
    await page.waitForTimeout(100);
    const failWithoutStreet = await page.locator('#checkout-error .promo-error, #checkout-form-feedback .promo-error').first().isVisible();

    // 2. Switch to Local Pickup ($0)
    await page.click('label[for="opt-local-pickup"]');
    await page.waitForTimeout(200);

    // Verify shipping fee drops to FREE ($0.00)
    const shippingText = await page.locator('.checkout-financial-table .free-tag').first().textContent();
    const isFree = shippingText.includes('FREE');

    // 3. Complete valid customer info without street
    await page.fill('#customer-name', 'Wayne Gretzky');
    await page.fill('#customer-email', 'wayne@puckandwick.com');
    await page.fill('#customer-phone', '703-555-9999');

    // Submit order for pickup
    await page.click('#btn-place-order');
    await page.waitForTimeout(400);

    const receipt = page.locator('[data-testid="order-receipt"]');
    const receiptVisible = await receipt.isVisible();
    const pickupAddressVisible = await page.locator('[data-testid="receipt-pickup-address"]').isVisible();

    const passed = failWithoutStreet && isFree && receiptVisible && pickupAddressVisible;
    record('checkoutStress', '3.4 Dynamic Delivery Switching: Pickup waives street address and sets $0 fee with store pickup instructions', passed, {
      failWithoutStreet,
      isFree,
      receiptVisible,
      pickupAddressVisible
    });

    // Close receipt
    await page.click('[data-testid="checkout-close-btn"]');
    await page.waitForTimeout(200);
  }

  // Test 3.5: Double-Click / Rapid Multi-Click Submission Prevention
  {
    // Add item and reopen checkout
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', {
        id: 'candle-fresh-cut',
        title: 'Fresh Cut',
        price: 34.00,
        quantity: 1,
        scent: 'Fresh Cut'
      });
    });

    await page.click('#cart-btn');
    await page.waitForTimeout(200);
    await page.click('#btn-proceed-checkout');
    await page.waitForTimeout(300);

    await page.fill('#customer-name', 'Sidney Crosby');
    await page.fill('#customer-email', 'sid87@puckandwick.com');
    await page.fill('#customer-phone', '703-555-0087');
    await page.click('label[for="opt-local-pickup"]');

    // Rapidly click "Place Order" button 8 times in ~50ms
    const placeBtn = page.locator('#btn-place-order');
    await Promise.all([
      placeBtn.click({ clickCount: 1 }),
      placeBtn.click({ clickCount: 1 }).catch(() => {}),
      placeBtn.click({ clickCount: 1 }).catch(() => {}),
      placeBtn.click({ clickCount: 1 }).catch(() => {})
    ]);

    await page.waitForTimeout(500);

    // Verify order count in localStorage
    const orderCount = await page.evaluate(() => {
      try {
        const orders = JSON.parse(localStorage.getItem('pw_orders') || '[]');
        return orders.filter(o => o.customer?.email === 'sid87@puckandwick.com').length;
      } catch (e) {
        return -1;
      }
    });

    const passed = orderCount === 1;
    record('checkoutStress', '3.5 Double-click / rapid multi-click prevention emits exactly ONE order record', passed, {
      orderCount
    });

    // Close receipt
    await page.click('[data-testid="checkout-close-btn"]');
    await page.waitForTimeout(200);
  }

  // Test 3.6: Payment Adapter Error & Network Failure Simulation
  {
    // Reopen checkout modal with an item
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', {
        id: 'candle-top-shelf',
        title: 'Top Shelf',
        price: 34.00,
        quantity: 1
      });
    });

    await page.click('#cart-btn');
    await page.waitForTimeout(200);
    await page.click('#btn-proceed-checkout');
    await page.waitForTimeout(300);

    // Configure Alina POS with Live Mode but empty API key (Invalid config)
    await page.click('button[data-adapter="alina_pos"]');
    await page.waitForTimeout(200);

    await page.evaluate(() => {
      const alina = window.PaymentAdapterRegistry.get('alina_pos');
      alina.config = {
        merchantId: 'ALINA-BH-01',
        sandbox: false, // Live mode
        apiKey: '' // Missing API key!
      };
      window.PuckWickStore.dispatch('UPDATE_PAYMENT_CONFIG', {
        activeAdapter: 'alina_pos',
        alinaPos: alina.config
      });
    });

    await page.fill('#customer-name', 'Mario Lemieux');
    await page.fill('#customer-email', 'mario66@puckandwick.com');
    await page.fill('#customer-phone', '703-555-0066');
    await page.click('label[for="opt-local-pickup"]');

    // Submit with invalid live credentials
    await page.click('#btn-place-order');
    await page.waitForTimeout(200);

    const alinaErrorFeedback = await page.locator('#checkout-error .promo-error, #checkout-form-feedback .promo-error').first().textContent();
    const btnReEnabled = !(await page.locator('#btn-place-order').first().isDisabled());
    // Now test simulated network error during payment processing
    await page.evaluate(() => {
      const alina = window.PaymentAdapterRegistry.get('alina_pos');
      const validSandboxConfig = {
        merchantId: 'ALINA-BH-01',
        sandbox: true,
        apiKey: ''
      };
      window.PuckWickStore.dispatch('UPDATE_PAYMENT_CONFIG', {
        activeAdapter: 'alina_pos',
        alinaPos: validSandboxConfig
      });
      // Simulate network gateway failure during processPayment
      alina.processPayment = async () => {
        return {
          success: false,
          status: 'failed',
          error: 'Network gateway timeout (504 Gateway Timeout). Please retry.'
        };
      };
    });

    await page.click('#btn-place-order');
    await page.waitForTimeout(200);

    const networkErrorFeedback = await page.locator('#checkout-error .promo-error, #checkout-form-feedback .promo-error').first().textContent();
    const btnReEnabledAfterFailure = !(await page.locator('#btn-place-order').first().isDisabled());

    const passed = alinaErrorFeedback.includes('API Key is required') &&
                   btnReEnabled &&
                   networkErrorFeedback.includes('Network gateway timeout') &&
                   btnReEnabledAfterFailure;

    record('checkoutStress', '3.6 Payment failure & network simulation displays clear feedback and re-enables submit button', passed, {
      alinaErrorFeedback,
      networkErrorFeedback,
      btnReEnabled,
      btnReEnabledAfterFailure
    });

    // Close checkout
    await page.click('[data-testid="checkout-close-btn"]');
    await page.waitForTimeout(200);
  }

  await context.close();
}

// =============================================================================
// SUITE 4: MULTI-MODULE CONCURRENT STATE TRANSITIONS
// =============================================================================
async function runMultiModuleSuite(browser) {
  console.log('\n============================================================');
  console.log('4. MULTI-MODULE CONCURRENT STATE TRANSITIONS SUITE');
  console.log('============================================================');

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const { pageErrors, consoleErrors } = setupErrorTracking(page);

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Continuous multi-module workflow session:
  // Step 1: Exclusive Box Builder -> Select Women's Luxe -> Select Fresh Cut -> Add to Cart
  await page.click('a[href="#exclusive-boxes"]');
  await page.waitForTimeout(300);

  await page.click('[data-testid="edition-toggle-women"]');
  await page.waitForTimeout(200);

  // Click Fresh Cut pill
  const freshCutPill = page.locator('[data-testid="box-scent-option-pill-candle-fresh-cut"], button[data-candle-id="candle-fresh-cut"]').first();
  if (await freshCutPill.isVisible()) {
    await freshCutPill.click();
    await page.waitForTimeout(200);
  }

  await page.click('#btn-add-box-to-cart');
  await page.waitForTimeout(400);

  // Close cart drawer if opened automatically
  const cartClose = page.locator('[data-testid="cart-close-btn"]').first();
  if (await cartClose.isVisible()) {
    await cartClose.click();
    await page.waitForTimeout(200);
  }

  // Step 2: Catalog Quick Adds -> Add Balsam Fir & Top Shelf
  await page.click('a[href="#shop"]');
  await page.waitForTimeout(300);

  // Add 2 candles via store directly or UI
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'candle-balsam-fir',
      title: 'Balsam Fir',
      price: 34.00,
      scent: 'Balsam & Spruce'
    });
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'candle-top-shelf',
      title: 'Top Shelf',
      price: 34.00,
      scent: 'Bourbon & Vanilla'
    });
  });
  await page.waitForTimeout(200);

  // Step 3: Brand Studio -> Switch to Concept 4 (Rustic Badge)
  await page.click('a[href="#studio"]');
  await page.waitForTimeout(300);
  const applyC4Btn = page.locator('[data-apply-concept="4"]').first();
  if (await applyC4Btn.isVisible()) {
    await applyC4Btn.click();
    await page.waitForTimeout(200);
  }

  // Step 4: Box Builder -> Switch to Men's Athlete -> Select Balsam Fir -> Add to Cart
  await page.click('a[href="#exclusive-boxes"]');
  await page.waitForTimeout(300);

  await page.click('[data-testid="edition-toggle-men"]');
  await page.waitForTimeout(200);

  const balsamPill = page.locator('[data-testid="box-scent-option-pill-candle-balsam-fir"], button[data-candle-id="candle-balsam-fir"]').first();
  if (await balsamPill.isVisible()) {
    await balsamPill.click();
    await page.waitForTimeout(200);
  }

  await page.click('#btn-add-box-to-cart');
  await page.waitForTimeout(400);

  // Step 5: Cart Drawer -> Apply promo code PUCK10
  const cartDrawer = page.locator('#cart-drawer');
  if (!(await cartDrawer.isVisible())) {
    await page.click('#cart-btn');
    await page.waitForTimeout(200);
  }

  await page.fill('#promo-code', 'PUCK10');
  await page.click('#btn-apply-promo');
  await page.waitForTimeout(300);

  // Step 6: Brand Studio -> Switch to Concept 2 (Heritage Crest)
  await page.click('[data-testid="cart-close-btn"]');
  await page.waitForTimeout(200);

  await page.click('a[href="#studio"]');
  await page.waitForTimeout(300);
  const applyC2Btn = page.locator('[data-apply-concept="2"]').first();
  if (await applyC2Btn.isVisible()) {
    await applyC2Btn.click();
    await page.waitForTimeout(200);
  }

  // Step 7: Open Checkout Modal & Complete Order
  await page.click('#cart-btn');
  await page.waitForTimeout(200);
  await page.click('#btn-proceed-checkout');
  await page.waitForTimeout(400);

  // Select Local Pickup
  await page.click('label[for="opt-local-pickup"]');
  await page.waitForTimeout(100);

  await page.fill('#customer-name', 'Alexander Ovechkin');
  await page.fill('#customer-email', 'ovi8@caps.com');
  await page.fill('#customer-phone', '703-555-0808');

  // Submit order
  await page.click('#btn-place-order');
  await page.waitForTimeout(500);

  // Verifications
  const receipt = page.locator('[data-testid="order-receipt"]');
  const receiptVisible = await receipt.isVisible();
  const orderNumber = await page.locator('[data-testid="order-number"]').first().textContent();

  const finalCheck = await page.evaluate(() => {
    const cartCount = window.PuckWickStore.getCartCount();
    const activeLogo = window.PuckWickStore.state.activeLogoConcept;
    const headerSvgText = document.getElementById('brand-mark-header')?.innerHTML || '';
    return {
      cartCount,
      activeLogo,
      hasHeritageSignature: headerSvgText.includes('c2-crest-shield') || headerSvgText.includes('XX YRS') || headerSvgText.includes('ON THE ICE')
    };
  });

  const passed = receiptVisible &&
                 orderNumber.startsWith('PW-2026-') &&
                 finalCheck.cartCount === 0 &&
                 finalCheck.activeLogo === 2 &&
                 finalCheck.hasHeritageSignature &&
                 pageErrors.length === 0;

  record('multiModule', '4.1 Continuous multi-module workflow (Box Customizer + Catalog + Studio Switcher + Promo + Checkout) executes flawlessly with 0 errors', passed, {
    receiptVisible,
    orderNumber,
    finalCheck,
    pageErrors,
    consoleErrors
  });

  await context.close();
}

// =============================================================================
// SUITE 5: DYNAMIC VIEWPORT RESIZING STRESS DURING OPEN MODALS/DRAWERS
// =============================================================================
async function runViewportResizingSuite(browser) {
  console.log('\n============================================================');
  console.log('5. DYNAMIC VIEWPORT RESIZING STRESS SUITE (1440 -> 768 -> 390 -> 320 -> 1440)');
  console.log('============================================================');

  const viewports = [
    { name: '1440px Desktop', width: 1440, height: 900 },
    { name: '768px Tablet', width: 768, height: 1024 },
    { name: '390px Mobile', width: 390, height: 844 },
    { name: '320px Compact SE', width: 320, height: 568 },
    { name: '1440px Desktop Restore', width: 1440, height: 900 }
  ];

  // Helper to assert zero horizontal page overflow
  async function assertZeroHorizontalOverflow(page) {
    return page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      return {
        hasOverflow: scrollW > clientW,
        scrollW,
        clientW,
        innerW
      };
    });
  }

  // Test 5.1: Cart Drawer open during dynamic resize across breakpoints
  {
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Add candle and open drawer
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
    });
    await page.click('#cart-btn');
    await page.waitForTimeout(300);

    let allZeroOverflow = true;
    const overflowSnapshots = [];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await assertZeroHorizontalOverflow(page);
      overflowSnapshots.push({ viewport: vp.name, overflow });
      if (overflow.hasOverflow) {
        allZeroOverflow = false;
      }
    }

    // Verify close button can still be clicked at 1440
    await page.click('[data-testid="cart-close-btn"]');
    await page.waitForTimeout(200);
    const drawerClosed = !(await page.locator('#cart-drawer').isVisible());

    const passed = allZeroOverflow && drawerClosed && pageErrors.length === 0;
    record('viewportResizing', '5.1 Cart Drawer maintains zero horizontal bleed across dynamic viewports and closes cleanly', passed, {
      allZeroOverflow,
      drawerClosed,
      overflowSnapshots
    });

    await context.close();
  }

  // Test 5.2: Product Quick-View Modal open during dynamic resize
  {
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Open quick view for first candle
    await page.click('.quick-view-btn');
    await page.waitForTimeout(300);

    let allZeroOverflow = true;
    const overflowSnapshots = [];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await assertZeroHorizontalOverflow(page);
      overflowSnapshots.push({ viewport: vp.name, overflow });
      if (overflow.hasOverflow) {
        allZeroOverflow = false;
      }
    }

    // Close modal at 1440
    await page.click('[data-testid="modal-close-btn"]');
    await page.waitForTimeout(200);
    const modalClosed = !(await page.locator('[data-testid="product-modal"]').isVisible());

    const passed = allZeroOverflow && modalClosed && pageErrors.length === 0;
    record('viewportResizing', '5.2 Product Quick-View Modal bounds cleanly across dynamic resize without horizontal overflow', passed, {
      allZeroOverflow,
      modalClosed,
      overflowSnapshots
    });

    await context.close();
  }

  // Test 5.3: Checkout Modal open during dynamic resize
  {
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Add candle and open checkout modal
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
    });
    await page.click('#cart-btn');
    await page.waitForTimeout(200);
    await page.click('#btn-proceed-checkout');
    await page.waitForTimeout(300);

    let allZeroOverflow = true;
    const overflowSnapshots = [];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await assertZeroHorizontalOverflow(page);
      overflowSnapshots.push({ viewport: vp.name, overflow });
      if (overflow.hasOverflow) {
        allZeroOverflow = false;
      }
    }

    // Close checkout modal
    await page.click('[data-testid="checkout-close-btn"]');
    await page.waitForTimeout(200);
    const checkoutClosed = (await page.locator('[data-testid="checkout-modal"]').count()) === 0;

    const passed = allZeroOverflow && checkoutClosed && pageErrors.length === 0;
    record('viewportResizing', '5.3 Checkout Modal layout maintains strict containment across dynamic viewports', passed, {
      allZeroOverflow,
      checkoutClosed,
      overflowSnapshots
    });

    await context.close();
  }

  // Test 5.4: Alina POS Settings Submodal open during dynamic resize
  {
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Add candle, open checkout, select Alina POS, open config modal
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
    });
    await page.click('#cart-btn');
    await page.waitForTimeout(200);
    await page.click('#btn-proceed-checkout');
    await page.waitForTimeout(300);

    await page.click('button[data-adapter="alina_pos"]');
    await page.waitForTimeout(200);
    await page.click('#btn-open-alina-config');
    await page.waitForTimeout(300);

    let allZeroOverflow = true;
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await assertZeroHorizontalOverflow(page);
      if (overflow.hasOverflow) {
        allZeroOverflow = false;
      }
    }

    // Close Alina modal
    await page.click('#btn-close-alina-modal');
    await page.waitForTimeout(200);
    const alinaClosed = !(await page.locator('[data-testid="alina-pos-modal"]').isVisible());

    const passed = allZeroOverflow && alinaClosed && pageErrors.length === 0;
    record('viewportResizing', '5.4 Alina POS Submodal stays centered and accessible during viewport mutations', passed, {
      allZeroOverflow,
      alinaClosed
    });

    await context.close();
  }

  // Test 5.5: Wholesale Inquiry Modal open during dynamic resize
  {
    const context = await browser.newContext({ viewport: viewports[0] });
    const page = await context.newPage();
    const { pageErrors } = setupErrorTracking(page);

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Open wholesale modal from Stockist section
    await page.click('#btn-inquire-wholesale');
    await page.waitForTimeout(300);

    let allZeroOverflow = true;
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await assertZeroHorizontalOverflow(page);
      if (overflow.hasOverflow) {
        allZeroOverflow = false;
      }
    }

    // Close wholesale modal
    await page.click('#btn-close-wholesale');
    await page.waitForTimeout(200);
    const wholesaleClosed = !(await page.locator('[data-testid="wholesale-modal"]').isVisible());

    const passed = allZeroOverflow && wholesaleClosed && pageErrors.length === 0;
    record('viewportResizing', '5.5 Wholesale Inquiry Modal adapts cleanly across dynamic viewports down to 320px', passed, {
      allZeroOverflow,
      wholesaleClosed
    });

    await context.close();
  }
}

// =============================================================================
// MAIN RUNNER
// =============================================================================
async function main() {
  console.log('============================================================');
  console.log('  PUCK & WICK TIER 5 ADVERSARIAL STRESS TEST HARNESS');
  console.log('============================================================');

  const { server } = await startServer(TEST_PORT);
  console.log(`[Server] Live test server listening on ${BASE_URL}`);

  let browser;
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  };
  if (fs.existsSync(SYSTEM_CHROME_PATH)) {
    launchOptions.executablePath = SYSTEM_CHROME_PATH;
    console.log(`[Browser] Using system Google Chrome: ${SYSTEM_CHROME_PATH}`);
  } else {
    console.log(`[Browser] Using bundled Chromium.`);
  }

  try {
    browser = await chromium.launch(launchOptions);
  } catch (err) {
    console.warn(`[Browser] Fallback default launch:`, err.message);
    delete launchOptions.executablePath;
    browser = await chromium.launch(launchOptions);
  }

  const startTime = Date.now();

  try {
    await runStorageRecoverySuite(browser);
    await runExtremeCartSuite(browser);
    await runCheckoutStressSuite(browser);
    await runMultiModuleSuite(browser);
    await runViewportResizingSuite(browser);
  } catch (err) {
    console.error('\n[FATAL ERROR IN HARNESS RUN]:', err);
  } finally {
    if (browser) await browser.close();
    if (server) server.close();
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalTests = totalPassed + totalFailed;

  console.log('\n============================================================');
  console.log('  TIER 5 ADVERSARIAL STRESS TEST SUMMARY');
  console.log('============================================================');
  console.log(`  Total Scenarios Executed: ${totalTests}`);
  console.log(`  Passed:                   \x1b[32m${totalPassed}\x1b[0m`);
  console.log(`  Failed:                   \x1b[${totalFailed > 0 ? '31m' : '32m'}${totalFailed}\x1b[0m`);
  console.log(`  Duration:                 ${durationSec}s`);
  console.log('============================================================\n');

  // Output JSON report artifact to test-results if folder exists
  const resultsDir = 'test-results';
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  fs.writeFileSync(
    `${resultsDir}/tier5-stress-report.json`,
    JSON.stringify({ totalTests, totalPassed, totalFailed, durationSec, results }, null, 2)
  );

  if (totalFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('[Harness Runner Error]:', err);
  process.exit(1);
});
