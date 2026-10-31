/**
 * Puck & Wick Exclusive Box Configurations & Odor Science Data
 * Defines Men's/Athlete Edition vs Women's Luxury Sanctuary Edition bundles ($98 / $124 value)
 * with complete 3-tier olfactory note breakdowns and molecular odor-neutralization science.
 */

export const EXCLUSIVE_BOX_EDITIONS = {
  men_athlete: {
    id: 'men_athlete',
    badge: 'Matte Obsidian & Gold • Founder’s #98 Edition',
    title: "Men's / Athlete Exclusive Box",
    subtitle: '10 oz Matte Obsidian Candle + 3.0" Lauson-98™ Gear Puck + 8 oz Detox Body Wash',
    price: 98.00,
    compareAtValue: 124.00,
    savings: 26.00,
    defaultCandleId: 'candle-top-shelf',
    photo: 'assets/images/box-men-open.jpg',
    description:
      'Engineered in Matte Obsidian & Brushed Gold (#98 Founder Jersey Tribute). Pairs your choice of 10 oz soy candle with our Lauson-98™ + Activated Charcoal gear puck and 8 oz detox body wash.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Matte Obsidian Vessel)',
        detail: '55–65 Hr Clean Burn • 100% American Soy Wax',
        retailValue: '$36.00'
      },
      puck: {
        title: '3.0" Lauson-98™ & Activated Charcoal Odor Puck',
        detail: 'Vented anodized shell with >1,000 m²/g coconut carbon & proprietary Lauson-98™ molecular core for hockey bags, skates & lockers.',
        notes: 'Active Matrix: Sub-2nm Coconut Carbon (>1,000 m²/g) • Lauson-98™ Proprietary Vapor-Phase Neutralizer',
        retailValue: '$44.00'
      },
      bodyWash: {
        title: '8 oz Athlete Charcoal & Lauson-98™ Detox Body Wash',
        detail: 'Deep-cleansing binchotan charcoal, blue eucalyptus & Lauson-98™ post-game shower wash.',
        notes: 'Notes: Blue Eucalyptus & Peppermint • Binchotan Charcoal & Black Spruce • Atlas Cedarwood & Lauson-98™',
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
        description: 'Precision-cut charcoal foam cradles your 10 oz Matte Obsidian Soy Candle, 3.0" Lauson-98™ Gear Puck, and 8 oz Athlete Detox Body Wash.'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Heavy-Weight Matte Obsidian Magnetic Gift Box (Closed)',
        image: 'assets/images/box-men-closed.jpg',
        description: '1200gsm matte-black rigid board with concealed magnetic closure and hot-stamped metallic gold Precision Mark™ emblem.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items',
        title: 'All 3 Full-Size Men’s / Athlete Components ($124 Value)',
        image: 'assets/images/box-men-items-out.jpg',
        description: '(1) 10 oz American Soy Candle ($36), (2) 3.0" Lauson-98™ + Charcoal Gear Puck ($44), and (3) 8 oz Detox Body Wash ($44).'
      },
      {
        id: 'usecase',
        step: '04 • IN ACTION',
        shortLabel: 'In Action',
        title: 'Rink to Shower to Living Room: All 3 Items in Action',
        image: 'assets/images/box-men-usecase.jpg',
        description: 'Drop the Lauson-98™ Puck in your gear bag, strip post-game sweat with Charcoal Body Wash, and light your 10 oz Soy Candle.'
      }
    ]
  },
  women_luxe: {
    id: 'women_luxe',
    badge: 'Warm Frosted Ivory & Gold • Sanctuary #98 Edition',
    title: "Women's Sanctuary Exclusive Box",
    subtitle: '10 oz Frosted Ivory Candle + 3.0" White/Ivory Sanctuary Puck + 4 oz Botanical Linen Mist',
    price: 98.00,
    compareAtValue: 124.00,
    savings: 26.00,
    defaultCandleId: 'candle-top-shelf',
    photo: 'assets/images/box-women-open.jpg',
    description:
      'Crafted in Warm Frosted Ivory & Champagne Gold (#98 Founder Tribute). Pairs your choice of 10 oz soy candle with our 3.0" Warm Ivory/White Lauson-98™ + Carbon Workout Tote & Closet Puck and 4 oz Lauson-98™ Botanical Linen Mist.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Frosted Ivory Vessel)',
        detail: '55–65 Hr Clean Burn • Phthalate-Free Botanical Oils',
        retailValue: '$36.00'
      },
      puck: {
        title: '3.0" Warm Ivory/White & Gold Sanctuary Workout Tote & Closet Puck',
        detail: 'Vented warm ivory & champagne-gold anodized shell with >1,000 m²/g coconut carbon & Lauson-98™ molecular core for yoga bags, workout totes & walk-in closets.',
        notes: 'Active Matrix: Sub-2nm Coconut Carbon (>1,000 m²/g) • Lauson-98™ Proprietary Vapor-Phase Neutralizer • Zero Perfumes',
        retailValue: '$44.00'
      },
      bodyWash: {
        title: '4 oz Botanical Linen, Closet & Pillow Mist with Lauson-98™',
        detail: 'Fine-mist atomizer powered by our proprietary Lauson-98™ complex, French lavender & white tea to neutralize fabric odors (Luxe Spa Care).',
        notes: 'Active Matrix: Lauson-98™ Vapor-Phase Complex • French Lavender Hydrosol & White Tea • Zero Fabric Residue',
        retailValue: '$44.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Warm Alabaster-Ivory & Champagne-Gold Magnetic Box (Open)',
        image: 'assets/images/box-women-open.jpg',
        description: 'Warm cream suede-touch foam cradles your 10 oz Unlit Frosted Ivory Soy Candle, 3.0" Warm Ivory/White Sanctuary Puck, and 4 oz Botanical Linen Mist.'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Warm Ivory & Champagne-Gold Magnetic Gift Box (Closed)',
        image: 'assets/images/box-women-closed.jpg',
        description: 'Rigid magnetic keepsake box in warm alabaster-ivory matte linen board with brushed champagne-gold Precision Mark™ emblem.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items',
        title: 'All 3 Full-Size Women’s Sanctuary Components ($124 Value)',
        image: 'assets/images/box-women-items-out.jpg',
        description: '(1) 10 oz Soy Candle in Frosted Ivory Glass ($36), (2) 3.0" Warm Ivory/White Sanctuary Workout Tote & Closet Puck ($44), and (3) 4 oz Lauson-98™ Linen Mist ($44).'
      },
      {
        id: 'usecase',
        step: '04 • IN ACTION',
        shortLabel: 'In Action',
        title: 'Yoga Tote & Closet to Linens to Bedside Sanctuary',
        image: 'assets/images/box-women-usecase.jpg',
        description: 'Tuck the 3.0" Warm Ivory Sanctuary Puck into your yoga or workout tote bag, refresh fabrics with Lauson-98™ Botanical Mist, and light your Frosted Ivory Candle.'
      }
    ]
  }
};

export const ODOR_SCIENCE_DATA = {
  headline: 'Lauson-98™ Dual-Action Odor Science',
  kicker: 'Activated Charcoal Adsorption + Lauson-98™ Molecular Neutralization vs Masking Sprays',
  lead: 'Sweat, skate liners, and gear bags generate stubborn, deep-seated odor molecules. Unlike conventional aerosol sprays that mask stench with heavy perfumes, Puck & Wick™ destroys odor at the molecular level in two stages.',
  stages: [
    {
      id: 'charcoal',
      step: 'STAGE 01 • PHYSICAL ADSORPTION',
      title: 'Activated Coconut Charcoal (>1,000 m²/g)',
      metric: '> 1,000 m²/gram Surface Area • < 2 nm Micropores',
      description:
        'Steam-activated coconut shell carbon creates a sub-2nm microporous matrix (>1,000 m²/g) that physically traps airborne sweat and gear odor molecules directly out of air and fabric.'
    },
    {
      id: 'lauson98',
      step: 'STAGE 02 • MOLECULAR NEUTRALIZATION',
      title: 'Lauson-98™ Proprietary Vapor Complex',
      metric: 'Born in Lausanne • #98 Tribute • Zero Masking Perfumes',
      description:
        'Our proprietary Swiss-inspired Lauson-98™ vapor-phase complex bonds directly to airborne malodor molecules, permanently neutralizing their structure so they can never trigger human olfactory receptors.'
    }
  ],
  comparison: [
    {
      method: 'Conventional Masking Sprays',
      verdict: 'Temporary Perfume Overload',
      points: [
        'Floods air with synthetic perfumes & propellants that rebound in 2 hours',
        'Leaves sticky residue on technical gear & leather liners'
      ],
      isPositive: false
    },
    {
      method: 'Puck & Wick™ Lauson-98™ + Carbon',
      verdict: 'Permanent Molecular Destruction',
      points: [
        'Sub-2nm coconut carbon (>1,000 m²/g) physically traps deep gear & sweat odors',
        'Proprietary Lauson-98™ complex permanently neutralizes odors with zero residue'
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
    description: 'Identical architectural vessel geometry and minimalist square gold-foil Precision Mark™ emblem in Matte Obsidian and Warm Frosted Ivory.'
  },
  {
    id: 'ivory_lineup',
    step: '06 • SANCTUARY IVORY LINEUP',
    shortLabel: '3 Ivory Candles',
    title: 'The Sanctuary Ivory Candle Collection (10 oz Soy Vessels)',
    image: 'assets/images/womens-candle-lineup.jpg',
    description: 'Cashmere & White Tea, Velvet Vanilla & Santal, and Sea Salt & White Orchid in warm frosted alabaster-ivory glass.'
  }
];
