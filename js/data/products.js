/**
 * Puck & Wick Product Catalog Data Engine
 * Models all 10 artisan candles (7 Men's Matte Obsidian + 3 Women's Warm Frosted Ivory),
 * 3-tier olfactory scent pyramids, vessel specifications, burn times, and visual mockups.
 */

export const SCENT_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'mens', label: "Men's Collection" },
  { id: 'womens', label: "Women's Sanctuary" },
  { id: 'candles', label: 'Soy Candles' },
  { id: 'odor_care', label: 'Lauson-98™ Odor Killer & Body Care' },
  { id: 'exclusive_boxes', label: 'Exclusive Boxes ($98)' }
];

export const PRODUCTS = [
  {
    id: 'candle-top-shelf',
    name: 'Top Shelf',
    tagline: 'The Flagship Pour. Crimson Saffron, Jasmine Grandiflorum & Warm Amberwood.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    tagline: '6:00 AM Zamboni Cut. Italian Bergamot, Hinoki Wood, Eucalyptus & Vetiver.',
    price: 36.00,
    formattedPrice: '$36.00',
    category: ['mens', 'candles', 'signature', 'fresh_clean', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
    wick: 'Lead-Free Braided Organic Cotton Wick',
    description: 'That sacred stillness when you step onto fresh sheet ice at 6:00 AM. Bright Italian bergamot and crisp grapefruit zest cut into sacred Japanese hinoki wood and frosted eucalyptus leaf, grounded by smoky earthy vetiver, warm amber, and sunlit orange blossom.',
    notes: {
      top: ['Italian Bergamot', 'Grapefruit Zest', 'Frosted Eucalyptus'],
      middle: ['Japanese Hinoki Wood', 'Crushed Cypress', 'Sunlit Orange Blossom'],
      base: ['Smoky Earthy Vetiver', 'Warm Amber Resin', 'White Cedarwood']
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
    category: ['mens', 'candles', 'seasonal', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Gold Embossed Label',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['mens', 'candles', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['mens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['mens', 'candles', 'signature', 'fresh_clean'],
    productType: 'candle',
    genderLine: 'mens',
    genderLabel: 'MENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Heavy-Base Matte Obsidian Glass with Brushed Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['womens', 'candles', 'signature', 'fresh_clean', 'seasonal'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['womens', 'candles', 'signature', 'woods_rustic'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
    category: ['womens', 'candles', 'signature', 'fresh_clean'],
    productType: 'candle',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    burnTime: '55 - 65 hours',
    weightOz: 10,
    vessel: '10 oz Frosted Warm Ivory Glass with Brushed Champagne-Gold Lid',
    wax: '100% Pure American Soy Wax + Lauson-98™ Vapor Complex',
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
  },
  {
    id: 'puck-mens-athlete',
    name: "Men's Lauson-98™ Gear & Locker Puck",
    tagline: 'Matte Obsidian & Gold Hardware Disc. Activated Coconut Carbon + Lauson-98™.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '3.0" Bag Puck',
    burnTime: '6+ Months Active',
    weightOz: 4,
    vessel: '3.0" Regulation-Size Matte-Black Anodized Aluminum with Brushed Gold Bezel',
    wax: 'Sub-2nm Coconut Charcoal (>1,000 m²/g) + Lauson-98™ Molecular Core (40g Fill)',
    wick: 'Laser-Drilled 18-Port Vapor Diffusion Vent Array',
    description: 'Our full-size 3.0" regulation-diameter odor puck engineered to sit at the bottom of hockey bags, gym duffels, and equipment lockers. Heavy-gauge Matte-Black & Brushed-Gold anodized aluminum combines >1,000 m²/g microporous coconut carbon with our proprietary Swiss-inspired Lauson-98™ vapor complex to permanently destroy whole-bag sweat and gear odors.',
    notes: {
      top: ['Lauson-98™ Vapor-Phase Complex', 'Zero Masking Perfumes', 'Hypoallergenic'],
      middle: ['Sub-2nm Activated Coconut Carbon', '>1,000 m²/g Micropore Lattice'],
      base: ['Destroys Deep Gear & Sweat Odor', '6+ Months Continuous Protection']
    },
    featured: true,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-puck-men.jpg',
    subSpecText: '3.0" FULL-BAG HARDWARE PUCK • LAUSON-98™ + CARBON',
    waxSpecSub: 'Lauson-98™ + Carbon Matrix',
    accentColor: '#C5A059'
  },
  {
    id: 'puck-womens-sanctuary',
    name: "Women's Sanctuary Closet & Tote Puck",
    tagline: '3.0" Warm Ivory & Champagne-Gold Disc. Activated Coconut Carbon + Lauson-98™.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '3.0" Closet Puck',
    burnTime: '6+ Months Active',
    weightOz: 4,
    vessel: '3.0" Warm Matte Alabaster-Ivory Anodized Aluminum with Brushed Champagne-Gold Bezel',
    wax: 'Sub-2nm Coconut Charcoal (>1,000 m²/g) + Lauson-98™ Molecular Core (40g Fill)',
    wick: 'Laser-Drilled 18-Port Vapor Diffusion Vent Array',
    description: 'Designed in our signature Warm Alabaster-Ivory and Brushed Champagne-Gold finish for walk-in closets, Pilates & yoga totes, handbag shelves, and luxury car interiors. Built with the exact same sub-2nm activated coconut carbon (>1,000 m²/g) and proprietary Lauson-98™ vapor-phase complex as our Athlete Puck to permanently neutralize odors without masking perfumes.',
    notes: {
      top: ['Lauson-98™ Vapor-Phase Complex', 'Zero Masking Perfumes', 'Hypoallergenic'],
      middle: ['Sub-2nm Activated Coconut Carbon', '>1,000 m²/g Micropore Lattice'],
      base: ['Destroys Deep Closet & Tote Odor', '6+ Months Continuous Protection']
    },
    featured: true,
    seasonal: false,
    vesselType: 'ivory',
    photo: 'assets/images/item-puck-women.jpg',
    subSpecText: '3.0" WARM IVORY PUCK • LAUSON-98™ + CARBON',
    waxSpecSub: 'Lauson-98™ + Carbon Matrix',
    accentColor: '#E5C878'
  },
  {
    id: 'puck-mini-pair',
    name: 'Skate, Glove & Boot Mini Pucks (Set of 2)',
    tagline: '2.0" Compact Twin-Pack for Left & Right Skates, Hockey Gloves, or Gym Cleats.',
    price: 38.00,
    formattedPrice: '$38.00',
    category: ['mens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: 'Set of 2 (2.0" Discs)',
    burnTime: '6+ Months Active',
    weightOz: 3,
    vessel: '2x Compact 2.0" (50mm) Matte-Black & Brushed-Gold Anodized Aluminum Discs',
    wax: 'Sub-2nm Coconut Charcoal (>1,000 m²/g) + Lauson-98™ Core (2x 18g Targeted Fill)',
    wick: 'Dual Laser-Drilled 12-Port Toe-Box & Cuff Vapor Vent Arrays',
    description: 'While our 3.0" Puck treats your entire gear bag, hockey gloves and skate boots trap moisture and bacteria deep inside narrow cuffs and toe boxes. This compact 2.0" Twin-Pack slides effortlessly into your left and right skates, hockey gloves, cleats, or daily footwear—delivering targeted Lauson-98™ + Activated Carbon molecular odor destruction right at the source.',
    notes: {
      top: ['Lauson-98™ Vapor-Phase Complex', 'Zero Masking Perfumes', 'Hypoallergenic'],
      middle: ['Sub-2nm Activated Coconut Carbon', '>1,000 m²/g Micropore Lattice'],
      base: ['Destroys Deep Skate & Glove Odor', 'Fits Left & Right Skates / Gloves']
    },
    featured: true,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-mini-pucks-pair.jpg',
    subSpecText: 'SET OF 2 (2.0" COMPACT DISCS) • SKATES & GLOVES',
    waxSpecSub: 'Lauson-98™ Twin-Pack',
    accentColor: '#C5A059'
  },
  {
    id: 'wash-mens-charcoal',
    name: 'Athlete Charcoal & Lauson-98™ Body Wash',
    tagline: 'Post-Rink Detox Gel (8 fl oz). Activated Binchotan Charcoal & Blue Eucalyptus.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['mens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'mens',
    genderLabel: 'MENS',
    specUnitLabel: '8 fl oz Pump',
    burnTime: '8 fl oz (236 mL)',
    weightOz: 8,
    vessel: '8 oz Matte-Black Apothecary Bottle with Lockable Dispenser Pump',
    wax: 'Activated Binchotan Charcoal + Lauson-98™ Molecular Deodorizer',
    wick: 'Sulfate-Free, Phthalate-Free Botanical Gel Base',
    description: 'Formulated specifically to strip deep-seated locker-room sweat, equipment bacteria, and rink grime without drying skin. Activated binchotan charcoal draws impurities from pores while our proprietary Lauson-98™ complex and cold-pressed blue eucalyptus eliminate post-game odor on contact.',
    notes: {
      top: ['Cold-Pressed Blue Eucalyptus', 'Crushed Peppermint', 'Alpine Juniper'],
      middle: ['Activated Binchotan Charcoal', 'Black Spruce Needle', 'Rosemary Leaf'],
      base: ['Atlas Cedarwood', 'Earthy Vetiver', 'Lauson-98™ Skin Deodorizer']
    },
    featured: false,
    seasonal: false,
    vesselType: 'obsidian',
    photo: 'assets/images/item-bodywash-men.jpg',
    subSpecText: '8 FL OZ DETOX WASH • BINCHOTAN + LAUSON-98™',
    waxSpecSub: 'Binchotan + Lauson-98™',
    accentColor: '#C5A059'
  },
  {
    id: 'butter-womens-shea',
    name: 'Whipped Shea & Cashmere Body Butter',
    tagline: 'Sanctuary Skin Restoration (6 oz Jar). Triple-Whipped Shea, Jojoba & Santal.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '6 oz Glass Jar',
    burnTime: '6 oz (170 g)',
    weightOz: 6,
    vessel: '6 oz Frosted Warm Ivory Wide-Mouth Glass Jar with Champagne-Gold Lid',
    wax: 'Triple-Whipped Unrefined Shea Butter + Cold-Pressed Golden Jojoba',
    wick: 'Non-Greasy Cloud Emulsion • Paraben & Phthalate Free',
    description: 'An ultra-rich, cloud-whipped body butter that melts effortlessly into warm post-shower skin. Crafted with unrefined grade-A shea butter, golden jojoba esters, and vitamin E, scented with our serene Sanctuary notes of white tea bud, spun cashmere, Madagascar vanilla bean, and creamy sandalwood.',
    notes: {
      top: ['Sicilian Bergamot Zest', 'White Tea Bud', 'Spun Silk Accord'],
      middle: ['Warm Cashmere Musk', 'Jasmine Grandiflorum', 'Whipped Shea Cream'],
      base: ['Madagascar Vanilla Bean', 'Australian Sandalwood', 'Golden Amber']
    },
    featured: true,
    seasonal: false,
    vesselType: 'ivory',
    photo: 'assets/images/item-bodybutter-women.jpg',
    subSpecText: '6 OZ FROSTED IVORY JAR • TRIPLE-WHIPPED SHEA',
    waxSpecSub: 'Whipped Shea & Jojoba',
    accentColor: '#E5C878'
  },
  {
    id: 'mist-womens-linen',
    name: 'Sanctuary Botanical Linen & Pillow Mist',
    tagline: 'Fine-Mist Atomizer (4 fl oz). Lauson-98™ Fabric Refresher & White Lavender.',
    price: 44.00,
    formattedPrice: '$44.00',
    category: ['womens', 'odor_care'],
    productType: 'odor_care',
    genderLine: 'womens',
    genderLabel: 'WOMENS',
    specUnitLabel: '4 fl oz Mist',
    burnTime: '4 fl oz (118 mL)',
    weightOz: 4,
    vessel: '4 oz Frosted Warm Ivory Glass Bottle with Brushed Champagne-Gold Atomizer',
    wax: 'Botanical Hydrosol Base + Lauson-98™ Molecular Fabric Neutralizer',
    wick: 'Non-Staining Micro-Mist Spray • Safe for Linen, Cashmere & Silk',
    description: 'Transform bedrooms, walk-in closets, cashmere knits, and travel totes into a five-star sanctuary. Powered by our proprietary Lauson-98™ molecular complex to permanently neutralize fabric odors while leaving a delicate veil of crushed French lavender leaf, white orchid, and sun-bleached driftwood.',
    notes: {
      top: ['Crushed French Lavender Leaf', 'Petitgrain', 'Lemon Verbena'],
      middle: ['Night-Blooming White Orchid', 'Eucalyptus Dew', 'Sheer Magnolia'],
      base: ['Sun-Bleached Driftwood', 'Ambrette Seed', 'Lauson-98™ Fabric Neutralizer']
    },
    featured: false,
    seasonal: false,
    vesselType: 'ivory',
    photo: 'assets/images/item-mist-women.jpg',
    subSpecText: '4 FL OZ FROSTED ATOMIZER • LAUSON-98™ MIST',
    waxSpecSub: 'Lauson-98™ Botanical Mist',
    accentColor: '#E5C878'
  }
];

export const CONCEPT_CANDLE_PHOTOS = {
  1: 'assets/images/candle-obsidian.jpg',
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
      ? 'assets/images/candle-ivory.jpg'
      : (CONCEPT_CANDLE_PHOTOS[activeConcept] || 'assets/images/candle-obsidian.jpg');
  const vignetteId = `vessel-vig-${product.id}${isModal ? '-modal' : ''}`;
  const subSpecText = product.subSpecText
    ? product.subSpecText
    : (isIvory ? '10 OZ FROSTED IVORY • 100% AMERICAN SOY' : '10 OZ • 100% AMERICAN SOY');
  const displayName = product.name.length > 26
    ? product.name.slice(0, 25).toUpperCase() + '…'
    : product.name.toUpperCase();
  const nameFontSize = product.name.length > 22 ? '12.5' : '15.5';

  if (isModal) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 448" preserveAspectRatio="xMidYMid meet" width="100%" height="100%" style="width:100%;height:100%;display:block;" class="candle-vessel-svg" data-active-concept="${activeConcept}" aria-label="${product.name} Luxury Presentation (Concept ${activeConcept})" role="img">
        <defs>
          <linearGradient id="${vignetteId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#08090C" stop-opacity="0.02" />
            <stop offset="72%" stop-color="#08090C" stop-opacity="0" />
            <stop offset="89%" stop-color="#08090C" stop-opacity="0.92" />
            <stop offset="100%" stop-color="#08090C" stop-opacity="1" />
          </linearGradient>
          <clipPath id="${vignetteId}-clip">
            <rect x="0" y="0" width="400" height="448" />
          </clipPath>
        </defs>

        <g clip-path="url(#${vignetteId}-clip)">
          <rect x="0" y="0" width="400" height="448" fill="#08090C" />

          <!-- Full Uncropped 1:1 Studio Product Photograph (Full Flame Tip + Full Vessel) -->
          <image href="${photoHref}" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid meet" />
          <rect x="0" y="0" width="400" height="448" fill="url(#${vignetteId})" />

          <!-- Minimalist Product Name Plate at Bottom of Modal Stage -->
          <rect x="24" y="384" width="352" height="50" rx="6" fill="rgba(11, 12, 14, 0.92)" stroke="rgba(197, 160, 89, 0.68)" stroke-width="1.2" />
          <text x="200" y="407" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${nameFontSize}" font-weight="600" letter-spacing="2.2" fill="#FAF5E8">${displayName}</text>
          <text x="200" y="424" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="500" letter-spacing="1.8" fill="#C5A059">${subSpecText}</text>
        </g>
      </svg>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" style="width:100%;height:100%;display:block;" class="candle-vessel-svg" data-active-concept="${activeConcept}" aria-label="${product.name} Luxury Presentation (Concept ${activeConcept})" role="img">
      <defs>
        <linearGradient id="${vignetteId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#08090C" stop-opacity="0.08" />
          <stop offset="72%" stop-color="#08090C" stop-opacity="0" />
          <stop offset="100%" stop-color="#08090C" stop-opacity="0.92" />
        </linearGradient>
      </defs>

      <!-- Full-Bleed Studio Product Photography -->
      <image href="${photoHref}" x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
      <rect x="0" y="0" width="400" height="400" fill="url(#${vignetteId})" />

      <!-- Minimalist Product Name Plate at Bottom of Card View -->
      <rect x="32" y="338" width="336" height="44" rx="4" fill="rgba(11, 12, 14, 0.88)" stroke="rgba(197, 160, 89, 0.6)" stroke-width="1" />
      <text x="200" y="358" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="${nameFontSize}" font-weight="600" letter-spacing="2.2" fill="#FAF5E8">${displayName}</text>
      <text x="200" y="373" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="500" letter-spacing="2" fill="#C5A059">${subSpecText}</text>
    </svg>
  `;
}

export function getProductGallerySlides(product, conceptId = 1) {
  const isIvory = product.vesselType === 'ivory';
  const primaryPhoto = product.photo
    ? product.photo
    : (isIvory && Number(conceptId) === 1)
      ? 'assets/images/candle-ivory.jpg'
      : (CONCEPT_CANDLE_PHOTOS[Number(conceptId)] || 'assets/images/candle-obsidian.jpg');

  if (!product.productType || product.productType === 'candle') {
    return [
      {
        id: 'lit',
        shortLabel: 'Lit Vessel',
        title: `${product.name} — Lit 10 oz Vessel`,
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'shelf',
        shortLabel: 'Box & Dust Cover',
        title: `${product.name} — Rigid Box, Custom Scent Band & Wax Dust Cover`,
        type: 'image',
        src: `assets/images/packaging/shelf-${product.id}.jpg`,
        thumb: `assets/images/packaging/shelf-${product.id}.jpg`
      },
      {
        id: 'sides',
        shortLabel: '4 Sides',
        title: `${product.name} — All 4 Box Sides & Circular Wax Dust Cover`,
        type: 'image',
        src: `assets/images/packaging/sides-${product.id}.jpg`,
        thumb: `assets/images/packaging/sides-${product.id}.jpg`
      },
      {
        id: 'spin360',
        shortLabel: '360° Box',
        title: `${product.name} — Interactive 360° Rotating Rigid Shoulder Box`,
        type: 'box360',
        thumb: `assets/images/packaging/shelf-${product.id}.jpg`
      }
    ];
  }

  if (product.id === 'puck-mini-pair') {
    return [
      {
        id: 'primary',
        shortLabel: 'Twin-Pack',
        title: '2.0" Skate, Glove & Boot Mini Pucks (Set of 2)',
        type: 'svg',
        thumb: primaryPhoto
      },
      {
        id: 'step1',
        shortLabel: '1. Palm Scale',
        title: 'Step 01 • Compact 2.0" (50mm) Open-Palm Scale',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-1.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-1.jpg'
      },
      {
        id: 'step2',
        shortLabel: '2. Glove Cuff',
        title: 'Step 02 • Drop Straight Into Hockey Glove Wrist Cuff Opening',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-2.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-2.jpg'
      },
      {
        id: 'step3',
        shortLabel: '3. Skate Boot',
        title: 'Step 03 • Drop Into Skate Boot Ankle Collar Overnight',
        type: 'image',
        src: 'assets/images/packaging/mini-puck-step-3.jpg',
        thumb: 'assets/images/packaging/mini-puck-step-3.jpg'
      }
    ];
  }

  // Other Odor Care & Sanctuary Items
  return [
    {
      id: 'primary',
      shortLabel: 'Studio View',
      title: `${product.name} — Studio Hardware & Apothecary View`,
      type: 'svg',
      thumb: primaryPhoto
    },
    {
      id: 'in_action',
      shortLabel: 'In Action',
      title: `${product.name} — Daily Ritual & Gear Action`,
      type: 'image',
      src: isIvory ? 'assets/images/box-women-usecase.jpg' : 'assets/images/box-men-usecase.jpg',
      thumb: isIvory ? 'assets/images/box-women-usecase.jpg' : 'assets/images/box-men-usecase.jpg'
    },
    {
      id: 'collection',
      shortLabel: 'Full Lineup',
      title: `${product.name} — Complete Exclusive Box Lineup`,
      type: 'image',
      src: isIvory ? 'assets/images/box-women-items-out.jpg' : 'assets/images/box-men-items-out.jpg',
      thumb: isIvory ? 'assets/images/box-women-items-out.jpg' : 'assets/images/box-men-items-out.jpg'
    }
  ];
}

export function getInteractive360BoxHtml(product, isModal = false) {
  const isIvory = product.vesselType === 'ivory';
  const scentName = (product.name || 'TOP SHELF').toUpperCase();
  const topNote = product.notes?.top?.[0] || 'Bergamot';
  const midNote = product.notes?.middle?.[0] || 'Hinoki Wood';
  const baseNote = product.notes?.base?.[0] || 'Amberwood';
  const notesLine = `${topNote} • ${midNote} • ${baseNote}`;
  const themeClass = isIvory ? 'box360-ivory' : 'box360-obsidian';
  const kickerText = product.seasonal
    ? 'SEASONAL COLLAB • BATCH #098'
    : isIvory
      ? 'SANCTUARY SCENT • BATCH #098'
      : 'SIGNATURE SCENT • BATCH #098';

  return `
    <div class="box360-stage ${themeClass} ${isModal ? 'box360-modal' : 'box360-card'}" data-box360-root="${product.id}">
      <div class="box360-top-hud">
        <span class="box360-badge">↻ 360° Auto-Rotating Rigid Box</span>
        ${isModal ? `
          <div class="box360-angle-pills" role="group" aria-label="Rotate box to specific side">
            <button type="button" class="box360-angle-btn active" data-box360-angle="auto">Auto Spin</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="0">01 Front</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-90">02 Craft</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-180">03 Story</button>
            <button type="button" class="box360-angle-btn" data-box360-angle="-270">04 Care</button>
          </div>
        ` : ''}
      </div>

      <div class="box360-scene">
        <div class="box360-turntable is-spinning" data-box360-turntable>
          <!-- FACE 01: FRONT CREST + SCENT CORNER BAND -->
          <div class="box360-face face-front">
            <div class="box360-lid">
              <div class="box360-qc-seal">
                <span>QC #1 SEAL</span>
                <small>VA POUR</small>
              </div>
            </div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body">
              <div class="box360-crest-frame">
                <div class="box360-crest-kicker">EST. PURCELLVILLE, VA</div>
                <div class="box360-crest-icon">⚔</div>
                <div class="box360-crest-brand">PUCK &amp; WICK™</div>
                <div class="box360-crest-loc">LOUDOUN COUNTY • VIRGINIA</div>
                <div class="box360-crest-soy">100% AMERICAN SOY WAX</div>
              </div>
              <div class="box360-scent-band band-front">
                <span class="band-kicker">${kickerText}</span>
                <strong class="band-scent">${scentName}</strong>
                <span class="band-notes">${notesLine}</span>
              </div>
            </div>
          </div>

          <!-- FACE 02: RIGHT SIDE (CANDLE CARE & BURN RITUAL + WRAPPED SCENT BAND) -->
          <div class="box360-face face-right">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel">
              <div class="side-kicker">OPTIMAL PERFORMANCE</div>
              <div class="side-heading">CANDLE CARE &amp; BURN RITUAL</div>
              <div class="side-rule"></div>
              <div class="side-item"><strong>1. FIRST LIGHT (MEMORY RING)</strong><span>Melt wax to glass edges on 1st burn (2–3 hrs).</span></div>
              <div class="side-item"><strong>2. TRIM WICK TO 1/4 INCH</strong><span>Trim organic cotton wick to 1/4" before lighting.</span></div>
              <div class="side-item"><strong>3. 4-HOUR MAX SESSIONS</strong><span>Burn max 4 hrs at a time; extinguish with lid.</span></div>
              <div class="side-item"><strong>4. REUSABLE APOTHECARY JAR</strong><span>Stop at 1/2" wax; wash warm glass to reuse.</span></div>
              <div class="box360-scent-band band-right">
                <span class="band-kicker">10 OZ (283G) • 55–65 HR CLEAN BURN</span>
                <strong class="band-scent">${scentName}</strong>
                <span class="band-notes">HAND-POURED IN PURCELLVILLE, VA</span>
              </div>
            </div>
          </div>

          <!-- FACE 03: BACK PANEL (TWENTY YEARS ON THE ICE STORY & 4 BADGES) -->
          <div class="box360-face face-back">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel">
              <div class="side-kicker">TWENTY YEARS ON THE ICE</div>
              <div class="side-heading">ONE STANDARD OF EXCELLENCE</div>
              <div class="side-rule"></div>
              <p class="side-quote">“In competitive hockey, games are won in the inches. After 20 years on the ice, I brought that exact locker-room discipline to hand-pouring clean soy candles in Loudoun County, Virginia.”</p>
              <p class="side-story">Born in Lausanne, Switzerland to proud Bulgarian roots and forged in Purcellville, VA, uniting Swiss precision &amp; Lauson-98™ odor science.</p>
              <div class="side-badges-grid">
                <div class="side-badge-box"><strong>20 YRS</strong><span>COMPETITIVE ICE</span></div>
                <div class="side-badge-box"><strong>#98</strong><span>FOUNDER TRIBUTE</span></div>
                <div class="side-badge-box"><strong>14 DAYS</strong><span>CURED IN GLASS</span></div>
                <div class="side-badge-box"><strong>VA</strong><span>PURCELLVILLE POUR</span></div>
              </div>
              <div class="side-footer">PUCKANDWICK.COM • HAND-POURED IN PURCELLVILLE, VA</div>
            </div>
          </div>

          <!-- FACE 04: LEFT PANEL (THE 4 PILLARS OF CRAFT) -->
          <div class="box360-face face-left">
            <div class="box360-lid"></div>
            <div class="box360-gold-neck"></div>
            <div class="box360-body box360-side-panel">
              <div class="side-kicker">QUALITY CONTROL #1 STANDARD</div>
              <div class="side-heading">THE 4 PILLARS OF CRAFT</div>
              <div class="side-rule"></div>
              <div class="side-item"><strong>01 • 100% AMERICAN SOY WAX</strong><span>Renewable Midwest soy wax; burns 30–50% slower with zero soot.</span></div>
              <div class="side-item"><strong>02 • PHTHALATE-FREE BOTANICALS</strong><span>IFRA-certified luxury oils; 100% free from phthalates &amp; parabens.</span></div>
              <div class="side-item"><strong>03 • LEAD-FREE COTTON WICKS</strong><span>Braided organic cotton wicks calibrated for an even melt pool.</span></div>
              <div class="side-item"><strong>04 • 14-DAY SMALL-BATCH CURE</strong><span>Hand-poured in Purcellville, VA and cured 14 full days in glass.</span></div>
              <div class="side-footer">ZERO PARAFFIN • ZERO PHTHALATES • QC #1</div>
            </div>
          </div>

          <!-- TOP LID ROOF -->
          <div class="box360-face face-top">
            <div class="top-monogram">P &amp; W</div>
          </div>
        </div>
        <div class="box360-pedestal-shadow"></div>
      </div>

      <div class="box360-bottom-caption">
        <span>2-Piece Lift-Off Top Lid • Brushed Gold Neck • Purcellville, VA Dust Cover Inside</span>
      </div>
    </div>
  `;
}

export function getAllProducts() {
  return [...PRODUCTS];
}

export function getCandleProducts() {
  return PRODUCTS.filter(p => !p.productType || p.productType === 'candle');
}

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return [...PRODUCTS];
  return PRODUCTS.filter(p => p.category.includes(category));
}
