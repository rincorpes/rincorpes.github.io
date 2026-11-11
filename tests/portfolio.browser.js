/**
 * Build and smoke-test the local portfolio in Chromium/Chrome.
 *
 * Output is intentionally kept in the ignored .qa/ directory. This script
 * never deploys, pushes, or copies screenshots into the public site.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { build, preview } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const configFile = join(root, "vite.config.js");
const screenshots = join(root, ".qa", "portfolio");
const expectedScreenshots = [
  "portfolio-desktop.png",
  "tatuy-desktop.png",
  "portfolio-mobile.png",
  "tatuy-mobile.png",
];

async function invalidatePreviousQaArtifacts() {
  // Preserve .qa/portfolio/media-review and any unrelated review material.
  // A failed run must not leave a stale success report or partial screenshot set.
  for (const filename of [...expectedScreenshots, "result.json"]) {
    try {
      await unlink(join(screenshots, filename));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
}

async function runSourceChecks() {
  // Use the Node executable directly, without a shell or npm recursion.
  console.log("Checking portfolio source contracts...");
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--test", "tests/portfolio.test.js"], {
      cwd: root,
      stdio: "inherit",
      shell: false,
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error("Portfolio source checks failed with exit code " + code));
    });
  });
}

async function openBrowser() {
  const requested = process.env.PORTFOLIO_BROWSER_CHANNEL;
  const options = requested ? [{ channel: requested }] : [{ channel: "chrome" }, {}];
  const failures = [];

  for (const option of options) {
    try {
      return await chromium.launch({ headless: true, ...option });
    } catch (error) {
      failures.push(String(error?.message || error).split("\n")[0]);
    }
  }
  throw new Error(
    "No usable Chrome/Chromium was found. Install Chrome or run " +
      "'npx playwright install chromium'. Details: " + failures.join(" | ")
  );
}

function watchLocalErrors(page, origin) {
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (
      response.url().startsWith(origin + "/") &&
      response.status() >= 400 &&
      !response.url().endsWith("/favicon.ico")
    ) {
      failures.push("HTTP " + response.status() + " " + response.url());
    }
  });
  return failures;
}

async function checkFit(page, name) {
  const { width, viewport } = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  assert.ok(
    width <= viewport + 2,
    name + " has horizontal overflow: " + width + " > " + viewport
  );
}

async function visibleProjectCount(page) {
  return page.locator("[data-portfolio-project]").evaluateAll(
    (projects) => projects.filter((project) => !project.hidden).length
  );
}

async function checkFilter(page, label, expected) {
  const button = page.getByRole("button", { name: label, exact: true });
  await button.click();
  assert.equal(await button.getAttribute("aria-pressed"), "true", label);
  assert.equal(await visibleProjectCount(page), expected, label);
  assert.equal(
    await page.locator("#portfolio-count").innerText(),
    "Showing " + expected + " " + (expected === 1 ? "project" : "projects") + "."
  );
}

async function captureCleanFullPage(page, filename) {
  // Clicking filters leaves the viewport scrolled and a link/button focused.
  // Clear both before a full-page screenshot so sticky navigation and the
  // focused skip link are not composited into the middle of the image.
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });
  await page.waitForFunction(() => Math.abs(window.scrollY) <= 1);
  await page.waitForTimeout(100);
  const headerTop = await page.locator(".site-header").evaluate(
    (header) => header.getBoundingClientRect().top
  );
  assert.ok(Math.abs(headerTop) < 3, "Header is not at top before screenshot: " + headerTop);
  await page.screenshot({
    path: join(screenshots, filename),
    fullPage: true,
    animations: "disabled",
  });
}

async function checkTatuyMedia(page, figureClass, name) {
  const figure = page.locator("figure." + figureClass);
  await figure.waitFor({ state: "visible" });
  const img = figure.locator("img");
  assert.ok((await img.getAttribute("alt"))?.length >= 40, name + " missing alt text");
  assert.ok((await img.getAttribute("src"))?.startsWith("data:image/png;base64,"), name + " missing native capture");
  // Browser lazy-loading may defer offscreen images indefinitely. Explicitly
  // reveal each image and bound readiness to avoid hanging a whole QA run.
  await img.scrollIntoViewIfNeeded({ timeout: 10_000 });
  try {
    await page.waitForFunction(
      (selector) => {
        const node = document.querySelector(selector);
        return node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0;
      },
      "figure." + figureClass + " img",
      { timeout: 10_000 }
    );
  } catch (error) {
    throw new Error(name + " did not load within 10 seconds: " + String(error?.message || error));
  }
  assert.equal(await img.evaluate((node) => node.naturalWidth), 800, name + " failed to decode");
  assert.equal(await img.evaluate((node) => node.naturalHeight), 600);
  assert.ok((await figure.locator("figcaption").innerText()).length > 35);
}

async function checkEmergence(page, reducedMotion = false) {
  const section = page.locator("#emergence");
  await section.waitFor({ state: "visible" });
  await page.getByRole("heading", { name: /This portfolio is actively expanding/ }).waitFor();
  assert.match(await section.innerText(), /More verified demos, case studies, and experiments/);
  assert.match(await section.locator("figcaption").innerText(), /browser SVG animation preview/);
  const poster = section.locator("img.emergence-poster");
  if (reducedMotion) {
    assert.equal(await poster.isVisible(), true, "Reduced motion must show the Tatuy poster");
    await poster.scrollIntoViewIfNeeded({ timeout: 10_000 });
    await page.waitForFunction(() => {
      const node = document.querySelector("#emergence img.emergence-poster");
      return node instanceof HTMLImageElement && node.complete && node.naturalWidth === 800;
    }, undefined, { timeout: 10_000 });
    assert.equal(await section.locator("svg.emergence-motion").isVisible(), false);
  } else {
    assert.equal(await section.locator("svg.emergence-motion").isVisible(), true);
    assert.equal(await poster.isVisible(), false);
    const duration = await section.locator(".emergence-mark").evaluate(
      (element) => getComputedStyle(element).animationDuration
    );
    assert.equal(duration, "8s");
  }
}

async function checkDesktop(browser, origin) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = watchLocalErrors(page, origin);

  try {
    await page.goto(origin + "/", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Portfolio", exact: true }).first().click();
    await page.waitForURL("**/portfolio/");
    await page.locator("#portfolio-main").waitFor();
    assert.equal(await visibleProjectCount(page), 5);
    await checkTatuyMedia(page, "portfolio-tatuy-media", "Tatuy hero");
    await checkEmergence(page);

    await checkFilter(page, "Developer tools", 2);
    await checkFilter(page, "Game technology", 2);
    await checkFilter(page, "Creative / experimental", 2);
    await checkFilter(page, "AI systems", 1);
    await checkFilter(page, "All", 5);
    await checkFit(page, "Desktop gallery");

    await captureCleanFullPage(page, "portfolio-desktop.png");

    await page.getByRole("link", { name: /Read case study/ }).click();
    await page.waitForURL("**/portfolio/tatuy/");
    assert.match(await page.locator("h1").innerText(), /Tatuy/);
    await page.getByRole("heading", { name: /Growing a tree/ }).waitFor();
    await checkTatuyMedia(page, "case-tree-media", "Tatuy early growth");
    await checkFit(page, "Desktop case study");
    await captureCleanFullPage(page, "tatuy-desktop.png");

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: /Growing a tree/ }).waitFor();
    assert.deepEqual(errors, [], "Desktop page errors");
  } finally {
    await context.close();
  }
}

async function checkMobile(browser, origin) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const errors = watchLocalErrors(page, origin);

  try {
    await page.goto(origin + "/portfolio/?focus=ai-systems", {
      waitUntil: "domcontentloaded",
    });
    await page.getByRole("button", { name: "AI systems" }).waitFor();
    await page.waitForFunction(
      () => document.querySelector('[data-filter="ai-systems"]')?.getAttribute("aria-pressed") === "true"
    );
    assert.equal(await visibleProjectCount(page), 1);
    await checkFit(page, "Mobile filtered gallery");
    await checkFilter(page, "All", 5);
    await checkTatuyMedia(page, "portfolio-tatuy-media", "Mobile Tatuy hero");
    await checkEmergence(page);
    await checkFit(page, "Mobile gallery");
    await captureCleanFullPage(page, "portfolio-mobile.png");

    await page.goto(origin + "/portfolio/tatuy/", { waitUntil: "domcontentloaded" });
    await page.locator("#case-main").waitFor();
    await checkTatuyMedia(page, "case-tree-media", "Mobile Tatuy growth");
    await checkFit(page, "Mobile case study");
    await captureCleanFullPage(page, "tatuy-mobile.png");
    assert.deepEqual(errors, [], "Mobile page errors");
  } finally {
    await context.close();
  }
}

async function checkReducedMotion(browser, origin) {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 800 },
  });
  try {
    const page = await context.newPage();
    await page.goto(origin + "/portfolio/", { waitUntil: "domcontentloaded" });
    await checkEmergence(page, true);
    await checkFit(page, "Reduced-motion gallery");
  } finally {
    await context.close();
  }
}

async function checkNoScript(browser, origin) {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 800 },
  });
  try {
    const page = await context.newPage();
    await page.goto(origin + "/portfolio/", { waitUntil: "domcontentloaded" });
    assert.equal(await page.locator("[data-portfolio-project]:visible").count(), 5);
    await checkTatuyMedia(page, "portfolio-tatuy-media", "No-JS Tatuy hero");
    await checkEmergence(page, true);
  } finally {
    await context.close();
  }
}

let server;
let browser;
try {
  await mkdir(screenshots, { recursive: true });
  await invalidatePreviousQaArtifacts();
  await runSourceChecks();
  console.log("Building portfolio with Vite...");
  await build({ root, configFile, logLevel: "warn" });

  server = await preview({
    root,
    configFile,
    logLevel: "warn",
    preview: { host: "127.0.0.1", port: 4173, strictPort: false },
  });

  const address = server.httpServer.address();
  assert.ok(address && typeof address !== "string", "Could not resolve preview port");
  const origin = "http://127.0.0.1:" + address.port;

  browser = await openBrowser();
  console.log("Checking desktop gallery and case study...");
  await checkDesktop(browser, origin);
  console.log("Checking mobile gallery and case study...");
  await checkMobile(browser, origin);
  console.log("Checking reduced-motion static poster...");
  await checkReducedMotion(browser, origin);
  console.log("Checking no-JavaScript fallback...");
  await checkNoScript(browser, origin);
  await writeFile(
    join(screenshots, "result.json"),
    JSON.stringify({
      status: "passed",
      completed_at: new Date().toISOString(),
      origin,
      browser_version: browser.version(),
      checked_routes: ["/", "/portfolio/", "/portfolio/tatuy/"],
      checks: ["navigation", "filters", "deep-link", "responsive-overflow", "reload", "no-js", "emergence-animation", "reduced-motion", "local-page-errors"],
      screenshots: expectedScreenshots,
    }, null, 2) + "\n",
    "utf8"
  );
  console.log("Browser QA passed: 3 routes, category filters, responsive widths, no-JS fallback.");
  console.log("Local screenshots (not approved for publication): " + screenshots);
} finally {
  if (browser) await browser.close();
  if (server?.httpServer) {
    await new Promise((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  }
}
