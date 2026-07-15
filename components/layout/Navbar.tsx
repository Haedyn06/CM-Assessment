"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type FillPhase = "idle" | "in" | "out";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#enterprise", label: "Enterprise" },
  { href: "#company", label: "Company" },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const [phase, setPhase] = useState<FillPhase>("idle");
  const leaveTimer = useRef<number | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const startFill = () => {
    clearLeaveTimer();
    setPhase("in");
  };

  const startEmpty = () => {
    clearLeaveTimer();
    setPhase("out");
    leaveTimer.current = window.setTimeout(() => {
      setPhase("idle");
      leaveTimer.current = null;
    }, 420);
  };

  return (
    <a
      href={href}
      className={`nav__link${phase === "in" ? " is-fill-in" : ""}${
        phase === "out" ? " is-fill-out" : ""
      }`}
      onMouseEnter={startFill}
      onMouseLeave={startEmpty}
      onFocus={startFill}
      onBlur={startEmpty}
    >
      <span className="nav__link-fill" aria-hidden />
      <span className="nav__link-marks" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="nav__link-label">{label}</span>
    </a>
  );
}

export function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__logo" aria-label="Convey home">
          convey.
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="nav__cta">
          <Button
            background="linear-gradient(90deg, #9fd9d4 0%, #e6d88a 100%)"
            hoverBackground="linear-gradient(105deg, #b7c6ec 0%, #a8d4cf 45%, #d4b8e4 100%)"
            borderColor="rgba(0,0,0,0.12)"
            hoverBorderColor="rgba(0,0,0,0.18)"
            hoverColor="#111111"
            className="nav__contact"
            style={{
              minHeight: "2.15rem",
              padding: "0.55rem 0.95rem",
              fontSize: "0.78rem",
              borderRadius: "0.35rem",
            }}
          >
            Contact sales
          </Button>
        </div>
      </div>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 40;
          border-top: 1px solid #1f1f1f;
          border-bottom: 1px solid #1f1f1f;
          background: rgba(243, 243, 241, 0.92);
          backdrop-filter: blur(8px);
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #111;
        }

        .nav__inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          max-width: 74rem;
          margin: 0 auto;
          padding: 0.7rem 1.25rem;
        }

        @media (min-width: 640px) {
          .nav__inner {
            padding: 0.75rem 2rem;
          }
        }

        @media (min-width: 1100px) {
          .nav__inner {
            padding: 0.8rem 3rem;
          }
        }

        .nav__logo {
          justify-self: start;
          font-size: 1.35rem;
          font-weight: 750;
          letter-spacing: -0.045em;
          color: #111;
          text-decoration: none;
          line-height: 1;
        }

        .nav__links {
          display: none;
          justify-content: center;
          align-items: center;
          gap: 0.15rem;
          justify-self: center;
        }

        @media (min-width: 720px) {
          .nav__links {
            display: flex;
          }
        }

        .nav__link {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.05rem;
          padding: 0.45rem 0.75rem;
          border-radius: 0.2rem;
          overflow: hidden;
          text-decoration: none;
          color: #1a1a1a;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 500;
          line-height: 1;
        }

        .nav__link-fill {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: rgba(198, 170, 214, 0.42);
          clip-path: inset(0 100% 0 0);
          transition: none;
        }

        .nav__link.is-fill-in .nav__link-fill {
          clip-path: inset(0 0 0 0);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav__link.is-fill-out .nav__link-fill {
          clip-path: inset(0 0 0 100%);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav__link-marks {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .nav__link.is-fill-in .nav__link-marks {
          opacity: 1;
        }

        .nav__link-marks span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #1a1a1a;
        }

        .nav__link-marks span:nth-child(1) { top: 4px; left: 4px; }
        .nav__link-marks span:nth-child(2) { top: 4px; right: 4px; }
        .nav__link-marks span:nth-child(3) { bottom: 4px; left: 4px; }
        .nav__link-marks span:nth-child(4) { bottom: 4px; right: 4px; }

        .nav__link-label {
          position: relative;
          z-index: 1;
        }

        .nav__cta {
          justify-self: end;
        }

        .nav__contact {
          font-weight: 500 !important;
        }
      `}</style>
    </header>
  );
}
