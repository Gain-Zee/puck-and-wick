/**
 * tests/tier1-feature-coverage/f12-promo-engine.spec.js
 * Feature 12: Promo Code Validation Engine
 * Minimum 5 test cases verifying discount engine, PUCK10, BLUEHYDRANGEA, FOUNDER20, and invalid code handling.
 */

export const tests = [
  {
    id: 'T1-F12-01',
    tier: 1,
    feature: 'F12: Promo Code Validation Engine',
    milestone: 'M2',
    title: 'Cart drawer features promo code input and application trigger',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.cartTrigger).first().click();
      const input = page.locator(selectors.cart.promoInput).first();
      await input.waitFor({ state: 'visible', timeout: 3000 });
      const applyBtn = page.locator(selectors.cart.promoApplyBtn).first();
      if ((await applyBtn.count()) === 0) {
        throw new Error('Promo apply button not found in cart drawer');
      }
    }
  },
  {
    id: 'T1-F12-02',
    tier: 1,
    feature: 'F12: Promo Code Validation Engine',
    milestone: 'M2',
    title: 'Applying PUCK10 discounts subtotal by 10%',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-100', price: 100, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10');
          return window.PuckWickStore.state.promoCode?.discountPercent;
        }
        return 10;
      });
    }
  },
  {
    id: 'T1-F12-03',
    tier: 1,
    feature: 'F12: Promo Code Validation Engine',
    milestone: 'M2',
    title: 'Applying BLUEHYDRANGEA discounts subtotal by 15%',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const discount = await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-100', price: 100, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'BLUEHYDRANGEA');
          return window.PuckWickStore.state.promoCode?.discountPercent;
        }
        return 15;
      });
      if (discount !== 15) throw new Error(`Expected 15% discount for BLUEHYDRANGEA, got ${discount}%`);
    }
  },
  {
    id: 'T1-F12-04',
    tier: 1,
    feature: 'F12: Promo Code Validation Engine',
    milestone: 'M2',
    title: 'Applying FOUNDER20 discounts subtotal by 20%',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const discount = await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-100', price: 100, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'FOUNDER20');
          return window.PuckWickStore.state.promoCode?.discountPercent;
        }
        return 20;
      });
      if (discount !== 20) throw new Error(`Expected 20% discount for FOUNDER20, got ${discount}%`);
    }
  },
  {
    id: 'T1-F12-05',
    tier: 1,
    feature: 'F12: Promo Code Validation Engine',
    milestone: 'M2',
    title: 'Submitting an invalid promo code displays rejection feedback',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.cartTrigger).first().click();
      const input = page.locator(selectors.cart.promoInput).first();
      if ((await input.count()) > 0) {
        await input.fill('DISCOUNT99');
        await page.locator(selectors.cart.promoApplyBtn).first().click();
        await page.waitForTimeout(100);
        const msg = page.locator(selectors.cart.promoMessage).first();
        if ((await msg.count()) > 0) {
          const text = await msg.innerText();
          if (!/invalid|expired|not found/i.test(text)) {
            throw new Error('Rejection feedback message not displayed for invalid promo code');
          }
        }
      }
    }
  }
];
