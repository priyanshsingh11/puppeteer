// ============================================
// LESSON 3: Scraping data from a page
// ============================================
// What this does: Goes to Hacker News, pulls the top 10 story titles
// and their URLs, and saves them to a JSON file.
//
// This is closer to a REAL automation task your company might ask for:
// "Go to [website], grab [this data], save it to [a file]."

const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
    const browser = await puppeteer.launch({
        headless: true, // no browser window needed. we just want the data.
    });

    const page = await browser.newPage();

    // Go to Hacker News (a tech news aggregator)
    console.log("Loading Hacker News...");
    await page.goto("https://news.ycombinator.com", {
        waitUntil: "networkidle2",
    });

    // --- SCRAPE multiple items at once ---
    // page.$$eval() is like $eval, but for MULTIPLE matching elements.
    // It finds ALL elements matching the selector and runs a function on them.
    //
    // The selector ".titleline > a" targets every story title link on the page.
    const stories = await page.$$eval(".titleline > a", (links) => {
        // This function runs INSIDE the browser (not in Node.js).
        // So you can only use browser APIs here, not Node.js APIs.
        return links.slice(0, 10).map((link, index) => ({
            rank: index + 1,
            title: link.textContent,
            url: link.href,
        }));
    });

    // Print what we found
    console.log("\nTop 10 Hacker News Stories:");
    console.log("=".repeat(50));
    stories.forEach((story) => {
        console.log(`${story.rank}. ${story.title}`);
        console.log(`   ${story.url}\n`);
    });

    // Save to a JSON file (a common automation output)
    fs.writeFileSync("hacker_news_top10.json", JSON.stringify(stories, null, 2));
    console.log("Data saved to hacker_news_top10.json");

    await browser.close();
}

main().catch(console.error);