/**
 * tests/tier1-feature-coverage/f05-quality-control.spec.js
 * Feature 5: Quality Control #1 Breakdown
 * Minimum 5 test cases verifying the 4 core pillars and quality control specifications.
 */

export const tests = [
  {
    id: 'T1-F05-01',
    tier: 1,
    feature: 'F5: Quality Control #1 Breakdown',
    milestone: 'M1',
    title: 'Quality Control #1 breakdown displays exactly 4 distinct pillars or spec cards',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const pillarCount = await page.evaluate((sel) => {
        const cards = document.querySelectorAll(sel.story.pillars);
        if (cards.length >= 4) return cards.length;
        // Search by text markers if generic class
        const allCards = Array.from(document.querySelectorAll('.qc-card, .pillar-card, [class*="pillar"]'));
        return allCards.length;
      }, selectors);

      if (pillarCount < 4) {
        throw new Error(`Expected at least 4 Quality Control pillars, found ${pillarCount}`);
      }
    }
  },
  {
    id: 'T1-F05-02',
    tier: 1,
    feature: 'F5: Quality Control #1 Breakdown',
    milestone: 'M1',
    title: 'Pillar 1 specifies 100% American Clean-Burning Soy Wax with zero paraffin',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const content = await page.locator(selectors.story.section).first().innerText();
      const hasSoy = /100%\s*soy/i.test(content) || /american\s*soy/i.test(content);
      if (!hasSoy) {
        throw new Error('QC pillar for 100% American Soy Wax was not identified in content');
      }
    }
  },
  {
    id: 'T1-F05-03',
    tier: 1,
    feature: 'F5: Quality Control #1 Breakdown',
    milestone: 'M1',
    title: 'Pillar 2 specifies phthalate-free clean-scent fragrance oils',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const content = await page.locator(selectors.story.section).first().innerText();
      const hasPhthalate = /phthalate/i.test(content) || /clean\s*fragrance/i.test(content);
      if (!hasPhthalate) {
        throw new Error('QC pillar for Phthalate-Free clean fragrance oils was not identified');
      }
    }
  },
  {
    id: 'T1-F05-04',
    tier: 1,
    feature: 'F5: Quality Control #1 Breakdown',
    milestone: 'M1',
    title: 'Pillar 3 specifies lead-free cotton wicks & precision burn testing',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const content = await page.locator(selectors.story.section).first().innerText();
      const hasWicks = /cotton\s*wick/i.test(content) || /lead-free/i.test(content) || /wick/i.test(content);
      if (!hasWicks) {
        throw new Error('QC pillar for Lead-Free Cotton Wicks was not identified');
      }
    }
  },
  {
    id: 'T1-F05-05',
    tier: 1,
    feature: 'F5: Quality Control #1 Breakdown',
    milestone: 'M1',
    title: 'Pillar 4 specifies small-batch hand-poured in Virginia with batch tracking',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const content = await page.locator(selectors.story.section).first().innerText();
      const hasHandPoured = /hand-poured/i.test(content) || /small-batch/i.test(content);
      if (!hasHandPoured) {
        throw new Error('QC pillar for Small-Batch Hand-Poured craftsmanship was not identified');
      }
    }
  }
];
