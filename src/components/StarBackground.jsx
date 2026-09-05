import React, { useRef, useEffect } from "react";

/**
 * Lightweight animated starfield — no dependencies, no WebGL.
 * Twinkling stars, subtle mouse parallax, and the occasional shooting star.
 * Respects prefers-reduced-motion (renders one static frame instead of animating).
 *
 * Drop it in as the FIRST child of your Body in App.js so it sits behind everything.
 */
const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let shootingStars = [];
    let animationId;
    const pointer = { x: 0.5, y: 0.5 };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const starCount = () => Math.min(240, Math.floor((width * height) / 6000));

    const initStars = () => {
      stars = new Array(starCount()).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // depth: drives size + parallax
        r: Math.random() * 1.2 + 0.3,
        tw: Math.random() * Math.PI * 2, // twinkle phase
        twSpeed: Math.random() * 0.02 + 0.004,
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
      initStars();
    };

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        vx: 6 + Math.random() * 4,
        vy: 2.5 + Math.random() * 2,
        life: 0,
        maxLife: 55 + Math.random() * 25,
        len: 90 + Math.random() * 70,
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.tw += s.twSpeed;
        const twinkle = 0.55 + Math.sin(s.tw) * 0.45;
        const px = s.x + (pointer.x - 0.5) * 28 * s.z;
        const py = s.y + (pointer.y - 0.5) * 28 * s.z;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 231, 255, ${twinkle * s.z})`;
        ctx.fill();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const sh = shootingStars[i];
        sh.life++;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const t = sh.life / sh.maxLife;
        const alpha = (t < 0.5 ? t * 2 : (1 - t) * 2) * 0.9;
        const tailX = sh.x - sh.len;
        const tailY = sh.y - sh.len * (sh.vy / sh.vx);
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `rgba(127, 159, 255, ${alpha})`);
        grad.addColorStop(1, "rgba(127, 159, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (sh.life >= sh.maxLife) shootingStars.splice(i, 1);
      }

      if (Math.random() < 0.004 && shootingStars.length < 2) spawnShootingStar();
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
      render(); // single static frame, no animation loop
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
