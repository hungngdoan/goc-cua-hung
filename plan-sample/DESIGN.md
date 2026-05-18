# Goc Cua Hung - Architecture Design

## Overview

A Vietnamese personal blog hosted on GitHub Pages. Static site with interactive theming (10 visual styles), blog posts in Markdown, and zero server cost.

Live URL: `https://hungngdoan.github.io/goc-cua-hung/`

---

## Technology Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Astro 5.x** | Static output, islands architecture, content collections |
| Interactive UI | **React 18** (islands only) | Style lab uses useState + framer-motion; only hydrates where needed |
| Animation | **framer-motion** | Already built into style lab component |
| Styling | **Tailwind CSS 4.x** | Utility-first, matches existing component code |
| Content | **Markdown / MDX** | Blog posts as .md files with frontmatter |
| Deployment | **GitHub Actions** | Free CI/CD, builds and deploys to GitHub Pages on push |
| Hosting | **GitHub Pages** | Free, custom domain support, HTTPS built-in |

---

## Project Structure

```
goc-cua-hung/
  astro.config.mjs          # Astro config (site URL, integrations)
  tailwind.config.mjs        # Tailwind theme extensions
  tsconfig.json
  package.json

  src/
    layouts/
      Base.astro             # HTML shell, <head>, font imports, global styles
      Post.astro             # Blog post layout (title, date, body slot)

    pages/
      index.astro            # Homepage (latest posts, intro)
      style-lab.astro        # Style lab page (React island)
      blog/
        [...slug].astro      # Dynamic route for blog posts
        index.astro          # Blog listing page

    components/
      react/
        StyleLab.jsx         # The 10-theme interactive component (client:load)
        Divider.jsx          # Shared divider sub-component
        WovenStat.jsx        # Stat card sub-component
      astro/
        PostCard.astro       # Blog post preview card
        Nav.astro            # Site navigation
        Footer.astro         # Site footer

    content/
      config.ts              # Content collection schema (zod validation)
      blog/
        hai-mui-ten.md       # Example post
        loi-dan-tuoi-30.md
        tin-vui-thang-tu.md

    styles/
      global.css             # Tailwind directives, font-face, base resets
      themes.ts              # The 10 style token objects (extracted from JSX)

    data/
      nav.ts                 # Navigation items
      quests.ts              # Quest tracker data

  public/
    fonts/                   # Self-hosted Vietnamese-friendly serif fonts
    favicon.svg
    og-image.png             # Open Graph preview image

  .github/
    workflows/
      deploy.yml             # GitHub Actions workflow for Pages deployment

  plan-sample/               # Design artifacts (this file, style lab prototypes)
    DESIGN.md
    vietnamese_blog_style_lab_combined.jsx
    vietnamese_blog_style_lab_combined_direct.html
```

---

## Architecture Decisions

### 1. Islands Architecture (Astro)

Most pages are pure static HTML (blog posts, listing, about). Only the style lab page needs React hydration. Astro's `client:load` directive loads React + framer-motion ONLY on that page. Blog post pages ship zero JavaScript.

```astro
<!-- src/pages/style-lab.astro -->
---
import Base from '../layouts/Base.astro';
import StyleLab from '../components/react/StyleLab.jsx';
---
<Base title="Style Lab">
  <StyleLab client:load />
</Base>
```

### 2. Theme System

The 10 style token objects live in `src/styles/themes.ts` as a single exported array. Each token object contains ~35 CSS values covering every visual property (backgrounds, borders, shadows, text colors, patterns).

For the style lab (interactive): React reads these tokens and applies via inline styles.

For blog pages (static): The active theme is applied server-side via Astro. A cookie or URL param (`?theme=hong_tram`) selects the theme. A minimal vanilla JS snippet (< 1KB, no React) reads the preference and applies CSS variables on page load to avoid flash.

```
Strategy: CSS custom properties for static pages, inline styles for React island.
Both read from the same token source (themes.ts) ensuring consistency.
```

### 3. Content Collections

Blog posts are Markdown files in `src/content/blog/`. Astro validates frontmatter at build time:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.string(),           // "Chuyen muu luoc", "Tu ren", etc.
    seal: z.string(),           // "Muu", "Ren", "Hoc", etc.
    draft: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
```

### 4. Deployment Pipeline

```
Push to main --> GitHub Actions triggers -->
  npm ci --> astro build --> upload dist/ --> deploy to Pages
```

Single workflow file. Build takes ~10-15 seconds for a small blog. No external services needed.

### 5. Font Strategy

Self-host one serif font that renders Vietnamese diacritics well. Candidates:
- **Noto Serif** (Google, excellent Vietnamese support)
- **Lora** (elegant, good Vietnamese)
- **Source Serif Pro** (Adobe, clean)

Subset the font to Vietnamese + Latin characters only (~40KB instead of 200KB+). Load via `@font-face` in global CSS with `font-display: swap`.

### 6. SEO and Social

- Each blog post gets a unique `<title>`, `<meta description>`, and Open Graph tags
- Astro generates these from frontmatter at build time
- RSS feed via `@astrojs/rss` integration
- Sitemap via `@astrojs/sitemap` integration

---

## Phased Implementation

### Phase 1: Foundation (Current Sprint)

- [ ] Initialize Astro project with React + Tailwind integrations
- [ ] Set up GitHub Actions deploy workflow
- [ ] Verify blank site deploys to GitHub Pages successfully
- [ ] Add base layout with Vietnamese serif font
- [ ] Extract theme tokens to `themes.ts`

### Phase 2: Style Lab

- [ ] Port `StyleLab.jsx` into `src/components/react/`
- [ ] Create `/style-lab` page with `client:load` island
- [ ] Verify all 10 themes render correctly in production build
- [ ] Test framer-motion animations work after hydration

### Phase 3: Blog Engine

- [ ] Define content collection schema
- [ ] Create blog post layout (`Post.astro`)
- [ ] Create blog listing page with PostCard components
- [ ] Add 3-5 seed posts from existing content
- [ ] Wire up theme preference (cookie/localStorage) for blog pages

### Phase 4: Polish

- [ ] Navigation component
- [ ] Footer with "Luu but" section
- [ ] RSS feed
- [ ] Sitemap
- [ ] Open Graph images
- [ ] Custom domain setup (optional)
- [ ] 404 page styled with active theme

---

## Key Constraints

1. **Zero cost** - GitHub Pages free tier only. No serverless functions, no database.
2. **Static output** - Every page is pre-rendered HTML. No SSR, no API routes.
3. **Vietnamese first** - Font selection, text rendering, and content must handle Vietnamese diacritics flawlessly.
4. **Theme persistence** - User's chosen theme persists across page navigations via localStorage. Applied before paint to prevent flash of unstyled content (FOUC).
5. **Performance budget** - Blog posts: 0KB JS. Style lab: React + framer-motion (~45KB gzipped). No page exceeds 100KB total transfer.

---

## Risk and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| framer-motion bundle size | Style lab page loads ~30KB extra JS | Acceptable for one page; blog pages ship zero JS |
| Theme FOUC on static pages | Flash of wrong colors on load | Inline blocking script in `<head>` reads localStorage and sets CSS vars before render |
| Vietnamese font rendering | Diacritics misaligned or ugly | Test with Noto Serif Vietnamese subset; fallback to system serif |
| GitHub Pages 404 handling | SPA-style routes break on refresh | Not applicable; Astro generates real HTML files per route |

---

## File Ownership

```
themes.ts        --> Single source of truth for all 10 style palettes
content/blog/    --> Blog posts (Markdown, author-owned)
components/react/ --> Interactive UI (style lab only)
components/astro/ --> Static UI (nav, cards, footer)
layouts/         --> Page shells (Base, Post)
```

---

## Commands Reference

```bash
npm create astro@latest goc-cua-hung    # Scaffold (already done)
npx astro add react                      # Add React integration
npx astro add tailwind                   # Add Tailwind integration
npm install framer-motion                # Animation library
npm run dev                              # Local dev server (localhost:4321)
npm run build                            # Production build to dist/
npm run preview                          # Preview production build locally
```
