// ============================================
// LESSON 1: Your very first Puppeteer script
// ============================================
// What this does: Opens a browser, goes to a website, 
// takes a screenshot, and closes the browser.

const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
    // STEP 0: Make sure the folder exists — Puppeteer won't create it for you
    // recursive: true → don't error if it's already there
    fs.mkdirSync("screenshots", { recursive: true });

    // STEP 1: Launch a browser
    // headless: false  → shows the actual browser window so you can WATCH it work
    // slowMo: 100      → slows every action by 100ms so you can follow along
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
    });

    // STEP 2: Open a new tab (called a "page" in Puppeteer)
    const page = await browser.newPage();

    // STEP 3: Set the window size so screenshots look good
    await page.setViewport({ width: 1280, height: 800 });

    // STEP 4: Navigate to a website
    // waitUntil: "networkidle2" means "wait until the page is fully loaded"
    await page.goto("https://en.wikipedia.org/wiki/Lionel_Messi", { waitUntil: "networkidle2" });

    // STEP 5: Read something from the page
    // This grabs the text inside the <h1> tag
    const heading = await page.$eval("h1", (el) => el.textContent);
    console.log("Page heading says:", heading);

    // STEP 6: Take a screenshot and save it
    const screenshotPath = "screenshots/" + Date.now() + ".png";
    await page.screenshot({ path: screenshotPath });
    console.log("Screenshot saved as", screenshotPath);

    // STEP 7: Close the browser
    await browser.close();
    console.log("Done. Browser closed.");
}

// Run it
main().catch(console.error);