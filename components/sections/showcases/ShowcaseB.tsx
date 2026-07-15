"use client";

import { useState } from "react";
import { ShowcaseBWindowA } from "@/components/ui/ShowcaseBWindowA";
import { ShowcaseBWindowB } from "@/components/ui/ShowcaseBWindowB";
import "@/styles/ShowcaseB.css";

function CornerMarks() {
  return (
    <span className="showcase-b__corners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function EwingLogo() {
  return (
    <svg
      className="showcase-b__ewing"
      width="168"
      height="22"
      viewBox="0 0 168 22"
      fill="none"
      aria-label="Ewing Outdoor Supply"
    >
      <text
        x="0"
        y="16"
        fill="#3a3a3a"
        fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        EWING OUTDOOR SUPPLY
      </text>
    </svg>
  );
}

export function ShowcaseBSection() {
  const [front, setFront] = useState<"a" | "b">("b");

  return (
    <section className="showcase-b">
      <div className="showcase-b__dots" aria-hidden />

      <div className="showcase-b__inner">
        <div className="showcase-b__stage">
          <div
            className={`showcase-b__layer showcase-b__layer--mail${
              front === "a" ? " is-front" : ""
            }`}
            style={{ zIndex: front === "a" ? 3 : 1 }}
          >
            <ShowcaseBWindowA
              focused={front === "a"}
              onFocus={() => setFront("a")}
            />
          </div>

          <div
            className={`showcase-b__layer showcase-b__layer--dash${
              front === "b" ? " is-front" : ""
            }`}
            style={{ zIndex: front === "b" ? 3 : 1 }}
          >
            <ShowcaseBWindowB
              focused={front === "b"}
              onFocus={() => setFront("b")}
            />
          </div>
        </div>

        <div className="showcase-b__copy">
          <p className="showcase-b__badge">
            <CornerMarks />
            WORK WHILE YOU SLEEP
          </p>

          <h2 className="showcase-b__title">Built for Unsupervised Execution</h2>

          <p className="showcase-b__text">
            Convey Digital Teammates operate autonomously but reach out for help
            when they need you
          </p>

          <blockquote className="showcase-b__quote">
            <CornerMarks />
            <EwingLogo />
            <p>
              &ldquo;I&apos;m not an engineer. I come from HR. And I was able to
              easily build powerful agents. It feels more like teaching a remote
              worker than anything else.&rdquo;
            </p>
            <footer>Allie Tripaldi • General Manager</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
