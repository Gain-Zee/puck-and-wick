import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const MR_PRINT_ROOT = '/Users/georgiiskrenov/Desktop/MR-PRINT-PURCELLVILLE-200-LABEL-ORDER';
const DIR_MAIN = path.join(MR_PRINT_ROOT, '01-Main-Universal-Front-Labels-2.25x2.25in (100 Total)');
const DIR_BOTTOM = path.join(MR_PRINT_ROOT, '02-Round-Bottom-Scent-Warning-Labels-2in-Circle (100 Total)');

// Clean and recreate so ONLY the 3 active scents are in the folder
if (fs.existsSync(MR_PRINT_ROOT)) {
  fs.rmSync(MR_PRINT_ROOT, { recursive: true, force: true });
}
fs.mkdirSync(DIR_MAIN, { recursive: true });
fs.mkdirSync(DIR_BOTTOM, { recursive: true });

// Only the 3 active scents being poured right now (40 Balsam Fir + 30 Top Shelf + 30 Fresh Cut = 100 Total)
const SCENTS = [
  {
    num: '01',
    slug: '01-Balsam-Fir-40pcs',
    name: 'BALSAM FIR',
    kicker: 'SEASONAL COLLAB • BATCH #098',
    notes: 'Fraser Pine • Resinous Balsam • Cedar Bark',
    wick: 'LX 18',
    theme: 'obsidian',
    qty: 40
  },
  {
    num: '02',
    slug: '02-Top-Shelf-30pcs',
    name: 'TOP SHELF',
    kicker: 'SIGNATURE SCENT • BATCH #098',
    notes: 'Crimson Saffron • White Cedar • Amberwood',
    wick: 'LX 18',
    theme: 'obsidian',
    qty: 30
  },
  {
    num: '03',
    slug: '03-Fresh-Cut-30pcs',
    name: 'FRESH CUT',
    kicker: 'SIGNATURE SCENT • BATCH #098',
    notes: 'Italian Bergamot • Hinoki Wood • Vetiver',
    wick: 'LX 16',
    theme: 'obsidian',
    qty: 30
  }
];

// 1A (Men's Matte Obsidian Black & Gold) and 1B (Women's Warm Alabaster-Ivory & Gold) from the Master Label Reference Sheet
function renderMainSquareSvg(isIvory = false, sizeAttr = 'width="100%" height="100%"') {
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isIvory ? '#9A7B3E' : '#C8B078';
  const textCol = isIvory ? '#8C6C30' : '#D5BE87';

  return `<svg viewBox="0 0 500 500" ${sizeAttr} xmlns="http://www.w3.org/2000/svg" style="display:block;">
  <rect x="0" y="0" width="500" height="500" fill="${bg}" />
  <!-- Single clean gold border -->
  <rect x="44" y="44" width="412" height="412" fill="none" stroke="${stroke}" stroke-width="3.2" />
  <!-- Compact crossed hockey sticks w/ connected hockey blades + flame -->
  <g transform="translate(250, 184) scale(0.76)">
    <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="${stroke}" />
    <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="${bg}" opacity="0.55" />
  </g>
  <text x="250" y="278" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="38" font-weight="600" letter-spacing="2.8" fill="${textCol}">PUCK &amp; WICK</text>
  <text x="250" y="322" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" fill="${textCol}" opacity="0.92">LOUDOUN COUNTY, VA</text>
  <text x="250" y="350" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="9.2" font-weight="600" letter-spacing="4.8" fill="${textCol}" opacity="0.86">USA</text>
</svg>`;
}

// 2.0" Round Bottom Scent & Warning Label WITH Weight (10 OZ VESSEL / 8.5 OZ / 240G NET FILL) & Connected Hockey Blades
// All White Background (#FFFFFF) for crisp printing on White Matte Sticker Stock
function renderBottomScentSvg(scent, uid = scent.num, isWhiteBg = true, sizeAttr = 'width="100%" height="100%"') {
  const bgFill = isWhiteBg ? '#FFFFFF' : '#0B0C0F';
  const outerRing = isWhiteBg ? '#9C7325' : '#D4AF37';
  const innerRing = isWhiteBg ? 'rgba(156,115,37,0.42)' : 'rgba(212,175,55,0.40)';
  const primaryText = isWhiteBg ? '#141210' : '#F9F6F0';
  const goldText = isWhiteBg ? '#8A621C' : '#E5C878';
  const mutedText = isWhiteBg ? '#4A4338' : '#A8A298';
  const badgeBg = isWhiteBg ? 'rgba(156,115,37,0.09)' : 'rgba(229,200,120,0.10)';
  const fontScale = scent.name.length > 18 ? 16.5 : scent.name.length > 14 ? 18.5 : 21;

  return `<svg viewBox="0 0 400 400" ${sizeAttr} xmlns="http://www.w3.org/2000/svg" style="display:block;">
  <defs>
    <path id="topArc-${uid}" d="M 42,200 A 158,158 0 1,1 358,200" />
  </defs>
  <circle cx="200" cy="200" r="199" fill="${bgFill}" />
  <circle cx="200" cy="200" r="184" fill="none" stroke="${outerRing}" stroke-width="3.2" />
  <circle cx="200" cy="200" r="174" fill="none" stroke="${innerRing}" stroke-width="1.1" stroke-dasharray="3 3" />

  <text font-family="'Cinzel', Georgia, serif" font-size="9.2" font-weight="700" fill="${goldText}" letter-spacing="2.2">
    <textPath href="#topArc-${uid}" startOffset="50%" text-anchor="middle">
      PUCK &amp; WICK™ • LOUDOUN COUNTY, VA
    </textPath>
  </text>

  <!-- Connected Hockey Sticks with Blades + Flame -->
  <g transform="translate(200, 74)">
    <path d="M -15,-10 L 14,13 L 19.5,11" fill="none" stroke="${goldText}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 15,-10 L -14,13 L -19.5,11" fill="none" stroke="${goldText}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 0,0.5 C -3.5,-4.5 -5,-10.5 -2,-15.5 C -0.5,-18 0,-20 0,-21.5 C 0,-20 0.5,-18 2,-15.5 C 5,-10.5 3.5,-4.5 0,0.5 Z" fill="${goldText}" />
    <path d="M 0,-2 C -1.4,-4.5 -2,-8 -0.8,-11 C 0,-12.5 0.2,-12.5 0.8,-11 C 2,-8 1.4,-4.5 0,-2 Z" fill="${bgFill}" opacity="0.55" />
  </g>

  <rect x="98" y="96" width="204" height="19" rx="9.5" fill="${badgeBg}" stroke="${innerRing}" stroke-width="0.8" />
  <text x="200" y="109" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.0" font-weight="700" fill="${goldText}" letter-spacing="1.6">
    ${scent.kicker}
  </text>

  <text x="200" y="142" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="${fontScale}" font-weight="700" fill="${primaryText}" letter-spacing="2.0">
    ${scent.name}
  </text>

  <text x="200" y="162" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.4" font-weight="600" fill="${goldText}" letter-spacing="0.3">
    ${scent.notes}
  </text>

  <text x="200" y="180" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.0" font-weight="700" fill="${mutedText}" letter-spacing="1.1">
    10 OZ VESSEL (8.5 OZ / 240G NET FILL) • WICK: ${scent.wick}
  </text>

  <line x1="64" y1="194" x2="336" y2="194" stroke="${outerRing}" stroke-width="1" opacity="0.55" />

  <text x="200" y="212" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.6" font-weight="800" fill="${goldText}" letter-spacing="1.5">
    ⚠ WARNING: FIRE HAZARD
  </text>

  <g transform="translate(200, 240)">
    <g transform="translate(-72, 0)">
      <circle cx="0" cy="0" r="13.5" fill="none" stroke="${goldText}" stroke-width="1.3" />
      <ellipse cx="0" cy="0" rx="7.5" ry="4.2" fill="none" stroke="${primaryText}" stroke-width="1.2" />
      <circle cx="0" cy="0" r="2.1" fill="${goldText}" />
      <text x="0" y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.6" font-weight="700" fill="${mutedText}">BURN IN SIGHT</text>
    </g>
    <g transform="translate(0, 0)">
      <circle cx="0" cy="0" r="13.5" fill="none" stroke="${goldText}" stroke-width="1.3" />
      <path d="M 0,-7.5 C -3,-3 -4,2 0,6.5 C 4,2 3,-3 0,-7.5 Z" fill="${goldText}" />
      <line x1="-8.5" y1="-8.5" x2="8.5" y2="8.5" stroke="${primaryText}" stroke-width="1.4" />
      <text x="0" y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.6" font-weight="700" fill="${mutedText}">KEEP FROM KIDS</text>
    </g>
    <g transform="translate(72, 0)">
      <circle cx="0" cy="0" r="13.5" fill="none" stroke="${goldText}" stroke-width="1.3" />
      <text x="0" y="3" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.2" font-weight="800" fill="${primaryText}">1/4"</text>
      <text x="0" y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.6" font-weight="700" fill="${mutedText}">TRIM WICK 1/4"</text>
    </g>
  </g>

  <text x="200" y="279" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.1" font-weight="500" fill="${primaryText}">
    Burn within sight. Keep away from flammable objects,
  </text>
  <text x="200" y="290" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.1" font-weight="500" fill="${primaryText}">
    children &amp; pets. Trim wick to 1/4" before every lighting.
  </text>
  <text x="200" y="301" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.1" font-weight="500" fill="${primaryText}">
    Do not burn more than 4 hrs at a time. Place on heat-safe
  </text>
  <text x="200" y="312" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.1" font-weight="500" fill="${primaryText}">
    surface. Discontinue use when 1/2" of unmelted wax remains.
  </text>

  <text x="200" y="329" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.0" font-weight="700" fill="${goldText}" letter-spacing="0.9">
    COCONUT-APRICOT &amp; SOY CRÈME + ZEOCARB-98™
  </text>
  <text x="200" y="341" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.8" font-weight="600" fill="${mutedText}" letter-spacing="1.2">
    PURCELLVILLE, VA • PUCKANDWICK.COM
  </text>
</svg>`;
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 2 });

  // 1. Export 1A (Men's Black & Gold) & 1B (Women's Warm Alabaster-Ivory & Gold) Main Universal Labels
  const mainLabels = [
    { name: '1A-Main-Front-Label-Black-and-Gold-2.25x2.25in (Qty-70)', isIvory: false },
    { name: '1B-Main-Front-Label-Warm-Alabaster-Ivory-and-Gold-2.25x2.25in (Qty-30)', isIvory: true }
  ];

  for (const ml of mainLabels) {
    const svg = renderMainSquareSvg(ml.isIvory);
    fs.writeFileSync(path.join(DIR_MAIN, `${ml.name}.svg`), svg);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@500;600;700&display=swap');@page{size:2.25in 2.25in;margin:0;}*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;overflow:hidden;}</style></head><body>${svg}</body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(DIR_MAIN, `${ml.name}.png`) });
    await page.pdf({ path: path.join(DIR_MAIN, `${ml.name}.pdf`), width: '2.25in', height: '2.25in', printBackground: true });
  }

  // 2. Export ONLY the 3 Active Scents (Balsam Fir = 40 pcs, Top Shelf = 30 pcs, Fresh Cut = 30 pcs) on White Background
  for (const s of SCENTS) {
    const svg = renderBottomScentSvg(s, s.num, true);
    const baseName = `Scent-${s.slug}-2in-Round-White-Bottom-Label`;
    fs.writeFileSync(path.join(DIR_BOTTOM, `${baseName}.svg`), svg);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');@page{size:2.0in 2.0in;margin:0;}*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;overflow:hidden;background:#FFFFFF;}</style></head><body>${svg}</body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(DIR_BOTTOM, `${baseName}.png`), omitBackground: false });
    await page.pdf({ path: path.join(DIR_BOTTOM, `${baseName}.pdf`), width: '2.0in', height: '2.0in', printBackground: true });
  }

  // 3. Create 1-Page Visual Order Summary Sheet PDF for Kaelyn Harris @ Mr. Print in Purcellville
  const summaryHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    @page { size: 8.5in 11in; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 8.5in;
      height: 11in;
      padding: 0.4in 0.5in;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #141619;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2.5px solid #141619;
      padding-bottom: 10px;
    }
    .header h1 {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 16pt;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .header p {
      font-size: 8.5pt;
      color: #4A4F57;
      margin-top: 3px;
      font-weight: 500;
    }
    .badge {
      background: #141619;
      color: #E5C878;
      padding: 7px 14px;
      border-radius: 5px;
      font-size: 8.5pt;
      font-weight: 700;
      text-align: right;
      line-height: 1.35;
    }
    .section-bar {
      background: #141619;
      color: #FFFFFF;
      padding: 6px 12px;
      border-left: 4px solid #C5A059;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      margin-bottom: 10px;
    }
    .section-bar h2 {
      font-size: 10pt;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
    .section-bar span {
      font-size: 8.5pt;
      color: #E5C878;
      font-weight: 700;
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .main-card {
      border: 1.5px solid #D4D7DD;
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FAF9F6;
    }
    .main-card-meta {
      font-size: 8.2pt;
      line-height: 1.45;
      color: #2C3038;
    }
    .main-card-meta strong {
      font-size: 9.5pt;
      color: #111215;
      display: block;
      margin-bottom: 3px;
    }
    .qty-pill {
      display: inline-block;
      background: #141619;
      color: #E5C878;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 4px;
      margin-top: 6px;
    }
    .bottom-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 4px;
    }
    .bot-card {
      border: 1.5px solid #D8DCE2;
      border-radius: 8px;
      padding: 14px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #FAF9F6;
    }
    .bot-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 11pt;
      font-weight: 800;
      color: #141619;
      margin-top: 10px;
    }
    .bot-sub {
      font-size: 7.8pt;
      color: #5A606A;
      margin-top: 3px;
      line-height: 1.35;
    }
    .spec-box {
      border: 1.5px solid #C5A059;
      background: #FDFBF7;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 8.5pt;
      line-height: 1.5;
      margin-top: 14px;
    }
    .footer {
      border-top: 1px solid #D4D7DD;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #5A606A;
    }
  </style>
</head>
<body>
  <div>
    <div class="header">
      <div>
        <h1>PUCK &amp; WICK™ — MR. PRINT (PURCELLVILLE) LABEL ORDER</h1>
        <p>Attn: Kaelyn Harris • Customer: Georgii Skrenov (Purcellville, VA) • Total Test Print Run: 200 Labels</p>
      </div>
      <div class="badge">
        200 TOTAL LABELS<br/>
        100 Squares + 100 Circles
      </div>
    </div>

    <!-- PART 1: 100 UNIVERSAL FRONT SQUARE LABELS -->
    <div class="section-bar">
      <h2>Part 01 • Universal 10 oz Main Front Jar Labels (2.25" × 2.25" Square)</h2>
      <span>TOTAL QTY: 100 SQUARE LABELS (70 BLACK/GOLD + 30 IVORY/GOLD)</span>
    </div>

    <div class="main-grid">
      <div class="main-card">
        <div style="width:128px;height:128px;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.28);">
          ${renderMainSquareSvg(false)}
        </div>
        <div class="main-card-meta">
          <strong>Design 1A — Matte Obsidian Black &amp; Gold</strong>
          • <strong>Cut Size:</strong> <code>2.25" × 2.25"</code> Square<br/>
          • <strong>Finish:</strong> Matte Vinyl / BOPP Candle Sticker Stock<br/>
          • <strong>File in Folder 01:</strong><br/><code>1A-Main-Front-Label-Black-and-Gold...pdf</code><br/>
          <span class="qty-pill">PRINT QUANTITY: 70 LABELS</span>
        </div>
      </div>

      <div class="main-card">
        <div style="width:128px;height:128px;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.18);">
          ${renderMainSquareSvg(true)}
        </div>
        <div class="main-card-meta">
          <strong>Design 1B — Warm Alabaster-Ivory &amp; Gold</strong>
          • <strong>Cut Size:</strong> <code>2.25" × 2.25"</code> Square<br/>
          • <strong>Finish:</strong> Matte Vinyl / BOPP Candle Sticker Stock<br/>
          • <strong>File in Folder 01:</strong><br/><code>1B-Main-Front-Label-Warm-Alabaster...pdf</code><br/>
          <span class="qty-pill">PRINT QUANTITY: 30 LABELS</span>
        </div>
      </div>
    </div>

    <!-- PART 2: 100 ROUND BOTTOM SCENT & WARNING LABELS (ALL WHITE BACKGROUND: 40 BALSAM FIR + 30 TOP SHELF + 30 FRESH CUT) -->
    <div class="section-bar" style="margin-top:16px;">
      <h2>Part 02 • Round Bottom Scent &amp; Warning Labels — White Background (2.0" Circle)</h2>
      <span>TOTAL QTY: 100 WHITE CIRCLE LABELS ACROSS 3 SCENTS (40 + 30 + 30)</span>
    </div>

    <div class="bottom-grid-3">
      ${SCENTS.map(s => `
        <div class="bot-card">
          <div style="width:168px;height:168px;border-radius:50%;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.14);border:1px solid #E5DFD3;">
            ${renderBottomScentSvg(s, `sum-${s.num}`, true)}
          </div>
          <div class="bot-title">${s.name}</div>
          <div class="bot-sub">
            <code>2.0" × 2.0"</code> White Circle • 10 oz Weight Spec<br/>
            <em>${s.notes}</em>
          </div>
          <span class="qty-pill">PRINT QUANTITY: ${s.qty} LABELS</span>
        </div>
      `).join('')}
    </div>

    <div class="spec-box">
      <strong>Summary of Quantities &amp; Files for Kaelyn Harris @ Mr. Print:</strong><br/>
      1. <strong>Folder 01 (100 Square Front Labels — <code>2.25" × 2.25"</code>):</strong> <strong>70 pcs</strong> of <code>1A Black &amp; Gold</code> + <strong>30 pcs</strong> of <code>1B Warm Alabaster-Ivory &amp; Gold</code>.<br/>
      2. <strong>Folder 02 (100 Round Bottom Labels — <code>2.0" Diameter Circle, ALL WHITE BACKGROUND</code>):</strong> <strong>40 pcs</strong> of <code>Balsam Fir</code> + <strong>30 pcs</strong> of <code>Top Shelf</code> + <strong>30 pcs</strong> of <code>Fresh Cut</code> (printed on White Matte Sticker Stock — no black backgrounds).<br/>
      3. <strong>File Formats Provided:</strong> Every label is included as a 1-up Vector <code>.PDF</code>, a 2400×2400 High-Res <code>.PNG</code>, and a Vector <code>.SVG</code>.
    </div>
  </div>

  <div class="footer">
    <span><strong>Puck &amp; Wick™</strong> • Georgii Skrenov • Purcellville, Virginia 20132 • https://puckandwick.com</span>
    <span>200-Unit Test Print Package (100 Front Squares + 100 Bottom Circles)</span>
  </div>
</body>
</html>`;

  const sumPage = await browser.newPage();
  await sumPage.setContent(summaryHtml, { waitUntil: 'networkidle' });
  await sumPage.pdf({
    path: path.join(MR_PRINT_ROOT, '00-MR-PRINT-ORDER-SUMMARY-SHEET.pdf'),
    width: '8.5in',
    height: '11in',
    printBackground: true
  });

  await browser.close();
  console.log('Updated Mr. Print Purcellville folder with only Balsam Fir (40), Top Shelf (30), and Fresh Cut (30):', MR_PRINT_ROOT);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
