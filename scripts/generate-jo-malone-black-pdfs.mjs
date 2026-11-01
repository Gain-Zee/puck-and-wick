import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc';

function imgDataUri(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// 100% UNLIT CANDLE PHOTOS + HARDWARE + BOXES
const IMGS = {
  shelfMens: imgDataUri('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  shelfWomens: imgDataUri('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
  shelfBalsam: imgDataUri('assets/images/packaging/shelf-candle-balsam-fir.jpg'),
  shelfFreshCut: imgDataUri('assets/images/packaging/shelf-candle-fresh-cut.jpg'),
  shelfCashmere: imgDataUri('assets/images/packaging/shelf-candle-cashmere-white-tea.jpg'),
  shelfSeaSalt: imgDataUri('assets/images/packaging/shelf-candle-sea-salt-orchid.jpg'),
  cardMens: imgDataUri('assets/images/packaging/atelier-card-obsidian.jpg'),
  boxMenOpen: imgDataUri('assets/images/box-men-open.jpg'),
  boxMenClosed: imgDataUri('assets/images/box-men-closed.jpg'),
  boxWomenOpen: imgDataUri('assets/images/box-women-open.jpg'),
  boxWomenClosed: imgDataUri('assets/images/box-women-closed.jpg'),
  puckMenStudio: imgDataUri('assets/images/item-puck-men.jpg'),
  puckMenStall: imgDataUri('assets/images/packaging/puck-men-locker.jpg'),
  puckMenBag: imgDataUri('assets/images/packaging/puck-men-gym-bag.jpg'),
  puckMenCloset: imgDataUri('assets/images/packaging/puck-men-closet.jpg'),
  puckWomenStudio: imgDataUri('assets/images/item-puck-women.jpg'),
  puckWomenCloset: imgDataUri('assets/images/packaging/puck-women-closet.jpg'),
  miniPuckPair: imgDataUri('assets/images/item-mini-pucks-pair.jpg'),
  washMen: imgDataUri('assets/images/item-bodywash-men.jpg'),
  mistWomen: imgDataUri('assets/images/item-mist-women.jpg')
};

// ============================================================================
// 1. JO MALONE "COLOGNE INTENSE" BLACK BACKGROUND DESKTOP DECK (4 PAGES)
// ============================================================================
const joMaloneBlackDesktopHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Jo Malone Layout on Black Obsidian Background (Desktop PDF)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 1440px 960px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0B0C0F;
    color: #FAF7F2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .pdf-page {
    width: 1440px;
    height: 960px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    background: #0B0C0F;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .jm-utility-bar {
    background: #C5A059;
    color: #0B0C0F;
    text-align: center;
    padding: 8px 24px;
    font-size: 10.5px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .jm-header {
    padding: 18px 56px 14px;
    border-bottom: 1px solid #C5A059;
    background: #0B0C0F;
  }
  .jm-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .jm-header-side {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #C9C3B8;
    width: 280px;
  }
  .jm-brand-logo {
    text-align: center;
  }
  .jm-brand-logo h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 0.24em;
    color: #FAF7F2;
    line-height: 1;
  }
  .jm-brand-logo span {
    display: block;
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #C5A059;
    margin-top: 4px;
  }
  .jm-nav {
    display: flex;
    justify-content: center;
    gap: 42px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #E8E2D5;
    font-weight: 500;
  }
  .jm-hero {
    display: grid;
    grid-template-columns: 1.12fr 0.88fr;
    border-bottom: 1px solid #C5A059;
    height: 495px;
  }
  .jm-hero-visual {
    position: relative;
    border-right: 1px solid #C5A059;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .jm-hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .jm-hero-visual img:first-child {
    border-right: 1px solid #C5A059;
  }
  .jm-hero-floating-badge {
    position: absolute;
    bottom: 18px;
    left: 18px;
    background: rgba(11, 12, 15, 0.92);
    border: 1px solid #C5A059;
    color: #FAF7F2;
    padding: 8px 16px;
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .jm-hero-copy {
    padding: 38px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #111318;
  }
  .jm-framed-card {
    background: #0B0C0F;
    border: 1px solid #C5A059;
    padding: 32px 36px;
    box-shadow: 8px 8px 0px #C5A059;
  }
  .jm-kicker {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #C5A059;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .jm-h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 40px;
    font-weight: 500;
    line-height: 1.08;
    color: #FAF7F2;
    margin-bottom: 14px;
  }
  .jm-lead {
    font-size: 13px;
    line-height: 1.62;
    color: #C9C3B8;
    margin-bottom: 22px;
  }
  .jm-btn-row {
    display: flex;
    gap: 14px;
  }
  .jm-btn-gold {
    background: #C5A059;
    color: #0B0C0F;
    padding: 13px 24px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .jm-btn-outline {
    background: transparent;
    color: #FAF7F2;
    border: 1px solid #C5A059;
    padding: 13px 24px;
    font-size: 10.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .jm-trio-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    flex: 1;
    background: #0B0C0F;
  }
  .jm-trio-cell {
    border-right: 1px solid rgba(197, 160, 89, 0.4);
    padding: 20px 32px;
    display: grid;
    grid-template-columns: 118px 1fr;
    gap: 20px;
    align-items: center;
  }
  .jm-trio-cell:last-child { border-right: none; }
  .jm-trio-cell img {
    width: 118px;
    height: 118px;
    object-fit: cover;
    border: 1px solid #C5A059;
  }
  .jm-trio-meta h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    color: #FAF7F2;
    margin-bottom: 4px;
  }
  .jm-trio-meta p {
    font-size: 11.5px;
    color: #B5AFA4;
    line-height: 1.45;
    margin-bottom: 8px;
  }
  .jm-link-underline {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    color: #E5C878;
    border-bottom: 1px solid #C5A059;
    padding-bottom: 2px;
  }
  .deck-footer {
    background: #060709;
    border-top: 1px solid rgba(197, 160, 89, 0.45);
    color: #C5A059;
    padding: 10px 56px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  /* Page 2 Gallery */
  .jm-section-head {
    text-align: center;
    padding: 20px 56px 14px;
    border-bottom: 1px solid rgba(197, 160, 89, 0.35);
  }
  .jm-filter-bar {
    display: inline-flex;
    border: 1px solid #C5A059;
    margin-top: 12px;
    background: #111318;
  }
  .jm-filter-bar span {
    padding: 8px 20px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border-right: 1px solid rgba(197, 160, 89, 0.4);
    font-weight: 600;
    color: #C9C3B8;
  }
  .jm-filter-bar span:last-child { border-right: none; }
  .jm-filter-bar span.active {
    background: #C5A059;
    color: #0B0C0F;
  }
  .jm-product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 22px 56px;
  }
  .jm-card {
    display: flex;
    flex-direction: column;
    text-align: center;
    background: #12141B;
    border: 1px solid rgba(197, 160, 89, 0.45);
    padding: 14px;
  }
  .jm-card-img-wrap {
    position: relative;
    aspect-ratio: 1 / 0.98;
    border: 1px solid rgba(197, 160, 89, 0.4);
    margin-bottom: 12px;
    overflow: hidden;
  }
  .jm-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .jm-card-tag {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(11, 12, 15, 0.92);
    border: 1px solid #C5A059;
    color: #E5C878;
    padding: 3px 8px;
    font-size: 8.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .jm-card-angles {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(11, 12, 15, 0.92);
    border: 1px solid rgba(197, 160, 89, 0.6);
    padding: 3px 10px;
    font-size: 8px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
    color: #FAF7F2;
  }
  .jm-card-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 23px;
    font-weight: 600;
    color: #FAF7F2;
    margin-bottom: 3px;
  }
  .jm-card-notes {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 14.5px;
    color: #C9C3B8;
    margin-bottom: 6px;
  }
  .jm-card-spec {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #E5C878;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .jm-card-cta {
    width: 100%;
    padding: 11px;
    font-size: 9.5px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
    border: 1px solid #C5A059;
    background: transparent;
    color: #FAF7F2;
  }
  .jm-card-cta.filled {
    background: #C5A059;
    color: #0B0C0F;
  }
</style>
</head>
<body>

  <!-- PAGE 1: JO MALONE LAYOUT ON BLACK OBSIDIAN CANVAS -->
  <div class="pdf-page">
    <div class="jm-utility-bar">
      COMPLIMENTARY TWO-PIECE RIGID GIFT BOX ON EVERY ORDER • THE $108 BESPOKE GIFT SUITES ($130 VALUE)
    </div>
    <header class="jm-header">
      <div class="jm-header-top">
        <div class="jm-header-side">SEARCH • SCENT PAIRING GUIDE</div>
        <div class="jm-brand-logo">
          <h1>PUCK &amp; WICK</h1>
          <span>LOUDOUN COUNTY • ZEOCARB-98™ MOLECULAR LAB</span>
        </div>
        <div class="jm-header-side" style="text-align:right;">ACCOUNT • SHOPPING BAG (1)</div>
      </div>
      <nav class="jm-nav">
        <span>SOY CANDLES • IN STOCK ($44)</span>
        <span>ZEOCARB-98™ ODOR PUCKS ($48)</span>
        <span>THE $108 DELUXE GIFT BOXES</span>
        <span>MEN'S OBSIDIAN LINE</span>
        <span>WOMEN'S SANCTUARY LINE</span>
      </nav>
    </header>

    <section class="jm-hero">
      <div class="jm-hero-visual">
        <img src="${IMGS.shelfWomens}" alt="Unlit Warm Frosted Ivory Sanctuary Candle & Rigid Box" />
        <img src="${IMGS.shelfMens}" alt="Unlit Matte Obsidian Athlete Candle & Rigid Box" />
        <div class="jm-hero-floating-badge">
          100% UNLIT STUDIO PHOTOGRAPHY • BRUSHED BRASS LID &amp; RIGID GIFT BOX INCLUDED
        </div>
      </div>
      <div class="jm-hero-copy">
        <div class="jm-framed-card">
          <div class="jm-kicker">JO MALONE "COLOGNE INTENSE" DARK OBSIDIAN EDITION</div>
          <h1 class="jm-h1">Your Signature Black Background—With Jo Malone’s Crisp Gold Framing.</h1>
          <p class="jm-lead">
            Here is the exact same <strong>Jo Malone London layout</strong> applied to your signature <strong>Black Obsidian (#0B0C0F)</strong> background. By using <strong>unlit studio photos</strong> on warm walnut &amp; travertine surfaces framed inside <strong>1px Champagne-Gold (#C5A059) borders</strong>, you keep your dark masculine edge without the page feeling flat.
          </p>
          <div class="jm-btn-row">
            <div class="jm-btn-gold">SHOP IN-STOCK CANDLES ($44)</div>
            <div class="jm-btn-outline">BUILD YOUR $108 BOX</div>
          </div>
        </div>
      </div>
    </section>

    <section class="jm-trio-strip">
      <div class="jm-trio-cell">
        <img src="${IMGS.shelfBalsam}" alt="Unlit Soy Candles" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">IN STOCK • UNLIT STUDIO VESSELS</div>
          <h4>10 Signature Soy Candles ($44)</h4>
          <p>10 oz Vessel (8.5 oz / 240g Net Fill — 20% larger than 7 oz luxury candles) w/ Brass Lid &amp; Box.</p>
          <span class="jm-link-underline">EXPLORE 10 SCENTS ($44) &rarr;</span>
        </div>
      </div>
      <div class="jm-trio-cell">
        <img src="${IMGS.puckMenStall}" alt="ZeoCarb-98 Odor Pucks" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">COVERS UP TO 120 SQ. FT. • 3-AXIS AIRFLOW</div>
          <h4>ZeoCarb-98™ Odor Pucks ($48)</h4>
          <p>For Hockey &amp; Gym Bags, Pro Locker Stalls, Walk-In Closets, Home Gyms &amp; Cars.</p>
          <span class="jm-link-underline">JOIN DROP 01 WAITLIST ($48) &rarr;</span>
        </div>
      </div>
      <div class="jm-trio-cell">
        <img src="${IMGS.boxMenOpen}" alt="Deluxe Gift Boxes" />
        <div class="jm-trio-meta">
          <div class="jm-kicker" style="margin-bottom:2px;">$130 RETAIL VALUE • SAVE $22</div>
          <h4>The $108 Deluxe Gift Boxes</h4>
          <p>Includes 10 oz Candle ($44) + 3.0" Odor Puck ($48) + Body Wash or Linen Mist ($38).</p>
          <span class="jm-link-underline">CUSTOMIZE HIS OR HERS ($108) &rarr;</span>
        </div>
      </div>
    </section>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ • JO MALONE LAYOUT ON BLACK OBSIDIAN BACKGROUND (UNLIT CANDLES + ZEOCARB-98™)</span>
      <span>PAGE 01 OF 04 • HERO &amp; ARCHITECTURE</span>
    </div>
  </div>

  <!-- PAGE 2: UNLIT CANDLE & UNIVERSAL PUCK GALLERY ON BLACK BACKGROUND -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;">I. UNLIT STUDIO GALLERY &amp; ZEOCARB-98™ HARDWARE</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C9C3B8;">PRICES: $38 • $44 • $48 • $108</span>
      </div>
    </header>

    <div class="jm-section-head">
      <div class="jm-kicker">100% UNLIT CANDLE PHOTOGRAPHY • UNIVERSAL HOME &amp; ATHLETIC PUCKS</div>
      <h2 class="serif" style="font-size:36px;font-weight:500;">Framed Gallery Cards on Dark Obsidian (#0B0C0F)</h2>
      <div class="jm-filter-bar">
        <span class="active">ALL ITEMS (15)</span>
        <span>SOY CANDLES • IN STOCK ($44)</span>
        <span>MEN'S OBSIDIAN LINE (10)</span>
        <span>WOMEN'S SANCTUARY LINE (5)</span>
        <span>ZEOCARB-98™ PUCKS &amp; CARE ($38–$48)</span>
      </div>
    </div>

    <div class="jm-product-grid">
      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.shelfMens}" alt="Top Shelf Unlit" />
          <span class="jm-card-tag">FLAGSHIP • IN STOCK</span>
          <span class="jm-card-angles">UNLIT VESSEL &amp; BOX • CARD • 360°</span>
        </div>
        <h3 class="jm-card-title">Top Shelf</h3>
        <div class="jm-card-notes">Crimson Saffron, Virginia Cedar &amp; Amberwood</div>
        <div class="jm-card-spec">10 oz Vessel (8.5 oz Fill) • Brass Lid &amp; Box • $44.00</div>
        <button class="jm-card-cta filled">ADD TO BAG — $44.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.shelfWomens}" alt="Velvet Vanilla & Santal Unlit" />
          <span class="jm-card-tag">SANCTUARY • IN STOCK</span>
          <span class="jm-card-angles">UNLIT VESSEL &amp; BOX • CARD • 360°</span>
        </div>
        <h3 class="jm-card-title">Velvet Vanilla &amp; Santal</h3>
        <div class="jm-card-notes">Australian Sandalwood, Cardamom &amp; Vanilla Bean</div>
        <div class="jm-card-spec">10 oz Vessel (8.5 oz Fill) • Brass Lid &amp; Box • $44.00</div>
        <button class="jm-card-cta filled">ADD TO BAG — $44.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.puckMenStall}" alt="3.0 Odor Puck Obsidian & Gold" />
          <span class="jm-card-tag">COVERS UP TO 120 SQ. FT.</span>
          <span class="jm-card-angles">STUDIO • STALL • HOCKEY BAG • CLOSET</span>
        </div>
        <h3 class="jm-card-title">3.0" Odor Puck — Obsidian &amp; Gold</h3>
        <div class="jm-card-notes">For Hockey &amp; Gym Bags, Stalls, Closets &amp; Cars</div>
        <div class="jm-card-spec">ZeoCarb-98™ • 3-Axis Airflow • 120 Sq. Ft. • $48.00</div>
        <button class="jm-card-cta">JOIN DROP 01 WAITLIST — $48.00</button>
      </div>

      <div class="jm-card">
        <div class="jm-card-img-wrap">
          <img src="${IMGS.puckWomenCloset}" alt="3.0 Odor Puck Ivory & Gold" />
          <span class="jm-card-tag">COVERS UP TO 120 SQ. FT.</span>
          <span class="jm-card-angles">STUDIO • GYM TOTE • WALK-IN CLOSET</span>
        </div>
        <h3 class="jm-card-title">3.0" Odor Puck — Ivory &amp; Gold</h3>
        <div class="jm-card-notes">For Closets, Home Gyms, Totes &amp; Powder Rooms</div>
        <div class="jm-card-spec">ZeoCarb-98™ • 3-Axis Airflow • 120 Sq. Ft. • $48.00</div>
        <button class="jm-card-cta">JOIN DROP 01 WAITLIST — $48.00</button>
      </div>
    </div>

    <!-- Scent & Space Pairing Bar -->
    <div style="margin:0 56px 18px;border:1px solid #C5A059;background:#111318;padding:18px 28px;display:grid;grid-template-columns:0.32fr 0.68fr;gap:24px;align-items:center;">
      <div>
        <div class="jm-kicker" style="margin-bottom:4px;">JO MALONE INTERACTIVE FEATURE</div>
        <h3 class="serif" style="font-size:26px;font-weight:500;">Scent &amp; Space Pairing Guide</h3>
        <p style="font-size:11.5px;color:#B5AFA4;">Pair a 10 oz Candle ($44) + 3.0" ZeoCarb-98™ Puck ($48) for any room, closet, or bag.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div style="border:1px solid #C5A059;padding:10px 14px;background:#0B0C0F;">
          <div style="font-size:9px;color:#C5A059;letter-spacing:0.15em;font-weight:700;">01 • HOME GYM &amp; LOCKER STALL</div>
          <div class="serif" style="font-size:17px;font-weight:600;">Fresh Cut + 3.0" Obsidian Puck</div>
          <div style="font-size:10px;color:#B5AFA4;">Covers 120 Sq. Ft. + Hinoki &amp; Eucalyptus</div>
        </div>
        <div style="border:1px solid rgba(197,160,89,0.4);padding:10px 14px;background:#0B0C0F;">
          <div style="font-size:9px;color:#C5A059;letter-spacing:0.15em;font-weight:700;">02 • MASTER SUITE &amp; CLOSET</div>
          <div class="serif" style="font-size:17px;font-weight:600;">Velvet Vanilla + 3.0" Ivory Puck</div>
          <div style="font-size:10px;color:#B5AFA4;">Covers 120 Sq. Ft. + Santal &amp; Vanilla</div>
        </div>
        <div style="border:1px solid rgba(197,160,89,0.4);padding:10px 14px;background:#0B0C0F;">
          <div style="font-size:9px;color:#C5A059;letter-spacing:0.15em;font-weight:700;">03 • HOLIDAY &amp; HOST GIFTING</div>
          <div class="serif" style="font-size:17px;font-weight:600;">Balsam Fir + 2.0" Mini Pucks</div>
          <div style="font-size:10px;color:#B5AFA4;">Blue Ridge Fir ($44) + Footwear Pair ($38)</div>
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ • JO MALONE LAYOUT ON BLACK OBSIDIAN BACKGROUND</span>
      <span>PAGE 02 OF 04 • UNLIT GALLERY &amp; SCENT PAIRING</span>
    </div>
  </div>

  <!-- PAGE 3: THE $108 DELUXE COLLECTOR BOX SUITE ($130 VALUE — SAVE $22) -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;">II. THE ART OF BESPOKE GIFTING</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#E5C878;">$108 DELUXE BOX ($130 VALUE • SAVE $22)</span>
      </div>
    </header>

    <div style="display:grid;grid-template-columns:1.05fr 0.95fr;flex:1;padding:28px 56px;gap:36px;align-items:center;">
      <div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
          <div style="border:1.5px solid #C5A059;background:#12141B;padding:10px;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:240px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:8px;" />
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="serif" style="font-size:20px;font-weight:600;">Men's Obsidian Suite</span>
              <span style="font-size:11px;color:#E5C878;font-weight:700;">$108 ($130 Val)</span>
            </div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:10px;">
            <img src="${IMGS.boxWomenOpen}" style="width:100%;height:240px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:8px;" />
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span class="serif" style="font-size:20px;font-weight:600;">Women's Sanctuary Suite</span>
              <span style="font-size:11px;color:#E5C878;font-weight:700;">$108 ($130 Val)</span>
            </div>
          </div>
        </div>

        <!-- 4 Minimalist Box Angles (No Square Outline on Closed Lids) -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
          <div style="border:1px solid #C5A059;padding:6px;background:#12141B;text-align:center;">
            <img src="${IMGS.boxMenClosed}" style="width:100%;height:110px;object-fit:cover;margin-bottom:4px;" />
            <div style="font-size:9px;letter-spacing:0.12em;color:#E5C878;font-weight:600;">MINIMALIST OBSIDIAN LID</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#12141B;text-align:center;">
            <img src="${IMGS.boxWomenClosed}" style="width:100%;height:110px;object-fit:cover;margin-bottom:4px;" />
            <div style="font-size:9px;letter-spacing:0.12em;color:#FAF7F2;font-weight:600;">MINIMALIST IVORY LID</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#12141B;text-align:center;">
            <img src="${IMGS.washMen}" style="width:100%;height:110px;object-fit:cover;margin-bottom:4px;" />
            <div style="font-size:9px;letter-spacing:0.12em;color:#FAF7F2;font-weight:600;">8 OZ CHARCOAL WASH ($38)</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#12141B;text-align:center;">
            <img src="${IMGS.mistWomen}" style="width:100%;height:110px;object-fit:cover;margin-bottom:4px;" />
            <div style="font-size:9px;letter-spacing:0.12em;color:#FAF7F2;font-weight:600;">4 OZ LINEN MIST ($38)</div>
          </div>
        </div>
      </div>

      <!-- Right: 3-Step Configurator -->
      <div style="border:1px solid #C5A059;background:#111318;padding:30px 34px;box-shadow:8px 8px 0 #C5A059;">
        <div class="jm-kicker">THE TWO-ITEM BRIDGE UPSELL ($44 + $48 = $92 &rarr; $108 FULL SUITE)</div>
        <h2 class="serif" style="font-size:34px;font-weight:500;margin-bottom:10px;">The $108 Deluxe Collector Suite</h2>
        <p style="font-size:12.5px;color:#C9C3B8;line-height:1.55;margin-bottom:18px;">
          Buying a Candle ($44) and 3.0" Odor Puck ($48) separately is $92. For <strong>just $16 more ($108)</strong>, customers get the $38 Body Wash or Linen Mist + Magnetic Presentation Box included ($130 total value — <strong>Save $22</strong>).
        </p>

        <div style="border-top:1px solid rgba(197,160,89,0.35);padding-top:12px;margin-bottom:12px;">
          <div style="font-size:9.5px;letter-spacing:0.18em;color:#C5A059;font-weight:700;margin-bottom:6px;">STEP 01 • SELECT EDITION</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:#C5A059;color:#0B0C0F;padding:9px 12px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-align:center;">&#9679; MEN'S OBSIDIAN ($108)</div>
            <div style="border:1px solid #C5A059;color:#FAF7F2;padding:9px 12px;font-size:10px;font-weight:600;letter-spacing:0.14em;text-align:center;">&#9675; WOMEN'S SANCTUARY ($108)</div>
          </div>
        </div>

        <div style="border-top:1px solid rgba(197,160,89,0.35);padding-top:12px;margin-bottom:16px;">
          <div style="font-size:9.5px;letter-spacing:0.18em;color:#C5A059;font-weight:700;margin-bottom:6px;">STEP 02 • CHOOSE YOUR 10 OZ SOY CANDLE ($44 VALUE)</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
            <div style="border:1.5px solid #C5A059;background:#1A1D24;padding:8px;font-size:9.5px;text-align:center;font-weight:700;color:#E5C878;">TOP SHELF</div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:8px;font-size:9.5px;text-align:center;">FRESH CUT</div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:8px;font-size:9.5px;text-align:center;">BALSAM FIR</div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:8px;font-size:9.5px;text-align:center;">VELVET VANILLA</div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:8px;font-size:9.5px;text-align:center;">CASHMERE TEA</div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:8px;font-size:9.5px;text-align:center;">SEA SALT ORCHID</div>
          </div>
        </div>

        <div style="background:#C5A059;color:#0B0C0F;padding:14px;text-align:center;font-size:11px;letter-spacing:0.2em;font-weight:700;">
          RESERVE BESPOKE $108 GIFT SUITE (SAVE $22)
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ • JO MALONE LAYOUT ON BLACK OBSIDIAN BACKGROUND</span>
      <span>PAGE 03 OF 04 • THE $108 DELUXE COLLECTOR SUITE</span>
    </div>
  </div>

  <!-- PAGE 4: WHITE CREAM VS BLACK OBSIDIAN SIDE-BY-SIDE COMPARISON & 4 MOBILE SCREENS -->
  <div class="pdf-page">
    <header class="jm-header" style="padding:14px 56px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;">III. MOBILE FLOW &amp; WHITE VS. BLACK COMPARISON</span>
        <span class="serif" style="font-size:24px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</span>
        <span style="font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C9C3B8;">4 IPHONE SCREENS</span>
      </div>
    </header>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding:24px 56px;flex:1;align-items:stretch;">
      <!-- Mobile 1 -->
      <div style="border:1.5px solid #C5A059;border-radius:20px;padding:12px;background:#111318;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:8px;letter-spacing:0.16em;color:#C5A059;text-align:center;margin-bottom:6px;font-weight:700;">MOBILE 01 • HERO &amp; JUMP PILLS</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;height:140px;border:1px solid #C5A059;margin-bottom:10px;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #C5A059;" />
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div style="border:1px solid #C5A059;padding:12px;background:#0B0C0F;box-shadow:4px 4px 0 #C5A059;">
            <div style="font-size:7.5px;color:#C5A059;letter-spacing:0.15em;margin-bottom:4px;">UNLIT STUDIO GALLERY</div>
            <div class="serif" style="font-size:20px;line-height:1.1;margin-bottom:8px;">Tailored Scent &amp; ZeoCarb-98™ Care.</div>
            <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;text-align:center;font-weight:700;letter-spacing:0.14em;">SHOP CANDLES ($44)</div>
          </div>
        </div>
        <div style="font-size:9px;color:#B5AFA4;text-align:center;border-top:1px solid rgba(197,160,89,0.3);padding-top:8px;">
          1-Tap "Odor Pucks &darr;" Jumps Straight to Pucks
        </div>
      </div>

      <!-- Mobile 2 -->
      <div style="border:1.5px solid #C5A059;border-radius:20px;padding:12px;background:#111318;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:8px;letter-spacing:0.16em;color:#C5A059;text-align:center;margin-bottom:6px;font-weight:700;">MOBILE 02 • 2-COL UNLIT GRID</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#0B0C0F;text-align:center;">
              <img src="${IMGS.shelfMens}" style="width:100%;height:95px;object-fit:cover;margin-bottom:4px;" />
              <div class="serif" style="font-size:14px;">Top Shelf</div>
              <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
              <div style="background:#C5A059;color:#0B0C0F;padding:4px;font-size:7.5px;font-weight:700;">ADD — $44</div>
            </div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#0B0C0F;text-align:center;">
              <img src="${IMGS.shelfWomens}" style="width:100%;height:95px;object-fit:cover;margin-bottom:4px;" />
              <div class="serif" style="font-size:14px;">Velvet Vanilla</div>
              <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
              <div style="background:#C5A059;color:#0B0C0F;padding:4px;font-size:7.5px;font-weight:700;">ADD — $44</div>
            </div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#0B0C0F;text-align:center;">
              <img src="${IMGS.shelfFreshCut}" style="width:100%;height:95px;object-fit:cover;margin-bottom:4px;" />
              <div class="serif" style="font-size:14px;">Fresh Cut</div>
              <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
              <div style="background:#C5A059;color:#0B0C0F;padding:4px;font-size:7.5px;font-weight:700;">ADD — $44</div>
            </div>
            <div style="border:1px solid rgba(197,160,89,0.4);padding:6px;background:#0B0C0F;text-align:center;">
              <img src="${IMGS.shelfBalsam}" style="width:100%;height:95px;object-fit:cover;margin-bottom:4px;" />
              <div class="serif" style="font-size:14px;">Balsam Fir</div>
              <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
              <div style="background:#C5A059;color:#0B0C0F;padding:4px;font-size:7.5px;font-weight:700;">ADD — $44</div>
            </div>
          </div>
        </div>
        <div style="font-size:9px;color:#B5AFA4;text-align:center;border-top:1px solid rgba(197,160,89,0.3);padding-top:8px;">
          4 Unlit Candles Visible at Once on Mobile
        </div>
      </div>

      <!-- Mobile 3 -->
      <div style="border:1.5px solid #C5A059;border-radius:20px;padding:12px;background:#111318;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:8px;letter-spacing:0.16em;color:#C5A059;text-align:center;margin-bottom:6px;font-weight:700;">MOBILE 03 • 120 SQ. FT. PUCK</div>
          <img src="${IMGS.puckMenStall}" style="width:100%;height:155px;object-fit:cover;border:1px solid #C5A059;margin-bottom:8px;" />
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:8px;">
            <img src="${IMGS.puckMenStudio}" style="width:100%;height:36px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);" />
            <img src="${IMGS.puckMenStall}" style="width:100%;height:36px;object-fit:cover;border:1.5px solid #C5A059;" />
            <img src="${IMGS.puckMenBag}" style="width:100%;height:36px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);" />
            <img src="${IMGS.puckMenCloset}" style="width:100%;height:36px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);" />
          </div>
          <div class="serif" style="font-size:18px;font-weight:600;margin-bottom:4px;">3.0" Odor Puck — Obsidian</div>
          <div style="font-size:9.5px;color:#C9C3B8;line-height:1.4;margin-bottom:8px;">
            ZeoCarb-98™ • Covers up to 120 Sq. Ft. • 3-Axis Airflow (No Upside Down).
          </div>
          <div style="border:1px solid #C5A059;color:#E5C878;padding:8px;font-size:8.5px;text-align:center;font-weight:700;">WAITLIST — $48.00</div>
        </div>
        <div style="font-size:9px;color:#B5AFA4;text-align:center;border-top:1px solid rgba(197,160,89,0.3);padding-top:8px;">
          Shows Studio, Stall, Bag &amp; Closet Uses
        </div>
      </div>

      <!-- Mobile 4 -->
      <div style="border:1.5px solid #C5A059;border-radius:20px;padding:12px;background:#111318;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:8px;letter-spacing:0.16em;color:#C5A059;text-align:center;margin-bottom:6px;font-weight:700;">MOBILE 04 • $108 DELUXE BOX</div>
          <img src="${IMGS.boxMenOpen}" style="width:100%;height:145px;object-fit:cover;border:1px solid #C5A059;margin-bottom:8px;" />
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:8px;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:40px;object-fit:cover;border:1.5px solid #C5A059;" />
            <img src="${IMGS.boxMenClosed}" style="width:100%;height:40px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);" />
            <img src="${IMGS.boxWomenClosed}" style="width:100%;height:40px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);" />
          </div>
          <div class="serif" style="font-size:18px;font-weight:600;margin-bottom:4px;">The $108 Deluxe Suite</div>
          <div style="font-size:9.5px;color:#E5C878;margin-bottom:8px;">$130 Value (Save $22) • Distraction-Free Fullscreen Viewer</div>
          <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;text-align:center;font-weight:700;">CUSTOMIZE — $108.00</div>
        </div>
        <div style="font-size:9px;color:#B5AFA4;text-align:center;border-top:1px solid rgba(197,160,89,0.3);padding-top:8px;">
          Clean Closed Box Lid (No Outer Square)
        </div>
      </div>
    </div>

    <div class="deck-footer">
      <span>PUCK &amp; WICK™ • JO MALONE LAYOUT ON BLACK OBSIDIAN BACKGROUND</span>
      <span>PAGE 04 OF 04 • MOBILE FLOW &amp; SUMMARY</span>
    </div>
  </div>

</body>
</html>`;

// ============================================================================
// 2. JO MALONE "COLOGNE INTENSE" BLACK BACKGROUND MOBILE PORTRAIT PDF (4 SCREENS)
// ============================================================================
const joMaloneBlackMobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Jo Malone Layout on Black Background (Mobile iPhone PDF)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 430px 932px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0B0C0F;
    color: #FAF7F2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .mobile-page {
    width: 430px;
    height: 932px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    background: #0B0C0F;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .jm-bar {
    background: #C5A059;
    color: #0B0C0F;
    font-size: 8.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-align: center;
    padding: 8px 12px;
    font-weight: 700;
  }
  .jm-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid #C5A059;
    background: #0B0C0F;
  }
  .jm-logo {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #FAF7F2;
  }
  .jm-sublogo {
    font-size: 7.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #C5A059;
    text-align: center;
    margin-top: 2px;
  }
  .jm-pills {
    display: flex;
    gap: 6px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(197, 160, 89, 0.35);
    background: #111318;
  }
  .jm-pill {
    font-size: 8.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 6px 10px;
    border: 1px solid #C5A059;
    white-space: nowrap;
    font-weight: 600;
    color: #FAF7F2;
  }
  .jm-pill.active {
    background: #C5A059;
    color: #0B0C0F;
    font-weight: 700;
  }
  .page-foot {
    background: #060709;
    border-top: 1px solid rgba(197, 160, 89, 0.45);
    color: #C5A059;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    font-size: 8.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
</style>
</head>
<body>

  <!-- MOBILE SCREEN 1: BLACK OBSIDIAN JO MALONE HERO -->
  <div class="mobile-page">
    <div>
      <div class="jm-bar">COMPLIMENTARY RIGID GIFT BOX • $108 DELUXE SUITES ($130 VALUE)</div>
      <div class="jm-nav">
        <span style="font-size:10px;letter-spacing:0.14em;color:#C5A059;">&#9776; MENU</span>
        <div>
          <div class="jm-logo">PUCK &amp; WICK</div>
          <div class="jm-sublogo">ZEOCARB-98™ MOLECULAR LAB</div>
        </div>
        <span style="font-size:10px;letter-spacing:0.14em;color:#C5A059;">BAG (1)</span>
      </div>
      <div class="jm-pills">
        <span class="jm-pill active">CANDLES ($44)</span>
        <span class="jm-pill">ODOR PUCKS ($48) &darr;</span>
        <span class="jm-pill">$108 BOXES</span>
      </div>

      <!-- Unlit Split Hero -->
      <div style="display:grid;grid-template-columns:1fr 1fr;height:275px;border-bottom:1px solid #C5A059;position:relative;">
        <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #C5A059;" />
        <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
        <div style="position:absolute;bottom:10px;left:12px;background:rgba(11,12,15,0.92);border:1px solid #C5A059;color:#FAF7F2;padding:4px 10px;font-size:8px;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;">
          100% UNLIT STUDIO PHOTOGRAPHY
        </div>
      </div>

      <!-- Framed Offset Gold Card -->
      <div style="padding:18px;">
        <div style="background:#111318;border:1px solid #C5A059;box-shadow:6px 6px 0 #C5A059;padding:20px;">
          <div style="font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin-bottom:6px;font-weight:700;">
            JO MALONE LAYOUT • BLACK OBSIDIAN THEME
          </div>
          <h1 class="serif" style="font-size:30px;line-height:1.08;font-weight:500;margin-bottom:10px;color:#FAF7F2;">
            Tailored Scent &amp; ZeoCarb-98™ Care.
          </h1>
          <p style="font-size:11.5px;line-height:1.55;color:#C9C3B8;margin-bottom:14px;">
            Your signature black background upgraded with Jo Malone's 1px gold architectural borders, unlit studio candle photos, and universal 120 Sq. Ft. Odor Pucks.
          </p>
          <div style="background:#C5A059;color:#0B0C0F;text-align:center;padding:12px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">
            SHOP 10 SOY CANDLES ($44)
          </div>
          <div style="border:1px solid #C5A059;color:#FAF7F2;text-align:center;padding:11px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
            CUSTOMIZE THE $108 GIFT BOX
          </div>
        </div>
      </div>

      <!-- Bottom Quick Category Trio (All Unlit) -->
      <div style="padding:0 18px;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
            <img src="${IMGS.shelfBalsam}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">10 Candles</div>
            <div style="font-size:8px;color:#E5C878;">UNLIT • $44</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
            <img src="${IMGS.puckMenStall}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">Odor Pucks</div>
            <div style="font-size:8px;color:#E5C878;">120 SQ FT • $48</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">$108 Boxes</div>
            <div style="font-size:8px;color:#E5C878;">SAVE $22</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE BLACK MOBILE</span>
      <span>SCREEN 01 / 04 • MOBILE HERO</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 2: 2-COLUMN UNLIT CANDLE GALLERY ON BLACK -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;color:#C5A059;">&#9776;</span>
        <div class="jm-logo" style="font-size:19px;">PUCK &amp; WICK</div>
        <span style="font-size:10px;color:#C5A059;">BAG (1)</span>
      </div>
      <div style="padding:14px 16px 10px;text-align:center;border-bottom:1px solid rgba(197,160,89,0.35);">
        <div style="font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin-bottom:3px;font-weight:700;">
          100% UNLIT STUDIO CANDLE GALLERY
        </div>
        <h2 class="serif" style="font-size:25px;font-weight:500;">Compare 4 Unlit Vessels at a Glance</h2>
      </div>
      <div class="jm-pills" style="margin-bottom:12px;">
        <span class="jm-pill active">ALL (15)</span>
        <span class="jm-pill">CANDLES ($44)</span>
        <span class="jm-pill">MEN'S (10)</span>
        <span class="jm-pill">WOMEN'S (5)</span>
      </div>

      <!-- 2x2 Unlit Product Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 16px;">
        <div style="text-align:center;background:#12141B;border:1px solid rgba(197,160,89,0.4);padding:8px;">
          <div style="position:relative;border:1px solid rgba(197,160,89,0.35);aspect-ratio:1/1.02;margin-bottom:7px;">
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#0B0C0F;border:1px solid #C5A059;color:#E5C878;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:700;">IN STOCK</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Top Shelf</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#C9C3B8;margin-bottom:3px;">Saffron, Cedar &amp; Amber</div>
          <div style="font-size:9px;color:#E5C878;font-weight:600;margin-bottom:6px;">10 oz Vessel • $44.00</div>
          <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">ADD TO BAG</div>
        </div>

        <div style="text-align:center;background:#12141B;border:1px solid rgba(197,160,89,0.4);padding:8px;">
          <div style="position:relative;border:1px solid rgba(197,160,89,0.35);aspect-ratio:1/1.02;margin-bottom:7px;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#0B0C0F;border:1px solid #C5A059;color:#E5C878;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:700;">SANCTUARY</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Velvet Vanilla</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#C9C3B8;margin-bottom:3px;">Santal &amp; Cardamom</div>
          <div style="font-size:9px;color:#E5C878;font-weight:600;margin-bottom:6px;">10 oz Vessel • $44.00</div>
          <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">ADD TO BAG</div>
        </div>

        <div style="text-align:center;background:#12141B;border:1px solid rgba(197,160,89,0.4);padding:8px;">
          <div style="position:relative;border:1px solid rgba(197,160,89,0.35);aspect-ratio:1/1.02;margin-bottom:7px;">
            <img src="${IMGS.shelfFreshCut}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#0B0C0F;border:1px solid #C5A059;color:#E5C878;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:700;">IN STOCK</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Fresh Cut</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#C9C3B8;margin-bottom:3px;">Hinoki &amp; Eucalyptus</div>
          <div style="font-size:9px;color:#E5C878;font-weight:600;margin-bottom:6px;">10 oz Vessel • $44.00</div>
          <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">ADD TO BAG</div>
        </div>

        <div style="text-align:center;background:#12141B;border:1px solid rgba(197,160,89,0.4);padding:8px;">
          <div style="position:relative;border:1px solid rgba(197,160,89,0.35);aspect-ratio:1/1.02;margin-bottom:7px;">
            <img src="${IMGS.shelfBalsam}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#0B0C0F;border:1px solid #C5A059;color:#E5C878;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:700;">HOLIDAY HIT</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Balsam Fir</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#C9C3B8;margin-bottom:3px;">Blue Ridge Fir &amp; Cedar</div>
          <div style="font-size:9px;color:#E5C878;font-weight:600;margin-bottom:6px;">10 oz Vessel • $44.00</div>
          <div style="background:#C5A059;color:#0B0C0F;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">ADD TO BAG</div>
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE BLACK MOBILE</span>
      <span>SCREEN 02 / 04 • UNLIT 2-COL GALLERY</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 3: ZEOCARB-98 ODOR PUCK (120 SQ FT + 3-AXIS AIRFLOW) -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;color:#C5A059;">&larr; BACK</span>
        <div class="jm-logo" style="font-size:19px;">ZEOCARB-98™</div>
        <span style="font-size:10px;color:#C5A059;">$48.00</span>
      </div>

      <div style="padding:14px 18px;">
        <div style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:4px;font-weight:700;">
          COVERS UP TO 120 SQ. FT. • 3-AXIS OMNI AIRFLOW
        </div>
        <h2 class="serif" style="font-size:27px;font-weight:600;line-height:1.1;margin-bottom:4px;">
          The 3.0" Odor Puck — Obsidian &amp; Gold
        </h2>
        <div class="serif" style="font-style:italic;font-size:13.5px;color:#C9C3B8;margin-bottom:10px;">
          For Hockey &amp; Gym Bags, Locker Stalls, Walk-In Closets, Home Gyms &amp; Cars
        </div>

        <div style="border:1px solid #C5A059;aspect-ratio:1/0.9;overflow:hidden;position:relative;margin-bottom:8px;">
          <img src="${IMGS.puckMenStall}" style="width:100%;height:100%;object-fit:cover;" />
          <span style="position:absolute;top:8px;left:8px;background:rgba(11,12,15,0.92);border:1px solid #C5A059;color:#E5C878;padding:3px 8px;font-size:8px;letter-spacing:0.14em;font-weight:700;">
            2 OF 4 • PRO LOCKER STALL
          </span>
        </div>

        <!-- 4 Universal Use-Case Thumbnails -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px;">
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.puckMenStudio}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7px;letter-spacing:0.08em;font-weight:600;">1. STUDIO</div>
          </div>
          <div style="border:1.5px solid #C5A059;padding:3px;text-align:center;background:#1A1D24;">
            <img src="${IMGS.puckMenStall}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7px;letter-spacing:0.08em;font-weight:700;color:#E5C878;">2. STALL</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.puckMenBag}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7px;letter-spacing:0.08em;font-weight:600;">3. GEAR BAG</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.puckMenCloset}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7px;letter-spacing:0.08em;font-weight:600;">4. CLOSET</div>
          </div>
        </div>

        <div style="border:1px solid rgba(197,160,89,0.45);background:#111318;padding:10px 12px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:9.5px;font-weight:700;color:#E5C878;letter-spacing:0.1em;margin-bottom:4px;">
            <span>3-AXIS AIRFLOW (NO UPSIDE DOWN)</span>
            <span>UP TO 120 SQ. FT.</span>
          </div>
          <p style="font-size:10.5px;line-height:1.48;color:#C9C3B8;">
            Symmetrical dual-face perforations + 6 side-wall intake slots ensure continuous ZeoCarb-98™ odor capture whether lying flat on a closet shelf or tumbling inside a hockey bag.
          </p>
        </div>

        <div style="background:#C5A059;color:#0B0C0F;text-align:center;padding:13px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
          JOIN DROP 01 WAITLIST — $48.00
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE BLACK MOBILE</span>
      <span>SCREEN 03 / 04 • ZEOCARB-98™ PUCK</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 4: THE $108 DELUXE BOX SUITE ($130 VALUE) -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;color:#C5A059;">&larr; BACK</span>
        <div class="jm-logo" style="font-size:18px;">THE $108 DELUXE SUITE</div>
        <span style="font-size:10px;color:#E5C878;">SAVE $22</span>
      </div>

      <div style="padding:14px 18px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <div style="border:1.5px solid #C5A059;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:140px;object-fit:cover;display:block;" />
            <div style="background:#C5A059;color:#0B0C0F;font-size:8px;letter-spacing:0.14em;padding:4px;text-align:center;font-weight:700;">
              MEN'S OBSIDIAN ($108)
            </div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);">
            <img src="${IMGS.boxWomenOpen}" style="width:100%;height:140px;object-fit:cover;display:block;" />
            <div style="background:#12141B;color:#FAF7F2;font-size:8px;letter-spacing:0.14em;padding:4px;text-align:center;font-weight:600;">
              WOMEN'S SANCTUARY ($108)
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px;">
          <div style="border:1.5px solid #C5A059;padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:700;color:#E5C878;margin-top:2px;">1. OPEN BOX</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.boxMenClosed}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">2. CLOSED LID</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.boxWomenClosed}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">3. IVORY LID</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.4);padding:3px;text-align:center;background:#12141B;">
            <img src="${IMGS.cardMens}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">4. STORY CARD</div>
          </div>
        </div>

        <div style="border:1px solid #C5A059;background:#111318;padding:14px;">
          <div style="font-size:8.5px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A059;margin-bottom:4px;font-weight:700;">
            STEP 01 • INCLUDED HARDWARE &amp; APOTHECARY ($86 VALUE)
          </div>
          <div style="font-size:11px;font-weight:600;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(197,160,89,0.3);">
            &#10003; 3.0" Odor Puck ($48) + &#10003; 8 oz Wash / 4 oz Mist ($38)
          </div>

          <div style="font-size:8.5px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A059;margin-bottom:6px;font-weight:700;">
            STEP 02 • SELECT YOUR 10 OZ SOY CANDLE ($44 VALUE)
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">
            <div style="background:#C5A059;color:#0B0C0F;padding:7px 8px;font-size:8.5px;font-weight:700;letter-spacing:0.1em;">
              &#9679; TOP SHELF ($44)
            </div>
            <div style="background:#0B0C0F;border:1px solid rgba(197,160,89,0.45);padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; FRESH CUT ($44)
            </div>
            <div style="background:#0B0C0F;border:1px solid rgba(197,160,89,0.45);padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; BALSAM FIR ($44)
            </div>
            <div style="background:#0B0C0F;border:1px solid rgba(197,160,89,0.45);padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; RINKSIDE CEDAR ($44)
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span style="font-size:10px;color:#C9C3B8;">Retail Value: <s>$130.00</s></span>
            <span class="serif" style="font-size:22px;font-weight:700;color:#FAF7F2;">$108.00 <span style="font-size:10px;color:#E5C878;">(SAVE $22)</span></span>
          </div>

          <div style="background:#C5A059;color:#0B0C0F;text-align:center;padding:13px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
            RESERVE CUSTOM $108 BOX SUITE
          </div>
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE BLACK MOBILE</span>
      <span>SCREEN 04 / 04 • $108 DELUXE BOX</span>
    </div>
  </div>

</body>
</html>`;

async function run() {
  fs.writeFileSync(path.join(ROOT, 'jo-malone-black-desktop.html'), joMaloneBlackDesktopHTML, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'jo-malone-black-mobile.html'), joMaloneBlackMobileHTML, 'utf8');

  const browser = await chromium.launch({ headless: true });

  // 1. Render Desktop Black Jo Malone PDF (1440x960)
  const dCtx = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 2 });
  const dPage = await dCtx.newPage();
  await dPage.goto('file://' + path.join(ROOT, 'jo-malone-black-desktop.html'), { waitUntil: 'networkidle' });
  await dPage.evaluate(() => document.fonts.ready);

  const blackDesktopPdf = path.join(ROOT, 'Puck-and-Wick-Jo-Malone-Black-Desktop.pdf');
  await dPage.pdf({
    path: blackDesktopPdf,
    width: '1440px',
    height: '960px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  const dSlides = await dPage.locator('.pdf-page').all();
  for (let i = 0; i < dSlides.length; i++) {
    await dSlides[i].screenshot({ path: path.join(ARTIFACT_DIR, `jo-malone-black-page-${i + 1}.png`) });
  }

  // 2. Render Mobile Black Jo Malone PDF (430x932)
  const mCtx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
  const mPage = await mCtx.newPage();
  await mPage.goto('file://' + path.join(ROOT, 'jo-malone-black-mobile.html'), { waitUntil: 'networkidle' });
  await mPage.evaluate(() => document.fonts.ready);

  const blackMobilePdf = path.join(ROOT, 'Puck-and-Wick-Jo-Malone-Black-Mobile.pdf');
  await mPage.pdf({
    path: blackMobilePdf,
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  const mSlides = await mPage.locator('.mobile-page').all();
  for (let i = 0; i < mSlides.length; i++) {
    await mSlides[i].screenshot({ path: path.join(ARTIFACT_DIR, `jo-malone-black-mobile-${i + 1}.png`) });
  }

  await browser.close();
  fs.copyFileSync(blackDesktopPdf, path.join(ARTIFACT_DIR, 'Puck-and-Wick-Jo-Malone-Black-Desktop.pdf'));
  fs.copyFileSync(blackMobilePdf, path.join(ARTIFACT_DIR, 'Puck-and-Wick-Jo-Malone-Black-Mobile.pdf'));
  console.log('Generated Black Obsidian Jo Malone Desktop & Mobile PDFs successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
