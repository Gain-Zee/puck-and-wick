import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';
const PREV_ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc';

function imgToDataUri(relPath) {
  const fullPath = path.join(WORKSPACE_DIR, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase() === '.png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}

const photos = {
  candleMen: imgToDataUri('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  candleWomen: imgToDataUri('assets/images/packaging/shelf-candle-cashmere-white-tea.jpg'),
  atelierMen: imgToDataUri('assets/images/packaging/atelier-card-obsidian.jpg'),
  atelierWomen: imgToDataUri('assets/images/packaging/atelier-card-ivory.jpg'),
  washMen: imgToDataUri('assets/images/item-bodywash-men.jpg'),
  washWomen: imgToDataUri('assets/images/item-bodywash-women.jpg'),
  boxMenOpen: imgToDataUri('assets/images/box-men-open.jpg'),
  boxMenClosed: imgToDataUri('assets/images/box-men-closed.jpg'),
  boxWomenOpen: imgToDataUri('assets/images/box-women-open.jpg'),
  boxWomenClosed: imgToDataUri('assets/images/box-women-closed.jpg'),
  puck3BoxOpen: imgToDataUri('assets/images/packaging/puck-men-box.jpg'),
  puck3BoxClosed: imgToDataUri('assets/images/packaging/puck-men-box-closed.jpg'),
  puck2BoxOpen: imgToDataUri('assets/images/packaging/puck-mini-pair-box.jpg'),
  puck2BoxClosed: imgToDataUri('assets/images/packaging/puck-mini-pair-box-closed.jpg')
};

function renderCrestSvg(isIvory = false, sizePx = 130) {
  const bg = isIvory ? '#FAF5EB' : '#0B0C0E';
  const stroke = isIvory ? '#9A742C' : '#D4AF37';
  const subStroke = isIvory ? 'rgba(154,116,44,0.35)' : 'rgba(229,200,120,0.32)';
  const textCol = isIvory ? '#8C6520' : '#E5C878';
  return `
    <svg viewBox="0 0 500 500" width="${sizePx}" height="${sizePx}" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.18);">
      <rect x="0" y="0" width="500" height="500" fill="${bg}" />
      <rect x="46" y="46" width="408" height="408" fill="none" stroke="${stroke}" stroke-width="4" />
      <rect x="58" y="58" width="384" height="384" fill="none" stroke="${subStroke}" stroke-width="1.3" />
      <g transform="translate(250, 182)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="${stroke}" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="${bg}" opacity="0.48" />
      </g>
      <text x="250" y="294" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="40" font-weight="700" letter-spacing="5.5" fill="${textCol}">PUCK &amp; WICK</text>
      <text x="250" y="338" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.5" font-weight="600" letter-spacing="4.2" fill="${textCol}">LOUDOUN COUNTY, VA</text>
      <text x="250" y="362" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="5.5" fill="${textCol}" opacity="0.88">USA</text>
    </svg>
  `;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Puck & Wick™ — Master Packaging, Vessel & Sticker Specification Book</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #141619;
      background: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 8mm 11mm;
      page-break-after: always;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: auto;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0B0C0E;
      color: #FFFFFF;
      padding: 3.2mm 5mm;
      border-radius: 2.5mm;
      border-bottom: 2px solid #D4AF37;
    }
    .brand-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 12.5pt;
      font-weight: 700;
      letter-spacing: 2px;
      color: #E5C878;
    }
    .brand-sub {
      font-size: 6.8pt;
      letter-spacing: 1.1px;
      color: #D0C8B8;
      text-transform: uppercase;
      margin-top: 1px;
    }
    .doc-badge {
      text-align: right;
      font-size: 7.2pt;
      line-height: 1.3;
      color: #E5E7EB;
    }
    .doc-badge strong {
      color: #E5C878;
      font-size: 7.8pt;
    }
    .section-header {
      background: #F8F6F0;
      border-left: 3.5px solid #B68D40;
      padding: 1.8mm 3.2mm;
      margin-top: 2.2mm;
      margin-bottom: 1.6mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-header h2 {
      font-size: 9pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #111317;
    }
    .section-header span {
      font-size: 6.8pt;
      font-weight: 700;
      color: #8C6520;
      background: #EFE7D3;
      padding: 0.7mm 2mm;
      border-radius: 1.5mm;
    }
    .alert-box {
      background: #FFFDF7;
      border: 1px solid #D4AF37;
      border-radius: 2mm;
      padding: 2mm 3.2mm;
      font-size: 7.1pt;
      line-height: 1.34;
      color: #1F2328;
    }
    .alert-box strong {
      color: #8C6520;
    }
    .photo-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2.5mm;
      margin: 1.8mm 0;
    }
    .photo-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3mm;
      margin: 1.5mm 0;
    }
    .photo-card {
      border: 1px solid #E2DDD2;
      border-radius: 2mm;
      overflow: hidden;
      background: #0B0C0E;
      display: flex;
      flex-direction: column;
    }
    .photo-card img {
      width: 100%;
      height: 28mm;
      object-fit: cover;
      display: block;
    }
    .photo-card.tall img {
      height: 31mm;
    }
    .photo-cap {
      background: #141619;
      color: #F3EFE6;
      padding: 1.2mm 2mm;
      font-size: 6.2pt;
      line-height: 1.25;
      border-top: 1px solid rgba(212,175,55,0.35);
    }
    .photo-cap strong {
      color: #E5C878;
      display: block;
      font-size: 6.6pt;
      margin-bottom: 0.3mm;
    }
    table.spec-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.8pt;
      line-height: 1.28;
      margin-top: 1mm;
    }
    table.spec-table th {
      background: #141619;
      color: #E5C878;
      text-align: left;
      padding: 1.4mm 2mm;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 6.4pt;
      letter-spacing: 0.3px;
      border: 1px solid #2C3036;
    }
    table.spec-table td {
      padding: 1.4mm 2mm;
      border: 1px solid #DCD7CC;
      vertical-align: top;
      color: #1C1F23;
    }
    table.spec-table tr:nth-child(even) td {
      background: #FAF8F3;
    }
    .swatch {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-right: 4px;
      border: 1px solid #888;
      vertical-align: middle;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
    }
    .card-box {
      border: 1px solid #DCD7CC;
      border-radius: 2mm;
      padding: 2mm 2.6mm;
      background: #FCFBF8;
      font-size: 6.7pt;
      line-height: 1.28;
    }
    .card-box h3 {
      font-size: 7.4pt;
      font-weight: 800;
      color: #141619;
      margin-bottom: 0.8mm;
      border-bottom: 1px solid #E5DFD2;
      padding-bottom: 0.6mm;
    }
    .card-box ul {
      padding-left: 3.5mm;
    }
    .card-box li {
      margin-bottom: 0.5mm;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #D8D2C5;
      padding-top: 1.5mm;
      font-size: 6.5pt;
      color: #5C5852;
    }
    .tag-pill {
      display: inline-block;
      background: #141619;
      color: #E5C878;
      font-weight: 700;
      font-size: 6.5pt;
      padding: 0.6mm 1.8mm;
      border-radius: 1mm;
      margin-right: 1mm;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: OVERVIEW, COLORWAYS & CANDLE JARS / LIDS / BOXES ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Loudoun County, Virginia • USA • https://puckandwick.com</div>
        </div>
        <div class="doc-badge">
          <strong>MASTER PACKAGING, VESSEL &amp; STICKER SPEC BOOK</strong><br/>
          Prepared for Alibaba Turnkey Packaging &amp; Label Partner • Page 1 of 4
        </div>
      </div>

      <div class="alert-box" style="margin-top:3mm;">
        <strong>SCOPE OF THIS RFQ (EXCLUDING METAL ODOR PUCK HARDWARE):</strong> We are seeking a single factory partner to produce and coordinate our <strong>Glass Candle Jars &amp; Metal Lids, Individual Candle Boxes, Stickers/Labels, Wax Dust Covers, Atelier Cards, 8 oz Body Wash Pump Bottles, and Rigid Magnetic Gift Boxes w/ EVA Foam Inserts</strong>. <em>(Note: We manufacture the metal 3.0" &amp; 2.0" Odor Pucks separately, so we only need the empty magnetic boxes + foam inserts for the pucks—NOT the metal pucks themselves.)</em>
      </div>

      <!-- 2 UNIFIED COLORWAYS -->
      <div class="section-header">
        <h2>01. Master Brand Color Palette (Only 2 Colorways Across Entire Line)</h2>
        <span>SHARED MOLDS &amp; DIELINES</span>
      </div>
      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:24%;">Collection Line</th>
            <th style="width:28%;">Primary Vessel / Box Color</th>
            <th style="width:28%;">Metallic Foil &amp; Hardware Accent</th>
            <th style="width:20%;">SKUs in Line</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A. Men's Athlete Collection</strong></td>
            <td><span class="swatch" style="background:#0B0C0E;"></span><strong>Matte Obsidian Black</strong><br/>HEX <code>#0B0C0E</code> / Pantone Black 6 C (Velvet Soft-Touch Matte)</td>
            <td><span class="swatch" style="background:#D4AF37;"></span><strong>Brushed Champagne-Gold</strong><br/>HEX <code>#D4AF37</code> / <code>#E5C878</code> (Metallic Gold Hot-Foil &amp; Brushed Gold Metal)</td>
            <td>• 7 Soy Candle Scents<br/>• 1 Men's 8 oz Body Wash<br/>• 1 Men's $108 Deluxe Box</td>
          </tr>
          <tr>
            <td><strong>B. Women's Sanctuary Line</strong></td>
            <td><span class="swatch" style="background:#FAF5EB;"></span><strong>Frosted Warm Alabaster-Ivory</strong><br/>HEX <code>#FAF5EB</code> / Warm Cream-Ivory (Soft Matte / Frosted)</td>
            <td><span class="swatch" style="background:#C8A050;"></span><strong>Brushed Champagne-Gold</strong><br/>HEX <code>#C8A050</code> / <code>#E5C878</code> (Warm Champagne-Gold Foil &amp; Metal)</td>
            <td>• 3 Soy Candle Scents<br/>• 1 Women's 8 oz Body Wash<br/>• 1 Women's $108 Deluxe Box</td>
          </tr>
        </tbody>
      </table>

      <!-- VISUAL REFERENCE ROW -->
      <div class="photo-grid-4">
        <div class="photo-card">
          <img src="${photos.candleMen}" alt="Men's Candle & Box" />
          <div class="photo-cap"><strong>Men's 10 oz Obsidian Candle</strong>Matte Black Jar + Gold Lid + 2-Piece Box</div>
        </div>
        <div class="photo-card">
          <img src="${photos.candleWomen}" alt="Women's Candle & Box" />
          <div class="photo-cap"><strong>Women's 10 oz Ivory Candle</strong>Frosted Ivory Jar + Gold Lid + 2-Piece Box</div>
        </div>
        <div class="photo-card">
          <img src="${photos.washMen}" alt="Men's 8oz Body Wash" />
          <div class="photo-cap"><strong>Men's 8 oz Body Wash</strong>Matte Black Bottle + Brushed Gold Pump</div>
        </div>
        <div class="photo-card">
          <img src="${photos.washWomen}" alt="Women's 8oz Body Wash" />
          <div class="photo-cap"><strong>Women's 8 oz Body Wash</strong>Frosted Ivory Bottle + Gold Pump</div>
        </div>
      </div>

      <!-- SECTION 2: CANDLE JARS, LIDS & INDIVIDUAL CANDLE BOXES -->
      <div class="section-header">
        <h2>02. 10 oz Candle Jars, Unbranded Gold Lids &amp; Two-Piece Collector Boxes</h2>
        <span>1 SHARED GLASS MOLD • 1 SHARED BOX DIELINE</span>
      </div>
      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:22%;">Component</th>
            <th style="width:26%;">Exact Dimensions (Inches &amp; mm)</th>
            <th style="width:34%;">Material, Finish &amp; Structural Details</th>
            <th style="width:18%;">Color Variants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>2.1 10 oz Straight-Sided Glass Candle Jar</strong></td>
            <td>• <strong>Outer Dia (OD):</strong> <code>3.06"</code> (<code>78 mm</code>)<br/>• <strong>Height (H):</strong> <code>3.50"</code> (<code>89 mm</code>)<br/>• <strong>Inner Dia (ID):</strong> <code>2.86"</code> (<code>72.6 mm</code>)<br/>• <strong>Capacity:</strong> <code>10 oz</code> (<code>300 mL</code> brim; holds <code>8.5 oz / 240g</code> soy wax)</td>
            <td>Heavy-base straight-sided cylinder glass tumbler (<code>11–12 mm</code> thick solid glass bottom). Heat-resistant ASTM-compliant candle glass.</td>
            <td><strong>1) Men's:</strong> Matte Obsidian Black (Opaque Matte)<br/><strong>2) Women's:</strong> Frosted Warm Alabaster-Ivory</td>
          </tr>
          <tr>
            <td><strong>2.2 Unbranded Brushed Gold Flat Metal Lid</strong></td>
            <td>• <strong>Outer Dia:</strong> <code>3.15"–3.25"</code> (<code>80–82 mm</code>)<br/>• <strong>Skirt Depth:</strong> <code>0.35"</code> (<code>9 mm</code>)<br/>• Fits <code>78 mm</code> OD / <code>72.6 mm</code> ID jar</td>
            <td>Brushed Champagne-Gold anodized aluminum / tinplate flat lid with <strong>inner food-grade silicone ring gasket</strong> for snug airtight fit. <strong>100% Unbranded / Blank Top</strong> (no logo engraving needed on metal lid).</td>
            <td><strong>1 Universal Lid</strong> fits both Men's Black &amp; Women's Ivory jars</td>
          </tr>
          <tr>
            <td><strong>2.3 Two-Piece Gold-Neck Rigid Candle Box + Base Foam Ring</strong></td>
            <td>• <strong>Box Outer Size:</strong> <code>3.50" W × 3.50" D × 4.25" H</code> (<code>89 × 89 × 108 mm</code>)<br/>• <strong>Gold Neck Step:</strong> <code>0.45"</code> (<code>11 mm</code>) exposed gold band<br/>• <strong>Inner EVA Base Cutout:</strong> <code>3.08"</code> (<code>78.5 mm</code>) round recess</td>
            <td><code>1200gsm</code> rigid greyboard wrapped in <code>157gsm</code> soft-touch matte paper with anti-scratch lamination + <strong>Exposed Metallic Brushed-Gold Inner Shoulder Neck</strong>.<br/>• <strong>Bottom EVA Foam Pad:</strong> <code>12 mm</code> thick die-cut EVA base ring holds jar dead-center.<br/>• <strong>Universal Box Print (No Scent Name on Box!):</strong><br/>&nbsp;&nbsp;- <em>Front:</em> Gold Foil Square Frame + Crossed Hockey Sticks &amp; Flame + <code>PUCK &amp; WICK</code><br/>&nbsp;&nbsp;- <em>Back:</em> Minimal Gold Foil Stamp: <code>EST. • 2026 • PURCELLVILLE, VA</code><br/>&nbsp;&nbsp;- <em>Top Roof:</em> Gold Foil Monogram: <code>P &amp; W</code></td>
            <td><strong>1) Men's Box:</strong> Matte Black (<code>#0B0C0E</code>) + Gold Foil<br/><strong>2) Women's Box:</strong> Warm Ivory (<code>#FAF5EB</code>) + Gold Foil</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 1 of 4 • Dimensions in Inches &amp; Millimeters (mm)</span>
    </div>
  </div>

  <!-- ==================== PAGE 2: ALL STICKERS, LABELS, DUST COVERS & ATELIER CARDS ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Section 03 • Complete Sticker, Label, Wax Dust Cover &amp; Atelier Card Specifications</div>
        </div>
        <div class="doc-badge">
          <strong>STICKERS, LABELS &amp; PRINT INSERTS</strong><br/>
          Page 2 of 4
        </div>
      </div>

      <div class="alert-box" style="margin-top:3mm;">
        <strong>WHY OUR STICKER SYSTEM IS SO SIMPLE TO PRODUCE:</strong> Every candle jar uses a <strong>100% Universal Square Front Crest Sticker (Item 3.1)</strong> with NO scent name on the glass jar! The individual scent name lives ONLY on the <strong>L-Wrap Box Corner Sticker Band (Item 3.2)</strong> and the <strong>2.0" Round Bottom Warning Sticker (Item 3.3)</strong>.
      </div>

      <div class="section-header">
        <h2>03. Candle Stickers, Labels, Dust Covers &amp; Insert Cards (6 Print Items)</h2>
        <span>WATERPROOF BOPP + GOLD HOT-FOIL</span>
      </div>

      <!-- VISUAL PREVIEW OF CRESTS & ATELIER CARDS -->
      <div style="display:grid;grid-template-columns: 1fr 1fr 1.25fr 1.25fr;gap:3mm;margin-bottom:2.5mm;align-items:center;">
        <div class="card-box" style="text-align:center;padding:2mm;">
          <div style="display:flex;justify-content:center;margin-bottom:1.5mm;">${renderCrestSvg(false, 96)}</div>
          <strong>3.1A Men's Universal Jar Crest</strong><br/>
          <span><code>2.25" × 2.25"</code> (<code>57 × 57 mm</code>)<br/>Matte Black BOPP + Gold Foil</span>
        </div>
        <div class="card-box" style="text-align:center;padding:2mm;">
          <div style="display:flex;justify-content:center;margin-bottom:1.5mm;">${renderCrestSvg(true, 96)}</div>
          <strong>3.1B Women's Universal Jar Crest</strong><br/>
          <span><code>2.25" × 2.25"</code> (<code>57 × 57 mm</code>)<br/>Matte Ivory BOPP + Gold Foil</span>
        </div>
        <div class="photo-card">
          <img src="${photos.atelierMen}" alt="Men's Atelier Card" style="height:29mm;" />
          <div class="photo-cap"><strong>3.6A Men's 3.5"×3.5" Atelier Card</strong>Double-Sided 400gsm Cardstock</div>
        </div>
        <div class="photo-card">
          <img src="${photos.atelierWomen}" alt="Women's Atelier Card" style="height:29mm;" />
          <div class="photo-cap"><strong>3.6B Women's 3.5"×3.5" Atelier Card</strong>Double-Sided 400gsm Cardstock</div>
        </div>
      </div>

      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:22%;">Sticker / Insert Item</th>
            <th style="width:23%;">Exact Size (Inches &amp; mm)</th>
            <th style="width:35%;">Material, Finish &amp; Artwork Specification</th>
            <th style="width:20%;">Number of SKUs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>3.1 Universal Square Front Jar Crest Sticker</strong><br/><em>(Applied to Front of Glass Jar)</em></td>
            <td><strong>Square:</strong><br/><code>2.25" W × 2.25" H</code><br/>(<code>57.15 mm × 57.15 mm</code>)</td>
            <td>Waterproof, oil-resistant <strong>Soft-Touch Matte BOPP Vinyl</strong> with permanent glass adhesive + <strong>Metallic Gold Hot-Foil Stamping</strong>.<br/>• <strong>Artwork:</strong> Outer gold square border + inner hairline + Crossed Hockey Sticks (w/ subtle blade toes) &amp; Flame + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> centered at bottom. <strong>(NO scent name on jar label!)</strong></td>
            <td><strong>Only 2 Universal SKUs:</strong><br/>• 1 Men's Matte Black<br/>• 1 Women's Matte Ivory</td>
          </tr>
          <tr>
            <td><strong>3.2 L-Wrap Box Corner Scent Band Sticker</strong><br/><em>(Wraps Front + Right Side of Candle Box)</em></td>
            <td><strong>Rectangle w/ Center Score:</strong><br/><code>3.50" W × 0.90" H</code><br/>(<code>89 mm × 23 mm</code>)<br/><em>Folds at <code>1.75"</code> (<code>44.5 mm</code>)</em></td>
            <td>Soft-Touch Matte BOPP Sticker with Gold Foil border &amp; text. Wraps around the bottom-right 90° corner of the candle box:<br/>• <strong>Left Half (Front of Box):</strong> Kicker (<code>SIGNATURE SCENT • BATCH #098</code>) + <strong>SCENT NAME</strong> + 3 Fragrance Notes.<br/>• <strong>Right Half (Right Side of Box):</strong> <code>10 OZ VESSEL (8.5 OZ / 240G FILL)</code> + <strong>SCENT NAME</strong> + <code>QC #1 CERTIFIED • LOUDOUN CO., VA</code>.</td>
            <td><strong>10 Scent SKUs:</strong><br/>• 7 Men's (Matte Black)<br/>• 3 Women's (Matte Ivory)</td>
          </tr>
          <tr>
            <td><strong>3.3 Round Bottom Safety Warning &amp; Batch Label</strong><br/><em>(Underside of Candle Jar)</em></td>
            <td><strong>Circle:</strong><br/><code>2.00" Diameter</code><br/>(<code>50.8 mm</code> Dia)</td>
            <td>Heat-resistant Waterproof Matte Polypropylene (BOPP) with Gold Foil rings &amp; text.<br/>• Includes ASTM Fire Safety Pictograms, Burn Warning Text, Scent Name, Wick Spec, <code>10 OZ VESSEL (8.5 OZ / 240G NET FILL)</code>, and <code>HAND-POURED IN PURCELLVILLE, VA</code>.</td>
            <td><strong>10 Scent SKUs:</strong><br/>• 7 Men's (Matte Black)<br/>• 3 Women's (Matte Ivory)</td>
          </tr>
          <tr>
            <td><strong>3.4 Top Lid Round <code>QC #1 SEAL</code> Sticker</strong><br/><em>(Candle Box Lid Corner)</em></td>
            <td><strong>Circle:</strong><br/><code>1.00" Diameter</code><br/>(<code>25.4 mm</code> Dia)</td>
            <td>Brushed Metallic Champagne-Gold Foil Sticker with black printed text: <code>QC #1 SEAL • VA POUR</code>.</td>
            <td><strong>1 Single Universal SKU</strong></td>
          </tr>
          <tr>
            <td><strong>3.5 Universal Wax Dust Cover</strong><br/><em>(Rests on Soy Wax Inside Jar)</em></td>
            <td><strong>Circle w/ Pull Tab:</strong><br/><code>2.83" Diameter</code> (<code>72 mm</code>)<br/>+ <code>6 mm</code> center wick hole</td>
            <td><code>350gsm</code> Heavy Matte Obsidian-Black Cardstock with Gold Foil print (<code>PUCK &amp; WICK™ • 100% AMERICAN SOY</code>) + small top finger pull-tab. Fits neatly inside the <code>72.6 mm</code> ID glass tumbler.</td>
            <td><strong>1 Single Universal SKU</strong> (Fits all 10 candles)</td>
          </tr>
          <tr>
            <td><strong>3.6 Double-Sided Square Atelier Certificate Card</strong><br/><em>(Sits on Top of Lid Inside Box)</em></td>
            <td><strong>Square Card:</strong><br/><code>3.35" W × 3.35" H</code><br/>(<code>85 mm × 85 mm</code>)</td>
            <td><code>400gsm</code> Soft-Touch Matte Cardstock with Gold Foil stamping (Double-Sided):<br/>• <strong>Side A:</strong> Founder Story (<em>25 Years on the Ice &amp; #98 Tribute</em>)<br/>• <strong>Side B:</strong> <em>4-Step Candle Burn Ritual &amp; QC #1 Checklist</em></td>
            <td><strong>Only 2 Universal SKUs:</strong><br/>• 1 Men's Matte Black<br/>• 1 Women's Matte Ivory</td>
          </tr>
        </tbody>
      </table>

      <!-- THE 10 SCENT NAMES LIST FOR ITEMS 3.2 & 3.3 -->
      <div class="card-box" style="margin-top:2.5mm;">
        <h3>Exact 10 Candle Scent Names &amp; Notes for L-Wrap Box Corner Bands (3.2) &amp; Bottom Labels (3.3):</h3>
        <div class="two-col" style="margin-top:1mm;">
          <div>
            <span class="tag-pill">MEN'S MATTE BLACK (7 SCENTS)</span>
            <ol style="padding-left:4mm;margin-top:1mm;">
              <li><strong>TOP SHELF</strong> — <em>Crimson Saffron • White Cedar • Amberwood</em></li>
              <li><strong>FRESH CUT</strong> — <em>Italian Bergamot • Hinoki Wood • Vetiver</em></li>
              <li><strong>BALSAM FIR</strong> — <em>Fraser Pine • Resinous Balsam • Cedar Bark</em></li>
              <li><strong>BARNWOOD &amp; BOURBON</strong> — <em>Small-Batch Rye • Weathered Oak • Vanilla</em></li>
              <li><strong>RINKSIDE CEDAR &amp; SMOKE</strong> — <em>Birchwood Smoke • Atlas Cedar • Glove Leather</em></li>
              <li><strong>WARM AMBER &amp; VANILLA</strong> — <em>Baltic Amber • Cashmere Musk • Vanilla Bean</em></li>
              <li><strong>LOCKER ROOM MINT</strong> — <em>Crushed Spearmint • Blue Eucalyptus • Cedar</em></li>
            </ol>
          </div>
          <div>
            <span class="tag-pill" style="background:#8C6520;color:#FFF;">WOMEN'S SANCTUARY IVORY (3 SCENTS)</span>
            <ol start="8" style="padding-left:4mm;margin-top:1mm;">
              <li><strong>CASHMERE &amp; WHITE TEA</strong> — <em>Imperial White Tea • Spun Cashmere • Hinoki</em></li>
              <li><strong>VELVET VANILLA &amp; SANTAL</strong> — <em>Australian Sandalwood • Cardamom • Vanilla</em></li>
              <li><strong>SEA SALT &amp; WHITE ORCHID</strong> — <em>Crystalline Sea Salt • Night Orchid • Driftwood</em></li>
            </ol>
            <div style="margin-top:2mm;padding:1.5mm 2mm;background:#F3EFE4;border-radius:1.5mm;font-size:7pt;">
              <strong>Vector Print Files Ready:</strong> We already have 100% print-ready vector PDFs/SVGs for all 10 L-Wrap Bands, all 10 Bottom Labels, and both Universal Front Crests ready to send you.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 2 of 4 • Stickers, Labels, Dust Covers &amp; Insert Cards</span>
    </div>
  </div>

  <!-- ==================== PAGE 3: 8 OZ BODY WASH BOTTLES/LABELS & $108 DELUXE 3-CAVITY BOXES ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Sections 04 &amp; 05 • 8 fl oz Body Wash Pump Bottles &amp; $108 Deluxe 3-Cavity Collector Boxes</div>
        </div>
        <div class="doc-badge">
          <strong>BODY WASH BOTTLES &amp; DELUXE GIFT BOXES</strong><br/>
          Page 3 of 4
        </div>
      </div>

      <!-- SECTION 4: 8 FL OZ BODY WASH PUMP BOTTLES & WATERPROOF LABELS -->
      <div class="section-header">
        <h2>04. 8 fl oz (236 mL / 250 mL) Body Wash Bottles, Lockable Gold Pumps &amp; Labels</h2>
        <span>1 SHARED BOTTLE MOLD • MEN'S &amp; WOMEN'S</span>
      </div>
      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:22%;">Component</th>
            <th style="width:25%;">Exact Dimensions (Inches &amp; mm)</th>
            <th style="width:35%;">Material, Pump &amp; Waterproof Label Details</th>
            <th style="width:18%;">2 Color Variants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>4.1 8 fl oz Apothecary / Boston Round Bottle</strong></td>
            <td>• <strong>Capacity:</strong> <code>8 fl oz</code> (<code>236–250 mL</code>)<br/>• <strong>Outer Dia (OD):</strong> <code>2.40"</code> (<code>61 mm</code>)<br/>• <strong>Total Height w/ Pump:</strong> <code>6.75"</code> (<code>171 mm</code>)<br/>• <strong>Neck Finish:</strong> <code>24-410</code></td>
            <td>Heavy-wall cylindrical Apothecary / Boston Round bottle (Thick-Wall Heavy PET or Coated Glass). Both Men's and Women's use the <strong>exact same bottle mold</strong> so both fit into the exact same foam cavity inside the $108 Collector Box!</td>
            <td><strong>1) Men's:</strong> Smooth Matte Obsidian Black (<code>#0B0C0E</code>)<br/><strong>2) Women's:</strong> Frosted Warm Alabaster-Ivory (<code>#FAF5EB</code>)</td>
          </tr>
          <tr>
            <td><strong>4.2 Lockable Brushed Gold Dispenser Pump</strong></td>
            <td>• <strong>Neck Thread:</strong> <code>24-410</code><br/>• <strong>Dosage:</strong> <code>2.0 mL</code> per stroke<br/>• <strong>Locking:</strong> Twist-to-Lock Head</td>
            <td><strong>Brushed Champagne-Gold Anodized Aluminum / Metal-Sheathed Collar &amp; Pump Head</strong> with internal leak-proof shipping lock and dip tube trimmed to bottom corner of bottle.</td>
            <td><strong>1 Universal Pump</strong> fits both Men's &amp; Women's bottles</td>
          </tr>
          <tr>
            <td><strong>4.3 Shower-Proof Wrap Bottle Label</strong></td>
            <td>• <strong>Wrap Label Size:</strong><br/><code>6.50" W × 3.50" H</code><br/>(<code>165 mm × 89 mm</code>)</td>
            <td>100% Waterproof, Steam/Shower-Proof <strong>Soft-Touch Matte BOPP Vinyl + Metallic Gold Hot-Foil Stamping</strong>:<br/>• <strong>Front Crest on Both Bottles:</strong> Crossed Hockey Sticks (w/ Subtle Stick Blades) &amp; Flame + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>.<br/>• <strong>Men's Label:</strong> Matte Black BOPP + Gold Foil (<code>ATHLETE CHARCOAL BODY WASH • 8 FL OZ / 236 ML</code> + Back Directions/Ingredients).<br/>• <strong>Women's Label:</strong> Matte Warm Ivory BOPP + Gold Foil (<code>WHITE CLAY &amp; SILK BODY WASH • 8 FL OZ / 236 ML</code> + Back Directions/Ingredients).</td>
            <td><strong>2 Label SKUs:</strong><br/>• 1 Men's Black/Gold<br/>• 1 Women's Ivory/Gold</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION 5: $108 DELUXE 3-ITEM COLLECTOR BOXES & 3-CAVITY FOAM INSERTS -->
      <div class="section-header" style="margin-top:4mm;">
        <h2>05. The $108 Deluxe 3-Item Collector Boxes &amp; 3-Cavity EVA Foam Inserts</h2>
        <span>100% IDENTICAL BOX &amp; 3-CAVITY FOAM DIELINE FOR MEN'S &amp; WOMEN'S</span>
      </div>

      <div class="photo-grid-4">
        <div class="photo-card tall">
          <img src="${photos.boxMenOpen}" alt="Men's Deluxe Box Open" />
          <div class="photo-cap"><strong>Men's $108 Box (Open)</strong>3-Cavity Charcoal Foam (Sticks &amp; Flame Only)</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxMenClosed}" alt="Men's Deluxe Box Closed" />
          <div class="photo-cap"><strong>Men's $108 Box (Closed)</strong>PUCK &amp; WICK + LOUDOUN COUNTY, VA + USA</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxWomenOpen}" alt="Women's Deluxe Box Open" />
          <div class="photo-cap"><strong>Women's $108 Box (Open)</strong>3-Cavity Cream Foam (Sticks &amp; Flame Only)</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxWomenClosed}" alt="Women's Deluxe Box Closed" />
          <div class="photo-cap"><strong>Women's $108 Box (Closed)</strong>PUCK &amp; WICK + LOUDOUN COUNTY, VA + USA</div>
        </div>
      </div>

      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:22%;">Box / Insert Component</th>
            <th style="width:26%;">Exact Dimensions (Inches &amp; mm)</th>
            <th style="width:34%;">Construction, Foil Stamping &amp; Cavity Layout</th>
            <th style="width:18%;">2 Color Variants</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>5.1 Rigid Magnetic Front-Flap Gift Box</strong></td>
            <td>• <strong>Outer Dimensions:</strong><br/><code>11.50" W × 8.00" D × 4.00" H</code><br/>(<code>292 mm × 203 mm × 102 mm</code>)<br/>• <strong>Board:</strong> <code>1200gsm–1400gsm</code></td>
            <td>Rigid book-style magnetic front-flap keepsake box (ships rigid or collapsible fold-flat w/ 3M corner tape &amp; concealed neodymium magnets).<br/>• <strong>Exterior Closed Top Lid:</strong> Borderless Gold Hot-Foil Crossed Hockey Sticks (w/ Subtle Stick Blades) &amp; Flame + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>.<br/>• <strong>Inside Lid &amp; Foam:</strong> Minimalist luxury presentation — <strong>No extra writing on inside lid or foam</strong>.</td>
            <td><strong>1) Men's Box:</strong> Matte Obsidian Black (<code>#0B0C0E</code>) + Gold Foil<br/><strong>2) Women's Box:</strong> Warm Alabaster-Ivory (<code>#FAF5EB</code>) + Gold Foil</td>
          </tr>
          <tr>
            <td><strong>5.2 Precision Die-Cut 3-Cavity EVA Foam Insert</strong><br/><em>(Identical Cutouts in Both Boxes!)</em></td>
            <td>• <strong>Cavity 1 (Left — 10 oz Candle w/ Lid):</strong> <code>3.08" × 3.55"</code> (<code>78.5 × 90 mm</code>)<br/>• <strong>Cavity 2 (Center — 3.0" Odor Puck):</strong> <code>3.02" Dia × 1.02" D</code> (<code>76.5 × 26 mm</code>)<br/>• <strong>Cavity 3 (Right — 8 oz Body Wash):</strong> <code>2.42" W × 6.80" L</code> (<code>61.5 × 173 mm</code>)</td>
            <td>High-density EVA foam topped with soft velvet/suede flocking + finger-pull extraction notches on all 3 cavities.<br/>• <strong>Foam Foil Stamp (Above Center Puck Cavity):</strong><br/>&nbsp;&nbsp;- Gold Foil <strong>Crossed Hockey Sticks (w/ Subtle Stick Blades) &amp; Flame Emblem ONLY</strong> — <strong>No Text / No Writing on Foam</strong>!<br/><em>(Note: We insert our own 3.0" Odor Puck into the center cavity.)</em></td>
            <td><strong>1) Men's Foam:</strong> Charcoal Black Velvet EVA<br/><strong>2) Women's Foam:</strong> Warm Cream Suede EVA</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 3 of 4 • 8 oz Body Wash Bottles &amp; $108 Deluxe 3-Cavity Collector Boxes</span>
    </div>
  </div>

  <!-- ==================== PAGE 4: SMALL MAGNETIC PUCK BOXES (BOXES ONLY) + MASTER QUOTE TABLE ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Section 06 &amp; Master Quotation Sheet • Empty Magnetic Puck Boxes &amp; Order Quantities</div>
        </div>
        <div class="doc-badge">
          <strong>EMPTY PUCK BOXES &amp; RFQ SUMMARY</strong><br/>
          Page 4 of 4
        </div>
      </div>

      <!-- SECTION 6: STANDALONE MAGNETIC COLLECTOR BOXES FOR THE ODOR PUCKS (BOXES & FOAM ONLY!) -->
      <div class="section-header" style="margin-top:3mm;">
        <h2>06. Standalone Magnetic Boxes &amp; Foam Inserts for Odor Pucks (Boxes Only — No Metal Pucks)</h2>
        <span>EMPTY MAGNETIC BOXES + EVA FOAM ONLY</span>
      </div>

      <div class="photo-grid-4">
        <div class="photo-card">
          <img src="${photos.puck3BoxOpen}" alt="3.0 Puck Box Open" />
          <div class="photo-cap"><strong>6.1 Single 3.0" Puck Box (Open)</strong>4.2" × 4.2" × 1.8" + 76.5mm Round Cavity</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck3BoxClosed}" alt="3.0 Puck Box Closed" />
          <div class="photo-cap"><strong>6.1 Single 3.0" Puck Box (Closed)</strong>Matte Black + Borderless Gold Foil Logo</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck2BoxOpen}" alt="2.0 Mini Pair Box Open" />
          <div class="photo-cap"><strong>6.2 Twin 2.0" Mini Puck Box (Open)</strong>5.5" × 3.2" × 1.6" + 2x 51.2mm Cavities</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck2BoxClosed}" alt="2.0 Mini Pair Box Closed" />
          <div class="photo-cap"><strong>6.2 Twin 2.0" Mini Puck Box (Closed)</strong>Matte Black + Borderless Gold Foil Logo</div>
        </div>
      </div>

      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:23%;">Empty Box Item</th>
            <th style="width:26%;">Outer Box &amp; Foam Cavity Size</th>
            <th style="width:35%;">Material, Foil Printing &amp; Foam Spec</th>
            <th style="width:16%;">Colorway</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>6.1 Empty Magnetic Box for 3.0" Odor Puck</strong><br/><em>(Box &amp; Foam Insert Only)</em></td>
            <td>• <strong>Box Outer Size:</strong> <code>4.20" W × 4.20" D × 1.80" H</code> (<code>107 × 107 × 46 mm</code>)<br/>• <strong>1 Center Round Cavity:</strong> <code>3.02" Dia × 1.02" D</code> (<code>76.5 × 26 mm</code>)</td>
            <td><code>1200gsm</code> Rigid Matte-Black Magnetic Front-Flap Box.<br/>• <strong>Top Lid:</strong> Borderless Gold Hot-Foil Crossed-Sticks Logo.<br/>• <strong>Inner Lid:</strong> Gold Foil Specs (<code>UP TO 120 SQ. FT. • 3-AXIS AIRFLOW</code>).<br/>• <strong>Foam:</strong> Charcoal EVA w/ 1 round <code>76.5 mm</code> cutout + finger notch.</td>
            <td><strong>1 Universal Box</strong> (Matte Black + Gold Foil)</td>
          </tr>
          <tr>
            <td><strong>6.2 Empty Dual-Cavity Magnetic Box for 2.0" Mini Pucks (Set of 2)</strong><br/><em>(Box &amp; Foam Insert Only)</em></td>
            <td>• <strong>Box Outer Size:</strong> <code>5.50" W × 3.20" D × 1.60" H</code> (<code>140 × 81 × 41 mm</code>)<br/>• <strong>2 Side-by-Side Round Cavities:</strong> <code>2.02" Dia × 0.80" D</code> each (<code>51.2 × 20.5 mm</code>)</td>
            <td><code>1200gsm</code> Rigid Matte-Black Magnetic Front-Flap Box.<br/>• <strong>Top Lid:</strong> Borderless Gold Hot-Foil Crossed-Sticks Logo.<br/>• <strong>Inner Lid:</strong> Gold Foil Specs (<code>SET OF 2 MINI PUCKS • UP TO 40 SQ. FT.</code>).<br/>• <strong>Foam:</strong> Charcoal EVA w/ 2 round <code>51.2 mm</code> cutouts + finger notches.</td>
            <td><strong>1 Universal Box</strong> (Matte Black + Gold Foil)</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION 7: MASTER QUOTATION CHECKLIST TABLE FOR SUPPLIER -->
      <div class="section-header" style="margin-top:3.5mm;">
        <h2>07. Master Quotation Checklist for Supplier (Please Quote Pilot Run &amp; Bulk Tier)</h2>
        <span>SHIPPING DESTINATION: PURCELLVILLE, VIRGINIA 20132, USA</span>
      </div>

      <table class="spec-table">
        <thead>
          <tr>
            <th style="width:6%;">Item #</th>
            <th style="width:42%;">Component Description</th>
            <th style="width:18%;">Key Size (mm)</th>
            <th style="width:17%;">Pilot Qty (Quote Tier 1)</th>
            <th style="width:17%;">Scale Qty (Quote Tier 2)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>01</strong></td>
            <td><strong>10 oz Glass Candle Jars + Unbranded Brushed Gold Metal Lids</strong> (Split: 70% Matte Black / 30% Frosted Warm Ivory)</td>
            <td><code>78 mm OD × 89 mm H</code> + <code>80 mm</code> Gold Lid</td>
            <td>200 – 300 pcs</td>
            <td>500 – 1,000 pcs</td>
          </tr>
          <tr>
            <td><strong>02</strong></td>
            <td><strong>Two-Piece Gold-Neck Rigid Candle Boxes + Base EVA Ring</strong> (Split: 70% Matte Black / 30% Warm Ivory — Universal Print)</td>
            <td><code>89 × 89 × 108 mm</code> (<code>78.5 mm</code> inner cutout)</td>
            <td>200 – 300 pcs</td>
            <td>500 – 1,000 pcs</td>
          </tr>
          <tr>
            <td><strong>03</strong></td>
            <td><strong>Complete Candle Sticker &amp; Insert Kit (Items 3.1 to 3.6):</strong><br/>• 3.1 Universal Square Front Jar Crest (<code>57 × 57 mm</code> BOPP + Gold Foil)<br/>• 3.2 L-Wrap Box Corner Scent Bands (<code>89 × 23 mm</code> across 10 Scents)<br/>• 3.3 Round Bottom Warning Labels (<code>50.8 mm</code> Dia across 10 Scents)<br/>• 3.4 Round Gold <code>QC #1 SEAL</code> (<code>25.4 mm</code>) + 3.5 Dust Cover (<code>72 mm</code>) + 3.6 Atelier Card (<code>85 × 85 mm</code>)</td>
            <td><code>57×57 mm</code>, <code>89×23 mm</code>, <code>50.8 mm</code>, <code>25.4 mm</code>, <code>72 mm</code>, <code>85×85 mm</code></td>
            <td>300 – 500 sets</td>
            <td>1,000 – 2,500 sets</td>
          </tr>
          <tr>
            <td><strong>04</strong></td>
            <td><strong>8 fl oz (236–250 mL) Body Wash Bottles + Lockable Brushed Gold Pumps + Waterproof Wrap Labels</strong> (50% Matte Black / 50% Frosted Ivory)</td>
            <td><code>61 mm OD × 171 mm H</code> + <code>165 × 89 mm</code> Label</td>
            <td>200 – 300 pcs</td>
            <td>500 – 1,000 pcs</td>
          </tr>
          <tr>
            <td><strong>05</strong></td>
            <td><strong>$108 Deluxe 3-Cavity Rigid Magnetic Gift Boxes + Die-Cut EVA Foam</strong> (50% Men's Matte Black / 50% Women's Warm Ivory)</td>
            <td><code>292 × 203 × 102 mm</code> (3-Cavity EVA Foam)</td>
            <td>100 – 200 pcs</td>
            <td>300 – 500 pcs</td>
          </tr>
          <tr>
            <td><strong>06</strong></td>
            <td><strong>Empty Magnetic Collector Boxes + EVA Foam for 3.0" &amp; 2.0" Pucks</strong> (Item 6.1 Single Puck Box + Item 6.2 Twin Mini Puck Box — <em>Boxes Only</em>)</td>
            <td><code>107 × 107 × 46 mm</code> &amp; <code>140 × 81 × 41 mm</code></td>
            <td>200 – 300 pcs each</td>
            <td>500 – 1,000 pcs each</td>
          </tr>
        </tbody>
      </table>

      <div class="alert-box" style="margin-top:2.5mm;">
        <strong>NEXT STEPS FOR SUPPLIER:</strong> Please confirm which items above you manufacture in-house vs. consolidate from partner factories, provide unit pricing for Tier 1 &amp; Tier 2, and quote <strong>1 Complete Pre-Production Sample Kit</strong> shipped via DHL/FedEx to <strong>Purcellville, Virginia 20132, USA</strong>.
      </div>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • https://puckandwick.com • Purcellville, Virginia 20132, USA</span>
      <span>Page 4 of 4 • Master Quotation Checklist</span>
    </div>
  </div>

</body>
</html>`;

async function buildPdf() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const outWorkspace = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf');
  const outArtifact = path.join(ARTIFACT_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf');

  await page.pdf({
    path: outWorkspace,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
  });

  fs.copyFileSync(outWorkspace, outArtifact);
  if (fs.existsSync(PREV_ARTIFACT_DIR)) {
    fs.copyFileSync(outWorkspace, path.join(PREV_ARTIFACT_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf'));
  }

  // Also render PNG previews of the 4 pages to verify layout visually
  const pages = await page.locator('.page').all();
  for (let i = 0; i < pages.length; i++) {
    const pPath = path.join(ARTIFACT_DIR, `alibaba-spec-page-${i + 1}.png`);
    await pages[i].screenshot({ path: pPath });
    if (fs.existsSync(PREV_ARTIFACT_DIR)) {
      fs.copyFileSync(pPath, path.join(PREV_ARTIFACT_DIR, `alibaba-spec-page-${i + 1}.png`));
    }
  }

  await browser.close();
  console.log('Generated:', outWorkspace);
}

buildPdf().catch((err) => {
  console.error(err);
  process.exit(1);
});
