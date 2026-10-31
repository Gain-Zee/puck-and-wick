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
    tagline: '6:00 AM Zamboni Cut. Glacial Ozone, Crisp Pine & Silver Fir.',
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
