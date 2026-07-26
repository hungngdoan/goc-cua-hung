import React, { useEffect, useMemo, useRef, useState } from "react";
import thirtySixKeHtml from "../../content/36ke.html?raw";
import thirtySixKeCss from "../../content/36ke.css?raw";

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ READ THIS BEFORE ADDING A CHINESE CHARACTER TO src/content/36ke.html.     │
// │                                                                          │
// │ Noto Serif SC is requested with Google Fonts' `text=` parameter, so the   │
// │ file we get back contains ONLY the characters listed below. That is what  │
// │ makes this tab cost ~67 KB of font instead of ~4.4 MB.                    │
// │                                                                          │
// │ The trap: a character that is not in this list is NOT rendered in Noto    │
// │ Serif SC. It silently falls back to whatever CJK face the reader's system │
// │ happens to have. No console error, no build error, no 404. It just looks  │
// │ wrong, and only on machines whose fallback differs from yours.            │
// │                                                                          │
// │ So this list is not decoration. Whenever 36ke.html changes, run           │
// │   npm run check:fonts                                                     │
// │ which fails loudly if any rendered character is missing, and              │
// │   node scripts/check-36ke-font-subset.mjs --print                         │
// │ to regenerate the correct value. `npm run check:sections` runs the guard  │
// │ too. Digits belong here as well: .ke-index renders "1".."36" in this      │
// │ font, so 0-9 are part of the subset.                                     │
// └──────────────────────────────────────────────────────────────────────────┘
const notoSerifScSubset =
  "0123456789三上不並中主交人代以伍伐倉借假偷僵六兵刀劫勝勞十參反圍城壹天客屋屍山岸底引待戰手打抽拋指捉換摸擊擒攻故救敗敵暗有李東柱桃桑梁梯槐樹欲殺殼水海混渡火為無牽玉王環生痴癲瞞磚空笑縱罵羊美聲肆肉脫花苦草薪藏虎虢蛇蟬裡西觀計調貳賊走趁趙近連逸過道遠還金釜門開間關陳陸隔離順驚魂魏魚";

// Two requests, deliberately. `text=` applies to the whole css2 request, so
// Cormorant Garamond must not share a URL with the subsetted Noto Serif SC or
// the Vietnamese body text would be subsetted to these 145 characters too.
// Noto Serif was dropped: it was declared but never the primary face anywhere,
// so no Noto Serif file was ever fetched. VT323 and Press Start 2P were dropped:
// MusicPlayer already loads both on every route.
const fontsImport =
  `@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap&text=${encodeURIComponent(notoSerifScSubset)}");\n` +
  '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap");';

const migrationGuards = `
  .thirty-six-ke-page .ke-dragon,
  .thirty-six-ke-page .ke-footer-dragon {
    max-width: none;
  }

  .thirty-six-ke-page .ke-dragon {
    opacity: 0.52;
    filter:
      saturate(1.28)
      brightness(1.18)
      contrast(1.18)
      drop-shadow(0 0 28px rgba(42, 110, 110, 0.46))
      drop-shadow(0 0 54px rgba(201, 168, 76, 0.18));
  }

  .thirty-six-ke-page .ke-hero-overlay {
    background:
      radial-gradient(ellipse at 50% 30%, rgba(8, 8, 16, 0.06) 0%, rgba(8, 8, 16, 0.22) 36%, rgba(8, 8, 16, 0.66) 76%, var(--ke-bg) 100%),
      linear-gradient(180deg, rgba(8, 8, 16, 0.12) 0%, rgba(8, 8, 16, 0.38) 56%, var(--ke-bg) 100%);
  }

  .thirty-six-ke-page .ke-hero-glow {
    opacity: 0.95;
    mix-blend-mode: screen;
    background:
      radial-gradient(ellipse at 45% 35%, rgba(42, 110, 110, 0.22) 0%, transparent 52%),
      radial-gradient(ellipse at 54% 28%, rgba(201, 168, 76, 0.13) 0%, transparent 44%),
      radial-gradient(ellipse at 55% 72%, rgba(194, 58, 46, 0.12) 0%, transparent 54%);
  }

  .thirty-six-ke-page .ke-hero-content {
    transform: translateY(34px);
  }

  @keyframes keDragonPulse {
    0%, 100% {
      opacity: 0.48;
      filter:
        saturate(1.22)
        brightness(1.12)
        contrast(1.14)
        drop-shadow(0 0 22px rgba(42, 110, 110, 0.38))
        drop-shadow(0 0 42px rgba(201, 168, 76, 0.14));
    }
    50% {
      opacity: 0.64;
      filter:
        saturate(1.42)
        brightness(1.25)
        contrast(1.2)
        drop-shadow(0 0 34px rgba(42, 110, 110, 0.58))
        drop-shadow(0 0 68px rgba(201, 168, 76, 0.24));
    }
  }

  @media (max-width: 740px) {
    .thirty-six-ke-page .ke-dragon {
      opacity: 0.44;
    }

    .thirty-six-ke-page .ke-hero-content {
      transform: translateY(22px);
    }
  }

  .ke-scroll-controls {
    --ke-scroll-size: 44px;
    --ke-scroll-outside-gap: 28px;
    --ke-gold: #c9a84c;
    --ke-red: #c23a2e;
    --ke-teal: #2a6e6e;
    position: fixed;
    /* The right offset is set inline from JS: the content column is offset by
       the left sidebar, so its right edge is measured at runtime and the
       controls are pinned just outside it. This value is only a fallback. */
    right: 16px;
    bottom: calc(env(safe-area-inset-bottom) + 40px);
    z-index: 80;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
  }

  .ke-scroll-button {
    display: grid;
    place-items: center;
    width: var(--ke-scroll-size);
    height: var(--ke-scroll-size);
    padding: 0;
    border: 1px solid var(--ke-gold);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(24, 24, 34, 0.96), rgba(8, 8, 16, 0.96));
    color: var(--ke-gold);
    font-family: 'Noto Serif SC', serif;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    opacity: 1;
    pointer-events: auto;
    box-shadow:
      0 0 16px rgba(201, 168, 76, 0.22),
      inset 0 0 14px rgba(42, 110, 110, 0.12);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .ke-scroll-button:disabled {
    cursor: default;
    opacity: 0.28;
    pointer-events: none;
    box-shadow: inset 0 0 10px rgba(201, 168, 76, 0.06);
  }

  .ke-scroll-button:not(:disabled):hover,
  .ke-scroll-button:not(:disabled):focus-visible {
    color: var(--ke-red);
    border-color: var(--ke-red);
    transform: translateY(-1px);
    box-shadow:
      0 0 18px rgba(194, 58, 46, 0.42),
      inset 0 0 14px rgba(201, 168, 76, 0.12);
    outline: none;
  }

  @media (max-width: 800px) {
    .ke-scroll-controls {
      --ke-scroll-size: 40px;
      right: calc(env(safe-area-inset-right) + 12px);
      bottom: calc(env(safe-area-inset-bottom) + 24px);
      gap: 6px;
    }

    .ke-scroll-button {
      font-size: 16px;
    }
  }
`;

function parseThirtySixKe() {
  const styles = `${fontsImport}\n${thirtySixKeCss}\n${migrationGuards}`;
  const assetBase = import.meta.env.BASE_URL || "/";
  const dragonSrc = `${assetBase.replace(/\/$/, "")}/img/chineseDragon1.jpg`;
  const html = thirtySixKeHtml
    .replaceAll('src="img/chineseDragon1.jpg"', `src="${dragonSrc}"`)
    .trim();

  return { html, styles };
}

export default function ThirtySixKe() {
  const containerRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canTop: false, canBottom: false });
  const [controlsRight, setControlsRight] = useState(16);
  const { html, styles } = useMemo(() => parseThirtySixKe(), []);

  useEffect(() => {
    const root = containerRef.current?.querySelector(".ke-shell");
    if (!root) return undefined;

    const rows = Array.from(root.querySelectorAll(".ke-row"));
    const cleanups = rows.flatMap((row) => {
      const handleClick = (event) => {
        if (event.target.closest(".ke-summary")) return;
        if (row.open) row.open = false;
      };

      const handleToggle = () => {
        if (!row.open) return;

        rows.forEach((other) => {
          if (other !== row) other.open = false;
        });

        window.setTimeout(() => {
          row.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      };

      row.addEventListener("click", handleClick);
      row.addEventListener("toggle", handleToggle);

      return [
        () => row.removeEventListener("click", handleClick),
        () => row.removeEventListener("toggle", handleToggle)
      ];
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [html]);

  useEffect(() => {
    const edgeOffset = 32;

    const getScrollMax = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const updateScrollState = () => {
      const scrollMax = getScrollMax();
      const activeEdgeOffset = Math.min(edgeOffset, Math.max(1, Math.floor(scrollMax / 2)));
      const nextState = {
        canTop: scrollMax > 0 && window.scrollY > activeEdgeOffset,
        canBottom: scrollMax > 0 && window.scrollY < scrollMax - activeEdgeOffset
      };

      setScrollState((currentState) =>
        currentState.canTop === nextState.canTop && currentState.canBottom === nextState.canBottom
          ? currentState
          : nextState
      );
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  // Pin the scroll controls just to the right of the 36 Kế content column.
  // That column sits in a grid cell offset by the left sidebar, so a static
  // viewport offset can't track its right edge -- measure it and re-measure
  // on resize, then clamp to the viewport edge when the margin runs out.
  useEffect(() => {
    const measure = () => {
      const content = containerRef.current;
      if (!content) return;
      const contentRight = content.getBoundingClientRect().right;
      const buttonWidth = window.matchMedia("(max-width: 800px)").matches ? 40 : 44;
      const gap = 28;
      setControlsRight(Math.max(8, window.innerWidth - contentRight - gap - buttonWidth));
    };

    measure();
    window.addEventListener("resize", measure);
    const timer = window.setTimeout(measure, 300);

    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, [html]);

  const scrollToEdge = (edge) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = edge === "top" ? 0 : Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div ref={containerRef} className="thirty-six-ke-page" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="ke-scroll-controls" style={{ right: `${controlsRight}px` }} aria-label="Page scroll controls">
        <button
          type="button"
          className="ke-scroll-button"
          aria-label="Back to top"
          aria-disabled={!scrollState.canTop}
          disabled={!scrollState.canTop}
          title="Back to top"
          onClick={() => scrollToEdge("top")}
        >
          {"\u25B2"}
        </button>
        <button
          type="button"
          className="ke-scroll-button"
          aria-label="Go to bottom"
          aria-disabled={!scrollState.canBottom}
          disabled={!scrollState.canBottom}
          title="Go to bottom"
          onClick={() => scrollToEdge("bottom")}
        >
          {"\u25BC"}
        </button>
      </div>
    </>
  );
}
