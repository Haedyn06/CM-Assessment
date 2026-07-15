"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IoPlay } from "react-icons/io5";

export type VideoCompProps = {
  src: string;
  poster?: string;
  label?: string;
  aspectRatio?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
};

function CornerDots() {
  return (
    <>
      <span aria-hidden className="videoCompDot videoCompDotTl" />
      <span aria-hidden className="videoCompDot videoCompDotTr" />
      <span aria-hidden className="videoCompDot videoCompDotBl" />
      <span aria-hidden className="videoCompDot videoCompDotBr" />
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
      className={`videoComp${playing ? " isPlaying" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--videoCompAspect": aspectRatio } as CSSProperties}
    >
      <video
        ref={videoRef}
        className="videoCompPlayer"
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
          <div className="videoCompShade" aria-hidden />
          <button
            type="button"
            className="videoCompPlay"
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
        .videoComp {
          position: relative;
          aspect-ratio: var(--videoCompAspect, 16 / 10);
          overflow: hidden;
          border-radius: 0.65rem;
          background: #111;
          box-shadow: 0 20px 60px -28px rgba(0, 0, 0, 0.28);
        }

        .videoCompPlayer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
          z-index: 1;
        }

        .videoComp.isPlaying .videoCompPlayer {
          z-index: 2;
          pointer-events: auto;
        }

        .videoComp:not(.isPlaying) .videoCompPlayer {
          pointer-events: none;
        }

        .videoCompShade {
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

        .videoCompPlay {
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
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #111;
          cursor: pointer;
          transition: background 0.25s ease;
        }

        .videoCompPlay:hover {
          background: rgba(255, 255, 255, 0.72);
        }

        .videoCompDot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #111;
          pointer-events: none;
        }

        .videoCompDotTl { top: 5px; left: 5px; }
        .videoCompDotTr { top: 5px; right: 5px; }
        .videoCompDotBl { bottom: 5px; left: 5px; }
        .videoCompDotBr { bottom: 5px; right: 5px; }
      `}</style>
    </div>
  );
}
