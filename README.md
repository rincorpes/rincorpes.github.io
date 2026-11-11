# Rincorpes website

A small static Vite site for the homepage, portfolio gallery, and Tatuy case study.

## Local development

From the website repository using Node.js and npm:

```sh
npm ci
npm run dev
```

The local dev server uses `http://localhost:4173/`. The gallery is at `/portfolio/` and the Tatuy case study is at `/portfolio/tatuy/`.

The three Vite HTML entries are `index.html`, `portfolio/index.html`, and `portfolio/tatuy/index.html`.

## Verification

```sh
npm run check:portfolio
npm run qa:browser
npm audit
```

`check:portfolio` uses Node's test runner to validate project cards, navigation, accessible category controls, the Tatuy image byte hashes/alt text/captions, the Vite entries, and the browser runner's safety constraints.

`qa:browser` first runs the source checks, builds with Vite, starts a temporary loopback-only preview, and uses Playwright (installed Chrome or Chromium) to test desktop/mobile-viewport navigation, category filters, direct Tatuy case-study routing, overflow, errors, and no-JavaScript fallback. If no browser is available, install one with `npx playwright install chromium` and retry.

**Every browser run first invalidates the four previous screenshots and success-only `result.json`.** It leaves the separate `.qa/portfolio/media-review/` directory untouched. The runner logs desktop/mobile/no-JS progress. For each Tatuy image, it scrolls into view to trigger lazy loading and fails with a descriptive error after 10 seconds if the decoded image is unavailable. A new success report is written only after all browser checks pass.

Outputs remain locally in ignored `.qa/portfolio/`:
- `portfolio-desktop.png` and `portfolio-mobile.png`
- `tatuy-desktop.png` and `tatuy-mobile.png`
- `result.json` with browser version, completion timestamp, routes, and checked behaviors

A missing `result.json` after a run means that run **did not pass**. Partial screenshots are not a success signal. The `.qa/` output is not publication-approved media.

The Studio connector can edit this website and install dependencies, but currently does not expose arbitrary npm-script execution or local browser control. **This latest QA runner change has not been executed through Studio.** Run `npm run qa:browser` on your machine before accepting it.

## Portfolio structure

- `portfolio/index.html`: five truthful, public-safe project descriptions, readable without JavaScript; approved mature Tatuy tree frame.
- `portfolio/tatuy/index.html`: source-grounded technical Tatuy case study; approved early-growth tree frame.
- `assets/css/portfolio.css` and `assets/css/tatuy-case.css`: responsive project and case-study styles.
- `assets/js/portfolio.js`: progressive-enhancement category filters with optional `?focus=` state.
- `tests/portfolio.test.js` and `tests/portfolio.browser.js`: source and Playwright acceptance coverage.

There are no private Studio/Endr source links or unapproved captures in the portfolio.

## Tatuy image provenance (M2-TAT-01)

The project owner confirmed ownership and explicitly approved **both** native Procedural Tree screenshots for public portfolio use on 2026-11-11. Frame 02 (mature canopy) is in the gallery; frame 01 (early growth) is in the case study. Alt text and captions call them native captures, **not** verified browser gameplay.

Studio's guarded file API cannot create binary files, so the original 800 × 600 PNGs are preserved as self-contained `data:image/png;base64` images in HTML. They are not separately optimized WebP assets.

Original decoded PNG SHA-256:
- Mature frame 02: `8d9bc0f589c33913f80e78726040072dadb77616965c7a90000f9d6dd211b2ff`
- Early-growth frame 01: `0f338366ce44f5d47614cea4773d058bc14e7410cdd0c7242c4176cfcabf458e`

Public media approval **does not** authorize commits, pushes, deployments, or publication. The central `work/planning/initiatives/public-presence/` workspace owns approval/provenance decisions.

## M3.5 — // Emergence

The portfolio includes an **actively expanding** section after the five project cards and before the deeper Studio/Endr notes. It is employer-facing content, not a replacement or blockade for the existing portfolio.

- The eight-second **browser animation preview** uses SVG and CSS; it is *not a Tatuy video recording*. It starts and ends at an orange `//` mark and introduces circuit connections, restrained green growth, and one signal pulse.
- `assets/css/emergence.css` owns the animation, viewport layouts and reduced-motion handling. It requires neither JavaScript nor external media services.
- The **static poster** is a genuine 800×600 native Tatuy capture from successful run `5a64bc3098fc48218d9a4d7bcfcd532b` (frame 04), embedded as an image data URL. It appears when the user requests reduced motion or runs without JavaScript. It was created for this project and must still be reviewed for public release along with the newly written M3.5 copy.
- The matching source experiment is in Tatuy at `examples/experiments/009_emergence/`. Studio successfully ran a native 240-frame proof and 480-frame eight-second proof, each with inspected screenshots. The full run requested MP4 but returned `video: null`; no verified WebM or MP4 export exists. Don't claim the browser animation was captured by Tatuy.
- Browser QA now asserts the section exists on desktop/mobile and without JS, checks the CSS's eight-second duration, checks that the real poster decodes in reduced-motion/no-JS mode, and checks layout widths.

**Release status:** local source authored; the current twelve-test source suite and changed desktop/mobile/reduced-motion browser QA have **not yet been executed** after these edits. Re-run `npm run qa:browser`, visually inspect the four regenerated screenshots, check `npm audit`, and complete Git/editorial/accessibility review before asking for a separate publishing decision.

## Release gates

After running the current QA script, visually review all **four fresh** captures and the successful `result.json`. Check links, keyboard navigation and relevant physical mobile devices, and inspect `npm audit` results. Sass deprecation warnings are non-fatal but should be tracked. Inspect the Git working tree under the repository owner's Windows account before separately approving any commit or deployment.

Strategic milestones and publication planning belong in central `work/planning/`, not this repository.
