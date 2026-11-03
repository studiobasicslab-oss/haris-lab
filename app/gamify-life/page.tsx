import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GamifyApp from "@/components/gamify-life/GamifyApp";

export const metadata: Metadata = {
  title: "Gamify Your Life | Turn Your Habits Into An RPG | Hari's Lab",
  description:
    "An authentic 8-bit retro RPG productivity and habit-tracking system on Hari's Lab. Choose your hero, level up 7 core stats, embark on daily quests, redeem custom rewards, and maintain cozy campfire streaks.",
  manifest: "/gamify-manifest.json",
  icons: {
    icon: "/gamify-icon.svg",
    apple: "/gamify-icon.svg",
  },
};

export default function GamifyLifePage() {
  return (
    <div className="min-h-screen bg-[#fcf6ea] text-[#2d2740] selection:bg-[#fbbf24] selection:text-[#2d2740]">
      {/* Hari's Lab Navigation Anchor Ribbon */}
      <nav className="w-full bg-[#2d2740] text-[#fcf6ea] px-3 sm:px-6 py-2 border-b-2 border-[#1c172b] flex items-center justify-between text-xs font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3f3759] hover:bg-[#524775] text-[#fcf6ea] transition border border-[#524775] active:scale-95 text-[11px] sm:text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Hari&apos;s Lab</span>
          </Link>

          <span className="text-[#6c5f94] hidden sm:inline">•</span>

          <span className="text-[#a599cc] text-[10px] sm:text-[11px] hidden sm:inline uppercase">
            DIGITAL PRODUCTS / GAMIFY YOUR LIFE
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
          <Link
            href="/gamify-life/help"
            className="text-[#fbbf24] hover:underline flex items-center gap-1"
          >
            <span>Help &amp; Sync Guide</span>
          </Link>
          <span className="text-[#6c5f94]">|</span>
          <Link
            href="/digital-products"
            className="text-[#a599cc] hover:text-white"
          >
            Products Hub &rarr;
          </Link>
        </div>
      </nav>

      {/* Gamify Your Life RPG App Interface */}
      <main>
        <GamifyApp />
      </main>
    </div>
  );
}
