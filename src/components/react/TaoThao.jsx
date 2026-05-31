import React, { useEffect, useMemo } from "react";
import taothaoSource from "../../content/taothao.njk?raw";
import taothaoCards from "../../content/taothaoCards.json";

const fontsImport =
  '@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=MedievalSharp&display=swap");';

const integrationGuards = `
  .taothao-page {
    min-width: 0;
  }

  .taothao-page .tt-wrapper,
  .taothao-page .tt-stage,
  .taothao-page .tt-controls {
    box-sizing: border-box;
  }

  @media (max-width: 520px) {
    .taothao-page .tt-wrapper {
      --tt-card-w: min(100%, 85vw, 340px);
    }
  }
`;

function parseTaoThaoSource(source) {
  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);
  const scriptMatches = [...source.matchAll(/<script(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)];

  return {
    styles: styleMatch ? `${fontsImport}\n${styleMatch[1]}\n${integrationGuards}` : `${fontsImport}\n${integrationGuards}`,
    script: scriptMatches.at(-1)?.[1] || ""
  };
}

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

export default function TaoThao() {
  const { styles, script } = useMemo(() => parseTaoThaoSource(taothaoSource), []);
  const firstCard = taothaoCards[0];
  const [firstShape, secondShape] = firstCard.artShapes;
  const cardsJson = JSON.stringify(taothaoCards).replace(/</g, "\\u003c");

  useEffect(() => {
    if (!script) return undefined;

    const runTaoThaoScript = new Function(script);
    runTaoThaoScript();

    return () => {
      if (window.__ttCleanup) {
        window.__ttCleanup();
        window.__ttCleanup = null;
      }
    };
  }, [script]);

  return (
    <section className="taothao-page">
      <style>{styles}</style>

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
          <div className="tt-subtitle">Binh Pháp & Xử Thế</div>
        </header>

        <div id="ttLiveStatus" className="tt-sr-only" aria-live="polite" aria-atomic="true" />

        <div className="tt-stage">
          <button className="tt-arrow-btn" id="ttArrowLeft" aria-label="Thẻ trước" title="Thẻ trước">
            &#9664;
          </button>

          <div className="tt-card-area" id="ttCardArea">
            <div className="tt-deck-layer" aria-hidden="true" />
            <div className="tt-deck-layer" aria-hidden="true" />
            <div className="tt-deck-layer" aria-hidden="true" />

            <div
              className="tt-card-flipper"
              id="ttCardFlipper"
              role="button"
              tabIndex={0}
              aria-label={`${firstCard.name}. Nhấn để lật thẻ.`}
            >
              <div className="tt-card-face tt-card-front" id="ttCardFront" aria-hidden="false">
                <div className="tt-card-inner-border" aria-hidden="true" />
                <div className="tt-gem tt-gem-tl" aria-hidden="true">
                  <div className="tt-gem-bg" id="ttGemBg0" />
                  <span className="tt-gem-num" id="ttGemNum0">1</span>
                </div>
                <div className="tt-gem tt-gem-tr" aria-hidden="true">
                  <div className="tt-gem-bg" id="ttGemBg1" />
                  <span className="tt-gem-num" id="ttGemNum1">1</span>
                </div>

                <div className="tt-card-art" aria-hidden="true">
                  <div className="tt-card-art-inner">
                    <div className="tt-art-gradient" id="ttArtGradient" style={artStyle(firstCard)} />
                    <div className="tt-art-shape" id="ttArtShape1" style={shapeStyle(firstShape)} />
                    <div className="tt-art-shape" id="ttArtShape2" style={shapeStyle(secondShape)} />
                    <div className="tt-art-rune" id="ttArtRune">{firstCard.rune}</div>
                    <div className="tt-art-vignette" />
                  </div>
                </div>

                <div className="tt-text-box">
                  <div className="tt-flavor-text" id="ttFlavorText">{firstCard.flavor}</div>
                </div>

                <div className="tt-nameplate">
                  <div className="tt-card-name" id="ttCardName">{firstCard.name}</div>
                </div>
                <div className="tt-type-line" id="ttTypeLine">{firstCard.type}</div>

                <div className="tt-gem tt-gem-bl" aria-hidden="true">
                  <div className="tt-gem-bg" id="ttGemBg2" />
                  <span className="tt-gem-num" id="ttGemNum2">1</span>
                </div>
                <div className="tt-gem tt-gem-br" aria-hidden="true">
                  <div className="tt-gem-bg" id="ttGemBg3" />
                  <span className="tt-gem-num" id="ttGemNum3">1</span>
                </div>
                <div className="tt-set-symbol" id="ttSetSymbol">{firstCard.set}</div>
              </div>

              <div className="tt-card-face tt-card-back" id="ttCardBack" aria-hidden="true">
                <div className="tt-back-border-pattern" aria-hidden="true" />
                <div className="tt-back-corner tt-tl" aria-hidden="true" />
                <div className="tt-back-corner tt-tr" aria-hidden="true" />
                <div className="tt-back-corner tt-bl" aria-hidden="true" />
                <div className="tt-back-corner tt-br" aria-hidden="true" />
                <div className="tt-card-back-content">
                  <div className="tt-back-label">Giải Nghĩa</div>
                  <div className="tt-back-quote" id="ttBackQuote">{firstCard.flavor}</div>
                  <div className="tt-back-explanation" id="ttBackExplanation">{firstCard.ability}</div>
                  <div className="tt-back-ornament" aria-hidden="true">
                    <span className="tt-back-symbol">T</span>
                  </div>
                  <div className="tt-back-card-name" id="ttBackCardName">{firstCard.name}</div>
                </div>
              </div>
            </div>
          </div>

          <button className="tt-arrow-btn" id="ttArrowRight" aria-label="Thẻ sau" title="Thẻ sau">
            &#9654;
          </button>
        </div>

        <nav className="tt-controls" aria-label="Điều hướng thẻ">
          <div className="tt-card-status" id="ttCardStatus">Thẻ 1 / {taothaoCards.length}</div>

          <div className="tt-btn-row">
            <button className="tt-ctrl-btn" id="ttBtnPrev" aria-label="Thẻ trước">&#9664; Trước</button>
            <button className="tt-ctrl-btn tt-flip-btn" id="ttBtnFlip" aria-label="Lật thẻ">Lật Thẻ</button>
            <button className="tt-ctrl-btn" id="ttBtnNext" aria-label="Thẻ sau">Sau &#9654;</button>
          </div>

          <div className="tt-thumb-row" id="ttThumbRow" role="tablist" aria-label="Thu nhỏ thẻ">
            {taothaoCards.map((card, index) => (
              <button
                className={`tt-thumb${index === 0 ? " active" : ""}`}
                key={card.name}
                role="tab"
                aria-selected={index === 0 ? "true" : "false"}
                aria-label={`${card.name}, thẻ ${index + 1}`}
                tabIndex={index === 0 ? 0 : -1}
                data-index={index}
              >
                <div className="tt-thumb-art" style={artStyle(card)} />
                <div className="tt-thumb-label">{card.name}</div>
                <div className="tt-thumb-index">{index + 1}</div>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <script
        type="application/json"
        id="ttCardData"
        dangerouslySetInnerHTML={{ __html: cardsJson }}
      />
    </section>
  );
}
