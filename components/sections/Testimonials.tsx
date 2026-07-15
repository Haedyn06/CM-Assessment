"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

import TestimonialItemsData from "@/data/TestimonialItem.json";
import type { TestimonialItem } from "@/types/TestimonialItem";
import "@/styles/Testimonials.css";

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
    </section>
  );
}
