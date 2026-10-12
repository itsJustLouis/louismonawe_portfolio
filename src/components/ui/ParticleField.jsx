import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// The signature hero piece: a drifting network of nodes that lights up around the cursor.
// Rebuilt from the original header animation with proper cleanup, high-DPI rendering,
// pausing when off-screen, and a still frame for people who prefer reduced motion.

const LINE_RGB = "186,156,255"; // --violet-300
const NODE_RGB = "229,156,255"; // --lilac-300
const SIGNAL_RGB = "255,106,69"; // --coral-400

const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

function ParticleField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let points = [];
    let rafId = null;
    let visible = true;
    const target = { x: 0, y: 0 };

    const build = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Start the "cursor" where the photo sits so the field is alive before anyone moves.
      target.x = width * 0.72;
      target.y = height * (width < 700 ? 0.18 : 0.45);

      gsap.killTweensOf(points);
      const cols = width < 700 ? 12 : 20;
      const rows = width < 700 ? 16 : 20;
      points = [];
      for (let x = 0; x < width; x += width / cols) {
        for (let y = 0; y < height; y += height / rows) {
          const px = x + (Math.random() * width) / cols;
          const py = y + (Math.random() * height) / rows;
          points.push({ x: px, y: py, originX: px, originY: py, r: 1.5 + Math.random() * 2 });
        }
      }

      // Each node links to its five nearest neighbours.
      points.forEach((p) => {
        p.closest = points
          .filter((q) => q !== p)
          .sort((a, b) => dist2(p, a) - dist2(p, b))
          .slice(0, 5);
      });

      if (!reduceMotion) points.forEach(shift);
    };

    const shift = (p) => {
      gsap.to(p, {
        duration: 1 + Math.random(),
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: "circ.inOut",
        onComplete: () => shift(p),
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        const d = dist2(target, p);
        let line = 0;
        let node = 0;
        if (d < 4000) {
          line = 0.32;
          node = 0.9;
        } else if (d < 20000) {
          line = 0.12;
          node = 0.4;
        } else if (d < 45000) {
          line = 0.03;
          node = 0.12;
        }
        if (!line) continue;

        for (const q of p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${LINE_RGB},${line})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = d < 4000 ? `rgba(${SIGNAL_RGB},${node})` : `rgba(${NODE_RGB},${node})`;
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      rafId = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (reduceMotion) draw();
    };

    const onResize = () => {
      build();
      draw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    build();
    draw();
    if (!reduceMotion) rafId = requestAnimationFrame(loop);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(points);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`particle-field ${className}`} aria-hidden="true" />;
}

export default ParticleField;
