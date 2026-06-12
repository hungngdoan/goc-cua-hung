import React, { useEffect, useRef, useState } from "react";
import taothaoStyles from "../../styles/taothao.css?raw";
import taothaoCards from "../../content/taothaoCards.json";

// Gem colours cycle with the card index, one entry per card position.
// Copied verbatim from the legacy taothao script so every card keeps the
// exact gem it had before the port.
const GEM_COLORS = [
  { inner: "#b8172c", outer: "#6b0f1a", glow: "rgba(184, 23, 44, 0.5)" },
  { inner: "#22c55e", outer: "#116330", glow: "rgba(34, 197, 94, 0.5)" },
  { inner: "#ff9f1c", outer: "#b36a00", glow: "rgba(255, 159, 28, 0.5)" },
  { inner: "#3a86ff", outer: "#1a4499", glow: "rgba(58, 134, 255, 0.5)" },
  { inner: "#ff69b4", outer: "#9f2a6b", glow: "rgba(255, 105, 180, 0.5)" },
  { inner: "#2af5d0", outer: "#0e7a66", glow: "rgba(42, 245, 208, 0.5)" },
  { inner: "#c9a23c", outer: "#8a6e24", glow: "rgba(201, 162, 60, 0.5)" },
  { inner: "#6a4bc3", outer: "#3a2570", glow: "rgba(106, 75, 195, 0.5)" },
  { inner: "#00ffff", outer: "#008899", glow: "rgba(0, 255, 255, 0.5)" },
  { inner: "#ff4f9f", outer: "#991b55", glow: "rgba(255, 79, 159, 0.5)" },
  { inner: "#ff8ac7", outer: "#a83272", glow: "rgba(255, 138, 199, 0.5)" },
  { inner: "#ff00cc", outer: "#8f0072", glow: "rgba(255, 0, 204, 0.5)" },
  { inner: "#d946ef", outer: "#7e1f8f", glow: "rgba(217, 70, 239, 0.5)" },
  { inner: "#7fff00", outer: "#3f8f00", glow: "rgba(127, 255, 0, 0.5)" },
  { inner: "#00ccff", outer: "#006d99", glow: "rgba(0, 204, 255, 0.5)" },
  { inner: "#e0d0ff", outer: "#8270b0", glow: "rgba(224, 208, 255, 0.5)" },
  { inner: "#9988bb", outer: "#51466f", glow: "rgba(153, 136, 187, 0.5)" },
  { inner: "#ff0000", outer: "#970000", glow: "rgba(255, 0, 0, 0.5)" },
  { inner: "#dc2626", outer: "#7f1010", glow: "rgba(220, 38, 38, 0.5)" },
  { inner: "#ff5c5c", outer: "#9e1f1f", glow: "rgba(255, 92, 92, 0.5)" },
  { inner: "#ffd700", outer: "#9a7b00", glow: "rgba(255, 215, 0, 0.5)" },
  { inner: "#ffff00", outer: "#8f8f00", glow: "rgba(255, 255, 0, 0.5)" },
  { inner: "#00ff00", outer: "#008a00", glow: "rgba(0, 255, 0, 0.5)" },
  { inner: "#49c6e5", outer: "#17667d", glow: "rgba(73, 198, 229, 0.5)" },
  { inner: "#0088ff", outer: "#004a96", glow: "rgba(0, 136, 255, 0.5)" },
  { inner: "#4f46e5", outer: "#27216f", glow: "rgba(79, 70, 229, 0.5)" },
  { inner: "#8800ff", outer: "#4d008f", glow: "rgba(136, 0, 255, 0.5)" },
  { inner: "#beaaff", outer: "#6750a4", glow: "rgba(190, 170, 255, 0.5)" },
  { inner: "#f5f7ff", outer: "#7c849f", glow: "rgba(245, 247, 255, 0.5)" },
  { inner: "#be123c", outer: "#6e0a22", glow: "rgba(190, 18, 60, 0.5)" },
  { inner: "#34d399", outer: "#167d56", glow: "rgba(52, 211, 153, 0.5)" },
  { inner: "#93c5fd", outer: "#3b5f96", glow: "rgba(147, 197, 253, 0.5)" }
];

const SWIPE_THRESHOLD = 40;
const SWIPE_MAX_TIME = 400;

function shapeStyle(shape) {
  return {
    background: shape.bg,
    width: `${shape.w}px`,
    height: `${shape.h}px`,
    left: shape.x,
    top: shape.y
  };
}

function artStyle(card) {
  return {
    background: `linear-gradient(145deg, ${card.artColors.join(", ")})`
  };
}

function gemBgStyle(gem) {
  return {
    background: `radial-gradient(circle, ${gem.inner} 30%, ${gem.outer} 70%, #8a6e24 100%)`,
    boxShadow: `0 0 12px ${gem.glow}, inset 0 -2px 4px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15)`
  };
}

export default function TaoThao() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [liveText, setLiveText] = useState(
    `${taothaoCards[0].name}. Thẻ 1 / ${taothaoCards.length}`
  );
  const cardAreaRef = useRef(null);
  const transitionTimer = useRef(null);

  const card = taothaoCards[index];
  const gem = GEM_COLORS[index % GEM_COLORS.length];
  const [firstShape, secondShape] = card.artShapes;
  const statusText = `Thẻ ${index + 1} / ${taothaoCards.length}`;

  const goTo = (next) => {
    let target = next;
    if (target < 0) target = taothaoCards.length - 1;
    if (target >= taothaoCards.length) target = 0;

    setIndex(target);
    setFlipped(false);
    setLiveText(`${taothaoCards[target].name}. Thẻ ${target + 1} / ${taothaoCards.length}`);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTransitioning(true);
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => setTransitioning(false), 350);
    }
  };

  const flipCard = () => {
    const next = !flipped;
    setFlipped(next);
    setLiveText(next ? "Đã lật mặt sau." : `Mặt trước. ${card.name}`);
  };

  const handleFlipperKeydown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard();
    }
  };

  // Arrow keys navigate from anywhere on the page; swipes navigate on the
  // card area. Touchend must be non-passive so preventDefault can stop the
  // synthetic click that would otherwise flip the card after a swipe.
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };
    document.addEventListener("keydown", handleKeydown);

    const cardArea = cardAreaRef.current;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
    };
    const onTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Date.now() - touchStartTime > SWIPE_MAX_TIME) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (Math.abs(dy) > Math.abs(dx)) return;
      event.preventDefault();
      goTo(dx < 0 ? index + 1 : index - 1);
    };

    cardArea?.addEventListener("touchstart", onTouchStart, { passive: true });
    cardArea?.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      cardArea?.removeEventListener("touchstart", onTouchStart);
      cardArea?.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, flipped]);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  return (
    <section className="taothao-page">
      <style dangerouslySetInnerHTML={{ __html: taothaoStyles }} />

      <div className="tt-wrapper">
        <div className="tt-atmosphere" aria-hidden="true">
          <div className="tt-bg-gradient" />
          <div className="tt-bg-stars" />
          <div className="tt-rune-circle" />
          <div className="tt-rune-circle" />
          <div className="tt-rune-circle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
          <div className="tt-particle" />
        </div>

        <header className="tt-header">
          <h2>Tào Tháo</h2>
          <div className="tt-subtitle">Binh Pháp &amp; Xử Thế</div>
        </header>

        <div className="tt-sr-only" aria-live="polite" aria-atomic="true">{liveText}</div>

        <div className="tt-stage">
          <button
            className="tt-arrow-btn"
            id="ttArrowLeft"
            aria-label="Thẻ trước"
            title="Thẻ trước"
            onClick={() => goTo(index - 1)}
          >
            &#9664;
          </button>

          <div className="tt-card-area" ref={cardAreaRef}>
            <div className="tt-deck-layer" aria-hidden="true" />
            <div className="tt-deck-layer" aria-hidden="true" />
            <div className="tt-deck-layer" aria-hidden="true" />

            <div
              className={`tt-card-flipper${flipped ? " flipped" : ""}${transitioning ? " transitioning" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`${card.name}. Nhấn để lật thẻ.`}
              onClick={flipCard}
              onKeyDown={handleFlipperKeydown}
            >
              <div className="tt-card-face tt-card-front" aria-hidden={flipped ? "true" : "false"}>
                <div className="tt-card-inner-border" aria-hidden="true" />
                <div className="tt-gem tt-gem-tl" aria-hidden="true">
                  <div className="tt-gem-bg" style={gemBgStyle(gem)} />
                  <span className="tt-gem-num">{index + 1}</span>
                </div>
                <div className="tt-gem tt-gem-tr" aria-hidden="true">
                  <div className="tt-gem-bg" style={gemBgStyle(gem)} />
                  <span className="tt-gem-num">{index + 1}</span>
                </div>

                <div className="tt-card-art" aria-hidden="true">
                  <div className="tt-card-art-inner">
                    <div className="tt-art-gradient" style={artStyle(card)} />
                    <div className="tt-art-shape" style={shapeStyle(firstShape)} />
                    <div className="tt-art-shape" style={shapeStyle(secondShape)} />
                    <div className="tt-art-rune">{card.rune}</div>
                    <div className="tt-art-vignette" />
                  </div>
                </div>

                <div className="tt-text-box">
                  <div className="tt-flavor-text">{card.flavor}</div>
                </div>

                <div className="tt-nameplate">
                  <div className="tt-card-name">{card.name}</div>
                </div>
                <div className="tt-type-line">{card.type}</div>

                <div className="tt-gem tt-gem-bl" aria-hidden="true">
                  <div className="tt-gem-bg" style={gemBgStyle(gem)} />
                  <span className="tt-gem-num">{index + 1}</span>
                </div>
                <div className="tt-gem tt-gem-br" aria-hidden="true">
                  <div className="tt-gem-bg" style={gemBgStyle(gem)} />
                  <span className="tt-gem-num">{index + 1}</span>
                </div>
                <div className="tt-set-symbol">{card.set}</div>
              </div>

              <div className="tt-card-face tt-card-back" aria-hidden={flipped ? "false" : "true"}>
                <div className="tt-back-border-pattern" aria-hidden="true" />
                <div className="tt-back-corner tt-tl" aria-hidden="true" />
                <div className="tt-back-corner tt-tr" aria-hidden="true" />
                <div className="tt-back-corner tt-bl" aria-hidden="true" />
                <div className="tt-back-corner tt-br" aria-hidden="true" />
                <div className="tt-card-back-content">
                  <div className="tt-back-label">Giải Nghĩa</div>
                  <div className="tt-back-quote">{card.flavor}</div>
                  <div className="tt-back-explanation">{card.ability}</div>
                  <div className="tt-back-ornament" aria-hidden="true">
                    <span className="tt-back-symbol">T</span>
                  </div>
                  <div className="tt-back-card-name">{card.name}</div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="tt-arrow-btn"
            id="ttArrowRight"
            aria-label="Thẻ sau"
            title="Thẻ sau"
            onClick={() => goTo(index + 1)}
          >
            &#9654;
          </button>
        </div>

        <nav className="tt-controls" aria-label="Điều hướng thẻ">
          <div className="tt-card-status">{statusText}</div>

          <div className="tt-btn-row">
            <button className="tt-ctrl-btn" aria-label="Thẻ trước" onClick={() => goTo(index - 1)}>
              &#9664; Trước
            </button>
            <button className="tt-ctrl-btn tt-flip-btn" aria-label="Lật thẻ" onClick={flipCard}>
              Lật Thẻ
            </button>
            <button className="tt-ctrl-btn" aria-label="Thẻ sau" onClick={() => goTo(index + 1)}>
              Sau &#9654;
            </button>
          </div>

          <div className="tt-thumb-row" role="tablist" aria-label="Thu nhỏ thẻ">
            {taothaoCards.map((thumbCard, thumbIndex) => (
              <button
                className={`tt-thumb${thumbIndex === index ? " active" : ""}`}
                key={thumbCard.name}
                role="tab"
                aria-selected={thumbIndex === index ? "true" : "false"}
                aria-label={`${thumbCard.name}, thẻ ${thumbIndex + 1}`}
                tabIndex={thumbIndex === index ? 0 : -1}
                onClick={() => goTo(thumbIndex)}
              >
                <div className="tt-thumb-art" style={artStyle(thumbCard)} />
                <div className="tt-thumb-label">{thumbCard.name}</div>
                <div className="tt-thumb-index">{thumbIndex + 1}</div>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
