"use client";

import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import { ProductVideo } from "@/components/ui/ProductVideo";
import { Button } from "@/components/ui/Button";
import "@/styles/Product.css";

export function ProductSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="product" className="product">
      <div className="product__glow product__glow--left" aria-hidden />
      <div className="product__dots" aria-hidden />

      <div className="product__inner">
        <h2 className="product__title">
          <strong>A single platform</strong> to train and manage<br />enterprise-grade digital teammates
        </h2>

        <p className="product__sub">
          Operators simply describe a process or share their screen and the AI Teammate observes, learns, and takes over execution.
        </p>

        <Button
          color="#2a2a2a"
          background="rgba(255, 255, 255, 0.72)"
          borderColor="#d0d0d0"
          hoverBackground="#121212"
          hoverColor="#ffffff"
          hoverBorderColor="#121212"
          dotColor="#3a3a3a"
          hoverDotColor="#ffffff"
          onClick={() => setVideoOpen(true)}
          style={{ borderRadius: "0.2rem", fontWeight: 500 }}
        >
          <IoPlay size={12} aria-hidden />
          Work is changing
        </Button>
      </div>

      <ProductVideo open={videoOpen} src="/grass.mp4" title="Work is changing" onClose={() => setVideoOpen(false)} />
    </section>
  );
}
