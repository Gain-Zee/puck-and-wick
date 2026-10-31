/**
 * Puck & Wick Product Catalog Data Engine
 * Models all 10 artisan candles (7 Men's Matte Obsidian + 3 Women's Warm Frosted Ivory),
 * 3-tier olfactory scent pyramids, vessel specifications, burn times, and visual mockups.
 */

export const SCENT_CATEGORIES = [
  { id: 'all', label: 'All Pours' },
  { id: 'mens', label: "Men's Line" },
  { id: 'womens', label: "Women's Line" },
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
    tagline: 'The Flagship Pour. Crimson Saffron, Jasmine Grandiflorum & Warm Amberwood.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'signature', 'woods_rustic'],
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Inspired by top-shelf snipes and championship prestige. A radiant, hypnotic master formulation opening with crushed crimson saffron threads and bitter almond, unfolding into airy Egyptian jasmine grandiflorum and Virginia white cedar, and anchored by crystalline ambergris, fir balsam resin, and warm amberwood.',
    notes: {
      top: ['Crimson Saffron Threads', 'Bitter Almond', 'Calabrian Bergamot'],
      middle: ['Egyptian Jasmine Grandiflorum', 'Virginia White Cedar', 'Sheer Magnolia'],
      base: ['Warm Amberwood', 'Crystalline Ambergris', 'Balsam Fir Resin']
    },
    featured: true,
    vesselType: 'obsidian',
    accentColor: '#C5A059'
  },
  {
    id: 'candle-fresh-cut',
    name: 'Fresh Cut',
    tagline: '6:00 AM Zamboni Cut. Glacial Ozone, Crisp Pine & Silver Fir.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'signature', 'fresh_clean'],
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
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
    category: ['mens', 'seasonal', 'woods_rustic'],
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Gold Embossed Label',
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
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'woods_rustic'],
    genderLine: 'mens',
    genderLabel: 'MENS',
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
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'signature', 'woods_rustic'],
    genderLine: 'mens',
    genderLabel: 'MENS',
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
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'signature', 'woods_rustic'],
    genderLine: 'mens',
    genderLabel: 'MENS',
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
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'signature', 'fresh_clean'],
    genderLine: 'mens',
    genderLabel: 'MENS',
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
  },
  {
    id: 'candle-cashmere-white-tea',
    name: 'Cashmere & White Tea',
    tagline: 'Sanctuary Ivory Collection. Imperial White Tea, Spun Cashmere & Hinoki Wood.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['womens', 'signature', 'fresh_clean', 'seasonal'],
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Poured in our signature Frosted Warm Ivory & Champagne-Gold Sanctuary vessel. An enveloping, serene botanical infusion of steeped imperial white tea leaves and Sicilian bergamot zest, wrapped in spun cashmere accord, silver jasmine petals, and warm blond hinoki wood.',
    notes: {
      top: ['Imperial White Tea Leaf', 'Sicilian Bergamot Zest', 'Dewy Pear Blossom'],
      middle: ['Spun Cashmere Accord', 'Silver Jasmine Petal', 'Clary Sage'],
      base: ['Blond Hinoki Wood', 'Velvet Tonka Bean', 'Sheer Skin Musk']
    },
    featured: true,
    seasonal: false,
    vesselType: 'ivory',
    accentColor: '#E5C878'
  },
  {
    id: 'candle-velvet-vanilla-santal',
    name: 'Velvet Vanilla & Santal',
    tagline: 'Sanctuary Ivory Collection. Australian Sandalwood, Cardamom & Madagascar Vanilla.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['womens', 'signature', 'woods_rustic'],
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Poured in our Frosted Warm Ivory & Champagne-Gold Sanctuary vessel. A sensual, intoxicating balance of crushed green cardamom and warm papyrus layered over creamy Australian sandalwood heart, cured Madagascar vanilla bean pods, and golden benzoin resin.',
    notes: {
      top: ['Crushed Green Cardamom', 'Toasted Violet Leaf', 'Warm Papyrus'],
      middle: ['Australian Sandalwood Heart', 'Madagascar Vanilla Pod', 'Orris Butter'],
      base: ['Smoked Baltic Amber', 'Creamy Texas Cedarwood', 'Golden Benzoin Resin']
    },
    featured: true,
    seasonal: false,
    vesselType: 'ivory',
    accentColor: '#E5C878'
  },
  {
    id: 'candle-sea-salt-orchid',
    name: 'Sea Salt & White Orchid',
    tagline: 'Sanctuary Ivory Collection. Crystalline Sea Salt, Night Orchid & Driftwood.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['womens', 'signature', 'fresh_clean'],
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Poured in our Frosted Warm Ivory & Champagne-Gold Sanctuary vessel. A luminous, airy coastal-botanical composition pairing crystalline sea salt and ozonated mist with velvety night-blooming white orchid, wild freesia, and sun-bleached driftwood.',
    notes: {
      top: ['Crystalline Sea Salt', 'Ozonated Coastal Mist', 'Petitgrain Leaf'],
      middle: ['Night-Blooming White Orchid', 'Wild Freesia', 'Neroli Blossom'],
      base: ['Sun-Bleached Driftwood', 'Crushed Tonka Bean', 'Sheer White Amber']
    },
    featured: false,
    seasonal: false,
    vesselType: 'ivory',
    accentColor: '#E5C878'
  }
];

export const CONCEPT_CANDLE_PHOTOS = {
  1: 'assets/images/candle-obsidian.jpg',
  2: 'assets/images/candle-concept-2.jpg',
  3: 'assets/images/candle-concept-3.jpg',
  4: 'assets/images/candle-concept-4.jpg'
};

export function getCandleVesselSvg(product, conceptId) {
  const activeConcept = Number(
    conceptId ||
    (typeof window !== 'undefined' && window.PuckWickStore?.state?.activeLogoConcept) ||
    1
  );
  const isIvory = product.vesselType === 'ivory';
  const photoHref = (isIvory && activeConcept === 1)
    ? 'assets/images/candle-ivory.jpg'
    : (CONCEPT_CANDLE_PHOTOS[activeConcept] || 'assets/images/candle-obsidian.jpg');
  const vignetteId = `vessel-vig-${product.id}`;
  const subSpecText = isIvory ? '10 OZ FROSTED IVORY • 100% AMERICAN SOY' : '10 OZ • 100% AMERICAN SOY';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" style="width:100%;height:100%;display:block;" class="candle-vessel-svg" data-active-concept="${activeConcept}" aria-label="${product.name} Luxury Candle Jar (Concept ${activeConcept})" role="img">
      <defs>
        <linearGradient id="${vignetteId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#08090C" stop-opacity="0.08" />
          <stop offset="72%" stop-color="#08090C" stop-opacity="0" />
          <stop offset="100%" stop-color="#08090C" stop-opacity="0.92" />
        </linearGradient>
      </defs>

      <!-- Full-Bleed Studio Candle Photography (No Pasted Vector Sticker Over the Jar) -->
      <image href="${photoHref}" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
      <rect x="0" y="0" width="400" height="400" fill="url(#${vignetteId})" />

      <!-- Minimalist Scent Name Plate at Bottom of Card View -->
      <rect x="40" y="338" width="320" height="44" rx="4" fill="rgba(11, 12, 14, 0.88)" stroke="rgba(197, 160, 89, 0.6)" stroke-width="1" />
      <text x="200" y="358" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="15.5" font-weight="600" letter-spacing="2.8" fill="#FAF5E8">${product.name.toUpperCase()}</text>
      <text x="200" y="373" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="500" letter-spacing="2.4" fill="#C5A059">${subSpecText}</text>
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
