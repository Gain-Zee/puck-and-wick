/**
 * tests/challenger-state-nav-audit.js
 * Independent Empirical Challenge Harness for Milestone 1 Iteration 2 Gate
 * Tests:
 * 1. Cart Reactivity Stress (100 rapid-fire randomized operations, zero desync)
 * 2. Wholesale Form Validation, A11y, Focus Trap, Escape & Backdrop Dismiss
 * 3. Anchor Navigation (Desktop & Mobile, smooth scroll, zero reload, drawer auto-close)
 * 4. Action Aliases & Logo Switching (All aliases, boundary clamping, DOM SVG injection)
 */

import { chromium } from 'playwright';
import { startServer } from '../scripts/serve.js';

const SYSTEM_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const AUDIT_PORT = 3499;

const testReport = {
  cartStress: { passed: 0, failed: 0, details: [] },
  wholesaleModal: { passed: 0, failed: 0, details: [] },
  navigation: { passed: 0, failed: 0, details: [] },
  storeAliases: { passed: 0, failed: 0, details: [] }
};

function logResult(section, testName, passed, error = null) {
  if (passed) {
    testReport[section].passed++;
    console.log(`  \x1b[32m[PASS]\x1b[0m ${testName}`);
    testReport[section].details.push({ testName, status: 'PASS' });
  } else {
    testReport[section].failed++;
    console.log(`  \x1b[31m[FAIL]\x1b[0m ${testName}`);
    if (error) console.log(`         \x1b[33mError: ${error}\x1b[0m`);
    testReport[section].details.push({ testName, status: 'FAIL', error: String(error) });
  }
}

async function testCartReactivity(page) {
  console.log('\n============================================================');
  console.log('1. CART REACTIVITY & BADGE SYNCHRONIZATION STRESS');
  console.log('============================================================');

  // Verify selector co-existence
  const hasCartCount = (await page.$('#cart-count')) !== null;
  const hasCartBadge = (await page.$('#cart-badge')) !== null;
  const hasDataTestId = (await page.$('[data-testid="cart-badge-count"]')) !== null;
  logResult('cartStress', 'DOM contains #cart-count, #cart-badge, and data-testid="cart-badge-count"',
    hasCartCount && hasCartBadge && hasDataTestId,
    `cartCount: ${hasCartCount}, cartBadge: ${hasCartBadge}, dataTestId: ${hasDataTestId}`
  );

  // Clear cart
  await page.evaluate(() => window.PuckWickStore.dispatch('CLEAR_CART'));

  // Initial empty cart shipping should be 0
  const initialShipping = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
  logResult('cartStress', 'Empty cart shipping is $0.00', initialShipping === 0, `Expected 0, got ${initialShipping}`);

  const testProducts = [
    { id: 'top-shelf', title: 'Top Shelf', price: 34.00, scent: 'Bourbon & Oak' },
    { id: 'fresh-cut', title: 'Fresh Cut', price: 34.00, scent: 'Eucalyptus & Pine' },
    { id: 'balsam-fir', title: 'Balsam Fir', price: 38.00, scent: 'Balsam & Amber' },
    { id: 'barnwood-bourbon', title: 'Barnwood & Bourbon', price: 34.00, scent: 'Bourbon & Tobacco' },
    { id: 'exclusive-box-men', title: 'Men Athlete Box', price: 78.00, scent: 'Top Shelf' }
  ];

  let mirrorCart = [];
  let desyncs = 0;

  console.log('  Executing 100 rapid-fire randomized cart actions...');
  for (let step = 0; step < 100; step++) {
    const op = Math.random() < 0.55 ? 'ADD' : (Math.random() < 0.6 ? 'UPDATE' : 'REMOVE');
    const prod = testProducts[Math.floor(Math.random() * testProducts.length)];

    if (op === 'ADD') {
      const qty = Math.floor(Math.random() * 3) + 1;
      await page.evaluate(({ prod, qty }) => {
        window.PuckWickStore.dispatch(Math.random() < 0.5 ? 'ADD_ITEM' : 'ADD_TO_CART', {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          scent: prod.scent,
          quantity: qty
        });
      }, { prod, qty });

      const match = mirrorCart.find(i => i.id === prod.id && i.scent === prod.scent);
      if (match) {
        match.quantity = Math.min(99, match.quantity + qty);
      } else {
        mirrorCart.push({ id: prod.id, scent: prod.scent, quantity: Math.min(99, qty) });
      }
    } else if (op === 'UPDATE' && mirrorCart.length > 0) {
      const target = mirrorCart[Math.floor(Math.random() * mirrorCart.length)];
      const newQty = Math.floor(Math.random() * 5); // 0 triggers removal
      await page.evaluate(({ id, scent, quantity }) => {
        window.PuckWickStore.dispatch(Math.random() < 0.5 ? 'UPDATE_QUANTITY' : 'UPDATE_CART_QUANTITY', {
          id,
          scent,
          quantity
        });
      }, { id: target.id, scent: target.scent, quantity: newQty });

      if (newQty <= 0) {
        mirrorCart = mirrorCart.filter(i => !(i.id === target.id && i.scent === target.scent));
      } else {
        target.quantity = Math.min(99, newQty);
      }
    } else if (op === 'REMOVE' && mirrorCart.length > 0) {
      const target = mirrorCart[Math.floor(Math.random() * mirrorCart.length)];
      await page.evaluate(({ id, scent }) => {
        window.PuckWickStore.dispatch(Math.random() < 0.5 ? 'REMOVE_ITEM' : 'REMOVE_FROM_CART', {
          id,
          scent
        });
      }, { id: target.id, scent: target.scent });

      mirrorCart = mirrorCart.filter(i => !(i.id === target.id && i.scent === target.scent));
    }

    // Verify synchronization
    const expectedCount = mirrorCart.reduce((acc, i) => acc + i.quantity, 0);
    const storeCount = await page.evaluate(() => window.PuckWickStore.getCartCount());
    const domBadgeCount = await page.evaluate(() => {
      const countEl = document.getElementById('cart-count');
      const badgeEl = document.getElementById('cart-badge');
      return {
        countText: countEl ? parseInt(countEl.textContent, 10) : null,
        badgeText: badgeEl ? parseInt(badgeEl.textContent, 10) : null
      };
    });

    if (
      storeCount !== expectedCount ||
      domBadgeCount.countText !== expectedCount ||
      domBadgeCount.badgeText !== expectedCount
    ) {
      desyncs++;
    }
  }

  logResult('cartStress', '100 Rapid-Fire Operations: Zero desync between Model, Store, #cart-count, and #cart-badge',
    desyncs === 0,
    desyncs > 0 ? `${desyncs} desynchronization instances detected` : null
  );

  // Test automatic shipping threshold switch
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'p1', title: 'C1', price: 34, quantity: 2 }); // $68 < $75
  });
  const shipUnder75 = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
  logResult('cartStress', 'Shipping for $68 subtotal is $6.95 standard rate', shipUnder75 === 6.95, `Got ${shipUnder75}`);

  await page.evaluate(() => {
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'p2', title: 'C2', price: 34, quantity: 1 }); // $102 >= $75
  });
  const shipOver75 = await page.evaluate(() => window.PuckWickStore.getShippingTotal());
  const methodOver75 = await page.evaluate(() => window.PuckWickStore.state.shippingMethod);
  logResult('cartStress', 'Shipping for $102 subtotal auto-switches to free ($0)',
    shipOver75 === 0 && methodOver75 === 'free',
    `shippingTotal: ${shipOver75}, method: ${methodOver75}`
  );
}

async function testWholesaleModal(page) {
  console.log('\n============================================================');
  console.log('2. WHOLESALE FORM VALIDATION & MODAL A11Y TESTING');
  console.log('============================================================');

  const trigger = page.locator('#btn-inquire-wholesale');
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  await page.waitForTimeout(150);

  const backdrop = page.locator('#wholesale-modal-backdrop');
  const modalCard = page.locator('.wholesale-modal');
  logResult('wholesaleModal', 'Clicking #btn-inquire-wholesale displays modal and backdrop',
    (await backdrop.count()) > 0 && (await modalCard.isVisible()),
    'Modal backdrop or card not visible'
  );

  // Verify Body scroll is locked
  const bodyOverflowLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
  logResult('wholesaleModal', 'Body scroll is locked (overflow: hidden) when modal opens', bodyOverflowLocked);

  // Form controls exist
  const formControls = await page.evaluate(() => {
    const form = document.getElementById('wholesale-form');
    const name = document.getElementById('wholesale-name');
    const email = document.getElementById('wholesale-email');
    const biz = document.getElementById('wholesale-business');
    const notes = document.getElementById('wholesale-notes');
    const submit = document.getElementById('btn-submit-wholesale');
    const cancel = document.getElementById('btn-done-wholesale');
    const close = document.getElementById('btn-close-wholesale');
    return {
      hasForm: !!form,
      nameReq: name?.required && name?.type === 'text',
      emailReq: email?.required && email?.type === 'email',
      bizReq: biz?.required && biz?.type === 'text',
      notesReq: notes?.required && notes?.tagName === 'TEXTAREA',
      hasSubmit: !!submit,
      hasCancel: !!cancel,
      hasClose: !!close
    };
  });

  logResult('wholesaleModal', 'Wholesale modal includes full interactive form controls with correct types',
    formControls.hasForm && formControls.nameReq && formControls.emailReq && formControls.bizReq && formControls.notesReq && formControls.hasSubmit,
    JSON.stringify(formControls)
  );

  // Test email format validation with adversarial email strings
  const invalidEmails = ['invalid-email', 'missingatdomain.com', 'test@', 'bad@domain', 'space in@email.com'];
  let rejectedCount = 0;

  for (const badEmail of invalidEmails) {
    await page.fill('#wholesale-name', 'Test Buyer');
    await page.fill('#wholesale-email', badEmail);
    await page.fill('#wholesale-business', 'Artisan Gifts');
    await page.fill('#wholesale-notes', 'Sample inquiry text');
    await page.click('#btn-submit-wholesale');
    await page.waitForTimeout(50);

    const feedback = await page.evaluate(() => {
      const fb = document.getElementById('wholesale-feedback');
      return fb ? fb.textContent : '';
    });

    const isSubmitted = feedback.includes('Inquiry Submitted Successfully');
    if (!isSubmitted) {
      rejectedCount++;
    }
  }

  logResult('wholesaleModal', 'Adversarial email validation: all 5 invalid email formats rejected',
    rejectedCount === invalidEmails.length,
    `${rejectedCount}/${invalidEmails.length} rejected`
  );

  // Test valid submission
  await page.fill('#wholesale-email', 'partner@bluehydrangea.com');
  await page.click('#btn-submit-wholesale');
  await page.waitForTimeout(100);

  const successFeedback = await page.evaluate(() => {
    const fb = document.getElementById('wholesale-feedback');
    return fb ? fb.textContent.includes('Inquiry Submitted Successfully') : false;
  });
  logResult('wholesaleModal', 'Valid email submission produces confirmation feedback', successFeedback);

  // Test Tab focus trap cycle
  // Re-open fresh modal
  await page.click('#btn-close-wholesale');
  await page.waitForTimeout(100);
  await trigger.click();
  await page.waitForTimeout(100);

  let focusStayedInside = true;
  for (let t = 0; t < 10; t++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => {
      const card = document.querySelector('.wholesale-modal');
      return card && card.contains(document.activeElement);
    });
    if (!inside) {
      focusStayedInside = false;
      break;
    }
  }
  logResult('wholesaleModal', 'Tab key focus remains strictly trapped within modal boundaries (10 cycles)', focusStayedInside);

  // Test Shift+Tab backwards wrap
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  const shiftTabInside = await page.evaluate(() => {
    const card = document.querySelector('.wholesale-modal');
    return card && card.contains(document.activeElement);
  });
  logResult('wholesaleModal', 'Shift+Tab backwards cycling remains trapped inside modal', shiftTabInside);

  // Test Escape key dismiss and return focus
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const dismissedByEsc = (await page.locator('#wholesale-modal-backdrop').count()) === 0;
  const bodyUnlockedAfterEsc = await page.evaluate(() => document.body.style.overflow === '');
  const focusReturnedToTrigger = await page.evaluate(() => document.activeElement?.id === 'btn-inquire-wholesale');

  logResult('wholesaleModal', 'Escape key dismisses dialog, restores body scroll, and returns focus to trigger',
    dismissedByEsc && bodyUnlockedAfterEsc && focusReturnedToTrigger,
    `dismissed: ${dismissedByEsc}, bodyUnlocked: ${bodyUnlockedAfterEsc}, focusReturned: ${focusReturnedToTrigger}`
  );

  // Test Backdrop click dismiss
  await trigger.click();
  await page.waitForTimeout(150);
  await page.mouse.click(10, 10); // click in backdrop area outside modal card
  await page.waitForTimeout(150);
  const dismissedByBackdrop = (await page.locator('#wholesale-modal-backdrop').count()) === 0;
  const bodyUnlockedAfterBackdrop = await page.evaluate(() => document.body.style.overflow === '');

  logResult('wholesaleModal', 'Backdrop outside click dismisses dialog and restores body scroll',
    dismissedByBackdrop && bodyUnlockedAfterBackdrop,
    `dismissed: ${dismissedByBackdrop}, bodyUnlocked: ${bodyUnlockedAfterBackdrop}`
  );
}

async function testNavigation(page, browser, baseUrl) {
  console.log('\n============================================================');
  console.log('3. SMOOTH SCROLLING & NAVIGATION LINKS (DESKTOP & MOBILE)');
  console.log('============================================================');

  const links = [
    { name: 'Shop Candles', hash: '#shop', targetId: 'shop' },
    { name: 'Exclusive Boxes', hash: '#exclusive-boxes', targetId: 'exclusive-boxes' },
    { name: 'Our Story & QC', hash: '#story', targetId: 'story' },
    { name: 'Retail Stockists', hash: '#stockists', targetId: 'stockists' },
    { name: 'Brand Studio', hash: '#studio', targetId: 'studio' }
  ];

  // 3.1 Desktop Navigation
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseUrl);
  await page.evaluate(() => { window.__DESKTOP_CANARY__ = 'NO_RELOAD'; });

  for (const l of links) {
    const navLink = page.locator(`header nav a[href="${l.hash}"]`);
    await navLink.click();
    await page.waitForTimeout(300);

    const hashMatch = page.url().endsWith(l.hash);
    const canaryIntact = (await page.evaluate(() => window.__DESKTOP_CANARY__)) === 'NO_RELOAD';
    const targetVisible = await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }, l.targetId);

    logResult('navigation', `Desktop: "${l.name}" scrolls to #${l.targetId} with hash update and zero reload`,
      hashMatch && canaryIntact && targetVisible,
      `hash: ${hashMatch}, canary: ${canaryIntact}, visible: ${targetVisible}`
    );
  }

  // 3.2 Mobile Navigation
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(baseUrl);
  await mobilePage.evaluate(() => { window.__MOBILE_CANARY__ = 'MOBILE_NO_RELOAD'; });

  const hamburger = mobilePage.locator('#nav-toggle');
  const mobileNav = mobilePage.locator('#mobile-nav');

  for (const l of links) {
    // Open drawer
    await hamburger.click();
    await mobilePage.waitForTimeout(100);
    const drawerOpen = await mobileNav.evaluate(el => el.classList.contains('open'));

    // Click link
    const linkEl = mobilePage.locator(`#mobile-nav a[href="${l.hash}"]`);
    await linkEl.click();
    await mobilePage.waitForTimeout(350);

    const drawerClosed = await mobileNav.evaluate(el => !el.classList.contains('open'));
    const hashMatch = mobilePage.url().endsWith(l.hash);
    const canaryIntact = (await mobilePage.evaluate(() => window.__MOBILE_CANARY__)) === 'MOBILE_NO_RELOAD';

    logResult('navigation', `Mobile (390x844): "${l.name}" navigates, auto-closes drawer, updates hash, zero reload`,
      drawerOpen && drawerClosed && hashMatch && canaryIntact,
      `opened: ${drawerOpen}, closed: ${drawerClosed}, hash: ${hashMatch}, canary: ${canaryIntact}`
    );
  }

  // Mobile outside click dismiss
  await hamburger.click();
  await mobilePage.waitForTimeout(100);
  await mobilePage.mouse.click(10, 800); // click outside drawer
  await mobilePage.waitForTimeout(150);
  const closedByOutside = await mobileNav.evaluate(el => !el.classList.contains('open'));
  logResult('navigation', 'Mobile Drawer: Outside click dismisses drawer', closedByOutside);

  // Mobile Escape key dismiss
  await hamburger.click();
  await mobilePage.waitForTimeout(100);
  await mobilePage.keyboard.press('Escape');
  await mobilePage.waitForTimeout(150);
  const closedByEsc = await mobileNav.evaluate(el => !el.classList.contains('open'));
  logResult('navigation', 'Mobile Drawer: Escape key dismisses drawer', closedByEsc);

  await mobileCtx.close();
}

async function testStoreAliasesAndLogo(page) {
  console.log('\n============================================================');
  console.log('4. ACTION ALIASES & LOGO SWITCHING INTEGRITY');
  console.log('============================================================');

  // Test action alias compatibility
  // 1. SET_LOGO_CONCEPT vs SET_ACTIVE_LOGO
  await page.evaluate(() => window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', 2));
  const concept1 = await page.evaluate(() => window.PuckWickStore.state.activeLogoConcept);
  await page.evaluate(() => window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', 3));
  const concept2 = await page.evaluate(() => window.PuckWickStore.state.activeLogoConcept);
  logResult('storeAliases', 'Logo actions SET_LOGO_CONCEPT and SET_ACTIVE_LOGO both update state',
    concept1 === 2 && concept2 === 3,
    `concept1=${concept1}, concept2=${concept2}`
  );

  // Boundary clamping for logo concepts
  const boundaryTests = [
    { val: 0, exp: 1 },
    { val: -10, exp: 1 },
    { val: 5, exp: 4 },
    { val: 99, exp: 4 },
    { val: 'bad', exp: 1 }
  ];
  let boundaryPassed = true;
  for (const b of boundaryTests) {
    await page.evaluate((v) => window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', v), b.val);
    const res = await page.evaluate(() => window.PuckWickStore.state.activeLogoConcept);
    if (res !== b.exp) {
      boundaryPassed = false;
      break;
    }
  }
  logResult('storeAliases', 'Logo concepts strictly clamped between [1, 4] for all edge inputs', boundaryPassed);

  // Dynamic SVG Mark Rendering across concepts 1-4
  for (let c = 1; c <= 4; c++) {
    await page.evaluate((id) => window.PuckWickStore.dispatch('SET_ACTIVE_LOGO', id), c);
    await page.waitForTimeout(50);
    const headerHasSvg = await page.evaluate(() => {
      const mark = document.getElementById('brand-mark-header');
      return mark && mark.querySelector('svg') !== null;
    });
    const footerHasSvg = await page.evaluate(() => {
      const mark = document.getElementById('brand-mark-footer');
      return mark && mark.querySelector('svg') !== null;
    });
    logResult('storeAliases', `Active Logo Concept ${c} injects valid SVG into #brand-mark-header and #brand-mark-footer`,
      headerHasSvg && footerHasSvg
    );
  }

  // 2. ADD_ITEM vs ADD_TO_CART
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('CLEAR_CART');
    window.PuckWickStore.dispatch('ADD_ITEM', { id: 'c1', title: 'Candle 1', price: 34, quantity: 1 });
    window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'c2', title: 'Candle 2', price: 34, quantity: 2 });
  });
  const cartLen = await page.evaluate(() => window.PuckWickStore.getCartCount());
  logResult('storeAliases', 'ADD_ITEM and ADD_TO_CART aliases both add items properly', cartLen === 3, `Count: ${cartLen}`);

  // 3. UPDATE_QUANTITY vs UPDATE_CART_QUANTITY
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('UPDATE_QUANTITY', { id: 'c1', quantity: 4 });
    window.PuckWickStore.dispatch('UPDATE_CART_QUANTITY', { id: 'c2', quantity: 5 });
  });
  const cartAfterUpdate = await page.evaluate(() => window.PuckWickStore.getCartCount());
  logResult('storeAliases', 'UPDATE_QUANTITY and UPDATE_CART_QUANTITY aliases both update quantities',
    cartAfterUpdate === 9,
    `Count: ${cartAfterUpdate}`
  );

  // 4. REMOVE_ITEM vs REMOVE_FROM_CART
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('REMOVE_ITEM', { id: 'c1' });
    window.PuckWickStore.dispatch('REMOVE_FROM_CART', { id: 'c2' });
  });
  const cartAfterRemove = await page.evaluate(() => window.PuckWickStore.getCartCount());
  logResult('storeAliases', 'REMOVE_ITEM and REMOVE_FROM_CART aliases both remove items properly',
    cartAfterRemove === 0,
    `Count: ${cartAfterRemove}`
  );

  // 5. SET_CATEGORY vs SET_ACTIVE_CATEGORY
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('SET_CATEGORY', 'seasonal');
  });
  const cat1 = await page.evaluate(() => window.PuckWickStore.state.activeCategory);
  await page.evaluate(() => {
    window.PuckWickStore.dispatch('SET_ACTIVE_CATEGORY', 'woods');
  });
  const cat2 = await page.evaluate(() => window.PuckWickStore.state.activeCategory);
  logResult('storeAliases', 'SET_CATEGORY and SET_ACTIVE_CATEGORY aliases both update activeCategory',
    cat1 === 'seasonal' && cat2 === 'woods',
    `cat1=${cat1}, cat2=${cat2}`
  );

  // 6. APPLY_PROMO vs APPLY_PROMO_CODE & Listener Notification
  const promoRes1 = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10'));
  const promoState1 = await page.evaluate(() => window.PuckWickStore.state.promoCode?.code);
  const promoRes2 = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO_CODE', 'FOUNDER20'));
  const promoState2 = await page.evaluate(() => window.PuckWickStore.state.promoCode?.code);
  const promoResBad = await page.evaluate(() => window.PuckWickStore.dispatch('APPLY_PROMO', 'INVALID_CODE'));

  // Test listener notification during promo dispatch
  const listenerFired = await page.evaluate(() => {
    let called = false;
    const unsub = window.PuckWickStore.subscribe((state, action) => {
      if (action === 'APPLY_PROMO_CODE') called = true;
    });
    window.PuckWickStore.dispatch('APPLY_PROMO_CODE', 'BLUEHYDRANGEA');
    unsub();
    return called;
  });

  logResult('storeAliases', 'APPLY_PROMO and APPLY_PROMO_CODE apply discounts and reliably notify registered listeners',
    promoRes1.success && promoState1 === 'PUCK10' && promoRes2.success && promoState2 === 'FOUNDER20' && !promoResBad.success && listenerFired,
    `p1=${promoState1}, p2=${promoState2}, bad=${promoResBad.success}, listenerFired=${listenerFired}`
  );

  // 7. SET_PAYMENT_ADAPTER
  await page.evaluate(() => window.PuckWickStore.dispatch('SET_PAYMENT_ADAPTER', 'alina_pos'));
  const adapter = await page.evaluate(() => window.PuckWickStore.state.paymentConfig.activeAdapter);
  logResult('storeAliases', 'SET_PAYMENT_ADAPTER sets payment adapter configuration',
    adapter === 'alina_pos',
    `adapter=${adapter}`
  );
}

async function main() {
  console.log('============================================================');
  console.log('  CHALLENGER DEEP AUDIT: Puck & Wick Milestone 1 Gate');
  console.log('============================================================');

  const { server } = await startServer(AUDIT_PORT);
  const baseUrl = `http://127.0.0.1:${AUDIT_PORT}`;

  const browser = await chromium.launch({
    executablePath: SYSTEM_CHROME_PATH,
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl);
    await testCartReactivity(page);
    await testWholesaleModal(page);
    await testNavigation(page, browser, baseUrl);
    await testStoreAliasesAndLogo(page);
  } catch (err) {
    console.error('Fatal audit harness crash:', err);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n============================================================');
  console.log('  CHALLENGER AUDIT SUMMARY');
  console.log('============================================================');
  let grandTotal = 0;
  let grandPassed = 0;
  let grandFailed = 0;

  for (const [sec, data] of Object.entries(testReport)) {
    const total = data.passed + data.failed;
    grandTotal += total;
    grandPassed += data.passed;
    grandFailed += data.failed;
    console.log(`  ${sec.padEnd(16)}: ${data.passed} PASSED, ${data.failed} FAILED (total: ${total})`);
  }
  console.log('------------------------------------------------------------');
  console.log(`  OVERALL TOTAL   : ${grandPassed} PASSED, ${grandFailed} FAILED of ${grandTotal} tests`);
  console.log('============================================================\n');

  if (grandFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
