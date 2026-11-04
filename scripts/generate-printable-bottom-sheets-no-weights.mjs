import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

const SCENTS = [
  { num: 1, name: 'TOP SHELF', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Crimson Saffron • White Cedar • Amberwood', theme: 'obsidian' },
  { num: 2, name: 'FRESH CUT', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Italian Bergamot • Hinoki Wood • Vetiver', theme: 'obsidian' },
  { num: 3, name: 'BALSAM FIR', kicker: 'SEASONAL COLLAB • BATCH #098', vintageKicker: 'SEASONAL COLLAB • BATCH #098', notes: 'Fraser Pine • Resinous Balsam • Cedar Bark', theme: 'obsidian' },
  { num: 4, name: 'BARNWOOD & BOURBON', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Small-Batch Rye • Weathered Oak • Vanilla', theme: 'obsidian' },
  { num: 5, name: 'RINKSIDE CEDAR & SMOKE', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Birchwood Smoke • Atlas Cedar • Glove Leather', theme: 'obsidian' },
  { num: 6, name: 'WARM AMBER & VANILLA', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Baltic Amber • Cashmere Musk • Vanilla Bean', theme: 'obsidian' },
  { num: 7, name: 'LOCKER ROOM MINT', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Crushed Spearmint • Blue Eucalyptus • Cedar', theme: 'obsidian' },
  { num: 8, name: 'CASHMERE & WHITE TEA', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Imperial White Tea • Spun Cashmere • Hinoki', theme: 'ivory' },
  { num: 9, name: 'VELVET VANILLA & SANTAL', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Australian Sandalwood • Cardamom • Vanilla', theme: 'ivory' },
  { num: 10, name: 'SEA SALT & WHITE ORCHID', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Crystalline Sea Salt • Night Orchid • Driftwood', theme: 'ivory' }
];

function renderWeightFreeCircleSvg(scent, uid, forceLightBg = false, sizeCss = 'width:2.08in;height:2.08in;') {
  const isIvoryTheme = scent.theme === 'ivory';
  const isLight = forceLightBg || isIvoryTheme;

  const bgFill = isLight ? '#FAF6EE' : '#0B0C0F';
  // Use Champagne Rose-Gold accent for Women's Sanctuary Ivory, Classic Brushed Gold for Men's / Universal Light
  const outerRing = isIvoryTheme ? '#B8846E' : (isLight ? '#9C7325' : '#D4AF37');
  const innerRing = isIvoryTheme ? 'rgba(184,132,110,0.42)' : (isLight ? 'rgba(156,115,37,0.4)' : 'rgba(212,175,55,0.4)');
  const primaryText = isLight ? '#141210' : '#F9F6F0';
  const goldText = isIvoryTheme ? '#9E6B55' : (isLight ? '#8A621C' : '#E5C878');
  const mutedText = isLight ? '#52493C' : '#A8A298';
  const badgeBg = isIvoryTheme ? 'rgba(184,132,110,0.11)' : (isLight ? 'rgba(156,115,37,0.10)' : 'rgba(229,200,120,0.10)');
  const fontScale = scent.name.length > 18 ? 16.5 : scent.name.length > 14 ? 18.5 : 21;
  const activeKicker = forceLightBg ? scent.vintageKicker : scent.kicker;

  return `
    <svg viewBox="0 0 400 400" style="${sizeCss}display:block;" xmlns="http://www.w3.org/2000/svg">
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

      <g transform="translate(200, 74)">
        <path d="M -15,-10 L 14,13 L 19.5,11" fill="none" stroke="${goldText}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 15,-10 L -14,13 L -19.5,11" fill="none" stroke="${goldText}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 0,0.5 C -3.5,-4.5 -5,-10.5 -2,-15.5 C -0.5,-18 0,-20 0,-21.5 C 0,-20 0.5,-18 2,-15.5 C 5,-10.5 3.5,-4.5 0,0.5 Z" fill="${goldText}" />
        <path d="M 0,-2 C -1.4,-4.5 -2,-8 -0.8,-11 C 0,-12.5 0.2,-12.5 0.8,-11 C 2,-8 1.4,-4.5 0,-2 Z" fill="${bgFill}" opacity="0.55" />
      </g>

      <rect x="98" y="96" width="204" height="19" rx="9.5" fill="${badgeBg}" stroke="${innerRing}" stroke-width="0.8" />
      <text x="200" y="109" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.0" font-weight="700" fill="${goldText}" letter-spacing="1.6">
        ${activeKicker}
      </text>

      <text x="200" y="142" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="${fontScale}" font-weight="700" fill="${primaryText}" letter-spacing="2.0">
        ${scent.name}
      </text>

      <text x="200" y="162" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.4" font-weight="600" fill="${goldText}" letter-spacing="0.3">
        ${scent.notes}
      </text>

      <!-- WEIGHT-FREE HERITAGE SUB-LINE (FITS ALL VINTAGE & CUSTOM VESSEL SIZES) -->
      <text x="200" y="180" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.0" font-weight="700" fill="${mutedText}" letter-spacing="1.3">
        SMALL-BATCH ARTISAN POUR • HAND-POURED IN VA
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
    </svg>
  `;
}

const mixed12 = [...SCENTS, SCENTS[2], SCENTS[7]]; // 10 scents + extra Balsam Fir + extra Cashmere & White Tea

const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    @page {
      size: 8.5in 11in;
      margin: 0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0;
      padding: 0;
      background: #FFFFFF;
      font-family: 'Inter', sans-serif;
    }
    .sheet {
      width: 8.5in;
      height: 11in;
      padding-top: 0.625in;
      padding-bottom: 0.625in;
      padding-left: 0.75in;
      padding-right: 0.75in;
      display: grid;
      grid-template-columns: repeat(3, 2.0in);
      grid-template-rows: repeat(4, 2.0in);
      column-gap: 0.5in;
      row-gap: 0.5833in;
      page-break-after: always;
      position: relative;
      align-items: center;
      justify-items: center;
    }
    .sheet:last-child {
      page-break-after: auto;
    }
    .sheet-note {
      position: absolute;
      top: 0.18in;
      left: 0.75in;
      right: 0.75in;
      display: flex;
      justify-content: space-between;
      font-size: 7.8pt;
      color: #555;
      border-bottom: 0.5pt solid #DDD;
      padding-bottom: 3pt;
    }
    .cell {
      width: 2.0in;
      height: 2.0in;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
</head>
<body>
  <!-- PAGE 1: All 10 Scents Mixed Sheet (Obsidian + Sanctuary Rose-Gold Ivory — Weight-Free) -->
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PUCK &amp; WICK™ — Weight-Free 2.0" Bottom Labels (Page 1: All 10 Scents Mixed • Fits Any Vintage or Custom Vessel)</strong></span>
      <span>Print at <strong>100% / Actual Size</strong> on Avery 22807 or OnlineLabels OL325</span>
    </div>
    ${mixed12.map((s, idx) => `<div class="cell">${renderWeightFreeCircleSvg(s, `wf-p1-${idx}`, false)}</div>`).join('')}
  </div>

  <!-- PAGE 2: All 10 Scents Mixed Sheet (Warm Ivory / Cream Edition — Weight-Free for Vintage Vessels & Home Printers) -->
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PUCK &amp; WICK™ — Weight-Free 2.0" Bottom Labels (Page 2: All 10 Scents on Warm Cream • Ideal for Vintage Teacups &amp; Home Inkjet)</strong></span>
      <span>Print at <strong>100% / Actual Size</strong> on Avery 22807 or OnlineLabels OL325</span>
    </div>
    ${mixed12.map((s, idx) => `<div class="cell">${renderWeightFreeCircleSvg(s, `wf-p2-${idx}`, true)}</div>`).join('')}
  </div>

  <!-- PAGES 3-12: Full 12-Up Sheet for Each Individual Scent (Warm Cream Base — Fits All Vintage Vessels & Standard Jars) -->
  ${SCENTS.map((s, sIdx) => `
    <div class="sheet">
      <div class="sheet-note">
        <span><strong>PUCK &amp; WICK™ — Weight-Free #${s.num}: ${s.name} (12x 2.0" Warm Cream Bottom Labels • Fits Any Vessel Size)</strong></span>
        <span>Print at <strong>100% / Actual Size</strong> on Avery 22807 or OnlineLabels OL325</span>
      </div>
      ${Array.from({ length: 12 }).map((_, cIdx) => `<div class="cell">${renderWeightFreeCircleSvg(s, `wf-light-${sIdx}-${cIdx}`, true)}</div>`).join('')}
    </div>
  `).join('')}

  <!-- PAGES 13-22: Full 12-Up Sheet for Each Individual Scent (Signature Obsidian / Sanctuary Rose-Gold Ivory Base) -->
  ${SCENTS.map((s, sIdx) => `
    <div class="sheet">
      <div class="sheet-note">
        <span><strong>PUCK &amp; WICK™ — Weight-Free #${s.num}: ${s.name} (12x 2.0" Signature ${s.theme === 'ivory' ? 'Sanctuary Ivory' : 'Matte Obsidian'} Bottom Labels • No Weights)</strong></span>
        <span>Print at <strong>100% / Actual Size</strong> on Avery 22807 or OnlineLabels OL325</span>
      </div>
      ${Array.from({ length: 12 }).map((_, cIdx) => `<div class="cell">${renderWeightFreeCircleSvg(s, `wf-dark-${sIdx}-${cIdx}`, false)}</div>`).join('')}
    </div>
  `).join('')}
</body>
</html>`;

const closeupHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1500px;
      height: 820px;
      background: radial-gradient(circle at 50% 15%, #171920 0%, #090A0D 100%);
      color: #F9F6F0;
      font-family: 'Inter', sans-serif;
      padding: 36px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      text-align: center;
      border-bottom: 1px solid rgba(212,175,55,0.28);
      padding-bottom: 14px;
    }
    .kicker {
      color: #E5C878;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1.8px;
      color: #FFFFFF;
    }
    .sub {
      color: #C4BEB3;
      font-size: 14px;
      margin-top: 6px;
    }
    .sub strong { color: #E5C878; }
    .row-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      align-items: center;
      justify-items: center;
      margin: 18px 0;
    }
    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 18px;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .card-title {
      margin-top: 14px;
      font-size: 14px;
      font-weight: 700;
      color: #E5C878;
      letter-spacing: 1px;
    }
    .card-desc {
      margin-top: 5px;
      font-size: 12.5px;
      color: #B8B2A6;
      text-align: center;
      line-height: 1.4;
    }
    .footer-note {
      text-align: center;
      font-size: 13.5px;
      color: #E0DBD1;
      background: rgba(212,175,55,0.09);
      border: 1px solid rgba(212,175,55,0.32);
      padding: 13px 24px;
      border-radius: 12px;
    }
    .footer-note strong { color: #E5C878; }
  </style>
</head>
<body>
  <div class="header">
    <div class="kicker">Close-Up View • Weight-Free 2.0" Bottom Scent &amp; Warning Labels</div>
    <h1>Fits Mom's Vintage Teacups, Crystal Vessels &amp; Your SUPMIND Jars</h1>
    <div class="sub">Zero ounce weights printed — features <strong>"SMALL-BATCH ARTISAN POUR • HAND-POURED IN VA"</strong> + Scent Name, 3 Notes &amp; Full ASTM Warning</div>
  </div>

  <div class="row-3">
    <div class="card">
      ${renderWeightFreeCircleSvg(SCENTS[2], 'cu-1', false, 'width:380px;height:380px;filter:drop-shadow(0 14px 28px rgba(0,0,0,0.5));')}
      <div class="card-title">#3 Balsam Fir (Matte Obsidian Base)</div>
      <div class="card-desc">For dark vessels &amp; SUPMIND Matte Black jars (Pages 1 &amp; 15)</div>
    </div>
    <div class="card">
      ${renderWeightFreeCircleSvg(SCENTS[2], 'cu-2', true, 'width:380px;height:380px;filter:drop-shadow(0 14px 28px rgba(0,0,0,0.5));')}
      <div class="card-title">#3 Balsam Fir (Warm Cream Vintage Base)</div>
      <div class="card-desc">For Mom's porcelain teacups, crystal bowls &amp; ink-saver printing (Pages 2 &amp; 5)</div>
    </div>
    <div class="card">
      ${renderWeightFreeCircleSvg(SCENTS[7], 'cu-3', false, 'width:380px;height:380px;filter:drop-shadow(0 14px 28px rgba(0,0,0,0.5));')}
      <div class="card-title">#8 Cashmere &amp; White Tea (Sanctuary Rose-Gold)</div>
      <div class="card-desc">Warm Cream &amp; Champagne Rose-Gold border for Sanctuary &amp; Vintage vessels (Page 10)</div>
    </div>
  </div>

  <div class="footer-note">
    <strong>Ready to Print on Your Desktop:</strong> <code>Puck-and-Wick-Printable-2inch-Bottom-Labels-No-Weights-8.5x11.pdf</code> (Fits standard Avery 22807 or OnlineLabels OL325 2.0" round sticker sheets!)
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(htmlDoc, { waitUntil: 'networkidle' });
  const outPdfWorkspace = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Printable-2inch-Bottom-Labels-No-Weights-8.5x11.pdf');
  const outPdfDesktop = '/Users/georgiiskrenov/Desktop/Puck-and-Wick-Printable-2inch-Bottom-Labels-No-Weights-8.5x11.pdf';
  await page.pdf({
    path: outPdfWorkspace,
    width: '8.5in',
    height: '11in',
    printBackground: true
  });
  fs.copyFileSync(outPdfWorkspace, outPdfDesktop);
  console.log('Saved Weight-Free printable PDF to Workspace & Desktop:', outPdfDesktop);

  const cuPage = await browser.newPage({ viewport: { width: 1500, height: 820, deviceScaleFactor: 1.5 } });
  await cuPage.setContent(closeupHtml, { waitUntil: 'networkidle' });
  const outCuPng = path.join(ARTIFACT_DIR, 'bottom-label-no-weights-closeup.png');
  await cuPage.screenshot({ path: outCuPng, fullPage: true });
  console.log('Saved close-up PNG:', outCuPng);

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
