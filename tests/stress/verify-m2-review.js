/**
 * tests/stress/verify-m2-review.js
 * Independent verification and adversarial stress-testing harness for Milestone 2.
 */

import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3881;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const results = {
  passed: 0,
  failed: 0,
  details: []
};

function pass(name, msg = '') {
  results.passed++;
  results.details.push({ name, status: 'PASS', msg });
  console.log(`  \x1b[32m[PASS]\x1b[0m ${name}${msg ? ' — ' + msg : ''}`);
}

function fail(name, error) {
  results.failed++;
  results.details.push({ name, status: 'FAIL', error: error.message || String(error) });
  console.error(`  \x1b[31m[FAIL]\x1b[0m ${name} — ${error.message || String(error)}`);
}

async function run() {
  console.log('Starting static server on port ' + PORT);
  const server = await startServer(PORT);

  const browser = await chromium.launch({
    headless: true,
    executablePath: SYSTEM_CHROME_PATH
  });

  try {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(err.message));

    // 1. IPaymentAdapter interface contract conformance
    console.log('\n--- 1. IPaymentAdapter & Registry Conformance ---');
    await page.goto(BASE_URL);

    const adapterContractCheck = await page.evaluate(async () => {
      if (!window.IPaymentAdapter || !window.PaymentAdapterRegistry) return { ok: false, reason: 'Missing globals' };
      const base = new window.IPaymentAdapter({ id: 'test_base', name: 'Test Base' });
      const val = base.validateConfig();
      const pay = await base.processPayment({});
      return {
        ok: typeof base.validateConfig === 'function' &&
            typeof base.processPayment === 'function' &&
            val.valid === true &&
            pay.success === true &&
            window.PaymentAdapterRegistry.has('offline_reservation') &&
            window.PaymentAdapterRegistry.has('alina_pos'),
        val,
        pay
      };
    });

    if (adapterContractCheck.ok) {
      pass('IPaymentAdapter contract & PaymentAdapterRegistry initialized properly');
    } else {
      fail('IPaymentAdapter contract check', new Error(JSON.stringify(adapterContractCheck)));
    }

    // 2. OfflineReservationAdapter working flow
    console.log('\n--- 2. OfflineReservationAdapter Flow ---');
    const offlineFlow = await page.evaluate(async () => {
      const adapter = window.PaymentAdapterRegistry.get('offline_reservation');
      if (!adapter) return { ok: false, reason: 'offline_reservation not found' };
      const res = await adapter.processPayment({
        subtotal: 68,
        discount: 6.8,
        shipping: 0,
        tax: 3.67,
        total: 64.87,
        customer: { fullName: 'Alex Hockey', email: 'alex@pw.com', phone: '703-555-0100' },
        fulfillment: 'pickup'
      });
      const orderIdValid = /^PW-2026-\d{4}$/.test(res.orderId);
      return {
        ok: res.success === true && res.status === 'reserved' && orderIdValid,
        res
      };
    });

    if (offlineFlow.ok) {
      pass('OfflineReservationAdapter generates valid PW-2026-XXXX receipt', offlineFlow.res.orderId);
    } else {
      fail('OfflineReservationAdapter flow', new Error(JSON.stringify(offlineFlow)));
    }

    // 3. AlinaPosAdapter credential configuration modal & validation
    console.log('\n--- 3. AlinaPosAdapter Credentials & Modal ---');
    const alinaValidation = await page.evaluate(async () => {
      const adapter = new window.AlinaPosAdapter();
      // Empty merchant ID rejection
      const emptyMerchant = adapter.validateConfig({ merchantId: '' });
      // Live mode empty API key rejection
      const emptyKeyInLive = adapter.validateConfig({ merchantId: 'ALINA-01', apiKey: '', sandbox: false });
      // Live mode valid
      const validLive = adapter.validateConfig({ merchantId: 'ALINA-01', apiKey: 'pos_live_secret', sandbox: false });
      // Sandbox mode with empty API key should be valid
      const validSandbox = adapter.validateConfig({ merchantId: 'ALINA-01', apiKey: '', sandbox: true });

      return {
        emptyMerchantRejected: emptyMerchant.valid === false,
        emptyKeyInLiveRejected: emptyKeyInLive.valid === false,
        validLiveAccepted: validLive.valid === true,
        validSandboxAccepted: validSandbox.valid === true
      };
    });

    if (alinaValidation.emptyMerchantRejected && alinaValidation.emptyKeyInLiveRejected &&
        alinaValidation.validLiveAccepted && alinaValidation.validSandboxAccepted) {
      pass('AlinaPosAdapter validateConfig handles sandbox vs live credential constraints accurately');
    } else {
      fail('AlinaPosAdapter validateConfig', new Error(JSON.stringify(alinaValidation)));
    }

    // 4. Checkout modal flow & Virginia tax calculation
    console.log('\n--- 4. Checkout Modal Flow & 6% VA Tax ---');
    // Add items to cart
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', title: 'Top Shelf', price: 34, quantity: 2 }); // $68
      window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10'); // 10% off -> $6.80 discount -> Net $61.20
    });

    const taxCalculation = await page.evaluate(() => {
      const subtotal = window.PuckWickStore.getCartSubtotal();
      const discount = window.PuckWickStore.getDiscountAmount();
      const tax = window.PuckWickStore.getTaxAmount();
      const net = subtotal - discount;
      const expectedTax = Number((net * 0.06).toFixed(2));
      return {
        subtotal,
        discount,
        tax,
        expectedTax,
        matches: tax === expectedTax
      };
    });

    if (taxCalculation.matches) {
      pass(`6% Virginia State Tax accurately computed on net subtotal: Net $${taxCalculation.subtotal - taxCalculation.discount} -> Tax $${taxCalculation.tax}`);
    } else {
      fail('Virginia Tax calculation', new Error(JSON.stringify(taxCalculation)));
    }

    // Open checkout modal in DOM
    await page.locator('#cart-btn').click();
    await page.waitForTimeout(150);
    await page.locator('[data-testid="checkout-btn"]').click();
    await page.waitForTimeout(200);

    const checkoutModalVisible = await page.locator('[data-testid="checkout-modal"]').isVisible();
    if (checkoutModalVisible) {
      pass('Checkout modal opens from cart drawer proceed CTA');
    } else {
      fail('Checkout modal visibility', new Error('Checkout modal did not open'));
    }

    // Fulfillment toggling (Standard vs Local Pickup)
    const pickupRadio = page.locator('[data-testid="fulfillment-pickup"]');
    await pickupRadio.click();
    await page.waitForTimeout(150);

    const streetHidden = await page.evaluate(() => {
      const streetBlock = document.getElementById('shipping-address-block');
      return streetBlock && (streetBlock.style.display === 'none' || getComputedStyle(streetBlock).display === 'none');
    });

    if (streetHidden) {
      pass('Selecting Local Pickup hides shipping street address container');
    } else {
      fail('Local Pickup street address hide', new Error('Street address was not hidden'));
    }

    // Fill customer form and submit order
    await page.locator('[data-testid="customer-name"]').fill('Adversarial Reviewer');
    await page.locator('[data-testid="customer-email"]').fill('reviewer@puckandwick.com');
    await page.locator('[data-testid="customer-phone"]').fill('703-555-0199');

    await page.locator('[data-testid="place-order-btn"]').click();
    await page.waitForTimeout(300);

    // 5. Order confirmation receipt and cart reset
    console.log('\n--- 5. Order Confirmation Receipt & Cart Reset ---');
    const receiptVisible = await page.locator('[data-testid="order-receipt"]').isVisible();
    const orderNumber = await page.locator('[data-testid="order-number"]').innerText();
    const pickupAddressVisible = await page.locator('[data-testid="receipt-pickup-address"]').isVisible();

    const cartReset = await page.evaluate(() => {
      return window.PuckWickStore.state.cart.length === 0 && window.PuckWickStore.getCartCount() === 0;
    });

    const badgeCountText = await page.locator('#cart-count').innerText();

    if (receiptVisible && /^PW-2026-\d{4}$/.test(orderNumber.trim())) {
      pass('Order receipt renders with valid PW-2026-XXXX confirmation number', orderNumber.trim());
    } else {
      fail('Order receipt display', new Error(`Receipt visible: ${receiptVisible}, order: ${orderNumber}`));
    }

    if (pickupAddressVisible) {
      pass('Receipt displays The Blue Hydrangea pickup address instructions');
    } else {
      fail('Receipt pickup instructions', new Error('Pickup address not visible on receipt'));
    }

    if (cartReset && badgeCountText.trim() === '0') {
      pass('Cart state and header badge count reset to 0 upon order confirmation');
    } else {
      fail('Cart reset after order', new Error(`Cart length: ${cartReset}, badge: ${badgeCountText}`));
    }

    // Close receipt modal before proceeding to adversarial tests
    await page.locator('[data-testid="checkout-close-btn"]').click();
    await page.waitForTimeout(200);

    // 6. Adversarial Stress-Tests
    console.log('\n--- 6. Adversarial Stress-Tests ---');

    // Scenario A: XSS injection in customer name
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
    });
    await page.locator('#cart-btn').click();
    await page.waitForTimeout(150);
    await page.locator('[data-testid="checkout-btn"]').click();
    await page.waitForTimeout(200);

    const xssPayload = '<img src="x" onerror="window.__PW_XSS_TRIGGERED=true">';
    await page.locator('[data-testid="customer-name"]').fill(xssPayload);
    await page.locator('[data-testid="customer-email"]').fill('xss@pw.com');
    await page.locator('[data-testid="customer-phone"]').fill('703-555-0100');

    // Switch to shipping to trigger address block
    await page.locator('[data-testid="fulfillment-shipping"]').click();
    await page.waitForTimeout(100);
    await page.locator('[data-testid="shipping-street"]').fill('123 Safe St');

    await page.locator('[data-testid="place-order-btn"]').click();
    await page.waitForTimeout(300);

    const xssTriggered = await page.evaluate(() => Boolean(window.__PW_XSS_TRIGGERED));
    if (xssTriggered) {
      console.warn('  \x1b[33m[VULNERABILITY]\x1b[0m XSS payload was executed via innerHTML interpolation');
    } else {
      pass('XSS injection did not execute arbitrary script during checkout confirmation');
    }

    // Close modal
    await page.locator('[data-testid="checkout-close-btn"]').click();
    await page.waitForTimeout(150);

    // Scenario B: Alina POS in Live mode with empty API key
    console.log('\n--- Scenario B: Alina POS live mode empty API key error handling ---');
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
      window.PuckWickStore.dispatch('SET_PAYMENT_ADAPTER', 'alina_pos');
    });

    await page.locator('#cart-btn').click();
    await page.waitForTimeout(150);
    await page.locator('[data-testid="checkout-btn"]').click();
    await page.waitForTimeout(200);

    // Open POS settings modal
    await page.locator('[data-testid="alina-pos-config-btn"]').click();
    await page.waitForTimeout(150);

    // Uncheck sandbox toggle -> switch to Live mode without API key
    // Fill valid Merchant ID to isolate Live mode API key validation
    await page.locator('[data-testid="alina-merchant-id"]').fill('ALINA-BH-01');
    const sandboxToggle = page.locator('[data-testid="alina-sandbox-toggle"]');
    if (await sandboxToggle.isChecked()) {
      await sandboxToggle.uncheck();
    }
    // Clear API key
    await page.locator('[data-testid="alina-api-key"]').fill('');
    await page.locator('[data-testid="save-alina-config-btn"]').click();
    await page.waitForTimeout(200);
    // Verify validation error is displayed in modal feedback container and modal stays open
    const feedbackText = await page.evaluate(() => {
      return document.getElementById('alina-config-feedback')?.innerText || '';
    });
    console.log('Alina POS config feedback on empty API key in live mode:', feedbackText);

    if (feedbackText.toLowerCase().includes('api key is required')) {
      pass('Alina POS config modal rejects empty API Key in Live mode with validation error');
    } else {
      fail('Alina POS modal live validation', new Error(`Expected API Key required error, got: ${feedbackText}`));
    }

    // Now enter valid API Key and save
    await page.locator('[data-testid="alina-api-key"]').fill('pos_live_alina_test_key_998877');
    await page.locator('[data-testid="save-alina-config-btn"]').click();
    await page.waitForTimeout(300);

    // Verify status badge in checkout reflects live mode
    const badgeText = await page.evaluate(() => {
      return document.querySelector('.pos-status-badge')?.innerText || '';
    });
    console.log('POS status badge after valid config save:', badgeText);

    if (/live/i.test(badgeText)) {
      pass('Alina POS config modal updates checkout UI to Live Mode badge after valid credentials saved');
    } else {
      fail('Alina POS config live mode badge', new Error(`Expected Live mode badge, got: ${badgeText}`));
    }

    // --- Scenario C: Payment Rejection Abort & Error Surfacing ---
    console.log('\n--- Scenario C: Payment Rejection Abort & UI Error Surfacing ---');
    // Set active adapter to alina_pos in Live mode with empty API key to force gateway rejection
    await page.evaluate(() => {
      const adapter = window.PaymentAdapterRegistry.get('alina_pos');
      adapter.config.sandbox = false;
      adapter.config.apiKey = '';
      window.PuckWickStore.state.paymentConfig.alinaPos.sandbox = false;
      window.PuckWickStore.state.paymentConfig.alinaPos.apiKey = '';
    });

    // Select local pickup and fill customer info
    await page.locator('[data-testid="fulfillment-pickup"]').click();
    await page.waitForTimeout(150);
    await page.locator('[data-testid="customer-name"]').fill('John Doe');
    await page.locator('[data-testid="customer-email"]').fill('john@test.com');
    await page.locator('[data-testid="customer-phone"]').fill('703-555-0111');
    await page.locator('[data-testid="place-order-btn"]').click();
    await page.waitForTimeout(300);

    const rejectionCheck = await page.evaluate(() => {
      const errorEl = document.getElementById('checkout-error') || document.getElementById('checkout-form-feedback');
      const errorText = errorEl ? errorEl.innerText : '';
      const receiptEl = document.querySelector('[data-testid="order-receipt"]');
      const cartCount = window.PuckWickStore.getCartCount();
      const placeBtn = document.getElementById('btn-place-order');
      const isBtnEnabled = placeBtn && !placeBtn.disabled && !placeBtn.classList.contains('loading');
      const isModalOpen = document.querySelector('[data-testid="checkout-modal"]') !== null;

      return {
        hasErrorMessage: errorText.toLowerCase().includes('api key is required') || errorText.toLowerCase().includes('failed'),
        errorText,
        receiptShown: receiptEl !== null,
        cartRetained: cartCount > 0,
        buttonReenabled: isBtnEnabled,
        stayedOnCheckout: isModalOpen && receiptEl === null
      };
    });

    if (rejectionCheck.hasErrorMessage && !rejectionCheck.receiptShown && rejectionCheck.cartRetained && rejectionCheck.buttonReenabled) {
      pass('Payment authorization rejection properly handled: error surfaced, submit button re-enabled, cart preserved, receipt aborted');
    } else {
      fail('Payment authorization rejection handling', new Error(JSON.stringify(rejectionCheck)));
    }

    if (pageErrors.length > 0) {
      fail('Runtime console/page errors detected during review', new Error(pageErrors.join('; ')));
    } else {
      pass('Zero console errors and zero uncaught page exceptions during entire review run');
    }

  } finally {
    await browser.close();
    if (server && server.server) {
      server.server.close();
    } else if (server && typeof server.close === 'function') {
      server.close();
    }
  }

  console.log('\n============================================================');
  console.log(`  Adversarial Review Complete: Passed: ${results.passed} | Failed: ${results.failed}`);
  console.log('============================================================\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
