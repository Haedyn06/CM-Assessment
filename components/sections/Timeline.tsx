"use client";

import { IoCheckmark } from "react-icons/io5";
import { useDemoForm } from "@/components/ui/DemoForm";
import { useFillHover } from "@/lib/useFillHover";

import TimelineData from "@/data/TimelineItem.json";
import type { TimelineItem } from "@/types/TimelineItem";
import "@/styles/Timeline.css";

const TimelineItems = TimelineData as TimelineItem[];

function CornerFrame() {
  return (
    <span className="timelineCorners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function TimelineSection() {
  const { openDemoForm } = useDemoForm();
  const fill = useFillHover();

  return (
    <section className="timeline">
      <div className="timelineInner">
        <p className="timelineEyebrow">Your own digital teammates</p>
        <h2 className="timelineTitle">
          Here&apos;s what you can get done with Bear in just 30 days.
        </h2>

        <div className="timelineCta">
          <button
            type="button"
            className={`fillBtn timelineDemo ${fill.fillClass}`}
            onClick={openDemoForm}
            {...fill.fillHandlers}
          >
            <span className="fillBtnBase" aria-hidden />
            <span className="fillBtnWash" aria-hidden />
            <span className="fillBtnLabel">Schedule a demo</span>
          </button>
        </div>

        <div className="timelineBoard">
          <div className="timelineLabels" aria-hidden>
            {TimelineItems.map((step) => (
              <div key={step.id} className="timelineLabelSlot">
                <div className="timelineLabel">
                  <CornerFrame />
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <div className="timelineRail" aria-hidden>
            <div className="timelineLine" />
            {TimelineItems.map((step) => (
              <span key={step.id} className="timelineNodeSlot">
                <span className="timelineNode" />
              </span>
            ))}
          </div>

          <ol className="timelineSteps">
            {TimelineItems.map((step) => (
              <li key={step.id} className="timelineStep">
                <div className="timelineLabel timelineLabelMobile">
                  <CornerFrame />
                  {step.label}
                </div>

                <article className="timelineCard">
                  <CornerFrame />
                  <h3 className="timelineCardTitle">{step.title}</h3>
                  <ul className="timelineCardList">
                    {step.items.map((item) => (
                      <li key={item} className="timelineCardItem">
                        <IoCheckmark className="timelineCardCheck" size={16} aria-hidden />
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
