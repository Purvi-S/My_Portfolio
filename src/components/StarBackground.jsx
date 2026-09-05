import React, { useRef, useEffect } from "react";

/**
 * Warm "sunlit dust" — soft motes drifting slowly upward, like specks of dust
 * caught in morning light. Gentle twinkle + a whisper of mouse parallax.
 * Pure canvas, no dependencies. Respects prefers-reduced-motion.
 *
 * (Kept this filename so App.js doesn't need re-wiring; it no longer draws stars.)
 */
const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let motes = [];
    let animationId;
    const pointer = { x: 0.5, y: 0.5 };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const count = () => Math.min(150, Math.floor((width * height) / 11000));

    const initMotes = () => {
      motes = new Array(count()).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // depth: size + speed + parallax
        r: Math.random() * 1.6 + 0.6,
        drift: Math.random() * 0.3 + 0.08, // upward speed
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.01 + 0.003,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.015 + 0.004,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initMotes();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        m.y -= m.drift * m.z;
        m.sway += m.swaySpeed;
        m.tw += m.twSpeed;
        if (m.y < -6) {
          m.y = height + 6;
          m.x = Math.random() * width;
        }
        const twinkle = 0.35 + Math.sin(m.tw) * 0.3;
        const px =
          m.x + Math.sin(m.sway) * 8 + (pointer.x - 0.5) * 22 * m.z;
        const py = m.y + (pointer.y - 0.5) * 22 * m.z;
        const rad = m.r * m.z * 3;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
        grad.addColorStop(0, `rgba(198, 168, 120, ${twinkle})`);
        grad.addColorStop(1, "rgba(198, 168, 120, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      render();
      animationId = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      pointer.x = e.clientX / width;
      pointer.y = e.clientY / height;
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      render();
    } else {
      window.addEventListener("pointermove", onMove);
      loop();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarBackground;
