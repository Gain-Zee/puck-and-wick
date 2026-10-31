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
  const jarGradientId = `jar-grad-${product.id}`;
  const lidGradientId = `lid-grad-${product.id}`;
  const flameGradientId = `flame-grad-${product.id}`;
  const waxGradientId = `wax-grad-${product.id}`;

  const jarColorStart = isAmber ? '#451A03' : '#1F2937';
  const jarColorMid = isAmber ? '#78350F' : '#111827';
  const jarColorEnd = isAmber ? '#291003' : '#0B0F19';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 320" class="candle-vessel-svg" aria-label="${product.name} Luxury Candle Jar" role="img">
      <defs>
        <linearGradient id="${jarGradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${jarColorStart}" />
          <stop offset="40%" stop-color="${jarColorMid}" />
          <stop offset="85%" stop-color="${jarColorEnd}" />
          <stop offset="100%" stop-color="#050507" />
        </linearGradient>
        <linearGradient id="${lidGradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#997732" />
          <stop offset="35%" stop-color="#F5D77F" />
          <stop offset="55%" stop-color="#D4AF37" />
          <stop offset="80%" stop-color="#C5A059" />
          <stop offset="100%" stop-color="#7B5B20" />
        </linearGradient>
        <radialGradient id="${flameGradientId}" cx="50%" cy="70%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="25%" stop-color="#FEF08A" />
          <stop offset="60%" stop-color="#F59E0B" />
          <stop offset="90%" stop-color="#D97706" />
          <stop offset="100%" stop-color="#78350F" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="${waxGradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FAF5E8" />
          <stop offset="100%" stop-color="#E7DECD" />
        </linearGradient>
        <filter id="glow-${product.id}" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Soft Ambient Glow behind Flame -->
      <circle cx="140" cy="85" r="45" fill="#F59E0B" opacity="0.22" filter="url(#glow-${product.id})" />

      <!-- Burning Cotton Wick & Flame -->
      <path d="M 140,82 C 126,68 112,46 122,25 C 130,10 138,0 140,-5 C 142,0 150,10 158,25 C 168,46 154,68 140,82 Z" fill="url(#${flameGradientId})" transform="translate(0, 18)" />
      <path d="M 140,80 C 132,70 124,56 129,42 C 133,32 138,20 140,16 C 142,20 147,32 151,42 C 156,56 148,70 140,80 Z" fill="#FFFDF0" opacity="0.9" transform="translate(0, 18)" />
      <!-- Cotton Wick -->
      <line x1="140" y1="96" x2="140" y2="114" stroke="#1C1917" stroke-width="3" stroke-linecap="round" />

      <!-- Candle Glass Vessel Body -->
      <!-- Top Wax Pool Ellipse -->
      <ellipse cx="140" cy="115" rx="76" ry="16" fill="url(#${waxGradientId})" stroke="#C5A059" stroke-width="1.2" opacity="0.95" />
      
      <!-- Tumbler Glass Body -->
      <path d="M 64,115 C 64,108 80,102 140,102 C 200,102 216,108 216,115 L 208,272 C 208,284 180,292 140,292 C 100,292 72,284 72,272 Z" fill="url(#${jarGradientId})" stroke="#C5A059" stroke-width="1.5" />
      
      <!-- Glass Rim Highlight -->
      <ellipse cx="140" cy="115" rx="76" ry="14" fill="none" stroke="url(#${lidGradientId})" stroke-width="2" opacity="0.8" />

      <!-- Luxury Label Plate on Jar Front -->
      <rect x="88" y="152" width="104" height="96" rx="4" fill="#0C0D10" stroke="#C5A059" stroke-width="1.2" />
      <rect x="92" y="156" width="96" height="88" rx="2" fill="none" stroke="#C5A059" stroke-width="0.75" stroke-dasharray="3,2" opacity="0.7" />
      
      <!-- Label Typography -->
      <text x="140" y="174" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="11" font-weight="700" letter-spacing="2.5" fill="#C5A059">PUCK &amp; WICK</text>
      <line x1="108" y1="180" x2="172" y2="180" stroke="#C5A059" stroke-width="0.8" opacity="0.7" />
      <text x="140" y="196" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="13" font-weight="700" letter-spacing="1" fill="#FAF5E8">${product.name.toUpperCase()}</text>
      <text x="140" y="212" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7" font-weight="600" letter-spacing="1.5" fill="#C5A059">10 OZ • PURE SOY</text>
      <text x="140" y="226" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.5" font-weight="500" letter-spacing="1" fill="#9CA3AF">LOUDOUN CO. VA</text>
      <text x="140" y="238" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6" font-weight="600" letter-spacing="1" fill="#D4AF37">QC #1 CERTIFIED</text>

      <!-- Glass Base Rim Bottom Arc -->
      <ellipse cx="140" cy="272" rx="68" ry="12" fill="none" stroke="#C5A059" stroke-width="1" opacity="0.4" />
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
