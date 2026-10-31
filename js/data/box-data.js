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
    }
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
    }
  }
};

export const ODOR_SCIENCE_DATA = {
  headline: 'Dual-Action Molecular Odor Elimination',
  kicker: 'Why Activated Charcoal + Metazene® Outperform Conventional Sprays',
  lead: 'Locker room sweat, damp skate liners, and athletic gear produce volatile sulfur compounds, amines, and isovaleric acid. Conventional aerosol sprays merely coat gear in heavy synthetic perfume—masking the stench temporarily before mixing into a worse odor. Puck & Wick destroys odor molecules permanently in two stages.',
  stages: [
    {
      id: 'charcoal',
      step: 'STAGE 01 • PHYSICAL ADSORPTION',
      title: 'Microporous Activated Charcoal Matrix',
      metric: '> 1,000 m²/gram Surface Area',
      description:
        'Steam-activated coconut and bamboo charcoal creates a vast labyrinth of microscopic pores. Through Van der Waals dispersion forces, this high-surface-area carbon lattice physically traps airborne moisture, bacterial byproducts, and heavy organic odor molecules directly out of your hockey bag or gym tote.'
    },
    {
      id: 'metazene',
      step: 'STAGE 02 • CHEMICAL NEUTRALIZATION',
      title: 'Metazene® Covalent Molecular Bonding',
      metric: 'Irreversible Vapor-Phase Neutralization',
      description:
        'Metazene® (an advanced aliphatic ester complex) reacts directly with malodorous nitrogen and sulfur functional groups in the vapor phase. By forming permanent covalent bonds, it increases the molecular weight of volatile odor compounds and forces them to drop out of the air—resulting in true zero-odor neutrality.'
    }
  ],
  comparison: [
    {
      method: 'Conventional Masking Sprays',
      verdict: 'Temporary Cover-Up',
      points: [
        'Floods air with heavy synthetic fragrance and propellants',
        'Leaves sticky chemical residue inside skates and athletic fabrics',
        'Odor rebounds within 2–3 hours as perfume evaporates'
      ],
      isPositive: false
    },
    {
      method: 'Puck & Wick Charcoal + Metazene®',
      verdict: 'Permanent Molecular Eradication',
      points: [
        'Physically traps moisture and adsorbs volatile organic compounds',
        'Chemically bonds and neutralizes sulfur and amine odor molecules',
        '100% phthalate-free, non-toxic, and safe for skin & premium gear'
      ],
      isPositive: true
    }
  ]
};
