"use client";

import { useState } from "react";

type LogoId = | "nbc" | "samsara" | "unity" | "televisa" | "faire" | "chargepoint";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

const TESTIMONIALS: Partial<Record<LogoId, Testimonial>> = {
  samsara: {
    quote:
      "Convey helps me free up my staff and create leverage for them to go work on higher value parts of the business... we're all in on Convey.",
    name: "Scott Hume",
    title: "Assistant Controller, Samsara",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
  },
  televisa: {
    quote:
      "I haven't had this much fun with work in a long time. The ability to think of an idea and create a solution without convincing an engineer is amazing.",
    name: "Jeremy Varner",
    title: "SVP Programmatic Operations, TelevisaUnivision",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
  },
  faire: {
    quote:
      "Convey teammates handle the busywork so our operators can focus on judgment calls that actually move the business.",
    name: "Alex Rivera",
    title: "Operations Lead, Faire",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
  },
  chargepoint: {
    quote:
      "We deployed digital teammates across finance workflows and saw capacity open up within the first month.",
    name: "Jordan Lee",
    title: "Finance Director, ChargePoint",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  },
};

const LOGOS: { id: LogoId; hasPlus?: boolean }[] = [
  { id: "nbc" },
  { id: "samsara", hasPlus: true },
  { id: "unity" },
  { id: "televisa", hasPlus: true },
  { id: "faire", hasPlus: true },
  { id: "chargepoint", hasPlus: true },
];

function CornerDots() {
  return (
    <>
      <span aria-hidden className="hero-dot hero-dot--tl" />
      <span aria-hidden className="hero-dot hero-dot--tr" />
      <span aria-hidden className="hero-dot hero-dot--bl" />
      <span aria-hidden className="hero-dot hero-dot--br" />
    </>
  );
}

function LogoMark({ id }: { id: LogoId }) {
  switch (id) {
    case "nbc":
      return (
        <span className="hero-logo__mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2c2.2 3.2 3.5 5.8 3.5 8.2a3.5 3.5 0 1 1-7 0C8.5 7.8 9.8 5.2 12 2z" />
            <ellipse cx="12" cy="18.5" rx="5.5" ry="2.2" opacity="0.35" />
          </svg>
          NBCUniversal
        </span>
      );
    case "samsara":
      return (
        <span className="hero-logo__mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M8 14c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="9.2" cy="10.2" r="1.1" />
            <circle cx="14.8" cy="10.2" r="1.1" />
          </svg>
          samsara
        </span>
      );
    case "unity":
      return (
        <span className="hero-logo__mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path
              d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M12 2.5v9.5M12 12l8-5M12 12l-8-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          unity
        </span>
      );
    case "televisa":
      return (
        <span className="hero-logo__mark hero-logo__mark--stack">
          <span>Televisa</span>
          <span>Univision</span>
        </span>
      );
    case "faire":
      return <span className="hero-logo__mark hero-logo__mark--faire">FAIRE</span>;
    case "chargepoint":
      return (
        <span className="hero-logo__mark">
          -chargepoint<span className="hero-logo__plus-char">+</span>
        </span>
      );
  }
}

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [activeLogo, setActiveLogo] = useState<LogoId | null>(null);

  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-badge__count">1,199,889 hours of work</span>
            <span className="hero-badge__rest">
              {" "}
              executed in the background since Q3&apos;25
            </span>
          </p>

          <h1 className="hero-title">
            The World&apos;s Most
            <br />
            Experienced Digital
            <br />
            Teammate
          </h1>

          <p className="hero-sub">
            Join leading enterprises and create your own digital teammates to
            100x your output.
          </p>

          <form
            className="hero-cta"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="sr-only" htmlFor="hero-email">
              Work email
            </label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email?"
              className="hero-cta__input"
            />
            <button type="submit" className="hero-cta__btn">
              <span className="hero-cta__btn-bg" aria-hidden />
              <span
                className="hero-cta__btn-bg hero-cta__btn-bg--hover"
                aria-hidden
              />
              <CornerDots />
              <span className="hero-cta__btn-label">Get started</span>
            </button>
          </form>
        </div>

        <div className="hero-media">
          {/* TODO: replace placeholder with <video> / poster when media is ready */}
          <div className="hero-media__frame">
            <div className="hero-media__placeholder">
              <span className="hero-media__hint">Video / media placeholder</span>
            </div>

            <button type="button" className="hero-play" aria-label="Play video">
              <CornerDots />
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="currentColor"
                aria-hidden
              >
                <path d="M0 0v12l10-6L0 0Z" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </div>

      <ul className="hero-logos">
        {LOGOS.map((logo) => {
          const testimonial = TESTIMONIALS[logo.id];
          const isActive = activeLogo === logo.id;
          const interactive = Boolean(logo.hasPlus && testimonial);

          return (
            <li
              key={logo.id}
              className={`hero-logo${interactive ? " hero-logo--interactive" : ""}${
                isActive ? " is-active" : ""
              }`}
              onMouseEnter={() => {
                if (interactive) setActiveLogo(logo.id);
              }}
              onMouseLeave={() => {
                if (interactive) setActiveLogo(null);
              }}
            >
              {logo.hasPlus && (
                <span className="hero-logo__plus" aria-hidden>
                  +
                </span>
              )}
              {!logo.hasPlus && <span className="hero-logo__plus-spacer" aria-hidden />}

              <div className="hero-logo__label">
                <LogoMark id={logo.id} />
              </div>

              {testimonial && (
                <div
                  className={`hero-popup${isActive ? " is-open" : ""}`}
                  role="tooltip"
                >
                  <div className="hero-popup__logo">
                    <LogoMark id={logo.id} />
                  </div>
                  <div className="hero-popup__quote-mark" aria-hidden>
                    “
                  </div>
                  <p className="hero-popup__quote">{testimonial.quote}</p>
                  <div className="hero-popup__author">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testimonial.avatar}
                      alt=""
                      className="hero-popup__avatar"
                    />
                    <div>
                      <div className="hero-popup__name">{testimonial.name}</div>
                      <div className="hero-popup__title">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <style>{`
        .hero {
          position: relative;
          isolation: isolate;
          overflow: visible;
          padding: 4.5rem 1.25rem 3.5rem;
          background:
            radial-gradient(
              ellipse 70% 55% at 72% 38%,
              rgba(200, 220, 235, 0.35),
              transparent 58%
            ),
            radial-gradient(
              ellipse 55% 45% at 18% 70%,
              rgba(230, 225, 210, 0.35),
              transparent 52%
            ),
            #f3f3f1;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1f1f1f;
        }

        @media (min-width: 640px) {
          .hero {
            padding: 5rem 2rem 4rem;
          }
        }

        @media (min-width: 1024px) {
          .hero {
            padding: 5.5rem 3rem 4.5rem;
          }
        }

        .hero-grid {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: radial-gradient(
            circle,
            rgba(120, 120, 120, 0.5) 0.7px,
            transparent 0.8px
          );
          background-size: 18px 18px;
          mask-image: radial-gradient(
            ellipse 75% 70% at 50% 42%,
            black 18%,
            transparent 78%
          );
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 2.5rem;
          align-items: center;
          max-width: 72rem;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .hero-inner {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 3rem;
          }
        }

        .hero-copy {
          max-width: 34rem;
        }

        .hero-badge {
          margin: 0 0 1.15rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: #8a8a8a;
        }

        .hero-badge__count {
          display: inline-block;
          border-radius: 3px;
          background: #f0d8d4;
          padding: 0.1rem 0.4rem;
          color: #2a2a2a;
          font-weight: 600;
        }

        .hero-title {
          margin: 0 0 1rem;
          font-size: clamp(2rem, 4.2vw, 3.15rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #1f1f1f;
        }

        .hero-sub {
          margin: 0 0 1.75rem;
          max-width: 28rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.875rem;
          line-height: 1.55;
          color: #5c5c5c;
        }

        .hero-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          max-width: 28rem;
          min-height: 3.25rem;
          padding: 0.35rem 0.35rem 0.35rem 0.9rem;
          border: 1px solid #d6d6d6;
          border-radius: 0.65rem;
          background: rgba(255, 255, 255, 0.55);
        }

        .hero-cta__input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          outline: none;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8125rem;
          color: #222;
        }

        .hero-cta__input::placeholder {
          color: #a3a3a3;
        }

        .hero-cta__btn {
          position: relative;
          isolation: isolate;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.55rem;
          padding: 0 1.15rem;
          border: 0;
          border-radius: 0.45rem;
          cursor: pointer;
          overflow: hidden;
          background: transparent;
        }

        .hero-cta__btn-bg {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            #8fdfe0 0%,
            #b7eb9a 48%,
            #efe48a 100%
          );
          transition: opacity 0.45s ease;
          z-index: 0;
        }

        .hero-cta__btn-bg--hover {
          background: linear-gradient(
            135deg,
            #c9b6f0 0%,
            #a8c4f5 42%,
            #8ed8e4 100%
          );
          opacity: 0;
        }

        .hero-cta__btn:hover .hero-cta__btn-bg--hover,
        .hero-cta__btn:focus-visible .hero-cta__btn-bg--hover {
          opacity: 1;
        }

        .hero-cta__btn-label {
          position: relative;
          z-index: 2;
          font-size: 0.8125rem;
          font-weight: 650;
          color: #111;
        }

        .hero-dot {
          position: absolute;
          z-index: 3;
          width: 3px;
          height: 3px;
          background: #111;
          pointer-events: none;
        }

        .hero-dot--tl { top: 5px; left: 5px; }
        .hero-dot--tr { top: 5px; right: 5px; }
        .hero-dot--bl { bottom: 5px; left: 5px; }
        .hero-dot--br { bottom: 5px; right: 5px; }

        .hero-media__frame {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 0.65rem;
          background: #e4e4e2;
          box-shadow: 0 20px 60px -28px rgba(0, 0, 0, 0.28);
        }

        .hero-media__placeholder {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          border: 1px dashed #c4c4c0;
          background: linear-gradient(135deg, #ececea 0%, #e0e0dc 100%);
        }

        .hero-media__hint {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.75rem;
          color: #8a8a8a;
        }

        .hero-play {
          position: absolute;
          top: 50%;
          left: 50%;
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

        .hero-play:hover {
          background: rgba(255, 255, 255, 0.72);
        }

        .hero-logos {
          position: relative;
          z-index: 5;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: center;
          gap: 1.75rem 2rem;
          list-style: none;
          margin: 3.25rem auto 0;
          padding: 0;
          max-width: 58rem;
        }

        @media (min-width: 900px) {
          .hero-logos {
            justify-content: space-between;
            gap: 1rem;
          }
        }

        .hero-logo {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #4a4a4a;
        }

        .hero-logo--interactive {
          cursor: pointer;
        }

        .hero-logo__plus,
        .hero-logo__plus-spacer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.15rem;
          height: 1.15rem;
          margin-bottom: 0.45rem;
        }

        .hero-logo__plus {
          border-radius: 999px;
          border: 1.5px solid #9ec4e4;
          background: #cfe3f5;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 600;
          line-height: 1;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .hero-logo.is-active .hero-logo__plus {
          transform: scale(1.08);
          background: #6aa3d4;
          border-color: #6aa3d4;
        }

        .hero-logo__label {
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .hero-logo--interactive:hover .hero-logo__label,
        .hero-logo.is-active .hero-logo__label {
          opacity: 1;
        }

        .hero-logo__mark {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .hero-logo__mark--stack {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          font-size: 0.7rem;
          line-height: 1.15;
        }

        .hero-logo__mark--faire {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          letter-spacing: 0.12em;
          font-size: 0.95rem;
        }

        .hero-logo__plus-char {
          color: #6a6a6a;
        }

        .hero-popup {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 0.85rem);
          width: min(22rem, 78vw);
          padding: 1.35rem 1.35rem 1.2rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 22px 60px -24px rgba(0, 0, 0, 0.28);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 10px) scale(0.96);
          transition:
            opacity 0.28s ease,
            transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
            visibility 0.28s ease;
          z-index: 20;
        }

        .hero-popup.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translate(-50%, 0) scale(1);
        }

        .hero-popup__logo {
          display: flex;
          justify-content: center;
          margin-bottom: 0.85rem;
          color: #4a4a4a;
        }

        .hero-popup__quote-mark {
          margin-bottom: 0.2rem;
          font-size: 1.5rem;
          line-height: 1;
          color: #7fb3e0;
        }

        .hero-popup__quote {
          margin: 0 0 1.1rem;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: #333;
        }

        .hero-popup__author {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .hero-popup__avatar {
          width: 2.15rem;
          height: 2.15rem;
          border-radius: 999px;
          object-fit: cover;
        }

        .hero-popup__name {
          font-size: 0.8125rem;
          font-weight: 650;
          color: #1a1a1a;
        }

        .hero-popup__title {
          font-size: 0.75rem;
          color: #8a8a8a;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 480px) {
          .hero-cta {
            flex-direction: column;
            align-items: stretch;
            padding: 0.55rem;
          }

          .hero-cta__input {
            min-height: 2.4rem;
            padding: 0 0.35rem;
          }

          .hero-cta__btn {
            width: 100%;
          }

          .hero-popup {
            left: 50%;
          }
        }
      `}</style>
    </section>
  );
}
