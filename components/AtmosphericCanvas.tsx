"use client";
import React, { useEffect, useRef } from "react";

interface AtmosphericCanvasProps {
  theme: "vintage-coquette" | "dark-forest" | "vintage-library" | string;
  interactive?: boolean;
}

export default function AtmosphericCanvas({
  theme,
  interactive = true,
}: AtmosphericCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Particle Types based on theme
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      targetAlpha: number;
      color: string;
      rotation: number;
      vRotation: number;
      type: "petal" | "firefly" | "ember" | "sparkle";
      pulseSpeed?: number;
      phase?: number;
    }

    const particles: Particle[] = [];
    const count = theme === "vintage-coquette" ? 45 : theme === "dark-forest" ? 60 : 50;

    const getColorsForTheme = (th: string) => {
      if (th === "vintage-coquette") {
        return ["#f4a8b9", "#fbcfe8", "#e07a97", "#fef08a", "#fce7f3"];
      } else if (th === "dark-forest") {
        return ["#5eead4", "#34d399", "#a7f3d0", "#fbbf24", "#6ee7b7"];
      } else {
        // vintage-library
        return ["#d4a373", "#fde68a", "#f59e0b", "#c2593f", "#fed7aa"];
      }
    };

    const colors = getColorsForTheme(theme);

    for (let i = 0; i < count; i++) {
      const pType: Particle["type"] =
        theme === "vintage-coquette"
          ? Math.random() > 0.3 ? "petal" : "sparkle"
          : theme === "dark-forest"
          ? Math.random() > 0.4 ? "firefly" : "sparkle"
          : Math.random() > 0.3 ? "ember" : "sparkle";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: pType === "petal" ? 6 + Math.random() * 8 : pType === "firefly" ? 2 + Math.random() * 3.5 : 1.5 + Math.random() * 3,
        vx: (Math.random() - 0.5) * (pType === "firefly" ? 0.8 : 0.4) + (theme === "vintage-coquette" ? 0.3 : 0),
        vy: pType === "petal" ? 0.6 + Math.random() * 0.8 : (Math.random() - 0.5) * 0.6 + (theme === "vintage-library" ? -0.4 : 0),
        alpha: 0.2 + Math.random() * 0.6,
        targetAlpha: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.03,
        type: pType,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;

        if (p.phase !== undefined && p.pulseSpeed !== undefined) {
          p.phase += p.pulseSpeed;
          p.alpha = 0.3 + Math.sin(p.phase) * 0.4;
        }

        // Screen wrap
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Interactive mouse avoidance/attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));

        if (p.type === "petal") {
          // Draw cute organic flower petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "firefly") {
          // Draw glowing firefly with radial gradient
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "ember") {
          // Warm candlelight ember
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
          grad.addColorStop(0, "#fff7ed");
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, "rgba(212, 163, 115, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 4-point sparkle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
}
