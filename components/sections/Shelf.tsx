"use client";

import { useState } from "react";
import { ShelfCard } from "@/components/ui/ShelfCard";

import ShelfItemsData from "@/data/ShelfItem.json";
import type { ShelfItem } from "@/types/ShelfItem";

const ShelfItems = ShelfItemsData as ShelfItem[];

// Test media served from /public (symlinked from /assets)
const TEST_IMAGE = "/mountain.jpg";
const TEST_VIDEO = "/grass.mp4";

export function ShelfSection() {
  const [activeId, setActiveId] = useState(ShelfItems[0]!.id);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const active = ShelfItems.find((item) => item.id === activeId) ?? ShelfItems[0]!;

  return (
    <section className="shelf">
      <div className="shelf__header">
        <h2 className="shelf__title">Real Results from Real Customers</h2>
        <p className="shelf__subtitle">
          Hear what it&apos;s like to deploy digital teammates that work in the
          background
        </p>
      </div>

      <div className="shelf__rail" role="list">
        {ShelfItems.map((item) => {
          const isActive = item.id === activeId;
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className={`shelf__item${isActive ? " is-active" : ""}`}
              role="listitem"
            >
              <ShelfCard
                title={item.title}
                logoLabel={item.logoLabel}
                active={isActive}
                playing={isPlaying}
                imageSrc={TEST_IMAGE}
                videoSrc={TEST_VIDEO}
                onSelect={() => {
                  setActiveId(item.id);
                  setPlayingId(null);
                }}
                onPlay={() => {
                  setPlayingId(item.id);
                }}
              />
            </div>
          );
        })}
      </div>

      <div key={active.id} className="shelf__quote">
        <p className="shelf__quote-text">&ldquo;{active.quote}&rdquo;</p>
        <p className="shelf__quote-by">{active.attribution}</p>
      </div>

      <style>{`
        .shelf {
          position: relative;
          padding: 4.5rem 1.25rem 5rem;
          background: #f4f4f2;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1f1f1f;
        }

        @media (min-width: 640px) {
          .shelf {
            padding: 5rem 2rem 5.5rem;
          }
        }

        @media (min-width: 1024px) {
          .shelf {
            padding: 5.5rem 3rem 6rem;
          }
        }

        .shelf__header {
          max-width: 40rem;
          margin: 0 auto 2.5rem;
          text-align: center;
        }

        .shelf__title {
          margin: 0 0 0.85rem;
          font-size: clamp(1.75rem, 3.4vw, 2.65rem);
          font-weight: 650;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #1f1f1f;
        }

        .shelf__subtitle {
          margin: 0 auto;
          max-width: 28rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.875rem;
          line-height: 1.55;
          color: #7a7a7a;
        }

        .shelf__rail {
          display: flex;
          gap: 0.65rem;
          width: 100%;
          max-width: 72rem;
          height: clamp(280px, 42vw, 420px);
          margin: 0 auto;
        }

        .shelf__item {
          flex: 0 0 4.5rem;
          min-width: 4.5rem;
          height: 100%;
          transition:
            flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            flex-basis 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            min-width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .shelf__item.is-active {
          flex: 1 1 auto;
          min-width: 0;
        }

        .shelf__quote {
          max-width: 44rem;
          margin: 1.75rem auto 0;
          padding: 0 0.25rem;
          animation: shelf-quote-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .shelf__quote-text {
          margin: 0 0 0.65rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: clamp(0.95rem, 1.6vw, 1.15rem);
          line-height: 1.55;
          color: #4a4a4a;
        }

        .shelf__quote-by {
          margin: 0;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.8rem;
          color: #9a9a9a;
        }

        @keyframes shelf-quote-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 720px) {
          .shelf__rail {
            height: 260px;
            gap: 0.5rem;
          }

          .shelf__item {
            flex-basis: 3.25rem;
            min-width: 3.25rem;
          }
        }
      `}</style>
    </section>
  );
}
