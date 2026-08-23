"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gamepad2,
  Sparkles,
  Search,
  Orbit,
  Radio,
  Atom,
  Layers,
  RefreshCw,
  Video,
} from "lucide-react";
import CosmicCanvas from "../components/CosmicCanvas";
import TelemetryBar from "../components/TelemetryBar";
import ProjectCard from "../components/ProjectCard";
import CuriosityModal from "../components/CuriosityModal";
import ReflexMiniGame from "../components/ReflexMiniGame";
import { LAB_PORTALS, THOUGHT_EXPERIMENTS } from "../data/labCatalogue";
import { labAudio } from "../components/LabAudio";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCuriosityOpen, setIsCuriosityOpen] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<string>("obsidian-mint");
  const [thoughtIndex, setThoughtIndex] = useState<number>(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  const navTabs = [
    {
      id: "all",
      label: "All Portals",
      icon: Layers,
      count: LAB_PORTALS.length,
      description: "Complete studio directory of active websites, tools, and social channels",
    },
    {
      id: "games-tools",
      label: "Games & Tools",
      icon: Gamepad2,
      count: LAB_PORTALS.filter((p) => p.category === "games-tools").length,
      description: "Interactive arcade game parlor, deep-space telemetry tools, and developer instruments",
    },
    {
      id: "curiosities",
      label: "Curiosities & Hobbies",
      icon: Sparkles,
      count: LAB_PORTALS.filter((p) => p.category === "curiosities").length,
      description: "Digital art sketches, culinary logs, reading registers, and studio Instagram snapshots",
    },
    {
      id: "broadcasts",
      label: "Broadcasts",
      icon: Video,
      count: LAB_PORTALS.filter((p) => p.category === "broadcasts").length,
      description: "A Minute of Knowledge short-form educational video series",
    },
    {
      id: "observatory",
      label: "Observatory",
      icon: Atom,
      count: 1,
      description: "Philosophical thought experiments, cosmic paradoxes, and interactive reflex lab",
    },
  ];

  const filteredPortals = useMemo(() => {
    return LAB_PORTALS.filter((portal) => {
      const matchesTab = activeTab === "all" || portal.category === activeTab;
      const matchesSearch =
        searchQuery === "" ||
        portal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    labAudio.playBlip(520);
  };

  const currentThought = THOUGHT_EXPERIMENTS[thoughtIndex];

  const handleNextThought = () => {
    labAudio.playBlip(750);
    setThoughtIndex((prev) => (prev + 1) % THOUGHT_EXPERIMENTS.length);
  };

  const currentTabObj = navTabs.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] relative selection:bg-[var(--accent)] selection:text-[#090a0f]">
      {/* Background Constellation Particle Field */}
      <CosmicCanvas density="medium" interactive={true} />

      {/* Top Telemetry & Controls Bar */}
      <TelemetryBar
        onOpenCuriosity={() => setIsCuriosityOpen(true)}
        activeTheme={activeTheme}
        onChangeTheme={setActiveTheme}
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
        
        {/* HEADER */}
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-telemetry text-[var(--accent)] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping"></span>
              <span>STUDIO BASICS • DIGITAL ATELIER & LAB</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-[var(--text-main)] tracking-tight font-medium leading-[0.95] mb-5 select-none">
              Hari&apos;s Lab
            </h1>

            {/* Reticle Separator */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
              <Orbit className="w-4 h-4 text-[var(--accent)] animate-spin-slow" />
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
            </div>

            {/* Subtitle */}
            <p className="font-sans-modern text-sm md:text-base text-[var(--text-sub)] max-w-xl mx-auto leading-relaxed">
              A single curated portal connecting all of our games, tools, visual artwork, culinary notebooks, and video archives.
            </p>
          </motion.div>
        </header>

        {/* NEAT TAB NAVIGATION BAR */}
        <nav className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel border border-[var(--border)] max-w-4xl mx-auto">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-telemetry tracking-wide transition-all relative ${
                    isActive
                      ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] font-semibold"
                      : "text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--card-hover-bg)] border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      isActive
                        ? "bg-[var(--accent)] text-[#090a0f] font-bold"
                        : "bg-[#090a0f]/80 text-[var(--text-muted)] border border-[var(--border)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Subtitle Context & Search */}
          <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
            <p className="font-sans-modern text-xs text-[var(--text-muted)] text-center sm:text-left">
              {currentTabObj?.description}
            </p>

            {activeTab !== "observatory" && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-1.5 rounded-xl glass-panel text-xs font-telemetry text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* MAIN PORTAL GRID */}
        <main className="mb-20">
          <AnimatePresence mode="wait">
            {activeTab === "observatory" ? (
              /* OBSERVATORY TAB */
              <motion.div
                key="observatory-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 max-w-4xl mx-auto"
              >
                {/* Philosophical Thought Card */}
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] p-8 md:p-10 backdrop-blur-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between mb-6 font-telemetry text-xs">
                    <span className="px-3 py-1 rounded-full bg-[var(--card-hover-bg)] text-[var(--accent)] border border-[var(--border)]">
                      {currentThought.category}
                    </span>
                    <span className="text-[var(--text-muted)]">
                      Specimen #{thoughtIndex + 1} of {THOUGHT_EXPERIMENTS.length}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-[var(--text-main)] mb-3 leading-tight">
                    {currentThought.title}
                  </h3>

                  <p className="font-sans-modern text-base md:text-lg text-[var(--text-sub)] leading-relaxed mb-6">
                    {currentThought.text}
                  </p>

                  <blockquote className="p-5 rounded-2xl bg-[#090a0f]/80 border-l-4 border-[var(--accent)] font-serif-vintage italic text-xl text-[var(--text-main)] mb-8">
                    &ldquo;{currentThought.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
                    <span className="text-xs font-telemetry text-[var(--text-muted)]">
                      Celestial Musings
                    </span>

                    <button
                      onClick={handleNextThought}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[#090a0f] font-semibold text-xs font-telemetry tracking-wider uppercase hover:opacity-90 transition hover:scale-105 active:scale-95 shadow-[0_0_15px_var(--accent-glow)]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Next Inscription</span>
                    </button>
                  </div>
                </div>

                {/* Built-in Reflex Mini Game */}
                <ReflexMiniGame />
              </motion.div>
            ) : (
              /* NON-REPEATING PORTAL GRID */
              <motion.div
                key={`grid-${activeTab}-${searchQuery}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {filteredPortals.length === 0 ? (
                  <div className="text-center py-16 glass-panel rounded-3xl border border-[var(--border)] max-w-lg mx-auto">
                    <p className="font-display text-xl text-[var(--text-main)] mb-2">
                      No portal matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-1.5 rounded-xl bg-[var(--card-hover-bg)] text-xs font-telemetry text-[var(--accent)] border border-[var(--border)]"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPortals.map((portal) => (
                      <ProjectCard key={portal.id} portal={portal} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-[var(--border)] font-telemetry text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-[var(--text-main)] font-semibold uppercase tracking-wider">
              Hari&apos;s Lab • Studio Basics
            </p>
            <p>© {new Date().getFullYear()} Preserved and curated.</p>
          </div>

          <div>
            <a
              href="mailto:studiobasics.lab@gmail.com"
              className="text-[var(--text-sub)] hover:text-[var(--accent)] transition italic"
            >
              Letters: <span className="underline decoration-[var(--border)] hover:decoration-[var(--accent)]">studiobasics.lab@gmail.com</span>
            </a>
          </div>
        </footer>

      </div>

      {/* Curiosity Modal */}
      <CuriosityModal
        isOpen={isCuriosityOpen}
        onClose={() => setIsCuriosityOpen(false)}
      />
    </div>
  );
}