import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Gamepad2,
  ShieldCheck,
  Smartphone,
  Monitor,
  Share2,
  Download,
  Camera,
} from "lucide-react";
import "@/components/gamify-life/gamify.css";

export const metadata: Metadata = {
  title: "Help & Data Sync Guide | Gamify Your Life | Hari's Lab",
  description:
    "Complete user guide for Gamify Your Life on Hari's Lab. Learn how offline local storage works (zero cloud/login required), how to install the mobile PWA app, and how to export/import save files across devices.",
};

export default function GamifyHelpPage() {
  return (
    <div className="min-h-screen bg-[#fcf6ea] text-[#2d2740] selection:bg-[#fbbf24] selection:text-[#2d2740] font-retro pb-20">
      {/* Top Header Navigation */}
      <nav className="w-full bg-[#2d2740] text-[#fcf6ea] px-3 sm:px-6 py-2.5 border-b-2 border-[#1c172b] flex items-center justify-between text-xs font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <Link
            href="/gamify-life"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#3f3759] hover:bg-[#524775] text-[#fcf6ea] transition border border-[#524775] active:scale-95 text-[11px] sm:text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Back to Game</span>
          </Link>

          <span className="text-[#6c5f94] hidden sm:inline">•</span>

          <span className="text-[#a599cc] text-[10px] sm:text-[11px] hidden sm:inline uppercase">
            GAMIFY YOUR LIFE / USER MANUAL & SYNC GUIDE
          </span>
        </div>

        <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
          <Link
            href="/"
            className="text-[#a599cc] hover:text-white transition"
          >
            Hari&apos;s Lab
          </Link>
          <span className="text-[#6c5f94]">|</span>
          <Link
            href="/digital-products"
            className="text-[#fbbf24] hover:underline"
          >
            Products Hub
          </Link>
        </div>
      </nav>

      {/* Main Guide Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Header Hero Banner */}
        <header className="text-center mb-10">
          <div className="inline-block mb-2">
            <span className="text-3xl">📖</span>
          </div>
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#2d2740] tracking-wider mb-2 drop-shadow-[2px_2px_0px_#8a7dc4]">
            USER MANUAL &amp; SYNC GUIDE
          </h1>
          <p className="font-retro text-xs sm:text-sm font-bold text-[#4c4270] max-w-lg mx-auto uppercase">
            Everything you need to know about offline play, mobile app installation, and moving your save data across devices.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-[#fdf6db] border-2 border-[#2d2740] shadow-pixel-sm text-xs font-bold text-[#b45309]">
            <ShieldCheck size={16} />
            <span>100% PRIVATE • ZERO CLOUD SYNC • ZERO LOGIN REQUIRED</span>
          </div>
        </header>

        {/* SECTION 1: THE PRIVACY GUARANTEE */}
        <section className="mb-10">
          <div className="bg-[#ffffff] border-4 border-[#2d2740] shadow-pixel-lg p-5 sm:p-7 relative">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
              <span className="text-2xl">🔒</span>
              <div>
                <h2 className="font-pixel text-sm sm:text-base text-[#2d2740] uppercase">
                  1. The No-Login / No-Cloud Guarantee
                </h2>
                <p className="text-[11px] text-[#4c4270] font-bold">
                  Your life data belongs to you — not a remote corporate server.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#2d2740]">
              <p>
                Unlike modern apps that force you to create accounts, remember passwords, and upload your habits to cloud databases, <strong>Gamify Your Life is completely offline-first and decentralized</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3 bg-[#eef0fb] border-2 border-[#2d2740] shadow-pixel-sm">
                  <div className="text-xl mb-1">🚫</div>
                  <h4 className="font-pixel text-[10px] text-[#4c4270] mb-1 uppercase">
                    No Accounts
                  </h4>
                  <p className="text-[11px] text-[#4c4270]">
                    No email, password, or phone number required. Just open the page and play.
                  </p>
                </div>

                <div className="p-3 bg-[#e9f7ea] border-2 border-[#2d2740] shadow-pixel-sm">
                  <div className="text-xl mb-1">💾</div>
                  <h4 className="font-pixel text-[10px] text-[#437c4e] mb-1 uppercase">
                    Stored Locally
                  </h4>
                  <p className="text-[11px] text-[#437c4e]">
                    Saved directly in your browser&apos;s local storage database on your phone or laptop.
                  </p>
                </div>

                <div className="p-3 bg-[#fdf0ed] border-2 border-[#2d2740] shadow-pixel-sm">
                  <div className="text-xl mb-1">✈️</div>
                  <h4 className="font-pixel text-[10px] text-[#9c5548] mb-1 uppercase">
                    Works Offline
                  </h4>
                  <p className="text-[11px] text-[#9c5548]">
                    Full functionality works on airplanes, in subways, or without an internet connection.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-[#6b7280]">
                * <strong>Important Note:</strong> Because data is stored in your current browser, if you clear your browser cookies/website cache, your progress could be erased. Read below on how to export your <strong>Save Cartridge</strong> for safe keeping!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW TO TRANSFER / SHARE DATA ACROSS DEVICES */}
        <section className="mb-10">
          <div className="bg-[#fefce8] border-4 border-[#2d2740] shadow-pixel-lg p-5 sm:p-7 relative">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
              <span className="text-2xl">📸</span>
              <div>
                <h2 className="font-pixel text-sm sm:text-base text-[#b45309] uppercase">
                  2. How to Share &amp; Sync Data Across Devices
                </h2>
                <p className="text-[11px] text-[#78350f] font-bold">
                  Zero Technical Knowledge Needed • 1-Tap Camera Scan or Direct Links
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#451a03] mb-5 leading-relaxed">
              We know downloading files and finding folders is frustrating on smartphones. That&apos;s why Gamify Life has <strong>3 ways</strong> to move your progress between your laptop, tablet, and phone without ever logging into an account:
            </p>

            {/* METHOD 1: QR CODE CAMERA SCAN (RECOMMENDED) */}
            <div className="p-4 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-5">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-dashed border-[#e2d5b0]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#fbbf24] border border-[#2d2740] flex items-center justify-center font-pixel text-xs text-[#2d2740]">
                    ★
                  </div>
                  <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
                    METHOD 1 (EASIEST): POINT PHONE CAMERA AT QR CODE
                  </h3>
                </div>
                <span className="text-[10px] font-pixel bg-[#16a34a] text-white px-2 py-0.5 border border-[#2d2740]">
                  NO FILES NEEDED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                <div className="p-2.5 bg-[#fcf6ea] border border-[#2d2740] text-xs">
                  <div className="font-pixel text-[11px] text-[#b45309] mb-1">
                    STEP 1: TAP QR SYNC
                  </div>
                  <p className="text-[#4c4270]">
                    On your computer or current device, tap the yellow <strong className="text-[#2d2740]">[QR SYNC]</strong> button in the top navigation bar.
                  </p>
                </div>

                <div className="p-2.5 bg-[#fcf6ea] border border-[#2d2740] text-xs">
                  <div className="font-pixel text-[11px] text-[#b45309] mb-1 flex items-center gap-1">
                    <Camera size={13} />
                    <span>STEP 2: POINT CAMERA</span>
                  </div>
                  <p className="text-[#4c4270]">
                    Open your smartphone&apos;s built-in Camera app (iPhone Camera or Android Lens) and point it at the QR code on your screen.
                  </p>
                </div>

                <div className="p-2.5 bg-[#fcf6ea] border border-[#2d2740] text-xs">
                  <div className="font-pixel text-[11px] text-[#b45309] mb-1">
                    STEP 3: TAP TO LOAD
                  </div>
                  <p className="text-[#4c4270]">
                    Tap the link notification on your phone. Hit <strong className="text-[#2d2740]">&quot;Accept &amp; Load Save Data&quot;</strong> and your hero is instantly ready!
                  </p>
                </div>
              </div>
            </div>

            {/* METHOD 2: DIRECT SYNC LINK */}
            <div className="p-4 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-5">
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-dashed border-[#e2d5b0]">
                <Share2 size={16} className="text-[#3b6f99]" />
                <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
                  METHOD 2: SEND DIRECT LINK TO YOURSELF
                </h3>
              </div>
              <p className="text-xs text-[#4c4270] mb-2 leading-relaxed">
                Tap <strong className="text-[#2d2740]">[QR SYNC]</strong> &rarr; switch to the <strong className="text-[#2d2740]">&quot;2. SEND LINK&quot;</strong> tab &rarr; tap <strong className="text-[#2d2740]">&quot;COPY SYNC LINK&quot;</strong> or <strong className="text-[#2d2740]">&quot;SHARE LINK&quot;</strong>.
              </p>
              <p className="text-xs text-[#4c4270] leading-relaxed">
                Send it to yourself on <strong>WhatsApp, Telegram, Apple Notes, or Email</strong>. Opening that link on any device will prompt you to load your progress with 1 tap.
              </p>
            </div>

            {/* METHOD 3: CLASSIC FILE BACKUP */}
            <div className="p-4 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-5">
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-dashed border-[#e2d5b0]">
                <Download size={16} className="text-[#78350f]" />
                <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
                  METHOD 3: PERMANENT .JSON SAVE CARTRIDGE BACKUP
                </h3>
              </div>
              <p className="text-xs text-[#4c4270] leading-relaxed">
                For long-term preservation, tap <strong className="text-[#2d2740]">[SAVE CARD]</strong> &rarr; <strong className="text-[#2d2740]">&quot;EXPORT SAVE CARTRIDGE (.JSON)&quot;</strong>. You can store this file in your personal archive, and restore it anytime using <strong className="text-[#2d2740]">&quot;RESTORE SAVE FILE&quot;</strong>.
              </p>
            </div>

            <div className="p-3 bg-[#ffffff] border-2 border-dashed border-[#b45309] text-xs text-[#78350f]">
              <span className="font-bold">🔒 Privacy Guarantee:</span> When using QR codes or links, your save data is compressed and securely embedded directly into the link itself. It never touches our servers or any cloud database.
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW TO INSTALL AS A MOBILE APP (PWA) */}
        <section className="mb-10">
          <div className="bg-[#eef0fb] border-4 border-[#2d2740] shadow-pixel-lg p-5 sm:p-7 relative">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
              <span className="text-2xl">📱</span>
              <div>
                <h2 className="font-pixel text-sm sm:text-base text-[#4c4270] uppercase">
                  3. How to Install as a Mobile App (PWA)
                </h2>
                <p className="text-[11px] text-[#8a7dc4] font-bold">
                  Run full-screen from your Home Screen with app icon
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#2d2740] mb-4 leading-relaxed">
              Gamify Your Life is built as a Progressive Web App (PWA). You do not need to visit an App Store — you can add it directly to your home screen with a custom pixel icon!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* iPhone / iPad */}
              <div className="p-4 bg-white border-2 border-[#2d2740] shadow-pixel-sm space-y-2">
                <div className="flex items-center gap-2 font-pixel text-xs text-[#4c4270] border-b pb-1.5 border-dashed border-[#8a7dc4]">
                  <Smartphone size={16} />
                  <span>ON APPLE iOS (SAFARI)</span>
                </div>
                <ol className="text-xs text-[#2d2740] space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open <strong>Safari</strong> on your iPhone or iPad.</li>
                  <li>Navigate to <code className="bg-gray-100 px-1">/gamify-life</code>.</li>
                  <li>Tap the <strong>Share</strong> button at the bottom (the square with an arrow pointing up 📤).</li>
                  <li>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                  <li>Tap <strong>Add</strong> in the top right.</li>
                  <li>The Gamify Life icon will appear on your home screen and open without any browser bars!</li>
                </ol>
              </div>

              {/* Android & Chrome */}
              <div className="p-4 bg-white border-2 border-[#2d2740] shadow-pixel-sm space-y-2">
                <div className="flex items-center gap-2 font-pixel text-xs text-[#437c4e] border-b pb-1.5 border-dashed border-[#88bf92]">
                  <Monitor size={16} />
                  <span>ON ANDROID &amp; DESKTOP (CHROME)</span>
                </div>
                <ol className="text-xs text-[#2d2740] space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open <strong>Chrome</strong> or <strong>Brave</strong>.</li>
                  <li>Navigate to <code className="bg-gray-100 px-1">/gamify-life</code>.</li>
                  <li>Tap the yellow <strong>&quot;INSTALL APP TO PHONE / DESKTOP (PWA)&quot;</strong> button at the top of the game screen.</li>
                  <li>Or tap the 3 dots menu (⋮) in the browser &rarr; tap <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.</li>
                  <li>Confirm installation. The app now launches in its own isolated window!</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW TO PLAY / THE 7-STEP GAMEPLAY LOOP */}
        <section className="mb-12">
          <div className="bg-[#ffffff] border-4 border-[#2d2740] shadow-pixel-lg p-5 sm:p-7 relative">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-dashed border-[#2d2740]">
              <span className="text-2xl">🎮</span>
              <div>
                <h2 className="font-pixel text-sm sm:text-base text-[#2d2740] uppercase">
                  4. The 7-Step Daily Gameplay Loop
                </h2>
                <p className="text-[11px] text-[#4c4270] font-bold">
                  How to turn your everyday habits into an RPG progression
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#8a7dc4] shrink-0 pt-0.5">1.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Choose Your Character &amp; Class</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Click <strong>EDIT</strong> on the Character card. Choose from Unicorn Knight, Brave Warrior, Cosmic Mage, Forest Scout, Cozy Kitten, or Cyber Ninja. Name your hero and set their quest title!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#437c4e] shrink-0 pt-0.5">2.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Monitor Your 7 Core Stats</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Knowledge, Health, Focus, Creativity, Social, Discipline, and Kindness. Click <strong>+ NEW STAT</strong> to add bespoke traits (e.g. Coding, Meditation, Cooking, Guitar).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#9c7b28] shrink-0 pt-0.5">3.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Earn Instant XP by Taking Action</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Completed a study session? Exercised? Drank water? Tap the button in section 3 to instantly award floating +XP to your hero and linked stat!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#386b9a] shrink-0 pt-0.5">4.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Level Up (Every 100 XP)</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Every 100 XP levels you up, unlocks confetti celebrations, and earns +50 bonus gold coins!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#9c5548] shrink-0 pt-0.5">5.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Complete Quests &amp; Missions</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Check off your daily and weekly missions. Daily quests automatically refresh every morning at midnight.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#83498f] shrink-0 pt-0.5">6.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Redeem Guilt-Free Rewards</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Spend your earned gold on custom rewards (e.g. Watch a movie, buy an espresso, play video games). Enjoy the rewards you genuinely earned.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 bg-[#fcf6ea] border border-[#2d2740]">
                <span className="font-pixel text-xs text-[#3b6f99] shrink-0 pt-0.5">7.</span>
                <div>
                  <strong className="font-pixel text-xs text-[#2d2740] uppercase block">Cozy Campfire Streak (Zero Penalty For Rest)</strong>
                  <p className="text-[#4c4270] text-xs mt-0.5">
                    Unlike toxic streak apps that punish you with zero for taking a break, taking rest days simply increments your Rest Days counter while keeping your campfire embers warm. <em>Progress, not perfection.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BOTTOM BAR */}
        <div className="text-center p-6 bg-[#fdf6db] border-4 border-[#2d2740] shadow-pixel-lg">
          <h3 className="font-pixel text-sm sm:text-base text-[#2d2740] mb-2 uppercase">
            Ready to Begin Your Adventure?
          </h3>
          <p className="text-xs sm:text-sm text-[#78350f] mb-4">
            Step into your own story and become the player character of your life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/gamify-life"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4c4270] hover:bg-[#382f5c] text-white font-pixel text-xs border-2 border-[#2d2740] shadow-pixel active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              <Gamepad2 size={16} />
              <span>LAUNCH GAMIFY LIFE</span>
            </Link>

            <Link
              href="/digital-products"
              className="inline-flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-gray-100 text-[#2d2740] font-retro text-xs border-2 border-[#2d2740] shadow-pixel-sm"
            >
              <span>Back to Products Hub</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
