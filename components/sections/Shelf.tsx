"use client";

import { useState } from "react";
import { ShelfCard } from "@/components/ui/ShelfCard";

import ShelfItemsData from "@/data/ShelfItem.json";
import type { ShelfItem } from "@/types/ShelfItem";
import "@/styles/Shelf.css";

const ShelfItems = ShelfItemsData as ShelfItem[];

export function ShelfSection() {
  const [activeId, setActiveId] = useState(ShelfItems[0]!.id);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const active = ShelfItems.find((item) => item.id === activeId) ?? ShelfItems[0]!;

  return (
    <section className="shelf">
      {/* Title */}
      <div className="shelfHeader">
        <h2 className="shelfTitle">Real Results from Real Bears</h2>

        <p className="shelfSubtitle">Hear what it&apos;s like to deploy digital Bears that work in bareground</p>
      </div>

      {/*  */}
      <div className="shelfRail" role="list">
        {ShelfItems.map((item) => {
          const isActive = item.id === activeId;
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className={`shelfItem${isActive ? " isActive" : ""}`}
              role="listitem"
            >
              <ShelfCard title={item.title} logoLabel={item.logoLabel} active={isActive}
                playing={isPlaying} imageSrc={item.imageSrc} videoSrc={item.videoSrc}
                onSelect={() => {
                  setActiveId(item.id);
                  setPlayingId(null);
                }}
                onPlay={() => setPlayingId(item.id)}
              />
            </div>
          );
        })}
      </div>

      <div key={active.id} className="shelfQuote">
        <p className="shelfQuoteText">&ldquo;{active.quote}&rdquo;</p>
        <p className="shelfQuoteBy">{active.attribution}</p>
      </div>
    </section>
  );
}
