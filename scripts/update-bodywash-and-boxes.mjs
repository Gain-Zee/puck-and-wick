import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

/**
 * Generates an SVG string for the exact Item 03 98/100 Master Crest
 * (continuous hockey sticks + connected blades in one path + flame + typography).
 */
function buildMasterCrestSvg({
  fg = '#D8B778',
  bgFlameInner = '#161618',
  variant = 'candle', // 'candle' | 'bodywash' | 'closed-box'
  exclusiveText = '', // 'ATHLETE EXCLUSIVE' | 'SANCTUARY EXCLUSIVE' | ''
  bottomSpec = 'ZEOCARB-98™ • 8 FL OZ / 236 ML',
  stickStroke = 3.2
}) {
  // Continuous vector sticks + blades from Item 03 in Alibaba Supplier Master Spec Book
  const emblemMarkup = `
    <g stroke="${fg}" stroke-width="${stickStroke}" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M -46,-40 L 44,42 L 58,36.5" />
      <path d="M 46,-40 L -44,42 L -58,36.5" />
    </g>
    <path d="M 0,-52 C 7,-41 11,-34 11,-27 C 11,-20 6,-15 0,-15 C -6,-15 -11,-20 -11,-27 C -11,-32 -8,-37 -4,-41 C -4,-36 -1,-33 2,-33 C 0,-38 0,-45 0,-52 Z" fill="${fg}"/>
    <path d="M 0,-29 C 3,-25 4.5,-22 4.5,-19 C 4.5,-16.5 2.5,-15 0,-15 C -2.5,-15 -4.5,-16.5 -4.5,-19 C -4.5,-22 -2,-26 0,-29 Z" fill="${bgFlameInner}"/>
  `;

  if (variant === 'candle') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-206 -140 412 280" width="412" height="280">
        <g transform="translate(0, -42) scale(0.78)">
          ${emblemMarkup}
        </g>
        <text x="0" y="34" text-anchor="middle" fill="${fg}" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-weight="600" letter-spacing="2.6">PUCK &amp; WICK</text>
        <text x="0" y="72" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="10.5" font-weight="600" letter-spacing="3.8" opacity="0.92">LOUDOUN COUNTY, VA</text>
        <text x="0" y="96" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="9.5" font-weight="600" letter-spacing="4.8" opacity="0.86">USA</text>
      </svg>
    `;
  }

  if (variant === 'bodywash') {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-206 -170 412 360" width="412" height="360">
        <g transform="translate(0, -90) scale(0.76)">
          ${emblemMarkup}
        </g>
        <text x="0" y="-14" text-anchor="middle" fill="${fg}" font-family="'Cormorant Garamond', Georgia, serif" font-size="36" font-weight="600" letter-spacing="2.6">PUCK &amp; WICK</text>
        <text x="0" y="22" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="10.2" font-weight="600" letter-spacing="3.8" opacity="0.92">LOUDOUN COUNTY, VA</text>
        <text x="0" y="44" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="9.2" font-weight="600" letter-spacing="4.8" opacity="0.86">USA</text>
        <line x1="-85" y1="74" x2="85" y2="74" stroke="${fg}" stroke-width="1.1" opacity="0.45"/>
        <text x="0" y="114" text-anchor="middle" fill="${fg}" stroke="${fg}" stroke-width="0.35" font-family="'Montserrat', sans-serif" font-size="16.5" font-weight="700" letter-spacing="4.0">${exclusiveText}</text>
        <text x="0" y="164" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="10.2" font-weight="600" letter-spacing="2.2" opacity="0.86">${bottomSpec}</text>
      </svg>
    `;
  }

  if (variant === 'closed-box') {
    const isVeryLong = exclusiveText.length > 24;
    const isLongTitle = exclusiveText.length > 19;
    const exFontSize = isVeryLong ? '13.0' : (isLongTitle ? '14.5' : '15.8');
    const exLetterSpacing = isVeryLong ? '3.2' : (isLongTitle ? '3.8' : '4.6');
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-260 -155 520 330" width="520" height="330">
        <g transform="translate(0, -64) scale(1.10)">
          ${emblemMarkup}
        </g>
        <text x="0" y="28" text-anchor="middle" fill="${fg}" font-family="'Cormorant Garamond', Georgia, serif" font-size="40" font-weight="600" letter-spacing="3.8">PUCK &amp; WICK</text>
        <text x="0" y="56" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="10.8" font-weight="600" letter-spacing="3.8" opacity="0.90">LOUDOUN COUNTY, VA</text>
        <text x="0" y="75" text-anchor="middle" fill="${fg}" font-family="'Montserrat', sans-serif" font-size="10.0" font-weight="600" letter-spacing="4.8" opacity="0.85">USA</text>
        ${exclusiveText ? `
          <text x="0" y="122" text-anchor="middle" fill="${fg}" stroke="${fg}" stroke-width="0.3" font-family="'Montserrat', sans-serif" font-size="${exFontSize}" font-weight="700" letter-spacing="${exLetterSpacing}" opacity="0.95">${exclusiveText}</text>
        ` : ''}
      </svg>
    `;
  }
}

async function run() {
  console.log('Launching Playwright to update all Body Wash & Exclusive Box images with 100% vector precision...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });

  const svgs = {
    candleMen: buildMasterCrestSvg({ fg: '#D5B575', bgFlameInner: '#18181A', variant: 'candle' }),
    candleWomen: buildMasterCrestSvg({ fg: '#8B6D3B', bgFlameInner: '#E5DCCB', variant: 'candle' }),
    candleWomenShadow: buildMasterCrestSvg({ fg: '#61471E', bgFlameInner: '#9B8B73', variant: 'candle' }),
    bodywashMen: buildMasterCrestSvg({
      fg: '#D5B575',
      bgFlameInner: '#18181A',
      variant: 'bodywash',
      exclusiveText: 'ATHLETE EXCLUSIVE',
      bottomSpec: 'ZEOCARB-98™ • 8 FL OZ / 236 ML'
    }),
    bodywashWomen: buildMasterCrestSvg({
      fg: '#7A5D2E',
      bgFlameInner: '#E5DCCB',
      variant: 'bodywash',
      exclusiveText: 'SANCTUARY EXCLUSIVE',
      bottomSpec: 'ZEOCARB-98™ • 8 FL OZ / 236 ML'
    }),
    bodywashWomenNoBottom: buildMasterCrestSvg({
      fg: '#7A5D2E',
      bgFlameInner: '#E5DCCB',
      variant: 'bodywash',
      exclusiveText: 'SANCTUARY EXCLUSIVE',
      bottomSpec: ''
    }),
    closedBoxMenDeluxe: buildMasterCrestSvg({
      fg: '#D7B676',
      bgFlameInner: '#232325',
      variant: 'closed-box',
      exclusiveText: 'ATHLETE EXCLUSIVE',
      stickStroke: 3.1
    }),
    closedBoxWomenDeluxe: buildMasterCrestSvg({
      fg: '#9D7D47',
      bgFlameInner: '#EDE5D7',
      variant: 'closed-box',
      exclusiveText: 'SANCTUARY EXCLUSIVE',
      stickStroke: 3.1
    }),
    closedBoxMenPuck: buildMasterCrestSvg({
      fg: '#D7B676',
      bgFlameInner: '#232325',
      variant: 'closed-box',
      exclusiveText: 'ZEOCARB-98™ ODOR PUCK',
      stickStroke: 3.1
    }),
    closedBoxWomenPuck: buildMasterCrestSvg({
      fg: '#9D7D47',
      bgFlameInner: '#EDE5D7',
      variant: 'closed-box',
      exclusiveText: 'ZEOCARB-98™ ODOR PUCK',
      stickStroke: 3.1
    }),
    closedBoxMenPuckPair: buildMasterCrestSvg({
      fg: '#D7B676',
      bgFlameInner: '#232325',
      variant: 'closed-box',
      exclusiveText: 'ZEOCARB-98™ ODOR MINI PUCKS',
      stickStroke: 3.1
    })
  };

  const filters = process.argv.slice(2);
  async function processImage(relPath, drawFnStr, args = {}) {
    if (filters.length > 0 && !filters.some(f => relPath.includes(f))) return;
    const fullPath = path.join(ROOT, relPath);
    const bakPath = fullPath + '.orig_clean_bak';
    const srcPath = fs.existsSync(bakPath) ? bakPath : fullPath;
    const imgBuf = fs.readFileSync(srcPath);
    const b64 = imgBuf.toString('base64');

    // Reset page to about:blank first so top-level script declarations never collide
    await page.goto('about:blank');

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { width: 1024px; height: 1024px; overflow: hidden; background: #000; }
        canvas { width: 1024px; height: 1024px; display: block; }
      </style>
    </head>
    <body>
      <canvas id="c" width="1024" height="1024"></canvas>
      <script>
        const svgs = ${JSON.stringify(svgs)};
        const args = ${JSON.stringify(args)};

        function loadSvgImage(svgStr) {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgStr.trim());
          });
        }

        /**
         * Seamlessly erases a rectangular region (in a rotated coordinate frame) using a
         * low-pass smoothed 2D Coons Bilinear Patch (which guarantees C^0 exact continuity on all 4 edges
         * and prevents any vertical/horizontal streaking) plus authentic local micro-grain and feathered alpha blending.
         */
        function eraseRotatedRegion(ctx, baseImg, {
          cx, cy, angleDeg = 0, w, h,
          featherPx = 8,
          mode = 'coons' // 'coons' | 'vertical' | 'horizontal' | 'topOnly'
        }) {
          const pad = Math.max(18, Math.ceil(featherPx * 2 + 4));
          const pw = Math.round(w + pad * 2);
          const ph = Math.round(h + pad * 2);
          const localCanvas = document.createElement('canvas');
          localCanvas.width = pw;
          localCanvas.height = ph;
          const lctx = localCanvas.getContext('2d');

          lctx.save();
          lctx.translate(pw / 2, ph / 2);
          lctx.rotate(-angleDeg * Math.PI / 180);
          lctx.drawImage(baseImg, -cx, -cy);
          lctx.restore();

          const imgData = lctx.getImageData(0, 0, pw, ph);
          const data = imgData.data;

          // Collect high-frequency grain residuals from the clean top boundary strip
          const residuals = [];
          const ringY = Math.max(3, pad - 2);
          for (let x = pad; x < pw - pad; x++) {
            const idx = (ringY * pw + x) * 4;
            let mr = 0, mg = 0, mb = 0;
            for (let dx = -3; dx <= 3; dx++) {
              const xx = Math.max(0, Math.min(pw - 1, x + dx));
              const i2 = (ringY * pw + xx) * 4;
              mr += data[i2]; mg += data[i2 + 1]; mb += data[i2 + 2];
            }
            mr /= 7; mg /= 7; mb /= 7;
            residuals.push([
              Math.max(-6, Math.min(6, data[idx] - mr)),
              Math.max(-6, Math.min(6, data[idx + 1] - mg)),
              Math.max(-6, Math.min(6, data[idx + 2] - mb))
            ]);
          }
          if (residuals.length === 0) residuals.push([0, 0, 0]);

          const topY = Math.max(2, pad - 1);
          const botY = Math.min(ph - 3, ph - pad + 1);
          const leftX = Math.max(2, pad - 1);
          const rightX = Math.min(pw - 3, pw - pad + 1);

          // Sample and low-pass filter the 4 boundary curves T(x), B(x), L(y), R(y)
          // using a 17px wide moving average along each boundary so zero streaking ever occurs!
          function getBoundaryRow(py) {
            const raw = [];
            for (let x = 0; x < pw; x++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dy = -1; dy <= 1; dy++) {
                const yy = Math.max(0, Math.min(ph - 1, py + dy));
                const ii = (yy * pw + x) * 4;
                r += data[ii]; g += data[ii + 1]; b += data[ii + 2];
                c++;
              }
              raw.push([r / c, g / c, b / c]);
            }
            const smooth = [];
            const radius = 8;
            for (let x = 0; x < pw; x++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dx = -radius; dx <= radius; dx++) {
                const xx = Math.max(leftX, Math.min(rightX, x + dx));
                r += raw[xx][0]; g += raw[xx][1]; b += raw[xx][2];
                c++;
              }
              smooth.push([r / c, g / c, b / c]);
            }
            return smooth;
          }

          function getBoundaryCol(px) {
            const raw = [];
            for (let y = 0; y < ph; y++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dx = -1; dx <= 1; dx++) {
                const xx = Math.max(0, Math.min(pw - 1, px + dx));
                const ii = (y * pw + xx) * 4;
                r += data[ii]; g += data[ii + 1]; b += data[ii + 2];
                c++;
              }
              raw.push([r / c, g / c, b / c]);
            }
            const smooth = [];
            const radius = 8;
            for (let y = 0; y < ph; y++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dy = -radius; dy <= radius; dy++) {
                const yy = Math.max(topY, Math.min(botY, y + dy));
                r += raw[yy][0]; g += raw[yy][1]; b += raw[yy][2];
                c++;
              }
              smooth.push([r / c, g / c, b / c]);
            }
            return smooth;
          }

          const topCurve = getBoundaryRow(topY);
          const botCurve = getBoundaryRow(botY);
          const leftCurve = getBoundaryCol(leftX);
          const rightCurve = getBoundaryCol(rightX);

          const cTL = [
            (topCurve[leftX][0] + leftCurve[topY][0]) * 0.5,
            (topCurve[leftX][1] + leftCurve[topY][1]) * 0.5,
            (topCurve[leftX][2] + leftCurve[topY][2]) * 0.5
          ];
          const cTR = [
            (topCurve[rightX][0] + rightCurve[topY][0]) * 0.5,
            (topCurve[rightX][1] + rightCurve[topY][1]) * 0.5,
            (topCurve[rightX][2] + rightCurve[topY][2]) * 0.5
          ];
          const cBL = [
            (botCurve[leftX][0] + leftCurve[botY][0]) * 0.5,
            (botCurve[leftX][1] + leftCurve[botY][1]) * 0.5,
            (botCurve[leftX][2] + leftCurve[botY][2]) * 0.5
          ];
          const cBR = [
            (botCurve[rightX][0] + rightCurve[botY][0]) * 0.5,
            (botCurve[rightX][1] + rightCurve[botY][1]) * 0.5,
            (botCurve[rightX][2] + rightCurve[botY][2]) * 0.5
          ];

          const fillCanvas = document.createElement('canvas');
          fillCanvas.width = pw;
          fillCanvas.height = ph;
          const fctx = fillCanvas.getContext('2d');
          const fillImg = fctx.createImageData(pw, ph);
          const fData = fillImg.data;

          for (let y = 0; y < ph; y++) {
            for (let x = 0; x < pw; x++) {
              const idx = (y * pw + x) * 4;
              const u = Math.max(0, Math.min(1, (x - leftX) / Math.max(1, rightX - leftX)));
              const v = Math.max(0, Math.min(1, (y - topY) / Math.max(1, botY - topY)));

              const topC = topCurve[x];
              const botC = botCurve[x];
              const leftC = leftCurve[y];
              const rightC = rightCurve[y];

              let r, g, b;
              if (mode === 'topOnly') {
                r = topC[0]; g = topC[1]; b = topC[2];
              } else if (mode === 'vertical') {
                r = topC[0] * (1 - v) + botC[0] * v;
                g = topC[1] * (1 - v) + botC[1] * v;
                b = topC[2] * (1 - v) + botC[2] * v;
              } else if (mode === 'horizontal') {
                r = leftC[0] * (1 - u) + rightC[0] * u;
                g = leftC[1] * (1 - u) + rightC[1] * u;
                b = leftC[2] * (1 - u) + rightC[2] * u;
              } else {
                // Exact 2D Coons Bilinear Patch
                const cR = (1 - u) * (1 - v) * cTL[0] + u * (1 - v) * cTR[0] + (1 - u) * v * cBL[0] + u * v * cBR[0];
                const cG = (1 - u) * (1 - v) * cTL[1] + u * (1 - v) * cTR[1] + (1 - u) * v * cBL[1] + u * v * cBR[1];
                const cB = (1 - u) * (1 - v) * cTL[2] + u * (1 - v) * cTR[2] + (1 - u) * v * cBL[2] + u * v * cBR[2];
                r = (1 - v) * topC[0] + v * botC[0] + (1 - u) * leftC[0] + u * rightC[0] - cR;
                g = (1 - v) * topC[1] + v * botC[1] + (1 - u) * leftC[1] + u * rightC[1] - cG;
                b = (1 - v) * topC[2] + v * botC[2] + (1 - u) * leftC[2] + u * rightC[2] - cB;
              }

              const res = residuals[(x * 73 + y * 151) % residuals.length];
              fData[idx] = Math.max(0, Math.min(255, Math.round(r + res[0] * 0.55)));
              fData[idx + 1] = Math.max(0, Math.min(255, Math.round(g + res[1] * 0.55)));
              fData[idx + 2] = Math.max(0, Math.min(255, Math.round(b + res[2] * 0.55)));
              fData[idx + 3] = 255;
            }
          }
          fctx.putImageData(fillImg, 0, 0);

          const maskCanvas = document.createElement('canvas');
          maskCanvas.width = pw;
          maskCanvas.height = ph;
          const mctx = maskCanvas.getContext('2d');
          if (featherPx > 0) {
            mctx.filter = 'blur(' + featherPx + 'px)';
          }
          mctx.fillStyle = '#fff';
          mctx.fillRect(pad, pad, w, h);

          fctx.globalCompositeOperation = 'destination-in';
          fctx.drawImage(maskCanvas, 0, 0);

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angleDeg * Math.PI / 180);
          ctx.drawImage(fillCanvas, -pw / 2, -ph / 2);
          ctx.restore();
        }

        /**
         * Repaints the interior of a product label (preserving its gold/cream border) using a
         * smoothed 2D Coons Bilinear Patch sampled from the clean interior margin just inside the border,
         * then overlays the crisp vector Master Crest SVG.
         */
        function repaintLabelAndDrawCrest(ctx, baseImg, svgImg, {
          cx, cy, angleDeg = 0,
          labelW, labelH,
          crestW, crestH, crestOffsetY = 0,
          featherPx = 1.5,
          opacity = 0.94,
          mode = 'coons' // 'coons' | 'topOnly' | 'horizontal' | 'vertical'
        }) {
          eraseRotatedRegion(ctx, baseImg, {
            cx, cy, angleDeg, w: labelW, h: labelH,
            featherPx, mode
          });
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angleDeg * Math.PI / 180);
          ctx.globalAlpha = opacity;
          ctx.drawImage(svgImg, -crestW / 2, -crestH / 2 + crestOffsetY, crestW, crestH);
          ctx.restore();
        }

        /**
         * Un-rotates, un-skews, and un-arches a 3D cylindrical product label into a flat 2D frame,
         * erases ONLY the interior text box (strictly inside existing gold borders so existing borders
         * are 100% untouched), optionally draws a curved thin gold border, draws the Master Crest SVG
         * with cylindrical lighting falloff, and warps ONLY the interior delta back onto ctx.
         */
        function processCylindricalLabel(ctx, baseImg, svgImg, {
          cx, cy,
          angleDeg = 0,
          skewXDeg = 0,
          archPx = 0,
          spanW = 106,
          eraseW, eraseH,
          eraseOffsetX = 0,
          eraseOffsetY = 0,
          crestW, crestH,
          crestOffsetX = 0,
          crestOffsetY = 0,
          featherPx = 1.5,
          opacity = 0.93,
          mode = 'vertical',
          shadeSlope = 0, // e.g. -0.22 to darken right side of cream cylindrical labels
          drawBorder = null // optional { w, h, offsetX = 0, offsetY = 0, color = 'rgba(138, 108, 48, 0.68)', lineWidth = 1.1 }
        }) {
          const pad = 20;
          const maxW = Math.max(eraseW + Math.abs(eraseOffsetX) * 2, crestW + Math.abs(crestOffsetX) * 2, drawBorder ? drawBorder.w + 8 : 0, spanW);
          const maxH = Math.max(eraseH + Math.abs(eraseOffsetY) * 2, crestH + Math.abs(crestOffsetY) * 2, drawBorder ? drawBorder.h + 8 : 0);
          const pw = Math.round(maxW + pad * 2);
          const ph = Math.round(maxH + pad * 2);
          const archPad = 24;

          // 1) Extract un-rotated, un-skewed patch into rawCanvas
          const rawCanvas = document.createElement('canvas');
          rawCanvas.width = pw;
          rawCanvas.height = ph + archPad * 2;
          const rctx = rawCanvas.getContext('2d');
          rctx.save();
          rctx.translate(pw / 2, (ph + archPad * 2) / 2);
          rctx.transform(1, 0, Math.tan(-skewXDeg * Math.PI / 180), 1, 0, 0);
          rctx.rotate(-angleDeg * Math.PI / 180);
          rctx.drawImage(baseImg, -cx, -cy);
          rctx.restore();

          // 2) Un-arch column by column into localCanvas so curved top/bottom borders become flat horizontal lines
          const localCanvas = document.createElement('canvas');
          localCanvas.width = pw;
          localCanvas.height = ph;
          const lctx = localCanvas.getContext('2d');
          for (let x = 0; x < pw; x++) {
            const u = (x - pw / 2) / (spanW / 2);
            const dy = archPx * (u * u - 1 / 3);
            lctx.drawImage(rawCanvas, x, archPad + dy, 1, ph, x, 0, 1, ph);
          }

          // 3) Inpaint the interior erase box (eraseOffsetX, eraseOffsetY, eraseW, eraseH) inside localCanvas
          const imgData = lctx.getImageData(0, 0, pw, ph);
          const data = imgData.data;

          const ex0 = Math.round(pw / 2 + eraseOffsetX - eraseW / 2);
          const ey0 = Math.round(ph / 2 + eraseOffsetY - eraseH / 2);
          const ex1 = ex0 + Math.round(eraseW);
          const ey1 = ey0 + Math.round(eraseH);

          const topY = Math.max(2, ey0 - 1);
          const botY = Math.min(ph - 3, ey1 + 1);
          const leftX = Math.max(2, ex0 - 1);
          const rightX = Math.min(pw - 3, ex1 + 1);

          // Sample high-frequency grain residuals from clean top boundary strip
          const residuals = [];
          const ringY = Math.max(3, topY - 1);
          for (let x = leftX; x <= rightX; x++) {
            const idx = (ringY * pw + x) * 4;
            let mr = 0, mg = 0, mb = 0;
            for (let dx = -3; dx <= 3; dx++) {
              const xx = Math.max(0, Math.min(pw - 1, x + dx));
              const i2 = (ringY * pw + xx) * 4;
              mr += data[i2]; mg += data[i2 + 1]; mb += data[i2 + 2];
            }
            mr /= 7; mg /= 7; mb /= 7;
            residuals.push([
              Math.max(-5, Math.min(5, data[idx] - mr)),
              Math.max(-5, Math.min(5, data[idx + 1] - mg)),
              Math.max(-5, Math.min(5, data[idx + 2] - mb))
            ]);
          }
          if (residuals.length === 0) residuals.push([0, 0, 0]);

          function getBoundaryRow(py) {
            const raw = [];
            for (let x = 0; x < pw; x++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dy = -1; dy <= 1; dy++) {
                const yy = Math.max(0, Math.min(ph - 1, py + dy));
                const ii = (yy * pw + x) * 4;
                r += data[ii]; g += data[ii + 1]; b += data[ii + 2];
                c++;
              }
              raw.push([r / c, g / c, b / c]);
            }
            const smooth = [];
            const radius = 2;
            for (let x = 0; x < pw; x++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dx = -radius; dx <= radius; dx++) {
                const xx = Math.max(leftX, Math.min(rightX, x + dx));
                r += raw[xx][0]; g += raw[xx][1]; b += raw[xx][2];
                c++;
              }
              smooth.push([r / c, g / c, b / c]);
            }
            return smooth;
          }

          function getBoundaryCol(px) {
            const raw = [];
            for (let y = 0; y < ph; y++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dx = -1; dx <= 1; dx++) {
                const xx = Math.max(0, Math.min(pw - 1, px + dx));
                const ii = (y * pw + xx) * 4;
                r += data[ii]; g += data[ii + 1]; b += data[ii + 2];
                c++;
              }
              raw.push([r / c, g / c, b / c]);
            }
            const smooth = [];
            const radius = 2;
            for (let y = 0; y < ph; y++) {
              let r = 0, g = 0, b = 0, c = 0;
              for (let dy = -radius; dy <= radius; dy++) {
                const yy = Math.max(topY, Math.min(botY, y + dy));
                r += raw[yy][0]; g += raw[yy][1]; b += raw[yy][2];
                c++;
              }
              smooth.push([r / c, g / c, b / c]);
            }
            return smooth;
          }

          const topCurve = getBoundaryRow(topY);
          const botCurve = getBoundaryRow(botY);
          const leftCurve = getBoundaryCol(leftX);
          const rightCurve = getBoundaryCol(rightX);

          const cTL = [
            (topCurve[leftX][0] + leftCurve[topY][0]) * 0.5,
            (topCurve[leftX][1] + leftCurve[topY][1]) * 0.5,
            (topCurve[leftX][2] + leftCurve[topY][2]) * 0.5
          ];
          const cTR = [
            (topCurve[rightX][0] + rightCurve[topY][0]) * 0.5,
            (topCurve[rightX][1] + rightCurve[topY][1]) * 0.5,
            (topCurve[rightX][2] + rightCurve[topY][2]) * 0.5
          ];
          const cBL = [
            (botCurve[leftX][0] + leftCurve[botY][0]) * 0.5,
            (botCurve[leftX][1] + leftCurve[botY][1]) * 0.5,
            (botCurve[leftX][2] + leftCurve[botY][2]) * 0.5
          ];
          const cBR = [
            (botCurve[rightX][0] + rightCurve[botY][0]) * 0.5,
            (botCurve[rightX][1] + rightCurve[botY][1]) * 0.5,
            (botCurve[rightX][2] + rightCurve[botY][2]) * 0.5
          ];

          const fillCanvas = document.createElement('canvas');
          fillCanvas.width = pw;
          fillCanvas.height = ph;
          const fctx = fillCanvas.getContext('2d');
          const fillImg = fctx.createImageData(pw, ph);
          const fData = fillImg.data;

          for (let y = 0; y < ph; y++) {
            for (let x = 0; x < pw; x++) {
              const idx = (y * pw + x) * 4;
              const u = Math.max(0, Math.min(1, (x - leftX) / Math.max(1, rightX - leftX)));
              const v = Math.max(0, Math.min(1, (y - topY) / Math.max(1, botY - topY)));
              const topC = topCurve[x];
              const botC = botCurve[x];
              const leftC = leftCurve[y];
              const rightC = rightCurve[y];
              let r, g, b;
              if (mode === 'coons') {
                const cR = (1 - u) * (1 - v) * cTL[0] + u * (1 - v) * cTR[0] + (1 - u) * v * cBL[0] + u * v * cBR[0];
                const cG = (1 - u) * (1 - v) * cTL[1] + u * (1 - v) * cTR[1] + (1 - u) * v * cBL[1] + u * v * cBR[1];
                const cB = (1 - u) * (1 - v) * cTL[2] + u * (1 - v) * cTR[2] + (1 - u) * v * cBL[2] + u * v * cBR[2];
                r = (1 - v) * topC[0] + v * botC[0] + (1 - u) * leftC[0] + u * rightC[0] - cR;
                g = (1 - v) * topC[1] + v * botC[1] + (1 - u) * leftC[1] + u * rightC[1] - cG;
                b = (1 - v) * topC[2] + v * botC[2] + (1 - u) * leftC[2] + u * rightC[2] - cB;
              } else if (mode === 'vertical') {
                r = topC[0] * (1 - v) + botC[0] * v;
                g = topC[1] * (1 - v) + botC[1] * v;
                b = topC[2] * (1 - v) + botC[2] * v;
              } else {
                r = leftC[0] * (1 - u) + rightC[0] * u;
                g = leftC[1] * (1 - u) + rightC[1] * u;
                b = leftC[2] * (1 - u) + rightC[2] * u;
              }
              const res = residuals[(x * 73 + y * 151) % residuals.length];
              fData[idx] = Math.max(0, Math.min(255, Math.round(r + res[0] * 0.5)));
              fData[idx + 1] = Math.max(0, Math.min(255, Math.round(g + res[1] * 0.5)));
              fData[idx + 2] = Math.max(0, Math.min(255, Math.round(b + res[2] * 0.5)));
              fData[idx + 3] = 255;
            }
          }
          fctx.putImageData(fillImg, 0, 0);

          const maskCanvas = document.createElement('canvas');
          maskCanvas.width = pw;
          maskCanvas.height = ph;
          const mctx = maskCanvas.getContext('2d');
          if (featherPx > 0) {
            mctx.filter = 'blur(' + featherPx + 'px)';
          }
          mctx.fillStyle = '#fff';
          mctx.fillRect(ex0, ey0, eraseW, eraseH);

          fctx.globalCompositeOperation = 'destination-in';
          fctx.drawImage(maskCanvas, 0, 0);

          // 4) Build deltaCanvas in flattened frame (inpainted interior + optional curved border + Master Crest)
          const deltaCanvas = document.createElement('canvas');
          deltaCanvas.width = pw;
          deltaCanvas.height = ph;
          const dctx = deltaCanvas.getContext('2d');
          dctx.drawImage(fillCanvas, 0, 0);

          const artCanvas = document.createElement('canvas');
          artCanvas.width = pw;
          artCanvas.height = ph;
          const actx = artCanvas.getContext('2d');

          if (drawBorder) {
            actx.save();
            actx.strokeStyle = drawBorder.color || 'rgba(138, 108, 48, 0.68)';
            actx.lineWidth = drawBorder.lineWidth || 1.1;
            const bx = pw / 2 + (drawBorder.offsetX || 0) - drawBorder.w / 2;
            const by = ph / 2 + (drawBorder.offsetY || 0) - drawBorder.h / 2;
            actx.strokeRect(bx, by, drawBorder.w, drawBorder.h);
            actx.restore();
          }

          actx.save();
          actx.globalAlpha = opacity;
          actx.drawImage(
            svgImg,
            pw / 2 + crestOffsetX - crestW / 2,
            ph / 2 + crestOffsetY - crestH / 2,
            crestW,
            crestH
          );
          actx.restore();

          if (shadeSlope !== 0) {
            const artData = actx.getImageData(0, 0, pw, ph);
            const ad = artData.data;
            for (let y = 0; y < ph; y++) {
              for (let x = 0; x < pw; x++) {
                const i = (y * pw + x) * 4;
                if (ad[i + 3] > 0) {
                  const u = (x - pw / 2) / (spanW / 2);
                  const mult = Math.max(0.68, Math.min(1.06, 1 + shadeSlope * u));
                  ad[i] = Math.max(0, Math.min(255, Math.round(ad[i] * mult)));
                  ad[i + 1] = Math.max(0, Math.min(255, Math.round(ad[i + 1] * mult)));
                  ad[i + 2] = Math.max(0, Math.min(255, Math.round(ad[i + 2] * mult)));
                }
              }
            }
            actx.putImageData(artData, 0, 0);
          }

          dctx.drawImage(artCanvas, 0, 0);

          // 5) Re-arch deltaCanvas column by column and warp back onto ctx
          const archedDelta = document.createElement('canvas');
          archedDelta.width = pw;
          archedDelta.height = ph + archPad * 2;
          const adctx = archedDelta.getContext('2d');
          for (let x = 0; x < pw; x++) {
            const u = (x - pw / 2) / (spanW / 2);
            const dy = archPx * (u * u - 1 / 3);
            adctx.drawImage(deltaCanvas, x, 0, 1, ph, x, archPad + dy, 1, ph);
          }

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angleDeg * Math.PI / 180);
          ctx.transform(1, 0, Math.tan(skewXDeg * Math.PI / 180), 1, 0, 0);
          ctx.drawImage(archedDelta, -pw / 2, -(ph + archPad * 2) / 2);
          ctx.restore();
        }

        window.render = async () => {
          await document.fonts.ready;
          const canvas = document.getElementById('c');
          const ctx = canvas.getContext('2d');
          const baseImg = new Image();
          await new Promise((res, rej) => {
            baseImg.onload = res;
            baseImg.onerror = rej;
            baseImg.src = 'data:image/jpeg;base64,${b64}';
          });
          ctx.drawImage(baseImg, 0, 0, 1024, 1024);

          const fn = ${drawFnStr};
          await fn(ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion, repaintLabelAndDrawCrest, processCylindricalLabel, args });
          return canvas.toDataURL('image/jpeg', 0.95);
        };
      </script>
    </body>
    </html>`;

    await page.setContent(html, { waitUntil: 'networkidle' });
    const dataUrl = await page.evaluate(() => window.render());
    const outBuf = Buffer.from(dataUrl.split(',')[1], 'base64');
    fs.writeFileSync(fullPath, outBuf);
    console.log('✓ Updated', relPath);
  }

  // ============================================================================
  // 1. MEN'S 8 OZ BODY WASH (item-bodywash-men.jpg, wash-men-shower.jpg, wash-men-gym-towel.jpg)
  //    Gold border: x = 424..606, y = 468..685 => interior cx = 515, cy = 576.5, w = 166, h = 198
  //    Bottom bottle text: x = 450..580, y = 710..762 => cx = 515, cy = 736, w = 132, h = 54
  // ============================================================================
  for (const relPath of [
    'assets/images/item-bodywash-men.jpg',
    'assets/images/packaging/wash-men-shower.jpg',
    'assets/images/packaging/wash-men-gym-towel.jpg'
  ]) {
    await processImage(relPath, (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion, repaintLabelAndDrawCrest }) => {
      // 1) Seamlessly erase "MATTE-BLACK / 8 OZ (236ml)" below the label on the bottle glass
      eraseRotatedRegion(ctx, baseImg, {
        cx: 515, cy: 736, angleDeg: 0, w: 132, h: 54,
        featherPx: 4, mode: 'coons'
      });
      // 2) Repaint inside the gold label frame (using vertical mode to avoid sampling the left/right gold border!)
      const crestImg = await loadSvgImage(svgs.bodywashMen);
      repaintLabelAndDrawCrest(ctx, baseImg, crestImg, {
        cx: 515, cy: 576.5, angleDeg: 0,
        labelW: 166, labelH: 198,
        crestW: 170, crestH: 184, crestOffsetY: 2,
        featherPx: 1.5, opacity: 0.94, mode: 'vertical'
      });
    }).toString());
  }

  // ============================================================================
  // 2. WOMEN'S 8 OZ BODY WASH (item-bodywash-women.jpg, wash-women-vanity.jpg, wash-women-shower.jpg)
  //    Cream label: y = 468..726 => topY = 480 (clean cream), botY = 718 (clean cream below old ZEOCARB at 702..710)
  // ============================================================================
  for (const relPath of [
    'assets/images/item-bodywash-women.jpg',
    'assets/images/packaging/wash-women-vanity.jpg'
  ]) {
    await processImage(relPath, (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
      eraseRotatedRegion(ctx, baseImg, {
        cx: 512, cy: 599, angleDeg: 0, w: 188, h: 236,
        featherPx: 2.0, mode: 'vertical'
      });
      // Draw subtle curved gold border matching 2B on Reference Sheet and Men's bottle
      ctx.save();
      ctx.strokeStyle = 'rgba(138, 108, 48, 0.72)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(418, 482);
      ctx.quadraticCurveTo(512, 485, 604, 482);
      ctx.lineTo(604, 710);
      ctx.quadraticCurveTo(512, 715, 418, 710);
      ctx.closePath();
      ctx.stroke();
      const crestImg = await loadSvgImage(svgs.bodywashWomen);
      ctx.globalAlpha = 0.92;
      ctx.drawImage(crestImg, 512 - 90, 597 - 96, 180, 192);
      ctx.restore();
    }).toString());
  }

  // wash-women-shower.jpg: Cream paper label is x = 438..577, y = 514..670 => cx = 507.5, cy = 594, w = 132, h = 138
  await processImage('assets/images/packaging/wash-women-shower.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 507.5, cy: 594, angleDeg: 0, w: 132, h: 138,
      featherPx: 1.5, mode: 'vertical'
    });
    ctx.save();
    ctx.strokeStyle = 'rgba(138, 108, 48, 0.70)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(445, 522);
    ctx.quadraticCurveTo(507.5, 524, 570, 522);
    ctx.lineTo(570, 661);
    ctx.quadraticCurveTo(507.5, 664, 445, 661);
    ctx.closePath();
    ctx.stroke();
    const crestImg = await loadSvgImage(svgs.bodywashWomen);
    ctx.globalAlpha = 0.92;
    ctx.drawImage(crestImg, 507.5 - 58, 591 - 61, 116, 122);
    ctx.restore();
  }).toString());

  // ============================================================================
  // 3. CLOSED DELUXE BOXES (box-men-closed.jpg & box-women-closed.jpg)
  // ============================================================================
  await processImage('assets/images/box-men-closed.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 482, cy: 392, angleDeg: 19.5, w: 325, h: 230,
      featherPx: 12, mode: 'coons'
    });
    const crestImg = await loadSvgImage(svgs.closedBoxMenDeluxe);
    ctx.save();
    ctx.translate(476, 398);
    ctx.rotate(19.5 * Math.PI / 180);
    ctx.transform(1, 0, Math.tan(-14 * Math.PI / 180), 0.76, 0, 0);
    ctx.globalAlpha = 0.93;
    ctx.drawImage(crestImg, -210, -130, 420, 250);
    ctx.restore();
  }).toString());

  await processImage('assets/images/box-women-closed.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 480, cy: 398, angleDeg: 19.5, w: 330, h: 245,
      featherPx: 12, mode: 'coons'
    });
    const crestImg = await loadSvgImage(svgs.closedBoxWomenDeluxe);
    ctx.save();
    ctx.translate(476, 398);
    ctx.rotate(19.5 * Math.PI / 180);
    ctx.transform(1, 0, Math.tan(-14 * Math.PI / 180), 0.76, 0, 0);
    ctx.globalAlpha = 0.91;
    ctx.drawImage(crestImg, -210, -130, 420, 250);
    ctx.restore();
  }).toString());

  // ============================================================================
  // 4. CLOSED PUCK BOXES (puck-men-box-closed.jpg, puck-women-box-closed.jpg, puck-mini-pair-box-closed.jpg)
  // ============================================================================
  await processImage('assets/images/packaging/puck-men-box-closed.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 565, cy: 360, angleDeg: 18.5, w: 300, h: 225,
      featherPx: 12, mode: 'vertical'
    });
    const crestImg = await loadSvgImage(svgs.closedBoxMenPuck);
    ctx.save();
    ctx.translate(562, 362);
    ctx.rotate(18.5 * Math.PI / 180);
    ctx.transform(1, 0, Math.tan(-14 * Math.PI / 180), 0.76, 0, 0);
    ctx.globalAlpha = 0.93;
    ctx.drawImage(crestImg, -180, -110, 360, 215);
    ctx.restore();
  }).toString());

  await processImage('assets/images/packaging/puck-women-box-closed.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 572, cy: 344, angleDeg: 18.5, w: 305, h: 215,
      featherPx: 12, mode: 'horizontal'
    });
    const crestImg = await loadSvgImage(svgs.closedBoxWomenPuck);
    ctx.save();
    ctx.translate(568, 355);
    ctx.rotate(18.5 * Math.PI / 180);
    ctx.transform(1, 0, Math.tan(-14 * Math.PI / 180), 0.76, 0, 0);
    ctx.globalAlpha = 0.91;
    ctx.drawImage(crestImg, -175, -108, 350, 208);
    ctx.restore();
  }).toString());

  await processImage('assets/images/packaging/puck-mini-pair-box-closed.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 505, cy: 276, angleDeg: -15.5, w: 355, h: 210,
      featherPx: 12, mode: 'horizontal'
    });
    const crestImg = await loadSvgImage(svgs.closedBoxMenPuckPair);
    ctx.save();
    ctx.translate(505, 288);
    ctx.rotate(-15.5 * Math.PI / 180);
    ctx.transform(1, 0, Math.tan(12 * Math.PI / 180), 0.76, 0, 0);
    ctx.globalAlpha = 0.94;
    ctx.drawImage(crestImg, -180, -110, 360, 215);
    ctx.restore();
  }).toString());

  // ============================================================================
  // 5. OPEN DELUXE BOXES (box-men-open.jpg & box-women-open.jpg)
  //    - Remove inside foam logo completely!
  //    - Update Candle Jar label & Body Wash Bottle label inside the box with
  //      exact 3D cylindrical un-arching + perspective skew alignment!
  // ============================================================================
  await processImage('assets/images/box-men-open.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion, processCylindricalLabel }) => {
    // 1) Completely remove logo & ATHLETE EXCLUSIVE from the inside foam
    eraseRotatedRegion(ctx, baseImg, {
      cx: 576, cy: 368, angleDeg: 18.5, w: 262, h: 122,
      featherPx: 10, mode: 'vertical'
    });
    // 2) Update Left Candle Jar label strictly inside the existing gold border (x = -55..+55, y = -58..+58)
    const candleCrest = await loadSvgImage(svgs.candleMen);
    processCylindricalLabel(ctx, baseImg, candleCrest, {
      cx: 275.7, cy: 438.5,
      angleDeg: 20.0, skewXDeg: -4.75, archPx: 5.5, spanW: 108,
      eraseW: 96, eraseH: 56, eraseOffsetX: -1, eraseOffsetY: -11,
      crestW: 92, crestH: 64, crestOffsetX: 0, crestOffsetY: 1,
      featherPx: 2.0, opacity: 0.93, mode: 'coons'
    });
    // 3) Update Right Body Wash Bottle label strictly inside the existing gold border (x = -53..+53, y = -57..+57)
    const washCrest = await loadSvgImage(svgs.bodywashMen);
    processCylindricalLabel(ctx, baseImg, washCrest, {
      cx: 725.8, cy: 580.1,
      angleDeg: 20.0, skewXDeg: -4.4, archPx: 7.0, spanW: 106,
      eraseW: 94, eraseH: 92, eraseOffsetX: -1, eraseOffsetY: 5,
      crestW: 88, crestH: 94, crestOffsetX: 0, crestOffsetY: 1,
      featherPx: 2.0, opacity: 0.93, mode: 'coons'
    });
  }).toString());

  await processImage('assets/images/box-women-open.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion, processCylindricalLabel }) => {
    // 1) Completely remove logo & SANCTUARY EXCLUSIVE from the inside foam
    eraseRotatedRegion(ctx, baseImg, {
      cx: 584, cy: 366, angleDeg: 18.5, w: 272, h: 116,
      featherPx: 8, mode: 'vertical'
    });
    // 2) Update Left Candle Jar label strictly inside the existing gold border (x = -52..+52, y = -58..+58)
    const candleCrest = await loadSvgImage(svgs.candleWomen);
    processCylindricalLabel(ctx, baseImg, candleCrest, {
      cx: 275.3, cy: 437.9,
      angleDeg: 20.5, skewXDeg: -3.5, archPx: 6.0, spanW: 104,
      eraseW: 92, eraseH: 54, eraseOffsetX: -1, eraseOffsetY: -11,
      crestW: 88, crestH: 60, crestOffsetX: 0, crestOffsetY: 1,
      featherPx: 2.0, opacity: 0.92, mode: 'coons',
      shadeSlope: -0.22
    });
    // 3) Update Right Body Wash Bottle label + cylindrically curved thin gold border (cream sticker x = -58..+58)
    const washCrest = await loadSvgImage(svgs.bodywashWomen);
    processCylindricalLabel(ctx, baseImg, washCrest, {
      cx: 733.7, cy: 595.9,
      angleDeg: 21.5, skewXDeg: -3.5, archPx: 8.0, spanW: 114,
      eraseW: 104, eraseH: 112, eraseOffsetX: 0, eraseOffsetY: 2,
      crestW: 88, crestH: 94, crestOffsetX: 0, crestOffsetY: 1,
      featherPx: 2.0, opacity: 0.92, mode: 'coons',
      shadeSlope: -0.22,
      drawBorder: {
        w: 100, h: 116, offsetX: 0, offsetY: 1,
        color: 'rgba(138, 108, 48, 0.72)', lineWidth: 1.15
      }
    });
  }).toString());

  // ============================================================================
  // 6. ITEMS-OUT EXCLUSIVE BOXES (box-men-items-out.jpg & box-women-items-out.jpg)
  // ============================================================================
  await processImage('assets/images/box-men-items-out.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, processCylindricalLabel }) => {
    // 1) Left Lit Candle Jar label (curved downward archPx = -6.0, border x = -87..+87)
    const candleCrest = await loadSvgImage(svgs.candleMen);
    processCylindricalLabel(ctx, baseImg, candleCrest, {
      cx: 225.0, cy: 649.0,
      angleDeg: 0, skewXDeg: 0, archPx: -6.0, spanW: 174,
      eraseW: 162, eraseH: 84, eraseOffsetX: 0, eraseOffsetY: 2,
      crestW: 156, crestH: 108, crestOffsetX: 0, crestOffsetY: 2,
      featherPx: 1.0, opacity: 0.93, mode: 'vertical'
    });
    // 2) Right Body Wash Bottle label (curved downward archPx = -9.0)
    const washCrest = await loadSvgImage(svgs.bodywashMen);
    processCylindricalLabel(ctx, baseImg, washCrest, {
      cx: 838.5, cy: 616.0,
      angleDeg: 0, skewXDeg: 0, archPx: -9.0, spanW: 165,
      eraseW: 148, eraseH: 162, eraseOffsetX: 0, eraseOffsetY: 4,
      crestW: 146, crestH: 160, crestOffsetX: 0, crestOffsetY: 0,
      featherPx: 1.5, opacity: 0.93, mode: 'vertical'
    });
  }).toString());

  await processImage('assets/images/box-women-items-out.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, eraseRotatedRegion, processCylindricalLabel }) => {
    // 1) Completely remove logo & PUCK & WICK from background open box inside lid
    eraseRotatedRegion(ctx, baseImg, {
      cx: 655, cy: 264, angleDeg: 4.5, w: 170, h: 104,
      featherPx: 10, mode: 'vertical'
    });
    // 2) Left Candle Jar label (strictly inside existing curved gold border x = -61..+61)
    const candleCrest = await loadSvgImage(svgs.candleWomen);
    processCylindricalLabel(ctx, baseImg, candleCrest, {
      cx: 277.5, cy: 611.0,
      angleDeg: 0, skewXDeg: 0, archPx: -6.0, spanW: 122,
      eraseW: 114, eraseH: 56, eraseOffsetX: 0, eraseOffsetY: 4,
      crestW: 108, crestH: 74, crestOffsetX: 0, crestOffsetY: 2,
      featherPx: 1.0, opacity: 0.91, mode: 'vertical',
      shadeSlope: -0.14
    });
    // 3) Right Body Wash Bottle label + cylindrically curved thin gold border
    const washCrest = await loadSvgImage(svgs.bodywashWomen);
    processCylindricalLabel(ctx, baseImg, washCrest, {
      cx: 804.0, cy: 604.5,
      angleDeg: 0, skewXDeg: 0, archPx: -7.5, spanW: 126,
      eraseW: 112, eraseH: 118, eraseOffsetX: 0, eraseOffsetY: 4,
      crestW: 102, crestH: 112, crestOffsetX: 0, crestOffsetY: 2,
      featherPx: 1.5, opacity: 0.91, mode: 'vertical',
      shadeSlope: -0.16,
      drawBorder: {
        w: 114, h: 132, offsetX: 0, offsetY: 2,
        color: 'rgba(138, 108, 48, 0.70)', lineWidth: 1.15
      }
    });
  }).toString());

  // ============================================================================
  // 7. OPEN PUCK BOXES — Remove Inside Lid Logos (puck-men-box.jpg, puck-women-box.jpg, puck-mini-pair-box.jpg)
  // ============================================================================
  await processImage('assets/images/packaging/puck-men-box.jpg', (async (ctx, baseImg, { eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 642, cy: 312, angleDeg: 17.5, w: 285, h: 210,
      featherPx: 14, mode: 'horizontal'
    });
  }).toString());

  await processImage('assets/images/packaging/puck-women-box.jpg', (async (ctx, baseImg, { eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 636, cy: 330, angleDeg: 16.5, w: 290, h: 215,
      featherPx: 10, mode: 'horizontal'
    });
  }).toString());

  await processImage('assets/images/packaging/puck-mini-pair-box.jpg', (async (ctx, baseImg, { eraseRotatedRegion }) => {
    eraseRotatedRegion(ctx, baseImg, {
      cx: 438, cy: 342, angleDeg: -16.5, w: 325, h: 250,
      featherPx: 10, mode: 'horizontal'
    });
  }).toString());

  // ============================================================================
  // 8. USE-CASE & EXTRA GALLERY SLIDES (box-men-usecase.jpg, box-women-usecase.jpg, his-hers-colorway.jpg, womens-candle-lineup.jpg)
  // ============================================================================
  await processImage('assets/images/box-men-usecase.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, repaintLabelAndDrawCrest }) => {
    // Top-right Body Wash gold border: x = 718..820, y = 250..368 => interior cx = 769, cy = 309, w = 94, h = 108
    const washCrest = await loadSvgImage(svgs.bodywashMen);
    repaintLabelAndDrawCrest(ctx, baseImg, washCrest, {
      cx: 769, cy: 309, angleDeg: 0,
      labelW: 94, labelH: 108,
      crestW: 88, crestH: 94, crestOffsetY: 1,
      featherPx: 1.5, opacity: 0.92, mode: 'vertical'
    });
    // Bottom-center Candle Jar gold border: x = 445..578, y = 755..888 => interior cx = 511.5, cy = 821.5, w = 118, h = 118
    const candleCrest = await loadSvgImage(svgs.candleMen);
    repaintLabelAndDrawCrest(ctx, baseImg, candleCrest, {
      cx: 511.5, cy: 821.5, angleDeg: 0,
      labelW: 118, labelH: 118,
      crestW: 118, crestH: 80, crestOffsetY: 1,
      featherPx: 1.5, opacity: 0.92, mode: 'vertical'
    });
  }).toString());

  await processImage('assets/images/box-women-usecase.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, repaintLabelAndDrawCrest }) => {
    // 1) Background nightstand Candle Jar label: x = 684..742, y = 342..392 => cx = 713, cy = 367, w = 58, h = 44
    const candleWomen = await loadSvgImage(svgs.candleWomen);
    repaintLabelAndDrawCrest(ctx, baseImg, candleWomen, {
      cx: 713, cy: 367, angleDeg: 0,
      labelW: 58, labelH: 44,
      crestW: 48, crestH: 34, crestOffsetY: 1,
      featherPx: 1.0, opacity: 0.88, mode: 'vertical'
    });

    // 2) Foreground tray Body Wash border: x = 688..760, y = 746..825 => interior cx = 724, cy = 785.5, w = 62, h = 68
    const washCrest = await loadSvgImage(svgs.bodywashWomen);
    repaintLabelAndDrawCrest(ctx, baseImg, washCrest, {
      cx: 724, cy: 785.5, angleDeg: 0,
      labelW: 62, labelH: 68,
      crestW: 62, crestH: 64, crestOffsetY: 1,
      featherPx: 1.5, opacity: 0.90, mode: 'vertical'
    });
  }).toString());

  await processImage('assets/images/his-hers-colorway.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, repaintLabelAndDrawCrest }) => {
    // Left Men's Jar: erase only the central text band (cx = 258, w = 178, h = 136) well inside the curved gold borders!
    const candleMen = await loadSvgImage(svgs.candleMen);
    repaintLabelAndDrawCrest(ctx, baseImg, candleMen, {
      cx: 258, cy: 538, angleDeg: 0,
      labelW: 178, labelH: 136,
      crestW: 168, crestH: 114, crestOffsetY: 4,
      featherPx: 1.0, opacity: 0.93, mode: 'vertical'
    });
    // Right Women's Jar: erase only the central text band (cx = 758, w = 176, h = 136) well inside the curved gold borders!
    const candleWomen = await loadSvgImage(svgs.candleWomen);
    repaintLabelAndDrawCrest(ctx, baseImg, candleWomen, {
      cx: 758, cy: 536, angleDeg: 0,
      labelW: 176, labelH: 136,
      crestW: 164, crestH: 112, crestOffsetY: 4,
      featherPx: 1.0, opacity: 0.91, mode: 'vertical'
    });
  }).toString());

  await processImage('assets/images/womens-candle-lineup.jpg', (async (ctx, baseImg, { svgs, loadSvgImage, repaintLabelAndDrawCrest }) => {
    const candleWomen = await loadSvgImage(svgs.candleWomen);
    // Left Jar: erase only central text band (w = 166, h = 128) well inside curved gold borders!
    repaintLabelAndDrawCrest(ctx, baseImg, candleWomen, {
      cx: 229, cy: 514, angleDeg: 0,
      labelW: 166, labelH: 128,
      crestW: 160, crestH: 110, crestOffsetY: 4,
      featherPx: 1.0, opacity: 0.91, mode: 'vertical'
    });
    // Center Jar: erase only central text band (w = 176, h = 134) well inside curved gold borders!
    repaintLabelAndDrawCrest(ctx, baseImg, candleWomen, {
      cx: 505, cy: 566, angleDeg: 0,
      labelW: 176, labelH: 134,
      crestW: 170, crestH: 116, crestOffsetY: 4,
      featherPx: 1.0, opacity: 0.91, mode: 'vertical'
    });
    // Right Jar: use horizontal mode inside the shaded cream label above the baby's breath flowers (y = 446..554)
    const candleWomenShadow = await loadSvgImage(svgs.candleWomenShadow);
    repaintLabelAndDrawCrest(ctx, baseImg, candleWomenShadow, {
      cx: 794.5, cy: 500, angleDeg: 0,
      labelW: 177, labelH: 108,
      crestW: 160, crestH: 108, crestOffsetY: 4,
      featherPx: 1.5, opacity: 0.94, mode: 'horizontal'
    });
  }).toString());

  await browser.close();
  console.log('Done updating all 22 images!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
