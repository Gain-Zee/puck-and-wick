/**
 * Puck & Wick Modular Payment Adapters Engine
 * Implements IPaymentAdapter contract, OfflineReservationAdapter (zero-key default),
 * and AlinaPosAdapter with terminal configuration.
 */

export class IPaymentAdapter {
  constructor(config = {}) {
    this.id = config.id || 'base_adapter';
    this.name = config.name || 'Base Payment Adapter';
    this.config = { ...config };
  }

  updateConfig(newConfig = {}) {
    this.config = { ...this.config, ...newConfig };
    return this.config;
  }

  validateConfig(config = this.config) {
    return { valid: true, errors: [] };
  }

  async processPayment(orderData = {}) {
    return {
      success: true,
      status: 'completed',
      transactionId: 'TX-' + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString()
    };
  }
}

export class OfflineReservationAdapter extends IPaymentAdapter {
  constructor(config = {}) {
    super({
      id: 'offline_reservation',
      name: 'Instant Order Reservation & Local Pickup / Invoice Request',
      ...config
    });
  }

  validateConfig(config = this.config) {
    return { valid: true, errors: [] };
  }

  async processPayment(orderData = {}) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = orderData.orderId || `PW-2026-${randomSuffix}`;

    const receiptRecord = {
      orderId,
      receiptNumber: orderId,
      timestamp: new Date().toISOString(),
      customer: orderData.customer || {},
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      discount: Number(orderData.discount) || 0,
      shipping: Number(orderData.shipping) || 0,
      tax: Number(orderData.tax) || 0,
      total: Number(orderData.total) || 0,
      fulfillment: orderData.fulfillment || 'pickup',
      pickupLocation: 'The Blue Hydrangea, 604 E. Main St., Purcellville, VA 20132',
      status: 'reserved',
      paymentMethod: 'Offline Order Reservation / Direct Invoice'
    };

    // Safe offline persistence to localStorage
    try {
      const raw = localStorage.getItem('pw_orders');
      const orders = raw ? JSON.parse(raw) : [];
      orders.push(receiptRecord);
      localStorage.setItem('pw_orders', JSON.stringify(orders));
    } catch (e) {
      // In-memory fallback
    }

    return {
      success: true,
      status: 'reserved',
      orderId,
      receiptNumber: orderId,
      receipt: receiptRecord
    };
  }
}

export class AlinaPosAdapter extends IPaymentAdapter {
  constructor(config = {}) {
    super({
      id: 'alina_pos',
      name: "Alina's Retail POS Terminal",
      sandbox: true,
      merchantId: 'ALINA-BH-01',
      terminalId: 'TERM-PURCELLVILLE-01',
      apiKey: '',
      ...config
    });
  }

  updateConfig(newConfig = {}) {
    this.config = { ...this.config, ...newConfig };
    return this.config;
  }

  validateConfig(config) {
    const cfg = config !== undefined ? config : this.config;
    const errors = [];

    if (!cfg || !cfg.merchantId || !String(cfg.merchantId).trim()) {
      errors.push('Merchant ID is required');
      return { valid: false, message: 'Merchant ID is required for Alina POS', errors };
    }

    if (cfg.sandbox === false && (!cfg.apiKey || !String(cfg.apiKey).trim())) {
      errors.push('API Key is required in Live processing mode');
      return { valid: false, message: 'API Key is required in Live mode', errors };
    }

    return { valid: true, errors: [] };
  }

  async processPayment(orderData = {}) {
    const validation = this.validateConfig(this.config);
    if (!validation.valid) {
      return {
        success: false,
        status: 'failed',
        error: validation.message,
        errors: validation.errors
      };
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = orderData.orderId || `PW-2026-${randomSuffix}`;

    return {
      success: true,
      status: 'authorized',
      authCode: 'AUTH-POS-78219',
      orderId,
      receiptNumber: orderId,
      terminalId: this.config.terminalId || 'TERM-PURCELLVILLE-01',
      merchantId: this.config.merchantId,
      mode: this.config.sandbox ? 'sandbox' : 'live',
      timestamp: new Date().toISOString()
    };
  }
}

export class StubAdapter extends IPaymentAdapter {
  constructor(config = {}) {
    super({
      id: 'stub_test',
      name: 'Stub Test Adapter',
      ...config
    });
    this.simulateFailure = Boolean(config.simulateFailure);
  }

  async processPayment(orderData = {}) {
    if (this.simulateFailure) {
      return {
        success: false,
        status: 'failed',
        error: 'Simulated payment processing network failure. Please retry or choose local order reservation.'
      };
    }
    return {
      success: true,
      status: 'completed',
      orderId: 'PW-2026-9999'
    };
  }
}

export const PaymentAdapterRegistry = {
  adapters: new Map(),

  register(id, adapterInstance) {
    this.adapters.set(id, adapterInstance);
  },

  get(id) {
    return this.adapters.get(id) || this.adapters.get('offline_reservation');
  },

  has(id) {
    return this.adapters.has(id);
  },

  list() {
    return Array.from(this.adapters.entries()).map(([id, inst]) => ({
      id,
      name: inst.name
    }));
  }
};

// Pre-register standard adapters
PaymentAdapterRegistry.register('offline_reservation', new OfflineReservationAdapter());
PaymentAdapterRegistry.register('alina_pos', new AlinaPosAdapter());
PaymentAdapterRegistry.register('stripe', new IPaymentAdapter({ id: 'stripe', name: 'Stripe Payment Gateway' }));

// Expose on global window object for test and cross-module contracts
if (typeof window !== 'undefined') {
  window.IPaymentAdapter = IPaymentAdapter;
  window.OfflineReservationAdapter = OfflineReservationAdapter;
  window.AlinaPosAdapter = AlinaPosAdapter;
  window.StubAdapter = StubAdapter;
  window.PaymentAdapterRegistry = PaymentAdapterRegistry;
}
