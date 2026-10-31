import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS, getProductGallerySlides } from '../js/data/products.js';
import { EXCLUSIVE_BOX_EDITIONS, EXTRA_BOX_GALLERY_SLIDES } from '../js/data/box-data.js';

const ROOT_DIR = process.cwd();
const SITE_ORIGIN = 'https://puckandwick.com';
const TODAY = '2026-10-31';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifySlideId(id = '') {
  return String(id).replace(/_/g, '-').toLowerCase();
}

// Build complete list of all SEO nodes (Products + Product Photo Slides + Exclusive Boxes + Box Photo Slides)
const seoNodes = [];

for (const product of PRODUCTS) {
  const slides = getProductGallerySlides(product, 1);
  const primarySlide = slides[0];
  const primaryImageRel = product.photo || (product.vesselType === 'ivory' ? 'assets/images/candle-ivory.jpg' : 'assets/images/candle-obsidian.jpg');

  // 1. Canonical Product Node (/p/<product.id>/)
  seoNodes.push({
    kind: 'product',
    urlPath: `/p/${product.id}`,
    fsDir: path.join(ROOT_DIR, 'p', product.id),
    productId: product.id,
    slideId: primarySlide.id,
    slideIndex: 0,
    title: `${product.name} (${product.formattedPrice}) | Puck & Wick™`,
    headline: product.name,
    subtitle: product.tagline,
    description: product.description,
    price: product.price,
    formattedPrice: product.formattedPrice,
    imageRel: primaryImageRel,
    imageUrl: `${SITE_ORIGIN}/${primaryImageRel}`,
    deepLinkQuery: `/?item=${encodeURIComponent(product.id)}`,
    product,
    allSlides: slides
  });

  // 2. Individual Photo Slide Nodes (/p/<product.id>/<slide-slug>/)
  slides.forEach((slide, idx) => {
    const slideSlug = slugifySlideId(slide.id);
    const imgRel = slide.src || slide.thumb || primaryImageRel;
    seoNodes.push({
      kind: 'product_slide',
      urlPath: `/p/${product.id}/${slideSlug}`,
      fsDir: path.join(ROOT_DIR, 'p', product.id, slideSlug),
      productId: product.id,
      slideId: slide.id,
      slideSlug,
      slideIndex: idx,
      shortLabel: slide.shortLabel,
      title: `${slide.title} | ${product.name} (${product.formattedPrice}) | Puck & Wick™`,
      headline: `${product.name} — ${slide.shortLabel}`,
      subtitle: slide.title,
      description: `${slide.title}. ${product.description}`,
      price: product.price,
      formattedPrice: product.formattedPrice,
      imageRel: imgRel,
      imageUrl: `${SITE_ORIGIN}/${imgRel}`,
      deepLinkQuery: `/?item=${encodeURIComponent(product.id)}&photo=${encodeURIComponent(slide.id)}`,
      product,
      allSlides: slides
    });
  });
}

// 3. Exclusive Gift Box Editions & Their Photo Slides
const boxEntries = [
  { key: 'men_athlete', slug: 'box-mens-athlete', config: EXCLUSIVE_BOX_EDITIONS.men_athlete },
  { key: 'women_luxe', slug: 'box-womens-sanctuary', config: EXCLUSIVE_BOX_EDITIONS.women_luxe }
];

for (const boxEntry of boxEntries) {
  const { key, slug, config } = boxEntry;
  const allBoxViews = [...(config.galleryViews || []), ...EXTRA_BOX_GALLERY_SLIDES];

  seoNodes.push({
    kind: 'box',
    urlPath: `/p/${slug}`,
    fsDir: path.join(ROOT_DIR, 'p', slug),
    boxKey: key,
    boxSlug: slug,
    viewId: 'open',
    title: `${config.title} ($${config.price.toFixed(0)} — $${config.compareAtValue.toFixed(0)} Value) | Puck & Wick™`,
    headline: config.title,
    subtitle: config.subtitle,
    description: config.description,
    price: config.price,
    formattedPrice: `$${config.price.toFixed(2)}`,
    imageRel: config.photo,
    imageUrl: `${SITE_ORIGIN}/${config.photo}`,
    deepLinkQuery: `/?box=${encodeURIComponent(key)}&view=open#exclusive-boxes`,
    allBoxViews
  });

  allBoxViews.forEach((view) => {
    const viewSlug = slugifySlideId(view.id);
    seoNodes.push({
      kind: 'box_slide',
      urlPath: `/p/${slug}/${viewSlug}`,
      fsDir: path.join(ROOT_DIR, 'p', slug, viewSlug),
      boxKey: key,
      boxSlug: slug,
      viewId: view.id,
      viewSlug,
      shortLabel: view.shortLabel,
      title: `${view.title} | ${config.title} ($${config.price.toFixed(0)}) | Puck & Wick™`,
      headline: `${config.title} — ${view.shortLabel}`,
      subtitle: view.title,
      description: `${view.description} ${config.description}`,
      price: config.price,
      formattedPrice: `$${config.price.toFixed(2)}`,
      imageRel: view.image,
      imageUrl: `${SITE_ORIGIN}/${view.image}`,
      deepLinkQuery: `/?box=${encodeURIComponent(key)}&view=${encodeURIComponent(view.id)}#exclusive-boxes`,
      allBoxViews
    });
  });
}

// Render static HTML page for each SEO node with full JSON-LD, OpenGraph, Spiderweb links, and instant interactive redirect/viewer
for (const node of seoNodes) {
  fs.mkdirSync(node.fsDir, { recursive: true });
  const canonicalUrl = `${SITE_ORIGIN}${node.urlPath}`;

  // Build related sibling photo links (spiderweb within item)
  let siblingLinksHtml = '';
  if (node.allSlides && node.product) {
    siblingLinksHtml = node.allSlides.map((s) => {
      const sSlug = slugifySlideId(s.id);
      const href = `${SITE_ORIGIN}/p/${node.productId}/${sSlug}`;
      const isCurrent = s.id === node.slideId && node.kind === 'product_slide';
      return `<a href="/p/${node.productId}/${sSlug}" class="spider-pill ${isCurrent ? 'active' : ''}">${escapeHtml(s.shortLabel)}: ${escapeHtml(s.title)}</a>`;
    }).join('\n          ');
  } else if (node.allBoxViews) {
    siblingLinksHtml = node.allBoxViews.map((v) => {
      const vSlug = slugifySlideId(v.id);
      const isCurrent = v.id === node.viewId && node.kind === 'box_slide';
      return `<a href="/p/${node.boxSlug}/${vSlug}" class="spider-pill ${isCurrent ? 'active' : ''}">${escapeHtml(v.shortLabel)}: ${escapeHtml(v.title)}</a>`;
    }).join('\n          ');
  }

  // Build cross-catalog spiderweb links
  const catalogLinksHtml = PRODUCTS.map((p) => {
    const pSlides = getProductGallerySlides(p, 1);
    const subLinks = pSlides.map((s) => `<a href="/p/${p.id}/${slugifySlideId(s.id)}">${escapeHtml(s.shortLabel)}</a>`).join(' • ');
    return `<li><strong><a href="/p/${p.id}">${escapeHtml(p.name)} (${escapeHtml(p.formattedPrice)})</a></strong> — ${subLinks}</li>`;
  }).join('\n          ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        name: node.headline,
        description: node.description,
        image: [node.imageUrl],
        sku: node.productId || node.boxSlug,
        brand: {
          '@type': 'Brand',
          name: 'Puck & Wick™'
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'USD',
          price: node.price.toFixed(2),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Puck & Wick™ — Purcellville, Loudoun County, VA'
          }
        }
      },
      {
        '@type': 'ImageObject',
        '@id': `${canonicalUrl}#image`,
        contentUrl: node.imageUrl,
        url: canonicalUrl,
        name: node.title,
        caption: node.description,
        creditText: 'Puck & Wick™ Studio — Purcellville, Virginia',
        creator: {
          '@type': 'Organization',
          name: 'Puck & Wick™'
        },
        copyrightNotice: '© 2026 Puck & Wick™. All rights reserved.',
        acquireLicensePage: `${SITE_ORIGIN}/`
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Puck & Wick™ Storefront',
            item: `${SITE_ORIGIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: node.product ? node.product.name : node.headline,
            item: `${SITE_ORIGIN}/p/${node.productId || node.boxSlug}`
          },
          ...(node.kind.endsWith('_slide') ? [{
            '@type': 'ListItem',
            position: 3,
            name: node.shortLabel || node.subtitle,
            item: canonicalUrl
          }] : [])
        ]
      }
    ]
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(node.title)}</title>
  <meta name="description" content="${escapeHtml(node.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" type="image/png" sizes="512x512" href="/assets/images/logo-pfp.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/logo-pfp.png">

  <!-- Open Graph / iMessage / SMS / WhatsApp / Instagram / Facebook Rich Preview -->
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Puck &amp; Wick&trade;">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(node.title)}">
  <meta property="og:description" content="${escapeHtml(node.description)}">
  <meta property="og:image" content="${node.imageUrl}">
  <meta property="og:image:secure_url" content="${node.imageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(node.subtitle)}">
  <meta property="product:price:amount" content="${node.price.toFixed(2)}">
  <meta property="product:price:currency" content="USD">

  <!-- Twitter / X / Discord / Slack Large Image Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(node.title)}">
  <meta name="twitter:description" content="${escapeHtml(node.description)}">
  <meta name="twitter:image" content="${node.imageUrl}">

  <!-- Google Structured Data: Product + ImageObject + Breadcrumb Spiderweb -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    :root {
      color-scheme: dark;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #08090C;
      color: #FAF5E8;
      line-height: 1.6;
    }
    .seo-shell {
      max-width: 1080px;
      margin: 0 auto;
      padding: 28px 20px 64px;
    }
    .seo-topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(197, 160, 89, 0.25);
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .seo-brand {
      color: #E5C878;
      text-decoration: none;
      font-weight: 700;
      letter-spacing: 0.18em;
      font-size: 0.95rem;
    }
    .seo-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #E5C878 0%, #B69146 100%);
      color: #08090C;
      font-weight: 800;
      text-decoration: none;
      padding: 11px 20px;
      border-radius: 999px;
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .seo-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 32px;
      align-items: start;
      background: #101218;
      border: 1px solid rgba(197, 160, 89, 0.35);
      border-radius: 16px;
      padding: 24px;
    }
    @media (max-width: 780px) {
      .seo-hero { grid-template-columns: 1fr; }
    }
    .seo-img-wrap {
      background: #08090C;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(197, 160, 89, 0.28);
    }
    .seo-img-wrap img {
      width: 100%;
      height: auto;
      display: block;
    }
    .seo-kicker {
      color: #C5A059;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 1.85rem;
      margin: 0 0 8px;
      color: #FAF5E8;
    }
    .seo-sub {
      color: #D1D5DB;
      font-size: 1rem;
      margin-bottom: 16px;
    }
    .seo-price {
      font-size: 1.6rem;
      font-weight: 800;
      color: #E5C878;
      margin-bottom: 16px;
    }
    .spider-group {
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .spider-group h2, .spider-directory h2 {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #C5A059;
      margin: 0 0 12px;
    }
    .spider-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .spider-pill {
      display: inline-block;
      padding: 7px 12px;
      border-radius: 8px;
      border: 1px solid rgba(197, 160, 89, 0.35);
      color: #FAF5E8;
      text-decoration: none;
      font-size: 0.8rem;
      background: rgba(197, 160, 89, 0.08);
    }
    .spider-pill.active, .spider-pill:hover {
      background: rgba(197, 160, 89, 0.28);
      border-color: #E5C878;
    }
    .spider-directory {
      margin-top: 36px;
      padding: 24px;
      background: #0D0F14;
      border: 1px solid rgba(197, 160, 89, 0.22);
      border-radius: 14px;
    }
    .spider-directory ul {
      margin: 0;
      padding-left: 18px;
      display: grid;
      gap: 8px;
      font-size: 0.88rem;
    }
    .spider-directory a {
      color: #E5C878;
      text-decoration: none;
    }
    .spider-directory a:hover {
      text-decoration: underline;
    }
  </style>
  <script>
    // Automatically open the interactive storefront modal/view for human visitors while keeping full static HTML for Googlebot & social preview crawlers
    (function() {
      var ua = (navigator.userAgent || '').toLowerCase();
      var isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|twitterbot|slackbot|discordbot|linkedinbot|pinterest|applebot|preview/i.test(ua);
      var params = new URLSearchParams(window.location.search);
      if (!isBot && params.get('static') !== '1') {
        window.location.replace(${JSON.stringify(node.deepLinkQuery)});
      }
    })();
  </script>
</head>
<body>
  <main class="seo-shell">
    <header class="seo-topbar">
      <a href="/" class="seo-brand">PUCK &amp; WICK&trade; • LOUDOUN COUNTY, VA</a>
      <a href="${escapeHtml(node.deepLinkQuery)}" class="seo-cta">Open Interactive View &amp; Full Catalog &rarr;</a>
    </header>

    <article class="seo-hero" itemscope itemtype="https://schema.org/Product">
      <div class="seo-img-wrap">
        <img src="/${escapeHtml(node.imageRel)}" alt="${escapeHtml(node.subtitle)}" itemprop="image" />
      </div>
      <div>
        <div class="seo-kicker">QC #1 Certified • Small-Batch Virginia Craft</div>
        <h1 itemprop="name">${escapeHtml(node.headline)}</h1>
        <div class="seo-sub">${escapeHtml(node.subtitle)}</div>
        <div class="seo-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <meta itemprop="priceCurrency" content="USD" />
          <span itemprop="price" content="${node.price.toFixed(2)}">${escapeHtml(node.formattedPrice)}</span>
          <link itemprop="availability" href="https://schema.org/InStock" />
        </div>
        <p itemprop="description">${escapeHtml(node.description)}</p>
        <p>
          <a href="${escapeHtml(node.deepLinkQuery)}" class="seo-cta">Inspect in Interactive Storefront &amp; Add to Cart &rarr;</a>
        </p>

        <div class="spider-group">
          <h2>All Photo Angles &amp; Views for This Item</h2>
          <div class="spider-pills">
          ${siblingLinksHtml}
          </div>
        </div>
      </div>
    </article>

    <nav class="spider-directory" aria-label="Complete Puck & Wick Product & Photo Spiderweb Index">
      <h2>Complete Puck &amp; Wick&trade; Product &amp; Photo Index</h2>
      <ul>
          <li><strong><a href="/p/box-mens-athlete">Men's / Athlete Exclusive Box ($98.00)</a></strong> — <a href="/p/box-mens-athlete/open">Open Box</a> • <a href="/p/box-mens-athlete/closed">Box Closed</a> • <a href="/p/box-mens-athlete/items-out">3 Items</a> • <a href="/p/box-mens-athlete/usecase">In Action</a></li>
          <li><strong><a href="/p/box-womens-sanctuary">Women's Sanctuary Exclusive Box ($98.00)</a></strong> — <a href="/p/box-womens-sanctuary/open">Open Box</a> • <a href="/p/box-womens-sanctuary/closed">Box Closed</a> • <a href="/p/box-womens-sanctuary/items-out">3 Items</a> • <a href="/p/box-womens-sanctuary/usecase">In Action</a></li>
          ${catalogLinksHtml}
      </ul>
    </nav>
  </main>
</body>
</html>`;

  fs.writeFileSync(path.join(node.fsDir, 'index.html'), html, 'utf8');
}

// Generate Google Image + Page Sitemap (sitemap.xml)
const sitemapEntries = [
  `  <url>
    <loc>${SITE_ORIGIN}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_ORIGIN}/assets/images/box-men-open.jpg</image:loc>
      <image:title>Puck &amp; Wick™ Men's Athlete Exclusive Gift Box ($98)</image:title>
      <image:caption>10 oz Matte Obsidian Soy Candle, 3.0" Lauson-98™ Gear Puck, and 8 oz Charcoal Body Wash — Handcrafted in Purcellville, VA</image:caption>
      <image:geo_location>Purcellville, Virginia, USA</image:geo_location>
    </image:image>
    <image:image>
      <image:loc>${SITE_ORIGIN}/assets/images/box-women-open.jpg</image:loc>
      <image:title>Puck &amp; Wick™ Women's Sanctuary Exclusive Gift Box ($98)</image:title>
      <image:caption>10 oz Frosted Ivory Soy Candle, 3.0" White Sanctuary Puck, and 4 oz Botanical Linen Mist — Purcellville, VA</image:caption>
      <image:geo_location>Purcellville, Virginia, USA</image:geo_location>
    </image:image>
  </url>`
];

for (const node of seoNodes) {
  const priority = node.kind === 'product' || node.kind === 'box' ? '0.9' : '0.8';
  sitemapEntries.push(`  <url>
    <loc>${SITE_ORIGIN}${node.urlPath}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${escapeHtml(node.imageUrl)}</image:loc>
      <image:title>${escapeHtml(node.title)}</image:title>
      <image:caption>${escapeHtml(node.description)}</image:caption>
      <image:geo_location>Purcellville, Virginia, USA</image:geo_location>
    </image:image>
  </url>`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Generated ${seoNodes.length} static SEO pages under /p/, plus sitemap.xml and robots.txt!`);
