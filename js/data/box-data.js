/**
 * Puck & Wick Exclusive Box Configurations & Odor Science Data
 * Defines Men's/Athlete Edition vs Women's Luxury Edition bundles ($78 / $98 value)
 * and molecular odor-neutralization educational breakdown.
 */

export const EXCLUSIVE_BOX_EDITIONS = {
  men_athlete: {
    id: 'men_athlete',
    badge: 'Locker-Room & Rink Engineered',
    title: "Men's / Athlete Exclusive Box",
    subtitle: 'Full-Size Hand-Poured Soy Candle + Activated Charcoal & Metazene® Gear Care',
    price: 78.00,
    compareAtValue: 98.00,
    savings: 20.00,
    defaultCandleId: 'candle-top-shelf',
    description:
      'Built for elite hockey players, gym athletes, and discerning home spaces. Combines your choice of 10 oz small-batch soy candle with our dual-action Metazene® + Activated Charcoal odor-eliminating gear puck and post-game body wash.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz)',
        detail: '55–65 Hour Clean Burn • 100% American Soy Wax • Custom Scent Selection',
        retailValue: '$34.00'
      },
      puck: {
        title: 'Hockey Puck Activated Charcoal & Metazene® Odor Killer',
        detail: 'Vulcanized breathable shell loaded with microporous bamboo charcoal (>1,000 m²/g) and Metazene® vapor-phase neutralizer for hockey bags, skates, and gym lockers.',
        retailValue: '$32.00'
      },
      bodyWash: {
        title: 'Athlete Metazene® + Charcoal Odor-Eliminating Body Wash (8 oz)',
        detail: 'Deep-cleansing detoxifying body wash formulated with activated binchotan charcoal, cold-pressed eucalyptus, and molecular odor neutralizers to strip post-rink sweat.',
        retailValue: '$32.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Custom-Cut Magnetic Presentation Box (Open)',
        image: 'assets/images/box-men-open.jpg',
        description: 'Precision-cut high-density charcoal foam cradles your choice of 10 oz signature matte-black soy candle alongside the vulcanized Activated Charcoal + Metazene® Gear Puck and 8 oz Athlete Body Wash.'
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
    badge: 'Botanical Apothecary & Spa Edition',
    title: "Women's Exclusive Box",
    subtitle: 'Full-Size Hand-Poured Soy Candle + Botanical Linen Puck & Luxe Spa Care',
    price: 78.00,
    compareAtValue: 98.00,
    savings: 20.00,
    defaultCandleId: 'candle-fresh-cut',
    description:
      'A refined sanctuary curation tailored for luxury home rituals, studio bags, and post-workout restoration. Pairs your signature 10 oz Virginia soy candle with our botanical charcoal refresher puck and exfoliating spa wash.',
    bundledItems: {
      candle: {
        role: '1x Full-Size Hand-Poured Soy Candle (10 oz)',
        detail: '55–65 Hour Clean Burn • Phthalate-Free Botanical Oils • Custom Scent Selection',
        retailValue: '$34.00'
      },
      puck: {
        title: 'Botanical & Charcoal Linen / Gym Tote Refresher Puck',
        detail: 'Silky matte sachet puck infused with coconut-shell activated carbon, Metazene® neutralizer, and crushed white lavender to purify yoga totes, closets, and travel bags.',
        retailValue: '$32.00'
      },
      bodyWash: {
        title: 'Luxe Exfoliating & Nourishing Spa Body Wash (8 oz)',
        detail: 'Silky botanical gel enriched with jojoba micro-esters, shea butter, and clean molecular deodorizers for radiant, hydrated skin.',
        retailValue: '$32.00'
      }
    },
    galleryViews: [
      {
        id: 'open',
        step: '01 • INSIDE THE BOX',
        shortLabel: 'Open Box',
        title: 'Botanical Sanctuary Presentation Box (Open)',
        image: 'assets/images/box-women-open.jpg',
        description: 'Custom-contoured presentation interior showcasing our signature 10 oz matte-black soy candle, the champagne-gold & charcoal Botanical Refresher Puck, and the 8 oz Luxe Spa Body Wash.'
      },
      {
        id: 'closed',
        step: '02 • SEALED & GIFT-READY',
        shortLabel: 'Box Closed',
        title: 'Matte Obsidian & Champagne-Gold Magnetic Gift Box (Closed)',
        image: 'assets/images/box-women-closed.jpg',
        description: 'Rigid magnetic keepsake box finished in velvety matte obsidian with our signature minimalist gold-foil square frame, crossed sticks & flame emblem stamped on the lid.'
      },
      {
        id: 'items_out',
        step: '03 • FULL-SIZE LINEUP',
        shortLabel: '3 Items Unboxed',
        title: 'All 3 Full-Size Women’s Sanctuary Components Unboxed',
        image: 'assets/images/box-women-items-out.jpg',
        description: 'Three full-size essentials ($98 combined value): (1) 10 oz Phthalate-Free Virginia Soy Candle, (2) Activated Coconut Carbon + Metazene® Botanical Linen & Tote Puck, and (3) 8 oz Jojoba & Shea Spa Body Wash.'
      },
      {
        id: 'usecase',
        step: '04 • REAL-WORLD USE CASES',
        shortLabel: '3 Items in Action',
        title: 'Wardrobe & Tote to Spa Shower to Sanctuary: All 3 Items in Action',
        image: 'assets/images/box-women-usecase.jpg',
        description: '1. Place the Botanical Odor Puck in your walk-in closet, linen drawer, or Pilates/yoga tote to keep fabrics fresh. 2. Elevate your daily shower with the 8 oz Botanical Spa Body Wash. 3. Unwind bedside with the 55–65 hr clean-burning Soy Candle.'
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
