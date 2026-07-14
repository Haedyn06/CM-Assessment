"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

import TestimonialItemsData from "@/data/TestimonialItem.json";
import type { TestimonialItem } from "@/types/TestimonialItem";

const TestimonialItems = TestimonialItemsData as TestimonialItem[];

const GAP_PX = 16;

export function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const maxIndex = TestimonialItems.length - 1;

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
            <IoChevronBack size={18} aria-hidden />
          </button>

          <div className="testimonials__segments" role="tablist" aria-label="Jump to testimonial">
            {TestimonialItems.map((item, i) => (
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
            <IoChevronForward size={18} aria-hidden />
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
          {TestimonialItems.map((item) => (
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
