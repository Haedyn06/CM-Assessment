"use client";

import { useState } from "react";
import { HeroLogo, type HeroLogoQuote } from "@/components/ui/HeroLogo";
import { VideoComp } from "@/components/ui/VideoComp";

type LogoItem = {
  id: string;
  src: string;
  alt: string;
  hoverColor: string;
  aspectRatio: number;
  hasQuote?: boolean;
  quote?: HeroLogoQuote;
};

const LOGOS: LogoItem[] = [
  {
    id: "nbc",
    src: "/logos/nbc.png",
    alt: "NBCUniversal",
    hoverColor: "#0b1f4a",
    aspectRatio: 2016 / 752,
  },
  {
    id: "samsara",
    src: "/logos/samsara.png",
    alt: "Samsara",
    hoverColor: "#0b5fff",
    aspectRatio: 3768 / 904,
    hasQuote: true,
    quote: {
      quote: "Convey helps me free up my staff and create leverage for them to go work on higher value parts of the business... we're all in on Convey.",
      name: "Scott Hume",
      title: "Assistant Controller, Samsara",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
    },
  },
  {
    id: "unity",
    src: "/logos/unity.png",
    alt: "Unity",
    hoverColor: "#222222",
    aspectRatio: 676 / 246,
  },
  {
    id: "televisa",
    src: "/logos/televisa.png",
    alt: "TelevisaUnivision",
    hoverColor: "#6b2d8b",
    aspectRatio: 2560 / 939,
    hasQuote: true,
    quote: {
      quote: "I haven't had this much fun with work in a long time. The ability to think of an idea and create a solution without convincing an engineer is amazing.",
      name: "Jeremy Varner",
      title: "SVP Programmatic Operations, TelevisaUnivision",
      avatar: "https://convey.dev/headshots/jeremyvarner.jpeg",
    },
  },
  {
    id: "faire",
    src: "/logos/faire.png",
    alt: "Faire",
    hoverColor: "#111111",
    aspectRatio: 1343 / 169,
    hasQuote: true,
    quote: {
      quote: "We had team members spending hours each week pulling invoices from multiple shipping portals. With Convey, one of our team members was able to set up an automated workflow on their own ... no engineering support required.",
      name: "Kunal Bajaj",
      title: "Chief Accounting Officer, Faire",
      avatar: "https://convey.dev/headshots/kunalbajaj.png",
    },
  },
  {
    id: "chargepoint",
    src: "/logos/chargepoint.png",
    alt: "ChargePoint",
    hoverColor: "#1473e6",
    aspectRatio: 721 / 134,
    hasQuote: true,
    quote: {
      quote: "We deployed digital teammates across finance workflows and saw capacity open up within the first month.",
      name: "Jordan Lee",
      title: "Finance Director, ChargePoint",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
    },
  },
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

export function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-inner">
        {/* Details */}
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-badge__count">1,199,889 hours of work</span>
            <span className="hero-badge__rest">{" "} executed in the background since Q3&apos;25</span>
          </p>

          <h1 className="hero-title">
            The World&apos;s Most<br />Experienced Digital<br />Teammate
          </h1>

          <p className="hero-sub">
            Join leading enterprises and create your own digital teammates to 100x your output.
          </p>

          <form className="hero-cta" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="hero-email">Work email</label>
            
            <input className="hero-cta__input" id="hero-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="What's your work email?" />
            
            <button type="submit" className="hero-cta__btn">
              <span className="hero-cta__btn-bg" aria-hidden />
              <span className="hero-cta__btn-bg hero-cta__btn-bg--hover" aria-hidden />
              <CornerDots />
              <span className="hero-cta__btn-label">Get started</span>
            </button>
          </form>
        </div>

        {/* Video */}
        <div className="hero-media">
          <VideoComp src="/grass.mp4" label="Play hero video" />
        </div>
      </div>

      <ul className="hero-logos">
        {LOGOS.map((logo) => (
          <HeroLogo key={logo.id} src={logo.src} alt={logo.alt}
            hoverColor={logo.hoverColor} aspectRatio={logo.aspectRatio}
            hasQuote={logo.hasQuote} quote={logo.quote} />
        ))}
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
        }
      `}</style>
    </section>
  );
}
