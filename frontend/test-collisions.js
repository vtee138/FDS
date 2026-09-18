const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function intersects(r1, r2) {
  return !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
}

function distance(r1, r2) {
  const dx = Math.max(0, Math.max(r1.left - r2.right, r2.left - r1.right));
  const dy = Math.max(0, Math.max(r1.top - r2.bottom, r2.top - r1.bottom));
  return Math.hypot(dx, dy);
}

function isInside(inner, outer, margin = 4) {
  return (
    inner.left >= outer.left - margin &&
    inner.right <= outer.right + margin &&
    inner.top >= outer.top - margin &&
    inner.bottom <= outer.bottom + margin
  );
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  fs.mkdirSync('evidence/compare', { recursive: true });

  // 1. Evaluate Bounding Rectangles
  const data = await page.evaluate(() => {
    function getRect(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: Math.round(r.left),
        top: Math.round(r.top + window.scrollY),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    }

    function getAllRects(sel) {
      return Array.from(document.querySelectorAll(sel)).map(el => {
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left),
          top: Math.round(r.top + window.scrollY),
          right: Math.round(r.right),
          bottom: Math.round(r.bottom + window.scrollY),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      });
    }

    return {
      heroHand: getRect('[data-hero-hand]'),
      heroNote: getRect('[data-hero-note]'),
      heroImpact: getRect('[data-hero-impact-label]'),
      aboutMedia: getRect('[data-about-media]'),
      aboutHandwriting: getRect('[data-about-handwriting]'),
      aboutPaperNote: getRect('[data-about-paper-note]'),
      aboutPaperText: getRect('[data-about-paper-text]'),
      activitiesCollage: getRect('[data-activities-collage]'),
      activitiesListNote: getRect('[data-activities-list-note]'),
      activitiesCommunityNote: getRect('[data-activities-community-note]'),
      activitiesTogetherNote: getRect('[data-activities-together-note]'),
      activityFrames: getAllRects('[data-activity-frame]'),
      activityFrameContents: getAllRects('[data-activity-frame-content]'),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    };
  });

  console.log('--- BOUNDING RECTANGLES ---');
  console.log(JSON.stringify(data, null, 2));

  // Run checks
  const results = {};

  // Check 1: Hero note does not intersect impact label & distance >= 12px
  if (data.heroNote && data.heroImpact) {
    const coll = intersects(data.heroNote, data.heroImpact);
    const dist = distance(data.heroNote, data.heroImpact);
    results.heroNoteImpactCollision = {
      collides: coll,
      distance: dist,
      pass: !coll && dist >= 12
    };
  }

  // Check 2: Hero note not deep inside hand silhouette
  if (data.heroNote && data.heroHand) {
    const noteCenterX = data.heroNote.left + data.heroNote.width / 2;
    const handRight = data.heroHand.right;
    const isOutsideOrFlank = noteCenterX >= handRight - (data.heroHand.width * 0.35);
    results.heroNoteHandSilhouette = {
      noteCenterX,
      handRight,
      isOutsideOrFlank,
      pass: isOutsideOrFlank
    };
  }

  // Check 3: About handwriting does not intersect paper note text
  if (data.aboutHandwriting && data.aboutPaperText) {
    const coll = intersects(data.aboutHandwriting, data.aboutPaperText);
    const dist = distance(data.aboutHandwriting, data.aboutPaperText);
    results.aboutHandwritingPaperTextCollision = {
      collides: coll,
      distance: dist,
      pass: !coll
    };
  }

  // Check 4: Paper note text is inside paper note wrapper
  if (data.aboutPaperText && data.aboutPaperNote) {
    const inside = isInside(data.aboutPaperText, data.aboutPaperNote, 5);
    results.aboutPaperTextContained = {
      isInside: inside,
      pass: inside
    };
  }

  // Check 5: Activities handwriting does not intersect .activity-frame-content
  const actNotes = [
    { name: 'activitiesListNote', rect: data.activitiesListNote },
    { name: 'activitiesCommunityNote', rect: data.activitiesCommunityNote },
    { name: 'activitiesTogetherNote', rect: data.activitiesTogetherNote }
  ];

  results.activitiesHandwritingFrameCollisions = [];
  let allActPass = true;
  for (const n of actNotes) {
    if (!n.rect) continue;
    data.activityFrameContents.forEach((cRect, idx) => {
      const coll = intersects(n.rect, cRect);
      if (coll) allActPass = false;
      results.activitiesHandwritingFrameCollisions.push({
        note: n.name,
        frameContentIndex: idx,
        collides: coll
      });
    });
  }
  results.activitiesHandwritingPass = allActPass;

  // Check 6: Horizontal overflow
  results.desktopOverflowPass = data.scrollWidth <= data.innerWidth;

  console.log('--- TEST RESULTS ---');
  console.log(JSON.stringify(results, null, 2));

  // Screenshots
  // 1. Desktop full
  await page.screenshot({ path: 'evidence/screenshot-desktop-1440.png', fullPage: true });

  // 2. High-res Crops
  const heroEl = await page.$('#home');
  if (heroEl) {
    await heroEl.screenshot({ path: 'evidence/compare/hero-current.png' });
  }

  const aboutEl = await page.$('#about');
  if (aboutEl) {
    await aboutEl.screenshot({ path: 'evidence/compare/about-current.png' });
  }

  const actEl = await page.$('#activities');
  if (actEl) {
    await actEl.screenshot({ path: 'evidence/compare/activities-current.png' });
  }

  // Mobile 375
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  
  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('Mobile 375 scrollWidth:', mobileScrollWidth);
  results.mobileOverflowPass = mobileScrollWidth <= 375;

  await page.screenshot({ path: 'evidence/screenshot-mobile-375.png', fullPage: true });

  fs.writeFileSync('evidence/collision-results.json', JSON.stringify({ data, results }, null, 2));

  await browser.close();
  console.log('All tests and screenshots completed successfully!');
}

run();
