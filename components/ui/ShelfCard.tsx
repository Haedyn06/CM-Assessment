"use client";

import { useEffect, useRef } from "react";
import { IoPlay } from "react-icons/io5";

type ShelfCardProps = {
  title: string;
  logoLabel: string;
  active: boolean;
  playing: boolean;
  imageSrc?: string;
  videoSrc?: string;
  onSelect: () => void;
  onPlay: () => void;
  className?: string;
};

export function ShelfCard({title, logoLabel, active, playing, imageSrc, videoSrc, onSelect, onPlay, className = ""}: ShelfCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!playing || !active) {
      video.pause();
      video.currentTime = 0;
    }
  }, [playing, active]);

  const startPlayback = () => {
    onPlay();

    const video = videoRef.current;
    if (!video || !videoSrc) return;

    // Play in the click handler so the browser keeps the user-gesture context
    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {});
    });
  };

  const handleClick = () => {
    if (!active) {
      onSelect();
      return;
    }

    // Once playing, controls own interaction — don't restart on card click
    if (playing) return;

    startPlayback();
  };

  return (
    <div role="button" tabIndex={playing ? -1 : 0} onClick={handleClick}
      className={`shelfCard${active ? " isActive" : ""}${playing ? " isPlaying" : ""}${className ? ` ${className}` : ""}`}
      onKeyDown={(e) => {
        if (playing) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={active}
      aria-label={
        active ? playing ? `${title} video`
          : `Play ${title} video`
          : `Expand ${title} customer story`
      }
    >
      <div className="shelfCardMedia">
        {imageSrc ? (
          <img src={imageSrc} alt="" className={`shelfCardImage${playing ? " isHidden" : ""}`} />
        ) : (
          <div className="shelfCardPlaceholder">
            <span>Media placeholder</span>
          </div>
        )}

        {videoSrc && (
          <video
            ref={videoRef}
            className={`shelfCardVideo${playing ? " isVisible" : ""}`}
            src={videoSrc} playsInline controls={playing} controlsList="nodownload" preload="auto"
            onClick={(e) => { if (playing) e.stopPropagation() }}
          />
        )}

        {!playing && <div className="shelfCardShade" aria-hidden />}
      </div>

      {active ? (
        <>
          {!playing && (
            <span className="shelfCardPlay" aria-hidden>
              <IoPlay size={12} aria-hidden />
              Play
            </span>
          )}
          {!playing && (
            <span className="shelfCardBrand shelfCardBrandActive">
              {logoLabel}
            </span>
          )}
        </>
      ) : (
        <span className="shelfCardBrand shelfCardBrandCollapsed">
          {logoLabel}
        </span>
      )}

      <style>{`
        .shelfCard {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          border-radius: 0.9rem;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          background: #d8d8d4;
          color: #fff;
          transition: box-shadow 0.35s ease;
        }

        .shelfCard.isActive {
          box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.35);
        }

        .shelfCard.isPlaying {
          cursor: default;
        }

        .shelfCardMedia {
          position: absolute;
          inset: 0;
        }

        .shelfCardImage,
        .shelfCardVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shelfCardImage {
          transition: opacity 0.3s ease;
        }

        .shelfCardImage.isHidden {
          opacity: 0;
        }

        .shelfCardVideo {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          background: #000;
        }

        .shelfCardVideo.isVisible {
          opacity: 1;
          pointer-events: auto;
          z-index: 3;
        }

        .shelfCardVideo.isVisible::-webkit-media-controls-panel {
          background-image: linear-gradient(
            transparent,
            rgba(0, 0, 0, 0.55)
          );
        }

        .shelfCardPlaceholder {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          background:
            linear-gradient(145deg, #e7e7e3 0%, #d2d2cc 55%, #c4c4bc 100%);
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.7rem;
          color: #8a8a8a;
        }

        .shelfCard:not(.isActive) .shelfCardPlaceholder span {
          display: none;
        }

        .shelfCardShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.12) 42%,
            rgba(0, 0, 0, 0.08) 100%
          );
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .shelfCard:not(.isActive) .shelfCardShade {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.62) 0%,
            rgba(0, 0, 0, 0.28) 55%,
            rgba(0, 0, 0, 0.18) 100%
          );
        }

        .shelfCardPlay {
          position: absolute;
          left: 1rem;
          bottom: 1rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 0.4rem;
          background: rgba(255, 255, 255, 0.55);
          color: #111;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1;
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.35s ease 0.12s,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
          pointer-events: none;
        }

        .shelfCard.isActive .shelfCardPlay {
          opacity: 1;
          transform: translateY(0);
        }

        .shelfCardBrand {
          position: absolute;
          z-index: 2;
          font-weight: 650;
          letter-spacing: 0.02em;
          white-space: nowrap;
          color: #fff;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35);
        }

        .shelfCardBrandActive {
          right: 1.15rem;
          bottom: 1.2rem;
          font-size: 0.95rem;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.35s ease 0.16s,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.16s;
        }

        .shelfCard.isActive .shelfCardBrandActive {
          opacity: 1;
          transform: translateY(0);
        }

        .shelfCardBrandCollapsed {
          left: 50%;
          bottom: 1.25rem;
          font-size: 0.78rem;
          writing-mode: vertical-rl;
          transform: translateX(-50%) rotate(180deg);
        }

        @media (max-width: 720px) {
          .shelfCardBrandCollapsed {
            font-size: 0.68rem;
          }

          .shelfCardPlay {
            left: 0.7rem !important;
            bottom: 0.7rem !important;
            padding: 0.45rem 0.7rem !important;
          }

          .shelfCardBrandActive {
            right: 0.8rem;
            bottom: 0.85rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
