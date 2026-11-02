/**
 * Puck & Wick SVG Vector Asset Engine
 * Self-contained mathematical vector SVG definitions for logos, UI icons, and procedural filters.
 * Zero external CDN or raster image dependencies.
 */

export const SVG_LOGOS = {
  // Concept 1: The Precision Mark (Square Hairline Frame - Crossed Sticks w/ Subtle Blade Toes & Flame + LOUDOUN COUNTY, VA + USA)
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
  <!-- Outer Minimalist Square Gold Frame + Inner Hairline -->
  <rect x="46" y="46" width="408" height="408" fill="#0B0C0E" stroke="url(#c1-gold)" stroke-width="3.8" />
  <rect x="58" y="58" width="384" height="384" fill="none" stroke="url(#c1-gold)" stroke-width="1.2" opacity="0.35" />
  <!-- Crossed Hockey Sticks with Subtle Blade Toes + Flame in Top V -->
  <g id="c1-mark-symbol" transform="translate(250, 182)">
    <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#c1-gold)" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#c1-gold)" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#c1-gold)" />
    <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#0B0C0E" opacity="0.48" />
  </g>
  <!-- Clean Gold Serif Wordmark & Origin Centered Inside Frame -->
  <text x="250" y="294" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="40" font-weight="700" letter-spacing="5.5" fill="url(#c1-gold)">PUCK &amp; WICK</text>
  <text x="250" y="338" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.5" font-weight="600" letter-spacing="4.2" fill="url(#c1-gold)">LOUDOUN COUNTY, VA</text>
  <text x="250" y="362" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="5.5" fill="url(#c1-gold)" opacity="0.88">USA</text>
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
  <!-- Minimalist Crossed Sticks w/ Subtle Blade Toes + Flame -->
  <g transform="translate(250, 152)">
    <path d="M -36,-28 L 36,34 L 47,29.5" fill="none" stroke="url(#c2-gold)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 36,-28 L -36,34 L -47,29.5" fill="none" stroke="url(#c2-gold)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,-10 C -7,-19 -10,-31 -5,-42 C -2,-49 0,-55 0,-59 C 0,-55 2,-49 5,-42 C 10,-31 7,-19 0,-10 Z" fill="url(#c2-gold)" />
  </g>
  <!-- Primary Wordmark -->
  <text x="250" y="264" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="36" font-weight="600" letter-spacing="8" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="12.5" font-weight="600" dy="-14" dx="1" letter-spacing="0" fill="url(#c2-gold)">&#8482;</tspan></text>
  <!-- Diamond Center Rule -->
  <line x1="135" y1="290" x2="236" y2="290" stroke="url(#c2-gold)" stroke-width="1" opacity="0.65" />
  <polygon points="250,285 255,290 250,295 245,290" fill="url(#c2-gold)" />
  <line x1="264" y1="290" x2="365" y2="290" stroke="url(#c2-gold)" stroke-width="1" opacity="0.65" />
  <!-- Reserve Subtitles -->
  <text x="250" y="328" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="4.2" fill="#E5C878">XXV YRS • 25 YEARS ON THE ICE</text>
  <text x="250" y="356" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="500" letter-spacing="4" fill="#9CA3AF">SMALL BATCH SOY • LOUDOUN COUNTY, VA</text>
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
  <!-- Minimalist Crossed Sticks w/ Subtle Blade Toes + Flame Emblem -->
  <g transform="translate(250, 178)">
    <path d="M -38,-30 L 38,36 L 49,31.5" fill="none" stroke="url(#c3-gold)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 38,-30 L -38,36 L -49,31.5" fill="none" stroke="url(#c3-gold)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,-10 C -7,-19 -10,-32 -5,-43 C -2,-50 0,-56 0,-60 C 0,-56 2,-50 5,-43 C 10,-32 7,-19 0,-10 Z" fill="url(#c3-gold)" />
    <path d="M 0,-15 C -3,-21 -4,-28 -1.5,-34 C 0,-37 0.5,-37 1.5,-34 C 4,-28 3,-21 0,-15 Z" fill="#0B0C0E" opacity="0.45" />
  </g>
  <!-- Wide-Tracked Editorial Wordmark -->
  <text x="250" y="286" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="40" font-weight="600" letter-spacing="11" fill="url(#c3-gold)">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13.5" font-weight="600" dy="-16" dx="1" letter-spacing="0">&#8482;</tspan></text>
  <line x1="190" y1="312" x2="310" y2="312" stroke="url(#c3-gold)" stroke-width="1" opacity="0.6" />
  <text x="250" y="344" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="500" letter-spacing="5.5" fill="#FAF5E8">LOUDOUN COUNTY, VA</text>
  <text x="250" y="372" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="500" letter-spacing="3.5" fill="#9CA3AF">USA</text>
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

  <!-- Minimalist Crossed Sticks w/ Subtle Blade Toes & Flame Centerpiece -->
  <g transform="translate(270, 116)">
    <path d="M -28,-22 L 28,28 L 36,24.5" fill="none" stroke="url(#c4-foil)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 28,-22 L -28,28 L -36,24.5" fill="none" stroke="url(#c4-foil)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,-8 C -6,-15 -8,-25 -5,-34 C -3,-40 0,-45 0,-49 C 0,-45 3,-40 5,-34 C 8,-25 6,-15 0,-8 Z" fill="url(#c4-foil)" />
  </g>

  <!-- Stamped Workshop Typography -->
  <text x="270" y="218" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="38" font-weight="700" letter-spacing="11" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13" font-weight="600" dy="-15" dx="1" letter-spacing="0" fill="url(#c4-foil)">&#8482;</tspan></text>
  <line x1="170" y1="240" x2="370" y2="240" stroke="url(#c4-badge)" stroke-width="0.9" opacity="0.6" />
  <text x="270" y="270" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="5.5" fill="#C5A059">LOUDOUN COUNTY, VA</text>
  <text x="270" y="296" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="500" letter-spacing="4" fill="#9CA3AF">USA</text>
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

  // Candle Flame (Larger, centered, full-height sculpted flame)
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1.5c-.8 3.4-5.5 6.8-5.5 11.8 0 4.4 3.4 8.2 7.5 8.2s7.5-3.8 7.5-8.2c0-3.3-1.9-6-3.3-8.1-.6 2-1.8 3.3-3.1 4-1.2-3.9-2.2-5.9-3.1-7.7Zm1.6 17.2c-1.8 0-3.2-1.4-3.2-3.3 0-1.9 1.7-3.6 2.5-5 .9 1.3 2.3 2.5 2.3 4.8 0 2-1 3.5-1.6 3.5Z"/>
  </svg>`,

  // Quantity Minus (Bold Minus on Left + Larger Flame on Right)
  minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" class="qty-flame-icon" fill="currentColor" aria-hidden="true">
    <rect x="2" y="10.25" width="12" height="3.5" rx="1.75" fill="#FFFFFF"/>
    <path d="M26.5 2c-.7 3.2-5 6.4-5 11.2 0 4.1 3.1 7.6 6.8 7.6s6.8-3.5 6.8-7.6c0-3.1-1.7-5.6-3-7.6-.5 1.8-1.6 3.1-2.8 3.7-1.1-3.6-2-5.5-2.8-7.3Zm1.4 16.1c-1.6 0-2.9-1.3-2.9-3.1 0-1.8 1.5-3.3 2.3-4.6.8 1.2 2.1 2.3 2.1 4.4 0 1.9-.9 3.3-1.5 3.3Z"/>
  </svg>`,

  // Quantity Plus (Larger Flame on Left + Bold Plus on Right)
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" class="qty-flame-icon" fill="currentColor" aria-hidden="true">
    <path d="M11.5 2c-.7 3.2-5 6.4-5 11.2 0 4.1 3.1 7.6 6.8 7.6s6.8-3.5 6.8-7.6c0-3.1-1.7-5.6-3-7.6-.5 1.8-1.6 3.1-2.8 3.7-1.1-3.6-2-5.5-2.8-7.3Zm1.4 16.1c-1.6 0-2.9-1.3-2.9-3.1 0-1.8 1.5-3.3 2.3-4.6.8 1.2 2.1 2.3 2.1 4.4 0 1.9-.9 3.3-1.5 3.3Z"/>
    <rect x="25" y="10.25" width="12" height="3.5" rx="1.75" fill="#FFFFFF"/>
    <rect x="29.25" y="6" width="3.5" height="12" rx="1.75" fill="#FFFFFF"/>
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

  // Crossed Hockey Sticks w/ Subtle Blade Toes Emblem
  hockeySticks: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M 5,5 L 18,18 L 21,16.8"/><path d="M 19,5 L 6,18 L 3,16.8"/><path d="M12 3c-1.2 1.8-1.8 3.2-.6 4.8.6.8 1.2.8 1.2 0 1.2-1.6.6-3-.6-4.8z" fill="currentColor" stroke="none"/>
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
  </svg>`,

  // Share
  share: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
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
    // Concept 2: The Precision Reserve (Universal Jar Sticker — No Scent Name on Vessel Face)
    conceptArtwork = `
      <rect x="142" y="162" width="112" height="124" rx="1.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <rect x="146" y="166" width="104" height="116" rx="1" fill="none" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.55" />
      <g transform="translate(198, 198)">
        <path d="M -11,-9 L 11,11 L 14.5,9.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 11,-9 L -11,11 L -14.5,9.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-3 C -2.5,-6 -3.5,-10 -1.8,-14 C -0.6,-16 0,-18 0,-19.5 C 0,-18 0.6,-16 1.8,-14 C 3.5,-10 2.5,-6 0,-3 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="232" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="10.8" font-weight="600" letter-spacing="2" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0" fill="url(#${goldGradId})">&#8482;</tspan></text>
      <line x1="158" y1="242" x2="193" y2="242" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.7" />
      <polygon points="198,240 200,242 198,244 196,242" fill="url(#${goldGradId})" />
      <line x1="203" y1="242" x2="238" y2="242" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.7" />
      <text x="198" y="256" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" letter-spacing="1.2" fill="#9CA3AF">LOUDOUN COUNTY, VA</text>
      <text x="198" y="270" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.0" font-weight="600" letter-spacing="1.6" fill="url(#${goldGradId})">USA</text>
    `;
  } else if (cid === 3) {
    // Concept 3: The Atelier Lockup (Universal Jar Sticker — No Scent Name on Vessel Face)
    conceptArtwork = `
      <line x1="138" y1="168" x2="258" y2="168" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <line x1="138" y1="171.5" x2="258" y2="171.5" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.55" />
      <line x1="138" y1="276.5" x2="258" y2="276.5" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.55" />
      <line x1="138" y1="280" x2="258" y2="280" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <g transform="translate(198, 206)">
        <path d="M -12,-10 L 12,12 L 15.5,10.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 12,-10 L -12,12 L -15.5,10.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-3.5 C -2.5,-6.5 -3.5,-10.5 -1.8,-14.5 C -0.6,-16.5 0,-18.5 0,-20 C 0,-18.5 0.6,-16.5 1.8,-14.5 C 3.5,-10.5 2.5,-6.5 0,-3.5 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="238" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="11.2" font-weight="600" letter-spacing="2.6" fill="url(#${goldGradId})">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0">&#8482;</tspan></text>
      <line x1="176" y1="248" x2="220" y2="248" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.65" />
      <text x="198" y="260" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.2" font-weight="500" letter-spacing="1.4" fill="#9CA3AF">LOUDOUN COUNTY, VA</text>
      <text x="198" y="269" text-anchor="middle" font-family="'Inter', sans-serif" font-size="3.8" font-weight="500" letter-spacing="1.6" fill="#9CA3AF">USA</text>
    `;
  } else if (cid === 4) {
    // Concept 4: The Workshop Emblem (Universal Jar Sticker — No Scent Name on Vessel Face)
    conceptArtwork = `
      <rect x="136" y="172" width="124" height="104" rx="2" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <rect x="140" y="176" width="116" height="96" rx="1" fill="none" stroke="url(#${goldGradId})" stroke-width="0.45" opacity="0.5" />
      <g transform="translate(198, 206)">
        <path d="M -11,-9 L 11,11 L 14.5,9.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 11,-9 L -11,11 L -14.5,9.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-3 C -2.5,-6 -3.5,-10 -1.8,-14 C -0.6,-16 0,-18 0,-19.5 C 0,-18 0.6,-16 1.8,-14 C 3.5,-10 2.5,-6 0,-3 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="236" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="11" font-weight="700" letter-spacing="2.4" fill="#FAF5E8">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" dy="-4.5" dx="0.5" letter-spacing="0" fill="url(#${goldGradId})">&#8482;</tspan></text>
      <line x1="158" y1="246" x2="238" y2="246" stroke="url(#${goldGradId})" stroke-width="0.5" opacity="0.65" />
      <text x="198" y="258" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.2" font-weight="600" letter-spacing="1.4" fill="#C5A059">LOUDOUN COUNTY, VA</text>
      <text x="198" y="267" text-anchor="middle" font-family="'Inter', sans-serif" font-size="3.8" font-weight="600" letter-spacing="1.6" fill="#C5A059">USA</text>
    `;
  } else {
    // Concept 1 (Default): The Precision Mark (100% Universal Square Hairline Frame — Crossed Sticks w/ Subtle Blade Toes & Flame + PUCK & WICK + LOUDOUN COUNTY, VA + USA)
    conceptArtwork = `
      <rect x="140" y="166" width="116" height="116" fill="none" stroke="url(#${goldGradId})" stroke-width="1.2" />
      <rect x="143.5" y="169.5" width="109" height="109" fill="none" stroke="url(#${goldGradId})" stroke-width="0.4" opacity="0.38" />
      <g transform="translate(198, 206)">
        <path d="M -13,-11.5 L 12.5,12 L 16.5,10.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 13,-11.5 L -12.5,12 L -16.5,10.5" fill="none" stroke="url(#${goldGradId})" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-3.5 C -2.5,-6.5 -3.5,-11 -1.5,-15 C -0.4,-17 0,-18.5 0,-19.5 C 0,-18.5 0.4,-17 1.5,-15 C 3.5,-11 2.5,-6.5 0,-3.5 Z" fill="url(#${goldGradId})" />
      </g>
      <text x="198" y="238" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="11.6" font-weight="700" letter-spacing="1.6" fill="url(#${goldGradId})">PUCK &amp; WICK</text>
      <text x="198" y="252" text-anchor="middle" font-family="'Inter', sans-serif" font-size="3.4" font-weight="600" letter-spacing="1.2" fill="url(#${goldGradId})">LOUDOUN COUNTY, VA</text>
      <text x="198" y="260" text-anchor="middle" font-family="'Inter', sans-serif" font-size="3.1" font-weight="600" letter-spacing="1.6" fill="url(#${goldGradId})" opacity="0.88">USA</text>
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 196" width="100%" height="196" class="science-diagram-svg" role="img" aria-label="Microporous Activated Coconut Charcoal Adsorption Diagram">
      <title>Microporous Activated Coconut Charcoal Physical Adsorption Matrix</title>
      <defs>
        <linearGradient id="charcoal-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0B0E" />
          <stop offset="100%" stop-color="#14161F" />
        </linearGradient>
        <radialGradient id="vdw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(197, 160, 89, 0.34)" />
          <stop offset="100%" stop-color="rgba(197, 160, 89, 0)" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="316" height="192" rx="8" fill="url(#charcoal-bg)" stroke="#C5A059" stroke-width="1.2" opacity="0.95" />

      <!-- Enlarged Honeycomb Hexagons (66px wide x 72px tall so circles + labels sit 100% inside each hex) -->
      <g stroke="#C5A059" stroke-width="1.35" fill="#161922" opacity="0.95">
        <!-- Top Row: 3 Large Hexagons -->
        <polygon points="14,28 47,12 80,28 80,68 47,84 14,68" />
        <polygon points="80,28 113,12 146,28 146,68 113,84 80,68" />
        <polygon points="146,28 179,12 212,28 212,68 179,84 146,68" />
        <!-- Bottom Row: 2 Large Interlocked Hexagons -->
        <polygon points="47,84 80,68 113,84 113,124 80,140 47,124" />
        <polygon points="113,84 146,68 179,84 179,124 146,140 113,124" />
      </g>

      <circle cx="47" cy="40" r="20" fill="url(#vdw-glow)" />
      <circle cx="113" cy="40" r="20" fill="url(#vdw-glow)" />
      <circle cx="179" cy="40" r="20" fill="url(#vdw-glow)" />
      <circle cx="80" cy="96" r="20" fill="url(#vdw-glow)" />
      <circle cx="146" cy="96" r="20" fill="url(#vdw-glow)" />

      <!-- Hex 1: ODOR (Sweat VOCs) — Fits 100% inside Hex 1 -->
      <circle cx="47" cy="39" r="13.5" fill="#DC2626" stroke="#FCA5A5" stroke-width="0.9" />
      <text x="47" y="41" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="800" fill="#FFFFFF">ODOR</text>
      <rect x="25" y="55" width="44" height="10" rx="3" fill="#0B0D12" stroke="rgba(252,165,165,0.45)" stroke-width="0.6" />
      <text x="47" y="62" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" fill="#FCA5A5">Sweat VOCs</text>

      <!-- Hex 2: GEAR (Rink Odor) — Fits 100% inside Hex 2 -->
      <circle cx="113" cy="39" r="13.5" fill="#D97706" stroke="#FDE68A" stroke-width="0.9" />
      <text x="113" y="41" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="800" fill="#FFFFFF">GEAR</text>
      <rect x="92" y="55" width="42" height="10" rx="3" fill="#0B0D12" stroke="rgba(253,230,138,0.45)" stroke-width="0.6" />
      <text x="113" y="62" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" fill="#FDE68A">Rink Odor</text>

      <!-- Hex 3: LOCKER (Stagnant Air) — Fits 100% inside Hex 3 -->
      <circle cx="179" cy="39" r="14" fill="#2563EB" stroke="#93C5FD" stroke-width="0.9" />
      <text x="179" y="41" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.9" font-weight="800" fill="#FFFFFF">LOCKER</text>
      <rect x="155" y="55" width="48" height="10" rx="3" fill="#0B0D12" stroke="rgba(147,197,253,0.45)" stroke-width="0.6" />
      <text x="179" y="62" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" fill="#93C5FD">Stagnant Air</text>

      <!-- Hex 4: DAMP (Moisture) — Fits 100% inside Hex 4 -->
      <circle cx="80" cy="95" r="13.5" fill="#059669" stroke="#6EE7B7" stroke-width="0.9" />
      <text x="80" y="97" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="800" fill="#FFFFFF">DAMP</text>
      <rect x="60" y="111" width="40" height="10" rx="3" fill="#0B0D12" stroke="rgba(110,231,183,0.45)" stroke-width="0.6" />
      <text x="80" y="118" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" fill="#6EE7B7">Moisture</text>

      <!-- Hex 5: LOCKED (<2nm Carbon Trap) — Fits 100% inside Hex 5 -->
      <circle cx="146" cy="95" r="13.5" fill="#1F2430" stroke="#D4AF37" stroke-width="1.1" />
      <text x="146" y="97" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.9" font-weight="800" fill="#D4AF37">LOCKED</text>
      <rect x="122" y="111" width="48" height="10" rx="3" fill="#0B0D12" stroke="rgba(212,175,55,0.45)" stroke-width="0.6" />
      <text x="146" y="118" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" fill="#E5C878">&lt;2nm Pore Trap</text>

      <!-- Right Callout Column -->
      <line x1="224" y1="24" x2="224" y2="128" stroke="#D4AF37" stroke-width="0.85" stroke-dasharray="3,2" />
      <text x="232" y="48" font-family="'Inter', sans-serif" font-size="6.4" font-weight="700" fill="#D4AF37">PORE SIZE &lt;2nm</text>
      <text x="232" y="59" font-family="'Inter', sans-serif" font-size="5.4" fill="#B0B5C0">Microporous Lattice</text>
      <text x="232" y="88" font-family="'Inter', sans-serif" font-size="6.4" font-weight="700" fill="#D4AF37">DEEP CAPTURE</text>
      <text x="232" y="99" font-family="'Inter', sans-serif" font-size="5.4" fill="#B0B5C0">Physical Adsorption</text>

      <!-- Bottom Holder Box: Widen & scale text so zero letters overflow -->
      <rect x="10" y="156" width="300" height="24" rx="5" fill="rgba(197, 160, 89, 0.14)" stroke="rgba(197, 160, 89, 0.42)" />
      <text x="160" y="171" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.2" font-weight="700" letter-spacing="0.55" fill="#D4AF37">&gt;1,000 m²/g SURFACE AREA • PERMANENT ODOR CAPTURE</text>
    </svg>
  `;
}

/**
 * ZeoCarb-98™ Molecular Neutralization and Olfactory Receptor Lockout Diagram SVG.
 */
export function getLausonScienceSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 185" width="100%" height="185" class="science-diagram-svg" role="img" aria-label="ZeoCarb-98 Molecular Neutralization and Olfactory Receptor Lockout Diagram">
      <title>ZeoCarb-98 Proprietary Molecular Counteraction and Receptor Inactivation</title>
      <defs>
        <linearGradient id="lauson-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0B0E" />
          <stop offset="100%" stop-color="#14161F" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="316" height="181" rx="8" fill="url(#lauson-bg)" stroke="#C5A059" stroke-width="1.2" opacity="0.95" />

      <!-- Sphere 1: MALODOR -->
      <circle cx="40" cy="70" r="27" fill="#1C1820" stroke="#EF4444" stroke-width="1.6" />
      <text x="40" y="63" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.2" font-weight="800" fill="#EF4444">MALODOR</text>
      <text x="40" y="73" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="600" fill="#FCA5A5">Sweat &amp; Gear</text>
      <text x="40" y="82" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.4" fill="#9EA3AE">Airborne Odor</text>

      <text x="75" y="74" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12.5" font-weight="800" fill="#D4AF37">+</text>

      <!-- Sphere 2: ZEOCARB-98 -->
      <circle cx="110" cy="70" r="27" fill="#1A1C16" stroke="#D4AF37" stroke-width="1.6" />
      <text x="110" y="64" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="800" fill="#FAF5E8">ZEOCARB-98™</text>
      <text x="110" y="74" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.7" font-weight="600" fill="#E5C878">Proprietary Core</text>
      <text x="110" y="83" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.3" fill="#9EA3AE">Vapor Complex</text>

      <!-- Arrow: Molecular Lock -->
      <path d="M 142,72 L 176,72 M 172,68 L 177,72 L 172,76" stroke="#34D399" stroke-width="1.8" fill="none" stroke-linecap="round" />
      <rect x="140" y="54" width="38" height="10" rx="3" fill="#0D0F14" stroke="rgba(52,211,153,0.4)" stroke-width="0.6" />
      <text x="159" y="61" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.3" font-weight="700" fill="#34D399">Molecular Lock</text>

      <!-- Sphere 3: NEUTRALIZED -->
      <ellipse cx="216" cy="70" rx="33" ry="27" fill="#121820" stroke="#34D399" stroke-width="1.8" />
      <text x="216" y="63" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.7" font-weight="800" fill="#34D399">NEUTRALIZED</text>
      <text x="216" y="73" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" fill="#93C5FD">100% Odorless</text>
      <text x="216" y="82" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.3" fill="#9EA3AE">Zero Perfume Mask</text>

      <!-- Scent Receptor Lockout -->
      <g transform="translate(260, 44)">
        <path d="M 6,6 C 6,25 36,25 36,6" fill="none" stroke="#F87171" stroke-width="1.5" />
        <circle cx="21" cy="14" r="8" fill="rgba(239, 68, 68, 0.16)" stroke="#EF4444" stroke-width="1.2" />
        <line x1="16" y1="9" x2="26" y2="19" stroke="#EF4444" stroke-width="1.5" />
        <line x1="26" y1="9" x2="16" y2="19" stroke="#EF4444" stroke-width="1.5" />
        <text x="21" y="36" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.7" font-weight="700" fill="#F87171">SCENT RECEPTOR</text>
        <text x="21" y="45" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.5" font-weight="600" fill="#EF4444">Odor Blocked</text>
      </g>

      <!-- Bottom Holder Box: Widen & scale text so zero letters overflow -->
      <rect x="10" y="144" width="300" height="24" rx="5" fill="rgba(52, 211, 153, 0.14)" stroke="rgba(52, 211, 153, 0.42)" />
      <text x="160" y="159" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.9" font-weight="700" letter-spacing="0.48" fill="#34D399">ZEOCARB-98™ MOLECULAR LOCKOUT • ZERO RECEPTOR BINDING</text>
    </svg>
  `;
}
