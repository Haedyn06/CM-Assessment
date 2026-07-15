"use client";

import { useState, type CSSProperties } from "react";
import { IoAdd } from "react-icons/io5";
import { LogoQuotes } from "@/components/ui/LogoQuotes";

export type HeroLogoQuote = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

export type HeroLogoProps = {
  src: string;
  alt: string;
  /** When true, shows the + marker and quote popup on hover */
  hasQuote?: boolean;
  quote?: HeroLogoQuote;
  /** Color applied to the logo on hover */
  hoverColor?: string;
  /** Default (resting) logo color */
  color?: string;
  /** Width / height ratio so the + sits on the real logo corner */
  aspectRatio?: number;
  className?: string;
};

export function HeroLogo({
  src,
  alt,
  hasQuote = false,
  quote,
  hoverColor = "#111111",
  color = "#6a6a6a",
  aspectRatio = 4,
  className = "",
}: HeroLogoProps) {
  const [open, setOpen] = useState(false);
  const showQuote = Boolean(hasQuote && quote);

  return (
    <li
      className={`heroLogo${showQuote ? " heroLogoHasQuote" : ""}${open ? " isOpen" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--heroLogoColor": color,
          "--heroLogoHover": hoverColor,
          "--heroLogoMask": `url(${src})`,
          "--heroLogoAspect": String(aspectRatio),
        } as CSSProperties
      }
      onMouseEnter={() => {
        if (showQuote) setOpen(true);
      }}
      onMouseLeave={() => {
        if (showQuote) setOpen(false);
      }}
    >
      <div className="heroLogoWrap">
        {showQuote && (
          <span className="heroLogoPlus" aria-hidden>
            <IoAdd size={12} />
          </span>
        )}

        <div
          className="heroLogoMedia"
          role="img"
          aria-label={alt}
          title={alt}
        />
      </div>

      {showQuote && quote && (
        <LogoQuotes
          open={open}
          logoSrc={src}
          logoAlt={alt}
          quote={quote.quote}
          name={quote.name}
          title={quote.title}
          avatar={quote.avatar}
        />
      )}

      <style>{`
        .heroLogo {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          list-style: none;
        }

        .heroLogoHasQuote {
          cursor: pointer;
        }

        .heroLogoWrap {
          position: relative;
          display: inline-block;
          line-height: 0;
        }

        .heroLogoPlus {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.05rem;
          height: 1.05rem;
          border-radius: 999px;
          border: 1.5px solid #9ec4e4;
          background: #cfe3f5;
          color: #fff;
          line-height: 0;
          transform: translate(45%, calc(-85% - 4px));
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease;
        }

        .heroLogo.isOpen .heroLogoPlus {
          transform: translate(45%, calc(-85% - 4px)) scale(1.08);
          background: #6aa3d4;
          border-color: #6aa3d4;
        }

        .heroLogoMedia {
          height: 1.45rem;
          width: calc(1.45rem * var(--heroLogoAspect));
          max-width: 9.5rem;
          background-color: var(--heroLogoColor);
          opacity: 0.72;
          -webkit-mask-image: var(--heroLogoMask);
          mask-image: var(--heroLogoMask);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: right center;
          mask-position: right center;
          -webkit-mask-size: contain;
          mask-size: contain;
          transition:
            background-color 0.25s ease,
            opacity 0.25s ease;
        }

        .heroLogo:hover .heroLogoMedia,
        .heroLogo.isOpen .heroLogoMedia {
          background-color: var(--heroLogoHover);
          opacity: 1;
        }
      `}</style>
    </li>
  );
}
