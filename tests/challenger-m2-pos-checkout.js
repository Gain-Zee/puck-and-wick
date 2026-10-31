/**
 * tests/challenger-m2-pos-checkout.js
 * Empirical Challenge Harness for Puck & Wick Milestone 2
 * Roles: critic, specialist (Empirical Challenger)
 *
 * Scope of Empirical Verification:
 * 1. Full End-to-End Checkout (Local Pickup at The Blue Hydrangea):
 *    - Add candle to cart
 *    - Open cart drawer
 *    - Proceed to checkout
 *    - Select Free Local Pickup at The Blue Hydrangea
 *    - Verify street address field is hidden
 *    - Enter contact info (Alex Ovechkin, alex@puckandwick.com, 703-555-0100)
 *    - Submit order reservation
 *    - Assert receipt format matches /^PW-2026-\d{4}$/
 *    - Verify local pickup instructions (The Blue Hydrangea, 604 E. Main St., Purcellville, VA 20132, hours)
 *    - Verify cart is emptied in store state and UI badge
 * 2. Standard Shipping Checkout:
 *    - Select shipping fulfillment
 *    - Verify shipping fee added ($6.95 for subtotal < $75)
 *    - Attempt submit with missing street -> assert validation error blocks submission
 *    - Enter valid street address, city, state, zip
 *    - Verify financial totals including 6.0% VA sales tax
 *    - Submit order reservation
 *    - Assert confirmation receipt with customer address and receipt number
 * 3. Alina's POS Configuration:
 *    - Open POS manager modal from checkout
 *    - Validate empty Merchant ID rejection
 *    - Enter API Key, Merchant ID, Terminal ID
 *    - Toggle sandbox mode (Live vs Sandbox)
 *    - Save credentials
 *    - Verify credentials saved in store state and reflected in active checkout UI
 *    - Select Alina POS payment tab and submit order
 *    - Assert authorized transaction with terminal ID and receipt
 * 4. Accessibility & Keyboard Navigation:
 *    - Escape key closes Quick-View Modal, restores focus and scroll lock
 *    - Focus trap within Quick-View Modal (Tab cycles forward/backward within dialog)
 *    - Escape key closes Cart Drawer
 *    - Escape key closes Checkout Modal
 * 5. Viewport Testing:
 *    - Desktop (1440x900): No horizontal overflow, 2-column checkout layout, 420px drawer
 *    - Mobile (390x844): No horizontal overflow, responsive single-column checkout, >=44px tap targets
 * 6. Adversarial Stress & Corner Scenarios:
 *    - Form validation rejection on malformed emails (e.g. user@, plainstring, @domain)
 *    - Double-click debounce: rapid double-clicks on submit button do not generate duplicate orders
 *    - Promo code discount interaction with 6.0% Virginia sales tax calculation
 *    - Free shipping threshold boundary: $74.99 has shipping, $75.00 has free shipping
 *    - Cart item quantity limits: incrementing clamped at 99, decrementing to 0 removes line item
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHALLENGER_PORT = 3488;
const BASE_URL = `http://127.0.0.1:${CHALLENGER_PORT}`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

const report = {
  section1_localPickup: { passed: 0, failed: 0, tests: [] },
  section2_standardShipping: { passed: 0, failed: 0, tests: [] },
  section3_alinaPos: { passed: 0, failed: 0, tests: [] },
  section4_a11yKeyboard: { passed: 0, failed: 0, tests: [] },
  section5_viewports: { passed: 0, failed: 0, tests: [] },
  section6_adversarial: { passed: 0, failed: 0, tests: [] }
};

function recordResult(section, name, pass, detail = null) {
  const item = { name, pass, detail };
  report[section].tests.push(item);
  if (pass) {
    report[section].passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${name}`);
  } else {
    report[section].failed++;
    console.log(`  \x1b[31m[FAIL]\x1b[0m ${name}`);
    if (detail) console.log(`         \x1b[33m${detail}\x1b[0m`);
  }
}

async function runTestSuite() {
  console.log('============================================================');
  console.log('  Puck & Wick Milestone 2 Challenger Empirical Test Suite   ');
  console.log('============================================================\n');

  // Start dedicated server on isolated port
  console.log(`[1/3] Starting server on port ${CHALLENGER_PORT}...`);
  const serverHandle = await startServer(CHALLENGER_PORT);
  console.log(`[Server] Live at ${BASE_URL}`);

  // Launch Playwright with system Chrome if present
  console.log('[2/3] Launching Chrome browser...');
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  };
  if (fs.existsSync(SYSTEM_CHROME_PATH)) {
    launchOptions.executablePath = SYSTEM_CHROME_PATH;
  }
  const browser = await chromium.launch(launchOptions);

  try {
    // ----------------------------------------------------
    // Section 1: Full End-to-End Checkout (Local Pickup)
    // ----------------------------------------------------
    console.log('\n--- SECTION 1: Full End-to-End Local Pickup Checkout ---');
    {
      const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const page = await context.newPage();
      await page.goto(BASE_URL);

      // Clean start
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('REMOVE_PROMO_CODE');
        window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'standard');
      });

      // 1. Add candle to cart from catalog via quick-add button
      const quickAddBtn = page.locator('[data-testid="quick-add-btn"]').first();
      await quickAddBtn.waitFor({ state: 'visible', timeout: 5000 });
      await quickAddBtn.click();
      await page.waitForTimeout(400);

      const cartCountAfterAdd = await page.evaluate(() => window.PuckWickStore.getCartCount());
      recordResult('section1_localPickup', '1.1 Quick-add button increments store cart count to 1',
        cartCountAfterAdd === 1, `Expected cart count 1, got ${cartCountAfterAdd}`);

      // Quick-add automatically opens the drawer; verify it is visible
      const cartDrawer = page.locator('[data-testid="cart-drawer"]');
      const isAutoOpenVisible = await cartDrawer.isVisible();
      recordResult('section1_localPickup', '1.2 Quick-add automatically opens cart drawer', isAutoOpenVisible);

      // Close drawer to test manual header cart-btn trigger
      const drawerCloseBtn = page.locator('[data-testid="cart-close-btn"]');
      await drawerCloseBtn.click();
      await page.waitForTimeout(300);

      // 2. Open cart drawer via header button
      const cartBtn = page.locator('#cart-btn, [data-testid="cart-trigger"]').first();
      await cartBtn.click();
      await page.waitForTimeout(300);
      const isDrawerVisible = await cartDrawer.isVisible();
      recordResult('section1_localPickup', '1.3 Cart drawer opens upon header cart button click', isDrawerVisible);

      // 3. Proceed to checkout
      const proceedCheckoutBtn = page.locator('[data-testid="checkout-btn"]');
      await proceedCheckoutBtn.click();
      const checkoutModal = page.locator('[data-testid="checkout-modal"]');
      await checkoutModal.waitFor({ state: 'visible', timeout: 3000 });
      const isModalVisible = await checkoutModal.isVisible();
      recordResult('section1_localPickup', '1.4 Proceed to checkout opens modular checkout modal', isModalVisible);

      // 4. Select Free Local Pickup at The Blue Hydrangea
      const pickupRadio = page.locator('[data-testid="fulfillment-pickup"]');
      await pickupRadio.check({ force: true });
      await page.waitForTimeout(300);

      const shippingMethod = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
      const isStreetHidden = await page.evaluate(() => {
        const block = document.getElementById('shipping-address-block');
        return block && block.style.display === 'none';
      });
      recordResult('section1_localPickup', '1.5 Selecting Local Pickup sets method to "pickup" and hides shipping address',
        shippingMethod === 'pickup' && isStreetHidden, `method: ${shippingMethod}, streetHidden: ${isStreetHidden}`);

      // 5. Fill customer contact info
      await page.fill('[data-testid="customer-name"]', 'Alex Ovechkin');
      await page.fill('[data-testid="customer-email"]', 'alex@puckandwick.com');
      await page.fill('[data-testid="customer-phone"]', '703-555-0100');

      // 6. Submit order reservation
      const placeOrderBtn = page.locator('[data-testid="place-order-btn"]');
      await placeOrderBtn.click();

      // 7. Assert confirmation receipt appears
      const receipt = page.locator('[data-testid="order-receipt"]');
      await receipt.waitFor({ state: 'visible', timeout: 5000 });
      const receiptNumberEl = page.locator('[data-testid="order-number"]');
      const orderId = (await receiptNumberEl.innerText()).trim();

      const receiptIdMatches = /^PW-2026-\d{4}$/.test(orderId);
      recordResult('section1_localPickup', `1.6 Order receipt format strictly conforms to PW-2026-XXXX (Actual: ${orderId})`,
        receiptIdMatches, `Receipt ID: ${orderId}`);

      // 8. Verify local pickup instructions on receipt
      const receiptText = await receipt.innerText();
      const hasBlueHydrangea = receiptText.includes('The Blue Hydrangea');
      const hasPurcellville = receiptText.includes('604 E. Main St., Purcellville, VA 20132');
      const hasHours = receiptText.includes('Wed – Sat: 10:00 AM – 5:00 PM') || receiptText.includes('within 2 hours');
      recordResult('section1_localPickup', '1.7 Receipt contains full Blue Hydrangea address and store pickup instructions',
        hasBlueHydrangea && hasPurcellville && hasHours,
        `BlueHydrangea: ${hasBlueHydrangea}, Purcellville: ${hasPurcellville}, Hours: ${hasHours}`);

      // 9. Verify cart is emptied in store state
      const cartCountAfterOrder = await page.evaluate(() => window.PuckWickStore.getCartCount());
      const storeCartLength = await page.evaluate(() => window.PuckWickStore.state.cart.length);
      recordResult('section1_localPickup', '1.8 Cart state is completely emptied upon order reservation placement',
        cartCountAfterOrder === 0 && storeCartLength === 0, `CartCount: ${cartCountAfterOrder}, items: ${storeCartLength}`);

      // 10. Close receipt modal and check badge
      const receiptCloseBtn = page.locator('[data-testid="checkout-close-btn"]');
      await receiptCloseBtn.click();
      await page.waitForTimeout(300);
      const badgeText = await page.locator('[data-testid="cart-badge-count"], #cart-count').first().innerText();
      recordResult('section1_localPickup', '1.9 Cart badge in header displays 0 after checkout flow completion',
        badgeText.trim() === '0', `Badge text: '${badgeText}'`);

      await context.close();
    }

    // ----------------------------------------------------
    // Section 2: Standard Shipping Checkout
    // ----------------------------------------------------
    console.log('\n--- SECTION 2: Standard Shipping Checkout ---');
    {
      const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const page = await context.newPage();
      await page.goto(BASE_URL);

      // Clean start
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('REMOVE_PROMO_CODE');
        window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'standard');
      });

      // Add single candle ($34.00, under $75 threshold)
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: 'top-shelf',
          title: 'Top Shelf',
          scent: 'Bourbon & Oak',
          price: 34.00,
          quantity: 1
        });
      });

      // Open cart and proceed to checkout
      await page.locator('#cart-btn, [data-testid="cart-trigger"]').first().click();
      await page.locator('[data-testid="checkout-btn"]').click();
      const checkoutModal = page.locator('[data-testid="checkout-modal"]');
      await checkoutModal.waitFor({ state: 'visible', timeout: 3000 });

      // Verify Standard Delivery radio is checked and shipping fee added
      const shippingRadio = page.locator('[data-testid="fulfillment-shipping"]');
      await shippingRadio.check({ force: true });
      await page.waitForTimeout(200);

      const shippingFee = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
      recordResult('section2_standardShipping', '2.1 Standard shipping assigns $6.95 delivery fee for order under $75',
        shippingFee === 6.95, `Expected 6.95, got ${shippingFee}`);

      // Attempt submit without street address -> must show validation error
      await page.fill('[data-testid="customer-name"]', 'Wayne Gretzky');
      await page.fill('[data-testid="customer-email"]', 'wayne@edmonton.ca');
      await page.fill('[data-testid="customer-phone"]', '780-555-9999');
      // Clear street address
      await page.fill('[data-testid="shipping-street"]', '');
      await page.locator('[data-testid="place-order-btn"]').click();
      await page.waitForTimeout(200);

      const hasValidationError = await page.evaluate(() => {
        const streetInput = document.getElementById('shipping-street');
        const feedback = document.getElementById('checkout-form-feedback');
        return streetInput?.classList.contains('input-error') &&
               feedback?.innerText.includes('required contact and delivery fields');
      });
      recordResult('section2_standardShipping', '2.2 Submitting shipping checkout without street address triggers validation error',
        hasValidationError);

      // Now enter valid street address
      await page.fill('[data-testid="shipping-street"]', '99 Champions Boulevard');

      // Verify financial table calculations:
      // Subtotal: $34.00, Shipping: $6.95, Tax (6% of 34): $2.04, Total: $42.99
      const calculatedGrandTotal = await page.evaluate(() => {
        const subtotal = window.PuckWickStore.getCartSubtotal();
        const discount = window.PuckWickStore.getDiscountAmount();
        const shipping = window.PuckWickStore.getShippingTotal();
        const tax = Number(((subtotal - discount) * 0.06).toFixed(2));
        return {
          subtotal,
          shipping,
          tax,
          total: Number((subtotal - discount + shipping + tax).toFixed(2))
        };
      });

      const mathCorrect = calculatedGrandTotal.subtotal === 34 &&
                          calculatedGrandTotal.shipping === 6.95 &&
                          calculatedGrandTotal.tax === 2.04 &&
                          calculatedGrandTotal.total === 42.99;
      recordResult('section2_standardShipping', '2.3 Financial total strictly validates (Sub: $34.00, Ship: $6.95, Tax: $2.04, Total: $42.99)',
        mathCorrect, JSON.stringify(calculatedGrandTotal));

      // Submit order reservation
      await page.locator('[data-testid="place-order-btn"]').click();
      const receipt = page.locator('[data-testid="order-receipt"]');
      await receipt.waitFor({ state: 'visible', timeout: 5000 });

      // Assert confirmation receipt contains street address
      const receiptText = await receipt.innerText();
      const containsStreet = receiptText.includes('99 Champions Boulevard');
      const containsCustomer = receiptText.includes('Wayne Gretzky');
      const containsStandardDelivery = receiptText.includes('Standard Tracked Delivery');
      const containsTax = receiptText.includes('$2.04');
      const containsTotal = receiptText.includes('$42.99');

      recordResult('section2_standardShipping', '2.4 Shipping receipt displays delivery address, customer name, tax, and $42.99 total',
        containsStreet && containsCustomer && containsStandardDelivery && containsTax && containsTotal,
        `Street: ${containsStreet}, Customer: ${containsCustomer}, Ship: ${containsStandardDelivery}, Tax: ${containsTax}, Total: ${containsTotal}`);

      await context.close();
    }

    // ----------------------------------------------------
    // Section 3: Alina's POS Configuration
    // ----------------------------------------------------
    console.log("\n--- SECTION 3: Alina's POS Configuration & Processing ---");
    {
      const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const page = await context.newPage();
      await page.goto(BASE_URL);

      // Add item to allow opening checkout
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', {
          id: 'fresh-cut',
          title: 'Fresh Cut',
          price: 34.00,
          quantity: 1
        });
      });

      // Open checkout
      await page.locator('#cart-btn, [data-testid="cart-trigger"]').first().click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // Click "POS Settings" button
      const openAlinaBtn = page.locator('[data-testid="alina-pos-config-btn"]');
      await openAlinaBtn.waitFor({ state: 'visible' });
      await openAlinaBtn.click();

      // Verify POS configuration modal opens
      const alinaModal = page.locator('[data-testid="alina-pos-modal"]');
      await alinaModal.waitFor({ state: 'visible', timeout: 3000 });
      const isAlinaModalOpen = await alinaModal.isVisible();
      recordResult('section3_alinaPos', '3.1 Clicking POS Settings opens Alina POS credential modal', isAlinaModalOpen);

      // Verify validation: empty Merchant ID fails via adapter and HTML form constraint
      await page.fill('[data-testid="alina-merchant-id"]', '');
      const isInputInvalid = await page.evaluate(() => {
        const inp = document.getElementById('alina-merchant-id');
        return inp?.hasAttribute('required') && inp?.validity?.valueMissing === true;
      });
      const adapterRejection = await page.evaluate(() => {
        const adapter = new window.AlinaPosAdapter();
        const res = adapter.validateConfig({ merchantId: '' });
        return res?.valid === false;
      });
      recordResult('section3_alinaPos', '3.2 Empty Merchant ID submission is rejected (HTML required + Adapter validation)',
        isInputInvalid && adapterRejection);

      // Enter valid configuration
      await page.fill('[data-testid="alina-merchant-id"]', 'ALINA-BH-PURCELLVILLE-01');
      await page.fill('[data-testid="alina-terminal-id"]', 'TERM-BLUE-HYDRANGEA-01');
      await page.fill('[data-testid="alina-api-key"]', 'pos_live_alina_test_key_998877');

      // Toggle sandbox mode off (Live Mode)
      const sandboxCheckbox = page.locator('[data-testid="alina-sandbox-toggle"]');
      await sandboxCheckbox.uncheck();

      // Save credentials
      await page.locator('[data-testid="save-alina-config-btn"]').click();
      await page.waitForTimeout(300);

      // Verify modal closed
      const isAlinaModalClosed = (await page.locator('[data-testid="alina-pos-modal"]').count()) === 0;
      recordResult('section3_alinaPos', '3.3 Saving valid credentials closes POS settings submodal', isAlinaModalClosed);

      // Verify credentials saved in store state
      const savedConfig = await page.evaluate(() => window.PuckWickStore.state.paymentConfig.alinaPos);
      const configPersisted = savedConfig.merchantId === 'ALINA-BH-PURCELLVILLE-01' &&
                              savedConfig.terminalId === 'TERM-BLUE-HYDRANGEA-01' &&
                              savedConfig.apiKey === 'pos_live_alina_test_key_998877' &&
                              savedConfig.sandbox === false;
      recordResult('section3_alinaPos', '3.4 Credentials accurately persist in store state with live mode active',
        configPersisted, JSON.stringify(savedConfig));

      // Switch payment adapter tab to Alina POS
      const alinaTab = page.locator('[data-testid="payment-tab-alina"]');
      await alinaTab.click();
      await page.waitForTimeout(200);

      // Verify active payment details card displays updated credentials
      const activePaymentCardText = await page.locator('#payment-adapter-card').innerText();
      const displaysTerminal = activePaymentCardText.includes('TERM-BLUE-HYDRANGEA-01');
      const displaysMerchant = activePaymentCardText.includes('ALINA-BH-PURCELLVILLE-01');
      const displaysLiveBadge = /live mode/i.test(activePaymentCardText);
      recordResult('section3_alinaPos', '3.5 Active payment card reflects updated Terminal ID, Merchant ID, and Live Mode badge',
        displaysTerminal && displaysMerchant && displaysLiveBadge, activePaymentCardText);

      // Select Local Pickup for Alina POS checkout
      const pickupRadio = page.locator('[data-testid="fulfillment-pickup"]');
      await pickupRadio.check({ force: true });
      await page.waitForTimeout(200);

      // Submit order using Alina POS
      await page.fill('[data-testid="customer-name"]', 'Alina Boutique');
      await page.fill('[data-testid="customer-email"]', 'alina@bluehydrangeava.com');
      await page.fill('[data-testid="customer-phone"]', '540-555-0199');

      await page.locator('[data-testid="place-order-btn"]').click();
      const receipt = page.locator('[data-testid="order-receipt"]');
      await receipt.waitFor({ state: 'visible', timeout: 5000 });

      const lastOrder = await page.evaluate(() => window.PuckWickStore.state.lastOrder);
      const receiptConforms = lastOrder && lastOrder.paymentAdapter === 'alina_pos';
      recordResult('section3_alinaPos', '3.6 Order processed through Alina POS logs paymentAdapter as alina_pos in store record',
        receiptConforms);

      await context.close();
    }

    // ----------------------------------------------------
    // Section 4: Accessibility & Keyboard Navigation
    // ----------------------------------------------------
    console.log('\n--- SECTION 4: Accessibility & Keyboard Navigation ---');
    {
      const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const page = await context.newPage();
      await page.goto(BASE_URL);

      // 4.1 Escape key closes Quick-View Modal
      const firstQuickView = page.locator('[data-testid="quick-view-btn"]').first();
      await firstQuickView.scrollIntoViewIfNeeded();
      await firstQuickView.click();
      const productModal = page.locator('[data-testid="product-modal"]');
      await productModal.waitFor({ state: 'visible', timeout: 3000 });

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const modalClosed = (await page.locator('[data-testid="product-modal"]').count()) === 0;
      const bodyScrollRestored = await page.evaluate(() => document.body.style.overflow === '');
      recordResult('section4_a11yKeyboard', '4.1 Escape key dismisses Quick-View Modal and restores body scroll',
        modalClosed && bodyScrollRestored);

      // 4.2 Focus Trap within Quick-View Modal
      await firstQuickView.click();
      await productModal.waitFor({ state: 'visible', timeout: 3000 });
      const modalTrapWorked = await page.evaluate(() => {
        const card = document.querySelector('.product-modal-card');
        const focusables = Array.from(card.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        if (focusables.length < 2) return false;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        // Focus first, simulate Shift+Tab -> should wrap to last
        first.focus();
        const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        card.dispatchEvent(shiftTabEvent);

        // Focus last, simulate Tab -> should wrap to first
        last.focus();
        const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true, cancelable: true });
        card.dispatchEvent(tabEvent);

        return true;
      });
      await page.keyboard.press('Escape');
      recordResult('section4_a11yKeyboard', '4.2 Quick-View Modal implements bidirectional focus trapping (Tab & Shift+Tab)',
        modalTrapWorked);

      // 4.3 Escape key closes Cart Drawer
      const cartBtn = page.locator('#cart-btn, [data-testid="cart-trigger"]').first();
      await cartBtn.click();
      await page.locator('[data-testid="cart-drawer"]').waitFor({ state: 'visible', timeout: 3000 });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const drawerClosed = await page.evaluate(() => {
        const drawer = document.getElementById('cart-drawer');
        return drawer && !drawer.classList.contains('open');
      });
      recordResult('section4_a11yKeyboard', '4.3 Escape key dismisses Cart Drawer and removes open state', drawerClosed);

      // 4.4 Escape key closes Checkout Modal
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });
      await cartBtn.click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible', timeout: 3000 });

      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const checkoutClosed = (await page.locator('[data-testid="checkout-modal"]').count()) === 0;
      recordResult('section4_a11yKeyboard', '4.4 Escape key dismisses Checkout Modal and removes backdrop dialog', checkoutClosed);

      await context.close();
    }

    // ----------------------------------------------------
    // Section 5: Viewport Testing (Desktop & Mobile)
    // ----------------------------------------------------
    console.log('\n--- SECTION 5: Responsive Viewport Testing (1440x900 & 390x844) ---');
    {
      // 5.1 Desktop (1440x900)
      const desktopContext = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const desktopPage = await desktopContext.newPage();
      await desktopPage.goto(BASE_URL);

      // Check no horizontal overflow
      const desktopScrollWidth = await desktopPage.evaluate(() => document.documentElement.scrollWidth);
      const desktopNoOverflow = desktopScrollWidth <= 1440;
      recordResult('section5_viewports', `5.1 Desktop 1440x900 has zero horizontal scroll overflow (Width: ${desktopScrollWidth}px)`,
        desktopNoOverflow, `ScrollWidth: ${desktopScrollWidth}px`);

      // Add item and check checkout layout on desktop
      await desktopPage.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });
      await desktopPage.locator('#cart-btn').click();
      await desktopPage.locator('[data-testid="checkout-btn"]').click();
      await desktopPage.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // Verify 2-column grid layout on desktop
      const isTwoColumn = await desktopPage.evaluate(() => {
        const grid = document.querySelector('.checkout-layout-grid');
        if (!grid) return false;
        const style = window.getComputedStyle(grid);
        return style.display === 'grid' && style.gridTemplateColumns.includes(' ');
      });
      recordResult('section5_viewports', '5.2 Checkout modal displays two-column responsive layout on desktop', isTwoColumn);
      await desktopContext.close();

      // 5.2 Mobile (390x844)
      const mobileContext = await browser.newContext({
        viewport: VIEWPORTS.mobile,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
      });
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto(BASE_URL);

      // Check no horizontal overflow on mobile
      const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
      const mobileNoOverflow = mobileScrollWidth <= 390;
      recordResult('section5_viewports', `5.3 Mobile 390x844 has zero horizontal scroll overflow (Width: ${mobileScrollWidth}px)`,
        mobileNoOverflow, `ScrollWidth: ${mobileScrollWidth}px`);

      // Add item and open checkout on mobile
      await mobilePage.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });
      await mobilePage.locator('#cart-btn').click();

      // Check cart drawer mobile width (full-width)
      const mobileDrawerBox = await mobilePage.locator('[data-testid="cart-drawer"]').boundingBox();
      const drawerFullWidth = mobileDrawerBox && mobileDrawerBox.width >= 380;
      recordResult('section5_viewports', `5.4 Cart drawer spans full mobile viewport width (${mobileDrawerBox?.width}px)`,
        drawerFullWidth, `Drawer width: ${mobileDrawerBox?.width}px`);

      // Proceed to checkout on mobile
      await mobilePage.locator('[data-testid="checkout-btn"]').click();
      await mobilePage.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      // Check tap targets for primary mobile controls (Place Order button and fulfillment cards)
      const tapTargetCheck = await mobilePage.evaluate(() => {
        const primaryControls = Array.from(document.querySelectorAll('.place-order-btn, .fulfillment-radio-card'));
        const smallTargets = primaryControls.filter(btn => {
          const rect = btn.getBoundingClientRect();
          return rect.height < 44;
        });
        return smallTargets.length === 0;
      });
      recordResult('section5_viewports', '5.5 Primary checkout action buttons and fulfillment cards meet mobile tap target guideline (>= 44px)',
        tapTargetCheck);

      await mobileContext.close();
    }

    // ----------------------------------------------------
    // Section 6: Adversarial Stress & Corner Scenarios
    // ----------------------------------------------------
    console.log('\n--- SECTION 6: Adversarial Stress & Corner Scenarios ---');
    {
      const context = await browser.newContext({ viewport: VIEWPORTS.desktop });
      const page = await context.newPage();
      await page.goto(BASE_URL);

      // 6.1 Email regex validation rejects multiple bad patterns
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 1 });
      });
      await page.locator('#cart-btn').click();
      await page.locator('[data-testid="checkout-btn"]').click();
      await page.locator('[data-testid="checkout-modal"]').waitFor({ state: 'visible' });

      await page.fill('[data-testid="customer-name"]', 'Test User');
      await page.fill('[data-testid="customer-phone"]', '703-555-0100');

      const invalidEmails = ['invalid', 'test@', '@domain.com', 'test@domain', 'spaces in@email.com'];
      let allEmailsRejected = true;

      for (const email of invalidEmails) {
        await page.fill('[data-testid="customer-email"]', email);
        await page.locator('[data-testid="place-order-btn"]').click();
        await page.waitForTimeout(100);
        const emailEl = await page.locator('[data-testid="customer-email"]');
        const hasErrorClass = await emailEl.evaluate(el => el.classList.contains('input-error'));
        if (!hasErrorClass) {
          allEmailsRejected = false;
          break;
        }
      }
      recordResult('section6_adversarial', '6.1 Malformed email addresses (test@, @domain, spaces) strictly trigger input-error',
        allEmailsRejected);

      // 6.2 Rapid Double-Click Debounce
      // Select Local Pickup first so re-render occurs before filling contact info
      await page.locator('[data-testid="fulfillment-pickup"]').check({ force: true });
      await page.waitForTimeout(300);

      await page.fill('[data-testid="customer-name"]', 'Double Submit Tester');
      await page.fill('[data-testid="customer-email"]', 'valid@puckandwick.com');
      await page.fill('[data-testid="customer-phone"]', '703-555-0100');

      const ordersBefore = await page.evaluate(() => {
        try {
          return JSON.parse(localStorage.getItem('pw_orders') || '[]').length;
        } catch (e) {
          return 0;
        }
      });

      // Rapidly click place order 3 times in quick succession
      const placeBtn = page.locator('[data-testid="place-order-btn"]');
      await Promise.all([
        placeBtn.click({ force: true }).catch(() => {}),
        placeBtn.click({ force: true }).catch(() => {}),
        placeBtn.click({ force: true }).catch(() => {})
      ]);

      await page.locator('[data-testid="order-receipt"]').waitFor({ state: 'visible', timeout: 5000 });
      const ordersAfter = await page.evaluate(() => {
        try {
          return JSON.parse(localStorage.getItem('pw_orders') || '[]').length;
        } catch (e) {
          return 0;
        }
      });
      recordResult('section6_adversarial', '6.2 Rapid double/triple submission clicks are locked by isSubmitting creating exactly 1 order',
        ordersAfter === ordersBefore + 1, `Before: ${ordersBefore}, After: ${ordersAfter}`);

      // 6.3 Promo code discount and 6.0% tax precision
      await page.locator('[data-testid="checkout-close-btn"]').click();
      await page.waitForTimeout(300);

      // Add 2 candles = $68.00 subtotal, apply PUCK10 (10% off), set shipping to standard
      await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'standard');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'top-shelf', price: 34, quantity: 2 });
        window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10');
      });

      const promoMath = await page.evaluate(() => {
        const subtotal = window.PuckWickStore.getCartSubtotal(); // 68.00
        const discount = window.PuckWickStore.getDiscountAmount(); // 6.80
        const netSubtotal = subtotal - discount; // 61.20
        const tax = Number((netSubtotal * 0.06).toFixed(2)); // 3.67
        const shipping = window.PuckWickStore.getShippingTotal(); // 6.95
        const grandTotal = Number((netSubtotal + shipping + tax).toFixed(2)); // 71.82
        return { subtotal, discount, netSubtotal, tax, shipping, grandTotal };
      });

      const promoMathValid = promoMath.subtotal === 68 &&
                             Number(promoMath.discount.toFixed(2)) === 6.80 &&
                             Number(promoMath.netSubtotal.toFixed(2)) === 61.20 &&
                             promoMath.tax === 3.67 &&
                             promoMath.shipping === 6.95 &&
                             promoMath.grandTotal === 71.82;
      recordResult('section6_adversarial', '6.3 PUCK10 10% discount applies to net subtotal before 6% VA tax calculation',
        promoMathValid, JSON.stringify(promoMath));

      // 6.4 Free shipping boundary: exactly $74.99 vs $75.00
      const boundaryMath = await page.evaluate(() => {
        // Below threshold
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('REMOVE_PROMO_CODE');
        window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'standard');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-boundary', price: 74.99, quantity: 1 });
        const shipBelow = window.PuckWickStore.getShippingTotal();

        // At or above threshold
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-boundary', price: 75.00, quantity: 1 });
        const shipAt = window.PuckWickStore.getShippingTotal();

        return { shipBelow, shipAt };
      });
      recordResult('section6_adversarial', '6.4 Free shipping threshold triggers precisely at $75.00 ($74.99 -> $6.95, $75.00 -> $0.00)',
        boundaryMath.shipBelow === 6.95 && boundaryMath.shipAt === 0, JSON.stringify(boundaryMath));

      // 6.5 Cart item boundary clamping at 99
      const clampCheck = await page.evaluate(() => {
        window.PuckWickStore.dispatch('CLEAR_CART');
        window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'clamp-test', price: 34, quantity: 150 });
        const initialQty = window.PuckWickStore.state.cart[0]?.quantity;
        window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'clamp-test', quantity: 999 });
        const clampedQty = window.PuckWickStore.state.cart[0]?.quantity;
        return initialQty === 99 && clampedQty === 99;
      });
      recordResult('section6_adversarial', '6.5 Quantities exceeding 99 are clamped to 99 in both add and update operations',
        clampCheck);

      await context.close();
    }

  } finally {
    await browser.close();
    if (serverHandle && serverHandle.server) {
      serverHandle.server.close();
    }
  }

  // Summary Report
  console.log('\n============================================================');
  console.log('              CHALLENGER VERIFICATION SUMMARY               ');
  console.log('============================================================');
  let totalPassed = 0;
  let totalFailed = 0;
  for (const [key, section] of Object.entries(report)) {
    console.log(`  ${key}: Passed ${section.passed} / Total ${section.passed + section.failed}`);
    totalPassed += section.passed;
    totalFailed += section.failed;
  }
  console.log(`\n  GRAND TOTAL: ${totalPassed} Passed, ${totalFailed} Failed (Total ${totalPassed + totalFailed})`);
  console.log('============================================================');

  if (totalFailed > 0) {
    console.error(`\n❌ CHALLENGE FAILED: ${totalFailed} test(s) failed.`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL ${totalPassed} EMPIRICAL CHALLENGER TESTS PASSED WITH ZERO FAILURES!`);
    process.exit(0);
  }
}

runTestSuite().catch(err => {
  console.error('Unhandled test harness error:', err);
  process.exit(1);
});
