// ============================================
// LESSON 2: Interacting with a page
// ============================================
// What this does: Goes to Wikipedia, types a search term,
// clicks the search button, and grabs info from the results.
//
// This covers the 3 things you'll do in 90% of automation:
//   1. TYPING into input fields
//   2. CLICKING buttons/links
//   3. READING text from the page

const puppeteer = require("puppeteer");

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 150, // slower so you can watch each step
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // --- GO TO WIKIPEDIA ---
    console.log("Opening Wikipedia...");
    await page.goto("https://en.wikipedia.org", { waitUntil: "networkidle2" });

    // --- TYPE into the search box ---
    // How do you find the right selector? 
    // Right-click the search box in Chrome → "Inspect" → look at the HTML.
    // Wikipedia's search box has the id "searchInput", so the selector is #searchInput
    console.log("Typing search term...");
    await page.type("#searchInput", "Puppeteer automation");

    // --- CLICK the search button ---
    // The search button is inside a form. We can click it using its CSS class.
    console.log("Clicking search...");
    await page.click("button.cdx-button");

    // --- WAIT for the results page to load ---
    // waitForNavigation() pauses until the browser finishes loading the new page
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // --- READ the page title ---
    const pageTitle = await page.title();
    console.log("Page title:", pageTitle);

    // --- READ the first heading on the page ---
    try {
        const firstHeading = await page.$eval(
            "#firstHeading",
            (el) => el.textContent
        );
        console.log("Article heading:", firstHeading);
    } catch {
        console.log("No exact article found. Search results page loaded instead.");
    }

    // --- TAKE A SCREENSHOT of what we see ---
    await page.screenshot({ path: "wikipedia_result.png" });
    console.log("Screenshot saved as wikipedia_result.png");

    // --- BONUS: Get the current URL ---
    console.log("Current URL:", page.url());

    await browser.close();
    console.log("Done.");
}

main().catch(console.error);