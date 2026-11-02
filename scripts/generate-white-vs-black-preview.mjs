import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

function renderMasterCrest(mode = 'white_gold_black', sizeCss = '220px', uid = 'm1') {
  // 3 variations of the 98/100 Goldilocks Master Crest:
  // 1) 'white_black_gold': Crisp White/Cream background + Black Outer Frame + Gold Inner Frame + Black Sticks + Gold Flame + Black "PUCK & WICK" + Gold "LOUDOUN CO., VA • USA"
  // 2) 'white_all_gold': Crisp White/Cream background + Warm Antique Gold Frame, Sticks, Flame, "PUCK & WICK" & "LOUDOUN CO., VA • USA"
  // 3) 'black_gold': Matte Black background + Gold Frame, Sticks, Flame, "PUCK & WICK" & "LOUDOUN CO., VA • USA"

  if (mode === 'white_black_gold') {
    return `
      <svg viewBox="0 0 500 500" style="width:${sizeCss};height:${sizeCss};display:block;" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="500" height="500" fill="#FAF8F3" />
        <rect x="44" y="44" width="412" height="412" fill="none" stroke="#141210" stroke-width="4.2" />
        <rect x="55" y="55" width="390" height="390" fill="none" stroke="#B68D40" stroke-width="1.4" />
        <g transform="translate(250, 194)">
          <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="#141210" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="#141210" stroke-width="3.6" stroke-linecap="round" />
          <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="#B68D40" />
          <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#FAF8F3" opacity="0.55" />
        </g>
        <text x="250" y="308" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="700" letter-spacing="6" fill="#141210">PUCK &amp; WICK</text>
        <text x="250" y="346" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="700" letter-spacing="4.2" fill="#8C6520">LOUDOUN CO., VA &bull; USA</text>
      </svg>
    `;
  }

  if (mode === 'white_all_gold') {
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
        <rect x="44" y="44" width="412" height="412" fill="none" stroke="url(#ag-${uid})" stroke-width="3.8" />
        <rect x="55" y="55" width="390" height="390" fill="none" stroke="rgba(140,101,32,0.38)" stroke-width="1.2" />
        <g transform="translate(250, 194)">
          <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#ag-${uid})" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#ag-${uid})" stroke-width="3.6" stroke-linecap="round" />
          <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#ag-${uid})" />
          <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#FAF8F3" opacity="0.55" />
        </g>
        <text x="250" y="308" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="700" letter-spacing="6" fill="#181512">PUCK &amp; WICK</text>
        <text x="250" y="346" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="700" letter-spacing="4.2" fill="#8C6520">LOUDOUN CO., VA &bull; USA</text>
      </svg>
    `;
  }

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
      <g transform="translate(250, 194)">
        <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#bg-${uid})" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#bg-${uid})" stroke-width="3.4" stroke-linecap="round" />
        <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#bg-${uid})" />
        <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#0B0C0E" opacity="0.48" />
      </g>
      <text x="250" y="308" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', Georgia, serif" font-size="42" font-weight="600" letter-spacing="6" fill="url(#bg-${uid})">PUCK &amp; WICK</text>
      <text x="250" y="346" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="600" letter-spacing="4.2" fill="#C9AE6A">LOUDOUN CO., VA &bull; USA</text>
    </svg>
  `;
}

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 980px;
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
      background: linear-gradient(135deg, #23262E 0%, #0D0E12 55%, #060709 100%);
      border: 2px solid #2E323B;
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
    <div class="kicker">The 98/100 Master Crest • White Label vs. Black Label on Your SUPMIND Matte Black Jar</div>
    <h1>How the 98/100 Crest Looks in White/Cream (For Home Printing) vs. Black</h1>
    <div class="sub">All 3 are Included in Puck-and-Wick-Printable-Front-Jar-Crests-8.5x11.pdf — Here Is When to Use White vs. Black</div>
  </div>

  <div class="cols">
    <div class="card">
      <div class="pill">Page 3 of PDF • White Label (Black &amp; Gold Ink)</div>
      <div class="jar-sim">
        <div class="lid-black"></div>
        <div style="box-shadow:0 8px 24px rgba(0,0,0,0.65);">
          ${renderMasterCrest('white_black_gold', '212px', 'w1')}
        </div>
      </div>
      <div class="desc">
        <strong>Best for Printing at Home on White Avery 22806:</strong><br/>
        Because your SUPMIND jar AND lid are both Matte Black, a crisp <strong>White/Cream 2"×2" Square</strong> (like Jo Malone &amp; Diptyque) gives your all-black jar high-contrast pop, uses almost zero ink, and has zero white-edge bleed!
      </div>
    </div>

    <div class="card">
      <div class="pill">Page 2 of PDF • White Label (Warm Gold Ink)</div>
      <div class="jar-sim">
        <div class="lid-black"></div>
        <div style="box-shadow:0 8px 24px rgba(0,0,0,0.65);">
          ${renderMasterCrest('white_all_gold', '212px', 'w2')}
        </div>
      </div>
      <div class="desc">
        <strong>Best for Both Black &amp; White Jars at Home:</strong><br/>
        Prints the Gold Frame, Subtle Hockey Blades, <strong>PUCK &amp; WICK</strong>, and <strong>LOUDOUN CO., VA • USA</strong> onto your White Avery 22806 square. Works on both your Men's Black jars and Women's White jars!
      </div>
    </div>

    <div class="card">
      <div class="pill">Page 1 of PDF • Black Label (Gold Ink)</div>
      <div class="jar-sim">
        <div class="lid-black"></div>
        <div style="box-shadow:0 8px 24px rgba(0,0,0,0.65);">
          ${renderMasterCrest('black_gold', '212px', 'b1')}
        </div>
      </div>
      <div class="desc">
        <strong>Best for Laser Printer or Factory Gold Foil:</strong><br/>
        The signature Stealth Matte Obsidian &amp; Gold look from your website. You can print Page 1 on your White Avery 22806 squares too (it prints a full-bleed black square), or use it for factory foil labels!
      </div>
    </div>
  </div>

  <div class="footer">
    <strong>Bottom Line:</strong> For the <strong>2" Round Bottom Warning Label</strong>, 100% stick with <strong>White</strong>. For the <strong>2"×2" Front Jar Crest</strong>, your PDF has <strong>BOTH White (Pages 2 &amp; 3) and Black (Page 1)</strong> so you can print 1 sheet of each on Monday and stick your favorite onto the jar!
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 980 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'white-vs-black-front-crest-on-jar.png'), fullPage: true });
  await browser.close();
}

main();
