/**
 * Puck & Wick Interactive Brand & Label Concept Studio (Founder Review Mode)
 * Presents 4 bespoke SVG logo directions, interactive candle jar label previewer
 * (Top Shelf vs Fresh Cut, Matte Obsidian vs Deep Amber glass), live site header/footer
 * logo switcher, and single-flag production visibility toggle.
 */

import { LOGO_CONCEPTS, MOCKUP_SCENT_SPECS } from '../data/logos.js';
import { renderJarMockupSvg } from './jar-mockup.js';
import { getIcon } from '../utils/svg-assets.js';

export function initBrandStudio(store) {
  const root = document.getElementById('brand-studio-root');
  const studioSection = document.getElementById('studio');
  if (!root) return;

  let activeMockupScent = 'top-shelf';
  let activeVesselFinish = 'obsidian';
  let previewConceptId = Number(store.state.activeLogoConcept) || 1;
  let statusBannerMsg = '';

  const syncStudioVisibility = () => {
    const enabled =
      window.BRAND_STUDIO_CONFIG?.enabled !== false &&
      window.APP_CONFIG?.showBrandStudio !== false &&
      store.state.showBrandStudio !== false;

    if (studioSection) {
      studioSection.style.display = enabled ? '' : 'none';
    }
    const navItems = document.querySelectorAll('.nav-item-studio');
    navItems.forEach((el) => {
      el.style.display = enabled ? '' : 'none';
    });
  };

  const render = () => {
    syncStudioVisibility();

    const liveSiteLogoId = Number(store.state.activeLogoConcept) || 1;
    if (!previewConceptId || previewConceptId < 1 || previewConceptId > 4) {
      previewConceptId = liveSiteLogoId;
    }

    const activeConceptObj = LOGO_CONCEPTS.find((c) => c.id === previewConceptId) || LOGO_CONCEPTS[0];
    const scentSpec = MOCKUP_SCENT_SPECS[activeMockupScent] || MOCKUP_SCENT_SPECS['top-shelf'];

    root.innerHTML = `
      <div class="brand-studio-workspace">
        <!-- Studio Status Bar -->
        <div class="studio-toolbar">
          <div class="studio-toolbar-left">
            <span class="studio-mode-pill">
              ${getIcon('sparkle')}
              <span>Founder Identity Review Mode</span>
            </span>
            <span class="studio-active-indicator">
              Live Site Header Logo: <strong>Concept ${liveSiteLogoId} (${LOGO_CONCEPTS[liveSiteLogoId - 1]?.shortTitle})</strong>
            </span>
          </div>
          <div class="studio-toolbar-right">
            <span class="studio-config-hint">Config Flag: <code>BRAND_STUDIO_CONFIG.enabled = true</code></span>
          </div>
        </div>

        <!-- 4 Custom SVG Logo Concept Cards Grid -->
        <div class="logo-concepts-grid" role="region" aria-label="4 Custom SVG Logo Concepts">
          ${LOGO_CONCEPTS.map((concept) => {
            const isPreviewed = concept.id === previewConceptId;
            const isLiveOnSite = concept.id === liveSiteLogoId;
            return `
              <article
                class="logo-concept-card concept-card-${concept.id} ${isPreviewed ? 'selected' : ''} ${isLiveOnSite ? 'live-active' : ''}"
                data-testid="logo-concept-${concept.id}"
                data-concept-id="${concept.id}"
              >
                <div class="concept-card-top">
                  <span class="concept-number-badge">0${concept.id} • ${concept.archetype}</span>
                  ${isLiveOnSite ? `<span class="concept-live-pill">✓ Active on Site</span>` : `<span class="concept-preview-pill">Click to Preview</span>`}
                </div>

                <div class="concept-svg-stage" data-action="select-concept" data-concept-id="${concept.id}">
                  ${concept.getSvg()}
                </div>

                <div class="concept-card-info">
                  <h3 class="concept-card-title">${concept.name}</h3>
                  <p class="concept-card-desc">${concept.tagline}</p>

                  <div class="concept-specs-list">
                    <div class="concept-spec-row">
                      <span class="spec-key">Typography:</span>
                      <span class="spec-val">${concept.typography}</span>
                    </div>
                    <div class="concept-spec-row">
                      <span class="spec-key">Foil &amp; Finish:</span>
                      <span class="spec-val">${concept.finish}</span>
                    </div>
                    <div class="concept-spec-row">
                      <span class="spec-key">Best Application:</span>
                      <span class="spec-val">${concept.bestFor}</span>
                    </div>
                  </div>

                  <div class="concept-card-actions">
                    <button
                      type="button"
                      class="btn ${isLiveOnSite ? 'btn-gold' : 'btn-outline'} btn-sm apply-logo-btn"
                      data-testid="apply-logo-btn"
                      data-apply-concept="${concept.id}"
                    >
                      <span>${isLiveOnSite ? '✓ Applied to Website Header' : `Apply Concept ${concept.id} to Website Header`}</span>
                    </button>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>

        <!-- Interactive Candle Jar Label Mockup Previewer Stage -->
        <div class="jar-mockup-workbench">
          <!-- Left: Vector Jar Mockup Stage -->
          <div class="jar-mockup-stage">
            <div class="mockup-stage-badges">
              <span class="badge badge-gold">Retail Packaging Preview</span>
              <span class="mockup-replace-note">Replaces Legacy Word-Style Labels</span>
            </div>

            <div class="jar-svg-mount">
              ${renderJarMockupSvg({
                conceptId: previewConceptId,
                scentKey: activeMockupScent,
                vesselFinish: activeVesselFinish
              })}
            </div>

            <div class="mockup-stage-caption">
              Previewing <strong>${activeConceptObj.shortTitle}</strong> on <strong>${scentSpec.displayTitle}</strong> (${activeVesselFinish === 'amber' ? 'Deep Amber Apothecary Glass' : 'Matte Obsidian Heavy Tumbler'})
            </div>
          </div>

          <!-- Right: Interactive Label & Vessel Controls -->
          <div class="jar-mockup-controls">
            <div class="section-kicker">
              ${getIcon('flame')}
              <span>Interactive Label &amp; Vessel Studio</span>
            </div>
            <h3 class="mockup-controls-title">Live Candle Jar Label Previewer</h3>
            <p class="mockup-controls-lead">
              Test how <em>Top Shelf</em> and <em>Fresh Cut</em> look on heavy-base Matte Obsidian and Deep Amber vessels across all 4 logo identities—replacing the old Microsoft Word labels with cohesive, foil-stamped luxury packaging.
            </p>

            <!-- Control 1: Label Fragrance Layout Toggle -->
            <div class="studio-control-group">
              <label class="studio-control-label">1. Select Flagship Label Fragrance</label>
              <div class="studio-toggle-row" role="group" aria-label="Select candle label scent">
                <button
                  type="button"
                  class="studio-toggle-btn ${activeMockupScent === 'top-shelf' ? 'active' : ''}"
                  data-testid="mockup-scent-top-shelf"
                  data-scent="top-shelf"
                >
                  <span class="toggle-main">Top Shelf</span>
                  <span class="toggle-sub">No. 01 • Bourbon, Tobacco &amp; Amber</span>
                </button>
                <button
                  type="button"
                  class="studio-toggle-btn ${activeMockupScent === 'fresh-cut' ? 'active' : ''}"
                  data-testid="mockup-scent-fresh-cut"
                  data-scent="fresh-cut"
                >
                  <span class="toggle-main">Fresh Cut</span>
                  <span class="toggle-sub">No. 02 • Glacial Ozone &amp; Silver Fir</span>
                </button>
              </div>
            </div>

            <!-- Control 2: Glass Vessel Finish Toggle -->
            <div class="studio-control-group">
              <label class="studio-control-label">2. Select Glass Vessel Finish</label>
              <div class="studio-toggle-row" role="group" aria-label="Select candle vessel finish">
                <button
                  type="button"
                  class="studio-toggle-btn ${activeVesselFinish === 'obsidian' ? 'active' : ''}"
                  data-testid="mockup-vessel-obsidian"
                  data-vessel="obsidian"
                >
                  <span class="vessel-swatch swatch-obsidian"></span>
                  <div>
                    <span class="toggle-main">Matte Obsidian Glass</span>
                    <span class="toggle-sub">Signature Black &amp; Gold Foil</span>
                  </div>
                </button>
                <button
                  type="button"
                  class="studio-toggle-btn ${activeVesselFinish === 'amber' ? 'active' : ''}"
                  data-testid="mockup-vessel-amber"
                  data-vessel="amber"
                >
                  <span class="vessel-swatch swatch-amber"></span>
                  <div>
                    <span class="toggle-main">Deep Amber Apothecary</span>
                    <span class="toggle-sub">Warm Heritage Glow</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Control 3: Active Label Spec Readout -->
            <div class="studio-label-readout">
              <div class="readout-row">
                <span class="readout-key">Active Label Concept:</span>
                <strong class="readout-val">${activeConceptObj.name}</strong>
              </div>
              <div class="readout-row">
                <span class="readout-key">Fragrance Title &amp; Edition:</span>
                <strong class="readout-val">${scentSpec.displayTitle} (${scentSpec.edition})</strong>
              </div>
              <div class="readout-row">
                <span class="readout-key">Printed Olfactory Notes:</span>
                <span class="readout-val">${scentSpec.notesLine}</span>
              </div>
              <div class="readout-row">
                <span class="readout-key">Packaging Spec Stamp:</span>
                <span class="readout-val">${scentSpec.burnSpec}</span>
              </div>
            </div>

            <!-- Primary Live Site Switcher CTA -->
            <div class="studio-primary-cta-row">
              <button
                type="button"
                class="btn btn-gold btn-lg apply-logo-btn"
                id="btn-apply-active-concept"
                data-apply-concept="${previewConceptId}"
              >
                ${getIcon('check')}
                <span>Apply Concept ${previewConceptId} (${activeConceptObj.shortTitle}) to Live Website Header &amp; Footer</span>
              </button>
              ${statusBannerMsg ? `<div class="studio-status-feedback" role="status" aria-live="polite">${statusBannerMsg}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Event bindings
    const conceptCards = root.querySelectorAll('.logo-concept-card');
    conceptCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.apply-logo-btn')) return;
        const cid = parseInt(card.getAttribute('data-concept-id'), 10);
        if (cid >= 1 && cid <= 4) {
          previewConceptId = cid;
          statusBannerMsg = '';
          render();
        }
      });
    });

    const applyBtns = root.querySelectorAll('.apply-logo-btn');
    applyBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetConcept = parseInt(btn.getAttribute('data-apply-concept'), 10) || previewConceptId || 1;
        previewConceptId = targetConcept;
        store.dispatch('SET_LOGO_CONCEPT', targetConcept);
        const cObj = LOGO_CONCEPTS.find((c) => c.id === targetConcept) || LOGO_CONCEPTS[0];
        statusBannerMsg = `✓ Live site header, mobile drawer, and footer updated to ${cObj.name}!`;
        render();
      });
    });

    const topShelfBtn = root.querySelector('[data-testid="mockup-scent-top-shelf"]');
    const freshCutBtn = root.querySelector('[data-testid="mockup-scent-fresh-cut"]');
    const obsidianBtn = root.querySelector('[data-testid="mockup-vessel-obsidian"]');
    const amberBtn = root.querySelector('[data-testid="mockup-vessel-amber"]');

    if (topShelfBtn) {
      topShelfBtn.addEventListener('click', () => {
        activeMockupScent = 'top-shelf';
        render();
      });
    }
    if (freshCutBtn) {
      freshCutBtn.addEventListener('click', () => {
        activeMockupScent = 'fresh-cut';
        render();
      });
    }
    if (obsidianBtn) {
      obsidianBtn.addEventListener('click', () => {
        activeVesselFinish = 'obsidian';
        render();
      });
    }
    if (amberBtn) {
      amberBtn.addEventListener('click', () => {
        activeVesselFinish = 'amber';
        render();
      });
    }
  };

  store.subscribe((state, action) => {
    if (action === 'SET_LOGO_CONCEPT' || action === 'SET_ACTIVE_LOGO' || action === 'TOGGLE_STUDIO' || !action) {
      previewConceptId = Number(state.activeLogoConcept) || 1;
      render();
    }
  });

  render();
}
