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
      <stop offset="0%" stop-color="#997732" />
      <stop offset="25%" stop-color="#C5A059" />
      <stop offset="45%" stop-color="#F3E5AB" />
      <stop offset="55%" stop-color="#D4AF37" />
      <stop offset="75%" stop-color="#FDF6C7" />
      <stop offset="90%" stop-color="#C5A059" />
      <stop offset="100%" stop-color="#805F20" />
    </linearGradient>
    <radialGradient id="c1-flame-core" cx="50%" cy="65%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="20%" stop-color="#FEF08A" />
      <stop offset="55%" stop-color="#F59E0B" />
      <stop offset="85%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#9A3412" />
    </radialGradient>
    <linearGradient id="c1-puck-body" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#262830" />
      <stop offset="40%" stop-color="#16171B" />
      <stop offset="100%" stop-color="#0A0A0C" />
    </linearGradient>
    <filter id="c1-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g transform="translate(0, -10)">
    <!-- LEFT HOCKEY STICK -->
    <path d="M 105,95 L 118,85 L 368,365 C 388,382 418,386 442,374 C 448,371 445,360 436,362 C 416,368 392,364 378,350 L 126,80 Z" fill="url(#c1-gold-metallic)" />
    <path d="M 125,122 L 138,138 M 140,142 L 153,158 M 155,162 L 168,178 M 170,182 L 183,198" stroke="#0A0A0C" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
    <!-- RIGHT HOCKEY STICK -->
    <path d="M 395,95 L 382,85 L 132,365 C 112,382 82,386 58,374 C 52,371 55,360 64,362 C 84,368 108,364 122,350 L 374,80 Z" fill="url(#c1-gold-metallic)" />
    <path d="M 375,122 L 362,138 M 360,142 L 347,158 M 345,162 L 332,178 M 330,182 L 317,198" stroke="#0A0A0C" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
    <!-- HOCKEY PUCK BASE -->
    <path d="M 175,345 C 175,330 208,320 250,320 C 292,320 325,330 325,345 L 325,372 C 325,387 292,398 250,398 C 208,398 175,387 175,372 Z" fill="url(#c1-puck-body)" stroke="url(#c1-gold-metallic)" stroke-width="2" />
    <path d="M 185,355 L 185,368 M 200,360 L 200,373 M 220,364 L 220,377 M 250,366 L 250,379 M 280,364 L 280,377 M 300,360 L 300,373 M 315,355 L 315,368" stroke="url(#c1-gold-metallic)" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
    <ellipse cx="250" cy="345" rx="75" ry="18" fill="#1C1D22" stroke="url(#c1-gold-metallic)" stroke-width="2.5" />
    <ellipse cx="250" cy="345" rx="55" ry="12" fill="none" stroke="url(#c1-gold-metallic)" stroke-width="1" stroke-dasharray="4,4" opacity="0.7" />
    <!-- WICK & FLAME -->
    <rect x="248" y="300" width="4" height="28" rx="2" fill="#FAF5E8" stroke="#78350F" stroke-width="1" />
    <circle cx="250" cy="299" r="2.5" fill="#1C1917" />
    <path d="M 250,305 C 230,295 210,265 215,225 C 220,185 242,145 250,110 C 258,145 280,185 285,225 C 290,265 270,295 250,305 Z" fill="url(#c1-flame-core)" filter="url(#c1-gold-glow)" />
    <path d="M 250,302 C 238,295 228,272 232,244 C 235,218 246,188 250,165 C 254,188 265,218 268,244 C 272,272 262,295 250,302 Z" fill="#FFFDF0" opacity="0.9" />
  </g>
  <text x="250" y="435" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="34" font-weight="700" letter-spacing="8" fill="url(#c1-gold-metallic)">PUCK &amp; WICK</text>
  <line x1="160" y1="452" x2="340" y2="452" stroke="url(#c1-gold-metallic)" stroke-width="1" opacity="0.6" />
  <text x="250" y="472" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="4" fill="#C5A059">ARTISAN SOY • EST. 2024</text>
</svg>`,

  // Concept 2: Heritage Crest / Shield ("20 Years on the Ice")
  2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 520" width="100%" height="100%" aria-label="Puck and Wick - Heritage Shield 20 Years on the Ice Logo">
  <defs>
    <linearGradient id="c2-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#997732" />
      <stop offset="20%" stop-color="#C5A059" />
      <stop offset="45%" stop-color="#FDF6C7" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#C5A059" />
      <stop offset="100%" stop-color="#735218" />
    </linearGradient>
    <radialGradient id="c2-shield-bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1E2026" />
      <stop offset="70%" stop-color="#121316" />
      <stop offset="100%" stop-color="#0A0A0C" />
    </radialGradient>
  </defs>
  <g transform="translate(0, 10)">
    <!-- Flanking Wings -->
    <line x1="40" y1="230" x2="175" y2="230" stroke="url(#c2-gold)" stroke-width="1.5" />
    <circle cx="40" cy="230" r="3.5" fill="url(#c2-gold)" />
    <text x="135" y="215" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="32" font-weight="700" letter-spacing="6" fill="url(#c2-gold)">PUCK</text>
    <line x1="75" y1="240" x2="175" y2="240" stroke="url(#c2-gold)" stroke-width="0.75" stroke-dasharray="4,3" opacity="0.6" />
    <line x1="425" y1="230" x2="560" y2="230" stroke="url(#c2-gold)" stroke-width="1.5" />
    <circle cx="560" cy="230" r="3.5" fill="url(#c2-gold)" />
    <text x="465" y="215" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="32" font-weight="700" letter-spacing="6" fill="url(#c2-gold)">WICK</text>
    <line x1="425" y1="240" x2="525" y2="240" stroke="url(#c2-gold)" stroke-width="0.75" stroke-dasharray="4,3" opacity="0.6" />
  </g>
  <g transform="translate(0, 10)">
    <!-- Main Shield -->
    <path d="M 200,90 L 400,90 L 400,240 C 400,340 320,400 300,415 C 280,400 200,340 200,240 Z" fill="url(#c2-shield-bg)" stroke="url(#c2-gold)" stroke-width="4" stroke-linejoin="round" />
    <path d="M 212,102 L 388,102 L 388,236 C 388,324 316,378 300,392 C 284,378 212,324 212,236 Z" fill="none" stroke="url(#c2-gold)" stroke-width="1.5" opacity="0.8" />
    <path d="M 218,108 L 382,108 L 382,234 C 382,316 314,368 300,381 C 286,368 218,316 218,234 Z" fill="none" stroke="url(#c2-gold)" stroke-width="0.75" stroke-dasharray="3,3" opacity="0.5" />
    <!-- Laurel Wreath -->
    <g fill="url(#c2-gold)" opacity="0.85">
      <path d="M 235,165 C 227,162 225,152 232,148 C 238,145 243,154 235,165 Z" />
      <path d="M 230,195 C 222,192 220,182 227,178 C 233,175 238,184 230,195 Z" />
      <path d="M 230,225 C 222,223 221,213 228,208 C 234,204 238,214 230,225 Z" />
      <path d="M 235,255 C 227,253 226,243 233,238 C 239,234 243,244 235,255 Z" />
      <path d="M 245,285 C 238,283 236,273 243,268 C 250,264 253,274 245,285 Z" />
      <path d="M 260,312 C 253,310 252,300 259,295 C 265,291 268,301 260,312 Z" />
    </g>
    <g fill="url(#c2-gold)" opacity="0.85">
      <path d="M 365,165 C 373,162 375,152 368,148 C 362,145 357,154 365,165 Z" />
      <path d="M 370,195 C 378,192 380,182 373,178 C 367,175 362,184 370,195 Z" />
      <path d="M 370,225 C 378,223 379,213 372,208 C 366,204 362,214 370,225 Z" />
      <path d="M 365,255 C 373,253 374,243 367,238 C 361,234 357,244 365,255 Z" />
      <path d="M 355,285 C 362,283 364,273 357,268 C 350,264 347,274 355,285 Z" />
      <path d="M 340,312 C 347,310 348,300 341,295 C 335,291 332,301 340,312 Z" />
    </g>
    <!-- Flame & Typography -->
    <path d="M 300,182 C 288,175 278,155 282,135 C 285,115 296,95 300,80 C 304,95 315,115 318,135 C 322,155 312,175 300,182 Z" fill="url(#c2-gold)" />
    <path d="M 300,178 C 293,172 288,160 290,147 C 292,133 298,120 300,105 C 302,120 308,133 310,147 C 312,160 307,172 300,178 Z" fill="#FFFDF2" opacity="0.85" />
    <line x1="300" y1="182" x2="300" y2="192" stroke="url(#c2-gold)" stroke-width="2" />
    <text x="300" y="222" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="25" font-weight="700" letter-spacing="4" fill="url(#c2-gold)">20 YEARS</text>
    <text x="300" y="244" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="3" fill="#FAF5E8">ON THE ICE</text>
    <!-- Puck -->
    <ellipse cx="300" cy="285" rx="36" ry="9" fill="#1C1D22" stroke="url(#c2-gold)" stroke-width="1.5" />
    <path d="M 264,285 C 264,295 280,302 300,302 C 320,302 336,295 336,285 L 336,298 C 336,308 320,315 300,315 C 280,315 264,308 264,298 Z" fill="#121316" stroke="url(#c2-gold)" stroke-width="1.5" />
    <ellipse cx="300" cy="285" rx="24" ry="5" fill="none" stroke="url(#c2-gold)" stroke-width="1" stroke-dasharray="3,3" opacity="0.7" />
    <text x="300" y="348" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="2.5" fill="url(#c2-gold)">PURCELLVILLE, VA</text>
  </g>
  <text x="300" y="475" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" letter-spacing="5" fill="#C5A059">HAND-CRAFTED SOY • EST. 2004</text>
</svg>`,

  // Concept 3: Modern Luxury Apothecary Stamp
  3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" aria-label="Puck and Wick - Modern Luxury Apothecary Stamp">
  <defs>
    <linearGradient id="c3-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#997732" />
      <stop offset="25%" stop-color="#C5A059" />
      <stop offset="50%" stop-color="#FDF6C7" />
      <stop offset="75%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#805F20" />
    </linearGradient>
    <path id="c3-arc-top" d="M 85,250 A 165,165 0 0,1 415,250" fill="none" />
    <path id="c3-arc-bottom" d="M 415,250 A 165,165 0 0,1 85,250" fill="none" />
  </defs>
  <circle cx="250" cy="250" r="225" fill="#0E0F12" stroke="url(#c3-gold)" stroke-width="3" />
  <circle cx="250" cy="250" r="215" fill="none" stroke="url(#c3-gold)" stroke-width="1" stroke-dasharray="2,4" opacity="0.6" />
  <circle cx="250" cy="250" r="140" fill="#121316" stroke="url(#c3-gold)" stroke-width="2" />
  <circle cx="250" cy="250" r="132" fill="none" stroke="url(#c3-gold)" stroke-width="0.75" opacity="0.5" />
  <polygon points="250,28 253,35 250,42 247,35" fill="url(#c3-gold)" />
  <polygon points="250,458 253,465 250,472 247,465" fill="url(#c3-gold)" />
  <polygon points="28,250 35,253 42,250 35,247" fill="url(#c3-gold)" />
  <polygon points="458,250 465,253 472,250 465,247" fill="url(#c3-gold)" />
  <text font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="23" font-weight="700" letter-spacing="8" fill="url(#c3-gold)">
    <textPath href="#c3-arc-top" startOffset="50%" text-anchor="middle">PUCK &amp; WICK</textPath>
  </text>
  <text font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="4" fill="#C5A059">
    <textPath href="#c3-arc-bottom" startOffset="50%" text-anchor="middle">ARTISAN SOY • LOUDOUN COUNTY</textPath>
  </text>
  <text x="180" y="255" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="url(#c3-gold)">NO. 01</text>
  <text x="320" y="255" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="url(#c3-gold)">100% SOY</text>
  <!-- Monogram P + W -->
  <g transform="translate(0, 0)">
    <path d="M 222,175 C 215,168 210,154 213,140 C 216,126 220,112 222,100 C 224,112 228,126 231,140 C 234,154 229,168 222,175 Z" fill="url(#c3-gold)" />
    <path d="M 222,171 C 218,166 215,156 217,147 C 218,138 221,128 222,118 C 223,128 226,138 227,147 C 229,156 226,166 222,171 Z" fill="#FFFDF5" />
    <line x1="222" y1="175" x2="222" y2="182" stroke="url(#c3-gold)" stroke-width="2" />
    <!-- Letter P -->
    <rect x="218" y="182" width="7" height="110" rx="1" fill="url(#c3-gold)" />
    <line x1="211" y1="182" x2="232" y2="182" stroke="url(#c3-gold)" stroke-width="2" />
    <line x1="211" y1="292" x2="232" y2="292" stroke="url(#c3-gold)" stroke-width="2" />
    <path d="M 225,182 L 255,182 C 275,182 285,195 285,212 C 285,229 275,242 255,242 L 225,242 Z" fill="none" stroke="url(#c3-gold)" stroke-width="7" stroke-linejoin="round" />
    <!-- Letter W -->
    <polygon points="238,220 245,220 262,292 255,292" fill="url(#c3-gold)" />
    <polygon points="262,292 269,292 284,232 277,232" fill="url(#c3-gold)" />
    <polygon points="277,232 284,232 299,292 292,292" fill="url(#c3-gold)" />
    <path d="M 299,292 L 316,220 L 323,220 L 305,296 C 302,308 316,308 322,305 L 320,300 C 314,302 308,300 306,294 Z" fill="url(#c3-gold)" />
  </g>
  <text x="250" y="338" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="600" letter-spacing="3" fill="#FAF5E8" opacity="0.8">39.1368° N, 77.7144° W</text>
</svg>`,

  // Concept 4: Rustic Stamped-Leather & Gold Foil Badge
  4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 380" width="100%" height="100%" aria-label="Puck and Wick - Rustic Stamped Leather and Gold Badge Logo">
  <defs>
    <linearGradient id="c4-gold-foil" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#8A6623" />
      <stop offset="20%" stop-color="#C5A059" />
      <stop offset="40%" stop-color="#FDF6C7" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#997732" />
      <stop offset="100%" stop-color="#5A4015" />
    </linearGradient>
    <radialGradient id="c4-rivet-grad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="30%" stop-color="#D4AF37" />
      <stop offset="70%" stop-color="#8A6623" />
      <stop offset="100%" stop-color="#38290D" />
    </radialGradient>
    <linearGradient id="c4-leather-surface" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1B20" />
      <stop offset="50%" stop-color="#131418" />
      <stop offset="100%" stop-color="#0B0C0E" />
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="500" height="340" rx="28" fill="url(#c4-leather-surface)" stroke="url(#c4-gold-foil)" stroke-width="4.5" />
  <rect x="36" y="36" width="468" height="308" rx="18" fill="none" stroke="#C5A059" stroke-width="2" stroke-dasharray="8,6" opacity="0.75" />
  <!-- Corner Rivets -->
  <circle cx="58" cy="58" r="11" fill="url(#c4-rivet-grad)" stroke="#261C08" stroke-width="1.5" />
  <line x1="51" y1="58" x2="65" y2="58" stroke="#1C1405" stroke-width="2" />
  <circle cx="482" cy="58" r="11" fill="url(#c4-rivet-grad)" stroke="#261C08" stroke-width="1.5" />
  <line x1="475" y1="58" x2="489" y2="58" stroke="#1C1405" stroke-width="2" />
  <circle cx="58" cy="322" r="11" fill="url(#c4-rivet-grad)" stroke="#261C08" stroke-width="1.5" />
  <line x1="51" y1="322" x2="65" y2="322" stroke="#1C1405" stroke-width="2" />
  <circle cx="482" cy="322" r="11" fill="url(#c4-rivet-grad)" stroke="#261C08" stroke-width="1.5" />
  <line x1="475" y1="322" x2="489" y2="322" stroke="#1C1405" stroke-width="2" />
  <!-- Crossed Sticks, Flame & Puck -->
  <g transform="translate(0, -10)">
    <path d="M 215,85 L 295,155 L 308,155 C 314,155 316,148 310,146 L 222,80 Z" fill="url(#c4-gold-foil)" />
    <path d="M 325,85 L 245,155 L 232,155 C 226,155 224,148 230,146 L 318,80 Z" fill="url(#c4-gold-foil)" />
    <ellipse cx="270" cy="148" rx="28" ry="7" fill="#0A0A0C" stroke="url(#c4-gold-foil)" stroke-width="1.5" />
    <path d="M 242,148 C 242,154 254,159 270,159 C 286,159 298,154 298,148 L 298,155 C 298,161 286,166 270,166 C 254,166 242,161 242,155 Z" fill="#16171B" stroke="url(#c4-gold-foil)" stroke-width="1.5" />
    <path d="M 270,135 C 262,128 256,115 259,102 C 261,90 268,78 270,68 C 272,78 279,90 281,102 C 284,115 278,128 270,135 Z" fill="url(#c4-gold-foil)" />
    <path d="M 270,131 C 265,127 262,118 263,110 C 265,103 268,96 270,88 C 272,96 275,103 277,110 C 278,118 275,127 270,131 Z" fill="#FFFDF5" />
  </g>
  <text x="270" y="215" text-anchor="middle" font-family="'Oswald', 'Bebas Neue', 'Cinzel', sans-serif" font-size="44" font-weight="700" letter-spacing="8" fill="url(#c4-gold-foil)">PUCK &amp; WICK</text>
  <line x1="80" y1="235" x2="230" y2="235" stroke="url(#c4-gold-foil)" stroke-width="1.5" />
  <polygon points="270,227 272,233 278,234 274,238 275,244 270,241 265,244 266,238 262,234 268,233" fill="url(#c4-gold-foil)" />
  <line x1="310" y1="235" x2="460" y2="235" stroke="url(#c4-gold-foil)" stroke-width="1.5" />
  <text x="270" y="268" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="#FAF5E8">HAND-POURED IN VIRGINIA</text>
  <text x="270" y="294" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#C5A059">SMALL BATCH SOY • 20 YEARS ON ICE</text>
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
