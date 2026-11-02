import { chromium } from 'playwright';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

function renderMasterCrest(mode = 'mens_black_gold', sizeCss = '215px', uid = 'm1') {
  // 3 distinct, crystal-clear versions:
  // 1) 'mens_black_gold' (Page 1): Men's Stealth Black Background + Gold Frame, Sticks, Flame, "PUCK & WICK", "LOUDOUN COUNTY, VA" & bottom "U.S.A."
  // 2) 'womens_ivory_gold' (Page 2): Women's Sanctuary White/Ivory Background + Soft Champagne-Gold Frame, Gold Sticks & Flame
  // 3) 'mens_white_contrast' (Page 3): Men's Home-Print White Background + Bold Jet-Black Outer Frame & Black Sticks + Gold Inner Frame & Gold Flame (ties into the Black Jar & Black Lid!)

  if (mode === 'mens_white_contrast') {
    return `
      <svg viewBox="0 0 500 500" style="width:${sizeCss};height:${sizeCss};display:block;" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="500" height="500" fill="#FAF8F3" />
        <!-- Bold Black Outer Frame + Warm Gold Inner Hairline -->
        <rect x="44" y="44" width="412" height="412" fill="none" stroke="#141210" stroke-width="4.4" />
        <rect x="55" y="55" width="390" height="390" fill="none" stroke="#B68D40" stroke-width="1.4" />
        <!-- Black Crossed Hockey Sticks + Gold Flame -->
        <g transform="translate(250, 190)">
          <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="#141210" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="#141210" stroke-width="3.6" stroke-linecap="round" />
          <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="#B68D40" />
          <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#FAF8F3" opacity="0.55" />
        </g>
        <!-- Brand Name -->
        <text x="250" y="302" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="700" letter-spacing="6" fill="#141210">PUCK &amp; WICK</text>
        <!-- Clean Spelled-Out "LOUDOUN COUNTY, VA" (Zero Period-Comma Clash!) + Subtle "USA" Underneath -->
        <text x="250" y="338" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.2" font-weight="700" letter-spacing="3.8" fill="#8C6520">LOUDOUN COUNTY, VA</text>
        <text x="250" y="360" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="9.2" font-weight="600" letter-spacing="5.5" fill="#6E6659">USA</text>
      </svg>
    `;
  }

  if (mode === 'womens_ivory_gold') {
    return `
      <svg viewBox="0 0 500 500" style="width:${sizeCss};height:${sizeCss};display:block;" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ag-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8C6520" />
            <stop offset="50%" stop-color="#C59B43" />
            <stop offset="100%" stop-color="#755215" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="500" fill="#FAF8F3" />
        <!-- Soft Champagne-Gold Outer & Inner Frame -->
        <rect x="44" y="44" width="412" height="412" fill="none" stroke="url(#ag-${uid})" stroke-width="3.8" />
        <rect x="55" y="55" width="390" height="390" fill="none" stroke="rgba(140,101,32,0.38)" stroke-width="1.2" />
        <!-- Champagne-Gold Crossed Hockey Sticks & Flame -->
        <g transform="translate(250, 190)">
          <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#ag-${uid})" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#ag-${uid})" stroke-width="3.5" stroke-linecap="round" />
          <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#ag-${uid})" />
          <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#FAF8F3" opacity="0.55" />
        </g>
        <!-- Brand Name -->
        <text x="250" y="302" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="600" letter-spacing="6" fill="#2A241D">PUCK &amp; WICK</text>
        <!-- Clean Spelled-Out "LOUDOUN COUNTY, VA" + Subtle "USA" Underneath -->
        <text x="250" y="338" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.2" font-weight="600" letter-spacing="3.8" fill="#8C6520">LOUDOUN COUNTY, VA</text>
        <text x="250" y="360" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="9.2" font-weight="600" letter-spacing="5.5" fill="#9C8458">USA</text>
      </svg>
    `;
  }

  // Default: 'mens_black_gold' (Page 1)
  return `
    <svg viewBox="0 0 500 500" style="width:${sizeCss};height:${sizeCss};display:block;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B69146" />
          <stop offset="50%" stop-color="#E5C878" />
          <stop offset="100%" stop-color="#9A7632" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="500" height="500" fill="#0B0C0E" />
      <rect x="44" y="44" width="412" height="412" fill="none" stroke="url(#bg-${uid})" stroke-width="3.6" />
      <rect x="55" y="55" width="390" height="390" fill="none" stroke="rgba(229,200,120,0.28)" stroke-width="1.1" />
      <g transform="translate(250, 190)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#bg-${uid})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#bg-${uid})" stroke-width="3.4" stroke-linecap="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#bg-${uid})" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#0B0C0E" opacity="0.48" />
      </g>
      <text x="250" y="302" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="600" letter-spacing="6" fill="url(#bg-${uid})">PUCK &amp; WICK</text>
      <text x="250" y="338" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.2" font-weight="600" letter-spacing="3.8" fill="#C9AE6A">LOUDOUN COUNTY, VA</text>
      <text x="250" y="360" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="9.2" font-weight="600" letter-spacing="5.5" fill="#8E8779">USA</text>
    </svg>
  `;
}

const previewHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 1000px;
      background: radial-gradient(circle at 50% 15%, #171920 0%, #090A0D 100%);
      color: #F9F6F0;
      font-family: 'Inter', sans-serif;
      padding: 36px 48px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header { text-align: center; border-bottom: 1px solid rgba(212,175,55,0.28); padding-bottom: 14px; }
    .kicker { color: #E5C878; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px; }
    h1 { font-family: 'Cinzel', serif; font-size: 27px; font-weight: 700; color: #FFF; letter-spacing: 1.8px; }
    .sub { color: #B5AFA4; font-size: 13.5px; margin-top: 5px; }
    .cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin: 16px 0; flex: 1; align-items: stretch; }
    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 18px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .pill {
      background: rgba(212,175,55,0.16);
      border: 1px solid rgba(212,175,55,0.45);
      color: #E5C878;
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      padding: 5px 14px;
      border-radius: 99px;
      text-transform: uppercase;
    }
    .jar-sim {
      width: 300px;
      height: 350px;
      border-radius: 12px 12px 26px 26px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 22px 48px rgba(0,0,0,0.75);
      padding-top: 26px;
    }
    .jar-black {
      background: linear-gradient(135deg, #23262E 0%, #0D0E12 55%, #060709 100%);
      border: 2px solid #2E323B;
    }
    .jar-white {
      background: linear-gradient(135deg, #FCF9F2 0%, #EAE1D3 60%, #D8CCB8 100%);
      border: 2px solid #FFF;
    }
    .lid-black {
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      height: 32px;
      background: linear-gradient(90deg, #121317 0%, #2B2E38 50%, #121317 100%);
      border-radius: 6px 6px 2px 2px;
      border-bottom: 2px solid #3A3E4A;
    }
    .lid-gold {
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      height: 32px;
      background: linear-gradient(90deg, #8F6B24 0%, #F2D88F 50%, #8F6B24 100%);
      border-radius: 6px 6px 2px 2px;
      border-bottom: 2px solid #6E5015;
    }
    .desc { text-align: center; font-size: 12.8px; line-height: 1.48; color: #D1CCC2; }
    .desc strong { color: #E5C878; }
    .footer {
      background: rgba(212,175,55,0.09);
      border: 1px solid rgba(212,175,55,0.32);
      border-radius: 12px;
      padding: 13px 24px;
      text-align: center;
      font-size: 13px;
    }
    .footer strong { color: #E5C878; }
  </style>
</head>
<body>
  <div class="header">
    <div class="kicker">Why There Are 3 Pages (1 Black + 2 White) &bull; Updated with "LOUDOUN COUNTY, VA" + "USA"</div>
    <h1>Exact Role of Each of the 3 Pages in Your Front Crest PDF</h1>
    <div class="sub">Zero "Co.," Period-Comma Clash — Spelled-Out "LOUDOUN COUNTY, VA" with "USA" Centered at the Very Bottom</div>
  </div>

  <div class="cols">
    <!-- Page 3: Men's White Contrast (Black Frame + Black Sticks + Gold Flame) -->
    <div class="card">
      <div class="pill">White #1 (Page 3) • For Men's Black Jars at Home</div>
      <div class="jar-sim jar-black">
        <div class="lid-black"></div>
        <div style="box-shadow:0 8px 24px rgba(0,0,0,0.65);">
          ${renderMasterCrest('mens_white_contrast', '212px', 'c3')}
        </div>
      </div>
      <div class="desc">
        <strong>Why This White One Has BLACK Lines:</strong><br/>
        Made specifically for your <strong>24 Men's Matte Black SUPMIND Jars (with Black Lids)</strong> when printing at home on White Avery 22806 squares! The bold <strong>Jet-Black Outer Frame &amp; Black Sticks</strong> tie the white sticker into the black jar &amp; black lid.
      </div>
    </div>

    <!-- Page 2: Women's White Sanctuary (All Soft Champagne-Gold Frame & Sticks) -->
    <div class="card">
      <div class="pill">White #2 (Page 2) • For Women's White/Frosted Jars</div>
      <div class="jar-sim jar-white">
        <div class="lid-gold"></div>
        <div style="box-shadow:0 8px 20px rgba(0,0,0,0.18);">
          ${renderMasterCrest('womens_ivory_gold', '212px', 'c2')}
        </div>
      </div>
      <div class="desc">
        <strong>Why This White One Has GOLD Lines:</strong><br/>
        Made specifically for your <strong>12 Women's Frosted/White Sanctuary Jars</strong>! Instead of harsh black borders, the frame and crossed hockey sticks are <strong>Warm Champagne-Gold</strong> so the jar looks soft, feminine, and spa-like.
      </div>
    </div>

    <!-- Page 1: Men's Black & Gold (For Laser Printer or Factory Gold Foil) -->
    <div class="card">
      <div class="pill">Black #1 (Page 1) • For Factory Foil / Laser</div>
      <div class="jar-sim jar-black">
        <div class="lid-black"></div>
        <div style="box-shadow:0 8px 24px rgba(0,0,0,0.65);">
          ${renderMasterCrest('mens_black_gold', '212px', 'c1')}
        </div>
      </div>
      <div class="desc">
        <strong>Why the Black One Is Included:</strong><br/>
        Your signature <strong>Matte Obsidian &amp; Gold</strong> look for when you order factory gold-foil stickers (StickerApp / Alibaba) or if your printer lays down deep full-bleed black ink without a white paper edge showing.
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>Typography Fix Applied to All 3 Pages:</strong> Replaced <code>LOUDOUN CO., VA</code> with spelled-out <strong><code>LOUDOUN COUNTY, VA</code></strong> and centered <strong><code>USA</code></strong> at the very bottom!
  </div>
</body>
</html>`;

const printablePdfHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    @page { size: 8.5in 11in; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; padding: 0; background: #FFFFFF; font-family: 'Inter', sans-serif; }
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
    .sheet:last-child { page-break-after: auto; }
    .sheet-note {
      position: absolute;
      top: 0.18in;
      left: 0.75in;
      right: 0.75in;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #666;
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
  <!-- PAGE 1: Men's Stealth Black & Gold (12 per sheet) -->
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PAGE 1: Men's Stealth Black &amp; Gold Front Crest (12x 2.0"×2.0" Squares • Loudoun County, VA / USA)</strong></span>
      <span>Print at <strong>100% / Actual Size</strong> on Avery 22806 / 22816</span>
    </div>
    ${Array.from({ length: 12 }).map((_, i) => `<div class="cell">${renderMasterCrest('mens_black_gold', '2.08in', `p1-${i}`)}</div>`).join('')}
  </div>

  <!-- PAGE 2: Women's White/Ivory & Champagne-Gold (12 per sheet) -->
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PAGE 2 (WHITE #2): Women's Sanctuary Ivory &amp; Gold Front Crest (For Women's White/Frosted Jars)</strong></span>
      <span>Print at <strong>100% / Actual Size</strong> on Avery 22806 / 22816</span>
    </div>
    ${Array.from({ length: 12 }).map((_, i) => `<div class="cell">${renderMasterCrest('womens_ivory_gold', '2.06in', `p2-${i}`)}</div>`).join('')}
  </div>

  <!-- PAGE 3: Men's White High-Contrast Black & Gold (12 per sheet) -->
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PAGE 3 (WHITE #1): Men's High-Contrast White, Black &amp; Gold Front Crest (For Men's Black Jars Printed at Home)</strong></span>
      <span>Print at <strong>100% / Actual Size</strong> on Avery 22806 / 22816</span>
    </div>
    ${Array.from({ length: 12 }).map((_, i) => `<div class="cell">${renderMasterCrest('mens_white_contrast', '2.06in', `p3-${i}`)}</div>`).join('')}
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });

  const p1 = await context.newPage();
  await p1.setContent(previewHtml, { waitUntil: 'networkidle' });
  await p1.screenshot({ path: path.join(ARTIFACT_DIR, 'three-crest-versions-explained.png'), fullPage: true });

  const p2 = await context.newPage();
  await p2.setContent(printablePdfHtml, { waitUntil: 'networkidle' });
  await p2.pdf({
    path: path.join(WORKSPACE_DIR, 'Puck-and-Wick-Printable-Front-Jar-Crests-8.5x11.pdf'),
    width: '8.5in',
    height: '11in',
    printBackground: true
  });

  await browser.close();
  console.log('Updated 3-version explanation preview and Front Crest PDF!');
}

main();
