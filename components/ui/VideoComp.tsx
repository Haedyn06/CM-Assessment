"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IoPlay } from "react-icons/io5";

export type VideoCompProps = {
  /** Video media source — swap freely per usage */
  src: string;
  /** Optional poster / thumbnail image */
  poster?: string;
  /** Accessible label for the play control */
  label?: string;
  /** Aspect ratio CSS value, e.g. "16 / 10" */
  aspectRatio?: string;
  className?: string;
  /** Called when playback starts */
  onPlay?: () => void;
  /** Called when playback is paused or reset */
  onPause?: () => void;
};

function CornerDots() {
  return (
    <>
      <span aria-hidden className="video-comp-dot video-comp-dot--tl" />
      <span aria-hidden className="video-comp-dot video-comp-dot--tr" />
      <span aria-hidden className="video-comp-dot video-comp-dot--bl" />
      <span aria-hidden className="video-comp-dot video-comp-dot--br" />
    </>
  );
}

export function VideoComp({
  src,
  poster,
  label = "Play video",
  aspectRatio = "16 / 10",
  className = "",
  onPlay,
  onPause,
}: VideoCompProps) {
  const [playing, setPlaying] = useState(false);
  const [mediaKey, setMediaKey] = useState(`${src}|${poster ?? ""}`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextMediaKey = `${src}|${poster ?? ""}`;

  if (mediaKey !== nextMediaKey) {
    setMediaKey(nextMediaKey);
    setPlaying(false);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!playing) {
      video.pause();
      video.currentTime = 0;
      onPause?.();
    }
  }, [playing, onPause]);

  // Reload media element when the source changes (DOM only — no setState)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.load();
  }, [src, poster]);

  const startPlayback = () => {
    setPlaying(true);
    onPlay?.();

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {});
    });
  };

  const pausePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  };

  return (
    <div
      className={`video-comp${playing ? " is-playing" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--video-comp-aspect": aspectRatio } as CSSProperties}
    >
      <video
        ref={videoRef}
        className="video-comp__player"
        src={src}
        poster={poster}
        playsInline
        controls={playing}
        controlsList="nodownload"
        preload="metadata"
        onEnded={pausePlayback}
      />

      {!playing && (
        <>
          <div className="video-comp__shade" aria-hidden />
          <button
            type="button"
            className="video-comp__play"
            aria-label={label}
            onClick={startPlayback}
          >
            <CornerDots />
            <IoPlay size={12} aria-hidden />
            Play
          </button>
        </>
      )}

      <style>{`
        .video-comp {
          position: relative;
          aspect-ratio: var(--video-comp-aspect, 16 / 10);
          overflow: hidden;
          border-radius: 0.65rem;
          background: #111;
          box-shadow: 0 20px 60px -28px rgba(0, 0, 0, 0.28);
        }

        .video-comp__player {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
          z-index: 1;
        }

        .video-comp.is-playing .video-comp__player {
          z-index: 2;
          pointer-events: auto;
        }

        .video-comp:not(.is-playing) .video-comp__player {
          pointer-events: none;
        }

        .video-comp__shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.28) 0%,
            rgba(0, 0, 0, 0.05) 50%,
            transparent 100%
          );
        }

        .video-comp__play {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 3;
          transform: translate(-50%, -50%);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 0.45rem;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          transition: background 0.25s ease;
        }

        .video-comp__play:hover {
          background: rgba(255, 255, 255, 0.72);
        }

        .video-comp-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #111;
          pointer-events: none;
        }

        .video-comp-dot--tl { top: 5px; left: 5px; }
        .video-comp-dot--tr { top: 5px; right: 5px; }
        .video-comp-dot--bl { bottom: 5px; left: 5px; }
        .video-comp-dot--br { bottom: 5px; right: 5px; }
      `}</style>
    </div>
  );
}
