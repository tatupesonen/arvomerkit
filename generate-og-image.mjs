import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imagePaths = [
  'public/images/rintalaatta/Kenraali.svg',
  'public/images/rintalaatta/Eversti.svg',
  'public/images/rintalaatta/Kapteeni.svg',
  'public/images/rintalaatta/Alikersantti.svg',
  'public/images/hihalaatta/Amiraali.svg',
  'public/images/hihalaatta/Aliluutnantti.svg',
];

const svgDataUrls = imagePaths.map(p => {
  const content = fs.readFileSync(path.join(__dirname, p), 'utf8');
  return 'data:image/svg+xml;base64,' + Buffer.from(content).toString('base64');
});

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: linear-gradient(135deg, #3d4321 0%, #2a2e17 60%, #1a1d0e 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #f0e8d0;
    overflow: hidden;
    position: relative;
  }
  .badge-row {
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 44px;
  }
  .badge {
    width: 110px;
    height: 110px;
    object-fit: contain;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.6));
  }
  h1 {
    font-size: 72px;
    font-weight: 700;
    letter-spacing: 2px;
    text-shadow: 0 2px 12px rgba(0,0,0,0.5);
    color: #f0e8d0;
  }
  p {
    font-size: 28px;
    color: #c8b878;
    margin-top: 16px;
    letter-spacing: 1px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="overlay"></div>
  <div class="badge-row">
    ${svgDataUrls.map(src => `<img class="badge" src="${src}" />`).join('\n    ')}
  </div>
  <h1>Arvomerkit</h1>
  <p>Opi Puolustusvoimien sotilasarvot</p>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(__dirname, 'public/og-image.png'),
    type: 'png',
  });
  await browser.close();
  console.log('OG-kuva luotu: public/og-image.png');
})();
