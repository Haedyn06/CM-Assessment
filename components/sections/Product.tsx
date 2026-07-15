"use client";

import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import { ProductVideo } from "@/components/ui/ProductVideo";
import { useFillHover } from "@/lib/useFillHover";
import "@/styles/Product.css";

export function ProductSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const fill = useFillHover();

  return (
    <section id="product" className="product">
      <div className="productGlow productGlowLeft" aria-hidden />
      <div className="productDots" aria-hidden />

      <div className="productInner">
        <h2 className="productTitle">
          <strong>A single platform</strong> to train and manage<br />enterprise-grade digital bears
        </h2>

        <p className="productSub">
          Operators simply describe a process or share their screen and the AI Teammate observes, learns, and takes over execution.
        </p>

        <button
          type="button"
          className={`fillBtn productCta ${fill.fillClass}`}
          onClick={() => setVideoOpen(true)}
          {...fill.fillHandlers}
        >
          <span className="fillBtnBase" aria-hidden />
          <span className="fillBtnWash" aria-hidden />
          <span className="fillBtnLabel">
            <IoPlay size={12} aria-hidden />
            Work is changing
          </span>
        </button>
      </div>

      <ProductVideo open={videoOpen} src="/grass.mp4" title="Work is changing" onClose={() => setVideoOpen(false)} />
    </section>
  );
}
