import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/d9fdb7f0-3a0e-4eaf-a2c0-a7781c4e3e56';

// Backup original base images once so the script is 100% idempotent across runs
function getBaseImageB64(relPath) {
  const fullPath = path.join(WORKSPACE_DIR, relPath);
  const bakPath = fullPath + '.orig_v2_bak';
  if (!fs.existsSync(bakPath)) {
    fs.copyFileSync(fullPath, bakPath);
  }
  return fs.readFileSync(bakPath).toString('base64');
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // =========================================================================
  // 1. MEN'S BODY WASH BOTTLES (1024x1024 native)
  //    item-bodywash-men.jpg, wash-men-shower.jpg, wash-men-gym-towel.jpg
  // =========================================================================
  for (const relPath of [
    'assets/images/item-bodywash-men.jpg',
    'assets/images/packaging/wash-men-shower.jpg',
    'assets/images/packaging/wash-men-gym-towel.jpg'
  ]) {
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bw-men-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#C4B08A" />
            <stop offset="50%" stop-color="#9A855C" />
            <stop offset="100%" stop-color="#756340" />
          </linearGradient>
        </defs>
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <!-- Subtle Hockey Blade Toes on Crossed Sticks -->
        <path d="M 481.5,551.5 L 476.0,548.5" stroke="#A69066" stroke-width="1.5" stroke-linecap="round" opacity="0.92" />
        <path d="M 519.0,551.5 L 524.5,548.5" stroke="#85714B" stroke-width="1.5" stroke-linecap="round" opacity="0.90" />
        <!-- LOUDOUN COUNTY, VA + USA centered below PUCK & WICK -->
        <text x="500.5" y="597.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.8" font-weight="600" letter-spacing="2.3" fill="url(#bw-men-gold)" opacity="0.92">LOUDOUN COUNTY, VA</text>
        <text x="500.5" y="606.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.8" font-weight="600" letter-spacing="3.2" fill="url(#bw-men-gold)" opacity="0.84">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // =========================================================================
  // 2. WOMEN'S BODY WASH BOTTLES (1024x1024 native)
  //    item-bodywash-women.jpg, wash-women-vanity.jpg, wash-women-shower.jpg
  // =========================================================================
  for (const relPath of [
    'assets/images/item-bodywash-women.jpg',
    'assets/images/packaging/wash-women-vanity.jpg'
  ]) {
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <!-- Subtle Hockey Blade Toes on Crossed Sticks -->
        <path d="M 481.0,548.5 L 475.5,545.5" stroke="#856C43" stroke-width="1.5" stroke-linecap="round" opacity="0.92" />
        <path d="M 519.0,548.5 L 524.5,545.5" stroke="#856C43" stroke-width="1.5" stroke-linecap="round" opacity="0.92" />
        <!-- LOUDOUN COUNTY, VA + USA centered below PUCK & WICK -->
        <text x="500.5" y="610.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.4" font-weight="600" letter-spacing="2.5" fill="#8A7045" opacity="0.90">LOUDOUN COUNTY, VA</text>
        <text x="500.5" y="621.0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.4" font-weight="600" letter-spacing="3.4" fill="#8A7045" opacity="0.82">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // Women's Body Wash in Shower (wash-women-shower.jpg)
  {
    const relPath = 'assets/images/packaging/wash-women-shower.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <path d="M 498.5,561.5 L 494.0,559.0" stroke="#856C43" stroke-width="1.35" stroke-linecap="round" opacity="0.90" />
        <path d="M 524.5,561.5 L 529.0,559.0" stroke="#856C43" stroke-width="1.35" stroke-linecap="round" opacity="0.90" />
        <text x="511.5" y="597.0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="600" letter-spacing="1.9" fill="#8A7045" opacity="0.88">LOUDOUN COUNTY, VA</text>
        <text x="511.5" y="604.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" letter-spacing="2.6" fill="#8A7045" opacity="0.80">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // =========================================================================
  // 3. CLOSED DELUXE BOXES (box-men-closed.jpg & box-women-closed.jpg)
  //    Add subtle stick blades + LOUDOUN COUNTY, VA + USA beneath PUCK & WICK
  // =========================================================================
  {
    const relPath = 'assets/images/box-men-closed.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lid-gold-men" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E5D1A7" />
            <stop offset="55%" stop-color="#C8AF7D" />
            <stop offset="100%" stop-color="#A68D5B" />
          </linearGradient>
        </defs>
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <!-- Subtle Hockey Blade Toes on Closed Matte Black Lid -->
        <path d="M 455.5,391.5 L 441.0,379.5" stroke="url(#lid-gold-men)" stroke-width="3.8" stroke-linecap="round" />
        <path d="M 558.5,434.0 L 575.0,428.5" stroke="url(#lid-gold-men)" stroke-width="3.8" stroke-linecap="round" />
        <!-- LOUDOUN COUNTY, VA + USA below PUCK & WICK in 3D Lid Perspective -->
        <g transform="translate(442, 488) rotate(20.5) skewX(-21)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12.5" font-weight="600" letter-spacing="4.4" fill="url(#lid-gold-men)" opacity="0.92">LOUDOUN COUNTY, VA</text>
          <text x="0" y="19" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.8" font-weight="600" letter-spacing="5.8" fill="url(#lid-gold-men)" opacity="0.86">USA</text>
        </g>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // Women's Closed Deluxe Box (box-women-closed.jpg):
  // Erase "SANCTUARY EXCLUSIVE" by cloning clean warm linen board texture, then add subtle stick blades + LOUDOUN COUNTY, VA + USA
  {
    const relPath = 'assets/images/box-women-closed.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; position: relative; }
        canvas, svg { position: absolute; top: 0; left: 0; width: 1024px; height: 1024px; }
      </style>
    </head><body>
      <canvas id="c" width="1024" height="1024"></canvas>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lid-gold-women" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#AA9268" />
            <stop offset="55%" stop-color="#967E53" />
            <stop offset="100%" stop-color="#7F6840" />
          </linearGradient>
        </defs>
        <!-- Subtle Hockey Blade Toes on Closed Warm Ivory Lid -->
        <path d="M 455.5,391.5 L 441.0,379.5" stroke="url(#lid-gold-women)" stroke-width="3.8" stroke-linecap="round" />
        <path d="M 558.5,434.0 L 575.0,428.5" stroke="url(#lid-gold-women)" stroke-width="3.8" stroke-linecap="round" />
        <!-- LOUDOUN COUNTY, VA + USA below PUCK & WICK in 3D Lid Perspective -->
        <g transform="translate(442, 488) rotate(20.5) skewX(-21)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12.5" font-weight="600" letter-spacing="4.4" fill="url(#lid-gold-women)" opacity="0.92">LOUDOUN COUNTY, VA</text>
          <text x="0" y="19" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.8" font-weight="600" letter-spacing="5.8" fill="url(#lid-gold-women)" opacity="0.86">USA</text>
        </g>
      </svg>
      <script>
        window.__ready = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const c = document.getElementById('c');
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, 1024, 1024);
            // Erase "SANCTUARY EXCLUSIVE" completely by sampling clean linen 36px further down-left along the lid
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(304, 426);
            ctx.lineTo(578, 518);
            ctx.lineTo(564, 556);
            ctx.lineTo(290, 464);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 14, -36, 1024, 1024);
            ctx.restore();
            resolve();
          };
          img.src = "data:image/jpeg;base64,${b64}";
        });
      </script>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([window.__ready, document.fonts.ready]));
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // Also update Closed Puck Boxes (puck-men-box-closed.jpg, puck-women-box-closed.jpg, puck-mini-pair-box-closed.jpg)
  for (const relPath of [
    'assets/images/packaging/puck-men-box-closed.jpg',
    'assets/images/packaging/puck-women-box-closed.jpg'
  ]) {
    if (!fs.existsSync(path.join(WORKSPACE_DIR, relPath))) continue;
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <path d="M 521.0,355.5 L 507.0,344.0" stroke="#C5AF7D" stroke-width="3.6" stroke-linecap="round" />
        <path d="M 634.0,391.5 L 650.0,386.5" stroke="#C5AF7D" stroke-width="3.6" stroke-linecap="round" />
        <g transform="translate(525, 448) rotate(20.5) skewX(-20)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.0" font-weight="600" letter-spacing="4.0" fill="#C5AF7D" opacity="0.9">LOUDOUN COUNTY, VA</text>
          <text x="0" y="17" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.4" font-weight="600" letter-spacing="5.2" fill="#C5AF7D" opacity="0.84">USA</text>
        </g>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  {
    const relPath = 'assets/images/packaging/puck-mini-pair-box-closed.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <path d="M 460.0,312.5 L 445.0,309.5" stroke="#DFCA9B" stroke-width="4.0" stroke-linecap="round" />
        <path d="M 562.0,274.5 L 570.0,262.0" stroke="#DFCA9B" stroke-width="4.0" stroke-linecap="round" />
        <g transform="translate(555, 352) rotate(-14.5) skewX(16)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11.0" font-weight="600" letter-spacing="4.0" fill="#DFCA9B" opacity="0.9">LOUDOUN COUNTY, VA</text>
          <text x="0" y="16" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9.4" font-weight="600" letter-spacing="5.2" fill="#DFCA9B" opacity="0.84">USA</text>
        </g>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // =========================================================================
  // 4. OPEN DELUXE BOXES (box-men-open.jpg & box-women-open.jpg)
  //    - Inside foam: remove "ATHLETE EXCLUSIVE" / "SANCTUARY EXCLUSIVE" writing completely,
  //      leaving ONLY the crossed sticks (with subtle stick blades) and flame!
  //    - Candle Jar & Body Wash Bottle inside the box: add subtle stick blades + LOUDOUN COUNTY, VA + USA
  // =========================================================================
  {
    const relPath = 'assets/images/box-men-open.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; position: relative; }
        canvas, svg { position: absolute; top: 0; left: 0; width: 1024px; height: 1024px; }
      </style>
    </head><body>
      <canvas id="c" width="1024" height="1024"></canvas>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <!-- 1) FOAM EMBLEM: Subtle Hockey Stick Blades ONLY (Zero Text on Foam) -->
        <path d="M 566.5,355.5 L 556.0,347.0" stroke="#C5B083" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 604.5,387.5 L 615.5,383.5" stroke="#C5B083" stroke-width="2.5" stroke-linecap="round" />

        <!-- 2) CANDLE JAR INSIDE BOX: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 259.0,415.5 L 254.0,412.0" stroke="#BBA477" stroke-width="1.3" stroke-linecap="round" />
        <path d="M 277.5,425.0 L 283.0,424.0" stroke="#BBA477" stroke-width="1.3" stroke-linecap="round" />
        <g transform="translate(246, 460) rotate(23.5)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.4" font-weight="600" letter-spacing="1.7" fill="#BBA477" opacity="0.88">LOUDOUN COUNTY, VA</text>
          <text x="0" y="8.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="2.3" fill="#BBA477" opacity="0.80">USA</text>
        </g>

        <!-- 3) BODY WASH BOTTLE INSIDE BOX: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 718.0,548.5 L 713.5,545.0" stroke="#BBA477" stroke-width="1.25" stroke-linecap="round" />
        <path d="M 737.0,557.5 L 742.0,556.5" stroke="#BBA477" stroke-width="1.25" stroke-linecap="round" />
        <g transform="translate(708, 594) rotate(21.5)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" letter-spacing="1.4" fill="#BBA477" opacity="0.86">LOUDOUN COUNTY, VA</text>
          <text x="0" y="7.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.1" font-weight="600" letter-spacing="2.0" fill="#BBA477" opacity="0.78">USA</text>
        </g>
      </svg>
      <script>
        window.__ready = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const c = document.getElementById('c');
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, 1024, 1024);

            // Erase "ATHLETE EXCLUSIVE" by stamping clean charcoal foam from (355, 298, 145, 38) along the 16.8deg text band
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(440, 351);
            ctx.lineTo(682, 424);
            ctx.lineTo(672, 456);
            ctx.lineTo(540, 412);
            ctx.lineTo(432, 378);
            ctx.closePath();
            ctx.clip();

            ctx.translate(440, 349);
            ctx.rotate(16.8 * Math.PI / 180);
            ctx.drawImage(img, 355, 298, 145, 38, -6, 0, 145, 38);
            ctx.drawImage(img, 365, 298, 145, 38, 130, 0, 155, 38);
            ctx.restore();

            resolve();
          };
          img.src = "data:image/jpeg;base64,${b64}";
        });
      </script>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([window.__ready, document.fonts.ready]));
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // Women's Open Deluxe Box (box-women-open.jpg)
  {
    const relPath = 'assets/images/box-women-open.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; position: relative; }
        canvas, svg { position: absolute; top: 0; left: 0; width: 1024px; height: 1024px; }
      </style>
    </head><body>
      <canvas id="c" width="1024" height="1024"></canvas>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <!-- 1) FOAM EMBLEM: Subtle Hockey Stick Blades ONLY (Zero Text on Foam) -->
        <path d="M 568.5,354.5 L 558.0,346.0" stroke="#8C744A" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 606.5,388.5 L 617.5,384.5" stroke="#8C744A" stroke-width="2.5" stroke-linecap="round" />

        <!-- 2) IVORY CANDLE JAR INSIDE BOX: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 255.5,416.0 L 250.5,412.5" stroke="#786340" stroke-width="1.3" stroke-linecap="round" />
        <path d="M 274.5,426.0 L 280.0,425.0" stroke="#786340" stroke-width="1.3" stroke-linecap="round" />
        <g transform="translate(243, 462) rotate(23.5)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.4" font-weight="600" letter-spacing="1.7" fill="#786340" opacity="0.88">LOUDOUN COUNTY, VA</text>
          <text x="0" y="8.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="2.3" fill="#786340" opacity="0.80">USA</text>
        </g>

        <!-- 3) IVORY BODY WASH BOTTLE INSIDE BOX: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 743.5,556.5 L 739.0,553.0" stroke="#786340" stroke-width="1.25" stroke-linecap="round" />
        <path d="M 762.5,566.0 L 767.5,565.0" stroke="#786340" stroke-width="1.25" stroke-linecap="round" />
        <g transform="translate(730, 604) rotate(23.5)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="600" letter-spacing="1.4" fill="#786340" opacity="0.86">LOUDOUN COUNTY, VA</text>
          <text x="0" y="7.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.1" font-weight="600" letter-spacing="2.0" fill="#786340" opacity="0.78">USA</text>
        </g>
      </svg>
      <script>
        window.__ready = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const c = document.getElementById('c');
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, 1024, 1024);

            // Erase "SANCTUARY EXCLUSIVE" by stamping clean cream suede foam from (355, 295, 145, 38) along the 17.2deg text band
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(432, 353);
            ctx.lineTo(704, 437);
            ctx.lineTo(693, 471);
            ctx.lineTo(545, 423);
            ctx.lineTo(422, 383);
            ctx.closePath();
            ctx.clip();

            ctx.translate(432, 351);
            ctx.rotate(17.2 * Math.PI / 180);
            ctx.drawImage(img, 355, 295, 145, 38, -6, 0, 145, 38);
            ctx.drawImage(img, 365, 295, 145, 38, 132, 0, 160, 38);
            ctx.restore();

            resolve();
          };
          img.src = "data:image/jpeg;base64,${b64}";
        });
      </script>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([window.__ready, document.fonts.ready]));
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // =========================================================================
  // 5. ITEMS-OUT DELUXE BOX PHOTOS (box-men-items-out.jpg & box-women-items-out.jpg)
  // =========================================================================
  {
    const relPath = 'assets/images/box-men-items-out.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; }
      </style>
    </head><body>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/jpeg;base64,${b64}" width="1024" height="1024" />
        <!-- Left Candle Jar: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 153.5,616.5 L 148.0,613.5" stroke="#A69066" stroke-width="1.5" stroke-linecap="round" />
        <path d="M 185.5,616.5 L 191.0,613.5" stroke="#A69066" stroke-width="1.5" stroke-linecap="round" />
        <text x="169.5" y="688" text-anchor="middle" font-family="'Inter', sans-serif" font-size="7.0" font-weight="600" letter-spacing="2.3" fill="#A69066" opacity="0.90">LOUDOUN COUNTY, VA</text>
        <text x="169.5" y="699" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.0" font-weight="600" letter-spacing="3.1" fill="#A69066" opacity="0.82">USA</text>

        <!-- Right Body Wash Bottle: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 779.5,578.0 L 774.0,575.0" stroke="#A69066" stroke-width="1.5" stroke-linecap="round" />
        <path d="M 812.5,578.0 L 818.0,575.0" stroke="#A69066" stroke-width="1.5" stroke-linecap="round" />
        <text x="796.0" y="637.5" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.6" font-weight="600" letter-spacing="2.1" fill="#A69066" opacity="0.90">LOUDOUN COUNTY, VA</text>
        <text x="796.0" y="646.0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.6" font-weight="600" letter-spacing="2.9" fill="#A69066" opacity="0.82">USA</text>
      </svg>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // box-women-items-out.jpg:
  // - Inside lid in background: erase "PUCK & WICK" text so ONLY crossed sticks (with subtle stick blades) & flame remain on the inside of the box!
  // - Foreground Candle Jar & Body Wash Bottle: add subtle stick blades + LOUDOUN COUNTY, VA + USA
  {
    const relPath = 'assets/images/box-women-items-out.jpg';
    const b64 = getBaseImageB64(relPath);
    const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
        * { margin: 0; padding: 0; }
        body { width: 1024px; height: 1024px; overflow: hidden; position: relative; }
        canvas, svg { position: absolute; top: 0; left: 0; width: 1024px; height: 1024px; }
      </style>
    </head><body>
      <canvas id="c" width="1024" height="1024"></canvas>
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <!-- 1) INSIDE BOX LID IN BACKGROUND: Subtle Stick Blades ONLY (No Writing) -->
        <path d="M 610.5,240.0 L 606.0,237.5" stroke="#7A6548" stroke-width="1.4" stroke-linecap="round" />
        <path d="M 631.5,242.5 L 636.0,240.0" stroke="#7A6548" stroke-width="1.4" stroke-linecap="round" />

        <!-- 2) FOREGROUND IVORY CANDLE JAR: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 193.5,604.5 L 188.5,601.5" stroke="#6E5A3E" stroke-width="1.4" stroke-linecap="round" />
        <path d="M 215.5,604.5 L 220.5,601.5" stroke="#6E5A3E" stroke-width="1.4" stroke-linecap="round" />
        <text x="204.5" y="649" text-anchor="middle" font-family="'Inter', sans-serif" font-size="6.0" font-weight="600" letter-spacing="1.9" fill="#6E5A3E" opacity="0.88">LOUDOUN COUNTY, VA</text>
        <text x="204.5" y="659" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.2" font-weight="600" letter-spacing="2.5" fill="#6E5A3E" opacity="0.80">USA</text>

        <!-- 3) FOREGROUND IVORY BODY WASH BOTTLE: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA -->
        <path d="M 769.5,558.5 L 764.5,555.5" stroke="#6E5A3E" stroke-width="1.35" stroke-linecap="round" />
        <path d="M 792.5,560.5 L 797.5,557.5" stroke="#6E5A3E" stroke-width="1.35" stroke-linecap="round" />
        <g transform="translate(781, 596.5) rotate(2.5)">
          <text x="0" y="0" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5.4" font-weight="600" letter-spacing="1.7" fill="#6E5A3E" opacity="0.88">LOUDOUN COUNTY, VA</text>
          <text x="0" y="8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.6" font-weight="600" letter-spacing="2.3" fill="#6E5A3E" opacity="0.80">USA</text>
        </g>
      </svg>
      <script>
        window.__ready = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const c = document.getElementById('c');
            const ctx = c.getContext('2d');
            ctx.drawImage(img, 0, 0, 1024, 1024);
            // Erase "PUCK & WICK" on the inside lid of the background open box (x=535..695, y=244..284)
            ctx.save();
            ctx.beginPath();
            ctx.rect(535, 244, 160, 40);
            ctx.clip();
            ctx.drawImage(img, 0, -42, 1024, 1024);
            ctx.restore();
            resolve();
          };
          img.src = "data:image/jpeg;base64,${b64}";
        });
      </script>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([window.__ready, document.fonts.ready]));
    await page.screenshot({ path: path.join(WORKSPACE_DIR, relPath), type: 'jpeg', quality: 94 });
    await page.close();
  }

  // =========================================================================
  // 6. CREATE VISUAL PROOF COLLAGE OF UPDATED BODY WASHES & DELUXE BOXES
  // =========================================================================
  {
    const bwMenB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/item-bodywash-men.jpg')).toString('base64');
    const bwWomenB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/item-bodywash-women.jpg')).toString('base64');
    const boxMenClosedB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/box-men-closed.jpg')).toString('base64');
    const boxWomenClosedB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/box-women-closed.jpg')).toString('base64');
    const boxMenOpenB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/box-men-open.jpg')).toString('base64');
    const boxWomenOpenB64 = fs.readFileSync(path.join(WORKSPACE_DIR, 'assets/images/box-women-open.jpg')).toString('base64');

    const page = await browser.newPage({ viewport: { width: 1260, height: 900 }, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F12; color: #F5F2EB; font-family: 'Inter', sans-serif; padding: 22px 26px; }
        h1 { font-family: 'Cinzel', serif; font-size: 20px; color: #E5C878; text-align: center; letter-spacing: 2px; margin-bottom: 4px; }
        p.sub { font-size: 12px; color: #9CA3AF; text-align: center; margin-bottom: 16px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .card { background: #15181E; border: 1px solid #2A2F3A; border-radius: 10px; padding: 11px; text-align: center; }
        .card img { width: 100%; height: 345px; object-fit: cover; border-radius: 7px; border: 1px solid rgba(212,175,55,0.28); }
        .card h3 { font-size: 12.5px; color: #E5C878; margin-top: 8px; margin-bottom: 2px; }
        .card span { font-size: 11px; color: #9CA3AF; display: block; line-height: 1.3; }
      </style>
    </head><body>
      <h1>UPDATED BODY WASHES &amp; $108 DELUXE COLLECTOR BOXES (CLOSED &amp; OPEN)</h1>
      <p class="sub">Body Washes &amp; Closed Boxes: Subtle Stick Blades + LOUDOUN COUNTY, VA + USA &bull; Inside Open Deluxe Boxes: Sticks &amp; Flame Only (No Extra Writing)</p>
      <div class="grid">
        <div class="card">
          <img src="data:image/jpeg;base64,${bwMenB64}" />
          <h3>Men's 8 oz Body Wash (All 3 Photos)</h3>
          <span>Subtle Stick Blades + LOUDOUN COUNTY, VA + USA</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${boxMenClosedB64}" />
          <h3>Men's $108 Box (Closed Lid)</h3>
          <span>Subtle Stick Blades + PUCK &amp; WICK + LOUDOUN COUNTY, VA + USA</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${boxMenOpenB64}" />
          <h3>Men's $108 Box (Open Inside)</h3>
          <span>Inside Foam: Sticks &amp; Flame Only (No Writing) + Updated Jar &amp; Bottle</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${bwWomenB64}" />
          <h3>Women's 8 oz Body Wash (All 3 Photos)</h3>
          <span>Subtle Stick Blades + LOUDOUN COUNTY, VA + USA</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${boxWomenClosedB64}" />
          <h3>Women's $108 Box (Closed Lid)</h3>
          <span>Subtle Stick Blades + PUCK &amp; WICK + LOUDOUN COUNTY, VA + USA</span>
        </div>
        <div class="card">
          <img src="data:image/jpeg;base64,${boxWomenOpenB64}" />
          <h3>Women's $108 Box (Open Inside)</h3>
          <span>Inside Foam: Sticks &amp; Flame Only (No Writing) + Updated Jar &amp; Bottle</span>
        </div>
      </div>
    </body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'bodywash-and-deluxe-boxes-updated.png') });
    await page.close();
  }

  await browser.close();
  console.log('Updated all Body Wash and Deluxe Box images at native 1024x1024!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
