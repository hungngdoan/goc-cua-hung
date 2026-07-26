# Tech Debt Register

Last updated: 2026-07-25
Scope: known design debt in this repo, ranked by cost. SEO and multi-page architecture are explicitly out of scope by owner decision (2026-06-10): this site stays a single interactive page.

Every claim below was re-verified against the working tree on 2026-07-25. Items carry file and line references so the next audit can check them rather than trust them.

## Recently paid off (2026-07-25)

- **The six bespoke tab bodies no longer ship on the default route.** Their registry components are `React.lazy` imports at `src/config/sections.jsx:8-20`. The production build now emits one named chunk per body: Tào Tháo 67,526 bytes, 36 Kế 58,314, Tủ sách 10,310, Cơn Mưa 7,696, Về tui 6,261 and Mực Lam 6,079, plus a 2,945-byte shared dependency used by Tủ sách and Cơn Mưa.
- The initial StyleLab implementation is 199,060 bytes plus a 130-byte Astro wrapper, down from 354,271 bytes. `Suspense` and transitions retain the revealed body while a lazy chunk loads; `fallback={null}` adds no placeholder DOM or temporary layout. `MusicPlayer` and the two post-level embeds remain eager because they are part of the default route, not registry tab bodies.
- Lazy loading moved the cost from first paint to the first click on each bespoke tab, and a transition hides that: measured, clicking a tab changed the URL but left the nav highlight and body untouched until the chunk arrived, so on a slow link the site reads as broken. Two fixes, both cheap. Each registry entry now carries the same loader as a `preload`, fired on `pointerenter`, `pointerdown` and `focus` (`src/config/sections.jsx:8-20`), so intent warms the chunk and the click usually has nothing to wait for. `useTransition`'s `isPending` dims the body and shows a progress cursor for the slow path preloading missed. The pending style is applied only while a transition is in flight, so the settled DOM is unchanged.
- Lazy chunks need an error boundary and now have one (`SectionBoundary`). Without it a chunk that fails to arrive throws during render and React unmounts the entire island: measured, a missing tab chunk collapsed the page from ~80,000 to 6,068 characters, taking the banner, nav, sidebar and the playing audio element with it. This is not a rare case on Pages, where chunk filenames are content-hashed and old files are deleted on deploy, so anyone holding the page open across a deploy requests a file that is already gone. With the boundary the same failure leaves 32,437 characters: everything except the tab body survives, audio keeps playing, and the reader is offered a reload. It is keyed by section id so one failed tab does not poison the next, and it costs 703 bytes.
- **Former item 1, theme and content-section conflation, is paid.** Palette tokens now live alone in `src/config/themes.js:1-578`. The twelve tabs, their stable ids, names, slugs, aliases, icons, rows and component adapters live in one registry at `src/config/sections.jsx:42-179`; the adapters at `src/config/sections.jsx:22-38` also encode whether a bespoke component receives a theme.
- `StyleLab.jsx` consumes the registry for state, hash routing and tab data at `StyleLab.jsx:258-291`. Its former six-way section ternary is now a component lookup at `StyleLab.jsx:624-626`, with the existing generic post list as the null-component fallback. The registry extraction removed 700 lines; subsequent defensive, lazy-loading and error-boundary wiring leaves the current file at 1,131 lines without moving `postsByStyle`.
- The dependency-free check in `scripts/check-section-registry.mjs:30-470` is worth keeping, together with `scripts/section-registry-baseline.json`: it covers all twelve bodies, labels, icons, rows, canonical slugs, raw ids, legacy aliases and the no-hash default, then captures a full-page screenshot per tab. It is deliberately not presented as a general test suite.
- Run it with `npm run check:sections`, which builds first because the check serves `dist/`. It writes to `.section-check/`, which is gitignored: one run produces about 11 MB of PNGs and only the baseline in `scripts/` is meant to be tracked. Compare the resulting `result.json` against `section-registry-baseline.json`; the twelve screenshot hashes should match exactly.
- Its screenshots really are reproducible, which is not free on this page: it emulates `prefers-reduced-motion` over CDP, waits for `document.fonts.ready` and every image, then freezes animations and transitions, pauses every video and resets scroll before capturing. Re-running it twice reproduces all twelve baseline hashes exactly. Do not replace it with a plain `--screenshot` call; the banner video, the remote YouTube thumbnails and in-flight framer-motion transforms make a naive capture differ from itself by millions of pixels.
- Known tradeoff: the check restates the twelve sections itself (`scripts/check-section-registry.mjs:30`) rather than importing the registry, so adding a tab touches two files rather than one. That is deliberate. A golden check that imports the thing it checks would pass no matter what the registry said.
- **Heavy media is paid.** All three files moved out of the bundle graph to `public/`, with URLs composed from `import.meta.env.BASE_URL` (`StyleLab.jsx:20-24`, `MusicPlayer.jsx:4-6`) rather than the hardcoded base that would have worked in dev and 404'd on Pages. The 751 KB banner GIF became a 33 KB H.264 MP4 plus a 16 KB WebP still, a 93.5% cut on the one asset every visitor pays for before anything else. `dist/` went 10,116,753 to 9,397,738 bytes. Audio is unchanged in size; moving it was bundle hygiene, not a byte saving, and `preload="metadata"` still means the 8 MB of opus is not fetched on load.
- Banner accessibility and motion behaviour preserved through the format change: `role="img"` plus `aria-label` carries the original `alt` text verbatim, and a `<source media="(prefers-reduced-motion: no-preference)">` means reduced-motion visitors match no source, request no MP4, and get the poster still. Known gap: Firefox 53-119 ignores `media` inside `<video>` and will animate anyway (fixed in Firefox 120).
- **The Lora 900 defect is paid.** `Base.astro:37` no longer requests a weight Google does not serve. Verified zero-pixel: heading screenshots before and after are byte-identical. Font consolidation and the three `@import` sites are untouched and remain open below.
- Mực Lam rebuilt as a ruled-paper list (`ec4e6a5`). Card grid replaced by one saying per ruled line. More importantly it is the first component to do styling the way the rest of the repo should: theme tokens go in as CSS custom properties from `MucLam.jsx:194-211`, all structure lives in a co-located `MucLam.css`, every selector is scoped under `.muc-lam`, and the runtime `<style dangerouslySetInnerHTML>` is gone. Use it as the reference when paying down item 2.
- The framer-motion per-item `<Fade>` wrapper is gone from Mực Lam in favour of a CSS keyframe. One less hydration-time cost, and one less wrapper element between a list and its items.

## Recently paid off (2026-06-11)

- Head metadata (was item 8). `Base.astro` now carries meta description, og:title/description/type/url/locale, og:image with width/height/alt, and `twitter:card summary_large_image`. The card is `public/img/share-card.png` (1200x630, 79 KB), styled to the default Đêm Huyền theme: Lora 900 title, letterspaced tagline chip, soft starfield, roses banner at the bottom. Generator is `scripts/make-share-card.py` (Pillow + `scripts/Lora.ttf`, download URL in its header; the TTF is gitignored). Rerun it after a title or default-theme change. After deploy, run the URL through the Facebook Sharing Debugger once to flush the old scrape.
- 404 page added (`src/pages/404.astro`), self-contained Đêm Huyền styling, links back to the base path. GitHub Pages picks up `404.html` at the project-site root.
- `Base.astro` gained an optional `description` prop (defaults to the site description) and composes absolute URLs from `Astro.site` + `BASE_URL`, so no hardcoded origin anywhere.

## Recently paid off (2026-06-10)

- Tab state now lives in the URL hash. Deep links work (`#dongho`, `#muc_than`, ...), back/forward walk through visited tabs, refresh keeps the active tab.
- `taothao.njk` deleted. TaoThao is a plain React component: state-driven card navigation, no `new Function()`, no `window.__ttCleanup`, no regex parsing. CSS extracted to `src/styles/taothao.css`, data stays in `src/content/taothaoCards.json`.
- `36ke.njk` split into `src/content/36ke.html` and `src/content/36ke.css`. No frontmatter stripping, no regex extraction of style and script blocks.

## Open debt, ranked

### 1. The entire homepage is one eagerly hydrated island

- Partially paid. `src/pages/index.astro:7` still mounts `<StyleLab client:load />`, and StyleLab is still the whole page: banner, nav, sidebar, music player, footer and active tab body. The six bespoke tab bodies are now lazy chunks, so the default route no longer downloads 36 Kế, Tào Tháo, Về tui, Mực Lam, Tủ sách or Cơn Mưa.
- The remaining initial JavaScript is the 198,063-byte StyleLab implementation, its 130-byte Astro wrapper, the unchanged 141,759-byte React runtime and the 1,835-byte Astro hydration client. Much of the visible page is still static text that waits for and then hydrates as React.
- Do not switch the whole island mechanically to `client:visible` or `client:idle`: hash routing is applied after hydration, so a deep link would show the default tab longer before swapping. The remaining fix needs an explicit UX decision, or a larger extraction of the static banner, header and footer with shared page-level theme state.

### 2. Styling lives in JavaScript, not in stylesheets

- Two separate forms of the same problem.
- Inline `style={{...}}` props threaded from the theme object: 49 in `StyleLab.jsx`, 34 in `TuSach.jsx`, 22 in `MuaRoi.jsx`, 20 in `VeTui.jsx`.
- Runtime `<style dangerouslySetInnerHTML>` injection, 7 sites across 7 components: `StyleLab.jsx:346`, `MusicPlayer.jsx:761`, `TaoThao.jsx:225`, `ThirtySixKe.jsx:272`, `TuSach.jsx:372`, `VeTui.jsx:153`, `MuaRoi.jsx:290`. Each rebuilds a CSS string on mount and re-injects it on theme change.
- Partially paid. `MucLam.css` and `MonkeyParadoxExperience.css` are co-located stylesheets, so the target pattern already exists in the repo twice and needs no new tooling.
- Fix: set the theme tokens once as CSS custom properties on the StyleLab root, then convert component by component to a co-located `.css` file with selectors scoped under a component class. `MucLam.jsx` plus `MucLam.css` is the worked example.

### 3. Content is hardcoded inside components

- `postsByStyle` (`StyleLab.jsx:26-126`) holds 9 posts as JS objects. `BOOKS` (`TuSach.jsx:19`) holds the bookshelf. Every new post is a code edit inside a 1,065-line component.
- Partially paid: `monkeyParadoxPost` was extracted to `src/content/monkeyParadox.js` and imported at `StyleLab.jsx:11`, and `taothaoCards.json` already lives in `src/content/`. The pattern is proven, just not applied to the rest.
- Fix: move posts and books to `src/content/` as JSON or data modules, same as the two that already moved. Components keep the layout, data files keep the words.

### 4. Post-level embeds still use ad-hoc dispatch

- Section dispatch is paid by the registry above. Post bodies still use a string compare on `post.experience === "monkey-paradox"` in two places (`StyleLab.jsx:699` and `StyleLab.jsx:825`, keyed off `monkeyParadox.js:38`). `TamMaoVignette` is wired in by hand at `StyleLab.jsx:760`.
- Cost: post-level component selection remains scattered through JSX and still requires a control-flow edit to extend.
- Fix: reuse the registry pattern later through a separate `experience` map keyed by `post.experience`, plus a vignette map if more vignettes appear. Do not put post embeds in the section registry itself; tabs and embeds have different lifecycles and fallback rules.

### 5. Nine font families, eight of them loaded via @import

- Corrected count. Previously recorded as six, and it wrongly listed Lora as an `@import`. Lora loads correctly via `<link>` in `src/layouts/Base.astro:37`.
- The other eight load through three `@import url(...)` sites, each render-blocking when its tab mounts: `MusicPlayer.jsx:43` (Press Start 2P, VT323), `ThirtySixKe.jsx:6` (Noto Serif SC, Noto Serif), `src/styles/taothao.css:1` (Cinzel, Cinzel Decorative, Cormorant Garamond, MedievalSharp).
- The invalid Lora 900 request is already paid off; the remaining debt is the family count, remote loading and duplicated import paths.
- Fix: consolidate to one or two self-hosted Vietnamese-subset fonts loaded once in `Base.astro`, and delete the `@import`s. The Vietnamese subset matters: Georgia, the current fallback, has no precomposed Vietnamese glyphs and decomposes the diacritics if Lora fails.

### 6. 36 Kế is still injected HTML, not a component

- `36ke.html` (723 lines) goes in via `dangerouslySetInnerHTML` at `ThirtySixKe.jsx:273`. Safe (own authored content) and no longer regex-built, but it is invisible to React, and scroll position is measured and patched with timers and resize listeners: `ThirtySixKe.jsx:187`, `:227`, `:251-252`.
- Fix when next touched: port the markup to JSX, or render it from data like the Tào Tháo cards already are.

### 7. plan-sample/DESIGN.md describes a site that was never built

- Verified still wrong on every substantive point. It specifies Tailwind 4.x (repo runs 3.4.17), Markdown/MDX content collections (none exist), multi-page routing (owner decided against it), and "10 visual styles" (there are 12).
- A wrong design doc is worse than none: it is the first file a new contributor opens.
- Fix: delete it. The accurate architecture is now described by this register plus the README.

### 8. No lint, no general test suite, no type checking

- `package.json:6-11` has four scripts: `start`, `dev`, `build`, `preview`. No lint, no test, no `astro check`. No ESLint or test config anywhere in the repo.
- `tsconfig.json` extends `astro/tsconfigs/strict`, but every component is untyped `.jsx`, so nothing is actually checked. A typo'd theme id in `darkRow`/`brightRow` still fails at render, not at build.
- The section-registry regression script paid a narrow coverage gap, but it is not wired into a package script and does not cover general component behaviour.
- Acceptable for a hobby repo, and ranked last for that reason. If it grows: add `astro check` to the build, then ESLint, then promote the registry check into a maintained smoke-test command.

## Verified healthy

Checked on 2026-07-25 and found fine. Recorded so the next audit does not re-litigate them.

- **Deploy pipeline.** `.github/workflows/deploy.yml` is clean: `npm ci`, pinned major action versions, least-privilege permissions, a `pages` concurrency group with `cancel-in-progress`. No changes needed.
- **Hash routing.** The section metadata and compatibility map (`src/config/sections.jsx:42-179`), consumed at `StyleLab.jsx:258-291`, give readable URLs while keeping raw ids and legacy aliases resolvable. This is now isolated from the view component.
- **Head metadata and share card.** Complete in `Base.astro:23-33`, absolute URLs composed from `Astro.site` + `BASE_URL`, no hardcoded origin.
- **`scripts/Lora.ttf`.** Correctly untracked (`git ls-files scripts/` returns only the Python script), ignored via `.gitignore`, and its download URL is documented in the generator header. The regeneration path is reproducible.
- **`public/img/` assets.** All six are 19 KB to 95 KB, book covers already webp. Nothing to reclaim here; the media problem is paid off above.
- **Audio preloading.** `preload="metadata"` at `MusicPlayer.jsx:768` means the 8 MB of opus is not fetched on page load.
- **Tailwind config.** `content` glob covers `astro,html,js,jsx,ts,tsx`; no missed files.
- **Mực Lam.** `MucLam.jsx` + `MucLam.css` are the pattern item 2 should converge on: tokens in, scoped stylesheet, no runtime injection, no palette duplication.

## Document status

- `ARCHITECTURE_REVIEW_TOMORROW.md`: **delete.** It was committed in `657cbf0` as a prompt for a review, not as the review's findings. Its themes-module and section-registry target is now complete, and its remaining concerns are recorded in open items 1, 3 and 4 above with current line references. Its own footer instructs deletion once the restructuring is complete.
- `plan-sample/DESIGN.md`: delete. See item 7.
