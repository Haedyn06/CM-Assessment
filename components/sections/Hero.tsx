"use client";

import { useState } from "react";
import { HeroLogo } from "@/components/ui/HeroLogo";
import { HeroGlobe } from "@/components/ui/HeroGlobe";
import { VideoComp } from "@/components/ui/VideoComp";
import { useDemoForm } from "@/components/ui/DemoForm";

import LogoItemsData from "@/data/LogoItem.json";
import type { LogoItem } from "@/types/LogoItem";
import "@/styles/Hero.css";

const LogoItems = LogoItemsData as LogoItem[];

function CornerDots() {
  return (
    <>
      <span aria-hidden className="heroDot heroDotTl" />
      <span aria-hidden className="heroDot heroDotTr" />
      <span aria-hidden className="heroDot heroDotBl" />
      <span aria-hidden className="heroDot heroDotBr" />
    </>
  );
}

export function HeroSection() {
  const [email, setEmail] = useState("");
  const { openDemoForm } = useDemoForm();

  return (
    <section className="hero">
      <div className="heroGrid" aria-hidden />
      <HeroGlobe />

      <div className="heroInner">
        {/* Details */}
        <div className="heroCopy">
          <p className="heroBadge">
            <span className="heroBadgeCount">1,199,889 hours of bear</span>
            <span className="heroBadgeRest">{" "} executed in the background since Q3&apos;25</span>
          </p>

          <h1 className="heroTitle">
            The World&apos;s Most
            <br />
            Experienced Digital
            <br />
            Bear
          </h1>

          <p className="heroSub">
            Join leading Bears and create your own digital Bears to 100x your output.
          </p>

          <form className="heroCta"
            onSubmit={(e) => {
              e.preventDefault();
              openDemoForm();
            }}
          >
            <label className="srOnly" htmlFor="heroEmail">Work email</label>
            
            <input className="heroCtaInput" id="heroEmail" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="What's your work email?" />
            
            <button type="submit" className="heroCtaBtn">
              <span className="heroCtaBtnBg" aria-hidden />
              <span className="heroCtaBtnBg heroCtaBtnBgHover" aria-hidden />
              <CornerDots />
              <span className="heroCtaBtnLabel">Get started</span>
            </button>
          </form>
        </div>

        {/* Video */}
        <div className="heroMedia">
          <VideoComp src="/grass.mp4" label="Play video" />
        </div>
      </div>

      <ul className="heroLogos">
        {LogoItems.map((logo) => (
          <HeroLogo key={logo.id} src={logo.src} alt={logo.alt}
            hoverColor={logo.hoverColor} aspectRatio={logo.aspectRatio}
            hasQuote={logo.hasQuote} quote={logo.quote} />
        ))}
      </ul>
    </section>
  );
}
