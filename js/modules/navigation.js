/**
 * Puck & Wick Navigation Controller
 * Handles sticky navbar scroll state, mobile drawer toggle, active anchor tracking,
 * cart counter badge animations, and dynamic logo mark updates from the store.
 */

import { getLogoSvg } from '../utils/svg-assets.js';
import { CONCEPT_CANDLE_PHOTOS } from '../data/products.js';

export function initNavigation(store) {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const cartBadge = document.getElementById('cart-badge');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const studioNavItems = document.querySelectorAll('.nav-item-studio');

  // 1. Sticky Header Scroll Behavior
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Toggle
  if (toggleBtn && mobileNav) {
    const getMobileFocusables = () => {
      const navElements = Array.from(
        mobileNav.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        const parentHidden = el.closest('.hidden') || (el.parentElement && window.getComputedStyle(el.parentElement).display === 'none');
        return !parentHidden && r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
      });
      // The toggle button serves as the close button for mobile nav
      return [toggleBtn, ...navElements];
    };

    const toggleMobileMenu = (forceState) => {
      const isOpen = forceState !== undefined ? forceState : !mobileNav.classList.contains('open');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggleBtn.addEventListener('click', () => toggleMobileMenu());

    // Keyboard accessibility: Escape to dismiss & Tab focus trapping within mobile drawer
    const handleMobileNavKeyDown = (e) => {
      if (!mobileNav.classList.contains('open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        toggleMobileMenu(false);
        toggleBtn.focus();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getMobileFocusables();
        if (focusables.length === 0) return;

        const firstEl = focusables[0]; // toggleBtn (mobile nav close button)
        const lastEl = focusables[focusables.length - 1]; // Instagram button

        if (e.shiftKey) {
          if (document.activeElement === firstEl || (!mobileNav.contains(document.activeElement) && document.activeElement !== toggleBtn)) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl || (!mobileNav.contains(document.activeElement) && document.activeElement !== toggleBtn)) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleMobileNavKeyDown);

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('open')) return;
      if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close when clicking mobile nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          toggleMobileMenu(false);
        }
      });
    });
  }

  // 3. Active Link Highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // 4. Render Brand Logo Marks & Sync Hero Candle Photo
  const renderLogos = (conceptId) => {
    const svgCode = getLogoSvg(conceptId);
    const logoContainers = document.querySelectorAll('.brand-mark');
    logoContainers.forEach((container) => {
      container.innerHTML = svgCode;
    });

    const heroPhotoEl = document.querySelector('#hero [data-testid="hero-flame"] image');
    if (heroPhotoEl) {
      const targetHref = CONCEPT_CANDLE_PHOTOS[Number(conceptId) || 1] || 'assets/images/candle-obsidian.jpg';
      heroPhotoEl.setAttribute('href', targetHref);
    }
    const heroLabelOverlay = document.getElementById('hero-jar-label-overlay');
    if (heroLabelOverlay) {
      heroLabelOverlay.innerHTML = '';
    }
  };

  // 5. Update Cart Badge Count with Animation
  let prevCartCount = -1;
  const updateCartBadge = (count) => {
    const safeCount = Math.max(0, parseInt(count, 10) || 0);
    const badgeEl = document.getElementById('cart-badge');
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = safeCount;
    else if (badgeEl) badgeEl.textContent = safeCount;

    if (badgeEl) {
      badgeEl.setAttribute('aria-label', `${safeCount} items in cart`);
      if (prevCartCount !== -1 && prevCartCount !== safeCount) {
        badgeEl.classList.add('bounce');
        setTimeout(() => {
          badgeEl.classList.remove('bounce');
        }, 400);
      }
    }
    prevCartCount = safeCount;
  };

  // 6. Update Studio Nav Visibility based on config
  const updateStudioVisibility = (showBrandStudio) => {
    const isVisible =
      showBrandStudio !== false &&
      store?.state?.brandStudioVisible !== false &&
      window.BRAND_STUDIO_CONFIG?.enabled !== false &&
      window.APP_CONFIG?.showBrandStudio !== false;
    studioNavItems.forEach((item) => {
      if (isVisible) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });
  };

  // Initial render from store state
  if (store && store.state) {
    renderLogos(store.state.activeLogoConcept || 1);
    updateCartBadge(typeof store.getCartCount === 'function' ? store.getCartCount() : 0);
    updateStudioVisibility(store.state.showBrandStudio !== false && store.state.brandStudioVisible !== false);

    // Subscribe to store updates
    store.subscribe((state, action) => {
      if (action === 'SET_ACTIVE_LOGO' || action === 'SET_LOGO_CONCEPT' || !action) {
        renderLogos(state.activeLogoConcept || 1);
      }
      if (
        action === 'ADD_TO_CART' ||
        action === 'ADD_ITEM' ||
        action === 'REMOVE_FROM_CART' ||
        action === 'REMOVE_ITEM' ||
        action === 'UPDATE_CART_QUANTITY' ||
        action === 'UPDATE_QUANTITY' ||
        action === 'CLEAR_CART' ||
        !action
      ) {
        const count = typeof store.getCartCount === 'function' ? store.getCartCount() : 0;
        updateCartBadge(count);
      }
      if (action === 'TOGGLE_STUDIO' || action === 'TOGGLE_BRAND_STUDIO' || action === 'SET_STUDIO_VISIBLE') {
        updateStudioVisibility(state.showBrandStudio !== false && state.brandStudioVisible !== false);
      }
    });
  }
}
