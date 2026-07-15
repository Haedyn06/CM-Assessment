"use client";

import type { CSSProperties } from "react";

export type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  background?: string;
  className?: string;
  style?: CSSProperties;
};

export function TestimonialCard({ quote, name, title, avatar, background = "#d9ecee", className = "", style }: TestimonialCardProps) {
  return (
    <article
      className={`testimonialCard${className ? ` ${className}` : ""}`}
      style={{ background, ...style }}
    >
      <span className="testimonialCardDot testimonialCardDotTl" aria-hidden />
      <span className="testimonialCardDot testimonialCardDotTr" aria-hidden />
      <span className="testimonialCardDot testimonialCardDotBl" aria-hidden />
      <span className="testimonialCardDot testimonialCardDotBr" aria-hidden />

      <p className="testimonialCardQuote">&ldquo;{quote}&rdquo;</p>

      <div className="testimonialCardAuthor">
        <img src={avatar} alt="" className="testimonialCardAvatar" />
        <div>
          <div className="testimonialCardName">{name}</div>
          <div className="testimonialCardRole">{title}</div>
        </div>
      </div>

      <style>{`
        .testimonialCard {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 22rem;
          height: 100%;
          padding: 1.6rem 1.5rem 1.35rem;
          border-radius: 0.15rem;
          color: #1a1a1a;
          font-family: var(--fontGeistMono), ui-monospace, monospace;
        }

        .testimonialCardDot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #2a2a2a;
          pointer-events: none;
        }

        .testimonialCardDotTl { top: 8px; left: 8px; }
        .testimonialCardDotTr { top: 8px; right: 8px; }
        .testimonialCardDotBl { bottom: 8px; left: 8px; }
        .testimonialCardDotBr { bottom: 8px; right: 8px; }

        .testimonialCardQuote {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
          letter-spacing: -0.01em;
          color: #1f1f1f;
        }

        .testimonialCardAuthor {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .testimonialCardAvatar {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.3rem;
          object-fit: cover;
          flex-shrink: 0;
        }

        .testimonialCardName {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.25;
        }

        .testimonialCardRole {
          margin-top: 0.15rem;
          font-size: 0.72rem;
          line-height: 1.35;
          color: #6e6e6e;
        }
      `}</style>
    </article>
  );
}
