/**
 * Puck & Wick Product Catalog Data Engine
 * Models all 10 artisan candles (7 Men's Matte Obsidian + 3 Women's Warm Frosted Ivory),
 * Unified 3.0" & 2.0" ZeoCarb-98™ Odor Pucks, 8 oz Body Washes,
 * 3-tier olfactory scent pyramids, vessel specifications, burn times, and visual mockups.
 */

export const SCENT_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'mens', label: "Men's Collection" },
  { id: 'womens', label: "Women's Sanctuary" },
  { id: 'candles', label: 'Soy Candles ($44)' },
  { id: 'odor_care', label: 'ZeoCarb-98™ Odor Pucks & Body Care' },
  { id: 'exclusive_boxes', label: 'Deluxe Collector Boxes ($108)' }
];

export const PRODUCTS = [
  {
    id: 'candle-top-shelf',
    name: 'Top Shelf',
    tagline: 'The Flagship Pour. Crimson Saffron, Jasmine Grandiflorum & Warm Amberwood.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Inspired by top-shelf snipes and championship prestige. A radiant, hypnotic master formulation opening with crushed crimson saffron threads and bitter almond, unfolding into airy Egyptian jasmine grandiflorum and Virginia white cedar, and anchored by crystalline ambergris, fir balsam resin, and warm amberwood.',
    notes: {
      top: ['Crimson Saffron Threads', 'Bitter Almond', 'Calabrian Bergamot'],
      middle: ['Egyptian Jasmine Grandiflorum', 'Virginia White Cedar', 'Sheer Magnolia'],
      base: ['Warm Amberwood', 'Crystalline Ambergris', 'Balsam Fir Resin']
    },
    featured: true,
    vesselType: 'obsidian',
    photo: 'assets/images/packaging/shelf-candle-top-shelf.jpg',
    accentColor: '#C5A059'
  },
  {
    id: 'candle-fresh-cut',
    name: 'Fresh Cut',
    tagline: '6:00 AM Zamboni Cut. Italian Bergamot, Hinoki Wood, Eucalyptus & Vetiver.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'signature', 'fresh_clean', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'That sacred stillness when you step onto fresh sheet ice at 6:00 AM. Bright Italian bergamot and crisp grapefruit zest cut into sacred Japanese hinoki wood and frosted eucalyptus leaf, grounded by smoky earthy vetiver, warm amber, and sunlit orange blossom.',
    notes: {
      top: ['Italian Bergamot', 'Grapefruit Zest', 'Frosted Eucalyptus'],
      middle: ['Japanese Hinoki Wood', 'Crushed Cypress', 'Sunlit Orange Blossom'],
      base: ['Smoky Earthy Vetiver', 'Warm Amber Resin', 'White Cedarwood']
    },
    featured: true,
    vesselType: 'amber',
    photo: 'assets/images/packaging/shelf-candle-fresh-cut.jpg',
    accentColor: '#88D1F1'
  },
  {
    id: 'candle-balsam-fir',
    name: 'Balsam Fir',
    tagline: 'Loudoun Valley Mountain Winter. Blue Ridge Balsam & Spiced Cypress.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'seasonal', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
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
    photo: 'assets/images/packaging/shelf-candle-balsam-fir.jpg',
    accentColor: '#3B7A57'
  },
  {
    id: 'candle-barnwood-bourbon',
    name: 'Barnwood & Bourbon',
    tagline: 'Historic Virginia Homestead. Weathered Oak & Small-Batch Rye.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'The scent of an authentic 19th-century Virginia barn workshop where hand-hewn oak rafters have absorbed decades of sweet woodsmoke, enriched by small-batch rye bourbon, burnt brown sugar, and toasted tonka.',
    notes: {
      top: ['Small-Batch Rye Bourbon', 'Toasted Pecan', 'Orange Peel'],
      middle: ['Weathered Barnwood Oak', 'Scorched Cedar', 'Burnt Maple'],
      base: ['Warm Amber Resin', 'Smoky Vetiver', 'Aged Vanilla']
    },
    featured: false,
    vesselType: 'obsidian',
    photo: 'assets/images/packaging/shelf-candle-barnwood-bourbon.jpg',
    accentColor: '#966034'
  },
  {
    id: 'candle-rinkside-cedar-smoke',
    name: 'Rinkside Cedar & Smoke',
    tagline: 'Hockey Heritage / Woods. Cedar Benches & Campfire Embers.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'The aromatic nostalgia of an outdoor pond hockey game followed by an open-fire tailgate. Aromatic red cedar boards, oiled leather glove patina, and crackling birchwood smoke softened by dark resinous musk.',
    notes: {
      top: ['Chilled Winter Air', 'Birchwood Smoke', 'Crushed Black Pepper'],
      middle: ['Atlas Cedarwood', 'Oiled Glove Leather', 'Wild Sage'],
      base: ['Charred Oak Embers', 'Incense Resin', 'Earthy Vetiver Root']
    },
    featured: false,
    vesselType: 'obsidian',
    photo: 'assets/images/packaging/shelf-candle-rinkside-cedar-smoke.jpg',
    accentColor: '#C5A059'
  },
  {
    id: 'candle-warm-amber-vanilla',
    name: 'Warm Amber & Vanilla Bean',
    tagline: 'Unapologetic Hearthside Warmth. Baltic Amber & Madagascar Vanilla.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Rich, sensual, and universally appealing. Rich golden Baltic amber layered with cracked Madagascar vanilla pods, warm cashmere musk, and subtle benzoin resin that fills the room with comforting elegance.',
    notes: {
      top: ['Golden Bergamot', 'French Vanilla Cream'],
      middle: ['Baltic Amber', 'Cashmere Musk', 'Spiced Tonka Bean'],
      base: ['Madagascar Vanilla Bean', 'Warm Benzoin', 'Cedar']
    },
    featured: false,
    vesselType: 'obsidian',
    photo: 'assets/images/packaging/shelf-candle-warm-amber-vanilla.jpg',
    accentColor: '#E6A15C'
  },
  {
    id: 'candle-locker-room-mint',
    name: 'Locker Room Mint & Eucalyptus',
    tagline: 'Post-Game Oxygen Shot. Tasmanian Eucalyptus & Crushed Spearmint.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'candles', 'signature', 'fresh_clean'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Gold Metal Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'Engineered to wipe away mental fatigue and stale room air. A high-voltage surge of pure Tasmanian eucalyptus globulus, crushed garden spearmint, clary sage, and crisp mountain mineral salt.',
    notes: {
      top: ['Crushed Spearmint', 'Icy Peppermint Leaf', 'Lemon Rind'],
      middle: ['Blue Gum Eucalyptus', 'Clary Sage', 'Tea Tree Leaves'],
      base: ['Crisp Mountain Salt', 'White Pine', 'Clean Cedar']
    },
    featured: false,
    vesselType: 'obsidian',
    photo: 'assets/images/packaging/shelf-candle-locker-room-mint.jpg',
    accentColor: '#34D399'
  },
  {
    id: 'candle-cashmere-white-tea',
    name: 'Cashmere & White Tea',
    tagline: 'Sanctuary Ivory Collection. Imperial White Tea, Spun Cashmere & Hinoki Wood.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'candles', 'signature', 'fresh_clean', 'seasonal'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
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
    photo: 'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg',
    accentColor: '#E5C878'
  },
  {
    id: 'candle-velvet-vanilla-santal',
    name: 'Velvet Vanilla & Santal',
    tagline: 'Sanctuary Ivory Collection. Australian Sandalwood, Cardamom & Madagascar Vanilla.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
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
    photo: 'assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg',
    accentColor: '#E5C878'
  },
  {
    id: 'candle-sea-salt-orchid',
    name: 'Sea Salt & White Orchid',
    tagline: 'Sanctuary Ivory Collection. Crystalline Sea Salt, Night Orchid & Driftwood.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'candles', 'signature', 'fresh_clean'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '10 oz Vessel (8.5 oz Fill)',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass (8.5 oz / 240g Net Soy Fill) with Unbranded Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + ZeoCarb-98™ Vapor Complex',
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
    photo: 'assets/images/packaging/shelf-candle-sea-salt-orchid.jpg',
    accentColor: '#E5C878'
  },
  {
    id: 'puck-mens-athlete',
    name: 'The 3.0" ZeoCarb-98™ Odor Puck',
    tagline: 'Universal Matte Obsidian & Brushed Champagne-Gold CNC Hardware. Covers up to 120 Sq. Ft. with 3-Axis Omni-Directional Airflow (No Upside Down).',
    price: 48.00,
    formattedPrice: '$48.00',
    category: ['mens', 'womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'unisex',
    genderLabel: 'HIS & HERS',
    specUnitLabel: '1x 3.0" Puck • Up to 120 Sq. Ft.',
    includedSummary: 'SOLD INDIVIDUALLY • Includes 1x Full-Size 3.0" Matte Obsidian-Black & Brushed Champagne-Gold Odor Puck (40g ZeoCarb-98™ + Carbon Core) housed inside a Compact 4.2" × 4.2" Matte-Black Magnetic Front-Flap Collector Box. Covers up to 120 Sq. Ft. with 3-Axis Omni-Directional Airflow (No Upside Down).',
    burnTime: 'Up to 120 Sq. Ft. • 6+ Mos',
    weightOz: 4,
    vessel: '1x 3.0" Matte Obsidian-Black Center & Brushed Champagne-Gold Knurled Anodized Aluminum Disc + 4.2" Magnetic Flap Box',
    wax: 'Sub-2nm Coconut Charcoal (>1,000 m²/g) + ZeoCarb-98™ Molecular Core (40g Fill)',
    wick: '3-Axis Omni-Directional Airflow (Top, Bottom & 360° Perimeter Vents — No Upside Down)',
    description: 'Engineered in one iconic unisex hardware colorway—Matte Obsidian-Black center face with a CNC-knurled Brushed Champagne-Gold perimeter ring—built to look timeless inside a pro hockey locker stall, a gym duffel, a quilted yoga tote, or a luxury walk-in closet. Powered by sub-2nm activated coconut carbon (>1,000 m²/g) and our proprietary ZeoCarb-98™ molecular core, each 3.0" puck covers up to 120 Sq. Ft. of open-air space. Symmetrical 3-Axis Omni-Directional Venting across the top, bottom, and 360° side wall means there is no upside down—drop it into any bag or shelf and it breathes continuously.',
    notes: {
      top: ['Covers Up to 120 Sq. Ft. Open Air', '3-Axis Airflow (No Upside Down)', 'Zero Masking Perfumes'],
      middle: ['ZeoCarb-98™ Vapor-Phase Complex', 'Sub-2nm Coconut Carbon (>1,000 m²/g)'],
      base: ['Locker Stalls, Hockey Bags, Yoga Totes & Closets', 'Includes 4.2" Magnetic Front-Flap Box']
    },
    featured: true,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-puck-men.jpg',
    subSpecText: 'UP TO 120 SQ. FT. • 3-AXIS AIRFLOW (NO UPSIDE DOWN)',
    waxSpecSub: '1x 3.0" Puck + Magnetic Box',
    accentColor: '#C5A059'
  },
  {
    id: 'puck-mini-pair',
    name: 'The 2.0" ZeoCarb-98™ Mini Odor Pucks (Set of 2)',
    tagline: '2.0" Compact Twin-Pack in Magnetic Flap Box. Covers up to 40 Sq. Ft. for Skates, Hockey Gloves & Footwear (No Upside Down).',
    price: 38.00,
    formattedPrice: '$38.00',
    category: ['mens', 'womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'unisex',
    genderLabel: 'HIS & HERS',
    specUnitLabel: 'Set of 2 (2.0" Mini Pucks)',
    includedSummary: 'SOLD AS A 2-PUCK TWIN-PACK • Includes 2x Compact 2.0" (50mm) Matte Obsidian & Brushed Champagne-Gold Mini Pucks (2x 18g ZeoCarb-98™ + Carbon Core) inside a Sleek All-Black Magnetic Front-Flap Collector Box. Covers up to 40 Sq. Ft. with 3-Axis Omni-Directional Airflow (No Upside Down).',
    burnTime: 'Up to 40 Sq. Ft. • 6+ Mos',
    weightOz: 3,
    vessel: '2x Compact 2.0" (50mm) Matte Obsidian & Brushed Champagne-Gold Anodized Aluminum Discs + Magnetic Flap Box',
    wax: 'Sub-2nm Coconut Charcoal (>1,000 m²/g) + ZeoCarb-98™ Core (2x 18g Targeted Fill)',
    wick: 'Dual 3-Axis Omni-Directional Vent Arrays (72 Micro-Ports + 8 Side Slots Each — No Upside Down)',
    description: 'While our 3.0" Puck treats up to 120 Sq. Ft. across your locker stall, closet, or gear bag, skates, hockey gloves, and athletic footwear trap moisture and bacteria deep inside narrow cuffs and toe boxes. This compact 2.0" Twin-Pack slides effortlessly into left and right skates, hockey gloves, cleats, or sneakers—delivering up to 40 Sq. Ft. of targeted ZeoCarb-98™ + Activated Carbon molecular odor destruction with 3-Axis Omni-Directional Airflow (no upside down).',
    notes: {
      top: ['Covers Up to 40 Sq. Ft. Targeted Space', '3-Axis Airflow (No Upside Down)', 'Zero Masking Perfumes'],
      middle: ['ZeoCarb-98™ Vapor-Phase Complex', 'Sub-2nm Activated Coconut Carbon (>1,000 m²/g)'],
      base: ['Fits Left & Right Skates, Gloves & Sneakers', 'Includes Sleek Black Magnetic Flap Box']
    },
    featured: true,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-mini-pucks-pair.jpg',
    subSpecText: 'SET OF 2 (2.0" DISCS) • UP TO 40 SQ. FT. • MAGNETIC BOX',
    waxSpecSub: '2x 2.0" Mini Pucks + Box',
    accentColor: '#C5A059'
  },
  {
    id: 'wash-mens-charcoal',
    name: 'Athlete Charcoal & ZeoCarb-98™ Body Wash',
    tagline: 'Single 8 fl oz Post-Rink Detox Gel Pump Bottle. Activated Binchotan Charcoal & Blue Eucalyptus.',
    price: 38.00,
    formattedPrice: '$38.00',
    category: ['mens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '1x 8 fl oz Wash (Single)',
    includedSummary: 'SOLD INDIVIDUALLY • Includes 1x Full-Size 8 fl oz (236 mL) Athlete Charcoal & ZeoCarb-98™ Body Wash Pump Bottle. Standalone single item — does not include candle or odor puck.',
    burnTime: '8 fl oz (236 mL)',
    weightOz: 8,
    vessel: '1x 8 oz Matte-Black Apothecary Bottle with Lockable Brushed-Gold Dispenser Pump',
    wax: 'Activated Binchotan Charcoal + ZeoCarb-98™ Molecular Deodorizer',
    wick: 'Sulfate-Free, Phthalate-Free Botanical Gel Base',
    description: 'Sold individually as a standalone 8 fl oz full-size pump bottle formulated specifically to strip deep-seated locker-room sweat, equipment bacteria, and rink grime without drying skin. Activated binchotan charcoal draws impurities from pores while our proprietary ZeoCarb-98™ complex and cold-pressed blue eucalyptus eliminate post-game odor on contact.',
    notes: {
      top: ['Cold-Pressed Blue Eucalyptus', 'Crushed Peppermint', 'Alpine Juniper'],
      middle: ['Activated Binchotan Charcoal', 'Black Spruce Needle', 'Rosemary Leaf'],
      base: ['Atlas Cedarwood', 'Earthy Vetiver', 'ZeoCarb-98™ Skin Deodorizer']
    },
    featured: false,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-bodywash-men.jpg',
    subSpecText: 'SINGLE 8 FL OZ PUMP BOTTLE • BINCHOTAN + ZEOCARB-98™',
    waxSpecSub: '1x 8 oz Body Wash Only',
    accentColor: '#C5A059'
  },
  {
    id: 'mist-womens-linen',
    name: 'Sanctuary White Clay & Silk Body Wash',
    tagline: 'Single 8 fl oz Luxury Spa Gel Pump Bottle. Kaolin White Clay, Spun Silk Amino Acids, White Tea & ZeoCarb-98™.',
    price: 38.00,
    formattedPrice: '$38.00',
    category: ['womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '1x 8 fl oz Wash (Single)',
    includedSummary: 'SOLD INDIVIDUALLY • Includes 1x Full-Size 8 fl oz (236 mL) Sanctuary White Clay & Silk Body Wash Pump Bottle in Frosted Warm Alabaster-Ivory & Brushed Champagne-Gold. Standalone single item — does not include candle or odor puck.',
    burnTime: '8 fl oz (236 mL)',
    weightOz: 8,
    vessel: '1x 8 oz Frosted Warm Alabaster-Ivory Apothecary Bottle with Lockable Brushed Champagne-Gold Dispenser Pump',
    wax: 'Kaolin White Clay + Hydrolyzed Silk Amino Acids + ZeoCarb-98™ Botanical Deodorizer',
    wick: 'Sulfate-Free, Paraben-Free Velvety Lather Gel Base',
    description: 'Sold individually as a standalone 8 fl oz luxury pump bottle crafted in our Frosted Warm Alabaster-Ivory & Brushed Champagne-Gold Sanctuary finish. Mineral-rich Kaolin white clay gently purifies skin after hot yoga, Pilates, or training while hydrolyzed silk amino acids, imperial white tea, and our proprietary ZeoCarb-98™ botanical complex leave skin velvety-soft, hydrated, and 100% odor-free.',
    notes: {
      top: ['Imperial White Tea Leaf', 'Sicilian Bergamot Zest', 'French Lavender Dew'],
      middle: ['Kaolin White Clay', 'Hydrolyzed Silk Amino Acids', 'Silver Jasmine Petal'],
      base: ['Blond Hinoki Wood', 'Creamy Santal', 'ZeoCarb-98™ Botanical Skin Deodorizer']
    },
    featured: true,
    seasonal: false,
    vesselType: 'ivory',
    photo: 'assets/images/item-bodywash-women.jpg',
    subSpecText: 'SINGLE 8 FL OZ PUMP BOTTLE • WHITE CLAY + ZEOCARB-98™',
    waxSpecSub: '1x 8 oz Body Wash Only',
    accentColor: '#E5C878'
  }
];

export const CONCEPT_CANDLE_PHOTOS = {
  1: 'assets/images/packaging/shelf-candle-top-shelf.jpg',
  2: 'assets/images/candle-concept-2.jpg',
  3: 'assets/images/candle-concept-3.jpg',
  4: 'assets/images/candle-concept-4.jpg'
};

export function getCandleVesselSvg(product, conceptId, isModal = false) {
  const activeConcept = Number(
    conceptId ||
    (typeof window !== 'undefined' && window.PuckWickStore?.state?.activeLogoConcept) ||
    1
  );
  const isIvory = product.vesselType === 'ivory';
  const photoHref = product.photo
    ? product.photo
    : (isIvory && activeConcept === 1)
      ? 'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg'
      : (CONCEPT_CANDLE_PHOTOS[activeConcept] || 'assets/images/packaging/shelf-candle-top-shelf.jpg');

  if (isModal) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="width:100%;height:100%;display:block;" class="candle-vessel-svg" data-active-concept="${activeConcept}" aria-label="${product.name} Luxury Presentation (Concept ${activeConcept})" role="img">
        <rect x="0" y="0" width="400" height="400" fill="#08090C" />
        <image href="${photoHref}" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid meet" />
      </svg>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="width:100%;height:100%;display:block;" class="candle-vessel-svg" data-active-concept="${activeConcept}" aria-label="${product.name} Luxury Presentation (Concept ${activeConcept})" role="img">
      <rect x="0" y="0" width="400" height="400" fill="#08090C" />
      <image href="${photoHref}" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid meet" />
    </svg>
  `;
}

export function getProductGallerySlides(product, conceptId = 1) {
  const isIvory = product.vesselType === 'ivory';
  const primaryPhoto = product.photo
    ? product.photo
    : (isIvory && Number(conceptId) === 1)
      ? 'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg'
      : (CONCEPT_CANDLE_PHOTOS[Number(conceptId)] || 'assets/images/packaging/shelf-candle-top-shelf.jpg');

  if (!product.productType || product.productType === 'candle') {
    const atelierCardImg = product.vesselType === 'ivory'
      ? 'assets/images/packaging/atelier-card-ivory.jpg?v=61'
      : 'assets/images/packaging/atelier-card-obsidian.jpg?v=61';
    const shelfImg = `assets/images/packaging/shelf-${product.id}.jpg?v=61`;
    return [
      {
        id: 'shelf',
        shortLabel: 'Vessel & Box',
        title: `${product.name} — Unlit 10 oz Soy Vessel (8.5 oz Fill), Brushed Brass Lid & Rigid Two-Piece Collector Box`,
        type: 'image',
        src: shelfImg,
        thumb: shelfImg
      },
      {
        id: 'atelier_card',
        shortLabel: 'Atelier Card',
        title: `${product.name} — Included 3.5"×3.5" Square Atelier Card (Story, QC #1 & Burn Ritual)`,
        type: 'image',
        src: atelierCardImg,
        thumb: atelierCardImg
      }
    ];
  }

  if (product.id === 'puck-mini-pair') {
    return [
      {
        id: 'primary',
        shortLabel: 'Pair',
        title: 'The 2.0" ZeoCarb-98™ Mini Odor Pucks (Set of 2) — Covers Up to 40 Sq. Ft.',
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'box_open',
        shortLabel: 'Open Box',
        title: 'Dual-Cavity Matte-Black Magnetic Front-Flap Collector Box (Open Presentation)',
        type: 'image',
        src: 'assets/images/packaging/puck-mini-pair-box.jpg?v=52',
        thumb: 'assets/images/packaging/puck-mini-pair-box.jpg?v=52'
      },
      {
        id: 'box_closed',
        shortLabel: 'Box Closed',
        title: 'Sleek All-Black Magnetic Front-Flap Collector Box (Closed)',
        type: 'image',
        src: 'assets/images/packaging/puck-mini-pair-box-closed.jpg?v=52',
        thumb: 'assets/images/packaging/puck-mini-pair-box-closed.jpg?v=52'
      },
      {
        id: 'step1',
        shortLabel: 'Palm',
        title: 'Step 01 • Compact 2.0" (50mm) Open-Palm Scale (3-Axis Airflow — No Upside Down)',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-1.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-1.jpg'
      },
      {
        id: 'step2',
        shortLabel: 'Glove',
        title: 'Step 02 • Drop Straight Into Hockey Glove Wrist Cuff Opening',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-2.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-2.jpg'
      },
      {
        id: 'step3',
        shortLabel: 'Skate',
        title: 'Step 03 • Drop Into Skate Boot or Athletic Sneaker Overnight',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-3.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-3.jpg'
      }
    ];
  }

  if (product.id === 'puck-mens-athlete') {
    return [
      {
        id: 'primary',
        shortLabel: 'Puck',
        title: 'The 3.0" ZeoCarb-98™ Odor Puck — Universal Matte Obsidian & Brushed Champagne-Gold Hardware',
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'box_open',
        shortLabel: 'Open Box',
        title: 'Compact 4.2" × 4.2" Magnetic Front-Flap Collector Box (Open Presentation)',
        type: 'image',
        src: 'assets/images/packaging/puck-men-box.jpg?v=52',
        thumb: 'assets/images/packaging/puck-men-box.jpg?v=52'
      },
      {
        id: 'box_closed',
        shortLabel: 'Box Closed',
        title: 'Compact 4.2" × 4.2" Matte-Black Magnetic Front-Flap Collector Box (Closed)',
        type: 'image',
        src: 'assets/images/packaging/puck-men-box-closed.jpg?v=52',
        thumb: 'assets/images/packaging/puck-men-box-closed.jpg?v=52'
      },
      {
        id: 'angled_open',
        shortLabel: 'Stall',
        title: 'Pro Locker Stall — Covers Up to 120 Sq. Ft. Open-Air Gear Neutralization',
        type: 'image',
        src: 'assets/images/packaging/puck-men-angled-open.jpg?v=52',
        thumb: 'assets/images/packaging/puck-men-angled-open.jpg?v=52'
      },
      {
        id: 'gym_bag',
        shortLabel: 'Hockey Bag',
        title: 'Drop Directly Into Hockey or Gym Duffel Bag (3-Axis Airflow — No Upside Down)',
        type: 'image',
        src: 'assets/images/packaging/puck-men-gym-bag.jpg?v=52',
        thumb: 'assets/images/packaging/puck-men-gym-bag.jpg?v=52'
      },
      {
        id: 'yoga_bag',
        shortLabel: 'Yoga Tote',
        title: 'Tuck Into Women’s Quilted Yoga, Pilates, or Workout Tote Bag',
        type: 'image',
        src: 'assets/images/packaging/puck-women-yoga-bag.jpg?v=52',
        thumb: 'assets/images/packaging/puck-women-yoga-bag.jpg?v=52'
      },
      {
        id: 'closet',
        shortLabel: 'Closet',
        title: 'Walk-In Closet, Sneaker Shelf & Mudroom Protection',
        type: 'image',
        src: 'assets/images/packaging/puck-women-closet.jpg?v=52',
        thumb: 'assets/images/packaging/puck-women-closet.jpg?v=52'
      }
    ];
  }

  if (product.id === 'wash-mens-charcoal') {
    return [
      {
        id: 'primary',
        shortLabel: 'Bottle',
        title: '8 fl oz Athlete Charcoal & ZeoCarb-98™ Body Wash — Individual Pump Bottle',
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'shower',
        shortLabel: 'Shower',
        title: '8 fl oz Athlete Body Wash — Post-Game Binchotan Charcoal & Blue Eucalyptus Gel',
        type: 'image',
        src: 'assets/images/packaging/wash-men-shower.jpg',
        thumb: 'assets/images/packaging/wash-men-shower.jpg'
      },
      {
        id: 'locker_towel',
        shortLabel: 'Locker',
        title: '8 fl oz Athlete Body Wash — Built for Locker Room & Post-Workout Recovery',
        type: 'image',
        src: 'assets/images/packaging/wash-men-gym-towel.jpg',
        thumb: 'assets/images/packaging/wash-men-gym-towel.jpg'
      }
    ];
  }

  if (product.id === 'mist-womens-linen' || product.id === 'wash-womens-sanctuary') {
    return [
      {
        id: 'primary',
        shortLabel: 'Bottle',
        title: '8 fl oz Sanctuary White Clay & Silk Body Wash — Frosted Ivory & Champagne-Gold Pump Bottle',
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'shower',
        shortLabel: 'Shower',
        title: '8 fl oz Sanctuary Body Wash — Post-Pilates & Spa Shower Ritual',
        type: 'image',
        src: 'assets/images/packaging/wash-women-shower.jpg?v=52',
        thumb: 'assets/images/packaging/wash-women-shower.jpg?v=52'
      },
      {
        id: 'vanity',
        shortLabel: 'Vanity',
        title: '8 fl oz Sanctuary Body Wash — Warm Travertine Marble Vanity Presentation',
        type: 'image',
        src: 'assets/images/packaging/wash-women-vanity.jpg?v=52',
        thumb: 'assets/images/packaging/wash-women-vanity.jpg?v=52'
      }
    ];
  }

  // Fallback for any other individual Odor Care item
  return [
    {
      id: 'primary',
      shortLabel: 'Studio',
      title: `${product.name} — Individual Standalone Item`,
      type: 'svg',
      thumb: primaryPhoto
    }
  ];
}

export function getInteractive360BoxHtml(product, mode = 'card') {
  const isIvory = product.vesselType === 'ivory';
  const scentName = (product.name || 'TOP SHELF').toUpperCase();
  const topNote = product.notes?.top?.[0] || 'Bergamot';
  const midNote = product.notes?.middle?.[0] || 'Hinoki Wood';
  const baseNote = product.notes?.base?.[0] || 'Amberwood';
  const notesLine = `${topNote} • ${midNote} • ${baseNote}`;
  const themeClass = isIvory ? 'box360-ivory' : 'box360-obsidian';
  const isModalOrLightbox = mode === true || mode === 'modal' || mode === 'lightbox';
  const sizeClass = mode === 'lightbox' ? 'box360-lightbox' : isModalOrLightbox ? 'box360-modal' : 'box360-card';
  const kickerText = product.seasonal
    ? 'SEASONAL COLLAB • BATCH #098'
    : isIvory
      ? 'SANCTUARY SCENT • BATCH #098'
      : 'SIGNATURE SCENT • BATCH #098';
  const strokeColor = isIvory ? '#8C6624' : '#E5C878';

  return `
    <div class="box360-stage ${themeClass} ${sizeClass}" data-box360-root="${product.id}">
      <div class="box360-top-hud">
        <span class="box360-badge">↻ Hold &amp; Drag to Rotate • Release for Calm Levitating Spin</span>
        ${isModalOrLightbox ? `
          <div class="box360-angle-pills" role="group" aria-label="Rotate box to specific side">
            <button type="button" class="box360-angle-btn active" data-box360-angle="auto">Levitating Spin</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="0">01 Front</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-90">02 Side Band</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-180">03 Back Stamp</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-270">04 Matte Side</button>
          </div>
        ` : ''}
      </div>

      <div class="box360-scene" data-box360-drag-zone>
        <div class="box360-levitate-wrapper">
          <div class="box360-turntable" data-box360-turntable>
          <!-- FACE 01: FRONT CREST (EXACT STICKS & FLAME MARK) + SCENT CORNER BAND -->
          <div class="box360-face face-front">
            <div class="box360-lid">
              <div class="box360-qc-seal">
                <span>QC #1 SEAL</span>
                <small>VA POUR</small>
              </div>
            </div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body">
              <div class="box360-crest-frame box360-crest-clean">
                <svg class="box360-sticks-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M 28,36 L 90,94 L 104,88.5" fill="none" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M 92,36 L 30,94 L 16,88.5" fill="none" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M 60,54 C 53,45 50,33 56,22 C 59,17 60,13 60,10 C 60,13 61,17 64,22 C 70,33 67,45 60,54 Z" fill="${strokeColor}" />
                  <path d="M 60,50 C 57,44 56,37 58.5,31 C 60,28 60.5,28 61.5,31 C 64,37 63,44 60,50 Z" fill="${isIvory ? '#FAF5EB' : '#0B0C0E'}" opacity="0.5" />
                </svg>
                <div class="box360-crest-brand">PUCK &amp; WICK</div>
                <div class="box360-crest-origin" style="font-family:'Inter',sans-serif;font-size:6.5px;font-weight:600;letter-spacing:2px;color:${strokeColor};margin-top:3px;text-align:center;">LOUDOUN COUNTY, VA</div>
                <div class="box360-crest-usa" style="font-family:'Inter',sans-serif;font-size:5.8px;font-weight:600;letter-spacing:2.8px;color:${strokeColor};opacity:0.88;margin-top:1px;text-align:center;">USA</div>
              </div>
              <div class="box360-scent-band band-front">
                <span class="band-kicker">${kickerText}</span>
                <strong class="band-scent">${scentName}</strong>
                <span class="band-notes">${notesLine}</span>
              </div>
            </div>
          </div>

          <!-- FACE 02: SIDE PANEL (PRISTINE MATTE UPPER WALL + WRAPPED SCENT BAND ONLY) -->
          <div class="box360-face face-right">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel">
              <div class="box360-scent-band band-right">
                <span class="band-kicker">10 OZ VESSEL (8.5 OZ / 240G FILL)</span>
                <strong class="band-scent">${scentName}</strong>
                <span class="band-notes">QC #1 CERTIFIED • VA POUR</span>
              </div>
            </div>
          </div>

          <!-- FACE 03: BACK PANEL (QUIET LUXURY STAMP: EST. • 2026 • PURCELLVILLE, VA) -->
          <div class="box360-face face-back">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel">
              <div class="box360-minimal-back-stamp">
                <strong>EST. &bull; 2026 &bull; PURCELLVILLE, VA</strong>
                <span>SMALL-BATCH AMERICAN SOY</span>
              </div>
            </div>
          </div>

          <!-- FACE 04: PRISTINE MATTE SIDE PANEL (ZERO CLUTTER) -->
          <div class="box360-face face-left">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel"></div>
          </div>

          <!-- TOP LID ROOF -->
          <div class="box360-face face-top">
            <div class="top-monogram">P &amp; W</div>
          </div>
          </div>
        </div>
      </div>

      <div class="box360-bottom-caption">
        <span>Click &amp; Hold (or Touch &amp; Drag) to Rotate 360° • Release for Calm Levitating Spin</span>
      </div>
    </div>
  `;
}

export function attachBox360Physics(containerEl) {
  if (!containerEl) return () => {};
  const stage = containerEl.querySelector('.box360-stage') || (containerEl.classList?.contains('box360-stage') ? containerEl : null);
  if (!stage) return () => {};
  const turntable = stage.querySelector('[data-box360-turntable]');
  const dragZone = stage.querySelector('[data-box360-drag-zone]') || stage;
  const angleBtns = stage.querySelectorAll('[data-box360-angle]');
  if (!turntable) return () => {};

  let yaw = -24;
  let pitch = -8;
  let isDragging = false;
  let isAutoSpinning = true;
  let targetSnapYaw = null;
  let startX = 0;
  let startY = 0;
  let startYaw = yaw;
  let startPitch = pitch;
  let rafId = null;
  let lastTime = performance.now();

  const applyTransform = () => {
    turntable.style.transform = `rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg)`;
  };

  const tick = (now) => {
    const dt = Math.min(0.06, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    if (!isDragging) {
      if (targetSnapYaw !== null) {
        const diff = targetSnapYaw - yaw;
        yaw += diff * Math.min(1, dt * 8);
        pitch += (-8 - pitch) * Math.min(1, dt * 8);
        if (Math.abs(diff) < 0.15) {
          yaw = targetSnapYaw;
        }
        applyTransform();
      } else if (isAutoSpinning) {
        yaw -= 20 * dt;
        if (yaw <= -36000) yaw += 36000;
        pitch += (-8 - pitch) * Math.min(1, dt * 5);
        applyTransform();
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  const onPointerDown = (e) => {
    if (e.target.closest('[data-box360-angle]')) return;
    e.stopPropagation();
    isDragging = true;
    targetSnapYaw = null;
    startX = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    startY = e.clientY ?? (e.touches?.[0]?.clientY || 0);
    startYaw = yaw;
    startPitch = pitch;
    stage.classList.add('is-dragging');
    if (dragZone.setPointerCapture && e.pointerId !== undefined) {
      try { dragZone.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const cx = e.clientX ?? (e.touches?.[0]?.clientX || startX);
    const cy = e.clientY ?? (e.touches?.[0]?.clientY || startY);
    const dx = cx - startX;
    const dy = cy - startY;
    yaw = startYaw + dx * 0.65;
    pitch = Math.max(-24, Math.min(14, startPitch - dy * 0.25));
    applyTransform();
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    isDragging = false;
    stage.classList.remove('is-dragging');
    isAutoSpinning = true;
    targetSnapYaw = null;
    angleBtns.forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-box360-angle') === 'auto');
    });
  };

  dragZone.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  angleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const angle = btn.getAttribute('data-box360-angle');
      angleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (angle === 'auto') {
        targetSnapYaw = null;
        isAutoSpinning = true;
      } else {
        isAutoSpinning = false;
        yaw = ((yaw % 360) + 360) % 360 - 360;
        targetSnapYaw = Number(angle);
      }
    });
  });

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    dragZone.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
  };
}

export function getAllProducts() {
  return [...PRODUCTS];
}

export function getCandleProducts() {
  return PRODUCTS.filter(p => !p.productType || p.productType === 'candle');
}

export function getProductById(id) {
  if (id === 'puck-womens-sanctuary') {
    return PRODUCTS.find(p => p.id === 'puck-mens-athlete') || null;
  }
  if (id === 'wash-womens-sanctuary') {
    return PRODUCTS.find(p => p.id === 'mist-womens-linen') || null;
  }
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return [...PRODUCTS];
  return PRODUCTS.filter(p => p.category.includes(category));
}
