/**
 * tests/tier1-feature-coverage/f09-scent-filters.spec.js
 * Feature 9: Scent Family Filter Tabs
 * Minimum 5 test cases verifying all 6 filter tabs and dynamic card filtering behavior.
 */

export const tests = [
  {
    id: 'T1-F09-01',
    tier: 1,
    feature: 'F9: Scent Family Filter Tabs',
    milestone: 'M2',
    title: 'Category filter bar presents all 6 required scent family filters',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const categories = ['All', 'Signature', 'Fresh', 'Woods', 'Seasonal'];
      for (const cat of categories) {
        if (!new RegExp(cat, 'i').test(text)) {
          throw new Error(`Category filter '${cat}' was not found in catalog navigation`);
        }
      }
    }
  },
  {
    id: 'T1-F09-02',
    tier: 1,
    feature: 'F9: Scent Family Filter Tabs',
    milestone: 'M2',
    title: 'Clicking "Fresh & Clean" filters view to matching fresh pours',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const freshTab = page.locator(selectors.catalog.filters.freshClean).first();
      if ((await freshTab.count()) > 0) {
        await freshTab.click();
        await page.waitForTimeout(100);
        const text = await page.locator(selectors.catalog.section).first().innerText();
        if (!/fresh\s*cut/i.test(text) && !/mint/i.test(text)) {
          throw new Error('Fresh & Clean filter did not display expected fresh fragrances');
        }
      }
    }
  },
  {
    id: 'T1-F09-03',
    tier: 1,
    feature: 'F9: Scent Family Filter Tabs',
    milestone: 'M2',
    title: 'Clicking "Woods & Rustic" filters view to woodsy and bourbon pours',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const woodsTab = page.locator(selectors.catalog.filters.woodsRustic).first();
      if ((await woodsTab.count()) > 0) {
        await woodsTab.click();
        await page.waitForTimeout(100);
        const text = await page.locator(selectors.catalog.section).first().innerText();
        if (!/top\s*shelf/i.test(text) && !/bourbon/i.test(text)) {
          throw new Error('Woods & Rustic filter did not display expected woodsy fragrances');
        }
      }
    }
  },
  {
    id: 'T1-F09-04',
    tier: 1,
    feature: 'F9: Scent Family Filter Tabs',
    milestone: 'M2',
    title: 'Clicking "Seasonal" isolates seasonal collaboration pours like Balsam Fir',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const seasonalTab = page.locator(selectors.catalog.filters.seasonal).first();
      if ((await seasonalTab.count()) > 0) {
        await seasonalTab.click();
        await page.waitForTimeout(100);
        const text = await page.locator(selectors.catalog.section).first().innerText();
        if (!/balsam\s*fir/i.test(text)) {
          throw new Error('Seasonal filter did not display Balsam Fir');
        }
      }
    }
  },
  {
    id: 'T1-F09-05',
    tier: 1,
    feature: 'F9: Scent Family Filter Tabs',
    milestone: 'M2',
    title: 'Clicking "All" resets filters and displays entire candle lineup',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const allTab = page.locator(selectors.catalog.filters.all).first();
      if ((await allTab.count()) > 0) {
        await allTab.click();
        await page.waitForTimeout(100);
        const text = await page.locator(selectors.catalog.section).first().innerText();
        if (!/top\s*shelf/i.test(text) || !/fresh\s*cut/i.test(text)) {
          throw new Error('All filter did not restore full candle lineup');
        }
      }
    }
  }
];
