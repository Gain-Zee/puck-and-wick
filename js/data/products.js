/**
 * Puck & Wick Product Catalog Data Engine
 * Models all 7+ artisan candles, scent pyramids, vessel specifications, burn times, and visual mockups.
 * Adheres strictly to ORIGINAL_REQUEST.md, PROJECT.md, and test fixtures.
 */

export const SCENT_CATEGORIES = [
  { id: 'all', label: 'All Pours' },
  { id: 'signature', label: 'Signature Line' },
  { id: 'fresh_clean', label: 'Fresh & Clean' },
  { id: 'woods_rustic', label: 'Woods & Rustic' },
  { id: 'seasonal', label: 'Seasonal Releases' },
  { id: 'exclusive_boxes', label: 'Exclusive Boxes' }
];

export const PRODUCTS = [
  {
    id: 'candle-top-shelf',
    name: 'Top Shelf',
    tagline: "The Veteran's Pour. Dark Bourbon, Pipe Tobacco & Charred Oak.",
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Inspired by top-shelf snipes and post-victory clubhouse celebrations. A rich, commanding blend of small-batch Kentucky bourbon cask, sweet cured pipe tobacco leaf, and charred white oak embers, balanced by warm Madagascar vanilla bean.',
    notes: {
      top: ['Kentucky Bourbon Cask', 'Bergamot Zest', 'Spiced Blood Orange'],
      middle: ['Aged Tobacco Leaf', 'Charred White Oak', 'Saddle Leather'],
      base: ['Smoked Amber', 'Dark Vanilla Bean', 'Indonesian Sandalwood']
    },
    featured: true,
    vesselType: 'obsidian',
    accentColor: '#C5A059'
  },
  {
    id: 'candle-fresh-cut',
    name: 'Fresh Cut',
    tagline: '6:00 AM Zamboni Cut. Glacial Ozone, Crisp Pine & Silver Fir.',
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['signature', 'fresh_clean'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Amber Apothecary Glass Tumbler with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'That sacred stillness when you step onto fresh sheet ice before anyone else touches the rink. Crisp sub-zero glacial ozone, crushed Siberian fir needles, and invigorating frosted eucalyptus, anchored by chilled driftwood.',
    notes: {
      top: ['Glacial Ozone', 'Frosted Eucalyptus', 'Spearmint Spark'],
      middle: ['Crushed Pine Needles', 'Silver Fir', 'Alpine Rosemary'],
      base: ['Chilled Driftwood', 'White Cedarwood', 'Pure Musk']
    },
    featured: true,
    vesselType: 'amber',
    accentColor: '#88D1F1'
  },
  {
    id: 'candle-balsam-fir',
    name: 'Balsam Fir',
    tagline: 'Loudoun Valley Mountain Winter. Blue Ridge Balsam & Spiced Cypress.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['seasonal', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Deep Amber Frosted Glass with Gold Embossed Label',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Handcrafted exclusively in seasonal collaboration with The Blue Hydrangea boutique in Purcellville, VA. Captures the crisp scent of snow-laden Blue Ridge evergreens, resinous balsam fir, spiced clove bud, and smoky cedar embers.',
    notes: {
      top: ['Wild Juniper Berries', 'Fraser Pine', 'Spiced Clove Bud'],
      middle: ['Resinous Balsam Fir', 'Blue Ridge Evergreen', 'Warm Cypress'],
      base: ['Earthy Patchouli', 'Cedarwood Bark', 'Golden Winter Amber']
    },
    featured: true,
    seasonal: true,
    seasonalBadge: 'The Blue Hydrangea Exclusive Collaboration',
    vesselType: 'amber',
    accentColor: '#3B7A57'
  },
  {
    id: 'candle-barnwood-bourbon',
    name: 'Barnwood & Bourbon',
    tagline: 'Historic Virginia Homestead. Weathered Oak & Small-Batch Rye.',
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['woods_rustic'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'The scent of an authentic 19th-century Virginia barn workshop where hand-hewn oak rafters have absorbed decades of sweet woodsmoke, enriched by small-batch rye bourbon, burnt brown sugar, and toasted tonka.',
    notes: {
      top: ['Small-Batch Rye Bourbon', 'Toasted Pecan', 'Orange Peel'],
      middle: ['Weathered Barnwood Oak', 'Scorched Cedar', 'Burnt Maple'],
      base: ['Warm Amber Resin', 'Smoky Vetiver', 'Aged Vanilla']
    },
    featured: false,
    vesselType: 'obsidian',
    accentColor: '#966034'
  },
  {
    id: 'candle-rinkside-cedar-smoke',
    name: 'Rinkside Cedar & Smoke',
    tagline: 'Hockey Heritage / Woods. Cedar Benches & Campfire Embers.',
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'The aromatic nostalgia of an outdoor pond hockey game followed by an open-fire tailgate. Aromatic red cedar boards, oiled leather glove patina, and crackling birchwood smoke softened by dark resinous musk.',
    notes: {
      top: ['Chilled Winter Air', 'Birchwood Smoke', 'Crushed Black Pepper'],
      middle: ['Atlas Cedarwood', 'Oiled Glove Leather', 'Wild Sage'],
      base: ['Charred Oak Embers', 'Incense Resin', 'Earthy Vetiver Root']
    },
    featured: false,
    vesselType: 'obsidian',
    accentColor: '#C5A059'
  },
  {
    id: 'candle-warm-amber-vanilla',
    name: 'Warm Amber & Vanilla Bean',
    tagline: 'Unapologetic Hearthside Warmth. Baltic Amber & Madagascar Vanilla.',
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Rich, sensual, and universally appealing. Rich golden Baltic amber layered with cracked Madagascar vanilla pods, warm cashmere musk, and subtle benzoin resin that fills the room with comforting elegance.',
    notes: {
      top: ['Golden Bergamot', 'French Vanilla Cream'],
      middle: ['Baltic Amber', 'Cashmere Musk', 'Spiced Tonka Bean'],
      base: ['Madagascar Vanilla Bean', 'Warm Benzoin', 'Cedar']
    },
    featured: false,
    vesselType: 'obsidian',
    accentColor: '#E6A15C'
  },
  {
    id: 'candle-locker-room-mint',
    name: 'Locker Room Mint & Eucalyptus',
    tagline: 'Post-Game Oxygen Shot. Tasmanian Eucalyptus & Crushed Spearmint.',
    price: 34.00,
    formattedPrice: '$34.00',
    category: ['signature', 'fresh_clean'],
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Engineered to wipe away mental fatigue and stale room air. A high-voltage surge of pure Tasmanian eucalyptus globulus, crushed garden spearmint, clary sage, and crisp mountain mineral salt.',
    notes: {
      top: ['Crushed Spearmint', 'Icy Peppermint Leaf', 'Lemon Rind'],
      middle: ['Blue Gum Eucalyptus', 'Clary Sage', 'Tea Tree Leaves'],
      base: ['Crisp Mountain Salt', 'White Pine', 'Clean Cedar']
    },
    featured: false,
    vesselType: 'obsidian',
    accentColor: '#34D399'
  }
];

/**
 * Returns candle vessel SVG illustration (Matte Obsidian or Amber Glass).
 * Pure mathematical SVG with zero external dependencies.
 */
export function getCandleVesselSvg(product) {
  const isAmber = product.vesselType === 'amber';
  const photoHref = isAmber ? 'assets/images/candle-amber.jpg' : 'assets/images/candle-obsidian.jpg';
  const clipId = `vessel-clip-${product.id}`;
  const vignetteId = `vessel-vig-${product.id}`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="100%" height="100%" class="candle-vessel-svg" aria-label="${product.name} Luxury Candle Jar" role="img">
      <defs>
        <clipPath id="${clipId}">
          <rect x="0" y="0" width="360" height="360" rx="14" />
        </clipPath>
        <linearGradient id="${vignetteId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#08090C" stop-opacity="0.1" />
          <stop offset="68%" stop-color="#08090C" stop-opacity="0" />
          <stop offset="100%" stop-color="#08090C" stop-opacity="0.92" />
        </linearGradient>
      </defs>

      <g clip-path="url(#${clipId})">
        <!-- Studio Product Photography Placeholder -->
        <image href="${photoHref}" x="0" y="0" width="360" height="360" preserveAspectRatio="xMidYMid slice" />
        <rect x="0" y="0" width="360" height="360" fill="url(#${vignetteId})" />

        <!-- Minimalist Scent Name Plate Overlay -->
        <rect x="34" y="302" width="292" height="42" rx="4" fill="rgba(11, 12, 14, 0.86)" stroke="rgba(197, 160, 89, 0.55)" stroke-width="1" />
        <text x="180" y="321" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="14" font-weight="600" letter-spacing="2.5" fill="#FAF5E8">${product.name.toUpperCase()}</text>
        <text x="180" y="335" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="500" letter-spacing="2.2" fill="#C5A059">10 OZ • 100% AMERICAN SOY</text>
      </g>
    </svg>
  `;
}

export function getAllProducts() {
  return [...PRODUCTS];
}

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return [...PRODUCTS];
  return PRODUCTS.filter(p => p.category.includes(category));
}
