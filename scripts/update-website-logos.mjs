import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

// Backup original base images once so the script is 100% idempotent
function getBaseImageB64(relPath) {
  const fullPath = path.join(WORKSPACE_DIR, relPath);
  const bakPath = fullPath + '.orig_bak';
  if (!fs.existsSync(bakPath)) {
    fs.copyFileSync(fullPath, bakPath);
  }
  return fs.readFileSync(bakPath).toString('base64');
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // 1. Update shelf-candle-top-shelf.jpg (and copy to all 7 Men's shelf-candle-*.jpg)
  {
    const b64 = getBaseImageB64('assets/images/packaging/shelf-candle-top-shelf.jpg');
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1080px; height: 1080px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jar-gold-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8A7956" stop-opacity="0.88" />
            <stop offset="55%" stop-color="#786848" stop-opacity="0.82" />
            <stop offset="100%" stop-color="#4A3F2B" stop-opacity="0.48" />
          </linearGradient>
        </defs>
        <image href="data:image/jpeg;base64,${b64}" width="1080" height="1080" />

        <!-- LEFT BOX CREST: Subtle Hockey Blade Toes + LOUDOUN COUNTY, VA + USA -->
        <path d="M 347.2,576.8 L 341.2,575.4" stroke="#C5AF7A" stroke-width="1.45" stroke-linecap="round" opacity="0.92" />
        <path d="M 371.2,566.8 L 376.8,562.6" stroke="#C5AF7A" stroke-width="1.45" stroke-linecap="round" opacity="0.92" />
        <g transform="translate(362, 622) rotate(-14.6)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.2" font-weight="600" letter-spacing="2.1" fill="#C4AE78" opacity="0.9">LOUDOUN COUNTY, VA</text>
          <text x="0" y="10.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.4" font-weight="600" letter-spacing="2.8" fill="#C4AE78" opacity="0.82">USA</text>
        </g>

        <!-- RIGHT JAR CREST: Subtle Hockey Blade Toes + LOUDOUN COUNTY, VA + USA -->
        <path d="M 684.2,577.2 L 679.2,575.0" stroke="#7E6E4D" stroke-width="1.3" stroke-linecap="round" opacity="0.85" />
        <path d="M 712.2,577.2 L 717.0,575.0" stroke="#6E5F41" stroke-width="1.3" stroke-linecap="round" opacity="0.78" />
        <g transform="translate(698, 624)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.0" font-weight="600" letter-spacing="2.0" fill="url(#jar-gold-fade)">LOUDOUN COUNTY, VA</text>
          <text x="0" y="10" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.2" font-weight="600" letter-spacing="2.6" fill="url(#jar-gold-fade)" opacity="0.88">USA</text>
        </g>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const menShelfFiles = [
      'assets/images/packaging/shelf-candle-top-shelf.jpg',
      'assets/images/packaging/shelf-candle-fresh-cut.jpg',
      'assets/images/packaging/shelf-candle-balsam-fir.jpg',
      'assets/images/packaging/shelf-candle-barnwood-bourbon.jpg',
      'assets/images/packaging/shelf-candle-rinkside-cedar-smoke.jpg',
      'assets/images/packaging/shelf-candle-warm-amber-vanilla.jpg',
      'assets/images/packaging/shelf-candle-locker-room-mint.jpg'
    ];
    const outPath0 = path.join(WORKSPACE_DIR, menShelfFiles[0]);
    await page.screenshot({ path: outPath0, type: 'jpeg', quality: 94 });
    for (let i = 1; i < menShelfFiles.length; i++) {
      fs.copyFileSync(outPath0, path.join(WORKSPACE_DIR, menShelfFiles[i]));
    }
    await page.close();
  }

  // 2. Update shelf-candle-cashmere-white-tea.jpg (and copy to all 3 Women's shelf-candle-*.jpg)
  {
    const b64 = getBaseImageB64('assets/images/packaging/shelf-candle-cashmere-white-tea.jpg');
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1080px; height: 1080px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1080" height="1080" />

        <!-- LEFT IVORY BOX CREST: Subtle Hockey Blade Toes + LOUDOUN COUNTY, VA + USA -->
        <path d="M 337.2,572.2 L 331.4,570.8" stroke="#9B8256" stroke-width="1.45" stroke-linecap="round" opacity="0.9" />
        <path d="M 363.2,562.2 L 368.8,558.2" stroke="#9B8256" stroke-width="1.45" stroke-linecap="round" opacity="0.9" />
        <g transform="translate(352, 617) rotate(-13.4)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.2" font-weight="600" letter-spacing="2.1" fill="#9B8256" opacity="0.9">LOUDOUN COUNTY, VA</text>
          <text x="0" y="10.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.4" font-weight="600" letter-spacing="2.8" fill="#9B8256" opacity="0.82">USA</text>
        </g>

        <!-- RIGHT IVORY JAR CREST: Subtle Hockey Blade Toes + LOUDOUN COUNTY, VA + USA -->
        <path d="M 650.2,579.2 L 644.8,576.8" stroke="#9D8762" stroke-width="1.35" stroke-linecap="round" opacity="0.86" />
        <path d="M 678.8,579.8 L 684.2,577.4" stroke="#9D8762" stroke-width="1.35" stroke-linecap="round" opacity="0.86" />
        <g transform="translate(664, 628) rotate(0.8)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.1" font-weight="600" letter-spacing="2.0" fill="#9D8762" opacity="0.88">LOUDOUN COUNTY, VA</text>
          <text x="0" y="10.2" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.3" font-weight="600" letter-spacing="2.6" fill="#9D8762" opacity="0.80">USA</text>
        </g>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const womenShelfFiles = [
      'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg',
      'assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg',
      'assets/images/packaging/shelf-candle-sea-salt-orchid.jpg'
    ];
    const outPath0 = path.join(WORKSPACE_DIR, womenShelfFiles[0]);
    await page.screenshot({ path: outPath0, type: 'jpeg', quality: 94 });
    for (let i = 1; i < womenShelfFiles.length; i++) {
      fs.copyFileSync(outPath0, path.join(WORKSPACE_DIR, womenShelfFiles[i]));
    }
    await page.close();
  }

  // 3. Update candle-obsidian.jpg & candle-ivory.jpg
  for (const [relPath, strokeCol, textCol] of [
    ['assets/images/candle-obsidian.jpg', '#BFA36F', '#BFA36F'],
    ['assets/images/candle-ivory.jpg', '#9E8256', '#9E8256']
  ]) {
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1080px; height: 1080px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1080" height="1080" />
        <!-- Subtle Hockey Blade Toes on Lit Jar Crest -->
        <path d="M 513.5,614.5 L 505.5,611.0" stroke="${strokeCol}" stroke-width="1.8" stroke-linecap="round" opacity="0.92" />
        <path d="M 567.5,615.5 L 575.5,612.0" stroke="${strokeCol}" stroke-width="1.8" stroke-linecap="round" opacity="0.92" />
        <!-- LOUDOUN COUNTY, VA + USA below PUCK & WICK -->
        <text x="541" y="700" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" fill="${textCol}" opacity="0.9">LOUDOUN COUNTY, VA</text>
        <text x="541" y="718" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.8" font-weight="600" letter-spacing="4.8" fill="${textCol}" opacity="0.82">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // 4. Update logo-pfp.png (512x512)
  {
    const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 512px; height: 512px; overflow: hidden; background: #0B0C0E; }
      </style>
    </head><body>
      <svg width="512" height="512" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pfp-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#B69146" />
            <stop offset="50%" stop-color="#E5C878" />
            <stop offset="100%" stop-color="#9A7632" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="500" fill="#0B0C0E" />
        <rect x="46" y="46" width="408" height="408" fill="none" stroke="url(#pfp-gold)" stroke-width="4" />
        <rect x="58" y="58" width="384" height="384" fill="none" stroke="url(#pfp-gold)" stroke-width="1.2" opacity="0.35" />
        <g transform="translate(250, 182)">
          <path d="M -46,-40 L 44,42 L 58,36.5" fill="none" stroke="url(#pfp-gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 46,-40 L -44,42 L -58,36.5" fill="none" stroke="url(#pfp-gold)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 0,-12 C -9.5,-23 -13,-38 -5.5,-52 C -1.5,-59 0,-64 0,-68 C 0,-64 1.5,-59 5.5,-52 C 13,-38 9.5,-23 0,-12 Z" fill="url(#pfp-gold)" />
          <path d="M 0,-18 C -3.8,-24 -5,-33 -2,-40 C 0,-44 0.5,-44 2,-40 C 5,-33 3.8,-24 0,-18 Z" fill="#0B0C0E" opacity="0.48" />
        </g>
        <text x="250" y="294" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="40" font-weight="700" letter-spacing="5.5" fill="url(#pfp-gold)">PUCK &amp; WICK</text>
        <text x="250" y="338" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.5" font-weight="600" letter-spacing="4.2" fill="url(#pfp-gold)">LOUDOUN COUNTY, VA</text>
        <text x="250" y="362" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" letter-spacing="5.5" fill="url(#pfp-gold)" opacity="0.88">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, 'assets/images/logo-pfp.png'), type: 'png' });
    await page.close();
  }

  // 5. Update og-share-banner-v2.png and og-share-banner.png (1200x630)
  {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1200px; height: 630px; overflow: hidden; background: #0B0C0E; }
      </style>
    </head><body>
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="og-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#B69146" />
            <stop offset="50%" stop-color="#E5C878" />
            <stop offset="100%" stop-color="#9A7632" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="630" fill="#0B0C0E" />
        <rect x="32" y="32" width="1136" height="566" fill="none" stroke="url(#og-gold)" stroke-width="3.5" />
        <rect x="44" y="44" width="1112" height="542" fill="none" stroke="url(#og-gold)" stroke-width="1" opacity="0.35" />
        <g transform="translate(600, 214)">
          <path d="M -56,-48 L 54,50 L 71,43.5" fill="none" stroke="url(#og-gold)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 56,-48 L -54,50 L -71,43.5" fill="none" stroke="url(#og-gold)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 0,-14 C -11,-27 -15,-45 -6.5,-62 C -2,-70 0,-76 0,-81 C 0,-76 2,-70 6.5,-62 C 15,-45 11,-27 0,-14 Z" fill="url(#og-gold)" />
          <path d="M 0,-21 C -4.5,-28 -6,-39 -2.5,-47 C 0,-52 0.5,-52 2.5,-47 C 6,-39 4.5,-28 0,-21 Z" fill="#0B0C0E" opacity="0.48" />
        </g>
        <text x="600" y="362" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="56" font-weight="700" letter-spacing="8" fill="url(#og-gold)">PUCK &amp; WICK</text>
        <text x="600" y="438" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="600" letter-spacing="6.5" fill="url(#og-gold)">LOUDOUN COUNTY, VA</text>
        <text x="600" y="474" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="600" letter-spacing="8" fill="url(#og-gold)" opacity="0.88">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const ogV2 = path.join(WORKSPACE_DIR, 'assets/images/og-share-banner-v2.png');
    await page.screenshot({ path: ogV2, type: 'png' });
    fs.copyFileSync(ogV2, path.join(WORKSPACE_DIR, 'assets/images/og-share-banner.png'));
    await page.close();
  }

  // 6. Create a visual verification collage in ARTIFACT_DIR so the user can see the updated website photos & logos side-by-side
  {
    const topShelfB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/packaging/shelf-candle-top-shelf.jpg')).toString('base64');
    const cashmereB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/packaging/shelf-candle-cashmere-white-tea.jpg')).toString('base64');
    const pfpB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/logo-pfp.png')).toString('base64');
    const ogB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/og-share-banner-v2.png')).toString('base64');

    const page = await browser.newPage({ viewport: { width: 1200, height: 860 }, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F12; color: #F5F2EB; font-family: 'Inter', sans-serif; padding: 24px 28px; }
        h1 { font-family: 'Cinzel', serif; font-size: 21px; color: #E5C878; text-align: center; letter-spacing: 2px; margin-bottom: 6px; }
        p.sub { font-size: 12.5px; color: #9CA3AF; text-align: center; margin-bottom: 20px; }
        .grid-top { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 18px; }
        .card { background: #15181E; border: 1px solid #2A2F3A; border-radius: 12px; padding: 14px; text-align: center; }
        .card img { width: 100%; height: 390px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(212,175,55,0.28); }
        .card h3 { font-size: 13px; color: #E5C878; margin-top: 10px; margin-bottom: 3px; }
        .card span { font-size: 11.5px; color: #9CA3AF; }
        .grid-bot { display: grid; grid-template-columns: 280px 1fr; gap: 20px; }
        .grid-bot .card img { height: 195px; object-fit: contain; background: #0B0C0E; }
      </style>
    </head><body>
      <h1>WEBSITE UPDATED WITH THE NEW 98/100 MASTER CREST</h1>
      <p class="sub">Subtle Hockey Blade Toes &bull; PUCK &amp; WICK &bull; LOUDOUN COUNTY, VA &bull; USA Centered at Bottom</p>
      <div class="grid-top">
        <div class="card">
          <img src="data:image/jpeg;base64,${topShelfB64}" />
          <h3>Men's Matte Obsidian Candle &amp; Box Photos (All 7 Scents)</h3>
          <span>Updated on Hero Stage, Bento Trio, Catalog Cards &amp; Quick-View Modals</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${cashmereB64}" />
          <h3>Women's Sanctuary Ivory Candle &amp; Box Photos (All 3 Scents)</h3>
          <span>Updated across Catalog Cards &amp; Quick-View Modals</span>
        </div>
      </div>
      <div class="grid-bot">
        <div class="card">
          <img src="data:image/png;base64,${pfpB64}" />
          <h3>Site Favicon &amp; PFP (logo-pfp.png)</h3>
          <span>512&times;512 Master Crest</span>
        </div>
        <div class="card">
          <img src="data:image/png;base64,${ogB64}" />
          <h3>iMessage / Social Link Share Banner (og-share-banner-v2.png)</h3>
          <span>1200&times;630 Open Graph Preview + SVG Vector Assets + 360&deg; Box Viewer</span>
        </div>
      </div>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'website-logos-updated-preview.png') });
    await page.close();
  }

  await browser.close();
  console.log('All website logos and candle photos updated!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
