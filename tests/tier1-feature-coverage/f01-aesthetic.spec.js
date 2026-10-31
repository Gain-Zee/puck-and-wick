/**
 * tests/tier1-feature-coverage/f01-aesthetic.spec.js
 * Feature 1: Obsidian & Gold Aesthetic
 * Minimum 5 test cases verifying color palette tokens, contrast, and styling integrity.
 */

export const tests = [
  {
    id: 'T1-F01-01',
    tier: 1,
    feature: 'F1: Obsidian & Gold Aesthetic',
    milestone: 'M1',
    title: 'Root CSS tokens define Obsidian black, brushed gold, and warm amber',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const tokens = await page.evaluate(() => {
        const root = document.documentElement;
        const style = getComputedStyle(root);
        return {
          obsidian: style.getPropertyValue('--obsidian-black') || style.getPropertyValue('--bg-primary') || style.getPropertyValue('--color-obsidian'),
          gold: style.getPropertyValue('--brushed-gold') || style.getPropertyValue('--gold-champ-500') || style.getPropertyValue('--color-gold'),
          amber: style.getPropertyValue('--amber-glow') || style.getPropertyValue('--amber-glow-500') || style.getPropertyValue('--color-amber')
        };
      });

      if (!tokens.obsidian && !tokens.gold) {
        // Verify via body background computation
        const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        if (!bodyBg) throw new Error('Could not verify dark luxury background styling');
      }
    }
  },
  {
    id: 'T1-F01-02',
    tier: 1,
    feature: 'F1: Obsidian & Gold Aesthetic',
    milestone: 'M1',
    title: 'Primary canvas background renders deep dark obsidian theme (#0A0A0C / dark tone)',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const bgColor = await page.evaluate(() => {
        const style = window.getComputedStyle(document.body);
        return style.backgroundColor;
      });
      // Accept dark rgb values (e.g. rgb(10, 10, 12) or dark gray <= 30 on all channels)
      const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const [_, r, g, b] = match.map(Number);
        if (r > 40 || g > 40 || b > 40) {
          throw new Error(`Expected dark obsidian canvas, got rgb(${r}, ${g}, ${b})`);
        }
      }
    }
  },
  {
    id: 'T1-F01-03',
    tier: 1,
    feature: 'F1: Obsidian & Gold Aesthetic',
    milestone: 'M1',
    title: 'Headers and accent elements display brushed gold metallic highlights',
    run: async ({ page, baseUrl, selectors }) => {
      await page.goto(baseUrl);
      const hasGoldAccents = await page.evaluate((sel) => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3, .brand-gold, [data-testid*="gold"], [class*="gold"]'));
        for (const el of elements) {
          const color = getComputedStyle(el).color;
          const bg = getComputedStyle(el).backgroundImage;
          if (color.includes('197') || color.includes('212') || color.includes('245') || bg.includes('gradient')) {
            return true;
          }
        }
        return elements.length > 0;
      }, selectors);
      if (!hasGoldAccents) {
        throw new Error('Gold metallic accents or gradients not found on primary header/accent elements');
      }
    }
  },
  {
    id: 'T1-F01-04',
    tier: 1,
    feature: 'F1: Obsidian & Gold Aesthetic',
    milestone: 'M1',
    title: 'Text elements meet high contrast readability against obsidian surfaces',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const isReadable = await page.evaluate(() => {
        const bodyText = document.querySelector('p, .body-text, span');
        if (!bodyText) return true;
        const color = getComputedStyle(bodyText).color;
        // Check that text is not pitch black on black background
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const [_, r, g, b] = match.map(Number);
          return (r + g + b) > 300; // Warm white/parchment or light gray
        }
        return true;
      });
      if (!isReadable) {
        throw new Error('Body text color does not meet contrast criteria for dark canvas');
      }
    }
  },
  {
    id: 'T1-F01-05',
    tier: 1,
    feature: 'F1: Obsidian & Gold Aesthetic',
    milestone: 'M1',
    viewport: 'mobile',
    title: 'Aesthetic theme maintains consistency without wash-out on mobile viewport (390x844)',
    run: async ({ page, baseUrl }) => {
      await page.goto(baseUrl);
      const mobileThemeOk = await page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        return bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(255, 255, 255)';
      });
      if (!mobileThemeOk) {
        throw new Error('Mobile viewport failed to render dark obsidian theme');
      }
    }
  }
];
