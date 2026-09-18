const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  const round4Dir = path.join(__dirname, 'evidence', 'round4');
  if (!fs.existsSync(round4Dir)) {
    fs.mkdirSync(round4Dir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Track network
  const failedRequests = [];
  const networkAssets = [];
  page.on('response', response => {
    const url = response.url();
    const status = response.status();
    if (url.includes('/fds/') || url.includes('fonts.gstatic.com') || url.includes('/_next/static/media/')) {
      networkAssets.push({ url, status });
      if (status >= 400) {
        failedRequests.push({ url, status });
      }
    }
  });

  // Track console
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // Load Desktop 1440
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Audit Computed Typography for 7 required elements per TYPOGRAPHY.md
  const typographyAudit = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        text: el.innerText.substring(0, 40).replace(/\n/g, ' '),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        fontStyle: s.fontStyle,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color
      };
    };

    return {
      heroInsights: getStyles(document.querySelector('.fds-hero-title span')),
      heroInOurEyes: getStyles(document.querySelector('.fds-hero-title em')),
      sectionTitle: getStyles(document.querySelector('#about .fds-section-title') || document.querySelector('.fds-section-title')),
      cardTitle: getStyles(document.querySelector('.fds-card-title')),
      bodyParagraph: getStyles(document.querySelector('#about .fds-body') || document.querySelector('.fds-body')),
      eyebrow: getStyles(document.querySelector('.fds-eyebrow')),
      footerLink: getStyles(document.querySelector('#footer a'))
    };
  });

  // 2. Audit Logos: intrinsic & rendered size, opacity, filter
  const logoAudit = await page.evaluate(() => {
    const navLogo = document.querySelector('header img[src*="brand"]') || document.querySelector('header img');
    const footerLogo = document.querySelector('#footer img[src*="brand"]') || document.querySelector('#footer img[alt*="FDS"]');
    
    const getLogoInfo = (img) => {
      if (!img) return null;
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      return {
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
        opacity: style.opacity,
        filter: style.filter,
        userSelect: style.userSelect,
        objectFit: style.objectFit
      };
    };

    return {
      navbarDesktop: getLogoInfo(navLogo),
      footerDesktop: getLogoInfo(footerLogo)
    };
  });

  // Round 4.3 Runtime Audit: Opaque Overlay Navbar
  const round43NavbarAudit = await page.evaluate(() => {
    const nav = document.querySelector(".fds-navbar");
    const style = window.getComputedStyle(nav);
    return {
      position: style.position,
      top: style.top,
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
      zIndex: style.zIndex
    };
  });

  // Round 4.3 Panel Pattern Audit
  const panelPatternAudit = await page.evaluate(() => {
    const panelIds = ['about', 'activities', 'achievements', 'journey'];
    return panelIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, exists: false };
      const patterns = Array.from(el.querySelectorAll('.fds-panel-pattern')).map(img => {
        const s = window.getComputedStyle(img);
        const rect = img.getBoundingClientRect();
        return {
          src: img.src.split('/fds/')[1] ? '/fds/' + img.src.split('/fds/')[1] : img.src,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          opacity: s.opacity,
          zIndex: s.zIndex,
          pointerEvents: s.pointerEvents,
          ariaHidden: img.getAttribute('aria-hidden')
        };
      });
      return {
        id,
        patternCount: patterns.length,
        patterns
      };
    });
  });

  // Round 4.2 Runtime Audit (Legacy preservation)
  const round42Audit = await page.evaluate(() => {
    const nav = document.querySelector(".fds-navbar");
    const hero = document.querySelector("#home");
    const about = document.querySelector("#about");
    const fields = document.querySelector("#fields");

    const navStyle = window.getComputedStyle(nav);
    const heroStyle = window.getComputedStyle(hero);
    const aboutStyle = window.getComputedStyle(about);
    const fieldsStyle = window.getComputedStyle(fields);

    return {
      navbarPosition: navStyle.position,
      navbarTop: navStyle.top,
      navbarBackground: navStyle.backgroundColor,

      heroBackground: heroStyle.backgroundColor,
      aboutBackground: aboutStyle.backgroundColor,
      fieldsBackground: fieldsStyle.backgroundColor,

      navbarRectTop: Math.round(nav.getBoundingClientRect().top),
      heroRectTop: Math.round(hero.getBoundingClientRect().top)
    };
  });

  // 3. Audit Section Backgrounds and Patterns
  const sectionAudit = await page.evaluate(() => {
    const sectionIds = ['home', 'about', 'fields', 'activities', 'projects', 'achievements', 'community', 'journey', 'footer'];
    return sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, exists: false };
      const s = window.getComputedStyle(el);
      
      const isPaper = el.classList.contains('fds-section--paper');
      const isPanel = el.classList.contains('fds-section--panel');
      
      // Look for decorative images inside section
      const decImgs = Array.from(el.querySelectorAll('img')).filter(img => {
        const src = img.src || '';
        return src.includes('/decorations/') || src.includes('/lettering/');
      }).map(img => {
        const cs = window.getComputedStyle(img);
        const parent = img.parentElement;
        const ps = parent ? window.getComputedStyle(parent) : null;
        const rect = img.getBoundingClientRect();
        return {
          src: img.src.split('/fds/')[1] ? '/fds/' + img.src.split('/fds/')[1] : img.src,
          imgOpacity: cs.opacity,
          parentOpacity: ps ? ps.opacity : '1',
          mixBlendMode: cs.mixBlendMode !== 'normal' ? cs.mixBlendMode : (ps ? ps.mixBlendMode : 'normal'),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      });

      return {
        id,
        bgClass: isPaper ? 'fds-section--paper' : (isPanel ? 'fds-section--panel' : el.className),
        backgroundColor: s.backgroundColor,
        patterns: decImgs
      };
    });
  });

  // 4. Audit Tapes and Photo Frames
  const photoFrameAudit = await page.evaluate(() => {
    // About polaroid
    const aboutPhoto = document.querySelector('[data-about-media]');
    const aboutTape = document.querySelector('#about img[src*="tape"]');
    
    // Activities collage
    const frames = Array.from(document.querySelectorAll('[data-activity-frame]'));
    const activitiesTapes = Array.from(document.querySelectorAll('#activities img[src*="tape"]')).map(img => {
      const parent = img.parentElement;
      return {
        src: img.src.split('/fds/')[1] ? '/fds/' + img.src.split('/fds/')[1] : img.src,
        parentTransform: parent ? window.getComputedStyle(parent).transform : null
      };
    });

    return {
      aboutPhotoFound: !!aboutPhoto,
      aboutTape: aboutTape ? (aboutTape.src.split('/fds/')[1] ? '/fds/' + aboutTape.src.split('/fds/')[1] : aboutTape.src) : null,
      activityFramesCount: frames.length,
      activityTapesCount: activitiesTapes.length,
      activitiesTapes
    };
  });

  // 5. Check Viewports for Horizontal Overflow
  const viewports = [320, 375, 768, 1024, 1440, 1920];
  const overflowResults = [];

  for (const width of viewports) {
    await page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 200));
    
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      return {
        scrollWidth: Math.max(docWidth, bodyWidth),
        clientWidth,
        hasOverflow: Math.max(docWidth, bodyWidth) > clientWidth + 1
      };
    });

    // Check mobile logo and panel patterns at 375
    let mobileLogo = null;
    let mobilePanelPatterns = null;
    if (width === 375) {
      mobileLogo = await page.evaluate(() => {
        const img = document.querySelector('header img');
        if (!img) return null;
        const rect = img.getBoundingClientRect();
        return {
          renderedWidth: Math.round(rect.width),
          renderedHeight: Math.round(rect.height)
        };
      });

      mobilePanelPatterns = await page.evaluate(() => {
        const panelIds = ['about', 'activities', 'achievements', 'journey'];
        return panelIds.map(id => {
          const el = document.getElementById(id);
          if (!el) return null;
          const p = el.querySelector('.fds-panel-pattern');
          return {
            id,
            computedOpacity: p ? window.getComputedStyle(p).opacity : null
          };
        });
      });
    }

    overflowResults.push({
      width,
      ...overflow,
      mobileLogo,
      mobilePanelPatterns
    });
  }

  // 6. Capture Screenshots
  // Mobile 375 Fullpage
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 400));
  // Mobile 375 Fullpage & Top Overlay
  await page.screenshot({
    path: path.join(round4Dir, 'fullpage-mobile-375.png'),
    fullPage: true
  });

  await page.screenshot({
    path: path.join(round4Dir, 'mobile-375-overlay.png'),
    clip: { x: 0, y: 0, width: 375, height: 720 }
  });

  // Desktop 1440 Fullpage & Crops
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 400));
  
  await page.screenshot({
    path: path.join(round4Dir, 'fullpage-desktop-1440.png'),
    fullPage: true
  });

  // 1. Top viewport 1440x900: paper texture from top, navbar overlays directly on hero
  await page.screenshot({
    path: path.join(round4Dir, 'navbar-hero-top-1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });

  // 2. Crop transition between Hero and About
  const heroElObj = await page.$('#home');
  const aboutElObj = await page.$('#about');
  const fieldsElObj = await page.$('#fields');

  if (heroElObj && aboutElObj) {
    const heroBox = await heroElObj.boundingBox();
    const aboutBox = await aboutElObj.boundingBox();
    if (heroBox && aboutBox) {
      await page.screenshot({
        path: path.join(round4Dir, 'hero-about-transition-crop.png'),
        clip: {
          x: 0,
          y: Math.max(0, heroBox.y + heroBox.height - 250),
          width: 1440,
          height: 500
        }
      });
    }
  }

  // 3. Crop transition between About and Fields
  if (aboutElObj && fieldsElObj) {
    const aboutBox = await aboutElObj.boundingBox();
    const fieldsBox = await fieldsElObj.boundingBox();
    if (aboutBox && fieldsBox) {
      await page.screenshot({
        path: path.join(round4Dir, 'about-fields-transition-crop.png'),
        clip: {
          x: 0,
          y: Math.max(0, aboutBox.y + aboutBox.height - 250),
          width: 1440,
          height: 500
        }
      });
    }
  }

  // Header / Navbar crop
  const headerEl = await page.$('header');
  if (headerEl) {
    await headerEl.screenshot({
      path: path.join(round4Dir, 'navbar-crop.png')
    });
  }

  // Hero crop
  const heroEl = await page.$('#home');
  if (heroEl) {
    await heroEl.screenshot({
      path: path.join(round4Dir, 'hero-crop.png')
    });
  }

  // Card section crop (#fields)
  const fieldsEl = await page.$('#fields');
  if (fieldsEl) {
    await fieldsEl.screenshot({
      path: path.join(round4Dir, 'card-section-crop.png')
    });
  }

  // Activities collage crop
  const collageEl = await page.$('[data-activities-collage]');
  if (collageEl) {
    await collageEl.screenshot({
      path: path.join(round4Dir, 'activities-collage-crop.png')
    });
  }

  // Footer crop
  const footerEl = await page.$('#footer');
  if (footerEl) {
    await footerEl.screenshot({
      path: path.join(round4Dir, 'footer-crop.png')
    });
  }

  // Panel Screenshots
  if (aboutElObj) {
    await aboutElObj.screenshot({
      path: path.join(round4Dir, 'about-panel-1440.png')
    });
  }

  const activitiesElObj = await page.$('#activities');
  if (activitiesElObj) {
    await activitiesElObj.screenshot({
      path: path.join(round4Dir, 'activities-panel-1440.png')
    });
  }

  const achievementsElObj = await page.$('#achievements');
  if (achievementsElObj) {
    await achievementsElObj.screenshot({
      path: path.join(round4Dir, 'achievements-panel-1440.png')
    });
  }

  const journeyElObj = await page.$('#journey');
  if (journeyElObj) {
    await journeyElObj.screenshot({
      path: path.join(round4Dir, 'journey-panel-1440.png')
    });
  }

  // Paper Texture Zoom 100% Crop (between heading and card)
  const fieldsHeading = await page.$('#fields h2');
  if (fieldsHeading) {
    const box = await fieldsHeading.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(round4Dir, 'paper-texture-zoom-100.png'),
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y - 40),
          width: 650,
          height: 320
        }
      });
    }
  }

  // Also get computed page background data
  const pageBgComputed = await page.evaluate(() => {
    const p = document.querySelector('.fds-page');
    const s = window.getComputedStyle(p);
    return {
      backgroundImage: s.backgroundImage,
      backgroundSize: s.backgroundSize,
      backgroundColor: s.backgroundColor,
      backgroundRepeat: s.backgroundRepeat,
      backgroundPosition: s.backgroundPosition
    };
  });

  const finalReport = {
    timestamp: new Date().toISOString(),
    round43NavbarAudit,
    panelPatternAudit,
    round42Audit,
    pageBackground: pageBgComputed,
    typographyAudit,
    logoAudit,
    mobileLogoAt375: overflowResults.find(r => r.width === 375)?.mobileLogo,
    sectionAudit,
    photoFrameAudit,
    overflowResults,
    networkErrors: failedRequests,
    consoleErrors,
    totalNetworkAssetsTracked: networkAssets.length
  };

  fs.writeFileSync(
    path.join(round4Dir, 'round4-verification-results.json'),
    JSON.stringify(finalReport, null, 2),
    'utf-8'
  );

  const mobileAudit = overflowResults.find(r => r.width === 375)?.mobilePanelPatterns || [];
  console.log('PATTERN COMPUTED OPACITY AUDIT:');
  console.table(panelPatternAudit.map(p => {
    const mob = mobileAudit.find(m => m.id === p.id);
    return {
      section: p.id,
      patternSrc: p.patterns[0]?.src || 'none',
      desktopOpacity: p.patterns[0]?.opacity || 'none',
      mobileOpacity: mob ? mob.computedOpacity : 'none'
    };
  }));

  await browser.close();
})();
