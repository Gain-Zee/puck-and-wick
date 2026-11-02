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

const IMGS = {
  shelfMens: imgDataUri('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  shelfWomens: imgDataUri('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
  shelfBalsam: imgDataUri('assets/images/packaging/shelf-candle-balsam-fir.jpg'),
  shelfFreshCut: imgDataUri('assets/images/packaging/shelf-candle-fresh-cut.jpg'),
  boxMenOpen: imgDataUri('assets/images/box-men-open.jpg'),
  boxMenClosed: imgDataUri('assets/images/box-men-closed.jpg'),
  boxWomenOpen: imgDataUri('assets/images/box-women-open.jpg'),
  boxWomenClosed: imgDataUri('assets/images/box-women-closed.jpg'),
  puckMenBox: imgDataUri('assets/images/packaging/puck-men-box.jpg'),
  puckMenBoxClosed: imgDataUri('assets/images/packaging/puck-men-box-closed.jpg'),
  puckMenStall: imgDataUri('assets/images/packaging/puck-men-locker.jpg'),
  puckMenBag: imgDataUri('assets/images/packaging/puck-men-gym-bag.jpg'),
  puckMenCloset: imgDataUri('assets/images/packaging/puck-men-closet.jpg'),
  puckWomenBox: imgDataUri('assets/images/packaging/puck-women-box.jpg'),
  puckWomenBoxClosed: imgDataUri('assets/images/packaging/puck-women-box-closed.jpg'),
  puckWomenCloset: imgDataUri('assets/images/packaging/puck-women-closet.jpg'),
  miniPuckBoxClosed: imgDataUri('assets/images/packaging/puck-mini-pair-box-closed.jpg'),
  washMen: imgDataUri('assets/images/item-bodywash-men.jpg'),
  washWomen: imgDataUri('assets/images/item-bodywash-women.jpg')
};

// ============================================================================
// HELPER: RENDER EACH SECTION IN ALL 3 COLOR SCHEMES SIDE-BY-SIDE ON ONE PAGE
// Column 1: 100% Warm British Cream (#FAF7F2)
// Column 2: 100% Black Obsidian (#0B0C0F)
// Column 3: 80% Black Obsidian + 20% Warm Ivory Hybrid (Recommended)
// ============================================================================

const masterComparisonHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — 3-Color-Scheme Side-by-Side Comparison (Cream vs. Black vs. 80/20 Hybrid)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 1680px 1050px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #14161C;
    color: #FAF7F2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .pdf-page {
    width: 1680px;
    height: 1050px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    background: #14161C;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px 24px 14px;
  }
  .top-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 22px;
    background: #0B0C0F;
    border: 1px solid #C5A059;
    margin-bottom: 14px;
  }
  .top-banner-left {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #C5A059;
    font-weight: 700;
  }
  .top-banner-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #FAF7F2;
  }
  .top-banner-right {
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #E5C878;
    font-weight: 600;
  }

  .three-col-stage {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    flex: 1;
    align-items: stretch;
  }
  .scheme-col {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid rgba(197, 160, 89, 0.45);
  }
  .scheme-col.recommended {
    border: 2.5px solid #E5C878;
    box-shadow: 0 0 28px rgba(197, 160, 89, 0.28);
  }
  .scheme-label {
    padding: 9px 14px;
    font-size: 10.5px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .scheme-label.cream {
    background: #E8E0D2;
    color: #1A1918;
    border-bottom: 1px solid #1A1918;
  }
  .scheme-label.black {
    background: #181B22;
    color: #FAF7F2;
    border-bottom: 1px solid #C5A059;
  }
  .scheme-label.hybrid {
    background: linear-gradient(90deg, #C5A059 0%, #E5C878 50%, #C5A059 100%);
    color: #0B0C0F;
    border-bottom: 1px solid #0B0C0F;
  }

  .viewport-cream {
    background: #FAF7F2;
    color: #1A1918;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .viewport-black {
    background: #0B0C0F;
    color: #FAF7F2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .viewport-hybrid {
    background: #0B0C0F;
    color: #FAF7F2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bottom-bar {
    margin-top: 12px;
    padding: 8px 22px;
    background: #0B0C0F;
    border: 1px solid rgba(197, 160, 89, 0.4);
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #C5A059;
  }
</style>
</head>
<body>

  <!-- ====================================================================== -->
  <!-- PAGE 1: SECTION 1 — FRONT PAGE / HERO & CATEGORY TRIO (ALL 3 SCHEMES)  -->
  <!-- ====================================================================== -->
  <div class="pdf-page">
    <div class="top-banner">
      <span class="top-banner-left">SECTION 01 OF 04 • FRONT PAGE &amp; HERO</span>
      <span class="top-banner-title">SIDE-BY-SIDE: WARM CREAM vs. 100% BLACK vs. 80/20 HYBRID</span>
      <span class="top-banner-right">SAME LAYOUT • 3 COLOR SCHEMES</span>
    </div>

    <div class="three-col-stage">
      <!-- COLUMN 1: 100% WARM BRITISH CREAM (#FAF7F2) -->
      <div class="scheme-col">
        <div class="scheme-label cream">
          <span>OPTION A • 100% WARM CREAM (#FAF7F2)</span>
          <span style="font-size:9px;background:#1A1918;color:#FAF7F2;padding:2px 7px;">CLASSIC JO MALONE</span>
        </div>
        <div class="viewport-cream">
          <div>
            <!-- Utility & Header -->
            <div style="background:#1A1918;color:#FAF7F2;font-size:7.5px;letter-spacing:0.16em;text-align:center;padding:5px;">
              COMPLIMENTARY MAGNETIC GIFT BOX • $108 DELUXE SUITES (SAVE $22)
            </div>
            <div style="padding:12px 18px;border-bottom:1px solid #1A1918;text-align:center;background:#FAF7F2;">
              <div class="serif" style="font-size:23px;letter-spacing:0.22em;font-weight:600;color:#1A1918;">PUCK &amp; WICK</div>
              <div style="font-size:7px;letter-spacing:0.24em;color:#7A6338;margin-top:2px;">AMERICAN LUXURY SCENT &amp; ZEOCARB-98™ LAB</div>
              <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;font-size:8px;letter-spacing:0.14em;font-weight:600;color:#1A1918;">
                <span>CANDLES ($44)</span>
                <span>ODOR PUCKS ($48)</span>
                <span>$108 BOXES</span>
                <span>BODY WASH ($38)</span>
              </div>
            </div>

            <!-- Split Hero -->
            <div style="display:grid;grid-template-columns:1fr 1fr;height:215px;border-bottom:1px solid #1A1918;">
              <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #1A1918;" />
              <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
            </div>

            <!-- Framed Offset Card on Cream -->
            <div style="padding:18px;background:#F3EFE6;border-bottom:1px solid #1A1918;">
              <div style="background:#FAF7F2;border:1px solid #1A1918;box-shadow:6px 6px 0 #1A1918;padding:18px;">
                <div style="font-size:8px;letter-spacing:0.18em;color:#8C6D32;font-weight:700;margin-bottom:4px;">100% WARM CREAM PALETTE</div>
                <div class="serif" style="font-size:26px;line-height:1.1;color:#1A1918;margin-bottom:8px;">Tailored Scent &amp; ZeoCarb-98™ Care.</div>
                <p style="font-size:10.5px;line-height:1.5;color:#4E4A44;margin-bottom:12px;">
                  Bright daylight apothecary feel. Very clean and airy, though dark studio photos sit inside high-contrast dark squares.
                </p>
                <div style="display:flex;gap:8px;">
                  <div style="background:#1A1918;color:#FAF7F2;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">SHOP CANDLES ($44)</div>
                  <div style="border:1px solid #1A1918;color:#1A1918;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">$108 GIFT BOX</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Trio -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);background:#FAF7F2;padding:14px;gap:10px;">
            <div style="border:1px solid #1A1918;padding:8px;text-align:center;background:#FFFFFF;">
              <img src="${IMGS.shelfBalsam}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#1A1918;">10 Soy Candles</div>
              <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">UNLIT • $44.00</div>
            </div>
            <div style="border:1px solid #1A1918;padding:8px;text-align:center;background:#FFFFFF;">
              <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#1A1918;">Odor Pucks</div>
              <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">MAGNETIC BOX • $48</div>
            </div>
            <div style="border:1px solid #1A1918;padding:8px;text-align:center;background:#FFFFFF;">
              <img src="${IMGS.boxMenOpen}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#1A1918;">$108 Suites</div>
              <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">$130 VAL (SAVE $22)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 2: 100% BLACK OBSIDIAN (#0B0C0F) -->
      <div class="scheme-col">
        <div class="scheme-label black">
          <span>OPTION B • 100% BLACK OBSIDIAN (#0B0C0F)</span>
          <span style="font-size:9px;background:#C5A059;color:#0B0C0F;padding:2px 7px;">ALL-DARK MODE</span>
        </div>
        <div class="viewport-black">
          <div>
            <!-- Utility & Header -->
            <div style="background:#C5A059;color:#0B0C0F;font-size:7.5px;letter-spacing:0.16em;text-align:center;padding:5px;font-weight:700;">
              COMPLIMENTARY MAGNETIC GIFT BOX • $108 DELUXE SUITES (SAVE $22)
            </div>
            <div style="padding:12px 18px;border-bottom:1px solid #C5A059;text-align:center;background:#0B0C0F;">
              <div class="serif" style="font-size:23px;letter-spacing:0.22em;font-weight:600;color:#FAF7F2;">PUCK &amp; WICK</div>
              <div style="font-size:7px;letter-spacing:0.24em;color:#C5A059;margin-top:2px;">AMERICAN LUXURY SCENT &amp; ZEOCARB-98™ LAB</div>
              <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;font-size:8px;letter-spacing:0.14em;font-weight:600;color:#E8E2D5;">
                <span>CANDLES ($44)</span>
                <span>ODOR PUCKS ($48)</span>
                <span>$108 BOXES</span>
                <span>BODY WASH ($38)</span>
              </div>
            </div>

            <!-- Split Hero -->
            <div style="display:grid;grid-template-columns:1fr 1fr;height:215px;border-bottom:1px solid #C5A059;">
              <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #C5A059;" />
              <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
            </div>

            <!-- Framed Offset Card on Black -->
            <div style="padding:18px;background:#111318;border-bottom:1px solid #C5A059;">
              <div style="background:#0B0C0F;border:1px solid #C5A059;box-shadow:6px 6px 0 #C5A059;padding:18px;">
                <div style="font-size:8px;letter-spacing:0.18em;color:#C5A059;font-weight:700;margin-bottom:4px;">100% BLACK OBSIDIAN PALETTE</div>
                <div class="serif" style="font-size:26px;line-height:1.1;color:#FAF7F2;margin-bottom:8px;">Tailored Scent &amp; ZeoCarb-98™ Care.</div>
                <p style="font-size:10.5px;line-height:1.5;color:#C9C3B8;margin-bottom:12px;">
                  Ultra-masculine, sleek, and seamlessly blends with your dark studio photography, but every single card is dark-on-dark.
                </p>
                <div style="display:flex;gap:8px;">
                  <div style="background:#C5A059;color:#0B0C0F;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">SHOP CANDLES ($44)</div>
                  <div style="border:1px solid #C5A059;color:#FAF7F2;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">$108 GIFT BOX</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Trio -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);background:#0B0C0F;padding:14px;gap:10px;">
            <div style="border:1px solid rgba(197,160,89,0.45);padding:8px;text-align:center;background:#12141B;">
              <img src="${IMGS.shelfBalsam}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#FAF7F2;">10 Soy Candles</div>
              <div style="font-size:8.5px;color:#E5C878;font-weight:700;">UNLIT • $44.00</div>
            </div>
            <div style="border:1px solid rgba(197,160,89,0.45);padding:8px;text-align:center;background:#12141B;">
              <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#FAF7F2;">Odor Pucks</div>
              <div style="font-size:8.5px;color:#E5C878;font-weight:700;">MAGNETIC BOX • $48</div>
            </div>
            <div style="border:1px solid rgba(197,160,89,0.45);padding:8px;text-align:center;background:#12141B;">
              <img src="${IMGS.boxMenOpen}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#FAF7F2;">$108 Suites</div>
              <div style="font-size:8.5px;color:#E5C878;font-weight:700;">$130 VAL (SAVE $22)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 3: 80% BLACK OBSIDIAN + 20% WARM IVORY HYBRID (RECOMMENDED) -->
      <div class="scheme-col recommended">
        <div class="scheme-label hybrid">
          <span>&#9733; OPTION C • 80% BLACK + 20% WARM IVORY HYBRID</span>
          <span style="font-size:9px;background:#0B0C0F;color:#E5C878;padding:2px 7px;">BEST OF BOTH WORLDS</span>
        </div>
        <div class="viewport-hybrid">
          <div>
            <!-- Utility & Header -->
            <div style="background:#C5A059;color:#0B0C0F;font-size:7.5px;letter-spacing:0.16em;text-align:center;padding:5px;font-weight:700;">
              COMPLIMENTARY MAGNETIC GIFT BOX • HIS (OBSIDIAN) &amp; HERS (SANCTUARY IVORY)
            </div>
            <div style="padding:12px 18px;border-bottom:1px solid #C5A059;text-align:center;background:#0B0C0F;">
              <div class="serif" style="font-size:23px;letter-spacing:0.22em;font-weight:600;color:#FAF7F2;">PUCK &amp; WICK</div>
              <div style="font-size:7px;letter-spacing:0.24em;color:#C5A059;margin-top:2px;">AMERICAN LUXURY SCENT &amp; ZEOCARB-98™ LAB</div>
              <div style="display:flex;justify-content:center;gap:14px;margin-top:8px;font-size:8px;letter-spacing:0.14em;font-weight:600;color:#E8E2D5;align-items:center;">
                <span>CANDLES ($44)</span>
                <span>ODOR PUCKS ($48)</span>
                <span style="background:#FAF7F2;color:#1A1918;padding:2px 6px;font-weight:700;">SANCTUARY IVORY</span>
                <span>$108 BOXES</span>
              </div>
            </div>

            <!-- Split Hero -->
            <div style="display:grid;grid-template-columns:1fr 1fr;height:215px;border-bottom:1px solid #C5A059;">
              <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:cover;border-right:1px solid #C5A059;" />
              <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:cover;" />
            </div>

            <!-- 20% WARM IVORY HERO CALLOUT CARD ON BLACK OBSIDIAN STAGE! -->
            <div style="padding:18px;background:#0B0C0F;border-bottom:1px solid #C5A059;">
              <div style="background:#FAF7F2;border:1.5px solid #C5A059;box-shadow:6px 6px 0 #C5A059;padding:18px;color:#1A1918;">
                <div style="font-size:8px;letter-spacing:0.18em;color:#8C6D32;font-weight:700;margin-bottom:4px;">80% BLACK ARCHITECTURE + 20% WARM IVORY FOCUS</div>
                <div class="serif" style="font-size:26px;line-height:1.1;color:#1A1918;margin-bottom:8px;">Tailored Scent &amp; ZeoCarb-98™ Care.</div>
                <p style="font-size:10.5px;line-height:1.5;color:#4A453E;margin-bottom:12px;">
                  Keeps your signature Black Obsidian &amp; Gold brand DNA while using Warm British Cream cards to draw the eye and welcome both men &amp; women!
                </p>
                <div style="display:flex;gap:8px;">
                  <div style="background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">SHOP CANDLES ($44)</div>
                  <div style="background:#C5A059;color:#0B0C0F;padding:9px 14px;font-size:8.5px;letter-spacing:0.15em;font-weight:700;">$108 GIFT BOX</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Trio: Black Men's + Warm Ivory Sanctuary + Black/Gold Gifting -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);background:#0B0C0F;padding:14px;gap:10px;">
            <div style="border:1px solid #C5A059;padding:8px;text-align:center;background:#12141B;">
              <img src="${IMGS.shelfBalsam}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#FAF7F2;">Men's &amp; Home</div>
              <div style="font-size:8.5px;color:#E5C878;font-weight:700;">OBSIDIAN • $44</div>
            </div>
            <div style="border:1.5px solid #C5A059;padding:8px;text-align:center;background:#FAF7F2;color:#1A1918;">
              <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#1A1918;">Sanctuary Wing</div>
              <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">WARM IVORY • $44–$48</div>
            </div>
            <div style="border:1px solid #C5A059;padding:8px;text-align:center;background:#12141B;">
              <img src="${IMGS.boxMenOpen}" style="width:100%;height:82px;object-fit:cover;margin-bottom:6px;" />
              <div class="serif" style="font-size:15px;font-weight:600;color:#FAF7F2;">$108 Suites</div>
              <div style="font-size:8.5px;color:#E5C878;font-weight:700;">HIS &amp; HERS • SAVE $22</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <span>PUCK &amp; WICK™ • MASTER 3-SCHEME VISUAL COMPARISON</span>
      <span>PAGE 01 OF 04 • COMPARE FRONT PAGE HERO ACROSS ALL 3 PALETTES AT ONCE</span>
    </div>
  </div>

  <!-- ====================================================================== -->
  <!-- PAGE 2: SECTION 2 — PRODUCT CATALOG GRID (CANDLES & PUCKS)             -->
  <!-- ====================================================================== -->
  <div class="pdf-page">
    <div class="top-banner">
      <span class="top-banner-left">SECTION 02 OF 04 • PRODUCT GALLERY &amp; FILTER BAR</span>
      <span class="top-banner-title">HOW THE 4-COLUMN GALLERY LOOKS IN ALL 3 COLOR SCHEMES</span>
      <span class="top-banner-right">NOTICE HOW WOMEN'S SANCTUARY CARDS POP IN OPTION C</span>
    </div>

    <div class="three-col-stage">
      <!-- COLUMN 1: 100% WARM CREAM GALLERY -->
      <div class="scheme-col">
        <div class="scheme-label cream">
          <span>OPTION A • 100% WARM CREAM GALLERY</span>
          <span style="font-size:9px;">ALL CARDS WHITE/CREAM</span>
        </div>
        <div class="viewport-cream" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:12px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#8C6D32;font-weight:700;">I. THE OLFACTORY &amp; HARDWARE GALLERY</div>
              <div class="serif" style="font-size:24px;color:#1A1918;">100% Unlit Studio Collection</div>
              <div style="display:inline-flex;border:1px solid #1A1918;margin-top:6px;font-size:7.5px;font-weight:700;letter-spacing:0.12em;">
                <span style="background:#1A1918;color:#FAF7F2;padding:5px 10px;">ALL (15)</span>
                <span style="padding:5px 10px;border-right:1px solid #1A1918;">MEN'S (10)</span>
                <span style="padding:5px 10px;">WOMEN'S (5)</span>
              </div>
            </div>

            <!-- 2x2 Grid inside Column -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <!-- Card 1 -->
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:135px;object-fit:cover;border:1px solid #1A1918;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">Top Shelf</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Saffron, Cedar &amp; Amber</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 2 -->
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:135px;object-fit:cover;border:1px solid #1A1918;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">Velvet Vanilla &amp; Santal</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Australian Sandalwood</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 3 -->
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid #1A1918;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">3.0" Puck — Obsidian</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
              <!-- Card 4 -->
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid #1A1918;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">3.0" Puck — Ivory</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
            </div>
          </div>

          <div style="border:1px solid #1A1918;background:#F3EFE6;padding:12px;text-align:center;font-size:10px;color:#1A1918;">
            <strong>Takeaway:</strong> Very clean &amp; bright, but Men's and Women's cards look identical in background tone.
          </div>
        </div>
      </div>

      <!-- COLUMN 2: 100% BLACK OBSIDIAN GALLERY -->
      <div class="scheme-col">
        <div class="scheme-label black">
          <span>OPTION B • 100% BLACK OBSIDIAN GALLERY</span>
          <span style="font-size:9px;">ALL CARDS DARK CHARCOAL</span>
        </div>
        <div class="viewport-black" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:12px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#C5A059;font-weight:700;">I. THE OLFACTORY &amp; HARDWARE GALLERY</div>
              <div class="serif" style="font-size:24px;color:#FAF7F2;">100% Unlit Studio Collection</div>
              <div style="display:inline-flex;border:1px solid #C5A059;margin-top:6px;font-size:7.5px;font-weight:700;letter-spacing:0.12em;">
                <span style="background:#C5A059;color:#0B0C0F;padding:5px 10px;">ALL (15)</span>
                <span style="padding:5px 10px;border-right:1px solid rgba(197,160,89,0.4);">MEN'S (10)</span>
                <span style="padding:5px 10px;">WOMEN'S (5)</span>
              </div>
            </div>

            <!-- 2x2 Grid inside Column -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <!-- Card 1 -->
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">Top Shelf</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Saffron, Cedar &amp; Amber</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 2 -->
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">Velvet Vanilla &amp; Santal</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Australian Sandalwood</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 3 -->
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">3.0" Puck — Obsidian</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
              <!-- Card 4 -->
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">3.0" Puck — Ivory</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
            </div>
          </div>

          <div style="border:1px solid #C5A059;background:#12141B;padding:12px;text-align:center;font-size:10px;color:#C9C3B8;">
            <strong>Takeaway:</strong> Bold &amp; masculine, but Women's Sanctuary items sit inside the exact same dark charcoal cards as Men's.
          </div>
        </div>
      </div>

      <!-- COLUMN 3: 80% BLACK + 20% WARM IVORY HYBRID GALLERY -->
      <div class="scheme-col recommended">
        <div class="scheme-label hybrid">
          <span>&#9733; OPTION C • 80/20 HYBRID GALLERY</span>
          <span style="font-size:9px;background:#0B0C0F;color:#E5C878;padding:2px 6px;">OBSIDIAN + IVORY CARDS</span>
        </div>
        <div class="viewport-hybrid" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:12px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#C5A059;font-weight:700;">I. THE OLFACTORY &amp; HARDWARE GALLERY</div>
              <div class="serif" style="font-size:24px;color:#FAF7F2;">Obsidian Men's + Warm Ivory Sanctuary</div>
              <div style="display:inline-flex;border:1px solid #C5A059;margin-top:6px;font-size:7.5px;font-weight:700;letter-spacing:0.12em;">
                <span style="background:#C5A059;color:#0B0C0F;padding:5px 10px;">ALL (15)</span>
                <span style="padding:5px 10px;border-right:1px solid rgba(197,160,89,0.4);">MEN'S OBSIDIAN</span>
                <span style="background:#FAF7F2;color:#1A1918;padding:5px 10px;">WOMEN'S SANCTUARY</span>
              </div>
            </div>

            <!-- 2x2 Grid: Men's in Obsidian, Women's in Warm Ivory! -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <!-- Card 1: Men's Obsidian Card -->
              <div style="border:1px solid #C5A059;background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">Top Shelf</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Saffron, Cedar &amp; Amber</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 2: Women's Warm Ivory Sanctuary Card! -->
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:8px;text-align:center;color:#1A1918;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:135px;object-fit:cover;border:1px solid #C5A059;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">Velvet Vanilla &amp; Santal</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Sanctuary Collection</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">10 oz Vessel • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">ADD TO BAG — $44</div>
              </div>
              <!-- Card 3: Men's Obsidian Puck Card -->
              <div style="border:1px solid #C5A059;background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid rgba(197,160,89,0.4);margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#FAF7F2;">3.0" Puck — Obsidian</div>
                <div style="font-size:8.5px;color:#B5AFA4;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#E5C878;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
              <!-- Card 4: Women's Warm Ivory Puck Card! -->
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:8px;text-align:center;color:#1A1918;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:135px;object-fit:cover;border:1px solid #C5A059;margin-bottom:6px;" />
                <div class="serif" style="font-size:17px;font-weight:600;color:#1A1918;">3.0" Puck — Ivory</div>
                <div style="font-size:8.5px;color:#5A554E;margin-bottom:4px;">Includes Magnetic Box</div>
                <div style="font-size:8.5px;font-weight:700;color:#8C6D32;margin-bottom:6px;">120 Sq. Ft. • $48.00</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:7px;font-size:8px;font-weight:700;letter-spacing:0.14em;">WAITLIST — $48</div>
              </div>
            </div>
          </div>

          <div style="border:1.5px solid #C5A059;background:#FAF7F2;color:#1A1918;padding:12px;text-align:center;font-size:10px;">
            <strong>&#9733; Why Option C Wins:</strong> Customers immediately see the visual difference between the <strong>Obsidian Line</strong> and the <strong>Warm Ivory Sanctuary Line</strong>!
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <span>PUCK &amp; WICK™ • MASTER 3-SCHEME VISUAL COMPARISON</span>
      <span>PAGE 02 OF 04 • COMPARE PRODUCT GALLERY &amp; NEW CLOSED MAGNETIC PUCK BOXES</span>
    </div>
  </div>

  <!-- ====================================================================== -->
  <!-- PAGE 3: SECTION 3 — THE $108 DELUXE BOX SUITE & MAGNETIC PUCK BOXES    -->
  <!-- ====================================================================== -->
  <div class="pdf-page">
    <div class="top-banner">
      <span class="top-banner-left">SECTION 03 OF 04 • THE $108 DELUXE SUITE &amp; PUCK BOXES</span>
      <span class="top-banner-title">HIS &amp; HERS $108 COLLECTOR BOXES ACROSS ALL 3 COLOR SCHEMES</span>
      <span class="top-banner-right">$44 + $48 = $92 &rarr; $108 FULL SUITE (SAVE $22)</span>
    </div>

    <div class="three-col-stage">
      <!-- COLUMN 1: 100% WARM CREAM GIFTING -->
      <div class="scheme-col">
        <div class="scheme-label cream">
          <span>OPTION A • 100% WARM CREAM GIFTING</span>
          <span style="font-size:9px;">LIGHT BACKGROUND</span>
        </div>
        <div class="viewport-cream" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:10px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#8C6D32;font-weight:700;">THE ART OF BESPOKE GIFTING</div>
              <div class="serif" style="font-size:24px;color:#1A1918;">The $108 Deluxe Collector Suite</div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.boxMenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;" />
                <div class="serif" style="font-size:16px;font-weight:600;">Men's Obsidian Box</div>
                <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:8px;text-align:center;">
                <img src="${IMGS.boxWomenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;" />
                <div class="serif" style="font-size:16px;font-weight:600;">Women's Sanctuary Box</div>
                <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
            </div>

            <!-- Closed Minimalist Boxes Row -->
            <div style="font-size:8px;letter-spacing:0.14em;font-weight:700;color:#1A1918;margin-bottom:6px;text-align:center;">
              MINIMALIST CLOSED MAGNETIC LIDS (LOGO + PUCK &amp; WICK ONLY)
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:5px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;">3.0" OBSIDIAN BOX</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:5px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;">3.0" IVORY BOX</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:5px;text-align:center;">
                <img src="${IMGS.miniPuckBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;">2.0" MINI PAIR BOX</div>
              </div>
            </div>

            <div style="border:1px solid #1A1918;background:#F3EFE6;padding:14px;">
              <div style="font-size:8px;letter-spacing:0.15em;color:#8C6D32;font-weight:700;margin-bottom:4px;">3-PIECE SUITE CONTENTS ($130 RETAIL VALUE)</div>
              <div style="font-size:10px;color:#1A1918;line-height:1.5;margin-bottom:10px;">
                &#10003; 10 oz Soy Candle ($44) + &#10003; 3.0" ZeoCarb-98™ Puck ($48) + &#10003; 8 oz Body Wash ($38) in Magnetic Collector Box.
              </div>
              <div style="background:#1A1918;color:#FAF7F2;text-align:center;padding:10px;font-size:9px;letter-spacing:0.16em;font-weight:700;">
                CUSTOMIZE $108 GIFT SUITE
              </div>
            </div>
          </div>
          <div style="font-size:9px;text-align:center;color:#5A554E;">All gift boxes sit on uniform white/cream cards.</div>
        </div>
      </div>

      <!-- COLUMN 2: 100% BLACK OBSIDIAN GIFTING -->
      <div class="scheme-col">
        <div class="scheme-label black">
          <span>OPTION B • 100% BLACK OBSIDIAN GIFTING</span>
          <span style="font-size:9px;">DARK BACKGROUND</span>
        </div>
        <div class="viewport-black" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:10px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#C5A059;font-weight:700;">THE ART OF BESPOKE GIFTING</div>
              <div class="serif" style="font-size:24px;color:#FAF7F2;">The $108 Deluxe Collector Suite</div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              <div style="border:1px solid #C5A059;background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.boxMenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;" />
                <div class="serif" style="font-size:16px;font-weight:600;color:#FAF7F2;">Men's Obsidian Box</div>
                <div style="font-size:8.5px;color:#E5C878;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.boxWomenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;" />
                <div class="serif" style="font-size:16px;font-weight:600;color:#FAF7F2;">Women's Sanctuary Box</div>
                <div style="font-size:8.5px;color:#E5C878;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
            </div>

            <!-- Closed Minimalist Boxes Row -->
            <div style="font-size:8px;letter-spacing:0.14em;font-weight:700;color:#C5A059;margin-bottom:6px;text-align:center;">
              MINIMALIST CLOSED MAGNETIC LIDS (LOGO + PUCK &amp; WICK ONLY)
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:5px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#FAF7F2;">3.0" OBSIDIAN BOX</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:5px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#FAF7F2;">3.0" IVORY BOX</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:5px;text-align:center;">
                <img src="${IMGS.miniPuckBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#FAF7F2;">2.0" MINI PAIR BOX</div>
              </div>
            </div>

            <div style="border:1px solid #C5A059;background:#111318;padding:14px;">
              <div style="font-size:8px;letter-spacing:0.15em;color:#C5A059;font-weight:700;margin-bottom:4px;">3-PIECE SUITE CONTENTS ($130 RETAIL VALUE)</div>
              <div style="font-size:10px;color:#C9C3B8;line-height:1.5;margin-bottom:10px;">
                &#10003; 10 oz Soy Candle ($44) + &#10003; 3.0" ZeoCarb-98™ Puck ($48) + &#10003; 8 oz Body Wash ($38) in Magnetic Collector Box.
              </div>
              <div style="background:#C5A059;color:#0B0C0F;text-align:center;padding:10px;font-size:9px;letter-spacing:0.16em;font-weight:700;">
                CUSTOMIZE $108 GIFT SUITE
              </div>
            </div>
          </div>
          <div style="font-size:9px;text-align:center;color:#B5AFA4;">All gift boxes sit on uniform dark charcoal cards.</div>
        </div>
      </div>

      <!-- COLUMN 3: 80% BLACK + 20% WARM IVORY HYBRID GIFTING -->
      <div class="scheme-col recommended">
        <div class="scheme-label hybrid">
          <span>&#9733; OPTION C • 80/20 HYBRID GIFTING</span>
          <span style="font-size:9px;background:#0B0C0F;color:#E5C878;padding:2px 6px;">HIS OBSIDIAN / HERS IVORY</span>
        </div>
        <div class="viewport-hybrid" style="padding:16px;">
          <div>
            <div style="text-align:center;margin-bottom:10px;">
              <div style="font-size:8px;letter-spacing:0.18em;color:#C5A059;font-weight:700;">THE ART OF BESPOKE GIFTING</div>
              <div class="serif" style="font-size:24px;color:#FAF7F2;">His (Obsidian) &amp; Hers (Warm Ivory) Suites</div>
            </div>

            <!-- Split Obsidian Left / Warm Ivory Right! -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              <div style="border:1.5px solid #C5A059;background:#12141B;padding:8px;text-align:center;">
                <img src="${IMGS.boxMenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;border:1px solid rgba(197,160,89,0.4);" />
                <div class="serif" style="font-size:16px;font-weight:600;color:#FAF7F2;">Men's Obsidian Box</div>
                <div style="font-size:8.5px;color:#E5C878;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:8px;text-align:center;color:#1A1918;">
                <img src="${IMGS.boxWomenOpen}" style="width:100%;height:125px;object-fit:cover;margin-bottom:6px;border:1px solid #C5A059;" />
                <div class="serif" style="font-size:16px;font-weight:600;color:#1A1918;">Women's Sanctuary Box</div>
                <div style="font-size:8.5px;color:#8C6D32;font-weight:700;">$108 ($130 Val • Save $22)</div>
              </div>
            </div>

            <!-- Closed Minimalist Boxes Row -->
            <div style="font-size:8px;letter-spacing:0.14em;font-weight:700;color:#C5A059;margin-bottom:6px;text-align:center;">
              NEW MINIMALIST CLOSED MAGNETIC PUCK BOXES (OBSIDIAN &amp; IVORY)
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
              <div style="border:1px solid #C5A059;background:#12141B;padding:5px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#E5C878;">3.0" OBSIDIAN ($48)</div>
              </div>
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:5px;text-align:center;color:#1A1918;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#1A1918;">3.0" IVORY ($48)</div>
              </div>
              <div style="border:1px solid #C5A059;background:#12141B;padding:5px;text-align:center;">
                <img src="${IMGS.miniPuckBoxClosed}" style="width:100%;height:80px;object-fit:cover;margin-bottom:4px;" />
                <div style="font-size:7.5px;font-weight:700;color:#E5C878;">2.0" MINI PAIR ($38)</div>
              </div>
            </div>

            <div style="border:1.5px solid #C5A059;background:#FAF7F2;color:#1A1918;padding:14px;box-shadow:5px 5px 0 #C5A059;">
              <div style="font-size:8px;letter-spacing:0.15em;color:#8C6D32;font-weight:700;margin-bottom:4px;">THE $92 &rarr; $108 BRIDGE UPSELL (SAVE $22)</div>
              <div style="font-size:10px;color:#1A1918;line-height:1.5;margin-bottom:10px;">
                &#10003; 10 oz Soy Candle ($44) + &#10003; 3.0" ZeoCarb-98™ Puck ($48) + &#10003; 8 oz Body Wash ($38) in Magnetic Collector Box.
              </div>
              <div style="background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;text-align:center;padding:10px;font-size:9px;letter-spacing:0.16em;font-weight:700;">
                RESERVE HIS OR HERS $108 SUITE
              </div>
            </div>
          </div>
          <div style="font-size:9px;text-align:center;color:#E5C878;font-weight:600;">&#9733; Men's framed in Obsidian, Women's framed in Warm Ivory!</div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <span>PUCK &amp; WICK™ • MASTER 3-SCHEME VISUAL COMPARISON</span>
      <span>PAGE 03 OF 04 • COMPARE $108 GIFT BOXES &amp; CLOSED MAGNETIC PUCK BOXES</span>
    </div>
  </div>

  <!-- ====================================================================== -->
  <!-- PAGE 4: SECTION 4 — MOBILE IPHONE VIEW ACROSS ALL 3 COLOR SCHEMES      -->
  <!-- ====================================================================== -->
  <div class="pdf-page">
    <div class="top-banner">
      <span class="top-banner-left">SECTION 04 OF 04 • MOBILE IPHONE EXPERIENCE</span>
      <span class="top-banner-title">HOW CUSTOMERS ON IPHONE SEE ALL 3 COLOR SCHEMES SIDE-BY-SIDE</span>
      <span class="top-banner-right">2-COLUMN MOBILE GRID + MAGNETIC PUCK BOXES</span>
    </div>

    <div class="three-col-stage">
      <!-- COLUMN 1: MOBILE WARM CREAM -->
      <div class="scheme-col">
        <div class="scheme-label cream">
          <span>OPTION A • IPHONE IN 100% WARM CREAM</span>
          <span style="font-size:9px;">DAYLIGHT MOBILE</span>
        </div>
        <div class="viewport-cream" style="padding:18px;align-items:center;justify-content:center;">
          <div style="width:390px;border:2px solid #1A1918;border-radius:24px;overflow:hidden;background:#FAF7F2;box-shadow:0 10px 24px rgba(0,0,0,0.12);">
            <div style="background:#1A1918;color:#FAF7F2;font-size:7px;letter-spacing:0.15em;text-align:center;padding:5px;">
              COMPLIMENTARY MAGNETIC BOX • $108 DELUXE SUITES
            </div>
            <div style="padding:10px 14px;border-bottom:1px solid #1A1918;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:9px;">&#9776;</span>
              <span class="serif" style="font-size:18px;letter-spacing:0.2em;font-weight:600;">PUCK &amp; WICK</span>
              <span style="font-size:9px;">BAG (1)</span>
            </div>
            <!-- 2x2 Mobile Grid -->
            <div style="padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:6px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;">Top Shelf</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">10 oz • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:6px;text-align:center;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;">Velvet Vanilla</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">10 oz • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:6px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;">3.0" Obsidian Puck</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
              <div style="border:1px solid #1A1918;background:#FFFFFF;padding:6px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;">3.0" Ivory Puck</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
            </div>
            <!-- Bottom Banner inside Phone -->
            <div style="margin:0 12px 12px;border:1px solid #1A1918;background:#F3EFE6;padding:10px;text-align:center;">
              <div style="font-size:7.5px;letter-spacing:0.14em;color:#8C6D32;font-weight:700;">THE $108 DELUXE GIFT SUITE</div>
              <div class="serif" style="font-size:16px;font-weight:600;">Candle + 3.0" Puck + 8 oz Body Wash (Save $22)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 2: MOBILE 100% BLACK OBSIDIAN -->
      <div class="scheme-col">
        <div class="scheme-label black">
          <span>OPTION B • IPHONE IN 100% BLACK OBSIDIAN</span>
          <span style="font-size:9px;">ALL-DARK MOBILE</span>
        </div>
        <div class="viewport-black" style="padding:18px;align-items:center;justify-content:center;">
          <div style="width:390px;border:2px solid #C5A059;border-radius:24px;overflow:hidden;background:#0B0C0F;box-shadow:0 10px 24px rgba(0,0,0,0.5);">
            <div style="background:#C5A059;color:#0B0C0F;font-size:7px;letter-spacing:0.15em;text-align:center;padding:5px;font-weight:700;">
              COMPLIMENTARY MAGNETIC BOX • $108 DELUXE SUITES
            </div>
            <div style="padding:10px 14px;border-bottom:1px solid #C5A059;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:9px;color:#C5A059;">&#9776;</span>
              <span class="serif" style="font-size:18px;letter-spacing:0.2em;font-weight:600;color:#FAF7F2;">PUCK &amp; WICK</span>
              <span style="font-size:9px;color:#C5A059;">BAG (1)</span>
            </div>
            <!-- 2x2 Mobile Grid -->
            <div style="padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">Top Shelf</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">Velvet Vanilla</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">3.0" Obsidian Puck</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
              <div style="border:1px solid rgba(197,160,89,0.45);background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">3.0" Ivory Puck</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
            </div>
            <!-- Bottom Banner inside Phone -->
            <div style="margin:0 12px 12px;border:1px solid #C5A059;background:#12141B;padding:10px;text-align:center;">
              <div style="font-size:7.5px;letter-spacing:0.14em;color:#C5A059;font-weight:700;">THE $108 DELUXE GIFT SUITE</div>
              <div class="serif" style="font-size:16px;font-weight:600;color:#FAF7F2;">Candle + 3.0" Puck + 8 oz Body Wash (Save $22)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 3: MOBILE 80% BLACK + 20% WARM IVORY HYBRID -->
      <div class="scheme-col recommended">
        <div class="scheme-label hybrid">
          <span>&#9733; OPTION C • IPHONE IN 80/20 HYBRID</span>
          <span style="font-size:9px;background:#0B0C0F;color:#E5C878;padding:2px 6px;">OBSIDIAN + IVORY</span>
        </div>
        <div class="viewport-hybrid" style="padding:18px;align-items:center;justify-content:center;">
          <div style="width:390px;border:2px solid #C5A059;border-radius:24px;overflow:hidden;background:#0B0C0F;box-shadow:0 10px 24px rgba(0,0,0,0.5);">
            <div style="background:#C5A059;color:#0B0C0F;font-size:7px;letter-spacing:0.15em;text-align:center;padding:5px;font-weight:700;">
              COMPLIMENTARY MAGNETIC BOX • HIS &amp; HERS $108 SUITES
            </div>
            <div style="padding:10px 14px;border-bottom:1px solid #C5A059;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:9px;color:#C5A059;">&#9776;</span>
              <span class="serif" style="font-size:18px;letter-spacing:0.2em;font-weight:600;color:#FAF7F2;">PUCK &amp; WICK</span>
              <span style="font-size:9px;color:#C5A059;">BAG (1)</span>
            </div>
            <!-- 2x2 Mobile Grid: Left Column Obsidian, Right Column Warm Ivory! -->
            <div style="padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="border:1px solid #C5A059;background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.shelfMens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">Top Shelf</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">10 oz • $44.00</div>
                <div style="background:#C5A059;color:#0B0C0F;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:6px;text-align:center;color:#1A1918;">
                <img src="${IMGS.shelfWomens}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#1A1918;">Velvet Vanilla</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">Sanctuary • $44.00</div>
                <div style="background:#1A1918;color:#FAF7F2;padding:5px;font-size:7.5px;font-weight:700;">ADD — $44</div>
              </div>
              <div style="border:1px solid #C5A059;background:#12141B;padding:6px;text-align:center;">
                <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#FAF7F2;">3.0" Obsidian Puck</div>
                <div style="font-size:8px;color:#E5C878;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #C5A059;color:#E5C878;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
              <div style="border:1.5px solid #C5A059;background:#FAF7F2;padding:6px;text-align:center;color:#1A1918;">
                <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:105px;object-fit:cover;margin-bottom:4px;" />
                <div class="serif" style="font-size:14px;font-weight:600;color:#1A1918;">3.0" Ivory Puck</div>
                <div style="font-size:8px;color:#8C6D32;margin-bottom:4px;">Magnetic Box • $48</div>
                <div style="border:1px solid #1A1918;color:#1A1918;padding:5px;font-size:7.5px;font-weight:700;">WAITLIST — $48</div>
              </div>
            </div>
            <!-- Bottom Banner inside Phone: Warm Ivory Callout -->
            <div style="margin:0 12px 12px;border:1.5px solid #C5A059;background:#FAF7F2;color:#1A1918;padding:10px;text-align:center;box-shadow:3px 3px 0 #C5A059;">
              <div style="font-size:7.5px;letter-spacing:0.14em;color:#8C6D32;font-weight:700;">THE $108 DELUXE GIFT SUITE (HIS OR HERS)</div>
              <div class="serif" style="font-size:16px;font-weight:600;color:#1A1918;">Candle + 3.0" Puck + 8 oz Body Wash (Save $22)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <span>PUCK &amp; WICK™ • MASTER 3-SCHEME VISUAL COMPARISON</span>
      <span>PAGE 04 OF 04 • COMPARE MOBILE IPHONE VIEW ACROSS ALL 3 PALETTES</span>
    </div>
  </div>

</body>
</html>`;

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1680, height: 1050 } });
  await page.setContent(masterComparisonHTML, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const outPdf = path.join(ROOT, 'Puck-and-Wick-3-Color-Schemes-Comparison.pdf');
  const artPdf = path.join(ARTIFACT_DIR, 'Puck-and-Wick-3-Color-Schemes-Comparison.pdf');

  await page.pdf({
    path: outPdf,
    width: '1680px',
    height: '1050px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });
  fs.copyFileSync(outPdf, artPdf);

  // Also capture PNGs of each of the 4 side-by-side comparison pages
  const pages = await page.$$('.pdf-page');
  for (let i = 0; i < pages.length; i++) {
    const pngPath = path.join(ARTIFACT_DIR, `compare-3-schemes-page-${i + 1}.png`);
    await pages[i].screenshot({ path: pngPath });
  }

  await browser.close();
  console.log('Generated Puck-and-Wick-3-Color-Schemes-Comparison.pdf and 4 PNG slides!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
