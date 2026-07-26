import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./MusicPlayer.css";

const assetBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const manhBaTrack = `${assetBase}/music/manh-ba-2.opus`;
const canonTrack = `${assetBase}/music/canon-in-d.opus`;

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
