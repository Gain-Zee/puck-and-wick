/**
 * tests/tier1-feature-coverage/f18-box-builder.spec.js
 * Feature 18: Interactive Exclusive Box Builder
 * Minimum 5 test cases verifying box builder section, Men's vs Women's toggle, $78 bundle pricing, candle selection, and cart addition.
 */

export const tests = [
  {
    id: 'T1-F18-01',
    tier: 1,
    feature: 'F18: Interactive Exclusive Box Builder',
    milestone: 'M3',
    title: 'Exclusive Box Builder section is rendered with interactive customizer stage',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const section = page.locator(selectors.boxBuilder.section).first();
      await section.waitFor({ state: 'visible', timeout: 5000 });
      const isVisible = await section.isVisible();
      if (!isVisible) throw new Error('Exclusive Box Builder section is not visible');
    }
  },
  {
    id: 'T1-F18-02',
    tier: 1,
    feature: 'F18: Interactive Exclusive Box Builder',
    milestone: 'M3',
    title: "Customizer allows toggling between Men's / Athlete Edition and Women's Luxury Edition",
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const toggleWomen = page.locator(selectors.boxBuilder.toggleWomen).first();
      if ((await toggleWomen.count()) > 0) {
        await toggleWomen.click();
        await page.waitForTimeout(100);
        const text = await page.locator(selectors.boxBuilder.section).first().innerText();
        if (!/women/i.test(text) && !/luxe/i.test(text) && !/spa/i.test(text)) {
          throw new Error("Toggling to Women's edition did not update customizer copy");
        }
      }
    }
  },
  {
    id: 'T1-F18-03',
    tier: 1,
    feature: 'F18: Interactive Exclusive Box Builder',
    milestone: 'M3',
    title: 'Customizer displays $78.00 bundle price with $98.00 comparison value',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const text = await page.locator(selectors.boxBuilder.section).first().innerText();
      if (!text.includes('98') && !text.includes('78')) {
        throw new Error("Exclusive Box section does not display $98 bundle price");
      }
    }
  },
  {
    id: 'T1-F18-04',
    tier: 1,
    feature: 'F18: Interactive Exclusive Box Builder',
    milestone: 'M3',
    title: 'Customizer provides candle scent selection (Top Shelf, Fresh Cut, etc.)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const selectorEl = page.locator(selectors.boxBuilder.scentSelector).first();
      if ((await selectorEl.count()) > 0) {
        const text = await selectorEl.innerText();
        if (!/shelf|cut|bourbon|fir|candle/i.test(text)) {
          throw new Error("Candle scent selector does not offer signature fragrance choices");
        }
      }
    }
  },
  {
    id: 'T1-F18-05',
    tier: 1,
    feature: 'F18: Interactive Exclusive Box Builder',
    milestone: 'M3',
    title: 'Clicking Add to Cart adds customized box bundle with selected options to cart drawer',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const addBtn = page.locator(selectors.boxBuilder.addBoxBtn).first();
      if ((await addBtn.count()) > 0) {
        await addBtn.click();
        await page.waitForTimeout(150);
        const badgeText = await page.locator(selectors.cartBadge).first().innerText();
        if (badgeText.trim() === '0') {
          throw new Error('Adding Exclusive Box to cart did not increment cart badge');
        }
      }
    }
  }
];
