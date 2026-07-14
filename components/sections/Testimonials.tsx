"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  background: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "jeremy",
    quote:
      "I haven't had this much fun with work in a long time. The ability to think of an idea and create a solution without convincing an engineer or product manager and doing it in a day instead of weeks is amazing. Even at a prior company where a good idea would get created in 3-6 months because we had 600 engineers... this is better!",
    name: "Jeremy Varner",
    title: "SVP Programmatic Operations, TelevisaUnivision",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
    background: "#d7ecef",
  },
  {
    id: "kunal",
    quote:
      "We had team members spending hours each week pulling invoices from multiple shipping portals. With Convey, one of our team members was able to set up an automated workflow on their own ... no engineering support required. It's helped streamline a recurring process and free up time for higher-value work.",
    name: "Kunal Bajaj",
    title: "Chief Accounting Officer, Faire",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
    background: "#d9efe3",
  },
  {
    id: "allie",
    quote:
      "I'm not an engineer. I come from HR. And I was able to easily build powerful agents. It feels more like teaching a remote worker than anything else.",
    name: "Allie Tripaldi",
    title: "General Manager",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
    background: "#efe6c9",
  },
  {
    id: "scott",
    quote:
      "Convey helps me free up my staff and create leverage for them to go work on higher value parts of the business... we're all in on Convey.",
    name: "Scott Hume",
    title: "Assistant Controller, Samsara",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
    background: "#e4e0f2",
  },
  {
    id: "dominic",
    quote:
      "Convey is a cheat code that is giving us a real edge over our competitors. We saw ROI within weeks.",
    name: "Dominic Miraglia",
    title: "Chief Commercial Officer, Savoya",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face",
    background: "#e8ddd4",
  },
];

const GAP_PX = 16;

export function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const maxIndex = TESTIMONIALS.length - 1;

  const viewportRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const indexRef = useRef(index);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const measureSlideWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const slide = viewport.querySelector<HTMLElement>(".testimonials__slide");
    slideWidthRef.current = slide?.offsetWidth ?? 0;
  }, []);

  useEffect(() => {
    measureSlideWidth();
    window.addEventListener("resize", measureSlideWidth);
    return () => window.removeEventListener("resize", measureSlideWidth);
  }, [measureSlideWidth]);

  const clampIndex = useCallback(
    (value: number) => Math.max(0, Math.min(maxIndex, value)),
    [maxIndex],
  );

  const goPrev = () => setIndex((current) => Math.max(0, current - 1));
  const goNext = () => setIndex((current) => Math.min(maxIndex, current + 1));

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Only primary button / touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    measureSlideWidth();
    pointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;

    const delta = e.clientX - dragStartXRef.current;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;

    const slideWidth = slideWidthRef.current || 1;
    const stride = slideWidth + GAP_PX;
    const delta = dragOffsetRef.current;
    const threshold = stride * 0.22;
    let next = indexRef.current;

    if (delta <= -threshold) next += 1;
    else if (delta >= threshold) next -= 1;

    setIndex(clampIndex(next));
    setDragOffset(0);
    dragOffsetRef.current = 0;
    setIsDragging(false);
    pointerIdRef.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const trackStyle = useMemo(() => {
    const base = `calc(-${index} * (min(32rem, 82vw) + 1rem))`;
    const drag = isDragging || dragOffset !== 0 ? ` + ${dragOffset}px` : "";
    return {
      transform: `translateX(calc(${base}${drag}))`,
    };
  }, [index, dragOffset, isDragging]);

  return (
    <section className="testimonials">
      <div className="testimonials__top">
        <h2 className="testimonials__title">Built for World-Class Operators</h2>

        <div className="testimonials__nav" aria-label="Testimonial controls">
          <button
            type="button"
            className="testimonials__arrow"
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className="testimonials__segments" role="tablist" aria-label="Jump to testimonial">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`testimonials__segment${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonials__arrow"
            onClick={goNext}
            disabled={index === maxIndex}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`testimonials__viewport${isDragging ? " is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="testimonials__track" style={trackStyle}>
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonials__slide">
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                title={item.title}
                avatar={item.avatar}
                background={item.background}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials {
          position: relative;
          overflow: hidden;
          padding: 4.5rem 0 5rem;
          background: #f3f3f1;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          color: #1f1f1f;
        }

        @media (min-width: 640px) {
          .testimonials {
            padding: 5.5rem 0 5.75rem;
          }
        }

        .testimonials__top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 1.5rem;
          max-width: 72rem;
          margin: 0 auto 1.75rem;
          padding: 0 1.25rem;
        }

        @media (min-width: 640px) {
          .testimonials__top {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .testimonials__top {
            padding: 0 3rem;
          }
        }

        .testimonials__title {
          margin: 0;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #2a2a2a;
        }

        .testimonials__nav {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .testimonials__arrow {
          display: grid;
          place-items: center;
          width: 1.75rem;
          height: 1.75rem;
          border: 0;
          background: transparent;
          color: #2a2a2a;
          font-size: 1.05rem;
          line-height: 1;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .testimonials__arrow:disabled {
          opacity: 0.28;
          cursor: default;
        }

        .testimonials__segments {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .testimonials__segment {
          display: block;
          width: 1.15rem;
          height: 1.5px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: #c9c9c9;
          cursor: pointer;
          transition:
            width 0.25s ease,
            height 0.25s ease,
            background 0.25s ease;
        }

        .testimonials__segment:hover {
          background: #8a8a8a;
        }

        .testimonials__segment.is-active {
          width: 1.65rem;
          height: 3px;
          background: #2a2a2a;
        }

        .testimonials__segment.is-active:hover {
          background: #2a2a2a;
        }

        .testimonials__viewport {
          overflow: hidden;
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.25rem;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .testimonials__viewport.is-dragging {
          cursor: grabbing;
        }

        @media (min-width: 640px) {
          .testimonials__viewport {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .testimonials__viewport {
            padding: 0 3rem;
          }
        }

        .testimonials__track {
          display: flex;
          gap: 1rem;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .testimonials__viewport.is-dragging .testimonials__track {
          transition: none;
        }

        .testimonials__slide {
          flex: 0 0 min(32rem, 82vw);
          max-width: min(32rem, 82vw);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
