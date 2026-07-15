"use client";

import { useEffect, useRef } from "react";

type Point3 = { x: number; y: number; z: number };

function fibonacciSphere(count: number): Point3[] {
  const points: Point3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }

  return points;
}

function rotateY(p: Point3, angle: number): Point3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: p.x * c + p.z * s,
    y: p.y,
    z: -p.x * s + p.z * c,
  };
}

function rotateX(p: Point3, angle: number): Point3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * c - p.z * s,
    z: p.y * s + p.z * c,
  };
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pointCount =
      window.matchMedia("(max-width: 720px)").matches ? 700 : 1400;
    const points = fibonacciSphere(pointCount);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let rotation = 0;
    let targetTiltX = -0.22;
    let targetTiltY = 0.18;
    let tiltX = targetTiltX;
    let tiltY = targetTiltY;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltY = 0.18 + nx * 0.35;
      targetTiltX = -0.22 + ny * 0.28;
    };

    const draw = () => {
      if (!running) return;

      if (!reducedMotion) {
        rotation += 0.0016;
        tiltX += (targetTiltX - tiltX) * 0.04;
        tiltY += (targetTiltY - tiltY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.42;
      const cx = width * 0.58;
      const cy = height * 0.46;

      // Soft depth haze behind the globe
      const haze = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.15);
      haze.addColorStop(0, "rgba(170, 180, 190, 0.08)");
      haze.addColorStop(1, "rgba(170, 180, 190, 0)");
      ctx.fillStyle = haze;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      const projected: { x: number; y: number; z: number; s: number }[] = [];

      for (const point of points) {
        let p = rotateY(point, rotation + tiltY * 0.15);
        p = rotateX(p, tiltX);
        p = rotateY(p, tiltY * 0.35);

        const perspective = 1.55 / (1.55 - p.z);
        const x = cx + p.x * radius * perspective;
        const y = cy + p.y * radius * perspective;
        const depth = (p.z + 1) * 0.5;
        const size = 0.55 + depth * 1.35;
        projected.push({ x, y, z: p.z, s: size });
      }

      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        const depth = (p.z + 1) * 0.5;
        const alpha = 0.12 + depth * 0.42;
        ctx.beginPath();
        ctx.fillStyle = `rgba(110, 118, 128, ${alpha})`;
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // sparse nearer-neighbor lines for wireframe feel (sample only)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i += 18) {
        const a = projected[i]!;
        if (a.z < -0.15) continue;
        let nearest: (typeof projected)[number] | null = null;
        let best = 999;
        for (let j = i + 1; j < Math.min(i + 40, projected.length); j += 1) {
          const b = projected[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist < best && dist > 8 && dist < 2200) {
            best = dist;
            nearest = b;
          }
        }
        if (!nearest) continue;
        const depth = ((a.z + nearest.z) * 0.5 + 1) * 0.5;
        ctx.strokeStyle = `rgba(130, 136, 145, ${0.04 + depth * 0.1})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(nearest.x, nearest.y);
        ctx.stroke();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="heroGlobe" aria-hidden>
      <canvas ref={canvasRef} className="heroGlobeCanvas" />
    </div>
  );
}
