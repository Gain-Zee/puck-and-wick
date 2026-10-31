/**
 * tests/stress/adversarial-challenger-m3-deep-tint-pricing.js
 * Independent Adversarial Stress Harness for Milestone 3 Iteration 2
 * Focus: Exhaustive Scent Glass Tint Matrix, EVA Foam Shadow Filters,
 * Zero-Raster Enforcement, Complex Cart Math & Order Receipt Integrity.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3599;
const BASE_URL = `http://127.0.0.1:${PORT}`;

// Dynamic vessel tints based on products.js and box-builder.js:
// Note: candle-fresh-cut has '10 oz Amber Apothecary Glass' in products.js,
// which matches the amber vessel branch (#2B1706).
const EXPECTED_TINTS = {
  'candle-balsam-fir': '#0F2417',
  'candle-barnwood-bourbon': '#2B1706',
  'candle-warm-amber-vanilla': '#2B1706',
  'candle-fresh-cut': '#1E2530', // Frosted Ice tumbler
  'candle-top-shelf': '#16181F',
  'candle-rinkside-cedar-smoke': '#16181F',
  'candle-locker-room-mint': '#16181F'
};

const results = {
  tintMatrix: { passed: 0, failed: 0, details: [] },
  foamFilter: { passed: 0, failed: 0, details: [] },
  zeroRaster: { passed: 0, failed: 0, details: [] },
  cartPricingStress: { passed: 0, failed: 0, details: [] },
  receiptIntegrity: { passed: 0, failed: 0, details: [] }
};

function assertTest(category, name, condition, note = '') {
  const pass = Boolean(condition);
  results[category].details.push({ name, pass, note });
  if (pass) {
    results[category].passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${name}`);
  } else {
    results[category].failed++;
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${name} ${note ? `(${note})` : ''}`);
  }
}

async function runAdversarialHarness() {
  console.log('================================================================');
  console.log('  ADVERSARIAL HARNESS: Milestone 3 Deep Tint & Pricing Stress   ');
  console.log('================================================================\n');

  const { server } = await startServer(PORT);
  console.log(`[Server] Live on ${BASE_URL}`);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#box-builder-root');

  // -------------------------------------------------------------------------
  // 1. EXHAUSTIVE DYNAMIC VESSEL TINT MATRIX (14 COMBINATIONS)
  // -------------------------------------------------------------------------
  console.log('\n--- 1. Exhaustive Dynamic Vessel Tint Matrix (14 Scenarios) ---');
  for (const edition of ['men', 'women']) {
    const editionBtn = page.locator(`[data-testid="edition-toggle-${edition}"]`);
    await editionBtn.click({ force: true });

    for (const [scentId, expectedFill] of Object.entries(EXPECTED_TINTS)) {
      const pill = page.locator(`[data-testid="box-scent-option-pill-${scentId}"]`);
      await pill.click({ force: true });

      const actualFill = await page.evaluate(() => {
        const jarRect = document.querySelector('.box-presentation-svg rect[width="80"][height="106"]');
        return jarRect ? jarRect.getAttribute('fill') : null;
      });

      assertTest(
        'tintMatrix',
        `[${edition.toUpperCase()}] Scent ${scentId} sets vessel fill to ${expectedFill}`,
        actualFill?.toUpperCase() === expectedFill.toUpperCase(),
        `Expected ${expectedFill}, got ${actualFill}`
      );
    }
  }

  // -------------------------------------------------------------------------
  // 2. EVA FOAM INSET SHADOW FILTER & CUTOUT DEPTH
  // -------------------------------------------------------------------------
  console.log('\n--- 2. EVA Foam Filter & Cutout Depth Verification ---');
  const filterDetails = await page.evaluate(() => {
    const svg = document.querySelector('.box-presentation-svg');
    const filter = svg?.querySelector('filter#foam-inset-shadow');
    const feDropShadow = filter?.querySelector('feDropShadow');
    const cutouts = Array.from(svg?.querySelectorAll('rect[width="130"][height="205"]') || []);
    const cutoutsFiltered = cutouts.every(r => r.getAttribute('filter') === 'url(#foam-inset-shadow)');

    return {
      filterExists: Boolean(filter),
      hasFeDropShadow: Boolean(feDropShadow),
      dx: feDropShadow?.getAttribute('dx'),
      dy: feDropShadow?.getAttribute('dy'),
      stdDev: feDropShadow?.getAttribute('stdDeviation'),
      floodColor: feDropShadow?.getAttribute('flood-color'),
      floodOpacity: feDropShadow?.getAttribute('flood-opacity'),
      cutoutsCount: cutouts.length,
      cutoutsFiltered
    };
  });

  assertTest('foamFilter', 'Filter #foam-inset-shadow exists in SVG defs', filterDetails.filterExists);
  assertTest('foamFilter', 'Filter contains feDropShadow element', filterDetails.hasFeDropShadow);
  assertTest(
    'foamFilter',
    'feDropShadow attributes match specs (dx=0, dy=2, stdDev=3, opacity=0.75)',
    filterDetails.dx === '0' && filterDetails.dy === '2' && filterDetails.stdDev === '3' && filterDetails.floodOpacity === '0.75',
    `dx=${filterDetails.dx}, dy=${filterDetails.dy}, stdDev=${filterDetails.stdDev}, floodOpacity=${filterDetails.floodOpacity}`
  );
  assertTest('foamFilter', 'Exactly 3 foam cutout slots exist (Candle, Puck, Wash)', filterDetails.cutoutsCount === 3, `Count: ${filterDetails.cutoutsCount}`);
  assertTest('foamFilter', 'All 3 foam cutouts have filter="url(#foam-inset-shadow)"', filterDetails.cutoutsFiltered);

  // -------------------------------------------------------------------------
  // 3. ZERO-RASTER IMAGE SANITIZATION
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Zero-Raster Enforcement in Presentation SVG ---');
  const rasterScan = await page.evaluate(() => {
    const svg = document.querySelector('.box-presentation-svg');
    const imageTags = svg?.querySelectorAll('image') || [];
    const hrefMatches = svg?.innerHTML.match(/\.(jpeg|jpg|png|webp|avif)/i) || [];
    return {
      imageTagsCount: imageTags.length,
      hrefMatchesCount: hrefMatches.length
    };
  });

  assertTest('zeroRaster', 'Zero <image> tags in presentation SVG', rasterScan.imageTagsCount === 0, `Found: ${rasterScan.imageTagsCount}`);
  assertTest('zeroRaster', 'Zero raster file references (.jpg/.png/etc) in presentation SVG', rasterScan.hrefMatchesCount === 0, `Found: ${rasterScan.hrefMatchesCount}`);

  // -------------------------------------------------------------------------
  // 4. COMPLEX CART PRICING & PROMO CODE STRESS
  // -------------------------------------------------------------------------
  console.log('\n--- 4. Complex Cart Pricing & Promo Code Math Stress ---');
  // Clear cart
  await page.evaluate(() => window.PuckWickStore.dispatch('CLEAR_CART'));

  // Add 2x Men's Box (Top Shelf @ $78 = $156)
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'box-men_athlete-candle-top-shelf',
      type: 'exclusive_box',
      title: "Men's / Athlete Exclusive Box (Top Shelf)",
      price: 78.00,
      quantity: 2
    });
    // Add 1x Women's Box (Balsam Fir @ $78)
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'box-women_luxe-candle-balsam-fir',
      type: 'exclusive_box',
      title: "Women's Exclusive Box (Balsam Fir)",
      price: 78.00,
      quantity: 1
    });
    // Add 1x Standalone Top Shelf Candle ($34.00)
    window.PuckWickStore.dispatch('ADD_TO_CART', {
      id: 'candle-top-shelf',
      type: 'candle',
      title: 'Top Shelf Candle',
      price: 34.00,
      quantity: 1
    });
  });

  // Expected: Subtotal = 156 + 78 + 34 = 268.00
  const subtotal1 = await page.evaluate(() => window.PuckWickStore.getCartSubtotal());
  assertTest('cartPricingStress', 'Subtotal for 3 boxes + 1 candle is $268.00', subtotal1 === 268.00, `Got: ${subtotal1}`);

  // Free shipping check ($268.00 >= $75)
  const shipping1 = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
  assertTest('cartPricingStress', 'Free shipping applied ($0.00) for subtotal > $75', shipping1 === 0, `Got: ${shipping1}`);

  // Apply PUCK10 (10% discount on $268.00 = $26.80)
  // Taxable: 268.00 - 26.80 = 241.20
  // Virginia 6% tax on 241.20 = 14.472 -> $14.47
  // Grand total = 241.20 + 0 + 14.47 = 255.67
  await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO_CODE', 'PUCK10'));
  const discount1 = await page.evaluate(() => window.PuckWickStore.getDiscountAmount());
  const tax1 = await page.evaluate(() => window.PuckWickStore.getTaxAmount());
  const grand1 = await page.evaluate(() => {
    const s = window.PuckWickStore.getCartSubtotal();
    const d = window.PuckWickStore.getDiscountAmount();
    const sh = window.PuckWickStore.getShippingTotal();
    const t = window.PuckWickStore.getTaxAmount();
    return Number((s - d + sh + t).toFixed(2));
  });

  assertTest('cartPricingStress', 'PUCK10 discount is exactly $26.80', Math.abs(discount1 - 26.80) < 0.005, `Got: ${discount1}`);
  assertTest('cartPricingStress', 'Virginia 6% tax is exactly $14.47', Math.abs(tax1 - 14.47) < 0.005, `Got: ${tax1}`);
  assertTest('cartPricingStress', 'Grand total is exactly $255.67', Math.abs(grand1 - 255.67) < 0.005, `Got: ${grand1}`);

  // -------------------------------------------------------------------------
  // 5. RECEIPT INTEGRITY & PW-2026-XXXX VALIDATION
  // -------------------------------------------------------------------------
  // Select Women edition and Warm Amber scent via UI
  await page.locator('[data-testid="edition-toggle-women"]').click({ force: true });
  await page.locator('[data-testid="box-scent-option-pill-candle-warm-amber-vanilla"]').click({ force: true });
  await page.locator('[data-testid="add-box-to-cart-btn"]').click({ force: true });
  await page.waitForTimeout(200);

  // Cart drawer opens automatically on add
  await page.locator('[data-testid="checkout-btn"]').click();
  await page.waitForSelector('[data-testid="checkout-modal"]');
  await page.fill('#customer-name', 'Marie-Philip Poulin');
  await page.fill('#customer-email', 'poulin@puckandwick.com');
  await page.fill('#customer-phone', '555-292-2929');
  await page.fill('#shipping-street', '29 Champion Way');
  await page.fill('#shipping-city', 'Purcellville');
  await page.fill('#shipping-zip', '20132');

  await page.locator('#btn-place-order').click();
  await page.waitForSelector('[data-testid="order-receipt"]');

  const receiptNum = await page.locator('[data-testid="order-number"]').textContent();
  const receiptText = await page.locator('.receipt-items-table').textContent();
  const cartCleared = await page.evaluate(() => window.PuckWickStore.state.cart.length === 0);

  assertTest('receiptIntegrity', 'Order number follows PW-2026-XXXX format', /^PW-2026-\d{4}$/.test(receiptNum?.trim() || ''), `Got: ${receiptNum}`);
  assertTest('receiptIntegrity', 'Receipt includes Warm Amber & Vanilla Bean candle', receiptText?.includes('Warm Amber & Vanilla Bean'));
  assertTest('receiptIntegrity', 'Receipt includes Botanical & Charcoal Linen Puck item', receiptText?.includes('Botanical & Charcoal Linen'));
  assertTest('receiptIntegrity', 'Store cart cleared upon reservation submission', cartCleared);

  await browser.close();
  server.close();

  // Summary
  console.log('\n================================================================');
  console.log('  ADVERSARIAL HARNESS SUMMARY');
  console.log('================================================================');
  let totalPass = 0;
  let totalFail = 0;
  for (const [key, data] of Object.entries(results)) {
    totalPass += data.passed;
    totalFail += data.failed;
    console.log(`  ${key}: ${data.passed} passed, ${data.failed} failed`);
  }
  console.log(`\n  Total Assertions: ${totalPass + totalFail}`);
  console.log(`  Passed: ${totalPass}`);
  console.log(`  Failed: ${totalFail}`);
  console.log(`  Verdict: ${totalFail === 0 ? 'APPROVE' : 'REJECT'}`);

  return { totalPass, totalFail, verdict: totalFail === 0 ? 'APPROVE' : 'REJECT' };
}

runAdversarialHarness().then(({ verdict }) => {
  process.exit(verdict === 'APPROVE' ? 0 : 1);
}).catch(err => {
  console.error('Adversarial Harness Fatal Error:', err);
  process.exit(1);
});
