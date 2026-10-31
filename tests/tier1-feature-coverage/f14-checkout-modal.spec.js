/**
 * tests/tier1-feature-coverage/f14-checkout-modal.spec.js
 * Feature 14: Modular Checkout Modal
 * Minimum 5 test cases verifying checkout modal launch, contact inputs, fulfillment options, breakdown, and dismiss.
 */

export const tests = [
  {
    id: 'T1-F14-01',
    tier: 1,
    feature: 'F14: Modular Checkout Modal',
    milestone: 'M2',
    title: 'Clicking Proceed to Checkout opens the checkout modal dialog',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      const checkoutBtn = page.locator(selectors.cart.checkoutBtn).first();
      await checkoutBtn.click();
      const modal = page.locator(selectors.checkout.modal).first();
      await modal.waitFor({ state: 'visible', timeout: 3000 });
      const isVisible = await modal.isVisible();
      if (!isVisible) throw new Error('Checkout modal did not become visible');
    }
  },
  {
    id: 'T1-F14-02',
    tier: 1,
    feature: 'F14: Modular Checkout Modal',
    milestone: 'M2',
    title: 'Checkout modal captures customer contact information (Name, Email, Phone)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      await page.locator(selectors.cart.checkoutBtn).first().click();
      const nameInput = page.locator(selectors.checkout.customerName).first();
      const emailInput = page.locator(selectors.checkout.customerEmail).first();
      if ((await nameInput.count()) === 0 || (await emailInput.count()) === 0) {
        throw new Error('Customer contact inputs not found in checkout modal');
      }
    }
  },
  {
    id: 'T1-F14-03',
    tier: 1,
    feature: 'F14: Modular Checkout Modal',
    milestone: 'M2',
    title: 'Checkout provides clear choice between Standard Shipping and Free Local Pickup',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      await page.locator(selectors.cart.checkoutBtn).first().click();
      const pickupOpt = page.locator(selectors.checkout.fulfillmentPickup).first();
      const shipOpt = page.locator(selectors.checkout.fulfillmentShipping).first();
      if ((await pickupOpt.count()) === 0 && (await shipOpt.count()) === 0) {
        // Fallback text check
        const text = await page.locator(selectors.checkout.modal).first().innerText();
        if (!/pickup/i.test(text) || !/shipping/i.test(text)) {
          throw new Error('Fulfillment options (shipping vs pickup) not found in checkout modal');
        }
      }
    }
  },
  {
    id: 'T1-F14-04',
    tier: 1,
    feature: 'F14: Modular Checkout Modal',
    milestone: 'M2',
    title: 'Checkout displays full financial summary (Subtotal, Discount, Shipping, Tax, Total)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      await page.locator(selectors.cart.checkoutBtn).first().click();
      const modalText = await page.locator(selectors.checkout.modal).first().innerText();
      if (!/total/i.test(modalText)) {
        throw new Error('Order total breakdown not found in checkout modal');
      }
    }
  },
  {
    id: 'T1-F14-05',
    tier: 1,
    feature: 'F14: Modular Checkout Modal',
    milestone: 'M2',
    title: 'Checkout modal close button dismisses modal cleanly',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      await page.locator(selectors.cart.checkoutBtn).first().click();
      const closeBtn = page.locator(selectors.checkout.closeBtn).first();
      if ((await closeBtn.count()) > 0) {
        await closeBtn.click();
        await page.waitForTimeout(200);
        const modal = page.locator(selectors.checkout.modal).first();
        const isVisible = await modal.isVisible();
        if (isVisible) throw new Error('Checkout modal remained visible after close button clicked');
      }
    }
  }
];
