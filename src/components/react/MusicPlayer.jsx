import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import manhBaTrack from "../../music/manh-ba-2.opus?url";

const PLAY_ICON = "\u25b6";
const PAUSE_ICON = "\u275a\u275a";
const MUSIC_ICON = "\u266a";
const MUTE_ICON = "\u2715";

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

.music-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.music-btn {
  background: none;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  font-size: 14px;
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

.music-btn:disabled {
  cursor: wait;
  opacity: 0.75;
}

.music-progress-wrap {
  flex: 1;
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

.music-time {
  font-family: var(--font-pixel);
  font-size: 16px;
  color: var(--text-dim);
  flex-shrink: 0;
  min-width: 32px;
  text-align: right;
}

.music-volume {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
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
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default function MusicPlayer({ portalTarget = null, theme = null, colorful = false }) {
  const audioRef = useRef(null);
  const previousVolumeRef = useRef(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeText, setTimeText] = useState("0:00");
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.5;
  }, []);

  const showAudioError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setHasError(true);
    setTimeText("error");
  };

  const handlePlayClick = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) {
      return;
    }

    if (audio.paused) {
      setIsLoading(true);
      try {
        await audio.play();
        setIsPlaying(true);
        setHasError(false);
      } catch {
        showAudioError();
      } finally {
        setIsLoading(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) {
      return;
    }

    setProgress((audio.currentTime / audio.duration) * 100);
    setTimeText(formatTime(audio.currentTime));
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setTimeText("0:00");
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
        <div className="music-title-scroll">Mạnh Bà by Linh Hương Luz</div>
      </div>
      <div className="music-controls">
        <button
          className={`music-btn ${isPlaying ? "playing" : ""}`}
          id="musicPlayBtn"
          aria-label={hasError ? "Audio unavailable" : isPlaying ? "Pause" : "Play"}
          title={hasError ? "Audio unavailable" : isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}
          disabled={isLoading || hasError}
          type="button"
          onClick={handlePlayClick}
        >
          {isPlaying ? PAUSE_ICON : PLAY_ICON}
        </button>
        <div className="music-progress-wrap" id="musicProgressWrap" onClick={handleProgressClick}>
          <div className="music-progress-bar" id="musicProgressBar" style={{ width: `${progress}%` }} />
        </div>
        <span className="music-time" id="musicTime">{timeText}</span>
      </div>
      <div className="music-volume">
        <span
          className="music-vol-icon"
          id="musicVolIcon"
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
          id="musicVolSlider"
          min="0"
          max="100"
          value={volume}
          aria-label="Volume"
          onChange={handleVolumeChange}
        />
      </div>
      <a
        className="music-credit"
        href="https://youtu.be/ethBWqiyYvY?list=RDxUgHL-6_QS4"
        target="_blank"
        rel="noopener noreferrer"
      >
        credit: Mạnh Bà
      </a>
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
        loop
        src={manhBaTrack}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={showAudioError}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </>
  );
}
