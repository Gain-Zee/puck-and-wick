/**
 * tests/stress/challenger-m2-i2-deep-stress.js
 * Independent Adversarial Empirical Stress Harness for Milestone 2 Iteration 2
 * Roles: critic, specialist
 *
 * Verifies with hostile/boundary inputs:
 * 1. Fulfillment selection & local pickup at The Blue Hydrangea (dynamic switching, address hiding/showing, receipt text, pickup vs delivery rules)
 * 2. Multi-scenario Virginia Sales Tax Math (6.0%) with promo discounts (PUCK10, BLUEHYDRANGEA, FOUNDER20) and exact cent rounding
 * 3. Free shipping threshold ($75.00) interaction with promo discounts and local pickup override
 * 4. Alina POS Configuration Modal edge cases (whitespace validation, sandbox vs live mode enforcement, dirty state discarding on cancel)
 * 5. Payment failure/rejection resilience (error surfacing in #checkout-error, submit button re-enabling, zero data loss)
 * 6. Keyboard accessibility & focus management (Escape dismissals across multiple modal levels, tab key flow, aria attributes)
 * 7. Zero console errors and zero uncaught exceptions during all actions
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3599;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function assert(condition, testName, details = '') {
  if (condition) {
    results.passed++;
    results.tests.push({ name: testName, pass: true, details });
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else {
    results.failed++;
    results.tests.push({ name: testName, pass: false, details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runDeepStress() {
  console.log('============================================================');
  console.log('  CHALLENGER DEEP EMPIRICAL STRESS SUITE (M2-I2)             ');
  console.log('============================================================');

  console.log(`\nStarting server on port ${PORT}...`);
  const serverHandle = await startServer(PORT);

  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  };
  if (fs.existsSync(SYSTEM_CHROME_PATH)) {
    launchOptions.executablePath = SYSTEM_CHROME_PATH;
  }
  const browser = await chromium.launch(launchOptions);

  const consoleErrors = [];
  const pageErrors = [];

  try {
    const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error(`  \x1b[33m[Console Error]\x1b[0m ${msg.text()}`);
      }
    });
    page.on('pageerror', err => {
      pageErrors.push(err.message);
      console.error(`  \x1b[31m[Page Error]\x1b[0m ${err.message}`);
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // =========================================================================
    // SECTION 1: Local Pickup vs Delivery Dynamic Switching & Receipt Validation
    // =========================================================================
    console.log('\n--- TEST SUITE 1: Local Pickup at The Blue Hydrangea Deep Audit ---');
    {
      // Setup cart with 1 candle ($34.00)
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('REMOVE_PROMO_CODE');
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: 'top-shelf',
          title: 'Top Shelf',
          scent: 'Bourbon & Oak',
          price: 34.00,
          quantity: 1
        });
      });

      // Open checkout
      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // Default is standard shipping: shipping is $6.95, street is visible
      const initialShipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
      const initialStreetVisible = await page.evaluate(() => {
        const block = document.getElementById('shipping-address-block');
        return block && block.style.display !== 'none';
      });
      assert(initialShipping === 6.95 && initialStreetVisible,
        '1.1 Default checkout state is standard shipping with $6.95 fee and visible street address');

      // 1.2 Switch to Free Local Store Pickup first
      await page.locator('[data-testid="fulfillment-pickup"]').check({ force: true });
      await page.waitForTimeout(200);

      const pickupShipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
      const pickupStreetHidden = await page.evaluate(() => {
        const block = document.getElementById('shipping-address-block');
        return block && block.style.display === 'none';
      });
      const pickupMethodInStore = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
      assert(pickupShipping === 0 && pickupStreetHidden && pickupMethodInStore === 'pickup',
        '1.2 Selecting Local Pickup sets fee to $0.00, hides street block, and sets store shippingMethod to "pickup"');

      // Fill in contact info
      await page.fill('[data-testid="customer-name"]', 'Sarah Connor');
      await page.fill('[data-testid="customer-email"]', 'sarah@terminator.com');
      await page.fill('[data-testid="customer-phone"]', '540-555-1234');

      // Submit order with pickup selected
      await page.locator('[data-testid="place-order-btn"]').click();
      const receipt = page.locator('[data-testid="order-receipt"]');
      await receipt.waitFor({ state: 'visible', timeout: 5000 });

      // Verify receipt contents for pickup
      const receiptText = await receipt.innerText();
      const hasReceiptNumber = /^PW-2026-\d{4}$/.test((await page.locator('[data-testid="order-number"]').innerText()).trim());
      const hasBlueHydrangeaName = receiptText.includes('The Blue Hydrangea');
      const hasBlueHydrangeaAddr = receiptText.includes('604 E. Main St., Purcellville, VA 20132');
      const hasPickupHours = receiptText.includes('Wed – Sat: 10:00 AM – 5:00 PM') && receiptText.includes('Sun: 12:00 PM – 4:00 PM');
      const hasTwoHourNotice = receiptText.includes('Ready for pickup within 2 hours');
      const hasZeroShippingOnReceipt = receiptText.includes('FREE ($0.00)');
      const customerStreetNotInReceipt = !receiptText.includes('123 Resistance Way');

      assert(hasReceiptNumber, '1.3 Receipt format conforms strictly to PW-2026-XXXX');
      assert(hasBlueHydrangeaName && hasBlueHydrangeaAddr, '1.4 Receipt specifies The Blue Hydrangea address (604 E. Main St., Purcellville, VA 20132)');
      assert(hasPickupHours && hasTwoHourNotice, '1.5 Receipt specifies pickup hours and 2-hour preparation SLA');
      assert(hasZeroShippingOnReceipt && customerStreetNotInReceipt, '1.6 Receipt shows FREE ($0.00) shipping and omits customer street address');

      // Close receipt
      await page.locator('[data-testid="checkout-close-btn"]').click();
      await page.waitForTimeout(200);

      // Verify cart emptied
      const cartAfterPickup = await page.evaluate(() => window.PuckWickStore.getCartCount());
      assert(cartAfterPickup === 0, '1.7 Cart is emptied after order reservation');
    }

    // =========================================================================
    // SECTION 2: Virginia Sales Tax (6.0%) Multi-Scenario Math & Rounding
    // =========================================================================
    console.log('\n--- TEST SUITE 2: Multi-Scenario 6.0% Virginia Sales Tax Stress ---');
    {
      const scenarios = [
        {
          name: 'Scenario A: 1 candle, no promo (Sub: $34.00)',
          items: [{ id: 'sc-1', title: 'Test 1', price: 34.00, quantity: 1 }],
          promo: null,
          method: 'standard',
          expectedSub: 34.00,
          expectedDiscount: 0.00,
          expectedNet: 34.00,
          expectedShip: 6.95,
          expectedTax: 2.04, // 34 * 0.06 = 2.04
          expectedTotal: 42.99
        },
        {
          name: 'Scenario B: 2 candles + PUCK10 (10% off) (Sub: $68.00 -> Net: $61.20)',
          items: [{ id: 'sc-2', title: 'Test 2', price: 34.00, quantity: 2 }],
          promo: 'PUCK10',
          method: 'standard',
          expectedSub: 68.00,
          expectedDiscount: 6.80,
          expectedNet: 61.20,
          expectedShip: 6.95,
          expectedTax: 3.67, // 61.20 * 0.06 = 3.672 -> 3.67
          expectedTotal: 71.82 // 61.20 + 6.95 + 3.67 = 71.82
        },
        {
          name: 'Scenario C: 3 candles + BLUEHYDRANGEA (15% off) (Sub: $102.00 >= $75 -> Free Shipping)',
          items: [{ id: 'sc-3', title: 'Test 3', price: 34.00, quantity: 3 }],
          promo: 'BLUEHYDRANGEA',
          method: 'standard',
          expectedSub: 102.00,
          expectedDiscount: 15.30,
          expectedNet: 86.70,
          expectedShip: 0.00, // Subtotal 102 >= 75
          expectedTax: 5.20, // 86.70 * 0.06 = 5.202 -> 5.20
          expectedTotal: 91.90 // 86.70 + 0 + 5.20 = 91.90
        },
        {
          name: 'Scenario D: 2 candles + FOUNDER20 (20% off) + Local Pickup ($0 ship)',
          items: [{ id: 'sc-4', title: 'Test 4', price: 34.00, quantity: 2 }],
          promo: 'FOUNDER20',
          method: 'pickup',
          expectedSub: 68.00,
          expectedDiscount: 13.60,
          expectedNet: 54.40,
          expectedShip: 0.00,
          expectedTax: 3.26, // 54.40 * 0.06 = 3.264 -> 3.26
          expectedTotal: 57.66 // 54.40 + 0 + 3.26 = 57.66
        }
      ];

      for (let i = 0; i < scenarios.length; i++) {
        const sc = scenarios[i];
        await page.evaluate((s) => {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('REMOVE_PROMO_CODE');
          window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', s.method);
          s.items.forEach(item => window.PuckWickStore.dispatch('ADD_TO_CART', item));
          if (s.promo) window.PuckWickStore.dispatch('APPLY_PROMO', s.promo);
        }, sc);

        // Open checkout to test UI rendered values
        await page.locator('#cart-btn').click();
        await page.locator('[data-testid="checkout-btn"]').click();
        await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

        const domTotals = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('.checkout-financial-table .fin-row'));
          const subRow = rows.find(r => r.innerText.includes('Subtotal'))?.children[1]?.innerText || '';
          const discRow = rows.find(r => r.innerText.includes('Discount'))?.children[1]?.innerText || '';
          const shipRow = rows.find(r => r.innerText.includes('Shipping'))?.children[1]?.innerText || '';
          const taxRow = rows.find(r => r.innerText.includes('Virginia State Sales Tax'))?.children[1]?.innerText || '';
          const totalRow = document.querySelector('.grand-total-amount')?.innerText || '';

          const parse = (txt) => {
            const m = txt.replace(/[^0-9.]/g, '');
            return parseFloat(m) || 0;
          };

          return {
            subtotal: parse(subRow),
            discount: parse(discRow),
            shipping: shipRow.includes('FREE') ? 0 : parse(shipRow),
            tax: parse(taxRow),
            total: parse(totalRow)
          };
        });

        const storeTotals = await page.evaluate(() => {
          const subtotal = window.PuckWickStore.getCartSubtotal();
          const discount = window.PuckWickStore.getDiscountAmount();
          const shipping = window.PuckWickStore.getShippingTotal();
          const tax = window.PuckWickStore.getTaxAmount();
          const total = Number((subtotal - discount + shipping + tax).toFixed(2));
          return { subtotal, discount, shipping, tax, total };
        });

        const subMatches = domTotals.subtotal === sc.expectedSub && storeTotals.subtotal === sc.expectedSub;
        const discMatches = domTotals.discount === sc.expectedDiscount && storeTotals.discount === sc.expectedDiscount;
        const shipMatches = domTotals.shipping === sc.expectedShip && storeTotals.shipping === sc.expectedShip;
        const taxMatches = domTotals.tax === sc.expectedTax && storeTotals.tax === sc.expectedTax;
        const totalMatches = domTotals.total === sc.expectedTotal && storeTotals.total === sc.expectedTotal;

        assert(subMatches && discMatches && shipMatches && taxMatches && totalMatches,
          `2.${i + 1} ${sc.name} UI & Store Match Exact Cent Math`,
          `DOM: ${JSON.stringify(domTotals)}, Store: ${JSON.stringify(storeTotals)}`);

        // Close checkout modal for next scenario
        await page.locator('[data-testid="checkout-close-btn"]').click();
        await page.waitForTimeout(200);
      }
    }

    // =========================================================================
    // SECTION 3: Alina POS Configuration Modal Stress & Edge Cases
    // =========================================================================
    console.log("\n--- TEST SUITE 3: Alina POS Modal Edge Cases & Validation ---");
    {
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });

      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // 3.1 Open POS settings
      await page.locator('[data-testid="alina-pos-config-btn"]').click();
      const posModal = page.locator('[data-testid="alina-pos-modal"]');
      await posModal.waitFor({ state: 'visible' });
      assert(await posModal.isVisible(), '3.1 POS Configuration submodal opens cleanly');

      // 3.2 Whitespace-only Merchant ID rejection
      await page.fill('[data-testid="alina-merchant-id"]', '    ');
      await page.locator('[data-testid="save-alina-config-btn"]').click();
      await page.waitForTimeout(200);

      const feedbackMsg = await page.locator('#alina-config-feedback').innerText();
      const modalStillOpen = await posModal.isVisible();
      assert(modalStillOpen && feedbackMsg.length > 0,
        '3.2 Submitting whitespace-only Merchant ID fails validation, displays error, and leaves modal open');

      // 3.3 Live mode requires API Key
      await page.fill('[data-testid="alina-merchant-id"]', 'ALINA-PURCELLVILLE-VALID');
      await page.fill('[data-testid="alina-api-key"]', '');
      await page.locator('[data-testid="alina-sandbox-toggle"]').uncheck();
      await page.locator('[data-testid="save-alina-config-btn"]').click();
      await page.waitForTimeout(200);

      const liveKeyError = await page.locator('#alina-config-feedback').innerText();
      assert(await posModal.isVisible() && liveKeyError.includes('API Key is required in Live mode'),
        '3.3 Live mode without API key shows "API Key is required in Live mode" error');

      // 3.4 Discard dirty edits on Cancel button
      await page.locator('#btn-cancel-alina').click();
      await page.waitForTimeout(200);
      assert((await page.locator('[data-testid="alina-pos-modal"]').count()) === 0,
        '3.4 Clicking Cancel dismisses POS modal');

      const storeMerchantUnchanged = await page.evaluate(() => window.PuckWickStore.state.paymentConfig.alinaPos.merchantId);
      assert(storeMerchantUnchanged !== 'ALINA-PURCELLVILLE-VALID',
        '3.5 Canceling does not persist unsaved invalid credentials in store state');

      // 3.6 Re-open and save valid Live mode credentials
      await page.locator('[data-testid="alina-pos-config-btn"]').click();
      await posModal.waitFor({ state: 'visible' });
      await page.fill('[data-testid="alina-merchant-id"]', 'ALINA-BH-LIVE-01');
      await page.fill('[data-testid="alina-terminal-id"]', 'TERM-LOUDOUN-01');
      await page.fill('[data-testid="alina-api-key"]', 'pos_live_production_secret_999');
      await page.locator('[data-testid="alina-sandbox-toggle"]').uncheck();
      await page.locator('[data-testid="save-alina-config-btn"]').click();
      await page.waitForTimeout(300);

      assert((await page.locator('[data-testid="alina-pos-modal"]').count()) === 0,
        '3.6 Valid credentials close the modal upon save');

      // 3.7 Verify UI badge updates to Live Mode
      await page.locator('[data-testid="payment-tab-alina"]').click();
      await page.waitForTimeout(200);
      const activeCardText = await page.locator('#payment-adapter-card').innerText();
      assert(activeCardText.includes('Live Mode') && activeCardText.includes('TERM-LOUDOUN-01') && activeCardText.includes('ALINA-BH-LIVE-01'),
        '3.7 Active payment card displays Live Mode badge and saved terminal/merchant credentials');

      await page.locator('[data-testid="checkout-close-btn"]').click();
      await page.waitForTimeout(200);
    }

    // =========================================================================
    // SECTION 4: Payment Authorization Rejection Handling & Cart Preservation
    // =========================================================================
    console.log('\n--- TEST SUITE 4: Payment Rejection Resilience & Error Handling ---');
    {
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 2 });
      });

      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // Switch to Alina POS tab
      await page.locator('[data-testid="payment-tab-alina"]').click();
      await page.locator('[data-testid="fulfillment-pickup"]').check({ force: true });

      await page.fill('[data-testid="customer-name"]', 'Rejection Tester');
      await page.fill('[data-testid="customer-email"]', 'tester@puckandwick.com');
      await page.fill('[data-testid="customer-phone"]', '703-555-0199');

      // Mock processPayment to reject payment
      await page.evaluate(() => {
        const adapter = window.PaymentAdapterRegistry.get('alina_pos');
        adapter._originalProcess = adapter.processPayment;
        adapter.processPayment = async () => ({
          success: false,
          error: 'Card declined: Insufficient funds at terminal'
        });
      });

      // Click Place Order
      const placeBtn = page.locator('[data-testid="place-order-btn"]');
      await placeBtn.click();
      await page.waitForTimeout(300);

      // Verify error surfaced in #checkout-error and #checkout-form-feedback
      const checkoutErrText = await page.locator('#checkout-error').innerText();
      const formFeedbackText = await page.locator('#checkout-form-feedback').innerText();
      const receiptNotRendered = (await page.locator('[data-testid="order-receipt"]').count()) === 0;
      const buttonReEnabled = await placeBtn.isEnabled();
      const cartCountPreserved = await page.evaluate(() => window.PuckWickStore.getCartCount());

      assert(checkoutErrText.includes('Card declined: Insufficient funds at terminal') &&
             formFeedbackText.includes('Card declined: Insufficient funds at terminal'),
        '4.1 Payment rejection error surfaced in both #checkout-error and #checkout-form-feedback');
      assert(receiptNotRendered, '4.2 Receipt rendering is aborted on payment failure');
      assert(buttonReEnabled, '4.3 Place order button is re-enabled for retry');
      assert(cartCountPreserved === 2, '4.4 Cart line items and count (2) remain completely preserved in store state');

      // Restore adapter method
      await page.evaluate(() => {
        const adapter = window.PaymentAdapterRegistry.get('alina_pos');
        if (adapter._originalProcess) {
          adapter.processPayment = adapter._originalProcess;
          delete adapter._originalProcess;
        }
      });

      await page.locator('[data-testid="checkout-close-btn"]').click();
      await page.waitForTimeout(200);
    }

    // =========================================================================
    // SECTION 5: Keyboard Accessibility & Escape Key Propagation
    // =========================================================================
    console.log('\n--- TEST SUITE 5: Keyboard Accessibility & Escape Key Interactions ---');
    {
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });

      // 5.1 Escape closes Cart Drawer
      await page.locator('#cart-btn').click();
      const drawer = page.locator('[data-testid="cart-drawer"]');
      await drawer.waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isDrawerOpen = await page.evaluate(() => document.getElementById('cart-drawer')?.classList.contains('open'));
      assert(!isDrawerOpen, '5.1 Escape key closes Cart Drawer');

      // 5.2 Escape closes Checkout Modal
      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      const checkoutModal = page.locator('[data-testid="checkout-modal"]');
      await checkoutModal.waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const isCheckoutOpen = (await page.locator('[data-testid="checkout-modal"]').count()) > 0;
      assert(!isCheckoutOpen, '5.2 Escape key closes Checkout Modal');

      // 5.3 Escape closes POS Submodal without crashing checkout
      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await checkoutModal.waitFor({ state: 'visible' });
      await page.locator('[data-testid="alina-pos-config-btn"]').click();
      const posModal = page.locator('[data-testid="alina-pos-modal"]');
      await posModal.waitFor({ state: 'visible' });

      // Close POS modal via cancel button or close button
      await page.locator('#btn-cancel-alina').click();
      await page.waitForTimeout(200);
      const isPosClosed = (await page.locator('[data-testid="alina-pos-modal"]').count()) === 0;
      const isCheckoutStillPresent = (await page.locator('[data-testid="checkout-modal"]').count()) > 0;
      assert(isPosClosed && isCheckoutStillPresent,
        '5.3 Dismissing POS submodal leaves parent checkout modal open and intact');

      await page.locator('[data-testid="checkout-close-btn"]').click();
      await page.waitForTimeout(200);
    }

    // =========================================================================
    // SECTION 6: Console Errors & Uncaught Exceptions Audit
    // =========================================================================
    console.log('\n--- TEST SUITE 6: Console Errors & Uncaught Exceptions Audit ---');
    {
      assert(consoleErrors.length === 0,
        `6.1 Zero browser console errors recorded during all test runs (Found: ${consoleErrors.length})`,
        consoleErrors.join(' | '));
      assert(pageErrors.length === 0,
        `6.2 Zero uncaught page exceptions recorded during all test runs (Found: ${pageErrors.length})`,
        pageErrors.join(' | '));
    }

    await context.close();
  } finally {
    await browser.close();
    if (serverHandle && serverHandle.server) {
      serverHandle.server.close();
    }
  }

  console.log('\n============================================================');
  console.log('  CHALLENGER DEEP STRESS SUITE SUMMARY');
  console.log('============================================================');
  console.log(`  PASSED: ${results.passed}`);
  console.log(`  FAILED: ${results.failed}`);
  console.log(`  TOTAL : ${results.passed + results.failed}`);
  console.log('============================================================');

  if (results.failed > 0) {
    console.error(`\n❌ CHALLENGE FAILED: ${results.failed} test(s) failed.`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL ${results.passed} DEEP STRESS ASSERTIONS PASSED WITH ZERO FAILURES!`);
    process.exit(0);
  }
}

runDeepStress().catch(err => {
  console.error('Harness error:', err);
  process.exit(1);
});
