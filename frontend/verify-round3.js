const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('=== STARTING COMPREHENSIVE ROUND 3 VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    consoleMessages.push({ type: 'pageerror', text: err.toString() });
  });

  const assetResponses = [];
  page.on('response', response => {
    const url = response.url();
    if (url.includes('/fds/')) {
      assetResponses.push({
        url: url.replace('http://localhost:3000', ''),
        status: response.status()
      });
    }
  });

  const evidenceDir = path.join(__dirname, 'evidence');
  const compareDir = path.join(evidenceDir, 'compare');
  if (!fs.existsSync(compareDir)) {
    fs.mkdirSync(compareDir, { recursive: true });
  }

  // 1. Desktop 1440px Verification
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const desktopMetrics = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      devicePixelRatio: window.devicePixelRatio,
      bodyScrollWidth: document.body.scrollWidth
    };
  });
  console.log('Desktop 1440 Metrics:', desktopMetrics);

  // Take Full-page Desktop Screenshot
  const desktopShotPath = path.join(evidenceDir, 'screenshot-desktop-1440.png');
  await page.screenshot({ path: desktopShotPath, fullPage: true });
  console.log(`Saved full-page desktop screenshot to: ${desktopShotPath}`);

  // 2. Element Crops for Visual Review
  // Crop 1: Hero
  const heroEl = await page.$('#home');
  if (heroEl) {
    const heroCropPath = path.join(compareDir, 'hero-current.png');
    await heroEl.screenshot({ path: heroCropPath });
    console.log(`Saved hero crop to: ${heroCropPath}`);
  }

  // Crop 2: About
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    const aboutCropPath = path.join(compareDir, 'about-current.png');
    await aboutEl.screenshot({ path: aboutCropPath });
    console.log(`Saved about crop to: ${aboutCropPath}`);
  }

  // Crop 3: Activities
  const activitiesEl = await page.$('#activities');
  if (activitiesEl) {
    const activitiesCropPath = path.join(compareDir, 'activities-current.png');
    await activitiesEl.screenshot({ path: activitiesCropPath });
    console.log(`Saved activities crop to: ${activitiesCropPath}`);
  }

  // Crop 4: Footer
  const footerEl = await page.$('#footer');
  if (footerEl) {
    const footerCropPath = path.join(compareDir, 'footer-current.png');
    await footerEl.screenshot({ path: footerCropPath });
    console.log(`Saved footer crop to: ${footerCropPath}`);
  }

  // 3. Typography and Component Measurements
  const computedTypography = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const h1Style = h1 ? window.getComputedStyle(h1) : null;
    const h1Rect = h1 ? h1.getBoundingClientRect() : null;

    const nav = document.querySelector('header');
    const navRect = nav ? nav.getBoundingClientRect() : null;

    const wordmark = document.querySelector('header a img');
    const wordmarkRect = wordmark ? wordmark.getBoundingClientRect() : null;

    const aboutH2 = document.querySelector('#about h2');
    const aboutH2Style = aboutH2 ? window.getComputedStyle(aboutH2) : null;

    const sectionH2 = document.querySelector('#fields h2');
    const sectionH2Style = sectionH2 ? window.getComputedStyle(sectionH2) : null;

    const body = document.querySelector('body');
    const bodyStyle = body ? window.getComputedStyle(body) : null;

    const heroCopy = document.querySelector('[data-hero-copy]');
    const heroVisual = document.querySelector('[data-hero-visual]');
    const copyRect = heroCopy ? heroCopy.getBoundingClientRect() : null;
    const visualRect = heroVisual ? heroVisual.getBoundingClientRect() : null;

    const handImg = document.querySelector('[data-hero-visual] img[src*="hand-network"]');
    const handRect = handImg ? handImg.getBoundingClientRect() : null;

    const container = document.querySelector('#home > div');
    const containerRect = container ? container.getBoundingClientRect() : null;

    return {
      navbar: {
        height: navRect ? navRect.height : null,
        wordmarkWidth: wordmarkRect ? wordmarkRect.width : null,
        wordmarkHeight: wordmarkRect ? wordmarkRect.height : null
      },
      hero: {
        containerWidth: containerRect ? containerRect.width : null,
        containerHeight: containerRect ? containerRect.height : null,
        copyWidth: copyRect ? copyRect.width : null,
        copyRight: copyRect ? copyRect.right : null,
        visualWidth: visualRect ? visualRect.width : null,
        visualLeft: visualRect ? visualRect.left : null,
        gapX: (visualRect && copyRect) ? (visualRect.left - copyRect.right) : null,
        handWidth: handRect ? handRect.width : null,
        handHeight: handRect ? handRect.height : null
      },
      typography: {
        h1FontSize: h1Style ? h1Style.fontSize : null,
        h1LineHeight: h1Style ? h1Style.lineHeight : null,
        h1Width: h1Rect ? h1Rect.width : null,
        h1Height: h1Rect ? h1Rect.height : null,
        aboutH2FontSize: aboutH2Style ? aboutH2Style.fontSize : null,
        sectionH2FontSize: sectionH2Style ? sectionH2Style.fontSize : null,
        bodyFontSize: bodyStyle ? bodyStyle.fontSize : null
      }
    };
  });

  // 4. Test Decorative Protection (draggable, user-select, pointer-events)
  const decorativeAudit = await page.evaluate(() => {
    const handImg = document.querySelector('[data-hero-visual] img[src*="hand-network"]');
    const handDraggable = handImg ? handImg.getAttribute('draggable') : null;

    const decorativeEls = Array.from(document.querySelectorAll('.fds-decorative'));
    const nonCompliant = decorativeEls.filter(el => {
      const style = window.getComputedStyle(el);
      return style.pointerEvents !== 'none' || style.userSelect !== 'none';
    }).length;

    // Check selection when dragging
    let selectionCreated = false;
    const sel = window.getSelection();
    if (sel && sel.toString().length > 0) {
      selectionCreated = true;
    }

    return {
      handDraggable,
      totalDecorativeCount: decorativeEls.length,
      nonCompliantCount: nonCompliant,
      selectionCreated
    };
  });

  // 5. Test Overlap Across Viewports (1440, 1024, 768)
  const overlapResults = [];
  for (const w of [1440, 1024, 768]) {
    await page.setViewport({ width: w, height: 900 });
    await new Promise(r => setTimeout(r, 200));
    const overlap = await page.evaluate(() => {
      const copy = document.querySelector('[data-hero-copy]');
      const visual = document.querySelector('[data-hero-visual]');
      if (!copy || !visual) return { overlap: false, distance: 0 };
      const r1 = copy.getBoundingClientRect();
      const r2 = visual.getBoundingClientRect();
      const isOverlapping = !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
      return {
        isOverlapping,
        distanceX: r2.left - r1.right,
        r1: { left: r1.left, right: r1.right, top: r1.top, bottom: r1.bottom },
        r2: { left: r2.left, right: r2.right, top: r2.top, bottom: r2.bottom }
      };
    });
    overlapResults.push({ viewport: w, ...overlap });
  }

  // 6. Test Horizontal Overflow Across 5 Viewports
  const viewports = [
    { name: '1440px Desktop', width: 1440, height: 900 },
    { name: '1024px Tablet Landscape', width: 1024, height: 768 },
    { name: '768px Tablet Portrait', width: 768, height: 1024 },
    { name: '375px Mobile', width: 375, height: 812, screenshot: 'screenshot-mobile-375.png' },
    { name: '320px Small Mobile', width: 320, height: 568 }
  ];

  const overflowResults = [];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const overflow = await page.evaluate(() => {
      return {
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
        docWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth
      };
    });

    if (vp.screenshot) {
      const mobShotPath = path.join(evidenceDir, vp.screenshot);
      await page.screenshot({ path: mobShotPath, fullPage: true });
      console.log(`Saved full-page mobile screenshot to: ${mobShotPath}`);
    }

    overflowResults.push({
      name: vp.name,
      width: vp.width,
      overflow: overflow.hasOverflow ? `FAIL (${overflow.docWidth}px > ${overflow.winWidth}px)` : 'CLEAN'
    });
  }

  await browser.close();

  const errors = consoleMessages.filter(m => m.type === 'error' || m.type === 'pageerror');
  const non200Assets = assetResponses.filter(a => a.status !== 200 && a.status !== 304);

  const report = {
    desktopMetrics,
    computedTypography,
    decorativeAudit,
    overlapResults,
    overflowResults,
    consoleErrorsCount: errors.length,
    assetCount: assetResponses.length,
    non200AssetsCount: non200Assets.length
  };

  console.log('\n================ FULL VERIFICATION AUDIT DATA ================');
  console.log(JSON.stringify(report, null, 2));
  console.log('==============================================================\n');

  fs.writeFileSync(path.join(__dirname, 'verification-results.json'), JSON.stringify(report, null, 2));
}

main().catch(console.error);
