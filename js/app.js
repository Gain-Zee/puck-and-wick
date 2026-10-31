/**
 * Puck & Wick Core Application & Global Reactive State Store
 * Implements window.PuckWickStore conforming to PROJECT.md § Interface Contracts
 */

import { initNavigation } from './modules/navigation.js';
import { getIcon } from './utils/svg-assets.js';
import { initCatalog } from './modules/catalog.js';
import { initCart } from './modules/cart.js';
import { initCheckout } from './modules/checkout.js';
import { initBoxBuilder } from './modules/box-builder.js';
import { initBrandStudio } from './modules/brand-studio.js';
import './modules/payment-adapters.js';

// Global Brand Studio Production Toggle Configuration (Disabled by default for clean production storefront)
const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const initialStudioEnabled = (typeof window !== 'undefined' && window.BRAND_STUDIO_CONFIG && typeof window.BRAND_STUDIO_CONFIG.enabled === 'boolean')
  ? window.BRAND_STUDIO_CONFIG.enabled
  : (typeof window !== 'undefined' && window.APP_CONFIG && typeof window.APP_CONFIG.showBrandStudio === 'boolean')
    ? window.APP_CONFIG.showBrandStudio
    : (urlParams && urlParams.get('studio') === '1');

window.BRAND_STUDIO_CONFIG = Object.assign({ enabled: initialStudioEnabled }, window.BRAND_STUDIO_CONFIG || {});
window.APP_CONFIG = Object.assign({ showBrandStudio: initialStudioEnabled }, window.APP_CONFIG || {});

// Safe localStorage access wrapper
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      // storage unavailable / quota exceeded
    }
  }
};

/**
 * Resolves arbitrary logo concept representations (numbers, numeric strings, slugs, names)
 * into a strictly clamped integer in [1, 4], falling back safely to 1.
 */
export function resolveConceptId(payload, fallback = 1) {
  if (typeof payload === 'number') {
    if (isNaN(payload)) return fallback;
    return Math.min(4, Math.max(1, Math.round(payload)));
  }
  if (typeof payload === 'string') {
    const trimmed = payload.trim();
    if (/^-?\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      return Math.min(4, Math.max(1, num));
    }
    const match = trimmed.match(/concept-(\d)/i);
    if (match) {
      const slugNum = parseInt(match[1], 10);
      return Math.min(4, Math.max(1, slugNum));
    }
    if (/crossed/i.test(trimmed)) return 1;
    if (/heritage|shield/i.test(trimmed)) return 2;
    if (/apothecary|monogram/i.test(trimmed)) return 3;
    if (/stamped|leather|badge|plaque/i.test(trimmed)) return 4;
  }
  return fallback;
}

// Initial persisted state recovery
const rawSavedLogo = storage.get('pw_active_brand_concept') || storage.get('puck_wick_logo');
const initialLogo = resolveConceptId(rawSavedLogo, 1);

let savedCart = [];
try {
  const rawCart = storage.get('puck_wick_cart');
  if (rawCart) {
    const parsed = JSON.parse(rawCart);
    savedCart = Array.isArray(parsed)
      ? parsed.filter(item => item && typeof item === 'object' && item.id)
      : [];
  }
} catch (e) {
  savedCart = [];
}

// Global Reactive Store Instance
window.PuckWickStore = {
  resolveConceptId,
  state: {
    activeCategory: 'all',
    activeLogoConcept: initialLogo, // 1: Crossed Sticks, 2: Heritage Crest, 3: Apothecary, 4: Stamped Leather
    cart: Array.isArray(savedCart)
      ? savedCart.filter(item => item && typeof item === 'object' && item.id)
      : [],
    promoCode: null, // { code: 'PUCK10', discountPercent: 10 }
    shippingMethod: 'standard', // 'standard' ($6.95), 'free' ($0), 'pickup' ($0)
    boxBuilder: {
      edition: 'men_athlete',
      selectedCandleId: 'candle-top-shelf'
    },
    paymentConfig: {
      activeAdapter: 'offline_reservation',
      alinaPos: { apiKey: '', merchantId: 'ALINA-BH-01', terminalId: 'TERM-PURCELLVILLE-01', sandbox: true }
    },
    showBrandStudio: initialStudioEnabled,
    brandStudioVisible: initialStudioEnabled,
    studioPreviewConcept: initialLogo
  },

  listeners: [],

  subscribe(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
    }
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  },

  dispatch(action, payload) {
    const prevSubtotal = this.getCartSubtotal();
    let dispatchResult;

    switch (action) {
      case 'SET_CATEGORY':
      case 'SET_ACTIVE_CATEGORY':
        this.state.activeCategory = payload || 'all';
        break;

      case 'SET_LOGO_CONCEPT':
      case 'SET_ACTIVE_LOGO': {
        const logoId = resolveConceptId(payload, 1);
        this.state.activeLogoConcept = logoId;
        storage.set('puck_wick_logo', logoId.toString());
        storage.set('pw_active_brand_concept', logoId.toString());
        break;
      }

      case 'SET_BOX_EDITION': {
        const edition = payload === 'women_luxe' ? 'women_luxe' : 'men_athlete';
        this.state.boxBuilder = {
          ...(this.state.boxBuilder || { selectedCandleId: 'candle-top-shelf' }),
          edition
        };
        break;
      }

      case 'SET_BOX_CANDLE': {
        if (payload) {
          this.state.boxBuilder = {
            ...(this.state.boxBuilder || { edition: 'men_athlete' }),
            selectedCandleId: String(payload)
          };
        }
        break;
      }

      case 'ADD_ITEM':
      case 'ADD_TO_CART': {
        if (!payload || !payload.id) break;
        if (!Array.isArray(this.state.cart)) {
          this.state.cart = [];
        }
        this.state.cart = this.state.cart.filter((item) => item && typeof item === 'object' && item.id);
        const itemScent = payload.scent || 'Default';
        const customObj = payload.customizations || payload.customOptions || {};
        const itemCustom = JSON.stringify(customObj);

        const existingIdx = this.state.cart.findIndex(
          (item) => item && item.id === payload.id &&
                    (item.scent || 'Default') === itemScent &&
                    JSON.stringify(item.customizations || item.customOptions || {}) === itemCustom
        );

        const addQty = Math.max(1, parseInt(payload.quantity, 10) || 1);

        if (existingIdx > -1) {
          const currentQty = this.state.cart[existingIdx].quantity || 1;
          this.state.cart[existingIdx].quantity = Math.min(99, currentQty + addQty);
          if (payload.photo && !this.state.cart[existingIdx].photo) {
            this.state.cart[existingIdx].photo = payload.photo;
          }
        } else {
          this.state.cart.push({
            id: payload.id,
            title: payload.title || 'Candle',
            type: payload.type || 'candle',
            scent: itemScent,
            price: Number(payload.price) || 36.00,
            quantity: Math.min(99, addQty),
            photo: payload.photo || '',
            customOptions: customObj,
            customizations: customObj
          });
        }

        // Automatic shipping threshold evaluation
        if (this.getCartSubtotal() >= 75 && this.state.shippingMethod === 'standard') {
          this.state.shippingMethod = 'free';
        }
        storage.set('puck_wick_cart', JSON.stringify(this.state.cart));
        break;
      }

      case 'UPDATE_QUANTITY':
      case 'UPDATE_CART_QUANTITY': {
        if (!payload) break;
        if (!Array.isArray(this.state.cart)) {
          this.state.cart = [];
        }
        this.state.cart = this.state.cart.filter((item) => item && typeof item === 'object' && item.id);
        const { id, scent, quantity } = payload;
        const targetQty = parseInt(quantity, 10);
        const itemScent = scent || 'Default';

        const idx = this.state.cart.findIndex(
          (item) => item && item.id === id && (item.scent || 'Default') === itemScent
        );

        if (idx > -1) {
          if (targetQty <= 0) {
            this.state.cart.splice(idx, 1);
          } else {
            this.state.cart[idx].quantity = Math.min(99, targetQty);
          }
          storage.set('puck_wick_cart', JSON.stringify(this.state.cart));
        }
        break;
      }

      case 'REMOVE_ITEM':
      case 'REMOVE_FROM_CART': {
        if (!payload) break;
        if (!Array.isArray(this.state.cart)) {
          this.state.cart = [];
        }
        const { id, scent } = typeof payload === 'object' ? payload : { id: payload, scent: null };
        if (!id) break;
        this.state.cart = this.state.cart.filter((item) => {
          if (!item || typeof item !== 'object' || !item.id) return false;
          if (scent) {
            return !(item.id === id && item.scent === scent);
          }
          return item.id !== id;
        });
        storage.set('puck_wick_cart', JSON.stringify(this.state.cart));
        break;
      }

      case 'CLEAR_CART':
        this.state.cart = [];
        this.state.shippingMethod = 'standard';
        storage.set('puck_wick_cart', JSON.stringify([]));
        break;

      case 'APPLY_PROMO':
      case 'APPLY_PROMO_CODE': {
        const rawCode = typeof payload === 'object' && payload !== null ? (payload.code || '') : (payload || '');
        const code = String(rawCode).trim().toUpperCase();
        const promoCatalog = {
          'PUCK10': 10,
          'BLUEHYDRANGEA': 15,
          'FOUNDER20': 20
        };

        if (promoCatalog[code]) {
          this.state.promoCode = {
            code,
            discountPercent: promoCatalog[code]
          };
          dispatchResult = { success: true, message: `Code ${code} applied (-${promoCatalog[code]}%)` };
        } else {
          dispatchResult = { success: false, message: `Promo code '${code}' is invalid or expired` };
        }
        break;
      }

      case 'REMOVE_PROMO_CODE':
        this.state.promoCode = null;
        break;

      case 'SET_SHIPPING_METHOD':
        if (['standard', 'free', 'pickup'].includes(payload)) {
          this.state.shippingMethod = payload;
        }
        break;

      case 'SET_PAYMENT_ADAPTER':
        if (payload) {
          const adapterName = typeof payload === 'string' ? payload : payload.adapter;
          this.state.paymentConfig = {
            ...this.state.paymentConfig,
            activeAdapter: adapterName,
            ...(typeof payload === 'object' ? payload : {})
          };
        }
        break;

      case 'UPDATE_PAYMENT_CONFIG':
        this.state.paymentConfig = {
          ...this.state.paymentConfig,
          ...(payload || {}),
          alinaPos: {
            ...(this.state.paymentConfig?.alinaPos || {}),
            ...(payload?.alinaPos || {})
          }
        };
        if (window.PaymentAdapterRegistry && payload?.alinaPos) {
          const alina = window.PaymentAdapterRegistry.get('alina_pos');
          if (alina) {
            if (typeof alina.updateConfig === 'function') {
              alina.updateConfig(this.state.paymentConfig.alinaPos);
            } else {
              alina.config = { ...alina.config, ...this.state.paymentConfig.alinaPos };
            }
          }
        }
        break;

      case 'SUBMIT_ORDER_RESERVATION': {
        const orderNum = payload?.orderId || ('PW-2026-' + Math.floor(1000 + Math.random() * 9000));
        const subtotal = this.getCartSubtotal();
        const discount = this.getDiscountAmount();
        const shipping = this.getShippingTotal();
        const tax = Number(((subtotal - discount) * 0.06).toFixed(2));
        const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

        const orderRecord = {
          orderId: orderNum,
          timestamp: new Date().toISOString(),
          customer: payload?.customer || {},
          items: Array.isArray(this.state.cart)
            ? this.state.cart.filter(item => item && typeof item === 'object' && item.id)
            : [],
          subtotal,
          discount,
          shipping,
          tax,
          total: grandTotal,
          fulfillment: this.state.shippingMethod,
          paymentAdapter: this.state.paymentConfig?.activeAdapter || 'offline_reservation'
        };

        this.state.lastOrderId = orderNum;
        this.state.lastOrder = orderRecord;

        try {
          const rawOrders = storage.get('pw_orders');
          const orders = rawOrders ? JSON.parse(rawOrders) : [];
          orders.push(orderRecord);
          storage.set('pw_orders', JSON.stringify(orders));
        } catch (e) {
          // Graceful fallback
        }

        this.state.cart = [];
        storage.set('puck_wick_cart', JSON.stringify([]));
        if (this.state.shippingMethod === 'free') {
          this.state.shippingMethod = 'standard';
        }

        dispatchResult = { success: true, orderId: orderNum, order: orderRecord };
        break;
      }

      case 'TOGGLE_BRAND_STUDIO':
      case 'TOGGLE_STUDIO':
      case 'SET_STUDIO_VISIBLE': {
        const explicit = typeof payload === 'boolean' ? payload : !this.state.brandStudioVisible;
        this.state.showBrandStudio = explicit;
        this.state.brandStudioVisible = explicit;
        if (window.BRAND_STUDIO_CONFIG) window.BRAND_STUDIO_CONFIG.enabled = explicit;
        if (window.APP_CONFIG) window.APP_CONFIG.showBrandStudio = explicit;
        break;
      }

      case 'SET_STUDIO_PREVIEW_CONCEPT': {
        const previewId = resolveConceptId(payload, 1);
        this.state.studioPreviewConcept = previewId;
        break;
      }

      default:
        break;
    }

    // Auto update shipping threshold if subtotal shifted
    const currentSubtotal = this.getCartSubtotal();
    if (currentSubtotal >= 75 && this.state.shippingMethod === 'standard') {
      this.state.shippingMethod = 'free';
    } else if (currentSubtotal < 75 && this.state.shippingMethod === 'free') {
      this.state.shippingMethod = 'standard';
    }

    // Notify listeners
    this.listeners.forEach((fn) => {
      try {
        fn(this.state, action, payload);
      } catch (err) {
        // preserve listener execution
      }
    });

    return dispatchResult;
  },

  getCartSubtotal() {
    if (!Array.isArray(this.state.cart)) return 0;
    return this.state.cart.reduce((sum, item) => sum + (item && Number(item.price) && Number(item.quantity) ? Number(item.price) * Number(item.quantity) : 0), 0);
  },

  getCartCount() {
    if (!Array.isArray(this.state.cart)) return 0;
    return this.state.cart.reduce((sum, item) => sum + (item && Number(item.quantity) ? Number(item.quantity) : 0), 0);
  },

  getDiscountAmount() {
    if (!this.state.promoCode || !this.state.promoCode.discountPercent) return 0;
    const subtotal = this.getCartSubtotal();
    return (subtotal * (this.state.promoCode.discountPercent / 100));
  },

  getShippingTotal() {
    if (!this.state.cart || this.state.cart.length === 0) return 0;
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    if (this.state.shippingMethod === 'pickup') return 0;
    if (subtotal >= 75) return 0;
    if (this.state.shippingMethod === 'free') return 0;
    return 6.95;
  },

  getTaxAmount() {
    const subtotal = this.getCartSubtotal();
    const discount = this.getDiscountAmount();
    return Number(((subtotal - discount) * 0.06).toFixed(2));
  },

  getGrandTotal() {
    const subtotal = this.getCartSubtotal();
    const discount = this.getDiscountAmount();
    const shipping = this.getShippingTotal();
    return Math.max(0, subtotal - discount + shipping);
  }
};

// UI Initialization Helper Functions
function setupWholesaleModal() {
  const inquireBtn = document.getElementById('btn-inquire-wholesale');
  const modalContainer = document.getElementById('modal-container');

  if (!inquireBtn || !modalContainer) return;

  inquireBtn.addEventListener('click', () => {
    const triggerEl = document.activeElement;

    modalContainer.innerHTML = `
      <div class="modal-backdrop" id="wholesale-modal-backdrop" style="position:fixed;inset:0;background:rgba(10,10,12,0.85);backdrop-filter:blur(10px);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:1.5rem 1rem;overflow-y:auto;box-sizing:border-box;">
        <div class="modal-card surface-card wholesale-modal" data-testid="wholesale-modal" style="max-width:540px;width:100%;margin:1.5rem auto;position:relative;background:var(--color-obsidian-950);border:1px solid var(--color-border-gold-subtle);border-radius:var(--radius-xl);padding:2rem 1.5rem;box-shadow:var(--shadow-card), var(--shadow-gold-md);box-sizing:border-box;" role="dialog" aria-modal="true" aria-labelledby="wholesale-title">
          <button type="button" id="btn-close-wholesale" style="position:absolute;top:1rem;right:1rem;width:44px;height:44px;min-width:44px;min-height:44px;display:inline-flex;align-items:center;justify-content:center;color:var(--color-gold-500);cursor:pointer;background:none;border:none;border-radius:var(--radius-sm);" aria-label="Close modal">
            ${getIcon('close')}
          </button>

          <div class="section-kicker" style="margin-bottom:0.5rem;display:inline-flex;align-items:center;gap:0.5rem;color:var(--color-gold-500);font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
            ${getIcon('virginiaPour')}
            <span>Retail &amp; Corporate Partnerships</span>
          </div>

          <h3 id="wholesale-title" class="section-title" style="font-size:1.75rem;margin-bottom:0.5rem;color:var(--color-parchment);">Wholesale &amp; Custom Pours</h3>
          <p style="color:var(--color-text-muted);margin-bottom:1.25rem;line-height:1.6;font-size:0.9rem;">
            Interested in stocking Puck &amp; Wick small-batch soy candles in your boutique, or engineering custom-labeled corporate gift sets? Submit your inquiry directly below or contact us at <strong style="color:var(--color-gold-bright);">wholesale@puckandwick.com</strong>.
          </p>

          <form id="wholesale-form" class="wholesale-form" novalidate style="display:flex;flex-direction:column;gap:1rem;">
            <div class="form-group" style="display:flex;flex-direction:column;gap:0.35rem;">
              <label for="wholesale-name" style="font-size:0.8125rem;font-weight:600;color:var(--color-parchment);letter-spacing:0.05em;">Full Name *</label>
              <input type="text" id="wholesale-name" name="name" required class="form-input" placeholder="e.g. Alex Mercer" style="width:100%;padding:0.75rem 1rem;background:var(--color-charcoal-850);border:1px solid var(--color-border-dark);border-radius:var(--radius-md);color:var(--color-parchment);font-family:var(--font-sans);font-size:0.9rem;">
            </div>

            <div class="form-group" style="display:flex;flex-direction:column;gap:0.35rem;">
              <label for="wholesale-email" style="font-size:0.8125rem;font-weight:600;color:var(--color-parchment);letter-spacing:0.05em;">Business Email *</label>
              <input type="email" id="wholesale-email" name="email" required class="form-input" placeholder="alex@boutique.com" style="width:100%;padding:0.75rem 1rem;background:var(--color-charcoal-850);border:1px solid var(--color-border-dark);border-radius:var(--radius-md);color:var(--color-parchment);font-family:var(--font-sans);font-size:0.9rem;">
            </div>

            <div class="form-group" style="display:flex;flex-direction:column;gap:0.35rem;">
              <label for="wholesale-business" style="font-size:0.8125rem;font-weight:600;color:var(--color-parchment);letter-spacing:0.05em;">Boutique / Store / Business Name *</label>
              <input type="text" id="wholesale-business" name="business" required class="form-input" placeholder="e.g. Historic Main Decor" style="width:100%;padding:0.75rem 1rem;background:var(--color-charcoal-850);border:1px solid var(--color-border-dark);border-radius:var(--radius-md);color:var(--color-parchment);font-family:var(--font-sans);font-size:0.9rem;">
            </div>

            <div class="form-group" style="display:flex;flex-direction:column;gap:0.35rem;">
              <label for="wholesale-notes" style="font-size:0.8125rem;font-weight:600;color:var(--color-parchment);letter-spacing:0.05em;">Inquiry Notes / Custom Pour Details *</label>
              <textarea id="wholesale-notes" name="notes" required class="form-textarea" rows="3" placeholder="Tell us about your boutique, custom pour requirements, or scent preferences..." style="width:100%;padding:0.75rem 1rem;background:var(--color-charcoal-850);border:1px solid var(--color-border-dark);border-radius:var(--radius-md);color:var(--color-parchment);font-family:var(--font-sans);font-size:0.9rem;resize:vertical;"></textarea>
            </div>

            <div id="wholesale-feedback" class="form-feedback" role="status" aria-live="polite"></div>

            <div style="display:flex;gap:1rem;justify-content:flex-end;margin-top:0.5rem;flex-wrap:wrap;">
              <button type="button" class="btn btn-outline" id="btn-done-wholesale">Cancel</button>
              <button type="submit" class="btn btn-gold" id="btn-submit-wholesale">Submit Wholesale Inquiry</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.style.overflow = 'hidden';

    const modalBackdrop = document.getElementById('wholesale-modal-backdrop');
    const closeBtn = document.getElementById('btn-close-wholesale');
    const doneBtn = document.getElementById('btn-done-wholesale');
    const form = document.getElementById('wholesale-form');
    const nameInput = document.getElementById('wholesale-name');
    const emailInput = document.getElementById('wholesale-email');
    const notesInput = document.getElementById('wholesale-notes');
    const feedbackEl = document.getElementById('wholesale-feedback');
    const modalCard = modalContainer.querySelector('.wholesale-modal');

    // Initial focus on first input
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 50);
    }

    let isClosed = false;
    const closeModal = () => {
      if (isClosed) return;
      isClosed = true;
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      modalContainer.innerHTML = '';
      if (triggerEl && typeof triggerEl.focus === 'function') {
        triggerEl.focus();
      }
    };

    // Keyboard handlers (Escape dismiss & Tab focus trapping)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab' && modalCard) {
        const focusables = Array.from(
          modalCard.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
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

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) doneBtn.addEventListener('click', closeModal);

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeModal();
        }
      });
    }

    // Form Submission & Validation
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = (emailInput?.value || '').trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

        if (!emailValid) {
          if (emailInput) {
            emailInput.setCustomValidity('Please enter a valid email address with @ and domain.');
            emailInput.reportValidity();
            emailInput.focus();
          }
          if (feedbackEl) {
            feedbackEl.innerHTML = '<span style="color:#F87171;font-size:0.85rem;">Please enter a valid email address.</span>';
          }
          return;
        } else if (emailInput) {
          emailInput.setCustomValidity('');
        }

        const notesVal = (notesInput?.value || '').trim();
        if (!notesVal) {
          if (notesInput) {
            notesInput.setCustomValidity('Please include inquiry notes or custom pour specifications.');
            notesInput.reportValidity();
            notesInput.focus();
          }
          if (feedbackEl) {
            feedbackEl.innerHTML = '<span style="color:#F87171;font-size:0.85rem;">Inquiry notes cannot be empty.</span>';
          }
          return;
        } else if (notesInput) {
          notesInput.setCustomValidity('');
        }

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Display confirmation feedback
        if (feedbackEl) {
          feedbackEl.innerHTML = `
            <div style="background:rgba(197,160,89,0.15);border:1px solid var(--color-gold-500);border-radius:var(--radius-md);padding:1rem;color:var(--color-parchment);text-align:center;">
              <strong style="color:var(--color-gold-bright);display:block;margin-bottom:0.25rem;">Inquiry Submitted Successfully!</strong>
              Thank you, ${nameInput?.value || 'partner'}. Our wholesale manager will review your request and contact you at <span style="color:var(--color-gold-bright);">${emailVal}</span> within 24–48 hours.
            </div>
          `;
        }
        form.reset();
      });
    }
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('footer-newsletter-form');
  const input = document.getElementById('footer-newsletter-email');
  const msgEl = document.getElementById('footer-newsletter-msg');

  if (!form || !input || !msgEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (input.value || '').trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      msgEl.textContent = 'Please enter a valid email address.';
      msgEl.className = 'footer-newsletter-msg error';
      return;
    }

    msgEl.textContent = 'Welcome to the Locker Room Dispatch. Check your inbox soon.';
    msgEl.className = 'footer-newsletter-msg success';
    input.value = '';

    setTimeout(() => {
      msgEl.textContent = '';
      msgEl.className = 'footer-newsletter-msg';
    }, 6000);
  });
}

// Application Lifecycle Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  // Initialize sticky header, mobile drawer, and dynamic branding
  initNavigation(window.PuckWickStore);

  // Initialize Checkout Modal (returns openCheckout callback)
  const checkoutModule = initCheckout(window.PuckWickStore);

  // Initialize Cart Drawer (returns openCart callback)
  const cartModule = initCart(window.PuckWickStore, () => {
    if (checkoutModule && typeof checkoutModule.openCheckout === 'function') {
      checkoutModule.openCheckout();
    }
  });

  // Initialize Product Catalog (wires to openCart callback)
  initCatalog(window.PuckWickStore, () => {
    if (cartModule && typeof cartModule.openCart === 'function') {
      cartModule.openCart();
    }
  });

  // Initialize Exclusive Box Builder & Dual-Action Odor Science (Milestone 3)
  initBoxBuilder(window.PuckWickStore, () => {
    if (cartModule && typeof cartModule.openCart === 'function') {
      cartModule.openCart();
    }
  });

  // Initialize Brand & Label Concept Studio (Milestone 4)
  initBrandStudio(window.PuckWickStore);

  // Initialize interactive forms & modals
  setupWholesaleModal();
  setupNewsletterForm();
});
