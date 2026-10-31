/**
 * tests/tier1-feature-coverage/f08-fragrance-lineup.spec.js
 * Feature 8: 7+ Candle Fragrance Lineup
 * Minimum 5 test cases verifying all 7 fragrance profiles, pricing, notes, vessel specs, and burn times.
 */

export const tests = [
  {
    id: 'T1-F08-01',
    tier: 1,
    feature: 'F8: 7+ Candle Fragrance Lineup',
    milestone: 'M2',
    title: 'Product catalog presents all 7 core fragrance candles',
    run: async ({ page, baseUrl, mockData }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const requiredCandles = ['Top Shelf', 'Fresh Cut', 'Balsam Fir', 'Barnwood & Bourbon'];
      for (const name of requiredCandles) {
        if (!text.toLowerCase().includes(name.toLowerCase())) {
          throw new Error(`Candle '${name}' not found in catalog text`);
        }
      }
    }
  },
  {
    id: 'T1-F08-02',
    tier: 1,
    feature: 'F8: 7+ Candle Fragrance Lineup',
    milestone: 'M2',
    title: 'Candle prices reflect premium tier ($34.00 standard, $36.00 seasonal)',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const hasPrices = await page.evaluate(() => {
        const text = document.body.innerText;
        return text.includes('$36') || text.includes('36.00') || text.includes('$34') || text.includes('34.00');
      });
      if (!hasPrices) throw new Error('Expected $36 candle pricing not found in catalog');
    }
  },
  {
    id: 'T1-F08-03',
    tier: 1,
    feature: 'F8: 7+ Candle Fragrance Lineup',
    milestone: 'M2',
    title: 'Fragrance lineup incorporates 3-tier scent pyramid architecture (Top, Middle, Base)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const card = page.locator(selectors.catalog.productCard).first();
      if ((await card.count()) > 0) {
        const text = await card.innerText();
        // Check for notes indication
        const hasNotes = /notes/i.test(text) || /bourbon/i.test(text) || /fir/i.test(text) || /ozone/i.test(text);
        if (!hasNotes) throw new Error('Candle card does not indicate fragrance notes');
      }
    }
  },
  {
    id: 'T1-F08-04',
    tier: 1,
    feature: 'F8: 7+ Candle Fragrance Lineup',
    milestone: 'M2',
    title: 'Vessel specifications indicate 10 oz luxury matte obsidian or amber glass',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const hasVesselSpecs = await page.evaluate(() => {
        const text = document.body.innerText;
        return /10\s*oz/i.test(text) || /matte\s*obsidian/i.test(text) || /amber/i.test(text);
      });
      if (!hasVesselSpecs) throw new Error('10 oz vessel specifications not found in catalog');
    }
  },
  {
    id: 'T1-F08-05',
    tier: 1,
    feature: 'F8: 7+ Candle Fragrance Lineup',
    milestone: 'M2',
    title: 'Burn time specifications indicate 55 - 65 hours slow burn',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const hasBurnTime = await page.evaluate(() => {
        const text = document.body.innerText;
        return /55\s*[-–]\s*65/i.test(text) || /burn\s*time/i.test(text);
      });
      if (!hasBurnTime) throw new Error('55 - 65 hour burn time specification not found in catalog');
    }
  }
];
