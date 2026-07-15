"use client";

import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { useDemoForm } from "@/components/ui/DemoForm";
import { ShowcaseCWindowA } from "@/components/ui/ShowcaseCWindowA";
import { ShowcaseCWindowB } from "@/components/ui/ShowcaseCWindowB";
import { ShowcaseCWindowC } from "@/components/ui/ShowcaseCWindowC";
import "@/styles/ShowcaseC.css";

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
  const { openDemoForm } = useDemoForm();

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
              onClick={openDemoForm}
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
    </section>
  );
}
