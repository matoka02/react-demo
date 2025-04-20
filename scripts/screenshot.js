const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

const urls = [
  { path: '/dashboard', name: 'dashboard' },
  { path: '/orders', name: 'orders' },
  { path: '/products', name: 'products' },
  { path: '/customers', name: 'customers' },
  { path: '/blogs', name: 'blogs' },
  { path: '/agents', name: 'agents' },
];

const baseUrl = 'http://localhost:3000';
// const viewport = { width: 1920, height: 2400 };
const viewport = { width: 1920, height: 1080 };

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: viewport,
    args: ['--start-maximized'],
  });

  try {
    for (let i = 0; i < urls.length; i++) {
      const { path: urlPath, name } = urls[i];
      const page = await browser.newPage();

      // Set the viewport size
      await page.setViewport(viewport);

      // Let's go to the page
      const fullUrl = `${baseUrl}${urlPath}`;
      await page.goto(fullUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      // Wait a little for the full download.
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a file name with leading zeros
      const counter = (i + 1).toString().padStart(3, '0');
      const filename = `react-demo-v6-screen-${counter}-${name}.png`;
      const filepath = path.join(screenshotsDir, filename);

      // Take a screenshot of the entire page
      await page.screenshot({
        path: filepath,
        fullPage: true,
        // type: 'jpeg',
        // quality: 90
      });

      console.log(`Screenshot saved: ${filepath}`);
      await page.close();
    }
  } catch (error) {
    console.error('Error while creating screenshots:', error);
  } finally {
    await browser.close();
  }
})();
