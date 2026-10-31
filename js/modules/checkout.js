/**
 * Puck & Wick POS-Ready Modular Checkout Module
 * Handles customer contact inputs, fulfillment toggling (Standard Shipping vs Local Pickup),
 * pluggable payment adapter selection, Alina POS credential modal,
 * and PW-2026-XXXX order confirmation receipt generation.
 */

import { getIcon } from '../utils/svg-assets.js';
import { PaymentAdapterRegistry } from './payment-adapters.js';

let isSubmitting = false;

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function initCheckout(store) {
  const root = document.getElementById('checkout-modal-root');
  if (!root) return;

  let showAlinaConfigModal = false;
  let orderReceipt = null;

  const openCheckout = () => {
    orderReceipt = null;
    render();
  };

  const closeCheckout = () => {
    root.innerHTML = '';
    document.body.style.overflow = '';
  };

  const render = () => {
    const cart = (store.state.cart || []).filter(item => item && typeof item === 'object' && item.id);
    const subtotal = store.getCartSubtotal();
    const discount = store.getDiscountAmount();
    const shipping = store.getShippingTotal();
    const tax = Number(((subtotal - discount) * 0.06).toFixed(2));
    const grandTotal = Math.max(0, subtotal - discount + shipping + tax);
    const activeAdapterId = store.state.paymentConfig?.activeAdapter || 'offline_reservation';
    const alinaConfig = store.state.paymentConfig?.alinaPos || {
      apiKey: '',
      merchantId: 'ALINA-BH-01',
      terminalId: 'TERM-PURCELLVILLE-01',
      sandbox: true
    };
    const isPickup = store.state.shippingMethod === 'pickup';

    document.body.style.overflow = 'hidden';

    // If order has been placed, render receipt screen
    if (orderReceipt) {
      root.innerHTML = `
        <div class="checkout-backdrop" id="checkout-backdrop" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
          <div class="checkout-card order-confirmation-receipt" data-testid="checkout-modal" tabindex="-1">
            <div class="receipt-container" data-testid="order-receipt">
              <button type="button" class="checkout-close checkout-close-btn" data-testid="checkout-close-btn" aria-label="Close receipt">
                ${getIcon('close')}
              </button>

              <div class="receipt-header">
                <div class="receipt-badge-success">
                  ${getIcon('flame')}
                  <span>Order Confirmed &bull; QC #1 Sealed</span>
                </div>
                <h2 id="receipt-title" class="receipt-title">Thank You For Your Order!</h2>
                <div class="receipt-order-id-box">
                  <span class="order-id-label">Receipt / Confirmation ID:</span>
                  <span class="order-id order-number" data-testid="order-number">${escapeHtml(orderReceipt.orderId)}</span>
                </div>
                <p class="receipt-sub">
                  A confirmation dispatch has been logged for <strong style="color:#FFFFFF;">${escapeHtml(orderReceipt.customer.email)}</strong>.
                </p>
              </div>

              <!-- Pickup vs Delivery Instructions -->
              <div class="receipt-fulfillment-banner ${orderReceipt.fulfillment === 'pickup' ? 'banner-pickup' : 'banner-shipping'}">
                <div class="fulfillment-icon">
                  ${orderReceipt.fulfillment === 'pickup' ? getIcon('flame') : getIcon('truck')}
                </div>
                <div class="fulfillment-details">
                  ${orderReceipt.fulfillment === 'pickup' ? `
                    <div class="fulfillment-title">Free In-Store Pickup at The Blue Hydrangea</div>
                    <div class="fulfillment-address" data-testid="receipt-pickup-address">
                      <strong>The Blue Hydrangea</strong><br>
                      604 E. Main St., Purcellville, VA 20132
                    </div>
                    <div class="fulfillment-timing">
                      Ready for pickup within 2 hours during store hours:<br>
                      Wed – Sat: 10:00 AM – 5:00 PM &bull; Sun: 12:00 PM – 4:00 PM
                    </div>
                  ` : `
                    <div class="fulfillment-title">Standard Tracked Delivery</div>
                    <div class="fulfillment-address">
                      Shipped via USPS Priority to:<br>
                      <strong>${escapeHtml(orderReceipt.customer.fullName)}</strong><br>
                      ${escapeHtml(orderReceipt.customer.street || 'Street address on file')}<br>
                      ${escapeHtml(orderReceipt.customer.city || 'Ashburn')}, ${escapeHtml(orderReceipt.customer.state || 'VA')} ${escapeHtml(orderReceipt.customer.zip || '20147')}
                    </div>
                  `}
                </div>
              </div>

              <!-- Order Summary Table -->
              <div class="receipt-items-table">
                <div class="receipt-table-header">
                  <span>Item Details</span>
                  <span>Qty</span>
                  <span style="text-align:right;">Total</span>
                </div>
                ${orderReceipt.items.map(item => `
                  <div class="receipt-table-row">
                    <div>
                      <strong>${escapeHtml(item.title)}</strong>
                      ${item.scent ? `<div style="font-size:0.75rem;color:var(--color-gold-500);">${escapeHtml(item.scent)}</div>` : ''}
                    </div>
                    <div>× ${item.quantity}</div>
                    <div style="text-align:right;">$${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Financial Breakdown -->
              <div class="receipt-totals-block">
                <div class="receipt-total-line">
                  <span>Subtotal</span>
                  <span>$${orderReceipt.subtotal.toFixed(2)}</span>
                </div>
                ${orderReceipt.discount > 0 ? `
                  <div class="receipt-total-line discount-text">
                    <span>Discount</span>
                    <span>-$${orderReceipt.discount.toFixed(2)}</span>
                  </div>
                ` : ''}
                <div class="receipt-total-line">
                  <span>Shipping (${orderReceipt.fulfillment === 'pickup' ? 'Local Store Pickup' : 'Standard Delivery'})</span>
                  <span>${orderReceipt.shipping === 0 ? 'FREE ($0.00)' : `$${orderReceipt.shipping.toFixed(2)}`}</span>
                </div>
                <div class="receipt-total-line">
                  <span>Virginia State Sales Tax (6.0%)</span>
                  <span>$${orderReceipt.tax.toFixed(2)}</span>
                </div>
                <div class="receipt-total-line grand-total-line">
                  <span>Total</span>
                  <span>$${orderReceipt.total.toFixed(2)}</span>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="receipt-actions-row">
                <button type="button" class="btn btn-outline btn-sm print-receipt-btn" id="btn-print-receipt">
                  ${getIcon('flame')}
                  <span>Print Order Confirmation</span>
                </button>
                <button type="button" class="btn btn-gold btn-sm continue-shopping-btn" id="btn-receipt-continue">
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      const closeBtn = root.querySelector('[data-testid="checkout-close-btn"]');
      const continueBtn = root.querySelector('#btn-receipt-continue');
      const printBtn = root.querySelector('#btn-print-receipt');
      const backdrop = root.querySelector('#checkout-backdrop');

      if (closeBtn) closeBtn.addEventListener('click', closeCheckout);
      if (continueBtn) continueBtn.addEventListener('click', closeCheckout);
      if (printBtn) printBtn.addEventListener('click', () => window.print());
      if (backdrop) {
        backdrop.addEventListener('click', (e) => {
          if (e.target === backdrop) closeCheckout();
        });
      }
      return;
    }

    // Normal Checkout Form
    root.innerHTML = `
      <div class="checkout-backdrop" id="checkout-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
        <div class="checkout-card checkout-modal" data-testid="checkout-modal" tabindex="-1">
          <button type="button" class="checkout-close checkout-close-btn" data-testid="checkout-close-btn" aria-label="Close checkout">
            ${getIcon('close')}
          </button>

          <div class="checkout-header">
            <div class="checkout-kicker">
              <span>Secure POS-Ready Checkout</span>
              <span>&bull;</span>
              <span>Loudoun County, VA</span>
            </div>
            <h2 id="checkout-modal-title" class="checkout-title">Complete Your Order</h2>
          </div>

          <form id="checkout-form" class="checkout-form" novalidate>
            <div class="checkout-layout-grid">
              <!-- Left Column: Customer Info & Fulfillment -->
              <div class="checkout-fields-col">
                <!-- 1. Customer Contact Details -->
                <div class="checkout-section-block">
                  <h3 class="checkout-section-heading">1. Customer Information</h3>
                  
                  <div class="form-group">
                    <label for="customer-name" class="form-label">Full Name *</label>
                    <input type="text" id="customer-name" name="fullName" class="form-input" data-testid="customer-name" placeholder="Alex Ovechkin" required autocomplete="name">
                    <div class="field-error" id="err-customer-name"></div>
                  </div>

                  <div class="form-row-2">
                    <div class="form-group">
                      <label for="customer-email" class="form-label">Email Address *</label>
                      <input type="email" id="customer-email" name="email" class="form-input" data-testid="customer-email" placeholder="alex@puckandwick.com" required autocomplete="email">
                      <div class="field-error" id="err-customer-email"></div>
                    </div>
                    <div class="form-group">
                      <label for="customer-phone" class="form-label">Phone Number *</label>
                      <input type="tel" id="customer-phone" name="phone" class="form-input" data-testid="customer-phone" placeholder="703-555-0100" required autocomplete="tel">
                      <div class="field-error" id="err-customer-phone"></div>
                    </div>
                  </div>
                </div>

                <!-- 2. Fulfillment Preference -->
                <div class="checkout-section-block">
                  <h3 class="checkout-section-heading">2. Delivery or Local Store Pickup</h3>

                  <div class="fulfillment-radio-group">
                    <!-- Option A: Local Pickup -->
                    <label class="fulfillment-radio-card ${isPickup ? 'selected' : ''}" for="opt-local-pickup">
                      <input type="radio" id="opt-local-pickup" name="fulfillment" value="local_pickup" data-testid="fulfillment-pickup" ${isPickup ? 'checked' : ''}>
                      <div class="radio-card-content">
                        <div class="radio-title-row">
                          <span class="radio-title">Free Local Store Pickup ($0)</span>
                          <span class="badge badge-gold-sm">Free</span>
                        </div>
                        <p class="radio-desc">
                          Pick up in person at <strong>The Blue Hydrangea</strong> (604 E. Main St., Purcellville, VA 20132).
                        </p>
                      </div>
                    </label>

                    <!-- Option B: Standard Tracked Delivery -->
                    <label class="fulfillment-radio-card ${!isPickup ? 'selected' : ''}" for="opt-standard-shipping">
                      <input type="radio" id="opt-standard-shipping" name="fulfillment" value="shipping" data-testid="fulfillment-shipping" ${!isPickup ? 'checked' : ''}>
                      <div class="radio-card-content">
                        <div class="radio-title-row">
                          <span class="radio-title">Standard Tracked Delivery</span>
                          <span class="radio-price-tag">${subtotal >= 125 ? 'Free ($125+ Order)' : '$9.95'}</span>
                        </div>
                        <p class="radio-desc">
                          Hand-packed in insulated custom packaging with ice-pack protection during warm months.
                        </p>
                      </div>
                    </label>
                  </div>

                  <!-- Shipping Street Address (Visible only for Standard Delivery) -->
                  <div class="shipping-address-container" id="shipping-address-block" style="${isPickup ? 'display:none;' : ''}">
                    <div class="form-group">
                      <label for="shipping-street" class="form-label">Street Address *</label>
                      <input type="text" id="shipping-street" name="street" class="form-input" data-testid="shipping-street" placeholder="100 Ice Rink Way, Apt 4" ${!isPickup ? 'required' : ''} autocomplete="street-address">
                      <div class="field-error" id="err-shipping-street"></div>
                    </div>

                    <div class="form-row-3">
                      <div class="form-group">
                        <label for="shipping-city" class="form-label">City</label>
                        <input type="text" id="shipping-city" name="city" class="form-input" placeholder="Ashburn" value="Purcellville">
                      </div>
                      <div class="form-group">
                        <label for="shipping-state" class="form-label">State</label>
                        <input type="text" id="shipping-state" name="state" class="form-input" placeholder="VA" value="VA">
                      </div>
                      <div class="form-group">
                        <label for="shipping-zip" class="form-label">ZIP Code</label>
                        <input type="text" id="shipping-zip" name="zip" class="form-input" placeholder="20132" value="20132">
                      </div>
                    </div>
                  </div>

                  <!-- Order Notes -->
                  <div class="form-group" style="margin-top:1rem;">
                    <label for="order-notes" class="form-label">Special Pour Notes or Delivery Instructions</label>
                    <textarea id="order-notes" name="notes" class="form-textarea" data-testid="order-notes" rows="2" placeholder="Leave on porch near hockey bag, gift note, etc."></textarea>
                  </div>
                </div>
              </div>

              <!-- Right Column: Payment Gateway & Financial Summary -->
              <div class="checkout-summary-col">
                <!-- 3. Payment Method Selection -->
                <div class="checkout-section-block">
                  <div class="payment-tabs-header">
                    <h3 class="checkout-section-heading" style="margin:0;">3. Payment Method</h3>
                    <button type="button" class="alina-pos-settings-btn" id="btn-open-alina-config" data-testid="alina-pos-config-btn" title="Configure Alina's POS API Key & Merchant ID">
                      ${getIcon('flame')}
                      <span>POS Settings</span>
                    </button>
                  </div>

                  <div class="payment-adapter-pills" role="tablist">
                    <button type="button" class="adapter-tab-btn ${activeAdapterId === 'offline_reservation' ? 'active' : ''}" data-testid="payment-tab-reservation" data-adapter="offline_reservation">
                      <span>Offline Reservation</span>
                    </button>
                    <button type="button" class="adapter-tab-btn ${activeAdapterId === 'alina_pos' ? 'active' : ''}" data-testid="payment-tab-alina" data-adapter="alina_pos">
                      <span>Alina POS</span>
                    </button>
                    <button type="button" class="adapter-tab-btn ${activeAdapterId === 'stripe' ? 'active' : ''}" data-testid="payment-tab-stripe" data-adapter="stripe">
                      <span>Credit Card</span>
                    </button>
                  </div>

                  <!-- Active Payment Details Card -->
                  <div class="active-payment-card" id="payment-adapter-card">
                    ${activeAdapterId === 'offline_reservation' ? `
                      <div class="adapter-info-box">
                        <strong class="adapter-name">Direct Order Reservation &bull; Zero Gateway Required</strong>
                        <p class="adapter-lead">
                          Submits your order directly to the Loudoun workshop. If picking up, pay in-store at The Blue Hydrangea. If shipping, an invoice will be dispatched to your email.
                        </p>
                      </div>
                    ` : activeAdapterId === 'alina_pos' ? `
                      <div class="adapter-info-box">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem;">
                          <strong class="adapter-name">Alina's Retail POS Integration</strong>
                          <span class="pos-status-badge ${alinaConfig.sandbox ? 'badge-sandbox' : 'badge-live'}">
                            ${alinaConfig.sandbox ? 'Sandbox (Test Mode)' : 'Live Mode'}
                          </span>
                        </div>
                        <p class="adapter-lead">
                          Terminal ID: <code>${alinaConfig.terminalId || 'TERM-PURCELLVILLE-01'}</code> &bull; Merchant: <code>${alinaConfig.merchantId || 'ALINA-BH-01'}</code>
                        </p>
                      </div>
                    ` : `
                      <div class="adapter-info-box">
                        <strong class="adapter-name">Credit Card Payment (Stripe / Square)</strong>
                        <p class="adapter-lead">
                          Ready for live card transaction processing.
                        </p>
                      </div>
                    `}
                  </div>
                </div>

                <!-- 4. Financial Summary Breakdown -->
                <div class="checkout-summary-box">
                  <h4 class="summary-box-title">Order Financial Summary</h4>

                  <div class="checkout-line-items-preview">
                    ${cart.map(item => `
                      <div class="preview-item-row">
                        <span class="preview-title">${item.title} × ${item.quantity}</span>
                        <span class="preview-price">$${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    `).join('')}
                  </div>

                  <div class="checkout-financial-table">
                    <div class="fin-row">
                      <span>Subtotal</span>
                      <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    ${discount > 0 ? `
                      <div class="fin-row discount-row">
                        <span>Discount (${store.state.promoCode?.code || ''})</span>
                        <span>-$${discount.toFixed(2)}</span>
                      </div>
                    ` : ''}
                    <div class="fin-row">
                      <span>Shipping</span>
                      <span class="${shipping === 0 ? 'free-tag' : ''}">${shipping === 0 ? 'FREE ($0.00)' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div class="fin-row">
                      <span>Virginia State Sales Tax (6.0%)</span>
                      <span>$${tax.toFixed(2)}</span>
                    </div>
                    <div class="fin-row grand-total-row">
                      <span>Total Due</span>
                      <span class="grand-total-amount">$${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <!-- Place Order Submit Trigger -->
                  <button type="submit" class="btn btn-gold place-order-btn submit-order-btn" data-testid="place-order-btn" id="btn-place-order">
                    <span>${activeAdapterId === 'offline_reservation' ? 'Submit Order Reservation' : 'Authorize & Place Order'}</span>
                    <span>&bull; $${grandTotal.toFixed(2)}</span>
                  </button>

                  <div id="checkout-form-feedback" class="form-feedback" role="status" aria-live="polite"></div>
                  <div id="checkout-error" class="form-feedback checkout-error" data-testid="checkout-error" role="status" aria-live="polite"></div>
                </div>
              </div>
            </div>
          </form>

          <!-- Alina POS Configuration Submodal / Drawer -->
          ${showAlinaConfigModal ? `
            <div class="alina-pos-modal alina-modal-backdrop" data-testid="alina-pos-modal">
              <div class="alina-modal-card">
                <button type="button" class="alina-close-btn" id="btn-close-alina-modal" aria-label="Close POS Settings">
                  ${getIcon('close')}
                </button>
                <div class="modal-kicker">Retail POS Gateway Setup</div>
                <h3 class="alina-modal-title">Alina's POS Terminal Credentials</h3>
                <p class="alina-modal-sub">
                  Configure retail terminal API credentials for The Blue Hydrangea boutique integration.
                </p>

                <form id="alina-pos-config-form" class="alina-form" novalidate>
                  <div class="form-group">
                    <label for="alina-merchant-id" class="form-label">Merchant ID *</label>
                    <input type="text" id="alina-merchant-id" name="alinaMerchantId" data-testid="alina-merchant-id" class="form-input" value="${alinaConfig.merchantId || ''}" required placeholder="e.g. ALINA-BH-01">
                  </div>

                  <div class="form-group">
                    <label for="alina-terminal-id" class="form-label">Terminal Identifier</label>
                    <input type="text" id="alina-terminal-id" name="alinaTerminalId" data-testid="alina-terminal-id" class="form-input" value="${alinaConfig.terminalId || ''}" placeholder="e.g. TERM-PURCELLVILLE-01">
                  </div>

                  <div class="form-group">
                    <label for="alina-api-key" class="form-label">POS API Secret Key</label>
                    <input type="password" id="alina-api-key" name="alinaApiKey" data-testid="alina-api-key" class="form-input" value="${alinaConfig.apiKey || ''}" placeholder="pos_live_****************">
                  </div>

                  <div class="form-group toggle-group" style="display:flex;align-items:center;gap:0.75rem;margin-block:0.5rem;">
                    <input type="checkbox" id="alina-sandbox-toggle" name="alinaSandbox" data-testid="alina-sandbox-toggle" ${alinaConfig.sandbox ? 'checked' : ''}>
                    <label for="alina-sandbox-toggle" class="form-label" style="margin:0;cursor:pointer;">
                      Enable Sandbox Test Mode (Mock authorizations)
                    </label>
                  </div>

                  <div id="alina-config-feedback" class="form-feedback" role="status" aria-live="polite"></div>

                  <div class="alina-modal-actions" style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1rem;">
                    <button type="button" class="btn btn-outline btn-sm" id="btn-cancel-alina">Cancel</button>
                    <button type="submit" class="btn btn-gold btn-sm save-alina-btn" data-testid="save-alina-config-btn" id="btn-save-alina-config">Save Credentials</button>
                  </div>
                </form>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Attach checkout event listeners
    const backdrop = root.querySelector('#checkout-backdrop');
    const closeBtn = root.querySelector('[data-testid="checkout-close-btn"]');
    const form = root.querySelector('#checkout-form');
    const pickupRadio = root.querySelector('#opt-local-pickup');
    const shippingRadio = root.querySelector('#opt-standard-shipping');
    const streetInput = root.querySelector('#shipping-street');
    const openAlinaBtn = root.querySelector('#btn-open-alina-config');
    const adapterButtons = root.querySelectorAll('.adapter-tab-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeCheckout);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeCheckout();
      });
    }

    // Escape key closes checkout modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCheckout();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { once: true });

    // Fulfillment method selection
    if (pickupRadio) {
      pickupRadio.addEventListener('change', () => {
        store.dispatch('SET_SHIPPING_METHOD', 'pickup');
        render();
      });
    }

    if (shippingRadio) {
      shippingRadio.addEventListener('change', () => {
        store.dispatch('SET_SHIPPING_METHOD', subtotal >= 125 ? 'free' : 'standard');
        render();
      });
    }

    // Payment adapter tab selection
    adapterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const adapter = btn.getAttribute('data-adapter');
        store.dispatch('SET_PAYMENT_ADAPTER', adapter);
        render();
      });
    });

    // Alina POS config trigger
    if (openAlinaBtn) {
      openAlinaBtn.addEventListener('click', () => {
        showAlinaConfigModal = true;
        render();
      });
    }

    // Alina POS modal events if open
    if (showAlinaConfigModal) {
      const closeAlinaBtn = root.querySelector('#btn-close-alina-modal');
      const cancelAlinaBtn = root.querySelector('#btn-cancel-alina');
      const alinaForm = root.querySelector('#alina-pos-config-form');

      const closeAlina = () => {
        showAlinaConfigModal = false;
        render();
      };

      if (closeAlinaBtn) closeAlinaBtn.addEventListener('click', closeAlina);
      if (cancelAlinaBtn) cancelAlinaBtn.addEventListener('click', closeAlina);

      if (alinaForm) {
        alinaForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const merchantId = (root.querySelector('#alina-merchant-id')?.value || '').trim();
          const terminalId = (root.querySelector('#alina-terminal-id')?.value || '').trim();
          const apiKey = (root.querySelector('#alina-api-key')?.value || '').trim();
          const sandbox = root.querySelector('#alina-sandbox-toggle')?.checked || false;
          const feedback = root.querySelector('#alina-config-feedback');

          const adapter = PaymentAdapterRegistry.get('alina_pos');
          const validation = adapter.validateConfig({ merchantId, terminalId, apiKey, sandbox });
          if (!validation.valid) {
            if (feedback) {
              feedback.innerHTML = `<span class="promo-error">${escapeHtml(validation.message || validation.errors?.[0] || 'Invalid credentials')}</span>`;
            }
            return;
          }

          const newConfig = { merchantId, terminalId: terminalId || 'TERM-PURCELLVILLE-01', apiKey, sandbox };
          if (typeof adapter.updateConfig === 'function') {
            adapter.updateConfig(newConfig);
          } else {
            adapter.config = { ...adapter.config, ...newConfig };
          }

          store.dispatch('UPDATE_PAYMENT_CONFIG', {
            alinaPos: newConfig
          });

          showAlinaConfigModal = false;
          render();
        });
      }
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prevent duplicate submissions (T2-F16-03)
        if (isSubmitting) return;

        const nameInput = root.querySelector('#customer-name');
        const emailInput = root.querySelector('#customer-email');
        const phoneInput = root.querySelector('#customer-phone');
        const streetInputEl = root.querySelector('#shipping-street');
        const notesInputEl = root.querySelector('#order-notes');
        const feedbackEl = root.querySelector('#checkout-form-feedback');

        const fullName = (nameInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const phone = (phoneInput?.value || '').trim();
        const street = (streetInputEl?.value || '').trim();
        const notes = (notesInputEl?.value || '').trim();

        const showCheckoutError = (msg) => {
          const feedbackElements = root.querySelectorAll('#checkout-error, #checkout-form-feedback');
          feedbackElements.forEach(el => {
            el.innerHTML = `<span class="promo-error">${escapeHtml(msg)}</span>`;
          });
        };

        const clearCheckoutError = () => {
          const feedbackElements = root.querySelectorAll('#checkout-error, #checkout-form-feedback');
          feedbackElements.forEach(el => {
            el.innerHTML = '';
          });
        };

        clearCheckoutError();

        let hasError = false;

        // Clear previous error styles
        [nameInput, emailInput, phoneInput, streetInputEl].forEach(inp => {
          if (inp) inp.classList.remove('input-error');
        });

        if (!fullName) {
          if (nameInput) nameInput.classList.add('input-error');
          hasError = true;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!email || !emailValid) {
          if (emailInput) emailInput.classList.add('input-error');
          hasError = true;
        }

        if (!phone) {
          if (phoneInput) phoneInput.classList.add('input-error');
          hasError = true;
        }

        if (!isPickup && !street) {
          if (streetInputEl) streetInputEl.classList.add('input-error');
          hasError = true;
        }

        if (activeAdapterId === 'alina_pos') {
          const adapter = PaymentAdapterRegistry.get('alina_pos');
          if (adapter && store.state.paymentConfig?.alinaPos) {
            adapter.config = { ...adapter.config, ...store.state.paymentConfig.alinaPos };
          }
          if (adapter && typeof adapter.validateConfig === 'function') {
            const val = adapter.validateConfig(adapter.config);
            if (!val.valid) {
              showCheckoutError(val.message || 'Payment authorization failed.');
              return;
            }
          }
        }

        if (hasError) {
          showCheckoutError('Please complete all required contact and delivery fields.');
          return;
        }

        isSubmitting = true;
        const placeOrderBtn = root.querySelector('#btn-place-order');
        if (placeOrderBtn) {
          placeOrderBtn.disabled = true;
          placeOrderBtn.classList.add('loading');
        }

        const customerPayload = {
          fullName,
          email,
          phone,
          street: isPickup ? '' : street,
          city: root.querySelector('#shipping-city')?.value || 'Purcellville',
          state: root.querySelector('#shipping-state')?.value || 'VA',
          zip: root.querySelector('#shipping-zip')?.value || '20132',
          notes
        };

        try {
          // Process via adapter or store dispatch
          let orderRes;
          if (activeAdapterId === 'alina_pos') {
            const adapter = PaymentAdapterRegistry.get('alina_pos');
            if (adapter && store.state.paymentConfig?.alinaPos) {
              if (typeof adapter.updateConfig === 'function') {
                adapter.updateConfig(store.state.paymentConfig.alinaPos);
              } else {
                adapter.config = { ...adapter.config, ...store.state.paymentConfig.alinaPos };
              }
            }
            orderRes = await adapter.processPayment({
              subtotal,
              discount,
              shipping,
              tax,
              total: grandTotal,
              customer: customerPayload,
              items: [...cart],
              fulfillment: isPickup ? 'pickup' : 'shipping'
            });
            if (!orderRes || !orderRes.success) {
              const errMsg = orderRes?.error || 'Payment authorization failed. Please verify credentials or select another payment method.';
              showCheckoutError(errMsg);
              if (placeOrderBtn) {
                placeOrderBtn.disabled = false;
                placeOrderBtn.classList.remove('loading');
              }
              return;
            }
            store.dispatch('SUBMIT_ORDER_RESERVATION', { customer: customerPayload, orderId: orderRes.orderId });
          } else {
            const adapter = PaymentAdapterRegistry.get(activeAdapterId);
            if (adapter && activeAdapterId !== 'offline_reservation' && typeof adapter.processPayment === 'function') {
              if (typeof adapter.updateConfig === 'function' && store.state.paymentConfig?.[activeAdapterId]) {
                adapter.updateConfig(store.state.paymentConfig[activeAdapterId]);
              }
              orderRes = await adapter.processPayment({
                subtotal,
                discount,
                shipping,
                tax,
                total: grandTotal,
                customer: customerPayload,
                items: [...cart],
                fulfillment: isPickup ? 'pickup' : 'shipping'
              });
              if (!orderRes || !orderRes.success) {
                const errMsg = orderRes?.error || 'Payment authorization failed. Please verify credentials or select another payment method.';
                showCheckoutError(errMsg);
                if (placeOrderBtn) {
                  placeOrderBtn.disabled = false;
                  placeOrderBtn.classList.remove('loading');
                }
                return;
              }
              const dispatchRes = store.dispatch('SUBMIT_ORDER_RESERVATION', { customer: customerPayload, orderId: orderRes.orderId });
              orderRes = { ...orderRes, orderId: orderRes.orderId || dispatchRes?.orderId };
            } else {
              const dispatchRes = store.dispatch('SUBMIT_ORDER_RESERVATION', { customer: customerPayload });
              orderRes = dispatchRes || { orderId: `PW-2026-${Math.floor(1000 + Math.random() * 9000)}` };
            }
          }

          orderReceipt = {
            orderId: orderRes.orderId || store.state.lastOrderId || `PW-2026-8912`,
            customer: customerPayload,
            items: [...cart],
            subtotal,
            discount,
            shipping,
            tax,
            total: grandTotal,
            fulfillment: isPickup ? 'pickup' : 'shipping'
          };

          render();
        } catch (err) {
          showCheckoutError(`Order placement failed: ${err.message || 'Unknown error'}`);
          if (placeOrderBtn) {
            placeOrderBtn.disabled = false;
            placeOrderBtn.classList.remove('loading');
          }
        } finally {
          isSubmitting = false;
        }
      });
    }
  };

  return {
    openCheckout
  };
}
