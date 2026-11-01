import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();

function imgDataUri(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const IMGS = {
  candleObsidian: imgDataUri('assets/images/candle-obsidian.jpg'),
  candleIvory: imgDataUri('assets/images/candle-ivory.jpg'),
  candleEmerald: imgDataUri('assets/images/packaging/shelf-candle-balsam-fir.jpg'),
  candleAmber: imgDataUri('assets/images/candle-amber.jpg'),
  candleFrost: imgDataUri('assets/images/packaging/shelf-candle-fresh-cut.jpg'),
  shelfMens: imgDataUri('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  shelfWomens: imgDataUri('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
  cardMens: imgDataUri('assets/images/packaging/atelier-card-obsidian.jpg'),
  boxMenOpen: imgDataUri('assets/images/box-men-open.jpg'),
  boxMenClosed: imgDataUri('assets/images/box-men-closed.jpg'),
  boxWomenOpen: imgDataUri('assets/images/box-women-open.jpg'),
  boxWomenClosed: imgDataUri('assets/images/box-women-closed.jpg'),
  puckMenStudio: imgDataUri('assets/images/item-puck-men.jpg'),
  puckMenStall: imgDataUri('assets/images/packaging/puck-men-locker.jpg'),
  puckMenBag: imgDataUri('assets/images/packaging/puck-men-gym-bag.jpg'),
  puckWomenStudio: imgDataUri('assets/images/item-puck-women.jpg'),
  puckWomenCloset: imgDataUri('assets/images/packaging/puck-women-closet.jpg'),
  miniPuckPair: imgDataUri('assets/images/item-mini-pucks-pair.jpg'),
  washMen: imgDataUri('assets/images/item-bodywash-men.jpg'),
  mistWomen: imgDataUri('assets/images/item-mist-women.jpg')
};

// ============================================================================
// 1. JO MALONE LONDON INSPIRED LUXURY REDESIGN (5-Page Editorial & UX Deck)
// ============================================================================
const joMaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick™ — Jo Malone London Inspired Website Redesign</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: 1440px 1020px;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: #FAF7F2;
    color: #111111;
    font-family: 'Inter', -apple-system, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pdf-page {
    width: 1440px;
    height: 1020px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
  }
  .serif {
    font-family: 'Cormorant Garamond', Georgia, serif;
  }
  /* Page Ribbon Footer */
  .deck-footer {
    height: 36px;
    background: #111111;
    color: #FAF7F2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: auto;
    flex-shrink: 0;
  }
  /* Jo Malone Style Top Header */
  .jm-announcement {
    background: #111111;
    color: #FAF7F2;
    text-align: center;
    padding: 9px 24px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .jm-header {
    background: #FAF7F2;
    border-bottom: 1px solid #111111;
    padding: 20px 56px 14px;
  }
  .jm-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .jm-header-left, .jm-header-right {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #111111;
    width: 300px;
  }
  .jm-header-right {
    justify-content: flex-end;
  }
  .jm-brand-center {
    text-align: center;
  }
  .jm-brand-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0.22em;
    color: #111111;
    line-height: 1;
  }
  .jm-brand-sub {
    font-size: 9.5px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #55524D;
    margin-top: 5px;
  }
  .jm-nav {
    display: flex;
    justify-content: center;
    gap: 44px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: #111111;
  }
  .jm-nav span.active {
    border-bottom: 1.5px solid #111111;
    padding-bottom: 4px;
  }

  /* Page 1 Hero Split */
  .jm-hero {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    flex: 1;
    min-height: 0;
    border-bottom: 1px solid #111111;
  }
  .jm-hero-visual {
    position: relative;
    background: #EAE4D8;
    overflow: hidden;
    border-right: 1px solid #111111;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .jm-hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .jm-hero-floating-badge {
    position: absolute;
    bottom: 28px;
    left: 28px;
    background: rgba(250, 247, 242, 0.96);
    border: 1px solid #111111;
    padding: 12px 18px;
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .jm-hero-copy {
    background: #F4EFE6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 56px;
    position: relative;
  }
  .jm-framed-card {
    background: #FAF7F2;
    border: 1px solid #111111;
    padding: 42px 40px;
    box-shadow: 8px 8px 0px #111111;
  }
  .jm-kicker {
    font-size: 10.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #6E685F;
    margin-bottom: 12px;
    font-weight: 600;
  }
  .jm-h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 44px;
    font-weight: 500;
    line-height: 1.08;
    color: #111111;
    margin-bottom: 18px;
  }
  .jm-lead {
    font-size: 13.5px;
    line-height: 1.65;
    color: #3D3A36;
    margin-bottom: 26px;
  }
  .jm-btn-row {
    display: flex;
    gap: 14px;
  }
  .jm-btn-black {
    background: #111111;
    color: #FAF7F2;
    padding: 14px 26px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    border: 1px solid #111111;
  }
  .jm-btn-outline {
    background: transparent;
    color: #111111;
    padding: 14px 24px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    border: 1px solid #111111;
  }
  /* 3-Pillar Strip */
  .jm-trio-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FAF7F2;
    height: 165px;
  }
  .jm-trio-cell {
    border-right: 1px solid #111111;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .jm-trio-cell:last-child {
    border-right: none;
  }
  .jm-trio-cell img {
    width: 118px;
    height: 118px;
    object-fit: cover;
    border: 1px solid #111111;
    flex-shrink: 0;
  }
  .jm-trio-meta h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .jm-trio-meta p {
    font-size: 11.5px;
    color: #55524D;
    line-height: 1.45;
    margin-bottom: 8px;
  }
  .jm-link-underline {
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid #111111;
    padding-bottom: 2px;
    display: inline-block;
  }

  /* Page 2: Jo Malone Clean Gallery Product Grid */
  .jm-section-head {
    text-align: center;
    padding: 32px 64px 22px;
    border-bottom: 1px solid #E2DCD0;
  }
  .jm-filter-bar {
    display: flex;
    justify-content: center;
    gap: 36px;
    margin-top: 16px;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6E685F;
  }
  .jm-filter-bar span.active {
    color: #111111;
    font-weight: 600;
    border-bottom: 1.5px solid #111111;
    padding-bottom: 4px;
  }
  .jm-product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 28px 56px;
    flex: 1;
    align-items: start;
  }
  .jm-card {
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .jm-card-img-wrap {
    position: relative;
    background: #F1ECE1;
    border: 1px solid #111111;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    margin-bottom: 14px;
  }
  .jm-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .jm-card-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #FAF7F2;
    border: 1px solid #111111;
    padding: 4px 10px;
    font-size: 9.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .jm-card-angles {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(250, 247, 242, 0.94);
    border: 1px solid #111111;
    padding: 4px 12px;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .jm-card-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 23px;
    font-weight: 600;
    color: #111111;
    margin-bottom: 3px;
  }
  .jm-card-notes {
    font-size: 11.5px;
    color: #5E5A54;
    margin-bottom: 6px;
    font-style: italic;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
  }
  .jm-card-spec {
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #111111;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .jm-card-cta {
    width: 100%;
    padding: 11px 16px;
    border: 1px solid #111111;
    background: transparent;
    color: #111111;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .jm-card-cta.filled {
    background: #111111;
    color: #FAF7F2;
  }
</style>
</head>
<body>

  <!-- PAGE 1: JO MALONE LONDON STYLE — HERO & EDITORIAL CAMPAIGN STAGE -->
  <div class="pdf-page">
    <div class="jm-announcement">
      COMPLIMENTARY SIGNATURE GIFT BOXING ON ALL ORDERS • FREE LOCAL PICKUP AT THE BLUE HYDRANGEA (PURCELLVILLE, VA)
    </div>
    <header class="jm-header">
      <div class="jm-header-top">
        <div class="jm-header-left">
          <span>SEARCH</span>
          <span>SCENT FINDER</span>
          <span>BOUTIQUE PICKUP</span>
        </div>
        <div class="jm-brand-center">
          <div class="jm-brand-title">PUCK &amp; WICK</div>
          <div class="jm-brand-sub">LOUDOUN COUNTY • LAUSANNE • SOFIA</div>
        </div>
        <div class="jm-header-right">
          <span>WAITLIST VIP</span>
          <span>SHOPPING BAG (1)</span>
        </div>
      </div>
      <nav class="jm-nav">
        <span class="active">10 OZ SOY CANDLES ($36)</span>
        <span>LAUSON-98™ ODOR HARDWARE</span>
        <span>THE $98 BESPOKE GIFT BOXES</span>
        <span>MEN'S OBSIDIAN LINE</span>
        <span>WOMEN'S SANCTUARY LINE</span>
        <span>OUR HERITAGE</span>
      </nav>
    </header>

    <section class="jm-hero">
      <div class="jm-hero-visual">
        <img src="${IMGS.shelfWomens}" alt="Warm Frosted Ivory Sanctuary Candle & Rigid Box" />
        <img src="${IMGS.shelfMens}" alt="Matte Obsidian Athlete Candle & Rigid Box" />
        <div class="jm-hero-floating-badge">
          HIS &amp; HERS DUAL ARCHITECTURE • 100% AMERICAN SOY WAX
        </div>
      </div>
      <div class="jm-hero-copy">
        <div class="jm-framed-card">
          <div class="jm-kicker">OPTION 01 • THE JO MALONE LONDON EDITORIAL LOOK</div>
          <h1 class="jm-h1">Tailored British Cream, Crisp Black Lines &amp; Quiet Contrast.</h1>
          <p class="jm-lead">
            Why Jo Malone feels so effortlessly luxurious: instead of placing black products against a dark black background (which flattens depth), a <strong>Warm Alabaster &amp; Cream Gallery Canvas (#FAF7F2)</strong> with razor-sharp <strong>1px Black Architectural Borders</strong> makes both our Matte Obsidian and Warm Frosted Ivory vessels pop like physical sculptures.
          </p>
          <div class="jm-btn-row">
            <div class="jm-btn-black">SHOP IN-STOCK CANDLES ($36)</div>
            <div class="jm-btn-outline">BUILD YOUR $98 BOX</div>
          </div>
        </div>
      </div>
    </section>

    <section class="jm-trio-strip">
      <div class="jm-trio-cell">
        <img src="${IMGS.candleObsidian}" alt="Soy Candles" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">IN STOCK • READY TO SHIP</div>
          <h4>10 Signature Soy Candles</h4>
          <p>Hand-poured in Loudoun County, VA. 14-day cure for a 55–65 hour clean burn.</p>
          <span class="jm-link-underline">EXPLORE 10 SCENTS ($36) &rarr;</span>
        </div>
      </div>
      <div class="jm-trio-cell">
        <img src="${IMGS.puckMenStall}" alt="Lauson-98 Odor Pucks" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">ONE PUCK IN EVERY LOCKER STALL</div>
          <h4>Lauson-98™ Odor Hardware</h4>
          <p>CNC-anodized aluminum pucks engineered for open-air pro hockey stalls, bags &amp; closets.</p>
          <span class="jm-link-underline">JOIN DROP 01 WAITLIST ($44) &rarr;</span>
        </div>
      </div>
      <div class="jm-trio-cell">
        <img src="${IMGS.boxWomenOpen}" alt="Bespoke Gift Boxes" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">THE ART OF BESPOKE GIFTING</div>
          <h4>The $98 Collector Gift Boxes</h4>
          <p>Pair any 10 oz Soy Candle with our 3.0" Odor Puck &amp; Body Wash or Linen Mist ($124 value).</p>
          <span class="jm-link-underline">CUSTOMIZE HIS OR HERS ($98) &rarr;</span>
        </div>
      </div>
    </section>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • JO MALONE LONDON AESTHETIC &amp; UX</span>
      <span>PAGE 01 OF 04 • HERO &amp; ARCHITECTURE</span>
    </div>
  </div>

  <!-- PAGE 2: JO MALONE LONDON STYLE — CLEAN GALLERY PRODUCT GRID & SCENT PAIRING -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">I. THE FRAGRANCE &amp; HARDWARE GALLERY</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">FILTER: ALL COLLECTIONS (15)</span>
      </div>
    </header>

    <div class="jm-section-head">
      <div class="jm-kicker">SMALL-BATCH AMERICAN SOY &amp; MOLECULAR ODOR CARE</div>
      <h2 class="serif" style="font-size:38px;font-weight:500;">Uncluttered Gallery Cards with Breathable Negative Space</h2>
      <div class="jm-filter-bar">
        <span class="active">ALL ITEMS (15)</span>
        <span>SOY CANDLES • IN STOCK (10)</span>
        <span>MEN'S OBSIDIAN LINE (10)</span>
        <span>WOMEN'S SANCTUARY LINE (5)</span>
        <span>LAUSON-98™ PUCKS &amp; CARE (5)</span>
      </div>
    </div>

    <div class="jm-product-grid">
      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.shelfMens}" alt="Top Shelf" />
          <span class="jm-card-tag">BESTSELLER • IN STOCK</span>
          <span class="jm-card-angles">VESSEL • BOX • CARD • 360°</span>
        </div>
        <h3 class="jm-card-title">Top Shelf</h3>
        <div class="jm-card-notes">Aged Kentucky Bourbon, Charred Oak &amp; Smoked Vanilla</div>
        <div class="jm-card-spec">10 oz / 283g Matte Obsidian • $36.00</div>
        <button class="jm-card-cta filled">ADD TO BAG — $36.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.shelfWomens}" alt="Velvet Vanilla & Santal" />
          <span class="jm-card-tag">SANCTUARY • IN STOCK</span>
          <span class="jm-card-angles">VESSEL • BOX • CARD • 360°</span>
        </div>
        <h3 class="jm-card-title">Velvet Vanilla &amp; Santal</h3>
        <div class="jm-card-notes">Madagascar Vanilla Bean, Australian Santal &amp; Cream</div>
        <div class="jm-card-spec">10 oz / 283g Warm Frosted Ivory • $36.00</div>
        <button class="jm-card-cta filled">ADD TO BAG — $36.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.puckMenStall}" alt="Men's Locker Stall Puck" />
          <span class="jm-card-tag">DROP 01 WAITLIST</span>
          <span class="jm-card-angles">PUCK • LOCKER STALL • IN BAG • CLOSET</span>
        </div>
        <h3 class="jm-card-title">3.0" Athlete Gear &amp; Stall Puck</h3>
        <div class="jm-card-notes">One Puck Per Pro Locker Stall • Full Open-Air Neutralization</div>
        <div class="jm-card-spec">3.0" Anodized Obsidian &amp; Gold • $44.00</div>
        <button class="jm-card-cta">JOIN VIP WAITLIST — $44.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.puckWomenCloset}" alt="Women's Sanctuary Puck" />
          <span class="jm-card-tag">DROP 01 WAITLIST</span>
          <span class="jm-card-angles">PUCK • YOGA TOTE • WALK-IN CLOSET</span>
        </div>
        <h3 class="jm-card-title">3.0" Sanctuary Tote &amp; Closet Puck</h3>
        <div class="jm-card-notes">Lauson-98™ + Coconut Carbon for Yoga Totes &amp; Wardrobes</div>
        <div class="jm-card-spec">3.0" Warm Ivory &amp; Champagne Gold • $44.00</div>
        <button class="jm-card-cta">JOIN VIP WAITLIST — $44.00</button>
      </div>
    </div>

    <!-- Jo Malone Signature Function Bar: Interactive Scent Finder & Pairing -->
    <div style="margin:0 56px 28px;border:1px solid #111111;background:#F4EFE6;padding:22px 36px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="jm-kicker" style="margin-bottom:4px;">SIGNATURE JO MALONE FUNCTIONALITY • THE SCENT &amp; SPACE PAIRING BAR</div>
        <div class="serif" style="font-size:24px;font-weight:600;">Not sure where to begin? Filter by Room, Mood, or Locker Application:</div>
      </div>
      <div style="display:flex;gap:12px;">
        <span class="jm-btn-black" style="padding:10px 18px;font-size:10px;">WOODSY &amp; BOURBON</span>
        <span class="jm-btn-outline" style="padding:10px 18px;font-size:10px;background:#FAF7F2;">FRESH ICE &amp; MINT</span>
        <span class="jm-btn-outline" style="padding:10px 18px;font-size:10px;background:#FAF7F2;">SPA &amp; BOTANICAL</span>
        <span class="jm-btn-outline" style="padding:10px 18px;font-size:10px;background:#FAF7F2;">LOCKER STALL HARDWARE</span>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • JO MALONE LONDON AESTHETIC &amp; UX</span>
      <span>PAGE 02 OF 04 • GALLERY PRODUCT GRID &amp; SCENT PAIRING</span>
    </div>
  </div>

  <!-- PAGE 3: JO MALONE LONDON STYLE — "THE ART OF GIFTING" $98 BESPOKE BOX SUITE -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">II. THE ART OF BESPOKE GIFTING ($98)</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">SAVE $26 • $124 VALUE FOR $98</span>
      </div>
    </header>

    <div style="display:grid;grid-template-columns:1.05fr 0.95fr;flex:1;min-height:0;padding:36px 56px;gap:48px;align-items:center;">
      <!-- Left: Editorial 2x2 Visual Grid of Open & Closed Matching Boxes -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <div style="border:1px solid #111111;background:#F1ECE1;padding:10px;">
          <img src="${IMGS.boxMenOpen}" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border:1px solid #111111;" />
          <div style="padding-top:8px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
            <span>01. MEN'S ATHLETE BOX (OPEN)</span>
            <span>$98.00</span>
          </div>
        </div>
        <div style="border:1px solid #111111;background:#F1ECE1;padding:10px;">
          <img src="${IMGS.boxWomenOpen}" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border:1px solid #111111;" />
          <div style="padding-top:8px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
            <span>02. WOMEN'S SANCTUARY BOX (OPEN)</span>
            <span>$98.00</span>
          </div>
        </div>
        <div style="border:1px solid #111111;background:#F1ECE1;padding:10px;">
          <img src="${IMGS.boxMenClosed}" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border:1px solid #111111;" />
          <div style="padding-top:8px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
            <span>03. SLEEK OBSIDIAN CLAMSHELL</span>
            <span>MINIMALIST CREST</span>
          </div>
        </div>
        <div style="border:1px solid #111111;background:#F1ECE1;padding:10px;">
          <img src="${IMGS.boxWomenClosed}" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block;border:1px solid #111111;" />
          <div style="padding-top:8px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
            <span>04. SLEEK IVORY CLAMSHELL</span>
            <span>MINIMALIST CREST</span>
          </div>
        </div>
      </div>

      <!-- Right: Jo Malone Step-by-Step Bespoke Box Configurator -->
      <div class="jm-framed-card" style="padding:36px 40px;">
        <div class="jm-kicker">BESPOKE GIFT CURATION • JERSEY #98 FOUNDER TRIBUTE</div>
        <h2 class="serif" style="font-size:38px;font-weight:500;line-height:1.12;margin-bottom:14px;">The Art of Gifting: Build Your $98 Collector Box</h2>
        <p style="font-size:13px;line-height:1.6;color:#3D3A36;margin-bottom:24px;">
          Inspired by Jo Malone’s bespoke gift builder, customers curate their box in three effortless, tactile steps—with zero visual clutter.
        </p>

        <div style="border-top:1px solid #111111;padding:16px 0;">
          <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">STEP 01 • SELECT YOUR EDITION ARCHITECTURE</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="border:1.5px solid #111111;background:#111111;color:#FAF7F2;padding:12px 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">
              ✓ MEN'S ATHLETE EDITION ($98)
            </div>
            <div style="border:1px solid #111111;background:#FAF7F2;color:#111111;padding:12px 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">
              WOMEN'S SANCTUARY EDITION ($98)
            </div>
          </div>
        </div>

        <div style="border-top:1px solid #111111;padding:16px 0;">
          <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">STEP 02 • CHOOSE YOUR 10 OZ AMERICAN SOY CANDLE POUR</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <span style="border:1px solid #111111;background:#111111;color:#FAF7F2;padding:7px 14px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;">Top Shelf</span>
            <span style="border:1px solid #111111;padding:7px 14px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;">Fresh Cut</span>
            <span style="border:1px solid #111111;padding:7px 14px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;">Balsam Fir</span>
            <span style="border:1px solid #111111;padding:7px 14px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;">Velvet Vanilla &amp; Santal</span>
            <span style="border:1px solid #111111;padding:7px 14px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;">Cashmere &amp; White Tea</span>
          </div>
        </div>

        <div style="border-top:1px solid #111111;border-bottom:1px solid #111111;padding:16px 0;margin-bottom:22px;">
          <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;margin-bottom:6px;">STEP 03 • INCLUDED FULL-SIZE HARDWARE &amp; CARE ($124 VALUE)</div>
          <div style="font-size:12.5px;color:#3D3A36;line-height:1.55;">
            • <strong>1x 10 oz Hand-Poured Soy Candle</strong> ($36 Value) — Laid horizontally in custom suede-touch foam<br/>
            • <strong>1x 3.0" Lauson-98™ Odor Eliminating Puck</strong> ($44 Value) — For Locker Stalls, Bags &amp; Closets<br/>
            • <strong>1x 8 oz Charcoal Detox Body Wash OR 4 oz Linen Mist</strong> ($44 Value) + Gold-Foil Atelier Card
          </div>
        </div>

        <div class="jm-btn-black" style="text-align:center;width:100%;">RESERVE BESPOKE $98 GIFT BOX — BATCH 01 VIP WAITLIST</div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • JO MALONE LONDON AESTHETIC &amp; UX</span>
      <span>PAGE 03 OF 04 • BESPOKE $98 GIFT BOX SUITE</span>
    </div>
  </div>

  <!-- PAGE 4: JO MALONE LONDON STYLE — MOBILE EXPERIENCE (3 SCREENS) & KEY LUXURY UPGRADES -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">III. MOBILE STOREFRONT &amp; FUNCTIONAL UPGRADE SUMMARY</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;">390×844 IPHONE LUXURY FLOW</span>
      </div>
    </header>

    <div style="display:grid;grid-template-columns:repeat(3, 320px) 1fr;gap:28px;padding:32px 56px;flex:1;align-items:stretch;">
      <!-- Mobile Screen 1: Hero -->
      <div style="border:2px solid #111111;background:#FAF7F2;display:flex;flex-direction:column;box-shadow:6px 6px 0px #111111;">
        <div style="background:#111111;color:#FAF7F2;font-size:8px;letter-spacing:0.16em;text-align:center;padding:6px;">
          FREE LOCAL PICKUP • PURCELLVILLE, VA
        </div>
        <div style="padding:12px 14px;border-bottom:1px solid #111111;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:10px;">☰</span>
          <span class="serif" style="font-size:18px;font-weight:600;letter-spacing:0.18em;">PUCK &amp; WICK</span>
          <span style="font-size:10px;">BAG (1)</span>
        </div>
        <img src="${IMGS.shelfWomens}" style="width:100%;height:250px;object-fit:cover;border-bottom:1px solid #111111;" />
        <div style="padding:18px 16px;text-align:center;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E685F;margin-bottom:6px;">HAND-POURED IN VIRGINIA</div>
            <div class="serif" style="font-size:24px;line-height:1.1;margin-bottom:8px;">Small-Batch Soy &amp; Odor Hardware.</div>
            <p style="font-size:10.5px;color:#4A4742;line-height:1.45;">10 in-stock American soy candles ($36) &amp; Lauson-98™ locker and closet pucks.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:12px 0;">
            <div style="border:1px solid #111111;padding:6px 4px;font-size:8.5px;font-weight:600;">CANDLES</div>
            <div style="border:1px solid #111111;padding:6px 4px;font-size:8.5px;font-weight:600;">ODOR PUCKS</div>
            <div style="border:1px solid #111111;padding:6px 4px;font-size:8.5px;font-weight:600;">$98 BOXES</div>
          </div>
          <div style="background:#111111;color:#FAF7F2;padding:11px;font-size:9.5px;letter-spacing:0.14em;font-weight:600;">SHOP COLLECTION</div>
        </div>
      </div>

      <!-- Mobile Screen 2: Clean 2-Col Grid -->
      <div style="border:2px solid #111111;background:#FAF7F2;display:flex;flex-direction:column;box-shadow:6px 6px 0px #111111;">
        <div style="padding:12px 14px;border-bottom:1px solid #111111;text-align:center;">
          <div style="font-size:8.5px;letter-spacing:0.16em;color:#6E685F;">MOBILE CATALOG</div>
          <div class="serif" style="font-size:19px;font-weight:600;">2×3 Pill Grid • Zero Scroll</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:10px 12px;border-bottom:1px solid #E2DCD0;">
          <div style="background:#111111;color:#FAF7F2;padding:6px;font-size:8px;text-align:center;letter-spacing:0.1em;">ALL ITEMS (15)</div>
          <div style="border:1px solid #111111;padding:6px;font-size:8px;text-align:center;letter-spacing:0.1em;">CANDLES (10)</div>
          <div style="border:1px solid #111111;padding:6px;font-size:8px;text-align:center;letter-spacing:0.1em;">MEN'S LINE</div>
          <div style="border:1px solid #111111;padding:6px;font-size:8px;text-align:center;letter-spacing:0.1em;">WOMEN'S LINE</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px;flex:1;">
          <div style="text-align:center;">
            <img src="${IMGS.candleObsidian}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #111111;margin-bottom:6px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">Top Shelf</div>
            <div style="font-size:9px;color:#6E685F;margin-bottom:6px;">10 oz Soy • $36</div>
            <div style="background:#111111;color:#FAF7F2;padding:6px;font-size:8px;letter-spacing:0.1em;">ADD TO BAG</div>
          </div>
          <div style="text-align:center;">
            <img src="${IMGS.candleIvory}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #111111;margin-bottom:6px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">Velvet Vanilla</div>
            <div style="font-size:9px;color:#6E685F;margin-bottom:6px;">10 oz Soy • $36</div>
            <div style="background:#111111;color:#FAF7F2;padding:6px;font-size:8px;letter-spacing:0.1em;">ADD TO BAG</div>
          </div>
          <div style="text-align:center;">
            <img src="${IMGS.puckMenStall}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #111111;margin-bottom:6px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">3.0" Stall Puck</div>
            <div style="font-size:9px;color:#6E685F;margin-bottom:6px;">Locker Stall • $44</div>
            <div style="border:1px solid #111111;padding:6px;font-size:8px;letter-spacing:0.1em;">WAITLIST</div>
          </div>
          <div style="text-align:center;">
            <img src="${IMGS.puckWomenCloset}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #111111;margin-bottom:6px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">Sanctuary Puck</div>
            <div style="font-size:9px;color:#6E685F;margin-bottom:6px;">Tote &amp; Closet • $44</div>
            <div style="border:1px solid #111111;padding:6px;font-size:8px;letter-spacing:0.1em;">WAITLIST</div>
          </div>
        </div>
      </div>

      <!-- Mobile Screen 3: Product Detail Drawer -->
      <div style="border:2px solid #111111;background:#FAF7F2;display:flex;flex-direction:column;box-shadow:6px 6px 0px #111111;">
        <div style="padding:10px 14px;border-bottom:1px solid #111111;display:flex;justify-content:space-between;align-items:center;font-size:9px;letter-spacing:0.14em;">
          <span>&larr; BACK TO GALLERY</span>
          <span>SHARE</span>
        </div>
        <img src="${IMGS.puckMenStall}" style="width:100%;height:260px;object-fit:cover;border-bottom:1px solid #111111;" />
        <div style="display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #111111;font-size:8px;text-align:center;letter-spacing:0.1em;">
          <div style="padding:7px;border-right:1px solid #111111;">PUCK</div>
          <div style="padding:7px;border-right:1px solid #111111;background:#111111;color:#FAF7F2;font-weight:700;">STALL</div>
          <div style="padding:7px;border-right:1px solid #111111;">IN BAG</div>
          <div style="padding:7px;">CLOSET</div>
        </div>
        <div style="padding:16px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:8.5px;letter-spacing:0.16em;color:#6E685F;margin-bottom:4px;">MEN'S ODOR HARDWARE • $44.00</div>
            <div class="serif" style="font-size:22px;font-weight:600;margin-bottom:6px;">3.0" Athlete Locker Stall Puck</div>
            <p style="font-size:10px;color:#3D3A36;line-height:1.5;">Stationed in the corner of each player's stall to neutralize open-air hanging shoulder pads, gloves &amp; skates.</p>
          </div>
          <div style="background:#111111;color:#FAF7F2;padding:11px;font-size:9.5px;letter-spacing:0.14em;text-align:center;font-weight:600;">JOIN BATCH 01 VIP WAITLIST</div>
        </div>
      </div>

      <!-- Summary Column -->
      <div style="border:1px solid #111111;background:#F4EFE6;padding:28px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="jm-kicker">WHY JO MALONE WORKS SO WELL</div>
          <h3 class="serif" style="font-size:30px;font-weight:600;line-height:1.15;margin-bottom:16px;">How This Solves the "One-Dimensional" Feel</h3>
          <div style="font-size:12px;line-height:1.65;color:#2C2A27;display:flex;flex-direction:column;gap:12px;">
            <div><strong>1. Warm Cream vs. Obsidian Contrast:</strong> On an all-black website, black jars and black boxes blend into the background. On Jo Malone's warm cream paper canvas (<code>#FAF7F2</code>), both the Matte Obsidian and Frosted Ivory pieces command instant visual authority.</div>
            <div><strong>2. 1px Architectural Framing:</strong> Replaces glowing gold gradients and dark rounded cards with crisp 1px solid black borders and editorial serif typography.</div>
            <div><strong>3. Simplified Card Hierarchy:</strong> Cards show only the photo, scent name, italicized tasting notes, weight/price, and a single crisp button.</div>
            <div><strong>4. Interactive Scent &amp; Box Suite:</strong> Turns the $98 Box Builder into a 3-step British bespoke gifting ritual.</div>
          </div>
        </div>
        <div style="border-top:1px solid #111111;padding-top:14px;font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
          READY TO APPLY TO PUCKANDWICK.COM ON YOUR WORD
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • JO MALONE LONDON AESTHETIC &amp; UX</span>
      <span>PAGE 04 OF 04 • MOBILE FLOW &amp; ARCHITECTURAL SUMMARY</span>
    </div>
  </div>

</body>
</html>`;

// ============================================================================
// 2. DIPTYQUE PARIS INSPIRED LUXURY REDESIGN (4-Page Editorial Maison Deck)
// ============================================================================
const diptyqueHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick™ — Diptyque Paris Inspired Website Redesign</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: 1440px 1020px;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: #F6F1E7;
    color: #161514;
    font-family: 'Inter', -apple-system, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .pdf-page {
    width: 1440px;
    height: 1020px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    background: #F6F1E7;
    display: flex;
    flex-direction: column;
  }
  .serif {
    font-family: 'Cormorant Garamond', Georgia, serif;
  }
  .deck-footer {
    height: 36px;
    background: #161514;
    color: #F6F1E7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: auto;
    flex-shrink: 0;
  }
  /* Diptyque Header */
  .dp-header {
    background: #F6F1E7;
    border-bottom: 1px solid #D5CBB8;
    padding: 16px 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dp-nav-left, .dp-nav-right {
    display: flex;
    gap: 28px;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #2B2926;
    font-weight: 500;
  }
  /* Diptyque Signature Oval Medallion Crest */
  .dp-oval-crest {
    border: 1.5px solid #161514;
    border-radius: 999px;
    padding: 8px 34px;
    text-align: center;
    background: #FAF6EE;
    box-shadow: inset 0 0 0 2px #F6F1E7, inset 0 0 0 3px #161514;
  }
  .dp-oval-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #161514;
    line-height: 1;
  }
  .dp-oval-sub {
    font-size: 8px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #6B6356;
    margin-top: 3px;
  }

  /* Page 1: Diptyque Multi-Chapter Asymmetric Editorial Spread */
  .dp-hero {
    display: grid;
    grid-template-columns: 0.44fr 0.56fr;
    flex: 1;
    min-height: 0;
  }
  .dp-hero-left {
    padding: 52px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #F6F1E7;
    border-right: 1px solid #D5CBB8;
  }
  .dp-chapter-num {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 20px;
    color: #8C6D3F;
    margin-bottom: 8px;
  }
  .dp-h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 50px;
    font-weight: 500;
    line-height: 1.04;
    color: #161514;
    margin-bottom: 20px;
  }
  .dp-lead {
    font-size: 13.5px;
    line-height: 1.7;
    color: #433F39;
    margin-bottom: 28px;
  }
  .dp-pill-btn {
    display: inline-block;
    background: #161514;
    color: #F6F1E7;
    padding: 14px 30px;
    border-radius: 999px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .dp-pill-outline {
    display: inline-block;
    border: 1px solid #161514;
    color: #161514;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
    margin-left: 12px;
  }
  .dp-hero-right {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    background: #EDE5D5;
  }
  .dp-hero-main-col {
    display: grid;
    grid-template-rows: 1fr 1fr;
    border-right: 1px solid #D5CBB8;
    height: 100%;
    min-height: 0;
  }
  .dp-hero-main-col img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    min-height: 0;
  }
  .dp-hero-main-col img:first-child {
    border-bottom: 1px solid #D5CBB8;
  }
  .dp-hero-side-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px;
    background: #181A1F;
    color: #F6F1E7;
  }
  .dp-oval-window {
    width: 100%;
    aspect-ratio: 1 / 1.08;
    border-radius: 999px;
    overflow: hidden;
    border: 1.5px solid #C5A059;
    margin-bottom: 18px;
  }
  .dp-oval-window img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Bottom Herbarium Note Strip */
  .dp-herbarium-bar {
    height: 138px;
    background: #EFE8D8;
    border-top: 1px solid #D5CBB8;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .dp-herb-cell {
    border-right: 1px solid #D5CBB8;
    padding: 18px 28px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .dp-herb-cell:last-child {
    border-right: none;
  }
  .dp-herb-cell img {
    width: 88px;
    height: 88px;
    border-radius: 999px;
    object-fit: cover;
    border: 1px solid #161514;
  }
</style>
</head>
<body>

  <!-- PAGE 1: DIPTYQUE PARIS STYLE — POETIC MAISON & MULTI-CHAPTER CONTRAST -->
  <div class="pdf-page">
    <header class="dp-header">
      <div class="dp-nav-left">
        <span>LES BOUGIES ($36)</span>
        <span>LAUSON-98™ OBJECTS</span>
        <span>LES COFFRETS ($98)</span>
      </div>
      <div class="dp-oval-crest">
        <div class="dp-oval-title">PUCK &amp; WICK</div>
        <div class="dp-oval-sub">MAISON DE PARFUM • LOUDOUN CO. &amp; LAUSANNE</div>
      </div>
      <div class="dp-nav-right">
        <span>L'HERBIER &amp; SCIENCE</span>
        <span>ATELIER STORY</span>
        <span>PANIER (1)</span>
      </div>
    </header>

    <section class="dp-hero">
      <div class="dp-hero-left">
        <div class="dp-chapter-num">Option 02 • The Diptyque Paris Maison Look &amp; Function</div>
        <h1 class="dp-h1">An Olfactory Maison of Light, Shadow &amp; Story.</h1>
        <p class="dp-lead">
          Why Diptyque feels like a Parisian art gallery rather than a standard e-commerce template: the page unfolds in <strong>contrasting tonal chapters</strong>—warm parchment gallery spreads for botanical soy candles, paired with dramatic deep-obsidian "Cabinet of Curiosities" panels for our Swiss-inspired <strong>Lauson-98™ Odor Hardware</strong>, signature oval medallion frames, and numbered olfactory editions.
        </p>
        <div>
          <span class="dp-pill-btn">EXPLORE L'HERBIER DES BOUGIES</span>
          <span class="dp-pill-outline">THE $98 COFFRETS</span>
        </div>
      </div>

      <div class="dp-hero-right">
        <div class="dp-hero-main-col">
          <img src="${IMGS.shelfWomens}" alt="Chapitre I Sanctuary Bougie & Coffret" />
          <img src="${IMGS.shelfMens}" alt="Chapitre I Obsidian Bougie & Coffret" />
        </div>
        <div class="dp-hero-side-col">
          <div>
            <div style="font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin-bottom:8px;">CHAPTER II • DARK HARDWARE CONTRAST</div>
            <div class="dp-oval-window">
              <img src="${IMGS.puckMenStall}" alt="Pro Hockey Stall Puck" />
            </div>
            <h3 class="serif" style="font-size:26px;font-weight:500;margin-bottom:6px;">L'Objet Lauson-98™ (3.0")</h3>
            <p style="font-size:11.5px;line-height:1.55;color:#C9C4BA;">
              One anodized puck in every player’s locker stall. Neutralizes open-air hanging equipment with sub-2nm coconut carbon.
            </p>
          </div>
          <div style="border-top:1px solid rgba(197,160,89,0.3);padding-top:12px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#E5C878;">
            <span>DROP 01 WAITLIST</span>
            <span>$44.00 &rarr;</span>
          </div>
        </div>
      </div>
    </section>

    <section class="dp-herbarium-bar">
      <div class="dp-herb-cell">
        <img src="${IMGS.candleObsidian}" alt="No 01 Top Shelf" />
        <div>
          <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;">N° 01 • Boisé &amp; Ambré</div>
          <div class="serif" style="font-size:21px;font-weight:600;">Top Shelf ($36)</div>
          <div style="font-size:10.5px;color:#5A544B;">Bourbon • Charred Oak • Vanilla</div>
        </div>
      </div>
      <div class="dp-herb-cell">
        <img src="${IMGS.candleFrost}" alt="No 02 Fresh Cut" />
        <div>
          <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;">N° 02 • Frais &amp; Mentholé</div>
          <div class="serif" style="font-size:21px;font-weight:600;">Fresh Cut ($36)</div>
          <div style="font-size:10.5px;color:#5A544B;">Crushed Peppermint • Eucalyptus</div>
        </div>
      </div>
      <div class="dp-herb-cell">
        <img src="${IMGS.candleIvory}" alt="No 08 Velvet Vanilla" />
        <div>
          <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;">N° 08 • Sanctuaire Féminin</div>
          <div class="serif" style="font-size:21px;font-weight:600;">Velvet Vanilla &amp; Santal</div>
          <div style="font-size:10.5px;color:#5A544B;">Madagascar Vanilla • Warm Santal</div>
        </div>
      </div>
      <div class="dp-herb-cell">
        <img src="${IMGS.candleEmerald}" alt="No 03 Balsam Fir" />
        <div>
          <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;">N° 03 • Édition Blue Hydrangea</div>
          <div class="serif" style="font-size:21px;font-weight:600;">Balsam Fir ($36)</div>
          <div style="font-size:10.5px;color:#5A544B;">Blue Ridge Fir • Cedar Bark</div>
        </div>
      </div>
    </section>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • DIPTYQUE PARIS MAISON AESTHETIC &amp; UX</span>
      <span>PAGE 01 OF 03 • MULTI-CHAPTER EDITORIAL HERO &amp; HERBARIUM BAR</span>
    </div>
  </div>

  <!-- PAGE 2: DIPTYQUE PARIS STYLE — STAGGERED EDITORIAL CATALOG & OLFACTORY PYRAMID CARDS -->
  <div class="pdf-page">
    <header class="dp-header" style="padding:12px 56px;">
      <span style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;">CHAPITRE I • L'HERBIER DES BOUGIES &amp; OBJETS</span>
      <div class="serif" style="font-size:22px;font-weight:700;letter-spacing:0.2em;">PUCK &amp; WICK</div>
      <span style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;">10 BOUGIES EN STOCK • 5 OBJETS LAUSON-98™</span>
    </header>

    <div style="display:grid;grid-template-columns:0.32fr 0.68fr;flex:1;min-height:0;">
      <!-- Left Editorial Chapter Column -->
      <div style="padding:40px 44px;border-right:1px solid #D5CBB8;background:#EFE8D8;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="dp-chapter-num">Chapter I • Olfactory Storytelling</div>
          <h2 class="serif" style="font-size:38px;font-weight:500;line-height:1.1;margin-bottom:16px;">Staggered Magazine Spreads Instead of Uniform Rows</h2>
          <p style="font-size:12.5px;line-height:1.65;color:#433F39;margin-bottom:20px;">
            Diptyque’s catalog breaks up the grid with <strong>Editorial Story Cards</strong>—explaining the 3-tier olfactory pyramid (Top, Heart, Base) and showing the gold-foil <strong>Atelier Story Card</strong> tucked inside every rigid box.
          </p>
          <img src="${IMGS.shelfMens}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #161514;margin-bottom:12px;" />
          <div class="serif" style="font-style:italic;font-size:15px;color:#433F39;">
            Every 10 oz candle ships in a custom matte rigid presentation box with an embossed gold-foil story card.
          </div>
        </div>
        <div style="border-top:1px solid #161514;padding-top:12px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600;">
          FILTER BY OLFACTORY FAMILY: WOODY • FRESH • FLORAL • HARDWARE
        </div>
      </div>

      <!-- Right 3-Column Diptyque Numbered Gallery -->
      <div style="padding:36px 48px;display:grid;grid-template-columns:repeat(3, 1fr);gap:24px;align-content:space-between;">
        <div style="background:#FAF6EE;border:1px solid #D5CBB8;padding:18px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.14em;color:#8C6D3F;margin-bottom:8px;">
              <span>N° 01 • OBSIDIAN</span>
              <span>10 OZ • $36</span>
            </div>
            <img src="${IMGS.candleObsidian}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #161514;margin-bottom:12px;" />
            <h3 class="serif" style="font-size:25px;font-weight:600;margin-bottom:4px;">Top Shelf</h3>
            <p class="serif" style="font-style:italic;font-size:15px;color:#5A544B;margin-bottom:10px;">
              "The warmth of a wood-paneled study after the final buzzer."
            </p>
            <div style="font-size:10.5px;color:#3D3A36;line-height:1.5;border-top:1px dashed #D5CBB8;padding-top:8px;margin-bottom:14px;">
              <strong>Notes:</strong> Kentucky Bourbon • Charred White Oak • Smoked Vanilla Bean
            </div>
          </div>
          <div style="background:#161514;color:#F6F1E7;text-align:center;padding:11px;border-radius:999px;font-size:10px;letter-spacing:0.16em;font-weight:600;">
            ADD TO BAG — $36.00
          </div>
        </div>

        <div style="background:#FAF6EE;border:1px solid #D5CBB8;padding:18px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.14em;color:#8C6D3F;margin-bottom:8px;">
              <span>N° 08 • SANCTUARY</span>
              <span>10 OZ • $36</span>
            </div>
            <img src="${IMGS.shelfWomens}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #161514;margin-bottom:12px;" />
            <h3 class="serif" style="font-size:25px;font-weight:600;margin-bottom:4px;">Velvet Vanilla &amp; Santal</h3>
            <p class="serif" style="font-style:italic;font-size:15px;color:#5A544B;margin-bottom:10px;">
              "Sunlit travertine, warm cashmere, and quiet evening sanctuary."
            </p>
            <div style="font-size:10.5px;color:#3D3A36;line-height:1.5;border-top:1px dashed #D5CBB8;padding-top:8px;margin-bottom:14px;">
              <strong>Notes:</strong> Madagascar Vanilla • Australian Santal • Tonka &amp; White Musk
            </div>
          </div>
          <div style="background:#161514;color:#F6F1E7;text-align:center;padding:11px;border-radius:999px;font-size:10px;letter-spacing:0.16em;font-weight:600;">
            ADD TO BAG — $36.00
          </div>
        </div>

        <div style="background:#181A1F;color:#F6F1E7;border:1px solid #C5A059;padding:18px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.14em;color:#E5C878;margin-bottom:8px;">
              <span>OBJET N° 01 • HARDWARE</span>
              <span>3.0" • $44</span>
            </div>
            <img src="${IMGS.puckMenStall}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border:1px solid #C5A059;margin-bottom:12px;" />
            <h3 class="serif" style="font-size:25px;font-weight:600;margin-bottom:4px;color:#FAF6EE;">Locker Stall &amp; Gear Puck</h3>
            <p class="serif" style="font-style:italic;font-size:15px;color:#C9C4BA;margin-bottom:10px;">
              "One puck in every pro hockey stall—360° open-air odor destruction."
            </p>
            <div style="font-size:10.5px;color:#D5CBB8;line-height:1.5;border-top:1px dashed rgba(197,160,89,0.35);padding-top:8px;margin-bottom:14px;">
              <strong>Active Core:</strong> Lauson-98™ Vapor Complex + Sub-2nm Coconut Carbon
            </div>
          </div>
          <div style="background:#C5A059;color:#161514;text-align:center;padding:11px;border-radius:999px;font-size:10px;letter-spacing:0.16em;font-weight:700;">
            JOIN VIP WAITLIST — $44.00
          </div>
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • DIPTYQUE PARIS MAISON AESTHETIC &amp; UX</span>
      <span>PAGE 02 OF 03 • STAGGERED EDITORIAL CATALOG &amp; DARK/LIGHT CHAPTERS</span>
    </div>
  </div>

  <!-- PAGE 3: DIPTYQUE PARIS STYLE — "COMPOSE YOUR COFFRET ($98)" & SIDE-BY-SIDE COMPARISON -->
  <div class="pdf-page">
    <header class="dp-header" style="padding:12px 56px;">
      <span style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;">CHAPITRE II • LES COFFRETS SUR-MESURE ($98) &amp; MOBILE PREVIEW</span>
      <div class="serif" style="font-size:22px;font-weight:700;letter-spacing:0.2em;">PUCK &amp; WICK</div>
      <span style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;">HOMMAGE AU N° 98 • SAVE $26</span>
    </header>

    <div style="display:grid;grid-template-columns:1fr 330px 330px;gap:32px;padding:32px 56px;flex:1;align-items:stretch;">
      <!-- Left: Diptyque Coffret Composer -->
      <div style="background:#FAF6EE;border:1px solid #161514;padding:32px;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="dp-chapter-num">Les Coffrets Exclusifs • $98 ($124 Value)</div>
          <h2 class="serif" style="font-size:36px;font-weight:500;line-height:1.1;margin-bottom:14px;">Compose Your Bespoke Coffret</h2>
          <p style="font-size:12.5px;line-height:1.6;color:#433F39;margin-bottom:20px;">
            In the Diptyque concept, the $98 Box Builder is presented as an intimate Parisian <strong>"Coffret Composer"</strong>—side-by-side His &amp; Hers magnetic clamshell boxes with horizontal suede-cradled candles, paired with an interactive <strong>Molecular Herbarium</strong> drawer.
          </p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="border:1px solid #161514;padding:10px;background:#181A1F;color:#FAF6EE;">
              <img src="${IMGS.boxMenOpen}" style="width:100%;aspect-ratio:1/1;object-fit:cover;margin-bottom:8px;" />
              <div class="serif" style="font-size:19px;">Le Coffret Athlète ($98)</div>
              <div style="font-size:10px;color:#C5A059;">Obsidian Candle + 3.0" Stall Puck + 8 oz Wash</div>
            </div>
            <div style="border:1px solid #161514;padding:10px;background:#F6F1E7;color:#161514;">
              <img src="${IMGS.boxWomenOpen}" style="width:100%;aspect-ratio:1/1;object-fit:cover;margin-bottom:8px;" />
              <div class="serif" style="font-size:19px;">Le Coffret Sanctuaire ($98)</div>
              <div style="font-size:10px;color:#8C6D3F;">Ivory Candle + 3.0" Tote Puck + 4 oz Linen Mist</div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #D5CBB8;padding-top:16px;">
          <span class="serif" style="font-size:20px;font-style:italic;">Complimentary Atelier Story Card &amp; Magnetic Keepsake Case</span>
          <span class="dp-pill-btn">COMPOSE COFFRET — $98</span>
        </div>
      </div>

      <!-- Mobile Screen 1: Diptyque Mobile Home -->
      <div style="border:1.5px solid #161514;border-radius:18px;background:#F6F1E7;overflow:hidden;display:flex;flex-direction:column;">
        <div style="padding:12px;border-bottom:1px solid #D5CBB8;text-align:center;">
          <div style="display:inline-block;border:1px solid #161514;border-radius:999px;padding:4px 18px;">
            <span class="serif" style="font-size:16px;font-weight:700;letter-spacing:0.18em;">PUCK &amp; WICK</span>
          </div>
        </div>
        <img src="${IMGS.cardMens}" style="width:100%;height:230px;object-fit:cover;border-bottom:1px solid #D5CBB8;" />
        <div style="padding:18px;flex:1;display:flex;flex-direction:column;justify-content:space-between;text-align:center;">
          <div>
            <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;">Maison de Parfum &amp; Science</div>
            <div class="serif" style="font-size:25px;line-height:1.1;margin:6px 0 10px;">Crafted in Virginia. Engineered in Lausanne.</div>
            <p style="font-size:10.5px;color:#433F39;line-height:1.5;">Alternating warm parchment &amp; deep obsidian chapters create rich visual depth on mobile.</p>
          </div>
          <div style="background:#161514;color:#F6F1E7;padding:11px;border-radius:999px;font-size:9.5px;letter-spacing:0.16em;">DISCOVER THE MAISON</div>
        </div>
      </div>

      <!-- Mobile Screen 2: Dark Chapter Hardware Showcase -->
      <div style="border:1.5px solid #C5A059;border-radius:18px;background:#14161B;color:#FAF6EE;overflow:hidden;display:flex;flex-direction:column;">
        <div style="padding:12px;border-bottom:1px solid rgba(197,160,89,0.25);text-align:center;font-size:9px;letter-spacing:0.18em;color:#C5A059;">
          CHAPTER II • LAUSON-98™ HARDWARE
        </div>
        <div style="padding:16px;flex:1;display:flex;flex-direction:column;justify-content:space-between;align-items:center;text-align:center;">
          <div style="width:190px;height:190px;border-radius:999px;overflow:hidden;border:1.5px solid #C5A059;margin-top:6px;">
            <img src="${IMGS.puckMenStall}" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div>
            <div class="serif" style="font-size:24px;color:#FAF6EE;margin-bottom:6px;">One Puck Per Pro Stall</div>
            <p style="font-size:10.5px;color:#C9C4BA;line-height:1.5;">
              360° double-ring micro-perforated anodized hardware neutralizes open-air locker stalls, hockey bags &amp; mudrooms.
            </p>
          </div>
          <div style="width:100%;background:#C5A059;color:#14161B;padding:11px;border-radius:999px;font-size:9.5px;letter-spacing:0.16em;font-weight:700;">
            RESERVE DROP 01 — $44.00
          </div>
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ WEBSITE REDESIGN CONCEPT • DIPTYQUE PARIS MAISON AESTHETIC &amp; UX</span>
      <span>PAGE 03 OF 03 • BESPOKE COFFRET COMPOSER &amp; MOBILE CONTRAST CHAPTERS</span>
    </div>
  </div>

</body>
</html>`;

async function buildPdfs() {
  const jmHtmlPath = path.join(ROOT, 'jo-malone-redesign.html');
  const dpHtmlPath = path.join(ROOT, 'diptyque-redesign.html');
  fs.writeFileSync(jmHtmlPath, joMaloneHtml, 'utf8');
  fs.writeFileSync(dpHtmlPath, diptyqueHtml, 'utf8');

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1020 }, deviceScaleFactor: 2 });

  // 1. Render Jo Malone PDF & Preview PNGs
  const pageJm = await context.newPage();
  await pageJm.goto(`file://${jmHtmlPath}`, { waitUntil: 'networkidle' });
  await pageJm.evaluate(() => document.fonts.ready);
  const jmPdfPath = path.join(ROOT, 'Puck-and-Wick-Jo-Malone-Redesign.pdf');
  await pageJm.pdf({
    path: jmPdfPath,
    width: '1440px',
    height: '1020px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  const jmPages = await pageJm.locator('.pdf-page').all();
  for (let i = 0; i < jmPages.length; i++) {
    await jmPages[i].screenshot({
      path: `/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc/jo-malone-page-${i + 1}.png`
    });
  }

  // 2. Render Diptyque PDF & Preview PNGs
  const pageDp = await context.newPage();
  await pageDp.goto(`file://${dpHtmlPath}`, { waitUntil: 'networkidle' });
  await pageDp.evaluate(() => document.fonts.ready);
  const dpPdfPath = path.join(ROOT, 'Puck-and-Wick-Diptyque-Redesign.pdf');
  await pageDp.pdf({
    path: dpPdfPath,
    width: '1440px',
    height: '1020px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  const dpPages = await pageDp.locator('.pdf-page').all();
  for (let i = 0; i < dpPages.length; i++) {
    await dpPages[i].screenshot({
      path: `/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc/diptyque-page-${i + 1}.png`
    });
  }

  await browser.close();
  console.log('Generated both PDFs and high-res page previews successfully!');
}

buildPdfs();
