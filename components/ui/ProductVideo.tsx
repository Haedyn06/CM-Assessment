"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProductVideoProps = {
  open: boolean;
  src: string;
  onClose: () => void;
  title?: string;
};

const EXIT_MS = 320;

export function ProductVideo({
  open,
  src,
  onClose,
  title = "Product video",
}: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCloseRef = useRef(onClose);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setPhase("enter");
      return;
    }

    if (!visible) return;

    setPhase("exit");
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [open, visible]);

  useEffect(() => {
    if (!visible || phase !== "enter") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      video?.pause();
    };
  }, [visible, phase]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={`product-video product-video--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="product-video__backdrop"
        aria-label="Close video"
        onClick={onClose}
      />

      <button
        type="button"
        className="product-video__close"
        aria-label="Close"
        onClick={onClose}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M3 3l12 12M15 3L3 15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="product-video__frame">
        <video
          ref={videoRef}
          className="product-video__player"
          src={src}
          controls
          playsInline
          preload="auto"
          controlsList="nodownload"
        />
      </div>

      <style>{`
        .product-video {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 1.5rem;
        }

        .product-video--enter {
          animation: product-video-fade-in ${EXIT_MS}ms ease forwards;
        }

        .product-video--exit {
          animation: product-video-fade-out ${EXIT_MS}ms ease forwards;
          pointer-events: none;
        }

        .product-video__backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: rgba(20, 20, 20, 0.42);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .product-video__close {
          position: absolute;
          top: 1.15rem;
          right: 1.25rem;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 2.4rem;
          height: 2.4rem;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #f2f2f2;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .product-video--enter .product-video__close {
          animation: product-video-close-in ${EXIT_MS}ms ease forwards;
        }

        .product-video--exit .product-video__close {
          animation: product-video-close-out ${EXIT_MS}ms ease forwards;
        }

        .product-video__close:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .product-video__frame {
          position: relative;
          z-index: 1;
          width: min(920px, 100%);
          aspect-ratio: 16 / 9;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #000;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.55);
          transform-origin: center center;
        }

        .product-video--enter .product-video__frame {
          animation: product-video-pop-in ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .product-video--exit .product-video__frame {
          animation: product-video-pop-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .product-video__player {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
        }

        @keyframes product-video-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes product-video-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes product-video-pop-in {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes product-video-pop-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(18px) scale(0.92);
          }
        }

        @keyframes product-video-close-in {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes product-video-close-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>,
    document.body,
  );
}
