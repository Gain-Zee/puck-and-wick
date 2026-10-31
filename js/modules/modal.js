/**
 * Puck & Wick Product Detail Quick-View Modal Module
 * Provides accessible 3-tier scent pyramid preview, burn time specifications,
 * vessel specs, quantity controls, and add-to-cart integration.
 */

import { getProductById, getCandleVesselSvg, getProductGallerySlides, getInteractive360BoxHtml, attachBox360Physics } from '../data/products.js';
import { getIcon } from '../utils/svg-assets.js';

let activeTriggerElement = null;

export function openProductModal(productId, store, openCartCallback, initialSlideIndex = 0) {
  const product = getProductById(productId);
  if (!product) return;

  activeTriggerElement = document.activeElement;
  const modalContainer = document.getElementById('modal-container') || document.body;

  let quantity = 1;
  const activeLogoConcept = store?.state?.activeLogoConcept || 1;
  const gallerySlides = getProductGallerySlides(product, activeLogoConcept);
  let activeSlideIdx = Math.max(0, Math.min(initialSlideIndex, gallerySlides.length - 1));

  const renderSlideStage = (idx, isLightbox = false) => {
    const slide = gallerySlides[idx] || gallerySlides[0];
    if (slide.type === 'svg') {
      return getCandleVesselSvg(product, activeLogoConcept, true);
    }
    if (slide.type === 'box360') {
      return getInteractive360BoxHtml(product, isLightbox ? 'lightbox' : 'modal');
    }
    return `
      <div class="modal-slide-photo-frame ${isLightbox ? 'lightbox-photo-frame' : ''}">
        <img src="${slide.src}" alt="${slide.title}" class="modal-slide-photo-img" loading="eager" />
        <div class="modal-slide-caption-bar">
          <span>${slide.title}</span>
        </div>
      </div>
    `;
  };

  const modalHtml = `
    <div class="product-modal-backdrop" id="product-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <div class="product-modal-card product-modal" data-testid="product-modal" tabindex="-1">
        <!-- Close Button -->
        <button type="button" class="modal-close-btn modal-close" data-testid="modal-close-btn" aria-label="Close product details">
          ${getIcon('close')}
        </button>

        <div class="modal-grid">
          <!-- Left: Multi-Photo Interactive Gallery Carousel -->
          <div class="modal-visual-column">
            <div class="modal-vessel-stage" id="modal-gallery-stage" data-testid="modal-gallery-stage">
              ${renderSlideStage(activeSlideIdx)}
            </div>

            <!-- Carousel Prev/Next Controls, Enlarge Full-Screen Button & Counter Badge -->
            <div class="modal-carousel-counter" id="modal-carousel-counter">
              <span>${activeSlideIdx + 1} / ${gallerySlides.length}</span>
            </div>
            <button type="button" class="modal-enlarge-btn" id="modal-enlarge-btn" data-testid="modal-enlarge-btn" aria-label="Enlarge photo in distraction-free full-screen viewer">
              ${getIcon('search')}
              <span>Enlarge Full Screen</span>
            </button>
            <button type="button" class="modal-carousel-arrow arrow-prev" id="modal-slide-prev" aria-label="Previous product photo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button type="button" class="modal-carousel-arrow arrow-next" id="modal-slide-next" aria-label="Next product photo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            ${product.seasonal ? `<div class="modal-badge-seasonal">${product.seasonalBadge || 'Seasonal Collaboration'}</div>` : ''}

            <!-- Interactive Multi-Photo Thumbnail Strip -->
            <div class="modal-gallery-thumbs" id="modal-gallery-thumbs" role="tablist" aria-label="Product gallery views">
              ${gallerySlides.map((s, idx) => `
                <button type="button" class="modal-thumb-btn ${idx === activeSlideIdx ? 'active' : ''}" data-slide-idx="${idx}" role="tab" aria-selected="${idx === activeSlideIdx}">
                  <img src="${s.thumb}" alt="${s.shortLabel}" class="modal-thumb-img" loading="lazy" />
                  <span class="modal-thumb-label">${s.shortLabel}</span>
                </button>
              `).join('')}
            </div>
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

            <div class="modal-included-callout" data-testid="modal-included-callout">
              <span class="included-callout-badge">WHAT YOU RECEIVE</span>
              <span class="included-callout-text">${product.includedSummary || `SOLD INDIVIDUALLY • Includes 1x 10 oz (${product.name}) Hand-Poured Soy Candle in Two-Piece Collector Box.`}</span>
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
                  <img src="assets/images/mini-pucks-action-triptych.jpg" alt="3-Step Guide: 1. Hold 2.0 inch Mini Pucks in open palm, 2. Drop into hockey glove wrist cuff opening, 3. Drop into skate boot ankle" class="mini-guide-img" loading="lazy" />
                  <div class="mini-guide-step-tags">
                    <span class="mini-step-tag"><strong>01</strong> 2.0&Prime; Palm Fit</span>
                    <span class="mini-step-tag"><strong>02</strong> Glove Wrist Cuff</span>
                    <span class="mini-step-tag"><strong>03</strong> Drop in Skates</span>
                  </div>
                </div>
                <div class="mini-guide-steps-row">
                  <div class="mini-guide-step-item">
                    <strong>1. Grab Twin-Pack:</strong> Compact 50mm size fits left &amp; right gear.
                  </div>
                  <div class="mini-guide-step-item">
                    <strong>2. Glove Wrist Cuff:</strong> Drops straight inside where your hand goes.
                  </div>
                  <div class="mini-guide-step-item">
                    <strong>3. Skates &amp; Cleats:</strong> Destroys sweat odor overnight (6+ mos).
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

        <!-- Nested Distraction-Free Enlarge Full-Screen Lightbox Window (Window-Within-a-Window) -->
        <div class="modal-enlarge-lightbox" id="modal-enlarge-lightbox" data-testid="modal-enlarge-lightbox" aria-hidden="true">
          <div class="enlarge-lightbox-topbar">
            <div class="enlarge-lightbox-title-group">
              <span class="enlarge-lightbox-kicker">DISTRACTION-FREE STUDIO INSPECTION • ${product.name.toUpperCase()}</span>
              <span class="enlarge-lightbox-counter" id="enlarge-lightbox-counter">${activeSlideIdx + 1} / ${gallerySlides.length}</span>
            </div>
            <button type="button" class="enlarge-lightbox-close" id="enlarge-lightbox-close" aria-label="Exit full-screen view">
              ${getIcon('close')}
              <span>Close Full Screen</span>
            </button>
          </div>

          <div class="enlarge-lightbox-stage-wrap">
            <button type="button" class="enlarge-lightbox-arrow arrow-prev" id="enlarge-slide-prev" aria-label="Previous enlarged photo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div class="enlarge-lightbox-stage" id="enlarge-lightbox-stage"></div>

            <button type="button" class="enlarge-lightbox-arrow arrow-next" id="enlarge-slide-next" aria-label="Next enlarged photo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div class="enlarge-lightbox-thumbs" id="enlarge-lightbox-thumbs" role="tablist" aria-label="Switch enlarged photo">
            ${gallerySlides.map((s, idx) => `
              <button type="button" class="enlarge-thumb-pill ${idx === activeSlideIdx ? 'active' : ''}" data-enlarge-slide-idx="${idx}">
                <img src="${s.thumb}" alt="${s.shortLabel}" />
                <span>${s.shortLabel}</span>
              </button>
            `).join('')}
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
  const galleryStage = document.getElementById('modal-gallery-stage');
  const counterEl = document.getElementById('modal-carousel-counter');
  const prevSlideBtn = document.getElementById('modal-slide-prev');
  const nextSlideBtn = document.getElementById('modal-slide-next');
  const thumbBtns = backdrop.querySelectorAll('.modal-thumb-btn');

  const enlargeBtn = document.getElementById('modal-enlarge-btn');
  const enlargeLightbox = document.getElementById('modal-enlarge-lightbox');
  const enlargeStage = document.getElementById('modal-enlarge-lightbox') ? document.getElementById('enlarge-lightbox-stage') : null;
  const enlargeCounter = document.getElementById('enlarge-lightbox-counter');
  const enlargeCloseBtn = document.getElementById('enlarge-lightbox-close');
  const enlargePrevBtn = document.getElementById('enlarge-slide-prev');
  const enlargeNextBtn = document.getElementById('enlarge-slide-next');
  const enlargeThumbBtns = backdrop.querySelectorAll('[data-enlarge-slide-idx]');

  let isEnlargeOpen = false;
  let cleanupStage360 = () => {};
  let cleanupLightbox360 = () => {};

  const mountStage360 = () => {
    cleanupStage360();
    cleanupStage360 = attachBox360Physics(galleryStage);
  };

  const mountLightbox360 = () => {
    cleanupLightbox360();
    if (isEnlargeOpen && enlargeStage) {
      cleanupLightbox360 = attachBox360Physics(enlargeStage);
    }
  };

  const renderEnlargeLightboxSlide = () => {
    if (!enlargeStage) return;
    enlargeStage.innerHTML = renderSlideStage(activeSlideIdx, true);
    if (enlargeCounter) {
      enlargeCounter.textContent = `${activeSlideIdx + 1} / ${gallerySlides.length}`;
    }
    enlargeThumbBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeSlideIdx);
    });
    mountLightbox360();
  };

  const openEnlargeLightbox = () => {
    if (!enlargeLightbox) return;
    isEnlargeOpen = true;
    enlargeLightbox.classList.add('open');
    enlargeLightbox.setAttribute('aria-hidden', 'false');
    renderEnlargeLightboxSlide();
  };

  const closeEnlargeLightbox = () => {
    if (!enlargeLightbox) return;
    isEnlargeOpen = false;
    cleanupLightbox360();
    enlargeLightbox.classList.remove('open');
    enlargeLightbox.setAttribute('aria-hidden', 'true');
  };

  const setActiveSlide = (newIdx) => {
    activeSlideIdx = (newIdx + gallerySlides.length) % gallerySlides.length;
    if (galleryStage) {
      galleryStage.innerHTML = renderSlideStage(activeSlideIdx, false);
      mountStage360();
    }
    if (counterEl) {
      counterEl.innerHTML = `<span>${activeSlideIdx + 1} / ${gallerySlides.length}</span>`;
    }
    thumbBtns.forEach((btn, idx) => {
      const isAct = idx === activeSlideIdx;
      btn.classList.toggle('active', isAct);
      btn.setAttribute('aria-selected', String(isAct));
    });
    if (isEnlargeOpen) {
      renderEnlargeLightboxSlide();
    }
  };

  mountStage360();

  if (enlargeBtn) {
    enlargeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnlargeLightbox();
    });
  }

  // Clicking directly on a static photo inside the modal stage also opens the full-screen enlarge viewer
  if (galleryStage) {
    galleryStage.addEventListener('click', (e) => {
      // Do not open lightbox if interacting with the 360° drag zone or angle buttons
      if (e.target.closest('.box360-stage')) return;
      openEnlargeLightbox();
    });
  }

  if (enlargeCloseBtn) {
    enlargeCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeEnlargeLightbox();
    });
  }

  if (enlargePrevBtn) {
    enlargePrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveSlide(activeSlideIdx - 1);
    });
  }

  if (enlargeNextBtn) {
    enlargeNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveSlide(activeSlideIdx + 1);
    });
  }

  enlargeThumbBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.getAttribute('data-enlarge-slide-idx') || 0);
      setActiveSlide(idx);
    });
  });

  // Touch swipe support inside the Enlarge Lightbox stage
  if (enlargeStage) {
    let touchStartX = 0;
    let touchStartY = 0;
    enlargeStage.addEventListener('touchstart', (e) => {
      if (e.target.closest('.box360-stage')) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    enlargeStage.addEventListener('touchend', (e) => {
      if (e.target.closest('.box360-stage')) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        setActiveSlide(dx < 0 ? activeSlideIdx + 1 : activeSlideIdx - 1);
      }
    }, { passive: true });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveSlide(activeSlideIdx - 1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveSlide(activeSlideIdx + 1);
    });
  }

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.getAttribute('data-slide-idx') || 0);
      setActiveSlide(idx);
    });
  });

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
    cleanupStage360();
    cleanupLightbox360();
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
    modalContainer.innerHTML = '';
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      activeTriggerElement.focus();
    }
  };

  // Keyboard accessibility: Escape to dismiss (closes Enlarge Lightbox first if open!) & Arrow keys to cycle slides
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (isEnlargeOpen) {
        closeEnlargeLightbox();
      } else {
        closeModal();
      }
      return;
    }
    if (isEnlargeOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      setActiveSlide(e.key === 'ArrowRight' ? activeSlideIdx + 1 : activeSlideIdx - 1);
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
