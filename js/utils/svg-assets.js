/**
 * Puck & Wick SVG Vector Asset Engine
 * Self-contained mathematical vector SVG definitions for logos, UI icons, and procedural filters.
 * Zero external CDN or raster image dependencies.
 */

export const SVG_LOGOS = {
  // Concept 1: The Precision Mark (Square Hairline Frame - Crossed Sticks & Flame)
  1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" role="img" aria-label="Puck and Wick - Concept 1 The Precision Mark Logo">
  <title>Puck &amp; Wick The Precision Mark — Square Hairline Crossed Sticks and Flame Logo</title>
  <defs>
    <linearGradient id="c1-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c1-gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Outer Minimalist Square Gold Frame -->
  <rect x="65" y="65" width="370" height="370" fill="#0B0C0E" stroke="url(#c1-gold)" stroke-width="3.5" />
  <!-- Minimalist Crossed Lines + Flame in Top V -->
  <g id="c1-mark-symbol" transform="translate(250, 198)">
    <line x1="-38" y1="-34" x2="38" y2="38" stroke="url(#c1-gold)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="38" y1="-34" x2="-38" y2="38" stroke="url(#c1-gold)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 0,-12 C -7,-20 -10,-32 -4,-43 C -1,-48 0,-52 0,-55 C 0,-52 1,-48 4,-43 C 10,-32 7,-20 0,-12 Z" fill="url(#c1-gold)" />
    <path d="M 0,-16 C -3,-21 -4,-28 -1.5,-34 C 0,-37 0.5,-37 1.5,-34 C 4,-28 3,-21 0,-16 Z" fill="#0B0C0E" opacity="0.45" />
  </g>
  <!-- Clean Gold Serif Wordmark Centered Inside Frame -->
  <text x="250" y="296" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="38" font-weight="600" letter-spacing="5" fill="url(#c1-gold)">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13" font-weight="600" dy="-15" dx="2" letter-spacing="0">&#8482;</tspan></text>
</svg>`,

  // Concept 2: The Precision Reserve (Vertical Double-Frame with Crossed Sticks, Puck Base & Diamond Rule)
  2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" role="img" aria-label="Puck and Wick - Concept 2 The Precision Reserve Logo">
  <title>Puck &amp; Wick The Precision Reserve — Vertical Double-Frame Crossed Sticks and Puck Logo</title>
  <defs>
    <linearGradient id="c2-crest-shield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c2-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Tall Architectural Double-Hairline Frame -->
  <rect x="75" y="42" width="350" height="416" rx="3" fill="#0B0C0E" stroke="url(#c2-gold)" stroke-width="3" />
  <rect x="87" y="54" width="326" height="392" rx="2" fill="none" stroke="url(#c2-gold)" stroke-width="0.9" opacity="0.5" />
  <!-- Minimalist Crossed Lines + Flame + Vulcanized Puck Pill -->
  <g transform="translate(250, 152)">
    <line x1="-36" y1="-28" x2="36" y2="34" stroke="url(#c2-gold)" stroke-width="2.8" stroke-linecap="round" />
    <line x1="36" y1="-28" x2="-36" y2="34" stroke="url(#c2-gold)" stroke-width="2.8" stroke-linecap="round" />
    <path d="M 0,-10 C -7,-19 -10,-31 -5,-42 C -2,-49 0,-55 0,-59 C 0,-55 2,-49 5,-42 C 10,-31 7,-19 0,-10 Z" fill="url(#c2-gold)" />
  </g>
  <!-- Primary Wordmark -->
  <text x="250" y="264" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="36" font-weight="600" letter-spacing="8" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="12.5" font-weight="600" dy="-14" dx="1" letter-spacing="0" fill="url(#c2-gold)">&#8482;</tspan></text>
  <!-- Diamond Center Rule -->
  <line x1="135" y1="290" x2="236" y2="290" stroke="url(#c2-gold)" stroke-width="1" opacity="0.65" />
  <polygon points="250,285 255,290 250,295 245,290" fill="url(#c2-gold)" />
  <line x1="264" y1="290" x2="365" y2="290" stroke="url(#c2-gold)" stroke-width="1" opacity="0.65" />
  <!-- Reserve Subtitles -->
  <text x="250" y="328" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="4.2" fill="#E5C878">XX YRS • 20 YEARS ON THE ICE</text>
  <text x="250" y="356" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="500" letter-spacing="4" fill="#9CA3AF">SMALL BATCH SOY • LOUDOUN CO. VA</text>
  <text x="250" y="408" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="600" letter-spacing="3.5" fill="url(#c2-gold)">RESERVE EDITION</text>
</svg>`,

  // Concept 3: The Atelier Lockup (Open Architectural Top & Bottom Rules with Crossed Blades)
  3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" role="img" aria-label="Puck and Wick - Concept 3 The Atelier Lockup Logo">
  <title>Puck &amp; Wick The Atelier Lockup — Open Architectural Crossed Blades Logo</title>
  <defs>
    <linearGradient id="c3-apothecary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c3-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>
  <!-- Open Architectural Top & Bottom Double Hairlines (Frameless Sides) -->
  <rect x="40" y="64" width="420" height="372" fill="#0B0C0E" />
  <line x1="55" y1="78" x2="445" y2="78" stroke="url(#c3-gold)" stroke-width="2.5" />
  <line x1="55" y1="86" x2="445" y2="86" stroke="url(#c3-gold)" stroke-width="0.8" opacity="0.5" />
  <line x1="55" y1="414" x2="445" y2="414" stroke="url(#c3-gold)" stroke-width="0.8" opacity="0.5" />
  <line x1="55" y1="422" x2="445" y2="422" stroke="url(#c3-gold)" stroke-width="2.5" />
  <!-- Minimalist Crossed Lines + Flame Emblem -->
  <g transform="translate(250, 178)">
    <line x1="-38" y1="-30" x2="38" y2="36" stroke="url(#c3-gold)" stroke-width="2.8" stroke-linecap="round" />
    <line x1="38" y1="-30" x2="-38" y2="36" stroke="url(#c3-gold)" stroke-width="2.8" stroke-linecap="round" />
    <path d="M 0,-10 C -7,-19 -10,-32 -5,-43 C -2,-50 0,-56 0,-60 C 0,-56 2,-50 5,-43 C 10,-32 7,-19 0,-10 Z" fill="url(#c3-gold)" />
    <path d="M 0,-15 C -3,-21 -4,-28 -1.5,-34 C 0,-37 0.5,-37 1.5,-34 C 4,-28 3,-21 0,-15 Z" fill="#0B0C0E" opacity="0.45" />
  </g>
  <!-- Wide-Tracked Editorial Wordmark -->
  <text x="250" y="286" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="40" font-weight="600" letter-spacing="11" fill="url(#c3-gold)">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13.5" font-weight="600" dy="-16" dx="1" letter-spacing="0">&#8482;</tspan></text>
  <line x1="190" y1="312" x2="310" y2="312" stroke="url(#c3-gold)" stroke-width="1" opacity="0.6" />
  <text x="250" y="344" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="500" letter-spacing="5.5" fill="#FAF5E8">ARTISAN SOY CANDLE CO.</text>
  <text x="250" y="372" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="500" letter-spacing="3.5" fill="#9CA3AF">PURCELLVILLE, VA • 39.1368° N • 77.7144° W</text>
</svg>`,

  // Concept 4: The Workshop Emblem (Double-Hairline Rectangular Plaque)
  4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 380" width="100%" height="100%" role="img" aria-label="Puck and Wick - Concept 4 The Workshop Emblem Badge">
  <title>Puck &amp; Wick The Workshop Emblem Plaque Logo</title>
  <defs>
    <linearGradient id="c4-badge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c4-foil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
    <linearGradient id="c4-gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B69146" />
      <stop offset="50%" stop-color="#E5C878" />
      <stop offset="100%" stop-color="#9A7632" />
    </linearGradient>
  </defs>

  <!-- Crisp Double-Hairline Workshop Plaque -->
  <rect x="36" y="32" width="468" height="316" rx="4" fill="#0D0E12" stroke="url(#c4-badge)" stroke-width="2.5" />
  <rect x="46" y="42" width="448" height="296" rx="2" fill="none" stroke="url(#c4-foil)" stroke-width="0.75" opacity="0.45" />

  <!-- Minimalist Crossed Lines & Flame Centerpiece -->
  <g transform="translate(270, 116)">
    <line x1="-28" y1="-22" x2="28" y2="28" stroke="url(#c4-foil)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="28" y1="-22" x2="-28" y2="28" stroke="url(#c4-foil)" stroke-width="2.6" stroke-linecap="round" />
    <path d="M 0,-8 C -6,-15 -8,-25 -5,-34 C -3,-40 0,-45 0,-49 C 0,-45 3,-40 5,-34 C 8,-25 6,-15 0,-8 Z" fill="url(#c4-foil)" />
  </g>

  <!-- Stamped Workshop Typography -->
  <text x="270" y="218" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="38" font-weight="700" letter-spacing="11" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13" font-weight="600" dy="-15" dx="1" letter-spacing="0" fill="url(#c4-foil)">&#8482;</tspan></text>
  <line x1="170" y1="240" x2="370" y2="240" stroke="url(#c4-badge)" stroke-width="0.9" opacity="0.6" />
  <text x="270" y="270" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="5.5" fill="#C5A059">HAND-POURED IN VIRGINIA</text>
  <text x="270" y="296" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="400" letter-spacing="4" fill="#9CA3AF">100% AMERICAN SOY WAX</text>
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

  // Crossed Lines Emblem
  hockeySticks: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/><path d="M12 3c-1.2 1.8-1.8 3.2-.6 4.8.6.8 1.2.8 1.2 0 1.2-1.6.6-3-.6-4.8z" fill="currentColor" stroke="none"/>
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
 * Renders the active Concept (1, 2, 3, or 4) label directly onto the front of the
 * 400x400 studio candle jar photograph so every candle in the inventory reflects
 * the active Brand Studio concept at full scale.
 */
export function renderJarPhotoLabelOverlay(conceptId = 1, scentName = 'TOP SHELF', uid = 'jar') {
  const cid = Number(conceptId) || 1;
  const cleanScent = String(scentName || 'TOP SHELF').toUpperCase();
  const displayScent = cleanScent;
  const scentFontSize = cleanScent.length > 22 ? '4.8' : cleanScent.length > 16 ? '5.8' : '7.4';
  const scentSpacing = cleanScent.length > 22 ? '0.7' : cleanScent.length > 16 ? '1.0' : '1.4';
  const surfaceGradId = `jar-lbl-surf-${uid}-${cid}`;
  const goldGradId = `jar-lbl-gold-${uid}-${cid}`;

  let conceptArtwork = '';

  if (cid === 2) {
    // Concept 2: The Precision Reserve (Tall Vertical Double-Frame + Crossed Lines & Flame + Diamond Rule)
    conceptArtwork = `
      <rect x="142" y="162" width="112" height="124" rx="1.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <rect x="146" y="166" width="104" height="116" rx="1" fill="none" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.55" />
      <g transform="translate(198, 193)">
        <line x1="-11" y1="-9" x2="11" y2="11" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <line x1="11" y1="-9" x2="-11" y2="11" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <path d="M 0,-3 C -2.5,-6 -3.5,-10 -1.8,-14 C -0.6,-16 0,-18 0,-19.5 C 0,-18 0.6,-16 1.8,-14 C 3.5,-10 2.5,-6 0,-3 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="223" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="10.5" font-weight="600" letter-spacing="2" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0" fill="url(#${goldGradId})">&#8482;</tspan></text>
      <line x1="158" y1="231" x2="193" y2="231" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.7" />
      <polygon points="198,229 200,231 198,233 196,231" fill="url(#${goldGradId})" />
      <line x1="203" y1="231" x2="238" y2="231" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.7" />
      <text x="198" y="246" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${scentFontSize}" font-weight="600" letter-spacing="${scentSpacing}" fill="#E5C878">${displayScent}</text>
      <text x="198" y="260" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="1.4" fill="#9CA3AF">20 YEARS ON THE ICE</text>
      <text x="198" y="272" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="5.2" font-weight="600" letter-spacing="1.6" fill="url(#${goldGradId})">RESERVE EDITION</text>
    `;
  } else if (cid === 3) {
    // Concept 3: The Atelier Lockup (Open Architectural Top & Bottom Double Hairlines)
    conceptArtwork = `
      <line x1="138" y1="168" x2="258" y2="168" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <line x1="138" y1="171.5" x2="258" y2="171.5" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.55" />
      <line x1="138" y1="276.5" x2="258" y2="276.5" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.55" />
      <line x1="138" y1="280" x2="258" y2="280" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <g transform="translate(198, 198)">
        <line x1="-12" y1="-10" x2="12" y2="12" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <line x1="12" y1="-10" x2="-12" y2="12" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <path d="M 0,-3.5 C -2.5,-6.5 -3.5,-10.5 -1.8,-14.5 C -0.6,-16.5 0,-18.5 0,-20 C 0,-18.5 0.6,-16.5 1.8,-14.5 C 3.5,-10.5 2.5,-6.5 0,-3.5 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="228" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="11" font-weight="600" letter-spacing="2.6" fill="url(#${goldGradId})">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0">&#8482;</tspan></text>
      <line x1="176" y1="236" x2="220" y2="236" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.65" />
      <text x="198" y="250" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${scentFontSize}" font-weight="600" letter-spacing="${scentSpacing}" fill="#FAF5E8">${displayScent}</text>
      <text x="198" y="264" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="500" letter-spacing="1.5" fill="#9CA3AF">ARTISAN SOY CANDLE CO.</text>
    `;
  } else if (cid === 4) {
    // Concept 4: The Workshop Emblem (Double-Hairline Rectangular Plaque)
    conceptArtwork = `
      <rect x="136" y="172" width="124" height="104" rx="2" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <rect x="140" y="176" width="116" height="96" rx="1" fill="none" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.5" />
      <g transform="translate(198, 200)">
        <line x1="-11" y1="-9" x2="11" y2="11" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <line x1="11" y1="-9" x2="-11" y2="11" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" />
        <path d="M 0,-3 C -2.5,-6 -3.5,-10 -1.8,-14 C -0.6,-16 0,-18 0,-19.5 C 0,-18 0.6,-16 1.8,-14 C 3.5,-10 2.5,-6 0,-3 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="227" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="10.8" font-weight="700" letter-spacing="2.4" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0" fill="url(#${goldGradId})">&#8482;</tspan></text>
      <line x1="158" y1="235" x2="238" y2="235" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.65" />
      <text x="198" y="248" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${scentFontSize}" font-weight="600" letter-spacing="${scentSpacing}" fill="#E5C878">${displayScent}</text>
      <text x="198" y="261" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="1.4" fill="#C5A059">HAND-POURED IN VIRGINIA</text>
    `;
  } else {
    // Concept 1 (Default): The Precision Mark (Square Hairline Frame)
    conceptArtwork = `
      <rect x="140" y="166" width="116" height="116" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <g transform="translate(198, 204)">
        <line x1="-12" y1="-11" x2="12" y2="12" stroke="url(#${goldGradId})" stroke-width="0.95" stroke-linecap="round" />
        <line x1="12" y1="-11" x2="-12" y2="12" stroke="url(#${goldGradId})" stroke-width="0.95" stroke-linecap="round" />
        <path d="M 0,-3.5 C -2.2,-6.5 -3.2,-10.5 -1.4,-14 C -0.4,-15.8 0,-17 0,-18 C 0,-17 0.4,-15.8 1.4,-14 C 3.2,-10.5 2.2,-6.5 0,-3.5 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="235" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="12" font-weight="600" letter-spacing="1.5" fill="url(#${goldGradId})">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.5" font-weight="600" dy="-5" dx="0.5" letter-spacing="0">&#8482;</tspan></text>
      <text x="198" y="256" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${scentFontSize}" font-weight="600" letter-spacing="${scentSpacing}" fill="#FAF5E8">${displayScent}</text>
      <text x="198" y="270" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.5" font-weight="500" letter-spacing="1.4" fill="#9CA3AF">10 OZ • 100% SOY WAX</text>
    `;
  }

  return `
    <g class="jar-photo-dynamic-label" data-active-concept="${cid}">
      <defs>
        <linearGradient id="${surfaceGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22211F" />
          <stop offset="28%" stop-color="#19191B" />
          <stop offset="72%" stop-color="#111214" />
          <stop offset="100%" stop-color="#0B0C0E" />
        </linearGradient>
        <linearGradient id="${goldGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B69146" />
          <stop offset="50%" stop-color="#E5C878" />
          <stop offset="100%" stop-color="#9A7632" />
        </linearGradient>
      </defs>
      <!-- Seamless Matte Obsidian Label Patch Over Jar Front -->
      <rect x="133" y="159" width="130" height="130" rx="2" fill="url(#${surfaceGradId})" />
      ${conceptArtwork}
    </g>
  `;
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
