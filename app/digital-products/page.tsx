"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Gamepad2,
  Download,
  Shield,
  Flame,
  Award,
  Database,
  ExternalLink,
  Code,
  Laptop,
  Layers,
  HelpCircle,
  BookOpen,
  UtensilsCrossed,
  CheckCircle2,
} from "lucide-react";
import CosmicCanvas from "@/components/CosmicCanvas";
import { labAudio } from "@/components/LabAudio";
import { PixelAvatar } from "@/components/gamify-life/PixelAvatar";

function AutoDownloadManager({
  onAutoDownloadTriggered,
}: {
  onAutoDownloadTriggered: (status: { triggered: boolean; source: string }) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const download = searchParams.get("download")?.toLowerCase();
    const auto = searchParams.get("autodownload")?.toLowerCase();
    const ref = searchParams.get("ref")?.toLowerCase();

    const isMatch =
      download === "thanksgiving" ||
      download === "thanksgiving-cookbook" ||
      download === "cookbook" ||
      download === "true" ||
      auto === "true" ||
      ref === "pinterest";

    if (isMatch) {
      onAutoDownloadTriggered({
        triggered: true,
        source: ref === "pinterest" ? "Pinterest" : "Pinterest / Direct Link",
      });

      // Immediate automated download trigger
      const timer = setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/The_Complete_Thanksgiving_Cookbook.pdf";
        link.setAttribute("download", "The_Complete_Thanksgiving_Cookbook.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Smooth scroll to the cookbook section
        const targetEl = document.getElementById("thanksgiving-cookbook");
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, onAutoDownloadTriggered]);

  return null;
}

export default function DigitalProductsPage() {
  const [selectedAvatar, setSelectedAvatar] = useState("unicorn_knight");
  const [downloadInfo, setDownloadInfo] = useState<{ triggered: boolean; source: string } | null>(null);

  const handleDownloadTrigger = useCallback((status: { triggered: boolean; source: string }) => {
    setDownloadInfo(status);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] relative selection:bg-[#fbbf24] selection:text-[#090a0f] transition-colors duration-500">
      <CosmicCanvas density="medium" interactive={true} />

      <Suspense fallback={null}>
        <AutoDownloadManager onAutoDownloadTriggered={handleDownloadTrigger} />
      </Suspense>

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-color)]/85 backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={() => labAudio.playBlip(520)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-telemetry text-[var(--accent)] hover:border-[var(--accent)] transition hover:scale-105 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Cosmic Lab</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-telemetry text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">VERCEL NATIVE DOMAIN</span>
            <span className="text-[var(--text-sub)]">[ALL PRODUCTS UNIFIED]</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
        {/* Pinterest / Auto-Download Notification Banner */}
        {downloadInfo?.triggered && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mb-10 p-5 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/10 border-2 border-orange-500/50 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-[0_0_40px_rgba(249,115,22,0.3)] relative z-30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-stone-950 font-bold shrink-0 shadow-lg">
                <Download className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="font-display text-lg text-white font-medium">
                    🎉 Welcome from {downloadInfo.source}!
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-telemetry border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Download Initiated (76 MB PDF)</span>
                  </span>
                </div>
                <p className="font-sans-modern text-xs text-orange-200/90 leading-relaxed">
                  Your free copy of <strong>The Complete Thanksgiving Cookbook</strong> should start downloading automatically. If prompted by your browser, tap allow, or click the direct button.
                </p>
              </div>
            </div>

            <a
              href="/The_Complete_Thanksgiving_Cookbook.pdf"
              download="The_Complete_Thanksgiving_Cookbook.pdf"
              onClick={() => labAudio.playChime()}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-stone-950 font-telemetry font-bold text-xs tracking-wider transition hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Manually</span>
            </a>
          </motion.div>
        )}

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-telemetry text-[#fbbf24] mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24] animate-spin-slow" />
              <span>STUDIO BASICS • DIGITAL PRODUCTS SUITE</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--text-main)] tracking-tight font-medium leading-[1] mb-4">
              Digital Products
            </h1>

            <p className="font-sans-modern text-sm sm:text-base text-[var(--text-sub)] max-w-xl mx-auto leading-relaxed">
              Bespoke web applications, gamified productivity engines, and developer instruments deployed directly on our unified Vercel platform.
            </p>
          </motion.div>
        </div>

        {/* FLAGSHIP HERO PRODUCT: GAMIFY YOUR LIFE */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border-2 border-[#fbbf24]/50 bg-gradient-to-b from-[#181a28]/95 to-[#0e101a]/95 backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_-15px_rgba(251,191,36,0.25)]"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbbf24]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Pill Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-telemetry text-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] font-semibold border border-[#fbbf24]/40 flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>FLAGSHIP DIGITAL PRODUCT</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[var(--text-muted)] border border-white/10 hidden sm:inline">
                  PWA OFFLINE-READY
                </span>
              </div>

              <span className="text-[var(--text-muted)] font-mono text-[11px]">
                /gamify-life
              </span>
            </div>

            {/* Two-Column Grid: Description vs Interactive Sprite & Card Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                  Gamify Your Life
                </h2>

                <p className="font-sans-modern text-base text-[var(--text-sub)] leading-relaxed">
                  Turn your everyday life into an authentic 8-bit retro RPG adventure. Level up 7 core character stats, earn XP for real-world good habits, conquer daily missions, redeem guilt-free rewards, and keep your cozy campfire streak alive.
                </p>

                {/* Feature Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>7 Core Stats</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Campfire Streak</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Award className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>XP & Rewards</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>100% Private</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Download className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Installable PWA</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>8-Bit Synth SFX</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/gamify-life"
                    onClick={() => labAudio.playChime()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1c172b] font-telemetry font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(251,191,36,0.4)] transition hover:scale-105 active:scale-95"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Play Gamify Life Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/gamify-life/help"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl glass-panel text-xs font-telemetry text-[#fbbf24] hover:bg-[#fbbf24]/10 border border-[#fbbf24]/30 transition"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>How to Play &amp; Sync Guide</span>
                  </Link>

                  <a
                    href="https://github.com/studiobasicslab-oss/gamify-life"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl glass-panel text-xs font-telemetry text-[var(--text-sub)] hover:text-white hover:border-white/30 transition"
                  >
                    <Code className="w-4 h-4" />
                    <span>Inspect GitHub Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Interactive Character Sprite Showcase Box */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-[#fcf6ea] text-[#2d2740] border-4 border-[#2d2740] shadow-[6px_6px_0px_#2d2740]">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#8a7dc4] mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4c4270]">
                      SPRITE PREVIEW
                    </span>
                    <span className="text-[11px] font-mono bg-[#fdf6db] px-2 py-0.5 border border-[#2d2740]">
                      LVL 1 HERO
                    </span>
                  </div>

                  <div className="flex items-center gap-4 my-2">
                    <div className="p-2 bg-white border-2 border-[#2d2740] flex flex-col items-center justify-center shrink-0">
                      <div className="w-20 h-20 flex items-center justify-center bg-[#fdf6db] border border-[#8a7dc4]">
                        <PixelAvatar avatarId={selectedAvatar} size={68} />
                      </div>
                    </div>

                    <div className="flex-1 text-left font-mono">
                      <h4 className="font-bold text-sm text-[#2d2740] mb-0.5">
                        {selectedAvatar === "unicorn_knight"
                          ? "Hero: Unicorn Knight"
                          : selectedAvatar === "retro_knight"
                          ? "Hero: Brave Warrior"
                          : selectedAvatar === "magic_wizard"
                          ? "Hero: Cosmic Mage"
                          : selectedAvatar === "forest_ranger"
                          ? "Hero: Forest Scout"
                          : selectedAvatar === "cozy_kitty"
                          ? "Hero: Cozy Kitten"
                          : "Hero: Cyber Ninja"}
                      </h4>
                      <p className="text-xs text-[#8a7dc4] font-semibold mb-1">
                        &quot;Wanderer of Horizons&quot;
                      </p>
                      <p className="text-[11px] text-[#4c4270] leading-snug">
                        Decide who you want to become and play that role every day.
                      </p>
                    </div>
                  </div>

                  {/* Character Sprite Picker */}
                  <div className="pt-3 border-t-2 border-dashed border-[#8a7dc4] mt-3">
                    <p className="text-[10px] font-mono text-[#4c4270] uppercase font-bold mb-2">
                      Switch Active Sprite:
                    </p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {[
                        "unicorn_knight",
                        "retro_knight",
                        "magic_wizard",
                        "forest_ranger",
                        "cozy_kitty",
                        "cyber_ninja",
                      ].map((id) => (
                        <button
                          key={id}
                          onClick={() => {
                            setSelectedAvatar(id);
                            labAudio.playBlip(620);
                          }}
                          className={`p-1 flex items-center justify-center border-2 transition-all ${
                            selectedAvatar === id
                              ? "border-[#2d2740] bg-[#fef08a] scale-105"
                              : "border-transparent bg-white hover:border-[#8a7dc4]"
                          }`}
                        >
                          <PixelAvatar avatarId={id} size={28} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Philosophy Motto Ribbon */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-telemetry text-[var(--text-sub)]">
              <span>REMEMBER: PROGRESS, NOT PERFECTION. CONSISTENCY, NOT INTENSITY.</span>
              <span className="text-[#fbbf24] font-semibold hidden sm:inline">ZERO STREAK LOSS FOR REST</span>
            </div>
          </motion.div>
        </section>

        {/* HOLIDAY DIGITAL PRODUCT: THE COMPLETE THANKSGIVING COOKBOOK */}
        <section id="thanksgiving-cookbook" className="mb-16 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl border-2 border-orange-500/40 bg-gradient-to-b from-[#1c1511]/95 via-[#14121a]/95 to-[#0e101a]/95 backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_-15px_rgba(249,115,22,0.25)]"
          >
            {/* Ambient warm festive glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Pill Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-telemetry text-xs relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/40 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>HOLIDAY DIGITAL PRODUCT</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                  100% FREE E-BOOK
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-[var(--text-muted)] border border-white/10 hidden sm:inline">
                  PRINTABLE FULL-COLOR PDF (76 MB)
                </span>
              </div>

              <span className="text-[var(--text-muted)] font-mono text-[11px]">
                /The_Complete_Thanksgiving_Cookbook.pdf
              </span>
            </div>

            {/* Two-Column Grid: Visual Cover Mockup vs Detailed Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 relative z-10">
              {/* Cover Image Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm w-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-2xl bg-black">
                    <img
                      src="/thanksgiving-cookbook-cover.jpg"
                      alt="The Complete Thanksgiving Cookbook Hardcover Mockup"
                      className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex items-center justify-between text-xs font-telemetry">
                      <span className="text-amber-200 font-medium">The Complete Edition</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
                        Instant Download
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-telemetry text-orange-400 font-semibold">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>CURATED BY HARI&apos;S KITCHEN STUDIO</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                  The Complete Thanksgiving Cookbook
                </h2>

                <p className="font-sans-modern text-base text-[var(--text-sub)] leading-relaxed">
                  Your ultimate holiday culinary master guide! From golden herb-basted roast turkey, luscious pan gravies, and artisan stuffing to spiced pumpkin pies, cranberry compotes, and festive mocktails — meticulously crafted with foolproof instructions, ingredient guides, and beautiful plating inspiration.
                </p>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>Roast Turkey Mastery</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Pies &amp; Desserts</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Layers className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Savory Stuffings &amp; Gravy</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>76 MB Complete PDF</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Tablet &amp; Print Ready</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-telemetry">
                    <Award className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>100% Free Lifetime</span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="/The_Complete_Thanksgiving_Cookbook.pdf"
                    download="The_Complete_Thanksgiving_Cookbook.pdf"
                    onClick={() => labAudio.playChime()}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-stone-950 font-telemetry font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.4)] transition hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Free Cookbook (PDF)</span>
                  </a>

                  <a
                    href="/The_Complete_Thanksgiving_Cookbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl glass-panel text-xs font-telemetry text-orange-300 hover:bg-orange-500/10 border border-orange-500/30 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Browser</span>
                  </a>

                  <Link
                    href="/cooking"
                    className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl glass-panel text-xs font-telemetry text-[var(--text-sub)] hover:text-white hover:border-white/30 transition"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Visit Cooking Journal</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Pinterest Share Instructions Ribbon */}
            <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-telemetry text-[var(--text-sub)]">
              <div className="flex items-center gap-2 text-orange-200">
                <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  <strong>Pinterest Direct Auto-Download:</strong> Share{" "}
                  <code className="bg-black/60 px-2 py-0.5 rounded text-amber-300 font-mono text-[11px] border border-orange-500/30">
                    /digital-products?download=thanksgiving
                  </code>{" "}
                  on your Pinterest pins for immediate one-click downloading!
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* OTHER DIGITAL PRODUCTS IN SUITE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h3 className="font-display text-2xl text-[var(--text-main)]">
                More Studio Instruments
              </h3>
              <p className="font-sans-modern text-xs text-[var(--text-muted)]">
                Developer tools, extensions, and interactive utilities
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VS Code Extensions */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-telemetry bg-white/5 border border-white/10 text-[var(--text-muted)]">
                    Marketplace Publisher
                  </span>
                </div>

                <h4 className="font-display text-2xl text-[var(--text-main)] mb-2">
                  VS Code Extensions & Themes
                </h4>
                <p className="font-sans-modern text-sm text-[var(--text-sub)] leading-relaxed mb-6">
                  Acquire bespoke code-editor themes, productivity instruments, and workflow optimizations crafted specifically for the modern digital scribe.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-telemetry text-[var(--text-muted)]">
                  studiolabs publisher
                </span>
                <a
                  href="https://marketplace.visualstudio.com/publishers/studiolabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 font-telemetry text-xs hover:bg-blue-500/30 transition"
                >
                  <span>Open Marketplace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Laboratory Tools & Utilities Hub */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-telemetry bg-white/5 border border-white/10 text-[var(--text-muted)]">
                    External Hub
                  </span>
                </div>

                <h4 className="font-display text-2xl text-[var(--text-main)] mb-2">
                  Laboratory Tools & Instruments
                </h4>
                <p className="font-sans-modern text-sm text-[var(--text-sub)] leading-relaxed mb-6">
                  A dedicated repository for utility toolsets: the Space Journey Study Timer with NASA telemetry HUD, Corporate Jargon Decoder, and Desktop Minion Pet.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-telemetry text-[var(--text-muted)]">
                  studiobasicslab-oss/Tools
                </span>
                <a
                  href="https://studiobasicslab-oss.github.io/Tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-telemetry text-xs hover:bg-cyan-500/30 transition"
                >
                  <span>Explore Tools</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--border)] font-telemetry text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Hari&apos;s Lab • Studio Basics Digital Products</p>
          <Link
            href="/"
            className="text-[var(--accent)] hover:underline"
          >
            ← Return to Main Portal
          </Link>
        </footer>
      </main>
    </div>
  );
}
