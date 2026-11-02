import { chromium } from 'playwright';
import path from 'path';

const WORKSPACE_DIR = '/Users/georgiiskrenov/Desktop/Puck & Wick Anti Gravity';

const SCENTS = [
  { num: 1, name: 'TOP SHELF', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Crimson Saffron • White Cedar • Amberwood', wick: 'LX 18', theme: 'obsidian' },
  { num: 2, name: 'FRESH CUT', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Italian Bergamot • Hinoki Wood • Vetiver', wick: 'LX 16', theme: 'obsidian' },
  { num: 3, name: 'BALSAM FIR', kicker: 'SEASONAL COLLAB • BATCH #098', notes: 'Fraser Pine • Resinous Balsam • Cedar Bark', wick: 'LX 18', theme: 'obsidian' },
  { num: 4, name: 'BARNWOOD & BOURBON', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Small-Batch Rye • Weathered Oak • Vanilla', wick: 'LX 18', theme: 'obsidian' },
  { num: 5, name: 'RINKSIDE CEDAR & SMOKE', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Birchwood Smoke • Atlas Cedar • Glove Leather', wick: 'LX 18', theme: 'obsidian' },
  { num: 6, name: 'WARM AMBER & VANILLA', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Baltic Amber • Cashmere Musk • Vanilla Bean', wick: 'LX 18', theme: 'obsidian' },
  { num: 7, name: 'LOCKER ROOM MINT', kicker: 'SIGNATURE SCENT • BATCH #098', notes: 'Crushed Spearmint • Blue Eucalyptus • Cedar', wick: 'LX 16', theme: 'obsidian' },
  { num: 8, name: 'CASHMERE & WHITE TEA', kicker: 'SANCTUARY SCENT • BATCH #098', notes: 'Imperial White Tea • Spun Cashmere • Hinoki', wick: 'LX 16', theme: 'ivory' },
  { num: 9, name: 'VELVET VANILLA & SANTAL', kicker: 'SANCTUARY SCENT • BATCH #098', notes: 'Australian Sandalwood • Cardamom • Vanilla', wick: 'LX 18', theme: 'ivory' },
  { num: 10, name: 'SEA SALT & WHITE ORCHID', kicker: 'SANCTUARY SCENT • BATCH #098', notes: 'Crystalline Sea Salt • Night Orchid • Driftwood', wick: 'LX 16', theme: 'ivory' }
];

function renderLWrapBand(scent, forceLight = false) {
  const isIvory = forceLight || scent.theme === 'ivory';
  const bg = isIvory ? '#FAF6EE' : '#0B0C0F';
  const border = isIvory ? '#9C7325' : '#D4AF37';
  const kickerColor = isIvory ? '#8A621C' : '#E5C878';
  const titleColor = isIvory ? '#141210' : '#FFFFFF';
  const notesColor = isIvory ? '#52493C' : '#B5AFA4';
  const titleSize = scent.name.length > 18 ? '9.5pt' : scent.name.length > 14 ? '10.5pt' : '12pt';

  return `
    <div class="band" style="background:${bg};border:1.5pt solid ${border};">
      <div class="fold-tick-top" style="border-left-color:${border};"></div>
      <div class="fold-tick-bot" style="border-left-color:${border};"></div>
      <div class="half">
        <div class="kicker" style="color:${kickerColor};">${scent.kicker}</div>
        <div class="title" style="color:${titleColor};font-size:${titleSize};">${scent.name}</div>
        <div class="notes" style="color:${notesColor};">${scent.notes}</div>
      </div>
      <div class="half" style="padding-left:0.16in;">
        <div class="kicker" style="color:${kickerColor};">10 OZ VESSEL (8.5 OZ / 240G FILL)</div>
        <div class="title" style="color:${titleColor};font-size:${titleSize};">${scent.name}</div>
        <div class="notes" style="color:${notesColor};">QC #1 CERTIFIED • LOUDOUN CO., VA</div>
      </div>
    </div>
  `;
}

const mixed16 = [...SCENTS, SCENTS[0], SCENTS[1], SCENTS[2], SCENTS[7], SCENTS[8], SCENTS[9]];

const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
    @page { size: 8.5in 11in; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; padding: 0; background: #FFF; font-family: 'Inter', sans-serif; }
    .sheet {
      width: 8.5in;
      height: 11in;
      padding: 0.6in 0.55in;
      display: grid;
      grid-template-columns: repeat(2, 3.5in);
      grid-template-rows: repeat(8, 0.95in);
      column-gap: 0.4in;
      row-gap: 0.25in;
      page-break-after: always;
      position: relative;
      align-items: center;
      justify-items: center;
    }
    .sheet:last-child { page-break-after: auto; }
    .sheet-note {
      position: absolute;
      top: 0.2in;
      left: 0.55in;
      right: 0.55in;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #555;
      border-bottom: 0.5pt solid #DDD;
      padding-bottom: 3pt;
    }
    .band {
      width: 3.5in;
      height: 0.9in;
      display: grid;
      grid-template-columns: 1.75in 1.75in;
      position: relative;
      border-radius: 3pt;
    }
    .fold-tick-top {
      position: absolute;
      left: 1.75in;
      top: 0;
      height: 6pt;
      border-left: 1pt dashed;
    }
    .fold-tick-bot {
      position: absolute;
      left: 1.75in;
      bottom: 0;
      height: 6pt;
      border-left: 1pt dashed;
    }
    .half {
      padding: 0.1in 0.14in;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .kicker {
      font-size: 5.8pt;
      font-weight: 700;
      letter-spacing: 1pt;
      margin-bottom: 2pt;
    }
    .title {
      font-family: 'Cinzel', Georgia, serif;
      font-weight: 700;
      letter-spacing: 1.2pt;
      margin-bottom: 2pt;
      white-space: nowrap;
    }
    .notes {
      font-size: 6.4pt;
      font-weight: 500;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PUCK &amp; WICK™ — 3.5" × 0.90" Box Corner L-Wrap Scent Bands (16 Bands per Sheet — Dark &amp; Ivory)</strong></span>
      <span>Print at <strong>100% Scale</strong> on Full-Sheet Matte Sticker Paper (OnlineLabels OL175) or Rectangle Labels</span>
    </div>
    ${mixed16.map(s => renderLWrapBand(s, false)).join('')}
  </div>
  <div class="sheet">
    <div class="sheet-note">
      <span><strong>PUCK &amp; WICK™ — 3.5" × 0.90" Box Corner L-Wrap Scent Bands (Home Printer Ink-Saver Light Edition)</strong></span>
      <span>Print at <strong>100% Scale</strong> on Full-Sheet Matte Sticker Paper (OnlineLabels OL175)</span>
    </div>
    ${mixed16.map(s => renderLWrapBand(s, true)).join('')}
  </div>
</body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlDoc, { waitUntil: 'networkidle' });
  const outPdf = path.join(WORKSPACE_DIR, 'Puck-and-Wick-Printable-Box-Corner-Stickers-8.5x11.pdf');
  await page.pdf({
    path: outPdf,
    width: '8.5in',
    height: '11in',
    printBackground: true
  });
  await browser.close();
  console.log('Saved printable Box Corner L-Wrap PDF:', outPdf);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
