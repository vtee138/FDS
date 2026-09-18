const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const bgDir = path.join(__dirname, 'evidence', 'background');
  if (!fs.existsSync(bgDir)) {
    fs.mkdirSync(bgDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Verify Hero Eyebrow
  const eyebrowData = await page.evaluate(() => {
    const el = document.querySelector('[data-hero-copy] p:first-child');
    if (!el) return null;
    const style = window.getComputedStyle(el);
    return {
      text: el.innerText.trim(),
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      color: style.color,
      textTransform: style.textTransform
    };
  });
  console.log('--- Hero Eyebrow Verification ---');
  console.log(JSON.stringify(eyebrowData, null, 2));

  // 2. Verify Container Width
  const containerData = await page.evaluate(() => {
    const heroContainer = document.querySelector('#home > div');
    const fieldsContainer = document.querySelector('#fields > div');
    const styleH = heroContainer ? window.getComputedStyle(heroContainer) : null;
    const styleF = fieldsContainer ? window.getComputedStyle(fieldsContainer) : null;
    return {
      heroMaxWidth: styleH ? styleH.maxWidth : null,
      heroComputedWidth: heroContainer ? heroContainer.getBoundingClientRect().width : null,
      fieldsMaxWidth: styleF ? styleF.maxWidth : null,
      fieldsComputedWidth: fieldsContainer ? fieldsContainer.getBoundingClientRect().width : null,
      viewportWidth: window.innerWidth
    };
  });
  console.log('\n--- Container Geometry Verification ---');
  console.log(JSON.stringify(containerData, null, 2));

  // 3. Verify Background & Section Classes
  const sectionBgData = await page.evaluate(() => {
    const pageEl = document.querySelector('.fds-page');
    const pageStyle = pageEl ? window.getComputedStyle(pageEl) : null;

    const sections = ['home', 'about', 'fields', 'activities', 'projects', 'achievements', 'community', 'journey'];
    const results = {};
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const cs = window.getComputedStyle(el);
        results[id] = {
          className: el.className,
          backgroundImage: cs.backgroundImage.substring(0, 80) + '...',
          borderTop: cs.borderTop
        };
      }
    }
    return {
      pageBgColor: pageStyle ? pageStyle.backgroundColor : null,
      sections: results
    };
  });
  console.log('\n--- Section Tonal Classes ---');
  console.log(JSON.stringify(sectionBgData, null, 2));

  // 4. Verify Card Styling
  const cardData = await page.evaluate(() => {
    const card = document.querySelector('.fds-card');
    if (!card) return null;
    const cs = window.getComputedStyle(card);
    return {
      background: cs.backgroundColor,
      border: cs.border,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius
    };
  });
  console.log('\n--- fds-card Computed Style ---');
  console.log(JSON.stringify(cardData, null, 2));

  // 5. Verify Pattern Opacity
  const patternOpacities = await page.evaluate(() => {
    const queries = {
      heroHexRings: '#home [aria-hidden="true"]:nth-child(1)',
      heroTechnicalFrame: '[data-hero-visual] > div:first-child img',
      aboutHexFragment: '#about [aria-hidden="true"]:nth-child(1)',
      aboutConnector: '#about .hidden.sm\\:block',
      aboutNotePaper: '[data-about-paper-note] img',
      fieldsHeadingHex: '#fields .hidden.md\\:flex img',
      activitiesMicroNode: '#activities [aria-hidden="true"]:nth-child(1)',
      achievementsHex: '#achievements [aria-hidden="true"]:nth-child(1)',
      communityHexChain: '#community [aria-hidden="true"]:nth-child(1)',
      journeyCornerHex: '#journey [aria-hidden="true"]:nth-child(1)'
    };
    const out = {};
    for (const [k, q] of Object.entries(queries)) {
      const el = document.querySelector(q);
      out[k] = el ? window.getComputedStyle(el).opacity : 'NOT FOUND';
    }
    return out;
  });
  console.log('\n--- Pattern Opacities ---');
  console.log(JSON.stringify(patternOpacities, null, 2));

  // 6. Check Collisions (Round 3.1 regression check)
  const collisions = await page.evaluate(() => {
    const heroNote = document.querySelector('[data-hero-note]');
    const heroImpact = document.querySelector('[data-hero-impact-label]');
    let heroDist = null;
    if (heroNote && heroImpact) {
      const rN = heroNote.getBoundingClientRect();
      const rI = heroImpact.getBoundingClientRect();
      const dx = Math.max(0, Math.max(rI.left - rN.right, rN.left - rI.right));
      const dy = Math.max(0, Math.max(rI.top - rN.bottom, rN.top - rI.bottom));
      heroDist = Math.hypot(dx, dy);
    }

    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    return {
      heroNoteToImpactDistance: heroDist,
      horizontalOverflow: overflow
    };
  });
  console.log('\n--- Collisions & Overflow ---');
  console.log(JSON.stringify(collisions, null, 2));

  // 7. Screenshots
  // Hero section screenshot
  const heroEl = await page.$('#home');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(bgDir, 'hero-paper.png') });
    console.log('Saved evidence/background/hero-paper.png');
  }

  // Fields section screenshot
  const fieldsEl = await page.$('#fields');
  if (fieldsEl) {
    await fieldsEl.screenshot({ path: path.join(bgDir, 'fields-cards.png') });
    console.log('Saved evidence/background/fields-cards.png');
  }

  // Activities section screenshot
  const activitiesEl = await page.$('#activities');
  if (activitiesEl) {
    await activitiesEl.screenshot({ path: path.join(bgDir, 'activities-paper.png') });
    console.log('Saved evidence/background/activities-paper.png');
  }

  // Full page screenshot at 1440px
  await page.screenshot({ path: path.join(bgDir, 'fullpage-1440.png'), fullPage: true });
  console.log('Saved evidence/background/fullpage-1440.png');

  await browser.close();
  console.log('\nVerification completed successfully!');
})();
