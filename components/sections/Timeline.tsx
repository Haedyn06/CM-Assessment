"use client";

import { IoCheckmark } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { useDemoForm } from "@/components/ui/DemoForm";

import TimelineData from "@/data/TimelineItem.json";
import type { TimelineItem } from "@/types/TimelineItem";
import "@/styles/Timeline.css";

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
    </section>
  );
}
