import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('instagram-kit/story-slides');
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
<link href="https://fonts.gstatic.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px;
    height: 1920px;
    background: radial-gradient(circle at 50% 35%, #161922 0%, #090A0D 80%);
    color: #FAF5E8;
    font-family: 'Inter', -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 130px 72px 140px;
    position: relative;
    overflow: hidden;
  }
  .outer-frame {
    position: absolute;
    inset: 44px;
    border: 2px solid rgba(212, 175, 55, 0.48);
    pointer-events: none;
  }
  .inner-frame {
    position: absolute;
    inset: 54px;
    border: 1px solid rgba(212, 175, 55, 0.22);
    pointer-events: none;
  }
  .top-header {
    text-align: center;
    z-index: 2;
  }
  .kicker {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #E5C878;
    background: rgba(212, 175, 55, 0.12);
    border: 1px solid rgba(212, 175, 55, 0.45);
    padding: 10px 28px;
    border-radius: 999px;
    margin-bottom: 26px;
  }
  .headline {
    font-family: 'Cormorant Garamond', 'Cinzel', serif;
    font-size: 74px;
    font-weight: 700;
    line-height: 1.08;
    color: #FFFFFF;
    margin-bottom: 18px;
  }
  .subline {
    font-size: 27px;
    color: #B8BDC8;
    line-height: 1.45;
    max-width: 840px;
    margin: 0 auto;
  }
  .photo-card {
    width: 100%;
    height: 920px;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid rgba(212, 175, 55, 0.55);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85);
    position: relative;
    z-index: 2;
    background: #08090C;
  }
  .photo-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .bottom-footer {
    text-align: center;
    z-index: 2;
  }
  .bullets {
    display: flex;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-bottom: 34px;
  }
  .pill {
    font-size: 22px;
    font-weight: 600;
    color: #FAF5E8;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.38);
    padding: 12px 26px;
    border-radius: 10px;
  }
  .cta-bar {
    display: inline-block;
    background: linear-gradient(135deg, #F3DC92 0%, #C59B43 50%, #9A7632 100%);
    color: #090A0D;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 22px 52px;
    border-radius: 999px;
  }
</style>
`;

const slides = [
  {
    filename: 'story-1-soy-candles.png',
    highlightTitle: 'Soy Candles',
    kicker: 'In Stock Now • $36',
    headline: '100% American Soy Candles',
    subline: 'Hand-poured in Loudoun County, VA with clean phthalate-free fragrance oils & lead-free braided cotton wicks.',
    img: fileToDataUrl('assets/images/packaging/shelf-candle-top-shelf.jpg'),
    pills: ['60–70 Hr Clean Burn', 'Zero Phthalates', 'Rigid Collector Box'],
    cta: 'Shop Now at puckandwick.com'
  },
  {
    filename: 'story-2-sanctuary.png',
    highlightTitle: 'Sanctuary',
    kicker: 'In Stock Now • $36',
    headline: 'Women’s Sanctuary Collection',
    subline: 'Warm alabaster-ivory vessels & botanical pours crafted for serene spaces, studios & evening rituals.',
    img: fileToDataUrl('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
    pills: ['Velvet Vanilla & Santal', 'Sea Salt & Orchid', 'Cashmere & White Tea'],
    cta: 'Shop Sanctuary at puckandwick.com'
  },
  {
    filename: 'story-3-our-story.png',
    highlightTitle: 'Our Story',
    kicker: 'Lausanne Born • Loudoun Co. VA',
    headline: '25 Years on the Ice → The Atelier',
    subline: 'Bringing the discipline of competitive hockey into small-batch luxury home fragrance & molecular odor science.',
    img: fileToDataUrl('assets/images/packaging/atelier-card-obsidian.jpg'),
    pills: ['QC #1 Hand-Pour Standard', 'Purcellville, VA', '@bluehydrangeapurcellville'],
    cta: 'Read Our Story • puckandwick.com'
  },
  {
    filename: 'story-4-odor-pucks.png',
    highlightTitle: 'Odor Pucks',
    kicker: 'Coming Soon • Drop 01 Waitlist',
    headline: 'Lauson-98™ Odor Hardware',
    subline: 'Anodized aluminum pucks with 360° micro-perforated diffusion ports for hockey bags, skates, gloves & yoga totes.',
    img: fileToDataUrl('assets/images/packaging/puck-men-angled-open.jpg'),
    pills: ['3.0" Bag Puck ($44)', '2.0" Mini Pucks ($38)', '6+ Months Active Lock'],
    cta: 'Join VIP Waitlist • puckandwick.com'
  },
  {
    filename: 'story-5-98-boxes.png',
    highlightTitle: '$98 Boxes',
    kicker: 'Coming Soon • Batch 01 Waitlist',
    headline: 'The $98 Collector Gift Boxes',
    subline: 'Custom 10 oz Soy Candle + 3.0" Lauson-98™ Odor Puck + Full-Size Charcoal Wash or Botanical Linen Mist ($124 Value).',
    img: fileToDataUrl('assets/images/box-men-open.jpg'),
    pills: ['Men’s Athlete Edition', 'Women’s Sanctuary Edition', 'Save $26 Bundle'],
    cta: 'Reserve Batch 01 • puckandwick.com'
  }
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });

for (const s of slides) {
  const html = `<!DOCTYPE html><html><head>${fontsHead}</head><body>
    <div class="outer-frame"></div>
    <div class="inner-frame"></div>
    <div class="top-header">
      <div class="kicker">${s.kicker}</div>
      <div class="headline">${s.headline}</div>
      <div class="subline">${s.subline}</div>
    </div>
    <div class="photo-card">
      <img src="${s.img}" />
    </div>
    <div class="bottom-footer">
      <div class="bullets">
        ${s.pills.map(p => `<span class="pill">${p}</span>`).join('')}
      </div>
      <div class="cta-bar">${s.cta}</div>
    </div>
  </body></html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const outPath = path.join(outDir, s.filename);
  await page.screenshot({ path: outPath });
  fs.copyFileSync(outPath, path.join(artifactDir, s.filename));
  console.log('Rendered', s.filename);
}

await browser.close();
