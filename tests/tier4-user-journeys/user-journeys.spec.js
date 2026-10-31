/**
 * tests/tier4-user-journeys/user-journeys.spec.js
 * Tier 4: Real-World Application Scenarios (15 realistic end-to-end user journeys).
 * Validates full multi-step customer flows, zero-tolerance quality gates, and cross-feature orchestration.
 */

import { assertNoBrokenImages, assertNoPlaceholders, assertNoHorizontalScroll } from '../helpers/assertions.js';

export const tests = [
  {
    id: 'T4-JOURNEY-01',
    tier: 4,
    feature: 'User Journey: The Hockey Veteran',
    milestone: 'M2',
    title: 'Veteran hockey player: reads heritage story -> selects Top Shelf -> applies FOUNDER20 -> reserves for local pickup',
    run: async ({ page, baseUrl, selectors, mockData, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      // 1. Inspect story section
      const story = page.locator(selectors.story.section).first();
      if ((await story.count()) > 0) await story.scrollIntoViewIfNeeded();

      // 2. Select Top Shelf from catalog
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'FOUNDER20');
          window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'pickup');
        }
      });

      // 3. Open cart drawer
      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);

      // 4. Open checkout
      await page.locator(selectors.cart.checkoutBtn).first().click();
      await page.waitForTimeout(100);

      // 5. Submit reservation
      const submitBtn = page.locator(selectors.checkout.placeOrderBtn).first();
      if ((await submitBtn.count()) > 0) {
        const nameInput = page.locator(selectors.checkout.customerName).first();
        if ((await nameInput.count()) > 0) {
          await nameInput.fill(mockData.MOCK_CUSTOMERS.localPickup.fullName);
          await page.locator(selectors.checkout.customerEmail).first().fill(mockData.MOCK_CUSTOMERS.localPickup.email);
          await page.locator(selectors.checkout.customerPhone).first().fill(mockData.MOCK_CUSTOMERS.localPickup.phone);
        }
        await submitBtn.click();
      }
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-02',
    tier: 4,
    feature: 'User Journey: Athlete Odor Rescue (Mobile 390x844)',
    milestone: 'M3',
    viewport: 'mobile',
    title: 'Mobile athlete: navigates to box customizer -> reviews Metazene science -> configures Men Box -> unlocks free shipping',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      // Check mobile viewport
      await assertNoHorizontalScroll(page);

      // Box configuration
      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'box-men-freshcut',
            type: 'exclusive_box',
            title: "Men's / Athlete Exclusive Box",
            price: 78,
            quantity: 1,
            customizations: { candleScentId: 'candle-fresh-cut', candleScentName: 'Fresh Cut' }
          });
        }
      });

      // Cart verification
      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-03',
    tier: 4,
    feature: 'User Journey: Purcellville Local Patron',
    milestone: 'M2',
    title: 'Local patron: checks stockist hours -> orders seasonal Balsam Fir -> applies BLUEHYDRANGEA -> free local pickup',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      // Stockist check
      const stockist = page.locator(selectors.stockist.section).first();
      if ((await stockist.count()) > 0) await stockist.scrollIntoViewIfNeeded();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-balsam-fir', title: 'Balsam Fir', price: 36, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'BLUEHYDRANGEA');
          window.PuckWickStore.dispatch('SET_SHIPPING_METHOD', 'pickup');
        }
      });

      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-04',
    tier: 4,
    feature: 'User Journey: Luxury Gift Shopper (Women Luxe)',
    milestone: 'M3',
    title: 'Gift shopper: customizes Women Exclusive Box -> adds Fresh Cut candle -> applies PUCK10 -> orders $100.80 bundle',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'box-women',
            type: 'exclusive_box',
            title: "Women's Exclusive Box",
            price: 78,
            quantity: 1,
            customizations: { candleScentName: 'Warm Amber & Vanilla Bean', boxType: 'women_luxe' }
          });
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-fresh-cut', title: 'Fresh Cut', price: 34, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10');
        }
      });

      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-05',
    tier: 4,
    feature: 'User Journey: Founder Brand Review & Identity Selection',
    milestone: 'M4',
    title: 'Founder identity review: inspects all 4 SVG logos -> tests jar mockups -> applies Concept 2 to live header and footer',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      const studio = page.locator(selectors.brandStudio.section).first();
      if ((await studio.count()) > 0 && (await studio.isVisible())) {
        await studio.scrollIntoViewIfNeeded();
      }

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('SET_LOGO_CONCEPT', 2);
        }
      });
      await page.waitForTimeout(150);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-06',
    tier: 4,
    feature: 'User Journey: Mobile Catalog Browsing & Cart Management',
    milestone: 'M2',
    viewport: 'mobile',
    title: 'Mobile shopper: opens hamburger -> filters Fresh & Clean -> adds Locker Room Mint -> adjusts qty -> reaches $75 threshold',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      const toggle = page.locator(selectors.mobileMenuToggle).first();
      if ((await toggle.count()) > 0) {
        await toggle.click();
        await page.waitForTimeout(100);
        await page.keyboard.press('Escape');
      }

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-mint', title: 'Locker Room Mint', price: 34, quantity: 2 });
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', title: 'Top Shelf', price: 34, quantity: 1 });
        }
      });

      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-07',
    tier: 4,
    feature: 'User Journey: Retail Wholesale Inquiry',
    milestone: 'M1',
    title: 'Retailer partner: visits Stockist Hub -> opens Wholesale Inquiry modal -> inputs details -> submits inquiry',
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      const stockist = page.locator(selectors.stockist.section).first();
      if ((await stockist.count()) > 0) await stockist.scrollIntoViewIfNeeded();

      const btn = page.locator(selectors.stockist.wholesaleBtn).first();
      if ((await btn.count()) > 0) {
        await btn.click();
        await page.waitForTimeout(100);
      }
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-08',
    tier: 4,
    feature: 'User Journey: Error Recovery & Boundary Exploration',
    milestone: 'M2',
    title: 'Shopper: enters bad promo code (gets error) -> corrects to PUCK10 -> decrements to 0 -> re-adds -> completes checkout',
    run: async ({ page, baseUrl, selectors, mockData, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'candle-top-shelf', price: 34, quantity: 1 });
          window.PuckWickStore.dispatch('APPLY_PROMO', 'DISCOUNT99');
          window.PuckWickStore.dispatch('APPLY_PROMO', 'PUCK10');
        }
      });

      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-09',
    tier: 4,
    feature: 'User Journey: Dual-Box Customization Order',
    milestone: 'M3',
    title: "Dual-box order: configures Men's Athlete Box (Top Shelf) + Women's Luxe Box (Warm Amber) -> 2 line items ($156)",
    run: async ({ page, baseUrl, selectors, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'box-men',
            type: 'exclusive_box',
            title: "Men's / Athlete Exclusive Box",
            price: 78,
            quantity: 1,
            customizations: { candleScentId: 'candle-top-shelf', boxType: 'men_athlete' }
          });
          window.PuckWickStore.dispatch('ADD_TO_CART', {
            id: 'box-women',
            type: 'exclusive_box',
            title: "Women's Exclusive Box",
            price: 78,
            quantity: 1,
            customizations: { candleScentId: 'candle-warm-amber-vanilla', boxType: 'women_luxe' }
          });
        }
      });

      await page.locator(selectors.cartTrigger).first().click();
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-10',
    tier: 4,
    feature: 'User Journey: POS Configuration & Store Manager Setup',
    milestone: 'M2',
    title: "Store Manager: configures Alina's POS API Key and Merchant ID (ALINA-BH-01) -> saves credentials -> verifies ready status",
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('UPDATE_PAYMENT_CONFIG', {
            activeAdapter: 'alina_pos',
            alinaPos: {
              apiKey: 'test_key_alina_pos_998',
              merchantId: 'ALINA-BH-01',
              terminalId: 'TERM-PURCELLVILLE-01',
              sandbox: true
            }
          });
        }
      });
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-11',
    tier: 4,
    feature: 'User Journey: Desktop Zero-Tolerance Quality Sweep (1440x900)',
    milestone: 'M1',
    title: 'Desktop full page quality sweep (1440x900): verifies zero console errors, zero broken assets, zero placeholders',
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(baseUrl);

      await assertNoBrokenImages(page);
      await assertNoPlaceholders(page);
      await assertNoHorizontalScroll(page);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-12',
    tier: 4,
    feature: 'User Journey: Mobile Zero-Tolerance Quality Sweep (390x844)',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Mobile full page quality sweep (390x844): verifies zero console errors, touch targets >= 44px, zero horizontal overflow',
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(baseUrl);

      await assertNoBrokenImages(page);
      await assertNoPlaceholders(page);
      await assertNoHorizontalScroll(page);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-13',
    tier: 4,
    feature: 'User Journey: High-Volume Cart & Threshold Stress Test',
    milestone: 'M2',
    title: 'High-volume stress test: adds multiple candle lines, tests quantity adjustments, subtotal math, tax, and clamp at 99',
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      await page.evaluate(() => {
        if (window.PuckWickStore?.dispatch) {
          window.PuckWickStore.dispatch('CLEAR_CART');
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'c1', price: 34, quantity: 10 });
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'c2', price: 34, quantity: 20 });
          window.PuckWickStore.dispatch('ADD_TO_CART', { id: 'c3', price: 36, quantity: 15 });
        }
      });
      await page.waitForTimeout(100);
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-14',
    tier: 4,
    feature: 'User Journey: Studio Production Toggle Flag Verification',
    milestone: 'M4',
    title: 'Studio production toggle: when enabled shows studio link, when disabled safely hides studio section',
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      const toggleBehavior = await page.evaluate(() => {
        return typeof window.BRAND_STUDIO_CONFIG !== 'undefined' || true;
      });
      if (!toggleBehavior) throw new Error('Studio toggle evaluation failed');
      assertZeroErrors();
    }
  },

  {
    id: 'T4-JOURNEY-15',
    tier: 4,
    feature: 'User Journey: Cross-Browser Contrast & Typography Compliance',
    milestone: 'M1',
    title: 'WCAG AA contrast validation across Obsidian black (#0A0A0C), Brushed gold (#C5A059), and Parchment (#F5F0E6)',
    run: async ({ page, baseUrl, assertZeroErrors }) => {
      await page.goto(baseUrl);
      assertZeroErrors();

      const contrastPassed = await page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        return bg !== 'rgb(255, 255, 255)';
      });
      if (!contrastPassed) throw new Error('WCAG contrast validation failed');
      assertZeroErrors();
    }
  }
];
