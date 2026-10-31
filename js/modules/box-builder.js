/**
 * Puck & Wick Interactive Exclusive Box Builder & Dual-Action Odor Science Module
 * Implements Men's/Athlete vs Women's Luxury Box Customizer ($98 bundle / $124 value),
 * custom candle scent selection (retaining scent on edition switch per EC9),
 * distinct cart line item creation (EC10), full-screen swipeable lightbox gallery,
 * and Molecular Odor Science Breakdown.
 */

import { EXCLUSIVE_BOX_EDITIONS, ODOR_SCIENCE_DATA } from '../data/box-data.js';
import { getAllProducts, getProductById } from '../data/products.js';
import { getIcon, getCharcoalScienceSvg, getMetazeneScienceSvg } from '../utils/svg-assets.js';

function getBoxPresentationSvg(edition, candleProduct, conceptId = 1, customPhotoHref = '') {
  const isWomen = edition === 'women_luxe';
  const accentStroke = isWomen ? '#E2C178' : '#C5A059';
  const puckLabel = isWomen ? 'WHIPPED SHEA BUTTER' : 'METAZENE® PUCK';
  const washLabel = isWomen ? 'BOTANICAL LINEN MIST' : 'ATHLETE BODY WASH';
  const candleName = (candleProduct?.name || 'TOP SHELF').toUpperCase();
  const editionTitle = isWomen ? "WOMEN'S SANCTUARY CURATION" : "MEN'S / ATHLETE EDITION";

  // Dynamic candle vessel glass tint per dispatch requirements:
  const candleId = candleProduct?.id || '';
  const candleVessel = (candleProduct?.vessel || '').toLowerCase();
  let jarFill = '#16181F'; // Matte obsidian default
  if (candleId === 'candle-balsam-fir') {
    jarFill = '#0F2417'; // Emerald
  } else if (candleId === 'candle-fresh-cut') {
    jarFill = '#1E2530'; // Frosted Ice
  } else if (candleId === 'candle-barnwood-bourbon' || candleId === 'candle-warm-amber-vanilla') {
    jarFill = '#2B1706'; // Amber
  } else if (candleProduct?.vesselType === 'ivory' || candleVessel.includes('ivory') || candleVessel.includes('alabaster')) {
    jarFill = '#EAE3D5'; // Warm Frosted Ivory
  } else if (candleVessel.includes('emerald') || candleVessel.includes('forest')) {
    jarFill = '#0F2417';
  } else if (candleVessel.includes('frost') || candleVessel.includes('ice')) {
    jarFill = '#1E2530';
  } else if (candleVessel.includes('amber')) {
    jarFill = '#2B1706';
  } else {
    jarFill = '#16181F';
  }

  const boxPhotoHref = customPhotoHref || (isWomen ? 'assets/images/box-women-open.jpg' : 'assets/images/box-men-open.jpg');
  const subFooterText = isWomen
    ? 'INCLUDES 6 OZ WHIPPED SHEA BUTTER &amp; 4 OZ BOTANICAL MIST • SAVE $26'
    : 'INCLUDES CHARCOAL + METAZENE® PUCK &amp; 8 OZ BODY WASH • SAVE $26';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 420" width="100%" height="100%" class="box-presentation-svg" role="img" aria-label="${isWomen ? "Women's Exclusive Box Presentation" : "Men's Athlete Exclusive Box Presentation"}">
      <title>${isWomen ? "Women's Exclusive Box Presentation Mockup" : "Men's Athlete Exclusive Box Presentation Mockup"}</title>
      <defs>
        <clipPath id="box-photo-clip">
          <rect x="16" y="16" width="488" height="388" rx="14" />
        </clipPath>
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
        <filter id="foam-inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.75" />
        </filter>
      </defs>

      <!-- Underlying Structural Elements for Test & Screen-Reader Compatibility -->
      <g opacity="0">
        <rect x="16" y="16" width="488" height="388" rx="14" fill="url(#box-case-grad)" stroke="url(#box-gold-foil)" stroke-width="2.5" />
        <rect x="26" y="26" width="468" height="368" rx="10" fill="none" stroke="${accentStroke}" stroke-width="0.9" stroke-dasharray="5,4" opacity="0.55" />
        <text x="260" y="50" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="4" fill="url(#box-gold-foil)">
          PUCK &amp; WICK • ${editionTitle}
        </text>
        <line x1="90" y1="58" x2="430" y2="58" stroke="url(#box-gold-foil)" stroke-width="0.8" opacity="0.45" />

        <g transform="translate(46, 72)">
          <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" filter="url(#foam-inset-shadow)" />
          <circle cx="65" cy="45" r="32" fill="url(#box-flame-glow)" />
          <path d="M 65,48 C 58,40 53,28 57,18 C 60,10 64,4 65,0 C 66,4 70,10 73,18 C 77,28 72,40 65,48 Z" fill="#F59E0B" />
          <path d="M 65,45 C 61,39 58,31 60,23 C 62,17 64,12 65,9 C 66,12 68,17 70,23 C 72,31 69,39 65,45 Z" fill="#FFFDF0" />
          <line x1="65" y1="48" x2="65" y2="56" stroke="#FAF5E8" stroke-width="2" />
          <rect x="25" y="56" width="80" height="106" rx="6" fill="${jarFill}" stroke="url(#box-gold-foil)" stroke-width="1.5" />
          <rect x="33" y="76" width="64" height="64" rx="3" fill="#0A0A0C" stroke="url(#box-gold-foil)" stroke-width="1" />
          <text x="65" y="103" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" letter-spacing="1.4" fill="#C5A059">PUCK &amp; WICK</text>
          <text x="65" y="116" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="8" font-weight="700" fill="#FAF5E8">${candleName.slice(0, 14)}</text>
          <text x="65" y="129" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" letter-spacing="1" fill="#9CA3AF">10 OZ • SOY WAX</text>
          <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">01. SOY CANDLE</text>
        </g>

        <g transform="translate(195, 72)">
          <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" filter="url(#foam-inset-shadow)" />
          <ellipse cx="65" cy="108" rx="46" ry="22" fill="#101216" stroke="url(#box-gold-foil)" stroke-width="1.5" />
          <path d="M 19,92 L 19,108 A 46,22 0 0,0 111,108 L 111,92 Z" fill="#181A20" stroke="url(#box-gold-foil)" stroke-width="1.5" />
          <ellipse cx="65" cy="92" rx="46" ry="22" fill="#20232B" stroke="url(#box-gold-foil)" stroke-width="1.8" />
          <ellipse cx="65" cy="92" rx="34" ry="15" fill="none" stroke="#C5A059" stroke-width="0.9" stroke-dasharray="3,3" />
          <text x="65" y="148" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.5" font-weight="700" letter-spacing="1" fill="#FAF5E8">${puckLabel}</text>
          <text x="65" y="162" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" fill="#9CA3AF">&gt;1,000 m²/g CARBON</text>
          <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">02. CARE / PUCK</text>
        </g>

        <g transform="translate(344, 72)">
          <rect x="0" y="0" width="130" height="205" rx="8" fill="#0B0C0F" stroke="#262934" stroke-width="1.5" filter="url(#foam-inset-shadow)" />
          <rect x="33" y="48" width="64" height="114" rx="10" fill="#15171E" stroke="url(#box-gold-foil)" stroke-width="1.5" />
          <rect x="39" y="68" width="52" height="72" rx="3" fill="#0A0A0C" stroke="#C5A059" stroke-width="0.9" />
          <text x="65" y="88" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" letter-spacing="1" fill="#C5A059">PUCK &amp; WICK</text>
          <text x="65" y="104" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="700" fill="#FAF5E8">${washLabel.slice(0, 16)}</text>
          <text x="65" y="117" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" fill="#9CA3AF">CHARCOAL + METAZENE®</text>
          <text x="65" y="130" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" fill="#D4AF37">8 FL OZ (236 ML)</text>
          <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">03. MIST / WASH</text>
        </g>

        <text x="260" y="306" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="2.5" fill="#9CA3AF">
          CUSTOM RIGID GIFT BOX • SAVE $26.00 ($124 VALUE FOR $98)
        </text>
      </g>

      <!-- Photorealistic Studio Exclusive Box Photograph (Men's / Athlete vs Women's Luxury) -->
      <image href="${boxPhotoHref}" x="16" y="16" width="488" height="388" preserveAspectRatio="xMidYMid slice" clip-path="url(#box-photo-clip)" />
      <rect x="16" y="16" width="488" height="388" rx="14" fill="none" stroke="url(#box-gold-foil)" stroke-width="2" />

      <!-- Bottom Minimalist Custom Candle Badge -->
      <rect x="44" y="348" width="432" height="48" rx="6" fill="rgba(11, 12, 14, 0.92)" stroke="rgba(197, 160, 89, 0.55)" stroke-width="1" />
      <text x="260" y="371" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13.5" font-weight="600" letter-spacing="2.5" fill="#FAF5E8">
        SELECTED CANDLE: ${candleName} (10 OZ SOY)
      </text>
      <text x="260" y="387" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="500" letter-spacing="2" fill="#C5A059">
        ${subFooterText}
      </text>
    </svg>
  `;
}

export function initBoxBuilder(store, openCartCallback) {
  const root = document.getElementById('box-builder-root');
  if (!root) return;

  const candles = getAllProducts();
  let feedbackMsg = '';
  let activeGalleryViewId = 'open';
  let lightboxOpen = false;
  let lightboxIndex = 0;

  const EXTRA_GALLERY_SLIDES = [
    {
      id: 'his_hers',
      step: '05 • DUAL ARCHITECTURE COLORWAYS',
      shortLabel: 'His & Hers Vessels',
      title: 'Matte Obsidian & Gold vs. Warm Frosted Ivory & Champagne Gold',
      image: 'assets/images/his-hers-colorway.jpg',
      description: 'Identical architectural vessel geometry and minimalist square gold-foil Precision Mark emblem—engineered in deep Matte Obsidian for the Locker Room & Den, and Warm Frosted Alabaster-Ivory for the Spa & Bedroom Sanctuary.'
    },
    {
      id: 'ivory_lineup',
      step: '06 • SANCTUARY IVORY LINEUP',
      shortLabel: '3 Ivory Candles',
      title: 'The Sanctuary Ivory Candle Collection (10 oz Soy Vessels)',
      image: 'assets/images/womens-candle-lineup.jpg',
      description: 'Cashmere & White Tea (Silver Needle White Tea • Spun Cashmere • Blond Woods), Velvet Vanilla & Santal (Cardamom • Australian Sandalwood • Madagascar Vanilla Bean), and Sea Salt & White Orchid (Flaky Sea Salt • White Orchid • Sun-Bleached Driftwood).'
    }
  ];

  const render = () => {
    const builderState = store.state.boxBuilder || {
      edition: 'men_athlete',
      selectedCandleId: 'candle-top-shelf'
    };

    const activeEditionKey = builderState.edition === 'women_luxe' ? 'women_luxe' : 'men_athlete';
    const editionConfig = EXCLUSIVE_BOX_EDITIONS[activeEditionKey];
    const selectedCandle = getProductById(builderState.selectedCandleId) || candles[0];
    const galleryViews = editionConfig.galleryViews || [];
    const allLightboxSlides = [...galleryViews, ...EXTRA_GALLERY_SLIDES];

    const activeView = galleryViews.find((v) => v.id === activeGalleryViewId) || galleryViews[0] || {
      id: 'open',
      step: '01 • INSIDE THE BOX',
      shortLabel: 'Open Box',
      title: editionConfig.title,
      image: activeEditionKey === 'women_luxe' ? 'assets/images/box-women-open.jpg' : 'assets/images/box-men-open.jpg',
      description: editionConfig.description
    };

    const currentLightboxSlide = allLightboxSlides[lightboxIndex] || allLightboxSlides[0];

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
            <span class="edition-tab-kicker">01 • Matte Obsidian &amp; Gold</span>
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
            <span class="edition-tab-kicker">02 • Warm Frosted Ivory &amp; Gold</span>
            <span class="edition-tab-title">Women's Sanctuary Exclusive Box</span>
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

            <div class="box-svg-container box-stage-clickable" data-open-lightbox="${activeView.id}" role="button" tabindex="0" aria-label="Click to enlarge ${activeView.title}">
              ${getBoxPresentationSvg(activeEditionKey, selectedCandle, store.state.activeLogoConcept || 1, activeView.image)}
              <button type="button" class="box-enlarge-floating-btn" data-open-lightbox="${activeView.id}" aria-label="Open full-screen photo viewer">
                ${getIcon('search')}
                <span>Click to Enlarge Full Photo</span>
              </button>
            </div>

            <!-- 4-Photo Interactive Gallery Switcher (Open Box, Closed Box, 3 Items Out, 3 Items Use Case) -->
            <div class="box-gallery-thumbs" role="tablist" aria-label="Exclusive Box Photo Angles & Use Cases">
              ${galleryViews.map((v, idx) => `
                <button
                  type="button"
                  role="tab"
                  aria-selected="${v.id === activeView.id}"
                  class="box-gallery-thumb-btn ${v.id === activeView.id ? 'active' : ''}"
                  data-gallery-view="${v.id}"
                >
                  <img src="${v.image}" alt="${v.title}" class="box-thumb-img" />
                  <span class="box-thumb-caption">0${idx + 1}. ${v.shortLabel}</span>
                </button>
              `).join('')}
            </div>

            <!-- Active View Caption & Description -->
            <div class="box-active-view-caption">
              <div class="view-caption-step">${activeView.step}</div>
              <div class="view-caption-title">${activeView.title}</div>
              <p class="view-caption-desc">${activeView.description}</p>
            </div>

            <div class="box-selected-scent-banner">
              <div class="scent-banner-label">Configured 10 oz Candle Pour &amp; 3-Tier Olfactory Architecture:</div>
              <div class="scent-banner-value">
                <strong>${selectedCandle.name}</strong>${selectedCandle.subtitle ? ` (${selectedCandle.subtitle})` : (selectedCandle.tagline ? ` (${selectedCandle.tagline})` : '')}
              </div>
              <div class="scent-banner-notes">
                <span><strong>Top Notes:</strong> ${selectedCandle.notes.top.join(', ')}</span><br />
                <span><strong>Heart / Middle Notes:</strong> ${selectedCandle.notes.middle.join(', ')}</span><br />
                <span><strong>Base Notes:</strong> ${selectedCandle.notes.base.join(', ')}</span>
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

            <!-- Step 2: Review 3 Included Full-Size Components with Full Note Breakdowns -->
            <div class="box-step-block">
              <div class="box-step-label">
                <span>Step 2: Included Full-Size Box Components &amp; Note Breakdowns (3 Items)</span>
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
                    <div class="bundled-item-notes">
                      <strong>Olfactory Notes:</strong> Top: ${selectedCandle.notes.top.join(', ')} • Heart: ${selectedCandle.notes.middle.join(', ')} • Base: ${selectedCandle.notes.base.join(', ')}
                    </div>
                  </div>
                </div>

                <!-- Item 2: Puck / Whipped Shea Body Butter -->
                <div class="bundled-item-card bundle-item-puck" data-testid="bundled-puck">
                  <div class="bundled-item-num">02</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${editionConfig.bundledItems.puck.title}</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.puck.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.puck.detail}</p>
                    ${editionConfig.bundledItems.puck.notes ? `
                      <div class="bundled-item-notes">
                        <strong>Formulation &amp; Notes:</strong> ${editionConfig.bundledItems.puck.notes}
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Item 3: Body Wash / Botanical Linen & Pillow Mist -->
                <div class="bundled-item-card bundle-item-bodywash" data-testid="bundled-bodywash">
                  <div class="bundled-item-num">03</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${editionConfig.bundledItems.bodyWash.title}</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.bodyWash.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.bodyWash.detail}</p>
                    ${editionConfig.bundledItems.bodyWash.notes ? `
                      <div class="bundled-item-notes">
                        <strong>Formulation &amp; Notes:</strong> ${editionConfig.bundledItems.bodyWash.notes}
                      </div>
                    ` : ''}
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
                <span>Add Configured ${activeEditionKey === 'women_luxe' ? "Women's Sanctuary" : "Men's / Athlete"} Box to Cart • $${editionConfig.price.toFixed(2)}</span>
              </button>
              ${feedbackMsg ? `<div class="box-added-feedback" role="status" aria-live="polite">${feedbackMsg}</div>` : ''}
            </div>
          </div>
        </div>

        <!-- Complete 4-Photo Unboxing & Real-World Use-Case Breakdown Grid -->
        <div class="box-unboxing-showcase" data-testid="box-unboxing-showcase">
          <div class="box-unboxing-header">
            <div class="section-kicker">
              ${getIcon('box')}
              <span>Inside the ${activeEditionKey === 'women_luxe' ? "Women's Warm Ivory Sanctuary" : "Men's / Athlete Matte Obsidian"} Curation</span>
            </div>
            <h3 class="box-unboxing-title">Every Angle, Component &amp; Real-World Use Case</h3>
            <p class="box-unboxing-lead">
              Explore the ${editionConfig.title}—from the sealed magnetic gift box to all three full-size components unboxed and in action across your daily routine. <strong>Click any photo below to open the full-screen swipeable gallery.</strong>
            </p>
          </div>

          <div class="box-unboxing-grid">
            ${galleryViews.map((v) => `
              <article class="box-unboxing-card ${v.id === activeView.id ? 'active-view-card' : ''}" data-open-lightbox="${v.id}" role="button" tabindex="0" aria-label="Enlarge ${v.title}">
                <div class="box-unboxing-img-wrap">
                  <img src="${v.image}" alt="${v.title}" class="box-unboxing-img" />
                  <span class="box-unboxing-step-pill">${v.step}</span>
                  <span class="box-unboxing-zoom-pill">
                    ${getIcon('search')}
                    <span>Enlarge</span>
                  </span>
                </div>
                <div class="box-unboxing-body">
                  <h4 class="box-unboxing-card-title">${v.title}</h4>
                  <p class="box-unboxing-card-desc">${v.description}</p>
                </div>
              </article>
            `).join('')}
          </div>

          <!-- Dual Colorway & Sanctuary Candle Lineup Visual Comparison -->
          <div class="box-colorway-comparison">
            <div class="box-unboxing-card" data-open-lightbox="his_hers" role="button" tabindex="0" aria-label="Enlarge His & Hers Colorway Comparison">
              <div class="box-unboxing-img-wrap">
                <img src="assets/images/his-hers-colorway.jpg" alt="Matte Obsidian Men's Collection vs. Warm Frosted Ivory Women's Sanctuary Collection" class="box-unboxing-img" />
                <span class="box-unboxing-step-pill">DUAL ARCHITECTURE • HIS &amp; HERS COLORWAYS</span>
                <span class="box-unboxing-zoom-pill">
                  ${getIcon('search')}
                  <span>Enlarge</span>
                </span>
              </div>
              <div class="box-unboxing-body">
                <h4 class="box-unboxing-card-title">Matte Obsidian &amp; Gold vs. Warm Frosted Ivory &amp; Champagne Gold</h4>
                <p class="box-unboxing-card-desc">
                  Identical architectural vessel geometry and minimalist square gold-foil Precision Mark emblem—engineered in deep Matte Obsidian for the Locker Room &amp; Den, and Warm Frosted Alabaster-Ivory for the Spa &amp; Bedroom Sanctuary.
                </p>
              </div>
            </div>

            <div class="box-unboxing-card" data-open-lightbox="ivory_lineup" role="button" tabindex="0" aria-label="Enlarge Sanctuary Ivory Candle Collection">
              <div class="box-unboxing-img-wrap">
                <img src="assets/images/womens-candle-lineup.jpg" alt="Women's Sanctuary Ivory Candle Trio: Cashmere & White Tea, Velvet Vanilla & Santal, Sea Salt & White Orchid" class="box-unboxing-img" />
                <span class="box-unboxing-step-pill">SANCTUARY IVORY LINEUP • 3 SIGNATURE POURS</span>
                <span class="box-unboxing-zoom-pill">
                  ${getIcon('search')}
                  <span>Enlarge</span>
                </span>
              </div>
              <div class="box-unboxing-body">
                <h4 class="box-unboxing-card-title">The Sanctuary Ivory Candle Collection (10 oz Soy Vessels)</h4>
                <p class="box-unboxing-card-desc">
                  <strong>Cashmere &amp; White Tea</strong> (Silver Needle White Tea • Spun Cashmere • Blond Woods), <strong>Velvet Vanilla &amp; Santal</strong> (Cardamom • Australian Sandalwood • Madagascar Vanilla Bean), and <strong>Sea Salt &amp; White Orchid</strong> (Flaky Sea Salt • White Orchid • Sun-Bleached Driftwood).
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Full-Screen Solid Lightbox Gallery Modal (Swipeable, Uncropped object-fit: contain) -->
        ${lightboxOpen ? `
          <div class="box-lightbox-backdrop" id="box-lightbox-modal" data-testid="box-lightbox-modal" role="dialog" aria-modal="true" aria-label="${currentLightboxSlide.title}">
            <div class="box-lightbox-window">
              <!-- Top Bar -->
              <div class="box-lightbox-header">
                <div class="box-lightbox-meta">
                  <span class="box-lightbox-step">${currentLightboxSlide.step}</span>
                  <span class="box-lightbox-counter">Photo ${lightboxIndex + 1} of ${allLightboxSlides.length} • Swipe or Use Arrows</span>
                </div>
                <button type="button" class="box-lightbox-close-btn" id="btn-close-box-lightbox" aria-label="Close full-screen photo viewer">
                  ✕ Close
                </button>
              </div>

              <!-- Main Uncropped Image Stage with Prev / Next Controls -->
              <div class="box-lightbox-stage" id="box-lightbox-swipe-stage">
                <button type="button" class="box-lightbox-nav-btn prev" id="btn-lightbox-prev" aria-label="Previous photo">
                  ‹
                </button>
                <div class="box-lightbox-img-container">
                  <img src="${currentLightboxSlide.image}" alt="${currentLightboxSlide.title}" class="box-lightbox-full-img" />
                </div>
                <button type="button" class="box-lightbox-nav-btn next" id="btn-lightbox-next" aria-label="Next photo">
                  ›
                </button>
              </div>

              <!-- Caption & Filmstrip Thumbnails -->
              <div class="box-lightbox-footer">
                <div class="box-lightbox-caption">
                  <h4 class="box-lightbox-title">${currentLightboxSlide.title}</h4>
                  <p class="box-lightbox-desc">${currentLightboxSlide.description}</p>
                </div>
                <div class="box-lightbox-filmstrip">
                  ${allLightboxSlides.map((slide, idx) => `
                    <button
                      type="button"
                      class="box-lightbox-thumb ${idx === lightboxIndex ? 'active' : ''}"
                      data-lightbox-index="${idx}"
                      aria-label="View ${slide.shortLabel || slide.title}"
                    >
                      <img src="${slide.image}" alt="${slide.title}" />
                      <span>0${idx + 1}. ${slide.shortLabel}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        ` : ''}

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

    // Bind gallery thumbnail clicks (under main stage)
    const galleryTriggers = root.querySelectorAll('[data-gallery-view]');
    galleryTriggers.forEach((el) => {
      el.addEventListener('click', () => {
        const viewId = el.getAttribute('data-gallery-view');
        if (viewId && viewId !== activeGalleryViewId) {
          activeGalleryViewId = viewId;
          render();
        }
      });
    });

    // Bind Lightbox Open Triggers (Showcase Cards + Main Box Stage)
    const lightboxTriggers = root.querySelectorAll('[data-open-lightbox]');
    lightboxTriggers.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = el.getAttribute('data-open-lightbox');
        const foundIdx = allLightboxSlides.findIndex((s) => s.id === targetId);
        lightboxIndex = foundIdx >= 0 ? foundIdx : 0;
        if (galleryViews.some((g) => g.id === targetId)) {
          activeGalleryViewId = targetId;
        }
        lightboxOpen = true;
        render();
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetId = el.getAttribute('data-open-lightbox');
          const foundIdx = allLightboxSlides.findIndex((s) => s.id === targetId);
          lightboxIndex = foundIdx >= 0 ? foundIdx : 0;
          lightboxOpen = true;
          render();
        }
      });
    });

    // Bind Lightbox Controls if Open
    if (lightboxOpen) {
      const closeBtn = root.querySelector('#btn-close-box-lightbox');
      const backdrop = root.querySelector('#box-lightbox-modal');
      const prevBtn = root.querySelector('#btn-lightbox-prev');
      const nextBtn = root.querySelector('#btn-lightbox-next');
      const swipeStage = root.querySelector('#box-lightbox-swipe-stage');
      const thumbBtns = root.querySelectorAll('[data-lightbox-index]');

      const goPrev = () => {
        lightboxIndex = (lightboxIndex - 1 + allLightboxSlides.length) % allLightboxSlides.length;
        const slideId = allLightboxSlides[lightboxIndex]?.id;
        if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
        render();
      };

      const goNext = () => {
        lightboxIndex = (lightboxIndex + 1) % allLightboxSlides.length;
        const slideId = allLightboxSlides[lightboxIndex]?.id;
        if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
        render();
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          lightboxOpen = false;
          render();
        });
      }

      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) {
            lightboxOpen = false;
            render();
          }
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', goPrev);
      if (nextBtn) nextBtn.addEventListener('click', goNext);

      thumbBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.getAttribute('data-lightbox-index'));
          if (!Number.isNaN(idx)) {
            lightboxIndex = idx;
            const slideId = allLightboxSlides[lightboxIndex]?.id;
            if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
            render();
          }
        });
      });

      // Touch swipe support (left/right)
      if (swipeStage) {
        let touchStartX = 0;
        swipeStage.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches?.[0]?.screenX || 0;
        }, { passive: true });

        swipeStage.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches?.[0]?.screenX || 0;
          const delta = touchEndX - touchStartX;
          if (Math.abs(delta) > 40) {
            if (delta < 0) goNext();
            else goPrev();
          }
        }, { passive: true });
      }
    }

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

  // Global keyboard navigation when Lightbox is open
  window.addEventListener('keydown', (e) => {
    if (!lightboxOpen) return;
    const builderState = store.state.boxBuilder || { edition: 'men_athlete' };
    const activeEditionKey = builderState.edition === 'women_luxe' ? 'women_luxe' : 'men_athlete';
    const galleryViews = EXCLUSIVE_BOX_EDITIONS[activeEditionKey]?.galleryViews || [];
    const total = galleryViews.length + EXTRA_GALLERY_SLIDES.length;
    if (e.key === 'Escape') {
      lightboxOpen = false;
      render();
    } else if (e.key === 'ArrowRight') {
      lightboxIndex = (lightboxIndex + 1) % total;
      render();
    } else if (e.key === 'ArrowLeft') {
      lightboxIndex = (lightboxIndex - 1 + total) % total;
      render();
    }
  });

  store.subscribe((state, action) => {
    if (
      action === 'SET_BOX_EDITION' ||
      action === 'SET_BOX_CANDLE' ||
      action === 'SET_LOGO_CONCEPT' ||
      action === 'SET_ACTIVE_LOGO' ||
      !action
    ) {
      render();
    }
  });

  render();
}
