/**
 * Puck & Wick Exclusive Box Configurations & Odor Science Data
 * Defines Men's/Athlete Edition vs Women's Luxury Sanctuary Edition bundles ($108 / $130 value)
 * with complete 3-tier olfactory note breakdowns and molecular odor-neutralization science.
 */

export const EXCLUSIVE_BOX_EDITIONS = {
  men_athlete: {
    id: 'men_athlete',
    badge: 'Matte Obsidian & Gold • Founder’s #98 Edition',
    title: "Men's / Athlete Deluxe Collector Box",
    subtitle: '10 oz Matte Obsidian Candle + 3.0" ZeoCarb-98™ Odor Puck + 8 oz Charcoal Detox Body Wash',
    price: 108.00,
    compareAtValue: 130.00,
    savings: 22.00,
    defaultCandleId: 'candle-top-shelf',
    photo: 'assets/images/box-men-open.jpg?v=52',
    description:
      'Engineered in Matte Obsidian & Brushed Champagne-Gold with a concealed front-flap magnetic closure. Pairs your choice of 10 oz unlit soy candle ($44) with our universal 3.0" ZeoCarb-98™ + Activated Charcoal Odor Puck ($48) and 8 oz Athlete Charcoal Body Wash ($38).',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Matte Obsidian Vessel • 8.5 oz Fill)',
        detail: '55–65 Hr Clean Burn • 100% American Soy Wax + ZeoCarb-98™',
        retailValue: '$44.00'
      },
      puck: {
        title: '3.0" ZeoCarb-98™ & Activated Charcoal Odor Puck',
        detail: 'Matte Obsidian & Brushed Champagne-Gold CNC anodized shell with >1,000 m²/g coconut carbon & ZeoCarb-98™ core. Covers up to 120 Sq. Ft. with 3-Axis Airflow (No Upside Down).',
        notes: 'Active Matrix: Sub-2nm Coconut Carbon (>1,000 m²/g) • ZeoCarb-98™ Proprietary Vapor-Phase Neutralizer',
        retailValue: '$48.00'
      },
      bodyWash: {
        title: '8 oz Athlete Charcoal & ZeoCarb-98™ Detox Body Wash',
        detail: 'Deep-cleansing binchotan charcoal, cold-pressed blue eucalyptus & ZeoCarb-98™ post-game shower pump bottle.',
        notes: 'Notes: Blue Eucalyptus & Peppermint • Binchotan Charcoal & Black Spruce • Atlas Cedarwood & ZeoCarb-98™',
        retailValue: '$38.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Custom-Cut Matte Obsidian Presentation Box (Open)',
        image: 'assets/images/box-men-open.jpg?v=52',
        description: 'Precision-cut charcoal foam cradles your 10 oz Unlit Matte Obsidian Soy Candle ($44), 3.0" ZeoCarb-98™ Odor Puck ($48), and 8 oz Athlete Detox Body Wash ($38).'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Heavy-Weight Matte Obsidian Magnetic Front-Flap Gift Box (Closed)',
        image: 'assets/images/box-men-closed.jpg?v=52',
        description: '1200gsm matte-black rigid board with overlapping front magnetic flap closure and hot-stamped metallic gold Precision Mark™ emblem.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items',
        title: 'All 3 Full-Size Men’s / Athlete Components ($130 Value)',
        image: 'assets/images/box-men-items-out.jpg?v=52',
        description: '(1) 10 oz American Soy Candle ($44), (2) 3.0" ZeoCarb-98™ + Charcoal Odor Puck ($48), and (3) 8 oz Detox Body Wash ($38).'
      },
      {
        id: 'usecase',
        step: '04 • IN ACTION',
        shortLabel: 'In Action',
        title: 'Rink to Shower to Living Room: All 3 Items in Action',
        image: 'assets/images/box-men-usecase.jpg?v=52',
        description: 'Drop the 3.0" ZeoCarb-98™ Puck in your locker or gear bag, strip post-game sweat with Charcoal Body Wash, and light your 10 oz Soy Candle.'
      }
    ]
  },
  women_luxe: {
    id: 'women_luxe',
    badge: 'Warm Alabaster Ivory & Gold • Sanctuary Edition',
    title: "Women's Sanctuary Deluxe Collector Box",
    subtitle: '10 oz Frosted Ivory Candle + 3.0" Obsidian & Gold Odor Puck + 8 oz White Clay & Silk Body Wash',
    price: 108.00,
    compareAtValue: 130.00,
    savings: 22.00,
    defaultCandleId: 'candle-cashmere-white-tea',
    photo: 'assets/images/box-women-open.jpg?v=52',
    description:
      'Crafted in Warm Alabaster-Ivory & Brushed Champagne-Gold with an overlapping front magnetic flap closure. Pairs your choice of 10 oz Sanctuary soy candle ($44) with our signature 3.0" Matte Obsidian & Champagne-Gold ZeoCarb-98™ Odor Puck ($48) and 8 oz Sanctuary White Clay & Silk Body Wash ($38).',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz Frosted Ivory Vessel • 8.5 oz Fill)',
        detail: '55–65 Hr Clean Burn • Phthalate-Free Botanical Oils + ZeoCarb-98™',
        retailValue: '$44.00'
      },
      puck: {
        title: '3.0" ZeoCarb-98™ Obsidian & Champagne-Gold Odor Puck',
        detail: 'Signature Matte Obsidian & Brushed Champagne-Gold anodized hardware with >1,000 m²/g coconut carbon & ZeoCarb-98™ core for yoga totes & walk-in closets (Up to 120 Sq. Ft.).',
        notes: 'Active Matrix: Sub-2nm Coconut Carbon (>1,000 m²/g) • ZeoCarb-98™ Proprietary Vapor-Phase Neutralizer • 3-Axis Airflow',
        retailValue: '$48.00'
      },
      bodyWash: {
        title: '8 oz Sanctuary White Clay & Silk Body Wash with ZeoCarb-98™',
        detail: 'Frosted Warm Ivory apothecary pump bottle with Kaolin white clay, spun silk amino acids, imperial white tea & ZeoCarb-98™.',
        notes: 'Notes: Imperial White Tea & Bergamot • Kaolin White Clay & Silk Amino Acids • Blond Hinoki & ZeoCarb-98™',
        retailValue: '$38.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Warm Alabaster-Ivory & Champagne-Gold Magnetic Box (Open)',
        image: 'assets/images/box-women-open.jpg?v=52',
        description: 'Warm cream suede-touch foam cradles your 10 oz Unlit Frosted Ivory Soy Candle ($44), 3.0" Obsidian & Champagne-Gold ZeoCarb-98™ Puck ($48), and 8 oz White Clay & Silk Body Wash ($38).'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Warm Ivory & Champagne-Gold Magnetic Front-Flap Gift Box (Closed)',
        image: 'assets/images/box-women-closed.jpg?v=52',
        description: 'Rigid magnetic front-flap keepsake box in warm alabaster-ivory matte linen board with brushed champagne-gold Precision Mark™ emblem.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items',
        title: 'All 3 Full-Size Women’s Sanctuary Components ($130 Value)',
        image: 'assets/images/box-women-items-out.jpg?v=52',
        description: '(1) 10 oz Unlit Soy Candle in Frosted Ivory Glass ($44), (2) 3.0" Obsidian & Champagne-Gold ZeoCarb-98™ Puck ($48), and (3) 8 oz White Clay & Silk Body Wash ($38).'
      },
      {
        id: 'usecase',
        step: '04 • IN ACTION',
        shortLabel: 'In Action',
        title: 'Yoga Tote & Closet to Spa Shower to Bedside Sanctuary',
        image: 'assets/images/box-women-usecase.jpg?v=52',
        description: 'Tuck the 3.0" ZeoCarb-98™ Puck into your yoga tote or walk-in closet, purify skin with White Clay & Silk Body Wash, and light your Frosted Ivory Candle.'
      }
    ]
  }
};

export const ODOR_SCIENCE_DATA = {
  headline: 'ZeoCarb-98™ Dual-Action Odor Science',
  kicker: 'Activated Charcoal Adsorption + ZeoCarb-98™ Molecular Neutralization vs Masking Sprays',
  lead: 'Sweat, skate liners, workout totes, and gear bags generate stubborn, deep-seated odor molecules. Unlike conventional aerosol sprays that mask stench with heavy perfumes, Puck & Wick™ destroys odor at the molecular level in two stages.',
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
      title: 'ZeoCarb-98™ Proprietary Vapor Complex',
      metric: 'Swiss-Inspired Precision • #98 Tribute • Zero Masking Perfumes',
      description:
        'Our proprietary Swiss-inspired ZeoCarb-98™ vapor-phase complex bonds directly to airborne malodor molecules, permanently neutralizing their structure so they can never trigger human olfactory receptors.'
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
      method: 'Puck & Wick™ ZeoCarb-98™ + Carbon',
      verdict: 'Permanent Molecular Destruction',
      points: [
        'Sub-2nm coconut carbon (>1,000 m²/g) physically traps deep gear & sweat odors',
        'Proprietary ZeoCarb-98™ complex permanently neutralizes odors with zero residue'
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
