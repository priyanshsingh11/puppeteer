// ============================================
// PUPPETEER CHEAT SHEET
// ============================================
// Keep this open while you work. Copy-paste what you need.
// Every command below is something you'll use regularly.

// ---- SETUP ----
const puppeteer = require("puppeteer");

// Launch with visible browser (for debugging)
const browser = await puppeteer.launch({ headless: false, slowMo: 100 });

// Launch invisible (for production/speed)
const browser = await puppeteer.launch({ headless: true });

// Open a new tab
const page = await browser.newPage();

// Set window size
await page.setViewport({ width: 1280, height: 800 });


// ---- NAVIGATION ----

await page.goto("https://example.com");               // go to a URL
await page.goBack();                                   // browser back button
await page.goForward();                                // browser forward button
await page.reload();                                   // refresh the page


// ---- FINDING & READING ELEMENTS ----

// Read text from ONE element
const text = await page.$eval("h1", el => el.textContent);

// Read text from MANY elements
const allTexts = await page.$$eval("p", els => els.map(e => e.textContent));

// Check if an element exists (returns null if not found)
const element = await page.$(".some-class");
if (element) { /* it exists */ }

// Get an attribute (like href, src, value)
const link = await page.$eval("a.my-link", el => el.getAttribute("href"));


// ---- INTERACTING ----

await page.click("#submit-button");                    // click something
await page.type("#email-input", "hello@example.com");  // type into a field
await page.type("#email-input", "hello@example.com", { delay: 50 }); // type slowly (looks human)

// Clear a field before typing
await page.$eval("#email-input", el => el.value = "");
await page.type("#email-input", "new text");

// Select from a dropdown
await page.select("#country-dropdown", "US");

// Press keyboard keys
await page.keyboard.press("Enter");
await page.keyboard.press("Tab");
await page.keyboard.down("Shift");                     // hold shift
await page.keyboard.press("ArrowDown");
await page.keyboard.up("Shift");                       // release shift


// ---- WAITING (critical for reliability) ----

// Wait for an element to appear on the page
await page.waitForSelector(".results-loaded");

// Wait for navigation to complete (after clicking a link)
await page.waitForNavigation({ waitUntil: "networkidle2" });

// Wait a fixed amount of time (use sparingly, prefer waitForSelector)
await new Promise(r => setTimeout(r, 2000)); // wait 2 seconds

// Wait for a specific piece of text to appear
await page.waitForFunction(
  () => document.body.textContent.includes("Success")
);


// ---- SCREENSHOTS & PDF ----

await page.screenshot({ path: "shot.png" });                    // visible area
await page.screenshot({ path: "full.png", fullPage: true });    // entire page
await page.pdf({ path: "page.pdf", format: "A4" });             // save as PDF


// ---- HANDLING MULTIPLE PAGES/TABS ----

// If clicking opens a new tab, catch it like this:
const [newPage] = await Promise.all([
  new Promise(resolve => browser.once("targetcreated", async target => {
    resolve(await target.page());
  })),
  page.click("#link-that-opens-new-tab"),
]);
await newPage.waitForNavigation();


// ---- CLEANUP ----

await page.close();     // close one tab
await browser.close();  // close entire browser
