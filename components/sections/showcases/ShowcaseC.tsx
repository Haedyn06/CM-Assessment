"use client";

import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { ShowcaseCWindowA } from "@/components/ui/ShowcaseCWindowA";
import { ShowcaseCWindowB } from "@/components/ui/ShowcaseCWindowB";
import { ShowcaseCWindowC } from "@/components/ui/ShowcaseCWindowC";

type Front = "a" | "b" | "c";

const FEATURES = [
  "Zero-data retention with model providers",
  "SOC 2 Type II and HIPAA Compliant",
  "Regular Penetration Testing",
  "SSO for secure access",
];

function CornerMarks() {
  return (
    <span className="showcase-c__corners" aria-hidden>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function zFor(id: Front, front: Front, base: number) {
  return front === id ? 5 : base;
}

export function ShowcaseCSection() {
  const [front, setFront] = useState<Front>("a");

  return (
    <section className="showcase-c">
      <div className="showcase-c__dots" aria-hidden />

      <div className="showcase-c__inner">
        <div className="showcase-c__copy">
          <p className="showcase-c__badge">
            <CornerMarks />
            ENTERPRISE READY
          </p>

          <h2 className="showcase-c__title">A True Agent Identity</h2>

          <p className="showcase-c__text">
            Convey provides the end-to-end infrastructure to coordinate with
            your digital teammates so you can deploy them where they matter most
            — at the heart of your operations, not the periphery.
          </p>

          <div className="showcase-c__actions">
            <Button
              background="linear-gradient(90deg, #f3ecc0 0%, #c8e8e2 100%)"
              hoverBackground="linear-gradient(90deg, #ebe2a8 0%, #b5ddd5 100%)"
              borderColor="#d8d8d6"
              hoverBorderColor="#c8c8c6"
              hoverColor="#111111"
            >
              Explore Enterprise
            </Button>
            <Button
              background="#ffffff"
              hoverBackground="#121212"
              borderColor="#d0d0ce"
              hoverBorderColor="#121212"
            >
              Visit Trust Center
            </Button>
          </div>

          <div className="showcase-c__features">
            <CornerMarks />
            <ul>
              {FEATURES.map((item) => (
                <li key={item}>
                  <IoCheckmark size={14} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="showcase-c__stage">
          <div
            className={`showcase-c__layer showcase-c__layer--users${
              front === "c" ? " is-front" : ""
            }`}
            style={{ zIndex: zFor("c", front, 1) }}
          >
            <ShowcaseCWindowC
              focused={front === "c"}
              onFocus={() => setFront("c")}
            />
          </div>

          <div
            className={`showcase-c__layer showcase-c__layer--agents${
              front === "b" ? " is-front" : ""
            }`}
            style={{ zIndex: zFor("b", front, 2) }}
          >
            <ShowcaseCWindowB
              focused={front === "b"}
              onFocus={() => setFront("b")}
            />
          </div>

          <div
            className={`showcase-c__layer showcase-c__layer--apps${
              front === "a" ? " is-front" : ""
            }`}
            style={{ zIndex: zFor("a", front, 3) }}
          >
            <ShowcaseCWindowA
              focused={front === "a"}
              onFocus={() => setFront("a")}
            />
          </div>
        </div>
      </div>

      <style>{`
        .showcase-c {
          position: relative;
          isolation: isolate;
          padding: 4.25rem 1.25rem 4.75rem;
          background: #f3f3f1;
          font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1a1a1a;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .showcase-c {
            padding: 5.25rem 2rem 5.75rem;
          }
        }

        @media (min-width: 1100px) {
          .showcase-c {
            padding: 5.75rem 3rem 6.25rem;
          }
        }

        .showcase-c__dots {
          pointer-events: none;
          position: absolute;
          inset: 8% 0 8% 38%;
          z-index: 0;
          opacity: 0.5;
          background-image: radial-gradient(
            circle,
            rgba(130, 130, 130, 0.38) 1px,
            transparent 1.2px
          );
          background-size: 16px 16px;
          mask-image: radial-gradient(
            ellipse 70% 70% at 60% 45%,
            #000 18%,
            transparent 75%
          );
        }

        .showcase-c__inner {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 2.5rem;
          align-items: center;
          max-width: 74rem;
          margin: 0 auto;
        }

        @media (min-width: 980px) {
          .showcase-c__inner {
            grid-template-columns: minmax(16rem, 0.92fr) minmax(0, 1.2fr);
            gap: 2rem 2.5rem;
          }
        }

        .showcase-c__copy {
          max-width: 28rem;
        }

        .showcase-c__badge {
          position: relative;
          display: inline-block;
          margin: 0 0 1.35rem;
          padding: 0.42rem 0.7rem;
          border-radius: 0.15rem;
          background: #121212;
          color: #f6f6f6;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          line-height: 1;
        }

        .showcase-c__corners {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .showcase-c__corners span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: currentColor;
        }

        .showcase-c__badge .showcase-c__corners span {
          background: #f6f6f6;
        }

        .showcase-c__corners span:nth-child(1) { top: 3px; left: 3px; }
        .showcase-c__corners span:nth-child(2) { top: 3px; right: 3px; }
        .showcase-c__corners span:nth-child(3) { bottom: 3px; left: 3px; }
        .showcase-c__corners span:nth-child(4) { bottom: 3px; right: 3px; }

        .showcase-c__title {
          margin: 0 0 1.05rem;
          max-width: 12ch;
          font-size: clamp(2.25rem, 4.4vw, 3.4rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: #141414;
        }

        .showcase-c__text {
          margin: 0 0 1.5rem;
          max-width: 30rem;
          font-size: 1.02rem;
          line-height: 1.6;
          color: #5a5a5a;
        }

        .showcase-c__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .showcase-c__features {
          position: relative;
          margin: 0;
          padding: 1.1rem 1.15rem 1.05rem;
          border: 1px solid #d4d4d2;
          background: transparent;
        }

        .showcase-c__features .showcase-c__corners span {
          background: #2a2a2a;
        }

        .showcase-c__features .showcase-c__corners span:nth-child(1) { top: 4px; left: 4px; }
        .showcase-c__features .showcase-c__corners span:nth-child(2) { top: 4px; right: 4px; }
        .showcase-c__features .showcase-c__corners span:nth-child(3) { bottom: 4px; left: 4px; }
        .showcase-c__features .showcase-c__corners span:nth-child(4) { bottom: 4px; right: 4px; }

        .showcase-c__features ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.7rem;
        }

        .showcase-c__features li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.92rem;
          line-height: 1.35;
          color: #333;
        }

        .showcase-c__features svg {
          flex-shrink: 0;
          margin-top: 0.12rem;
          color: #6a6a6a;
        }

        .showcase-c__stage {
          position: relative;
          width: 100%;
          min-height: 28rem;
          height: min(36rem, 72vh);
        }

        .showcase-c__layer {
          position: absolute;
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.3s ease;
          filter: saturate(0.96);
        }

        .showcase-c__layer.is-front {
          filter: none;
        }

        .showcase-c__layer--apps {
          left: 0;
          top: 4%;
          width: min(78%, 28rem);
          height: 92%;
          transform: translate(0, 0);
        }

        .showcase-c__layer--apps.is-front {
          transform: translate(-0.15rem, -0.25rem) scale(1.015);
        }

        .showcase-c__layer--agents {
          right: 2%;
          bottom: 2%;
          width: min(62%, 22rem);
          height: 62%;
          transform: translate(0, 0);
        }

        .showcase-c__layer--agents.is-front {
          transform: translate(0.1rem, -0.35rem) scale(1.03);
        }

        .showcase-c__layer--users {
          right: 0;
          top: 0;
          width: min(60%, 21.5rem);
          height: 58%;
          transform: translate(0, 0);
        }

        .showcase-c__layer--users.is-front {
          transform: translate(0.15rem, -0.3rem) scale(1.03);
        }

        @media (max-width: 979px) {
          .showcase-c__stage {
            min-height: 24rem;
            height: min(32rem, 70vh);
          }

          .showcase-c__layer--apps {
            width: min(86%, 100%);
            height: 88%;
          }

          .showcase-c__layer--agents {
            width: min(70%, 19rem);
            height: 58%;
          }

          .showcase-c__layer--users {
            width: min(68%, 18rem);
            height: 54%;
          }
        }
      `}</style>
    </section>
  );
}
