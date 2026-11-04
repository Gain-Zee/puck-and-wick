import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const DESKTOP_DIR = '/Users/georgiiskrenov/Desktop';
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

function renderCandleCrestSvg(isIvory = false, sizePx = 138) {
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isIvory ? '#9A7B3E' : '#C8B078';
  const textCol = isIvory ? '#8C6C30' : '#D5BE87';
  return `
    <svg viewBox="0 0 500 500" width="${sizePx}" height="${sizePx}" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,0.35);">
      <rect x="0" y="0" width="500" height="500" fill="${bg}" />
      <!-- Single clean gold border matching shelf-candle-locker-room-mint.jpg & shelf-candle-cashmere-white-tea.jpg -->
      <rect x="44" y="44" width="412" height="412" fill="none" stroke="${stroke}" stroke-width="3.2" />
      <!-- Compact crossed hockey sticks w/ subtle connected blades + flame -->
      <g transform="translate(250, 184) scale(0.76)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="${stroke}" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="${bg}" opacity="0.55" />
      </g>
      <!-- Slender serif matching inventory candle labels with wide margins on left of P and right of K -->
      <text x="250" y="278" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-weight="600" letter-spacing="2.8" fill="${textCol}">PUCK &amp; WICK</text>
      <text x="250" y="322" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" fill="${textCol}" opacity="0.92">LOUDOUN COUNTY, VA</text>
      <text x="250" y="350" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.2" font-weight="600" letter-spacing="4.8" fill="${textCol}" opacity="0.86">USA</text>
    </svg>
  `;
}

function renderBodyWashCrestSvg(isIvory = false) {
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isIvory ? '#9A7B3E' : '#C8B078';
  const textCol = isIvory ? '#8C6C30' : '#D5BE87';
  const exclusiveText = isIvory ? 'SANCTUARY EXCLUSIVE' : 'ATHLETE EXCLUSIVE';
  return `
    <svg viewBox="0 0 500 650" width="114" height="148" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,0.35);">
      <rect x="0" y="0" width="500" height="650" fill="${bg}" />
      <!-- Single clean gold border -->
      <rect x="44" y="44" width="412" height="562" fill="none" stroke="${stroke}" stroke-width="3.2" />
      <!-- Compact crossed hockey sticks w/ subtle connected blades + flame -->
      <g transform="translate(250, 174) scale(0.76)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="${stroke}" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="${bg}" opacity="0.55" />
      </g>
      <!-- Generous vertical & horizontal breathing room -->
      <text x="250" y="268" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-weight="600" letter-spacing="2.8" fill="${textCol}">PUCK &amp; WICK</text>
      <text x="250" y="314" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" fill="${textCol}" opacity="0.92">LOUDOUN COUNTY, VA</text>
      <text x="250" y="344" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.2" font-weight="600" letter-spacing="4.8" fill="${textCol}" opacity="0.86">USA</text>
      <line x1="150" y1="394" x2="350" y2="394" stroke="${stroke}" stroke-width="1.2" opacity="0.45" />
      <text x="250" y="452" text-anchor="middle" font-family="'Inter', sans-serif" font-size="17" font-weight="800" stroke="${textCol}" stroke-width="0.4" letter-spacing="4.2" fill="${textCol}">${exclusiveText}</text>
      <text x="250" y="544" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="600" letter-spacing="2.2" fill="${textCol}" opacity="0.85">ZEOCARB-98™ • 8 FL OZ / 236 ML</text>
    </svg>
  `;
}

function renderDeluxeBoxLidSvg({ isIvory = false, subtitle = 'ATHLETE EXCLUSIVE' } = {}) {
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isIvory ? '#9A7B3E' : '#C8B078';
  const textCol = isIvory ? '#8C6C30' : '#D5BE87';
  const borderCol = isIvory ? '#D8CEBE' : '#2C3038';
  const isLong = subtitle.length > 22;
  const subFontSize = isLong ? '12.5' : (subtitle.length > 19 ? '13.5' : '14.5');
  const subSpacing = isLong ? '3.4' : (subtitle.length > 19 ? '4.0' : '4.6');
  return `
    <svg viewBox="0 0 640 460" width="194" height="140" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:5px;border:1px solid ${borderCol};box-shadow:0 4px 14px rgba(0,0,0,0.35);">
      <rect x="0" y="0" width="640" height="460" fill="${bg}" />
      <!-- Master Crest Lockup kept together on top (Emblem + PUCK & WICK + LOUDOUN COUNTY, VA + USA), Product Title underneath -->
      <g transform="translate(320, 140) scale(0.84)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="${stroke}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="${stroke}" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="${bg}" opacity="0.55" />
      </g>
      <text x="320" y="232" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="40" font-weight="600" letter-spacing="3.5" fill="${textCol}">PUCK &amp; WICK</text>
      <text x="320" y="264" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" fill="${textCol}" opacity="0.90">LOUDOUN COUNTY, VA</text>
      <text x="320" y="286" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.2" font-weight="600" letter-spacing="4.8" fill="${textCol}" opacity="0.84">USA</text>
      <text x="320" y="336" text-anchor="middle" font-family="'Inter', sans-serif" font-size="${subFontSize}" font-weight="700" letter-spacing="${subSpacing}" fill="${textCol}">${subtitle}</text>
    </svg>
  `;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Puck & Wick™ — Master Packaging, Vessel & Sticker Specification Book</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
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
      padding: 6.5mm 10.5mm;
      page-break-after: always;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
      overflow: hidden;
    }
    .page.dark-ref-page {
      background: #111215;
      color: #F5F1E8;
      padding: 5.5mm 9mm;
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
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 14pt;
      font-weight: 700;
      letter-spacing: 2.2px;
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
    /* Styles for Page 2: Master Label & Foil Reference Sheet */
    .ref-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #C8A45D;
      padding-bottom: 1.8mm;
    }
    .ref-header h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 15.5pt;
      letter-spacing: 1.8px;
      color: #E5C878;
      font-weight: 700;
    }
    .ref-header p {
      font-size: 6.5pt;
      color: #B9B2A3;
      letter-spacing: 0.7px;
      margin-top: 0.6mm;
      text-transform: uppercase;
    }
    .ref-badge {
      background: #1D1F24;
      border: 1px solid #C8A45D;
      padding: 1.4mm 2.8mm;
      border-radius: 4px;
      text-align: right;
      font-size: 6.8pt;
      line-height: 1.3;
      color: #E5C878;
      white-space: nowrap;
    }
    .ref-section {
      margin-top: 1.5mm;
    }
    .ref-section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1A1C21;
      border-left: 3px solid #C8A45D;
      padding: 1mm 2.6mm;
      margin-bottom: 1.4mm;
    }
    .ref-section-title h2 {
      font-size: 7.6pt;
      font-weight: 700;
      letter-spacing: 0.7px;
      text-transform: uppercase;
      color: #F5F1E8;
    }
    .ref-section-title span {
      font-size: 6.2pt;
      color: #D8B778;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .ref-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5mm;
    }
    .ref-card {
      background: #181A1F;
      border: 1px solid #2C3038;
      border-radius: 6px;
      padding: 1.8mm 2.5mm;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .ref-art-stage {
      width: 100%;
      height: 38mm;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, #242730 0%, #14161A 100%);
      border-radius: 4px;
      border: 1px solid #252830;
      padding: 1.2mm;
    }
    .ref-card-meta {
      width: 100%;
      margin-top: 1.1mm;
      font-size: 6.2pt;
      line-height: 1.32;
      color: #CCC5B7;
    }
    .ref-card-meta strong {
      color: #E5C88B;
      font-size: 6.7pt;
      display: block;
      margin-bottom: 0.2mm;
    }
    .ref-footer {
      border-top: 1px solid #2C3038;
      padding-top: 1.2mm;
      display: flex;
      justify-content: space-between;
      font-size: 6.5pt;
      color: #8E887C;
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
          Prepared for Alibaba Turnkey Packaging &amp; Label Partner • Page 1 of 5
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
            <td><strong>A. Men's Athlete Collection</strong><br/><em>(+ Universal Odor Puck Boxes)</em></td>
            <td><span class="swatch" style="background:#0B0C0E;"></span><strong>Matte Obsidian Black</strong><br/>HEX <code>#0B0C0E</code> / Pantone Black 6 C (Velvet Soft-Touch Matte)</td>
            <td><span class="swatch" style="background:#D4AF37;"></span><strong>Brushed Champagne-Gold</strong><br/>HEX <code>#D4AF37</code> / <code>#E5C878</code> (Metallic Gold Hot-Foil &amp; Brushed Gold Metal)</td>
            <td>• 7 Soy Candle Scents<br/>• 1 Men's 8 oz Body Wash<br/>• 1 Men's 3-Piece Deluxe Box<br/>• 2 Universal Odor Puck Boxes</td>
          </tr>
          <tr>
            <td><strong>B. Women's Sanctuary Line</strong></td>
            <td><span class="swatch" style="background:#FAF5EB;"></span><strong>Frosted Warm Alabaster-Ivory</strong><br/>HEX <code>#FAF5EB</code> / Warm Cream-Ivory (Soft Matte / Frosted)</td>
            <td><span class="swatch" style="background:#C8A050;"></span><strong>Brushed Champagne-Gold</strong><br/>HEX <code>#C8A050</code> / <code>#E5C878</code> (Warm Champagne-Gold Foil &amp; Metal)</td>
            <td>• 3 Soy Candle Scents<br/>• 1 Women's 8 oz Body Wash<br/>• 1 Women's 3-Piece Deluxe Box</td>
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
            <td><code>1200gsm</code> rigid greyboard wrapped in <code>157gsm</code> soft-touch matte paper with anti-scratch lamination + <strong>Exposed Metallic Brushed-Gold Inner Shoulder Neck</strong>.<br/>• <strong>Bottom EVA Foam Pad:</strong> <code>12 mm</code> thick die-cut EVA base ring holds jar dead-center.<br/>• <strong>Universal Box Print (No Scent Name on Box!):</strong><br/>&nbsp;&nbsp;- <em>Front:</em> Single Thin Gold Foil Square Frame + Master Crest (<code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>)<br/>&nbsp;&nbsp;- <em>Back:</em> Minimal Gold Foil Stamp: <code>EST. • 2026 • PURCELLVILLE, VA</code><br/>&nbsp;&nbsp;- <em>Top Roof:</em> Gold Foil Monogram: <code>P &amp; W</code></td>
            <td><strong>1) Men's Box:</strong> Matte Black (<code>#0B0C0E</code>) + Gold Foil<br/><strong>2) Women's Box:</strong> Warm Ivory (<code>#FAF5EB</code>) + Gold Foil</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 1 of 5 • Dimensions in Inches &amp; Millimeters (mm)</span>
    </div>
  </div>

  <!-- ==================== PAGE 2: MASTER LABEL & FOIL STAMP REFERENCE SHEET (1A/1B, 2A/2B, 3A-3D) ==================== -->
  <div class="page dark-ref-page">
    <div>
      <div class="ref-header">
        <div>
          <h1>PUCK &amp; WICK™ — MASTER LABEL &amp; FOIL REFERENCE SHEET</h1>
          <p>Approved Production Artwork for Candles (1A/1B), Body Wash (2A/2B), Collector Boxes (3A/3B), and Odor Puck Boxes (3C/3D)</p>
        </div>
        <div class="ref-badge">
          <strong>MASTER ARTWORK SPEC</strong><br/>
          Page 2 of 5 • Loudoun County, VA
        </div>
      </div>

      <!-- ROW 1: 10 OZ CANDLE FRONT LABELS -->
      <div class="ref-section">
        <div class="ref-section-title">
          <h2>01. 10 oz Candle Jar Front Labels (2.25" × 2.25" / 57 mm × 57 mm Square) — APPROVED</h2>
          <span>ALREADY ON ALL 10 STANDALONE CANDLES IN INVENTORY • USED FOR CANDLES INSIDE GIFT BOXES</span>
        </div>
        <div class="ref-grid-2">
          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderCandleCrestSvg(false, 138)}
            </div>
            <div class="ref-card-meta">
              <strong>1A. Men's 10 oz Candle Front Label (Matte Obsidian Black + Gold Foil)</strong>
              • Exact match to <code>shelf-candle-locker-room-mint.jpg</code>: single thin gold border, compact sticks/flame, wide margins left of <code>P</code> and right of <code>K</code>.
            </div>
          </div>

          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderCandleCrestSvg(true, 138)}
            </div>
            <div class="ref-card-meta">
              <strong>1B. Women's 10 oz Candle Front Label (Warm Alabaster-Ivory + Gold Foil)</strong>
              • Exact match to <code>shelf-candle-cashmere-white-tea.jpg</code>: single thin gold border, compact sticks/flame, wide margins left of <code>P</code> and right of <code>K</code>.
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 2: 8 FL OZ BODY WASH FRONT LABELS -->
      <div class="ref-section">
        <div class="ref-section-title">
          <h2>02. 8 fl oz (236 mL) Body Wash Front Bottle Labels — APPROVED</h2>
          <span>SINGLE THIN GOLD BORDER • SPACED-OUT TYPOGRAPHY • NO TEXT ON BOTTOM GLASS OF BOTTLE</span>
        </div>
        <div class="ref-grid-2">
          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderBodyWashCrestSvg(false)}
            </div>
            <div class="ref-card-meta">
              <strong>2A. Men's "Athlete Exclusive" Body Wash Front Label (Matte Black + Gold Foil)</strong>
              • Single gold border • Master Crest + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> + divider + <code>ATHLETE EXCLUSIVE</code> + <code>ZEOCARB-98™ • 8 FL OZ / 236 ML</code>.
            </div>
          </div>

          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderBodyWashCrestSvg(true)}
            </div>
            <div class="ref-card-meta">
              <strong>2B. Women's "Sanctuary Exclusive" Body Wash Front Label (Warm Ivory + Gold Foil)</strong>
              • Single gold border • Master Crest + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> + divider + <code>SANCTUARY EXCLUSIVE</code> + <code>ZEOCARB-98™ • 8 FL OZ / 236 ML</code>.
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 3: CLOSED EXTERIOR BOX LIDS (3A/3B COLLECTOR BOXES + 3C/3D ODOR PUCK BOXES) -->
      <div class="ref-section">
        <div class="ref-section-title">
          <h2>03. Exterior Closed Box Top Lid Gold Foil Stamps (3-Piece Boxes &amp; Odor Puck Boxes)</h2>
          <span>EXTERIOR TOP LID ONLY • WHEN OPEN: INSIDE LID &amp; INTERIOR EVA FOAM HAVE ZERO LOGOS / ZERO TEXT</span>
        </div>
        <div class="ref-grid-2">
          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ATHLETE EXCLUSIVE' })}
            </div>
            <div class="ref-card-meta">
              <strong>3A. Men's 3-Piece Collector Box Top Lid (Matte Obsidian Black + Gold Foil)</strong>
              • Borderless gold foil stamp: Master Crest locked together on top (Emblem &rarr; <code>PUCK &amp; WICK</code> &rarr; <code>LOUDOUN COUNTY, VA</code> &rarr; <code>USA</code>) + <code>ATHLETE EXCLUSIVE</code> underneath.
            </div>
          </div>

          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: true, subtitle: 'SANCTUARY EXCLUSIVE' })}
            </div>
            <div class="ref-card-meta">
              <strong>3B. Women's 3-Piece Collector Box Top Lid (Warm Alabaster-Ivory + Gold Foil)</strong>
              • Borderless gold foil stamp: Master Crest locked together on top (Emblem &rarr; <code>PUCK &amp; WICK</code> &rarr; <code>LOUDOUN COUNTY, VA</code> &rarr; <code>USA</code>) + <code>SANCTUARY EXCLUSIVE</code> underneath.
            </div>
          </div>

          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ZEOCARB-98™ ODOR PUCK' })}
            </div>
            <div class="ref-card-meta">
              <strong>3C. 3.0" Single Odor Puck Box Top Lid (Matte Obsidian Black + Gold Foil ONLY)</strong>
              • Universal Black/Gold colorway only • Master Crest locked together on top + <code>ZEOCARB-98™ ODOR PUCK</code> underneath. Inside lid is 100% blank.
            </div>
          </div>

          <div class="ref-card">
            <div class="ref-art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ZEOCARB-98™ ODOR MINI PUCKS' })}
            </div>
            <div class="ref-card-meta">
              <strong>3D. 2.0" Mini Pair Odor Puck Box Top Lid (Matte Obsidian Black + Gold Foil ONLY)</strong>
              • Universal Black/Gold colorway only • Master Crest locked together on top + <code>ZEOCARB-98™ ODOR MINI PUCKS</code> underneath. Inside lid is 100% blank.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ref-footer">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Master Label &amp; Foil Stamp Reference Sheet (v11 — Complete Production Spec)</span>
      <span>Page 2 of 5 • Approved Reference for Manufacturing &amp; Packaging Production</span>
    </div>
  </div>

  <!-- ==================== PAGE 3: ALL STICKERS, LABELS, DUST COVERS & ATELIER CARDS ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Section 03 • Complete Sticker, Label, Wax Dust Cover &amp; Atelier Card Specifications</div>
        </div>
        <div class="doc-badge">
          <strong>STICKERS, LABELS &amp; PRINT INSERTS</strong><br/>
          Page 3 of 5
        </div>
      </div>

      <div class="alert-box" style="margin-top:3mm;">
        <strong>WHY OUR STICKER SYSTEM IS SO SIMPLE TO PRODUCE:</strong> Every candle jar uses a <strong>100% Universal Square Front Crest Sticker (Item 3.1 / Specs 1A &amp; 1B on Page 2)</strong> with NO scent name on the glass jar! The individual scent name lives ONLY on the <strong>L-Wrap Box Corner Sticker Band (Item 3.2)</strong> and the <strong>2.0" Round Bottom Warning Sticker (Item 3.3)</strong>.
      </div>

      <div class="section-header">
        <h2>03. Candle Stickers, Labels, Dust Covers &amp; Insert Cards (6 Print Items)</h2>
        <span>WATERPROOF BOPP + GOLD HOT-FOIL</span>
      </div>

      <!-- VISUAL PREVIEW OF CRESTS & ATELIER CARDS -->
      <div style="display:grid;grid-template-columns: 1fr 1fr 1.25fr 1.25fr;gap:3mm;margin-bottom:2.5mm;align-items:center;">
        <div class="card-box" style="text-align:center;padding:2mm;">
          <div style="display:flex;justify-content:center;margin-bottom:1.5mm;">${renderCandleCrestSvg(false, 96)}</div>
          <strong>3.1A Men's Universal Jar Crest (1A)</strong><br/>
          <span><code>2.25" × 2.25"</code> (<code>57 × 57 mm</code>)<br/>Matte Black BOPP + Single Gold Border</span>
        </div>
        <div class="card-box" style="text-align:center;padding:2mm;">
          <div style="display:flex;justify-content:center;margin-bottom:1.5mm;">${renderCandleCrestSvg(true, 96)}</div>
          <strong>3.1B Women's Universal Jar Crest (1B)</strong><br/>
          <span><code>2.25" × 2.25"</code> (<code>57 × 57 mm</code>)<br/>Matte Ivory BOPP + Single Gold Border</span>
        </div>
        <div class="photo-card">
          <img src="${photos.atelierMen}" alt="Men's Atelier Card" style="height:29mm;" />
          <div class="photo-cap"><strong>3.6A Men's 3.35"×3.35" Atelier Card</strong>Double-Sided 400gsm Cardstock</div>
        </div>
        <div class="photo-card">
          <img src="${photos.atelierWomen}" alt="Women's Atelier Card" style="height:29mm;" />
          <div class="photo-cap"><strong>3.6B Women's 3.35"×3.35" Atelier Card</strong>Double-Sided 400gsm Cardstock</div>
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
            <td><strong>3.1 Universal Square Front Jar Crest Sticker (Specs 1A / 1B)</strong><br/><em>(Applied to Front of Glass Jar)</em></td>
            <td><strong>Square:</strong><br/><code>2.25" W × 2.25" H</code><br/>(<code>57.15 mm × 57.15 mm</code>)</td>
            <td>Waterproof, oil-resistant <strong>Soft-Touch Matte BOPP Vinyl</strong> with permanent glass adhesive + <strong>Metallic Gold Hot-Foil Stamping</strong>.<br/>• <strong>Artwork:</strong> <strong>Single thin gold square border</strong> (no double border) + compact Crossed Hockey Sticks (w/ subtle connected blades) &amp; Flame + slender serif <code>PUCK &amp; WICK</code> (with generous margins left of <code>P</code> and right of <code>K</code>) + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> centered at bottom. <strong>(NO scent name on jar label!)</strong></td>
            <td><strong>Only 2 Universal SKUs:</strong><br/>• 1A Men's Matte Black<br/>• 1B Women's Matte Ivory</td>
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
              <strong>Vector Print Files Ready:</strong> Refer to <strong>Page 2 (Master Label &amp; Foil Reference Sheet)</strong> for exact visual proportions of <code>1A/1B</code>, <code>2A/2B</code>, and <code>3A–3D</code>.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 3 of 5 • Stickers, Labels, Dust Covers &amp; Insert Cards</span>
    </div>
  </div>

  <!-- ==================== PAGE 4: 8 OZ BODY WASH BOTTLES/LABELS & DELUXE 3-CAVITY BOXES ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Sections 04 &amp; 05 • 8 fl oz Body Wash Pump Bottles &amp; Deluxe 3-Cavity Collector Boxes</div>
        </div>
        <div class="doc-badge">
          <strong>BODY WASH BOTTLES &amp; DELUXE GIFT BOXES</strong><br/>
          Page 4 of 5
        </div>
      </div>

      <!-- SECTION 4: 8 FL OZ BODY WASH PUMP BOTTLES & WATERPROOF LABELS -->
      <div class="section-header">
        <h2>04. 8 fl oz (236 mL / 250 mL) Body Wash Bottles, Lockable Gold Pumps &amp; Labels</h2>
        <span>1 SHARED BOTTLE MOLD • MEN'S (2A) &amp; WOMEN'S (2B)</span>
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
            <td>Heavy-wall cylindrical Apothecary / Boston Round bottle (Thick-Wall Heavy PET or Coated Glass). Both Men's and Women's use the <strong>exact same bottle mold</strong> so both fit into the exact same foam cavity inside the 3-Piece Collector Box! <strong>No printing directly on the bottom glass of the bottle.</strong></td>
            <td><strong>1) Men's:</strong> Smooth Matte Obsidian Black (<code>#0B0C0E</code>)<br/><strong>2) Women's:</strong> Frosted Warm Alabaster-Ivory (<code>#FAF5EB</code>)</td>
          </tr>
          <tr>
            <td><strong>4.2 Lockable Brushed Gold Dispenser Pump</strong></td>
            <td>• <strong>Neck Thread:</strong> <code>24-410</code><br/>• <strong>Dosage:</strong> <code>2.0 mL</code> per stroke<br/>• <strong>Locking:</strong> Twist-to-Lock Head</td>
            <td><strong>Brushed Champagne-Gold Anodized Aluminum / Metal-Sheathed Collar &amp; Pump Head</strong> with internal leak-proof shipping lock and dip tube trimmed to bottom corner of bottle.</td>
            <td><strong>1 Universal Pump</strong> fits both Men's &amp; Women's bottles</td>
          </tr>
          <tr>
            <td><strong>4.3 Shower-Proof Bottle Label (Specs 2A / 2B on Page 2)</strong></td>
            <td>• <strong>Wrap Label Size:</strong><br/><code>6.50" W × 3.50" H</code><br/>(<code>165 mm × 89 mm</code>)</td>
            <td>100% Waterproof, Steam/Shower-Proof <strong>Soft-Touch Matte BOPP Vinyl + Metallic Gold Hot-Foil Stamping</strong>:<br/>• <strong>Single Thin Gold Border on Front Panel:</strong> Compact Crossed Hockey Sticks &amp; Flame + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> + divider line + <code>ATHLETE EXCLUSIVE</code> (2A) or <code>SANCTUARY EXCLUSIVE</code> (2B) + <code>ZEOCARB-98™ • 8 FL OZ / 236 ML</code>.<br/>• <strong>Zero text on bottom bottle glass outside the single gold border.</strong></td>
            <td><strong>2 Label SKUs:</strong><br/>• 2A Men's Black/Gold<br/>• 2B Women's Ivory/Gold</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION 5: DELUXE 3-ITEM COLLECTOR BOXES & 3-CAVITY FOAM INSERTS -->
      <div class="section-header" style="margin-top:4mm;">
        <h2>05. Deluxe 3-Piece Collector Boxes &amp; 3-Cavity EVA Foam Inserts</h2>
        <span>100% IDENTICAL BOX &amp; 3-CAVITY FOAM DIELINE FOR MEN'S (3A) &amp; WOMEN'S (3B)</span>
      </div>

      <div class="photo-grid-4">
        <div class="photo-card tall">
          <img src="${photos.boxMenOpen}" alt="Men's Deluxe Box Open" />
          <div class="photo-cap"><strong>Men's 3-Piece Box (Open)</strong>Unbranded Clean Inside Lid &amp; 3-Cavity Foam</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxMenClosed}" alt="Men's Deluxe Box Closed" />
          <div class="photo-cap"><strong>Men's 3-Piece Box (Closed — Spec 3A)</strong>Master Crest + ATHLETE EXCLUSIVE Underneath</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxWomenOpen}" alt="Women's Deluxe Box Open" />
          <div class="photo-cap"><strong>Women's 3-Piece Box (Open)</strong>Unbranded Clean Inside Lid &amp; 3-Cavity Foam</div>
        </div>
        <div class="photo-card tall">
          <img src="${photos.boxWomenClosed}" alt="Women's Deluxe Box Closed" />
          <div class="photo-cap"><strong>Women's 3-Piece Box (Closed — Spec 3B)</strong>Master Crest + SANCTUARY EXCLUSIVE Underneath</div>
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
            <td><strong>5.1 Rigid Magnetic Front-Flap Gift Box (Specs 3A / 3B on Page 2)</strong></td>
            <td>• <strong>Outer Dimensions:</strong><br/><code>11.50" W × 8.00" D × 4.00" H</code><br/>(<code>292 mm × 203 mm × 102 mm</code>)<br/>• <strong>Board:</strong> <code>1200gsm–1400gsm</code></td>
            <td>Rigid book-style magnetic front-flap keepsake box (ships rigid or collapsible fold-flat w/ 3M corner tape &amp; concealed neodymium magnets).<br/>• <strong>Exterior Closed Top Lid ONLY (Specs 3A &amp; 3B):</strong> Borderless Gold Hot-Foil Master Crest locked together on top (Emblem + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>), with <code>ATHLETE EXCLUSIVE</code> (3A) or <code>SANCTUARY EXCLUSIVE</code> (3B) underneath.<br/>• <strong>Inside Lid &amp; Interior Foam:</strong> <strong>100% Clean &amp; Unbranded</strong> — Zero logos or text on the inside lid or foam.</td>
            <td><strong>1) Men's Box (3A):</strong> Matte Obsidian Black (<code>#0B0C0E</code>) + Gold Foil<br/><strong>2) Women's Box (3B):</strong> Warm Alabaster-Ivory (<code>#FAF5EB</code>) + Gold Foil</td>
          </tr>
          <tr>
            <td><strong>5.2 Precision Die-Cut 3-Cavity EVA Foam Insert</strong><br/><em>(Identical Cutouts in Both Boxes!)</em></td>
            <td>• <strong>Cavity 1 (Left — 10 oz Candle w/ Lid):</strong> <code>3.08" × 3.55"</code> (<code>78.5 × 90 mm</code>)<br/>• <strong>Cavity 2 (Center — 3.0" Odor Puck):</strong> <code>3.02" Dia × 1.02" D</code> (<code>76.5 × 26 mm</code>)<br/>• <strong>Cavity 3 (Right — 8 oz Body Wash):</strong> <code>2.42" W × 6.80" L</code> (<code>61.5 × 173 mm</code>)</td>
            <td>High-density EVA foam topped with soft velvet/suede flocking + finger-pull extraction notches on all 3 cavities.<br/>• <strong>100% Clean Unbranded Foam Surface:</strong><br/>&nbsp;&nbsp;- <strong>No Foil Stamp / No Logo / No Text on the EVA Foam!</strong> Only the individual products inside the cavities carry branding.<br/><em>(Note: Both Men's &amp; Women's boxes hold the universal Matte Black/Gold 3.0" Odor Puck in Cavity 2.)</em></td>
            <td><strong>1) Men's Foam:</strong> Charcoal Black Velvet EVA<br/><strong>2) Women's Foam:</strong> Warm Cream Suede EVA</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Turnkey Packaging, Vessel &amp; Sticker Specification Book</span>
      <span>Page 4 of 5 • 8 oz Body Wash Bottles &amp; Deluxe 3-Cavity Collector Boxes</span>
    </div>
  </div>

  <!-- ==================== PAGE 5: SMALL MAGNETIC PUCK BOXES (BOXES ONLY) + MASTER QUOTE TABLE ==================== -->
  <div class="page">
    <div>
      <div class="top-bar">
        <div>
          <div class="brand-title">PUCK &amp; WICK™</div>
          <div class="brand-sub">Section 06 &amp; Master Quotation Sheet • Empty Magnetic Puck Boxes &amp; Order Quantities</div>
        </div>
        <div class="doc-badge">
          <strong>EMPTY PUCK BOXES &amp; RFQ SUMMARY</strong><br/>
          Page 5 of 5
        </div>
      </div>

      <!-- SECTION 6: STANDALONE MAGNETIC COLLECTOR BOXES FOR THE ODOR PUCKS (BOXES & FOAM ONLY!) -->
      <div class="section-header" style="margin-top:3mm;">
        <h2>06. Standalone Magnetic Boxes &amp; Foam Inserts for Odor Pucks (Specs 3C &amp; 3D — Boxes Only)</h2>
        <span>UNIVERSAL MATTE BLACK + GOLD FOIL ONLY</span>
      </div>

      <div class="photo-grid-4">
        <div class="photo-card">
          <img src="${photos.puck3BoxOpen}" alt="3.0 Puck Box Open" />
          <div class="photo-cap"><strong>6.1 Single 3.0" Puck Box (Open)</strong>Unbranded Inside Lid &amp; Foam + 76.5mm Cavity</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck3BoxClosed}" alt="3.0 Puck Box Closed" />
          <div class="photo-cap"><strong>6.1 Single 3.0" Puck Box (Closed — 3C)</strong>Master Crest + ZEOCARB-98™ ODOR PUCK</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck2BoxOpen}" alt="2.0 Mini Pair Box Open" />
          <div class="photo-cap"><strong>6.2 Twin 2.0" Mini Puck Box (Open)</strong>Unbranded Inside Lid &amp; Foam + 2x 51.2mm Cavities</div>
        </div>
        <div class="photo-card">
          <img src="${photos.puck2BoxClosed}" alt="2.0 Mini Pair Box Closed" />
          <div class="photo-cap"><strong>6.2 Twin 2.0" Mini Puck Box (Closed — 3D)</strong>Master Crest + ZEOCARB-98™ ODOR MINI PUCKS</div>
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
            <td><strong>6.1 Empty Magnetic Box for 3.0" Odor Puck (Spec 3C on Page 2)</strong><br/><em>(Box &amp; Foam Insert Only)</em></td>
            <td>• <strong>Box Outer Size:</strong> <code>4.20" W × 4.20" D × 1.80" H</code> (<code>107 × 107 × 46 mm</code>)<br/>• <strong>1 Center Round Cavity:</strong> <code>3.02" Dia × 1.02" D</code> (<code>76.5 × 26 mm</code>)</td>
            <td><code>1200gsm</code> Rigid Matte-Black Magnetic Front-Flap Box.<br/>• <strong>Exterior Closed Top Lid ONLY (Spec 3C):</strong> Borderless Gold Hot-Foil Master Crest (<code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>) locked together on top, with <code>ZEOCARB-98™ ODOR PUCK</code> underneath.<br/>• <strong>Inside Lid &amp; Foam:</strong> <strong>100% Clean &amp; Unbranded</strong> (no inside lid text).<br/>• <strong>Foam:</strong> Charcoal EVA w/ 1 round <code>76.5 mm</code> cutout + finger notch.</td>
            <td><strong>1 Universal Box</strong> (Matte Black + Gold Foil ONLY)</td>
          </tr>
          <tr>
            <td><strong>6.2 Empty Dual-Cavity Magnetic Box for 2.0" Mini Pucks (Spec 3D on Page 2)</strong><br/><em>(Box &amp; Foam Insert Only)</em></td>
            <td>• <strong>Box Outer Size:</strong> <code>5.50" W × 3.20" D × 1.60" H</code> (<code>140 × 81 × 41 mm</code>)<br/>• <strong>2 Side-by-Side Round Cavities:</strong> <code>2.02" Dia × 0.80" D</code> each (<code>51.2 × 20.5 mm</code>)</td>
            <td><code>1200gsm</code> Rigid Matte-Black Magnetic Front-Flap Box.<br/>• <strong>Exterior Closed Top Lid ONLY (Spec 3D):</strong> Borderless Gold Hot-Foil Master Crest (<code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code>) locked together on top, with <code>ZEOCARB-98™ ODOR MINI PUCKS</code> underneath.<br/>• <strong>Inside Lid &amp; Foam:</strong> <strong>100% Clean &amp; Unbranded</strong> (no inside lid text).<br/>• <strong>Foam:</strong> Charcoal EVA w/ 2 round <code>51.2 mm</code> cutouts + finger notches.</td>
            <td><strong>1 Universal Box</strong> (Matte Black + Gold Foil ONLY)</td>
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
            <td><strong>Complete Candle Sticker &amp; Insert Kit (Items 3.1 to 3.6):</strong><br/>• 3.1 Universal Square Front Jar Crest (<code>57 × 57 mm</code> BOPP + Single Gold Border — Specs 1A/1B)<br/>• 3.2 L-Wrap Box Corner Scent Bands (<code>89 × 23 mm</code> across 10 Scents)<br/>• 3.3 Round Bottom Warning Labels (<code>50.8 mm</code> Dia across 10 Scents)<br/>• 3.4 Round Gold <code>QC #1 SEAL</code> (<code>25.4 mm</code>) + 3.5 Dust Cover (<code>72 mm</code>) + 3.6 Atelier Card (<code>85 × 85 mm</code>)</td>
            <td><code>57×57 mm</code>, <code>89×23 mm</code>, <code>50.8 mm</code>, <code>25.4 mm</code>, <code>72 mm</code>, <code>85×85 mm</code></td>
            <td>300 – 500 sets</td>
            <td>1,000 – 2,500 sets</td>
          </tr>
          <tr>
            <td><strong>04</strong></td>
            <td><strong>8 fl oz (236–250 mL) Body Wash Bottles + Lockable Brushed Gold Pumps + Waterproof Wrap Labels (Specs 2A/2B)</strong> (50% Matte Black / 50% Frosted Ivory)</td>
            <td><code>61 mm OD × 171 mm H</code> + <code>165 × 89 mm</code> Label</td>
            <td>200 – 300 pcs</td>
            <td>500 – 1,000 pcs</td>
          </tr>
          <tr>
            <td><strong>05</strong></td>
            <td><strong>Deluxe 3-Cavity Rigid Magnetic Gift Boxes + Die-Cut EVA Foam (Specs 3A/3B)</strong> (50% Men's Matte Black / 50% Women's Warm Ivory)</td>
            <td><code>292 × 203 × 102 mm</code> (3-Cavity EVA Foam)</td>
            <td>100 – 200 pcs</td>
            <td>300 – 500 pcs</td>
          </tr>
          <tr>
            <td><strong>06</strong></td>
            <td><strong>Empty Magnetic Collector Boxes + EVA Foam for 3.0" &amp; 2.0" Pucks (Specs 3C/3D)</strong> (Item 6.1 Single Puck Box + Item 6.2 Twin Mini Puck Box — <em>Universal Black/Gold Only</em>)</td>
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
      <span>Page 5 of 5 • Master Quotation Checklist</span>
    </div>
  </div>

</body>
</html>`;

async function buildPdf() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const outWorkspace = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf');
  const outDesktop = path.join(DESKTOP_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf');
  const outArtifact = path.join(ARTIFACT_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf');

  await page.pdf({
    path: outWorkspace,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
  });

  fs.copyFileSync(outWorkspace, outDesktop);
  fs.copyFileSync(outWorkspace, outArtifact);
  if (fs.existsSync(PREV_ARTIFACT_DIR)) {
    fs.copyFileSync(outWorkspace, path.join(PREV_ARTIFACT_DIR, 'Puck-and-Wick-Alibaba-Supplier-Master-Spec-Book.pdf'));
  }

  // Also copy the standalone Master Label Reference Sheet to Desktop so both files are on Desktop too
  const refSheetWorkspace = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Master-Label-Reference-Sheet.pdf');
  if (fs.existsSync(refSheetWorkspace)) {
    fs.copyFileSync(refSheetWorkspace, path.join(DESKTOP_DIR, 'Puck-and-Wick-Master-Label-Reference-Sheet.pdf'));
  }

  // Render PNG previews of all 5 pages with new versioned filenames to verify layout visually
  const pages = await page.locator('.page').all();
  for (let i = 0; i < pages.length; i++) {
    const pPathV3 = path.join(ARTIFACT_DIR, `alibaba-spec-page-${i + 1}-v3.png`);
    const pPath = path.join(ARTIFACT_DIR, `alibaba-spec-page-${i + 1}.png`);
    await pages[i].screenshot({ path: pPathV3 });
    fs.copyFileSync(pPathV3, pPath);
    if (fs.existsSync(PREV_ARTIFACT_DIR)) {
      fs.copyFileSync(pPathV3, path.join(PREV_ARTIFACT_DIR, `alibaba-spec-page-${i + 1}.png`));
    }
  }

  await browser.close();
  console.log('Generated 5-page Alibaba Supplier Master Spec Book:', outWorkspace, 'and synced to Desktop:', outDesktop);
}

buildPdf().catch((err) => {
  console.error(err);
  process.exit(1);
});
