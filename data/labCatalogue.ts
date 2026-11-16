export interface LabPortal {
  id: string;
  title: string;
  category: "digital-products" | "games-tools" | "curiosities" | "broadcasts" | "observatory";
  categoryLabel: string;
  badge: string;
  destinationType: "External Hub" | "YouTube Channel" | "Pinterest Board" | "Instagram Profile" | "Goodreads Folio" | "Internal Webapp" | "Marketplace Publisher" | "Free Digital E-Book";
  description: string;
  actionText: string;
  href: string;
  isInternal?: boolean;
  accentColor: string;
  iconType: "game" | "tool" | "youtube" | "pinterest" | "instagram" | "goodreads" | "cooking" | "terminal" | "observatory";
  meta: string;
}

export const LAB_PORTALS: LabPortal[] = [
  // --- 0. GAMIFY YOUR LIFE (DIGITAL PRODUCT - INTERNAL VERCEL APP) ---
  {
    id: "gamify-life",
    title: "Gamify Your Life",
    category: "digital-products",
    categoryLabel: "Digital Products",
    badge: "Interactive RPG PWA",
    destinationType: "Internal Webapp",
    description: "Turn your daily life into a retro 8-bit RPG adventure. Level up 7 core stats (Knowledge, Health, Focus, Creativity, Social, Discipline, Kindness), complete daily missions, redeem earned rewards, and keep cozy campfire streaks.",
    actionText: "Play Gamify Life",
    href: "/gamify-life",
    isInternal: true,
    accentColor: "#fbbf24",
    iconType: "game",
    meta: "Vercel Native • Offline PWA Save",
  },

  // --- 0.1 THE COMPLETE THANKSGIVING COOKBOOK (DIGITAL PRODUCT - E-BOOK) ---
  {
    id: "thanksgiving-cookbook",
    title: "The Complete Thanksgiving Cookbook",
    category: "digital-products",
    categoryLabel: "Holiday Digital Product",
    badge: "Free 76 MB PDF E-Book",
    destinationType: "Internal Webapp",
    description: "Your ultimate holiday culinary master guide. Features roast turkey mastery, savory stuffing, herb pan gravies, spiced pumpkin pies, festive sides, and holiday mocktails in a high-resolution printable PDF.",
    actionText: "Explore Cookbook",
    href: "/digital-products#thanksgiving-cookbook",
    isInternal: true,
    accentColor: "#f97316",
    iconType: "cooking",
    meta: "Vercel Native • Free PDF",
  },

  // --- 1. THE GAMES PORTFOLIO ---
  {
    id: "games-portal",
    title: "The Arcade Portfolio",
    category: "games-tools",
    categoryLabel: "Games & Entertainment",
    badge: "16+ Playable Games",
    destinationType: "External Hub",
    description: "Our complete interactive game parlor. Features Celestial Cartographer, Stickman Runner, Sequence Conductor, Only One Rule, Perfect Shape, and puzzle challenges.",
    actionText: "Enter Games Arcade",
    href: "https://studiobasicslab-oss.github.io/Games/",
    isInternal: false,
    accentColor: "#6366f1",
    iconType: "game",
    meta: "studiobasicslab-oss.github.io/Games",
  },

  // --- 2. LABORATORY TOOLS & UTILITIES ---
  {
    id: "tools-portal",
    title: "Laboratory Instruments & Tools",
    category: "games-tools",
    categoryLabel: "Productivity & Utilities",
    badge: "Active Toolsets",
    destinationType: "External Hub",
    description: "A dedicated repository for utility toolsets: the Space Journey Study Timer with NASA telemetry HUD, Corporate Jargon Decoder, Desktop Minion Pet, and automation formulas.",
    actionText: "Explore Tools Directory",
    href: "https://studiobasicslab-oss.github.io/Tools/",
    isInternal: false,
    accentColor: "#06b6d4",
    iconType: "tool",
    meta: "studiobasicslab-oss.github.io/Tools",
  },

  // --- 3. A MINUTE OF KNOWLEDGE (YOUTUBE) ---
  {
    id: "youtube-channel",
    title: "A Minute of Knowledge",
    category: "broadcasts",
    categoryLabel: "Broadsheet Broadcasts",
    badge: "YouTube Channel",
    destinationType: "YouTube Channel",
    description: "Central archival channel of short-form educational records. Handcrafted briefings on flag histories, world maps, conversational economics, and global curiosities.",
    actionText: "Inspect YouTube Channel",
    href: "https://www.youtube.com/@AMinuteofKnowledge-c6k",
    isInternal: false,
    accentColor: "#ef4444",
    iconType: "youtube",
    meta: "youtube.com/@AMinuteofKnowledge-c6k",
  },

  // --- 4. DIGITAL DRAWINGS (PINTEREST) ---
  {
    id: "pinterest-drawings",
    title: "The Drawing Board",
    category: "curiosities",
    categoryLabel: "Visual Arts & Sketches",
    badge: "Pinterest Board",
    destinationType: "Pinterest Board",
    description: "Curated collection of digital illustrations, aesthetic vector art, character concepts, and visual experiments straight from the studio drawing tablet.",
    actionText: "Browse Pinterest Board",
    href: "https://in.pinterest.com/studiobasicslab/hobbies/digital-drawings/",
    isInternal: false,
    accentColor: "#ec4899",
    iconType: "pinterest",
    meta: "pinterest.com/studiobasicslab",
  },

  // --- 5. VISUAL DISPATCHES (INSTAGRAM) ---
  {
    id: "instagram-feed",
    title: "Visual Dispatches",
    category: "curiosities",
    categoryLabel: "Studio Life & Behind The Scenes",
    badge: "@studiobasics.lab",
    destinationType: "Instagram Profile",
    description: "Live dispatches from the studio — works in progress, laboratory glimpses, design explorations, and spontaneous curiosities shared directly from the atelier.",
    actionText: "Follow on Instagram",
    href: "https://www.instagram.com/studiobasics.lab/",
    isInternal: false,
    accentColor: "#f43f5e",
    iconType: "instagram",
    meta: "instagram.com/studiobasics.lab",
  },

  // --- 6. THE CURATOR'S BOOKSHELF (GOODREADS) ---
  {
    id: "goodreads-shelf",
    title: "The Curator's Bookshelf",
    category: "curiosities",
    categoryLabel: "Literature & Marginalia",
    badge: "Goodreads Registry",
    destinationType: "Goodreads Folio",
    description: "A shared shelf for curious bibliophiles. Explore reading lists, trade notes, and discover stories spanning science fiction, design philosophy, and cognitive science.",
    actionText: "Inspect Goodreads Folio",
    href: "https://www.goodreads.com/user/show/158121238-hari",
    isInternal: false,
    accentColor: "#f59e0b",
    iconType: "goodreads",
    meta: "goodreads.com/hari",
  },

  // --- 7. THE KITCHEN LABORATORY (CULINARY LOGBOOK) ---
  {
    id: "kitchen-lab",
    title: "The Kitchen Laboratory",
    category: "curiosities",
    categoryLabel: "Culinary Alchemy",
    badge: "Interactive Sub-site",
    destinationType: "Internal Webapp",
    description: "A logbook of culinary experiments documenting sourdough hydration curves, spice extraction matrices, recipes, and yields tested in the studio kitchen.",
    actionText: "Inspect Culinary Logbook",
    href: "/cooking",
    isInternal: true,
    accentColor: "#10b981",
    iconType: "cooking",
    meta: "Internal Recipe Ledger",
  },

  // --- 8. VS CODE EXTENSIONS PUBLISHER ---
  {
    id: "vscode-publisher",
    title: "VS Code Extensions",
    category: "digital-products",
    categoryLabel: "Digital Products & Utilities",
    badge: "Visual Studio Marketplace",
    destinationType: "Marketplace Publisher",
    description: "Acquire bespoke code-editor themes, productivity instruments, and workflow optimizations crafted specifically for the modern digital scribe.",
    actionText: "Inspect Marketplace",
    href: "https://marketplace.visualstudio.com/publishers/studiolabs",
    isInternal: false,
    accentColor: "#3b82f6",
    iconType: "tool",
    meta: "marketplace.visualstudio.com",
  },
];

export const THOUGHT_EXPERIMENTS = [
  {
    title: "The Ship of Theseus & Digital Clones",
    category: "Identity & Consciousness",
    text: "If every line of code in an autonomous agent is continuously rewritten and refactored over generations, at what moment does it become a distinct cognitive entity?",
    quote: "Change is the only constant, yet memory preserves the ghost in the machine.",
  },
  {
    title: "The Fermi Paradox & Stellar Silence",
    category: "Astrophysics & Cosmism",
    text: "With hundreds of billions of star systems in our galaxy alone, where are all the celestial broadcasters? Are we the first, the last, or simply tuned to the wrong frequency?",
    quote: "Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.",
  },
  {
    title: "The Chrono-Tree & Parallel Branches",
    category: "Quantum Physics & Time",
    text: "Every micro-decision in interactive games forks the narrative universe. Does a simulation remember the branches that were never walked?",
    quote: "A path untraveled still holds the geometry of possibility.",
  },
  {
    title: "The Library of Babel in Silicon",
    category: "Information Theory",
    text: "A digital canvas of 1000x1000 pixels with 256 colors contains every painting that ever was or ever will be painted. The challenge is not creation, but cataloguing.",
    quote: "To know everything is equivalent to knowing nothing without a curator.",
  },
  {
    title: "The Gastronomy of Time",
    category: "Culinary Alchemy",
    text: "Why does slow fermentation and time transform simple wheat and water into aromatic bread? Cooking is human civilization's oldest form of controlled alchemical physics.",
    quote: "Patience is an ingredient measured in hours, not grams.",
  },
  {
    title: "The Vexillology of Imagined Worlds",
    category: "Cartography & Symbols",
    text: "A flag is merely dyed fabric, yet it commands billions of imaginations. What would the banner of a unified interplanetary civilization look like?",
    quote: "Symbols outlast the empires that hoisted them.",
  }
];
