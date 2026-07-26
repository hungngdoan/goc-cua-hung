# Tech Debt Register

Last updated: 2026-07-26
Scope: known design debt in this repo, ranked by cost. SEO and multi-page architecture are explicitly out of scope by owner decision (2026-06-10): this site stays a single interactive page.

Every claim below was re-verified against the working tree on 2026-07-26. Items carry file and line references so the next audit can check them rather than trust them.

## Recently paid off (2026-07-26)

- **The 4.4 MB font download on 36 Kế is paid, and it bought a trap. Read the trap bullet before editing `src/content/36ke.html`.** Measured in headless Chrome against the built preview, fresh profile, cold cache: the tab used to pull 72 Google Fonts requests and 4,741,046 bytes; it now pulls 11 requests and 370,454 bytes, a 92.2% cut. Noto Serif SC alone went from 65 partition files and 4,480,953 bytes to 202,598 bytes, and its stylesheet from 94,320 bytes to 1,224.
- Three changes, all in `src/components/react/ThirtySixKe.jsx:34-36`. Noto Serif SC is requested with Google's `text=` parameter listing the exact 145 characters the tab renders (`ThirtySixKe.jsx:25-26`). Noto Serif was deleted: it was named in two font stacks but was never the primary face, and no Noto Serif file was ever fetched. VT323 and Press Start 2P were deleted: `MusicPlayer.jsx:43` already loads both on every route, so 36 Kế was re-requesting files the page already had.
- Cormorant Garamond moved to its own `@import` (`ThirtySixKe.jsx:36`) instead of staying in the same URL. This is not tidiness, it is load-bearing: `text=` applies to the entire css2 request, so sharing one URL with the subsetted Noto Serif SC would subset the Vietnamese body text to those same 145 characters. Do not merge the two imports back together.
- All three weights survived, and that was measured rather than assumed. `CSS.getPlatformFontsForNode` across all 86 Noto Serif SC elements reports three faces in use: Regular on `.ke-hanzi` and `.ke-seal` (139 glyphs), Bold on `.ke-title-cn`, `.ke-chapter-title-cn` and `.ke-index` (85 glyphs), Black on `.ke-chapter-num` (6 glyphs). `.ke-hanzi` asks for weight 500, which CSS resolves down to the 400 face. Dropping to a single weight would have halved the file (31,720 against 64,360 bytes for the CJK-only subset) and visibly lightened the chapter numerals.
- The Arabic digits are in the subset on purpose. `.ke-index` renders "1" through "36" in Noto Serif SC 700 (`src/content/36ke.css:317-330`), so 0-9 have to be present or the row numbers silently drop to a system serif. That is the whole failure mode in miniature, and it was invisible until platform fonts were inspected: 135 CJK characters plus 10 digits, 145 in total.
- **The trap.** `text=` returns a font containing only the listed characters. Add one new Hanzi to `src/content/36ke.html` and it renders in whatever CJK face the reader's machine falls back to. No console error, no 404, no build failure, and it still looks right on any machine whose fallback resembles Noto Serif. Guarded by `scripts/check-36ke-font-subset.mjs`, wired as `npm run check:fonts` and as the first step of `npm run check:sections` (`package.json:11-12`), exiting non-zero on failure. It asserts twice: every CJK codepoint anywhere in `36ke.html`, and every character rendered by any class whose rule names `'Noto Serif SC'`, with that class list read out of `36ke.css` so that styling a new element with the font extends the check automatically. Proven by injection: adding 策 to a `.ke-hanzi` fails both assertions, replacing a `.ke-index` digit with a Roman `I` fails the second alone. `node scripts/check-36ke-font-subset.mjs --print` regenerates the correct value.
- Accepted rendering change, baseline regenerated on review after the difference was inspected and judged invisible. Before regeneration `scripts/section-registry-baseline.json` matched on eleven of twelve tabs; `muc_than` did not. 8,563 of 7,361,280 pixels differ (0.116%), page height is identical, and every Vietnamese element is pixel-identical. Cause: a vertical metrics difference between Google's partitioned Noto Serif SC and its `text=` subset. Glyphs sit roughly 9% of an em higher in the line box, so 3px at the 32px chapter numeral, 1px at the 18.4px hero title and the 16px seal, 0px at 11.5 to 12.5px where it rounds away. Outlines and weights are unchanged: measured ink coverage is within 0.25% everywhere and exactly equal on the numerals, and `.ke-hanzi` (144 glyphs, most of the Chinese on the page) is pixel-identical. The last 236 differing pixels are the border glow of the fixed scroll-control widget. Each variant reproduces its own hash exactly across runs, so this is a real difference and not harness noise. The screenshot was compared side by side at 2x before accepting: the Chinese title renders at the same size, weight and apparent position, so the shift is not perceptible at normal scale. The baseline now reproduces byte-identical on a fresh run.
- Self-hosting stays deferred. Also measured and deliberately not taken: requesting the three weights as three separate `text=` URLs returns three static instances totalling 101,398 bytes, where the single three-weight URL returns one variable file that Chrome fetches once per `@font-face` rule, 202,598 bytes in total. That is a further 101,200 bytes of font for two extra stylesheet requests, and it produces a byte-identical screenshot. It is a judgement call rather than a free win, so it is left open for the owner.

## Recently paid off (2026-07-25)

- **Former item 3, content hardcoded inside components, is paid.** The nine posts now live in the JavaScript data module `src/content/postsByStyle.js:3-103`, the bookshelf lives in `src/content/books.js:1-62`, and the sidebar goals list plus its status words live in `src/content/sidebar.js:5-27`. `StyleLab.jsx` and `TuSach.jsx` import those collections; adding or editing any of the three no longer requires a component, layout or registry edit.
- The goals list was the easy one to miss: it is short, it sits in the layout rather than in a post, and it is edited more often than anything else on the site, since it tracks what the owner is actually doing. Leaving it in a 1,000-line component would have meant item 3 was only three quarters paid.
- JavaScript modules were kept deliberately instead of JSON. The post collection preserves the two `import.meta.env.BASE_URL` expressions byte-for-byte at `src/content/postsByStyle.js:83` and `src/content/postsByStyle.js:90`, while importing `monkeyParadoxPost` into its existing second position at `src/content/postsByStyle.js:1-19`. The component-dispatch keys also remain data, unchanged: `vignette: "tam-mao"` at `src/content/postsByStyle.js:12` and `experience: "monkey-paradox"` at `src/content/monkeyParadox.js:38`.
- Content parity was checked in built previews with a real browser, without text normalization and after waiting for the music duration: all twelve tabs matched both `origin/main` and the immediate pre-refactor branch exactly. The maintained section harness also matched `scripts/section-registry-baseline.json` byte-for-byte, including all twelve screenshot hashes; both BASE_URL post images returned HTTP 200 under `/goc-cua-hung/`.
- **The six bespoke tab bodies no longer ship on the default route.** Their registry components are `React.lazy` imports at `src/config/sections.jsx:8-20`. The production build now emits one named chunk per body: Tào Tháo 67,526 bytes, 36 Kế 58,314, Tủ sách 10,310, Cơn Mưa 7,696, Về tui 6,261 and Mực Lam 6,079, plus a 2,945-byte shared dependency used by Tủ sách and Cơn Mưa.
- The initial StyleLab implementation is 199,054 bytes plus a 130-byte Astro wrapper, down from 354,271 bytes. `Suspense` and transitions retain the revealed body while a lazy chunk loads; `fallback={null}` at `StyleLab.jsx:496` adds no placeholder DOM or temporary layout. `MusicPlayer` and the two post-level embeds remain eager because they are part of the default route, not registry tab bodies.
- Lazy loading moved the cost from first paint to the first click on each bespoke tab, and a transition hides that: measured, clicking a tab changed the URL but left the nav highlight and body untouched until the chunk arrived, so on a slow link the site reads as broken. Two fixes, both cheap. Each registry entry now carries the same loader as a `preload`, fired on `pointerenter`, `pointerdown` and `focus` (`src/config/sections.jsx:8-20`), so intent warms the chunk and the click usually has nothing to wait for. `useTransition`'s `isPending` dims the body and shows a progress cursor for the slow path preloading missed. The pending style is applied only while a transition is in flight, so the settled DOM is unchanged.
- Lazy chunks need an error boundary and now have one (`SectionBoundary`). Without it a chunk that fails to arrive throws during render and React unmounts the entire island: measured, a missing tab chunk collapsed the page from ~80,000 to 6,068 characters, taking the banner, nav, sidebar and the playing audio element with it. This is not a rare case on Pages, where chunk filenames are content-hashed and old files are deleted on deploy, so anyone holding the page open across a deploy requests a file that is already gone. With the boundary the same failure leaves 32,437 characters: everything except the tab body survives, audio keeps playing, and the reader is offered a reload. It is keyed by section id so one failed tab does not poison the next, and it costs 703 bytes.
- **Former item 1, theme and content-section conflation, is paid.** Palette tokens now live alone in `src/config/themes.js:1-578`. The twelve tabs, their stable ids, names, slugs, aliases, icons, rows and component adapters live in one registry at `src/config/sections.jsx:42-179`; the adapters at `src/config/sections.jsx:22-38` also encode whether a bespoke component receives a theme.
- `StyleLab.jsx` consumes the registry for state, hash routing and tab data at `StyleLab.jsx:132-165`. Its former six-way section ternary is now a component lookup at `StyleLab.jsx:497-499`, with the existing generic post list as the null-component fallback. The registry extraction removed 700 lines; subsequent defensive and lazy-loading work plus the content extraction leave the current file at 1,004 lines.
- The dependency-free check in `scripts/check-section-registry.mjs:30-487` is worth keeping, together with `scripts/section-registry-baseline.json`: it covers all twelve bodies, labels, icons, rows, canonical slugs, raw ids, legacy aliases and the no-hash default, then captures a full-page screenshot per tab. It is deliberately not presented as a general test suite.
- Run it with `npm run check:sections`, which builds first because the check serves `dist/`. It writes to `.section-check/`, which is gitignored: one run produces about 11 MB of PNGs and only the baseline in `scripts/` is meant to be tracked. Compare the resulting `result.json` against `section-registry-baseline.json`; the twelve screenshot hashes should match exactly.
- Its screenshots really are reproducible, which is not free on this page: it emulates `prefers-reduced-motion` over CDP, waits for `document.fonts.ready` and every image, then freezes animations and transitions, pauses every video and resets scroll before capturing. Re-running it twice reproduces all twelve baseline hashes exactly. Do not replace it with a plain `--screenshot` call; the banner video, the remote YouTube thumbnails and in-flight framer-motion transforms make a naive capture differ from itself by millions of pixels.
- Known tradeoff: the check restates the twelve sections itself (`scripts/check-section-registry.mjs:30`) rather than importing the registry, so adding a tab touches two files rather than one. That is deliberate. A golden check that imports the thing it checks would pass no matter what the registry said.
- **Heavy media is paid.** All three files moved out of the bundle graph to `public/`, with URLs composed from `import.meta.env.BASE_URL` (`StyleLab.jsx:21-25`, `MusicPlayer.jsx:4-6`) rather than the hardcoded base that would have worked in dev and 404'd on Pages. The 751 KB banner GIF became a 33 KB H.264 MP4 plus a 16 KB WebP still, a 93.5% cut on the one asset every visitor pays for before anything else. `dist/` went 10,116,753 to 9,397,738 bytes. Audio is unchanged in size; moving it was bundle hygiene, not a byte saving, and `preload="metadata"` still means the 8 MB of opus is not fetched on load.
- Banner accessibility and motion behaviour preserved through the format change: `role="img"` plus `aria-label` carries the original `alt` text verbatim, and a `<source media="(prefers-reduced-motion: no-preference)">` means reduced-motion visitors match no source, request no MP4, and get the poster still. Known gap: Firefox 53-119 ignores `media` inside `<video>` and will animate anyway (fixed in Firefox 120).
- **The Lora 900 defect is paid.** `Base.astro:37` no longer requests a weight Google does not serve. Verified zero-pixel: heading screenshots before and after are byte-identical. Font consolidation and self-hosting were untouched here and remain open below; the 36 Kế payload was paid separately on 2026-07-26 above.
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
- The remaining initial JavaScript is the 199,054-byte StyleLab implementation, its 130-byte Astro wrapper, the unchanged 141,759-byte React runtime and the 1,835-byte Astro hydration client. Much of the visible page is still static text that waits for and then hydrates as React.
- Do not switch the whole island mechanically to `client:visible` or `client:idle`: hash routing is applied after hydration, so a deep link would show the default tab longer before swapping. The remaining fix needs an explicit UX decision, or a larger extraction of the static banner, header and footer with shared page-level theme state.

### 2. Styling lives in JavaScript, not in stylesheets

- Two separate forms of the same problem.
- Inline `style={{...}}` props threaded from the theme object: 49 in `StyleLab.jsx`, 34 in `TuSach.jsx`, 22 in `MuaRoi.jsx`, 20 in `VeTui.jsx`.
- Runtime `<style dangerouslySetInnerHTML>` injection, 7 sites across 7 components: `StyleLab.jsx:220`, `MusicPlayer.jsx:761`, `TaoThao.jsx:225`, `ThirtySixKe.jsx:302`, `TuSach.jsx:310`, `VeTui.jsx:153`, `MuaRoi.jsx:290`. Each rebuilds a CSS string on mount and re-injects it on theme change.
- Partially paid. `MucLam.css` and `MonkeyParadoxExperience.css` are co-located stylesheets, so the target pattern already exists in the repo twice and needs no new tooling.
- Fix: set the theme tokens once as CSS custom properties on the StyleLab root, then convert component by component to a co-located `.css` file with selectors scoped under a component class. `MucLam.jsx` plus `MucLam.css` is the worked example.

### 3. Post-level embeds still use ad-hoc dispatch

- Section dispatch is paid by the registry above. Post bodies still use a string compare on `post.experience === "monkey-paradox"` in two places (`StyleLab.jsx:572` and `StyleLab.jsx:698`, keyed off `src/content/monkeyParadox.js:38`). `TamMaoVignette` is wired in by hand at `StyleLab.jsx:633`.
- Cost: post-level component selection remains scattered through JSX and still requires a control-flow edit to extend.
- Fix: reuse the registry pattern later through a separate `experience` map keyed by `post.experience`, plus a vignette map if more vignettes appear. Do not put post embeds in the section registry itself; tabs and embeds have different lifecycles and fallback rules.

### 4. Eight font families, seven of them loaded via @import

- Count corrected twice. It was recorded as six, then as nine with Lora wrongly listed as an `@import`. Lora loads via `<link>` in `src/layouts/Base.astro:37`. Noto Serif was removed on 2026-07-26, leaving eight families.
- The other seven load through three `@import url(...)` sites, each render-blocking when its tab mounts: `MusicPlayer.jsx:43` (Press Start 2P, VT323, on every route), `ThirtySixKe.jsx:35-36` (Noto Serif SC subsetted, Cormorant Garamond), `src/styles/taothao.css:1` (Cinzel, Cinzel Decorative, Cormorant Garamond, MedievalSharp).
- Cormorant Garamond is now requested from two places with different weight sets, so a visitor who opens both 36 Kế and Tào Tháo downloads two overlapping copies.
- `'Noto Serif'` is still named in two font stacks (`src/content/36ke.css:21` and `src/content/36ke.css:123`) but is no longer requested anywhere, so it resolves to Georgia or to a locally installed copy. It was already never fetched, so this is dead text rather than a behaviour change. Delete it the next time that file is touched.
- The invalid Lora 900 request and the 36 Kế payload are paid off. What remains is the family count, remote loading, the duplicated Cormorant request, and `taothao.css` still pulling four unsubsetted families.
- Fix: consolidate to one or two self-hosted Vietnamese-subset fonts loaded once in `Base.astro`, and delete the `@import`s. The Vietnamese subset matters: Georgia, the current fallback, has no precomposed Vietnamese glyphs and decomposes the diacritics if Lora fails.
- When consolidating, do not fold the two 36 Kế imports into one request. `text=` would then subset Cormorant Garamond too and strip every Vietnamese glyph from the tab.

### 5. 36 Kế is still injected HTML, not a component

- `36ke.html` (723 lines) goes in via `dangerouslySetInnerHTML` at `ThirtySixKe.jsx:303`. Safe (own authored content) and no longer regex-built, but it is invisible to React, and scroll position is measured and patched with timers and resize listeners: `ThirtySixKe.jsx:217`, `ThirtySixKe.jsx:257`, `ThirtySixKe.jsx:281-282`.
- Fix when next touched: port the markup to JSX, or render it from data like the Tào Tháo cards already are.

### 6. plan-sample/DESIGN.md describes a site that was never built

- Verified still wrong on every substantive point. It specifies Tailwind 4.x (repo runs 3.4.17), Markdown/MDX content collections (none exist), multi-page routing (owner decided against it), and "10 visual styles" (there are 12).
- A wrong design doc is worse than none: it is the first file a new contributor opens.
- Fix: delete it. The accurate architecture is now described by this register plus the README.

### 7. No lint, no general test suite, no type checking

- `package.json:6-13` has six operational scripts: `start`, `dev`, `build`, `preview`, `check:fonts`, `check:sections`. There is still no lint command, general test command or `astro check`, and no ESLint or test-runner config anywhere in the repo.
- `tsconfig.json` extends `astro/tsconfigs/strict`, but every component is untyped `.jsx`, so nothing is actually checked. A typo'd theme or section id still fails at render, not at build.
- The section-registry regression script is wired into `check:sections` and paid a narrow coverage gap, but it does not cover general component behaviour. `scripts/check-36ke-font-subset.mjs` is likewise a single-purpose guard, not a test suite.
- Acceptable for a hobby repo, and ranked last for that reason. If it grows: add `astro check` to the build, then ESLint, then promote the registry check into a maintained smoke-test command.

## Verified healthy

Checked on 2026-07-25 and found fine. Recorded so the next audit does not re-litigate them.

- **Deploy pipeline.** `.github/workflows/deploy.yml` is clean: `npm ci`, pinned major action versions, least-privilege permissions, a `pages` concurrency group with `cancel-in-progress`. No changes needed.
- **Hash routing.** The section metadata and compatibility map (`src/config/sections.jsx:42-192`), consumed at `StyleLab.jsx:132-165`, give readable URLs while keeping raw ids and legacy aliases resolvable. This is now isolated from the view component.
- **Head metadata and share card.** Complete in `Base.astro:23-33`, absolute URLs composed from `Astro.site` + `BASE_URL`, no hardcoded origin.
- **`scripts/Lora.ttf`.** Correctly untracked (`git ls-files scripts/` returns only the Python script), ignored via `.gitignore`, and its download URL is documented in the generator header. The regeneration path is reproducible.
- **`public/img/` assets.** All six are 19 KB to 95 KB, book covers already webp. Nothing to reclaim here; the media problem is paid off above.
- **Audio preloading.** `preload="metadata"` at `MusicPlayer.jsx:768` means the 8 MB of opus is not fetched on page load.
- **Tailwind config.** `content` glob covers `astro,html,js,jsx,ts,tsx`; no missed files.
- **Mực Lam.** `MucLam.jsx` + `MucLam.css` are the pattern item 2 should converge on: tokens in, scoped stylesheet, no runtime injection, no palette duplication.

## Document status

- `ARCHITECTURE_REVIEW_TOMORROW.md`: **delete.** It was committed in `657cbf0` as a prompt for a review, not as the review's findings. Its themes, section-registry and content-module targets are now complete, and its remaining concerns are recorded in open items 1, 2 and 3 above with current line references. Its own footer instructs deletion once the restructuring is complete.
- `plan-sample/DESIGN.md`: delete. See item 6.
