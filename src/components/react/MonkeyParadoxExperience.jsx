import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  MONKEY_PARADOX_TITLE,
  monkeyParadoxScenes
} from "../../content/monkeyParadox.js";
import "./MonkeyParadoxExperience.css";

const LAST_SCENE_INDEX = monkeyParadoxScenes.length - 1;
const DEFAULT_NEON = { color: "#00FFFF", rgb: "0, 255, 255" };
const SCENE_NEON = {
  "single-key": DEFAULT_NEON,
  "two-keys": DEFAULT_NEON,
  million: { color: "#FF69B4", rgb: "255, 105, 180" },
  distinction: { color: "#FF69B4", rgb: "255, 105, 180" },
  attempts: { color: "#7FFF00", rgb: "127, 255, 0" },
  typewriters: { color: "#FFD700", rgb: "255, 215, 0" },
  folio: { color: "#FFD700", rgb: "255, 215, 0" },
  "without-intent": { color: "#BEAAFF", rgb: "190, 170, 255" },
  variations: { color: "#BEAAFF", rgb: "190, 170, 255" },
  reader: DEFAULT_NEON,
  finale: { color: "#7FFF00", rgb: "127, 255, 0" }
};
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

function padScene(value) {
  return String(value).padStart(2, "0");
}

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    const styles = window.getComputedStyle(element);
    return styles.visibility !== "hidden" && styles.display !== "none";
  });
}

function SceneVisual({ type }) {
  if (type === "single-key") {
    return (
      <div className="mpx-visual mpx-key-visual" aria-hidden="true">
        <span className="mpx-key mpx-key-main">A</span>
        <span className="mpx-odds">01 / 64</span>
      </div>
    );
  }

  if (type === "two-keys") {
    return (
      <div className="mpx-visual mpx-key-visual" aria-hidden="true">
        <span className="mpx-key">A</span>
        <span className="mpx-key mpx-key-unknown">?</span>
        <span className="mpx-odds">64 × 64</span>
      </div>
    );
  }

  if (type === "million") {
    return (
      <div className="mpx-visual mpx-scale-visual" aria-hidden="true">
        <div className="mpx-equation">
          <span>64</span><sup>1.000.000</sup>
        </div>
        <div className="mpx-digit-horizon">
          <strong>1.806.180</strong>
          <span>chữ số</span>
        </div>
      </div>
    );
  }

  if (type === "distinction") {
    return (
      <div className="mpx-visual mpx-distinction" aria-hidden="true">
        <span><b>≈ 0</b><small>gần như không</small></span>
        <i>≠</i>
        <span><b>0</b><small>không thể</small></span>
      </div>
    );
  }

  if (type === "attempts") {
    return (
      <div className="mpx-visual mpx-attempts" aria-hidden="true">
        <span>000001</span><span>000002</span><span>000003</span>
        <strong>∞</strong>
      </div>
    );
  }

  if (type === "typewriters") {
    return (
      <div className="mpx-visual mpx-typewriter-grid" aria-hidden="true">
        {["A", "Q", "Z", "?", "S", "∞", "K", ".", "T", "R", "E", "N"].map((key, index) => (
          <span key={`${key}-${index}`}>{key}</span>
        ))}
      </div>
    );
  }

  if (type === "folio") {
    return (
      <div className="mpx-visual mpx-folio" aria-hidden="true">
        <span className="mpx-folio-mark">W. S.</span>
        <span /><span /><span /><span className="short" />
      </div>
    );
  }

  if (type === "without-intent") {
    return (
      <div className="mpx-visual mpx-absence" aria-hidden="true">
        <span>Ý định</span><span>Trí tuệ</span><span>Cố gắng</span>
      </div>
    );
  }

  if (type === "variations") {
    return (
      <div className="mpx-visual mpx-variations" aria-hidden="true">
        <span>MỘT CÂU HOÀN HẢO</span>
        <span>MỘT CÂU HOÀN HẢ0</span>
        <span>MỘT CÂU HOÀN HẢO?</span>
        <span>MỘT CÂU GẦN ĐÚNG</span>
        <span>MỘT LỜI DỐI</span>
      </div>
    );
  }

  if (type === "reader") {
    return (
      <div className="mpx-visual mpx-reader" aria-hidden="true">
        <span>gần đúng</span><span>nghe như thật</span><span>sai một câu</span>
        <strong>SỰ THẬT</strong>
        <span>lệch một ngày</span><span>một lời dối</span><span>gần đúng</span>
      </div>
    );
  }

  return (
    <div className="mpx-visual mpx-finale" aria-hidden="true">
      <span>∞</span>
    </div>
  );
}

export default function MonkeyParadoxExperience({ theme }) {
  const dialogId = useId();
  const launcherTitleId = useId();
  const instructionsId = useId();
  const launcherRef = useRef(null);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const swipeRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [canScrollFurther, setCanScrollFurther] = useState(false);
  const reduceMotion = useReducedMotion();

  const scene = monkeyParadoxScenes[sceneIndex];
  const isFirstScene = sceneIndex === 0;
  const isFinalScene = sceneIndex === LAST_SCENE_INDEX;
  const progress = ((sceneIndex + 1) / monkeyParadoxScenes.length) * 100;
  const themeVars = {
    "--mpx-page": theme?.pageBg || "#050512",
    "--mpx-panel": "#09091F",
    "--mpx-panel-soft": "rgba(9, 9, 31, 0.94)",
    "--mpx-text": "#F5F2FF",
    "--mpx-soft": "#9CA6C5",
    "--mpx-accent": DEFAULT_NEON.color,
    "--mpx-accent-rgb": DEFAULT_NEON.rgb,
    "--mpx-border": "rgba(0, 255, 255, 0.22)"
  };
  const sceneNeon = SCENE_NEON[scene.visual] || DEFAULT_NEON;
  const sceneThemeVars = {
    ...themeVars,
    "--mpx-accent": sceneNeon.color,
    "--mpx-accent-rgb": sceneNeon.rgb,
    "--mpx-border": `rgba(${sceneNeon.rgb}, 0.22)`
  };

  useEffect(() => {
    setIsReady(true);
  }, []);

  const openExperience = () => {
    restoreFocusRef.current = launcherRef.current;
    setDirection(1);
    setSceneIndex(0);
    setIsOpen(true);
  };

  const closeExperience = () => {
    setIsOpen(false);
  };

  const showPreviousScene = () => {
    if (isFirstScene) {
      return;
    }
    setDirection(-1);
    setSceneIndex((current) => Math.max(0, current - 1));
  };

  const showNextScene = () => {
    if (isFinalScene) {
      closeExperience();
      return;
    }
    setDirection(1);
    setSceneIndex((current) => Math.min(LAST_SCENE_INDEX, current + 1));
  };

  const showFirstScene = () => {
    setDirection(-1);
    setSceneIndex(0);
  };

  const showFinalScene = () => {
    setDirection(1);
    setSceneIndex(LAST_SCENE_INDEX);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const body = document.body;
    const pageMain = document.querySelector("main");
    const scrollY = window.scrollY;
    const bodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      boxSizing: body.style.boxSizing,
      paddingRight: body.style.paddingRight
    };
    const mainHadInert = pageMain?.hasAttribute("inert") || false;
    const mainAriaHidden = pageMain?.getAttribute("aria-hidden");
    const scrollbarGap = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const existingPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.boxSizing = "border-box";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${existingPadding + scrollbarGap}px`;
    }

    dialogRef.current?.focus({ preventScroll: true });

    if (pageMain) {
      pageMain.setAttribute("inert", "");
      pageMain.setAttribute("aria-hidden", "true");
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.contains(document.activeElement)) {
        dialog.focus({ preventScroll: true });
      }
    });

    const keepFocusInside = (event) => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.contains(event.target)) {
        dialog.focus({ preventScroll: true });
      }
    };

    document.addEventListener("focusin", keepFocusInside);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("focusin", keepFocusInside);

      if (pageMain) {
        if (!mainHadInert) {
          pageMain.removeAttribute("inert");
        }
        if (mainAriaHidden === null) {
          pageMain.removeAttribute("aria-hidden");
        } else {
          pageMain.setAttribute("aria-hidden", mainAriaHidden);
        }
      }

      Object.assign(body.style, bodyStyles);
      window.scrollTo(0, scrollY);

      window.requestAnimationFrame(() => {
        const launcher = restoreFocusRef.current;
        if (launcher?.isConnected) {
          launcher.focus({ preventScroll: true });
          return;
        }
        document.querySelector(".style-tab.is-active")?.focus({ preventScroll: true });
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeExperience();
        return;
      }

      if (event.key === "Tab") {
        const focusable = getFocusableElements(dialogRef.current);
        if (!focusable.length) {
          event.preventDefault();
          dialogRef.current?.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (event.repeat) {
        return;
      }

      const targetIsControl = event.target instanceof Element
        && Boolean(event.target.closest("button, a, input, textarea, select, [contenteditable='true']"));

      if (event.key === "ArrowRight" || event.key === "PageDown" || (event.key === " " && !targetIsControl)) {
        event.preventDefault();
        showNextScene();
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        showPreviousScene();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        showFirstScene();
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        showFinalScene();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, sceneIndex]);

  useEffect(() => {
    if (!isOpen || !stageRef.current) {
      return undefined;
    }

    const stage = stageRef.current;
    stage.scrollTop = 0;
    const updateScrollCue = () => {
      const remaining = stage.scrollHeight - stage.scrollTop - stage.clientHeight;
      setCanScrollFurther(remaining > 24);
    };
    const frame = window.requestAnimationFrame(updateScrollCue);
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateScrollCue);
    resizeObserver?.observe(stage);
    if (stage.firstElementChild) {
      resizeObserver?.observe(stage.firstElementChild);
    }
    window.addEventListener("resize", updateScrollCue);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateScrollCue);
    };
  }, [isOpen, sceneIndex]);

  const handlePointerDown = (event) => {
    if (event.pointerType !== "touch" || !event.isPrimary) {
      return;
    }
    if (event.target instanceof Element && event.target.closest("button, a, input")) {
      return;
    }
    swipeRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY
    };
  };

  const handlePointerUp = (event) => {
    const start = swipeRef.current;
    if (event.pointerType !== "touch" || !start || start.pointerId !== event.pointerId) {
      return;
    }

    swipeRef.current = null;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }
    if (deltaX < 0) {
      showNextScene();
    } else {
      showPreviousScene();
    }
  };

  const holdsPosition = scene.visual === "reader" || scene.visual === "finale";
  const sceneMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: holdsPosition ? { opacity: 0 } : { opacity: 0, y: direction * 10 },
        animate: holdsPosition ? { opacity: 1 } : { opacity: 1, y: 0 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
      };

  const dialog = (
    <motion.div
      className="mpx-overlay"
      style={sceneThemeVars}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          closeExperience();
        }
      }}
    >
      <section
        id={dialogId}
        ref={dialogRef}
        className="mpx-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={instructionsId}
        tabIndex={-1}
        data-density={scene.density}
      >
        <header className="mpx-header">
          <div className="mpx-identity">
            <span className="mpx-identity-mark" aria-hidden="true">∞</span>
            <div>
              <span className="mpx-eyebrow">Thí nghiệm Đêm Huyền</span>
              <h2 id={`${dialogId}-title`}>{MONKEY_PARADOX_TITLE}</h2>
            </div>
          </div>
          <button
            type="button"
            className="mpx-icon-button"
            onClick={closeExperience}
            aria-label="Đóng thí nghiệm và trở về bài viết"
            title="Đóng"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="mpx-progress-row">
          <div
            className="mpx-progress-track"
            role="progressbar"
            aria-label="Tiến trình câu chuyện"
            aria-valuemin="1"
            aria-valuemax={monkeyParadoxScenes.length}
            aria-valuenow={sceneIndex + 1}
            aria-valuetext={`Chặng ${sceneIndex + 1} trên ${monkeyParadoxScenes.length}: ${scene.title}`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className="mpx-scene-count">
            {padScene(sceneIndex + 1)} / {padScene(monkeyParadoxScenes.length)}
          </span>
        </div>

        <p id={instructionsId} className="mpx-sr-only">
          Dùng nút Trước và Tiếp, phím mũi tên, Page Up, Page Down hoặc phím cách để chuyển chặng. Home về chặng đầu, End tới chặng cuối. Nhấn Escape để đóng.
        </p>

        <div className="mpx-stage-wrap">
          <div
            ref={stageRef}
            className="mpx-stage"
            role="region"
            aria-label={`Nội dung chặng ${sceneIndex + 1} trên ${monkeyParadoxScenes.length}`}
            tabIndex={0}
            onScroll={(event) => {
              const stage = event.currentTarget;
              const remaining = stage.scrollHeight - stage.scrollTop - stage.clientHeight;
              setCanScrollFurther(remaining > 24);
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeRef.current = null;
            }}
          >
            <motion.article
              key={scene.id}
              className={`mpx-scene mpx-scene-${scene.visual}`}
              {...sceneMotion}
            >
              <div className="mpx-scene-marker">
                <span>{scene.marker}</span>
              </div>

              <SceneVisual type={scene.visual} />

              <div className="mpx-scene-copy">
                <h3>{scene.title}</h3>
                {scene.body.map((paragraph) => <p className="mpx-body-paragraph" key={paragraph}>{paragraph}</p>)}
                {scene.beats && (
                  <ul className="mpx-beats">
                    {scene.beats.map((beat) => <li key={beat}>{beat}</li>)}
                  </ul>
                )}
                {scene.statement && <p className="mpx-statement">{scene.statement}</p>}
                {scene.question && <blockquote>{scene.question}</blockquote>}
                {scene.note && <p className="mpx-note"><strong>Ghi chú xác suất:</strong> {scene.note}</p>}
              </div>
            </motion.article>
          </div>
          {canScrollFurther && (
            <div className="mpx-scroll-cue" aria-hidden="true">
              Cuộn để đọc tiếp <span>↓</span>
            </div>
          )}
        </div>

        <footer className="mpx-controls">
          <button
            type="button"
            className="mpx-control mpx-control-back"
            onClick={showPreviousScene}
            aria-disabled={isFirstScene}
            aria-label="Về chặng trước"
          >
            <span aria-hidden="true">←</span>
            <span>Trước</span>
          </button>
          <span className="mpx-key-hint" aria-hidden="true">← → · PgUp/PgDn · Phím cách</span>
          <button
            type="button"
            className="mpx-control mpx-control-next"
            onClick={showNextScene}
            aria-label={isFinalScene ? "Khép lại và trở về bài viết" : "Sang chặng tiếp theo"}
          >
            <span>{isFinalScene ? "Khép lại" : "Tiếp"}</span>
            <span aria-hidden="true">{isFinalScene ? "✦" : "→"}</span>
          </button>
        </footer>

        <p className="mpx-sr-only" aria-live="polite" aria-atomic="true">
          Chặng {sceneIndex + 1} trên {monkeyParadoxScenes.length}: {scene.title}
        </p>
      </section>
    </motion.div>
  );

  return (
    <>
      <section className="mpx-invitation" style={themeVars} aria-labelledby={launcherTitleId}>
        <div className="mpx-invitation-copy">
          <span className="mpx-invitation-label">Thí nghiệm Đêm Huyền · {monkeyParadoxScenes.length} chặng</span>
          <h4 id={launcherTitleId}>Tưởng về lũ khỉ. Nhưng không phải.</h4>
          <p>Một mật khẩu dài một triệu ký tự. Khoảng 2 phút.</p>
        </div>
        <button
          ref={launcherRef}
          type="button"
          className="mpx-launcher"
          onClick={openExperience}
          disabled={!isReady}
          aria-haspopup="dialog"
          aria-controls={isOpen ? dialogId : undefined}
          aria-expanded={isOpen}
        >
          <span>Bước vào vô hạn</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>
      {isReady && isOpen && typeof document !== "undefined"
        ? createPortal(dialog, document.body)
        : null}
    </>
  );
}
