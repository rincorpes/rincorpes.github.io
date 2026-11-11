import { createHash } from "node:crypto";
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => readFileSync(join(root, file), "utf8");
const homepage = read("index.html");
const portfolio = read("portfolio/index.html");
const config = read("vite.config.js");
const filtering = read("assets/js/portfolio.js");

test("portfolio is a Vite HTML entry and navigable from home", () => {
  assert.match(config, /portfolio:\s*fileURLToPath\(new URL\("\.\/portfolio\/index\.html"/);
  assert.match(homepage, /href="\/portfolio\/">Portfolio<\/a>/);
  assert.match(homepage, /href="\/portfolio\/"[\s\S]*?View Portfolio/);
  assert.match(portfolio, /href="\.\.\/">Home<\/a>/);
});

test("all five public-safe project stories render without JavaScript", () => {
  assert.equal((portfolio.match(/data-portfolio-project\b/g) || []).length, 5);
  for (const project of ["Tatuy", "Studio", "Endr", "ParadoxJS", "Shatterphase"]) {
    assert.ok(portfolio.includes(project), project + " missing");
  }
  assert.match(portfolio, /PRIVATE PROJECT/);
  assert.match(portfolio, /PRIVATE R&amp;D/);
  assert.doesNotMatch(portfolio, /github\.com\/rincorpes\/(?:studio|endr|shatterphase)(?:\/|")/i);
});

test("filters have accessible state and a no-JS fallback", () => {
  assert.equal((portfolio.match(/data-filter="/g) || []).length, 5);
  assert.match(portfolio, /role="group" aria-label="Filter projects by focus"/);
  assert.match(portfolio, /id="portfolio-count" role="status" aria-live="polite"/);
  assert.match(filtering, /setAttribute\("aria-pressed"/);
  assert.match(filtering, /project\.hidden = !show/);
  assert.match(filtering, /searchParams\.set\("focus"/);
});

test("portfolio local assets and skip link exist", () => {
  for (const path of [
    "assets/css/style.css",
    "assets/css/portfolio.css",
    "assets/js/portfolio.js",
  ]) {
    assert.ok(existsSync(join(root, path)), path + " missing");
  }
  assert.match(portfolio, /href="\.\.\/assets\/css\/portfolio\.css"/);
  assert.match(portfolio, /src="\.\.\/assets\/js\/portfolio\.js"/);
  assert.match(portfolio, /href="#portfolio-main">Skip to projects/);
});

test("Tatuy case study is a separate, linked Vite entry", () => {
  const tatuy = read("portfolio/tatuy/index.html");
  assert.match(config, /tatuyCase:\s*fileURLToPath\(new URL\("\.\/portfolio\/tatuy\/index\.html"/);
  assert.match(portfolio, /href="\.\/tatuy\/">Read case study/);
  assert.match(tatuy, /href="\.\.\/">← All projects/);
  assert.match(tatuy, /href="\.\.\/\.\.\/assets\/css\/tatuy-case\.css"/);
  assert.ok(existsSync(join(root, "assets/css/tatuy-case.css")));
  for (const term of ["ECS", "Pygame", "Procedural Tree", "render queue"]) {
    assert.ok(tatuy.toLowerCase().includes(term.toLowerCase()), term + " missing");
  }
  assert.match(tatuy, /future work/);
  assert.match(tatuy, /still being verified/);
  assert.match(tatuy, /<figure class="case-tree-media">/);
  assert.doesNotMatch(tatuy, /github\.com\/rincorpes\/(?:studio|endr|shatterphase)(?:\/|")/i);
});

test("local browser QA runs only a temporary preview and keeps screenshots ignored", () => {
  const runner = read("tests/portfolio.browser.js");
  const scripts = read("package.json");
  const ignored = read(".gitignore");
  assert.match(scripts, /"qa:browser": "node tests\/portfolio\.browser\.js"/);
  assert.match(runner, /await build\(/);
  assert.match(runner, /await preview\(/);
  assert.match(runner, /await checkDesktop\(/);
  assert.match(runner, /await checkMobile\(/);
  assert.match(runner, /await checkNoScript\(/);
  assert.match(runner, /server\.httpServer\.close/);
  assert.match(runner, /"\.qa", "portfolio"/);
  assert.match(ignored, /^\.qa\/$/m);
});

test("QA invalidates only stale output files before building", () => {
  const runner = read("tests/portfolio.browser.js");
  assert.match(runner, /async function invalidatePreviousQaArtifacts\(/);
  assert.match(runner, /await unlink\(join\(screenshots, filename\)\)/);
  assert.match(runner, /if \(error\?\.code !== "ENOENT"\) throw error/);
  assert.match(runner, /for \(const filename of \[\.\.\.expectedScreenshots, "result\.json"\]\)/);
  assert.match(runner, /await invalidatePreviousQaArtifacts\(\);/);
  assert.match(runner, /await runSourceChecks\(\);/);
  assert.match(runner, /spawn\(process\.execPath, \["--test", "tests\/portfolio\.test\.js"\]/);
  assert.match(runner, /shell: false/);
  assert.ok(
    runner.indexOf("await invalidatePreviousQaArtifacts();") <
      runner.indexOf("await runSourceChecks();"),
    "Old success report must be invalidated before source tests"
  );
  assert.ok(
    runner.indexOf("await invalidatePreviousQaArtifacts();") <
      runner.indexOf("await build({ root, configFile"),
    "Old success report must be invalidated before Vite build"
  );
  assert.doesNotMatch(runner, /rm\(screenshots|unlink\(join\(screenshots, "media-review"/);
});

test("Tatuy lazy-loaded images are revealed and checked with a deadline", () => {
  const runner = read("tests/portfolio.browser.js");
  assert.match(runner, /await img\.scrollIntoViewIfNeeded\(\{ timeout: 10_000 \}\)/);
  assert.match(runner, /await page\.waitForFunction\(/);
  assert.match(runner, /node\.complete && node\.naturalWidth > 0/);
  assert.match(runner, /\{ timeout: 10_000 \}/);
  assert.match(runner, /did not load within 10 seconds/);
  assert.doesNotMatch(runner, /node\.addEventListener\("load", resolve/);
});

test("full-page screenshot capture resets the viewport and focused controls", () => {
  const runner = read("tests/portfolio.browser.js");
  const css = read("assets/css/portfolio.css");
  assert.match(runner, /async function captureCleanFullPage\(/);
  assert.match(runner, /document\.activeElement\.blur\(\)/);
  assert.match(runner, /window\.scrollTo\(\{ top: 0, left: 0/);
  assert.match(runner, /window\.scrollY\) <= 1/);
  assert.match(runner, /Header is not at top before screenshot/);
  for (const filename of [
    "portfolio-desktop.png", "tatuy-desktop.png",
    "portfolio-mobile.png", "tatuy-mobile.png",
  ]) {
    assert.ok(runner.includes('captureCleanFullPage(page, "' + filename + '")'), filename);
  }
  assert.match(css, /\.portfolio-skip:focus \{ transform: translateY\(0\); \}/);
});

test("approved Tatuy media is authentic, accessible and self-contained", () => {
  const tatuy = read("portfolio/tatuy/index.html");
  const portfolioCss = read("assets/css/portfolio.css");
  const caseCss = read("assets/css/tatuy-case.css");
  assert.match(portfolio, /<figure class="portfolio-tatuy-media">/);
  assert.match(tatuy, /<figure class="case-tree-media">/);
  assert.match(portfolioCss, /\.portfolio-tatuy-media img/);
  assert.match(caseCss, /\.case-tree-media img/);
  const expected = [
    { page: portfolio, sha256: "8d9bc0f589c33913f80e78726040072dadb77616965c7a90000f9d6dd211b2ff" },
    { page: tatuy, sha256: "0f338366ce44f5d47614cea4773d058bc14e7410cdd0c7242c4176cfcabf458e" },
  ];
  for (const { page, sha256 } of expected) {
    const image = page.match(/<img src="data:image\/png;base64,([^"]+)" width="800" height="600"[^>]*alt="([^"]+)">/);
    assert.ok(image, "Expected embedded native PNG with alt text");
    const bytes = Buffer.from(image[1], "base64");
    assert.ok(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])));
    assert.equal(bytes.readUInt32BE(16), 800);
    assert.equal(bytes.readUInt32BE(20), 600);
    assert.ok(image[2].length > 40);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), sha256);
    assert.match(page, /<figcaption>[^<]+<\/figcaption>/);
    assert.doesNotMatch(page, /<video\b|<iframe\b/i);
  }
});


test("Emergence expansion uses truthful copy and accessible native motion fallback", () => {
  const css = read("assets/css/emergence.css");
  assert.match(portfolio, /<section id="emergence"[^>]*aria-labelledby="emergence-title"/);
  assert.ok(portfolio.indexOf('id="emergence"') > portfolio.indexOf('id="projects"'));
  assert.ok(portfolio.indexOf('id="emergence"') < portfolio.indexOf('id="studio-notes"'));
  assert.match(portfolio, /This portfolio is actively expanding/);
  assert.match(portfolio, /More verified demos, case studies, and experiments are being prepared/);
  for (const name of ["Studio", "Endr", "ParadoxJS", "Shatterphase"]) {
    assert.match(portfolio, new RegExp("Coming next:[^<]*" + name));
  }
  assert.match(portfolio, /class="emergence-motion"[^>]*aria-hidden="true"/);
  assert.match(portfolio, /class="emergence-poster"[^>]*alt="[^"]{50,}"/);
  assert.match(portfolio, /browser SVG animation preview; reduced-motion poster is a genuine frame/);
  assert.match(portfolio, /<noscript><style>[^<]+<\/style><\/noscript>/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.emergence-motion \{ display: none; \}/);
  assert.match(css, /\.emergence-poster \{ display: block; \}/);
  assert.match(css, /animation: emergence-mark 8s linear infinite/);
  assert.match(css, /@keyframes emergence-signal/);
  assert.match(css, /@media \(max-width: 940px\)/);
  assert.match(css, /@media \(max-width: 550px\)/);
  const runner = read("tests/portfolio.browser.js");
  assert.match(runner, /async function checkEmergence\(/);
  assert.match(runner, /await checkReducedMotion\(browser, origin\)/);
  assert.match(runner, /await checkEmergence\(page, true\)/);
  const match = portfolio.match(/class="emergence-poster"[\s\S]*?src="data:image\/png;base64,([^"]+)"[\s\S]*?alt="([^"]+)"/);
  assert.ok(match, "A real, accessible native Tatuy PNG poster is required");
  const bytes = Buffer.from(match[1], "base64");
  assert.ok(bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])));
  assert.equal(bytes.readUInt32BE(16), 800);
  assert.equal(bytes.readUInt32BE(20), 600);
});

test("mobile gallery keeps compact project cards without hiding content", () => {
  const css = read("assets/css/portfolio.css");
  assert.match(css, /@media \(max-width: 550px\)/);
  assert.match(css, /\.portfolio-card \{ min-height: 0; padding: 1\.4rem; \}/);
  assert.equal((portfolio.match(/data-portfolio-project\b/g) || []).length, 5);
});


