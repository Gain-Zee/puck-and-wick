import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const DESKTOP_ROOT = '/Users/georgiiskrenov/Desktop/PUCK-AND-WICK-PRINTER-LABEL-FILES';
const DIR_FRONT = path.join(DESKTOP_ROOT, '01-Main-Universal-Front-Labels-2.25x2.25in');
const DIR_BOTTOM_10OZ = path.join(DESKTOP_ROOT, '02-Round-Bottom-Scent-Labels-2in-Standard-10oz');
const DIR_BOTTOM_NOWT = path.join(DESKTOP_ROOT, '03-Round-Bottom-Scent-Labels-2in-No-Weights');
const DIR_SHEETS = path.join(DESKTOP_ROOT, '04-Full-8.5x11-Printable-Sheets');

for (const d of [DESKTOP_ROOT, DIR_FRONT, DIR_BOTTOM_10OZ, DIR_BOTTOM_NOWT, DIR_SHEETS]) {
  fs.mkdirSync(d, { recursive: true });
}

const SCENTS = [
  { num: '01', slug: '01-Top-Shelf', name: 'TOP SHELF', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Crimson Saffron • White Cedar • Amberwood', wick: 'LX 18', theme: 'obsidian' },
  { num: '02', slug: '02-Fresh-Cut', name: 'FRESH CUT', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Italian Bergamot • Hinoki Wood • Vetiver', wick: 'LX 16', theme: 'obsidian' },
  { num: '03', slug: '03-Balsam-Fir', name: 'BALSAM FIR', kicker: 'SEASONAL COLLAB • BATCH #098', vintageKicker: 'SEASONAL COLLAB • BATCH #098', notes: 'Fraser Pine • Resinous Balsam • Cedar Bark', wick: 'LX 18', theme: 'obsidian' },
  { num: '04', slug: '04-Barnwood-and-Bourbon', name: 'BARNWOOD & BOURBON', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Small-Batch Rye • Weathered Oak • Vanilla', wick: 'LX 18', theme: 'obsidian' },
  { num: '05', slug: '05-Rinkside-Cedar-and-Smoke', name: 'RINKSIDE CEDAR & SMOKE', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Birchwood Smoke • Atlas Cedar • Glove Leather', wick: 'LX 18', theme: 'obsidian' },
  { num: '06', slug: '06-Warm-Amber-and-Vanilla', name: 'WARM AMBER & VANILLA', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Baltic Amber • Cashmere Musk • Vanilla Bean', wick: 'LX 18', theme: 'obsidian' },
  { num: '07', slug: '07-Locker-Room-Mint', name: 'LOCKER ROOM MINT', kicker: 'MENS SIGNATURE • BATCH #098', vintageKicker: 'SIGNATURE POUR • BATCH #098', notes: 'Crushed Spearmint • Blue Eucalyptus • Cedar', wick: 'LX 16', theme: 'obsidian' },
  { num: '08', slug: '08-Cashmere-and-White-Tea', name: 'CASHMERE & WHITE TEA', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Imperial White Tea • Spun Cashmere • Hinoki', wick: 'LX 16', theme: 'ivory' },
  { num: '09', slug: '09-Velvet-Vanilla-and-Santal', name: 'VELVET VANILLA & SANTAL', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Australian Sandalwood • Cardamom • Vanilla', wick: 'LX 18', theme: 'ivory' },
  { num: '10', slug: '10-Sea-Salt-and-White-Orchid', name: 'SEA SALT & WHITE ORCHID', kicker: 'SANCTUARY IVORY • BATCH #098', vintageKicker: 'SANCTUARY IVORY • BATCH #098', notes: 'Crystalline Sea Salt • Night Orchid • Driftwood', wick: 'LX 16', theme: 'ivory' }
];

// 1. Universal Front Square Label SVG (1A Men's Black/Gold, 1B Women's Ivory/Champagne Rose-Gold, 1C Women's Ivory/Classic Champagne Gold)
function renderFrontSquareSvg(variant = 'mens_black_gold') {
  const isIvory = variant !== 'mens_black_gold';
  const isRoseGold = variant === 'womens_ivory_rosegold';
  const bg = isIvory ? '#EFE8DA' : '#111215';
  const stroke = isRoseGold ? '#B8846E' : (isIvory ? '#9A7B3E' : '#C8B078');
  const textCol = isRoseGold ? '#AD7A64' : (isIvory ? '#8C6C30' : '#D5BE87');

  return `<svg viewBox="0 0 500 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="500" height="500" fill="${bg}" />
  <!-- Single clean metallic border -->
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

// 2. Round Bottom Scent & Warning Label SVG (with Connected Hockey Blades!)
function renderBottomCircleSvg(scent, includeWeights = true) {
  const isIvory = scent.theme === 'ivory';
  const bgFill = isIvory ? '#FAF6EE' : '#0B0C0F';
  const outerRing = isIvory ? '#B8846E' : '#D4AF37';
  const innerRing = isIvory ? 'rgba(184,132,110,0.42)' : 'rgba(212,175,55,0.4)';
  const primaryText = isIvory ? '#141210' : '#F9F6F0';
  const goldText = isIvory ? '#9E6B55' : '#E5C878';
  const mutedText = isIvory ? '#52493C' : '#A8A298';
  const badgeBg = isIvory ? 'rgba(184,132,110,0.11)' : 'rgba(229,200,120,0.10)';
  const fontScale = scent.name.length > 18 ? 16.5 : scent.name.length > 14 ? 18.5 : 21;
  const specLine = includeWeights
    ? `10 OZ VESSEL (8.5 OZ / 240G NET FILL) • WICK: ${scent.wick}`
    : `SMALL-BATCH ARTISAN POUR • HAND-POURED IN VA`;

  return `<svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="topArc-${scent.num}" d="M 42,200 A 158,158 0 1,1 358,200" />
  </defs>
  <circle cx="200" cy="200" r="199" fill="${bgFill}" />
  <circle cx="200" cy="200" r="184" fill="none" stroke="${outerRing}" stroke-width="3.2" />
  <circle cx="200" cy="200" r="174" fill="none" stroke="${innerRing}" stroke-width="1.1" stroke-dasharray="3 3" />

  <text font-family="'Cinzel', Georgia, serif" font-size="9.2" font-weight="700" fill="${goldText}" letter-spacing="2.2">
    <textPath href="#topArc-${scent.num}" startOffset="50%" text-anchor="middle">
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
    ${specLine}
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

  // A. Export 1A (Men's Black/Gold) & 1B (Women's Ivory/Rose-Gold) Front Square Labels (2.25" x 2.25")
  const frontVariants = [
    { id: '1A-Mens-Obsidian-Black-Gold-Front-Label-2.25x2.25in', mode: 'mens_black_gold' },
    { id: '1B-Womens-Sanctuary-Ivory-RoseGold-Front-Label-2.25x2.25in', mode: 'womens_ivory_rosegold' },
    { id: '1C-Womens-Sanctuary-Ivory-ClassicGold-Front-Label-2.25x2.25in', mode: 'womens_ivory_gold' }
  ];

  for (const fv of frontVariants) {
    const svgContent = renderFrontSquareSvg(fv.mode);
    fs.writeFileSync(path.join(DIR_FRONT, `${fv.id}.svg`), svgContent);
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@500;600;700&display=swap');@page{size:2.25in 2.25in;margin:0;}*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;overflow:hidden;}</style></head><body>${svgContent}</body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(DIR_FRONT, `${fv.id}.png`) });
    await page.pdf({ path: path.join(DIR_FRONT, `${fv.id}.pdf`), width: '2.25in', height: '2.25in', printBackground: true });
  }

  // B. Export all 10 Round Bottom Labels (2.0" Circle) — Both Standard 10oz & Weight-Free
  for (const s of SCENTS) {
    // 1) Standard 10oz
    const svg10 = renderBottomCircleSvg(s, true);
    const base10 = `Bottom-Label-${s.slug}-2in-Circle`;
    fs.writeFileSync(path.join(DIR_BOTTOM_10OZ, `${base10}.svg`), svg10);
    const html10 = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');@page{size:2.0in 2.0in;margin:0;}*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;overflow:hidden;background:transparent;}</style></head><body>${svg10}</body></html>`;
    await page.setContent(html10, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(DIR_BOTTOM_10OZ, `${base10}.png`), omitBackground: true });
    await page.pdf({ path: path.join(DIR_BOTTOM_10OZ, `${base10}.pdf`), width: '2.0in', height: '2.0in', printBackground: true });

    // 2) No-Weights
    const svgNoWt = renderBottomCircleSvg(s, false);
    const baseNoWt = `Bottom-Label-NoWeight-${s.slug}-2in-Circle`;
    fs.writeFileSync(path.join(DIR_BOTTOM_NOWT, `${baseNoWt}.svg`), svgNoWt);
    const htmlNoWt = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');@page{size:2.0in 2.0in;margin:0;}*{margin:0;padding:0;box-sizing:border-box;}html,body{width:100%;height:100%;overflow:hidden;background:transparent;}</style></head><body>${svgNoWt}</body></html>`;
    await page.setContent(htmlNoWt, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(DIR_BOTTOM_NOWT, `${baseNoWt}.png`), omitBackground: true });
    await page.pdf({ path: path.join(DIR_BOTTOM_NOWT, `${baseNoWt}.pdf`), width: '2.0in', height: '2.0in', printBackground: true });
  }

  // C. Copy the full 8.5x11 sheets & Master Reference Sheet into 04-Full-8.5x11-Printable-Sheets
  const ws = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';
  for (const f of [
    'Puck-and-Wick-Printable-Front-Jar-Crests-8.5x11.pdf',
    'Puck-and-Wick-Printable-2inch-Bottom-Labels-8.5x11.pdf',
    'Puck-and-Wick-Printable-2inch-Bottom-Labels-No-Weights-8.5x11.pdf',
    'Puck-and-Wick-Printable-Box-Corner-Stickers-8.5x11.pdf',
    'Puck-and-Wick-Master-Label-Reference-Sheet.pdf'
  ]) {
    fs.copyFileSync(path.join(ws, f), path.join(DIR_SHEETS, f));
  }

  await browser.close();
  console.log('Successfully exported all printer-ready single labels & sheets to:', DESKTOP_ROOT);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
