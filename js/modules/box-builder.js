/**
 * Puck & Wick Interactive Exclusive Box Builder & Dual-Action Odor Science Module
 * Implements Men's/Athlete vs Women's Luxury Box Customizer ($78 bundle / $98 value),
 * custom candle scent selection (retaining scent on edition switch per EC9),
 * distinct cart line item creation (EC10), and Molecular Odor Science Breakdown.
 */

import { EXCLUSIVE_BOX_EDITIONS, ODOR_SCIENCE_DATA } from '../data/box-data.js';
import { getAllProducts, getProductById } from '../data/products.js';
import { getIcon, getCharcoalScienceSvg, getMetazeneScienceSvg } from '../utils/svg-assets.js';

function getBoxPresentationSvg(edition, candleProduct) {
  const isWomen = edition === 'women_luxe';
  const photoHref = isWomen ? 'assets/images/box-womens.jpg' : 'assets/images/box-athlete.jpg';
  const candleName = (candleProduct?.name || 'TOP SHELF').toUpperCase();
  const editionTitle = isWomen ? "WOMEN'S LUXURY CURATION" : "MEN'S / ATHLETE EDITION";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 420" width="100%" height="100%" class="box-presentation-svg" role="img" aria-label="${isWomen ? "Women's Exclusive Box Presentation" : "Men's Athlete Exclusive Box Presentation"}">
      <defs>
        <clipPath id="box-photo-clip">
          <rect x="8" y="8" width="504" height="404" rx="14" />
        </clipPath>
        <linearGradient id="box-photo-vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#07080A" stop-opacity="0.65" />
          <stop offset="22%" stop-color="#07080A" stop-opacity="0" />
          <stop offset="72%" stop-color="#07080A" stop-opacity="0" />
          <stop offset="100%" stop-color="#07080A" stop-opacity="0.92" />
        </linearGradient>
      </defs>

      <g clip-path="url(#box-photo-clip)">
        <image href="${photoHref}" x="8" y="8" width="504" height="404" preserveAspectRatio="xMidYMid slice" />
        <rect x="8" y="8" width="504" height="404" fill="url(#box-photo-vignette)" />

        <!-- Top Minimalist Edition Header -->
        <text x="260" y="38" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="600" letter-spacing="4" fill="#FAF5E8">
          PUCK &amp; WICK • ${editionTitle}
        </text>

        <!-- Bottom Minimalist Custom Candle Badge -->
        <rect x="44" y="352" width="432" height="44" rx="6" fill="rgba(11, 12, 14, 0.88)" stroke="rgba(197, 160, 89, 0.55)" stroke-width="1" />
        <text x="260" y="371" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13.5" font-weight="600" letter-spacing="2.5" fill="#FAF5E8">
          SELECTED CANDLE: ${candleName} (10 OZ SOY)
        </text>
        <text x="260" y="387" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="500" letter-spacing="2" fill="#C5A059">
          INCLUDES CHARCOAL + METAZENE® PUCK &amp; 8 OZ BODY CARE • SAVE $20
        </text>
      </g>

      <rect x="8" y="8" width="504" height="404" rx="14" fill="none" stroke="rgba(197, 160, 89, 0.45)" stroke-width="1.5" />
    </svg>
  `;
}

export function initBoxBuilder(store, openCartCallback) {
  const root = document.getElementById('box-builder-root');
  if (!root) return;

  const candles = getAllProducts();
  let feedbackMsg = '';

  const render = () => {
    const builderState = store.state.boxBuilder || {
      edition: 'men_athlete',
      selectedCandleId: 'candle-top-shelf'
    };

    const activeEditionKey = builderState.edition === 'women_luxe' ? 'women_luxe' : 'men_athlete';
    const editionConfig = EXCLUSIVE_BOX_EDITIONS[activeEditionKey];
    const selectedCandle = getProductById(builderState.selectedCandleId) || candles[0];

    root.innerHTML = `
      <div class="box-builder-wrapper">
        <!-- Top Edition Switcher Pills -->
        <div class="box-edition-switcher" role="tablist" aria-label="Select Exclusive Box Edition">
          <button
            type="button"
            role="tab"
            id="tab-edition-men"
            aria-selected="${activeEditionKey === 'men_athlete'}"
            aria-controls="box-customizer-panel"
            class="edition-toggle-btn ${activeEditionKey === 'men_athlete' ? 'active' : ''}"
            data-testid="edition-toggle-men"
            data-edition="men_athlete"
          >
            <span class="edition-tab-kicker">01 • Locker Room &amp; Home</span>
            <span class="edition-tab-title">Men's / Athlete Exclusive Box</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-edition-women"
            aria-selected="${activeEditionKey === 'women_luxe'}"
            aria-controls="box-customizer-panel"
            class="edition-toggle-btn ${activeEditionKey === 'women_luxe' ? 'active' : ''}"
            data-testid="edition-toggle-women"
            data-edition="women_luxe"
          >
            <span class="edition-tab-kicker">02 • Sanctuary &amp; Botanical</span>
            <span class="edition-tab-title">Women's Exclusive Box</span>
          </button>
        </div>

        <!-- Main 2-Column Customizer Stage -->
        <div class="box-customizer-grid" id="box-customizer-panel" role="tabpanel" aria-labelledby="${activeEditionKey === 'women_luxe' ? 'tab-edition-women' : 'tab-edition-men'}">
          <!-- Left Column: Visual Rigid Box Preview & Value Callout -->
          <div class="box-visual-stage">
            <div class="box-stage-header">
              <span class="badge badge-gold">${editionConfig.badge}</span>
              <div class="box-savings-pill">Save $${editionConfig.savings.toFixed(2)} Bundle Value</div>
            </div>

            <div class="box-svg-container">
              ${getBoxPresentationSvg(activeEditionKey, selectedCandle)}
            </div>

            <div class="box-selected-scent-banner">
              <div class="scent-banner-label">Configured Candle Pour:</div>
              <div class="scent-banner-value">
                <strong>${selectedCandle.name}</strong>${selectedCandle.subtitle ? ` (${selectedCandle.subtitle})` : (selectedCandle.tagline ? ` (${selectedCandle.tagline})` : '')}
              </div>
              <div class="scent-banner-notes">
                <span><strong>Top:</strong> ${selectedCandle.notes.top.join(', ')}</span> •
                <span><strong>Middle:</strong> ${selectedCandle.notes.middle.join(', ')}</span> •
                <span><strong>Base:</strong> ${selectedCandle.notes.base.join(', ')}</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Configuration Controls & Bundled Items -->
          <div class="box-controls-panel">
            <div class="box-panel-header">
              <h3 class="box-edition-heading">${editionConfig.title}</h3>
              <p class="box-edition-desc">${editionConfig.description}</p>

              <div class="box-price-row">
                <div class="box-bundle-price" data-testid="box-price">$${editionConfig.price.toFixed(2)}</div>
                <div class="box-compare-price">$${editionConfig.compareAtValue.toFixed(2)} Individual Value</div>
                <span class="box-free-ship-badge">✓ Unlocks Free Shipping ($75+)</span>
              </div>
            </div>

            <!-- Step 1: Select Full-Size Candle Scent -->
            <div class="box-step-block">
              <label for="box-scent-select-input" class="box-step-label">
                <span>Step 1: Choose Your 10 oz Hand-Poured Candle Scent</span>
                <span class="box-step-selected">${selectedCandle.name}</span>
              </label>

              <select
                id="box-scent-select-input"
                class="box-scent-select"
                data-testid="box-scent-select"
                aria-label="Choose candle scent for your Exclusive Box"
              >
                ${candles.map((c) => `
                  <option
                    value="${c.id}"
                    class="scent-option"
                    data-testid="box-scent-option-${c.id}"
                    ${c.id === selectedCandle.id ? 'selected' : ''}
                  >
                    ${c.name}${c.subtitle ? ` — ${c.subtitle}` : (c.tagline ? ` — ${c.tagline}` : '')} ($${c.price.toFixed(2)} Value)
                  </option>
                `).join('')}
              </select>

              <!-- Interactive Quick Scent Pills -->
              <div class="box-scent-pills" data-testid="scent-pills" role="group" aria-label="Quick scent selection pills">
                ${candles.map((c) => `
                  <button
                    type="button"
                    class="scent-option box-scent-pill ${c.id === selectedCandle.id ? 'active' : ''}"
                    data-testid="box-scent-option-pill-${c.id}"
                    data-candle-id="${c.id}"
                  >
                    ${c.name}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Step 2: Review 3 Included Full-Size Components -->
            <div class="box-step-block">
              <div class="box-step-label">
                <span>Step 2: Included Full-Size Box Components (3 Items)</span>
              </div>

              <div class="bundled-items" data-testid="bundled-items-list">
                <!-- Item 1: Selected Soy Candle -->
                <div class="bundled-item-card bundle-item-candle" data-testid="bundled-candle">
                  <div class="bundled-item-num">01</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${selectedCandle.name} Hand-Poured Soy Candle (10 oz)</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.candle.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.candle.detail}</p>
                  </div>
                </div>

                <!-- Item 2: Activated Charcoal + Metazene Puck -->
                <div class="bundled-item-card bundle-item-puck" data-testid="bundled-puck">
                  <div class="bundled-item-num">02</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${editionConfig.bundledItems.puck.title}</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.puck.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.puck.detail}</p>
                  </div>
                </div>

                <!-- Item 3: Odor-Eliminating Body Wash -->
                <div class="bundled-item-card bundle-item-bodywash" data-testid="bundled-bodywash">
                  <div class="bundled-item-num">03</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${editionConfig.bundledItems.bodyWash.title}</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.bodyWash.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.bodyWash.detail}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Configured Box to Cart CTA -->
            <div class="box-cta-row">
              <button
                type="button"
                class="btn btn-gold btn-lg add-exclusive-box-btn"
                data-testid="add-box-to-cart-btn"
                id="btn-add-box-to-cart"
              >
                ${getIcon('cart')}
                <span>Add Configured ${activeEditionKey === 'women_luxe' ? "Women's" : "Men's / Athlete"} Box to Cart • $${editionConfig.price.toFixed(2)}</span>
              </button>
              ${feedbackMsg ? `<div class="box-added-feedback" role="status" aria-live="polite">${feedbackMsg}</div>` : ''}
            </div>
          </div>
        </div>

        <!-- Feature 19: Dual-Action Odor Science Breakdown -->
        <div class="odor-science" id="odor-science" data-testid="odor-science-section">
          <div class="odor-science-header">
            <div class="section-kicker">
              ${getIcon('shield')}
              <span>${ODOR_SCIENCE_DATA.kicker}</span>
            </div>
            <h3 class="odor-science-title">${ODOR_SCIENCE_DATA.headline}</h3>
            <p class="odor-science-lead">${ODOR_SCIENCE_DATA.lead}</p>
          </div>

          <div class="odor-science-stages-grid">
            <!-- Stage 1: Activated Charcoal -->
            <div class="science-stage-card science-charcoal" data-testid="science-charcoal">
              <div class="science-stage-visual">
                ${getCharcoalScienceSvg()}
              </div>
              <div class="science-stage-content">
                <div class="science-stage-step">${ODOR_SCIENCE_DATA.stages[0].step}</div>
                <h4 class="science-stage-heading">${ODOR_SCIENCE_DATA.stages[0].title}</h4>
                <div class="science-stage-metric">${ODOR_SCIENCE_DATA.stages[0].metric}</div>
                <p class="science-stage-desc">${ODOR_SCIENCE_DATA.stages[0].description}</p>
              </div>
            </div>

            <!-- Stage 2: Metazene® Molecular Neutralization -->
            <div class="science-stage-card science-metazene" data-testid="science-metazene">
              <div class="science-stage-visual">
                ${getMetazeneScienceSvg()}
              </div>
              <div class="science-stage-content">
                <div class="science-stage-step">${ODOR_SCIENCE_DATA.stages[1].step}</div>
                <h4 class="science-stage-heading">${ODOR_SCIENCE_DATA.stages[1].title}</h4>
                <div class="science-stage-metric">${ODOR_SCIENCE_DATA.stages[1].metric}</div>
                <p class="science-stage-desc">${ODOR_SCIENCE_DATA.stages[1].description}</p>
              </div>
            </div>
          </div>

          <!-- Comparison: Conventional Masking Sprays vs Puck & Wick -->
          <div class="odor-comparison-grid">
            ${ODOR_SCIENCE_DATA.comparison.map((col) => `
              <div class="odor-comparison-card ${col.isPositive ? 'comparison-positive' : 'comparison-negative'}">
                <div class="comparison-card-header">
                  <span class="comparison-method">${col.method}</span>
                  <span class="comparison-verdict">${col.verdict}</span>
                </div>
                <ul class="comparison-points">
                  ${col.points.map((pt) => `
                    <li>
                      <span class="comparison-bullet">${col.isPositive ? '✓' : '✕'}</span>
                      <span>${pt}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind interactive events
    const menBtn = root.querySelector('[data-testid="edition-toggle-men"]');
    const womenBtn = root.querySelector('[data-testid="edition-toggle-women"]');
    const scentSelect = root.querySelector('[data-testid="box-scent-select"]');
    const scentPills = root.querySelectorAll('.box-scent-pill');
    const addBoxBtn = root.querySelector('[data-testid="add-box-to-cart-btn"]');

    if (menBtn) {
      menBtn.addEventListener('click', () => {
        feedbackMsg = '';
        store.dispatch('SET_BOX_EDITION', 'men_athlete');
      });
    }

    if (womenBtn) {
      womenBtn.addEventListener('click', () => {
        feedbackMsg = '';
        store.dispatch('SET_BOX_EDITION', 'women_luxe');
      });
    }

    if (scentSelect) {
      scentSelect.addEventListener('change', (e) => {
        feedbackMsg = '';
        store.dispatch('SET_BOX_CANDLE', e.target.value);
      });
    }

    scentPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const candleId = pill.getAttribute('data-candle-id');
        if (candleId) {
          feedbackMsg = '';
          store.dispatch('SET_BOX_CANDLE', candleId);
        }
      });
    });

    if (addBoxBtn) {
      addBoxBtn.addEventListener('click', () => {
        const customPayload = {
          boxType: activeEditionKey,
          editionTitle: editionConfig.title,
          candleScentId: selectedCandle.id,
          candleScentName: selectedCandle.name,
          puckItem: editionConfig.bundledItems.puck.title,
          bodyWashItem: editionConfig.bundledItems.bodyWash.title
        };

        store.dispatch('ADD_TO_CART', {
          id: `box-${activeEditionKey}-${selectedCandle.id}`,
          type: 'exclusive_box',
          title: `${editionConfig.title} (${selectedCandle.name})`,
          scent: `${selectedCandle.name} Candle + ${editionConfig.bundledItems.puck.title}`,
          price: editionConfig.price,
          quantity: 1,
          customOptions: customPayload,
          customizations: customPayload
        });

        feedbackMsg = `✓ Added ${editionConfig.title} (${selectedCandle.name}) to your cart!`;
        render();

        if (typeof openCartCallback === 'function') {
          openCartCallback();
        }
      });
    }
  };

  store.subscribe((state, action) => {
    if (action === 'SET_BOX_EDITION' || action === 'SET_BOX_CANDLE' || !action) {
      render();
    }
  });

  render();
}
