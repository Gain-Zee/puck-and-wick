import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('instagram-kit/posts');
fs.mkdirSync(baseDir, { recursive: true });

const posts = [
  {
    folder: 'upload-01-womens-98-box-waitlist',
    gridPosition: 'Row 3, Right (Upload 1st)',
    title: "Women's $98 Sanctuary Collector Box — Batch 01 VIP Waitlist",
    slides: [
      'assets/images/box-women-open.jpg',
      'assets/images/box-women-items-out.jpg',
      'assets/images/box-women-usecase.jpg'
    ],
    caption: `COMING SOON • The $98 Women’s Sanctuary Collector Box (Batch 01 VIP Waitlist Now Open) 🤍✨

Designed for effortless quiet luxury from the studio to your nightstand. Our 3-piece Sanctuary Collector Box ($124 retail value for $98) pairs:
01 • Your choice of 10 oz Sanctuary Frosted-Ivory American Soy Candle (In Stock individually now)
02 • The 3.0" Warm Alabaster-Ivory & Champagne-Gold Lauson-98™ Odor Puck for yoga totes & walk-in closets
03 • 4 fl oz Botanical Linen, Cashmere & Pillow Mist

🕯️ Need a candle today? All 10 signature 10 oz Soy Candles ($36) are IN STOCK NOW online and at @bluehydrangeapurcellville.
✨ Tap the link in bio (puckandwick.com) to shop in-stock candles or join the Batch 01 VIP Waitlist for the $98 Sanctuary Box.

#PuckAndWick #LuxuryCandles #QuietLuxury #LoudounCountyVA #PurcellvilleVA #SanctuaryHome #SoyCandles #PilatesLife #HomeFragrance`
  },
  {
    folder: 'upload-02-mini-pucks-waitlist',
    gridPosition: 'Row 3, Center (Upload 2nd)',
    title: '2.0" Skate, Glove & Boot Mini Pucks (Twin-Pack) — Drop 01 Waitlist',
    slides: [
      'assets/images/mini-pucks-action-triptych.jpg',
      'assets/images/item-mini-pucks-pair.jpg',
      'assets/images/packaging/mini-puck-step-1.jpg',
      'assets/images/packaging/mini-puck-step-2.jpg',
      'assets/images/packaging/mini-puck-step-3.jpg'
    ],
    caption: `DROP 01 PREVIEW • 2.0" Skate, Glove & Boot Mini Pucks (Twin-Pack • $38) 🏒🖤

After 25 years on the ice, we knew sprays only mask gear odor with wet perfume. So we engineered a permanent solid-state solution.

Machined with a 360° double-ring of 72 micro-perforated vents and diamond-knurled cross-flow intake slots, each 2.0" (50mm) Mini Puck drops straight inside:
01 • Left & right hockey glove wrist cuffs
02 • Skate boot ankle collars & athletic cleats
03 • Work boots & daily runners

Powered by steam-activated coconut shell carbon + our proprietary Lauson-98™ molecular lock to trap moisture and destroy sweat VOCs overnight for up to 6 months.

✨ Batch 01 VIP Waitlist is now open at puckandwick.com (link in bio) — plus shop our 10 in-stock American Soy Candles ($36) available right now.

#PuckAndWick #HockeyLife #HockeyGear #BeerLeagueHockey #YouthHockey #HockeyMom #LoudounCounty #OdorEliminator #IndustrialDesign`
  },
  {
    folder: 'upload-03-mens-98-box-waitlist',
    gridPosition: 'Row 3, Left (Upload 3rd)',
    title: "Men's $98 Athlete Collector Box — Batch 01 VIP Waitlist",
    slides: [
      'assets/images/box-men-open.jpg',
      'assets/images/box-men-items-out.jpg',
      'assets/images/box-men-usecase.jpg'
    ],
    caption: `COMING SOON • The $98 Men’s Athlete Collector Box (Batch 01 VIP Waitlist Open) 🖤🔥

Built for the locker room, the shower, and the den. The 3-piece Men’s Collector Box ($124 value for $98) includes:
01 • Your choice of 10 oz Matte-Obsidian American Soy Candle (In Stock individually now for $36)
02 • The 3.0" Heavyweight Matte-Black & Brushed-Gold Lauson-98™ Gear & Locker Puck
03 • 8 fl oz Athlete Binchotan Charcoal & Blue Eucalyptus Body Wash

🕯️ Want the candle today? All 10 signature 100% American Soy Candles ($36) are IN STOCK NOW at puckandwick.com and @bluehydrangeapurcellville.
✨ Tap the link in bio to shop in-stock candles or reserve your spot on the Batch 01 VIP Waitlist.

#PuckAndWick #MensGrooming #HockeyPlayer #LuxuryGiftBox #SoyCandles #LoudounVA #PurcellvilleVA #SmallBatchCandles`
  },
  {
    folder: 'upload-04-sanctuary-ivory-candles-in-stock',
    gridPosition: 'Row 2, Right (Upload 4th)',
    title: "Women's Sanctuary Ivory Soy Candles — In Stock Now ($36)",
    slides: [
      'assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg',
      'assets/images/packaging/shelf-candle-sea-salt-orchid.jpg',
      'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg',
      'assets/images/packaging/atelier-card-ivory.jpg'
    ],
    caption: `IN STOCK NOW • The Women’s Sanctuary Ivory Collection ($36) 🤍🕯️

Hand-poured in small batches in Loudoun County, Virginia using 100% American soy wax, clean phthalate-free fragrance oils, and lead-free braided cotton wicks for a 60–70 hour memory burn.

Swipe through our Sanctuary pours:
• Velvet Vanilla & Santal (Australian Santal • Cardamom • Madagascar Vanilla)
• Sea Salt & White Orchid (Ocean Fleur de Sel • White Orchid • Driftwood)
• Cashmere & White Tea (Bergamot • Steamed White Tea • Cashmere Musk)

Every vessel arrives in our custom two-piece rigid collector box with a gold metallic neck, seeded wax dust cover, and 3.5"×3.5" Atelier Story Card.

🛒 Shop online now at puckandwick.com (link in bio) or pick up in store at @bluehydrangeapurcellville!

#PuckAndWick #SanctuaryCollection #SoyCandles #LuxuryHomeFragrance #LoudounCountyVA #PurcellvilleVA #ShopLocalVA #HandPouredCandles`
  },
  {
    folder: 'upload-05-founder-story-atelier-card',
    gridPosition: 'Row 2, Center (Upload 5th)',
    title: '25 Years on the Ice → Hand-Poured in Loudoun County, VA',
    slides: [
      'assets/images/packaging/atelier-card-obsidian.jpg',
      'assets/images/packaging/shelf-candle-rinkside-cedar-smoke.jpg',
      'assets/images/packaging/shelf-candle-locker-room-mint.jpg'
    ],
    caption: `TWENTY-FIVE YEARS ON THE ICE → HAND-POURED IN LOUDOUN CO., VA 🏒🕯️

Born in Lausanne, Switzerland with Bulgarian roots and shaped by 25 years of competitive hockey, Puck & Wick™ started with a simple obsession: bringing the same discipline and precision from the rink into small-batch home fragrance and odor science.

Every 10 oz candle is hand-poured in Purcellville, VA under our QC #1 standard:
• 100% American-Grown Soy Wax
• Phthalate-Free, Paraben-Free Fine Fragrance Oils
• Lead-Free 100% Braided Cotton Wick (60–70 Hour Burn)

🕯️ Shop all 10 in-stock scents ($36) online at puckandwick.com or visit @bluehydrangeapurcellville.

#PuckAndWick #FounderStory #HockeyToHandPoured #LoudounCounty #PurcellvilleVA #VirginiaMaker #SmallBatchSoyCandles #LuxuryCandles`
  },
  {
    folder: 'upload-06-mens-obsidian-candles-in-stock',
    gridPosition: 'Row 2, Left (Upload 6th)',
    title: "Men's Matte-Obsidian Soy Candles — In Stock Now ($36)",
    slides: [
      'assets/images/packaging/shelf-candle-top-shelf.jpg',
      'assets/images/packaging/shelf-candle-barnwood-bourbon.jpg',
      'assets/images/packaging/shelf-candle-warm-amber-vanilla.jpg',
      'assets/images/packaging/shelf-candle-balsam-fir.jpg'
    ],
    caption: `IN STOCK NOW • The Matte-Obsidian Reserve Candle Line ($36) 🖤🔥

Rich, architectural woods, smoke, and reserve spirits—hand-poured into heavy matte-obsidian glass vessels with gold-foil framing and packaged in our signature two-piece rigid shoulder box.

Swipe to explore our flagship pours:
01 • Top Shelf (Saffron • Jasmine • Warm Amberwood)
02 • Barnwood & Bourbon (Aged Kentucky Bourbon • Charred Oak • Smoked Vanilla)
03 • Warm Amber & Vanilla (Golden Amber • Tahitian Vanilla • Sandalwood)
04 • Christmas in Virginia (Blue Ridge Balsam Fir • Cedarleaf • Hearth Smoke)

🛒 Available to ship today at puckandwick.com (link in bio) and in store at @bluehydrangeapurcellville.

#PuckAndWick #TopShelfCandle #MatteBlackCandles #LuxuryCandles #BourbonCandle #LoudounCountyVA #PurcellvilleVA #MensHomeDecor`
  },
  {
    folder: 'upload-07-pin-right-odor-pucks-drop-01',
    gridPosition: 'Row 1, Right — PIN THIS POST (Upload 7th)',
    title: 'PIN #3 (Top-Right): Lauson-98™ Anodized Odor Pucks — Drop 01 Waitlist',
    slides: [
      'assets/images/packaging/puck-men-angled-open.jpg',
      'assets/images/item-puck-men.jpg',
      'assets/images/item-puck-women.jpg',
      'assets/images/packaging/puck-men-gym-bag.jpg',
      'assets/images/packaging/puck-women-yoga-bag.jpg',
      'assets/images/packaging/puck-men-360-angles.jpg'
    ],
    caption: `DROP 01 WAITLIST OPEN • Meet the Lauson-98™ Odor Eliminating Hardware Pucks 🖤✨

Zero logos. Zero cheap plastic. Zero wet masking sprays.

Engineered from bead-blasted anodized aluminum with a brushed-gold bezel, a 360° perimeter double-ring of 96 micro-perforated diffusion ports, and diamond-knurled cross-flow intake slots:
• 3.0" Athlete Gear & Locker Puck ($44) — For hockey bags, gym duffels & lockers
• 3.0" Women’s Sanctuary Puck ($44) — For yoga totes, walk-in closets & sneakers
• 2.0" Skate, Glove & Boot Mini Pucks ($38 Twin-Pack) — Drops straight into glove cuffs & skate boots

✨ Join the Batch 01 VIP Waitlist right now at puckandwick.com (link in bio) for first access—and shop our 10 in-stock American Soy Candles ($36) while you wait!

#PuckAndWick #Lauson98 #QuietLuxury #IndustrialDesign #OdorEliminator #HockeyBag #GymBagEssentials #YogaTote #LoudounCountyVA`
  },
  {
    folder: 'upload-08-pin-center-sanctuary-ivory-hero',
    gridPosition: 'Row 1, Center — PIN THIS POST (Upload 8th)',
    title: 'PIN #2 (Top-Center): Sanctuary Ivory 10 oz Soy Candles — In Stock Now ($36)',
    slides: [
      'assets/images/candle-ivory.jpg',
      'assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg',
      'assets/images/packaging/atelier-card-ivory.jpg'
    ],
    caption: `AVAILABLE NOW • The Sanctuary Frosted-Ivory 10 oz Soy Candle Collection ($36) 🤍🕯️

Warm alabaster-ivory glass, champagne-gold detailing, and 60–70 hours of clean, non-toxic 100% American soy burn.

In Stock & Ready to Ship Today ($36):
• Velvet Vanilla & Santal
• Sea Salt & White Orchid
• Cashmere & White Tea
• Fresh Cut Peony & Rose

📍 Pick up locally at @bluehydrangeapurcellville (604 E. Main St, Purcellville, VA) or order online right now at puckandwick.com (link in bio).

#PuckAndWick #SanctuaryCandles #LuxurySoyCandles #VelvetVanilla #SantalCandle #PurcellvilleVA #LoudounCountyVA #CleanBurn`
  },
  {
    folder: 'upload-09-pin-left-mens-obsidian-hero',
    gridPosition: 'Row 1, Left — PIN THIS POST (Upload 9th)',
    title: 'PIN #1 (Top-Left): Matte Obsidian 10 oz Soy Candles — In Stock Now ($36)',
    slides: [
      'assets/images/candle-obsidian.jpg',
      'assets/images/packaging/shelf-candle-top-shelf.jpg',
      'assets/images/packaging/atelier-card-obsidian.jpg'
    ],
    caption: `AVAILABLE NOW • Puck & Wick™ 10 oz Matte-Obsidian American Soy Candles ($36) 🖤🕯️

Hand-poured in small batches in Loudoun County, Virginia after 25 years on the ice. Every 10 oz candle is crafted with 100% American soy wax, clean phthalate-free fragrance oils, and our signature rigid gold-neck collector box.

In Stock & Ready to Ship ($36):
• Top Shelf (Saffron • Jasmine • Warm Amberwood)
• Barnwood & Bourbon
• Rinkside Cedar & Smoke
• Locker Room Eucalyptus & Mint
• Warm Amber & Vanilla
• Christmas in Virginia (Balsam Fir)

🛒 Shop now at puckandwick.com (link in bio) or in store at @bluehydrangeapurcellville!

#PuckAndWick #LuxurySoyCandles #HandPouredInVirginia #LoudounCountyVA #PurcellvilleVA #HockeyLife #SmallBatchCandles #TopShelf`
  }
];

let guideMd = `# Puck & Wick™ (@puckandwick) — Complete Instagram Launch Guide

## 1. Profile Settings (Copy & Paste in Instagram → Edit Profile)

- **Profile Picture:** Upload [\`ig-profile-pic-circle-edition.png\`](./ig-profile-pic-circle-edition.png) *(or [\`ig-profile-pic-square-frame.png\`](./ig-profile-pic-square-frame.png))*
- **Name Field:**
\`\`\`text
Puck & Wick™ | Luxury Soy Candles & Odor Gear
\`\`\`
- **Category:** \`Candle Store\` *(or \`Home Goods Store\`)*
- **Website Link:**
  - **URL:** \`https://puckandwick.com\`
  - **Title:** \`Official Atelier & Online Store\`
- **Bio (145 characters — fits Instagram's 150-char limit):**
\`\`\`text
🕯️ 100% American Soy Candles — In Stock Now ($36)
🏒 25 Yrs on the Ice → Hand-Poured in Loudoun Co, VA
✨ Drop 01 Waitlist: Lauson-98™ Pucks & $98 Boxes
📍 Retail: @bluehydrangeapurcellville • Shop Online ↓
\`\`\`

---

## 2. Story Highlights (In Order Left → Right)
1. **Soy Candles** — Cover: [\`ig-highlight-3-candles.png\`](./ig-highlight-3-candles.png)
2. **Sanctuary** — Cover: [\`ig-highlight-4-sanctuary.png\`](./ig-highlight-4-sanctuary.png)
3. **Our Story** — Cover: [\`ig-highlight-5-story.png\`](./ig-highlight-5-story.png)
4. **Odor Pucks** — Cover: [\`ig-highlight-2-pucks.png\`](./ig-highlight-2-pucks.png)
5. **$98 Boxes** — Cover: [\`ig-highlight-1-boxes.png\`](./ig-highlight-1-boxes.png)

---

## 3. The 9-Post Grid (Upload in Exact Order \`01\` → \`09\`)
> **Why Upload \`01\` First and \`09\` Last?**
> Instagram pushes earlier posts down as you post new ones. Uploading \`upload-01\` through \`upload-09\` in numerical order places **Posts 07, 08, and 09** right across your **Top Row (Row 1)**! Once all 9 are posted, tap the \`...\` menu on Posts 09, 08, and 07 and select **Pin to your main grid**.

`;

for (const p of posts) {
  const dir = path.join(baseDir, p.folder);
  fs.mkdirSync(dir, { recursive: true });
  p.slides.forEach((srcRel, idx) => {
    const ext = path.extname(srcRel) || '.jpg';
    const destFile = path.join(dir, `slide-${idx + 1}${ext}`);
    fs.copyFileSync(path.resolve(srcRel), destFile);
  });
  fs.writeFileSync(path.join(dir, 'CAPTION.txt'), p.caption, 'utf8');

  guideMd += `### \`${p.folder}\` — ${p.title}\n`;
  guideMd += `- **Grid Placement:** ${p.gridPosition}\n`;
  guideMd += `- **Carousel Slides (${p.slides.length} photos in \`posts/${p.folder}/\`):**\n`;
  p.slides.forEach((_, idx) => {
    guideMd += `  - \`slide-${idx + 1}.jpg\`\n`;
  });
  guideMd += `- **Copy-Paste Caption:**\n\`\`\`text\n${p.caption}\n\`\`\`\n\n---\n\n`;
}

fs.writeFileSync(path.resolve('instagram-kit/INSTAGRAM-LAUNCH-GUIDE.md'), guideMd, 'utf8');
console.log('Generated all 9 post folders and INSTAGRAM-LAUNCH-GUIDE.md!');
