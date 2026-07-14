"use client";

import { useEffect, useRef } from "react";
import { IoPlay } from "react-icons/io5";
import { Button } from "@/components/ui/Button";

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
    <div
      role="button"
      tabIndex={playing ? -1 : 0}
      className={`shelf-card${active ? " is-active" : ""}${playing ? " is-playing" : ""}${className ? ` ${className}` : ""}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (playing) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={active}
      aria-label={
        active
          ? playing
            ? `${title} video`
            : `Play ${title} video`
          : `Expand ${title} customer story`
      }
    >
      <div className="shelf-card__media">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            className={`shelf-card__image${playing ? " is-hidden" : ""}`}
          />
        ) : (
          <div className="shelf-card__placeholder">
            <span>Media placeholder</span>
          </div>
        )}

        {videoSrc && (
          <video
            ref={videoRef}
            className={`shelf-card__video${playing ? " is-visible" : ""}`}
            src={videoSrc}
            playsInline
            controls={playing}
            controlsList="nodownload"
            preload="auto"
            onClick={(e) => {
              // Keep native control clicks from bubbling to the card
              if (playing) e.stopPropagation();
            }}
          />
        )}

        {!playing && <div className="shelf-card__shade" aria-hidden />}
      </div>

      {active ? (
        <>
          {!playing && (
            <Button
              decorative
              className="shelf-card__play"
              color="#111111"
              background="rgba(255, 255, 255, 0.55)"
              hoverBackground="rgba(255, 255, 255, 0.72)"
              hoverColor="#111111"
              borderColor="rgba(255, 255, 255, 0.45)"
              hoverBorderColor="rgba(255, 255, 255, 0.55)"
              dotColor="#111111"
              hoverDotColor="#111111"
              style={{
                position: "absolute",
                left: "1rem",
                bottom: "1rem",
                zIndex: 2,
                minHeight: "auto",
                padding: "0.55rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                backdropFilter: "blur(10px)",
              }}
            >
              <IoPlay size={12} aria-hidden />
              Play
            </Button>
          )}
          {!playing && (
            <span className="shelf-card__brand shelf-card__brand--active">
              {logoLabel}
            </span>
          )}
        </>
      ) : (
        <span className="shelf-card__brand shelf-card__brand--collapsed">
          {logoLabel}
        </span>
      )}

      <style>{`
        .shelf-card {
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

        .shelf-card.is-active {
          box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.35);
        }

        .shelf-card.is-playing {
          cursor: default;
        }

        .shelf-card__media {
          position: absolute;
          inset: 0;
        }

        .shelf-card__image,
        .shelf-card__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shelf-card__image {
          transition: opacity 0.3s ease;
        }

        .shelf-card__image.is-hidden {
          opacity: 0;
        }

        .shelf-card__video {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          background: #000;
        }

        .shelf-card__video.is-visible {
          opacity: 1;
          pointer-events: auto;
          z-index: 3;
        }

        .shelf-card__video.is-visible::-webkit-media-controls-panel {
          background-image: linear-gradient(
            transparent,
            rgba(0, 0, 0, 0.55)
          );
        }

        .shelf-card__placeholder {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          background:
            linear-gradient(145deg, #e7e7e3 0%, #d2d2cc 55%, #c4c4bc 100%);
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.7rem;
          color: #8a8a8a;
        }

        .shelf-card:not(.is-active) .shelf-card__placeholder span {
          display: none;
        }

        .shelf-card__shade {
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

        .shelf-card:not(.is-active) .shelf-card__shade {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.62) 0%,
            rgba(0, 0, 0, 0.28) 55%,
            rgba(0, 0, 0, 0.18) 100%
          );
        }

        .shelf-card__play {
          opacity: 0 !important;
          transform: translateY(6px) !important;
          transition:
            opacity 0.35s ease 0.12s,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.12s !important;
          pointer-events: none;
        }

        .shelf-card.is-active .shelf-card__play {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .shelf-card__brand {
          position: absolute;
          z-index: 2;
          font-weight: 650;
          letter-spacing: 0.02em;
          white-space: nowrap;
          color: #fff;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35);
        }

        .shelf-card__brand--active {
          right: 1.15rem;
          bottom: 1.2rem;
          font-size: 0.95rem;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 0.35s ease 0.16s,
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.16s;
        }

        .shelf-card.is-active .shelf-card__brand--active {
          opacity: 1;
          transform: translateY(0);
        }

        .shelf-card__brand--collapsed {
          left: 50%;
          bottom: 1.25rem;
          font-size: 0.78rem;
          writing-mode: vertical-rl;
          transform: translateX(-50%) rotate(180deg);
        }

        @media (max-width: 720px) {
          .shelf-card__brand--collapsed {
            font-size: 0.68rem;
          }

          .shelf-card__play {
            left: 0.7rem !important;
            bottom: 0.7rem !important;
            padding: 0.45rem 0.7rem !important;
          }

          .shelf-card__brand--active {
            right: 0.8rem;
            bottom: 0.85rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
