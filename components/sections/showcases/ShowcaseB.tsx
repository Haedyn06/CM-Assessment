"use client";

import { useState } from "react";
import { ShowcaseBWindowA } from "@/components/ui/ShowcaseBWindowA";
import { ShowcaseBWindowB } from "@/components/ui/ShowcaseBWindowB";
import "@/styles/ShowcaseB.css";

function CornerMarks() {
  return (
    <span className="showcaseBCorners" aria-hidden>
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
      className="showcaseBEwing"
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
        fontFamily="var(--fontGeistSans), ui-sans-serif, system-ui, sans-serif"
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
    <section className="showcaseB">
      <div className="showcaseBDots" aria-hidden />

      <div className="showcaseBInner">
        <div className="showcaseBStage">
          <div
            className={`showcaseBLayer showcaseBLayerMail${
              front === "a" ? " isFront" : ""
            }`}
            style={{ zIndex: front === "a" ? 3 : 1 }}
          >
            <ShowcaseBWindowA
              focused={front === "a"}
              onFocus={() => setFront("a")}
            />
          </div>

          <div
            className={`showcaseBLayer showcaseBLayerDash${
              front === "b" ? " isFront" : ""
            }`}
            style={{ zIndex: front === "b" ? 3 : 1 }}
          >
            <ShowcaseBWindowB
              focused={front === "b"}
              onFocus={() => setFront("b")}
            />
          </div>
        </div>

        <div className="showcaseBCopy">
          <p className="showcaseBBadge">
            <CornerMarks />
            WORK WHILE YOU BARE
          </p>

          <h2 className="showcaseBTitle">Built for Unsupervised Bears</h2>

          <p className="showcaseBText">
            Bear Digital Bears operate autonomously but reach out for help
            when they need you
          </p>

          <blockquote className="showcaseBQuote">
            <CornerMarks />
            <EwingLogo />
            <p>
              &ldquo;I&apos;m not an engineer. I come from HR. And I was able to
              easily build powerful agents. It feels more like teaching a remote
              worker than anything else.&rdquo;
            </p>
            <footer>Bearly Hills • General Manager</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
