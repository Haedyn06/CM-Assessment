"use client";

import { useState } from "react";
import { ProductVideo } from "@/components/ui/ProductVideo";
import { Button } from "@/components/ui/Button";

export function ProductSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="product">
      <div className="product__glow product__glow--left" aria-hidden />
      <div className="product__dots" aria-hidden />

      <div className="product__inner">
        <h2 className="product__title">
          <strong>A single platform</strong> to train and manage<br />enterprise-grade digital teammates
        </h2>

        <p className="product__sub">
          Operators simply describe a process or share their screen and the AI Teammate observes, learns, and takes over execution.
        </p>

        <Button
          color="#2a2a2a"
          background="rgba(255, 255, 255, 0.72)"
          borderColor="#d0d0d0"
          hoverBackground="#121212"
          hoverColor="#ffffff"
          hoverBorderColor="#121212"
          dotColor="#3a3a3a"
          hoverDotColor="#ffffff"
          onClick={() => setVideoOpen(true)}
          style={{ borderRadius: "0.2rem", fontWeight: 500 }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden >
            <path d="M0 0v12l10-6L0 0Z" />
          </svg>
          Work is changing
        </Button>
      </div>

      <ProductVideo open={videoOpen} src="/grass.mp4" title="Work is changing" onClose={() => setVideoOpen(false)} />

      <style>{`
        .product {
          position: relative;
          overflow: hidden;
          padding: 5.5rem 1.25rem 5rem;
          background:
            radial-gradient(
              ellipse 40% 50% at 8% 55%,
              rgba(170, 150, 210, 0.18),
              transparent 60%
            ),
            #f3f3f1;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1f1f1f;
          text-align: center;
        }

        @media (min-width: 640px) {
          .product {
            padding: 6.5rem 2rem 5.5rem;
          }
        }

        .product__dots {
          pointer-events: none;
          position: absolute;
          top: 18%;
          right: 10%;
          width: 7.5rem;
          height: 5.5rem;
          opacity: 0.45;
          background-image: radial-gradient(
            circle,
            rgba(120, 120, 120, 0.55) 1px,
            transparent 1.2px
          );
          background-size: 14px 14px;
        }

        .product__glow--left {
          pointer-events: none;
          position: absolute;
          left: -8%;
          top: 30%;
          width: 18rem;
          height: 22rem;
          background: radial-gradient(
            ellipse at center,
            rgba(160, 140, 200, 0.22),
            transparent 70%
          );
          filter: blur(8px);
        }

        .product__inner {
          position: relative;
          z-index: 1;
          max-width: 48rem;
          margin: 0 auto;
        }

        .product__title {
          margin: 0 0 1.25rem;
          font-size: clamp(1.65rem, 3.6vw, 2.75rem);
          font-weight: 450;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #222;
        }

        .product__title strong {
          font-weight: 700;
        }

        .product__sub {
          margin: 0 auto 2rem;
          max-width: 34rem;
          font-size: 1rem;
          line-height: 1.55;
          color: #8a8a8a;
        }
      `}</style>
    </section>
  );
}
