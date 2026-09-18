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

  // 1. Check background image and opacity on .fds-page::before
  const bgCheck = await page.evaluate(() => {
    const pageEl = document.querySelector('.fds-page');
    const beforeStyle = window.getComputedStyle(pageEl, '::before');
    const pageStyle = window.getComputedStyle(pageEl);
    return {
      bgColor: pageStyle.backgroundColor,
      bgImage: beforeStyle.backgroundImage,
      opacity: beforeStyle.opacity,
      repeat: beforeStyle.backgroundRepeat,
      size: beforeStyle.backgroundSize
    };
  });
  console.log('Background Check:', bgCheck);

  // 2. Check container width on sections
  const containerCheck = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('.max-w-\\[1240px\\]'));
    return {
      count: containers.length,
      firstMaxWidth: window.getComputedStyle(containers[0]).maxWidth,
      firstClientWidth: containers[0].clientWidth
    };
  });
  console.log('Container check:', containerCheck);

  // 3. Check cards background opacity
  const cardCheck = await page.evaluate(() => {
    const card = document.querySelector('.fds-card');
    if (!card) return null;
    const style = window.getComputedStyle(card);
    return {
      bg: style.backgroundColor,
      boxShadow: style.boxShadow,
      borderRadius: style.borderRadius
    };
  });
  console.log('Card Check:', cardCheck);

  // 4. Check overflow on 1440
  const overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log('Overflow 1440:', overflow1440, 'px');

  // Ensure evidence/background dir exists
  if (!fs.existsSync('evidence/background')) {
    fs.mkdirSync('evidence/background', { recursive: true });
  }

  // 5. Screenshots
  const heroEl = await page.$('#home');
  if (heroEl) {
    await heroEl.screenshot({ path: 'evidence/background/hero-editorial-v2.png' });
  }

  const fieldsEl = await page.$('#fields');
  if (fieldsEl) {
    await fieldsEl.screenshot({ path: 'evidence/background/fields-editorial-v2.png' });
  }

  const activitiesEl = await page.$('#activities');
  if (activitiesEl) {
    await activitiesEl.screenshot({ path: 'evidence/background/activities-editorial-v2.png' });
  }

  const footerEl = await page.$('#footer');
  if (footerEl) {
    await footerEl.screenshot({ path: 'evidence/background/footer-editorial-v2.png' });
  }

  await page.screenshot({ path: 'evidence/background/fullpage-1440-v2.png', fullPage: true });

  console.log('Screenshots saved successfully!');
  await browser.close();
})();
