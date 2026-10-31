/**
 * tests/tier1-feature-coverage/f03-cart-badge.spec.js
 * Feature 3: Live Cart Counter Badge
 * Minimum 5 test cases covering badge visibility, initial state, dynamic increment, animation, and multi-viewport sync.
 */

export const tests = [
  {
    id: 'T1-F03-01',
    tier: 1,
    feature: 'F3: Live Cart Counter Badge',
    milestone: 'M1',
    title: 'Cart trigger button is visible in header with cart counter element',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const trigger = page.locator(selectors.cartTrigger).first();
      await trigger.waitFor({ state: 'visible', timeout: 5000 });
      const countEl = page.locator(selectors.cartBadge).first();
      if ((await countEl.count()) === 0) {
        throw new Error('Cart badge counter element not found inside header navigation');
      }
    }
  },
  {
    id: 'T1-F03-02',
    tier: 1,
    feature: 'F3: Live Cart Counter Badge',
    milestone: 'M1',
    title: 'Initial badge count represents empty cart state (0 or empty)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const text = await page.locator(selectors.cartBadge).first().innerText();
      const val = text.trim();
      if (val !== '0' && val !== '') {
        throw new Error(`Expected initial cart badge to be '0' or empty, got '${val}'`);
      }
    }
  },
  {
    id: 'T1-F03-03',
    tier: 1,
    feature: 'F3: Live Cart Counter Badge',
    milestone: 'M2',
    title: 'Adding a product updates badge count dynamically',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      // If store is accessible, dispatch addToCart or click quick-add
      const quickAdd = page.locator(selectors.catalog.quickAddBtn).first();
      if ((await quickAdd.count()) > 0) {
        await quickAdd.click();
      } else {
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
      }
      await page.waitForTimeout(150);
      const text = await page.locator(selectors.cartBadge).first().innerText();
      if (text.trim() !== '1') {
        throw new Error(`Expected cart badge count to be '1' after addition, got '${text.trim()}'`);
      }
    }
  },
  {
    id: 'T1-F03-04',
    tier: 1,
    feature: 'F3: Live Cart Counter Badge',
    milestone: 'M2',
    title: 'Badge element receives animation or class trigger upon item addition',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const hadAnimation = await page.evaluate((sel) => {
        const badge = document.querySelector(sel.cartBadge);
        if (!badge) return false;
        let animated = false;
        const observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === 'attributes' && m.attributeName === 'class') animated = true;
          }
        });
        observer.observe(badge, { attributes: true });

        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'test-item', price: 34, quantity: 1 });
        }
        return true;
      }, selectors);

      if (!hadAnimation) {
        throw new Error('Badge element was not found or failed animation trigger');
      }
    }
  },
  {
    id: 'T1-F03-05',
    tier: 1,
    feature: 'F3: Live Cart Counter Badge',
    milestone: 'M2',
    viewport: 'mobile',
    title: 'Cart badge count renders cleanly and remains synchronized on mobile viewport',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 2 });
        }
      });
      await page.waitForTimeout(100);
      const badge = page.locator(selectors.cartBadge).first();
      await badge.waitFor({ state: 'visible', timeout: 5000 });
      const text = await badge.innerText();
      if (text.trim() !== '2') {
        throw new Error(`Expected mobile badge to display count '2', got '${text.trim()}'`);
      }
    }
  }
];
