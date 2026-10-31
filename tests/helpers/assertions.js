/**
 * tests/helpers/assertions.js
 * Quality gates, error trackers, viewport assertion helpers, and layout validators.
 */

export function createErrorTracker(page) {
  const tracker = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: []
  };

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore benign browser noise if any
      tracker.consoleErrors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    tracker.pageErrors.push(err.message || String(err));
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    // Exclude common browser favicon or optional telemetry aborts if not relevant
    if (!url.includes('favicon.ico')) {
      tracker.failedRequests.push({
        url,
        method: req.method(),
        failure: req.failure()?.errorText || 'Unknown failure'
      });
    }
  });

  return tracker;
}

export function assertZeroErrors(tracker, testContext = 'Test') {
  const issues = [];

  if (tracker.consoleErrors.length > 0) {
    issues.push(`Console Errors (${tracker.consoleErrors.length}):\n  - ` + tracker.consoleErrors.join('\n  - '));
  }
  if (tracker.pageErrors.length > 0) {
    issues.push(`Uncaught Page Errors (${tracker.pageErrors.length}):\n  - ` + tracker.pageErrors.join('\n  - '));
  }
  if (tracker.failedRequests.length > 0) {
    issues.push(`Failed Network Requests (${tracker.failedRequests.length}):\n  - ` +
      tracker.failedRequests.map(r => `${r.method} ${r.url} (${r.failure})`).join('\n  - '));
  }

  if (issues.length > 0) {
    throw new Error(`[Zero-Tolerance Quality Gate Failure in "${testContext}"]:\n` + issues.join('\n\n'));
  }
}

export async function assertNoBrokenImages(page) {
  const brokenImages = await page.evaluate(() => {
    const results = [];
    const images = Array.from(document.querySelectorAll('img'));
    for (const img of images) {
      if (!img.complete || img.naturalWidth === 0) {
        results.push(img.src || img.getAttribute('src') || 'unknown img without src');
      }
    }
    const svgs = Array.from(document.querySelectorAll('svg'));
    for (const svg of svgs) {
      const bbox = svg.getBoundingClientRect();
      const hasContent = svg.children.length > 0 || svg.textContent.trim().length > 0;
      if (!hasContent) {
        results.push('Empty SVG element: ' + svg.outerHTML.slice(0, 50));
      }
    }
    return results;
  });

  if (brokenImages.length > 0) {
    throw new Error(`Found ${brokenImages.length} broken image(s) or empty SVG(s):\n  - ` + brokenImages.join('\n  - '));
  }
}

export async function assertNoPlaceholders(page) {
  const placeholderHits = await page.evaluate(() => {
    const text = document.body ? document.body.innerText : '';
    const banned = [
      /\bTODO\b/i,
      /\bTBD\b/i,
      /\bLOREM IPSUM\b/i,
      /\bPLACEHOLDER TEXT\b/i,
      /\bCOMING SOON\b/i
    ];
    const hits = [];
    for (const regex of banned) {
      if (regex.test(text)) {
        hits.push(regex.toString());
      }
    }
    return hits;
  });

  if (placeholderHits.length > 0) {
    throw new Error(`Found forbidden placeholder strings on page matching: ${placeholderHits.join(', ')}`);
  }
}

export async function assertNoHorizontalScroll(page) {
  const hasScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  if (hasScroll) {
    const details = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    throw new Error(`Page has unwanted horizontal overflow: scrollWidth (${details.scrollWidth}px) > clientWidth (${details.clientWidth}px)`);
  }
}

export const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};
