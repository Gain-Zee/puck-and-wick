/**
 * Puck & Wick Exclusive Box Configurations & Odor Science Data
 * Defines Men's/Athlete Edition vs Women's Luxury Sanctuary Edition bundles ($78 / $98 value)
 * with complete 3-tier olfactory note breakdowns and molecular odor-neutralization science.
 */

export const EXCLUSIVE_BOX_EDITIONS = {
  men_athlete: {
    id: 'men_athlete',
    badge: 'Matte Obsidian & Gold • Founder’s #98 Edition',
    title: "Men's / Athlete Exclusive Box",
    subtitle: '10 oz Matte Obsidian Soy Candle + Lauson-98™ & Charcoal Gear Puck + 8 oz Detox Body Wash',
    price: 98.00,
    compareAtValue: 124.00,
    savings: 26.00,
    defaultCandleId: 'candle-top-shelf',
    description:
      'Built for elite hockey players, gym athletes, and discerning home spaces in our signature Matte Obsidian & Brushed Gold colorway. Priced at $98 in tribute to our founder’s first competitive hockey jersey number (#98), combining your choice of 10 oz small-batch soy candle with our dual-action Lauson-98™ + Activated Charcoal gear puck and post-game detox body wash.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Matte Obsidian Vessel)',
        detail: '55–65 Hour Clean Burn • 100% American Soy Wax • Full 3-Tier Olfactory Note Pyramid',
        retailValue: '$36.00'
      },
      puck: {
        title: 'Hockey Puck Activated Charcoal & Lauson-98™ Odor Killer',
        detail: 'Anodized matte-black & brushed-gold vented hardware shell loaded with microporous coconut charcoal (>1,000 m²/g) and our proprietary Lauson-98™ vapor-phase neutralizer for hockey bags, skates, and gym lockers.',
        notes: 'Active Matrix: Sub-2nm Steam-Activated Coconut & Bamboo Carbon (>1,000 m²/g) • Vapor-Phase Lauson-98™ Covalent Neutralizer • Unscented / Zero Masking Perfumes',
        retailValue: '$44.00'
      },
      bodyWash: {
        title: 'Athlete Lauson-98™ + Charcoal Odor-Eliminating Body Wash (8 oz)',
        detail: 'Deep-cleansing detoxifying body wash formulated with activated binchotan charcoal, cold-pressed eucalyptus, and our proprietary Lauson-98™ molecular complex to strip post-rink sweat.',
        notes: 'Top: Cold-Pressed Blue Eucalyptus, Crushed Peppermint & Alpine Juniper • Heart: Activated Binchotan Charcoal, Black Spruce & Rosemary Leaf • Base: Atlas Cedarwood, Earthy Vetiver & Lauson-98™ Deodorizer',
        retailValue: '$44.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Custom-Cut Matte Obsidian Presentation Box (Open)',
        image: 'assets/images/box-men-open.jpg',
        description: 'Precision-cut high-density charcoal foam cradles your choice of 10 oz signature matte-obsidian soy candle alongside the anodized Activated Charcoal + Lauson-98™ Gear Puck and 8 oz Athlete Body Wash.'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Heavy-Weight Matte Obsidian Magnetic Gift Box (Closed)',
        image: 'assets/images/box-men-closed.jpg',
        description: 'Engineered from 1200gsm matte-black rigid board with a concealed magnetic snap lid and hot-stamped metallic gold Precision Mark logo. Arrives ready to hand to any player, coach, or host.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items Unboxed',
        title: 'All 3 Full-Size Men’s / Athlete Components Unboxed',
        image: 'assets/images/box-men-items-out.jpg',
        description: 'Every piece is full retail size ($124 combined value): (1) 10 oz American Soy Candle ($36 value), (2) Vented Activated Charcoal + Lauson-98™ Gear Puck ($44 value), and (3) 8 oz Detoxifying Charcoal & Eucalyptus Body Wash ($44 value).'
      },
      {
        id: 'usecase',
        step: '04 • REAL-WORLD USE CASES',
        shortLabel: '3 Items in Action',
        title: 'Rink to Shower to Living Room: All 3 Items in Action',
        image: 'assets/images/box-men-usecase.jpg',
        description: '1. Drop the Lauson-98™ Odor Puck directly into your hockey bag, skate boots, or gym locker to destroy sweat thiols & amines. 2. Strip post-game grime in the shower with the 8 oz Charcoal Body Wash. 3. Light the 10 oz Soy Candle in your den or living room.'
      }
    ]
  },
  women_luxe: {
    id: 'women_luxe',
    badge: 'Warm Frosted Ivory & Champagne Gold • Sanctuary #98 Edition',
    title: "Women's Sanctuary Exclusive Box",
    subtitle: '10 oz Frosted Ivory Soy Candle + 6 oz Whipped Shea & Cashmere Body Butter + 4 oz Botanical Linen & Pillow Mist',
    price: 98.00,
    compareAtValue: 124.00,
    savings: 26.00,
    defaultCandleId: 'candle-cashmere-white-tea',
    description:
      'Crafted in our Warm Frosted Ivory & Brushed Champagne Gold colorway for serene home rituals, velvet-soft skin restoration, and luxury fabric care. Priced at $98 in tribute to our founder’s first competitive hockey jersey number (#98), pairing your choice of 10 oz Virginia soy candle with our triple-whipped Shea, Jojoba & Cashmere Body Butter and our Lauson-98™ Botanical Linen, Closet & Pillow Mist.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Frosted Warm Ivory Vessel)',
        detail: '55–65 Hour Clean Burn • Phthalate-Free Botanical Oils • Full 3-Tier Olfactory Note Pyramid',
        retailValue: '$36.00'
      },
      puck: {
        title: 'Sanctuary Triple-Whipped Shea, Jojoba & Cashmere Body Butter (6 oz)',
        detail: 'Rich, cloud-like whipped body cream in a 6 oz Frosted Warm Ivory glass jar with brushed champagne-gold lid—formulated with unrefined shea butter, cold-pressed jojoba oil, and spun cashmere botanicals.',
        notes: 'Top: Sicilian Bergamot, White Tea Bud & Spun Silk • Heart: Warm Cashmere Musk, Jasmine Grandiflorum & Whipped Shea • Base: Madagascar Vanilla Bean, Creamy Sandalwood & Golden Amber',
        retailValue: '$44.00'
      },
      bodyWash: {
        title: 'Sanctuary Lauson-98™ Botanical Linen, Closet & Pillow Mist (4 oz)',
        detail: 'Fine-mist frosted ivory glass atomizer infused with our proprietary Lauson-98™ molecular odor neutralizer and soothing botanical extracts to refresh bedding, cashmere knitwear, closets, and yoga totes.',
        notes: 'Top: Crushed French Lavender Leaf, Petitgrain & Lemon Verbena • Heart: White Orchid, Eucalyptus Dew & Sheer Magnolia • Base: Sun-Bleached Driftwood, Ambrette Seed & Lauson-98™ Molecular Neutralizer',
        retailValue: '$44.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE SANCTUARY BOX',
        shortLabel: 'Open Box',
        title: 'Warm Alabaster-Ivory & Champagne-Gold Magnetic Presentation Box (Open)',
        image: 'assets/images/box-women-open.jpg',
        description: 'Custom-contoured warm cream suede-touch foam cradles your choice of 10 oz Frosted Ivory Soy Candle alongside the 6 oz Whipped Shea & Cashmere Body Butter jar and 4 oz Botanical Linen & Pillow Mist atomizer.'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Warm Alabaster-Ivory & Brushed Champagne-Gold Magnetic Gift Box (Closed)',
        image: 'assets/images/box-women-closed.jpg',
        description: 'Rigid magnetic keepsake box finished in velvety warm alabaster-ivory matte linen board with brushed champagne-gold reveal trim and our signature minimalist square gold-foil Precision Mark emblem.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items Unboxed',
        title: 'All 3 Full-Size Women’s Sanctuary Components Unboxed',
        image: 'assets/images/box-women-items-out.jpg',
        description: 'Three full-size luxury essentials ($124 combined value): (1) 10 oz Phthalate-Free Soy Candle in Frosted Ivory Glass ($36 value), (2) 6 oz Triple-Whipped Shea, Jojoba & Cashmere Body Butter ($44 value), and (3) 4 oz Botanical Linen, Closet & Pillow Mist with Lauson-98™ ($44 value).'
      },
      {
        id: 'usecase',
        step: '04 • REAL-WORLD USE CASES',
        shortLabel: '3 Items in Action',
        title: 'Closet & Linens to Spa Vanity to Bedside Sanctuary: All 3 Items in Action',
        image: 'assets/images/box-women-usecase.jpg',
        description: '1. Mist the Lauson-98™ Botanical Spray over bedding, cashmere knits, or yoga totes to neutralize odors at the molecular level. 2. Massage the triple-whipped Shea & Cashmere Body Butter into warm post-shower skin. 3. Light the 55–65 hr Frosted Ivory Soy Candle.'
      }
    ]
  }
};

export const ODOR_SCIENCE_DATA = {
  headline: 'Dual-Action Molecular Odor Elimination',
  kicker: 'Physical Adsorption + Lauson-98™ Covalent Neutralization vs Synthetic Masking',
  lead: 'Athletic sweat, damp leather skate liners, and technical pads generate volatile organic compounds: thiols (sulfur bacteria), volatile amines (ammoniacal sweat breakdown), and isovaleric acid (pungent sweat-sock acid). Conventional aerosol sprays temporarily overpower nasal receptors with cheap synthetic perfumes, creating a sickening compound odor. Puck & Wick™ eliminates odors at the molecular level in two irreversible phases.',
  stages: [
    {
      id: 'charcoal',
      step: 'STAGE 01 • PHYSICAL ADSORPTION',
      title: 'Activated Coconut Charcoal Micropore Matrix',
      metric: '> 1,000 m²/gram Surface Area • < 2 nm Micropores',
      description:
        'Steam-activated virgin coconut shell carbon yields a labyrinth of sub-2.0 nanometer micropores matching the kinetic molecular diameter of athletic volatile organic compounds. Through London dispersion and Van der Waals forces, this vast lattice (>1,000 m²/g) physically adsorbs and traps volatile thiols (R-SH), amines (R-NH₂), and isovaleric acid (C₅H₁₀O₂) directly out of gear fabrics.'
    },
    {
      id: 'metazene',
      step: 'STAGE 02 • COVALENT CHEMICAL NEUTRALIZATION',
      title: 'Lauson-98™ Molecular Electron Alteration',
      metric: 'Named for Lausanne, Switzerland & #98 • Irreversible Covalent Adduct',
      description:
        'Named in tribute to our founder’s birthplace in Lausanne, Switzerland—the global capital of fine fragrance chemistry—and his #98 hockey jersey, our proprietary Lauson-98™ molecular complex reacts directly in the vapor phase with malodorous sulfur and nitrogen functional groups. By forming irreversible covalent bonds, it shifts the molecule’s electron cloud geometry so it can no longer bind to human olfactory receptors (GPCRs)—cancelling odor perception permanently.'
    }
  ],
  comparison: [
    {
      method: 'Conventional Masking Sprays',
      verdict: 'Temporary Receptor Overload',
      points: [
        'Floods olfactory receptors with synthetic perfumes and butane/propane propellants',
        'Employs synthetic phthalate fixatives (DEP) that leave sticky residue on technical fabrics',
        'Odor rebounds within 2–3 hours as perfume evaporates, yielding foul compound stench'
      ],
      isPositive: false
    },
    {
      method: 'Puck & Wick™ Charcoal + Lauson-98™',
      verdict: 'Permanent Molecular Destruction',
      points: [
        'Sub-2nm microporous matrix physically traps thiols, amines, and isovaleric acid',
        'Lauson-98™ covalently alters malodor electron clouds, preventing olfactory receptor binding',
        '100% clean, phthalate-free, non-aerosol, hypoallergenic, and safe for premium leather & gear'
      ],
      isPositive: true
    }
  ]
};

export const EXTRA_BOX_GALLERY_SLIDES = [
  {
    id: 'his_hers',
    step: '05 • DUAL ARCHITECTURE COLORWAYS',
    shortLabel: 'His & Hers Vessels',
    title: 'Matte Obsidian & Gold vs. Warm Frosted Ivory & Champagne Gold',
    image: 'assets/images/his-hers-colorway.jpg',
    description: 'Identical architectural vessel geometry and minimalist square gold-foil Precision Mark emblem—engineered in deep Matte Obsidian for the Locker Room & Den, and Warm Frosted Alabaster-Ivory for the Spa & Bedroom Sanctuary.'
  },
  {
    id: 'ivory_lineup',
    step: '06 • SANCTUARY IVORY LINEUP',
    shortLabel: '3 Ivory Candles',
    title: 'The Sanctuary Ivory Candle Collection (10 oz Soy Vessels)',
    image: 'assets/images/womens-candle-lineup.jpg',
    description: 'Cashmere & White Tea (Silver Needle White Tea • Spun Cashmere • Blond Woods), Velvet Vanilla & Santal (Cardamom • Australian Sandalwood • Madagascar Vanilla Bean), and Sea Salt & White Orchid (Flaky Sea Salt • White Orchid • Sun-Bleached Driftwood).'
  }
];

