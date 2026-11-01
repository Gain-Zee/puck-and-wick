import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('instagram-kit');
const artifactDir = '/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc';
fs.mkdirSync(outDir, { recursive: true });

function fileToDataUrl(relPath) {
  const abs = path.resolve(relPath);
  const buf = fs.readFileSync(abs);
  const ext = path.extname(relPath).toLowerCase() === '.png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}

const fontsHead = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0B0C0E; font-family: 'Inter', -apple-system, sans-serif; color: #fff; }
</style>
`;

// 1. Circular-Safe Square Frame Precision Mark Profile Pic (1080x1080)
const profileSquareFrameHtml = `<!DOCTYPE html><html><head>${fontsHead}</head>
<body style="width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 50%, #14171F 0%, #090A0D 75%);">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="1080" height="1080">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B69146" />
        <stop offset="50%" stop-color="#F1D78A" />
        <stop offset="100%" stop-color="#9A7632" />
      </linearGradient>
    </defs>
    <!-- Subtle outer circle guide inside Instagram avatar crop -->
    <circle cx="250" cy="250" r="236" fill="none" stroke="url(#g)" stroke-width="1.2" opacity="0.35" />
    <!-- Square Hairline Frame sized inside circle safe-zone (310x310 -> diagonal = 438 < 472 circle diameter) -->
    <rect x="95" y="95" width="310" height="310" fill="#0B0C0E" stroke="url(#g)" stroke-width="3.5" />
    <rect x="103" y="103" width="294" height="294" fill="none" stroke="url(#g)" stroke-width="0.9" opacity="0.45" />
    <!-- Minimalist Crossed Lines + Flame -->
    <g transform="translate(250, 202)">
      <line x1="-38" y1="-34" x2="38" y2="38" stroke="url(#g)" stroke-width="3" stroke-linecap="round" />
      <line x1="38" y1="-34" x2="-38" y2="38" stroke="url(#g)" stroke-width="3" stroke-linecap="round" />
      <path d="M 0,-12 C -7.5,-21 -10.5,-33 -4.5,-45 C -1,-50 0,-55 0,-58 C 0,-55 1,-50 4.5,-45 C 10.5,-33 7.5,-21 0,-12 Z" fill="url(#g)" />
      <path d="M 0,-16 C -3,-21 -4,-28 -1.5,-34 C 0,-37 0.5,-37 1.5,-34 C 4,-28 3,-21 0,-16 Z" fill="#0B0C0E" opacity="0.45" />
    </g>
    <!-- Primary Wordmark -->
    <text x="250" y="298" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="33" font-weight="700" letter-spacing="4.5" fill="url(#g)">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="11" font-weight="600" dy="-13" dx="2" letter-spacing="0">&#8482;</tspan></text>
    <line x1="175" y1="318" x2="325" y2="318" stroke="url(#g)" stroke-width="1" opacity="0.55" />
    <text x="250" y="342" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.5" font-weight="600" letter-spacing="4.2" fill="#D5C7A3">LOUDOUN CO. VA</text>
  </svg>
</body></html>`;

// 2. Circular-Rim Precision Mark Profile Pic (1080x1080 — Designed specifically to hug Instagram's circle crop)
const profileCircleRimHtml = `<!DOCTYPE html><html><head>${fontsHead}</head>
<body style="width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%, #161922 0%, #08090C 78%);">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="1080" height="1080">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B69146" />
        <stop offset="50%" stop-color="#F3DC92" />
        <stop offset="100%" stop-color="#9A7632" />
      </linearGradient>
    </defs>
    <circle cx="250" cy="250" r="228" fill="none" stroke="url(#g)" stroke-width="4" />
    <circle cx="250" cy="250" r="218" fill="none" stroke="url(#g)" stroke-width="1.1" opacity="0.55" />
    <!-- Minimalist Crossed Lines + Flame -->
    <g transform="translate(250, 188)">
      <line x1="-48" y1="-42" x2="48" y2="48" stroke="url(#g)" stroke-width="3.6" stroke-linecap="round" />
      <line x1="48" y1="-42" x2="-48" y2="48" stroke="url(#g)" stroke-width="3.6" stroke-linecap="round" />
      <path d="M 0,-14 C -9,-26 -13,-40 -5.5,-55 C -1.5,-61 0,-67 0,-71 C 0,-67 1.5,-61 5.5,-55 C 13,-40 9,-26 0,-14 Z" fill="url(#g)" />
      <path d="M 0,-19 C -3.8,-26 -5,-35 -2,-42 C 0,-46 0.6,-46 2,-42 C 5,-35 3.8,-26 0,-19 Z" fill="#0B0C0E" opacity="0.48" />
    </g>
    <text x="250" y="305" text-anchor="middle" font-family="'Cormorant Garamond', 'Cinzel', serif" font-size="42" font-weight="700" letter-spacing="5.5" fill="url(#g)">PUCK &amp; WICK<tspan font-family="'Inter', sans-serif" font-size="13" font-weight="600" dy="-16" dx="2" letter-spacing="0">&#8482;</tspan></text>
    <line x1="150" y1="330" x2="350" y2="330" stroke="url(#g)" stroke-width="1.2" opacity="0.6" />
    <text x="250" y="358" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="600" letter-spacing="5" fill="#E6DEC8">LOUDOUN CO. VA</text>
  </svg>
</body></html>`;

function buildHighlightHtml(iconSvg, label) {
  return `<!DOCTYPE html><html><head>${fontsHead}</head>
  <body style="width:1080px;height:1080px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%, #161922 0%, #090A0D 78%);">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="1080" height="1080">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B69146" />
          <stop offset="50%" stop-color="#F3DC92" />
          <stop offset="100%" stop-color="#9A7632" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="250" r="224" fill="none" stroke="url(#g)" stroke-width="3.2" />
      <circle cx="250" cy="250" r="214" fill="none" stroke="url(#g)" stroke-width="1" opacity="0.45" />
      ${iconSvg}
      <text x="250" y="366" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="700" letter-spacing="5.5" fill="url(#g)">${label}</text>
    </svg>
  </body></html>`;
}

const highlights = [
  {
    name: 'ig-highlight-1-boxes.png',
    label: '$98 BOXES',
    svg: `
      <g transform="translate(250, 225)" fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="-68" y="-45" width="136" height="102" rx="4" />
        <rect x="-74" y="-68" width="148" height="26" rx="3" />
        <line x1="-68" y1="-34" x2="68" y2="-34" stroke-width="1.6" opacity="0.7" />
        <line x1="0" y1="-68" x2="0" y2="57" stroke-width="2.2" opacity="0.85" />
      </g>`
  },
  {
    name: 'ig-highlight-2-pucks.png',
    label: 'ODOR PUCKS',
    svg: `
      <g transform="translate(250, 222)" fill="none" stroke="url(#g)">
        <circle cx="0" cy="0" r="76" stroke-width="3.5" />
        <circle cx="0" cy="0" r="64" stroke-width="1.8" stroke-dasharray="3 6.5" />
        <circle cx="0" cy="0" r="56" stroke-width="1.8" stroke-dasharray="3 6.5" />
        <circle cx="0" cy="0" r="48" stroke-width="2.2" fill="#0B0C0E" />
      </g>`
  },
  {
    name: 'ig-highlight-3-candles.png',
    label: 'SOY CANDLES',
    svg: `
      <g transform="translate(250, 232)" fill="none" stroke="url(#g)" stroke-width="3.2">
        <rect x="-46" y="-32" width="92" height="104" rx="5" />
        <rect x="-30" y="-12" width="60" height="62" stroke-width="1.6" opacity="0.8" />
        <path d="M 0,-42 C -10,-56 -13,-72 -5,-88 C -1,-95 0,-100 0,-104 C 0,-100 1,-95 5,-88 C 13,-72 10,-56 0,-42 Z" fill="url(#g)" stroke="none" />
      </g>`
  },
  {
    name: 'ig-highlight-4-sanctuary.png',
    label: 'SANCTUARY',
    svg: `
      <g transform="translate(250, 222)" fill="none" stroke="url(#g)" stroke-width="3">
        <path d="M 0,-78 L 14,-22 L 70,-8 L 14,6 L 0,62 L -14,6 L -70,-8 L -14,-22 Z" fill="url(#g)" fill-opacity="0.12" />
        <circle cx="0" cy="-8" r="6" fill="url(#g)" />
      </g>`
  },
  {
    name: 'ig-highlight-5-story.png',
    label: 'OUR STORY',
    svg: `
      <g transform="translate(250, 226)">
        <line x1="-52" y1="-46" x2="52" y2="52" stroke="url(#g)" stroke-width="3.6" stroke-linecap="round" />
        <line x1="52" y1="-46" x2="-52" y2="52" stroke="url(#g)" stroke-width="3.6" stroke-linecap="round" />
        <path d="M 0,-16 C -10,-28 -14,-44 -6,-60 C -1.5,-67 0,-73 0,-77 C 0,-73 1.5,-67 6,-60 C 14,-44 10,-28 0,-16 Z" fill="url(#g)" />
      </g>`
  }
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });

async function renderPageToFile(html, filename, width = 1080, height = 1080) {
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const outPath = path.join(outDir, filename);
  await page.screenshot({ path: outPath });
  fs.copyFileSync(outPath, path.join(artifactDir, filename));
  console.log('Rendered', filename);
}

await renderPageToFile(profileSquareFrameHtml, 'ig-profile-pic-square-frame.png');
await renderPageToFile(profileCircleRimHtml, 'ig-profile-pic-circle-edition.png');

for (const h of highlights) {
  await renderPageToFile(buildHighlightHtml(h.svg, h.label), h.name);
}

// Now render the Full iPhone Instagram Profile Mockup ("After" Preview)
const avatarUrl = fileToDataUrl('instagram-kit/ig-profile-pic-circle-edition.png');
const hl1 = fileToDataUrl('instagram-kit/ig-highlight-1-boxes.png');
const hl2 = fileToDataUrl('instagram-kit/ig-highlight-2-pucks.png');
const hl3 = fileToDataUrl('instagram-kit/ig-highlight-3-candles.png');
const hl4 = fileToDataUrl('instagram-kit/ig-highlight-4-sanctuary.png');
const hl5 = fileToDataUrl('instagram-kit/ig-highlight-5-story.png');

const post1 = fileToDataUrl('assets/images/candle-obsidian.jpg');
const post2 = fileToDataUrl('assets/images/candle-ivory.jpg');
const post3 = fileToDataUrl('assets/images/packaging/puck-men-angled-open.jpg');
const post4 = fileToDataUrl('assets/images/packaging/shelf-candle-top-shelf.jpg');
const post5 = fileToDataUrl('assets/images/packaging/atelier-card-obsidian.jpg');
const post6 = fileToDataUrl('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg');
const post7 = fileToDataUrl('assets/images/box-men-open.jpg');
const post8 = fileToDataUrl('assets/images/mini-pucks-action-triptych.jpg');
const post9 = fileToDataUrl('assets/images/box-women-open.jpg');

const mockupHtml = `<!DOCTYPE html><html><head>${fontsHead}
<style>
  body {
    width: 1080px;
    height: 1920px;
    background: #000000;
    color: #F5F5F5;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    padding: 0;
    overflow: hidden;
  }
  .topbar {
    height: 110px;
    padding: 36px 36px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .profile-header {
    padding: 28px 36px 18px;
    display: flex;
    align-items: center;
    gap: 48px;
  }
  .avatar-ring {
    width: 224px;
    height: 224px;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(135deg, #F3DC92 0%, #B69146 50%, #8A6624 100%);
    flex-shrink: 0;
  }
  .avatar-ring img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    border: 4px solid #000;
  }
  .stats-block {
    flex: 1;
  }
  .display-name {
    font-size: 32px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .stats-row {
    display: flex;
    gap: 54px;
  }
  .stat-item strong {
    display: block;
    font-size: 34px;
    font-weight: 700;
  }
  .stat-item span {
    font-size: 26px;
    color: #A8A8A8;
  }
  .bio-section {
    padding: 8px 36px 24px;
    font-size: 27px;
    line-height: 1.44;
  }
  .category-tag {
    color: #A8A8A8;
    font-size: 26px;
    margin-bottom: 6px;
  }
  .bio-line {
    color: #F5F5F5;
  }
  .bio-mention {
    color: #E0F1FF;
  }
  .bio-link {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #E5C878;
    font-weight: 600;
    font-size: 27px;
  }
  .action-btns {
    padding: 0 36px 28px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .ig-btn {
    background: #262626;
    border-radius: 16px;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 27px;
    font-weight: 600;
    color: #fff;
  }
  .highlights-row {
    padding: 6px 36px 28px;
    display: flex;
    gap: 34px;
  }
  .hl-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 156px;
  }
  .hl-circle {
    width: 148px;
    height: 148px;
    border-radius: 50%;
    padding: 4px;
    border: 2px solid #363636;
    background: #121212;
  }
  .hl-circle img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
  }
  .hl-label {
    font-size: 22px;
    color: #EAEAEA;
    white-space: nowrap;
  }
  .tabs-bar {
    height: 86px;
    border-top: 1px solid #222;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
  }
  .tab-active {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid #fff;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .grid-cell {
    position: relative;
    aspect-ratio: 1 / 1;
    background: #111;
    overflow: hidden;
  }
  .grid-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .pin-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(0,0,0,0.65);
    border: 1px solid rgba(229,200,120,0.6);
    color: #E5C878;
    font-size: 17px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 99px;
    letter-spacing: 0.06em;
  }
</style></head>
<body>
  <div class="topbar">
    <span>＋</span>
    <span>puckandwick ⌄</span>
    <span>☰</span>
  </div>

  <div class="profile-header">
    <div class="avatar-ring">
      <img src="${avatarUrl}" />
    </div>
    <div class="stats-block">
      <div class="display-name">Puck &amp; Wick™ | Luxury Soy Candles &amp; Odor Gear</div>
      <div class="stats-row">
        <div class="stat-item"><strong>9</strong><span>posts</span></div>
        <div class="stat-item"><strong>169</strong><span>followers</span></div>
        <div class="stat-item"><strong>40</strong><span>following</span></div>
      </div>
    </div>
  </div>

  <div class="bio-section">
    <div class="category-tag">Luxury Candle &amp; Home Goods Atelier</div>
    <div class="bio-line">🕯️ 100% American Soy Candles — In Stock Now ($36)</div>
    <div class="bio-line">🏒 25 Yrs on the Ice → Hand-Poured in Loudoun Co, VA</div>
    <div class="bio-line">✨ Drop 01 Waitlist: Lauson-98™ Pucks &amp; $98 Boxes</div>
    <div class="bio-line">📍 Retail: <span class="bio-mention">@bluehydrangeapurcellville</span> • Shop Online ↓</div>
    <div class="bio-link">🔗 puckandwick.com</div>
  </div>

  <div class="action-btns">
    <div class="ig-btn">Edit profile</div>
    <div class="ig-btn">Share profile</div>
  </div>

  <div class="highlights-row">
    <div class="hl-item"><div class="hl-circle"><img src="${hl3}"/></div><span class="hl-label">Soy Candles</span></div>
    <div class="hl-item"><div class="hl-circle"><img src="${hl4}"/></div><span class="hl-label">Sanctuary</span></div>
    <div class="hl-item"><div class="hl-circle"><img src="${hl5}"/></div><span class="hl-label">Our Story</span></div>
    <div class="hl-item"><div class="hl-circle"><img src="${hl2}"/></div><span class="hl-label">Odor Pucks</span></div>
    <div class="hl-item"><div class="hl-circle"><img src="${hl1}"/></div><span class="hl-label">$98 Boxes</span></div>
  </div>

  <div class="tabs-bar">
    <div class="tab-active">▦</div>
    <div style="color:#777;font-size:32px;">▶</div>
    <div style="color:#777;font-size:32px;">👤</div>
  </div>

  <div class="grid">
    <div class="grid-cell"><img src="${post1}"/><span class="pin-badge">📌 IN STOCK</span></div>
    <div class="grid-cell"><img src="${post2}"/><span class="pin-badge">📌 IN STOCK</span></div>
    <div class="grid-cell"><img src="${post3}"/><span class="pin-badge">📌 DROP 01</span></div>
    <div class="grid-cell"><img src="${post4}"/></div>
    <div class="grid-cell"><img src="${post5}"/></div>
    <div class="grid-cell"><img src="${post6}"/></div>
    <div class="grid-cell"><img src="${post7}"/><span class="pin-badge">COMING SOON</span></div>
    <div class="grid-cell"><img src="${post8}"/><span class="pin-badge">COMING SOON</span></div>
    <div class="grid-cell"><img src="${post9}"/><span class="pin-badge">COMING SOON</span></div>
  </div>
</body></html>`;

await renderPageToFile(mockupHtml, 'ig-profile-mockup-after.png', 1080, 1920);
await browser.close();
