/**
 * Puck & Wick Brand & Label Concept Studio Data
 * 4 bespoke SVG logo identities and packaging label specifications replacing
 * legacy Word-style labels with cohesive retail-ready luxury packaging.
 */

import { SVG_LOGOS, getLogoSvg } from '../utils/svg-assets.js';

export { SVG_LOGOS, getLogoSvg };

export const LOGO_CONCEPTS = [
  {
    id: 1,
    slug: 'concept-1-crossed-sticks',
    name: 'Concept 1 — The Precision Mark (Square Hairline Frame)',
    shortTitle: 'The Precision Mark',
    archetype: 'The Precision Mark',
    tagline: 'Minimalist square gold hairline frame with razor-clean crossed hockey sticks, a radiant flame in the top V, and centered serif wordmark.',
    typography: 'Cormorant Garamond SemiBold + Wide Tracking',
    finish: 'Brushed Championship Gold Foil (#D4AF37) on Matte Obsidian (#0B0C0E)',
    bestFor: 'Flagship Signature Jars & Men/Athlete Gear Packaging',
    svg: SVG_LOGOS[1],
    getSvg: () => getLogoSvg(1)
  },
  {
    id: 2,
    slug: 'concept-2-heritage-shield',
    name: 'Concept 2 — The Precision Reserve (Vertical Double-Frame)',
    shortTitle: 'The Precision Reserve',
    archetype: 'The Precision Reserve',
    tagline: 'Tall architectural double-hairline frame combining the crossed sticks, flame, and vulcanized puck base with a diamond divider rule and "20 Years on the Ice" reserve stamp.',
    typography: 'Cormorant Garamond Display + Inter Geometric Sans',
    finish: 'Dual-Line Metallic Gold Foil with Center Diamond Rule',
    bestFor: 'Reserve Candle Releases, Gift Boxes & Founder Editions',
    svg: SVG_LOGOS[2],
    getSvg: () => getLogoSvg(2)
  },
  {
    id: 3,
    slug: 'concept-3-apothecary-stamp',
    name: 'Concept 3 — The Atelier Lockup (Open Architectural Rules)',
    shortTitle: 'The Atelier Lockup',
    archetype: 'The Atelier Lockup',
    tagline: 'Open-sided architectural lockup framed by top and bottom double gold hairlines, featuring the crossed blades, puck, and flame emblem above wide-tracked editorial typography.',
    typography: 'High-Contrast Editorial Serif + Minimalist Sans',
    finish: 'Open-Frame Satin Gold Foil on Matte Obsidian & Amber Glass',
    bestFor: 'The Blue Hydrangea Boutique Display & Modern Home Decor',
    svg: SVG_LOGOS[3],
    getSvg: () => getLogoSvg(3)
  },
  {
    id: 4,
    slug: 'concept-4-stamped-leather',
    name: 'Concept 4 — The Workshop Emblem (Double-Hairline Plaque)',
    shortTitle: 'The Workshop Emblem',
    archetype: 'The Workshop Emblem',
    tagline: 'Horizontal double-hairline workshop plaque uniting the crossed hockey blades, puck silhouette, and flame with crisp "Hand-Poured in Virginia" craftsmanship typography.',
    typography: 'Cormorant Garamond Bold + Stamped Workshop Sans',
    finish: 'Brushed Gold Foil Plaque on Matte Obsidian Vessel',
    bestFor: 'Woods & Rustic Collection (Barnwood & Bourbon, Rinkside Cedar)',
    svg: SVG_LOGOS[4],
    getSvg: () => getLogoSvg(4)
  }
];

export const MOCKUP_SCENT_SPECS = {
  'top-shelf': {
    id: 'top-shelf',
    productId: 'candle-top-shelf',
    name: 'TOP SHELF',
    displayTitle: 'Top Shelf',
    edition: 'No. 01 • Flagship Reserve',
    tagline: 'Kentucky Bourbon Cask • Aged Tobacco Leaf • Smoked Amber',
    notesLine: 'TOP: Bourbon Cask, Bergamot • HEART: Aged Tobacco, White Oak • BASE: Smoked Amber, Vanilla Bean',
    burnSpec: '10 OZ (283G) • 100% AMERICAN SOY WAX • 60 HR CLEAN BURN',
    batchCode: 'BATCH #PW-2026-TS01 • HAND-POURED IN LOUDOUN CO., VA',
    accentColor: '#D4AF37'
  },
  'fresh-cut': {
    id: 'fresh-cut',
    productId: 'candle-fresh-cut',
    name: 'FRESH CUT',
    displayTitle: 'Fresh Cut',
    edition: 'No. 02 • Rinkside Signature',
    tagline: 'Glacial Ozone • Crushed Pine Needles • White Cedarwood',
    notesLine: 'TOP: Glacial Ozone, Eucalyptus • HEART: Crushed Pine, Silver Fir • BASE: Chilled Driftwood, White Cedar',
    burnSpec: '10 OZ (283G) • 100% AMERICAN SOY WAX • 60 HR CLEAN BURN',
    batchCode: 'BATCH #PW-2026-FC02 • HAND-POURED IN LOUDOUN CO., VA',
    accentColor: '#93C5FD'
  }
};
