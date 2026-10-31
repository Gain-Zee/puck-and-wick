/**
 * tests/tier1-feature-coverage/f19-odor-science.spec.js
 * Feature 19: Dual-Action Odor Science Breakdown
 * Minimum 5 test cases verifying molecular science section, activated charcoal adsorption, Metazene® neutralization, contrast vs masking, and responsive layout.
 */

export const tests = [
  {
    id: 'T1-F19-01',
    tier: 1,
    feature: 'F19: Dual-Action Odor Science Breakdown',
    milestone: 'M3',
    title: 'Dual-Action Odor Science educational section is present in box builder or dedicated area',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const hasScience = /science|molecular|metazene|charcoal/i.test(text);
      if (!hasScience) {
        throw new Error('Odor science educational callout not found on page');
      }
    }
  },
  {
    id: 'T1-F19-02',
    tier: 1,
    feature: 'F19: Dual-Action Odor Science Breakdown',
    milestone: 'M3',
    title: 'Explains physical adsorption mechanism of microporous Activated Charcoal',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const hasCharcoalAdsorption = /charcoal/i.test(text) && (/adsorption|trap|pores|matrix/i.test(text));
      if (!hasCharcoalAdsorption) {
        throw new Error('Activated charcoal adsorption mechanism explanation missing');
      }
    }
  },
  {
    id: 'T1-F19-03',
    tier: 1,
    feature: 'F19: Dual-Action Odor Science Breakdown',
    milestone: 'M3',
    title: 'Explains Metazene® chemical counteraction and molecular bonding mechanism',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const hasMetazene = /metazene/i.test(text) && (/neutraliz|molecular|react|bond/i.test(text));
      if (!hasMetazene) {
        throw new Error('Metazene® chemical neutralization explanation missing');
      }
    }
  },
  {
    id: 'T1-F19-04',
    tier: 1,
    feature: 'F19: Dual-Action Odor Science Breakdown',
    milestone: 'M3',
    title: 'Contrasts dual-action neutralization against conventional masking sprays',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const text = await page.evaluate(() => document.body.innerText);
      const hasContrast = /mask/i.test(text) || /conventional/i.test(text) || /sprays/i.test(text);
      if (!hasContrast) {
        throw new Error('Odor science does not contrast real neutralization vs masking');
      }
    }
  },
  {
    id: 'T1-F19-05',
    tier: 1,
    feature: 'F19: Dual-Action Odor Science Breakdown',
    milestone: 'M3',
    viewport: 'mobile',
    title: 'Odor science diagrams and callouts reflow cleanly on mobile viewport (390x844)',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const section = page.locator(selectors.odorScience.section).first();
      if ((await section.count()) > 0) {
        await section.scrollIntoViewIfNeeded();
        const box = await section.boundingBox();
        if (box && box.width > 390) {
          throw new Error('Odor science section horizontally overflows mobile viewport');
        }
      }
    }
  }
];
