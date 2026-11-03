"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  Compass,
  Heart,
  Trees,
  Scroll,
  Search,
  Volume2,
  VolumeX,
  ArrowUpRight,
  RefreshCw,
  Feather,
  Flower2,
  ExternalLink,
  Flame,
  Music,
  ArrowLeft,
  Coffee,
  Leaf,
} from "lucide-react";
import AtmosphericCanvas from "../../components/AtmosphericCanvas";
import { LAB_PORTALS } from "../../data/labCatalogue";
import { labAudio } from "../../components/LabAudio";

type VintageTheme = "vintage-coquette" | "dark-forest" | "vintage-library";

interface AtmosphereConfig {
  id: VintageTheme;
  name: string;
  subtitle: string;
  tagline: string;
  accent: string;
  icon: any;
  quotePrompt: string;
  bgPattern: string;
  sealLabel: string;
}

const ATMOSPHERES: Record<VintageTheme, AtmosphereConfig> = {
  "vintage-coquette": {
    id: "vintage-coquette",
    name: "Vintage Cute & Coquette Atelier",
    subtitle: "Hari's Tea Room & Pastel Sanctuary",
    tagline: "A romantic haven of sweet arcade creations, botanical journals, tea-stained curiosities, and aesthetic crafts.",
    accent: "#e07a97",
    icon: Flower2,
    quotePrompt: "Tea leaves, pressed rose petals, and handwritten letters from the studio attic.",
    bgPattern: "radial-gradient(#f4a8b9 1px, transparent 1px)",
    sealLabel: "PARIS • 1894",
  },
  "dark-forest": {
    id: "dark-forest",
    name: "Dark Forest & Moonlit Herbarium",
    subtitle: "The Enchanted Woodland Glade",
    tagline: "A mystical moonlit archive of whispering pine groves, glowing fireflies, botanical remedies, and ancient labyrinth games.",
    accent: "#5eead4",
    icon: Trees,
    quotePrompt: "Ancient moss covers the stone steps; the fireflies illuminate paths once forgotten.",
    bgPattern: "radial-gradient(#5eead4 0.8px, transparent 0.8px)",
    sealLabel: "HERBARIUM • GLADE",
  },
  "vintage-library": {
    id: "vintage-library",
    name: "Old Vintage Library & Athenaeum",
    subtitle: "The Antiquarian Scriptorium",
    tagline: "A candlelit sanctum of leather-bound folios, mahogany bookshelves, astronomical scrolls, and timeless knowledge.",
    accent: "#d4a373",
    icon: Scroll,
    quotePrompt: "In the quiet warmth between high book stacks, time slows and imagination breathes.",
    bgPattern: "radial-gradient(#d4a373 0.8px, transparent 0.8px)",
    sealLabel: "OXFORD • FOLIO",
  },
};

const VINTAGE_LORE = [
  {
    title: "The Scent of Old Paper & Earl Grey",
    themeRef: "vintage-coquette",
    author: "Studio Gazette, Vol. VII",
    text: "There is an unspoken magic in finding a dried wildflower pressed between the yellowed pages of a forgotten novel. A gentle reminder that beauty endures through quiet patience.",
    stamp: "🌸 Rosa Damascena",
  },
  {
    title: "Whispers of the Ancient Evergreen",
    themeRef: "dark-forest",
    author: "Woodland Herbarium Register",
    text: "Deep within the shadowed forest canopy, where moonlight filters through silver birch leaves, the nocturnal creatures build sanctuaries in harmony with ancient roots.",
    stamp: "🌲 Sylva Lumina",
  },
  {
    title: "The Midnight Archivist’s Log",
    themeRef: "vintage-library",
    author: "Athenaeum Custodian Note",
    text: "The flicker of a tallow candle casts golden geometric shadows across celestial globes. Each book on these towering shelves holds a universe waiting for curious eyes.",
    stamp: "📜 Bibliotheca Nocturna",
  },
  {
    title: "The Recipe of Afternoon Delight",
    themeRef: "vintage-coquette",
    author: "Culinary Scriptorium",
    text: "Warm cinnamon toast, hand-spun honey, and cold raspberry mocktails. In this atelier, every small creation is an invitation to pause and celebrate the present.",
    stamp: "🍯 Mel & Cinnamomum",
  },
  {
    title: "The Constellation in the Well",
    themeRef: "dark-forest",
    author: "Astrological Herbarium",
    text: "When the lake is undisturbed at 2 AM, the water mirrors the Milky Way with such crystalline clarity that one cannot tell if they are looking up or falling into infinity.",
    stamp: "✨ Stella Aquatica",
  },
];

export default function AtelierPage() {
  const [activeTheme, setActiveTheme] = useState<VintageTheme>("vintage-coquette");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loreIndex, setLoreIndex] = useState<number>(0);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [timeDisplay, setTimeDisplay] = useState<string>("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setTimeDisplay(now.toLocaleDateString(undefined, options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const config = ATMOSPHERES[activeTheme];

  const handleToggleAudio = () => {
    const state = labAudio.toggleAmbient();
    setIsAudioActive(state);
    if (state) {
      labAudio.playChime();
    }
  };

  const handleThemeChange = (newTheme: VintageTheme) => {
    setActiveTheme(newTheme);
    labAudio.playBlip(newTheme === "vintage-coquette" ? 680 : newTheme === "dark-forest" ? 540 : 440);
  };

  const nextLore = () => {
    labAudio.playBlip(600);
    setLoreIndex((prev) => (prev + 1) % VINTAGE_LORE.length);
  };

  const filteredPortals = useMemo(() => {
    return LAB_PORTALS.filter((portal) => {
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "products" && portal.category === "digital-products") ||
        (activeCategory === "games" && (portal.category === "games-tools" || portal.category === "digital-products") && portal.iconType === "game") ||
        (activeCategory === "tools" && (portal.category === "games-tools" || portal.category === "digital-products") && portal.iconType === "tool") ||
        (activeCategory === "curiosities" && portal.category === "curiosities") ||
        (activeCategory === "broadcasts" && portal.category === "broadcasts");

      const matchesSearch =
        searchQuery === "" ||
        portal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const currentLore = VINTAGE_LORE[loreIndex];

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] relative selection:bg-[var(--accent)] selection:text-[var(--bg-color)] transition-colors duration-700">
      {/* Dynamic Aesthetic Particle Canvas (Petals / Fireflies / Candlelight Embers) */}
      <AtmosphericCanvas theme={activeTheme} interactive={true} />

      {/* TOP ATELIER BAR */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-color)]/90 backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-8 py-3 transition-colors duration-500 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Back to Cosmic Lab Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full vintage-parchment text-xs font-serif-vintage hover:border-[var(--accent)] transition hover:scale-105 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Return to Cosmic Lab</span>
            </Link>

            <span className="text-[var(--border)] hidden sm:inline">✦</span>

            <div className="hidden md:flex items-center gap-1.5 text-xs font-serif-vintage italic text-[var(--text-sub)]">
              <span>{timeDisplay}</span>
            </div>
          </div>

          {/* Theme Preset Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full vintage-parchment border border-[var(--border)]">
            <button
              onClick={() => handleThemeChange("vintage-coquette")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif-vintage transition-all ${
                activeTheme === "vintage-coquette"
                  ? "bg-[#e07a97] text-white shadow-md font-semibold scale-105"
                  : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
              title="Vintage Cute Girly Theme"
            >
              <Flower2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Coquette Tea Room</span>
              <span className="sm:hidden">Cute</span>
            </button>

            <button
              onClick={() => handleThemeChange("dark-forest")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif-vintage transition-all ${
                activeTheme === "dark-forest"
                  ? "bg-[#5eead4] text-[#0d1612] shadow-md font-semibold scale-105"
                  : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
              title="Dark Forest & Herbarium Theme"
            >
              <Trees className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dark Forest</span>
              <span className="sm:hidden">Forest</span>
            </button>

            <button
              onClick={() => handleThemeChange("vintage-library")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif-vintage transition-all ${
                activeTheme === "vintage-library"
                  ? "bg-[#d4a373] text-[#1a1412] shadow-md font-semibold scale-105"
                  : "text-[var(--text-sub)] hover:text-[var(--text-main)]"
              }`}
              title="Old Vintage Library Theme"
            >
              <Scroll className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vintage Library</span>
              <span className="sm:hidden">Library</span>
            </button>
          </div>

          {/* Sound Ambience Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full vintage-parchment text-xs font-serif-vintage transition hover:scale-105 ${
                isAudioActive ? "border-[var(--accent)] text-[var(--accent)] font-semibold" : "text-[var(--text-sub)]"
              }`}
              title={isAudioActive ? "Mute Ambience" : "Play Ambient Atmosphere Tone"}
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
              <span className="hidden sm:inline">{isAudioActive ? "Chimes: On" : "Chimes: Off"}</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
        
        {/* Atmosphere Header Banner */}
        <header className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            key={activeTheme}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wax Seal / Stamp Ornament */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full vintage-stamp-edge bg-[var(--card-bg)] text-xs font-serif-vintage tracking-wider text-[var(--accent)] mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>{config.sealLabel} • ATELIER SANCTUARY</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--text-main)] tracking-tight font-normal leading-[1.05] mb-4 select-none">
              {config.subtitle}
            </h1>

            {/* Vintage Decorative Flourish */}
            <div className="flex items-center justify-center gap-4 my-5 text-[var(--accent)]">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
              <config.icon className="w-5 h-5 animate-pulse" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            </div>

            {/* Subtitle / Tagline */}
            <p className="font-serif-vintage text-base sm:text-lg text-[var(--text-sub)] max-w-xl mx-auto leading-relaxed italic">
              {config.tagline}
            </p>
          </motion.div>
        </header>

        {/* INSCRIPTION SPECIMEN / CURATOR'S DESK */}
        <section className="mb-14 max-w-3xl mx-auto">
          <motion.div
            key={`lore-${activeTheme}-${loreIndex}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="vintage-parchment rounded-3xl p-6 sm:p-8 relative overflow-hidden group border border-[var(--border)] shadow-lg"
          >
            {/* Stamp in Top Right */}
            <div className="absolute top-4 right-4 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-dashed border-[var(--border)] text-[11px] font-typewriter text-[var(--accent)] bg-[var(--bg-color)]/50 rotate-2">
              <Feather className="w-3 h-3" />
              <span>{currentLore.stamp}</span>
            </div>

            <div className="text-xs font-typewriter text-[var(--text-muted)] tracking-wider uppercase mb-2">
              Curator&apos;s Inscription • Specimen #{loreIndex + 1}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-[var(--text-main)] mb-3">
              {currentLore.title}
            </h3>

            <p className="font-serif-vintage text-base sm:text-lg text-[var(--text-sub)] leading-relaxed italic mb-5">
              &ldquo;{currentLore.text}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs font-serif-vintage">
              <span className="text-[var(--text-muted)] italic">
                — {currentLore.author}
              </span>

              <button
                onClick={nextLore}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--bg-color)] font-semibold hover:opacity-90 transition hover:scale-105 active:scale-95 shadow-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next Leaf</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* CATEGORY FILTER RIBBON & SEARCH */}
        <section className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl vintage-parchment border border-[var(--border)] max-w-3xl mx-auto mb-6">
            {[
              { id: "all", label: "All Works & Portals", icon: BookOpen },
              { id: "products", label: "Digital Products", icon: Sparkles },
              { id: "games", label: "Games & Parlor", icon: Compass },
              { id: "tools", label: "Instruments & Tools", icon: Coffee },
              { id: "curiosities", label: "Diaries & Kitchen", icon: Heart },
              { id: "broadcasts", label: "Video Lore", icon: Scroll },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    labAudio.playBlip(560);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-serif-vintage tracking-wide transition-all ${
                    isActive
                      ? "bg-[var(--accent)] text-[var(--bg-color)] font-semibold shadow-sm scale-105"
                      : "text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--card-hover-bg)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scrolls, recipes, games, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl vintage-parchment text-xs font-serif-vintage text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                ✕
              </button>
            )}
          </div>
        </section>

        {/* PORTAL EXHIBITS GRID */}
        <section className="mb-20">
          {filteredPortals.length === 0 ? (
            <div className="text-center py-16 vintage-parchment rounded-3xl max-w-md mx-auto">
              <p className="font-display text-xl text-[var(--text-main)] mb-2">
                No folio matched &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--bg-color)] text-xs font-serif-vintage font-semibold"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortals.map((portal) => (
                <div
                  key={portal.id}
                  className="vintage-parchment rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group border border-[var(--border)] relative overflow-hidden"
                >
                  {/* Decorative corner flourish */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--accent)]/15 to-transparent rounded-bl-3xl pointer-events-none" />

                  <div>
                    {/* Badge & Category */}
                    <div className="flex items-center justify-between mb-4 text-xs font-typewriter">
                      <span className="px-2.5 py-1 rounded-md bg-[var(--bg-color)] border border-[var(--border)] text-[var(--accent)] font-medium">
                        {portal.badge}
                      </span>
                      <span className="text-[var(--text-muted)] text-[11px]">
                        {portal.destinationType}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl text-[var(--text-main)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {portal.title}
                    </h3>

                    {/* Description */}
                    <p className="font-serif-vintage text-sm text-[var(--text-sub)] leading-relaxed mb-6">
                      {portal.description}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[140px]">
                      {portal.meta}
                    </span>

                    {portal.isInternal ? (
                      <Link
                        href={portal.href}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--bg-color)] font-serif-vintage font-semibold text-xs transition hover:opacity-90 hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <span>{portal.actionText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={portal.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--bg-color)] font-serif-vintage font-semibold text-xs transition hover:opacity-90 hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <span>{portal.actionText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-[var(--border)] font-serif-vintage text-sm text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-[var(--text-main)] font-semibold tracking-wide">
              Hari&apos;s Lab • Studio Basics Atelier
            </p>
            <p className="text-xs">Curated with love, parchment, and curiosity.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[var(--accent)] hover:underline text-xs font-semibold"
            >
              Switch to Cosmic Lab &rarr;
            </Link>
            <span className="text-[var(--border)]">|</span>
            <a
              href="mailto:studiobasics.lab@gmail.com"
              className="text-[var(--text-sub)] hover:text-[var(--accent)] text-xs italic"
            >
              studiobasics.lab@gmail.com
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
