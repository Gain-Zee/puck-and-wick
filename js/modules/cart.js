/**
 * Puck & Wick POS-Ready Slide-Out Cart Drawer Module
 * Implements off-canvas cart drawer, line item management, quantity stepping,
 * $75 Free Shipping progress tracker, and promo code validation engine.
 */

import { getIcon } from '../utils/svg-assets.js';
import { getProductById } from '../data/products.js';

let isDrawerOpen = false;

export function getCartItemPhotoSrc(item) {
  if (!item || typeof item !== 'object') return 'assets/images/candle-obsidian.jpg';
  if (item.photo) return item.photo;
  const idStr = String(item.id || '');
  if (item.type === 'exclusive_box' || idStr.startsWith('box-')) {
    const isWomen = idStr.includes('women') || item.customOptions?.boxType === 'women_luxe' || item.customizations?.boxType === 'women_luxe';
    return isWomen ? 'assets/images/box-women-open.jpg' : 'assets/images/box-men-open.jpg';
  }
  const prod = getProductById(idStr);
  if (prod) {
    if (prod.photo) return prod.photo;
    if (prod.vesselType === 'ivory') return 'assets/images/candle-ivory.jpg';
  }
  return 'assets/images/candle-obsidian.jpg';
}

export function initCart(store, openCheckoutCallback) {
  const root = document.getElementById('cart-drawer-root');
  if (!root) return;

  let promoError = '';
  let enteredPromoCode = '';

  const closeDrawer = () => {
    isDrawerOpen = false;
    render();
    const cartTrigger = document.getElementById('cart-btn');
    if (cartTrigger && typeof cartTrigger.focus === 'function') {
      cartTrigger.focus();
    }
  };

  const render = () => {
    const cart = Array.isArray(store.state.cart)
      ? store.state.cart.filter(item => item && typeof item === 'object' && item.id)
      : [];
    const subtotal = store.getCartSubtotal();
    const discount = store.getDiscountAmount();
    const shipping = store.getShippingTotal();
    const grandTotal = Math.max(0, subtotal - discount + shipping);
    const count = store.getCartCount();
    const promo = store.state.promoCode;

    // Free shipping progress calculation ($75 Threshold)
    const freeShippingThreshold = 75.00;
    const progressPercent = Math.min(100, Math.max(0, (subtotal / freeShippingThreshold) * 100));
    const remaining = Math.max(0, freeShippingThreshold - subtotal);
    const isFreeShippingUnlocked = subtotal >= freeShippingThreshold || store.state.shippingMethod === 'pickup';

    root.innerHTML = `
      <div class="cart-backdrop ${isDrawerOpen ? 'open' : ''}" id="cart-drawer-backdrop">
        <aside class="cart-drawer ${isDrawerOpen ? 'open' : ''}" id="cart-drawer" data-testid="cart-drawer" aria-label="Shopping Cart" aria-hidden="${!isDrawerOpen}">
          <!-- Cart Header -->
          <div class="cart-header">
            <div class="cart-header-title-row">
              <div class="cart-title-lockup">
                ${getIcon('cart')}
                <h2 class="cart-heading">Your Cart</h2>
                <span class="cart-badge-pill">(${count})</span>
              </div>
              <button type="button" class="cart-close cart-close-btn" data-testid="cart-close-btn" aria-label="Close cart">
                ${getIcon('close')}
              </button>
            </div>

            <!-- Free Shipping Progress Meter -->
            <div class="shipping-meter-container" data-testid="shipping-meter">
              <div class="shipping-meter-header">
                <span class="shipping-meter-text" data-testid="shipping-progress-text">
                  ${isFreeShippingUnlocked 
                    ? '🎉 Free Shipping Unlocked!' 
                    : `$${remaining.toFixed(2)} away from Free Shipping!`}
                </span>
                <span class="shipping-threshold-target">$75 Threshold</span>
              </div>
              <div class="shipping-meter-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
                <div class="shipping-meter-fill" data-testid="shipping-progress-bar" style="width: ${progressPercent}%; min-width: 4px;"></div>
              </div>
            </div>
          </div>

          <!-- Cart Body (Items or Empty State) -->
          <div class="cart-body">
            ${cart.length > 0 ? `
              <div class="cart-items-list" data-testid="cart-items">
                ${cart.map((item, idx) => {
                  if (!item || typeof item !== 'object' || !item.id) return '';
                  const unitPrice = Number(item.price) || 36.00;
                  const itemTotal = (unitPrice * (item.quantity || 1)).toFixed(2);
                  const prodRef = getProductById(String(item.id || ''));
                  const rawScentSub = item.scent && item.scent !== 'Default' ? item.scent : (item.subtitle || '');
                  const scentSubtitle = (rawScentSub && rawScentSub !== item.title)
                    ? rawScentSub
                    : (prodRef ? `${prodRef.specUnitLabel || '10 oz Vessel'} • ${prodRef.waxSpecSub || '100% American Soy'}` : rawScentSub);
                  const customInfo = item.customOptions?.candleScentName ? `Scent: ${item.customOptions.candleScentName}` : (item.customizations?.candleScentName ? `Scent: ${item.customizations.candleScentName}` : '');

                  const thumbSrc = getCartItemPhotoSrc(item);

                  return `
                    <div class="cart-item" data-testid="cart-item" data-item-id="${item.id}">
                      <div class="cart-item-thumb">
                        <img src="${thumbSrc}" alt="${item.title}" class="cart-item-thumb-img" />
                      </div>

                      <div class="cart-item-details">
                        <div class="cart-item-header-row">
                          <h4 class="cart-item-title" data-testid="cart-item-title">${item.title}</h4>
                          <button type="button" class="remove-item-btn" data-testid="remove-item-btn" data-action="remove" data-id="${item.id}" data-scent="${item.scent || ''}" aria-label="Remove ${item.title}">
                            ${getIcon('close')}
                          </button>
                        </div>

                        ${scentSubtitle || customInfo ? `
                          <div class="cart-item-scent-tag">${scentSubtitle || customInfo}</div>
                        ` : ''}

                        <div class="cart-item-controls-row">
                          <div class="cart-item-stepper">
                            <button type="button" class="qty-btn qty-minus" data-testid="qty-decrement" data-action="decrement" data-id="${item.id}" data-scent="${item.scent || ''}" aria-label="Decrease quantity">
                              ${getIcon('minus')}
                            </button>
                            <span class="cart-item-quantity" data-testid="cart-item-qty">${item.quantity}</span>
                            <button type="button" class="qty-btn qty-plus" data-testid="qty-increment" data-action="increment" data-id="${item.id}" data-scent="${item.scent || ''}" aria-label="Increase quantity">
                              ${getIcon('plus')}
                            </button>
                          </div>

                          <div class="cart-item-price-col">
                            <span class="cart-item-price-unit">$${unitPrice.toFixed(2)} ea</span>
                            <span class="cart-item-price-total">$${itemTotal}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <!-- Empty Cart State -->
              <div class="cart-empty-state" data-testid="cart-empty-view">
                <div class="empty-cart-icon">
                  ${getIcon('cart')}
                </div>
                <h3 class="empty-cart-headline">Your bag is empty</h3>
                <p class="empty-cart-lead">Add our small-batch candles or an exclusive box to get started.</p>
                <button type="button" class="btn btn-gold btn-sm empty-shop-btn" id="btn-empty-shop">
                  <span>Explore Fragrance Lineup</span>
                </button>
              </div>
            `}
          </div>

          <!-- Cart Footer (Promo, Summary & Checkout) -->
          <!-- Cart Footer (Promo, Summary & Checkout) -->
          <div class="cart-footer">
            <!-- Promo Code Input Group -->
            <div class="promo-code-container">
              <div class="promo-input-row">
                <input type="text" class="promo-input" id="promo-code" data-testid="promo-input" name="promoCode" placeholder="Promo code (e.g. PUCK10)" value="${promoError ? enteredPromoCode : (promo ? promo.code : enteredPromoCode)}" autocomplete="off" autocapitalize="characters">
                <button type="button" class="btn btn-outline btn-sm apply-promo-btn" data-testid="promo-apply-btn" id="btn-apply-promo">
                  Apply
                </button>
              </div>
              <div class="promo-feedback promo-message" data-testid="promo-message" id="promo-feedback-msg" role="status" aria-live="polite">
                ${promoError ? `<span class="promo-error">${promoError}</span>` : ''}
                ${promo ? `<span class="promo-active-badge">✓ Code ${promo.code} applied (-${promo.discountPercent}%) <button type="button" class="btn-remove-promo" id="btn-remove-promo" aria-label="Remove code">×</button></span>` : ''}
              </div>
            </div>

            <!-- Financial Totals Summary -->
            <div class="cart-summary-block">
              <div class="summary-line">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value cart-subtotal-value" data-testid="cart-subtotal">$${subtotal.toFixed(2)}</span>
              </div>

              ${discount > 0 ? `
                <div class="summary-line discount-line">
                  <span class="summary-label">Discount (${promo ? promo.code : ''})</span>
                  <span class="summary-value cart-discount-value" data-testid="cart-discount">-$${discount.toFixed(2)}</span>
                </div>
              ` : ''}

              <div class="summary-line">
                <span class="summary-label">Estimated Shipping</span>
                <span class="summary-value ${shipping === 0 ? 'free-shipping-tag' : ''}">
                  ${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div class="summary-line total-line">
                <span class="summary-label">Total</span>
                <span class="summary-value cart-total-value" data-testid="cart-total">$${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <!-- Proceed to Checkout Trigger -->
            <button type="button" class="btn btn-gold cart-checkout-btn" data-testid="checkout-btn" data-action="checkout" id="btn-proceed-checkout" ${cart.length === 0 ? 'disabled style="opacity:0.6;cursor:not-allowed;"' : ''}>
              <span>Proceed to Checkout</span>
              <span class="checkout-btn-total">&bull; $${grandTotal.toFixed(2)}</span>
              ${getIcon('chevronRight')}
            </button>

            <div class="cart-guarantee-note">
              <span>Free local pickup at The Blue Hydrangea (Purcellville, VA)</span>
            </div>
          </div>
        </aside>
      </div>
    `;

    // Attach cart drawer event listeners
    const backdrop = root.querySelector('#cart-drawer-backdrop');
    const closeBtn = root.querySelector('[data-testid="cart-close-btn"]');
    const emptyShopBtn = root.querySelector('#btn-empty-shop');
    const promoInput = root.querySelector('#promo-code');
    const promoBtn = root.querySelector('#btn-apply-promo');
    const promoFeedback = root.querySelector('#promo-feedback-msg');
    const removePromoBtn = root.querySelector('#btn-remove-promo');
    const checkoutBtn = root.querySelector('#btn-proceed-checkout');

    // Close actions
    const closeDrawer = () => {
      isDrawerOpen = false;
      render();
      const cartTrigger = document.getElementById('cart-btn');
      if (cartTrigger && typeof cartTrigger.focus === 'function') {
        cartTrigger.focus();
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeDrawer();
      });
    }

    if (emptyShopBtn) {
      emptyShopBtn.addEventListener('click', () => {
        closeDrawer();
        const shopSection = document.getElementById('shop');
        if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Line item quantity & remove actions
    const decBtns = root.querySelectorAll('[data-action="decrement"]');
    decBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const scent = btn.getAttribute('data-scent');
        const item = (Array.isArray(store.state.cart) ? store.state.cart : []).find(it => it && it.id === id && (it.scent || '') === scent);
        if (item) {
          const currentQty = item.quantity || 1;
          if (currentQty <= 1) {
            // Remove item cleanly (EC1)
            store.dispatch('REMOVE_ITEM', { id, scent });
          } else {
            store.dispatch('UPDATE_QUANTITY', { id, scent, quantity: currentQty - 1 });
          }
          render();
        }
      });
    });

    const incBtns = root.querySelectorAll('[data-action="increment"]');
    incBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const scent = btn.getAttribute('data-scent');
        const item = (Array.isArray(store.state.cart) ? store.state.cart : []).find(it => it && it.id === id && (it.scent || '') === scent);
        if (item) {
          const currentQty = item.quantity || 1;
          if (currentQty >= 99) {
            // Clamp at 99 with informative message (EC2)
            alert('For orders over 99 units, please contact us for wholesale assistance.');
            return;
          }
          store.dispatch('UPDATE_QUANTITY', { id, scent, quantity: currentQty + 1 });
          render();
        }
      });
    });

    const removeBtns = root.querySelectorAll('[data-action="remove"]');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const scent = btn.getAttribute('data-scent');
        if (id) {
          store.dispatch('REMOVE_ITEM', { id, scent });
        }
        render();
      });
    });

    // Promo code apply logic
    if (promoBtn && promoInput) {
      promoInput.addEventListener('input', (e) => {
        enteredPromoCode = e.target.value;
        if (promoError) {
          promoError = '';
          const errSpan = root.querySelector('#promo-feedback-msg .promo-error');
          if (errSpan) errSpan.remove();
        }
      });

      const handlePromoApply = () => {
        const rawCode = (promoInput.value || '').trim();
        const upperCode = rawCode.toUpperCase();
        enteredPromoCode = rawCode;

        if (!rawCode) {
          promoError = 'Please enter a promo code';
          render();
          return;
        }

        // Duplicate code detection (EC5)
        if (store.state.promoCode && store.state.promoCode.code === upperCode) {
          promoError = 'Promo code is already applied';
          render();
          return;
        }

        const res = store.dispatch('APPLY_PROMO', rawCode);
        if (res && res.success) {
          promoError = '';
          enteredPromoCode = '';
          render();
        } else {
          promoError = (res && res.message) ? res.message : `Promo code '${rawCode}' is invalid or expired`;
          render();
        }
      };

      promoBtn.addEventListener('click', handlePromoApply);
      promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handlePromoApply();
        }
      });
    }

    if (removePromoBtn) {
      removePromoBtn.addEventListener('click', () => {
        promoError = '';
        enteredPromoCode = '';
        store.dispatch('REMOVE_PROMO_CODE');
        render();
      });
    }

    // Proceed to checkout action
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        closeDrawer();
        if (typeof openCheckoutCallback === 'function') {
          openCheckoutCallback();
        }
      });
    }
  };

  // Header cart trigger button integration
  const cartTriggerBtn = document.getElementById('cart-btn');
  if (cartTriggerBtn) {
    cartTriggerBtn.addEventListener('click', () => {
      openCartDrawer();
    });
  }

  // Keyboard accessibility: Escape to dismiss & Tab focus trapping within cart drawer
  const handleCartKeyDown = (e) => {
    if (!isDrawerOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const drawer = root.querySelector('#cart-drawer');
      if (!drawer) return;

      const focusables = Array.from(
        drawer.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      });

      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl || !drawer.contains(document.activeElement)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl || !drawer.contains(document.activeElement)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  window.addEventListener('keydown', handleCartKeyDown);

  // Expose openCartDrawer method
  const openCartDrawer = () => {
    isDrawerOpen = true;
    render();
    setTimeout(() => {
      const drawer = root.querySelector('#cart-drawer');
      if (!drawer) return;
      const initialFocus = drawer.querySelector('.cart-close-btn') ||
                           drawer.querySelector('#btn-empty-shop') ||
                           drawer.querySelector('button, input, [href]');
      if (initialFocus && typeof initialFocus.focus === 'function') {
        initialFocus.focus();
      }
    }, 50);
  };

  // Update badge count in header
  const updateBadge = () => {
    const badge = document.getElementById('cart-badge');
    const badgeCount = document.getElementById('cart-count');
    const totalCount = store.getCartCount();

    if (badgeCount) badgeCount.textContent = String(totalCount);
    if (badge) {
      badge.setAttribute('aria-label', `${totalCount} items in cart`);
      if (totalCount > 0) {
        badge.classList.add('has-items');
      } else {
        badge.classList.remove('has-items');
      }
    }
  };

  // Subscribe to store updates to keep UI synchronized
  store.subscribe(() => {
    updateBadge();
    if (isDrawerOpen) {
      render();
    }
  });

  // Initial setup
  updateBadge();
  render();

  return {
    openCart: openCartDrawer,
    closeCart: () => {
      isDrawerOpen = false;
      render();
    }
  };
}
