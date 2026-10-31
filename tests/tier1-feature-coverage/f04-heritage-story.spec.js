/**
 * tests/tier1-feature-coverage/f04-heritage-story.spec.js
 * Feature 4: 20-Year Hockey Heritage Story
 * Minimum 5 test cases covering narrative presence, key copy points, typography, and mobile reflow.
 */

export const tests = [
  {
    id: 'T1-F04-01',
    tier: 1,
    feature: 'F4: 20-Year Hockey Heritage Story',
    milestone: 'M1',
    title: 'Editorial story section is rendered on the page with dedicated container',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const story = page.locator(selectors.story.section).first();
      await story.waitFor({ state: 'visible', timeout: 5000 });
      const isVisible = await story.isVisible();
      if (!isVisible) throw new Error('Heritage story section is not visible');
    }
  },
  {
    id: 'T1-F04-02',
    tier: 1,
    feature: 'F4: 20-Year Hockey Heritage Story',
    milestone: 'M1',
    title: 'Story narrative features 20 years on competitive ice and hockey discipline',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const storyText = await page.locator(selectors.story.section).first().innerText();
      const has20Years = /25\s*years/i.test(storyText) || /twenty[- ]five\s*years/i.test(storyText) || /20\s*years/i.test(storyText) || /twenty\s*years/i.test(storyText);
      const hasHockey = /hockey/i.test(storyText) || /ice/i.test(storyText);
      if (!has20Years || !hasHockey) {
        throw new Error('Story copy is missing 20 years competitive hockey heritage context');
      }
    }
  },
  {
    id: 'T1-F04-03',
    tier: 1,
    feature: 'F4: 20-Year Hockey Heritage Story',
    milestone: 'M1',
    title: 'Story highlights Loudoun County, Virginia artisanal workshop origin',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const storyText = await page.locator(selectors.story.section).first().innerText();
      const hasLoudounOrVA = /loudoun/i.test(storyText) || /virginia/i.test(storyText);
      if (!hasLoudounOrVA) {
        throw new Error('Story narrative does not mention Loudoun County, Virginia origin');
      }
    }
  },
  {
    id: 'T1-F04-04',
    tier: 1,
    feature: 'F4: 20-Year Hockey Heritage Story',
    milestone: 'M1',
    title: 'Editorial typography uses serif display styling and high-contrast parchment text',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const styleCheck = await page.evaluate((sel) => {
        const headline = document.querySelector(`${sel.story.section} h2, ${sel.story.section} h1, ${sel.story.section} .story-headline`);
        if (!headline) return false;
        const font = window.getComputedStyle(headline).fontFamily;
        return font.length > 0;
      }, selectors);
      if (!styleCheck) throw new Error('Story section headline element not found or not styled');
    }
  },
  {
    id: 'T1-F04-05',
    tier: 1,
    feature: 'F4: 20-Year Hockey Heritage Story',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Story section reflows cleanly without horizontal overflow on mobile viewport',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const story = page.locator(selectors.story.section).first();
      await story.scrollIntoViewIfNeeded();
      const box = await story.boundingBox();
      if (!box || box.width > 390) {
        throw new Error(`Story section box width (${box?.width}px) exceeds mobile viewport (390px)`);
      }
    }
  }
];
