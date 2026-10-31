/**
 * tests/stress/adversarial-deep-probe-m2.js
 * Deep Empirical Adversarial Probe for Milestone 2:
 * Catalog, Cart, Quantity Steppers, Promo Engine, and Free Shipping Meter.
 */

import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3895;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

let passed = 0;
let failed = 0;
const failures = [];

function assert(desc, condition, details = '') {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${desc}`);
  } else {
    failed++;
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${desc} ${details ? `(${details})` : ''}`);
    failures.push({ desc, details });
  }
}

async function runAdversarialProbes() {
  console.log('============================================================');
  console.log('  DEEP EMPIRICAL ADVERSARIAL PROBE: MILESTONE 2');
  console.log('============================================================');

  const { server } = await startServer(PORT);
  console.log(`[Probe Server] Started on port ${PORT}`);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.message || String(err));
  });

  try {
    await page.goto(BASE_URL);
    await page.waitForSelector('[data-testid="catalog-section"]');

    // --- PROBE 1: Catalog Filtering Robustness ---
    console.log('\n--- Probe 1: Catalog Filtering Edge Cases ---');
    
    // Switch rapidly across all filters in random order 40 times
    const categories = ['all', 'signature', 'fresh_clean', 'woods_rustic', 'seasonal', 'all'];
    for (let i = 0; i < 40; i++) {
      const cat = categories[i % categories.length];
      await page.click(`[data-filter="${cat}"]`);
    }
    // Explicitly click 'all' at the end of the rapid switching
    await page.click('[data-filter="all"]');
    await page.waitForTimeout(100);

    // Verify DOM consistency after rapid firing
    const finalCards = await page.$$('[data-testid="product-card"]');
    assert('Catalog displays exactly 7 cards when settled on "all"', finalCards.length === 7, `Got ${finalCards.length}`);

    // Verify non-existent category fallback
    const emptyFallbackHandled = await page.evaluate(() => {
      window.PuckWickStore.dispatch('SET_CATEGORY', 'non_existent_category');
      const cards = document.querySelectorAll('[data-testid="product-card"]');
      const emptyView = document.querySelector('[data-testid="catalog-empty"]');
      return cards.length === 0 && emptyView !== null;
    });
    assert('Unknown category gracefully displays empty catalog fallback state', emptyFallbackHandled);

    // Click reset filter button from empty state
    await page.click('#btn-reset-catalog-filter');
    await page.waitForTimeout(50);
    const restoredCards = await page.$$('[data-testid="product-card"]');
    assert('Reset button restores 7 product cards', restoredCards.length === 7, `Got ${restoredCards.length}`);

    // --- PROBE 2: Quantity Steppers & Boundary Clamping ---
    console.log('\n--- Probe 2: Quantity Steppers & Boundary Clamping ---');

    await page.evaluate(() => window.PuckWickStore.dispatch('CLEAR_CART'));
    await page.waitForTimeout(50);

    // Add item with fractional quantity string e.g. "2.5" -> should parse integer
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: '2.5' });
    });
    let qty = await page.evaluate(() => window.PuckWickStore.state.cart[0]?.quantity);
    assert('Fractional string quantity "2.5" safely parses to integer 2', qty === 2, `Got ${qty}`);

    // Add item with non-numeric quantity "abc" -> should fallback to 1
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 'abc' });
    });
    qty = await page.evaluate(() => window.PuckWickStore.state.cart[0]?.quantity);
    assert('Non-numeric quantity "abc" safely falls back to 1', qty === 1, `Got ${qty}`);

    // Add item with negative quantity "-5" -> should clamp to minimum 1
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: -5 });
    });
    qty = await page.evaluate(() => window.PuckWickStore.state.cart[0]?.quantity);
    assert('Negative quantity in ADD_TO_CART safely defaults to minimum 1', qty === 1, `Got ${qty}`);

    // Update quantity with 0 -> cleanly removes
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 0 });
    });
    let cartLen = await page.evaluate(() => window.PuckWickStore.state.cart.length);
    assert('UPDATE_QUANTITY to 0 cleanly removes item from cart array', cartLen === 0, `Cart length: ${cartLen}`);

    // Update quantity with negative number -> cleanly removes
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 2 });
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: -3 });
    });
    cartLen = await page.evaluate(() => window.PuckWickStore.state.cart.length);
    assert('UPDATE_QUANTITY with negative number cleanly removes item from cart array', cartLen === 0, `Cart length: ${cartLen}`);

    // Boundary at 99 -> clamp test
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 99 });
      window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'candle-top-shelf', quantity: 100 });
    });
    qty = await page.evaluate(() => window.PuckWickStore.state.cart[0]?.quantity);
    assert('UPDATE_QUANTITY with 100 clamps to 99', qty === 99, `Got ${qty}`);

    // --- PROBE 3: Distinct Scent Customizations in Cart ---
    console.log('\n--- Probe 3: Cart Line Items with Distinct Scents ---');

    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      // Add same base id with different scents
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'exclusive-box', price: 78, quantity: 1, scent: 'Top Shelf' });
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'exclusive-box', price: 78, quantity: 1, scent: 'Fresh Cut' });
    });
    cartLen = await page.evaluate(() => window.PuckWickStore.state.cart.length);
    assert('Items with same ID but different scents are maintained as distinct line items', cartLen === 2, `Got ${cartLen}`);

    // Incrementing specific scent only increments that line
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'exclusive-box', price: 78, quantity: 1, scent: 'Fresh Cut' });
    });
    const item1Qty = await page.evaluate(() => window.PuckWickStore.state.cart.find(i => i.scent === 'Top Shelf')?.quantity);
    const item2Qty = await page.evaluate(() => window.PuckWickStore.state.cart.find(i => i.scent === 'Fresh Cut')?.quantity);
    assert('Targeted scent line item quantity incremented correctly', item1Qty === 1 && item2Qty === 2, `Top Shelf: ${item1Qty}, Fresh Cut: ${item2Qty}`);

    // Removing one scent keeps the other intact
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('REMOVE_ITEM', { id: 'exclusive-box', scent: 'Top Shelf' });
    });
    cartLen = await page.evaluate(() => window.PuckWickStore.state.cart.length);
    const remainingScent = await page.evaluate(() => window.PuckWickStore.state.cart[0]?.scent);
    assert('Removing specific scent leaves other scent line item intact', cartLen === 1 && remainingScent === 'Fresh Cut', `Length: ${cartLen}, remaining: ${remainingScent}`);

    // --- PROBE 4: Promo Code Engine Adversarial Cases ---
    console.log('\n--- Probe 4: Promo Code Engine Adversarial Cases ---');

    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 2 }); // $68.00
    });

    // Submitting code with punctuation e.g. "PUCK10!" -> invalid
    let res = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10!'));
    assert('Promo code with punctuation "PUCK10!" is rejected', res.success === false);

    // Submitting code with lowercase and whitespace e.g. "  founder20  " -> valid 20%
    res = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO', '  founder20  '));
    let discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
    assert('Promo code "  founder20  " with whitespace and lowercase applies 20% ($13.60 on $68.00)', res.success === true && Math.abs(discount - 13.60) < 0.01, `Discount: ${discount}`);

    // Overwriting active promo with another valid promo e.g. "puck10" replaces "founder20"
    res = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO', 'puck10'));
    discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
    const activeCode = await page.evaluate(() => window.PuckWickStore.state.promoCode?.code);
    assert('Applying new promo replaces previous promo cleanly without stacking', activeCode === 'PUCK10' && Math.abs(discount - 6.80) < 0.01, `Active: ${activeCode}, Discount: ${discount}`);

    // Removing promo resets discount to 0
    await page.evaluate(() => window.PuckWickStore.dispatch('REMOVE_PROMO_CODE'));
    discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
    const promoState = await page.evaluate(() => window.PuckWickStore.state.promoCode);
    assert('REMOVE_PROMO_CODE sets discount to 0 and clears promo state', discount === 0 && promoState === null);

    // Empty cart discount should be 0 even if promo applied
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10');
    });
    discount = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
    assert('Empty cart discount is $0.00 even with promo active', discount === 0, `Got ${discount}`);

    // --- PROBE 5: Free Shipping Meter Exact Thresholds & Reversals ---
    console.log('\n--- Probe 5: Free Shipping Meter Exact Thresholds & Reversals ---');

    // Test $74.99 -> Standard shipping ($6.95), not free
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'custom-pour', price: 74.99, quantity: 1 });
    });
    let shipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
    let method = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
    assert('Subtotal of $74.99 charges $6.95 standard shipping', shipping === 6.95 && method === 'standard', `Shipping: ${shipping}, Method: ${method}`);

    // Test $75.00 -> Free shipping ($0.00)
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'custom-pour', price: 75.00, quantity: 1 });
    });
    shipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
    method = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
    assert('Subtotal of $75.00 unlocks $0.00 free shipping', shipping === 0 && method === 'free', `Shipping: ${shipping}, Method: ${method}`);

    // Test dropping from $75.00 down to $34.00 -> method reverts to standard ($6.95)
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
    });
    shipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
    method = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
    assert('Dropping subtotal below $75 resets shipping method to standard ($6.95)', shipping === 6.95 && method === 'standard', `Shipping: ${shipping}, Method: ${method}`);

    // Test local pickup override at $10.00 order
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'pickup');
    });
    shipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
    assert('Local pickup sets shipping total to $0.00 regardless of subtotal', shipping === 0, `Shipping: ${shipping}`);

    // --- PROBE 6: Error Trapping ---
    console.log('\n--- Probe 6: Console Error Trapping ---');
    assert('Zero console errors logged during all adversarial probes', consoleErrors.length === 0, `Errors: ${JSON.stringify(consoleErrors)}`);

  } finally {
    await context.close();
    await browser.close();
    if (server) server.close();
  }

  console.log('\n============================================================');
  console.log(`  ADVERSARIAL PROBES SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================================\n');

  if (failed > 0) process.exit(1);
  else process.exit(0);
}

runAdversarialProbes().catch(err => {
  console.error('Fatal probe runner error:', err);
  process.exit(1);
});
