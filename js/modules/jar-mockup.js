/**
 * Puck & Wick Interactive Candle Jar Mockup Engine
 * Renders vector candle vessel in Matte Obsidian or Deep Amber glass
 * with ultra-clean, minimalist retail-ready labels across all 4 logo concepts.
 */

import { MOCKUP_SCENT_SPECS } from '../data/logos.js';

function getLabelEmblemSvg(conceptId, isParchmentLabel) {
  const id = Number(conceptId) || 1;
  const strokeTone = isParchmentLabel ? '#8A6623' : 'url(#mockup-gold-foil)';
  const textTone = isParchmentLabel ? '#111318' : '#FAF5E8';

  if (id === 2) {
    // Concept 2: Minimalist Architectural Shield Outline
    return `
      <g transform="translate(170, 206)">
        <path d="M -16,-18 L 16,-18 L 16,2 C 16,14 4,23 0,26 C -4,23 -16,14 -16,2 Z" fill="none" stroke="${strokeTone}" stroke-width="1.4" stroke-linejoin="round" />
        <path d="M 0,-2 C -3,-6 -4,-11 -2,-15 C -1,-17 0,-19 0,-21 C 0,-19 1,-17 2,-15 C 4,-11 3,-6 0,-2 Z" fill="#D4AF37" />
        <text x="0" y="9" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="7.5" font-weight="600" letter-spacing="1.5" fill="${textTone}">XX</text>
      </g>
    `;
  }
  if (id === 3) {
    // Concept 3: Minimalist P | W Editorial Monogram Circle
    return `
      <g transform="translate(170, 206)">
        <circle cx="0" cy="2" r="20" fill="none" stroke="${strokeTone}" stroke-width="1.2" />
        <path d="M 0,-9 C -2,-12 -3,-15 -1.5,-18 C -0.5,-20 0,-21 0,-22 C 0,-21 0.5,-20 1.5,-18 C 3,-15 2,-12 0,-9 Z" fill="#D4AF37" />
        <text x="-8" y="8" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="600" fill="${textTone}">P</text>
        <line x1="0" y1="-6" x2="0" y2="12" stroke="${strokeTone}" stroke-width="0.9" opacity="0.8" />
        <text x="9" y="8" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="600" fill="${textTone}">W</text>
      </g>
    `;
  }
  if (id === 4) {
    // Concept 4: Minimalist Atelier Plaque Emblem
    return `
      <g transform="translate(170, 206)">
        <rect x="-24" y="-14" width="48" height="30" rx="2" fill="none" stroke="${strokeTone}" stroke-width="1.2" />
        <path d="M -11,-6 L 11,11 M 11,-6 L -11,11" stroke="${strokeTone}" stroke-width="1.4" stroke-linecap="round" />
        <path d="M 0,-2 C -2.5,-5 -3.5,-9 -1.5,-12 C -0.5,-14 0,-15 0,-16 C 0,-15 0.5,-14 1.5,-12 C 3.5,-9 2.5,-5 0,-2 Z" fill="#D4AF37" />
      </g>
    `;
  }
  // Concept 1 (default): Ultra-Clean Minimalist Crossed Lines & Flame
  return `
    <g transform="translate(170, 206)">
      <path d="M -16,-10 L 16,16" fill="none" stroke="${strokeTone}" stroke-width="1.5" stroke-linecap="round" />
      <path d="M 16,-10 L -16,16" fill="none" stroke="${strokeTone}" stroke-width="1.5" stroke-linecap="round" />
      <path d="M 0,-2 C -3.5,-6 -5,-12 -2.5,-17 C -1,-20 0,-23 0,-25 C 0,-23 1,-20 2.5,-17 C 5,-12 3.5,-6 0,-2 Z" fill="#D4AF37" />
    </g>
  `;
}

export function renderJarMockupSvg({ conceptId = 1, scentKey = 'top-shelf', vesselFinish = 'obsidian' } = {}) {
  const scent = MOCKUP_SCENT_CS(scentKey);
  const isAmber = vesselFinish === 'amber';
  const cid = Number(conceptId) || 1;

  const glassStart = isAmber ? '#5C2406' : '#20242E';
  const glassMid = isAmber ? '#7C340B' : '#12151C';
  const glassEnd = isAmber ? '#260E02' : '#08090C';

  const isParchmentLabel = cid === 3 || isAmber;
  const labelBg = isParchmentLabel ? '#F6F2E9' : '#0C0D10';
  const primaryTextFill = isParchmentLabel ? '#111318' : '#FAF5E8';
  const brandTitleFill = isParchmentLabel ? '#111318' : '#D4AF37';
  const secondaryTextFill = isParchmentLabel ? '#57534E' : '#9CA3AF';
  const hairlineFill = isParchmentLabel ? '#B69146' : 'url(#mockup-gold-foil)';

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 420"
      width="100%"
      height="100%"
      class="jar-mockup-svg"
      data-testid="jar-mockup"
      data-concept="${cid}"
      data-scent="${scent.id}"
      data-vessel="${vesselFinish}"
      role="img"
      aria-label="Interactive ${scent.displayTitle} Candle Jar Mockup in ${isAmber ? 'Deep Amber' : 'Matte Obsidian'} Glass with Concept ${cid} Label"
    >
      <defs>
        <linearGradient id="mockup-jar-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${glassStart}" />
          <stop offset="45%" stop-color="${glassMid}" />
          <stop offset="85%" stop-color="${glassEnd}" />
          <stop offset="100%" stop-color="#040507" />
        </linearGradient>
        <linearGradient id="mockup-gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9A7632" />
          <stop offset="50%" stop-color="#E5C878" />
          <stop offset="100%" stop-color="#8A6623" />
        </linearGradient>
        <radialGradient id="mockup-flame-rad" cx="50%" cy="68%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="28%" stop-color="#FEF08A" />
          <stop offset="65%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#78350F" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="mockup-wax-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FAF5E8" />
          <stop offset="100%" stop-color="#E5DEC9" />
        </linearGradient>
      </defs>

      <!-- Studio Pedestal Shadow -->
      <ellipse cx="170" cy="388" rx="104" ry="14" fill="#000000" opacity="0.6" />

      <!-- Ambient Candlelight Aura -->
      <circle cx="170" cy="80" r="48" fill="#F59E0B" opacity="0.16" />
      <circle cx="170" cy="80" r="26" fill="#FEF08A" opacity="0.2" />

      <!-- Burning Cotton Wick & Flame -->
      <path d="M 170,96 C 154,78 142,54 150,28 C 157,12 167,0 170,-6 C 173,0 183,12 190,28 C 198,54 186,78 170,96 Z" fill="url(#mockup-flame-rad)" transform="translate(0, 18)" />
      <path d="M 170,93 C 161,82 154,64 158,46 C 162,34 168,22 170,16 C 172,22 178,34 182,46 C 186,64 179,82 170,93 Z" fill="#FFFDF5" opacity="0.94" transform="translate(0, 18)" />
      <line x1="170" y1="110" x2="170" y2="132" stroke="#1C1917" stroke-width="3" stroke-linecap="round" />

      <!-- Soy Melt Pool Top Ellipse -->
      <ellipse cx="170" cy="132" rx="92" ry="18" fill="url(#mockup-wax-top)" stroke="url(#mockup-gold-foil)" stroke-width="1.2" />

      <!-- Heavy-Base Tumbler Vessel Body -->
      <path d="M 78,132 C 78,122 104,115 170,115 C 236,115 262,122 262,132 L 254,362 C 254,376 218,386 170,386 C 122,386 86,376 86,362 Z" fill="url(#mockup-jar-glass)" stroke="url(#mockup-gold-foil)" stroke-width="1.4" />

      <!-- Subtle Specular Glass Highlight -->
      <path d="M 94,148 L 99,350" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.07" />
      <ellipse cx="170" cy="132" rx="92" ry="16" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="1.5" opacity="0.7" />

      <!-- Ultra-Clean Minimalist Front Label Plate (Generous Negative Space, Thin Hairline Frame) -->
      <rect x="98" y="164" width="144" height="172" rx="2" fill="${labelBg}" />
      <rect x="104" y="170" width="132" height="160" rx="1" fill="none" stroke="${hairlineFill}" stroke-width="1" opacity="0.85" />

      <!-- Minimalist Concept Emblem Artwork -->
      ${getLabelEmblemSvg(cid, isParchmentLabel)}

      <!-- Clean Minimalist Brand Title -->
      <text x="170" y="254" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="14.5" font-weight="600" letter-spacing="3.5" fill="${brandTitleFill}">
        PUCK &amp; WICK
      </text>

      <!-- Subtle Short Divider -->
      <line x1="152" y1="266" x2="188" y2="266" stroke="${hairlineFill}" stroke-width="0.75" opacity="0.65" />

      <!-- Scent Name -->
      <text x="170" y="286" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13.5" font-weight="600" letter-spacing="2.5" fill="${primaryTextFill}">
        ${scent.name}
      </text>

      <!-- Minimalist 2-Line Spec Footer -->
      <text x="170" y="308" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.8" font-weight="500" letter-spacing="1.8" fill="${secondaryTextFill}">
        HAND-POURED | SOY WAX
      </text>
      <text x="170" y="319" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="500" letter-spacing="1.4" fill="${secondaryTextFill}">
        10 OZ | 283G
      </text>

      <!-- Heavy Glass Base Sham -->
      <ellipse cx="170" cy="364" rx="82" ry="11" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="0.9" opacity="0.35" />
    </svg>
  `;
}

function MOCKUP_SCENT_CS(scentKey) {
  if (scentKey === 'fresh-cut' || scentKey === 'candle-fresh-cut') {
    return MOCKUP_SCENT_SPECS['fresh-cut'];
  }
  return MOCKUP_SCENT_SPECS['top-shelf'];
}
