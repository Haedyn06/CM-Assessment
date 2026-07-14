"use client";

import { ShowcaseASection } from "./showcases/ShowcaseA";
import { ShowcaseBSection } from "./showcases/ShowcaseB";
import { ShowcaseCSection } from "./showcases/ShowcaseC";

export function ShowcaseSection() {
  return (
    <>
      <ShowcaseASection />
      <ShowcaseBSection />
      <ShowcaseCSection />
    </>
  );
}
