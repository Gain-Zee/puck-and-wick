#!/usr/bin/env node
/**
 * scripts/test-e2e.js
 * Comprehensive Playwright Headless Test Runner for Puck & Wick.
 *
 * Uses macOS System Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
 * Asserts on Desktop (1440x900) & Mobile (390x844) viewports.
 * Enforces Zero-Tolerance Quality Gates: 0 console errors, 0 uncaught exceptions, 0 failed requests.
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startServer } from './serve.js';
import { createErrorTracker, assertZeroErrors, VIEWPORTS } from '../tests/helpers/assertions.js';
import { SELECTORS } from '../tests/helpers/selectors.js';
import * as mockData from '../tests/helpers/mock-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Preferred system Chrome executable path
const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  tier: null,
  milestone: null,
  filter: null,
  help: false,
  list: false,
  dryRun: false,
  port: 3000,
  headless: true,
  screenshot: true,
  timeout: 15000
};

for (const arg of args) {
  if (arg === '--help' || arg === '-h') options.help = true;
  else if (arg === '--list' || arg === '-l') options.list = true;
  else if (arg === '--dry-run' || arg === '-d') options.dryRun = true;
  else if (arg === '--all') options.tier = 'all';
  else if (arg.startsWith('--tier=')) options.tier = arg.split('=')[1];
  else if (arg === 'tier1' || arg === '--tier1') options.tier = '1';
  else if (arg === 'tier2' || arg === '--tier2') options.tier = '2';
  else if (arg === 'tier3' || arg === '--tier3') options.tier = '3';
  else if (arg === 'tier4' || arg === '--tier4') options.tier = '4';
  else if (arg.startsWith('--milestone=')) options.milestone = arg.split('=')[1].toLowerCase();
  else if (arg.startsWith('--filter=')) options.filter = arg.split('=')[1];
  else if (arg.startsWith('--port=')) options.port = parseInt(arg.split('=')[1], 10);
  else if (arg.startsWith('--timeout=')) options.timeout = parseInt(arg.split('=')[1], 10);
  else if (arg === '--headed') options.headless = false;
  else if (arg === '--no-screenshot') options.screenshot = false;
}

function printHelp() {
  console.log(`
Puck & Wick E2E Test Suite Runner
Usage: node scripts/test-e2e.js [options]
       npm test
       npm run test:tier1
       npm run test:tier2
       npm run test:tier3
       npm run test:tier4

Options:
  --tier=<1|2|3|4|all>   Run tests belonging to a specific tier (default: all)
  --milestone=<m1..m4>   Filter tests by milestone
  --filter=<pattern>     Filter test titles by substring or regex
  --list, -l             List all discovered tests without running them
  --dry-run, -d          Validate test suite syntax and integrity without launching browser
  --port=<number>        Local static server port (default: 3000)
  --headed               Run browser in headed mode (default: headless)
  --timeout=<ms>         Per-test timeout in milliseconds (default: 15000)
  --no-screenshot        Disable screenshot capture on failure
  --help, -h             Show this help message

Test Architecture:
  Tier 1: Feature Coverage (>=100 tests across all 20 features)
  Tier 2: Boundary & Corner Cases (>=100 tests across all 20 features + 14 edge cases)
  Tier 3: Cross-Feature Combinations (>=20 pairwise tests)
  Tier 4: Real-World Application Scenarios (>=10 end-to-end user journeys)
  Total: >=230 test cases
`);
}

async function loadAllTestSuites() {
  const suites = [];
  const testDirs = [
    path.join(ROOT_DIR, 'tests', 'tier1-feature-coverage'),
    path.join(ROOT_DIR, 'tests', 'tier2-boundary-corner'),
    path.join(ROOT_DIR, 'tests', 'tier3-cross-feature'),
    path.join(ROOT_DIR, 'tests', 'tier4-user-journeys')
  ];

  for (const dir of testDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.spec.js') || f.endsWith('.test.js'));
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const mod = await import(`file://${fullPath}`);
        const testList = mod.tests || mod.default || [];
        if (Array.isArray(testList)) {
          for (const test of testList) {
            test.__filePath = fullPath;
            test.__fileName = file;
            suites.push(test);
          }
        }
      } catch (err) {
        console.error(`[Error loading test suite ${file}]:`, err);
        throw err;
      }
    }
  }

  return suites;
}

function filterTests(tests) {
  return tests.filter(test => {
    if (options.tier && options.tier !== 'all' && String(test.tier) !== String(options.tier)) {
      return false;
    }
    if (options.milestone && test.milestone && test.milestone.toLowerCase() !== options.milestone) {
      return false;
    }
    if (options.filter) {
      const regex = new RegExp(options.filter, 'i');
      const matchesTitle = regex.test(test.title || '');
      const matchesId = regex.test(test.id || '');
      const matchesFeature = regex.test(test.feature || '');
      if (!matchesTitle && !matchesId && !matchesFeature) return false;
    }
    return true;
  });
}

async function main() {
  if (options.help) {
    printHelp();
    process.exit(0);
  }

  const allTests = await loadAllTestSuites();

  if (options.list) {
    console.log(`\nDiscovered ${allTests.length} E2E Test Cases in Puck & Wick Suite:\n`);
    const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, other: 0 };
    for (const t of allTests) {
      tierCounts[t.tier] = (tierCounts[t.tier] || 0) + 1;
      console.log(`  [${t.id || 'NO-ID'}] Tier ${t.tier} | ${t.milestone || 'M?'} | ${t.feature || 'General'} | ${t.title}`);
    }
    console.log(`\nSummary by Tier:`);
    console.log(`  Tier 1 (Feature Coverage): ${tierCounts[1] || 0} tests`);
    console.log(`  Tier 2 (Boundary & Corner): ${tierCounts[2] || 0} tests`);
    console.log(`  Tier 3 (Cross-Feature):    ${tierCounts[3] || 0} tests`);
    console.log(`  Tier 4 (User Journeys):    ${tierCounts[4] || 0} tests`);
    console.log(`  Total Test Cases:          ${allTests.length} tests\n`);
    process.exit(0);
  }

  if (options.dryRun) {
    console.log(`\nValidating test suite syntax & integrity for ${allTests.length} tests...`);
    let errors = 0;
    for (const t of allTests) {
      if (!t.id) { console.error(`Missing id in test: ${t.title}`); errors++; }
      if (!t.title) { console.error(`Missing title in test: ${t.id}`); errors++; }
      if (typeof t.run !== 'function') { console.error(`Missing run() function in test: ${t.id}`); errors++; }
      if (!t.tier) { console.error(`Missing tier in test: ${t.id}`); errors++; }
    }
    if (errors === 0) {
      console.log(`✅ Test suite dry-run validation PASSED: all ${allTests.length} tests are syntactically sound and valid.\n`);
      process.exit(0);
    } else {
      console.error(`❌ Dry-run validation FAILED with ${errors} integrity issues.\n`);
      process.exit(1);
    }
  }

  const selectedTests = filterTests(allTests);
  console.log(`\n============================================================`);
  console.log(`  Puck & Wick E2E Test Suite Runner`);
  console.log(`  Selected: ${selectedTests.length} of ${allTests.length} tests (Tier: ${options.tier || 'all'}, Milestone: ${options.milestone || 'all'})`);
  console.log(`============================================================\n`);

  if (selectedTests.length === 0) {
    console.log('No tests matched the specified filters.');
    process.exit(0);
  }

  // 1. Ensure local HTTP server is running
  console.log(`[Server] Starting / verifying static server on port ${options.port}...`);
  const serverResult = await startServer(options.port);
  const baseUrl = `http://127.0.0.1:${options.port}`;
  console.log(`[Server] Target URL: ${baseUrl}`);

  // 2. Launch browser using system Chrome if available
  let browser;
  const launchOptions = {
    headless: options.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  };

  if (fs.existsSync(SYSTEM_CHROME_PATH)) {
    launchOptions.executablePath = SYSTEM_CHROME_PATH;
    console.log(`[Browser] Using macOS System Chrome at: ${SYSTEM_CHROME_PATH}`);
  } else {
    console.log(`[Browser] System Chrome not found at ${SYSTEM_CHROME_PATH}, falling back to bundled Chromium.`);
  }

  try {
    browser = await chromium.launch(launchOptions);
  } catch (err) {
    console.warn(`[Browser] Failed to launch with executablePath, attempting default launch:`, err.message);
    delete launchOptions.executablePath;
    browser = await chromium.launch(launchOptions);
  }

  // Create test results directory for screenshots
  const resultsDir = path.join(ROOT_DIR, 'test-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  let passed = 0;
  let failed = 0;
  let skipped = 0;
  const failures = [];
  const startTime = Date.now();

  for (let i = 0; i < selectedTests.length; i++) {
    const test = selectedTests[i];
    const testNum = `[${i + 1}/${selectedTests.length}]`;
    const label = `${test.id} (Tier ${test.tier}) ${test.title}`;

    process.stdout.write(`  ${testNum} ${label} ... `);
    const testStart = Date.now();

    // Determine target viewport: default desktop, or test-specific
    const viewport = test.viewport === 'mobile' ? VIEWPORTS.mobile : VIEWPORTS.desktop;

    const context = await browser.newContext({
      viewport,
      userAgent: test.viewport === 'mobile'
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();
    const errorTracker = createErrorTracker(page);

    try {
      // Execute test within configured timeout
      const runPromise = test.run({
        page,
        context,
        browser,
        baseUrl,
        viewport,
        viewports: VIEWPORTS,
        selectors: SELECTORS,
        mockData,
        errorTracker,
        assertZeroErrors: () => assertZeroErrors(errorTracker, test.id)
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Test timed out after ${options.timeout}ms`)), options.timeout)
      );

      await Promise.race([runPromise, timeoutPromise]);

      // Enforce Zero-Tolerance Quality Gates after each test
      assertZeroErrors(errorTracker, test.id);

      const duration = Date.now() - testStart;
      console.log(`\x1b[32mPASS\x1b[0m (${duration}ms)`);
      passed++;
    } catch (err) {
      const duration = Date.now() - testStart;
      console.log(`\x1b[31mFAIL\x1b[0m (${duration}ms)`);
      console.log(`     \x1b[31mError: ${err.message}\x1b[0m`);
      failed++;
      failures.push({ test, error: err });

      if (options.screenshot) {
        try {
          const shotPath = path.join(resultsDir, `failure-${test.id}.png`);
          await page.screenshot({ path: shotPath, fullPage: true });
          console.log(`     📸 Screenshot saved: ${shotPath}`);
        } catch (sErr) {
          // ignore screenshot error
        }
      }
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
    }
  }

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Close browser and server
  await browser.close().catch(() => {});
  if (serverResult.server) {
    serverResult.server.close();
  }

  console.log(`\n============================================================`);
  console.log(`  Test Run Complete (${totalDuration}s)`);
  console.log(`  Total: ${selectedTests.length} | \x1b[32mPassed: ${passed}\x1b[0m | \x1b[31mFailed: ${failed}\x1b[0m | Skipped: ${skipped}`);
  console.log(`============================================================\n`);

  if (failed > 0) {
    console.log(`Summary of Failures:`);
    for (const f of failures) {
      console.log(`  - \x1b[31m${f.test.id}\x1b[0m: ${f.test.title}`);
      console.log(`    ${f.error.message.split('\n')[0]}`);
    }
    console.log(``);
    process.exit(1);
  } else {
    console.log(`\x1b[32mAll ${passed} E2E test cases passed with ZERO errors!\x1b[0m\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('[Fatal Test Runner Error]:', err);
  process.exit(1);
});
