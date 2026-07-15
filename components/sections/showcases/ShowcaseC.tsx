"use client";

import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useDemoForm } from "@/components/ui/DemoForm";
import { ShowcaseCWindowA } from "@/components/ui/ShowcaseCWindowA";
import { ShowcaseCWindowB } from "@/components/ui/ShowcaseCWindowB";
import { ShowcaseCWindowC } from "@/components/ui/ShowcaseCWindowC";
import { useFillHover } from "@/lib/useFillHover";
import "@/styles/ShowcaseC.css";

type Front = "a" | "b" | "c";

const FEATURES = [
  "zero-data retention with model providers",
  "SOC 2 Type II and HIPAA Compliant",
  "Regular Penetration Testing",
  "SSO for secure access",
];

function CornerMarks() {
  return (
    <span className="showcaseCCorners" aria-hidden>
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
  const primaryFill = useFillHover();
  const secondaryFill = useFillHover();

  return (
    <section className="showcaseC">
      <div className="showcaseCDots" aria-hidden />

      <div className="showcaseCInner">
        <div className="showcaseCCopy">
          <p className="showcaseCBadge">
            <CornerMarks />
            Bear READY
          </p>

          <h2 className="showcaseCTitle">A True Bear Identity</h2>

          <p className="showcaseCText">
            Bear provides the end-to-end infrastructure to coordinate with
            your digital bears so you can deploy them where they matter most
            — at the heart of your operations, not the periphery.
          </p>

          <div className="showcaseCActions">
            <button
              type="button"
              className={`fillBtn showcaseCBtn showcaseCBtnPrimary ${primaryFill.fillClass}`}
              onClick={openDemoForm}
              {...primaryFill.fillHandlers}
            >
              <span className="fillBtnBase" aria-hidden />
              <span className="fillBtnWash" aria-hidden />
              <span className="fillBtnLabel">Explore Bears</span>
            </button>
            <button
              type="button"
              className={`fillBtn showcaseCBtn showcaseCBtnSecondary ${secondaryFill.fillClass}`}
              {...secondaryFill.fillHandlers}
            >
              <span className="fillBtnBase" aria-hidden />
              <span className="fillBtnWash" aria-hidden />
              <span className="fillBtnLabel">Visit Trust Center</span>
            </button>
          </div>

          <div className="showcaseCFeatures">
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

        <div className="showcaseCStage">
          <div
            className={`showcaseCLayer showcaseCLayerUsers${
              front === "c" ? " isFront" : ""
            }`}
            style={{ zIndex: zFor("c", front, 1) }}
          >
            <ShowcaseCWindowC
              focused={front === "c"}
              onFocus={() => setFront("c")}
            />
          </div>

          <div
            className={`showcaseCLayer showcaseCLayerAgents${
              front === "b" ? " isFront" : ""
            }`}
            style={{ zIndex: zFor("b", front, 2) }}
          >
            <ShowcaseCWindowB
              focused={front === "b"}
              onFocus={() => setFront("b")}
            />
          </div>

          <div
            className={`showcaseCLayer showcaseCLayerApps${
              front === "a" ? " isFront" : ""
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
