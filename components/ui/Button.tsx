"use client";

import {
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

type FillPhase = "idle" | "in" | "out";

type DotButtonProps = {
  children: ReactNode;
  /** Text / icon color */
  color?: string;
  /** Default background (solid or CSS gradient) */
  background?: string;
  /** Hover text color */
  hoverColor?: string;
  /** Hover background (solid or CSS gradient) — fills L→R on hover */
  hoverBackground?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  dotColor?: string;
  hoverDotColor?: string;
  /** Extra tick marks at top/bottom midpoints (product CTA style) */
  midMarks?: boolean;
  /** Render as a non-interactive span (visual-only) */
  decorative?: boolean;
  /** Soften corners (nav CTA style) */
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style" | "className">;

export function Button({
  children,
  color = "#111111",
  background = "rgba(255, 255, 255, 0.72)",
  hoverColor,
  hoverBackground = "#121212",
  borderColor = "transparent",
  hoverBorderColor,
  dotColor,
  hoverDotColor,
  midMarks = false,
  decorative = false,
  rounded = true,
  className = "",
  style,
  type = "button",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: DotButtonProps) {
  const [phase, setPhase] = useState<FillPhase>("idle");
  const leaveTimer = useRef<number | null>(null);

  const resolvedHoverColor =
    hoverColor ?? (hoverBackground === "#121212" ? "#ffffff" : color);
  const resolvedHoverBorder =
    hoverBorderColor ??
    (hoverBackground === "#121212" ? hoverBackground : borderColor);
  const resolvedDotColor = dotColor ?? color;
  const resolvedHoverDotColor = hoverDotColor ?? resolvedHoverColor;

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

  const vars = {
    "--dot-btn-color": color,
    "--dot-btn-bg": background,
    "--dot-btn-hover-color": resolvedHoverColor,
    "--dot-btn-hover-bg": hoverBackground,
    "--dot-btn-border": borderColor,
    "--dot-btn-hover-border": resolvedHoverBorder,
    "--dot-btn-dot": resolvedDotColor,
    "--dot-btn-hover-dot": resolvedHoverDotColor,
  } as CSSProperties;

  const classes = [
    "dot-btn",
    midMarks ? "dot-btn--mid" : "",
    rounded ? "" : "dot-btn--square",
    phase === "in" ? "is-fill-in" : "",
    phase === "out" ? "is-fill-out" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="dot-btn__bg" aria-hidden />
      <span className="dot-btn__bg dot-btn__bg--hover" aria-hidden />
      <span className="dot-btn__marks" aria-hidden>
        <span className="dot-btn__dot dot-btn__dot--tl" />
        <span className="dot-btn__dot dot-btn__dot--tr" />
        <span className="dot-btn__dot dot-btn__dot--bl" />
        <span className="dot-btn__dot dot-btn__dot--br" />
        {midMarks && (
          <>
            <span className="dot-btn__dot dot-btn__dot--tm" />
            <span className="dot-btn__dot dot-btn__dot--bm" />
          </>
        )}
      </span>
      <span className="dot-btn__label">{children}</span>

      <style>{`
        .dot-btn {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 2.55rem;
          padding: 0.65rem 1.1rem;
          border: 1px solid var(--dot-btn-border);
          border-radius: 0.4rem;
          background: transparent;
          color: var(--dot-btn-color);
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          overflow: hidden;
          transition:
            color 0.3s ease,
            border-color 0.3s ease;
        }

        .dot-btn--square {
          border-radius: 0.2rem;
        }

        .dot-btn__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          background: var(--dot-btn-bg);
        }

        .dot-btn__bg--hover {
          background: var(--dot-btn-hover-bg);
          clip-path: inset(0 100% 0 0);
          transition: none;
        }

        .dot-btn.is-fill-in .dot-btn__bg--hover {
          clip-path: inset(0 0 0 0);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .dot-btn.is-fill-out .dot-btn__bg--hover {
          clip-path: inset(0 0 0 100%);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .dot-btn.is-fill-in,
        .dot-btn:focus-visible {
          color: var(--dot-btn-hover-color);
          border-color: var(--dot-btn-hover-border);
          outline: none;
        }

        .dot-btn:focus-visible .dot-btn__bg--hover {
          clip-path: inset(0 0 0 0);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .dot-btn.is-fill-in .dot-btn__dot,
        .dot-btn:focus-visible .dot-btn__dot {
          background: var(--dot-btn-hover-dot);
        }

        .dot-btn__marks {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .dot-btn__dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--dot-btn-dot);
          transition: background 0.3s ease;
        }

        .dot-btn__dot--tl { top: 5px; left: 5px; }
        .dot-btn__dot--tr { top: 5px; right: 5px; }
        .dot-btn__dot--bl { bottom: 5px; left: 5px; }
        .dot-btn__dot--br { bottom: 5px; right: 5px; }
        .dot-btn__dot--tm {
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
        .dot-btn__dot--bm {
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }

        .dot-btn__label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }
      `}</style>
    </>
  );

  if (decorative) {
    return (
      <span className={classes} style={{ ...vars, ...style }} aria-hidden>
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={{ ...vars, ...style }}
      {...rest}
      onMouseEnter={(e) => {
        startFill();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        startEmpty();
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        startFill();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        startEmpty();
        onBlur?.(e);
      }}
    >
      {content}
    </button>
  );
}
