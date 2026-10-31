/**
 * Puck & Wick SVG Vector Asset Engine
 * Self-contained mathematical vector SVG definitions for logos, UI icons, and procedural filters.
 * Zero external CDN or raster image dependencies.
 */

export const SVG_LOGOS = {
  // Concept 1: Minimalist Crossed Sticks & Flame ("The Precision Mark")
  1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" aria-label="Puck and Wick - Minimalist Crossed Sticks and Flame Logo">
  <defs>
    <linearGradient id="c1-gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c1-flame-core" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#C5A059" />
      <stop offset="55%" stop-color="#F3D689" />
      <stop offset="100%" stop-color="#FFFDF7" />
    </linearGradient>
  </defs>
  <!-- Ultra-clean Minimalist Mark -->
  <g transform="translate(0, 12)">
    <!-- Minimalist Geometric Crossed Hockey Sticks -->
    <path d="M 155,115 L 335,315 C 346,327 362,332 384,328" fill="none" stroke="url(#c1-gold-metallic)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 345,115 L 165,315 C 154,327 138,332 116,328" fill="none" stroke="url(#c1-gold-metallic)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Minimalist Teardrop Flame Above Intersection -->
    <path d="M 250,185 C 236,170 230,148 236,126 C 240,111 247,98 250,88 C 253,98 260,111 264,126 C 270,148 264,170 250,185 Z" fill="url(#c1-flame-core)" />
    <!-- Clean Vulcanized Puck Pill Below Intersection -->
    <rect x="210" y="294" width="80" height="14" rx="7" fill="#0B0C0E" stroke="url(#c1-gold-metallic)" stroke-width="4" />
  </g>
  <!-- Clean Minimalist Typography -->
  <text x="250" y="408" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="32" font-weight="600" letter-spacing="10" fill="#FAF5E8">PUCK &amp; WICK</text>
  <line x1="205" y1="428" x2="295" y2="428" stroke="url(#c1-gold-metallic)" stroke-width="1" opacity="0.6" />
  <text x="250" y="450" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="500" letter-spacing="5" fill="#C5A059">LOUDOUN CO. • VIRGINIA</text>
</svg>`,

  // Concept 2: Minimalist Architectural Shield ("20 Years on the Ice")
  2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" aria-label="Puck and Wick - Minimalist Heritage Shield Logo">
  <defs>
    <linearGradient id="c2-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Clean Single-Line Architectural Crest -->
  <path d="M 165,80 L 335,80 L 335,210 C 335,288 268,334 250,346 C 232,334 165,288 165,210 Z" fill="#0D0E12" stroke="url(#c2-gold)" stroke-width="3.5" stroke-linejoin="round" />
  <path d="M 177,92 L 323,92 L 323,208 C 323,276 264,318 250,329 C 236,318 177,276 177,208 Z" fill="none" stroke="url(#c2-gold)" stroke-width="0.9" opacity="0.45" />
  <!-- Minimalist Flame + Crossed Line Inside Shield -->
  <path d="M 250,168 C 240,156 235,140 240,124 C 243,114 248,105 250,98 C 252,105 257,114 260,124 C 265,140 260,156 250,168 Z" fill="url(#c2-gold)" />
  <line x1="215" y1="196" x2="285" y2="196" stroke="url(#c2-gold)" stroke-width="1" opacity="0.5" />
  <text x="250" y="232" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="24" font-weight="600" letter-spacing="6" fill="#FAF5E8">XX YRS</text>
  <text x="250" y="254" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" letter-spacing="4" fill="#C5A059">ON THE ICE</text>
  <rect x="224" y="276" width="52" height="10" rx="5" fill="none" stroke="url(#c2-gold)" stroke-width="2" />
  <!-- Wordmark Below -->
  <text x="250" y="408" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="32" font-weight="600" letter-spacing="10" fill="#FAF5E8">PUCK &amp; WICK</text>
  <text x="250" y="442" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="500" letter-spacing="5" fill="#C5A059">SMALL BATCH SOY • EST. 2024</text>
</svg>`,

  // Concept 3: Modern Luxury Apothecary Seal ("The Botanical Monogram")
  3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" aria-label="Puck and Wick - Modern Luxury Apothecary Stamp">
  <defs>
    <linearGradient id="c3-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Ultra-Clean Concentric Minimalist Ring -->
  <circle cx="250" cy="215" r="135" fill="#0D0E12" stroke="url(#c3-gold)" stroke-width="2.5" />
  <circle cx="250" cy="215" r="124" fill="none" stroke="url(#c3-gold)" stroke-width="0.75" opacity="0.45" />
  <!-- Minimalist Flame Above Divider -->
  <path d="M 250,148 C 243,139 240,127 243,115 C 245,108 248,101 250,96 C 252,101 255,108 257,115 C 260,127 257,139 250,148 Z" fill="url(#c3-gold)" />
  <!-- Crisp Editorial P | W Monogram with Generous Breathing Room -->
  <text x="202" y="238" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="68" font-weight="600" fill="#FAF5E8">P</text>
  <line x1="250" y1="168" x2="250" y2="262" stroke="url(#c3-gold)" stroke-width="1.5" opacity="0.75" />
  <text x="302" y="238" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="68" font-weight="600" fill="#FAF5E8">W</text>
  <text x="250" y="298" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="500" letter-spacing="3.5" fill="#C5A059">39.1368° N • 77.7144° W</text>
  <!-- Wordmark Below -->
  <text x="250" y="408" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="32" font-weight="600" letter-spacing="10" fill="#FAF5E8">PUCK &amp; WICK</text>
  <text x="250" y="442" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="500" letter-spacing="5" fill="#C5A059">PURCELLVILLE • VIRGINIA</text>
</svg>`,

  // Concept 4: Minimalist Architectural Label Plaque ("The Atelier Plaque")
  4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 380" width="100%" height="100%" aria-label="Puck and Wick - Minimalist Architectural Plaque Logo">
  <defs>
    <linearGradient id="c4-gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Crisp Hairline Architectural Plaque (No rivets, no messy dashed stitching) -->
  <rect x="36" y="32" width="468" height="316" rx="4" fill="#0D0E12" stroke="url(#c4-gold-foil)" stroke-width="2.5" />
  <rect x="46" y="42" width="448" height="296" rx="2" fill="none" stroke="url(#c4-gold-foil)" stroke-width="0.75" opacity="0.4" />
  <!-- Minimalist Crossed Stick & Flame Emblem -->
  <g transform="translate(270, 118)">
    <path d="M -28,-22 L 26,26 C 30,29 36,30 42,28" fill="none" stroke="url(#c4-gold-foil)" stroke-width="2.8" stroke-linecap="round" />
    <path d="M 28,-22 L -26,26 C -30,29 -36,30 -42,28" fill="none" stroke="url(#c4-gold-foil)" stroke-width="2.8" stroke-linecap="round" />
    <path d="M 0,-8 C -6,-15 -8,-25 -5,-34 C -3,-40 0,-45 0,-49 C 0,-45 3,-40 5,-34 C 8,-25 6,-15 0,-8 Z" fill="url(#c4-gold-foil)" />
    <rect x="-18" y="22" width="36" height="6" rx="3" fill="#0D0E12" stroke="url(#c4-gold-foil)" stroke-width="2" />
  </g>
  <!-- Clean Minimalist Typography -->
  <text x="270" y="218" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="38" font-weight="600" letter-spacing="11" fill="#FAF5E8">PUCK &amp; WICK</text>
  <line x1="170" y1="242" x2="370" y2="242" stroke="url(#c4-gold-foil)" stroke-width="0.9" opacity="0.55" />
  <text x="270" y="272" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="500" letter-spacing="5.5" fill="#C5A059">HAND-POURED IN VIRGINIA</text>
  <text x="270" y="298" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="400" letter-spacing="4" fill="#9CA3AF">100% AMERICAN SOY WAX</text>
</svg>`
};

export const SVG_ICONS = {
  // Shopping cart / bag
  cart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`,

  // Hamburger menu
  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>`,

  // Close X
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>`,

  // Arrow Right
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>`,

  // Candle Flame
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c-.5 2.5-3 5-3 8 0 3.3 2.7 6 6 6s6-2.7 6-6c0-2.5-1.5-4.5-2.5-6-.5 1.5-1.5 2.5-2.5 3-1-3-3-4-4-5Z"/>
  </svg>`,

  // Checkmark
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,

  // QC 1: Soy Leaf / Bean
  soyLeaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>`,

  // QC 2: Clean Fragrance Droplet / Flask
  cleanDroplet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 11v4"/><path d="M10 13h4"/>
  </svg>`,

  // QC 3: Precision Cotton Wick & Flame
  cottonWick: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3c-1.5 2-3 3.5-3 5.5a3 3 0 0 0 6 0C15 6.5 13.5 5 12 3z"/><path d="M12 11.5V21"/><path d="M9 15h6"/><path d="M8 18h8"/><path d="M9.5 21h5"/>
  </svg>`,

  // QC 4: Loudoun County Virginia Hand Pour / Crucible
  virginiaPour: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M19 11V4H5v7a7 7 0 0 0 14 0Z"/><path d="M19 7h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-3"/><path d="M2 4h20"/><path d="M12 18v3"/><path d="M8 21h8"/>
  </svg>`,

  // Map Pin
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>`,

  // Clock
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>`,

  // Phone
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>`,

  // Mail
  mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>`,

  // Instagram
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>`,

  // Shield
  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,

  // Crossed Hockey Sticks
  hockeySticks: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 3l12 14c1 1.2 2.5 1.5 4 .5l.5-.3c.4-.3.2-.8-.2-.9-1.2-.2-2.5-.2-3.3-1.3L5 3z"/><path d="M20 3L8 17c-1 1.2-2.5 1.5-4 .5l-.5-.3c-.4-.3-.2-.8.2-.9 1.2-.2 2.5-.2 3.3-1.3L19 3z"/>
  </svg>`,

  // Star
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`,

  // Sparkle / Glint
  sparkle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>`,

  // Snowflake / Zamboni Ice
  snowflake: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>
  </svg>`,

  // Truck / Delivery
  truck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
  </svg>`,

  // Package / Box
  box: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
  </svg>`,

  // Search
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>`,

  // Heart
  heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>`
};

/**
 * Returns raw SVG string for a given logo concept ID (1, 2, 3, or 4).
 * Defaults to Concept 1 if invalid.
 */
export function getLogoSvg(conceptId = 1) {
  const id = Number(conceptId) || 1;
  return SVG_LOGOS[id] || SVG_LOGOS[1];
}

/**
 * Returns raw SVG icon string by name.
 */
export function getIcon(iconName, customClass = '') {
  const raw = SVG_ICONS[iconName] || SVG_ICONS.flame;
  if (!customClass) return raw;
  return raw.replace('<svg ', `<svg class="${customClass}" `);
}

/**
 * Microporous Activated Coconut Charcoal Adsorption Diagram SVG.
 */
export function getCharcoalScienceSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="100%" height="180" class="science-diagram-svg" role="img" aria-label="Microporous Activated Coconut Charcoal Adsorption Diagram">
      <title>Microporous Activated Coconut Charcoal Physical Adsorption Matrix</title>
      <defs>
        <linearGradient id="charcoal-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0B0E" />
          <stop offset="100%" stop-color="#14161F" />
        </linearGradient>
        <radialGradient id="vdw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(197, 160, 89, 0.35)" />
          <stop offset="100%" stop-color="rgba(197, 160, 89, 0)" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="316" height="176" rx="8" fill="url(#charcoal-bg)" stroke="#C5A059" stroke-width="1.2" opacity="0.95" />
      <g stroke="#C5A059" stroke-width="1.3" fill="#181B24" opacity="0.9">
        <polygon points="50,40 70,28 90,40 90,64 70,76 50,64" />
        <polygon points="90,40 110,28 130,40 130,64 110,76 90,64" />
        <polygon points="130,40 150,28 170,40 170,64 150,76 130,64" />
        <polygon points="170,40 190,28 210,40 210,64 190,76 170,64" />
        <polygon points="70,76 90,64 110,76 110,100 90,112 70,100" />
        <polygon points="110,76 130,64 150,76 150,100 130,112 110,100" />
        <polygon points="150,76 170,64 190,76 190,100 170,112 150,100" />
      </g>
      <circle cx="110" cy="52" r="14" fill="url(#vdw-glow)" />
      <circle cx="150" cy="52" r="14" fill="url(#vdw-glow)" />
      <circle cx="130" cy="88" r="14" fill="url(#vdw-glow)" />
      <circle cx="70" cy="52" r="7" fill="#EF4444" opacity="0.9" />
      <text x="70" y="55" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="700" fill="#FFFFFF">R-SH</text>
      <text x="70" y="69" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#FCA5A5">Thiols</text>
      <circle cx="110" cy="52" r="8" fill="#F59E0B" opacity="0.9" />
      <text x="110" y="55" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="700" fill="#0A0A0C">C₅H₁₀O₂</text>
      <text x="110" y="69" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#FDE68A">Isovaleric</text>
      <circle cx="150" cy="52" r="7.5" fill="#3B82F6" opacity="0.9" />
      <text x="150" y="55" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="700" fill="#FFFFFF">R-NH₂</text>
      <text x="150" y="69" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#93C5FD">Amines</text>
      <circle cx="130" cy="88" r="7" fill="#10B981" opacity="0.9" />
      <text x="130" y="91" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" font-weight="700" fill="#FFFFFF">H₂O</text>
      <text x="130" y="105" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#6EE7B7">Moisture</text>
      <line x1="225" y1="35" x2="225" y2="105" stroke="#D4AF37" stroke-width="0.75" stroke-dasharray="3,2" />
      <text x="232" y="55" font-family="'Inter', sans-serif" font-size="6.5" font-weight="600" fill="#D4AF37">PORE SIZE &lt;2nm</text>
      <text x="232" y="66" font-family="'Inter', sans-serif" font-size="5.5" fill="#9EA3AE">Microporous Lattice</text>
      <text x="232" y="82" font-family="'Inter', sans-serif" font-size="6.5" font-weight="600" fill="#D4AF37">VAN DER WAALS</text>
      <text x="232" y="93" font-family="'Inter', sans-serif" font-size="5.5" fill="#9EA3AE">Dispersion Physisorption</text>
      <rect x="20" y="145" width="280" height="20" rx="4" fill="rgba(197, 160, 89, 0.12)" stroke="rgba(197, 160, 89, 0.3)" />
      <text x="160" y="158" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="700" letter-spacing="1.2" fill="#D4AF37">&gt;1,000 m²/g SURFACE AREA • IRREVERSIBLE PHYSISORPTION</text>
    </svg>
  `;
}

/**
 * Metazene® Covalent Neutralization and Olfactory Receptor Lockout Diagram SVG.
 */
export function getMetazeneScienceSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="100%" height="180" class="science-diagram-svg" role="img" aria-label="Metazene Covalent Molecular Neutralization and Olfactory Receptor Lockout Diagram">
      <title>Metazene Chemical Counteraction, Covalent Bonding and Receptor Inactivation</title>
      <defs>
        <linearGradient id="metazene-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0B0E" />
          <stop offset="100%" stop-color="#14161F" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="316" height="176" rx="8" fill="url(#metazene-bg)" stroke="#C5A059" stroke-width="1.2" opacity="0.95" />
      <circle cx="55" cy="65" r="22" fill="#1C1820" stroke="#EF4444" stroke-width="1.6" />
      <text x="55" y="60" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="700" fill="#EF4444">MALODOR</text>
      <text x="55" y="71" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" fill="#FCA5A5">R-SH / R-NH₂</text>
      <text x="55" y="80" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#9EA3AE">Active Poles δ⁻/δ⁺</text>
      <text x="88" y="69" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#D4AF37">+</text>
      <circle cx="125" cy="65" r="22" fill="#1A1C16" stroke="#D4AF37" stroke-width="1.6" />
      <text x="125" y="60" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7" font-weight="700" fill="#FAF5E8">METAZENE®</text>
      <text x="125" y="70" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.5" fill="#C5A059">Active Ester Complex</text>
      <path d="M 154,65 L 176,65 M 172,60 L 177,65 L 172,70" stroke="#34D399" stroke-width="2" fill="none" stroke-linecap="round" />
      <text x="165" y="55" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="600" fill="#34D399">Covalent Reaction</text>
      <ellipse cx="215" cy="65" rx="28" ry="22" fill="#121820" stroke="#34D399" stroke-width="1.8" />
      <text x="215" y="58" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.5" font-weight="700" fill="#34D399">NEUTRAL ADDUCT</text>
      <text x="215" y="68" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.2" fill="#93C5FD">Electron Cloud Shifted</text>
      <text x="215" y="78" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" fill="#9EA3AE">Mass ↑ • Vapor Press. ↓</text>
      <g transform="translate(260, 42)">
        <path d="M 5,5 C 5,25 35,25 35,5" fill="none" stroke="#F87171" stroke-width="1.5" />
        <text x="20" y="36" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="700" fill="#F87171">OLFACTORY GPCR</text>
        <circle cx="20" cy="14" r="8" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" stroke-width="1.2" />
        <line x1="15" y1="9" x2="25" y2="19" stroke="#EF4444" stroke-width="1.5" />
        <line x1="25" y1="9" x2="15" y2="19" stroke="#EF4444" stroke-width="1.5" />
        <text x="20" y="44" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.5" fill="#EF4444">Binding Blocked</text>
      </g>
      <rect x="20" y="145" width="280" height="20" rx="4" fill="rgba(52, 211, 153, 0.12)" stroke="rgba(52, 211, 153, 0.3)" />
      <text x="160" y="158" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="700" letter-spacing="1.2" fill="#34D399">MOLECULAR ELECTRON ALTERATION • ZERO RECEPTOR BINDING</text>
    </svg>
  `;
}
