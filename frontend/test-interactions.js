const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testInteractions() {
  const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Test Project pagination & Initiative selector
  const text1 = await page.evaluate(() => document.getElementById('projects').innerText);
  const paginationBefore = text1.includes('01 / 03');
  const nextBtn = await page.$('button[aria-label="Sáng kiến tiếp theo"]') || await page.$('button[aria-label="Chương trình tiếp theo"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 200));
  }
  const text2 = await page.evaluate(() => document.getElementById('projects').innerText);
  const paginationAfter = text2.includes('02 / 03');
  console.log('Project showcase pagination switch (01/03 -> 02/03):', paginationBefore && paginationAfter);

  // Also test tab selector button 03
  const tab03 = await page.$('button[aria-label="Xem sáng kiến 3"]');
  if (tab03) {
    await tab03.click();
    await new Promise(r => setTimeout(r, 200));
  }
  const text3 = await page.evaluate(() => document.getElementById('projects').innerText);
  const tab03Worked = text3.includes('03 / 03');
  console.log('Initiative tab selector (button 03):', tab03Worked);

  // 2. Test Search Modal Open & ESC Close
  const searchBtn = await page.$('button[aria-label="Tìm kiếm nội dung"]');
  await searchBtn.click();
  await new Promise(r => setTimeout(r, 200));
  const searchModalOpened = (await page.$('div[role="dialog"]')) !== null;
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 200));
  const searchModalClosed = (await page.$('div[role="dialog"]')) === null;
  console.log('Search modal open & ESC close:', searchModalOpened && searchModalClosed);

  await browser.close();
}

testInteractions().catch(err => {
  console.error(err);
  process.exit(1);
});
