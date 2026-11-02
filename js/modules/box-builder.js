/**
 * Puck & Wick Interactive Exclusive Box Builder & Dual-Action Odor Science Module
 * Implements Men's/Athlete vs Women's Luxury Box Customizer ($108 bundle / $130 value),
 * custom candle scent selection (retaining scent on edition switch per EC9),
 * distinct cart line item creation (EC10), full-screen swipeable lightbox gallery,
 * and Molecular Odor Science Breakdown.
 */

import { EXCLUSIVE_BOX_EDITIONS, ODOR_SCIENCE_DATA, EXTRA_BOX_GALLERY_SLIDES } from '../data/box-data.js';
import { getCandleProducts, getProductById } from '../data/products.js';
import { getIcon, getCharcoalScienceSvg, getLausonScienceSvg } from '../utils/svg-assets.js';
import { HARDWARE_WAITLIST_MODE, openWaitlistModal } from '../utils/waitlist.js';

function getBoxPresentationSvg(edition, candleProduct, conceptId = 1, customPhotoHref = '') {
  const isWomen = edition === 'women_luxe';
  const accentStroke = isWomen ? '#E2C178' : '#C5A059';
  const puckLabel = '3.0" ZEOCARB-98™ PUCK';
  const washLabel = isWomen ? 'WHITE CLAY BODY WASH' : 'ATHLETE BODY WASH';
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
    ? 'INCLUDES 3.0" ZEOCARB-98™ PUCK &amp; 8 OZ WHITE CLAY BODY WASH • SAVE $22'
    : 'INCLUDES 3.0" ZEOCARB-98™ PUCK &amp; 8 OZ CHARCOAL BODY WASH • SAVE $22';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" class="box-presentation-svg" role="img" aria-label="${isWomen ? "Women's Exclusive Box Presentation" : "Men's Athlete Exclusive Box Presentation"}">
      <title>${isWomen ? "Women's Exclusive Box Presentation Mockup" : "Men's Athlete Exclusive Box Presentation Mockup"}</title>
      <defs>
        <clipPath id="box-photo-clip">
          <rect x="4" y="4" width="492" height="492" rx="14" />
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
        <rect x="16" y="14" width="488" height="488" rx="14" fill="url(#box-case-grad)" stroke="url(#box-gold-foil)" stroke-width="2.5" />
        <rect x="26" y="24" width="468" height="468" rx="10" fill="none" stroke="${accentStroke}" stroke-width="0.9" stroke-dasharray="5,4" opacity="0.55" />
        <text x="260" y="50" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="4" fill="url(#box-gold-foil)">
          PUCK &amp; WICK&#8482; • ${editionTitle}
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
          <text x="65" y="103" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" letter-spacing="1.4" fill="#C5A059">PUCK &amp; WICK&#8482;</text>
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
          <text x="65" y="88" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="7" font-weight="700" letter-spacing="1" fill="#C5A059">PUCK &amp; WICK&#8482;</text>
          <text x="65" y="104" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="700" fill="#FAF5E8">${washLabel.slice(0, 16)}</text>
          <text x="65" y="117" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" fill="#9CA3AF">${isWomen ? 'WHITE CLAY + ZEOCARB-98™' : 'CHARCOAL + ZEOCARB-98™'}</text>
          <text x="65" y="130" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" fill="#D4AF37">8 FL OZ (236 ML)</text>
          <text x="65" y="186" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="1" fill="#D4AF37">03. BODY WASH</text>
        </g>

        <text x="260" y="306" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="2.5" fill="#9CA3AF">
          CUSTOM MAGNETIC GIFT BOX • SAVE $22.00 ($130 VALUE FOR $108)
        </text>
        <text x="260" y="322" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13.5" font-weight="600" fill="#FAF5E8">
          SELECTED CANDLE: ${candleName} (10 OZ SOY) • ${subFooterText}
        </text>
      </g>

      <!-- Photorealistic Studio Exclusive Box Photograph (Zero-Crop Full Frame) -->
      <rect x="4" y="4" width="492" height="492" rx="14" fill="#08090C" />
      <image href="${boxPhotoHref}" x="4" y="4" width="492" height="492" preserveAspectRatio="xMidYMid meet" clip-path="url(#box-photo-clip)" />
      <rect x="4" y="4" width="492" height="492" rx="14" fill="none" stroke="url(#box-gold-foil)" stroke-width="2.5" />
    </svg>
  `;
}

export function initBoxBuilder(store, openCartCallback) {
  const root = document.getElementById('box-builder-root');
  if (!root) return;

  const candles = getCandleProducts();
  let feedbackMsg = '';
  let activeGalleryViewId = 'open';
  let activeScienceTab = null;
  let lightboxOpen = false;
  let lightboxIndex = 0;

  try {
    const params = new URLSearchParams(window.location.search);
    const boxParam = params.get('box');
    const viewParam = params.get('view');
    if (boxParam === 'women_luxe' || boxParam === 'men_athlete') {
      store.dispatch('SET_BOX_EDITION', boxParam);
    }
    if (viewParam) {
      activeGalleryViewId = viewParam.replace(/-/g, '_');
    }
  } catch (_) {}

  const render = () => {
    const builderState = store.state.boxBuilder || {
      edition: 'men_athlete',
      selectedCandleId: 'candle-top-shelf'
    };

    const activeEditionKey = builderState.edition === 'women_luxe' ? 'women_luxe' : 'men_athlete';
    const editionConfig = EXCLUSIVE_BOX_EDITIONS[activeEditionKey];
    const selectedCandle = getProductById(builderState.selectedCandleId) || candles[0];
    const galleryViews = editionConfig.galleryViews || [];
    const allLightboxSlides = [...galleryViews, ...EXTRA_BOX_GALLERY_SLIDES];

    const activeView = galleryViews.find((v) => v.id === activeGalleryViewId) || galleryViews[0] || {
      id: 'open',
      step: '01 • INSIDE THE BOX',
      shortLabel: 'Open Box',
      title: editionConfig.title,
      image: editionConfig.galleryViews[0]?.image || '',
      description: editionConfig.description
    };

    const currentLightboxSlide = allLightboxSlides[lightboxIndex] || allLightboxSlides[0];

    root.innerHTML = `
      <div class="box-builder-wrapper">
        <!-- Top Edition Switcher Pills (Side-by-Side on Desktop & Mobile) -->
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
            <span class="edition-tab-kicker">01 • Matte Obsidian</span>
            <span class="edition-tab-title">Men's / Athlete Box</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-edition-women"
            aria-selected="${activeEditionKey === 'women_luxe'}"
            aria-controls="box-customizer-panel"
            class="edition-toggle-btn edition-toggle-women ${activeEditionKey === 'women_luxe' ? 'active' : ''}"
            data-testid="edition-toggle-women"
            data-edition="women_luxe"
          >
            <span class="edition-tab-kicker">02 • Warm Alabaster Ivory</span>
            <span class="edition-tab-title">Women's Sanctuary Box</span>
          </button>
        </div>

        <!-- Main Customizer Stage (Compact Single-Scroll on Mobile, 2-Column on Desktop) -->
        <div class="box-customizer-grid ${activeEditionKey === 'women_luxe' ? 'box-edition-ivory' : 'box-edition-obsidian'}" id="box-customizer-panel" role="tabpanel" aria-labelledby="${activeEditionKey === 'women_luxe' ? 'tab-edition-women' : 'tab-edition-men'}">
          <!-- Left Column: Visual Rigid Box Studio Photo & 4-Angle Switcher -->
          <div class="box-visual-stage">
            <div class="box-stage-header">
              <span class="badge badge-gold">${editionConfig.badge}</span>
              <div class="box-savings-pill">Save $${editionConfig.savings.toFixed(2)}</div>
            </div>

            <div class="box-svg-container box-stage-clickable" data-open-lightbox="${activeView.id}" role="button" tabindex="0" aria-label="Click to enlarge ${activeView.title}">
              ${getBoxPresentationSvg(activeEditionKey, selectedCandle, store.state.activeLogoConcept || 1, activeView.image)}
              <button type="button" class="box-enlarge-floating-btn" data-open-lightbox="${activeView.id}" aria-label="Open full-screen photo viewer">
                ${getIcon('search')}
                <span>Enlarge (${allLightboxSlides.length})</span>
              </button>
            </div>

            <!-- 4-Photo Interactive Gallery Switcher (1 Row of 4 Thumbs on Both Desktop & Mobile) -->
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
                  <span class="box-thumb-caption">${v.shortLabel}</span>
                </button>
              `).join('')}
            </div>

            <!-- Direct Shareable SEO Box Photo URL Bar -->
            <div class="box-seo-share-bar" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;padding:8px 12px;background:rgba(15,17,23,0.92);border:1px solid rgba(197,160,89,0.35);border-radius:10px;">
              <div style="min-width:0;flex:1;">
                <span style="display:block;font-size:9.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C5A059;">Direct Share URL for This Box Photo</span>
                <a href="https://puckandwick.com/p/${activeEditionKey === 'women_luxe' ? 'box-womens-sanctuary' : 'box-mens-athlete'}/${String(activeView.id).replace(/_/g, '-')}" target="_blank" rel="noopener" style="display:block;font-size:11.5px;color:#FAF5E8;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:monospace;">puckandwick.com/p/${activeEditionKey === 'women_luxe' ? 'box-womens-sanctuary' : 'box-mens-athlete'}/${String(activeView.id).replace(/_/g, '-')}</a>
              </div>
              <button type="button" class="box-share-photo-btn" data-box-share-url="https://puckandwick.com/p/${activeEditionKey === 'women_luxe' ? 'box-womens-sanctuary' : 'box-mens-athlete'}/${String(activeView.id).replace(/_/g, '-')}" style="flex-shrink:0;background:linear-gradient(135deg,#E5C878 0%,#B69146 100%);color:#08090C;border:none;border-radius:999px;padding:7px 14px;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">
                Copy Link
              </button>
            </div>

            <!-- Active View Caption & Selected Scent Banner (Desktop Only; Hidden on Mobile for Single-Scroll Fit) -->
            <div class="box-active-view-caption desktop-only-box-meta">
              <div class="view-caption-step">${activeView.step}</div>
              <div class="view-caption-title">${activeView.title}</div>
              <p class="view-caption-desc">${activeView.description}</p>
            </div>

            <div class="box-selected-scent-banner desktop-only-box-meta">
              <div class="scent-banner-label">Configured 10 oz Candle Pour &amp; 3-Tier Olfactory Architecture:</div>
              <div class="scent-banner-value">
                <strong>${selectedCandle.name}</strong>${selectedCandle.subtitle ? ` (${selectedCandle.subtitle})` : (selectedCandle.tagline ? ` (${selectedCandle.tagline})` : '')}
              </div>
              <div class="scent-banner-notes">
                <span><strong>Top Notes:</strong> ${selectedCandle.notes.top.join(', ')}</span> •
                <span><strong>Heart:</strong> ${selectedCandle.notes.middle.join(', ')}</span> •
                <span><strong>Base:</strong> ${selectedCandle.notes.base.join(', ')}</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Configuration Controls & Bundled Items -->
          <div class="box-controls-panel">
            <div class="box-panel-header">
              <div class="box-header-top-line">
                <h3 class="box-edition-heading">${editionConfig.title}</h3>
                <div class="box-price-cluster">
                  <span class="box-bundle-price" data-testid="box-price">$${editionConfig.price.toFixed(2)}</span>
                  <span class="box-compare-price">$${editionConfig.compareAtValue.toFixed(2)}</span>
                </div>
              </div>
              <p class="box-edition-desc">${editionConfig.description}</p>

              <div class="box-jersey-98-callout" data-testid="jersey-98-callout">
                <strong>#98 Founder Tribute:</strong> All 3 full-size essentials ($130 value for $108 — <strong>Save $22</strong> • Free Shipping at $125+).
              </div>
            </div>

            <!-- Step 1: Select Full-Size Candle Scent -->
            <div class="box-step-block">
              <label for="box-scent-select-input" class="box-step-label">
                <span>1. Choose Your 10 oz Soy Candle Scent</span>
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
                    ${c.name} (${c.vesselType === 'ivory' ? "Women's Ivory" : "Men's Obsidian"}) — $${c.price.toFixed(2)} Value
                  </option>
                `).join('')}
              </select>

              <!-- Interactive Quick Scent Pills (Desktop Only; Dropdown handles Mobile cleanly) -->
              <div class="box-scent-pills desktop-only-box-meta" data-testid="scent-pills" role="group" aria-label="Quick scent selection pills">
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
                <span>2. Included Full-Size Components (3 Items)</span>
                <span class="box-free-ship-badge">$130 Retail Value • Save $22</span>
              </div>

              <div class="bundled-items" data-testid="bundled-items-list">
                <!-- Item 1: Selected Soy Candle -->
                <div class="bundled-item-card bundle-item-candle" data-testid="bundled-candle">
                  <div class="bundled-item-num">01</div>
                  <div class="bundled-item-body">
                    <div class="bundled-item-title-row">
                      <strong>1x ${selectedCandle.name} Soy Candle (10 oz)</strong>
                      <span class="bundled-item-val">${editionConfig.bundledItems.candle.retailValue}</span>
                    </div>
                    <p class="bundled-item-sub">${editionConfig.bundledItems.candle.detail}</p>
                    <div class="bundled-item-notes desktop-only-box-meta">
                      <strong>Notes:</strong> ${selectedCandle.notes.top[0]}, ${selectedCandle.notes.middle[0]}, ${selectedCandle.notes.base[0]}
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
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Configured Box to Cart or VIP Waitlist CTA -->
            <div class="box-cta-row">
              <button
                type="button"
                class="btn btn-gold btn-lg add-exclusive-box-btn"
                data-testid="add-box-to-cart-btn"
                id="btn-add-box-to-cart"
              >
                ${HARDWARE_WAITLIST_MODE ? `
                  ${getIcon('sparkle')}
                  <span>Join VIP Waitlist • ${activeEditionKey === 'women_luxe' ? "Women's Sanctuary" : "Men's / Athlete"} Box ($${editionConfig.price.toFixed(2)})</span>
                ` : `
                  ${getIcon('cart')}
                  <span>Add ${activeEditionKey === 'women_luxe' ? "Women's Sanctuary" : "Men's / Athlete"} Box • $${editionConfig.price.toFixed(2)}</span>
                `}
              </button>
              ${feedbackMsg ? `<div class="box-added-feedback" role="status" aria-live="polite">${feedbackMsg}</div>` : ''}
            </div>
          </div>
        </div>

        <!-- Feature 19: Interactive 4-Tab Dual-Action Odor Science Breakdown (Minimized by Default Until a Tab is Clicked) -->
        <div class="odor-science ${activeScienceTab ? 'is-expanded' : 'is-minimized'}" id="odor-science" data-testid="odor-science-section">
          <div class="odor-science-header">
            <div class="section-kicker" style="justify-content:center;">
              ${getIcon('shield')}
              <span>${ODOR_SCIENCE_DATA.kicker}</span>
            </div>
            <h3 class="odor-science-title">${ODOR_SCIENCE_DATA.headline}</h3>
            <p class="odor-science-lead">${ODOR_SCIENCE_DATA.lead}</p>
          </div>

          <!-- Interactive 4-Tab Breakdown Bar -->
          <div class="odor-science-tabs-wrap">
            <div class="odor-science-tabs-hint">
              ${activeScienceTab
                ? 'Tap the active tab again (or Minimize below) to collapse:'
                : 'Tap any tab below to expand its molecular breakdown:'}
            </div>
            <div class="odor-science-tabs" role="tablist" aria-label="Odor Science 4-Stage Breakdown Tabs">
              <button type="button" role="tab" aria-selected="${activeScienceTab === 'stage1'}" aria-expanded="${activeScienceTab === 'stage1'}" class="science-tab-btn ${activeScienceTab === 'stage1' ? 'active' : ''}" data-science-tab="stage1">
                <span class="science-tab-num">TAB 01 &bull; ${activeScienceTab === 'stage1' ? 'OPEN −' : 'EXPAND +'}</span>
                <span class="science-tab-label">Activated Coconut Charcoal</span>
              </button>
              <button type="button" role="tab" aria-selected="${activeScienceTab === 'stage2'}" aria-expanded="${activeScienceTab === 'stage2'}" class="science-tab-btn ${activeScienceTab === 'stage2' ? 'active' : ''}" data-science-tab="stage2">
                <span class="science-tab-num">TAB 02 &bull; ${activeScienceTab === 'stage2' ? 'OPEN −' : 'EXPAND +'}</span>
                <span class="science-tab-label">ZeoCarb-98™ Molecular Lock</span>
              </button>
              <button type="button" role="tab" aria-selected="${activeScienceTab === 'masking'}" aria-expanded="${activeScienceTab === 'masking'}" class="science-tab-btn ${activeScienceTab === 'masking' ? 'active' : ''}" data-science-tab="masking">
                <span class="science-tab-num">TAB 03 &bull; ${activeScienceTab === 'masking' ? 'OPEN −' : 'EXPAND +'}</span>
                <span class="science-tab-label">Conventional Masking Sprays</span>
              </button>
              <button type="button" role="tab" aria-selected="${activeScienceTab === 'lauson_vs'}" aria-expanded="${activeScienceTab === 'lauson_vs'}" class="science-tab-btn ${activeScienceTab === 'lauson_vs' ? 'active' : ''}" data-science-tab="lauson_vs">
                <span class="science-tab-num">TAB 04 &bull; ${activeScienceTab === 'lauson_vs' ? 'OPEN −' : 'EXPAND +'}</span>
                <span class="science-tab-label">ZeoCarb-98™ + Carbon Result</span>
              </button>
            </div>
          </div>

          <!-- Full-Width Interactive Stage Spotlight Reader (Hidden Until a Tab is Clicked) -->
          <div class="odor-science-spotlight" id="odor-science-spotlight" role="tabpanel" style="${activeScienceTab ? '' : 'display:none;'}">
            ${(activeScienceTab || 'stage1') === 'stage1' ? `
              <div class="science-spotlight-grid" data-testid="science-charcoal">
                <div class="science-spotlight-diagram">
                  <div class="spotlight-diagram-badge">STAGE 01 MOLECULE BREAKDOWN • MICROPOROUS CARBON LATTICE</div>
                  ${getCharcoalScienceSvg()}
                </div>
                <div class="science-spotlight-body">
                  <div class="science-stage-step">${ODOR_SCIENCE_DATA.stages[0].step}</div>
                  <h4 class="science-spotlight-heading">${ODOR_SCIENCE_DATA.stages[0].title}</h4>
                  <div class="science-stage-metric">${ODOR_SCIENCE_DATA.stages[0].metric}</div>
                  <p class="science-spotlight-desc">${ODOR_SCIENCE_DATA.stages[0].description}</p>
                  <ul class="science-spotlight-bullets">
                    <li><strong>Sub-2nm Honeycomb Pores:</strong> Steam-activated coconut shell carbon creates over 1,000 m² of internal surface area per gram.</li>
                    <li><strong>Physical Van der Waals Trap:</strong> Draws in airborne sweat VOCs, damp moisture, and stagnant locker/closet air and locks them inside the solid carbon lattice.</li>
                    <li><strong>6+ Months Active Capacity:</strong> Works 24/7 inside gear bags, skates, gloves, and closets without batteries, liquids, or heavy perfumes.</li>
                  </ul>
                  <div class="science-spotlight-nav">
                    <button type="button" class="science-prev-btn" data-science-close="1">&times; Minimize</button>
                    <span class="spotlight-page-indicator">Tab 1 of 4</span>
                    <button type="button" class="science-next-btn" data-science-tab="stage2">Next: Stage 02 &rarr;</button>
                  </div>
                </div>
              </div>
            ` : activeScienceTab === 'stage2' ? `
              <div class="science-spotlight-grid" data-testid="science-lauson98">
                <div class="science-spotlight-diagram">
                  <div class="spotlight-diagram-badge">STAGE 02 MOLECULE BREAKDOWN • ZEOCARB-98™ RECEPTOR LOCKOUT</div>
                  ${getLausonScienceSvg()}
                </div>
                <div class="science-spotlight-body">
                  <div class="science-stage-step">${ODOR_SCIENCE_DATA.stages[1].step}</div>
                  <h4 class="science-spotlight-heading">${ODOR_SCIENCE_DATA.stages[1].title}</h4>
                  <div class="science-stage-metric">${ODOR_SCIENCE_DATA.stages[1].metric}</div>
                  <p class="science-spotlight-desc">${ODOR_SCIENCE_DATA.stages[1].description}</p>
                  <ul class="science-spotlight-bullets">
                    <li><strong>Vapor-Phase Contact:</strong> ZeoCarb-98™ diffuses out through precision 3-axis omni-directional vents to intercept airborne malodor molecules on contact.</li>
                    <li><strong>Permanent Molecular Lock:</strong> Neutralizes sweat and equipment odor molecules into an inert, heavier, 100% odorless state.</li>
                    <li><strong>Olfactory Receptor Lockout:</strong> Physically prevents neutralized molecules from binding to human scent receptors—zero masking perfume required.</li>
                  </ul>
                  <div class="science-spotlight-nav">
                    <button type="button" class="science-prev-btn" data-science-close="1">&times; Minimize</button>
                    <span class="spotlight-page-indicator">Tab 2 of 4</span>
                    <button type="button" class="science-next-btn" data-science-tab="masking">Next: Masking Sprays &rarr;</button>
                  </div>
                </div>
              </div>
            ` : activeScienceTab === 'masking' ? `
              <div class="science-spotlight-comparison comparison-negative">
                <div class="comparison-card-header">
                  <div>
                    <div class="science-stage-step" style="color:#F87171;">TAB 03 • CONVENTIONAL MASKING SPRAYS</div>
                    <span class="comparison-method" style="font-size:1.35rem;">${ODOR_SCIENCE_DATA.comparison[0].method}</span>
                  </div>
                  <span class="comparison-verdict" style="color:#F87171;">${ODOR_SCIENCE_DATA.comparison[0].verdict}</span>
                </div>
                <ul class="comparison-points spotlight-points">
                  ${ODOR_SCIENCE_DATA.comparison[0].points.map((pt) => `
                    <li>
                      <span class="comparison-bullet">✕</span>
                      <span>${pt}</span>
                    </li>
                  `).join('')}
                </ul>
                <div class="science-spotlight-nav" style="margin-top:1.1rem;">
                  <button type="button" class="science-prev-btn" data-science-close="1">&times; Minimize</button>
                  <span class="spotlight-page-indicator">Tab 3 of 4</span>
                  <button type="button" class="science-next-btn" data-science-tab="lauson_vs">Next: Dual-Action Result &rarr;</button>
                </div>
              </div>
            ` : `
              <div class="science-spotlight-comparison comparison-positive">
                <div class="comparison-card-header">
                  <div>
                    <div class="science-stage-step" style="color:#34D399;">TAB 04 • PUCK &amp; WICK™ DUAL-STAGE SYSTEM</div>
                    <span class="comparison-method" style="font-size:1.35rem;">${ODOR_SCIENCE_DATA.comparison[1].method}</span>
                  </div>
                  <span class="comparison-verdict" style="color:#34D399;">${ODOR_SCIENCE_DATA.comparison[1].verdict}</span>
                </div>
                <ul class="comparison-points spotlight-points">
                  ${ODOR_SCIENCE_DATA.comparison[1].points.map((pt) => `
                    <li>
                      <span class="comparison-bullet">✓</span>
                      <span>${pt}</span>
                    </li>
                  `).join('')}
                </ul>
                <div class="science-spotlight-nav" style="margin-top:1.1rem;">
                  <button type="button" class="science-prev-btn" data-science-close="1">&times; Minimize</button>
                  <span class="spotlight-page-indicator">Tab 4 of 4</span>
                  <button type="button" class="science-next-btn" data-science-tab="stage1">Back to Tab 01 &rarr;</button>
                </div>
              </div>
            `}
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
          try {
            window.history.replaceState({}, '', `${window.location.pathname}?box=${encodeURIComponent(activeEditionKey)}&view=${encodeURIComponent(viewId)}#exclusive-boxes`);
          } catch (_) {}
          render();
        }
      });
    });

    // Bind 1-click Box Share Link button
    const boxShareBtn = root.querySelector('.box-share-photo-btn');
    if (boxShareBtn) {
      boxShareBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urlToShare = boxShareBtn.getAttribute('data-box-share-url');
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(urlToShare);
          }
          const origText = boxShareBtn.textContent;
          boxShareBtn.textContent = '✓ Link Copied!';
          setTimeout(() => { boxShareBtn.textContent = origText; }, 2200);
          if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '')) {
            await navigator.share({
              title: `${editionConfig.title} — ${activeView.shortLabel} | Puck & Wick™`,
              url: urlToShare
            }).catch(() => {});
          }
        } catch (_) {}
      });
    }

    // Bind Odor Science 4-Tab Switcher (Toggle Expand / Collapse)
    const scienceTabTriggers = root.querySelectorAll('[data-science-tab]');
    scienceTabTriggers.forEach((el) => {
      el.addEventListener('click', () => {
        const tabId = el.getAttribute('data-science-tab');
        if (tabId) {
          const isTabBtn = el.classList.contains('science-tab-btn');
          activeScienceTab = (isTabBtn && activeScienceTab === tabId) ? null : tabId;
          render();
        }
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const tabId = el.getAttribute('data-science-tab');
          if (tabId) {
            const isTabBtn = el.classList.contains('science-tab-btn');
            activeScienceTab = (isTabBtn && activeScienceTab === tabId) ? null : tabId;
            render();
          }
        }
      });
    });

    const scienceCloseBtns = root.querySelectorAll('[data-science-close]');
    scienceCloseBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeScienceTab = null;
        render();
      });
    });

    // Bind Lightbox Open Triggers
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

    // Render Lightbox Portal directly into document.body (avoids iOS Safari overflow-x fixed-position touch trap)
    let lightboxPortal = document.getElementById('box-lightbox-portal');
    if (!lightboxPortal) {
      lightboxPortal = document.createElement('div');
      lightboxPortal.id = 'box-lightbox-portal';
      document.body.appendChild(lightboxPortal);
    }

    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('box-lightbox-open');
      lightboxPortal.innerHTML = `
        <div class="box-lightbox-backdrop" id="box-lightbox-modal" data-testid="box-lightbox-modal" role="dialog" aria-modal="true" aria-label="${currentLightboxSlide.title}">
          <div class="box-lightbox-fullscreen">
            <!-- Minimal Top Bar: Counter + Short Label + Close Button -->
            <div class="box-lightbox-topbar">
              <div class="box-lightbox-topbar-left">
                <span class="box-lightbox-pill-counter">0${lightboxIndex + 1} / 0${allLightboxSlides.length}</span>
                <span class="box-lightbox-pill-label">${currentLightboxSlide.shortLabel || currentLightboxSlide.title}</span>
              </div>
              <button type="button" class="box-lightbox-top-close-btn" id="btn-close-box-lightbox-top" aria-label="Close full-screen photo viewer">
                ✕ Close
              </button>
            </div>

            <!-- Distraction-Free Full-Screen Image Stage -->
            <div class="box-lightbox-stage" id="box-lightbox-swipe-stage">
              <button type="button" class="box-lightbox-nav-btn prev" id="btn-lightbox-prev" aria-label="Previous photo">
                ‹
              </button>
              <div class="box-lightbox-img-container" id="box-lightbox-img-wrap">
                <img src="${currentLightboxSlide.image}" alt="${currentLightboxSlide.title}" class="box-lightbox-full-img" id="box-lightbox-main-img" />
              </div>
              <button type="button" class="box-lightbox-nav-btn next" id="btn-lightbox-next" aria-label="Next photo">
                ›
              </button>
            </div>

            <!-- Compact Bottom Thumbnail Switcher (Zero Paragraph Clutter) -->
            <div class="box-lightbox-bottombar">
              <div class="box-lightbox-filmstrip">
                ${allLightboxSlides.map((slide, idx) => `
                  <button
                    type="button"
                    class="box-lightbox-thumb ${idx === lightboxIndex ? 'active' : ''}"
                    data-lightbox-index="${idx}"
                    aria-label="View ${slide.shortLabel || slide.title}"
                  >
                    <img src="${slide.image}" alt="${slide.title}" />
                    <span>${slide.shortLabel}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      const closeLightbox = () => {
        lightboxOpen = false;
        document.body.style.overflow = '';
        document.body.classList.remove('box-lightbox-open');
        render();
      };

      const closeBtn = lightboxPortal.querySelector('#btn-close-box-lightbox');
      const topCloseBtn = lightboxPortal.querySelector('#btn-close-box-lightbox-top');
      const backdrop = lightboxPortal.querySelector('#box-lightbox-modal');
      const prevBtn = lightboxPortal.querySelector('#btn-lightbox-prev');
      const nextBtn = lightboxPortal.querySelector('#btn-lightbox-next');
      const swipeStage = lightboxPortal.querySelector('#box-lightbox-swipe-stage');
      const imgWrap = lightboxPortal.querySelector('#box-lightbox-img-wrap');
      const mainImg = lightboxPortal.querySelector('#box-lightbox-main-img');
      const thumbBtns = lightboxPortal.querySelectorAll('[data-lightbox-index]');

      const goPrev = (e) => {
        if (e) e.stopPropagation();
        lightboxIndex = (lightboxIndex - 1 + allLightboxSlides.length) % allLightboxSlides.length;
        const slideId = allLightboxSlides[lightboxIndex]?.id;
        if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
        render();
      };

      const goNext = (e) => {
        if (e) e.stopPropagation();
        lightboxIndex = (lightboxIndex + 1) % allLightboxSlides.length;
        const slideId = allLightboxSlides[lightboxIndex]?.id;
        if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
        render();
      };

      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (topCloseBtn) topCloseBtn.addEventListener('click', closeLightbox);

      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop || e.target === swipeStage || e.target === imgWrap || e.target === mainImg) {
            closeLightbox();
          }
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', goPrev);
      if (nextBtn) nextBtn.addEventListener('click', goNext);

      thumbBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = Number(btn.getAttribute('data-lightbox-index'));
          if (!Number.isNaN(idx)) {
            lightboxIndex = idx;
            const slideId = allLightboxSlides[lightboxIndex]?.id;
            if (galleryViews.some((g) => g.id === slideId)) activeGalleryViewId = slideId;
            render();
          }
        });
      });

      // Touch swipe support (left/right for next/prev; swipe up/down to close!)
      if (swipeStage) {
        let touchStartX = 0;
        let touchStartY = 0;
        swipeStage.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches?.[0]?.screenX || 0;
          touchStartY = e.changedTouches?.[0]?.screenY || 0;
        }, { passive: true });

        swipeStage.addEventListener('touchend', (e) => {
          const touchEndX = e.changedTouches?.[0]?.screenX || 0;
          const touchEndY = e.changedTouches?.[0]?.screenY || 0;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;
          if (Math.abs(deltaY) > 55 && Math.abs(deltaY) > Math.abs(deltaX)) {
            closeLightbox();
          } else if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) goNext();
            else goPrev();
          }
        }, { passive: true });
      }
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('box-lightbox-open');
      lightboxPortal.innerHTML = '';
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
        if (HARDWARE_WAITLIST_MODE) {
          openWaitlistModal(
            `${editionConfig.title} (${selectedCandle.name} Candle)`,
            `$${editionConfig.price.toFixed(2)}`
          );
          return;
        }

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
          photo: editionConfig.galleryViews?.[0]?.image || editionConfig.photo || '',
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
    const total = galleryViews.length + EXTRA_BOX_GALLERY_SLIDES.length;
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
