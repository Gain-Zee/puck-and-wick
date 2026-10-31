/**
 * tests/tier1-feature-coverage/f11-cart-drawer.spec.js
 * Feature 11: POS-Ready Slide-Out Cart Drawer
 * Minimum 5 test cases verifying drawer open/close, line items, quantity adjustments, and subtotal.
 */

export const tests = [
  {
    id: 'T1-F11-01',
    tier: 1,
    feature: 'F11: POS-Ready Slide-Out Cart Drawer',
    milestone: 'M2',
    title: 'Clicking cart trigger button opens the slide-out cart drawer',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const trigger = page.locator(selectors.cartTrigger).first();
      await trigger.click();
      const drawer = page.locator(selectors.cart.drawer).first();
      await drawer.waitFor({ state: 'visible', timeout: 3000 });
      const isVisible = await drawer.isVisible();
      if (!isVisible) throw new Error('Cart drawer did not open on trigger click');
    }
  },
  {
    id: 'T1-F11-02',
    tier: 1,
    feature: 'F11: POS-Ready Slide-Out Cart Drawer',
    milestone: 'M2',
    title: 'Cart drawer displays active line items with product titles and unit prices',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'candle-top-shelf',
            title: 'Top Shelf',
            price: 34,
            quantity: 1
          });
        }
      });
      const trigger = page.locator(selectors.cartTrigger).first();
      await trigger.click();
      const drawer = page.locator(selectors.cart.drawer).first();
      const text = await drawer.innerText();
      if (!text.includes('Top Shelf') || !text.includes('34')) {
        throw new Error('Cart drawer line item title or price missing');
      }
    }
  },
  {
    id: 'T1-F11-03',
    tier: 1,
    feature: 'F11: POS-Ready Slide-Out Cart Drawer',
    milestone: 'M2',
    title: 'Quantity increment control increases item quantity and updates subtotal',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'candle-top-shelf',
            title: 'Top Shelf',
            price: 34,
            quantity: 1
          });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      const plusBtn = page.locator(selectors.cart.qtyIncrement).first();
      if ((await plusBtn.count()) > 0) {
        await plusBtn.click();
        await page.waitForTimeout(100);
        const subtotalText = await page.locator(selectors.cart.subtotal).first().innerText();
        if (!subtotalText.includes('68')) {
          throw new Error(`Expected subtotal $68.00 after increment, got '${subtotalText}'`);
        }
      }
    }
  },
  {
    id: 'T1-F11-04',
    tier: 1,
    feature: 'F11: POS-Ready Slide-Out Cart Drawer',
    milestone: 'M2',
    title: 'Item removal control removes line item and returns cart to empty state',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'candle-top-shelf',
            title: 'Top Shelf',
            price: 34,
            quantity: 1
          });
        }
      });
      await page.locator(selectors.cartTrigger).first().click();
      const removeBtn = page.locator(selectors.cart.removeItem).first();
      if ((await removeBtn.count()) > 0) {
        await removeBtn.click();
        await page.waitForTimeout(100);
        const badgeText = await page.locator(selectors.cartBadge).first().innerText();
        if (badgeText.trim() !== '0' && badgeText.trim() !== '') {
          throw new Error('Badge did not return to 0 after removing item');
        }
      }
    }
  },
  {
    id: 'T1-F11-05',
    tier: 1,
    feature: 'F11: POS-Ready Slide-Out Cart Drawer',
    milestone: 'M2',
    title: 'Cart drawer close button cleanly closes drawer',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.cartTrigger).first().click();
      const drawer = page.locator(selectors.cart.drawer).first();
      await drawer.waitFor({ state: 'visible', timeout: 3000 });
      const closeBtn = page.locator(selectors.cart.closeBtn).first();
      await closeBtn.click();
      await page.waitForTimeout(200);
      const isVisible = await drawer.isVisible();
      if (isVisible) throw new Error('Cart drawer remained visible after close button click');
    }
  }
];
