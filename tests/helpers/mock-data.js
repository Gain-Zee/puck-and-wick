/**
 * tests/helpers/mock-data.js
 * Test fixtures, canonical product specs, promo codes, and addresses.
 */

export const CANONICAL_CANDLES = [
  {
    id: 'candle-top-shelf',
    name: 'Top Shelf',
    price: 34.00,
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    topNotes: ['Kentucky Bourbon Cask', 'Bergamot Zest', 'Spiced Blood Orange'],
    middleNotes: ['Aged Tobacco Leaf', 'Charred White Oak', 'Saddle Leather'],
    baseNotes: ['Smoked Amber', 'Dark Vanilla Bean', 'Indonesian Sandalwood']
  },
  {
    id: 'candle-fresh-cut',
    name: 'Fresh Cut',
    price: 34.00,
    category: ['signature', 'fresh_clean'],
    burnTime: '55 - 65 hours',
    topNotes: ['Glacial Ozone', 'Frosted Eucalyptus', 'Spearmint Spark'],
    middleNotes: ['Crushed Pine Needles', 'Silver Fir', 'Alpine Rosemary'],
    baseNotes: ['Chilled Driftwood', 'White Cedarwood', 'Pure Musk']
  },
  {
    id: 'candle-balsam-fir',
    name: 'Balsam Fir',
    price: 36.00,
    category: ['seasonal', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    topNotes: ['Wild Juniper Berries', 'Fraser Pine', 'Spiced Clove Bud'],
    middleNotes: ['Resinous Balsam Fir', 'Blue Ridge Evergreen', 'Warm Cypress'],
    baseNotes: ['Earthy Patchouli', 'Cedarwood Bark', 'Golden Winter Amber']
  },
  {
    id: 'candle-barnwood-bourbon',
    name: 'Barnwood & Bourbon',
    price: 34.00,
    category: ['woods_rustic'],
    burnTime: '55 - 65 hours',
    topNotes: ['Small-Batch Rye Bourbon', 'Toasted Pecan', 'Orange Peel'],
    middleNotes: ['Weathered Barnwood Oak', 'Scorched Cedar', 'Burnt Maple'],
    baseNotes: ['Warm Amber Resin', 'Smoky Vetiver', 'Aged Vanilla']
  },
  {
    id: 'candle-rinkside-cedar-smoke',
    name: 'Rinkside Cedar & Smoke',
    price: 34.00,
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    topNotes: ['Chilled Winter Air', 'Birchwood Smoke', 'Crushed Black Pepper'],
    middleNotes: ['Atlas Cedarwood', 'Oiled Glove Leather', 'Wild Sage'],
    baseNotes: ['Charred Oak Embers', 'Incense Resin', 'Earthy Vetiver Root']
  },
  {
    id: 'candle-warm-amber-vanilla',
    name: 'Warm Amber & Vanilla Bean',
    price: 34.00,
    category: ['signature', 'woods_rustic'],
    burnTime: '55 - 65 hours',
    topNotes: ['Golden Bergamot', 'French Vanilla Cream'],
    middleNotes: ['Baltic Amber', 'Cashmere Musk', 'Spiced Tonka Bean'],
    baseNotes: ['Madagascar Vanilla Bean', 'Warm Benzoin', 'Cedar']
  },
  {
    id: 'candle-locker-room-mint',
    name: 'Locker Room Mint & Eucalyptus',
    price: 34.00,
    category: ['signature', 'fresh_clean'],
    burnTime: '55 - 65 hours',
    topNotes: ['Crushed Spearmint', 'Icy Peppermint Leaf', 'Lemon Rind'],
    middleNotes: ['Blue Gum Eucalyptus', 'Clary Sage', 'Tea Tree Leaves'],
    baseNotes: ['Crisp Mountain Salt', 'White Pine', 'Clean Cedar']
  }
];

export const PROMO_CODES = {
  valid10: { code: 'PUCK10', discountPercent: 10 },
  valid15: { code: 'BLUEHYDRANGEA', discountPercent: 15 },
  valid20: { code: 'FOUNDER20', discountPercent: 20 },
  invalid: 'DISCOUNT99'
};

export const MOCK_CUSTOMERS = {
  standardShipping: {
    fullName: 'Alex Ovechkin',
    email: 'alex@puckandwick-test.com',
    phone: '703-555-0808',
    fulfillment: 'shipping',
    street: '100 Ice Rink Way',
    city: 'Ashburn',
    state: 'VA',
    zip: '20147',
    notes: 'Please leave on porch near hockey bag.'
  },
  localPickup: {
    fullName: 'Hannah Miller',
    email: 'hannah@loudoun-living.org',
    phone: '540-555-0199',
    fulfillment: 'local_pickup',
    pickupLocation: 'The Blue Hydrangea, 604 E. Main St., Purcellville, VA 20132',
    notes: 'Will pick up during Saturday boutique hours.'
  }
};

export const EXCLUSIVE_BOX_CONFIG = {
  price: 78.00,
  compareAtValue: 98.00,
  menEdition: {
    title: "Men's / Athlete Exclusive Box",
    candleDefault: 'candle-top-shelf',
    puckItem: 'Hockey Puck Activated Charcoal & Metazene® Odor Killer',
    bodyWashItem: 'Athlete Metazene® + Charcoal Odor-Eliminating Body Wash (8 oz)'
  },
  womenEdition: {
    title: "Women's Exclusive Box",
    candleDefault: 'candle-fresh-cut',
    puckItem: 'Botanical & Charcoal Linen/Gym Refresher Puck',
    bodyWashItem: 'Luxe Exfoliating & Nourishing Spa Body Wash (8 oz)'
  }
};
