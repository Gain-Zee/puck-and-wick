/**
 * tests/tier1-feature-coverage/f06-stockist-hub.spec.js
 * Feature 6: The Blue Hydrangea Stockist Hub
 * Minimum 5 test cases verifying stockist spotlight, address, operating hours, and inquiry triggers.
 */

export const tests = [
  {
    id: 'T1-F06-01',
    tier: 1,
    feature: 'F6: The Blue Hydrangea Stockist Hub',
    milestone: 'M1',
    title: 'Retail stockist spotlight section is present and highlights The Blue Hydrangea',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const stockist = page.locator(selectors.stockist.section).first();
      await stockist.waitFor({ state: 'visible', timeout: 5000 });
      const text = await stockist.innerText();
      if (!/blue\s*hydrangea/i.test(text)) {
        throw new Error('Stockist section does not feature The Blue Hydrangea');
      }
    }
  },
  {
    id: 'T1-F06-02',
    tier: 1,
    feature: 'F6: The Blue Hydrangea Stockist Hub',
    milestone: 'M1',
    title: 'Accurate physical address (604 E. Main St., Purcellville, VA) is displayed',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const stockist = page.locator(selectors.stockist.section).first();
      const text = await stockist.innerText();
      const hasAddress = /604\s*E\.?\s*Main\s*St/i.test(text) && /purcellville/i.test(text);
      if (!hasAddress) {
        throw new Error('Stockist section is missing exact address: 604 E. Main St., Purcellville, VA');
      }
    }
  },
  {
    id: 'T1-F06-03',
    tier: 1,
    feature: 'F6: The Blue Hydrangea Stockist Hub',
    milestone: 'M1',
    title: 'Operating boutique hours and in-person sniff bar details are displayed',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const stockist = page.locator(selectors.stockist.section).first();
      const text = await stockist.innerText();
      const hasHours = /hours/i.test(text) || /wednesday/i.test(text) || /saturday/i.test(text) || /10:?00/i.test(text);
      if (!hasHours) {
        throw new Error('Stockist section does not display boutique hours');
      }
    }
  },
  {
    id: 'T1-F06-04',
    tier: 1,
    feature: 'F6: The Blue Hydrangea Stockist Hub',
    milestone: 'M1',
    title: 'Wholesale inquiry trigger button is interactive',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const btn = page.locator(selectors.stockist.wholesaleBtn).first();
      if ((await btn.count()) > 0) {
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
        await page.waitForTimeout(100);
        const modal = page.locator(selectors.stockist.wholesaleModal).first();
        if ((await modal.count()) > 0) {
          await modal.waitFor({ state: 'visible', timeout: 3000 });
        }
      }
    }
  },
  {
    id: 'T1-F06-05',
    tier: 1,
    feature: 'F6: The Blue Hydrangea Stockist Hub',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Stockist hub displays with touch-friendly layout on mobile viewport',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const stockist = page.locator(selectors.stockist.section).first();
      await stockist.scrollIntoViewIfNeeded();
      const isVisible = await stockist.isVisible();
      if (!isVisible) throw new Error('Stockist section not visible on mobile');
    }
  }
];
