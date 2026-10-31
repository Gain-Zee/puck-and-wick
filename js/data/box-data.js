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
