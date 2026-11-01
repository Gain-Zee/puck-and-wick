import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc';

function toDataURI(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const IMGS = {
  shelfMens: toDataURI('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  shelfWomens: toDataURI('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
  candleObsidian: toDataURI('assets/images/candle-obsidian.jpg'),
  candleIvory: toDataURI('assets/images/candle-ivory.jpg'),
  candleEmerald: toDataURI('assets/images/packaging/shelf-candle-balsam-fir.jpg'),
  candleFrost: toDataURI('assets/images/packaging/shelf-candle-fresh-cut.jpg'),
  puckMenStall: toDataURI('assets/images/packaging/puck-men-locker.jpg'),
  puckMenStudio: toDataURI('assets/images/item-puck-men.jpg'),
  puckMenCloset: toDataURI('assets/images/packaging/puck-men-closet.jpg'),
  puckWomenStudio: toDataURI('assets/images/item-puck-women.jpg'),
  puckMiniPalm: toDataURI('assets/images/item-mini-pucks-pair.jpg'),
  boxMenOpen: toDataURI('assets/images/box-men-open.jpg'),
  boxMenClosed: toDataURI('assets/images/box-men-closed.jpg'),
  boxWomenOpen: toDataURI('assets/images/box-women-open.jpg'),
  boxWomenClosed: toDataURI('assets/images/box-women-closed.jpg'),
  washMens: toDataURI('assets/images/item-bodywash-men.jpg'),
  mistWomens: toDataURI('assets/images/item-mist-women.jpg'),
  cardMens: toDataURI('assets/images/packaging/atelier-card-obsidian.jpg'),
};

const joMaloneMobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Jo Malone Mobile Redesign (iPhone Portrait PDF)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 430px 932px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #FAF7F2;
    color: #111111;
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
    background: #FAF7F2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .jm-bar {
    background: #111111;
    color: #FAF7F2;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-align: center;
    padding: 8px 12px;
  }
  .jm-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid #111111;
    background: #FAF7F2;
  }
  .jm-logo {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .jm-sublogo {
    font-size: 7.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #666159;
    text-align: center;
    margin-top: 1px;
  }
  .jm-pills {
    display: flex;
    gap: 6px;
    padding: 10px 14px;
    border-bottom: 1px solid #E2DDD3;
    background: #F4EFE6;
    overflow: hidden;
  }
  .jm-pill {
    font-size: 8.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 6px 10px;
    border: 1px solid #111111;
    white-space: nowrap;
    font-weight: 600;
  }
  .jm-pill.active {
    background: #111111;
    color: #FAF7F2;
  }
  .page-foot {
    background: #111111;
    color: #FAF7F2;
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

  <!-- MOBILE SCREEN 1: HERO & QUICK JUMP PILLS -->
  <div class="mobile-page">
    <div>
      <div class="jm-bar">COMPLIMENTARY RIGID GIFT BOX ON EVERY ORDER • $98 BESPOKE SETS</div>
      <div class="jm-nav">
        <span style="font-size:10px;letter-spacing:0.14em;">&#9776; MENU</span>
        <div>
          <div class="jm-logo">PUCK &amp; WICK</div>
          <div class="jm-sublogo">LOUDOUN CO. • LAUSANNE</div>
        </div>
        <span style="font-size:10px;letter-spacing:0.14em;">BAG (1)</span>
      </div>
      <div class="jm-pills">
        <span class="jm-pill active">SOY CANDLES ($36)</span>
        <span class="jm-pill">ODOR PUCKS &darr;</span>
        <span class="jm-pill">$98 GIFT BOXES</span>
      </div>

      <!-- Split Hero Image -->
      <div style="display:grid;grid-template-columns:1fr 1fr;height:280px;border-bottom:1px solid #111111;position:relative;">
        <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #111111;" />
        <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
        <div style="position:absolute;bottom:10px;left:12px;background:rgba(250,247,242,0.95);border:1px solid #111111;padding:4px 10px;font-size:8px;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;">
          HIS &amp; HERS DUAL ARCHITECTURE
        </div>
      </div>

      <!-- Jo Malone Framed Editorial Box -->
      <div style="padding:18px;">
        <div style="background:#FAF7F2;border:1px solid #111111;box-shadow:6px 6px 0 #111111;padding:20px;">
          <div style="font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E6A63;margin-bottom:6px;font-weight:600;">
            SMALL-BATCH AMERICAN SOY &amp; ODOR HARDWARE
          </div>
          <h1 class="serif" style="font-size:30px;line-height:1.08;font-weight:500;margin-bottom:10px;">
            Tailored Scent &amp; Molecular Odor Care.
          </h1>
          <p style="font-size:11.5px;line-height:1.55;color:#4A4742;margin-bottom:14px;">
            Warm British Cream gallery canvas (#FAF7F2) with crisp 1px architectural lines—making both Matte Obsidian and Warm Frosted Ivory vessels pop on mobile.
          </p>
          <div style="background:#111111;color:#FAF7F2;text-align:center;padding:12px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;margin-bottom:8px;">
            SHOP 10 SOY CANDLES ($36)
          </div>
          <div style="border:1px solid #111111;color:#111111;text-align:center;padding:11px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
            CUSTOMIZE THE $98 GIFT BOX
          </div>
        </div>
      </div>

      <!-- Bottom Quick Category Trio -->
      <div style="padding:0 18px;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          <div style="border:1px solid #D8D2C7;background:#F4EFE6;padding:8px;text-align:center;">
            <img src="${IMGS.candleObsidian}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">10 Candles</div>
            <div style="font-size:8px;color:#666159;">IN STOCK • $36</div>
          </div>
          <div style="border:1px solid #D8D2C7;background:#F4EFE6;padding:8px;text-align:center;">
            <img src="${IMGS.puckMenStall}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">Odor Pucks</div>
            <div style="font-size:8px;color:#666159;">1 PER STALL • $44</div>
          </div>
          <div style="border:1px solid #D8D2C7;background:#F4EFE6;padding:8px;text-align:center;">
            <img src="${IMGS.boxWomenOpen}" style="width:100%;height:64px;object-fit:cover;margin-bottom:5px;" />
            <div class="serif" style="font-size:13px;font-weight:600;">$98 Boxes</div>
            <div style="font-size:8px;color:#666159;">HIS &amp; HERS</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE MOBILE REDESIGN</span>
      <span>SCREEN 01 / 04 • MOBILE HERO</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 2: 2-COLUMN MOBILE GALLERY GRID (COMPARE AT A GLANCE) -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;letter-spacing:0.14em;">&#9776;</span>
        <div class="jm-logo" style="font-size:19px;">PUCK &amp; WICK</div>
        <span style="font-size:10px;letter-spacing:0.14em;">BAG (1)</span>
      </div>
      <div style="padding:14px 16px 10px;text-align:center;border-bottom:1px solid #E2DDD3;">
        <div style="font-size:8.5px;letter-spacing:0.2em;text-transform:uppercase;color:#6E6A63;margin-bottom:3px;">
          2-COLUMN MOBILE GALLERY VIEW
        </div>
        <h2 class="serif" style="font-size:25px;font-weight:500;">Browse 4 Products Per Screen</h2>
      </div>
      <div class="jm-pills" style="margin-bottom:12px;">
        <span class="jm-pill active">ALL (15)</span>
        <span class="jm-pill">CANDLES (10)</span>
        <span class="jm-pill">MEN'S (10)</span>
        <span class="jm-pill">WOMEN'S (5)</span>
      </div>

      <!-- 2x2 Product Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 16px;">
        <!-- Item 1 -->
        <div style="text-align:center;">
          <div style="position:relative;border:1px solid #E2DDD3;background:#F3EEE4;aspect-ratio:1/1.08;margin-bottom:7px;">
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#FAF7F2;border:1px solid #111111;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:600;">IN STOCK</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Top Shelf</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#555049;margin-bottom:3px;">Bourbon &amp; Charred Oak</div>
          <div style="font-size:9.5px;font-weight:600;margin-bottom:6px;">10 oz Soy • $36.00</div>
          <div style="background:#111111;color:#FAF7F2;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:600;">ADD TO BAG</div>
        </div>

        <!-- Item 2 -->
        <div style="text-align:center;">
          <div style="position:relative;border:1px solid #E2DDD3;background:#F3EEE4;aspect-ratio:1/1.08;margin-bottom:7px;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#FAF7F2;border:1px solid #111111;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:600;">SANCTUARY</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Velvet Vanilla</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#555049;margin-bottom:3px;">Vanilla Bean &amp; Santal</div>
          <div style="font-size:9.5px;font-weight:600;margin-bottom:6px;">10 oz Soy • $36.00</div>
          <div style="background:#111111;color:#FAF7F2;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:600;">ADD TO BAG</div>
        </div>

        <!-- Item 3 -->
        <div style="text-align:center;">
          <div style="position:relative;border:1px solid #E2DDD3;background:#F3EEE4;aspect-ratio:1/1.08;margin-bottom:7px;">
            <img src="${IMGS.candleFrost}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#FAF7F2;border:1px solid #111111;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:600;">IN STOCK</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Fresh Cut</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#555049;margin-bottom:3px;">Peppermint &amp; Eucalyptus</div>
          <div style="font-size:9.5px;font-weight:600;margin-bottom:6px;">10 oz Soy • $36.00</div>
          <div style="background:#111111;color:#FAF7F2;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:600;">ADD TO BAG</div>
        </div>

        <!-- Item 4 -->
        <div style="text-align:center;">
          <div style="position:relative;border:1px solid #E2DDD3;background:#F3EEE4;aspect-ratio:1/1.08;margin-bottom:7px;">
            <img src="${IMGS.candleEmerald}" style="width:100%;height:100%;object-fit:cover;" />
            <span style="position:absolute;top:6px;left:6px;background:#FAF7F2;border:1px solid #111111;font-size:7px;padding:2px 5px;letter-spacing:0.12em;font-weight:600;">IN STOCK</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Balsam Fir</div>
          <div class="serif" style="font-style:italic;font-size:11.5px;color:#555049;margin-bottom:3px;">Blue Ridge Fir &amp; Cedar</div>
          <div style="font-size:9.5px;font-weight:600;margin-bottom:6px;">10 oz Soy • $36.00</div>
          <div style="background:#111111;color:#FAF7F2;padding:8px;font-size:8.5px;letter-spacing:0.15em;font-weight:600;">ADD TO BAG</div>
        </div>
      </div>

      <!-- Mobile Scent Pairing Banner -->
      <div style="margin:14px 16px 0;padding:12px 14px;background:#F4EFE6;border:1px solid #111111;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:7.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E6A63;font-weight:600;">JO MALONE SCENT PAIRING</div>
          <div class="serif" style="font-size:16px;font-weight:600;">Filter by Room, Locker Stall or Mood &rarr;</div>
        </div>
        <span style="border:1px solid #111111;padding:5px 9px;font-size:8px;font-weight:600;letter-spacing:0.12em;">PAIR</span>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE MOBILE REDESIGN</span>
      <span>SCREEN 02 / 04 • 2-COLUMN GALLERY</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 3: LAUSON-98 ODOR PUCK DETAIL & ANGLE SWITCHER -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;letter-spacing:0.14em;">&larr; BACK</span>
        <div class="jm-logo" style="font-size:19px;">PUCK &amp; WICK</div>
        <span style="font-size:10px;letter-spacing:0.14em;">SHARE</span>
      </div>

      <div style="padding:14px 18px;">
        <div style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E6A63;margin-bottom:4px;font-weight:600;">
          LAUSON-98™ MOLECULAR ODOR HARDWARE
        </div>
        <h2 class="serif" style="font-size:28px;font-weight:600;line-height:1.1;margin-bottom:4px;">
          3.0" Athlete Gear &amp; Stall Puck
        </h2>
        <div class="serif" style="font-style:italic;font-size:14px;color:#555049;margin-bottom:10px;">
          One Puck in Every Pro Locker Stall, Hockey Bag &amp; Gear Closet
        </div>

        <!-- Main Image + 4 Angle Thumbnails -->
        <div style="border:1px solid #111111;aspect-ratio:1/0.92;overflow:hidden;position:relative;margin-bottom:8px;">
          <img src="${IMGS.puckMenStall}" style="width:100%;height:100%;object-fit:cover;" />
          <span style="position:absolute;top:8px;left:8px;background:#FAF7F2;border:1px solid #111111;padding:3px 8px;font-size:8px;letter-spacing:0.14em;font-weight:600;">
            PRO LOCKER STALL VIEW
          </span>
        </div>

        <!-- 4 Angle Pill Switcher -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px;">
          <div style="border:1px solid #D8D2C7;padding:4px;text-align:center;background:#F4EFE6;">
            <img src="${IMGS.puckMenStudio}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7.5px;letter-spacing:0.1em;font-weight:600;">STUDIO PUCK</div>
          </div>
          <div style="border:1.5px solid #111111;padding:4px;text-align:center;background:#FAF7F2;">
            <img src="${IMGS.puckMenStall}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7.5px;letter-spacing:0.1em;font-weight:700;">LOCKER STALL</div>
          </div>
          <div style="border:1px solid #D8D2C7;padding:4px;text-align:center;background:#F4EFE6;">
            <img src="${IMGS.puckMenCloset}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7.5px;letter-spacing:0.1em;font-weight:600;">GEAR CLOSET</div>
          </div>
          <div style="border:1px solid #D8D2C7;padding:4px;text-align:center;background:#F4EFE6;">
            <img src="${IMGS.puckMiniPalm}" style="width:100%;height:42px;object-fit:cover;margin-bottom:2px;" />
            <div style="font-size:7.5px;letter-spacing:0.1em;font-weight:600;">SCALE</div>
          </div>
        </div>

        <!-- Clean Accordion Specs (No Wall of Text) -->
        <div style="border-top:1px solid #111111;border-bottom:1px solid #111111;padding:10px 0;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;letter-spacing:0.12em;margin-bottom:6px;">
            <span>ENGINEERING &amp; DIMENSIONS</span>
            <span>3.0" &times; 1.0" • 6061 ALUMINUM</span>
          </div>
          <p style="font-size:11px;line-height:1.5;color:#4A4742;">
            360° micro-perforated radial intake neutralizes open-air hanging equipment in pro team locker stalls or zipped bags for up to 12 months per cartridge.
          </p>
        </div>

        <div style="background:#111111;color:#FAF7F2;text-align:center;padding:13px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
          JOIN DROP 01 WAITLIST — $44.00
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE MOBILE REDESIGN</span>
      <span>SCREEN 03 / 04 • PRODUCT &amp; STALL VIEW</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 4: THE $98 BESPOKE GIFT BOX BUILDER + DISTRACTION-FREE LIGHTBOX -->
  <div class="mobile-page">
    <div>
      <div class="jm-nav">
        <span style="font-size:10px;letter-spacing:0.14em;">&larr; BACK</span>
        <div class="jm-logo" style="font-size:19px;">THE ART OF GIFTING</div>
        <span style="font-size:10px;letter-spacing:0.14em;">$98.00</span>
      </div>

      <div style="padding:14px 18px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
          <div style="border:1.5px solid #111111;position:relative;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:145px;object-fit:cover;display:block;" />
            <div style="background:#111111;color:#FAF7F2;font-size:8px;letter-spacing:0.14em;padding:4px;text-align:center;font-weight:600;">
              MEN'S OBSIDIAN ($98)
            </div>
          </div>
          <div style="border:1px solid #D8D2C7;position:relative;">
            <img src="${IMGS.boxWomenOpen}" style="width:100%;height:145px;object-fit:cover;display:block;" />
            <div style="background:#F4EFE6;color:#111111;font-size:8px;letter-spacing:0.14em;padding:4px;text-align:center;font-weight:600;">
              WOMEN'S SANCTUARY ($98)
            </div>
          </div>
        </div>

        <!-- 4 Box Angles (Including Clean Minimalist Closed Box With No Square Border) -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px;">
          <div style="border:1.5px solid #111111;padding:3px;text-align:center;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:700;margin-top:2px;">1. OPEN BOX</div>
          </div>
          <div style="border:1px solid #D8D2C7;padding:3px;text-align:center;">
            <img src="${IMGS.boxMenClosed}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">2. CLOSED LID</div>
          </div>
          <div style="border:1px solid #D8D2C7;padding:3px;text-align:center;">
            <img src="${IMGS.boxWomenClosed}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">3. IVORY LID</div>
          </div>
          <div style="border:1px solid #D8D2C7;padding:3px;text-align:center;">
            <img src="${IMGS.cardMens}" style="width:100%;height:40px;object-fit:cover;" />
            <div style="font-size:7px;font-weight:600;margin-top:2px;">4. STORY CARD</div>
          </div>
        </div>

        <!-- 3-Step Jo Malone Customizer -->
        <div style="border:1px solid #111111;background:#F4EFE6;padding:14px;">
          <div style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E6A63;margin-bottom:4px;font-weight:600;">
            STEP 01 • INCLUDED HARDWARE &amp; BODY CARE
          </div>
          <div style="font-size:11px;font-weight:600;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #D8D2C7;">
            &#10003; 3.0" Odor Puck ($44) + &#10003; 8 oz Charcoal Wash ($44)
          </div>

          <div style="font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E6A63;margin-bottom:6px;font-weight:600;">
            STEP 02 • SELECT YOUR 10 OZ SOY CANDLE ($36)
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">
            <div style="background:#111111;color:#FAF7F2;padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9679; TOP SHELF (BOURBON)
            </div>
            <div style="background:#FAF7F2;border:1px solid #111111;padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; FRESH CUT (MINT)
            </div>
            <div style="background:#FAF7F2;border:1px solid #111111;padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; BALSAM FIR
            </div>
            <div style="background:#FAF7F2;border:1px solid #111111;padding:7px 8px;font-size:8.5px;font-weight:600;letter-spacing:0.1em;">
              &#9675; RINKSIDE CEDAR
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span style="font-size:10px;color:#555049;">Total Value: <s>$124.00</s></span>
            <span class="serif" style="font-size:22px;font-weight:700;">$98.00 <span style="font-size:10px;color:#2E5A44;">(SAVE $26)</span></span>
          </div>

          <div style="background:#111111;color:#FAF7F2;text-align:center;padding:13px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
            RESERVE CUSTOM $98 BOX SUITE
          </div>
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>JO MALONE MOBILE REDESIGN</span>
      <span>SCREEN 04 / 04 • $98 GIFT BOX SUITE</span>
    </div>
  </div>

</body>
</html>`;

const diptyqueMobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Diptyque Paris Mobile Redesign (iPhone Portrait PDF)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 430px 932px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #F6F1E7;
    color: #161514;
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
    background: #F6F1E7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .dp-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #D5CBB8;
  }
  .dp-oval-logo {
    border: 1.5px solid #161514;
    border-radius: 999px;
    padding: 5px 18px;
    text-align: center;
    background: #FAF6EE;
  }
  .page-foot {
    background: #161514;
    color: #F6F1E7;
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

  <!-- MOBILE SCREEN 1: DIPTYQUE HERO & HERBARIUM SCENT WHEEL -->
  <div class="mobile-page">
    <div>
      <div style="background:#161514;color:#F6F1E7;font-size:8.5px;letter-spacing:0.18em;text-align:center;padding:7px;">
        MAISON DE PARFUM • LOUDOUN CO. &amp; LAUSANNE
      </div>
      <div class="dp-nav">
        <span style="font-size:9.5px;letter-spacing:0.14em;">CHAPITRES</span>
        <div class="dp-oval-logo">
          <div class="serif" style="font-size:17px;font-weight:700;letter-spacing:0.18em;">PUCK &amp; WICK</div>
          <div style="font-size:6.5px;letter-spacing:0.18em;text-transform:uppercase;color:#6E675F;">PARISIAN OLFACTORY ARCHIVE</div>
        </div>
        <span style="font-size:9.5px;letter-spacing:0.14em;">PANIER (1)</span>
      </div>

      <!-- Editorial Chapter I Header -->
      <div style="padding:18px 20px 14px;text-align:center;">
        <div class="serif" style="font-style:italic;font-size:15px;color:#8C6D3F;margin-bottom:3px;">
          Chapitre I • L'Herbier des Bougies
        </div>
        <h1 class="serif" style="font-size:32px;line-height:1.06;font-weight:500;margin-bottom:10px;">
          Light, Shadow &amp; Numbered Editions.
        </h1>
        <p style="font-size:11px;line-height:1.5;color:#433F39;">
          Alternating warm parchment chapters for American Soy Candles and deep obsidian chapters for Lauson-98™ Odor Hardware.
        </p>
      </div>

      <!-- Dual Oval & Arch Visual -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 18px;margin-bottom:14px;">
        <div style="border:1px solid #161514;padding:8px;background:#EFE8D8;text-align:center;">
          <img src="${IMGS.shelfWomens}" style="width:100%;height:170px;object-fit:cover;border-radius:999px 999px 0 0;border:1px solid #161514;margin-bottom:6px;" />
          <div class="serif" style="font-style:italic;font-size:12px;color:#8C6D3F;">N° 08 • Sanctuaire</div>
          <div class="serif" style="font-size:16px;font-weight:600;">Velvet Vanilla ($36)</div>
        </div>
        <div style="border:1px solid #161514;padding:8px;background:#EFE8D8;text-align:center;">
          <img src="${IMGS.shelfMens}" style="width:100%;height:170px;object-fit:cover;border-radius:999px 999px 0 0;border:1px solid #161514;margin-bottom:6px;" />
          <div class="serif" style="font-style:italic;font-size:12px;color:#8C6D3F;">N° 01 • L'Athlète</div>
          <div class="serif" style="font-size:16px;font-weight:600;">Top Shelf ($36)</div>
        </div>
      </div>

      <!-- Horizontal Herbarium Note Bar -->
      <div style="border-top:1px solid #D5CBB8;border-bottom:1px solid #D5CBB8;background:#EFE8D8;padding:12px 16px;margin-bottom:14px;">
        <div style="font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#6E675F;margin-bottom:8px;text-align:center;font-weight:600;">
          SWIPE BY OLFACTORY FAMILY (L'HERBIER)
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;">
          <div>
            <img src="${IMGS.candleObsidian}" style="width:52px;height:52px;border-radius:999px;object-fit:cover;border:1px solid #161514;" />
            <div class="serif" style="font-size:12px;font-weight:600;">Boisé</div>
          </div>
          <div>
            <img src="${IMGS.candleFrost}" style="width:52px;height:52px;border-radius:999px;object-fit:cover;border:1px solid #161514;" />
            <div class="serif" style="font-size:12px;font-weight:600;">Mentholé</div>
          </div>
          <div>
            <img src="${IMGS.candleIvory}" style="width:52px;height:52px;border-radius:999px;object-fit:cover;border:1px solid #161514;" />
            <div class="serif" style="font-size:12px;font-weight:600;">Ambré</div>
          </div>
          <div>
            <img src="${IMGS.candleEmerald}" style="width:52px;height:52px;border-radius:999px;object-fit:cover;border:1px solid #161514;" />
            <div class="serif" style="font-size:12px;font-weight:600;">Résineux</div>
          </div>
        </div>
      </div>

      <div style="padding:0 18px;display:flex;gap:8px;">
        <div style="flex:1;background:#161514;color:#F6F1E7;border-radius:999px;padding:12px;text-align:center;font-size:9.5px;letter-spacing:0.16em;font-weight:600;">
          EXPLORE LES BOUGIES
        </div>
        <div style="flex:1;border:1px solid #161514;color:#161514;border-radius:999px;padding:12px;text-align:center;font-size:9.5px;letter-spacing:0.16em;font-weight:600;">
          LES COFFRETS ($98)
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>DIPTYQUE PARIS MOBILE REDESIGN</span>
      <span>SCREEN 01 / 03 • PARCHMENT CHAPTER I</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 2: CHAPTER II DARK OBSIDIAN HARDWARE CONTRAST -->
  <div class="mobile-page" style="background:#181A1F;color:#F6F1E7;">
    <div>
      <div class="dp-nav" style="border-bottom:1px solid rgba(197,160,89,0.3);">
        <span style="font-size:9.5px;letter-spacing:0.14em;color:#C5A059;">CHAPITRE II</span>
        <div class="serif" style="font-size:19px;font-weight:600;letter-spacing:0.2em;color:#F6F1E7;">LAUSON-98™</div>
        <span style="font-size:9.5px;letter-spacing:0.14em;color:#C5A059;">OBJETS (5)</span>
      </div>

      <div style="padding:18px 20px;text-align:center;">
        <div class="serif" style="font-style:italic;font-size:15px;color:#E5C878;margin-bottom:4px;">
          Chapitre II • Dark Hardware Contrast as You Scroll
        </div>
        <h2 class="serif" style="font-size:30px;font-weight:500;line-height:1.08;margin-bottom:12px;">
          One Puck in Every Pro Locker Stall.
        </h2>

        <!-- Gold Oval Medallion Frame -->
        <div style="width:240px;height:255px;margin:0 auto 14px;border-radius:999px;overflow:hidden;border:2px solid #C5A059;">
          <img src="${IMGS.puckMenStall}" style="width:100%;height:100%;object-fit:cover;" />
        </div>

        <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin-bottom:4px;">
          OBJET N° 01 • 6061 ANODIZED ALUMINUM
        </div>
        <div class="serif" style="font-size:24px;font-weight:500;margin-bottom:6px;">
          L'Objet Athlete Stall Puck (3.0")
        </div>
        <p style="font-size:11px;line-height:1.55;color:#C9C4BA;margin-bottom:14px;">
          Stationed on the corner shelf of every player's locker stall or inside zipped gear bags. Sub-2nm activated coconut carbon traps sweat &amp; bacterial VOCs.
        </p>

        <!-- Secondary Hardware Pair -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:left;margin-bottom:14px;">
          <div style="border:1px solid rgba(197,160,89,0.35);padding:8px;background:rgba(255,255,255,0.03);">
            <img src="${IMGS.puckWomenStudio}" style="width:100%;height:78px;object-fit:cover;margin-bottom:5px;" />
            <div style="font-size:8px;color:#C5A059;letter-spacing:0.12em;">OBJET N° 02</div>
            <div class="serif" style="font-size:15px;">Sanctuary 3.0" Puck</div>
            <div style="font-size:9.5px;color:#E5C878;">$44.00 • Waitlist</div>
          </div>
          <div style="border:1px solid rgba(197,160,89,0.35);padding:8px;background:rgba(255,255,255,0.03);">
            <img src="${IMGS.puckMiniPalm}" style="width:100%;height:78px;object-fit:cover;margin-bottom:5px;" />
            <div style="font-size:8px;color:#C5A059;letter-spacing:0.12em;">OBJET N° 03</div>
            <div class="serif" style="font-size:15px;">2.0" Skate Mini Pair</div>
            <div style="font-size:9.5px;color:#E5C878;">$36.00 • Waitlist</div>
          </div>
        </div>

        <div style="border:1px solid #C5A059;color:#E5C878;border-radius:999px;padding:12px;text-align:center;font-size:9.5px;letter-spacing:0.18em;font-weight:600;">
          RESERVE DROP 01 HARDWARE — $44.00
        </div>
      </div>
    </div>

    <div class="page-foot" style="background:#0E0F12;border-top:1px solid rgba(197,160,89,0.3);">
      <span>DIPTYQUE PARIS MOBILE REDESIGN</span>
      <span>SCREEN 02 / 03 • DARK HARDWARE CHAPTER II</span>
    </div>
  </div>

  <!-- MOBILE SCREEN 3: CHAPITRE III LES COFFRETS ($98) & OLFACTORY PYRAMID -->
  <div class="mobile-page">
    <div>
      <div class="dp-nav">
        <span style="font-size:9.5px;letter-spacing:0.14em;">CHAPITRE III</span>
        <div class="serif" style="font-size:18px;font-weight:700;letter-spacing:0.18em;">LES COFFRETS ($98)</div>
        <span style="font-size:9.5px;letter-spacing:0.14em;">$98.00</span>
      </div>

      <div style="padding:14px 18px;">
        <div class="serif" style="font-style:italic;font-size:14px;color:#8C6D3F;text-align:center;margin-bottom:2px;">
          Chapitre III • L'Art du Cadeau Sur-Mesure
        </div>
        <h2 class="serif" style="font-size:26px;font-weight:500;text-align:center;margin-bottom:10px;">
          Compose Your $98 Coffret
        </h2>

        <div style="border:1px solid #161514;padding:8px;background:#EFE8D8;margin-bottom:10px;">
          <img src="${IMGS.boxWomenOpen}" style="width:100%;height:175px;object-fit:cover;border:1px solid #161514;margin-bottom:6px;" />
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="serif" style="font-size:18px;font-weight:600;">Le Coffret Sanctuaire or Athlète</span>
            <span style="font-size:11px;font-weight:700;color:#8C6D3F;">$98.00 ($124 Value)</span>
          </div>
        </div>

        <!-- Olfactory Pyramid Box -->
        <div style="border:1px solid #161514;background:#FAF6EE;padding:12px;margin-bottom:10px;">
          <div style="font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:#8C6D3F;margin-bottom:6px;font-weight:600;">
            3-TIER OLFACTORY PYRAMID ON EVERY CANDLE CARD
          </div>
          <div style="font-size:10.5px;line-height:1.6;">
            <div><strong>TOP NOTES:</strong> Aged Kentucky Bourbon, Crisp Bergamot</div>
            <div><strong>HEART NOTES:</strong> Charred White Oak, Roasted Chestnut</div>
            <div><strong>BASE NOTES:</strong> Smoked Madagascar Vanilla, Labdanum</div>
          </div>
        </div>

        <!-- Atelier Story Card Preview -->
        <div style="display:grid;grid-template-columns:90px 1fr;gap:10px;border:1px solid #D5CBB8;background:#EFE8D8;padding:8px;margin-bottom:12px;align-items:center;">
          <img src="${IMGS.cardMens}" style="width:90px;height:68px;object-fit:cover;border:1px solid #161514;" />
          <div>
            <div style="font-size:8px;letter-spacing:0.15em;text-transform:uppercase;color:#8C6D3F;font-weight:600;">INCLUDED IN EVERY BOX</div>
            <div class="serif" style="font-size:15px;font-weight:600;">Gold-Foil Atelier Story Card &amp; Minimalist Emblem Lid</div>
          </div>
        </div>

        <div style="background:#161514;color:#F6F1E7;border-radius:999px;padding:13px;text-align:center;font-size:9.5px;letter-spacing:0.18em;font-weight:600;">
          COMPOSE YOUR $98 COFFRET SUITE
        </div>
      </div>
    </div>

    <div class="page-foot">
      <span>DIPTYQUE PARIS MOBILE REDESIGN</span>
      <span>SCREEN 03 / 03 • BESPOKE $98 COFFRET</span>
    </div>
  </div>

</body>
</html>`;

async function run() {
  fs.writeFileSync(path.join(ROOT, 'jo-malone-mobile.html'), joMaloneMobileHTML, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'diptyque-mobile.html'), diptyqueMobileHTML, 'utf8');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  // Render Jo Malone Mobile PDF (430x932 iPhone Pro Max Portrait)
  await page.goto('file://' + path.join(ROOT, 'jo-malone-mobile.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const jmMobPdf = path.join(ROOT, 'Puck-and-Wick-Jo-Malone-Mobile.pdf');
  await page.pdf({
    path: jmMobPdf,
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  const jmPages = await page.locator('.mobile-page').all();
  for (let i = 0; i < jmPages.length; i++) {
    await jmPages[i].screenshot({ path: path.join(ARTIFACT_DIR, `jo-malone-mobile-${i + 1}.png`) });
  }

  // Render Diptyque Mobile PDF (430x932 iPhone Pro Max Portrait)
  await page.goto('file://' + path.join(ROOT, 'diptyque-mobile.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const dpMobPdf = path.join(ROOT, 'Puck-and-Wick-Diptyque-Mobile.pdf');
  await page.pdf({
    path: dpMobPdf,
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  const dpPages = await page.locator('.mobile-page').all();
  for (let i = 0; i < dpPages.length; i++) {
    await dpPages[i].screenshot({ path: path.join(ARTIFACT_DIR, `diptyque-mobile-${i + 1}.png`) });
  }

  await browser.close();
  fs.copyFileSync(jmMobPdf, path.join(ARTIFACT_DIR, 'Puck-and-Wick-Jo-Malone-Mobile.pdf'));
  fs.copyFileSync(dpMobPdf, path.join(ARTIFACT_DIR, 'Puck-and-Wick-Diptyque-Mobile.pdf'));
  console.log('Generated full-screen iPhone Portrait Mobile PDFs successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
