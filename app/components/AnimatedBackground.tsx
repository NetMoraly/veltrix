"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const circles: { x: number; y: number; r: number; dx: number; dy: number; opacity: number }[] = [];

    const createCircles = () => {
      const count = 20;
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 40 + 20;
        circles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const circle of circles) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.r);
        gradient.addColorStop(0, `rgba(180, 76, 255, ${circle.opacity})`);
        gradient.addColorStop(1, `rgba(52, 172, 228, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();

        // Движение
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Отскок от стен
        if (circle.x - circle.r < 0 || circle.x + circle.r > canvas.width) circle.dx *= -1;
        if (circle.y - circle.r < 0 || circle.y + circle.r > canvas.height) circle.dy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    createCircles();
    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
