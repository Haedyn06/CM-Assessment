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
      className={`testimonial-card${className ? ` ${className}` : ""}`}
      style={{ background, ...style }}
    >
      <span className="testimonial-card__dot testimonial-card__dot--tl" aria-hidden />
      <span className="testimonial-card__dot testimonial-card__dot--tr" aria-hidden />
      <span className="testimonial-card__dot testimonial-card__dot--bl" aria-hidden />
      <span className="testimonial-card__dot testimonial-card__dot--br" aria-hidden />

      <p className="testimonial-card__quote">&ldquo;{quote}&rdquo;</p>

      <div className="testimonial-card__author">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt="" className="testimonial-card__avatar" />
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__role">{title}</div>
        </div>
      </div>

      <style>{`
        .testimonial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 22rem;
          height: 100%;
          padding: 1.6rem 1.5rem 1.35rem;
          border-radius: 0.15rem;
          color: #1a1a1a;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
        }

        .testimonial-card__dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #2a2a2a;
          pointer-events: none;
        }

        .testimonial-card__dot--tl { top: 8px; left: 8px; }
        .testimonial-card__dot--tr { top: 8px; right: 8px; }
        .testimonial-card__dot--bl { bottom: 8px; left: 8px; }
        .testimonial-card__dot--br { bottom: 8px; right: 8px; }

        .testimonial-card__quote {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
          letter-spacing: -0.01em;
          color: #1f1f1f;
        }

        .testimonial-card__author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .testimonial-card__avatar {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.3rem;
          object-fit: cover;
          flex-shrink: 0;
        }

        .testimonial-card__name {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.25;
        }

        .testimonial-card__role {
          margin-top: 0.15rem;
          font-size: 0.72rem;
          line-height: 1.35;
          color: #6e6e6e;
        }
      `}</style>
    </article>
  );
}
