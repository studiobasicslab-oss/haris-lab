"use client";
import React, { useState } from "react";
import { X, Sparkles, RefreshCw, Copy, Check, Atom, Compass, Gamepad2 } from "lucide-react";
import { THOUGHT_EXPERIMENTS } from "../data/labCatalogue";
import { labAudio } from "./LabAudio";
import ReflexMiniGame from "./ReflexMiniGame";

interface CuriosityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CuriosityModal({ isOpen, onClose }: CuriosityModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"thought" | "minigame">("thought");

  if (!isOpen) return null;

  const current = THOUGHT_EXPERIMENTS[currentIndex];

  const handleNext = () => {
    labAudio.playBlip(700);
    setCurrentIndex((prev) => (prev + 1) % THOUGHT_EXPERIMENTS.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${current.quote}" — ${current.title} (${current.text})`);
    setIsCopied(true);
    labAudio.playChime();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-[var(--border-hover)] bg-[#0d1017] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)] relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[var(--card-hover-bg)] border border-[var(--border)] text-[var(--accent)]">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-telemetry text-[11px] text-[var(--accent)] uppercase tracking-wider block">
                Atelier Chamber
              </span>
              <h3 className="font-display text-2xl text-[var(--text-main)] font-semibold">
                Curiosity & Apparatus Protocol
              </h3>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              labAudio.playBlip(400);
              onClose();
            }}
            className="p-2 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-white hover:border-[var(--accent)] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mb-6 font-telemetry text-xs relative z-10">
          <button
            onClick={() => {
              setActiveSubTab("thought");
              labAudio.playBlip(550);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              activeSubTab === "thought"
                ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] font-medium"
                : "bg-[var(--card-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Philosophical Inscriptions</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("minigame");
              labAudio.playBlip(550);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
              activeSubTab === "minigame"
                ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] font-medium"
                : "bg-[var(--card-bg)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Quantum Reflex Lab</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10">
          {activeSubTab === "thought" ? (
            <div className="space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center justify-between text-xs font-telemetry">
                <span className="px-2.5 py-1 rounded-full bg-[var(--card-hover-bg)] text-[var(--accent)] border border-[var(--border)]">
                  {current.category}
                </span>
                <span className="text-[var(--text-muted)]">
                  Specimen #{currentIndex + 1} of {THOUGHT_EXPERIMENTS.length}
                </span>
              </div>

              {/* Title & Text */}
              <div>
                <h4 className="font-display text-2xl md:text-3xl text-[var(--text-main)] mb-3 leading-snug">
                  {current.title}
                </h4>
                <p className="font-sans-modern text-base text-[var(--text-sub)] leading-relaxed">
                  {current.text}
                </p>
              </div>

              {/* Quote Block */}
              <div className="p-4 md:p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] relative">
                <div className="font-serif-vintage italic text-lg text-[var(--text-main)] leading-relaxed text-center">
                  &ldquo;{current.quote}&rdquo;
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs font-telemetry">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
                >
                  {isCopied ? <Check className="w-4 h-4 text-[var(--accent)]" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? "Copied to Clipboard" : "Copy Inscription"}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[#090a0f] font-semibold tracking-wider uppercase hover:opacity-90 transition hover:scale-105 active:scale-95 shadow-[0_0_20px_var(--accent-glow)]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Synthesize Next Inscription</span>
                </button>
              </div>
            </div>
          ) : (
            <ReflexMiniGame />
          )}
        </div>
      </div>
    </div>
  );
}
