"use client";
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Palette, Radio } from "lucide-react";
import { labAudio } from "./LabAudio";

interface TelemetryBarProps {
  onOpenCuriosity: () => void;
  activeTheme: string;
  onChangeTheme: (theme: string) => void;
}

export default function TelemetryBar({
  onOpenCuriosity,
  activeTheme,
  onChangeTheme,
}: TelemetryBarProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.toISOString().substring(11, 19) + " UTC";
      const local = now.toLocaleTimeString([], { hour12: false });
      setTimeStr(`${local} • ${utc}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const state = labAudio.toggleAmbient();
    setIsAudioActive(state);
    if (state) {
      labAudio.playChime();
    }
  };

  const themes = [
    { id: "flowers", label: "Flowers (Light)", color: "#e07a97", icon: "🌸" },
    { id: "space", label: "Space (Dark)", color: "#34d399", icon: "🚀" },
    { id: "forest", label: "Forest (Dark)", color: "#5eead4", icon: "🌲" },
  ];

  return (
    <div className="w-full border-b border-[var(--border)] bg-[var(--bg-color)]/85 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-telemetry">
        {/* Left: Studio Identity & Live System Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]"></span>
            </span>
            <span className="text-[var(--text-main)] font-semibold tracking-wider uppercase">
              STUDIO BASICS LAB
            </span>
          </div>

          <span className="text-[var(--border)] hidden sm:inline">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-[var(--text-muted)]">
            <Radio className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
            <span>SYS_RUN: NOMINAL</span>
            <span className="text-[var(--text-sub)] ml-1.5 font-mono">[{timeStr}]</span>
          </div>
        </div>

        {/* Right: Interactive Controls (Sound, Theme, Curiosity Generator) */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Curiosity Protocol Button */}
          <button
            onClick={() => {
              labAudio.playBlip(720);
              onOpenCuriosity();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--card-hover-bg)] transition shadow-sm hover:scale-105 active:scale-95"
            title="Launch Curiosity Protocol"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden sm:inline">Curiosity Protocol</span>
            <span className="sm:hidden">Curiosity</span>
          </button>

          {/* Audio Ambient Synth Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition hover:scale-105 active:scale-95 ${
              isAudioActive
                ? "bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]"
                : "bg-[var(--card-bg)] border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text-main)]"
            }`}
            title={isAudioActive ? "Mute Ambient Synth" : "Activate Ambient Space Drone"}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline">Audio: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline">Audio: OFF</span>
              </>
            )}
          </button>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                labAudio.playBlip(440);
                setThemeDropdownOpen(!themeDropdownOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--text-main)] hover:border-[var(--border-hover)] transition shadow-sm"
              title="Change Theme Palette"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)" }}></span>
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl glass-panel p-2 shadow-2xl z-50 border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setThemeDropdownOpen(false)}
              >
                <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider px-2 py-1 border-b border-[var(--border)] mb-1">
                  Theme Palette
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onChangeTheme(t.id);
                      labAudio.playBlip(620);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition ${
                      activeTheme === t.id
                        ? "bg-[var(--card-hover-bg)] text-[var(--accent)] font-semibold"
                        : "text-[var(--text-sub)] hover:bg-[var(--card-hover-bg)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{t.icon}</span>
                      <span>{t.label}</span>
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    ></span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
