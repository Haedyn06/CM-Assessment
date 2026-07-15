"use client";

import { IoCheckmark } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { useDemoForm } from "@/components/ui/DemoForm";

import TimelineData from "@/data/TimelineItem.json";
import type { TimelineItem } from "@/types/TimelineItem";

const TimelineItems = TimelineData as TimelineItem[];

function CornerFrame() {
  return (
    <span className="timeline-corners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function TimelineSection() {
  const { openDemoForm } = useDemoForm();

  return (
    <section className="timeline">
      <div className="timeline__inner">
        <p className="timeline__eyebrow">Your own digital teammates</p>
        <h2 className="timeline__title">
          Here&apos;s what you can get done with Convey in just 30 days.
        </h2>

        <div className="timeline__cta">
          <Button
            color="#1a1a1a"
            background="linear-gradient(90deg, #efe48a 0%, #b7eb9a 48%, #8fdfe0 100%)"
            hoverBackground="linear-gradient(135deg, #c9b6f0 0%, #a8c4f5 42%, #8ed8e4 100%)"
            hoverColor="#111111"
            borderColor="#2a2a2a"
            hoverBorderColor="#2a2a2a"
            dotColor="#1a1a1a"
            hoverDotColor="#111111"
            onClick={openDemoForm}
            style={{
              borderRadius: "0.35rem",
              minHeight: "2.75rem",
              padding: "0.7rem 1.25rem",
            }}
          >
            Schedule a demo
          </Button>
        </div>

        <div className="timeline__board">
          <div className="timeline__labels" aria-hidden>
            {TimelineItems.map((step) => (
              <div key={step.id} className="timeline__label-slot">
                <div className="timeline__label">
                  <CornerFrame />
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <div className="timeline__rail" aria-hidden>
            <div className="timeline__line" />
            {TimelineItems.map((step) => (
              <span key={step.id} className="timeline__node-slot">
                <span className="timeline__node" />
              </span>
            ))}
          </div>

          <ol className="timeline__steps">
            {TimelineItems.map((step) => (
              <li key={step.id} className="timeline__step">
                <div className="timeline__label timeline__label--mobile">
                  <CornerFrame />
                  {step.label}
                </div>

                <article className="timeline-card">
                  <CornerFrame />
                  <h3 className="timeline-card__title">{step.title}</h3>
                  <ul className="timeline-card__list">
                    {step.items.map((item) => (
                      <li key={item} className="timeline-card__item">
                        <IoCheckmark
                          className="timeline-card__check"
                          size={16}
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          padding: 5rem 1.25rem 5.5rem;
          background:
            radial-gradient(
              ellipse 50% 40% at 80% 20%,
              rgba(210, 220, 230, 0.35),
              transparent 60%
            ),
            #f3f3f1;
          color: #1a1a1a;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
        }

        @media (min-width: 640px) {
          .timeline {
            padding: 5.5rem 2rem 6rem;
          }
        }

        @media (min-width: 1024px) {
          .timeline {
            padding: 6rem 3rem 6.5rem;
          }
        }

        .timeline__inner {
          max-width: 68rem;
          margin: 0 auto;
          text-align: center;
        }

        .timeline__eyebrow {
          margin: 0 0 0.85rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.875rem;
          color: #4a4a4a;
        }

        .timeline__title {
          margin: 0 auto 1.5rem;
          max-width: 34rem;
          font-size: clamp(1.7rem, 3.4vw, 2.55rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #151515;
        }

        .timeline__cta {
          display: flex;
          justify-content: center;
          margin-bottom: 3.25rem;
        }

        .timeline__board {
          max-width: 60rem;
          margin: 0 auto;
        }

        .timeline__labels,
        .timeline__rail {
          display: none;
        }

        @media (min-width: 900px) {
          .timeline__labels {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
            margin-bottom: 0.9rem;
          }

          .timeline__rail {
            position: relative;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
            align-items: center;
            margin-bottom: 1.35rem;
          }
        }

        .timeline__label-slot,
        .timeline__node-slot {
          display: flex;
          justify-content: center;
        }

        .timeline__line {
          position: absolute;
          left: 16%;
          right: 16%;
          top: 50%;
          height: 1px;
          background: #c4c4c4;
          transform: translateY(-50%);
        }

        .timeline__node {
          position: relative;
          z-index: 1;
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 999px;
          background: #bdbdbd;
        }

        .timeline__steps {
          display: grid;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          text-align: left;
        }

        @media (min-width: 900px) {
          .timeline__steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        .timeline__step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }

        .timeline__label {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 4.5rem;
          padding: 0.4rem 0.85rem;
          border: 1px solid #2a2a2a;
          background: rgba(255, 255, 255, 0.55);
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.78rem;
          color: #222;
        }

        .timeline__label--mobile {
          display: inline-flex;
        }

        @media (min-width: 900px) {
          .timeline__label--mobile {
            display: none;
          }
        }

        .timeline-card {
          position: relative;
          width: 100%;
          min-height: 15.5rem;
          padding: 1.35rem 1.25rem 1.4rem;
          border: 1px solid #cfcfcf;
          background: rgba(255, 255, 255, 0.45);
        }

        .timeline-corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .timeline-corners span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #2a2a2a;
        }

        .timeline-corners span:nth-child(1) { top: 4px; left: 4px; }
        .timeline-corners span:nth-child(2) { top: 4px; right: 4px; }
        .timeline-corners span:nth-child(3) { bottom: 4px; left: 4px; }
        .timeline-corners span:nth-child(4) { bottom: 4px; right: 4px; }

        .timeline-card__title {
          margin: 0 0 1rem;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: #171717;
        }

        .timeline-card__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.85rem;
        }

        .timeline-card__item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.78rem;
          line-height: 1.45;
          color: #3a3a3a;
        }

        .timeline-card__check {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: #4a4a4a;
        }
      `}</style>
    </section>
  );
}
