"use client";

import {
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

const RESOURCES = [
  { href: "#enterprise", label: "Enterprise" },
  { href: "#legal", label: "Legal" },
  { href: "#privacy", label: "Privacy" },
  { href: "#security", label: "Security" },
] as const;

const CONNECT = [
  { href: "#contact", label: "Contact Sales" },
  { href: "#careers", label: "Careers" },
] as const;

function ConveyWordmark() {
  return (
    <svg
      className="footer__wordmark"
      viewBox="0 0 1200 220"
      fill="none"
      aria-hidden
    >
      <g
        stroke="#4a4a4a"
        strokeWidth="1.4"
        strokeLinejoin="miter"
        strokeLinecap="square"
      >
        {/* C */}
        <path d="M70 40 H175 V65 H105 V155 H175 V180 H70 V40 Z" />
        {/* O */}
        <path d="M210 40 H330 V180 H210 V40 Z" />
        <path d="M245 75 H295 V145 H245 V75 Z" />
        {/* N */}
        <path d="M365 180 V40 H400 L470 130 V40 H505 V180 H470 L400 90 V180 H365 Z" />
        {/* V */}
        <path d="M540 40 H580 L640 140 L700 40 H740 L655 180 H625 L540 40 Z" />
        {/* E */}
        <path d="M775 40 H910 V65 H810 V95 H895 V120 H810 V155 H910 V180 H775 V40 Z" />
        {/* Y */}
        <path d="M945 40 H985 L1045 110 L1105 40 H1145 L1065 130 V180 H1025 V130 L945 40 Z" />
      </g>

      {/* Anchor nodes */}
      <g fill="#d8d8d8">
        {[
          // C
          [70, 40], [175, 40], [175, 65], [105, 65], [105, 155], [175, 155], [175, 180], [70, 180],
          // O outer
          [210, 40], [330, 40], [330, 180], [210, 180],
          // O inner
          [245, 75], [295, 75], [295, 145], [245, 145],
          // N
          [365, 40], [400, 40], [470, 130], [470, 40], [505, 40], [505, 180], [470, 180], [400, 90], [400, 180], [365, 180],
          // V
          [540, 40], [580, 40], [640, 140], [700, 40], [740, 40], [655, 180], [625, 180],
          // E
          [775, 40], [910, 40], [910, 65], [810, 65], [810, 95], [895, 95], [895, 120], [810, 120], [810, 155], [910, 155], [910, 180], [775, 180],
          // Y
          [945, 40], [985, 40], [1045, 110], [1105, 40], [1145, 40], [1065, 130], [1065, 180], [1025, 180], [1025, 130],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">convey.</p>
            <p className="footer__tagline">
              The future belongs to the 100x operator.
            </p>
            <div className="footer__socials" aria-label="Social links">
              <a href="mailto:hello@convey.dev" aria-label="Email">
                <IoMailOutline size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoLinkedin size={18} />
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                target="_blank"
                rel="noreferrer"
              >
                <RiTwitterXFill size={16} />
              </a>
            </div>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h3>RESOURCES</h3>
              <ul>
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h3>CONNECT</h3>
              <ul>
                {CONNECT.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__mark">
          <ConveyWordmark />
        </div>

        <p className="footer__copy">© 2026 Convey AI</p>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: #050505;
          color: #f4f4f4;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }

        .footer__inner {
          position: relative;
          max-width: 74rem;
          margin: 0 auto;
          padding: 3.75rem 1.25rem 1.75rem;
        }

        @media (min-width: 640px) {
          .footer__inner {
            padding: 4.5rem 2rem 2rem;
          }
        }

        @media (min-width: 1100px) {
          .footer__inner {
            padding: 5rem 3rem 2.25rem;
          }
        }

        .footer__top {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        @media (min-width: 800px) {
          .footer__top {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 3rem;
          }
        }

        .footer__logo {
          margin: 0 0 0.85rem;
          font-size: 1.55rem;
          font-weight: 750;
          letter-spacing: -0.045em;
          color: #fff;
          line-height: 1;
        }

        .footer__tagline {
          margin: 0 0 1.35rem;
          max-width: 18rem;
          font-size: 0.95rem;
          line-height: 1.45;
          color: #8a8a8a;
        }

        .footer__socials {
          display: flex;
          align-items: center;
          gap: 0.95rem;
        }

        .footer__socials a {
          display: grid;
          place-items: center;
          color: #b0b0b0;
          transition: color 0.2s ease;
        }

        .footer__socials a:hover {
          color: #fff;
        }

        .footer__cols {
          display: flex;
          gap: 3.5rem;
        }

        .footer__col h3 {
          margin: 0 0 1rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #7a7a7a;
        }

        .footer__col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.7rem;
        }

        .footer__col a {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.88rem;
          color: #f0f0f0;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer__col a:hover {
          color: #9fd9d4;
        }

        .footer__mark {
          position: relative;
          margin: 3.5rem 0 1.5rem;
          pointer-events: none;
          user-select: none;
        }

        .footer__wordmark {
          display: block;
          width: 100%;
          height: auto;
          max-height: 11rem;
        }

        @media (min-width: 800px) {
          .footer__mark {
            margin: 4.5rem 0 1.75rem;
          }

          .footer__wordmark {
            max-height: 14rem;
          }
        }

        .footer__copy {
          margin: 0;
          font-size: 0.8rem;
          color: #7a7a7a;
        }
      `}</style>
    </footer>
  );
}
