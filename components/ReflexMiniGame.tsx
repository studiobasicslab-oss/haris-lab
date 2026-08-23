"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Trophy, RotateCcw, Zap } from "lucide-react";
import { labAudio } from "./LabAudio";

export default function ReflexMiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [combo, setCombo] = useState(1);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; created: number }>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hari_lab_minigame_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const spawnTarget = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const margin = 40;
    const x = Math.random() * (rect.width - margin * 2) + margin;
    const y = Math.random() * (rect.height - margin * 2) + margin;
    const size = Math.random() * 24 + 32;

    const colors = ["#34d399", "#06b6d4", "#a855f7", "#f59e0b", "#f43f5e"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setTargets((prev) => [
      ...prev.slice(-4), // keep maximum 5 on screen
      { id: Date.now() + Math.random(), x, y, size, color, created: Date.now() },
    ]);
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setCombo(1);
    setTimeLeft(20);
    setTargets([]);
    labAudio.playChime();
  };

  const handleHitTarget = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    labAudio.playBlip(600 + combo * 80);
    setScore((prev) => {
      const newScore = prev + 10 * combo;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("hari_lab_minigame_highscore", newScore.toString());
      }
      return newScore;
    });
    setCombo((c) => Math.min(c + 1, 8));
    setTargets((prev) => prev.filter((t) => t.id !== id));
    spawnTarget();
  };

  const handleMiss = () => {
    if (!isPlaying) return;
    setCombo(1);
    labAudio.playBlip(220);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          labAudio.playChime();
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      spawnTarget();
    }, 850);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [isPlaying, spawnTarget]);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-telemetry text-xs relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[var(--accent)] animate-pulse" />
          <span className="text-[var(--text-main)] font-semibold uppercase tracking-wider">
            Quantum Star Alignment
          </span>
          <span className="px-2 py-0.5 rounded bg-[var(--card-hover-bg)] text-[var(--text-muted)] border border-[var(--border)]">
            Lab Mini-Game
          </span>
        </div>

        <div className="flex items-center gap-4 text-[var(--text-sub)]">
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>High: <strong className="text-[var(--text-main)]">{highScore}</strong></span>
          </div>
          <div>
            Score: <strong className="text-[var(--accent)] text-sm">{score}</strong>
          </div>
          <div>
            Combo: <strong className="text-cyan-400">x{combo}</strong>
          </div>
          <div>
            Time: <strong className={timeLeft <= 5 ? "text-rose-400 animate-ping" : "text-[var(--text-main)]"}>{timeLeft}s</strong>
          </div>
        </div>
      </div>

      {/* Game Field Area */}
      <div
        ref={containerRef}
        onClick={handleMiss}
        className="w-full h-64 md:h-72 rounded-xl border border-[var(--border)] bg-[#090a0f]/90 relative overflow-hidden cursor-crosshair select-none flex items-center justify-center"
      >
        {!isPlaying ? (
          <div className="text-center p-6 z-10">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center mx-auto mb-3 text-[var(--accent)]">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <h4 className="font-display text-2xl text-[var(--text-main)] mb-1">
              Reflex & Alignment Matrix
            </h4>
            <p className="font-sans-modern text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4">
              Click the pulsating celestial anomalies before they decay. Chain hits to accelerate your multiplier!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-[#090a0f] font-semibold text-xs font-telemetry tracking-wider uppercase hover:opacity-90 hover:scale-105 active:scale-95 transition shadow-[0_0_20px_var(--accent-glow)]"
            >
              Initialize Experiment
            </button>
          </div>
        ) : (
          targets.map((t) => (
            <button
              key={t.id}
              onClick={(e) => handleHitTarget(t.id, e)}
              style={{
                left: `${t.x}px`,
                top: `${t.y}px`,
                width: `${t.size}px`,
                height: `${t.size}px`,
                borderColor: t.color,
                boxShadow: `0 0 16px ${t.color}`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#090a0f]/80 flex items-center justify-center group animate-pulse-slow active:scale-90 transition-transform"
            >
              <div
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: t.color }}
              />
              <span className="absolute -top-4 text-[9px] font-telemetry font-bold text-white opacity-0 group-hover:opacity-100 transition">
                TAP
              </span>
            </button>
          ))
        )}

        {/* Radar concentric target rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-48 h-48 rounded-full border border-dashed border-white"></div>
          <div className="w-32 h-32 rounded-full border border-white absolute"></div>
          <div className="w-16 h-16 rounded-full border border-dashed border-white absolute"></div>
        </div>
      </div>

      {/* Footer controls */}
      {isPlaying && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={startGame}
            className="flex items-center gap-1 text-[11px] font-telemetry text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Sector</span>
          </button>
        </div>
      )}
    </div>
  );
}
