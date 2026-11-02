import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

const SCENTS = [
  // Men's 1-7
  {
    num: 1,
    name: 'TOP SHELF',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Crimson Saffron • White Cedar • Amberwood',
    wick: 'LX 18',
    theme: 'obsidian'
  },
  {
    num: 2,
    name: 'FRESH CUT',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Italian Bergamot • Hinoki Wood • Vetiver',
    wick: 'LX 16',
    theme: 'obsidian'
  },
  {
    num: 3,
    name: 'BALSAM FIR',
    kicker: 'SEASONAL COLLAB • BATCH #098',
    notes: 'Fraser Pine • Resinous Balsam • Cedar Bark',
    wick: 'LX 18',
    theme: 'obsidian'
  },
  {
    num: 4,
    name: 'BARNWOOD & BOURBON',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Small-Batch Rye • Weathered Oak • Vanilla',
    wick: 'LX 18',
    theme: 'obsidian'
  },
  {
    num: 5,
    name: 'RINKSIDE CEDAR & SMOKE',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Birchwood Smoke • Atlas Cedar • Glove Leather',
    wick: 'LX 18',
    theme: 'obsidian'
  },
  {
    num: 6,
    name: 'WARM AMBER & VANILLA',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Baltic Amber • Cashmere Musk • Vanilla Bean',
    wick: 'LX 18',
    theme: 'obsidian'
  },
  {
    num: 7,
    name: 'LOCKER ROOM MINT',
    kicker: 'MENS SIGNATURE • BATCH #098',
    notes: 'Crushed Spearmint • Blue Eucalyptus • Cedar',
    wick: 'LX 16',
    theme: 'obsidian'
  },
  // Women's 8-10
  {
    num: 8,
    name: 'CASHMERE & WHITE TEA',
    kicker: 'SANCTUARY IVORY • BATCH #098',
    notes: 'Imperial White Tea • Spun Cashmere • Hinoki',
    wick: 'LX 16',
    theme: 'ivory'
  },
  {
    num: 9,
    name: 'VELVET VANILLA & SANTAL',
    kicker: 'SANCTUARY IVORY • BATCH #098',
    notes: 'Australian Sandalwood • Cardamom • Vanilla',
    wick: 'LX 18',
    theme: 'ivory'
  },
  {
    num: 10,
    name: 'SEA SALT & WHITE ORCHID',
    kicker: 'SANCTUARY IVORY • BATCH #098',
    notes: 'Crystalline Sea Salt • Night Orchid • Driftwood',
    wick: 'LX 16',
    theme: 'ivory'
  }
];

function renderBottomLabelSvg(scent, sizePx = 380) {
  const isIvory = scent.theme === 'ivory';
  const bgFill = isIvory ? '#FAF6EE' : '#0B0C0F';
  const outerRing = isIvory ? '#B68D40' : '#D4AF37';
  const innerRing = isIvory ? 'rgba(182,141,64,0.38)' : 'rgba(212,175,55,0.38)';
  const primaryText = isIvory ? '#181512' : '#F9F6F0';
  const goldText = isIvory ? '#8C6520' : '#E5C878';
  const mutedText = isIvory ? '#5C5346' : '#A39E93';
  const badgeBg = isIvory ? 'rgba(182,141,64,0.12)' : 'rgba(229,200,120,0.10)';
  const fontScale = scent.name.length > 18 ? 16.5 : scent.name.length > 14 ? 18.5 : 21;

  return `
    <svg viewBox="0 0 400 400" width="${sizePx}" height="${sizePx}" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 14px 28px rgba(0,0,0,0.45));">
      <defs>
        <path id="topArc-${scent.num}-${sizePx}" d="M 42,200 A 158,158 0 1,1 358,200" />
        <path id="botArc-${scent.num}-${sizePx}" d="M 348,200 A 148,148 0 1,1 52,200" />
      </defs>

      <!-- 2.0" Circle Base -->
      <circle cx="200" cy="200" r="194" fill="${bgFill}" stroke="${outerRing}" stroke-width="3.5" />
      <circle cx="200" cy="200" r="182" fill="none" stroke="${innerRing}" stroke-width="1.2" stroke-dasharray="3 3" />
      <circle cx="200" cy="200" r="168" fill="none" stroke="${innerRing}" stroke-width="0.9" />

      <!-- Curved Top Heritage Text -->
      <text font-family="'Cinzel', 'Didot', Georgia, serif" font-size="9.5" font-weight="700" fill="${goldText}" letter-spacing="2.4">
        <textPath href="#topArc-${scent.num}-${sizePx}" startOffset="50%" text-anchor="middle">
          PUCK &amp; WICK™ • LOUDOUN COUNTY, VA
        </textPath>
      </text>

      <!-- Mini Crossed Sticks & Flame Emblem at Top -->
      <g transform="translate(200, 74)">
        <line x1="-14" y1="-8" x2="14" y2="14" stroke="${goldText}" stroke-width="2.2" stroke-linecap="round" />
        <line x1="14" y1="-8" x2="-14" y2="14" stroke="${goldText}" stroke-width="2.2" stroke-linecap="round" />
        <path d="M 0,1 C -3.5,-4 -5,-10 -2,-15 C -0.5,-17.5 0,-19.5 0,-21 C 0,-19.5 0.5,-17.5 2,-15 C 5,-10 3.5,-4 0,1 Z" fill="${goldText}" />
      </g>

      <!-- Kicker Pill -->
      <rect x="98" y="96" width="204" height="19" rx="9.5" fill="${badgeBg}" stroke="${innerRing}" stroke-width="0.8" />
      <text x="200" y="109" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="8.2" font-weight="700" fill="${goldText}" letter-spacing="1.8">
        ${scent.kicker}
      </text>

      <!-- SCENT NAME (HERO BLOCK ON BOTTOM LABEL) -->
      <text x="200" y="142" text-anchor="middle" font-family="'Cinzel', 'Didot', Georgia, serif" font-size="${fontScale}" font-weight="700" fill="${primaryText}" letter-spacing="2.2">
        ${scent.name}
      </text>

      <!-- 3 OLFACTORY NOTES -->
      <text x="200" y="162" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="9.6" font-weight="500" fill="${goldText}" letter-spacing="0.4">
        ${scent.notes}
      </text>

      <!-- NET WEIGHT & WAX SPEC -->
      <text x="200" y="180" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="8.2" font-weight="600" fill="${mutedText}" letter-spacing="1.2">
        10 OZ VESSEL (8.5 OZ / 240G NET FILL) • WICK: ${scent.wick}
      </text>

      <!-- Gold Divider Line -->
      <line x1="64" y1="194" x2="336" y2="194" stroke="${outerRing}" stroke-width="1" opacity="0.55" />

      <!-- ASTM F2058 SAFETY WARNING HEADER -->
      <g transform="translate(200, 212)">
        <text x="0" y="0" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="8.8" font-weight="800" fill="${goldText}" letter-spacing="1.6">
          ⚠ WARNING: FIRE HAZARD
        </text>
      </g>

      <!-- 3 ASTM Safety Pictograms -->
      <g transform="translate(200, 240)">
        <!-- Icon 1: Burn within sight -->
        <g transform="translate(-75, 0)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="${goldText}" stroke-width="1.3" />
          <ellipse cx="0" cy="0" rx="8" ry="4.5" fill="none" stroke="${primaryText}" stroke-width="1.2" />
          <circle cx="0" cy="0" r="2.2" fill="${goldText}" />
          <text x="0" y="23" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.8" font-weight="600" fill="${mutedText}">BURN IN SIGHT</text>
        </g>
        <!-- Icon 2: Keep away from children/pets -->
        <g transform="translate(0, 0)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="${goldText}" stroke-width="1.3" />
          <path d="M 0,-8 C -3,-3 -4,2 0,7 C 4,2 3,-3 0,-8 Z" fill="${goldText}" />
          <line x1="-9" y1="-9" x2="9" y2="9" stroke="${primaryText}" stroke-width="1.4" />
          <text x="0" y="23" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.8" font-weight="600" fill="${mutedText}">KEEP FROM KIDS</text>
        </g>
        <!-- Icon 3: Trim wick to 1/4 in & Max 4 hrs -->
        <g transform="translate(75, 0)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="${goldText}" stroke-width="1.3" />
          <text x="0" y="3" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="800" fill="${primaryText}">1/4"</text>
          <text x="0" y="23" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.8" font-weight="600" fill="${mutedText}">TRIM WICK 1/4"</text>
        </g>
      </g>

      <!-- Detailed ASTM Warning Copy -->
      <text x="200" y="280" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.3" font-weight="500" fill="${primaryText}" opacity="0.9">
        Burn within sight. Keep away from flammable objects,
      </text>
      <text x="200" y="291" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.3" font-weight="500" fill="${primaryText}" opacity="0.9">
        children &amp; pets. Trim wick to 1/4" before every lighting.
      </text>
      <text x="200" y="302" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.3" font-weight="500" fill="${primaryText}" opacity="0.9">
        Do not burn more than 4 hrs at a time. Place on heat-safe
      </text>
      <text x="200" y="313" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.3" font-weight="500" fill="${primaryText}" opacity="0.9">
        surface. Discontinue use when 1/2" of unmelted wax remains.
      </text>

      <!-- Wax & Odor Tech Sub-line -->
      <text x="200" y="331" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.2" font-weight="700" fill="${goldText}" letter-spacing="1.1">
        COCONUT-APRICOT &amp; SOY CRÈME + ZEOCARB-98™
      </text>
      <text x="200" y="343" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="7.0" font-weight="600" fill="${mutedText}" letter-spacing="1.4">
        PURCELLVILLE, VA • PUCKANDWICK.COM
      </text>
    </svg>
  `;
}

const htmlPage1 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 1050px;
      background: radial-gradient(circle at 50% 20%, #171920 0%, #090A0D 100%);
      color: #F9F6F0;
      font-family: 'Inter', -apple-system, sans-serif;
      padding: 40px 52px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      text-align: center;
      border-bottom: 1px solid rgba(212,175,55,0.28);
      padding-bottom: 18px;
    }
    .kicker {
      color: #E5C878;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 31px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #FFFFFF;
    }
    .sub {
      color: #B5AFA4;
      font-size: 14px;
      margin-top: 6px;
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 44px;
      align-items: center;
      margin: 18px 0;
    }
    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 20px;
      padding: 28px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .card-badge {
      background: rgba(212,175,55,0.14);
      border: 1px solid rgba(212,175,55,0.4);
      color: #E5C878;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      padding: 5px 14px;
      border-radius: 99px;
      margin-bottom: 18px;
      text-transform: uppercase;
    }
    .jar-bottom-simulation {
      width: 490px;
      height: 490px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: inset 0 0 35px rgba(0,0,0,0.85), 0 20px 50px rgba(0,0,0,0.6);
    }
    .jar-obsidian {
      background: radial-gradient(circle, #1E2026 0%, #0C0D10 72%, #050507 100%);
      border: 10px solid #181A20;
    }
    .jar-ivory {
      background: radial-gradient(circle, #F5EFE4 0%, #E5DCCB 74%, #D2C5B0 100%);
      border: 10px solid #EDE5D5;
    }
    .rim-caption {
      position: absolute;
      bottom: 14px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.8px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .rim-obsidian {
      color: #9CA3AF;
      background: rgba(0,0,0,0.65);
    }
    .rim-ivory {
      color: #5C5346;
      background: rgba(255,255,255,0.75);
    }
    .card-desc {
      margin-top: 18px;
      text-align: center;
      font-size: 13.5px;
      line-height: 1.5;
      color: #D1CCC2;
    }
    .card-desc strong {
      color: #E5C878;
    }
    .footer-bar {
      background: rgba(212,175,55,0.08);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 14px;
      padding: 16px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #E5E0D8;
    }
    .footer-bar span strong {
      color: #E5C878;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="kicker">Puck &amp; Wick™ • Quiet Luxury Vessel Architecture</div>
    <h1>2.0" Circular Bottom Scent &amp; ASTM Warning Label</h1>
    <div class="sub">Keeps the Front Glass Jar 100% Universal &amp; Uncluttered — While Putting the Exact Scent Name, 3 Notes, Wick Spec &amp; Fire Warning Underneath</div>
  </div>

  <div class="main-grid">
    <div class="card">
      <div class="card-badge">Men's / Athlete Collection • Matte Obsidian Base</div>
      <div class="jar-bottom-simulation jar-obsidian">
        ${renderBottomLabelSvg(SCENTS[0], 396)}
        <div class="rim-caption rim-obsidian">3.06" Tumbler Bottom Rim • 2.0" Sticker</div>
      </div>
      <div class="card-desc">
        <strong>Shown: #1 Top Shelf (Men's Obsidian Edition)</strong><br/>
        Printed on 2.0" Matte Black Circle Label Stock (OnlineLabels OL325). Features the Crossed-Sticks emblem, Scent Name, 3 Scent Notes, Wick Size (<strong>LX 18</strong>), and full ASTM F2058 Fire Safety Warning.
      </div>
    </div>

    <div class="card">
      <div class="card-badge">Women's Sanctuary Collection • Warm Ivory Base</div>
      <div class="jar-bottom-simulation jar-ivory">
        ${renderBottomLabelSvg(SCENTS[7], 396)}
        <div class="rim-caption rim-ivory">3.06" Tumbler Bottom Rim • 2.0" Sticker</div>
      </div>
      <div class="card-desc">
        <strong>Shown: #8 Cashmere &amp; White Tea (Women's Sanctuary Edition)</strong><br/>
        Printed on 2.0" Warm Cream / Matte White Circle Label Stock. Matches the Frosted Warm Ivory vessel and Brushed Champagne-Gold lid while keeping the front glass crest 100% universal.
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <span><strong>1. Front of Jar:</strong> 100% Universal 2.25"×2.25" Gold Crest (Zero Scent Text)</span>
    <span><strong>2. Inside Jar:</strong> 100% Generic 2.875" Pull-Tab Wax Dust Cover</span>
    <span><strong>3. Bottom of Jar:</strong> 2.0" Scent + Warning Label (Applied Before Pouring)</span>
  </div>
</body>
</html>`;

const htmlPage2 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 1050px;
      background: #0B0C10;
      color: #F9F6F0;
      font-family: 'Inter', -apple-system, sans-serif;
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
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #FFFFFF;
    }
    .sub {
      color: #B5AFA4;
      font-size: 13.5px;
      margin-top: 4px;
    }
    .grid-10 {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 22px;
      justify-items: center;
      align-items: center;
      margin: 14px 0;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 16px;
      padding: 16px 14px;
      width: 100%;
    }
    .item-tag {
      margin-top: 10px;
      font-size: 11.5px;
      font-weight: 700;
      color: #E5C878;
      letter-spacing: 1px;
    }
    .item-sub {
      font-size: 10.5px;
      color: #9CA3AF;
      margin-top: 2px;
    }
    .footer-note {
      text-align: center;
      font-size: 13px;
      color: #D1CCC2;
      background: rgba(212,175,55,0.08);
      border: 1px solid rgba(212,175,55,0.28);
      padding: 12px 24px;
      border-radius: 12px;
    }
    .footer-note strong { color: #E5C878; }
  </style>
</head>
<body>
  <div class="header">
    <div class="kicker">Complete 10-Candle Lineup • 2.0" Bottom Scent + Warning Labels</div>
    <h1>All 10 Scents Ready to Print (7 Men's Obsidian + 3 Women's Sanctuary Ivory)</h1>
    <div class="sub">Each 2.0" bottom sticker includes the Scent Name, 3 Olfactory Notes, Coconut-Apricot Wick Size (LX 18 or LX 16), and ASTM Safety Warning</div>
  </div>

  <div class="grid-10">
    ${SCENTS.map(s => `
      <div class="item">
        ${renderBottomLabelSvg(s, 255)}
        <div class="item-tag">#${s.num} • ${s.name}</div>
        <div class="item-sub">${s.theme === 'ivory' ? "Women's Ivory Jar" : "Men's Obsidian Jar"} • Wick: ${s.wick}</div>
      </div>
    `).join('')}
  </div>

  <div class="footer-note">
    <strong>Basement Workflow Tip:</strong> Open your 12-jar CandleScience box upside-down first, stick these <strong>2.0" Scent + Warning Labels</strong> onto the glass bottoms while they sit in the carton, flip the box over, and wick with the <strong>LX 18 / LX 16</strong> size printed right on the sticker!
  </div>
</body>
</html>`;

const htmlPage3 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 1050px;
      background: radial-gradient(circle at 50% 10%, #171920 0%, #090A0D 100%);
      color: #F9F6F0;
      font-family: 'Inter', -apple-system, sans-serif;
      padding: 38px 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header {
      text-align: center;
      border-bottom: 1px solid rgba(212,175,55,0.28);
      padding-bottom: 16px;
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
      font-size: 29px;
      font-weight: 700;
      letter-spacing: 1.8px;
      color: #FFFFFF;
    }
    .sub {
      color: #B5AFA4;
      font-size: 14px;
      margin-top: 6px;
    }
    .three-col {
      display: grid;
      grid-template-columns: 1fr 1.15fr 1fr;
      gap: 28px;
      align-items: stretch;
      margin: 18px 0;
      flex: 1;
    }
    .panel {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,175,55,0.26);
      border-radius: 18px;
      padding: 24px 26px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .step-pill {
      background: rgba(212,175,55,0.15);
      border: 1px solid rgba(212,175,55,0.45);
      color: #E5C878;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      padding: 5px 14px;
      border-radius: 99px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .panel h2 {
      font-family: 'Cinzel', serif;
      font-size: 19px;
      text-align: center;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .panel p {
      font-size: 13px;
      line-height: 1.5;
      color: #C9C4BA;
      text-align: center;
    }
    .panel p strong {
      color: #E5C878;
    }
    /* L-Wrap Sticker Visual */
    .lwrap-flat {
      width: 520px;
      height: 128px;
      background: #0D0E12;
      border: 2.5px solid #D4AF37;
      border-radius: 8px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      box-shadow: 0 16px 36px rgba(0,0,0,0.65);
      margin: 14px 0;
    }
    .lwrap-half {
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .lwrap-fold {
      position: absolute;
      left: 50%;
      top: -12px;
      bottom: -12px;
      border-left: 2px dashed #E5C878;
    }
    .lwrap-fold-label {
      position: absolute;
      left: 50%;
      top: -26px;
      transform: translateX(-50%);
      background: #E5C878;
      color: #090A0D;
      font-size: 9.5px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .lw-kicker {
      font-size: 9px;
      font-weight: 700;
      color: #E5C878;
      letter-spacing: 1.8px;
      margin-bottom: 5px;
    }
    .lw-title {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 2px;
      margin-bottom: 5px;
    }
    .lw-notes {
      font-size: 10px;
      color: #B5AFA4;
      font-weight: 500;
    }
    /* Box 3D Corner Demo */
    .box-demo {
      width: 290px;
      height: 350px;
      background: linear-gradient(145deg, #16181F 0%, #0A0B0E 100%);
      border: 2px solid rgba(212,175,55,0.35);
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 24px 20px 45px rgba(0,0,0,0.75);
    }
    .box-lid {
      width: 100%;
      height: 76px;
      border-bottom: 2px solid #D4AF37;
      position: relative;
      display: flex;
      justify-content: center;
    }
    .qc-seal {
      position: absolute;
      top: -14px;
      background: #0D0E12;
      border: 1.5px solid #D4AF37;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 8.5px;
      font-weight: 800;
      color: #E5C878;
      letter-spacing: 1.5px;
    }
    .gold-neck {
      width: 96%;
      height: 18px;
      background: linear-gradient(90deg, #9C7A2E 0%, #F1D78A 50%, #9C7A2E 100%);
    }
    .box-body {
      flex: 1;
      width: 100%;
      border-top: 2px solid #D4AF37;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-bottom: 55px;
    }
    .box-crest {
      width: 120px;
      height: 120px;
      border: 1.5px solid #D4AF37;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    .applied-band {
      position: absolute;
      right: -12px;
      bottom: 22px;
      width: 215px;
      background: #0B0C10;
      border: 2px solid #E5C878;
      border-right: 8px solid #E5C878;
      padding: 8px 14px;
      box-shadow: -6px 8px 20px rgba(0,0,0,0.7);
    }
    .summary-strip {
      background: rgba(212,175,55,0.09);
      border: 1px solid rgba(212,175,55,0.32);
      border-radius: 14px;
      padding: 14px 24px;
      display: flex;
      justify-content: space-around;
      font-size: 13px;
    }
    .summary-strip div strong { color: #E5C878; }
  </style>
</head>
<body>
  <div class="header">
    <div class="kicker">How Your Generic Dust Cover &amp; Box Scent Stickers Work Together</div>
    <h1>100% Universal Packaging + 2 Simple Scent Stickers Applied In Person</h1>
    <div class="sub">Your Jar Crest, Dust Cover, Lid, Atelier Card &amp; Box Are All 100% Generic — You Only Stick 2 Small Scent Labels On When Packing!</div>
  </div>

  <div class="three-col">
    <!-- COL 1: 100% Generic Dust Cover -->
    <div class="panel">
      <div class="step-pill">1. Inside Jar: 100% Generic Dust Cover</div>
      <h2>Universal 2.875" Wax Dust Cover</h2>
      <svg viewBox="0 0 340 340" width="285" height="285" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 12px 24px rgba(0,0,0,0.5));">
        <!-- Pull Tab at Top -->
        <rect x="138" y="6" width="64" height="36" rx="10" fill="#111318" stroke="#D4AF37" stroke-width="2.2" />
        <text x="170" y="23" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.5" font-weight="800" fill="#E5C878" letter-spacing="1.4">PULL TAB</text>
        <!-- Main 2.875" Circle -->
        <circle cx="170" cy="180" r="146" fill="#111318" stroke="#D4AF37" stroke-width="2.8" />
        <circle cx="170" cy="180" r="134" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="1" stroke-dasharray="3 3" />
        <!-- Crossed Sticks & Flame above wick hole -->
        <g transform="translate(170, 96)">
          <line x1="-22" y1="-12" x2="22" y2="20" stroke="#E5C878" stroke-width="2.6" stroke-linecap="round" />
          <line x1="22" y1="-12" x2="-22" y2="20" stroke="#E5C878" stroke-width="2.6" stroke-linecap="round" />
          <path d="M 0,2 C -5,-6 -7,-14 -3,-22 C -1,-26 0,-29 0,-31 C 0,-29 1,-26 3,-22 C 7,-14 5,-6 0,2 Z" fill="#E5C878" />
        </g>
        <text x="170" y="138" text-anchor="middle" font-family="'Cinzel', serif" font-size="15" font-weight="700" fill="#FFFFFF" letter-spacing="3">PUCK &amp; WICK</text>
        <!-- Center Wick Hole -->
        <circle cx="170" cy="180" r="15" fill="#07080A" stroke="#D4AF37" stroke-width="2" />
        <text x="170" y="183" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.5" font-weight="700" fill="#9CA3AF">WICK</text>
        <!-- Generic Heritage Text Below Hole -->
        <text x="170" y="226" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" font-weight="700" fill="#E5C878" letter-spacing="2">SMALL-BATCH VIRGINIA POUR</text>
        <text x="170" y="244" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.8" font-weight="500" fill="#B5AFA4" letter-spacing="1.2">COCONUT-APRICOT &amp; SOY CRÈME + ZEOCARB-98™</text>
        <text x="170" y="268" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.2" font-weight="700" fill="#E5C878" letter-spacing="1.6">REMOVE DUST COVER BEFORE LIGHTING</text>
      </svg>
      <p>
        <strong>100% Generic Across All 10 Scents!</strong><br/>
        Zero scent name printed on the dust cover — so you order <strong>1 single bulk pack</strong> (Norman's Printery or Alibaba) and drop it into every candle you pour.
      </p>
    </div>

    <!-- COL 2: The Separate L-Wrap Box Sticker -->
    <div class="panel">
      <div class="step-pill">2. The Separate Box Sticker (3.5" × 0.85")</div>
      <h2>L-Wrap Corner Scent Sticker (Flat View)</h2>
      
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;margin:8px 0;">
        <!-- Men's L-Wrap -->
        <div class="lwrap-flat">
          <div class="lwrap-fold-label">90° BOX CORNER FOLD LINE</div>
          <div class="lwrap-fold"></div>
          <div class="lwrap-half">
            <div class="lw-kicker">SIGNATURE SCENT • BATCH #098</div>
            <div class="lw-title">TOP SHELF</div>
            <div class="lw-notes">Crimson Saffron • White Cedar • Amberwood</div>
          </div>
          <div class="lwrap-half" style="padding-left:26px;">
            <div class="lw-kicker">10 OZ VESSEL (8.5 OZ / 240G FILL)</div>
            <div class="lw-title">TOP SHELF</div>
            <div class="lw-notes">QC #1 CERTIFIED • LOUDOUN CO., VA</div>
          </div>
        </div>

        <!-- Women's L-Wrap -->
        <div class="lwrap-flat" style="background:#FAF6EE;border-color:#B68D40;">
          <div class="lwrap-fold" style="border-left-color:#8C6520;"></div>
          <div class="lwrap-half">
            <div class="lw-kicker" style="color:#8C6520;">SANCTUARY SCENT • BATCH #098</div>
            <div class="lw-title" style="color:#181512;font-size:16px;">CASHMERE &amp; WHITE TEA</div>
            <div class="lw-notes" style="color:#5C5346;">Imperial White Tea • Cashmere • Hinoki</div>
          </div>
          <div class="lwrap-half" style="padding-left:26px;">
            <div class="lw-kicker" style="color:#8C6520;">10 OZ VESSEL (8.5 OZ / 240G FILL)</div>
            <div class="lw-title" style="color:#181512;font-size:16px;">CASHMERE &amp; WHITE TEA</div>
            <div class="lw-notes" style="color:#5C5346;">QC #1 CERTIFIED • LOUDOUN CO., VA</div>
          </div>
        </div>
      </div>

      <p>
        <strong>Yes — This Is a Separate Rectangle Sticker You Apply In Person!</strong><br/>
        Printed on <strong>3.5" × 0.85"</strong> Matte Black / Cream rectangle labels (OnlineLabels OL712 or sheet labels). Half sticks to the <strong>Front</strong> of the box, and the other half wraps 90° around the <strong>Right Side</strong>.
      </p>
    </div>

    <!-- COL 3: How It Wraps Onto the Generic Box -->
    <div class="panel">
      <div class="step-pill">3. Applied to Your Generic Collector Box</div>
      <h2>3-Second Corner Wrap Application</h2>
      
      <div class="box-demo">
        <div class="box-lid">
          <div class="qc-seal">QC #1 SEAL • VA POUR</div>
        </div>
        <div class="gold-neck"></div>
        <div class="box-body">
          <div class="box-crest">
            <svg viewBox="0 0 100 100" width="66" height="66">
              <line x1="20" y1="30" x2="80" y2="85" stroke="#E5C878" stroke-width="3.5" stroke-linecap="round" />
              <line x1="80" y1="30" x2="20" y2="85" stroke="#E5C878" stroke-width="3.5" stroke-linecap="round" />
              <path d="M 50,48 C 43,39 40,28 46,18 C 49,13 50,10 50,7 C 50,10 51,13 54,18 C 60,28 57,39 50,48 Z" fill="#E5C878" />
            </svg>
            <div style="font-family:'Cinzel',serif;font-size:11px;font-weight:700;color:#FFF;letter-spacing:1.5px;margin-top:4px;">PUCK &amp; WICK</div>
          </div>

          <div class="applied-band">
            <div style="font-size:7.5px;font-weight:700;color:#E5C878;letter-spacing:1.4px;">SIGNATURE SCENT • BATCH #098</div>
            <div style="font-family:'Cinzel',serif;font-size:15px;font-weight:700;color:#FFF;letter-spacing:1.5px;margin:2px 0;">TOP SHELF</div>
            <div style="font-size:8.5px;color:#B5AFA4;">Saffron • White Cedar • Amberwood</div>
          </div>
        </div>
      </div>

      <p>
        <strong>Zero Pre-Printed Scent Boxes Needed!</strong><br/>
        Every Men's Box is identical and every Women's Box is identical. When you box a candle, you just wrap the matching <strong>L-Wrap Scent Band</strong> around the bottom-right corner.
      </p>
    </div>
  </div>

  <div class="summary-strip">
    <div><strong>Generic Items (Order in Bulk):</strong> Jars • Front Gold Crests • Gold Lids • 2.875" Dust Covers • 3.5" Atelier Cards • Collector Boxes</div>
    <div><strong>Scent-Specific Stickers (Only 2!):</strong> (1) 2.0" Bottom Jar Label &amp; (2) 3.5"×0.85" Box Corner L-Wrap Band</div>
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1050 }, deviceScaleFactor: 2 });

  const page1 = await context.newPage();
  await page1.setContent(htmlPage1, { waitUntil: 'networkidle' });
  const img1Path = path.join(ARTIFACT_DIR, 'bottom-label-closeup-preview.png');
  await page1.screenshot({ path: img1Path, fullPage: true });

  const page2 = await context.newPage();
  await page2.setContent(htmlPage2, { waitUntil: 'networkidle' });
  const img2Path = path.join(ARTIFACT_DIR, 'all-10-bottom-scent-labels-sheet.png');
  await page2.screenshot({ path: img2Path, fullPage: true });

  const page3 = await context.newPage();
  await page3.setContent(htmlPage3, { waitUntil: 'networkidle' });
  const img3Path = path.join(ARTIFACT_DIR, 'box-corner-band-and-generic-dust-cover-guide.png');
  await page3.screenshot({ path: img3Path, fullPage: true });

  // Also generate a combined 3-page PDF in the workspace
  const combinedHtml = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <style>
      @page { size: 1600px 1050px; margin: 0; }
      body { margin: 0; padding: 0; background: #090A0D; }
      .page { width: 1600px; height: 1050px; page-break-after: always; overflow: hidden; }
      .page:last-child { page-break-after: auto; }
      img { width: 1600px; height: 1050px; display: block; }
    </style>
  </head>
  <body>
    <div class="page"><img src="data:image/png;base64,${fs.readFileSync(img1Path).toString('base64')}" /></div>
    <div class="page"><img src="data:image/png;base64,${fs.readFileSync(img2Path).toString('base64')}" /></div>
    <div class="page"><img src="data:image/png;base64,${fs.readFileSync(img3Path).toString('base64')}" /></div>
  </body>
  </html>`;

  const pdfPage = await context.newPage();
  await pdfPage.setContent(combinedHtml, { waitUntil: 'networkidle' });
  const pdfPath = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Bottom-Labels-and-Box-Scent-Bands.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    width: '1600px',
    height: '1050px',
    printBackground: true
  });

  await browser.close();
  console.log('Generated all 3 images and PDF successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
