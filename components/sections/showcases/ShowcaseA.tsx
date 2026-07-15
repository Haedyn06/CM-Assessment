"use client";

import { ShowcaseAWindow } from "@/components/ui/ShowcaseAWindow";
import "@/styles/ShowcaseA.css";

function CornerMarks() {
  return (
    <span className="showcaseACorners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function PmgLogo() {
  return (
    <svg
      className="showcaseAPmg"
      width="72"
      height="28"
      viewBox="0 0 72 28"
      fill="none"
      aria-label="PMG"
    >
      {/* Abstract eye / mark */}
      <path
        d="M8 14c2.4-4.2 5.6-6.4 8.8-6.4S22.4 9.8 24.8 14c-2.4 4.2-5.6 6.4-8.8 6.4S10.4 18.2 8 14Z"
        stroke="#4a4a4a"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="16.8" cy="14" r="2.4" fill="#4a4a4a" />
      <path
        d="M32.2 21.5V7h5.8c2.7 0 4.4 1.5 4.4 3.8 0 1.7-.9 2.9-2.4 3.4l3.2 7.3h-3.4l-2.9-6.7h-1.6v6.7h-3.1Zm3.1-9.3h2.4c1.2 0 1.9-.6 1.9-1.6s-.7-1.5-1.9-1.5h-2.4v3.1Z"
        fill="#3a3a3a"
      />
      <path d="M45.2 21.5V7h3.1v14.5h-3.1Z" fill="#3a3a3a" />
      <path d="M51.4 21.5V7h3.1v11.6H60V21.5H51.4Z" fill="#3a3a3a" />
    </svg>
  );
}

export function ShowcaseASection() {
  return (
    <section className="showcaseA">
      <div className="showcaseADots" aria-hidden />

      <div className="showcaseAInner">
        <div className="showcaseACopy">
          <p className="showcaseABadge">
            <CornerMarks />
            TRUST AND OVERSIGHT
          </p>

          <h2 className="showcaseATitle">Old Bears Become New Bears</h2>

          <p className="showcaseAText">
            You give your AI teammate responsibilities. It takes the work fully
            off your plate. From summarizing emails, to complex multistep
            processes across your systems.
          </p>

          <blockquote className="showcaseAQuote">
            <CornerMarks />
            <PmgLogo />
            <p>
              &ldquo;Bear enables our best operators to effectively clone
              themselves – scaling their best practices and creating more
              capacity for strategic and creative work.&rdquo;
            </p>
            <footer>Winnie Bear • Head of Partnerships</footer>
          </blockquote>
        </div>

        <div className="showcaseAWindow">
          <ShowcaseAWindow />
        </div>
      </div>
    </section>
  );
}
