/**
 * Puck & Wick Product Detail Quick-View Modal Module
 * Provides accessible 3-tier scent pyramid preview, burn time specifications,
 * vessel specs, quantity controls, and add-to-cart integration.
 */

import { getProductById, getCandleVesselSvg, getProductGallerySlides, getInteractive360BoxHtml, attachBox360Physics } from '../data/products.js';
import { getIcon } from '../utils/svg-assets.js';
import { HARDWARE_WAITLIST_MODE, openWaitlistModal } from '../utils/waitlist.js';

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

  const getSlideSlug = (s) => String(s?.id || 'primary').replace(/_/g, '-').toLowerCase();
  const getSlideSeoUrl = (idx) => {
    const s = gallerySlides[idx] || gallerySlides[0];
    return `https://puckandwick.com/p/${product.id}/${getSlideSlug(s)}`;
  };
  const getSlideDisplayPath = (idx) => {
    const s = gallerySlides[idx] || gallerySlides[0];
    return `puckandwick.com/p/${product.id}/${getSlideSlug(s)}`;
  };
  const syncBrowserUrl = (idx) => {
    try {
      const s = gallerySlides[idx] || gallerySlides[0];
      const nextUrl = `${window.location.pathname}?item=${encodeURIComponent(product.id)}&photo=${encodeURIComponent(s.id)}`;
      window.history.replaceState({ item: product.id, photo: s.id }, '', nextUrl);
    } catch (_) {}
  };
  syncBrowserUrl(activeSlideIdx);

  const renderSlideStage = (idx, isLightbox = false) => {
    const slide = gallerySlides[idx] || gallerySlides[0];
    if (slide.type === 'svg') {
      return getCandleVesselSvg(product, activeLogoConcept, true);
    }
    if (slide.type === 'box360') {
      return getInteractive360BoxHtml(product, isLightbox ? 'lightbox' : 'modal');
    }
    if (slide.type === 'video') {
      return `
        <div class="modal-slide-photo-frame ${isLightbox ? 'lightbox-photo-frame' : ''}" style="background:#08090C;">
          <video src="${slide.src}" poster="${slide.poster || slide.thumb}" class="modal-slide-photo-img" style="width:100%;height:100%;object-fit:contain;background:#08090C;display:block;" autoplay loop muted playsinline controls></video>
          <div class="modal-slide-caption-bar" style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
            <span>${slide.title}</span>
            <a href="${slide.src}" download style="color:#D4AF37;font-weight:800;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;white-space:nowrap;border:1px solid rgba(212,175,55,0.55);padding:4px 10px;border-radius:999px;background:rgba(10,11,15,0.9);">Download MP4</a>
          </div>
        </div>
      `;
    }
    return `
      <div class="modal-slide-photo-frame ${isLightbox ? 'lightbox-photo-frame' : ''}">
        <img src="${slide.src}" alt="${slide.title}" class="modal-slide-photo-img" loading="eager" />
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

            <!-- Direct Shareable SEO Photo URL Bar -->
            <div class="modal-seo-share-bar" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;padding:8px 12px;background:rgba(15,17,23,0.92);border:1px solid rgba(197,160,89,0.35);border-radius:10px;">
              <div style="min-width:0;flex:1;">
                <span style="display:block;font-size:9.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C5A059;">Direct Share URL for This Photo</span>
                <a href="${getSlideSeoUrl(activeSlideIdx)}" id="modal-seo-url-link" target="_blank" rel="noopener" style="display:block;font-size:11.5px;color:#FAF5E8;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:monospace;">${getSlideDisplayPath(activeSlideIdx)}</a>
              </div>
              <button type="button" id="modal-share-photo-btn" data-testid="modal-share-photo-btn" style="flex-shrink:0;background:linear-gradient(135deg,#E5C878 0%,#B69146 100%);color:#08090C;border:none;border-radius:999px;padding:7px 14px;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">
                Copy Link
              </button>
            </div>
          </div>

          <!-- Right: Product Scent & Specs Details (Option A: Clean Minimalist Editorial) -->
          <div class="modal-details-column modal-option-a">
            <h2 id="modal-product-title" class="modal-title">${product.name}</h2>

            <div class="modal-price-row">
              <span class="modal-price" data-testid="modal-price">${product.inStockLocal ? 'In Stock Locally' : product.outOfStock ? 'Out of Stock' : 'Batch 01 • VIP Waitlist'}</span>
              <span class="modal-meta-dot" aria-hidden="true">&bull;</span>
              <span class="modal-burn-badge" data-testid="product-burn-time">${product.productType === 'odor_care' ? product.burnTime : `${product.burnTime} Burn`}</span>
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

            <!-- Clean 3-Line Scent Notes List -->
            <div class="modal-option-a-notes">
              <div class="a-note-line">
                <span class="a-note-label">Top</span>
                <span class="a-note-val" data-testid="scent-notes-top">${product.notes.top.join(', ')}</span>
              </div>
              <div class="a-note-line">
                <span class="a-note-label">Heart</span>
                <span class="a-note-val" data-testid="scent-notes-middle">${product.notes.middle.join(', ')}</span>
              </div>
              <div class="a-note-line">
                <span class="a-note-label">Base</span>
                <span class="a-note-val" data-testid="scent-notes-base">${product.notes.base.join(', ')}</span>
              </div>
            </div>

            <!-- Single-Line Craft & Vessel Summary -->
            <div class="modal-option-a-specs">
              <span class="vessel-specs" data-testid="product-vessel-specs">${product.vessel}</span>
              &bull; ${product.wax} &bull; ${product.wick}
            </div>

            <!-- Quantity & Add to Cart Controls -->
            <div class="modal-actions-row">
              <div class="modal-qty-stepper" aria-label="Select Quantity" style="${HARDWARE_WAITLIST_MODE ? 'display:none;' : ''}">
                <button type="button" class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">
                  ${getIcon('minus')}
                </button>
                <span class="qty-display" id="modal-qty-val">1</span>
                <button type="button" class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">
                  ${getIcon('plus')}
                </button>
              </div>

              <button type="button" class="btn btn-gold modal-add-to-cart-btn modal-add-to-cart" id="modal-add-btn" data-testid="modal-add-to-cart-btn">
                ${product.inStockLocal ? `
                  <span>${product.stockistCta || "Available Now in Blue Hydrangea &amp; Ketterman's"}</span>
                ` : product.outOfStock ? `
                  <span>Out of Stock &bull; Notify Me</span>
                ` : HARDWARE_WAITLIST_MODE ? `
                  ${getIcon('sparkle')}
                  <span>Join Batch 01 VIP Waitlist</span>
                ` : `
                  <span>Add to Cart &bull; <strong id="modal-add-total">${product.formattedPrice}</strong></span>
                  ${getIcon('cart')}
                `}
              </button>
            </div>
          </div>
        </div>

        <!-- Nested Distraction-Free Enlarge Full-Screen Lightbox Window (Window-Within-a-Window) -->
        <div class="modal-enlarge-lightbox" id="modal-enlarge-lightbox" data-testid="modal-enlarge-lightbox" aria-hidden="true">
          <div class="enlarge-lightbox-topbar">
            <div class="enlarge-lightbox-title-group">
              <span class="enlarge-lightbox-kicker">${product.name.toUpperCase()}</span>
              <span class="enlarge-lightbox-counter" id="enlarge-lightbox-counter" style="white-space:nowrap;">${activeSlideIdx + 1} / ${gallerySlides.length}</span>
            </div>
            <div class="enlarge-lightbox-actions">
              <div class="enlarge-zoom-controls" id="enlarge-zoom-controls" aria-label="Photo zoom controls">
                <button type="button" class="enlarge-zoom-btn" id="enlarge-zoom-out" aria-label="Zoom out photo" disabled>−</button>
                <button type="button" class="enlarge-zoom-readout" id="enlarge-zoom-reset" aria-label="Reset zoom to 1x">1×</button>
                <button type="button" class="enlarge-zoom-btn" id="enlarge-zoom-in" aria-label="Zoom in photo">+</button>
              </div>
              <button type="button" class="enlarge-lightbox-close" id="enlarge-lightbox-close" aria-label="Exit full-screen view" style="white-space:nowrap;">
                ${getIcon('close')}
                <span>Close</span>
              </button>
            </div>
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
  const enlargeZoomControls = document.getElementById('enlarge-zoom-controls');
  const enlargeZoomOutBtn = document.getElementById('enlarge-zoom-out');
  const enlargeZoomResetBtn = document.getElementById('enlarge-zoom-reset');
  const enlargeZoomInBtn = document.getElementById('enlarge-zoom-in');
  const seoUrlLinkEl = document.getElementById('modal-seo-url-link');
  const sharePhotoBtn = document.getElementById('modal-share-photo-btn');

  let isEnlargeOpen = false;
  let isEnlargeChromeHidden = false;
  let enlargeZoom = 1;
  const ENLARGE_ZOOM_MIN = 1;
  const ENLARGE_ZOOM_MAX = 3.5;
  const ENLARGE_ZOOM_STEP = 0.75;
  let cleanupStage360 = () => {};
  let cleanupLightbox360 = () => {};

  const applyEnlargeZoom = (nextZoom, anchorClientX, anchorClientY, instant = false) => {
    if (!enlargeStage) return;
    const frame = enlargeStage.querySelector('.lightbox-photo-frame');
    if (enlargeZoomControls) {
      enlargeZoomControls.style.display = frame ? 'inline-flex' : 'none';
    }
    if (!frame) {
      enlargeZoom = 1;
      enlargeStage.classList.remove('is-zoomed', 'is-pinching');
      return;
    }

    const prevZoom = enlargeZoom;
    const clamped = Math.max(ENLARGE_ZOOM_MIN, Math.min(ENLARGE_ZOOM_MAX, Number(nextZoom.toFixed(2))));
    enlargeZoom = clamped;

    let relX = 0.5;
    let relY = 0.5;
    const stageRect = enlargeStage.getBoundingClientRect();
    if (stageRect.width > 0 && stageRect.height > 0) {
      if (typeof anchorClientX === 'number' && typeof anchorClientY === 'number') {
        relX = (enlargeStage.scrollLeft + (anchorClientX - stageRect.left)) / Math.max(1, enlargeStage.scrollWidth);
        relY = (enlargeStage.scrollTop + (anchorClientY - stageRect.top)) / Math.max(1, enlargeStage.scrollHeight);
      } else if (prevZoom > 1) {
        relX = (enlargeStage.scrollLeft + enlargeStage.clientWidth / 2) / Math.max(1, enlargeStage.scrollWidth);
        relY = (enlargeStage.scrollTop + enlargeStage.clientHeight / 2) / Math.max(1, enlargeStage.scrollHeight);
      }
      relX = Math.max(0, Math.min(1, relX));
      relY = Math.max(0, Math.min(1, relY));
    }

    const stageW = enlargeStage.clientWidth;
    const stageH = enlargeStage.clientHeight;
    const img = frame.querySelector('.modal-slide-photo-img');
    const natW = (img && img.naturalWidth) || stageW || 1200;
    const natH = (img && img.naturalHeight) || stageH || 1200;
    const fitScale = (stageW > 0 && stageH > 0) ? Math.min(stageW / natW, stageH / natH) : 1;
    const baseW = Math.max(1, Math.round(natW * fitScale));
    const baseH = Math.max(1, Math.round(natH * fitScale));

    const isZoomed = enlargeZoom > 1;
    enlargeStage.classList.toggle('is-zoomed', isZoomed);
    if (isZoomed) {
      frame.style.width = `${Math.round(baseW * enlargeZoom)}px`;
      frame.style.height = `${Math.round(baseH * enlargeZoom)}px`;
    } else {
      frame.style.width = `${baseW}px`;
      frame.style.height = `${baseH}px`;
      enlargeStage.scrollLeft = 0;
      enlargeStage.scrollTop = 0;
    }

    if (enlargeZoomResetBtn) {
      enlargeZoomResetBtn.textContent = enlargeZoom === 1 ? '1×' : `${enlargeZoom.toFixed(2).replace(/\.?0+$/, '')}×`;
    }
    if (enlargeZoomOutBtn) enlargeZoomOutBtn.disabled = enlargeZoom <= ENLARGE_ZOOM_MIN;
    if (enlargeZoomInBtn) enlargeZoomInBtn.disabled = enlargeZoom >= ENLARGE_ZOOM_MAX;

    if (isZoomed) {
      const syncScroll = () => {
        const targetLeft = relX * enlargeStage.scrollWidth - enlargeStage.clientWidth / 2;
        const targetTop = relY * enlargeStage.scrollHeight - enlargeStage.clientHeight / 2;
        enlargeStage.scrollLeft = Math.max(0, targetLeft);
        enlargeStage.scrollTop = Math.max(0, targetTop);
      };
      if (instant) {
        syncScroll();
      } else {
        requestAnimationFrame(syncScroll);
      }
    }
  };

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
    const img = enlargeStage.querySelector('.modal-slide-photo-img');
    if (img && !img.complete) {
      img.addEventListener('load', () => applyEnlargeZoom(enlargeZoom), { once: true });
    }
    applyEnlargeZoom(1);
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
    isEnlargeChromeHidden = false;
    enlargeLightbox.classList.remove('is-chrome-hidden');
    enlargeLightbox.classList.add('open');
    enlargeLightbox.setAttribute('aria-hidden', 'false');
    renderEnlargeLightboxSlide();
  };

  const closeEnlargeLightbox = () => {
    if (!enlargeLightbox) return;
    isEnlargeOpen = false;
    isEnlargeChromeHidden = false;
    enlargeLightbox.classList.remove('is-chrome-hidden');
    applyEnlargeZoom(1);
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
    if (seoUrlLinkEl) {
      seoUrlLinkEl.href = getSlideSeoUrl(activeSlideIdx);
      seoUrlLinkEl.textContent = getSlideDisplayPath(activeSlideIdx);
    }
    syncBrowserUrl(activeSlideIdx);
    if (isEnlargeOpen) {
      renderEnlargeLightboxSlide();
    }
  };

  if (sharePhotoBtn) {
    sharePhotoBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const urlToShare = getSlideSeoUrl(activeSlideIdx);
      const slideObj = gallerySlides[activeSlideIdx] || gallerySlides[0];
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(urlToShare);
        }
        const origText = sharePhotoBtn.textContent;
        sharePhotoBtn.textContent = '✓ Link Copied!';
        setTimeout(() => {
          sharePhotoBtn.textContent = origText;
        }, 2200);
        if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '')) {
          await navigator.share({
            title: `${product.name} — ${slideObj.shortLabel} | Puck & Wick™`,
            text: `${product.name} (${product.formattedPrice}) — ${slideObj.title}`,
            url: urlToShare
          }).catch(() => {});
        }
      } catch (_) {}
    });
  }

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
      // Do not open lightbox if interacting with the 360° drag zone, angle buttons, video controls, or download link
      if (e.target.closest('.box360-stage') || e.target.closest('video') || e.target.closest('a')) return;
      openEnlargeLightbox();
    });
  }

  if (enlargeCloseBtn) {
    enlargeCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeEnlargeLightbox();
    });
  }

  if (enlargeZoomInBtn) {
    enlargeZoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyEnlargeZoom(enlargeZoom + ENLARGE_ZOOM_STEP);
    });
  }

  if (enlargeZoomOutBtn) {
    enlargeZoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyEnlargeZoom(enlargeZoom - ENLARGE_ZOOM_STEP);
    });
  }

  if (enlargeZoomResetBtn) {
    enlargeZoomResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyEnlargeZoom(enlargeZoom > 1 ? 1 : 2.25);
    });
  }

  if (enlargeStage) {
    let isMousePanning = false;
    let mouseMoved = false;
    let panStartX = 0;
    let panStartY = 0;
    let panScrollLeft = 0;
    let panScrollTop = 0;

    enlargeStage.addEventListener('mousedown', (e) => {
      mouseMoved = false;
      if (enlargeZoom <= 1 || !e.target.closest('.lightbox-photo-frame')) return;
      isMousePanning = true;
      panStartX = e.clientX;
      panStartY = e.clientY;
      panScrollLeft = enlargeStage.scrollLeft;
      panScrollTop = enlargeStage.scrollTop;
      enlargeStage.classList.add('is-panning');
      e.preventDefault();
    });

    (enlargeLightbox || enlargeStage).addEventListener('mousemove', (e) => {
      if (!isMousePanning) return;
      const dx = e.clientX - panStartX;
      const dy = e.clientY - panStartY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) mouseMoved = true;
      enlargeStage.scrollLeft = panScrollLeft - dx;
      enlargeStage.scrollTop = panScrollTop - dy;
    });

    (enlargeLightbox || enlargeStage).addEventListener('mouseup', () => {
      if (!isMousePanning) return;
      isMousePanning = false;
      enlargeStage.classList.remove('is-panning');
    });

    enlargeStage.addEventListener('click', (e) => {
      if (!e.target.closest('.lightbox-photo-frame')) return;
      if (mouseMoved) {
        mouseMoved = false;
        return;
      }
      e.stopPropagation();
      isEnlargeChromeHidden = !isEnlargeChromeHidden;
      if (enlargeLightbox) {
        enlargeLightbox.classList.toggle('is-chrome-hidden', isEnlargeChromeHidden);
      }
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

  // Two-finger pinch-to-zoom & swipe support inside the Enlarge Lightbox stage
  if (enlargeStage) {
    let touchStartX = 0;
    let touchStartY = 0;
    let isPinching = false;
    let wasPinching = false;
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    const getTouchDist = (t1, t2) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

    enlargeStage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2 && enlargeStage.querySelector('.lightbox-photo-frame')) {
        isPinching = true;
        wasPinching = true;
        pinchStartDist = Math.max(10, getTouchDist(e.touches[0], e.touches[1]));
        pinchStartZoom = enlargeZoom;
        enlargeStage.classList.add('is-pinching');
        return;
      }
      if (e.touches.length === 1) {
        wasPinching = false;
        if (enlargeZoom <= 1 && !e.target.closest('.box360-stage')) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }
    }, { passive: true });

    enlargeStage.addEventListener('touchmove', (e) => {
      if (!isPinching || e.touches.length !== 2) return;
      e.preventDefault();
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      applyEnlargeZoom(pinchStartZoom * (dist / pinchStartDist), null, null, true);
    }, { passive: false });

    enlargeStage.addEventListener('touchend', (e) => {
      if (isPinching && e.touches.length < 2) {
        isPinching = false;
        enlargeStage.classList.remove('is-pinching');
        if (enlargeZoom < 1.06) applyEnlargeZoom(1);
        return;
      }
      if (wasPinching || enlargeZoom > 1 || e.target.closest('.box360-stage') || !e.changedTouches.length) return;
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
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('item');
      url.searchParams.delete('photo');
      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
    } catch (_) {}
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

  // Add to cart or Join VIP Waitlist action
  addBtn.addEventListener('click', () => {
    if (product.inStockLocal) {
      closeModal();
      const stockistsEl = document.getElementById('stockists');
      if (stockistsEl) stockistsEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (HARDWARE_WAITLIST_MODE) {
      closeModal();
      openWaitlistModal(product.name, product.formattedPrice);
      return;
    }

    if (store && store.dispatch) {
      store.dispatch('ADD_TO_CART', {
        id: product.id,
        title: product.name,
        price: product.price,
        quantity,
        scent: product.name,
        vessel: product.vessel,
        photo: product.photo || (product.vesselType === 'ivory' ? 'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg?v=65' : 'assets/images/packaging/shelf-candle-top-shelf.jpg?v=65')
      });
    }

    closeModal();

    if (typeof openCartCallback === 'function') {
      openCartCallback();
    }
  });
}
