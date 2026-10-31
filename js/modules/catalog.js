/**
 * Puck & Wick Product Catalog & Scent Filters Module
 * Renders filter tabs, responsive product grid, quick-view modal triggers,
 * and direct quick-add cart triggers.
 */

import { PRODUCTS, getProductsByCategory, getCandleVesselSvg } from '../data/products.js';
import { openProductModal } from './modal.js';
import { getIcon } from '../utils/svg-assets.js';

export function initCatalog(store, openCartDrawer) {
  const root = document.getElementById('catalog-root');
  if (!root) return;

  const render = () => {
    const currentCategory = store.state.activeCategory || 'all';
    const products = getProductsByCategory(currentCategory);

    root.innerHTML = `
      <div class="catalog-container">
        <!-- Scent Family Filter Tabs Bar -->
        <div class="catalog-filters-bar" role="tablist" aria-label="Filter candles by scent family">
          <button type="button" class="filter-tab filter-all ${currentCategory === 'all' ? 'active' : ''}" data-testid="filter-all" data-filter="all" role="tab" aria-selected="${currentCategory === 'all'}">
            <span>All Pours</span>
            <span class="filter-count">(${PRODUCTS.length})</span>
          </button>

          <button type="button" class="filter-tab filter-mens ${currentCategory === 'mens' ? 'active' : ''}" data-testid="filter-mens" data-filter="mens" role="tab" aria-selected="${currentCategory === 'mens'}">
            <span>Men's Line</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.genderLine === 'mens').length})</span>
          </button>

          <button type="button" class="filter-tab filter-womens ${currentCategory === 'womens' ? 'active' : ''}" data-testid="filter-womens" data-filter="womens" role="tab" aria-selected="${currentCategory === 'womens'}">
            <span>Women's Line</span>
            <span class="filter-count">(${PRODUCTS.filter(p => p.genderLine === 'womens').length})</span>
          </button>
          
          <button type="button" class="filter-tab filter-signature ${currentCategory === 'signature' ? 'active' : ''}" data-testid="filter-signature" data-filter="signature" role="tab" aria-selected="${currentCategory === 'signature'}">
            <span>Signature Line</span>
          </button>

          <button type="button" class="filter-tab filter-fresh-clean ${currentCategory === 'fresh_clean' ? 'active' : ''}" data-testid="filter-fresh-clean" data-filter="fresh_clean" role="tab" aria-selected="${currentCategory === 'fresh_clean'}">
            <span>Fresh &amp; Clean</span>
          </button>

          <button type="button" class="filter-tab filter-woods-rustic ${currentCategory === 'woods_rustic' ? 'active' : ''}" data-testid="filter-woods-rustic" data-filter="woods_rustic" role="tab" aria-selected="${currentCategory === 'woods_rustic'}">
            <span>Woods &amp; Rustic</span>
          </button>

          <button type="button" class="filter-tab filter-seasonal ${currentCategory === 'seasonal' ? 'active' : ''}" data-testid="filter-seasonal" data-filter="seasonal" role="tab" aria-selected="${currentCategory === 'seasonal'}">
            <span>Seasonal Releases</span>
          </button>

          <button type="button" class="filter-tab filter-exclusive-boxes filter-boxes" data-testid="filter-exclusive-boxes" data-filter="exclusive_boxes" role="tab" aria-selected="false">
            <span>Exclusive Boxes</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="box-icon-link" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Product Cards Grid -->
        ${products.length > 0 ? `
          <div class="product-cards-grid" id="product-grid" data-testid="product-grid">
            ${products.map(p => `
              <article class="product-card surface-card" style="padding:0;" data-testid="product-card" data-product-id="${p.id}">
                <!-- Vessel Visual Stage -->
                <div class="product-card-visual" style="padding:0;" data-action="quick-view" data-product-id="${p.id}" tabindex="0" role="button" aria-label="View details for ${p.name}">
                  <div class="vessel-wrapper" style="width:100%;height:100%;max-width:none;">
                    ${getCandleVesselSvg(p, store.state.activeLogoConcept || 1)}
                  </div>
                  
                  ${p.seasonal ? `
                    <div class="product-badge badge-seasonal">
                      <span>Blue Hydrangea Collab</span>
                    </div>
                  ` : p.featured ? `
                    <div class="product-badge badge-flagship">
                      <span>Flagship Pour</span>
                    </div>
                  ` : ''}

                  <div class="product-line-pill ${p.vesselType === 'ivory' ? 'pill-womens' : 'pill-mens'}" data-testid="product-line-pill">
                    <span>${p.vesselType === 'ivory' ? 'Womens' : 'Mens'}</span>
                  </div>

                  <div class="visual-hover-overlay">
                    <span class="btn-hover-quick-view">
                      ${getIcon('search')}
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                <!-- Product Card Content -->
                <div class="product-card-body">
                  <div class="card-meta-line">
                    <span class="card-vessel-spec">10 oz Vessel</span>
                    <span class="card-burn-time">${p.burnTime} Burn Time</span>
                  </div>

                  <h3 class="product-title" data-testid="product-title">
                    <a href="#modal-details" class="title-link" data-action="quick-view" data-product-id="${p.id}">${p.name}</a>
                  </h3>

                  <div class="product-tagline-text">${p.tagline}</div>

                  <!-- Notes Teaser Pills -->
                  <div class="product-notes-summary">
                    <span class="notes-kicker">Fragrance Notes:</span>
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
                      <span class="wax-spec-sub">100% American Soy</span>
                    </div>

                    <div class="card-button-group">
                      <button type="button" class="btn btn-outline btn-sm quick-view-btn" data-testid="quick-view-btn" data-product-id="${p.id}" aria-label="Quick view ${p.name}">
                        <span>Details</span>
                      </button>
                      <button type="button" class="btn btn-gold btn-sm quick-add-btn" data-testid="quick-add-btn" data-product-id="${p.id}" aria-label="Add ${p.name} to cart">
                        ${getIcon('cart')}
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        ` : `
          <!-- Empty Filter State Fallback -->
          <div class="catalog-empty-state" data-testid="catalog-empty">
            <div class="empty-icon">${getIcon('flame')}</div>
            <h4 class="empty-title">No Candles Found in this Category</h4>
            <p class="empty-text">We hand-pour small-batches year-round. Select another scent family or return to the complete catalog.</p>
            <button type="button" class="btn btn-gold reset-filters-btn" id="btn-reset-catalog-filter">
              <span>View All Pours</span>
            </button>
          </div>
        `}
      </div>
    `;

    // Attach event listeners for filter buttons
    const filterButtons = root.querySelectorAll('.filter-tab');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetCategory = btn.getAttribute('data-filter');
        if (targetCategory === 'exclusive_boxes') {
          // Direct user to Exclusive Boxes customizer section
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
    const resetBtn = root.getElementById?.('btn-reset-catalog-filter') || root.querySelector('#btn-reset-catalog-filter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.dispatch('SET_CATEGORY', 'all');
        render();
      });
    }

    // Attach quick-view triggers
    const quickViewTriggers = root.querySelectorAll('[data-action="quick-view"], .quick-view-btn');
    quickViewTriggers.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = el.getAttribute('data-product-id');
        if (pid) {
          openProductModal(pid, store, openCartDrawer);
        }
      });

      // Accessible enter / space keypress for keyboard users
      if (el.getAttribute('role') === 'button') {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const pid = el.getAttribute('data-product-id');
            if (pid) {
              openProductModal(pid, store, openCartDrawer);
            }
          }
        });
      }
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
            vessel: prod.vessel
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
