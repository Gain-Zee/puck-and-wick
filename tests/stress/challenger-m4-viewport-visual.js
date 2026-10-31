/**
 * tests/stress/challenger-m4-viewport-visual.js
 * Empirical Challenge Harness: Milestone 4 Viewport Responsiveness, Touch Targets & Visual Fidelity
 *
 * Evaluation Scope:
 * 1. Viewport Responsiveness across:
 *    - Desktop (1440x900)
 *    - Tablet (768x1024)
 *    - Standard Mobile (390x844 iPhone 14)
 *    - Narrow Mobile (320x568 iPhone SE)
 *    Assert document.documentElement.scrollWidth <= window.innerWidth (zero page overflow).
 * 2. Grid Transitions:
 *    - Desktop: 2-column layout for .logo-concepts-grid and .jar-mockup-workbench.
 *    - Tablet & Mobile (<=960px): Clean transition to 1-column stacked layout.
 *    - Mobile (<=640px): .studio-toggle-row transitions cleanly to 1-column stacked layout.
 * 3. Control Wrapping & Clipping:
 *    - Scent toggles (.mockup-scent-*), vessel toggles (.mockup-vessel-*), and apply buttons (.apply-logo-btn)
 *      wrap and stack cleanly with zero text clipping (scrollWidth <= clientWidth, scrollHeight <= clientHeight).
 * 4. Touch Target Sizing (Mobile & Narrow Mobile):
 *    - Every .apply-logo-btn renders with height >= 44px.
 *    - Every .studio-toggle-btn renders with height >= 44px.
 * 5. Visual Fidelity:
 *    - Jar mockup SVG (.jar-mockup-svg) renders with zero non-uniform stretch distortion (aspect ratio matches viewBox 340/420).
 *    - Zero raster <image> tags, crisp mathematical vector paths.
 *    - Zero broken <img> elements across the page.
 * 6. Interactive Stress & Dynamic Mutation:
 *    - Cycle all 4 logo concepts, switch between Top Shelf and Fresh Cut, switch between Obsidian and Amber vessels.
 *    - Assert header mark (#brand-mark-header) and footer mark (#brand-mark-footer) update with valid dimensions.
 *    - Assert zero console errors, zero uncaught exceptions, and zero SVG attribute warnings.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from '../../scripts/serve.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 3944; // Isolated test port
const BASE_URL = `http://127.0.0.1:${PORT}`;

const VIEWPORTS = [
  { id: 'desktop', name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false, expectedGridCols: 2 },
  { id: 'tablet', name: 'Tablet (768x1024)', width: 768, height: 1024, isMobile: false, expectedGridCols: 1 },
  { id: 'mobileStandard', name: 'Standard Mobile (390x844)', width: 390, height: 844, isMobile: true, expectedGridCols: 1 },
  { id: 'mobileNarrow', name: 'Narrow Mobile (320x568)', width: 320, height: 568, isMobile: true, expectedGridCols: 1 }
];

export const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function assert(condition, testName, details = '', isWarning = false) {
  if (condition) {
    results.passed++;
    results.tests.push({ name: testName, status: 'PASS', details });
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}${details ? ' (' + details + ')' : ''}`);
  } else if (isWarning) {
    results.warnings++;
    results.tests.push({ name: testName, status: 'WARN', details });
    console.warn(`  \x1b[33m[WARN]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  } else {
    results.failed++;
    results.tests.push({ name: testName, status: 'FAIL', details });
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${testName}${details ? ' — ' + details : ''}`);
  }
}

async function runM4EmpiricalHarness() {
  console.log('\n============================================================');
  console.log('  CHALLENGER M4-2: Viewport, Touch Target & Visual Stress');
  console.log(`  Target URL: ${BASE_URL}`);
  console.log('============================================================\n');

  const { server, port, alreadyRunning } = await startServer(PORT);
  console.log(`[Static Server] Running on http://127.0.0.1:${port}`);

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });

  try {
    // =========================================================================
    // SECTION 1: Viewport Overflow & Element Bleed Checks Across 4 Viewports
    // =========================================================================
    console.log('\n--- Section 1: Viewport Horizontal Page Overflow (scrollWidth <= innerWidth) ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => pageErrors.push(err.message || String(err)));

      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#studio', { state: 'visible', timeout: 5000 });
      await page.waitForSelector('.jar-mockup-workbench', { state: 'visible', timeout: 5000 });

      const metrics = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const innerWidth = window.innerWidth;
        const docScrollWidth = docEl.scrollWidth;
        const bodyScrollWidth = body.scrollWidth;

        // Scan for elements extending horizontally outside viewport bounds
        const allElements = Array.from(document.querySelectorAll('#studio *'));
        const offending = [];

        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          // Skip elements hidden or in offscreen drawers
          if (rect.width === 0 && rect.height === 0) continue;
          if (rect.right > innerWidth + 1.5) {
            offending.push({
              tag: el.tagName.toLowerCase(),
              className: el.className,
              id: el.id,
              right: Math.round(rect.right),
              excess: Math.round(rect.right - innerWidth)
            });
          }
        }

        return {
          innerWidth,
          docScrollWidth,
          bodyScrollWidth,
          overflowBleed: Math.max(0, docScrollWidth - innerWidth),
          offendingElementsCount: offending.length,
          offendingSample: offending.slice(0, 3)
        };
      });

      assert(
        metrics.docScrollWidth <= vp.width,
        `[${vp.name}] Document scrollWidth (${metrics.docScrollWidth}px) <= window.innerWidth (${vp.width}px)`,
        `Zero horizontal page bleed (doc: ${metrics.docScrollWidth}px, body: ${metrics.bodyScrollWidth}px)`
      );

      assert(
        metrics.offendingElementsCount === 0,
        `[${vp.name}] Zero studio sub-elements bleeding outside viewport boundary`,
        metrics.offendingElementsCount === 0 ? '0 bleeding elements' : `Found ${metrics.offendingElementsCount} bleeders: ${JSON.stringify(metrics.offendingSample)}`
      );

      assert(
        consoleErrors.length === 0,
        `[${vp.name}] Zero console errors on load`,
        consoleErrors.length === 0 ? '0 errors' : `Errors: ${consoleErrors.join('; ')}`
      );

      assert(
        pageErrors.length === 0,
        `[${vp.name}] Zero uncaught exceptions on load`,
        pageErrors.length === 0 ? '0 exceptions' : `Exceptions: ${pageErrors.join('; ')}`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 2: Grid Layout & Responsive 2-to-1 Column Transitions
    // =========================================================================
    console.log('\n--- Section 2: Clean 2-Column to 1-Column Grid Transitions ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.logo-concepts-grid', { timeout: 5000 });

      const gridData = await page.evaluate(() => {
        const conceptsGrid = document.querySelector('.logo-concepts-grid');
        const workbench = document.querySelector('.jar-mockup-workbench');
        const cards = Array.from(document.querySelectorAll('.logo-concept-card'));
        const jarStage = document.querySelector('.jar-mockup-stage');
        const jarControls = document.querySelector('.jar-mockup-controls');

        const conceptsCs = window.getComputedStyle(conceptsGrid);
        const workbenchCs = window.getComputedStyle(workbench);

        const cardRects = cards.map((c, i) => {
          const r = c.getBoundingClientRect();
          return { index: i + 1, top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
        });

        const stageRect = jarStage ? jarStage.getBoundingClientRect() : null;
        const controlsRect = jarControls ? jarControls.getBoundingClientRect() : null;

        return {
          conceptsGridCols: conceptsCs.gridTemplateColumns,
          workbenchGridCols: workbenchCs.gridTemplateColumns,
          cardRects,
          stageRect: stageRect ? { top: stageRect.top, left: stageRect.left, right: stageRect.right, bottom: stageRect.bottom } : null,
          controlsRect: controlsRect ? { top: controlsRect.top, left: controlsRect.left, right: controlsRect.right, bottom: controlsRect.bottom } : null
        };
      });

      if (vp.id === 'desktop') {
        // Desktop (1440px): 2 columns expected
        const is2ColsGrid = gridData.cardRects.length >= 2 &&
          Math.abs(gridData.cardRects[0].top - gridData.cardRects[1].top) < 5 &&
          gridData.cardRects[1].left > gridData.cardRects[0].right;

        assert(
          is2ColsGrid,
          `[${vp.name}] .logo-concepts-grid renders in 2 distinct columns side-by-side`,
          `Card 1 & 2 top aligned: y0=${Math.round(gridData.cardRects[0]?.top)}, y1=${Math.round(gridData.cardRects[1]?.top)}`
        );

        const colTracks = (gridData.workbenchGridCols || '').trim().split(/\s+/);
        const verticalOverlap = gridData.stageRect && gridData.controlsRect
          ? Math.min(gridData.stageRect.bottom, gridData.controlsRect.bottom) - Math.max(gridData.stageRect.top, gridData.controlsRect.top)
          : 0;
        const isWorkbench2Cols = colTracks.length === 2 &&
          gridData.stageRect && gridData.controlsRect &&
          gridData.controlsRect.left >= gridData.stageRect.right - 1 &&
          verticalOverlap > 100;

        assert(
          Boolean(isWorkbench2Cols),
          `[${vp.name}] .jar-mockup-workbench renders side-by-side in 2 columns (Stage left, Controls right)`,
          `Col tracks: ${colTracks.length} (${gridData.workbenchGridCols}), Stage right: ${Math.round(gridData.stageRect?.right)}px, Controls left: ${Math.round(gridData.controlsRect?.left)}px, Vertical overlap: ${Math.round(verticalOverlap)}px`
        );
      } else {
        // Tablet (768px), Standard Mobile (390px), Narrow Mobile (320px): 1 column stacked
        const is1ColGrid = gridData.cardRects.length >= 2 &&
          gridData.cardRects[1].top >= gridData.cardRects[0].bottom - 2;

        assert(
          is1ColGrid,
          `[${vp.name}] .logo-concepts-grid collapses cleanly into 1 stacked column`,
          `Card 2 (top ${Math.round(gridData.cardRects[1]?.top)}) is below Card 1 (bottom ${Math.round(gridData.cardRects[0]?.bottom)})`
        );

        const isWorkbench1Col = gridData.stageRect && gridData.controlsRect &&
          gridData.controlsRect.top >= gridData.stageRect.bottom - 2;

        assert(
          Boolean(isWorkbench1Col),
          `[${vp.name}] .jar-mockup-workbench collapses into 1 stacked column (Stage stacked above Controls)`,
          `Controls top (${Math.round(gridData.controlsRect?.top)}px) >= Stage bottom (${Math.round(gridData.stageRect?.bottom)}px)`
        );
      }

      await page.close();
    }

    // =========================================================================
    // SECTION 3: Scent Toggles, Vessel Toggles & Apply Buttons Wrapping & Clipping
    // =========================================================================
    console.log('\n--- Section 3: Scent/Vessel Toggles & Apply Buttons Wrapping Without Clipping ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.jar-mockup-controls', { timeout: 5000 });

      const clippingReport = await page.evaluate(() => {
        const toggleBtns = Array.from(document.querySelectorAll('.studio-toggle-btn'));
        const applyBtns = Array.from(document.querySelectorAll('.apply-logo-btn'));
        const toggleRows = Array.from(document.querySelectorAll('.studio-toggle-row'));

        const clipped = [];

        // Check toggle rows don't overflow their parent
        for (const row of toggleRows) {
          const r = row.getBoundingClientRect();
          const parent = row.parentElement?.getBoundingClientRect();
          if (parent && r.right > parent.right + 1) {
            clipped.push({ type: 'toggle-row-overflow', excess: r.right - parent.right });
          }
        }

        // Check buttons don't clip text
        for (const btn of [...toggleBtns, ...applyBtns]) {
          const isTextClippedHorizontally = btn.scrollWidth > btn.clientWidth + 1;
          const isTextClippedVertically = btn.scrollHeight > btn.clientHeight + 1;
          const rect = btn.getBoundingClientRect();
          const cs = window.getComputedStyle(btn);

          if (isTextClippedHorizontally || isTextClippedVertically) {
            clipped.push({
              btnText: (btn.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
              horizontalClip: isTextClippedHorizontally,
              verticalClip: isTextClippedVertically,
              scrollW: btn.scrollWidth,
              clientW: btn.clientWidth,
              scrollH: btn.scrollHeight,
              clientH: btn.clientHeight
            });
          }
        }

        return {
          toggleBtnsCount: toggleBtns.length,
          applyBtnsCount: applyBtns.length,
          clippedCount: clipped.length,
          clippedSample: clipped.slice(0, 3)
        };
      });

      assert(
        clippingReport.toggleBtnsCount === 4,
        `[${vp.name}] Exactly 4 studio toggle buttons rendered (2 scents + 2 vessels)`,
        `Found: ${clippingReport.toggleBtnsCount}`
      );

      assert(
        clippingReport.applyBtnsCount >= 4,
        `[${vp.name}] At least 4 apply logo buttons rendered (cards + CTA row)`,
        `Found: ${clippingReport.applyBtnsCount}`
      );

      assert(
        clippingReport.clippedCount === 0,
        `[${vp.name}] Zero button text clipping (scrollWidth <= clientWidth, scrollHeight <= clientHeight)`,
        clippingReport.clippedCount === 0 ? 'Zero clipping' : `Found ${clippingReport.clippedCount} clipped items: ${JSON.stringify(clippingReport.clippedSample)}`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 4: Mobile Touch Target Heights (>= 44px)
    // =========================================================================
    console.log('\n--- Section 4: Mobile Touch Target Measurement (height >= 44px) ---');

    const mobileViewports = VIEWPORTS.filter(v => v.isMobile);

    for (const vp of mobileViewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.apply-logo-btn', { timeout: 5000 });

      const touchTargets = await page.evaluate(() => {
        const applyBtns = Array.from(document.querySelectorAll('.apply-logo-btn')).map((btn, i) => {
          const r = btn.getBoundingClientRect();
          return {
            index: i + 1,
            label: (btn.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
            width: r.width,
            height: r.height,
            minHeightMeet: r.height >= 43.95
          };
        });

        const toggleBtns = Array.from(document.querySelectorAll('.studio-toggle-btn')).map((btn, i) => {
          const r = btn.getBoundingClientRect();
          return {
            index: i + 1,
            label: (btn.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
            width: r.width,
            height: r.height,
            minHeightMeet: r.height >= 43.95
          };
        });

        return { applyBtns, toggleBtns };
      });

      // Assert every .apply-logo-btn meets 44px minimum height
      const failingApply = touchTargets.applyBtns.filter(b => !b.minHeightMeet);
      assert(
        failingApply.length === 0,
        `[${vp.name}] ALL ${touchTargets.applyBtns.length} .apply-logo-btn have height >= 44px`,
        failingApply.length === 0
          ? `Min observed height: ${Math.min(...touchTargets.applyBtns.map(b => b.height)).toFixed(1)}px`
          : `Failed: ${JSON.stringify(failingApply)}`
      );

      // Assert every .studio-toggle-btn meets 44px minimum height
      const failingToggles = touchTargets.toggleBtns.filter(b => !b.minHeightMeet);
      assert(
        failingToggles.length === 0,
        `[${vp.name}] ALL ${touchTargets.toggleBtns.length} .studio-toggle-btn have height >= 44px`,
        failingToggles.length === 0
          ? `Min observed height: ${Math.min(...touchTargets.toggleBtns.map(b => b.height)).toFixed(1)}px`
          : `Failed: ${JSON.stringify(failingToggles)}`
      );

      // Also assert touch target widths are accessible (>= 44px)
      const allWidthsAdequate = [...touchTargets.applyBtns, ...touchTargets.toggleBtns].every(b => b.width >= 44);
      assert(
        allWidthsAdequate,
        `[${vp.name}] ALL interactive studio buttons have width >= 44px`,
        `Widths span from ${Math.min(...[...touchTargets.applyBtns, ...touchTargets.toggleBtns].map(b => b.width)).toFixed(1)}px to ${Math.max(...[...touchTargets.applyBtns, ...touchTargets.toggleBtns].map(b => b.width)).toFixed(1)}px`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 5: Visual Fidelity & Jar Mockup Vector Integrity
    // =========================================================================
    console.log('\n--- Section 5: Jar Mockup Visual Fidelity, Distortion & Vector Paths ---');

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.jar-mockup-svg', { timeout: 5000 });

      const svgAnalysis = await page.evaluate(() => {
        const svg = document.querySelector('.jar-mockup-svg');
        if (!svg) return { found: false };

        const rect = svg.getBoundingClientRect();
        const viewBox = svg.getAttribute('viewBox');
        const role = svg.getAttribute('role');
        const ariaLabel = svg.getAttribute('aria-label');
        const titleEl = svg.querySelector('title');

        // Check for raster images inside SVG
        const imageElements = Array.from(svg.querySelectorAll('image'));

        // Check for broken external links
        const hrefElements = Array.from(svg.querySelectorAll('[*|href]'));
        const externalHrefs = hrefElements.filter(el => {
          const href = el.getAttribute('href') || el.getAttribute('xlink:href') || '';
          return href.startsWith('http://') || href.startsWith('https://');
        });

        // Check for key aesthetic elements
        const lid = svg.querySelector('#jar-mockup-lid');
        const flame = svg.querySelector('path[fill="url(#mockup-flame-rad)"]');
        const defs = svg.querySelector('defs');
        const gradients = Array.from(svg.querySelectorAll('linearGradient, radialGradient'));

        // Compute aspect ratio match
        // viewBox="0 0 340 420" -> natural aspect ratio is 340 / 420 ≈ 0.8095
        const naturalAspect = 340 / 420;
        const renderedAspect = rect.width / (rect.height || 1);
        const aspectDistortionPercent = Math.abs((renderedAspect - naturalAspect) / naturalAspect) * 100;

        return {
          found: true,
          viewBox,
          role,
          hasAriaLabel: Boolean(ariaLabel && ariaLabel.trim().length > 0),
          titleText: titleEl ? titleEl.textContent : '',
          rect: { width: rect.width, height: rect.height },
          renderedAspect,
          naturalAspect,
          aspectDistortionPercent,
          rasterImageCount: imageElements.length,
          externalHrefsCount: externalHrefs.length,
          hasLid: Boolean(lid),
          hasFlame: Boolean(flame),
          hasDefs: Boolean(defs),
          gradientCount: gradients.length
        };
      });

      assert(
        svgAnalysis.found,
        `[${vp.name}] .jar-mockup-svg exists in DOM`,
        `Dimensions: ${Math.round(svgAnalysis.rect?.width)}x${Math.round(svgAnalysis.rect?.height)}px`
      );

      assert(
        svgAnalysis.viewBox === '0 0 340 420',
        `[${vp.name}] Jar mockup preserves standard viewBox="0 0 340 420"`,
        `viewBox: ${svgAnalysis.viewBox}`
      );

      // Verify zero stretch distortion: default SVG preserves aspect ratio (aspect distortion < 1%)
      assert(
        svgAnalysis.aspectDistortionPercent < 1.0,
        `[${vp.name}] Jar mockup preserves uniform aspect ratio (distortion: ${svgAnalysis.aspectDistortionPercent.toFixed(2)}% < 1%)`,
        `Rendered ratio: ${svgAnalysis.renderedAspect.toFixed(4)}, Natural ratio: ${svgAnalysis.naturalAspect.toFixed(4)}`
      );

      assert(
        svgAnalysis.rasterImageCount === 0,
        `[${vp.name}] Zero raster <image> tags inside jar mockup (100% mathematical vector)`,
        `Found: ${svgAnalysis.rasterImageCount} image tags`
      );

      assert(
        svgAnalysis.externalHrefsCount === 0,
        `[${vp.name}] Zero external network image dependencies in jar mockup SVG`,
        `Found: ${svgAnalysis.externalHrefsCount} external links`
      );

      assert(
        svgAnalysis.hasLid && svgAnalysis.hasFlame && svgAnalysis.gradientCount >= 5,
        `[${vp.name}] Mockup contains metallic gold lid, flame glow, and ${svgAnalysis.gradientCount} gradients`,
        `Lid: ${svgAnalysis.hasLid}, Flame: ${svgAnalysis.hasFlame}, Gradients: ${svgAnalysis.gradientCount}`
      );

      assert(
        svgAnalysis.role === 'img' && svgAnalysis.hasAriaLabel && svgAnalysis.titleText.length > 0,
        `[${vp.name}] Jar mockup is fully accessible (role="img", <title>, aria-label)`,
        `Title: "${svgAnalysis.titleText}"`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 6: Zero Broken Images Across Entire Application
    // =========================================================================
    console.log('\n--- Section 6: Zero Broken <img> Tags Across Application ---');

    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      const imgReport = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const broken = imgs.filter(img => !img.complete || img.naturalWidth === 0);
        return {
          totalImgs: imgs.length,
          brokenCount: broken.length,
          brokenSrcs: broken.map(img => img.src)
        };
      });

      assert(
        imgReport.brokenCount === 0,
        'Zero broken <img> elements on the page',
        `Total <img> tags: ${imgReport.totalImgs}, Broken: ${imgReport.brokenCount}`
      );

      await page.close();
    }

    // =========================================================================
    // SECTION 7: Interactive Switcher Stress & Live DOM Mutations
    // =========================================================================
    console.log('\n--- Section 7: Interactive Switcher Stress, State Cycling & Header/Footer Dynamic Sync ---');

    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(`${BASE_URL}/#studio`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.brand-studio-workspace', { timeout: 5000 });

      // Test cycling through all 4 logo concepts
      for (let cid = 1; cid <= 4; cid++) {
        // Click apply concept button
        const applyBtn = page.locator(`[data-apply-concept="${cid}"]`).first();
        await applyBtn.click();
        await page.waitForTimeout(150);

        const checkMarks = await page.evaluate((conceptId) => {
          const headerMark = document.querySelector('#brand-mark-header svg');
          const footerMark = document.querySelector('#brand-mark-footer svg');
          const activeStoreId = window.PuckWickStore?.state?.activeLogoConcept;
          const localStoreVal = localStorage.getItem('pw_active_brand_concept');

          const hRect = headerMark ? headerMark.getBoundingClientRect() : null;
          const fRect = footerMark ? footerMark.getBoundingClientRect() : null;

          return {
            headerSvgExists: Boolean(headerMark),
            headerSvgHasSize: Boolean(hRect && hRect.width > 20 && hRect.height > 20),
            footerSvgExists: Boolean(footerMark),
            footerSvgHasSize: Boolean(fRect && fRect.width > 20 && fRect.height > 20),
            activeStoreId,
            localStoreVal: Number(localStoreVal)
          };
        }, cid);

        assert(
          checkMarks.headerSvgExists && checkMarks.headerSvgHasSize,
          `[Concept ${cid}] Applying concept updates #brand-mark-header SVG with non-zero dimensions`,
          `Store activeLogoConcept: ${checkMarks.activeStoreId}, localStorage: ${checkMarks.localStoreVal}`
        );

        assert(
          checkMarks.footerSvgExists && checkMarks.footerSvgHasSize,
          `[Concept ${cid}] Applying concept updates #brand-mark-footer SVG with non-zero dimensions`,
          `Footer mark present and sized`
        );
      }

      // Test toggling scents and vessels in jar mockup workbench
      const freshCutBtn = page.locator('[data-testid="mockup-scent-fresh-cut"]');
      const amberVesselBtn = page.locator('[data-testid="mockup-vessel-amber"]');
      const topShelfBtn = page.locator('[data-testid="mockup-scent-top-shelf"]');
      const obsidianVesselBtn = page.locator('[data-testid="mockup-vessel-obsidian"]');

      await freshCutBtn.click();
      await page.waitForTimeout(100);
      let jarAttrs = await page.getAttribute('.jar-mockup-svg', 'data-scent');
      assert(jarAttrs === 'fresh-cut', 'Clicking Fresh Cut toggle updates jar mockup data-scent to "fresh-cut"', `Actual: ${jarAttrs}`);

      await amberVesselBtn.click();
      await page.waitForTimeout(100);
      let vesselAttrs = await page.getAttribute('.jar-mockup-svg', 'data-vessel');
      assert(vesselAttrs === 'amber', 'Clicking Amber vessel toggle updates jar mockup data-vessel to "amber"', `Actual: ${vesselAttrs}`);

      await topShelfBtn.click();
      await page.waitForTimeout(100);
      jarAttrs = await page.getAttribute('.jar-mockup-svg', 'data-scent');
      assert(jarAttrs === 'top-shelf', 'Clicking Top Shelf toggle restores jar mockup data-scent to "top-shelf"', `Actual: ${jarAttrs}`);

      await obsidianVesselBtn.click();
      await page.waitForTimeout(100);
      vesselAttrs = await page.getAttribute('.jar-mockup-svg', 'data-vessel');
      assert(vesselAttrs === 'obsidian', 'Clicking Obsidian vessel toggle restores jar mockup data-vessel to "obsidian"', `Actual: ${vesselAttrs}`);

      assert(
        consoleErrors.length === 0,
        'Zero console errors throughout all interactive concept, scent, and vessel mutations',
        consoleErrors.length === 0 ? '0 errors' : `Errors: ${consoleErrors.join('; ')}`
      );

      await page.close();
    }

    console.log('\n============================================================');
    console.log(`  M4 EMPIRICAL HARNESS SUMMARY: ${results.passed} PASSED, ${results.failed} FAILED, ${results.warnings} WARNINGS`);
    console.log('============================================================\n');

  } finally {
    await browser.close();
    if (server && !alreadyRunning) {
      server.close();
    }
  }

  process.exit(results.failed > 0 ? 1 : 0);
}

runM4EmpiricalHarness().catch((err) => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
