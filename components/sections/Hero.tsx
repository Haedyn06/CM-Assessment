"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

type LogoId =
  | "nbc"
  | "samsara"
  | "unity"
  | "televisa"
  | "faire"
  | "chargepoint";

type Testimonial = {
  company: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

const TESTIMONIALS: Partial<Record<LogoId, Testimonial>> = {
  samsara: {
    company: "samsara",
    quote:
      "Convey helps me free up my staff and create leverage for them to go work on higher value parts of the business... we're all in on Convey.",
    name: "Scott Hume",
    title: "Assistant Controller, Samsara",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
  },
  televisa: {
    company: "TelevisaUnivision",
    quote:
      "I haven't had this much fun with work in a long time. The ability to think of an idea and create a solution without convincing an engineer is amazing.",
    name: "Jeremy Varner",
    title: "SVP Programmatic Operations, TelevisaUnivision",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face",
  },
  faire: {
    company: "FAIRE",
    quote:
      "Convey teammates handle the busywork so our operators can focus on judgment calls that actually move the business.",
    name: "Alex Rivera",
    title: "Operations Lead, Faire",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
  },
  chargepoint: {
    company: "chargepoint+",
    quote:
      "We deployed digital teammates across finance workflows and saw capacity open up within the first month.",
    name: "Jordan Lee",
    title: "Finance Director, ChargePoint",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  },
};

const LOGOS: { id: LogoId; label: string; hasPlus?: boolean }[] = [
  { id: "nbc", label: "NBCUniversal" },
  { id: "samsara", label: "samsara", hasPlus: true },
  { id: "unity", label: "unity" },
  { id: "televisa", label: "TelevisaUnivision", hasPlus: true },
  { id: "faire", label: "FAIRE", hasPlus: true },
  { id: "chargepoint", label: "chargepoint+", hasPlus: true },
];

function CornerDots({ color = "#111" }: { color?: string }) {
  const dot = (style: CSSProperties): ReactNode => (
    <span
      aria-hidden
      className="pointer-events-none absolute h-[3px] w-[3px]"
      style={{ background: color, ...style }}
    />
  );

  return (
    <>
      {dot({ top: 4, left: 4 })}
      {dot({ top: 4, right: 4 })}
      {dot({ bottom: 4, left: 4 })}
      {dot({ bottom: 4, right: 4 })}
    </>
  );
}

function LogoMark({ id }: { id: LogoId }) {
  switch (id) {
    case "nbc":
      return (
        <span className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-[#3a3a3a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2c2.2 3.2 3.5 5.8 3.5 8.2a3.5 3.5 0 1 1-7 0C8.5 7.8 9.8 5.2 12 2z" />
            <ellipse cx="12" cy="18.5" rx="5.5" ry="2.2" opacity="0.35" />
          </svg>
          NBCUniversal
        </span>
      );
    case "samsara":
      return (
        <span className="flex items-center gap-1.5 text-[14px] font-medium tracking-tight text-[#3a3a3a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 14c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="9.2" cy="10.2" r="1.1" />
            <circle cx="14.8" cy="10.2" r="1.1" />
          </svg>
          samsara
        </span>
      );
    case "unity":
      return (
        <span className="flex items-center gap-1.5 text-[14px] font-medium tracking-tight text-[#3a3a3a]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 2.5v9.5M12 12l8-5M12 12l-8-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          unity
        </span>
      );
    case "televisa":
      return (
        <span className="flex flex-col text-[11px] font-semibold leading-[1.1] tracking-tight text-[#3a3a3a]">
          <span>Televisa</span>
          <span>Univision</span>
        </span>
      );
    case "faire":
      return (
        <span
          className="text-[15px] tracking-[0.02em] text-[#3a3a3a]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          FAIRE
        </span>
      );
    case "chargepoint":
      return (
        <span className="text-[13px] font-semibold tracking-tight text-[#3a3a3a]">
          -chargepoint<span className="text-[#5a5a5a]">+</span>
        </span>
      );
  }
}

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [activeLogo, setActiveLogo] = useState<LogoId | null>(null);
  const activeTestimonial = activeLogo ? TESTIMONIALS[activeLogo] : undefined;

  return (
    <section
      className="relative isolate overflow-hidden px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-20 lg:px-12"
      style={{
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        background:
          "radial-gradient(ellipse 80% 55% at 70% 35%, rgba(210, 225, 240, 0.35), transparent 55%), radial-gradient(ellipse 60% 45% at 20% 70%, rgba(235, 228, 210, 0.4), transparent 50%), #f4f4f2",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(120,120,120,0.45) 0.7px, transparent 0.8px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        {/* Left copy */}
        <div className="relative z-10 max-w-xl">
          <div
            className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-relaxed sm:text-[13px]"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            <span className="rounded-[3px] bg-[#f0d8d4] px-1.5 py-0.5 text-[#2a2a2a]">
              1,199,807 hours of work
            </span>
            <span className="text-[#8a8a8a]">
              executed in the background since Q3&apos;23
            </span>
          </div>

          <h1 className="mb-4 text-[clamp(2rem,4.2vw,3.15rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1f1f1f]">
            The World&apos;s Most
            <br />
            Experienced Digital
            <br />
            Teammate
          </h1>

          <p
            className="mb-7 max-w-md text-[13px] leading-relaxed text-[#5c5c5c] sm:text-[14px]"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            Join leading enterprises and create your own digital teammates to
            100x your output.
          </p>

          <form
            className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="sr-only" htmlFor="hero-email">
              Work email
            </label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email?"
              className="min-h-11 flex-1 rounded-md border border-[#d8d8d8] bg-white/80 px-3.5 text-[13px] text-[#222] outline-none placeholder:text-[#a0a0a0] focus:border-[#b0b0b0]"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            />
            <button
              type="submit"
              className="relative min-h-11 shrink-0 rounded-md px-5 text-[13px] font-semibold text-[#111] transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                background:
                  "linear-gradient(90deg, #9fe8e0 0%, #c8f0a8 45%, #efe48a 100%)",
              }}
            >
              <CornerDots />
              Get started
            </button>
          </form>
        </div>

        {/* Video */}
        <div className="relative z-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#ddd] shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=750&fit=crop"
              alt="Product walkthrough video thumbnail"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
            <button
              type="button"
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md border border-white/40 bg-white/55 px-4 py-2.5 text-[13px] font-medium text-[#111] shadow-sm backdrop-blur-md transition hover:bg-white/70"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
              aria-label="Play video"
            >
              <CornerDots color="#1a1a1a" />
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
                <path d="M0 0v12l10-6L0 0Z" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </div>

      {/* Floating testimonial */}
      {activeTestimonial && (
        <div className="pointer-events-none absolute inset-x-0 top-[28%] z-30 flex justify-center px-4 sm:top-[32%]">
          <div
            className="pointer-events-auto w-full max-w-[420px] rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            role="dialog"
            aria-label={`${activeTestimonial.name} testimonial`}
          >
            <div className="mb-4 flex justify-center text-[#4a4a4a]">
              {activeLogo === "samsara" ? (
                <LogoMark id="samsara" />
              ) : (
                <span className="text-[13px] font-medium tracking-wide text-[#4a4a4a]">
                  {activeTestimonial.company}
                </span>
              )}
            </div>

            <div className="mb-2 text-[22px] leading-none text-[#7fb3e0]" aria-hidden>
              “
            </div>

            <p
              className="mb-5 text-[13px] leading-relaxed text-[#333]"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              {activeTestimonial.quote}
            </p>

            <div
              className="mb-4 border-t border-dashed border-[#d0d0d0]"
              aria-hidden
            />

            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeTestimonial.avatar}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <div className="text-[13px] font-semibold text-[#1a1a1a]">
                  {activeTestimonial.name}
                </div>
                <div className="text-[12px] text-[#8a8a8a]">
                  {activeTestimonial.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logo cloud */}
      <div className="relative z-20 mx-auto mt-14 max-w-5xl sm:mt-16">
        <ul className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6 sm:justify-between sm:gap-x-4">
          {LOGOS.map((logo) => {
            const isActive = activeLogo === logo.id;
            const interactive = Boolean(logo.hasPlus && TESTIMONIALS[logo.id]);

            return (
              <li key={logo.id} className="relative flex flex-col items-center">
                {logo.hasPlus && (
                  <button
                    type="button"
                    aria-label={`Show ${logo.label} testimonial`}
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveLogo((current) =>
                        current === logo.id ? null : logo.id,
                      )
                    }
                    className={`mb-2 flex h-5 w-5 items-center justify-center rounded-full border text-[11px] leading-none transition ${
                      isActive
                        ? "border-[#6aa3d4] bg-[#6aa3d4] text-white"
                        : "border-[#9ec4e4] bg-[#cfe3f5] text-white hover:bg-[#b7d5ef]"
                    }`}
                  >
                    +
                  </button>
                )}
                {!logo.hasPlus && <span className="mb-2 h-5" aria-hidden />}

                <button
                  type="button"
                  disabled={!interactive}
                  onClick={() => {
                    if (!interactive) return;
                    setActiveLogo((current) =>
                      current === logo.id ? null : logo.id,
                    );
                  }}
                  className={`opacity-80 transition ${
                    interactive ? "cursor-pointer hover:opacity-100" : "cursor-default"
                  } ${isActive ? "opacity-100" : ""}`}
                >
                  <LogoMark id={logo.id} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Click-away for testimonial */}
      {activeTestimonial && (
        <button
          type="button"
          aria-label="Dismiss testimonial"
          className="absolute inset-0 z-[25] cursor-default"
          onClick={() => setActiveLogo(null)}
        />
      )}
    </section>
  );
}
