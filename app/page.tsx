"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Google Fonts: Cormorant Garamond for titles & Lora for body copy.
// Hardcoded Obsidian Mint color scheme directly into CSS Custom Properties.
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght=0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght=0,400;0,500;1,400&display=swap');

  :root {
    --bg-color: #0c0d0e;
    --bg-grad: radial-gradient(circle at 50% -5%, #101e1a 0%, #0c0e10 55%, #060708 100%);
    --text-main: #f0ebdf;
    --text-sub: #a0aba1;
    --accent: #59d9a8;
    --border: #1c2923;
    --muted-accent: #4f7869;
    --card-bg: #0e1112;
    --card-hover-bg: #131a18;
    --selection-bg: #59d9a8;
    --selection-text: #0c0d0e;
  }

  .font-heading { 
    font-family: 'Cormorant Garamond', serif; 
  }
  .font-body { 
    font-family: 'Lora', serif; 
  }
  
  body {
    background-color: var(--bg-color);
    color: var(--text-main);
  }
  
  ::selection {
    background-color: var(--selection-bg);
    color: var(--selection-text);
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1], 
      staggerChildren: 0.15 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    transition: { 
      duration: 0.4, 
      ease: [0.7, 0, 0.84, 0] 
    } 
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

// --- PAGE VIEWS ---

const ArchiveView = () => (
  <motion.div 
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-8"
  >
    <motion.div variants={itemVariants} className="border-b border-[var(--border)] pb-4 flex items-baseline justify-between transition-colors duration-1000">
      <span className="font-heading text-lg md:text-xl text-[var(--accent)] tracking-widest uppercase font-medium">Volume I</span>
      <span className="font-body italic text-[var(--muted-accent)] text-sm">Established 2026</span>
    </motion.div>
    
    <motion.p variants={itemVariants} className="font-body text-[var(--text-sub)] text-lg italic leading-relaxed max-w-2xl">
      YouTube channel, knowledge bases and digital products.
    </motion.p>

    {/* Elegant Broadsheet Link to YouTube Channel */}
    <motion.div variants={itemVariants} className="pt-6 max-w-2xl">
      <a 
        href="https://www.youtube.com/@AMinuteofKnowledge-c6k" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        {/* Corner bracket accents visible on hover */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-xs md:text-sm tracking-widest text-[var(--accent)] uppercase">Broadsheet Catalog</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Video Records</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          A Minute of Knowledge
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          Access the central archival channel of short-form educational records. Handcrafted briefings on flag histories, world maps, conversational economics, and foundational facts for the well-read mind.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Inspect Broadcasts</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    <motion.div variants={itemVariants} className="pt-8 border-t border-dashed border-[var(--border)]/40">
      <p className="font-body text-[var(--muted-accent)] text-sm tracking-wider uppercase italic">Cataloguing in progress</p>
    </motion.div>
  </motion.div>
);

const ExperimentsView = () => (
  <motion.div 
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-8"
  >
    <motion.div variants={itemVariants} className="border-b border-[var(--border)] pb-4 flex items-baseline justify-between transition-colors duration-1000">
      <span className="font-heading text-lg md:text-xl text-[var(--accent)] tracking-widest uppercase font-medium">Volume II</span>
      <span className="font-body italic text-[var(--muted-accent)] text-sm">Active Apparatus</span>
    </motion.div>
    
    <motion.p variants={itemVariants} className="font-body text-[var(--text-sub)] text-lg italic leading-relaxed max-w-2xl">
      Games, VS Code extensions and other projects.
    </motion.p>

    {/* List Stack of Cabinet Portals */}
    <motion.div variants={itemVariants} className="space-y-6 max-w-2xl pt-4">
      {/* Elegant Ledger Link to Games Cabinet */}
      <a 
        href="https://studiobasicslab-oss.github.io/Games/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-xs md:text-sm tracking-widest text-[var(--accent)] uppercase">Cabinet Directory</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Active Link</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          The Games Portfolio
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          Step into our integrated digital games parlor. Features quick-play reflex games, historical decision matrix runs, and logic tests.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Enter Games Lobby</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>

      {/* Elegant Ledger Link to VS Code Publisher Page */}
      <a 
        href="https://marketplace.visualstudio.com/publishers/studiolabs" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-xs md:text-sm tracking-widest text-[var(--accent)] uppercase">Scriptorium Tools</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Publisher Ledger</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          VS Code Extensions
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          Acquire custom developer instruments and aesthetic modifications built to optimize the focus and utility of the modern digital scribe.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Inspect Marketplace</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>

      {/* Elegant Active Link to Tools Cabinet */}
      <a 
        href="https://studiobasicslab-oss.github.io/Tools/"
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-xs md:text-sm tracking-widest text-[var(--accent)] uppercase">Laboratory Instruments</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Auxiliary Registry</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          Tools
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          A dedicated repository for utility toolsets, visual layout components, and mini automation formulas designed to be both highly practical and fun.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Explore Tools Directory</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    <motion.div variants={itemVariants} className="pt-8 border-t border-dashed border-[var(--border)]/40">
      <p className="font-body text-[var(--muted-accent)] text-sm tracking-wider uppercase italic">Apparatus being assembled</p>
    </motion.div>
  </motion.div>
);

const CuriositiesView = () => (
  <motion.div 
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-8"
  >
    <motion.div variants={itemVariants} className="border-b border-[var(--border)] pb-4 flex items-baseline justify-between transition-colors duration-1000">
      <span className="font-heading text-lg md:text-xl text-[var(--accent)] tracking-widest uppercase font-medium">Volume III</span>
      <span className="font-body italic text-[var(--muted-accent)] text-sm">Cabinet of Specimens</span>
    </motion.div>
    <motion.p variants={itemVariants} className="font-body text-[var(--text-sub)] text-lg italic leading-relaxed max-w-2xl">
      Books, drawings, piano and other hobbies.
    </motion.p>

    {/* Culinary Logbook Card */}
    <motion.div variants={itemVariants} className="pt-6 max-w-2xl">
      <a 
        href="/cooking" 
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[var(--accent)] uppercase">Culinary Logbook</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Internal Sub-site</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          The Kitchen Laboratory
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          A logbook of culinary experiments. Documenting materials, procedures, and yields of various recipes tested in the studio kitchen.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Inspect Logbook</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    {/* Goodreads Registry Portfolio Card */}
    <motion.div variants={itemVariants} className="pt-6 max-w-2xl">
      <a 
        href="https://www.goodreads.com/user/show/158121238-hari" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[var(--accent)] uppercase">Reading Registry</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Goodreads Folio</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          The Curator&apos;s Bookshelf
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          A shared shelf for curious minds. Let&apos;s read together, trade notes, and discover stories that stay with us.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Inspect Goodreads Profile</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    {/* Pinterest Drawings Board Card */}
    <motion.div variants={itemVariants} className="pt-6 max-w-2xl">
      <a 
        href="https://in.pinterest.com/studiobasicslab/hobbies/digital-drawings/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[var(--accent)] uppercase">Digital Drawings</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Pinterest Board</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          The Drawing Board
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          A curated collection of digital illustrations and visual experiments — sketches, concepts, and finished pieces from the studio.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Browse the Board</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    {/* Instagram Card */}
    <motion.div variants={itemVariants} className="pt-6 max-w-2xl">
      <a 
        href="https://www.instagram.com/studiobasics.lab/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[var(--border)] bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] transition-all duration-500 hover:border-[var(--accent)]/60"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[var(--accent)] uppercase">Visual Dispatch</span>
          <span className="font-body text-xs text-[var(--muted-accent)] italic">Instagram</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 mb-3">
          @studiobasics.lab
        </h3>

        <p className="font-body text-[var(--text-sub)] opacity-85 text-base leading-relaxed mb-6">
          Dispatches from the studio — works in progress, behind-the-scenes glimpses, and the occasional curiosity worth sharing.
        </p>

        <div className="flex items-center text-[var(--muted-accent)] group-hover:text-[var(--accent)] font-body text-base italic transition-colors duration-500">
          <span>Follow the Studio</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </motion.div>

    <motion.div variants={itemVariants} className="pt-8 border-t border-dashed border-[var(--border)]/40">
      <p className="font-body text-[var(--muted-accent)] text-sm tracking-wider uppercase italic">Specimens being collected</p>
    </motion.div>
  </motion.div>
);

const ObservatoryView = () => (
  <motion.div 
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-8"
  >
    <motion.div variants={itemVariants} className="border-b border-[var(--border)] pb-4 flex items-baseline justify-between transition-colors duration-1000">
      <span className="font-heading text-lg md:text-xl text-[var(--accent)] tracking-widest uppercase font-medium">Volume IV</span>
      <span className="font-body italic text-[var(--muted-accent)] text-sm">Celestial Musings</span>
    </motion.div>
    <motion.p variants={itemVariants} className="font-body text-[var(--text-sub)] text-lg italic leading-relaxed max-w-2xl">
      Questions, paradoxes and ideas that linger.
    </motion.p>
    <motion.div variants={itemVariants} className="pt-8 border-t border-dashed border-[var(--border)]/40">
      <p className="font-body text-[var(--muted-accent)] text-sm tracking-wider uppercase italic">Scanning the horizon</p>
    </motion.div>
  </motion.div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [activeTab, setActiveTab] = useState('archive');

  const navItems = [
    { id: 'archive', label: 'Archive' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'curiosities', label: 'Curiosities' },
    { id: 'observatory', label: 'Observatory' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-all duration-1000"
         style={{
           backgroundColor: 'var(--bg-color)',
           backgroundImage: 'var(--bg-grad)'
         }}>
      
      <style>{globalStyles}</style>
      
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* HEADER */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            
            {/* Centered Grand Title */}
            <h1 className="font-heading text-7xl md:text-8xl lg:text-[6.5rem] text-[var(--text-main)] tracking-wide font-medium leading-none select-none">
              Hari&apos;s Lab
            </h1>
            
            {/* Centered Elegant Vintage Separator Line & Star */}
            <div className="flex items-center gap-4 my-10 justify-center">
              <div className="w-24 h-[1px] bg-[var(--border)]"></div>
              <motion.svg 
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-4 h-4 text-[var(--accent)] fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
              </motion.svg>
              <div className="w-24 h-[1px] bg-[var(--border)]"></div>
            </div>

            {/* Subtitle - Decreased Sizing, Centered, and Elegant tracking */}
            <p className="font-body text-[var(--text-sub)] text-xs md:text-sm max-w-xl leading-relaxed tracking-wider font-normal">
              A growing collection of books, experiments, sketches, observations and things worth preserving.
            </p>
          </motion.div>

          {/* NAVIGATION */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border-t border-b border-[var(--border)] py-4 mt-16"
          >
            <ul className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`font-heading text-xl md:text-2xl tracking-wide transition-colors duration-300 relative px-6 md:px-8 py-2 block ${
                      activeTab === item.id 
                        ? 'text-[var(--accent)]' 
                        : 'text-[var(--muted-accent)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {item.label}
                    {/* Active Indicator Line aligns with bottom padding cleanly */}
                    {activeTab === item.id && (
                      <motion.span 
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-[var(--accent)]"
                      ></motion.span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </header>

        {/* MAIN CONTENT AREA WITH ACCENT LEFT LINE */}
        <main className="min-h-[40vh] relative pl-8 md:pl-12 ml-1">
          {/* Vertical accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--border)]">
            {/* Subtle vintage diamond anchors */}
            <div className="absolute top-0 -left-[2px] w-[5px] h-[5px] bg-[var(--accent)]/60 rotate-45"></div>
            <div className="absolute bottom-0 -left-[2px] w-[5px] h-[5px] bg-[var(--accent)]/60 rotate-45"></div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'archive' && <ArchiveView key="archive" />}
            {activeTab === 'experiments' && <ExperimentsView key="experiments" />}
            {activeTab === 'curiosities' && <CuriositiesView key="curiosities" />}
            {activeTab === 'observatory' && <ObservatoryView key="observatory" />}
          </AnimatePresence>
        </main>

        {/* FOOTER WITH CORRESPONDENCE DIRECTORY */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-28 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center text-[var(--muted-accent)] font-body text-sm gap-4 text-center sm:text-left"
        >
          <div>
            <p>© {new Date().getFullYear()} Hari&apos;s Lab</p>
          </div>
          
          {/* Correspondence Block */}
          <div className="hover:text-[var(--accent)] transition-colors duration-300">
            <a href="mailto:studiobasics.lab@gmail.com" className="flex items-center gap-2 group italic">
              <span className="text-[var(--muted-accent)] opacity-85 transition-colors">Letters:</span>
              <span className="underline decoration-[var(--border)] group-hover:decoration-[var(--accent)] transition-colors">studiobasics.lab@gmail.com</span>
            </a>
          </div>

          <div>
            <p className="italic">Preserved diligently.</p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}