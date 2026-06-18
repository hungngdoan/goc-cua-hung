import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import manhBaTrack from "../../music/manh-ba-2.opus?url";
import canonTrack from "../../music/canon-in-d.opus?url";

const PLAY_ICON = "▶"; // ▶
const PAUSE_ICON = "❚❚"; // ❚❚
const MUSIC_ICON = "♪"; // ♪
const MUTE_ICON = "✕"; // ✕
const PREV_ICON = "◄◄"; // ◄◄
const NEXT_ICON = "►►"; // ►►

// Playlist mirrors hung-blog's music.json. Each \n-free credit is shown as a
// link; tracks without one (Canon in D) simply hide the credit row.
const TRACKS = [
  {
    title: "Mạnh Bà",
    artist: "Linh Hương Luz",
    src: manhBaTrack,
    credit: "https://youtu.be/ethBWqiyYvY?list=RDxUgHL-6_QS4",
    creditLabel: "Mạnh Bà"
  },
  {
    title: "Canon in D",
    artist: "Yanni",
    src: canonTrack,
    credit: "",
    creditLabel: ""
  }
];

// One button cycles three modes, like hung-blog: loop the whole list,
// loop one song (native gapless audio.loop), shuffle (a random other track).
const MODES = ["all", "one", "shuffle"];
const MODE_GLYPH = { all: "↻", one: "↻¹", shuffle: "⇆" }; // ↻ ↻¹ ⇆
const MODE_LABEL = { all: "Lặp tất cả", one: "Lặp một bài", shuffle: "Ngẫu nhiên" };
const VOL_KEY = "gocPlayerVolume";
const MODE_KEY = "gocPlayerMode";

const playerStyles = `
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap");

.music-box {
  --bg-panel: #0d0d2b;
  --accent-cyan: #00ffff;
  --accent-pink: #ff69b4;
  --accent-gold: #ffd700;
  --text-dim: #9988bb;
  --link-color: #00ccff;
  --font-pixel: "VT323", monospace;
  --font-display: "Press Start 2P", monospace;
  font-family: var(--font-pixel);
  background: var(--bg-panel);
  border: 1px solid var(--mb-border, #335);
  border-radius: 4px;
  padding: 13px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.music-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--mb-strip, linear-gradient(90deg, var(--accent-pink), var(--accent-cyan), var(--accent-gold)));
}

.music-box h3 {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--accent-gold);
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.blink {
  animation: music-blink-anim 1s steps(1) infinite;
}

@keyframes music-blink-anim {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes music-glow-pulse {
  0% {
    text-shadow:
      0 0 10px rgba(var(--mb-glow-rgb, 255, 105, 180), 0.8),
      0 0 20px rgba(var(--mb-glow-rgb, 255, 105, 180), 0.4),
      2px 2px 0 #330033;
  }
  100% {
    text-shadow:
      0 0 20px rgba(var(--mb-glow-rgb, 255, 105, 180), 1),
      0 0 40px rgba(var(--mb-glow-rgb, 255, 105, 180), 0.6),
      0 0 60px rgba(var(--mb-glow-rgb, 255, 105, 180), 0.3),
      2px 2px 0 #330033;
  }
}

.music-title-wrap {
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}

.music-title-wrap::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(90deg, transparent, var(--bg-panel));
  pointer-events: none;
}

.music-title-scroll {
  font-family: var(--font-pixel);
  font-size: 17px;
  color: var(--accent-pink);
  white-space: nowrap;
  display: inline-block;
  animation: music-scroll 12s linear infinite;
}

@keyframes music-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.music-progress-wrap {
  height: 6px;
  background: var(--track-bg, rgba(255, 255, 255, 0.08));
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.music-progress-bar {
  height: 100%;
  width: 0%;
  /* Per-tab gradient via --progress-from/--progress-to; falls back to the
     pink->cyan neon defaults on the colorful (Đêm Huyền) player. */
  background: linear-gradient(90deg, var(--progress-from, var(--accent-pink)), var(--progress-to, var(--accent-cyan)));
  border-radius: 3px;
  transition: width 0.1s linear;
}

.music-times {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-pixel);
  font-size: 14px;
  color: var(--text-dim);
  margin: 4px 0 8px;
}

.music-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.music-btn {
  background: none;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  font-size: 13px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  padding: 0;
  line-height: 1;
}

.music-btn:hover {
  background: rgba(var(--mb-glow-rgb, 0, 255, 255), 0.15);
  box-shadow: 0 0 10px rgba(var(--mb-glow-rgb, 0, 255, 255), 0.4);
}

.music-btn.playing {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
  animation: music-glow-pulse 2s ease-in-out infinite alternate;
}

.music-btn.is-on {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}

.music-btn-skip {
  font-size: 10px;
}

.music-btn:disabled {
  cursor: wait;
  opacity: 0.75;
}

.music-volume {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.music-vol-icon {
  font-size: 18px;
  color: var(--accent-gold);
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}

.music-vol-slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 4px;
  background: var(--track-bg, rgba(255, 255, 255, 0.08));
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.music-vol-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-gold);
  border: none;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(var(--mb-glow-rgb, 255, 215, 0), 0.5);
}

.music-vol-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-gold);
  border: none;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(var(--mb-glow-rgb, 255, 215, 0), 0.5);
}

.music-list {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
}

.music-list li {
  margin: 0;
}

.music-list-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: none;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 4px 6px;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-pixel);
  color: var(--text-dim);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.music-list-row:hover {
  background: rgba(var(--mb-glow-rgb, 0, 255, 255), 0.1);
  color: var(--accent-cyan);
}

.music-list-row.is-active {
  border-color: var(--accent-pink);
  color: var(--accent-pink);
}

.music-list-num {
  font-size: 14px;
  width: 14px;
  text-align: right;
  opacity: 0.75;
  flex-shrink: 0;
}

.music-list-title {
  font-size: 16px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-list-artist {
  font-size: 13px;
  opacity: 0.7;
  white-space: nowrap;
  flex-shrink: 0;
}

.music-credit {
  display: inline-block;
  margin-top: 8px;
  color: var(--link-color);
  font-family: var(--font-pixel);
  font-size: 16px;
  text-decoration: none;
  transition: color 0.2s, text-shadow 0.2s;
}

.music-credit:hover {
  color: var(--accent-pink);
  text-shadow: 0 0 8px rgba(var(--mb-glow-rgb, 255, 105, 180), 0.5);
}
`;

function hexToRgb(hex) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!match) {
    return "255, 105, 180";
  }
  return `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`;
}

// Mixes a hex colour toward white by `amount` (0-1). Used to build a
// two-tone progress gradient from a single theme accent, so each tab's
// bar is a distinct accent -> lighter-accent sweep rather than flat.
function lighten(hex, amount) {
  const [r, g, b] = hexToRgb(hex).split(",").map((part) => parseInt(part, 10));
  const mix = (channel) => Math.round(channel + (255 - channel) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default function MusicPlayer({ portalTarget = null, theme = null, colorful = false }) {
  const audioRef = useRef(null);
  const previousVolumeRef = useRef(0.5);
  // Whether the next track load should start playing. Set right before an
  // index change (next/prev/row click) so the load effect knows to autoplay.
  const shouldAutoplayRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("0:00");
  const [durationText, setDurationText] = useState("--:--");
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [mode, setMode] = useState("all");

  const track = TRACKS[index];

  const showAudioError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setHasError(true);
    setDurationText("error");
  };

  const playCurrent = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    setIsLoading(true);
    const attempt = audio.play();
    if (attempt && typeof attempt.then === "function") {
      attempt
        .then(() => setHasError(false))
        .catch(() => showAudioError())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  // Restore saved volume and mode after mount (not in initial state) so the
  // hydrated markup matches the server-rendered HTML and avoids a mismatch.
  useEffect(() => {
    const audio = audioRef.current;
    let startVol = 0.5;
    try {
      const stored = parseFloat(localStorage.getItem(VOL_KEY));
      if (Number.isFinite(stored)) {
        startVol = Math.min(1, Math.max(0, stored));
      }
    } catch {
      /* localStorage may be unavailable; keep the default. */
    }
    if (audio) {
      audio.volume = startVol;
    }
    setVolume(Math.round(startVol * 100));
    setIsMuted(startVol === 0);
    previousVolumeRef.current = startVol > 0 ? startVol : 0.5;

    try {
      const storedMode = localStorage.getItem(MODE_KEY);
      if (MODES.includes(storedMode)) {
        setMode(storedMode);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Load the current track whenever the index changes. preload="metadata"
  // keeps it light; autoplay only when an explicit action asked for it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.src = track.src;
    audio.loop = mode === "one";
    setProgress(0);
    setCurrentText("0:00");
    setDurationText("--:--");
    setHasError(false);

    if (shouldAutoplayRef.current) {
      shouldAutoplayRef.current = false;
      playCurrent();
    }
    // mode is intentionally read but not a dependency: a mode flip is handled
    // by its own effect and must not reload/restart the current track.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Keep native loop in sync with the mode and persist the choice.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = mode === "one";
    }
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const pickShuffle = () => {
    if (TRACKS.length < 2) {
      return index;
    }
    let next;
    do {
      next = Math.floor(Math.random() * TRACKS.length);
    } while (next === index);
    return next;
  };

  // Move to track `i` (wrapping). If it is already the current track we just
  // (re)start playback, since setIndex(same) would not retrigger the effect.
  const goTo = (i, autoplay) => {
    const len = TRACKS.length;
    const next = ((i % len) + len) % len;
    if (next === index) {
      if (autoplay) {
        playCurrent();
      }
      return;
    }
    shouldAutoplayRef.current = autoplay;
    setIndex(next);
  };

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio || hasError) {
      return;
    }
    if (audio.paused) {
      playCurrent();
    } else {
      audio.pause();
    }
  };

  const nextTrack = () => {
    const audio = audioRef.current;
    const wasPlaying = audio ? !audio.paused : true;
    goTo(mode === "shuffle" ? pickShuffle() : index + 1, wasPlaying);
  };

  // Early in a track, prev = previous track; further in, prev = restart it.
  const prevTrack = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    goTo(index - 1, audio ? !audio.paused : false);
  };

  const handleRowClick = (i) => {
    const audio = audioRef.current;
    if (i === index) {
      if (!audio || audio.paused) {
        playCurrent();
      } else {
        audio.pause();
      }
    } else {
      goTo(i, true);
    }
  };

  const cycleMode = () => {
    setMode((current) => MODES[(MODES.indexOf(current) + 1) % MODES.length]);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) {
      return;
    }
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentText(formatTime(audio.currentTime));
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDurationText(formatTime(audio.duration));
    }
  };

  // Track end: in loop-one this never fires (native audio.loop is gapless).
  const handleEnded = () => {
    goTo(mode === "shuffle" ? pickShuffle() : index + 1, true);
  };

  const handleProgressClick = (event) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    const audio = audioRef.current;

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (audio) {
      audio.volume = nextVolume / 100;
    }
    if (nextVolume > 0) {
      previousVolumeRef.current = nextVolume / 100;
    }
    try {
      localStorage.setItem(VOL_KEY, String(nextVolume / 100));
    } catch {
      /* ignore */
    }
  };

  const handleMuteClick = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.volume > 0) {
      previousVolumeRef.current = audio.volume;
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
      return;
    }
    audio.volume = previousVolumeRef.current;
    setVolume(Math.round(previousVolumeRef.current * 100));
    setIsMuted(false);
  };

  // When a theme is supplied, the box background, frame, and top strip follow
  // that tab's palette. The retro controls keep their neon colors.
  const themeVars = !theme
    ? undefined
    : colorful
      ? // Keep the hung-blog neon controls, only match the box background.
        { "--bg-panel": theme.panelSoftBg }
      : {
          "--bg-panel": theme.panelBg,
          "--mb-border": theme.panelBorder,
          "--mb-strip": theme.accent,
          "--accent-cyan": theme.accent,
          "--accent-pink": theme.accent,
          "--accent-gold": theme.accent,
          "--text-dim": theme.textMuted,
          "--link-color": theme.accent,
          "--mb-glow-rgb": hexToRgb(theme.accent),
          // Empty track for the progress + volume bars. Derived from the
          // theme's text colour so it stays visible on light themes (e.g.
          // Góc Hồng) where the default faint-white track disappears.
          "--track-bg": `rgba(${hexToRgb(theme.text)}, 0.18)`,
          // Two-tone progress fill unique to each tab: accent -> lighter accent.
          "--progress-from": theme.accent,
          "--progress-to": lighten(theme.accent, 0.4)
        };

  const playerUi = (
    <div className="sidebar-box music-box" style={themeVars}>
      <h3><span className="blink">&#9835;</span> Now Playing</h3>
      <div className="music-title-wrap">
        <div className="music-title-scroll">{track.title} &middot; {track.artist}</div>
      </div>

      <div className="music-progress-wrap" onClick={handleProgressClick}>
        <div className="music-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="music-times">
        <span>{currentText}</span>
        <span>{durationText}</span>
      </div>

      <div className="music-controls">
        <button
          className="music-btn music-btn-skip"
          aria-label="Bài trước"
          title="Bài trước"
          type="button"
          onClick={prevTrack}
        >
          {PREV_ICON}
        </button>
        <button
          className={`music-btn ${isPlaying ? "playing" : ""}`}
          aria-label={hasError ? "Audio unavailable" : isPlaying ? "Pause" : "Play"}
          title={hasError ? "Audio unavailable" : isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
          disabled={isLoading || hasError}
          type="button"
          onClick={handlePlayClick}
        >
          {isPlaying ? PAUSE_ICON : PLAY_ICON}
        </button>
        <button
          className="music-btn music-btn-skip"
          aria-label="Bài sau"
          title="Bài sau"
          type="button"
          onClick={nextTrack}
        >
          {NEXT_ICON}
        </button>
        <button
          className={`music-btn ${mode !== "all" ? "is-on" : ""}`}
          aria-label={MODE_LABEL[mode]}
          title={MODE_LABEL[mode]}
          type="button"
          onClick={cycleMode}
        >
          {MODE_GLYPH[mode]}
        </button>
      </div>

      <div className="music-volume">
        <span
          className="music-vol-icon"
          title={isMuted ? "Unmute" : "Mute"}
          onClick={handleMuteClick}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleMuteClick();
            }
          }}
        >
          {isMuted ? MUTE_ICON : MUSIC_ICON}
        </span>
        <input
          type="range"
          className="music-vol-slider"
          min="0"
          max="100"
          value={volume}
          aria-label="Volume"
          onChange={handleVolumeChange}
        />
      </div>

      <ol className="music-list">
        {TRACKS.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              className={`music-list-row ${i === index ? "is-active" : ""}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => handleRowClick(i)}
            >
              <span className="music-list-num">{i + 1}</span>
              <span className="music-list-title">{item.title}</span>
              <span className="music-list-artist">{item.artist}</span>
            </button>
          </li>
        ))}
      </ol>

      {track.credit && (
        <a
          className="music-credit"
          href={track.credit}
          target="_blank"
          rel="noopener noreferrer"
        >
          credit: {track.creditLabel || track.title}
        </a>
      )}
    </div>
  );

  // The visual player renders into the sidebar slot when it exists (normal
  // style tabs). On the sidebar-less tabs (36 Kế, Tào Tháo) the slot is absent,
  // so it falls back to a strip under the tab row. The <audio> element below is
  // an always-mounted sibling that is never portaled, so playback/currentTime
  // is never interrupted when tabs change.
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: playerStyles }} />
      {portalTarget
        ? createPortal(playerUi, portalTarget)
        : <div className="mt-5 w-full max-w-[225px]">{playerUi}</div>}
      <audio
        id="musicAudio"
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={showAudioError}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </>
  );
}
