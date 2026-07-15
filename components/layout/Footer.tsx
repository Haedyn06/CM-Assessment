"use client";

import {
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { useDemoForm } from "@/components/ui/DemoForm";

const RESOURCES = [
  { href: "#enterprise", label: "Enterprise" },
  { href: "#legal", label: "Legal" },
  { href: "#privacy", label: "Privacy" },
  { href: "#security", label: "Security" },
] as const;

const CONNECT = [
  { id: "contact", label: "Contact Sales", action: "demo" as const },
  { id: "careers", label: "Careers", href: "#careers" },
] as const;

function BearWordmark() {
  return (
    <svg
      className="footerWordmark"
      viewBox="0 0 760 220"
      fill="none"
      aria-hidden
    >
      <g
        stroke="#4a4a4a"
        strokeWidth="1.4"
        strokeLinejoin="miter"
        strokeLinecap="square"
      >
        {/* B */}
        <path d="M70 40 H200 V180 H70 V40 Z" />
        <path d="M105 65 H165 V95 H105 V65 Z" />
        <path d="M105 120 H165 V155 H105 V120 Z" />
        {/* E */}
        <path d="M230 40 H365 V65 H265 V95 H350 V120 H265 V155 H365 V180 H230 V40 Z" />
        {/* A */}
        <path d="M400 180 H440 L480 70 L520 180 H560 L505 40 H455 L400 180 Z" />
        <path d="M448 120 H512 V145 H448 V120 Z" />
        {/* R */}
        <path d="M590 40 H720 V105 H655 V105 L740 180 H690 L620 120 H625 V180 H590 V40 Z" />
        <path d="M625 65 H685 V105 H625 V65 Z" />
      </g>

      <g fill="#d8d8d8">
        {[
          // B
          [70, 40],
          [200, 40],
          [200, 180],
          [70, 180],
          [105, 65],
          [165, 65],
          [165, 95],
          [105, 95],
          [105, 120],
          [165, 120],
          [165, 155],
          [105, 155],
          // E
          [230, 40],
          [365, 40],
          [365, 65],
          [265, 65],
          [265, 95],
          [350, 95],
          [350, 120],
          [265, 120],
          [265, 155],
          [365, 155],
          [365, 180],
          [230, 180],
          // A
          [400, 180],
          [440, 180],
          [480, 70],
          [520, 180],
          [560, 180],
          [505, 40],
          [455, 40],
          [448, 120],
          [512, 120],
          [512, 145],
          [448, 145],
          // R
          [590, 40],
          [720, 40],
          [720, 105],
          [655, 105],
          [740, 180],
          [690, 180],
          [620, 120],
          [625, 180],
          [590, 180],
          [625, 65],
          [685, 65],
          [685, 105],
          [625, 105],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>
    </svg>
  );
}

export function Footer() {
  const { openDemoForm } = useDemoForm();

  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerTop">
          <div className="footerBrand">
            <p className="footerLogo">bear.</p>
            <p className="footerTagline">
              The future belongs to the 100x operator.
            </p>
            <div className="footerSocials" aria-label="Social links">
              <a href="mailto:hello@bear.dev" aria-label="Email">
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

          <div className="footerCols">
            <div className="footerCol">
              <h3>RESOURCES</h3>
              <ul>
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footerCol">
              <h3>CONNECT</h3>
              <ul>
                {CONNECT.map((item) => (
                  <li key={item.id}>
                    {"action" in item && item.action === "demo" ? (
                      <button type="button" onClick={openDemoForm}>
                        {item.label}
                      </button>
                    ) : (
                      <a href={"href" in item ? item.href : "#"}>{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footerMark">
          <BearWordmark />
        </div>

        <p className="footerCopy">© 2026 Bear AI</p>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: #050505;
          color: #f4f4f4;
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }

        .footerInner {
          position: relative;
          max-width: 74rem;
          margin: 0 auto;
          padding: 3.75rem 1.25rem 1.75rem;
        }

        @media (min-width: 640px) {
          .footerInner {
            padding: 4.5rem 2rem 2rem;
          }
        }

        @media (min-width: 1100px) {
          .footerInner {
            padding: 5rem 3rem 2.25rem;
          }
        }

        .footerTop {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        @media (min-width: 800px) {
          .footerTop {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 3rem;
          }
        }

        .footerLogo {
          margin: 0 0 0.85rem;
          font-size: 1.55rem;
          font-weight: 750;
          letter-spacing: -0.045em;
          color: #fff;
          line-height: 1;
        }

        .footerTagline {
          margin: 0 0 1.35rem;
          max-width: 18rem;
          font-size: 0.95rem;
          line-height: 1.45;
          color: #8a8a8a;
        }

        .footerSocials {
          display: flex;
          align-items: center;
          gap: 0.95rem;
        }

        .footerSocials a {
          display: grid;
          place-items: center;
          color: #b0b0b0;
          transition: color 0.2s ease;
        }

        .footerSocials a:hover {
          color: #fff;
        }

        .footerCols {
          display: flex;
          gap: 3.5rem;
        }

        .footerCol h3 {
          margin: 0 0 1rem;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #7a7a7a;
        }

        .footerCol ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.7rem;
        }

        .footerCol a {
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.88rem;
          color: #f0f0f0;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footerCol button {
          padding: 0;
          border: 0;
          background: transparent;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.88rem;
          color: #f0f0f0;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .footerCol a:hover,
        .footerCol button:hover {
          color: #9fd9d4;
        }

        .footerMark {
          position: relative;
          margin: 3.5rem 0 1.5rem;
          pointer-events: none;
          user-select: none;
        }

        .footerWordmark {
          display: block;
          width: 100%;
          height: auto;
          max-height: 11rem;
        }

        @media (min-width: 800px) {
          .footerMark {
            margin: 4.5rem 0 1.75rem;
          }

          .footerWordmark {
            max-height: 14rem;
          }
        }

        .footerCopy {
          margin: 0;
          font-size: 0.8rem;
          color: #7a7a7a;
        }
      `}</style>
    </footer>
  );
}
