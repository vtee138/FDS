const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll down to footer to trigger lazy load
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 1000));
  const navLogo = await page.evaluate(() => {
    const img = document.querySelector('header img');
    if (!img) return null;
    return {
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight
    };
  });
  console.log('Navbar Logo Check:', navLogo);

  // 2. Check Footer Logo
  const footerLogo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;
    const img = footer.querySelector('img');
    if (!img) return null;
    return {
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight
    };
  });
  console.log('Footer Logo Check:', footerLogo);

  // 3. Overflow check
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log('Overflow 1440px:', overflow, 'px');

  // 4. Capture screenshots
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: 'evidence/background/navbar-authentic-logo.png' });
  }

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: 'evidence/background/footer-authentic-logo.png' });
  }

  console.log('Screenshots saved!');
  await browser.close();
})();
