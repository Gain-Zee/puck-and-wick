/**
 * Puck & Wick Exclusive Box Configurations & Odor Science Data
 * Defines Men's/Athlete Edition vs Women's Luxury Sanctuary Edition bundles ($78 / $98 value)
 * with complete 3-tier olfactory note breakdowns and molecular odor-neutralization science.
 */

export const EXCLUSIVE_BOX_EDITIONS = {
  men_athlete: {
    id: 'men_athlete',
    badge: 'Matte Obsidian & Gold • Locker-Room & Rink Engineered',
    title: "Men's / Athlete Exclusive Box",
    subtitle: '10 oz Matte Obsidian Soy Candle + Activated Charcoal Gear Puck + 8 oz Detox Body Wash',
    price: 78.00,
    compareAtValue: 98.00,
    savings: 20.00,
    defaultCandleId: 'candle-top-shelf',
    description:
      'Built for elite hockey players, gym athletes, and discerning home spaces in our signature Matte Obsidian & Brushed Gold colorway. Combines your choice of 10 oz small-batch soy candle with our dual-action Metazene® + Activated Charcoal odor-eliminating gear puck and post-game detox body wash.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Matte Obsidian Vessel)',
        detail: '55–65 Hour Clean Burn • 100% American Soy Wax • Full 3-Tier Olfactory Note Pyramid',
        retailValue: '$34.00'
      },
      puck: {
        title: 'Hockey Puck Activated Charcoal & Metazene® Odor Killer',
        detail: 'Vulcanized breathable shell loaded with microporous bamboo charcoal (>1,000 m²/g) and Metazene® vapor-phase neutralizer for hockey bags, skates, and gym lockers.',
        notes: 'Active Matrix: Sub-2nm Steam-Activated Coconut & Bamboo Carbon (>1,000 m²/g) • Vapor-Phase Metazene® Covalent Neutralizer • Unscented / Zero Masking Perfumes',
        retailValue: '$32.00'
      },
      bodyWash: {
        title: 'Athlete Metazene® + Charcoal Odor-Eliminating Body Wash (8 oz)',
        detail: 'Deep-cleansing detoxifying body wash formulated with activated binchotan charcoal, cold-pressed eucalyptus, and molecular odor neutralizers to strip post-rink sweat.',
        notes: 'Top: Cold-Pressed Blue Eucalyptus, Crushed Peppermint & Alpine Juniper • Heart: Activated Binchotan Charcoal, Black Spruce & Rosemary Leaf • Base: Atlas Cedarwood, Earthy Vetiver & Metazene® Deodorizer',
        retailValue: '$32.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Custom-Cut Matte Obsidian Presentation Box (Open)',
        image: 'assets/images/box-men-open.jpg',
        description: 'Precision-cut high-density charcoal foam cradles your choice of 10 oz signature matte-obsidian soy candle alongside the vulcanized Activated Charcoal + Metazene® Gear Puck and 8 oz Athlete Body Wash.'
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
        description: 'Every piece is full retail size ($98 combined value): (1) 10 oz American Soy Candle (55–65 hr burn), (2) Vented Activated Charcoal + Metazene® Gear Puck, and (3) 8 oz Detoxifying Charcoal & Eucalyptus Body Wash.'
      },
      {
        id: 'usecase',
        step: '04 • REAL-WORLD USE CASES',
        shortLabel: '3 Items in Action',
        title: 'Rink to Shower to Living Room: All 3 Items in Action',
        image: 'assets/images/box-men-usecase.jpg',
        description: '1. Drop the Odor Puck directly into your hockey bag, skate boots, or gym locker to destroy sweat thiols & amines. 2. Strip post-game grime in the shower with the 8 oz Charcoal Body Wash. 3. Light the 10 oz Soy Candle in your den or living room.'
      }
    ]
  },
  women_luxe: {
    id: 'women_luxe',
    badge: 'Warm Frosted Ivory & Champagne Gold • Sanctuary Edition',
    title: "Women's Sanctuary Exclusive Box",
    subtitle: '10 oz Frosted Ivory Soy Candle + 6 oz Whipped Shea & Cashmere Body Butter + 4 oz Botanical Linen & Pillow Mist',
    price: 78.00,
    compareAtValue: 98.00,
    savings: 20.00,
    defaultCandleId: 'candle-cashmere-white-tea',
    description:
      'Crafted in our Warm Frosted Ivory & Brushed Champagne Gold colorway for serene home rituals, velvet-soft skin restoration, and luxury fabric care. Pairs your choice of 10 oz hand-poured Virginia soy candle with our triple-whipped Shea, Jojoba & Cashmere Body Butter and our Metazene®-infused Botanical Linen, Closet & Pillow Mist.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Frosted Warm Ivory Vessel)',
        detail: '55–65 Hour Clean Burn • Phthalate-Free Botanical Oils • Full 3-Tier Olfactory Note Pyramid',
        retailValue: '$34.00'
      },
      puck: {
        title: 'Whipped Shea, Jojoba & Cashmere Body Butter (6 oz Frosted Ivory Jar)',
        detail: 'Ultra-rich triple-whipped organic shea butter, cold-pressed golden jojoba esters, sweet almond oil, and vitamin E in a wide-mouth frosted warm ivory glass jar with brushed champagne-gold lid. Melts effortlessly into post-shower skin with a velvety, non-greasy finish.',
        notes: 'Top: Sicilian Bergamot, White Tea Bud & Spun Silk • Heart: Warm Cashmere Musk, Jasmine Grandiflorum & Whipped Shea • Base: Madagascar Vanilla Bean, Creamy Sandalwood & Golden Amber',
        retailValue: '$32.00'
      },
      bodyWash: {
        title: 'Botanical Linen, Closet & Pillow Mist with Metazene® (4 oz Atomizer)',
        detail: 'Fine-mist frosted warm-ivory glass atomizer with brushed champagne-gold sprayer. Engineered with vapor-phase Metazene® molecular odor neutralizer and pure botanical hydrosols to instantly purify luxury bedding, cashmere wardrobes, yoga totes, and living sanctuaries.',
        notes: 'Top: Crushed French Lavender Leaf, Petitgrain & Lemon Verbena • Heart: White Orchid, Eucalyptus Dew & Sheer Magnolia • Base: Sun-Bleached Driftwood, Ambrette Seed & Metazene® Molecular Neutralizer',
        retailValue: '$32.00'
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
        description: 'Three full-size luxury essentials ($98 combined value): (1) 10 oz Phthalate-Free Soy Candle in Frosted Ivory Glass, (2) 6 oz Triple-Whipped Shea, Jojoba & Cashmere Body Butter, and (3) 4 oz Botanical Linen, Closet & Pillow Mist with Metazene®.'
      },
      {
        id: 'usecase',
        step: '04 • REAL-WORLD USE CASES',
        shortLabel: '3 Items in Action',
        title: 'Closet & Linens to Spa Vanity to Bedside Sanctuary: All 3 Items in Action',
        image: 'assets/images/box-women-usecase.jpg',
        description: '1. Mist the Metazene® Botanical Spray over bedding, cashmere knits, or yoga totes to neutralize odors at the molecular level. 2. Massage the triple-whipped Shea & Cashmere Body Butter into warm post-shower skin. 3. Light the 55–65 hr Frosted Ivory Soy Candle.'
      }
    ]
  }
};

export const ODOR_SCIENCE_DATA = {
  headline: 'Dual-Action Molecular Odor Elimination',
  kicker: 'Physical Adsorption + Metazene® Covalent Neutralization vs Synthetic Masking',
  lead: 'Athletic sweat, damp leather skate liners, and technical pads generate volatile organic compounds: thiols (sulfur bacteria), volatile amines (ammoniacal sweat breakdown), and isovaleric acid (pungent sweat-sock acid). Conventional aerosol sprays temporarily overpower nasal receptors with cheap synthetic perfumes, creating a sickening compound odor. Puck & Wick eliminates odors at the molecular level in two irreversible phases.',
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
      title: 'Metazene® Molecular Electron Alteration',
      metric: 'Irreversible Vapor-Phase Covalent Adduct',
      description:
        'Metazene® (an advanced aliphatic ester complex) reacts directly in the vapor phase with malodorous sulfur and nitrogen functional groups. By forming irreversible covalent bonds, it alters the molecule’s electron cloud geometry and steric conformation. Once altered, the malodor compound can no longer fit or bind to human olfactory receptor proteins (GPCRs)—cancelling odor perception permanently.'
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
      method: 'Puck & Wick Charcoal + Metazene®',
      verdict: 'Permanent Molecular Destruction',
      points: [
        'Sub-2nm microporous matrix physically traps thiols, amines, and isovaleric acid',
        'Metazene® covalently alters malodor electron clouds, preventing olfactory receptor binding',
        '100% clean, phthalate-free, non-aerosol, hypoallergenic, and safe for premium leather & gear'
      ],
      isPositive: true
    }
  ]
};
