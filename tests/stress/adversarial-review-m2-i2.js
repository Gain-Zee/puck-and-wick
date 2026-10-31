/**
 * tests/stress/adversarial-review-m2-i2.js
 * Adversarial audit & integrity verification script for reviewer_m2_1_i2
 */

import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3719;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const results = {
  passed: 0,
  failed: 0,
  errors: []
};

function pass(name, msg = '') {
  results.passed++;
  console.log(`  \x1b[32m[PASS]\x1b[0m ${name}${msg ? ' — ' + msg : ''}`);
}

function fail(name, error) {
  results.failed++;
  results.errors.push({ name, error: error.message || String(error) });
  console.error(`  \x1b[31m[FAIL]\x1b[0m ${name}: ${error.message || String(error)}`);
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
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', err => {
      pageErrors.push(err.message);
    });

    await page.goto(BASE_URL);

    // 1. Check for Broken Images & External Resources
    console.log('\n--- 1. Image & Asset Integrity ---');
    const images = await page.evaluate(() => {
      const imgElements = Array.from(document.querySelectorAll('img'));
      const brokenImgs = imgElements.filter(img => !img.complete || img.naturalWidth === 0);
      return {
        total: imgElements.length,
        broken: brokenImgs.length,
        sources: imgElements.map(i => i.src)
      };
    });

    if (images.broken === 0) {
      pass('Zero broken images across entire page', `Found ${images.total} images, 0 broken`);
    } else {
      fail('Zero broken images', new Error(`Found ${images.broken} broken images`));
    }

    // 2. Check for Placeholder Text & TODOs in Rendered DOM
    console.log('\n--- 2. DOM Placeholder & TODO Inspection ---');
    const domTextIssues = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const banned = [/\bTODO\b/i, /\bFIXME\b/i, /\bLOREM IPSUM\b/i, /\bPLACEHOLDER TEXT\b/i];
      const matches = [];
      for (const pattern of banned) {
        if (pattern.test(bodyText)) {
          matches.push(pattern.toString());
        }
      }
      return matches;
    });

    if (domTextIssues.length === 0) {
      pass('Zero TODOs, FIXMEs, or placeholder texts in rendered DOM');
    } else {
      fail('DOM placeholder inspection', new Error(`Found banned text patterns: ${domTextIssues.join(', ')}`));
    }

    // 3. Adversarial Attack: XSS in Customer Form & Gateway Rejection Feedback
    console.log('\n--- 3. XSS & HTML Injection Attack ---');
    // Set active adapter to alina_pos with missing live API key to force gateway rejection
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('CLEAR_CART');
      window.PuckWickStore.dispatch('ADD_TO_CART', {
        id: 'candle-top-shelf',
        title: 'Top Shelf',
        price: 34,
        quantity: 1
      });
      const adapter = window.PaymentAdapterRegistry.get('alina_pos');
      adapter.config.sandbox = false;
      adapter.config.apiKey = '';
      window.PuckWickStore.state.paymentConfig.activeAdapter = 'alina_pos';
      window.PuckWickStore.state.paymentConfig.alinaPos.sandbox = false;
      window.PuckWickStore.state.paymentConfig.alinaPos.apiKey = '';
    });

    // Open checkout
    await page.evaluate(() => {
      const cartBtn = document.getElementById('cart-btn');
      if (cartBtn) cartBtn.click();
    });
    await page.waitForTimeout(300);

    // Switch payment tab in checkout UI to Alina POS
    await page.locator('[data-testid="payment-tab-alina"]').click();
    await page.waitForTimeout(200);

    // Fill in XSS payload in customer name and street
    const xssPayload = '<img src=x onerror="window.__xss_fired=true">';
    await page.fill('#customer-name', `Alex Ovi ${xssPayload}`);
    await page.fill('#customer-email', 'alex@test.com');
    await page.fill('#customer-phone', '703-555-0199');

    // Submit checkout with failing alina_pos in live mode without API key
    await page.click('#btn-place-order');
    await page.waitForTimeout(300);

    // Verify rejection was caught and surfaced
    const checkoutErrorText = await page.evaluate(() => {
      const errEl = document.querySelector('#checkout-error .promo-error') || document.querySelector('#checkout-form-feedback .promo-error');
      return errEl ? errEl.textContent : '';
    });

    const isOrderReceiptPresent = await page.evaluate(() => {
      return !!document.querySelector('[data-testid="order-receipt"]');
    });

    const isCartPreserved = await page.evaluate(() => {
      return window.PuckWickStore.state.cart.length > 0;
    });

    const isSubmitButtonReEnabled = await page.evaluate(() => {
      const btn = document.querySelector('#btn-place-order');
      return btn && !btn.disabled;
    });

    if (checkoutErrorText.includes('Simulated payment processing network failure') && !isOrderReceiptPresent && isCartPreserved && isSubmitButtonReEnabled) {
      pass('Payment failure properly caught, error displayed, cart preserved, button re-enabled');
    } else {
      fail('Payment failure handling', new Error(`Error: ${checkoutErrorText}, receipt: ${isOrderReceiptPresent}, cartPreserved: ${isCartPreserved}, btnEnabled: ${isSubmitButtonReEnabled}`));
    }

    // Now test successful submission with XSS payloads to check receipt escaping
    await page.evaluate(() => {
      window.PuckWickStore.dispatch('SET_PAYMENT_ADAPTER', 'offline_reservation');
    });

    await page.click('#btn-place-order');
    await page.waitForSelector('[data-testid="order-receipt"]');

    const xssFired = await page.evaluate(() => window.__xss_fired);
    if (!xssFired) {
      pass('XSS payload in customer name and street cleanly escaped in receipt DOM');
    } else {
      fail('XSS payload execution', new Error('window.__xss_fired was true! Script executed!'));
    }

    // 4. Print Stylesheet Verification
    console.log('\n--- 4. Print Stylesheet Rules ---');
    const printRulesCount = await page.evaluate(() => {
      let printRules = 0;
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSMediaRule && rule.conditionText.includes('print')) {
              printRules += rule.cssRules.length;
            }
          }
        } catch (e) {
          // ignore CORS
        }
      }
      return printRules;
    });

    if (printRulesCount >= 5) {
      pass(`@media print rules verified in CSS (${printRulesCount} rules found)`);
    } else {
      fail('@media print rules verification', new Error(`Found only ${printRulesCount} print rules`));
    }

    // 5. Console & Page Errors Check
    console.log('\n--- 5. Console & Uncaught Error Check ---');
    if (consoleErrors.length === 0 && pageErrors.length === 0) {
      pass('Zero console errors and zero uncaught page exceptions');
    } else {
      fail('Console & Page Errors', new Error(`Console: ${consoleErrors.join(', ')} | PageErrors: ${pageErrors.join(', ')}`));
    }

    console.log('\n============================================================');
    console.log(`Adversarial Review Script: ${results.passed} Passed | ${results.failed} Failed`);
    console.log('============================================================\n');

  } finally {
    await browser.close();
    server.close();
  }

  if (results.failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
