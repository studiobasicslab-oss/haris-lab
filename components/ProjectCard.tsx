"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Wrench,
  BookOpen,
  Utensils,
  Sparkles,
  Terminal,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon, PinterestIcon } from "./BrandIcons";
import { LabPortal } from "../data/labCatalogue";
import { labAudio } from "./LabAudio";

interface ProjectCardProps {
  portal: LabPortal;
}

export default function ProjectCard({ portal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setMousePos({ x: percentX, y: percentY });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -4;
    const ry = ((x - centerX) / centerX) * 4;
    setTilt({ rx, ry });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    labAudio.playBlip(620);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const renderIcon = () => {
    switch (portal.iconType) {
      case "youtube":
        return <YoutubeIcon className="w-5 h-5 text-rose-500" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-pink-500" />;
      case "pinterest":
        return <PinterestIcon className="w-5 h-5 text-rose-400" />;
      case "goodreads":
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case "cooking":
        return <Utensils className="w-5 h-5 text-emerald-400" />;
      case "game":
        return <Gamepad2 className="w-5 h-5 text-indigo-400" />;
      case "tool":
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-yellow-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--accent)]" />;
    }
  };

  const CardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.1s ease-out, border-color 0.3s"
          : "transform 0.4s ease-out, border-color 0.3s",
      }}
      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 md:p-7 overflow-hidden transition-all duration-300 backdrop-blur-xl hover:border-[var(--accent)] hover:shadow-[0_20px_40px_-15px_var(--accent-glow)] flex flex-col justify-between h-full min-h-[280px]"
    >
      {/* Specular Light Sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08), transparent 60%)`,
        }}
      />

      {/* Reticle Corner Brackets on Hover */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Top Meta Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--card-hover-bg)] border border-[var(--border)] group-hover:border-[var(--accent)]/40 transition">
              {renderIcon()}
            </div>
            <div>
              <span className="font-telemetry text-[11px] text-[var(--accent)] uppercase tracking-wider block font-medium">
                {portal.categoryLabel}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-telemetry">
                {portal.destinationType}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-[10px] font-telemetry tracking-wide bg-[var(--card-hover-bg)] text-[var(--text-sub)] border border-[var(--border)] group-hover:border-[var(--accent)]/50 group-hover:text-[var(--accent)] transition">
            {portal.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-2.5 leading-tight flex items-center justify-between">
          <span>{portal.title}</span>
          <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[var(--accent)]">
            {portal.isInternal ? (
              <ArrowUpRight className="w-5 h-5" />
            ) : (
              <ExternalLink className="w-5 h-5" />
            )}
          </span>
        </h3>

        {/* Description */}
        <p className="font-sans-modern text-sm text-[var(--text-sub)] leading-relaxed opacity-90 mb-4">
          {portal.description}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-telemetry mt-auto">
        <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[160px]">
          {portal.meta}
        </span>

        <div className="flex items-center gap-1.5 text-[var(--accent)] font-medium group-hover:translate-x-1 transition-transform">
          <span>{portal.actionText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );

  if (portal.isInternal) {
    return (
      <Link
        href={portal.href}
        onClick={() => labAudio.playChime()}
        className="block h-full"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <a
      href={portal.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => labAudio.playChime()}
      className="block h-full"
    >
      {CardContent}
    </a>
  );
}
