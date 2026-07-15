"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

type ProductVideoProps = {
  open: boolean;
  src: string;
  onClose: () => void;
  title?: string;
};

const EXIT_MS = 320;

function subscribe() {
  return () => {};
}

export function ProductVideo({
  open,
  src,
  onClose,
  title = "Product video",
}: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCloseRef = useRef(onClose);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const [visible, setVisible] = useState(open);
  const [phase, setPhase] = useState<"enter" | "exit">(open ? "enter" : "exit");
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setVisible(true);
      setPhase("enter");
    } else if (visible) {
      setPhase("exit");
    }
  }

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (phase !== "exit") return;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

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
      className={`productVideo productVideo${phase[0]!.toUpperCase()}${phase.slice(1)}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="productVideoBackdrop"
        aria-label="Close video"
        onClick={onClose}
      />

      <button
        type="button"
        className="productVideoClose"
        aria-label="Close"
        onClick={onClose}
      >
        <IoClose size={22} aria-hidden />
      </button>

      <div className="productVideoFrame">
        <video
          ref={videoRef}
          className="productVideoPlayer"
          src={src}
          controls
          playsInline
          preload="auto"
          controlsList="nodownload"
        />
      </div>

      <style>{`
        .productVideo {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 1.5rem;
        }

        .productVideoEnter {
          animation: productVideoFadeIn ${EXIT_MS}ms ease forwards;
        }

        .productVideoExit {
          animation: productVideoFadeOut ${EXIT_MS}ms ease forwards;
          pointer-events: none;
        }

        .productVideoBackdrop {
          position: absolute;
          inset: 0;
          border: 0;
          padding: 0;
          cursor: pointer;
          background: rgba(20, 20, 20, 0.42);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .productVideoClose {
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

        .productVideoEnter .productVideoClose {
          animation: productVideoCloseIn ${EXIT_MS}ms ease forwards;
        }

        .productVideoExit .productVideoClose {
          animation: productVideoCloseOut ${EXIT_MS}ms ease forwards;
        }

        .productVideoClose:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .productVideoFrame {
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

        .productVideoEnter .productVideoFrame {
          animation: productVideoPopIn ${EXIT_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .productVideoExit .productVideoFrame {
          animation: productVideoPopOut ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .productVideoPlayer {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
        }

        @keyframes productVideoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes productVideoFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes productVideoPopIn {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes productVideoPopOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(18px) scale(0.92);
          }
        }

        @keyframes productVideoCloseIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes productVideoCloseOut {
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
