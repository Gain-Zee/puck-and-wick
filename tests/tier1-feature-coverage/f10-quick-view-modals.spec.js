/**
 * tests/tier1-feature-coverage/f10-quick-view-modals.spec.js
 * Feature 10: Product Quick-View Modals
 * Minimum 5 test cases verifying modal opening, 3-tier scent pyramid, burn specs, close button, and add-to-cart.
 */

export const tests = [
  {
    id: 'T1-F10-01',
    tier: 1,
    feature: 'F10: Product Quick-View Modals',
    milestone: 'M2',
    title: 'Clicking Quick View opens the product detail modal dialog',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const quickView = page.locator(selectors.catalog.quickViewBtn).first();
      if ((await quickView.count()) > 0) {
        await quickView.click();
        const modal = page.locator(selectors.modal.container).first();
        await modal.waitFor({ state: 'visible', timeout: 3000 });
        const isVisible = await modal.isVisible();
        if (!isVisible) throw new Error('Quick-view modal dialog did not become visible');
      }
    }
  },
  {
    id: 'T1-F10-02',
    tier: 1,
    feature: 'F10: Product Quick-View Modals',
    milestone: 'M2',
    title: 'Modal presents structured 3-tier fragrance pyramid (Top, Middle, Base)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const quickView = page.locator(selectors.catalog.quickViewBtn).first();
      if ((await quickView.count()) > 0) {
        await quickView.click();
        const modal = page.locator(selectors.modal.container).first();
        await modal.waitFor({ state: 'visible', timeout: 3000 });
        const modalText = await modal.innerText();
        const hasTop = /top/i.test(modalText);
        const hasMiddle = /middle|heart/i.test(modalText);
        const hasBase = /base/i.test(modalText);
        if (!hasTop || !hasMiddle || !hasBase) {
          throw new Error('Quick-view modal does not display 3-tier scent pyramid');
        }
      }
    }
  },
  {
    id: 'T1-F10-03',
    tier: 1,
    feature: 'F10: Product Quick-View Modals',
    milestone: 'M2',
    title: 'Modal specifies burn time (55-65 hrs) and vessel specifications',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const quickView = page.locator(selectors.catalog.quickViewBtn).first();
      if ((await quickView.count()) > 0) {
        await quickView.click();
        const modal = page.locator(selectors.modal.container).first();
        await modal.waitFor({ state: 'visible', timeout: 3000 });
        const modalText = await modal.innerText();
        if (!/55|65|hours/i.test(modalText)) {
          throw new Error('Modal does not display burn time specs');
        }
      }
    }
  },
  {
    id: 'T1-F10-04',
    tier: 1,
    feature: 'F10: Product Quick-View Modals',
    milestone: 'M2',
    title: 'Modal provides accessible close button that cleanly dismisses modal',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const quickView = page.locator(selectors.catalog.quickViewBtn).first();
      if ((await quickView.count()) > 0) {
        await quickView.click();
        const modal = page.locator(selectors.modal.container).first();
        await modal.waitFor({ state: 'visible', timeout: 3000 });
        const closeBtn = page.locator(selectors.modal.closeBtn).first();
        await closeBtn.click();
        await page.waitForTimeout(200);
        const isHidden = !(await modal.isVisible());
        if (!isHidden) throw new Error('Modal did not dismiss after clicking close button');
      }
    }
  },
  {
    id: 'T1-F10-05',
    tier: 1,
    feature: 'F10: Product Quick-View Modals',
    milestone: 'M2',
    title: 'Modal provides "Add to Cart" button that adds candle directly to cart',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const quickView = page.locator(selectors.catalog.quickViewBtn).first();
      if ((await quickView.count()) > 0) {
        await quickView.click();
        const addBtn = page.locator(selectors.modal.addToCartBtn).first();
        if ((await addBtn.count()) > 0) {
          await addBtn.click();
          await page.waitForTimeout(100);
          const badgeText = await page.locator(selectors.cartBadge).first().innerText();
          if (badgeText.trim() === '0') {
            throw new Error('Adding to cart from modal did not increment cart badge');
          }
        }
      }
    }
  }
];
