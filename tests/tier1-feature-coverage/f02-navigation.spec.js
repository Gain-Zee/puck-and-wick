/**
 * tests/tier1-feature-coverage/f02-navigation.spec.js
 * Feature 2: Sticky Navigation Bar
 * Minimum 5 test cases covering desktop sticky header, brand mark, links, and mobile drawer.
 */

export const tests = [
  {
    id: 'T1-F02-01',
    tier: 1,
    feature: 'F2: Sticky Navigation Bar',
    milestone: 'M1',
    title: 'Navigation header renders brand mark and essential section links',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const nav = page.locator(selectors.nav).first();
      await nav.waitFor({ state: 'visible', timeout: 5000 });

      const brand = page.locator(selectors.brandLogo).first();
      await brand.waitFor({ state: 'visible', timeout: 5000 });

      // Check section links exist
      const shopLink = page.locator(selectors.navLinks.shop).first();
      const storyLink = page.locator(selectors.navLinks.story).first();
      if (!(await shopLink.count()) || !(await storyLink.count())) {
        throw new Error('Header is missing essential section navigation links');
      }
    }
  },
  {
    id: 'T1-F02-02',
    tier: 1,
    feature: 'F2: Sticky Navigation Bar',
    milestone: 'M1',
    title: 'Header maintains fixed/sticky positioning during vertical page scroll',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);

      const isSticky = await page.evaluate((navSel) => {
        const header = document.querySelector(navSel);
        if (!header) return false;
        const style = window.getComputedStyle(header);
        const pos = style.position;
        const rect = header.getBoundingClientRect();
        return (pos === 'fixed' || pos === 'sticky') && rect.top <= 10;
      }, selectors.nav);

      if (!isSticky) {
        throw new Error('Header does not exhibit sticky or fixed positioning during scroll');
      }
    }
  },
  {
    id: 'T1-F02-03',
    tier: 1,
    feature: 'F2: Sticky Navigation Bar',
    milestone: 'M1',
    title: 'Section links target corresponding content anchors correctly',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const links = await page.evaluate((sel) => {
        const shop = document.querySelector(sel.navLinks.shop)?.getAttribute('href');
        const boxes = document.querySelector(sel.navLinks.exclusiveBoxes)?.getAttribute('href');
        const story = document.querySelector(sel.navLinks.story)?.getAttribute('href');
        const stockists = document.querySelector(sel.navLinks.stockists)?.getAttribute('href');
        return { shop, boxes, story, stockists };
      }, selectors);

      if (!links.shop?.includes('shop')) throw new Error('Shop link href does not point to #shop');
      if (!links.story?.includes('story')) throw new Error('Story link href does not point to #story');
    }
  },
  {
    id: 'T1-F02-04',
    tier: 1,
    feature: 'F2: Sticky Navigation Bar',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Mobile viewport displays hamburger toggle button',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const toggle = page.locator(selectors.mobileMenuToggle).first();
      await toggle.waitFor({ state: 'visible', timeout: 5000 });
      const isVisible = await toggle.isVisible();
      if (!isVisible) throw new Error('Mobile menu toggle button is not visible on 390x844 viewport');
    }
  },
  {
    id: 'T1-F02-05',
    tier: 1,
    feature: 'F2: Sticky Navigation Bar',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Clicking mobile hamburger toggle opens mobile navigation drawer with section links',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const toggle = page.locator(selectors.mobileMenuToggle).first();
      await toggle.click();
      await page.waitForTimeout(200);

      const mobileNavVisible = await page.evaluate((sel) => {
        const drawer = document.querySelector(sel.mobileNav);
        if (!drawer) return false;
        const style = window.getComputedStyle(drawer);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }, selectors);

      if (!mobileNavVisible) {
        throw new Error('Mobile navigation drawer did not open after clicking toggle');
      }
    }
  }
];
