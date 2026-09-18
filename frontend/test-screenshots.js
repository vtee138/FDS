const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('Launching Edge for responsive, asset 200, and screenshot verification...');
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

  // Track all asset responses
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

  const viewports = [
    { name: '1440px Desktop', width: 1440, height: 900, screenshot: 'screenshot-desktop-1440.png', fullPage: true },
    { name: '1024px Tablet Landscape', width: 1024, height: 768 },
    { name: '768px Tablet Portrait', width: 768, height: 1024 },
    { name: '375px Mobile', width: 375, height: 812, screenshot: 'screenshot-mobile-375.png', fullPage: true },
    { name: '320px Small Mobile', width: 320, height: 568 }
  ];

  const results = [];
  const evidenceDir = path.join(__dirname, 'evidence');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Check horizontal overflow
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const bodyWidth = document.body.scrollWidth;
      return {
        hasOverflow: docWidth > winWidth,
        docWidth,
        winWidth,
        bodyWidth
      };
    });

    if (vp.screenshot) {
      const outPath = path.join(evidenceDir, vp.screenshot);
      await page.screenshot({ path: outPath, fullPage: vp.fullPage });
      console.log(`Saved screenshot: ${outPath}`);
    }

    results.push({
      viewport: vp.name,
      width: vp.width,
      overflow: overflow.hasOverflow ? `YES (doc: ${overflow.docWidth}px, win: ${overflow.winWidth}px)` : 'NO (Clean)'
    });
  }

  // Test mobile menu interaction at 375px
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const menuButton = await page.$('button[aria-controls="mobile-menu"]');
  let mobileMenuTested = false;
  if (menuButton) {
    const expandedBefore = await page.evaluate(el => el.getAttribute('aria-expanded'), menuButton);
    await menuButton.click();
    await new Promise(r => setTimeout(r, 300));
    const expandedAfter = await page.evaluate(el => el.getAttribute('aria-expanded'), menuButton);
    const menuVisible = (await page.$('#mobile-menu')) !== null;
    mobileMenuTested = expandedBefore === 'false' && expandedAfter === 'true' && menuVisible;
  }

  // Check section anchors exist on page
  const sectionIds = ['home', 'about', 'fields', 'activities', 'projects', 'achievements', 'community', 'journey', 'footer'];
  const anchorCheck = await page.evaluate((ids) => {
    return ids.map(id => ({ id, exists: !!document.getElementById(id) }));
  }, sectionIds);

  await browser.close();

  // Remove any legacy screenshots in public/fds if present
  const oldDesktop = path.join(__dirname, 'public', 'fds', 'screenshot-desktop-1440.png');
  const oldMobile = path.join(__dirname, 'public', 'fds', 'screenshot-mobile-375.png');
  if (fs.existsSync(oldDesktop)) fs.unlinkSync(oldDesktop);
  if (fs.existsSync(oldMobile)) fs.unlinkSync(oldMobile);

  const errors = consoleMessages.filter(m => m.type === 'error' || m.type === 'pageerror');
  const non200Assets = assetResponses.filter(a => a.status !== 200);

  console.log('\n================ VERIFICATION REPORT ================');
  console.log('1. Console Errors Count:', errors.length);
  if (errors.length > 0) console.log('Errors:', errors);
  console.log('2. Asset HTTP 200 Check: Total loaded:', assetResponses.length, '| Non-200 Count:', non200Assets.length);
  if (non200Assets.length > 0) console.log('Non-200 Assets:', non200Assets);
  console.log('3. Viewport Overflow Results:');
  console.table(results);
  console.log('4. Mobile Menu Accessible Toggle Passed:', mobileMenuTested);
  console.log('5. Section Anchors Verified:', anchorCheck.every(a => a.exists));
  console.log('=====================================================\n');
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

