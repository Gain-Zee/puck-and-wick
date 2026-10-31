/**
 * tests/helpers/selectors.js
 * Comprehensive semantic and data-testid selector catalog for Puck & Wick.
 * Adheres strictly to PROJECT.md and survey specifications with resilient fallbacks.
 */

export const SELECTORS = {
  // Navigation & Header
  nav: '[data-testid="main-nav"], [data-testid="header"], header nav, header',
  brandLogo: '[data-testid="nav-brand"], [data-testid="brand-logo"], .brand-logo, header a[href="#hero"], header a[href="#"]',
  navLinks: {
    shop: '#mobile-nav.open [data-testid="nav-link-shop"], [data-testid="nav-link-shop"], nav a[href="#shop"], a[href="#shop"]',
    exclusiveBoxes: '#mobile-nav.open [data-testid="nav-link-exclusive-boxes"], [data-testid="nav-link-exclusive-boxes"], nav a[href="#exclusive-boxes"], a[href="#exclusive-boxes"]',
    story: '#mobile-nav.open [data-testid="nav-link-story"], [data-testid="nav-link-story"], nav a[href="#story"], a[href="#story"]',
    stockists: '#mobile-nav.open [data-testid="nav-link-stockists"], [data-testid="nav-link-stockists"], nav a[href="#stockists"], nav a[href="#stockist"], a[href="#stockists"], a[href="#stockist"]',
    studio: '#mobile-nav.open [data-testid="nav-link-studio"], [data-testid="nav-link-studio"], nav a[href="#studio"], a[href="#studio"]'
  },
  cartTrigger: '[data-testid="cart-trigger"], .cart-trigger, button[aria-label*="Cart"], [aria-label*="cart"]',
  cartBadge: '[data-testid="cart-badge-count"], [data-testid="cart-badge"], #cart-count, #cart-badge, .cart-badge, .cart-count',
  mobileMenuToggle: '[data-testid="mobile-menu-toggle"], .mobile-toggle, button[aria-label*="Menu"]',
  mobileNav: '[data-testid="mobile-nav"], .mobile-nav, .mobile-menu',

  // Hero Section
  hero: {
    section: '[data-testid="hero-section"], #hero, section.hero',
    headline: '[data-testid="hero-headline"], .hero-headline, .hero h1',
    tagline: '[data-testid="hero-tagline"], .hero-tagline',
    ctaShop: '[data-testid="hero-cta-shop"], .hero-cta-shop, a[href="#shop"].cta',
    ctaBoxes: '[data-testid="hero-cta-boxes"], .hero-cta-boxes, a[href="#exclusive-boxes"].cta',
    flameVisual: '[data-testid="hero-flame"], .hero-flame, .flame-visual'
  },

  // Story & QC #1
  story: {
    section: '[data-testid="story-section"], #story, section.story',
    founderQuote: '[data-testid="founder-quote"], .founder-quote',
    pillars: '[data-testid^="qc-pillar"], .qc-pillar, [data-pillar]',
    pillarSoy: '[data-testid="qc-pillar-soy"], [data-testid="qc-pillar-1"], .pillar-soy',
    pillarPhthalate: '[data-testid="qc-pillar-phthalate"], [data-testid="qc-pillar-2"], .pillar-phthalate',
    pillarWicks: '[data-testid="qc-pillar-wicks"], [data-testid="qc-pillar-3"], .pillar-wicks',
    pillarHandPour: '[data-testid="qc-pillar-handpour"], [data-testid="qc-pillar-4"], .pillar-handpour'
  },

  // Stockist Hub (The Blue Hydrangea)
  stockist: {
    section: ':is([data-testid="stockist-section"], #stockists, #stockist, section.stockist)',
    address: '[data-testid="stockist-address"], .stockist-address',
    hours: '[data-testid="stockist-hours"], .stockist-hours',
    pickupBadge: '[data-testid="stockist-pickup-badge"], .pickup-badge',
    wholesaleBtn: '[data-testid="inquire-wholesale-btn"], .wholesale-btn, button[data-action="wholesale"]',
    wholesaleModal: ':is([data-testid="wholesale-modal"], .wholesale-modal)'
  },

  // Catalog & Scent Filters
  catalog: {
    section: '[data-testid="catalog-section"], #shop, section.catalog',
    filters: {
      all: '[data-testid="filter-all"], button[data-filter="all"], .filter-all',
      signature: '[data-testid="filter-signature"], button[data-filter="signature"], .filter-signature',
      freshClean: '[data-testid="filter-fresh-clean"], button[data-filter="fresh_clean"], .filter-fresh-clean',
      woodsRustic: '[data-testid="filter-woods-rustic"], button[data-filter="woods_rustic"], .filter-woods-rustic',
      seasonal: '[data-testid="filter-seasonal"], button[data-filter="seasonal"], .filter-seasonal',
      exclusiveBoxes: '[data-testid="filter-exclusive-boxes"], button[data-filter="exclusive_boxes"], .filter-boxes'
    },
    productCard: '[data-testid="product-card"], .product-card',
    productTitle: '[data-testid="product-title"], .product-title, h3',
    productPrice: '[data-testid="product-price"], .product-price',
    quickViewBtn: '[data-testid="quick-view-btn"], .quick-view-btn',
    quickAddBtn: '[data-testid="quick-add-btn"], .quick-add-btn'
  },

  // Quick-View Modal
  modal: {
    container: '[data-testid="product-modal"], .product-modal, dialog.product-modal',
    closeBtn: '[data-testid="modal-close-btn"], .modal-close, button[aria-label="Close"]',
    notesTop: '[data-testid="scent-notes-top"], .notes-top',
    notesMiddle: '[data-testid="scent-notes-middle"], .notes-middle',
    notesBase: '[data-testid="scent-notes-base"], .notes-base',
    burnTime: '[data-testid="product-burn-time"], .burn-time',
    vesselSpecs: '[data-testid="product-vessel-specs"], .vessel-specs',
    addToCartBtn: '[data-testid="modal-add-to-cart-btn"], .modal-add-to-cart'
  },

  // Slide-Out Cart Drawer
  cart: {
    drawer: '[data-testid="cart-drawer"], .cart-drawer, [aria-label="Shopping Cart"]',
    closeBtn: '[data-testid="cart-close-btn"], .cart-close, button[aria-label="Close cart"]',
    itemList: '[data-testid="cart-items"], .cart-items-list',
    item: '[data-testid="cart-item"], .cart-item',
    itemTitle: '[data-testid="cart-item-title"], .cart-item-title',
    itemQuantity: '[data-testid="cart-item-qty"], .cart-item-quantity, input.qty-input',
    qtyIncrement: '[data-testid="qty-increment"], button.qty-plus, [data-action="increment"]',
    qtyDecrement: '[data-testid="qty-decrement"], button.qty-minus, [data-action="decrement"]',
    removeItem: '[data-testid="remove-item-btn"], button.remove-item, [data-action="remove"]',
    subtotal: '[data-testid="cart-subtotal"], .cart-subtotal-value',
    discount: '[data-testid="cart-discount"], .cart-discount-value',
    total: '[data-testid="cart-total"], .cart-total-value',
    promoInput: '[data-testid="promo-input"], input#promo-code, input[name="promoCode"]',
    promoApplyBtn: '[data-testid="promo-apply-btn"], button.apply-promo-btn',
    promoMessage: '[data-testid="promo-message"], .promo-feedback',
    shippingProgress: '[data-testid="shipping-progress-bar"], .shipping-meter-fill',
    shippingText: '[data-testid="shipping-progress-text"], .shipping-meter-text',
    checkoutBtn: '[data-testid="checkout-btn"], .cart-checkout-btn, button[data-action="checkout"]'
  },

  // Checkout Modal & POS Adapters
  checkout: {
    modal: '[data-testid="checkout-modal"], .checkout-modal, dialog.checkout-modal',
    closeBtn: '[data-testid="checkout-close-btn"], .checkout-close',
    customerName: '[data-testid="customer-name"], input[name="fullName"], input#customer-name',
    customerEmail: '[data-testid="customer-email"], input[name="email"], input#customer-email',
    customerPhone: '[data-testid="customer-phone"], input[name="phone"], input#customer-phone',
    fulfillmentShipping: '[data-testid="fulfillment-shipping"], input[value="shipping"]',
    fulfillmentPickup: '[data-testid="fulfillment-pickup"], input[value="local_pickup"], input[value="pickup"]',
    shippingStreet: '[data-testid="shipping-street"], input[name="street"]',
    orderNotes: '[data-testid="order-notes"], textarea[name="notes"]',
    paymentTabs: {
      reservation: '[data-testid="payment-tab-reservation"], button[data-adapter="offline_reservation"]',
      alinaPos: '[data-testid="payment-tab-alina"], button[data-adapter="alina_pos"]',
      stripe: '[data-testid="payment-tab-stripe"], button[data-adapter="stripe"]'
    },
    alinaConfigBtn: '[data-testid="alina-pos-config-btn"], .alina-pos-settings-btn',
    alinaModal: '[data-testid="alina-pos-modal"], .alina-pos-modal',
    alinaApiKey: '[data-testid="alina-api-key"], input[name="alinaApiKey"]',
    alinaMerchantId: '[data-testid="alina-merchant-id"], input[name="alinaMerchantId"]',
    alinaTerminalId: '[data-testid="alina-terminal-id"], input[name="alinaTerminalId"]',
    alinaSandboxToggle: '[data-testid="alina-sandbox-toggle"], input[name="alinaSandbox"]',
    saveAlinaConfigBtn: '[data-testid="save-alina-config-btn"], button.save-alina-btn',
    placeOrderBtn: '[data-testid="place-order-btn"], button.submit-order-btn, button[type="submit"]',
    receipt: '[data-testid="order-receipt"], .order-confirmation-receipt',
    orderNumber: '[data-testid="order-number"], .order-id'
  },

  // Exclusive Box Customizer
  boxBuilder: {
    section: '[data-testid="box-builder-section"], #exclusive-boxes, section.box-builder',
    toggleMen: '[data-testid="edition-toggle-men"], button[data-edition="men_athlete"]',
    toggleWomen: '[data-testid="edition-toggle-women"], button[data-edition="women_luxe"]',
    scentSelector: '[data-testid="box-scent-select"], select.box-scent-select, [data-testid="scent-pills"]',
    scentOption: '[data-testid^="box-scent-option"], .scent-option',
    bundledItems: '[data-testid="bundled-items-list"], .bundled-items',
    itemCandle: '[data-testid="bundled-candle"], .bundle-item-candle',
    itemPuck: '[data-testid="bundled-puck"], .bundle-item-puck',
    itemBodyWash: '[data-testid="bundled-bodywash"], .bundle-item-bodywash',
    boxPrice: '[data-testid="box-price"], .box-bundle-price',
    addBoxBtn: '[data-testid="add-box-to-cart-btn"], button.add-exclusive-box-btn'
  },

  // Odor Science
  odorScience: {
    section: '[data-testid="odor-science-section"], #odor-science, .odor-science',
    charcoalGraphic: '[data-testid="science-charcoal"], .science-charcoal',
    metazeneGraphic: '[data-testid="science-metazene"], .science-metazene'
  },

  // Brand & Label Concept Studio
  brandStudio: {
    section: '[data-testid="brand-studio-section"], #studio, section.brand-studio',
    concepts: {
      c1: '[data-testid="logo-concept-1"], .concept-card-1',
      c2: '[data-testid="logo-concept-2"], .concept-card-2',
      c3: '[data-testid="logo-concept-3"], .concept-card-3',
      c4: '[data-testid="logo-concept-4"], .concept-card-4'
    },
    jarMockup: '[data-testid="jar-mockup"], .jar-mockup-stage svg, .jar-mockup-svg',
    scentToggleTopShelf: '[data-testid="mockup-scent-top-shelf"], button[data-scent="top-shelf"]',
    scentToggleFreshCut: '[data-testid="mockup-scent-fresh-cut"], button[data-scent="fresh-cut"]',
    vesselToggleObsidian: '[data-testid="mockup-vessel-obsidian"], button[data-vessel="obsidian"]',
    vesselToggleAmber: '[data-testid="mockup-vessel-amber"], button[data-vessel="amber"]',
    applyLogoBtn: '[data-testid="apply-logo-btn"], button.apply-logo-btn'
  },

  // Footer
  footer: {
    section: '[data-testid="footer-section"], footer',
    stockistAddress: 'footer [data-testid="footer-address"], footer .stockist-address',
    copyright: 'footer .copyright, footer [data-testid="copyright"]'
  }
};
