"use client";

import { useState } from "react";
import { HeroLogo } from "@/components/ui/HeroLogo";
import { VideoComp } from "@/components/ui/VideoComp";
import { useDemoForm } from "@/components/ui/DemoForm";

import LogoItemsData from "@/data/LogoItem.json";
import type { LogoItem } from "@/types/LogoItem";
import "@/styles/Hero.css";

const LogoItems = LogoItemsData as LogoItem[];

function CornerDots() {
  return (
    <>
      <span aria-hidden className="hero-dot hero-dot--tl" />
      <span aria-hidden className="hero-dot hero-dot--tr" />
      <span aria-hidden className="hero-dot hero-dot--bl" />
      <span aria-hidden className="hero-dot hero-dot--br" />
    </>
  );
}

export function HeroSection() {
  const [email, setEmail] = useState("");
  const { openDemoForm } = useDemoForm();

  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden />

      <div className="hero-inner">
        {/* Details */}
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-badge__count">1,199,889 hours of work</span>
            <span className="hero-badge__rest">{" "} executed in the background since Q3&apos;25</span>
          </p>

          <h1 className="hero-title">
            The World&apos;s Most<br />Experienced Digital<br />Teammate
          </h1>

          <p className="hero-sub">
            Join leading enterprises and create your own digital teammates to 100x your output.
          </p>

          <form
            className="hero-cta"
            onSubmit={(e) => {
              e.preventDefault();
              openDemoForm();
            }}
          >
            <label className="sr-only" htmlFor="hero-email">Work email</label>
            
            <input className="hero-cta__input" id="hero-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="What's your work email?" />
            
            <button type="submit" className="hero-cta__btn">
              <span className="hero-cta__btn-bg" aria-hidden />
              <span className="hero-cta__btn-bg hero-cta__btn-bg--hover" aria-hidden />
              <CornerDots />
              <span className="hero-cta__btn-label">Get started</span>
            </button>
          </form>
        </div>

        {/* Video */}
        <div className="hero-media">
          <VideoComp src="/grass.mp4" label="Play hero video" />
        </div>
      </div>

      <ul className="hero-logos">
        {LogoItems.map((logo) => (
          <HeroLogo key={logo.id} src={logo.src} alt={logo.alt}
            hoverColor={logo.hoverColor} aspectRatio={logo.aspectRatio}
            hasQuote={logo.hasQuote} quote={logo.quote} />
        ))}
      </ul>
    </section>
  );
}
