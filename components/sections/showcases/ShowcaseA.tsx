"use client";

import { ShowcaseAWindow } from "@/components/ui/ShowcaseAWindow";

function CornerMarks() {
  return (
    <span className="showcase-a__corners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function PmgLogo() {
  return (
    <svg
      className="showcase-a__pmg"
      width="72"
      height="28"
      viewBox="0 0 72 28"
      fill="none"
      aria-label="PMG"
    >
      {/* Abstract eye / mark */}
      <path
        d="M8 14c2.4-4.2 5.6-6.4 8.8-6.4S22.4 9.8 24.8 14c-2.4 4.2-5.6 6.4-8.8 6.4S10.4 18.2 8 14Z"
        stroke="#4a4a4a"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="16.8" cy="14" r="2.4" fill="#4a4a4a" />
      <path
        d="M32.2 21.5V7h5.8c2.7 0 4.4 1.5 4.4 3.8 0 1.7-.9 2.9-2.4 3.4l3.2 7.3h-3.4l-2.9-6.7h-1.6v6.7h-3.1Zm3.1-9.3h2.4c1.2 0 1.9-.6 1.9-1.6s-.7-1.5-1.9-1.5h-2.4v3.1Z"
        fill="#3a3a3a"
      />
      <path d="M45.2 21.5V7h3.1v14.5h-3.1Z" fill="#3a3a3a" />
      <path d="M51.4 21.5V7h3.1v11.6H60V21.5H51.4Z" fill="#3a3a3a" />
    </svg>
  );
}

export function ShowcaseASection() {
  return (
    <section className="showcase-a">
      <div className="showcase-a__dots" aria-hidden />

      <div className="showcase-a__inner">
        <div className="showcase-a__copy">
          <p className="showcase-a__badge">
            <CornerMarks />
            TRUST AND OVERSIGHT
          </p>

          <h2 className="showcase-a__title">Operators Become Conductors</h2>

          <p className="showcase-a__text">
            You give your AI teammate responsibilities. It takes the work fully
            off your plate. From summarizing emails, to complex multistep
            processes across your systems.
          </p>

          <blockquote className="showcase-a__quote">
            <CornerMarks />
            <PmgLogo />
            <p>
              &ldquo;Convey enables our best operators to effectively clone
              themselves – scaling their best practices and creating more
              capacity for strategic and creative work.&rdquo;
            </p>
            <footer>Sam Bloom • Head of Partnerships</footer>
          </blockquote>
        </div>

        <div className="showcase-a__window">
          <ShowcaseAWindow />
        </div>
      </div>

      <style>{`
        .showcase-a {
          position: relative;
          isolation: isolate;
          padding: 4.25rem 1.25rem 4.75rem;
          background: #f3f3f1;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1a1a1a;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .showcase-a {
            padding: 5.25rem 2rem 5.75rem;
          }
        }

        @media (min-width: 1100px) {
          .showcase-a {
            padding: 5.75rem 3rem 6.25rem;
          }
        }

        .showcase-a__dots {
          pointer-events: none;
          position: absolute;
          inset: 8% 0 8% 42%;
          z-index: 0;
          opacity: 0.55;
          background-image: radial-gradient(
            circle,
            rgba(130, 130, 130, 0.38) 1px,
            transparent 1.2px
          );
          background-size: 16px 16px;
          mask-image: radial-gradient(
            ellipse 70% 70% at 55% 45%,
            #000 20%,
            transparent 75%
          );
        }

        .showcase-a__inner {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 2.5rem;
          align-items: center;
          max-width: 74rem;
          margin: 0 auto;
        }

        @media (min-width: 980px) {
          .showcase-a__inner {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr);
            gap: 3.25rem 2.75rem;
            align-items: center;
          }
        }

        .showcase-a__copy {
          max-width: 28.5rem;
        }

        .showcase-a__badge {
          position: relative;
          display: inline-block;
          margin: 0 0 1.35rem;
          padding: 0.42rem 0.7rem;
          border-radius: 0.15rem;
          background: #121212;
          color: #f6f6f6;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          line-height: 1;
        }

        .showcase-a__corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .showcase-a__corners span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: currentColor;
        }

        .showcase-a__badge .showcase-a__corners span {
          background: #f6f6f6;
        }

        .showcase-a__corners span:nth-child(1) { top: 3px; left: 3px; }
        .showcase-a__corners span:nth-child(2) { top: 3px; right: 3px; }
        .showcase-a__corners span:nth-child(3) { bottom: 3px; left: 3px; }
        .showcase-a__corners span:nth-child(4) { bottom: 3px; right: 3px; }

        .showcase-a__title {
          margin: 0 0 1.05rem;
          max-width: 11ch;
          font-size: clamp(2.35rem, 4.6vw, 3.55rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: #141414;
          animation: showcase-a-rise 0.7s ease both;
        }

        .showcase-a__text {
          margin: 0 0 2rem;
          max-width: 28rem;
          font-size: 1.02rem;
          line-height: 1.62;
          color: #5a5a5a;
          animation: showcase-a-rise 0.7s ease 0.08s both;
        }

        .showcase-a__quote {
          position: relative;
          margin: 0;
          padding: 1.35rem 1.3rem 1.25rem;
          border: 1px solid #d4d4d2;
          background: transparent;
          color: #2a2a2a;
          animation: showcase-a-rise 0.7s ease 0.16s both;
        }

        .showcase-a__quote .showcase-a__corners span {
          background: #2a2a2a;
        }

        .showcase-a__quote .showcase-a__corners span:nth-child(1) { top: 4px; left: 4px; }
        .showcase-a__quote .showcase-a__corners span:nth-child(2) { top: 4px; right: 4px; }
        .showcase-a__quote .showcase-a__corners span:nth-child(3) { bottom: 4px; left: 4px; }
        .showcase-a__quote .showcase-a__corners span:nth-child(4) { bottom: 4px; right: 4px; }

        .showcase-a__pmg {
          display: block;
          margin-bottom: 0.95rem;
        }

        .showcase-a__quote p {
          margin: 0 0 1rem;
          font-size: 0.98rem;
          font-weight: 400;
          line-height: 1.55;
          color: #2e2e2e;
        }

        .showcase-a__quote footer {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.76rem;
          color: #6a6a6a;
        }

        .showcase-a__window {
          width: min(100%, 38rem);
          justify-self: stretch;
          animation: showcase-a-float 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        @media (min-width: 980px) {
          .showcase-a__window {
            justify-self: end;
            width: 100%;
            max-width: 40rem;
          }
        }

        @keyframes showcase-a-rise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes showcase-a-float {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
