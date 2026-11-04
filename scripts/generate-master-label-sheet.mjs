import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_DIR = path.resolve(__dirname, '..');
const DESKTOP_DIR = '/Users/georgiiskrenov/Desktop';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

function renderCandleCrestSvg(isIvory = false) {
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isIvory ? '#B8846E' : '#C8B078';
  const textCol = isIvory ? '#AD7A64' : '#D5BE87';
  return `
    <svg viewBox="0 0 500 500" width="136" height="136" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,0.35);">
      <rect x="0" y="0" width="500" height="500" fill="${bg}" />
      <!-- Single clean metallic border matching shelf-candle-locker-room-mint.jpg & shelf-candle-cashmere-white-tea.jpg -->
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
  const stroke = isIvory ? '#B8846E' : '#C8B078';
  const textCol = isIvory ? '#AD7A64' : '#D5BE87';
  const exclusiveText = isIvory ? 'SANCTUARY EXCLUSIVE' : 'ATHLETE EXCLUSIVE';
  return `
    <svg viewBox="0 0 500 650" width="112" height="145" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,0.35);">
      <rect x="0" y="0" width="500" height="650" fill="${bg}" />
      <!-- Single clean metallic border -->
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
  const stroke = isIvory ? '#B8846E' : '#C8B078';
  const textCol = isIvory ? '#AD7A64' : '#D5BE87';
  const borderCol = isIvory ? '#D8CEBE' : '#2C3038';
  const isLong = subtitle.length > 22;
  const subFontSize = isLong ? '12.5' : (subtitle.length > 19 ? '13.5' : '14.5');
  const subSpacing = isLong ? '3.4' : (subtitle.length > 19 ? '4.0' : '4.6');
  return `
    <svg viewBox="0 0 640 460" width="190" height="136" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:5px;border:1px solid ${borderCol};box-shadow:0 4px 14px rgba(0,0,0,0.35);">
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
  <title>Puck & Wick — Master Label & Foil Stamp Reference Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@500;600;700;800&display=swap');
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 210mm;
      height: 297mm;
      background: #111215;
      color: #F5F1E8;
      font-family: 'Inter', sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      overflow: hidden;
    }
    .page-sheet {
      width: 210mm;
      height: 297mm;
      padding: 5.5mm 9mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #111215;
      overflow: hidden;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #C8A45D;
      padding-bottom: 1.8mm;
    }
    .header h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 15.5pt;
      letter-spacing: 1.8px;
      color: #E5C878;
      font-weight: 700;
    }
    .header p {
      font-size: 6.5pt;
      color: #B9B2A3;
      letter-spacing: 0.7px;
      margin-top: 0.6mm;
      text-transform: uppercase;
    }
    .badge {
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
    .section {
      margin-top: 1.5mm;
    }
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1A1C21;
      border-left: 3px solid #C8A45D;
      padding: 1mm 2.6mm;
      margin-bottom: 1.4mm;
    }
    .section-title h2 {
      font-size: 7.6pt;
      font-weight: 700;
      letter-spacing: 0.7px;
      text-transform: uppercase;
      color: #F5F1E8;
    }
    .section-title span {
      font-size: 6.2pt;
      color: #D8B778;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5mm;
    }
    .card {
      background: #181A1F;
      border: 1px solid #2C3038;
      border-radius: 6px;
      padding: 1.8mm 2.5mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .art-stage {
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
    .card-meta {
      width: 100%;
      margin-top: 1.1mm;
      font-size: 6.2pt;
      line-height: 1.32;
      color: #CCC5B7;
    }
    .card-meta strong {
      color: #E5C88B;
      font-size: 6.7pt;
      display: block;
      margin-bottom: 0.2mm;
    }
    .footer {
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
  <div class="page-sheet">
    <div>
      <div class="header">
        <div>
          <h1>PUCK &amp; WICK™ — MASTER LABEL &amp; FOIL REFERENCE SHEET</h1>
          <p>Approved Production Artwork for Candles (1A/1B), Body Wash (2A/2B), Collector Boxes (3A/3B), and Odor Puck Boxes (3C/3D)</p>
        </div>
        <div class="badge">
          <strong>MASTER ARTWORK SPEC</strong><br/>
          Loudoun County, VA • USA
        </div>
      </div>

      <!-- ROW 1: 10 OZ CANDLE FRONT LABELS -->
      <div class="section">
        <div class="section-title">
          <h2>01. 10 oz Candle Jar Front Labels (2.25" × 2.25" / 57 mm × 57 mm Square) — APPROVED</h2>
          <span>ALREADY ON ALL 10 STANDALONE CANDLES IN INVENTORY • USED FOR CANDLES INSIDE GIFT BOXES</span>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="art-stage">
              ${renderCandleCrestSvg(false)}
            </div>
            <div class="card-meta">
              <strong>1A. Men's 10 oz Candle Front Label (Matte Obsidian Black + Gold Foil)</strong>
              • Exact match to <code>shelf-candle-locker-room-mint.jpg</code>: single thin gold border, compact sticks/flame, wide margins left of <code>P</code> and right of <code>K</code>.
            </div>
          </div>

          <div class="card">
            <div class="art-stage">
              ${renderCandleCrestSvg(true)}
            </div>
            <div class="card-meta">
              <strong>1B. Women's 10 oz Candle Front Label (Warm Alabaster-Ivory + Gold Foil)</strong>
              • Exact match to <code>shelf-candle-cashmere-white-tea.jpg</code>: single thin gold border, compact sticks/flame, wide margins left of <code>P</code> and right of <code>K</code>.
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 2: 8 FL OZ BODY WASH FRONT LABELS -->
      <div class="section">
        <div class="section-title">
          <h2>02. 8 fl oz (236 mL) Body Wash Front Bottle Labels — APPROVED</h2>
          <span>SINGLE THIN GOLD BORDER • SPACED-OUT TYPOGRAPHY • NO TEXT ON BOTTOM GLASS OF BOTTLE</span>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="art-stage">
              ${renderBodyWashCrestSvg(false)}
            </div>
            <div class="card-meta">
              <strong>2A. Men's "Athlete Exclusive" Body Wash Front Label (Matte Black + Gold Foil)</strong>
              • Single gold border • Master Crest + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> + divider + <code>ATHLETE EXCLUSIVE</code> + <code>ZEOCARB-98™ • 8 FL OZ / 236 ML</code>.
            </div>
          </div>

          <div class="card">
            <div class="art-stage">
              ${renderBodyWashCrestSvg(true)}
            </div>
            <div class="card-meta">
              <strong>2B. Women's "Sanctuary Exclusive" Body Wash Front Label (Warm Ivory + Gold Foil)</strong>
              • Single gold border • Master Crest + <code>PUCK &amp; WICK</code> + <code>LOUDOUN COUNTY, VA</code> + <code>USA</code> + divider + <code>SANCTUARY EXCLUSIVE</code> + <code>ZEOCARB-98™ • 8 FL OZ / 236 ML</code>.
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 3: CLOSED EXTERIOR BOX LIDS (3A/3B COLLECTOR BOXES + 3C/3D ODOR PUCK BOXES) -->
      <div class="section">
        <div class="section-title">
          <h2>03. Exterior Closed Box Top Lid Gold Foil Stamps (3-Piece Boxes &amp; Odor Puck Boxes)</h2>
          <span>EXTERIOR TOP LID ONLY • WHEN OPEN: INSIDE LID &amp; INTERIOR EVA FOAM HAVE ZERO LOGOS / ZERO TEXT</span>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ATHLETE EXCLUSIVE' })}
            </div>
            <div class="card-meta">
              <strong>3A. Men's 3-Piece Collector Box Top Lid (Matte Obsidian Black + Gold Foil)</strong>
              • Borderless gold foil stamp: Master Crest locked together on top (Emblem &rarr; <code>PUCK &amp; WICK</code> &rarr; <code>LOUDOUN COUNTY, VA</code> &rarr; <code>USA</code>) + <code>ATHLETE EXCLUSIVE</code> underneath.
            </div>
          </div>

          <div class="card">
            <div class="art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: true, subtitle: 'SANCTUARY EXCLUSIVE' })}
            </div>
            <div class="card-meta">
              <strong>3B. Women's 3-Piece Collector Box Top Lid (Warm Alabaster-Ivory + Gold Foil)</strong>
              • Borderless gold foil stamp: Master Crest locked together on top (Emblem &rarr; <code>PUCK &amp; WICK</code> &rarr; <code>LOUDOUN COUNTY, VA</code> &rarr; <code>USA</code>) + <code>SANCTUARY EXCLUSIVE</code> underneath.
            </div>
          </div>

          <div class="card">
            <div class="art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ZEOCARB-98™ ODOR PUCK' })}
            </div>
            <div class="card-meta">
              <strong>3C. 3.0" Single Odor Puck Box Top Lid (Matte Obsidian Black + Gold Foil ONLY)</strong>
              • Universal Black/Gold colorway only • Master Crest locked together on top + <code>ZEOCARB-98™ ODOR PUCK</code> underneath. Inside lid is 100% blank.
            </div>
          </div>

          <div class="card">
            <div class="art-stage">
              ${renderDeluxeBoxLidSvg({ isIvory: false, subtitle: 'ZEOCARB-98™ ODOR MINI PUCKS' })}
            </div>
            <div class="card-meta">
              <strong>3D. 2.0" Mini Pair Odor Puck Box Top Lid (Matte Obsidian Black + Gold Foil ONLY)</strong>
              • Universal Black/Gold colorway only • Master Crest locked together on top + <code>ZEOCARB-98™ ODOR MINI PUCKS</code> underneath. Inside lid is 100% blank.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span><strong>Puck &amp; Wick™ (USA)</strong> • Master Label &amp; Foil Stamp Reference Sheet (v12 — Complete Production Spec)</span>
      <span>Approved Reference for Manufacturing &amp; Packaging Production</span>
    </div>
  </div>
</body>
</html>`;

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const pdfWorkspace = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Master-Label-Reference-Sheet.pdf');
  const pdfDesktop = path.join(DESKTOP_DIR, 'Puck-and-Wick-Master-Label-Reference-Sheet.pdf');
  const pdfArtifact = path.join(ARTIFACT_DIR, 'Puck-and-Wick-Master-Label-Reference-Sheet.pdf');
  const pngArtifact = path.join(ARTIFACT_DIR, 'master-label-reference-sheet-v12.png');

  await page.pdf({
    path: pdfWorkspace,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
  });
  fs.copyFileSync(pdfWorkspace, pdfDesktop);
  fs.copyFileSync(pdfWorkspace, pdfArtifact);
  await page.locator('.page-sheet').screenshot({ path: pngArtifact });
  await browser.close();
  console.log('Updated 1-Page Master Label Reference Sheet v12:', pdfWorkspace, 'and synced to Desktop:', pdfDesktop);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
