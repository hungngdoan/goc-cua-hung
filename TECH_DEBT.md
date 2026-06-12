# Tech Debt Register

Last updated: 2026-06-11
Scope: known design debt in this repo, ranked by cost. SEO and multi-page architecture are explicitly out of scope by owner decision (2026-06-10): this site stays a single interactive page.

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

- The `styles` array in `StyleLab.jsx` conflates two concepts: a visual palette and a content tab. "Tủ sách" is a bookshelf, "36 Kế" is an article, "Về tui" is an about page, yet each is a ~50-token color object.
- Ids no longer match names: `giaydo` renders "Mực Lam", `dongho` renders "Tủ sách", `muc_than` renders "36 Kế", `hoian` renders "Tào Tháo", `hong_tram` renders "Về tui". The ids are frozen into URLs (hash deep links), so renaming later gets harder the longer this waits.
- Adding one tab currently touches five places: the `styles` array, `styleIcons`, `darkRow`/`brightRow`, `postsByStyle`, and the ternary chain in the render.
- Fix: split into `themes.ts` (palette tokens) and a section registry `{ id, name, icon, row, component }`. One entry per tab, one file to touch.

### 2. Content is hardcoded inside components

- Posts live as JS objects at the top of `StyleLab.jsx`. Books live inside `TuSach.jsx`. Every new post is a code edit in a 1,300-line component.
- Fix: move post and book data to JSON or Astro content collections under `src/content/`, same as `taothaoCards.json` already does. Components keep the layout, data files keep the words.

### 3. Inline styles instead of CSS custom properties

- Every themed element gets a `style={{...}}` prop from the theme object. The pattern is already half-adopted (`--strip`, `--glow`).
- Fix: set the ~40 theme tokens once as CSS variables on `<main>`, reference them from classes. Shrinks StyleLab heavily and makes themes usable outside React.

### 4. Six-way ternary chain selects the tab body

- `StyleLab.jsx` renders the active section through nested ternaries on `style.id`.
- Fix: a `sectionComponents` map keyed by id, falling back to the generic post list. Comes free with the registry in item 1.

### 5. 36 Kế is still injected HTML, not a component

- `36ke.html` (723 lines) goes in via `dangerouslySetInnerHTML`. Safe (own authored content) and no longer regex-built, but it is invisible to React, and the scroll-control position is measured and patched with timeouts and resize listeners.
- Fix when next touched: port the markup to JSX or render it from data like the Tào Tháo cards.

### 6. Font loading is scattershot

- Six font families load via `@import` inside component `<style>` tags: Lora (layout), Cinzel, Cinzel Decorative, Cormorant Garamond, MedievalSharp (Tào Tháo), Noto Serif SC, Noto Serif, VT323, Press Start 2P (36 Kế, music player). Each import is render-blocking when its tab mounts.
- Fix: consolidate to one or two self-hosted Vietnamese-subset fonts loaded once in `Base.astro`, per the original DESIGN.md plan.

### 7. Heavy media in the bundle path

- `src/music/manh-ba-2.opus` is 3.7MB and `src/banner_roses.gif` is 752KB, both imported through the bundler. The GIF loads eagerly on every visit.
- Fix: move both to `public/`, set `preload="none"` on the audio element, and convert the GIF to a looping webm (roughly a tenth of the size).

### 8. plan-sample/DESIGN.md describes a site that was never built

- It specifies multi-page routing, content collections, themes.ts, and Tailwind 4.x. None of that matches the repo, and the owner has since decided against the multi-page direction.
- Fix: rewrite it to describe the actual architecture (single island, hash-routed tabs, section registry as target), or delete it. A wrong design doc is worse than none.

### 9. No lint, no tests, no type checking

- `tsconfig.json` exists but all components are untyped `.jsx`. Nothing catches a broken card object or a typo'd theme id before the browser does (a typo in `darkRow`/`brightRow` ids still crashes at render).
- Acceptable for a hobby repo. If it grows: ESLint + a single smoke test that renders each tab.
