/**
 * Puck & Wick Interactive Exclusive Box Builder & Dual-Action Odor Science Module
 * Implements Men's/Athlete vs Women's Luxury Box Customizer ($78 bundle / $98 value),
 * custom candle scent selection (retaining scent on edition switch per EC9),
 * distinct cart line item creation (EC10), and Molecular Odor Science Breakdown.
 */

import { EXCLUSIVE_BOX_EDITIONS, ODOR_SCIENCE_DATA } from '../data/box-data.js';
import { getAllProducts, getProductById } from '../data/products.js';
import { getIcon } from '../utils/svg-assets.js';

function getBoxPresentationSvg(edition, candleProduct) {
  const isWomen = edition === 'women_luxe';
  const accentStroke = isWomen ? '#E2C178' : '#C5A059';
  const puckLabel = isWomen ? 'BOTANICAL LINEN PUCK' : 'METAZENE® PUCK';
  const washLabel = isWomen ? 'LUXE SPA BODY WASH' : 'ATHLETE BODY WASH';
  const candleName = (candleProduct?.name || 'TOP SHELF').toUpperCase();

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" class="box-presentation-svg" role="img" aria-label="${isWomen ? "Women's Exclusive Box Presentation" : "Men's Athlete Exclusive Box Presentation"}">
      <defs>
        <linearGradient id="box-case-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1A1C23" />
          <stop offset="50%" stop-color="#101115" />
          <stop offset="100%" stop-color="#07080A" />
        </linearGradient>
        <linearGradient id="box-gold-foil" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8A6623" />
          <stop offset="30%" stop-color="#D4AF37" />
          <stop offset="55%" stop-color="#FDF6C7" />
          <stop offset="80%" stop-color="#C5A059" />
          <stop offset="100%" stop-color="#7B5B20" />
        </linearGradient>
        <radialGradient id="box-flame-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Outer Rigid Magnetic Presentation Box -->
      <rect x="16" y="16" width="488" height="308" rx="14" fill="url(#box-case-grad)" stroke="url(#box-gold-foil)" stroke-width="2.5" />
      <rect x="26" y="26" width="468" height="288" rx="10" fill="none" stroke="${accentStroke}" stroke-width="0.9" stroke-dasharray="5,4" opacity="0.55" />

      <!-- Box Header Bar -->
      <text x="260" y="52" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="4" fill="url(#box-gold-foil)">
        PUCK &amp; WICK • ${isWomen ? "WOMEN'S LUXURY CURATION" : "MEN'S / ATHLETE EDITION"}
      </text>
      <line x1="90" y1="62" x2="430" y2="62" stroke="url(#box-gold-foil)" stroke-width="0.8" opacity="0.45" />

      <!-- Slot 1: 10 oz Hand-Poured Soy Candle -->
      <g transform="translate(46, 80)">
        <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" />
        <circle cx="65" cy="45" r="32" fill="url(#box-flame-glow)" />
        <!-- Flame -->
        <path d="M 65,48 C 58,40 53,28 57,18 C 60,10 64,4 65,0 C 66,4 70,10 73,18 C 77,28 72,40 65,48 Z" fill="#F59E0B" />
        <path d="M 65,45 C 61,39 58,31 60,23 C 62,17 64,12 65,9 C 66,12 68,17 70,23 C 72,31 69,39 65,45 Z" fill="#FFFDF0" />
        <line x1="65" y1="48" x2="65" y2="56" stroke="#FAF5E8" stroke-width="2" />
        <!-- Jar Body -->
        <rect x="25" y="56" width="80" height="106" rx="6" fill="#16181F" stroke="url(#box-gold-foil)" stroke-width="1.5" />
        <rect x="33" y="76" width="64" height="64" rx="3" fill="#0A0A0C" stroke="url(#box-gold-foil)" stroke-width="1" />
        <text x="65" y="96" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7.5" font-weight="700" letter-spacing="1.5" fill="#C5A059">PUCK &amp; WICK</text>
        <text x="65" y="113" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="8.5" font-weight="700" fill="#FAF5E8">${candleName.slice(0, 14)}</text>
        <text x="65" y="128" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="600" letter-spacing="1" fill="#9CA3AF">10 OZ • SOY WAX</text>
        <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">01. SOY CANDLE</text>
      </g>

      <!-- Slot 2: Activated Charcoal & Metazene® Puck -->
      <g transform="translate(195, 80)">
        <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" />
        <!-- Puck 3D Cylinder -->
        <ellipse cx="65" cy="108" rx="46" ry="22" fill="#101216" stroke="url(#box-gold-foil)" stroke-width="1.5" />
        <path d="M 19,92 L 19,108 A 46,22 0 0,0 111,108 L 111,92 Z" fill="#181A20" stroke="url(#box-gold-foil)" stroke-width="1.5" />
        <ellipse cx="65" cy="92" rx="46" ry="22" fill="#20232B" stroke="url(#box-gold-foil)" stroke-width="1.8" />
        <ellipse cx="65" cy="92" rx="34" ry="15" fill="none" stroke="#C5A059" stroke-width="0.9" stroke-dasharray="3,3" />
        <!-- Vent Pores -->
        <circle cx="50" cy="89" r="2" fill="#D4AF37" />
        <circle cx="65" cy="86" r="2" fill="#D4AF37" />
        <circle cx="80" cy="89" r="2" fill="#D4AF37" />
        <circle cx="57" cy="96" r="2" fill="#D4AF37" />
        <circle cx="73" cy="96" r="2" fill="#D4AF37" />
        <text x="65" y="148" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.5" font-weight="700" letter-spacing="1" fill="#FAF5E8">${puckLabel}</text>
        <text x="65" y="162" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" fill="#9CA3AF">&gt;1,000 m²/g CARBON</text>
        <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">02. ODOR PUCK</text>
      </g>

      <!-- Slot 3: Odor-Eliminating Body Wash (8 oz) -->
      <g transform="translate(344, 80)">
        <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" />
        <!-- Pump Dispenser Top -->
        <rect x="57" y="24" width="16" height="14" rx="2" fill="url(#box-gold-foil)" />
        <path d="M 55,24 L 84,24 L 88,30 L 55,30 Z" fill="url(#box-gold-foil)" />
        <rect x="61" y="38" width="8" height="10" fill="#9CA3AF" />
        <!-- Bottle Body -->
        <rect x="33" y="48" width="64" height="114" rx="10" fill="#15171E" stroke="url(#box-gold-foil)" stroke-width="1.5" />
        <rect x="39" y="68" width="52" height="72" rx="3" fill="#0A0A0C" stroke="#C5A059" stroke-width="0.9" />
        <text x="65" y="88" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" letter-spacing="1" fill="#C5A059">PUCK &amp; WICK</text>
        <text x="65" y="104" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="700" fill="#FAF5E8">${washLabel.slice(0, 16)}</text>
        <text x="65" y="117" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" fill="#9CA3AF">CHARCOAL + METAZENE®</text>
        <text x="65" y="130" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" fill="#D4AF37">8 FL OZ (236 ML)</text>
        <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">03. BODY WASH</text>
      </g>

      <!-- Bottom Stamp -->
      <text x="260" y="306" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="2.5" fill="#9CA3AF">
        CUSTOM RIGID GIFT BOX • SAVE $20.00 ($98 VALUE FOR $78)
      </text>
    </svg>
  `;
}

function getCharcoalScienceSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 150" class="science-diagram-svg" role="img" aria-label="Microporous Activated Charcoal Adsorption Diagram">
      <title>Microporous Activated Charcoal Physical Adsorption Matrix</title>
      <rect x="4" y="4" width="252" height="142" rx="10" fill="#0B0C10" stroke="#C5A059" stroke-width="1.2" opacity="0.9" />
      <!-- Carbon Lattice Hexagons -->
      <g stroke="#C5A059" stroke-width="1.2" fill="#14161D" opacity="0.85">
        <polygon points="70,45 90,33 110,45 110,68 90,80 70,68" />
        <polygon points="110,45 130,33 150,45 150,68 130,80 110,68" />
        <polygon points="150,45 170,33 190,45 190,68 170,80 150,68" />
        <polygon points="90,80 110,68 130,80 130,103 110,115 90,103" />
        <polygon points="130,80 150,68 170,80 170,103 150,115 130,103" />
      </g>
      <!-- Trapped Odor Molecules Inside Pores -->
      <circle cx="90" cy="56" r="6" fill="#F59E0B" />
      <circle cx="130" cy="56" r="6" fill="#34D399" />
      <circle cx="170" cy="56" r="6" fill="#F59E0B" />
      <circle cx="110" cy="91" r="6" fill="#34D399" />
      <circle cx="150" cy="91" r="6" fill="#F59E0B" />
      <text x="130" y="134" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="1.5" fill="#D4AF37">
        &gt;1,000 m²/g MICROPOROUS CARBON TRAP
      </text>
    </svg>
  `;
}

function getMetazeneScienceSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 150" class="science-diagram-svg" role="img" aria-label="Metazene Covalent Molecular Neutralization Diagram">
      <title>Metazene Chemical Counteraction and Covalent Bonding</title>
      <rect x="4" y="4" width="252" height="142" rx="10" fill="#0B0C10" stroke="#C5A059" stroke-width="1.2" opacity="0.9" />
      <!-- Left: Malodor Molecule -->
      <circle cx="65" cy="65" r="18" fill="#1F2430" stroke="#F87171" stroke-width="1.8" />
      <text x="65" y="68" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="700" fill="#F87171">NH₃/H₂S</text>
      <!-- Covalent Bond Link -->
      <line x1="83" y1="65" x2="122" y2="65" stroke="#D4AF37" stroke-width="2.5" stroke-dasharray="4,2" />
      <circle cx="102" cy="65" r="4" fill="#F59E0B" />
      <!-- Center: Metazene Ester Complex -->
      <circle cx="145" cy="65" r="22" fill="#171922" stroke="#D4AF37" stroke-width="2" />
      <text x="145" y="63" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7" font-weight="700" fill="#FAF5E8">METAZENE®</text>
      <text x="145" y="73" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" fill="#C5A059">ESTER BOND</text>
      <!-- Arrow Down: Precipitates Out of Air -->
      <path d="M 185,55 L 210,55 L 210,75 L 218,75 L 202,93 L 186,75 L 194,75 Z" fill="#34D399" opacity="0.85" />
      <text x="130" y="134" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="1.5" fill="#34D399">
        IRREVERSIBLE COVALENT NEUTRALIZATION
      </text>
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
            aria-selected="${activeEditionKey === 'men_athlete'}"
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
            aria-selected="${activeEditionKey === 'women_luxe'}"
            class="edition-toggle-btn ${activeEditionKey === 'women_luxe' ? 'active' : ''}"
            data-testid="edition-toggle-women"
            data-edition="women_luxe"
          >
            <span class="edition-tab-kicker">02 • Sanctuary &amp; Botanical</span>
            <span class="edition-tab-title">Women's Exclusive Box</span>
          </button>
        </div>

        <!-- Main 2-Column Customizer Stage -->
        <div class="box-customizer-grid">
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
