/**
 * Puck & Wick Product Detail Quick-View Modal Module
 * Provides accessible 3-tier scent pyramid preview, burn time specifications,
 * vessel specs, quantity controls, and add-to-cart integration.
 */

import { getProductById, getCandleVesselSvg } from '../data/products.js';
import { getIcon } from '../utils/svg-assets.js';

let activeTriggerElement = null;

export function openProductModal(productId, store, openCartCallback) {
  const product = getProductById(productId);
  if (!product) return;

  activeTriggerElement = document.activeElement;
  const modalContainer = document.getElementById('modal-container') || document.body;

  let quantity = 1;

  const modalHtml = `
    <div class="product-modal-backdrop" id="product-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <div class="product-modal-card product-modal" data-testid="product-modal" tabindex="-1">
        <!-- Close Button -->
        <button type="button" class="modal-close-btn modal-close" data-testid="modal-close-btn" aria-label="Close product details">
          ${getIcon('close')}
        </button>

        <div class="modal-grid">
          <!-- Left: Vessel Visual Showcase -->
          <div class="modal-visual-column">
            <div class="modal-vessel-stage">
              ${getCandleVesselSvg(product, store?.state?.activeLogoConcept || 1, true)}
            </div>
            ${product.seasonal ? `<div class="modal-badge-seasonal">${product.seasonalBadge || 'Seasonal Collaboration'}</div>` : ''}
          </div>

          <!-- Right: Product Scent & Specs Details -->
          <div class="modal-details-column">
            <div class="modal-kicker">
              <span>QC #1 Certified Hand-Pour</span>
              <span>•</span>
              <span>Loudoun County, VA</span>
            </div>

            <h2 id="modal-product-title" class="modal-title">${product.name}</h2>
            <div class="modal-tagline">${product.tagline}</div>

            <div class="modal-price-row">
              <span class="modal-price" data-testid="modal-price">${product.formattedPrice}</span>
              <span class="modal-burn-badge" data-testid="product-burn-time">${product.productType === 'odor_care' ? product.burnTime : `${product.burnTime} Slow Burn`}</span>
            </div>

            <p class="modal-description">${product.description}</p>

            ${product.id === 'puck-mini-pair' ? `
              <!-- 3-Step Visual Picture Guide for 2.0" Skate & Glove Mini Pucks -->
              <div class="modal-mini-puck-guide" data-testid="modal-mini-puck-guide">
                <div class="mini-guide-header">
                  <span class="mini-guide-kicker">3-Step Visual Fit Guide • 2.0&Prime; (50mm) Compact Discs</span>
                  <span class="mini-guide-badge">Zero Sprays • Works Overnight</span>
                </div>
                <div class="mini-guide-photo-wrap">
                  <img src="assets/images/mini-pucks-action-triptych.jpg" alt="3-Step Guide: 1. Hold 2.0 inch Mini Pucks in palm, 2. Slide into hockey glove cuff, 3. Drop into skate boot ankle" class="mini-guide-img" loading="lazy" />
                  <div class="mini-guide-step-tags">
                    <span class="mini-step-tag"><strong>01</strong> 2.0&Prime; Palm Fit</span>
                    <span class="mini-step-tag"><strong>02</strong> Slide in Gloves</span>
                    <span class="mini-step-tag"><strong>03</strong> Drop in Skates</span>
                  </div>
                </div>
                <div class="mini-guide-steps-row">
                  <div class="mini-guide-step-item">
                    <strong>1. Grab Twin-Pack:</strong> Compact 50mm size fits left &amp; right gear.
                  </div>
                  <div class="mini-guide-step-item">
                    <strong>2. Hockey Gloves:</strong> Slides deep into narrow cuffs &amp; palms.
                  </div>
                  <div class="mini-guide-step-item">
                    <strong>3. Skates &amp; Cleats:</strong> Destroys sweat thiols overnight (6+ mos).
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- 3-Tier Scent Pyramid Breakdown -->
            <div class="scent-pyramid-block">
              <div class="scent-pyramid-heading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pyramid-icon" aria-hidden="true"><polygon points="12 2 2 22 22 22"/></svg>
                <span>${product.productType === 'odor_care' ? '3-Tier Active &amp; Botanical Architecture' : '3-Tier Fragrance Architecture'}</span>
              </div>

              <!-- Top Notes -->
              <div class="pyramid-tier">
                <span class="tier-label">Top Notes:</span>
                <div class="tier-pills notes-top" data-testid="scent-notes-top">
                  ${product.notes.top.map(n => `<span class="note-pill note-top">${n}</span>`).join('')}
                </div>
              </div>

              <!-- Middle Notes -->
              <div class="pyramid-tier">
                <span class="tier-label">Middle / Heart:</span>
                <div class="tier-pills notes-middle" data-testid="scent-notes-middle">
                  ${product.notes.middle.map(n => `<span class="note-pill note-middle">${n}</span>`).join('')}
                </div>
              </div>

              <!-- Base Notes -->
              <div class="pyramid-tier">
                <span class="tier-label">Base Notes:</span>
                <div class="tier-pills notes-base" data-testid="scent-notes-base">
                  ${product.notes.base.map(n => `<span class="note-pill note-base">${n}</span>`).join('')}
                </div>
              </div>
            </div>

            <!-- Craft & Vessel Specifications -->
            <div class="modal-specs-grid">
              <div class="spec-item">
                <span class="spec-label">Vessel Finish</span>
                <span class="spec-value vessel-specs" data-testid="product-vessel-specs">${product.vessel}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">${product.productType === 'odor_care' ? 'Active Formulation' : 'Wax Formulation'}</span>
                <span class="spec-value">${product.wax}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">${product.productType === 'odor_care' ? 'Delivery System' : 'Wick Engineering'}</span>
                <span class="spec-value">${product.wick}</span>
              </div>
            </div>

            <!-- Quantity & Add to Cart Controls -->
            <div class="modal-actions-row">
              <div class="modal-qty-stepper" aria-label="Select Quantity">
                <button type="button" class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">
                  ${getIcon('minus')}
                </button>
                <span class="qty-display" id="modal-qty-val">1</span>
                <button type="button" class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">
                  ${getIcon('plus')}
                </button>
              </div>

              <button type="button" class="btn btn-gold modal-add-to-cart-btn modal-add-to-cart" id="modal-add-btn" data-testid="modal-add-to-cart-btn">
                <span>Add to Cart &bull; <strong id="modal-add-total">${product.formattedPrice}</strong></span>
                ${getIcon('cart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modalContainer.innerHTML = modalHtml;
  document.body.style.overflow = 'hidden';

  const backdrop = document.getElementById('product-modal-backdrop');
  const card = backdrop.querySelector('.product-modal-card');
  const closeBtn = backdrop.querySelector('.modal-close-btn');
  const qtyMinus = document.getElementById('modal-qty-minus');
  const qtyPlus = document.getElementById('modal-qty-plus');
  const qtyVal = document.getElementById('modal-qty-val');
  const addBtn = document.getElementById('modal-add-btn');
  const addTotal = document.getElementById('modal-add-total');

  // Focus close button initially for accessibility
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }

  const updateModalTotal = () => {
    qtyVal.textContent = String(quantity);
    const total = (product.price * quantity).toFixed(2);
    addTotal.textContent = `$${total}`;
  };

  qtyMinus.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateModalTotal();
    }
  });

  qtyPlus.addEventListener('click', () => {
    if (quantity < 99) {
      quantity++;
      updateModalTotal();
    }
  });

  let isClosed = false;
  const closeModal = () => {
    if (isClosed) return;
    isClosed = true;
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
    modalContainer.innerHTML = '';
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      activeTriggerElement.focus();
    }
  };

  // Keyboard accessibility: Escape to dismiss & Tab focus trapping
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab' && card) {
      const focusables = Array.from(
        card.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // Add to cart action
  addBtn.addEventListener('click', () => {
    if (store && store.dispatch) {
      store.dispatch('ADD_TO_CART', {
        id: product.id,
        title: product.name,
        price: product.price,
        quantity,
        scent: product.name,
        vessel: product.vessel,
        photo: product.photo || (product.vesselType === 'ivory' ? 'assets/images/candle-ivory.jpg' : 'assets/images/candle-obsidian.jpg')
      });
    }

    closeModal();

    if (typeof openCartCallback === 'function') {
      openCartCallback();
    }
  });
}
