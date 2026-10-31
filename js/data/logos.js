/**
 * Puck & Wick Brand & Label Concept Studio Data
 * 4 bespoke SVG logo identities and packaging label specifications replacing
 * legacy Word-style labels with cohesive retail-ready luxury packaging.
 */

import { getLogoSvg } from '../utils/svg-assets.js';

export const LOGO_CONCEPTS = [
  {
    id: 1,
    slug: 'concept-1-crossed-sticks',
    name: 'Concept 1 — Minimalist Crossed Sticks & Flame',
    shortTitle: 'Crossed Sticks & Flame',
    archetype: 'The Precision Mark',
    tagline: 'Sleek crossed hockey sticks forming a geometric V with a radiant candle flame rising from a vulcanized puck base.',
    typography: 'Cormorant Garamond Bold + Inter Tracking',
    finish: 'Brushed Championship Gold Foil (#D4AF37) on Matte Obsidian (#0A0A0C)',
    bestFor: 'Flagship Signature Jars & Men/Athlete Gear Packaging',
    getSvg: () => getLogoSvg(1)
  },
  {
    id: 2,
    slug: 'concept-2-heritage-shield',
    name: 'Concept 2 — Heritage Crest / Shield ("20 Years on the Ice")',
    shortTitle: 'Heritage Shield Crest',
    archetype: 'The Championship Crest',
    tagline: 'Architectural heraldic shield uniting a burning wick, laurel wreath, puck silhouette, and "20 Years on the Ice" heritage seal.',
    typography: 'Cinzel Engraved Serif + Geometric Sans',
    finish: 'Embossed Metallic Gold Crest with Micro-Etched Border',
    bestFor: 'Limited Edition Releases, Gift Boxes & Founder Reserves',
    getSvg: () => getLogoSvg(2)
  },
  {
    id: 3,
    slug: 'concept-3-apothecary-stamp',
    name: 'Concept 3 — Modern Luxury Apothecary Stamp',
    shortTitle: 'Luxury Apothecary Stamp',
    archetype: 'The Botanical Monogram',
    tagline: 'Unisex architectural P&W monogram encased in a circular apothecary seal with Purcellville GPS coordinates (39.1368° N, 77.7144° W).',
    typography: 'High-Contrast Editorial Serif + Technical Monospace',
    finish: 'Satin Gold Stamping on Warm Parchment & Amber Glass',
    bestFor: 'The Blue Hydrangea Boutique Display & Unisex Home Decor',
    getSvg: () => getLogoSvg(3)
  },
  {
    id: 4,
    slug: 'concept-4-stamped-leather',
    name: 'Concept 4 — Rustic Stamped-Leather & Gold Foil Badge',
    shortTitle: 'Stamped Leather & Foil',
    archetype: 'The Workshop Emblem',
    tagline: 'Artisanal workshop plaque with corner brass rivets, saddle-stitch border, and bold stencil-inspired craftsmanship typography.',
    typography: 'Industrial Display Serif + Stamped Workshop Sans',
    finish: 'Distressed Gold Leaf & Matte Saddle-Hide Texture',
    bestFor: 'Woods & Rustic Collection (Barnwood & Bourbon, Rinkside Cedar)',
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
