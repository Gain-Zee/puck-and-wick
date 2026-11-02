import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const ARTIFACT_DIR = '/Users/georgiiskrenov/.gemini/antigravity/brain/267a25f5-ce01-4799-98d7-6fcfce4d36bc';

function imgDataUri(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const buf = fs.readFileSync(fullPath);
  const ext = path.extname(relPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const IMGS = {
  shelfMens: imgDataUri('assets/images/packaging/shelf-candle-top-shelf.jpg'),
  shelfWomens: imgDataUri('assets/images/packaging/shelf-candle-velvet-vanilla-santal.jpg'),
  shelfBalsam: imgDataUri('assets/images/packaging/shelf-candle-balsam-fir.jpg'),
  shelfFreshCut: imgDataUri('assets/images/packaging/shelf-candle-fresh-cut.jpg'),
  shelfCashmere: imgDataUri('assets/images/packaging/shelf-candle-cashmere-white-tea.jpg'),
  shelfSeaSalt: imgDataUri('assets/images/packaging/shelf-candle-sea-salt-orchid.jpg'),
  boxMenOpen: imgDataUri('assets/images/box-men-open.jpg'),
  boxMenClosed: imgDataUri('assets/images/box-men-closed.jpg'),
  boxWomenOpen: imgDataUri('assets/images/box-women-open.jpg'),
  boxWomenClosed: imgDataUri('assets/images/box-women-closed.jpg'),
  puckMenBox: imgDataUri('assets/images/packaging/puck-men-box.jpg'),
  puckMenBoxClosed: imgDataUri('assets/images/packaging/puck-men-box-closed.jpg'),
  puckMenStall: imgDataUri('assets/images/packaging/puck-men-locker.jpg'),
  puckMenBag: imgDataUri('assets/images/packaging/puck-men-gym-bag.jpg'),
  puckMenCloset: imgDataUri('assets/images/packaging/puck-men-closet.jpg'),
  puckWomenBox: imgDataUri('assets/images/packaging/puck-women-box.jpg'),
  puckWomenBoxClosed: imgDataUri('assets/images/packaging/puck-women-box-closed.jpg'),
  puckWomenCloset: imgDataUri('assets/images/packaging/puck-women-closet.jpg'),
  miniPuckBoxClosed: imgDataUri('assets/images/packaging/puck-mini-pair-box-closed.jpg'),
  washMen: imgDataUri('assets/images/item-bodywash-men.jpg'),
  washWomen: imgDataUri('assets/images/item-bodywash-women.jpg')
};

// ============================================================================
// FULL-SCREEN DESKTOP PAGE BUILDERS (1440 x 960)
// scheme: 'cream' | 'black' | 'hybrid'
// ============================================================================

function buildDesktopHeroPage(scheme, pageNum) {
  const isCream = scheme === 'cream';
  const isHybrid = scheme === 'hybrid';

  const bg = isCream ? '#FAF7F2' : '#0B0C0F';
  const text = isCream ? '#1A1918' : '#FAF7F2';
  const sub = isCream ? '#5A554E' : '#C9C3B8';
  const border = isCream ? '#1A1918' : '#C5A059';
  const gold = isCream ? '#8C6D32' : '#C5A059';
  const barBg = isCream ? '#1A1918' : '#C5A059';
  const barColor = isCream ? '#FAF7F2' : '#0B0C0F';

  const schemeLabel = isCream
    ? 'SCHEME A: 100% WARM BRITISH CREAM (#FAF7F2)'
    : isHybrid
    ? 'SCHEME C: BLACK OBSIDIAN + WARM IVORY FEMALE SANCTUARY (80/20 HYBRID)'
    : 'SCHEME B: 100% BLACK OBSIDIAN (#0B0C0F)';

  return `
  <div class="pdf-page" style="background:${bg};color:${text};">
    <div>
      <div style="background:${barBg};color:${barColor};padding:8px 24px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
        <span>${schemeLabel}</span>
        <span>SECTION 01 • FULL-SCREEN DESKTOP HERO VIEW</span>
      </div>

      <header style="padding:18px 56px 14px;border-bottom:1px solid ${border};background:${bg};">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${sub};width:300px;">
            SEARCH &nbsp;|&nbsp; ZEOCARB-98™ LAB
          </div>
          <div style="text-align:center;">
            <h1 class="serif" style="font-size:34px;font-weight:600;letter-spacing:0.24em;line-height:1;">PUCK &amp; WICK</h1>
            <span style="display:block;font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:${gold};margin-top:4px;">
              AMERICAN LUXURY SCENT &amp; MOLECULAR ODOR HARDWARE
            </span>
          </div>
          <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${sub};width:300px;text-align:right;">
            WAITLIST &nbsp;|&nbsp; SHOPPING BAG (1)
          </div>
        </div>
        <nav style="display:flex;justify-content:center;gap:38px;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;align-items:center;">
          <span>FINE CANDLES ($44)</span>
          <span>ZEOCARB-98™ ODOR PUCKS ($48)</span>
          ${isHybrid
            ? `<span style="background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;padding:4px 12px;font-weight:700;">WOMEN'S SANCTUARY (IVORY)</span>`
            : `<span>WOMEN'S SANCTUARY</span>`}
          <span>8 OZ BODY WASHES ($38)</span>
          <span style="color:${gold};font-weight:700;">THE $108 GIFT SUITE</span>
        </nav>
      </header>

      <!-- Split Hero (1440px wide) -->
      <div style="display:grid;grid-template-columns:1.05fr 0.95fr;height:495px;border-bottom:1px solid ${border};">
        <div style="display:grid;grid-template-columns:1fr 1fr;border-right:1px solid ${border};position:relative;overflow:hidden;background:#0B0C0F;">
          <div style="position:relative;border-right:1px solid ${border};background:#EDE6DA;display:flex;align-items:center;justify-content:center;padding:12px;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:contain;background:#EDE6DA;display:block;" />
            ${isHybrid ? `<span style="position:absolute;top:14px;left:14px;background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;padding:5px 12px;font-size:9px;letter-spacing:0.16em;font-weight:700;">HER SANCTUARY • WARM IVORY</span>` : ''}
          </div>
          <div style="position:relative;background:#1A1512;display:flex;align-items:center;justify-content:center;padding:12px;">
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:contain;background:#1A1512;display:block;" />
            ${isHybrid ? `<span style="position:absolute;top:14px;right:14px;background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:5px 12px;font-size:9px;letter-spacing:0.16em;font-weight:700;">HIS FLAGSHIP • OBSIDIAN</span>` : ''}
          </div>
          <div style="position:absolute;bottom:14px;left:14px;background:${isCream ? 'rgba(250,247,242,0.95)' : 'rgba(11,12,15,0.92)'};border:1px solid ${border};color:${text};padding:6px 14px;font-size:9px;letter-spacing:0.16em;font-weight:600;">
            100% UNLIT STUDIO PHOTOGRAPHY • ZERO CROPPING • FULL VESSEL, LID &amp; BOX VISIBLE
          </div>
        </div>

        <!-- Right Copy Panel -->
        <div style="padding:36px 48px;display:flex;flex-direction:column;justify-content:center;background:${isCream ? '#F3EFE6' : '#111318'};">
          <div style="background:${isCream || isHybrid ? '#FAF7F2' : '#0B0C0F'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};border:1.5px solid ${border};box-shadow:8px 8px 0 ${border};padding:32px 36px;">
            <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${isCream || isHybrid ? '#8C6D32' : '#C5A059'};margin-bottom:10px;font-weight:700;">
              ${isHybrid ? 'OBSIDIAN FOR HIM &bull; WARM IVORY FOR HER' : 'THE NEW STANDARD OF SCENT &amp; SPACE CARE'}
            </div>
            <h2 class="serif" style="font-size:40px;font-weight:500;line-height:1.08;margin-bottom:14px;">
              Tailored Scent.<br/>Molecular Odor Control.
            </h2>
            <p style="font-size:13px;line-height:1.6;color:${isCream || isHybrid ? '#4A453E' : '#C9C3B8'};margin-bottom:22px;">
              10 unlit small-batch soy candles ($44) paired with <strong>ZeoCarb-98™</strong> 3-Axis Odor Pucks ($48, covers up to 120 Sq. Ft.) in sleek magnetic front-flap collector boxes.
            </p>
            <div style="display:flex;gap:14px;">
              <div style="background:${isCream ? '#1A1918' : isHybrid ? '#0B0C0F' : '#C5A059'};color:${isCream ? '#FAF7F2' : isHybrid ? '#E5C878' : '#0B0C0F'};border:1px solid ${border};padding:13px 22px;font-size:10.5px;letter-spacing:0.18em;font-weight:700;">
                SHOP CANDLES ($44)
              </div>
              <div style="background:${isHybrid ? '#C5A059' : 'transparent'};color:${isHybrid ? '#0B0C0F' : isCream ? '#1A1918' : '#FAF7F2'};border:1px solid ${border};padding:13px 22px;font-size:10.5px;letter-spacing:0.18em;font-weight:700;">
                THE $108 GIFT SUITE
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom 3-Column Category Bar -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);height:215px;">
        <div style="border-right:1px solid ${border};padding:20px 32px;display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;background:${bg};">
          <img src="${IMGS.puckMenBoxClosed}" style="width:120px;height:120px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:9px;letter-spacing:0.18em;color:${gold};font-weight:700;margin-bottom:4px;">MAGNETIC FLAP BOX • 120 SQ. FT.</div>
            <h4 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">3.0" Odor Pucks ($48)</h4>
            <p style="font-size:11.5px;color:${sub};line-height:1.45;margin-bottom:8px;">For hockey &amp; gym bags, locker stalls, walk-in closets &amp; cars.</p>
            <span style="font-size:10px;letter-spacing:0.16em;font-weight:700;color:${gold};border-bottom:1px solid ${border};padding-bottom:2px;">EXPLORE HARDWARE &rarr;</span>
          </div>
        </div>

        <!-- Middle Cell: Warm Ivory in Hybrid! -->
        <div style="border-right:1px solid ${border};padding:20px 32px;display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;background:${isHybrid ? '#FAF7F2' : bg};color:${isHybrid ? '#1A1918' : text};">
          <img src="${IMGS.puckWomenBoxClosed}" style="width:120px;height:120px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:9px;letter-spacing:0.18em;color:${isHybrid ? '#8C6D32' : gold};font-weight:700;margin-bottom:4px;">HER SANCTUARY COLLECTION</div>
            <h4 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">Warm Ivory Sanctuary</h4>
            <p style="font-size:11.5px;color:${isHybrid ? '#4A453E' : sub};line-height:1.45;margin-bottom:8px;">3 Sanctuary Candles ($44), Ivory 3.0" Puck ($48) &amp; 8 oz Silk Body Wash ($38).</p>
            <span style="font-size:10px;letter-spacing:0.16em;font-weight:700;color:${isHybrid ? '#1A1918' : gold};border-bottom:1px solid ${isHybrid ? '#1A1918' : border};padding-bottom:2px;">SHOP SANCTUARY &rarr;</span>
          </div>
        </div>

        <div style="padding:20px 32px;display:grid;grid-template-columns:120px 1fr;gap:20px;align-items:center;background:${bg};">
          <img src="${IMGS.boxMenOpen}" style="width:120px;height:120px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:9px;letter-spacing:0.18em;color:${gold};font-weight:700;margin-bottom:4px;">$130 RETAIL VALUE • SAVE $22</div>
            <h4 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">The $108 Deluxe Suites</h4>
            <p style="font-size:11.5px;color:${sub};line-height:1.45;margin-bottom:8px;">10 oz Candle + 3.0" Puck + 8 oz Body Wash in His or Hers Magnetic Box.</p>
            <span style="font-size:10px;letter-spacing:0.16em;font-weight:700;color:${gold};border-bottom:1px solid ${border};padding-bottom:2px;">CUSTOMIZE SUITE &rarr;</span>
          </div>
        </div>
      </div>
    </div>

    <div style="background:#060709;border-top:1px solid rgba(197,160,89,0.45);color:#C5A059;padding:10px 56px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;">
      <span>${schemeLabel}</span>
      <span>PAGE 0${pageNum} OF 09 • FULL-SCREEN DESKTOP HERO COMPARISON</span>
    </div>
  </div>`;
}

function buildDesktopGalleryPage(scheme, pageNum) {
  const isCream = scheme === 'cream';
  const isHybrid = scheme === 'hybrid';

  const bg = isCream ? '#FAF7F2' : '#0B0C0F';
  const text = isCream ? '#1A1918' : '#FAF7F2';
  const sub = isCream ? '#5A554E' : '#C9C3B8';
  const border = isCream ? '#1A1918' : '#C5A059';
  const gold = isCream ? '#8C6D32' : '#C5A059';
  const barBg = isCream ? '#1A1918' : '#C5A059';
  const barColor = isCream ? '#FAF7F2' : '#0B0C0F';

  const schemeLabel = isCream
    ? 'SCHEME A: 100% WARM BRITISH CREAM (#FAF7F2)'
    : isHybrid
    ? 'SCHEME C: BLACK OBSIDIAN + WARM IVORY FEMALE SANCTUARY (80/20 HYBRID)'
    : 'SCHEME B: 100% BLACK OBSIDIAN (#0B0C0F)';

  // Card styling helper (in Hybrid, Female products get Warm Ivory #FAF7F2 cards!)
  function cardStyle(isFemale) {
    if (isCream) {
      return {
        cardBg: '#FFFFFF',
        cardText: '#1A1918',
        cardSub: '#5A554E',
        cardGold: '#8C6D32',
        cardBorder: '1px solid #1A1918',
        btnBg: '#1A1918',
        btnText: '#FAF7F2'
      };
    }
    if (isHybrid && isFemale) {
      return {
        cardBg: '#FAF7F2',
        cardText: '#1A1918',
        cardSub: '#4A453E',
        cardGold: '#8C6D32',
        cardBorder: '2px solid #C5A059',
        btnBg: '#1A1918',
        btnText: '#FAF7F2'
      };
    }
    return {
      cardBg: '#12141B',
      cardText: '#FAF7F2',
      cardSub: '#B5AFA4',
      cardGold: '#E5C878',
      cardBorder: '1px solid rgba(197,160,89,0.5)',
      btnBg: '#C5A059',
      btnText: '#0B0C0F'
    };
  }

  const c1 = cardStyle(false); // Top Shelf (Men's)
  const c2 = cardStyle(true);  // Velvet Vanilla (Women's Sanctuary)
  const c3 = cardStyle(false); // 3.0" Obsidian Puck (Men's)
  const c4 = cardStyle(true);  // 3.0" Ivory Puck (Women's Sanctuary)

  return `
  <div class="pdf-page" style="background:${bg};color:${text};">
    <div>
      <div style="background:${barBg};color:${barColor};padding:8px 24px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
        <span>${schemeLabel}</span>
        <span>SECTION 02 • FULL-SCREEN 4-COLUMN PRODUCT GALLERY</span>
      </div>

      <div style="text-align:center;padding:22px 56px 16px;border-bottom:1px solid ${border};">
        <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${gold};font-weight:700;margin-bottom:6px;">
          I. THE OLFACTORY &amp; ZEOCARB-98™ HARDWARE GALLERY
        </div>
        <h2 class="serif" style="font-size:36px;font-weight:500;">
          ${isHybrid ? 'Men\'s Products in Obsidian &bull; Female Sanctuary Products in Warm Ivory' : 'Unlit Studio Candles ($44), Magnetic-Box Pucks ($48) &amp; Body Washes ($38)'}
        </h2>
        <div style="display:inline-flex;border:1px solid ${border};margin-top:12px;background:${isCream ? '#F3EFE6' : '#111318'};">
          <span style="padding:8px 20px;font-size:10px;letter-spacing:0.16em;font-weight:700;background:${barBg};color:${barColor};">ALL COLLECTION (15)</span>
          <span style="padding:8px 20px;font-size:10px;letter-spacing:0.16em;font-weight:600;border-right:1px solid ${border};">MEN'S OBSIDIAN (10)</span>
          <span style="padding:8px 20px;font-size:10px;letter-spacing:0.16em;font-weight:700;border-right:1px solid ${border};${isHybrid ? 'background:#FAF7F2;color:#1A1918;' : ''}">WOMEN'S SANCTUARY (5)</span>
          <span style="padding:8px 20px;font-size:10px;letter-spacing:0.16em;font-weight:600;border-right:1px solid ${border};">ODOR PUCKS ($38–$48)</span>
          <span style="padding:8px 20px;font-size:10px;letter-spacing:0.16em;font-weight:600;">8 OZ BODY WASHES ($38)</span>
        </div>
      </div>

      <!-- 4-Column Product Grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding:24px 56px;">
        <!-- Card 1: Men's Candle -->
        <div style="background:${c1.cardBg};color:${c1.cardText};border:${c1.cardBorder};padding:14px;text-align:center;display:flex;flex-direction:column;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:12px;border:1px solid ${border};overflow:hidden;background:#0B0C0F;">
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:contain;" />
            <span style="position:absolute;top:10px;left:10px;background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:4px 9px;font-size:8.5px;letter-spacing:0.14em;font-weight:700;">MEN'S FLAGSHIP</span>
          </div>
          <h3 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">Top Shelf</h3>
          <div class="serif" style="font-style:italic;font-size:13.5px;color:${c1.cardSub};margin-bottom:6px;">Crimson Saffron, Cedar &amp; Amber</div>
          <div style="font-size:10.5px;color:${c1.cardGold};font-weight:700;letter-spacing:0.1em;margin-bottom:12px;">10 OZ UNLIT VESSEL &amp; BOX • $44.00</div>
          <div style="margin-top:auto;background:${c1.btnBg};color:${c1.btnText};padding:11px;font-size:10px;letter-spacing:0.18em;font-weight:700;">ADD TO BAG — $44.00</div>
        </div>

        <!-- Card 2: Women's Candle (Warm Ivory in Hybrid!) -->
        <div style="background:${c2.cardBg};color:${c2.cardText};border:${c2.cardBorder};padding:14px;text-align:center;display:flex;flex-direction:column;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:12px;border:1px solid ${border};overflow:hidden;background:#EDE6DA;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:contain;background:#EDE6DA;" />
            <span style="position:absolute;top:10px;left:10px;background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;padding:4px 9px;font-size:8.5px;letter-spacing:0.14em;font-weight:700;">WOMEN'S SANCTUARY</span>
          </div>
          <h3 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">Velvet Vanilla &amp; Santal</h3>
          <div class="serif" style="font-style:italic;font-size:13.5px;color:${c2.cardSub};margin-bottom:6px;">Australian Sandalwood &amp; Vanilla</div>
          <div style="font-size:10.5px;color:${c2.cardGold};font-weight:700;letter-spacing:0.1em;margin-bottom:12px;">10 OZ UNLIT VESSEL &amp; BOX • $44.00</div>
          <div style="margin-top:auto;background:${c2.btnBg};color:${c2.btnText};padding:11px;font-size:10px;letter-spacing:0.18em;font-weight:700;">ADD TO BAG — $44.00</div>
        </div>

        <!-- Card 3: Men's 3.0" Odor Puck with New Compact Closed Magnetic Box -->
        <div style="background:${c3.cardBg};color:${c3.cardText};border:${c3.cardBorder};padding:14px;text-align:center;display:flex;flex-direction:column;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:12px;border:1px solid ${border};overflow:hidden;background:#0B0C0F;">
            <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:100%;object-fit:contain;" />
            <span style="position:absolute;top:10px;left:10px;background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:4px 9px;font-size:8.5px;letter-spacing:0.14em;font-weight:700;">4.2" MAGNETIC BOX • 120 SQ FT</span>
          </div>
          <h3 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">3.0" Puck — Obsidian</h3>
          <div class="serif" style="font-style:italic;font-size:13.5px;color:${c3.cardSub};margin-bottom:6px;">For Hockey Bags, Stalls &amp; Closets</div>
          <div style="font-size:10.5px;color:${c3.cardGold};font-weight:700;letter-spacing:0.1em;margin-bottom:12px;">ZEOCARB-98™ • 3-AXIS AIRFLOW • $48.00</div>
          <div style="margin-top:auto;background:${c3.btnBg};color:${c3.btnText};padding:11px;font-size:10px;letter-spacing:0.18em;font-weight:700;">JOIN WAITLIST — $48.00</div>
        </div>

        <!-- Card 4: Women's 3.0" Odor Puck with New Compact Closed Magnetic Box (Warm Ivory in Hybrid!) -->
        <div style="background:${c4.cardBg};color:${c4.cardText};border:${c4.cardBorder};padding:14px;text-align:center;display:flex;flex-direction:column;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:12px;border:1px solid ${border};overflow:hidden;background:#EDE6DA;">
            <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:100%;object-fit:contain;background:#EDE6DA;" />
            <span style="position:absolute;top:10px;left:10px;background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;padding:4px 9px;font-size:8.5px;letter-spacing:0.14em;font-weight:700;">SANCTUARY MAGNETIC BOX</span>
          </div>
          <h3 class="serif" style="font-size:22px;font-weight:600;margin-bottom:4px;">3.0" Puck — Ivory &amp; Gold</h3>
          <div class="serif" style="font-style:italic;font-size:13.5px;color:${c4.cardSub};margin-bottom:6px;">For Walk-In Closets, Totes &amp; Gyms</div>
          <div style="font-size:10.5px;color:${c4.cardGold};font-weight:700;letter-spacing:0.1em;margin-bottom:12px;">ZEOCARB-98™ • 120 SQ. FT. • $48.00</div>
          <div style="margin-top:auto;background:${c4.btnBg};color:${c4.btnText};padding:11px;font-size:10px;letter-spacing:0.18em;font-weight:700;">JOIN WAITLIST — $48.00</div>
        </div>
      </div>

      <!-- Bottom Secondary Row: 2.0" Mini Pucks Box + Men's & Women's 8 oz Body Washes -->
      <div style="margin:0 56px 14px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
        <div style="border:${c1.cardBorder};background:${c1.cardBg};color:${c1.cardText};padding:12px 18px;display:grid;grid-template-columns:92px 1fr;gap:16px;align-items:center;">
          <img src="${IMGS.miniPuckBoxClosed}" style="width:92px;height:92px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:8.5px;letter-spacing:0.14em;color:${c1.cardGold};font-weight:700;">SLEEK ALL-BLACK MAGNETIC FLAP BOX</div>
            <div class="serif" style="font-size:20px;font-weight:600;">2.0" Mini Pucks — Pair ($38)</div>
            <div style="font-size:11px;color:${c1.cardSub};">For Skates, Cleats, Sneakers &amp; Drawers</div>
          </div>
        </div>

        <div style="border:${c1.cardBorder};background:${c1.cardBg};color:${c1.cardText};padding:12px 18px;display:grid;grid-template-columns:92px 1fr;gap:16px;align-items:center;">
          <img src="${IMGS.washMen}" style="width:92px;height:92px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:8.5px;letter-spacing:0.14em;color:${c1.cardGold};font-weight:700;">MEN'S POST-GAME SKIN DETOX</div>
            <div class="serif" style="font-size:20px;font-weight:600;">8 oz Charcoal Body Wash ($38)</div>
            <div style="font-size:11px;color:${c1.cardSub};">Activated Binchotan Charcoal + ZeoCarb-98™</div>
          </div>
        </div>

        <div style="border:${c2.cardBorder};background:${c2.cardBg};color:${c2.cardText};padding:12px 18px;display:grid;grid-template-columns:92px 1fr;gap:16px;align-items:center;">
          <img src="${IMGS.washWomen}" style="width:92px;height:92px;object-fit:cover;border:1px solid ${border};" />
          <div>
            <div style="font-size:8.5px;letter-spacing:0.14em;color:${c2.cardGold};font-weight:700;">WOMEN'S SANCTUARY SKIN DETOX</div>
            <div class="serif" style="font-size:20px;font-weight:600;">8 oz White Clay &amp; Silk Wash ($38)</div>
            <div style="font-size:11px;color:${c2.cardSub};">Kaolin White Clay + Silk Amino Acids</div>
          </div>
        </div>
      </div>
    </div>

    <div style="background:#060709;border-top:1px solid rgba(197,160,89,0.45);color:#C5A059;padding:10px 56px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;">
      <span>${schemeLabel}</span>
      <span>PAGE 0${pageNum} OF 09 • FULL-SCREEN PRODUCT GALLERY COMPARISON</span>
    </div>
  </div>`;
}

function buildDesktopGiftingPage(scheme, pageNum) {
  const isCream = scheme === 'cream';
  const isHybrid = scheme === 'hybrid';

  const bg = isCream ? '#FAF7F2' : '#0B0C0F';
  const text = isCream ? '#1A1918' : '#FAF7F2';
  const sub = isCream ? '#5A554E' : '#C9C3B8';
  const border = isCream ? '#1A1918' : '#C5A059';
  const gold = isCream ? '#8C6D32' : '#C5A059';
  const barBg = isCream ? '#1A1918' : '#C5A059';
  const barColor = isCream ? '#FAF7F2' : '#0B0C0F';

  const schemeLabel = isCream
    ? 'SCHEME A: 100% WARM BRITISH CREAM (#FAF7F2)'
    : isHybrid
    ? 'SCHEME C: BLACK OBSIDIAN + WARM IVORY FEMALE SANCTUARY (80/20 HYBRID)'
    : 'SCHEME B: 100% BLACK OBSIDIAN (#0B0C0F)';

  return `
  <div class="pdf-page" style="background:${bg};color:${text};">
    <div>
      <div style="background:${barBg};color:${barColor};padding:8px 24px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">
        <span>${schemeLabel}</span>
        <span>SECTION 03 • THE $108 DELUXE BOX &amp; MAGNETIC FLAP BOX LINEUP</span>
      </div>

      <div style="text-align:center;padding:20px 56px 14px;border-bottom:1px solid ${border};">
        <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${gold};font-weight:700;margin-bottom:6px;">
          II. UNIFIED OVERLAPPING FRONT MAGNETIC FLAP ARCHITECTURE
        </div>
        <h2 class="serif" style="font-size:36px;font-weight:500;">
          The $108 Deluxe Collector Suites ($130 Value — Save $22) &amp; Standalone Puck Boxes
        </h2>
      </div>

      <div style="display:grid;grid-template-columns:1.08fr 0.92fr;gap:32px;padding:24px 56px;align-items:center;">
        <!-- Left: His & Hers Open + Closed Magnetic Flap Boxes -->
        <div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
            <!-- Men's Suite Card -->
            <div style="background:${isCream ? '#FFFFFF' : '#12141B'};color:${isCream ? '#1A1918' : '#FAF7F2'};border:1.5px solid ${border};padding:12px;">
              <img src="${IMGS.boxMenOpen}" style="width:100%;height:235px;object-fit:contain;background:#0B0C0F;border:1px solid ${border};margin-bottom:8px;" />
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="serif" style="font-size:21px;font-weight:600;">Men's Obsidian Suite</span>
                <span style="font-size:11px;font-weight:700;color:${gold};">$108 ($130 Val)</span>
              </div>
              <div style="font-size:10.5px;color:${sub};margin-top:2px;">10 oz Candle + 3.0" Obsidian Puck + 8 oz Charcoal Wash</div>
            </div>

            <!-- Women's Suite Card (Warm Ivory in Hybrid!) -->
            <div style="background:${isCream ? '#FFFFFF' : isHybrid ? '#FAF7F2' : '#12141B'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};border:${isHybrid ? '2px solid #C5A059' : `1.5px solid ${border}`};padding:12px;">
              <img src="${IMGS.boxWomenOpen}" style="width:100%;height:235px;object-fit:contain;background:#EDE6DA;border:1px solid ${border};margin-bottom:8px;" />
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="serif" style="font-size:21px;font-weight:600;">Women's Sanctuary Suite</span>
                <span style="font-size:11px;font-weight:700;color:${isHybrid ? '#8C6D32' : gold};">$108 ($130 Val)</span>
              </div>
              <div style="font-size:10.5px;color:${isCream || isHybrid ? '#4A453E' : sub};margin-top:2px;">10 oz Candle + 3.0" Ivory Puck + 8 oz White Clay &amp; Silk Wash</div>
            </div>
          </div>

          <!-- 4 Unified Closed Magnetic Flap Boxes -->
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
            <div style="background:${isCream ? '#FFFFFF' : '#12141B'};color:${isCream ? '#1A1918' : '#FAF7F2'};border:1px solid ${border};padding:8px;text-align:center;">
              <img src="${IMGS.boxMenClosed}" style="width:100%;height:130px;object-fit:contain;background:#0B0C0F;margin-bottom:6px;" />
              <div style="font-size:8.5px;letter-spacing:0.12em;font-weight:700;">MEN'S $108 DELUXE LID</div>
            </div>
            <div style="background:${isCream || isHybrid ? '#FAF7F2' : '#12141B'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};border:1px solid ${border};padding:8px;text-align:center;">
              <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:130px;object-fit:contain;background:#EDE6DA;margin-bottom:6px;" />
              <div style="font-size:8.5px;letter-spacing:0.12em;font-weight:700;">4.2" IVORY PUCK BOX</div>
            </div>
            <div style="background:${isCream ? '#FFFFFF' : '#12141B'};color:${isCream ? '#1A1918' : '#FAF7F2'};border:1px solid ${border};padding:8px;text-align:center;">
              <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:130px;object-fit:contain;background:#0B0C0F;margin-bottom:6px;" />
              <div style="font-size:8.5px;letter-spacing:0.12em;font-weight:700;">4.2" OBSIDIAN PUCK BOX</div>
            </div>
            <div style="background:${isCream ? '#FFFFFF' : '#12141B'};color:${isCream ? '#1A1918' : '#FAF7F2'};border:1px solid ${border};padding:8px;text-align:center;">
              <img src="${IMGS.miniPuckBoxClosed}" style="width:100%;height:130px;object-fit:contain;background:#0B0C0F;margin-bottom:6px;" />
              <div style="font-size:8.5px;letter-spacing:0.12em;font-weight:700;">ALL-BLACK MINI PAIR BOX</div>
            </div>
          </div>
        </div>

        <!-- Right: Interactive 3-Piece Customizer -->
        <div style="background:${isCream || isHybrid ? '#FAF7F2' : '#111318'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};border:1.5px solid ${border};box-shadow:8px 8px 0 ${border};padding:30px 34px;">
          <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${isCream || isHybrid ? '#8C6D32' : '#C5A059'};font-weight:700;margin-bottom:8px;">
            THE $44 + $48 = $92 &rarr; $108 BRIDGE UPSELL
          </div>
          <h3 class="serif" style="font-size:34px;font-weight:500;margin-bottom:10px;">Build Your $108 Collector Box</h3>
          <p style="font-size:12.5px;line-height:1.55;color:${isCream || isHybrid ? '#4A453E' : '#C9C3B8'};margin-bottom:18px;">
            Every box in the line—from the compact 4.2" square Puck Box to the $108 Deluxe Suite—now features the exact same overlapping front magnetic flap and minimalist unframed lid logo.
          </p>

          <div style="border-top:1px solid ${border};padding-top:12px;margin-bottom:14px;">
            <div style="font-size:9.5px;letter-spacing:0.16em;font-weight:700;margin-bottom:8px;">STEP 01 • CHOOSE EDITION ($108 • $130 RETAIL VALUE)</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:10px;font-size:10px;font-weight:700;text-align:center;letter-spacing:0.14em;">
                &#9679; MEN'S OBSIDIAN SUITE
              </div>
              <div style="background:#FAF7F2;color:#1A1918;border:1.5px solid #1A1918;padding:10px;font-size:10px;font-weight:700;text-align:center;letter-spacing:0.14em;">
                &#9675; WOMEN'S SANCTUARY SUITE
              </div>
            </div>
          </div>

          <div style="border-top:1px solid ${border};padding-top:12px;margin-bottom:18px;">
            <div style="font-size:9.5px;letter-spacing:0.16em;font-weight:700;margin-bottom:8px;">STEP 02 • SELECT YOUR 10 OZ UNLIT SOY CANDLE ($44 VALUE)</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:9.5px;font-weight:700;text-align:center;">
              <div style="border:1.5px solid ${border};padding:8px;background:${isCream ? '#1A1918' : '#C5A059'};color:${isCream ? '#FAF7F2' : '#0B0C0F'};">TOP SHELF</div>
              <div style="border:1px solid ${border};padding:8px;">FRESH CUT</div>
              <div style="border:1px solid ${border};padding:8px;">BALSAM FIR</div>
              <div style="border:1px solid ${border};padding:8px;">VELVET VANILLA</div>
              <div style="border:1px solid ${border};padding:8px;">CASHMERE TEA</div>
              <div style="border:1px solid ${border};padding:8px;">SEA SALT ORCHID</div>
            </div>
          </div>

          <div style="background:${isCream ? '#1A1918' : '#0B0C0F'};color:${isCream ? '#FAF7F2' : '#E5C878'};border:1px solid ${border};padding:14px;text-align:center;font-size:11px;letter-spacing:0.2em;font-weight:700;">
            RESERVE BESPOKE $108 SUITE (SAVE $22)
          </div>
        </div>
      </div>
    </div>

    <div style="background:#060709;border-top:1px solid rgba(197,160,89,0.45);color:#C5A059;padding:10px 56px;display:flex;justify-content:space-between;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;">
      <span>${schemeLabel}</span>
      <span>PAGE 0${pageNum} OF 09 • FULL-SCREEN GIFTING &amp; MAGNETIC BOX COMPARISON</span>
    </div>
  </div>`;
}

// ============================================================================
// FULL-SCREEN MOBILE IPHONE PORTRAIT PAGE BUILDERS (430 x 932)
// ============================================================================

function buildMobileGalleryPage(scheme, pageNum) {
  const isCream = scheme === 'cream';
  const isHybrid = scheme === 'hybrid';

  const bg = isCream ? '#FAF7F2' : '#0B0C0F';
  const text = isCream ? '#1A1918' : '#FAF7F2';
  const border = isCream ? '#1A1918' : '#C5A059';
  const gold = isCream ? '#8C6D32' : '#C5A059';
  const barBg = isCream ? '#1A1918' : '#C5A059';
  const barColor = isCream ? '#FAF7F2' : '#0B0C0F';

  const schemeShort = isCream
    ? 'SCHEME A: 100% WARM CREAM'
    : isHybrid
    ? 'SCHEME C: BLACK + IVORY FEMALE SANCTUARY'
    : 'SCHEME B: 100% BLACK OBSIDIAN';

  function mCard(isFemale) {
    if (isCream) {
      return { bg: '#FFFFFF', text: '#1A1918', sub: '#5A554E', price: '#8C6D32', border: '1px solid #1A1918', btnBg: '#1A1918', btnText: '#FAF7F2' };
    }
    if (isHybrid && isFemale) {
      return { bg: '#FAF7F2', text: '#1A1918', sub: '#4A453E', price: '#8C6D32', border: '1.5px solid #C5A059', btnBg: '#1A1918', btnText: '#FAF7F2' };
    }
    return { bg: '#12141B', text: '#FAF7F2', sub: '#B5AFA4', price: '#E5C878', border: '1px solid rgba(197,160,89,0.5)', btnBg: '#C5A059', btnText: '#0B0C0F' };
  }

  const mc1 = mCard(false);
  const mc2 = mCard(true);
  const mc3 = mCard(false);
  const mc4 = mCard(true);

  return `
  <div class="mobile-page" style="background:${bg};color:${text};">
    <div>
      <div style="background:${barBg};color:${barColor};font-size:8px;letter-spacing:0.15em;text-align:center;padding:7px 10px;font-weight:700;">
        ${schemeShort}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid ${border};">
        <span style="font-size:10px;color:${gold};">&#9776; MENU</span>
        <div style="text-align:center;">
          <div class="serif" style="font-size:21px;font-weight:600;letter-spacing:0.2em;">PUCK &amp; WICK</div>
          <div style="font-size:7px;letter-spacing:0.2em;color:${gold};">ZEOCARB-98™ MOLECULAR LAB</div>
        </div>
        <span style="font-size:10px;color:${gold};">BAG (1)</span>
      </div>

      <!-- Filter Pills -->
      <div style="display:flex;gap:6px;padding:9px 14px;border-bottom:1px solid ${border};background:${isCream ? '#F3EFE6' : '#111318'};">
        <span style="font-size:8px;letter-spacing:0.12em;padding:5px 9px;background:${barBg};color:${barColor};font-weight:700;">ALL (15)</span>
        <span style="font-size:8px;letter-spacing:0.12em;padding:5px 9px;border:1px solid ${border};font-weight:600;">MEN'S OBSIDIAN</span>
        <span style="font-size:8px;letter-spacing:0.12em;padding:5px 9px;border:1px solid ${border};font-weight:700;${isHybrid ? 'background:#FAF7F2;color:#1A1918;' : ''}">HER SANCTUARY</span>
      </div>

      <!-- 2x2 Full-Screen Mobile Product Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:14px 16px;">
        <!-- Item 1: Men's Candle -->
        <div style="background:${mc1.bg};color:${mc1.text};border:${mc1.border};padding:8px;text-align:center;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:6px;border:1px solid ${border};background:#0B0C0F;">
            <img src="${IMGS.shelfMens}" style="width:100%;height:100%;object-fit:contain;" />
            <span style="position:absolute;top:5px;left:5px;background:#0B0C0F;color:#E5C878;font-size:6.5px;padding:2px 5px;font-weight:700;">MEN'S</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Top Shelf</div>
          <div class="serif" style="font-style:italic;font-size:11px;color:${mc1.sub};margin-bottom:3px;">Saffron &amp; Cedar</div>
          <div style="font-size:9px;color:${mc1.price};font-weight:700;margin-bottom:6px;">10 oz Unlit • $44.00</div>
          <div style="background:${mc1.btnBg};color:${mc1.btnText};padding:7px;font-size:8px;letter-spacing:0.14em;font-weight:700;">ADD TO BAG</div>
        </div>

        <!-- Item 2: Women's Candle (Warm Ivory in Hybrid!) -->
        <div style="background:${mc2.bg};color:${mc2.text};border:${mc2.border};padding:8px;text-align:center;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:6px;border:1px solid ${border};background:#EDE6DA;">
            <img src="${IMGS.shelfWomens}" style="width:100%;height:100%;object-fit:contain;background:#EDE6DA;" />
            <span style="position:absolute;top:5px;left:5px;background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;font-size:6.5px;padding:2px 5px;font-weight:700;">SANCTUARY</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">Velvet Vanilla</div>
          <div class="serif" style="font-style:italic;font-size:11px;color:${mc2.sub};margin-bottom:3px;">Santal &amp; Vanilla</div>
          <div style="font-size:9px;color:${mc2.price};font-weight:700;margin-bottom:6px;">10 oz Unlit • $44.00</div>
          <div style="background:${mc2.btnBg};color:${mc2.btnText};padding:7px;font-size:8px;letter-spacing:0.14em;font-weight:700;">ADD TO BAG</div>
        </div>

        <!-- Item 3: Men's 3.0" Odor Puck + Compact Closed Magnetic Box -->
        <div style="background:${mc3.bg};color:${mc3.text};border:${mc3.border};padding:8px;text-align:center;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:6px;border:1px solid ${border};background:#0B0C0F;">
            <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:100%;object-fit:contain;" />
            <span style="position:absolute;top:5px;left:5px;background:#0B0C0F;color:#E5C878;font-size:6.5px;padding:2px 5px;font-weight:700;">4.2" BOX</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">3.0" Obsidian Puck</div>
          <div class="serif" style="font-style:italic;font-size:11px;color:${mc3.sub};margin-bottom:3px;">120 Sq Ft • Magnetic Flap</div>
          <div style="font-size:9px;color:${mc3.price};font-weight:700;margin-bottom:6px;">ZeoCarb-98™ • $48.00</div>
          <div style="background:${mc3.btnBg};color:${mc3.btnText};padding:7px;font-size:8px;letter-spacing:0.14em;font-weight:700;">WAITLIST — $48</div>
        </div>

        <!-- Item 4: Women's 3.0" Odor Puck + Compact Closed Magnetic Box (Warm Ivory in Hybrid!) -->
        <div style="background:${mc4.bg};color:${mc4.text};border:${mc4.border};padding:8px;text-align:center;">
          <div style="position:relative;aspect-ratio:1/1;margin-bottom:6px;border:1px solid ${border};background:#EDE6DA;">
            <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:100%;object-fit:contain;background:#EDE6DA;" />
            <span style="position:absolute;top:5px;left:5px;background:#FAF7F2;color:#1A1918;border:1px solid #C5A059;font-size:6.5px;padding:2px 5px;font-weight:700;">IVORY BOX</span>
          </div>
          <div class="serif" style="font-size:17px;font-weight:600;">3.0" Ivory Puck</div>
          <div class="serif" style="font-style:italic;font-size:11px;color:${mc4.sub};margin-bottom:3px;">120 Sq Ft • Magnetic Flap</div>
          <div style="font-size:9px;color:${mc4.price};font-weight:700;margin-bottom:6px;">ZeoCarb-98™ • $48.00</div>
          <div style="background:${mc4.btnBg};color:${mc4.btnText};padding:7px;font-size:8px;letter-spacing:0.14em;font-weight:700;">WAITLIST — $48</div>
        </div>
      </div>

      <!-- Bottom Callout Banner inside Mobile Screen -->
      <div style="margin:0 16px;padding:12px 14px;border:1.5px solid ${border};background:${isCream || isHybrid ? '#FAF7F2' : '#12141B'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};display:grid;grid-template-columns:72px 1fr;gap:12px;align-items:center;">
        <img src="${IMGS.miniPuckBoxClosed}" style="width:72px;height:72px;object-fit:cover;border:1px solid ${border};" />
        <div>
          <div style="font-size:7.5px;letter-spacing:0.14em;color:${isCream || isHybrid ? '#8C6D32' : '#C5A059'};font-weight:700;">NEW ALL-BLACK MAGNETIC FLAP BOX</div>
          <div class="serif" style="font-size:17px;font-weight:600;">2.0" Mini Pucks — Pair ($38)</div>
          <div style="font-size:9.5px;color:${isCream || isHybrid ? '#4A453E' : '#B5AFA4'};">For Skates, Cleats, Sneakers &amp; Gym Totes</div>
        </div>
      </div>
    </div>

    <div style="background:#060709;border-top:1px solid rgba(197,160,89,0.45);color:#C5A059;padding:8px 16px;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:0.14em;text-transform:uppercase;">
      <span>${schemeShort}</span>
      <span>MOBILE SCREEN 0${pageNum} OF 06</span>
    </div>
  </div>`;
}

function buildMobileGiftingPage(scheme, pageNum) {
  const isCream = scheme === 'cream';
  const isHybrid = scheme === 'hybrid';

  const bg = isCream ? '#FAF7F2' : '#0B0C0F';
  const text = isCream ? '#1A1918' : '#FAF7F2';
  const border = isCream ? '#1A1918' : '#C5A059';
  const gold = isCream ? '#8C6D32' : '#C5A059';
  const barBg = isCream ? '#1A1918' : '#C5A059';
  const barColor = isCream ? '#FAF7F2' : '#0B0C0F';

  const schemeShort = isCream
    ? 'SCHEME A: 100% WARM CREAM'
    : isHybrid
    ? 'SCHEME C: BLACK + IVORY FEMALE SANCTUARY'
    : 'SCHEME B: 100% BLACK OBSIDIAN';

  return `
  <div class="mobile-page" style="background:${bg};color:${text};">
    <div>
      <div style="background:${barBg};color:${barColor};font-size:8px;letter-spacing:0.15em;text-align:center;padding:7px 10px;font-weight:700;">
        ${schemeShort}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid ${border};">
        <span style="font-size:10px;color:${gold};">&larr; BACK</span>
        <div class="serif" style="font-size:19px;font-weight:600;letter-spacing:0.18em;">THE $108 GIFT SUITES</div>
        <span style="font-size:10px;color:${gold};">SAVE $22</span>
      </div>

      <div style="padding:14px 16px;">
        <!-- His & Hers Side by Side on Mobile -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          <div style="border:1.5px solid ${border};background:${isCream ? '#FFFFFF' : '#12141B'};color:${isCream ? '#1A1918' : '#FAF7F2'};padding:6px;text-align:center;">
            <img src="${IMGS.boxMenOpen}" style="width:100%;height:145px;object-fit:contain;background:#0B0C0F;margin-bottom:5px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">Men's Obsidian</div>
            <div style="font-size:8px;color:${gold};font-weight:700;">$108 ($130 Val)</div>
          </div>

          <div style="border:${isHybrid ? '2px solid #C5A059' : `1.5px solid ${border}`};background:${isCream || isHybrid ? '#FAF7F2' : '#12141B'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};padding:6px;text-align:center;">
            <img src="${IMGS.boxWomenOpen}" style="width:100%;height:145px;object-fit:contain;background:#EDE6DA;margin-bottom:5px;" />
            <div class="serif" style="font-size:15px;font-weight:600;">Women's Ivory</div>
            <div style="font-size:8px;color:${isCream || isHybrid ? '#8C6D32' : gold};font-weight:700;">$108 ($130 Val)</div>
          </div>
        </div>

        <!-- 4 Unified Closed Magnetic Flap Lids -->
        <div style="font-size:8px;letter-spacing:0.14em;color:${gold};font-weight:700;text-align:center;margin-bottom:6px;">
          UNIFIED FRONT MAGNETIC FLAP BOXES (TRUE SCALE • ZERO CROPPING)
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px;">
          <div style="border:1px solid ${border};background:${isCream ? '#FFFFFF' : '#12141B'};padding:4px;text-align:center;">
            <img src="${IMGS.boxMenClosed}" style="width:100%;height:68px;object-fit:contain;background:#0B0C0F;margin-bottom:3px;" />
            <div style="font-size:6.5px;font-weight:700;">DELUXE LID</div>
          </div>
          <div style="border:1px solid ${border};background:${isCream || isHybrid ? '#FAF7F2' : '#12141B'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};padding:4px;text-align:center;">
            <img src="${IMGS.puckWomenBoxClosed}" style="width:100%;height:68px;object-fit:contain;background:#EDE6DA;margin-bottom:3px;" />
            <div style="font-size:6.5px;font-weight:700;">4.2" IVORY</div>
          </div>
          <div style="border:1px solid ${border};background:${isCream ? '#FFFFFF' : '#12141B'};padding:4px;text-align:center;">
            <img src="${IMGS.puckMenBoxClosed}" style="width:100%;height:68px;object-fit:contain;background:#0B0C0F;margin-bottom:3px;" />
            <div style="font-size:6.5px;font-weight:700;">4.2" BLACK</div>
          </div>
          <div style="border:1px solid ${border};background:${isCream ? '#FFFFFF' : '#12141B'};padding:4px;text-align:center;">
            <img src="${IMGS.miniPuckBoxClosed}" style="width:100%;height:68px;object-fit:contain;background:#0B0C0F;margin-bottom:3px;" />
            <div style="font-size:6.5px;font-weight:700;">MINI PAIR</div>
          </div>
        </div>

        <!-- Configurator Card -->
        <div style="border:1.5px solid ${border};background:${isCream || isHybrid ? '#FAF7F2' : '#111318'};color:${isCream || isHybrid ? '#1A1918' : '#FAF7F2'};padding:14px;box-shadow:5px 5px 0 ${border};">
          <div style="font-size:8px;letter-spacing:0.15em;color:${isCream || isHybrid ? '#8C6D32' : '#C5A059'};font-weight:700;margin-bottom:4px;">
            THE $44 + $48 = $92 &rarr; $108 FULL SUITE UPSELL
          </div>
          <div class="serif" style="font-size:22px;font-weight:600;margin-bottom:6px;">
            Customize His or Hers $108 Box
          </div>
          <p style="font-size:10px;line-height:1.45;color:${isCream || isHybrid ? '#4A453E' : '#C9C3B8'};margin-bottom:10px;">
            Includes 10 oz Unlit Soy Candle ($44) + 3.0" ZeoCarb-98™ Puck ($48) + 8 oz Body Wash ($38) in Magnetic Collector Box.
          </p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
            <div style="background:#0B0C0F;color:#E5C878;border:1px solid #C5A059;padding:7px;font-size:8px;font-weight:700;text-align:center;">
              &#9679; MEN'S OBSIDIAN ($108)
            </div>
            <div style="background:#FAF7F2;color:#1A1918;border:1px solid #1A1918;padding:7px;font-size:8px;font-weight:700;text-align:center;">
              &#9675; WOMEN'S IVORY ($108)
            </div>
          </div>
          <div style="background:${isCream ? '#1A1918' : '#C5A059'};color:${isCream ? '#FAF7F2' : '#0B0C0F'};padding:11px;text-align:center;font-size:9.5px;letter-spacing:0.18em;font-weight:700;">
            RESERVE $108 SUITE (SAVE $22)
          </div>
        </div>
      </div>
    </div>

    <div style="background:#060709;border-top:1px solid rgba(197,160,89,0.45);color:#C5A059;padding:8px 16px;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:0.14em;text-transform:uppercase;">
      <span>${schemeShort}</span>
      <span>MOBILE SCREEN 0${pageNum} OF 06</span>
    </div>
  </div>`;
}

const fullDesktopHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Full-Screen Desktop Scroll-Through (All 3 Color Schemes Section-by-Section)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 1440px 960px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  img { object-fit: contain !important; background: #0B0C0F; }
  .pdf-page {
    width: 1440px;
    height: 960px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
</head>
<body>
  ${buildDesktopHeroPage('cream', 1)}
  ${buildDesktopHeroPage('black', 2)}
  ${buildDesktopHeroPage('hybrid', 3)}
  ${buildDesktopGalleryPage('cream', 4)}
  ${buildDesktopGalleryPage('black', 5)}
  ${buildDesktopGalleryPage('hybrid', 6)}
  ${buildDesktopGiftingPage('cream', 7)}
  ${buildDesktopGiftingPage('black', 8)}
  ${buildDesktopGiftingPage('hybrid', 9)}
</body>
</html>`;

const fullMobileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Puck & Wick — Full-Screen iPhone Scroll-Through (All 3 Color Schemes Section-by-Section)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: 430px 932px; margin: 0; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  img { object-fit: contain !important; background: #0B0C0F; }
  .mobile-page {
    width: 430px;
    height: 932px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
</head>
<body>
  ${buildMobileGalleryPage('cream', 1)}
  ${buildMobileGalleryPage('black', 2)}
  ${buildMobileGalleryPage('hybrid', 3)}
  ${buildMobileGiftingPage('cream', 4)}
  ${buildMobileGiftingPage('black', 5)}
  ${buildMobileGiftingPage('hybrid', 6)}
</body>
</html>`;

async function run() {
  const browser = await chromium.launch();

  // 1. Full-Screen Desktop Scroll-Through PDF (9 Pages: 3 Hero, 3 Gallery, 3 Gifting)
  const dPage = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  await dPage.setContent(fullDesktopHTML, { waitUntil: 'networkidle' });
  await dPage.evaluate(() => document.fonts.ready);

  const dOut = path.join(ROOT, 'Puck-and-Wick-Desktop-3-Schemes-Scroll.pdf');
  const dArt = path.join(ARTIFACT_DIR, 'Puck-and-Wick-Desktop-3-Schemes-Scroll.pdf');
  await dPage.pdf({
    path: dOut,
    width: '1440px',
    height: '960px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });
  fs.copyFileSync(dOut, dArt);

  const dPages = await dPage.$$('.pdf-page');
  for (let i = 0; i < dPages.length; i++) {
    await dPages[i].screenshot({ path: path.join(ARTIFACT_DIR, `full-desktop-scroll-${i + 1}.png`) });
  }

  // 2. Full-Screen Mobile iPhone Scroll-Through PDF (6 Pages: 3 Gallery, 3 Gifting)
  const mPage = await browser.newPage({ viewport: { width: 430, height: 932 } });
  await mPage.setContent(fullMobileHTML, { waitUntil: 'networkidle' });
  await mPage.evaluate(() => document.fonts.ready);

  const mOut = path.join(ROOT, 'Puck-and-Wick-Mobile-3-Schemes-Scroll.pdf');
  const mArt = path.join(ARTIFACT_DIR, 'Puck-and-Wick-Mobile-3-Schemes-Scroll.pdf');
  await mPage.pdf({
    path: mOut,
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });
  fs.copyFileSync(mOut, mArt);

  const mPages = await mPage.$$('.mobile-page');
  for (let i = 0; i < mPages.length; i++) {
    await mPages[i].screenshot({ path: path.join(ARTIFACT_DIR, `full-mobile-scroll-${i + 1}.png`) });
  }

  await browser.close();
  console.log('Generated Full-Screen Desktop (9 pages) and Full-Screen Mobile (6 pages) 3-Scheme Scroll PDFs!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
