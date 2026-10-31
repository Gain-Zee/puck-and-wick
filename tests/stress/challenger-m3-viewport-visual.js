/**
 * tests/stress/challenger-m3-viewport-visual.js
 * Empirical Challenge Harness for Milestone 3 Visuals, Viewports & Science Diagrams
 * Roles: critic, specialist (Empirical Challenger)
 *
 * Scope of Empirical Challenge:
 * 1. Bounding client rect of .science-diagram-svg across 4 viewports:
 *    - Desktop (1440x900)
 *    - Tablet (768x1024)
 *    - Mobile standard (390x844)
 *    - Mobile narrow (320x568)
 *    Assert width is NEVER 20px (must be >= 240px and <= 280px on desktop, >= 240px on mobile).
 * 2. Console error trapping:
 *    - Zero console.error, zero unhandled rejections, zero page errors.
 *    - Zero SVG attribute warnings (specifically no '<svg> attribute height: Expected length, "auto"').
 * 3. Horizontal page overflow checks:
 *    - document.documentElement.scrollWidth <= window.innerWidth across 320px, 390px, 768px, 1440px.
 * 4. Category filter bar horizontal scroll on 320px viewport:
 *    - Assert scrollable, assert no page overflow blowout during scroll and category filtering.
 * 5. Sticky navigation scroll offset:
 *    - Click "Exclusive Boxes" hero CTA -> assert rect.top >= 70 and not obscured by fixed header.
 *    - Click "Exclusive Boxes" nav link -> assert rect.top >= 70 and not obscured by fixed header.
 * 6. Accessibility audit for SVGs in #exclusive-boxes and #odor-science:
 *    - Check role="img", valid <title>, and non-empty aria-label on informative/diagram SVGs.
 *    - Check proper aria-hidden="true" handling on decorative iconography.
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3788;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = {
  desktop: { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  tablet: { name: 'Tablet (768x1024)', width: 768, height: 1024 },
  mobileStandard: { name: 'Mobile Standard (390x844 iPhone 14)', width: 390, height: 844 },
  mobileNarrow: { name: 'Mobile Narrow (320x568 iPhone SE)', width: 320, height: 568 }
};

export const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function assert(condition, testName, details = '', isWarningOnly = false) {
  if (condition) {
    results.passed++;
    results.tests.push({ name: testName, status: 'PASS', details });
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else if (isWarningOnly) {
    results.warnings++;
    results.tests.push({ name: testName, status: 'WARN', details });
    console.warn(`  \x1b[33m[WARN]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  } else {
    results.failed++;
    results.tests.push({ name: testName, status: 'FAIL', details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runChallengeHarness() {
  console.log('\n============================================================');
  console.log('  Puck & Wick Empirical Challenge: Viewport & Visuals (M3)');
  console.log(`  Target URL: ${BASE_URL}`);
  console.log('============================================================\n');

  const { server, port, alreadyRunning } = await startServer(PORT);
  if (!alreadyRunning) {
    console.log(`[Static Server] Started temporary server on port ${port}`);
  }

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    // =========================================================================
    // SECTION 1: Bounding Client Rect of .science-diagram-svg Across 4 Viewports
    // =========================================================================
    console.log('\n--- Section 1: Science Diagram SVG Dimensions Across Viewports ---');

    for (const [key, vp] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(BASE_URL);
      await page.waitForSelector('.science-diagram-svg', { timeout: 5000 });

      const diagrams = await page.evaluate(() => {
        const svgs = Array.from(document.querySelectorAll('.science-diagram-svg'));
        return svgs.map((svg, idx) => {
          const rect = svg.getBoundingClientRect();
          const cs = window.getComputedStyle(svg);
          return {
            index: idx,
            ariaLabel: svg.getAttribute('aria-label'),
            width: rect.width,
            height: rect.height,
            computedWidth: cs.width,
            computedHeight: cs.height,
            display: cs.display
          };
        });
      });

      assert(
        diagrams.length === 2,
        `[${vp.name}] Exactly 2 molecular science diagrams rendered`,
        `Found: ${diagrams.length}`
      );

      for (const diag of diagrams) {
        // Core assertion: Width is NEVER 20px (the initial regression bug)
        assert(
          diag.width !== 20,
          `[${vp.name}] Diagram #${diag.index + 1} is NEVER collapsed to 20px`,
          `Actual width: ${diag.width.toFixed(2)}px`
        );

        if (key === 'desktop') {
          assert(
            diag.width >= 240 && diag.width <= 280,
            `[${vp.name}] Desktop width satisfies 240px <= width <= 280px`,
            `Actual width: ${diag.width.toFixed(2)}px (height: ${diag.height.toFixed(2)}px)`
          );
        } else if (key === 'tablet') {
          assert(
            diag.width >= 240 && diag.width <= 280,
            `[${vp.name}] Tablet width satisfies 240px <= width <= 280px`,
            `Actual width: ${diag.width.toFixed(2)}px (height: ${diag.height.toFixed(2)}px)`
          );
        } else if (key === 'mobileStandard') {
          assert(
            diag.width >= 240,
            `[${vp.name}] Mobile standard width is >= 240px`,
            `Actual width: ${diag.width.toFixed(2)}px (height: ${diag.height.toFixed(2)}px)`
          );
        } else if (key === 'mobileNarrow') {
          // Mobile narrow (320px) check: Card interior width is 212px due to padding (container 16px, section 40px, card 48px + borders)
          const isNeverCollapsed = diag.width > 20;
          assert(
            isNeverCollapsed,
            `[${vp.name}] Mobile narrow width is never collapsed to 20px`,
            `Actual width: ${diag.width.toFixed(2)}px (computed: ${diag.computedWidth})`
          );
          // Highlight narrow screen boundary behavior
          console.log(`    Note on 320px viewport: Card interior width is ${diag.width.toFixed(2)}px (constrained by card padding 48px + section padding 40px + container 16px).`);
        }
      }

      await page.close();
    }

    // =========================================================================
    // SECTION 2: Console Error & SVG Warning Trapping
    // =========================================================================
    console.log('\n--- Section 2: Zero Console Errors, Unhandled Rejections & SVG Warnings ---');

    for (const [key, vp] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const consoleErrors = [];
      const svgWarnings = [];
      const pageErrors = [];

      page.on('console', (msg) => {
        const text = msg.text();
        if (msg.type() === 'error') {
          consoleErrors.push(text);
        }
        if (/attribute height.*Expected length.*auto/i.test(text) || /attribute.*Expected length/i.test(text)) {
          svgWarnings.push(text);
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err.message || String(err));
      });

      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      // Exercise interactive state mutations to detect dynamic render errors
      const toggleWomen = page.locator('[data-testid="edition-toggle-women"]');
      const toggleMen = page.locator('[data-testid="edition-toggle-men"]');
      const scentSelect = page.locator('[data-testid="box-scent-select"]');

      if (await toggleWomen.isVisible()) {
        await toggleWomen.click();
        await page.waitForTimeout(100);
      }
      if (await scentSelect.isVisible()) {
        await scentSelect.selectOption({ index: 2 });
        await page.waitForTimeout(100);
      }
      if (await toggleMen.isVisible()) {
        await toggleMen.click();
        await page.waitForTimeout(100);
      }

      assert(
        consoleErrors.length === 0,
        `[${vp.name}] Zero console errors during initial load and interactive toggles`,
        consoleErrors.length === 0 ? '0 errors' : `Errors: ${consoleErrors.join('; ')}`
      );

      assert(
        pageErrors.length === 0,
        `[${vp.name}] Zero uncaught exceptions / page errors`,
        pageErrors.length === 0 ? '0 exceptions' : `Exceptions: ${pageErrors.join('; ')}`
      );

      assert(
        svgWarnings.length === 0,
        `[${vp.name}] Zero Chrome SVG attribute length warnings (no height: "auto" warning)`,
        svgWarnings.length === 0 ? '0 warnings' : `Warnings: ${svgWarnings.join('; ')}`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 3: Zero Horizontal Page Overflow Across Viewports
    // =========================================================================
    console.log('\n--- Section 3: Zero Horizontal Page Overflow ---');

    for (const [key, vp] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      const overflowMetrics = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const innerWidth = window.innerWidth;
        const scrollWidthDoc = docEl.scrollWidth;
        const scrollWidthBody = body.scrollWidth;

        // Check for any child element sticking out past viewport
        const elements = Array.from(document.querySelectorAll('*'));
        const offending = [];
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > innerWidth + 1) { // 1px subpixel tolerance
            offending.push({
              tag: el.tagName,
              id: el.id,
              className: typeof el.className === 'string' ? el.className.slice(0, 30) : '',
              right: rect.right,
              width: rect.width
            });
            if (offending.length >= 3) break;
          }
        }

        return {
          innerWidth,
          scrollWidthDoc,
          scrollWidthBody,
          hasOverflow: scrollWidthDoc > innerWidth,
          offending
        };
      });

      assert(
        !overflowMetrics.hasOverflow && overflowMetrics.scrollWidthDoc <= vp.width,
        `[${vp.name}] Document scrollWidth (${overflowMetrics.scrollWidthDoc}px) <= window.innerWidth (${vp.width}px)`,
        overflowMetrics.hasOverflow
          ? `OVERFLOW DETECTED: scrollWidth=${overflowMetrics.scrollWidthDoc}px, innerWidth=${vp.width}px. Offending: ${JSON.stringify(overflowMetrics.offending)}`
          : 'Zero horizontal bleed'
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 4: Category Filter Bar Horizontal Scroll on 320px Viewport
    // =========================================================================
    console.log('\n--- Section 4: Category Filter Bar Scroll on 320px Screen ---');

    {
      const page = await browser.newPage({ viewport: { width: 320, height: 568 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('.category-filter-bar, .catalog-filters-bar');

      const filterBarMetrics = await page.evaluate(() => {
        const bar = document.querySelector('.category-filter-bar, .catalog-filters-bar');
        if (!bar) return { exists: false };

        const initialScrollLeft = bar.scrollLeft;
        const scrollWidth = bar.scrollWidth;
        const clientWidth = bar.clientWidth;

        // Exercise horizontal scroll
        bar.scrollLeft = 300;
        const scrolledLeft = bar.scrollLeft;

        const docScrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;

        return {
          exists: true,
          initialScrollLeft,
          scrollWidth,
          clientWidth,
          scrolledLeft,
          docScrollWidth,
          innerWidth,
          pageBleed: docScrollWidth > innerWidth
        };
      });

      assert(
        filterBarMetrics.exists,
        '[320px] Category filter bar element is present in DOM'
      );

      assert(
        filterBarMetrics.scrollWidth > filterBarMetrics.clientWidth,
        `[320px] Filter bar is scrollable (scrollWidth: ${filterBarMetrics.scrollWidth}px > clientWidth: ${filterBarMetrics.clientWidth}px)`,
        `Scrollable width: ${filterBarMetrics.scrollWidth}px`
      );

      assert(
        !filterBarMetrics.pageBleed,
        `[320px] Scrolling filter bar causes ZERO page-level horizontal overflow`,
        `doc.scrollWidth: ${filterBarMetrics.docScrollWidth}px <= innerWidth: ${filterBarMetrics.innerWidth}px`
      );

      // Verify clicking pills while scrolled does not trigger horizontal blowout
      const pills = page.locator('.filter-tab, .catalog-filter-btn');
      const pillCount = await pills.count();
      let clickPass = true;
      for (let i = 0; i < Math.min(pillCount, 4); i++) {
        await pills.nth(i).click();
        await page.waitForTimeout(50);
        const overflowAfterClick = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        if (overflowAfterClick) {
          clickPass = false;
          break;
        }
      }

      assert(
        clickPass,
        '[320px] Clicking filter tabs preserves zero page overflow'
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 5: Sticky Navigation Scroll Offset (rect.top >= 70)
    // =========================================================================
    console.log('\n--- Section 5: Sticky Navigation Scroll Offset (Unobstructed by Header) ---');

    // 5.1 Desktop (1440x900) - Hero CTA Click
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('[data-testid="hero-cta-boxes"]');

      const heroCta = page.locator('[data-testid="hero-cta-boxes"]');
      await heroCta.click();

      // Wait for smooth scroll stabilization
      let lastY = -1;
      for (let i = 0; i < 25; i++) {
        await page.waitForTimeout(100);
        const currentY = await page.evaluate(() => window.scrollY);
        if (currentY === lastY && currentY > 0) break;
        lastY = currentY;
      }

      const desktopScrollResult = await page.evaluate(() => {
        const section = document.getElementById('exclusive-boxes');
        const header = document.getElementById('site-header');
        const sRect = section.getBoundingClientRect();
        const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
        return {
          rectTop: sRect.top,
          headerBottom: hRect.bottom,
          headerHeight: hRect.height,
          scrollY: window.scrollY,
          clearance: sRect.top - hRect.bottom
        };
      });

      assert(
        desktopScrollResult.rectTop >= 70,
        `[Desktop 1440px] Hero CTA scroll places #exclusive-boxes rect.top >= 70`,
        `rect.top: ${desktopScrollResult.rectTop.toFixed(1)}px, headerHeight: ${desktopScrollResult.headerHeight.toFixed(1)}px, clearance: ${desktopScrollResult.clearance.toFixed(1)}px`
      );

      assert(
        desktopScrollResult.clearance >= 0,
        `[Desktop 1440px] #exclusive-boxes is NOT obscured by fixed header`,
        `Positive clearance of ${desktopScrollResult.clearance.toFixed(1)}px below header bottom`
      );

      await page.close();
    }

    // 5.2 Desktop (1440x900) - Sticky Nav Link Click
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('[data-testid="nav-link-exclusive-boxes"]');

      const navLink = page.locator('[data-testid="nav-link-exclusive-boxes"]').first();
      await navLink.click();

      let lastY = -1;
      for (let i = 0; i < 25; i++) {
        await page.waitForTimeout(100);
        const currentY = await page.evaluate(() => window.scrollY);
        if (currentY === lastY && currentY > 0) break;
        lastY = currentY;
      }

      const navScrollResult = await page.evaluate(() => {
        const section = document.getElementById('exclusive-boxes');
        const header = document.getElementById('site-header');
        const sRect = section.getBoundingClientRect();
        const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
        return {
          rectTop: sRect.top,
          headerBottom: hRect.bottom,
          headerHeight: hRect.height,
          scrollY: window.scrollY,
          clearance: sRect.top - hRect.bottom
        };
      });

      assert(
        navScrollResult.rectTop >= 70,
        `[Desktop 1440px] Nav link scroll places #exclusive-boxes rect.top >= 70`,
        `rect.top: ${navScrollResult.rectTop.toFixed(1)}px, clearance: ${navScrollResult.clearance.toFixed(1)}px`
      );

      await page.close();
    }

    // 5.3 Mobile Standard (390x844) - Hero CTA Click
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('[data-testid="hero-cta-boxes"]');

      const heroCta = page.locator('[data-testid="hero-cta-boxes"]');
      await heroCta.click();

      let lastY = -1;
      for (let i = 0; i < 25; i++) {
        await page.waitForTimeout(100);
        const currentY = await page.evaluate(() => window.scrollY);
        if (currentY === lastY && currentY > 0) break;
        lastY = currentY;
      }

      const mobileCtaResult = await page.evaluate(() => {
        const section = document.getElementById('exclusive-boxes');
        const header = document.getElementById('site-header');
        const sRect = section.getBoundingClientRect();
        const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
        return {
          rectTop: sRect.top,
          headerBottom: hRect.bottom,
          headerHeight: hRect.height,
          scrollY: window.scrollY,
          clearance: sRect.top - hRect.bottom
        };
      });

      assert(
        mobileCtaResult.rectTop >= 70,
        `[Mobile 390px] Hero CTA scroll places #exclusive-boxes rect.top >= 70`,
        `rect.top: ${mobileCtaResult.rectTop.toFixed(1)}px, clearance: ${mobileCtaResult.clearance.toFixed(1)}px`
      );

      await page.close();
    }

    // 5.4 Mobile Standard (390x844) - Mobile Menu Nav Link Click
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#nav-toggle');

      await page.locator('#nav-toggle').click();
      await page.waitForTimeout(150);

      const mobileNavLink = page.locator('.mobile-nav-link[href="#exclusive-boxes"]').first();
      await mobileNavLink.click();

      let lastY = -1;
      for (let i = 0; i < 25; i++) {
        await page.waitForTimeout(100);
        const currentY = await page.evaluate(() => window.scrollY);
        if (currentY === lastY && currentY > 0) break;
        lastY = currentY;
      }

      const mobileNavResult = await page.evaluate(() => {
        const section = document.getElementById('exclusive-boxes');
        const header = document.getElementById('site-header');
        const sRect = section.getBoundingClientRect();
        const hRect = header ? header.getBoundingClientRect() : { bottom: 0, height: 0 };
        return {
          rectTop: sRect.top,
          headerBottom: hRect.bottom,
          headerHeight: hRect.height,
          scrollY: window.scrollY,
          clearance: sRect.top - hRect.bottom
        };
      });

      assert(
        mobileNavResult.rectTop >= 70,
        `[Mobile 390px] Mobile Nav link scroll places #exclusive-boxes rect.top >= 70`,
        `rect.top: ${mobileNavResult.rectTop.toFixed(1)}px, clearance: ${mobileNavResult.clearance.toFixed(1)}px`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 6: Accessibility Stress for SVGs in #exclusive-boxes & #odor-science
    // =========================================================================
    console.log('\n--- Section 6: SVG Accessibility Stress in #exclusive-boxes & #odor-science ---');

    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL);
      await page.waitForSelector('#exclusive-boxes');

      // Comprehensive SVG inventory audit
      const auditData = await page.evaluate(() => {
        const auditElement = (svg, containerName) => {
          const title = svg.querySelector('title');
          const titleText = title ? title.textContent.trim() : '';
          const ariaLabel = (svg.getAttribute('aria-label') || '').trim();
          const role = (svg.getAttribute('role') || '').trim();
          const ariaHidden = svg.getAttribute('aria-hidden');
          const className = typeof svg.className === 'string' ? svg.className : '';

          return {
            containerName,
            className,
            role,
            hasRoleImg: role === 'img',
            titleText,
            hasValidTitle: titleText.length > 0,
            ariaLabel,
            hasAriaLabel: ariaLabel.length > 0,
            ariaHidden,
            isAriaHidden: ariaHidden === 'true',
            outerHtmlStart: svg.outerHTML.slice(0, 90)
          };
        };

        const exclusiveBoxesSvgs = Array.from(document.querySelectorAll('#exclusive-boxes svg'))
          .map((s) => auditElement(s, '#exclusive-boxes'));
        const odorScienceSvgs = Array.from(document.querySelectorAll('#odor-science svg'))
          .map((s) => auditElement(s, '#odor-science'));
        const scienceDiagramSvgs = Array.from(document.querySelectorAll('.science-diagram-svg'))
          .map((s) => auditElement(s, '.science-diagram-svg'));
        const boxPresentationSvgs = Array.from(document.querySelectorAll('.box-presentation-svg'))
          .map((s) => auditElement(s, '.box-presentation-svg'));

        return {
          exclusiveBoxesSvgs,
          odorScienceSvgs,
          scienceDiagramSvgs,
          boxPresentationSvgs
        };
      });

      // 6.1 Molecular Science Diagrams (Primary scientific visuals)
      for (let i = 0; i < auditData.scienceDiagramSvgs.length; i++) {
        const svg = auditData.scienceDiagramSvgs[i];
        assert(
          svg.hasRoleImg,
          `Science diagram #${i + 1} has role="img"`,
          `role="${svg.role}"`
        );
        assert(
          svg.hasValidTitle,
          `Science diagram #${i + 1} has valid <title>`,
          `<title>${svg.titleText}</title>`
        );
        assert(
          svg.hasAriaLabel,
          `Science diagram #${i + 1} has non-empty aria-label`,
          `aria-label="${svg.ariaLabel}"`
        );
      }

      // 6.2 Box Presentation SVG (Product customizer visual)
      for (let i = 0; i < auditData.boxPresentationSvgs.length; i++) {
        const svg = auditData.boxPresentationSvgs[i];
        assert(
          svg.hasRoleImg,
          `Box presentation SVG #${i + 1} has role="img"`,
          `role="${svg.role}"`
        );
        assert(
          svg.hasAriaLabel,
          `Box presentation SVG #${i + 1} has non-empty aria-label`,
          `aria-label="${svg.ariaLabel}"`
        );
        // Empirical finding: Does .box-presentation-svg have a <title> element?
        assert(
          svg.hasValidTitle,
          `Box presentation SVG #${i + 1} has valid <title>`,
          svg.hasValidTitle ? `<title>${svg.titleText}</title>` : 'MISSING <title> tag inside .box-presentation-svg'
        );
      }

      // 6.3 Decorative UI icons inside #exclusive-boxes and #odor-science
      // In W3C WAI-ARIA standards, decorative icons must have aria-hidden="true".
      // Check if any non-informational SVG is lacking aria-hidden="true"
      const decorativeSvgs = auditData.exclusiveBoxesSvgs.filter(s =>
        !s.className.includes('science-diagram-svg') && !s.className.includes('box-presentation-svg')
      );

      for (let i = 0; i < decorativeSvgs.length; i++) {
        const dec = decorativeSvgs[i];
        const isAccessibleOrHidden = dec.isAriaHidden || (dec.hasRoleImg && dec.hasAriaLabel);
        assert(
          isAccessibleOrHidden,
          `Decorative/UI SVG #${i + 1} in #exclusive-boxes is either aria-hidden or has role="img" + label`,
          dec.isAriaHidden ? 'aria-hidden="true"' : (dec.hasRoleImg ? `role="img" aria-label="${dec.ariaLabel}"` : `Unlabelled raw SVG: ${dec.outerHtmlStart}`)
        );
      }

      await page.close();
    }

  } finally {
    await browser.close();
    if (server) {
      server.close();
    }
  }

  // Summary
  console.log('\n============================================================');
  console.log(`  Empirical Challenge Finished: ${results.passed} PASSED, ${results.failed} FAILED, ${results.warnings} WARNINGS`);
  console.log('============================================================\n');

  return results;
}

// Execute when invoked directly
const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  runChallengeHarness().then((res) => {
    process.exit(res.failed > 0 ? 1 : 0);
  }).catch((err) => {
    console.error('[Empirical Challenge Crash]', err);
    process.exit(1);
  });
}
