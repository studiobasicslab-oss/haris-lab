"use client";

import React, { useState } from 'react';

// Google Fonts: Cormorant Garamond for titles & Lora for body copy.
// Custom gradient and variables are injected to match the warm library manuscript vignette.
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght=0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght=0,400;0,500;1,400&display=swap');

  .font-heading { 
    font-family: 'Cormorant Garamond', serif; 
  }
  .font-body { 
    font-family: 'Lora', serif; 
  }
  
  body {
    background-color: #110d0a;
    color: #e8dec9;
  }
  
  ::selection {
    background-color: #c5a880;
    color: #110d0a;
  }
`;

// --- PAGE VIEWS ---

const ArchiveView = () => (
  <div className="space-y-8 animate-in fade-in duration-1000">
    <div className="border-b border-[#362a20]/60 pb-4 flex items-baseline justify-between">
      <h2 className="font-heading text-4xl text-[#ebdcb9] tracking-wide">The Archive</h2>
      <span className="font-body italic text-[#786149] text-sm">Vol. I</span>
    </div>
    <p className="font-body text-[#bfae95] text-lg italic leading-relaxed max-w-2xl">
      YouTube channel, knowledge bases and digital products.
    </p>

    {/* Elegant Broadsheet Link to YouTube Channel */}
    <div className="pt-6 max-w-2xl">
      <a 
        href="https://www.youtube.com/@AMinuteofKnowledge-c6k" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[#362a20] bg-[#16120f] hover:bg-[#1c1612] transition-all duration-500 hover:border-[#c5a880]/60"
      >
        {/* Brass corner bracket accents visible on hover */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[#c5a880] uppercase">Broadsheet Catalog</span>
          <span className="font-body text-xs text-[#786149] italic">Video Records</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[#e8dec9] group-hover:text-[#c5a880] transition-colors duration-500 mb-3">
          A Minute of Knowledge
        </h3>

        <p className="font-body text-[#a19077] text-base leading-relaxed mb-6">
          Access the central archival channel of short-form educational records. Handcrafted briefings on flag histories, world maps, conversational economics, and foundational facts for the well-read mind.
        </p>

        <div className="flex items-center text-[#8e785d] group-hover:text-[#c5a880] font-body text-base italic transition-colors duration-500">
          <span>Inspect Broadcasts</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </div>

    <div className="pt-8 border-t border-dashed border-[#362a20]/40">
      <p className="font-body text-[#786149] text-sm tracking-wider uppercase italic">Cataloguing in progress</p>
    </div>
  </div>
);

const ExperimentsView = () => (
  <div className="space-y-8 animate-in fade-in duration-1000">
    <div className="border-b border-[#362a20]/60 pb-4 flex items-baseline justify-between">
      <h2 className="font-heading text-4xl text-[#ebdcb9] tracking-wide">Experiments</h2>
      <span className="font-body italic text-[#786149] text-sm">Vol. II</span>
    </div>
    
    <p className="font-body text-[#bfae95] text-lg italic leading-relaxed max-w-2xl">
      Games, VS Code extensions and other projects.
    </p>

    {/* Elegant Ledger Link to Games Cabinet */}
    <div className="pt-6 max-w-2xl">
      <a 
        href="https://studiobasicslab-oss.github.io/Games/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block relative p-8 border border-[#362a20] bg-[#16120f] hover:bg-[#1c1612] transition-all duration-500 hover:border-[#c5a880]/60"
      >
        {/* Brass corner bracket accents visible on hover */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-heading text-sm tracking-widest text-[#c5a880] uppercase">Cabinet Directory</span>
          <span className="font-body text-xs text-[#786149] italic">Active Link</span>
        </div>

        <h3 className="font-heading text-2xl md:text-3xl text-[#e8dec9] group-hover:text-[#c5a880] transition-colors duration-500 mb-3">
          The Games Portfolio
        </h3>

        <p className="font-body text-[#a19077] text-base leading-relaxed mb-6">
          Step into our integrated digital games parlor. Features quick-play reflex games, historical decision matrix runs, and logic tests.
        </p>

        <div className="flex items-center text-[#8e785d] group-hover:text-[#c5a880] font-body text-base italic transition-colors duration-500">
          <span>Enter Games Lobby</span>
          <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 font-sans text-lg">⟶</span>
        </div>
      </a>
    </div>

    <div className="pt-8 border-t border-dashed border-[#362a20]/40">
      <p className="font-body text-[#786149] text-sm tracking-wider uppercase italic">Apparatus being assembled</p>
    </div>
  </div>
);

const CuriositiesView = () => (
  <div className="space-y-8 animate-in fade-in duration-1000">
    <div className="border-b border-[#362a20]/60 pb-4 flex items-baseline justify-between">
      <h2 className="font-heading text-4xl text-[#ebdcb9] tracking-wide">Curiosities</h2>
      <span className="font-body italic text-[#786149] text-sm">Vol. III</span>
    </div>
    <p className="font-body text-[#bfae95] text-lg italic leading-relaxed max-w-2xl">
      Books, drawings, piano and other hobbies.
    </p>
    <div className="pt-8 border-t border-dashed border-[#362a20]/40">
      <p className="font-body text-[#786149] text-sm tracking-wider uppercase italic">Specimens being collected</p>
    </div>
  </div>
);

const ObservatoryView = () => (
  <div className="space-y-8 animate-in fade-in duration-1000">
    <div className="border-b border-[#362a20]/60 pb-4 flex items-baseline justify-between">
      <h2 className="font-heading text-4xl text-[#ebdcb9] tracking-wide">Observatory</h2>
      <span className="font-body italic text-[#786149] text-sm">Vol. IV</span>
    </div>
    <p className="font-body text-[#bfae95] text-lg italic leading-relaxed max-w-2xl">
      Questions, paradoxes and ideas that linger.
    </p>
    <div className="pt-8 border-t border-dashed border-[#362a20]/40">
      <p className="font-body text-[#786149] text-sm tracking-wider uppercase italic">Scanning the horizon</p>
    </div>
  </div>
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
    <div className="min-h-screen relative selection:bg-[#c5a880] selection:text-[#110d0a] overflow-x-hidden"
         style={{
           backgroundColor: '#110d0a',
           backgroundImage: 'radial-gradient(circle at 50% -5%, #2a1f17 0%, #15110e 55%, #0f0c0a 100%)'
         }}>
      <style>{globalStyles}</style>
      
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* HEADER */}
        <header className="mb-20">
          <div className="flex flex-col items-center text-center">
            
            {/* Centered Grand Title */}
            <h1 className="font-heading text-7xl md:text-8xl lg:text-[6.5rem] text-[#ebdcb9] tracking-wide font-medium leading-none drop-shadow-sm select-none">
              Hari's Lab
            </h1>
            
            {/* Centered Elegant Vintage Separator Line & Star */}
            <div className="flex items-center gap-4 my-10 opacity-80 justify-center">
              <div className="w-24 h-[1px] bg-[#4a3a2c]"></div>
              <svg className="w-4 h-4 text-[#c5a880] fill-current" viewBox="0 0 24 24">
                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
              </svg>
              <div className="w-24 h-[1px] bg-[#4a3a2c]"></div>
            </div>

            {/* Subtitle - Decreased Sizing, Centered, and Elegant tracking */}
            <p className="font-body text-[#b8ab94] text-xs md:text-sm max-w-xl leading-relaxed tracking-wider font-normal opacity-95">
              A growing collection of books, experiments, sketches, observations and things worth preserving.
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="border-t border-b border-[#362a20] py-4 mt-16">
            <ul className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`font-heading text-xl md:text-2xl tracking-wide transition-colors duration-300 relative px-6 md:px-8 py-2 block ${
                      activeTab === item.id 
                        ? 'text-[#c5a880]' 
                        : 'text-[#7d6c57] hover:text-[#e8dec9]'
                    }`}
                  >
                    {item.label}
                    {/* Active Indicator Line aligns with bottom padding cleanly */}
                    {activeTab === item.id && (
                      <span className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-[#c5a880]"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* MAIN CONTENT AREA WITH ACCENT LEFT LINE */}
        <main className="min-h-[40vh] relative pl-8 md:pl-12 ml-1">
          {/* Vertical accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#362a20]">
            {/* Subtle vintage diamond anchors */}
            <div className="absolute top-0 -left-[2px] w-[5px] h-[5px] bg-[#c5a880]/60 rotate-45"></div>
            <div className="absolute bottom-0 -left-[2px] w-[5px] h-[5px] bg-[#c5a880]/60 rotate-45"></div>
          </div>

          {activeTab === 'archive' && <ArchiveView />}
          {activeTab === 'experiments' && <ExperimentsView />}
          {activeTab === 'curiosities' && <CuriositiesView />}
          {activeTab === 'observatory' && <ObservatoryView />}
        </main>

        {/* FOOTER */}
        <footer className="mt-28 pt-8 border-t border-[#362a20] flex justify-between items-center text-[#786149] font-body text-sm">
          <p>© {new Date().getFullYear()} Hari's Lab</p>
          <p className="italic">Preserved diligently.</p>
        </footer>

      </div>
    </div>
  );
}