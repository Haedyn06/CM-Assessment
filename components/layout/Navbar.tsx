"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useDemoForm } from "@/components/ui/DemoForm";
import { useFillHover } from "@/lib/useFillHover";

type FillPhase = "idle" | "in" | "out";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#enterprise", label: "Enterprise" },
  { href: "#company", label: "Company" },
] as const;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let scrollFrame = 0;

function animateScrollTo(targetY: number, duration = 1100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  window.cancelAnimationFrame(scrollFrame);
  const start = performance.now();

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      scrollFrame = window.requestAnimationFrame(step);
    }
  };

  scrollFrame = window.requestAnimationFrame(step);
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  const nav = document.querySelector(".nav");
  const navHeight = nav instanceof HTMLElement ? nav.offsetHeight : 0;
  const top =
    el.getBoundingClientRect().top + window.scrollY - navHeight - 8;

  animateScrollTo(Math.max(0, top), 1200);
  window.history.pushState(null, "", hash);
}

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

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <a
      href={href}
      className={`navLink${phase === "in" ? " isFillIn" : ""}${
        phase === "out" ? " isFillOut" : ""
      }`}
      onClick={onClick}
      onMouseEnter={startFill}
      onMouseLeave={startEmpty}
      onFocus={startFill}
      onBlur={startEmpty}
    >
      <span className="navLinkFill" aria-hidden />
      <span className="navLinkMarks" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="navLinkLabel">{label}</span>
    </a>
  );
}

export function Navbar() {
  const { openDemoForm } = useDemoForm();
  const contactFill = useFillHover();

  return (
    <header className="nav">
      <div className="navInner">
        <Link href="/" className="navLogo" aria-label="Bear home">
          bear.
        </Link>

        <nav className="navLinks" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="navCta">
          <button
            type="button"
            className={`fillBtn navContact ${contactFill.fillClass}`}
            onClick={openDemoForm}
            {...contactFill.fillHandlers}
          >
            <span className="fillBtnBase" aria-hidden />
            <span className="fillBtnWash" aria-hidden />
            <span className="fillBtnLabel">Contact sales</span>
          </button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "navUser",
              },
            }}
          />
        </div>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          border-top: 1px solid #1f1f1f;
          border-bottom: 1px solid #1f1f1f;
          background: rgba(243, 243, 241, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif;
          color: #111;
        }

        .navInner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          max-width: 74rem;
          margin: 0 auto;
          padding: 0.7rem 1.25rem;
        }

        @media (min-width: 640px) {
          .navInner {
            padding: 0.75rem 2rem;
          }
        }

        @media (min-width: 1100px) {
          .navInner {
            padding: 0.8rem 3rem;
          }
        }

        .navLogo {
          justify-self: start;
          font-size: 1.35rem;
          font-weight: 750;
          letter-spacing: -0.045em;
          color: #111;
          text-decoration: none;
          line-height: 1;
        }

        .navLinks {
          display: none;
          justify-content: center;
          align-items: center;
          gap: 0.15rem;
          justify-self: center;
        }

        @media (min-width: 720px) {
          .navLinks {
            display: flex;
          }
        }

        .navLink {
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
          font-family: var(--fontGeistMono), ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 500;
          line-height: 1;
        }

        .navLinkFill {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: rgba(198, 170, 214, 0.42);
          clip-path: inset(0 100% 0 0);
          transition: none;
        }

        .navLink.isFillIn .navLinkFill {
          clip-path: inset(0 0 0 0);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navLink.isFillOut .navLinkFill {
          clip-path: inset(0 0 0 100%);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navLinkMarks {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .navLink.isFillIn .navLinkMarks {
          opacity: 1;
        }

        .navLinkMarks span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #1a1a1a;
        }

        .navLinkMarks span:nth-child(1) { top: 4px; left: 4px; }
        .navLinkMarks span:nth-child(2) { top: 4px; right: 4px; }
        .navLinkMarks span:nth-child(3) { bottom: 4px; left: 4px; }
        .navLinkMarks span:nth-child(4) { bottom: 4px; right: 4px; }

        .navLinkLabel {
          position: relative;
          z-index: 1;
        }

        .navCta {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .navContact {
          --fillBtnColor: #111111;
          --fillBtnBg: linear-gradient(90deg, #9fd9d4 0%, #e6d88a 100%);
          --fillBtnHoverColor: #111111;
          --fillBtnHoverBg: linear-gradient(
            105deg,
            #b7c6ec 0%,
            #a8d4cf 45%,
            #d4b8e4 100%
          );
          --fillBtnBorder: rgba(0, 0, 0, 0.12);
          --fillBtnHoverBorder: rgba(0, 0, 0, 0.18);
          min-height: 2.15rem;
          padding: 0.55rem 0.95rem;
          border-radius: 0.35rem;
          font-size: 0.78rem;
          font-weight: 500;
        }

        .navUser {
          width: 2rem !important;
          height: 2rem !important;
        }
      `}</style>
    </header>
  );
}
