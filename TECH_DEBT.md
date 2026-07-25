# Tech Debt Register

Last updated: 2026-07-25
Scope: known design debt in this repo, ranked by cost. SEO and multi-page architecture are explicitly out of scope by owner decision (2026-06-10): this site stays a single interactive page.

Every claim below was re-verified against the working tree on 2026-07-25. Items carry file and line references so the next audit can check them rather than trust them.

## Recently paid off (2026-07-25)

- **Item 1, heavy media, is paid.** All three files moved out of the bundle graph to `public/`, with URLs composed from `import.meta.env.BASE_URL` (`StyleLab.jsx:14-18`, `MusicPlayer.jsx:4-6`) rather than the hardcoded base that would have worked in dev and 404'd on Pages. The 751 KB banner GIF became a 33 KB H.264 MP4 plus a 16 KB WebP still, a 93.5% cut on the one asset every visitor pays for before anything else. `dist/` went 10,116,753 to 9,397,738 bytes. Audio is unchanged in size; moving it was bundle hygiene, not a byte saving, and `preload="metadata"` still means the 8 MB of opus is not fetched on load.
- Banner accessibility and motion behaviour preserved through the format change: `role="img"` plus `aria-label` carries the original `alt` text verbatim, and a `<source media="(prefers-reduced-motion: no-preference)">` means reduced-motion visitors match no source, request no MP4, and get the poster still. Known gap: Firefox 53-119 ignores `media` inside `<video>` and will animate anyway (fixed in Firefox 120).
- **Item 7's Lora 900 defect is paid.** `Base.astro:37` no longer requests a weight Google does not serve. Verified zero-pixel: heading screenshots before and after are byte-identical. Font consolidation and the three `@import` sites are untouched and remain open below.
- Mực Lam rebuilt as a ruled-paper list (`ec4e6a5`). Card grid replaced by one saying per ruled line. More importantly it is the first component to do styling the way the rest of the repo should: theme tokens go in as CSS custom properties from `MucLam.jsx:194-206`, all structure lives in a co-located `MucLam.css`, every selector is scoped under `.muc-lam`, and the runtime `<style dangerouslySetInnerHTML>` is gone. Use it as the reference when paying down item 3.
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

### 1. Theme and content section are the same object

- The `styles` array (`StyleLab.jsx:122-739`) is 617 lines, 36% of the file, and conflates a visual palette with a content tab. "Tủ sách" is a bookshelf, "36 Kế" is an article, "Về tui" is an about page, yet each is a ~50-token colour object.
- Ids still do not match names: `giaydo` renders "Mực Lam", `dongho` renders "Tủ sách", `muc_than` renders "36 Kế", `hoian` renders "Tào Tháo", `hong_tram` renders "Về tui" (`StyleLab.jsx:124-689`).
- Correction to the previous entry: ids are **no longer frozen into URLs**. The `hashSlugs` map (`StyleLab.jsx:765-778`) publishes a readable slug per tab, and `hashToStyleId` (`StyleLab.jsx:785-791`) still resolves the raw id and any legacy alias. Renaming an id now costs an `aliases` entry, not a broken link. This item is a maintainability problem only; the URL-compatibility blocker is gone.
- Adding one tab still touches six places: `postsByStyle` (:20), `styles` (:122), `darkRow` (:741), `brightRow` (:749), `hashSlugs` (:765), `styleIcons` (:793), plus the render dispatch in item 5.
- Fix: split into a themes module (palette tokens only) and a section registry `{ id, name, slug, icon, row, component }`. One entry per tab, one file to touch.

### 2. The entire homepage is one eagerly hydrated island

- `src/pages/index.astro:7` mounts `<StyleLab client:load />`, and StyleLab is the whole page: banner, nav, sidebar, music player, footer and every tab body. The build ships `StyleLab.*.js` at 346 KB plus the 138 KB React runtime chunk, all blocking on first load, for a page whose visible content is mostly static text.
- Only the active tab renders, but every tab component is in the same chunk, so reading one proverb downloads the 36 Kế markup, the Tào Tháo cards and the music player.
- Fix, in order of payoff: move to `client:visible` or `client:idle` for below-the-fold islands, render the banner, header and footer as static Astro rather than React, and lazy-import the six tab bodies so a tab costs its own chunk. Comes far more easily once item 1 gives a registry to key the dynamic import on.

### 3. Styling lives in JavaScript, not in stylesheets

- Two separate forms of the same problem.
- Inline `style={{...}}` props threaded from the theme object: 49 in `StyleLab.jsx`, 34 in `TuSach.jsx`, 22 in `MuaRoi.jsx`, 20 in `VeTui.jsx`.
- Runtime `<style dangerouslySetInnerHTML>` injection, 8 sites across 7 components: `StyleLab.jsx:964`, `MusicPlayer.jsx:761`, `TaoThao.jsx:225`, `ThirtySixKe.jsx:272`, `TuSach.jsx:372`, `VeTui.jsx:153`, `MuaRoi.jsx:290`. Each rebuilds a CSS string on mount and re-injects it on theme change.
- Partially paid. `MucLam.css` and `MonkeyParadoxExperience.css` are co-located stylesheets, so the target pattern already exists in the repo twice and needs no new tooling.
- Fix: set the theme tokens once as CSS custom properties on the StyleLab root, then convert component by component to a co-located `.css` file with selectors scoped under a component class. `MucLam.jsx` plus `MucLam.css` is the worked example.

### 4. Content is hardcoded inside components

- `postsByStyle` (`StyleLab.jsx:20-120`) holds 9 posts as JS objects. `BOOKS` (`TuSach.jsx:19`) holds the bookshelf. Every new post is a code edit inside a 1,718-line component.
- Partially paid: `monkeyParadoxPost` was extracted to `src/content/monkeyParadox.js` and imported at `StyleLab.jsx:12`, and `taothaoCards.json` already lives in `src/content/`. The pattern is proven, just not applied to the rest.
- Fix: move posts and books to `src/content/` as JSON or data modules, same as the two that already moved. Components keep the layout, data files keep the words.

### 5. Two ad-hoc dispatch mechanisms choose what renders

- Tab bodies are selected by a six-way ternary chain on `style.id` (`StyleLab.jsx:1231-1245`).
- Post bodies use a second, unrelated mechanism: a string compare on `post.experience === "monkey-paradox"` in two places (`StyleLab.jsx:1320` and `:1446`, keyed off `monkeyParadox.js:38`). `TamMaoVignette` is wired in by hand at `StyleLab.jsx:1381`.
- Cost: two different rules for "what component renders here", neither discoverable from the data, both requiring a JSX edit to extend.
- Fix: one `component` field on the section registry from item 1, and one `experience` map for post-level embeds. Both become data, not control flow.

### 6. Nine font families, eight of them loaded via @import

- Corrected count. Previously recorded as six, and it wrongly listed Lora as an `@import`. Lora loads correctly via `<link>` in `src/layouts/Base.astro:37`.
- The other eight load through three `@import url(...)` sites, each render-blocking when its tab mounts: `MusicPlayer.jsx:43` (Press Start 2P, VT323), `ThirtySixKe.jsx:6` (Noto Serif SC, Noto Serif), `src/styles/taothao.css:1` (Cinzel, Cinzel Decorative, Cormorant Garamond, MedievalSharp).
- Related gap: `Base.astro:37` requests Lora weights 400/700/900, but Google serves no Lora 900 (the family stops at 700), so every `font-black` heading on the site silently resolves to 700. Either drop the 900 request or pick a display face that has it.
- Fix: consolidate to one or two self-hosted Vietnamese-subset fonts loaded once in `Base.astro`, and delete the `@import`s. The Vietnamese subset matters: Georgia, the current fallback, has no precomposed Vietnamese glyphs and decomposes the diacritics if Lora fails.

### 7. 36 Kế is still injected HTML, not a component

- `36ke.html` (723 lines) goes in via `dangerouslySetInnerHTML` at `ThirtySixKe.jsx:273`. Safe (own authored content) and no longer regex-built, but it is invisible to React, and scroll position is measured and patched with timers and resize listeners: `ThirtySixKe.jsx:187`, `:227`, `:251-252`.
- Fix when next touched: port the markup to JSX, or render it from data like the Tào Tháo cards already are.

### 8. plan-sample/DESIGN.md describes a site that was never built

- Verified still wrong on every substantive point. It specifies Tailwind 4.x (repo runs 3.4.17), Markdown/MDX content collections (none exist), multi-page routing (owner decided against it), and "10 visual styles" (there are 12).
- A wrong design doc is worse than none: it is the first file a new contributor opens.
- Fix: delete it. The accurate architecture is now described by this register plus the README.

### 9. No lint, no tests, no type checking

- `package.json:6-11` has four scripts: `start`, `dev`, `build`, `preview`. No lint, no test, no `astro check`. No ESLint or test config anywhere in the repo.
- `tsconfig.json` extends `astro/tsconfigs/strict`, but every component is untyped `.jsx`, so nothing is actually checked. A typo'd theme id in `darkRow`/`brightRow` still fails at render, not at build.
- Acceptable for a hobby repo, and ranked last for that reason. If it grows: add `astro check` to the build, then ESLint, then one smoke test that mounts each tab.

## Verified healthy

Checked on 2026-07-25 and found fine. Recorded so the next audit does not re-litigate them.

- **Deploy pipeline.** `.github/workflows/deploy.yml` is clean: `npm ci`, pinned major action versions, least-privilege permissions, a `pages` concurrency group with `cancel-in-progress`. No changes needed.
- **Hash routing.** `hashSlugs` / `styleIdToHash` / `hashToStyleId` (`StyleLab.jsx:760-785`) give readable URLs while keeping raw ids and legacy aliases resolvable. This is the best-designed part of StyleLab.
- **Head metadata and share card.** Complete in `Base.astro:22-34`, absolute URLs composed from `Astro.site` + `BASE_URL`, no hardcoded origin.
- **`scripts/Lora.ttf`.** Correctly untracked (`git ls-files scripts/` returns only the Python script), ignored via `.gitignore`, and its download URL is documented in the generator header. The regeneration path is reproducible.
- **`public/img/` assets.** All six are 19 KB to 95 KB, book covers already webp. Nothing to reclaim here; the media problem was item 1 and is now paid.
- **Audio preloading.** `preload="metadata"` at `MusicPlayer.jsx:768` means the 8 MB of opus is not fetched on page load.
- **Tailwind config.** `content` glob covers `astro,html,js,jsx,ts,tsx`; no missed files.
- **Mực Lam.** `MucLam.jsx` + `MucLam.css` are the pattern items 4 and 5 should converge on: tokens in, scoped stylesheet, no runtime injection, no palette duplication.

## Document status

- `ARCHITECTURE_REVIEW_TOMORROW.md`: **fold into this register, then delete.** It was committed in `657cbf0` as a prompt for a review, not as the review's findings. That review was never executed: none of its target artifacts exist (no themes module, no section registry), and its analysis is now superseded by items 1, 2, 4 and 5 above, which carry line references it never had. Its own footer instructs deletion once the restructuring is complete; the honest version is to delete it once its asks are recorded here, which this rewrite does.
- `plan-sample/DESIGN.md`: delete. See item 8.
