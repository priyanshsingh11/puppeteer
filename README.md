# Puppeteer Hello World

A 3-lesson crash course to get you automating browsers with Puppeteer.

## Setup (one time)

Make sure you have Node.js installed (v18 or higher). Then run:

```bash
cd puppeteer-hello-world
npm init -y
npm install puppeteer
```

This will download Puppeteer AND a bundled Chromium browser (~200MB). You only do this once.

## Run the lessons in order

```bash
node 1_hello_world.js          # Opens a site, reads a heading, takes a screenshot
node 2_interact_with_page.js   # Types, clicks, navigates, reads results
node 3_scrape_data.js          # Scrapes Hacker News top 10 into a JSON file
```

## What to do next

1. Read `cheatsheet.js` and keep it open while you work.
2. Pick a real task from your company (even a tiny one).
3. Open the target website in Chrome, right-click elements, hit "Inspect" to find selectors.
4. Write a script using the patterns from these 3 lessons.

## Troubleshooting

**"Chromium revision is not downloaded"**
Run `npx puppeteer browsers install chrome` to force-download it.

**Script hangs or times out**
Add `{ waitUntil: "networkidle2" }` to your `page.goto()` calls.
Make sure you're using `await` before every Puppeteer method.

**Can't find the right CSS selector**
In Chrome DevTools (F12), use the element picker (top-left icon),
click the element you want, and look at the highlighted HTML.
Right-click the HTML and choose "Copy > Copy selector".
