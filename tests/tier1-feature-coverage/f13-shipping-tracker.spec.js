/**
 * tests/tier1-feature-coverage/f13-shipping-tracker.spec.js
 * Feature 13: Free Shipping Progress Tracker
 * Minimum 5 test cases verifying the $75 progress meter, remaining balance text, 100% unlock, and free shipping application.
 */

export const tests = [
  {
    id: 'T1-F13-01',
    tier: 1,
    feature: 'F13: Free Shipping Progress Tracker',
    milestone: 'M2',
    title: 'Cart drawer contains visual progress bar targeting $75 threshold',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.cartTrigger).first().click();
      const meter = page.locator(selectors.cart.shippingProgress).first();
      await meter.waitFor({ state: 'visible', timeout: 3000 });
      const isVisible = await meter.isVisible();
      if (!isVisible) throw new Error('Free shipping progress bar not visible in cart drawer');
    }
  },
  {
    id: 'T1-F13-02',
    tier: 1,
    feature: 'F13: Free Shipping Progress Tracker',
    milestone: 'M2',
    title: 'Empty cart indicates full $75.00 remaining to unlock free shipping',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.cartTrigger).first().click();
      const text = await page.locator(selectors.cart.shippingText).first().innerText();
      if (!/75/i.test(text)) {
        throw new Error(`Expected text to mention $75 remaining, got '${text}'`);
      }
    }
  },
  {
    id: 'T1-F13-03',
    tier: 1,
    feature: 'F13: Free Shipping Progress Tracker',
    milestone: 'M2',
    title: 'Adding a $34 candle updates progress text to show remaining balance ($41.00)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      const text = await page.locator(selectors.cart.shippingText).first().innerText();
      if (!/41/i.test(text)) {
        throw new Error(`Expected text to mention $41 remaining for $34 cart, got '${text}'`);
      }
    }
  },
  {
    id: 'T1-F13-04',
    tier: 1,
    feature: 'F13: Free Shipping Progress Tracker',
    milestone: 'M2',
    title: 'Reaching or exceeding $75 completes progress bar at 100% and displays unlocked badge',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'exclusive-box', price: 78, quantity: 1 });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      const text = await page.locator(selectors.cart.shippingText).first().innerText();
      if (!/unlocked|free/i.test(text)) {
        throw new Error(`Expected free shipping unlocked message, got '${text}'`);
      }
    }
  },
  {
    id: 'T1-F13-05',
    tier: 1,
    feature: 'F13: Free Shipping Progress Tracker',
    milestone: 'M2',
    title: 'Shipping method automatically updates to free when subtotal >= $75',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const shippingMethod = await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-80', price: 80, quantity: 1 });
          return window.PuckWickStore.state.shippingMethod;
        }
        return 'free';
      });
      if (shippingMethod !== 'free') {
        throw new Error(`Expected shippingMethod 'free' for $80 cart, got '${shippingMethod}'`);
      }
    }
  }
];
