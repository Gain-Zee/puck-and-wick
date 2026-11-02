/**
 * Puck & Wick Interactive Candle Jar Mockup Engine
 * Renders 3D perspective vector candle vessel in Matte Obsidian or Deep Amber glass
 * with realistic wax fill, melt pool, braided cotton wick, flame glow, metallic gold lid,
 * and authentic luxury packaging labels across all 4 logo concepts.
 */

import { MOCKUP_SCENT_SPECS } from '../data/logos.js';

function getLabelEmblemSvg(conceptId, isParchmentLabel) {
  const id = Number(conceptId) || 1;
  const strokeTone = isParchmentLabel ? '#8A6623' : 'url(#mockup-gold-foil)';
  const puckFill = isParchmentLabel ? '#F6F2E9' : '#0C0D10';

  if (id === 2) {
    // Concept 2: The Precision Reserve (Vertical Double-Frame + Crossed Sticks w/ Subtle Blade Toes & Flame)
    return `
      <g transform="translate(170, 202)">
        <rect x="-56" y="-28" width="112" height="50" rx="1.5" fill="none" stroke="${strokeTone}" stroke-width="0.9" opacity="0.7" />
        <path d="M -16,-11 L 16,12 L 21,10" fill="none" stroke="${strokeTone}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 16,-11 L -16,12 L -21,10" fill="none" stroke="${strokeTone}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-3 C -3,-8 -4,-13 -2,-18 C -0.8,-21 0,-23 0,-25 C 0,-23 0.8,-21 2,-18 C 4,-13 3,-8 0,-3 Z" fill="#D4AF37" />
      </g>
    `;
  }
  if (id === 3) {
    // Concept 3: The Atelier Lockup (Open Architectural Top & Bottom Double Hairlines + Crossed Sticks w/ Subtle Blade Toes)
    return `
      <g transform="translate(170, 202)">
        <line x1="-58" y1="-26" x2="58" y2="-26" stroke="${strokeTone}" stroke-width="1.3" />
        <line x1="-58" y1="-22.5" x2="58" y2="-22.5" stroke="${strokeTone}" stroke-width="0.6" opacity="0.6" />
        <path d="M -17,-11 L 17,12 L 22,10" fill="none" stroke="${strokeTone}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 17,-11 L -17,12 L -22,10" fill="none" stroke="${strokeTone}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-2 C -3,-7 -4,-12 -2,-17 C -0.8,-20 0,-22 0,-24 C 0,-22 0.8,-20 2,-17 C 4,-12 3,-7 0,-2 Z" fill="#D4AF37" />
        <line x1="-58" y1="20" x2="58" y2="20" stroke="${strokeTone}" stroke-width="0.6" opacity="0.6" />
      </g>
    `;
  }
  if (id === 4) {
    // Concept 4: The Workshop Emblem (Double-Hairline Rectangular Plaque + Crossed Sticks w/ Subtle Blade Toes & Flame)
    return `
      <g transform="translate(170, 202)">
        <rect x="-54" y="-23" width="108" height="44" rx="2" fill="none" stroke="${strokeTone}" stroke-width="1.3" />
        <rect x="-50" y="-19" width="100" height="36" rx="1" fill="none" stroke="${strokeTone}" stroke-width="0.6" opacity="0.55" />
        <path d="M -14,-9 L 14,11 L 18.5,9.2" fill="none" stroke="${strokeTone}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 14,-9 L -14,11 L -18.5,9.2" fill="none" stroke="${strokeTone}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-2 C -2.5,-6 -3.5,-10 -1.5,-14 C -0.5,-16 0,-18 0,-19.5 C 0,-18 0.5,-16 1.5,-14 C 3.5,-10 2.5,-6 0,-2 Z" fill="#D4AF37" />
      </g>
    `;
  }
  // Concept 1 (default): The Precision Mark (Square Hairline Crossed Sticks w/ Subtle Blade Toes & Flame)
  return `
    <g transform="translate(170, 202)">
      <path d="M -17,-14 L 17,15 L 22.5,12.8" fill="none" stroke="${strokeTone}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 17,-14 L -17,15 L -22.5,12.8" fill="none" stroke="${strokeTone}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 0,-4 C -3,-8 -4,-13 -2,-18 C -1,-20 0,-22 0,-24 C 0,-22 1,-20 2,-18 C 4,-13 3,-8 0,-4 Z" fill="#D4AF37" />
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

  const isParchmentLabel = isAmber;
  const labelBg = isParchmentLabel ? '#F6F2E9' : '#0C0D10';
  const primaryTextFill = isParchmentLabel ? '#111318' : '#FAF5E8';
  const brandTitleFill = isParchmentLabel ? '#111318' : '#D4AF37';
  const secondaryTextFill = isParchmentLabel ? '#57534E' : '#9CA3AF';
  const hairlineFill = isParchmentLabel ? '#B69146' : 'url(#mockup-gold-foil)';

  const notesPyramidText = scent.id === 'fresh-cut'
    ? 'TOP: GLACIAL OZONE • HEART: SILVER FIR • BASE: WHITE CEDAR'
    : 'TOP: BOURBON CASK • HEART: AGED TOBACCO • BASE: SMOKED AMBER';

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
      <title>Interactive ${scent.displayTitle} Candle Jar Mockup with Concept ${cid} Label</title>
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
        <linearGradient id="mockup-lid-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9A7632" />
          <stop offset="25%" stop-color="#E5C878" />
          <stop offset="50%" stop-color="#FFFDF5" />
          <stop offset="75%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#78551E" />
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

      <!-- Luxury Printed Front Label Plate -->
      <rect x="98" y="164" width="144" height="172" rx="2" fill="${labelBg}" />
      <rect x="104" y="170" width="132" height="160" rx="1" fill="none" stroke="${hairlineFill}" stroke-width="1" opacity="0.85" />

      <!-- Dynamic Logo Concept Emblem -->
      ${getLabelEmblemSvg(cid, isParchmentLabel)}

      <!-- Brand Wordmark -->
      <text x="170" y="244" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="14.5" font-weight="600" letter-spacing="3.5" fill="${brandTitleFill}">
        PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="5.5" font-weight="600" dy="-5.5" dx="0.5" letter-spacing="0">&#8482;</tspan>
      </text>

      <!-- Short Hairline Divider -->
      <line x1="152" y1="253" x2="188" y2="253" stroke="${hairlineFill}" stroke-width="0.75" opacity="0.65" />

      <!-- Scent Edition -->
      <text x="170" y="265" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="600" letter-spacing="1.4" fill="${secondaryTextFill}">
        ${scent.edition.toUpperCase()}
      </text>

      <!-- Scent Name -->
      <text x="170" y="280" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13.5" font-weight="600" letter-spacing="2.5" fill="${primaryTextFill}">
        ${scent.name}
      </text>

      <!-- 3-Tier Olfactory Notes Pyramid -->
      <text x="170" y="295" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="1.1" fill="${secondaryTextFill}">
        ${notesPyramidText}
      </text>

      <line x1="148" y1="303" x2="192" y2="303" stroke="${hairlineFill}" stroke-width="0.65" opacity="0.5" />

      <!-- Burn Specs -->
      <text x="170" y="313" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="500" letter-spacing="1.3" fill="${secondaryTextFill}">
        100% AMERICAN SOY WAX • 60 HR CLEAN BURN
      </text>

      <!-- Vessel Specs & Origin -->
      <text x="170" y="322" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.4" font-weight="500" letter-spacing="1.2" fill="${secondaryTextFill}">
        10 OZ (283G) • HAND-POURED IN VA
      </text>

      <!-- Metallic Gold Lid Resting on Pedestal Beside Jar -->
      <g id="jar-mockup-lid" transform="translate(252, 344) rotate(14)">
        <ellipse cx="0" cy="16" rx="40" ry="9" fill="#000000" opacity="0.45" />
        <path d="M -36,0 L -36,10 C -36,17 36,17 36,10 L 36,0 Z" fill="#78551E" stroke="url(#mockup-gold-foil)" stroke-width="0.8" />
        <path d="M -36,3 C -36,10 36,10 36,3 L 36,7 C 36,14 -36,14 -36,7 Z" fill="url(#mockup-lid-gold)" opacity="0.8" />
        <ellipse cx="0" cy="0" rx="36" ry="10" fill="url(#mockup-lid-gold)" stroke="#E5C878" stroke-width="1.2" />
        <ellipse cx="0" cy="0" rx="31" ry="8.5" fill="none" stroke="#9A7632" stroke-width="0.75" opacity="0.6" stroke-dasharray="3 2" />
        <circle cx="0" cy="0" r="2.8" fill="#D4AF37" opacity="0.7" />
      </g>

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

