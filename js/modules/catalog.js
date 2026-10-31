/**
 * Puck & Wick Product Catalog & Scent Filters Module
 * Renders filter tabs, responsive product grid (3-col Desktop, 2-col Mobile),
 * quick-view modal triggers, and direct quick-add cart triggers.
 */

import { PRODUCTS, getProductsByCategory, getCandleVesselSvg, getProductGallerySlides, getInteractive360BoxHtml, attachBox360Physics } from '../data/products.js';
import { openProductModal } from './modal.js';
import { getIcon } from '../utils/svg-assets.js';

export function initCatalog(store, openCartDrawer) {
  const root = document.getElementById('catalog-root');
  if (!root) return;
  const cardSlideState = {};
  let card360Cleanups = [];

  const render = () => {
    card360Cleanups.forEach(fn => { try { fn(); } catch (_) {} });
    card360Cleanups = [];
    const currentCategory = store.state.activeCategory || 'all';
    const products = getProductsByCategory(currentCategory);

    root.innerHTML = `
      <div class="catalog-container">
        <!-- Focused Collection Filter Tabs Bar -->
        <div class="catalog-filters-bar" role="tablist" aria-label="Filter items by collection">
          <button type="button" class="filter-tab filter-all ${currentCategory === 'all' ? 'active' : ''}" data-testid="filter-all" data-filter="all" role="tab" aria-selected="${currentCategory === 'all'}">
            <span>All Items</span>
            <span class="filter-count">(${PRODUCTS.length})</span>
          </button>

          <button type="button" class="filter-tab filter-mens ${currentCategory === 'mens' ? 'active' : ''}" data-testid="filter-mens" data-filter="mens" role="tab" aria-selected="${currentCategory === 'mens'}">
            <span class="tab-swatch swatch-mens" aria-hidden="true"></span>
            <span>Men's Line</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.genderLine === 'mens').length})</span>
          </button>

          <button type="button" class="filter-tab filter-womens ${currentCategory === 'womens' ? 'active' : ''}" data-testid="filter-womens" data-filter="womens" role="tab" aria-selected="${currentCategory === 'womens'}">
            <span class="tab-swatch swatch-womens" aria-hidden="true"></span>
            <span>Women's Line</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.genderLine === 'womens').length})</span>
          </button>

          <button type="button" class="filter-tab filter-candles ${currentCategory === 'candles' ? 'active' : ''}" data-testid="filter-candles" data-filter="candles" role="tab" aria-selected="${currentCategory === 'candles'}">
            <span>Soy Candles</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.productType !== 'odor_care').length})</span>
          </button>

          <button type="button" class="filter-tab filter-odor-care ${currentCategory === 'odor_care' ? 'active' : ''}" data-testid="filter-odor-care" data-filter="odor_care" role="tab" aria-selected="${currentCategory === 'odor_care'}">
            <span>Lauson-98&trade; Odor Killer &amp; Care</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.productType === 'odor_care').length})</span>
          </button>

          <button type="button" class="filter-tab filter-exclusive-boxes filter-boxes" data-testid="filter-exclusive-boxes" data-filter="exclusive_boxes" role="tab" aria-selected="false">
            <span>Exclusive Boxes ($98)</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="box-icon-link" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Product Cards Grid (3-Col Desktop, 2-Col Mobile) -->
        ${products.length > 0 ? `
          <div class="product-cards-grid" id="product-grid" data-testid="product-grid">
            ${products.map(p => {
              const slides = getProductGallerySlides(p, store.state.activeLogoConcept || 1);
              const activeIdx = cardSlideState[p.id] || 0;
              const currentSlide = slides[activeIdx] || slides[0];
              return `
              <article class="product-card surface-card" style="padding:0;" data-testid="product-card" data-product-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
                <!-- Vessel Visual Stage -->
                <div class="product-card-visual" style="padding:0;" data-action="quick-view" data-product-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
                  <div class="vessel-wrapper" style="width:100%;height:100%;max-width:none;">
                    ${currentSlide.type === 'svg'
                      ? getCandleVesselSvg(p, store.state.activeLogoConcept || 1)
                      : currentSlide.type === 'box360'
                        ? getInteractive360BoxHtml(p, false)
                        : `<img src="${currentSlide.src}" alt="${currentSlide.title}" class="card-slide-img slide-${currentSlide.id}" loading="lazy" />`
                    }
                  </div>
                  
                  ${p.seasonal ? `
                    <div class="product-badge badge-seasonal">
                      <span>Seasonal Collab</span>
                    </div>
                  ` : p.productType === 'odor_care' ? `
                    <div class="product-badge badge-flagship">
                      <span>${p.id.includes('butter') ? 'Sanctuary Care' : 'Lauson-98™'}</span>
                    </div>
                  ` : p.featured ? `
                    <div class="product-badge badge-flagship">
                      <span>Flagship</span>
                    </div>
                  ` : ''}

                  <div class="product-line-pill ${p.vesselType === 'ivory' ? 'pill-womens' : 'pill-mens'}" data-testid="product-line-pill">
                    <span>${p.vesselType === 'ivory' ? 'Womens' : 'Mens'}</span>
                  </div>

                  <div class="visual-hover-overlay">
                    <span class="btn-hover-quick-view">
                      ${getIcon('search')}
                      <span>Quick View (${slides.length} Photos)</span>
                    </span>
                  </div>
                </div>

                <!-- Interactive Card Multi-Photo Carousel Switcher Bar -->
                <div class="card-carousel-bar" role="tablist" aria-label="Switch photos for ${p.name}">
                  ${slides.map((s, sIdx) => `
                    <button type="button" class="card-slide-pill ${sIdx === activeIdx ? 'active' : ''}" data-card-slide-pid="${p.id}" data-card-slide-idx="${sIdx}" role="tab" aria-selected="${sIdx === activeIdx}">
                      <span>${s.shortLabel}</span>
                    </button>
                  `).join('')}
                </div>

                <!-- Product Card Content -->
                <div class="product-card-body">
                  <div class="card-meta-line">
                    <span class="card-vessel-spec">${p.specUnitLabel || '10 oz Vessel'}</span>
                    <span class="card-burn-time">${p.productType === 'odor_care' ? p.burnTime : `${p.burnTime}`}</span>
                  </div>

                  <h3 class="product-title" data-testid="product-title">
                    <a href="#modal-details" class="title-link" data-action="quick-view" data-product-id="${p.id}">${p.name}</a>
                  </h3>

                  <div class="product-tagline-text">${p.tagline}</div>

                  <!-- Notes Teaser Pills (Shown on Desktop, Hidden on Mobile 2-Col Grid for Compactness) -->
                  <div class="product-notes-summary">
                    <span class="notes-kicker">${p.productType === 'odor_care' ? 'Active Matrix &amp; Notes:' : 'Fragrance Notes:'}</span>
                    <div class="notes-pills-row">
                      <span class="mini-note-pill">${p.notes.top[0] || 'Clean Scent'}</span>
                      <span class="mini-note-pill">${p.notes.middle[0] || 'Botanical'}</span>
                      <span class="mini-note-pill">${p.notes.base[0] || 'Warm Amber'}</span>
                    </div>
                  </div>

                  <!-- Price & Action CTA Row -->
                  <div class="product-card-footer">
                    <div class="price-container">
                      <span class="product-price" data-testid="product-price">${p.formattedPrice}</span>
                      <span class="wax-spec-sub">${p.waxSpecSub || '100% American Soy'}</span>
                    </div>

                    <div class="card-button-group">
                      <button type="button" class="btn btn-outline btn-sm quick-view-btn" data-testid="quick-view-btn" data-product-id="${p.id}" aria-label="Quick view ${p.name}">
                        <span>Info</span>
                      </button>
                      <button type="button" class="btn btn-gold btn-sm quick-add-btn" data-testid="quick-add-btn" data-product-id="${p.id}" aria-label="Add ${p.name} to cart">
                        ${getIcon('cart')}
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            `;
            }).join('')}
          </div>
        ` : `
          <!-- Empty Filter State Fallback -->
          <div class="catalog-empty-state" data-testid="catalog-empty">
            <div class="empty-icon">${getIcon('flame')}</div>
            <h4 class="empty-title">No Items Found in this Category</h4>
            <p class="empty-text">We hand-pour small-batches year-round. Select another collection or return to the complete catalog.</p>
            <button type="button" class="btn btn-gold reset-filters-btn" id="btn-reset-catalog-filter">
              <span>View All Items</span>
            </button>
          </div>
        `}
      </div>
    `;

    // Attach event listeners for filter buttons
    const filterButtons = root.querySelectorAll('.filter-tab');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-filter');
        if (targetCategory === 'exclusive_boxes') {
          const boxesEl = document.getElementById('exclusive-boxes');
          if (boxesEl) {
            boxesEl.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        store.dispatch('SET_CATEGORY', targetCategory);
        render();
      });
    });

    // Reset filter button if present
    const resetBtn = root.querySelector('#btn-reset-catalog-filter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.dispatch('SET_CATEGORY', 'all');
        render();
      });
    }

    // Attach card slide switcher pills
    const cardSlidePills = root.querySelectorAll('.card-slide-pill');
    cardSlidePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pid = pill.getAttribute('data-card-slide-pid');
        const idx = Number(pill.getAttribute('data-card-slide-idx') || 0);
        if (pid) {
          cardSlideState[pid] = idx;
          render();
        }
      });
    });

    // Attach 360° Box drag-and-rotate physics to any active 360° card views
    root.querySelectorAll('.box360-stage').forEach(stageEl => {
      card360Cleanups.push(attachBox360Physics(stageEl));
    });

    // Attach quick-view triggers
    const quickViewTriggers = root.querySelectorAll('[data-action="quick-view"], .quick-view-btn');
    quickViewTriggers.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.box360-stage')) return;
        e.preventDefault();
        const pid = el.getAttribute('data-product-id');
        if (pid) {
          openProductModal(pid, store, openCartDrawer, cardSlideState[pid] || 0);
        }
      });

      if (el.getAttribute('role') === 'button') {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const pid = el.getAttribute('data-product-id');
            if (pid) {
              openProductModal(pid, store, openCartDrawer, cardSlideState[pid] || 0);
            }
          }
        });
      }
    });

    // Product card keyboard activation (Enter & Space) and outside click
    const productCards = root.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target !== card && e.target.closest('button, a')) {
            return;
          }
          e.preventDefault();
          const pid = card.getAttribute('data-product-id');
          if (pid) {
            openProductModal(pid, store, openCartDrawer, cardSlideState[pid] || 0);
          }
        }
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('button, a, [data-action="quick-view"]')) {
          return;
        }
        const pid = card.getAttribute('data-product-id');
        if (pid) {
          openProductModal(pid, store, openCartDrawer, cardSlideState[pid] || 0);
        }
      });
    });

    // Attach quick-add triggers
    const quickAddBtns = root.querySelectorAll('.quick-add-btn');
    quickAddBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.getAttribute('data-product-id');
        const prod = PRODUCTS.find(p => p.id === pid);
        if (prod && store.dispatch) {
          store.dispatch('ADD_TO_CART', {
            id: prod.id,
            title: prod.name,
            price: prod.price,
            quantity: 1,
            scent: prod.name,
            vessel: prod.vessel,
            photo: prod.photo || (prod.vesselType === 'ivory' ? 'assets/images/candle-ivory.jpg' : 'assets/images/candle-obsidian.jpg')
          });

          if (typeof openCartDrawer === 'function') {
            openCartDrawer();
          }
        }
      });
    });
  };

  // Initial render
  render();

  // Re-render when category or active logo concept changes in store
  store.subscribe((state, action) => {
    if (
      action === 'SET_CATEGORY' ||
      action === 'SET_ACTIVE_CATEGORY' ||
      action === 'SET_LOGO_CONCEPT' ||
      action === 'SET_ACTIVE_LOGO'
    ) {
      render();
    }
  });
}
