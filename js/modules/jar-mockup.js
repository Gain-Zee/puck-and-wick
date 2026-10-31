/**
 * Puck & Wick Interactive Candle Jar Mockup Engine
 * Renders vector candle vessel in Matte Obsidian or Deep Amber glass
 * with bespoke retail-ready labels across all 4 logo concepts for Top Shelf and Fresh Cut.
 */

import { MOCKUP_SCENT_SPECS } from '../data/logos.js';

function getLabelEmblemSvg(conceptId) {
  const id = Number(conceptId) || 1;
  if (id === 2) {
    // Concept 2: Heritage Shield Crest
    return `
      <g transform="translate(170, 212)">
        <path d="M -24,-22 L 24,-22 L 24,4 C 24,22 6,34 0,38 C -6,34 -24,22 -24,4 Z" fill="#111318" stroke="url(#mockup-gold-foil)" stroke-width="1.8" />
        <path d="M -19,-18 L 19,-18 L 19,2 C 19,17 4,27 0,31 C -4,27 -19,17 -19,2 Z" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="0.8" stroke-dasharray="2,2" />
        <path d="M 0,-6 C -4,-10 -6,-16 -3,-21 C -1,-24 0,-27 0,-29 C 0,-27 1,-24 3,-21 C 6,-16 4,-10 0,-6 Z" fill="#F59E0B" />
        <text x="0" y="6" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="8.5" font-weight="700" letter-spacing="1.5" fill="url(#mockup-gold-foil)">20 YRS</text>
        <text x="0" y="16" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" letter-spacing="1.5" fill="#FAF5E8">ON THE ICE</text>
        <ellipse cx="0" cy="24" rx="10" ry="3" fill="#1C1D22" stroke="url(#mockup-gold-foil)" stroke-width="1" />
      </g>
    `;
  }
  if (id === 3) {
    // Concept 3: Luxury Apothecary Stamp
    return `
      <g transform="translate(170, 212)">
        <circle cx="0" cy="4" r="26" fill="#101217" stroke="url(#mockup-gold-foil)" stroke-width="1.6" />
        <circle cx="0" cy="4" r="21" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="0.8" stroke-dasharray="2,2" />
        <text x="0" y="8" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="15" font-weight="700" letter-spacing="2" fill="url(#mockup-gold-foil)">P&amp;W</text>
        <text x="0" y="19" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" letter-spacing="1.2" fill="#FAF5E8">39.13°N • 77.71°W</text>
      </g>
    `;
  }
  if (id === 4) {
    // Concept 4: Stamped Leather & Foil Badge
    return `
      <g transform="translate(170, 212)">
        <rect x="-34" y="-18" width="68" height="44" rx="6" fill="#14151A" stroke="url(#mockup-gold-foil)" stroke-width="1.6" />
        <rect x="-30" y="-14" width="60" height="36" rx="4" fill="none" stroke="#C5A059" stroke-width="0.9" stroke-dasharray="3,2" />
        <circle cx="-25" cy="-9" r="2.2" fill="url(#mockup-gold-foil)" />
        <circle cx="25" cy="-9" r="2.2" fill="url(#mockup-gold-foil)" />
        <circle cx="-25" cy="17" r="2.2" fill="url(#mockup-gold-foil)" />
        <circle cx="25" cy="17" r="2.2" fill="url(#mockup-gold-foil)" />
        <path d="M -14,-6 L 12,12 M 14,-6 L -12,12" stroke="url(#mockup-gold-foil)" stroke-width="2" stroke-linecap="round" />
        <ellipse cx="0" cy="10" rx="9" ry="3" fill="#0A0A0C" stroke="url(#mockup-gold-foil)" stroke-width="1.2" />
        <path d="M 0,2 C -3,-2 -4,-7 -2,-11 C -1,-13 0,-15 0,-16 C 0,-15 1,-13 2,-11 C 4,-7 3,-2 0,2 Z" fill="#F59E0B" />
      </g>
    `;
  }
  // Concept 1 (default): Minimalist Crossed Sticks & Flame
  return `
    <g transform="translate(170, 212)">
      <path d="M -22,-14 L 18,20 L 25,18" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 22,-14 L -18,20 L -25,18" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      <ellipse cx="0" cy="16" rx="15" ry="4.5" fill="#14161C" stroke="url(#mockup-gold-foil)" stroke-width="1.5" />
      <path d="M 0,8 C -5,2 -8,-6 -4,-14 C -2,-19 0,-23 0,-26 C 0,-23 2,-19 4,-14 C 8,-6 5,2 0,8 Z" fill="#F59E0B" />
      <path d="M 0,6 C -3,2 -4,-4 -2,-9 C -1,-12 0,-15 0,-17 C 0,-15 1,-12 2,-9 C 4,-4 3,2 0,6 Z" fill="#FFFDF0" />
    </g>
  `;
}

export function renderJarMockupSvg({ conceptId = 1, scentKey = 'top-shelf', vesselFinish = 'obsidian' } = {}) {
  const scent = MOCKUP_SCENT_CS(scentKey);
  const isAmber = vesselFinish === 'amber';
  const cid = Number(conceptId) || 1;

  const glassStart = isAmber ? '#5C2406' : '#242936';
  const glassMid = isAmber ? '#853A0E' : '#13161F';
  const glassEnd = isAmber ? '#2B1002' : '#08090C';

  const isParchmentLabel = cid === 3;
  const labelBg = isParchmentLabel ? '#F5F0E6' : '#0B0C10';
  const primaryTextFill = isParchmentLabel ? '#0E1015' : '#FAF5E8';
  const secondaryTextFill = isParchmentLabel ? '#4B5563' : '#9CA3AF';
  const borderDash = cid === 4 ? '6,4' : '3,2';

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 420"
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
          <stop offset="0%" stop-color="#8A6623" />
          <stop offset="25%" stop-color="#C5A059" />
          <stop offset="50%" stop-color="#FDF6C7" />
          <stop offset="75%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#78571C" />
        </linearGradient>
        <radialGradient id="mockup-flame-rad" cx="50%" cy="68%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="25%" stop-color="#FEF08A" />
          <stop offset="60%" stop-color="#F59E0B" />
          <stop offset="90%" stop-color="#D97706" />
          <stop offset="100%" stop-color="#78350F" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="mockup-wax-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FAF5E8" />
          <stop offset="100%" stop-color="#E5DEC9" />
        </linearGradient>
      </defs>

      <!-- Studio Pedestal Shadow -->
      <ellipse cx="170" cy="388" rx="108" ry="16" fill="#000000" opacity="0.65" />
      <ellipse cx="170" cy="384" rx="94" ry="12" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="1" opacity="0.35" />

      <!-- Ambient Candlelight Aura -->
      <circle cx="170" cy="78" r="54" fill="#F59E0B" opacity="0.18" />
      <circle cx="170" cy="78" r="32" fill="#FEF08A" opacity="0.22" />

      <!-- Burning Cotton Wick & Flame -->
      <path d="M 170,96 C 152,78 138,52 148,26 C 156,10 167,-2 170,-8 C 173,-2 184,10 192,26 C 202,52 188,78 170,96 Z" fill="url(#mockup-flame-rad)" transform="translate(0, 18)" />
      <path d="M 170,93 C 160,82 152,64 157,46 C 161,34 168,22 170,16 C 172,22 179,34 183,46 C 188,64 180,82 170,93 Z" fill="#FFFDF5" opacity="0.92" transform="translate(0, 18)" />
      <line x1="170" y1="110" x2="170" y2="132" stroke="#1C1917" stroke-width="3.5" stroke-linecap="round" />

      <!-- Soy Melt Pool Top Ellipse -->
      <ellipse cx="170" cy="132" rx="94" ry="20" fill="url(#mockup-wax-top)" stroke="url(#mockup-gold-foil)" stroke-width="1.6" />

      <!-- Heavy-Base Tumbler Vessel Body -->
      <path d="M 76,132 C 76,122 104,114 170,114 C 236,114 264,122 264,132 L 254,362 C 254,376 218,386 170,386 C 122,386 86,376 86,362 Z" fill="url(#mockup-jar-glass)" stroke="url(#mockup-gold-foil)" stroke-width="2" />

      <!-- Specular Glass Highlight -->
      <path d="M 92,146 L 98,352" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.09" />
      <ellipse cx="170" cy="132" rx="94" ry="18" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="2.2" opacity="0.85" />

      <!-- Die-Cut Luxury Front Label Plate -->
      <rect x="98" y="164" width="144" height="178" rx="6" fill="${labelBg}" stroke="url(#mockup-gold-foil)" stroke-width="2" />
      <rect x="104" y="170" width="132" height="166" rx="4" fill="none" stroke="#C5A059" stroke-width="0.9" stroke-dasharray="${borderDash}" opacity="0.8" />

      <!-- Concept Emblem Artwork -->
      ${getLabelEmblemSvg(cid)}

      <!-- Brand Header on Label -->
      <text x="170" y="256" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="3.5" fill="#C5A059">
        PUCK &amp; WICK
      </text>
      <line x1="122" y1="263" x2="218" y2="263" stroke="url(#mockup-gold-foil)" stroke-width="0.9" opacity="0.75" />

      <!-- Scent Name & Edition -->
      <text x="170" y="284" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="18" font-weight="700" letter-spacing="2" fill="${primaryTextFill}">
        ${scent.name}
      </text>
      <text x="170" y="297" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7" font-weight="600" letter-spacing="1.8" fill="#C5A059">
        ${scent.edition.toUpperCase()}
      </text>

      <!-- Fragrance Notes Triplet -->
      <text x="170" y="311" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.2" font-weight="500" fill="${secondaryTextFill}">
        ${scent.tagline}
      </text>

      <!-- Bottom Spec Stamp -->
      <line x1="116" y1="319" x2="224" y2="319" stroke="#C5A059" stroke-width="0.6" opacity="0.5" />
      <text x="170" y="329" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="700" letter-spacing="1.2" fill="#D4AF37">
        10 OZ • 100% AMERICAN SOY • LOUDOUN CO. VA
      </text>

      <!-- Heavy Glass Base Sham -->
      <ellipse cx="170" cy="364" rx="84" ry="13" fill="none" stroke="url(#mockup-gold-foil)" stroke-width="1.2" opacity="0.45" />
    </svg>
  `;
}

function MOCKUP_SCENT_CS(scentKey) {
  if (scentKey === 'fresh-cut' || scentKey === 'candle-fresh-cut') {
    return MOCKUP_SCENT_SPECS['fresh-cut'];
  }
  return MOCKUP_SCENT_SPECS['top-shelf'];
}
