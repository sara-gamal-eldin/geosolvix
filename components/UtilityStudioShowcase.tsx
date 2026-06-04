'use client';

import * as React from 'react';
import { useState } from 'react';
import { Map, Workflow, Database, CheckSquare, Brain, ArrowRight } from 'lucide-react';

interface ShowcaseCard {
  id: string;
  title: string;
  description: string;
  actionText: string;
  color: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function UtilityStudioShowcase() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards: ShowcaseCard[] = [
    {
      id: "us-card-map",
      title: "Map Viewer",
      description: "Explore spatial data on an interactive map with live layer controls and TOC.",
      actionText: "Open",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      icon: Map,
    },
    {
      id: "us-card-migration",
      title: "Migration Workflow",
      description: "Import GDB, map layers, and let our AI engine process your data automatically.",
      actionText: "Start",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      icon: Workflow,
    },
    {
      id: "us-card-browser",
      title: "Data Browser",
      description: "Browse PostGIS tables, inspect feature counts, and explore your database.",
      actionText: "Browse",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      icon: Database,
    },
    {
      id: "us-card-review",
      title: "Review & Approvals",
      description: "Review team submissions, approve or reject data fixes, and track progress.",
      actionText: "Review",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40",
      glowColor: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      icon: CheckSquare,
    },
  ];

  // Helper to determine connecting line color and properties
  const getLineStyles = (idx: number) => {
    const isHovered = hoveredCard === idx;
    const isAnyHovered = hoveredCard !== null;
    
    let strokeColor = "stroke-[#182649]";
    if (isHovered) {
      if (idx === 0) strokeColor = "stroke-emerald-400/80";
      if (idx === 1) strokeColor = "stroke-blue-400/80";
      if (idx === 2) strokeColor = "stroke-amber-400/80";
      if (idx === 3) strokeColor = "stroke-purple-400/80";
    } else if (isAnyHovered) {
      strokeColor = "stroke-[#101931]/40";
    }
    
    return {
      strokeWidth: isHovered ? "2" : "1",
      className: `transition-all duration-300 ${strokeColor}`,
    };
  };

  return (
    <div 
      id="utility-studio-showcase-container" 
      className="p-6 md:p-12 bg-[#060a15] rounded-3xl border border-[#1e2d53] relative overflow-hidden flex flex-col justify-center min-h-[500px]"
    >
      {/* Dynamic Background Dark Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(30,45,83,0.35)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(30,45,83,0.35)_1px,_transparent_1px)]"
        style={{ backgroundSize: '40px 40px' }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      {/* SVG Connecting Lines (Desktop only) */}
      <svg 
        id="showcase-connecting-lines"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block"
      >
        <line x1="25%" y1="25%" x2="50%" y2="50%" {...getLineStyles(0)} />
        <line x1="75%" y1="25%" x2="50%" y2="50%" {...getLineStyles(1)} />
        <line x1="25%" y1="75%" x2="50%" y2="50%" {...getLineStyles(2)} />
        <line x1="75%" y1="75%" x2="50%" y2="50%" {...getLineStyles(3)} />
      </svg>

      {/* 2x2 Responsive Grid */}
      <div 
        id="showcase-cards-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 relative z-20 w-full"
      >
        {cards.map((card, idx) => {
          const IconComponent = card.icon;
          const isHovered = hoveredCard === idx;
          return (
            <div
              key={card.id}
              id={card.id}
              className={`group relative bg-[#091022]/85 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-[#1e2d53]/80 hover:border-gray-500/20 hover:bg-[#0c1630] transition-all duration-300 cursor-pointer text-left flex flex-col justify-between min-h-[160px] md:min-h-[175px] group shadow-lg ${card.glowColor}`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className={`p-2.5 rounded-xl border border-transparent transition-all duration-300 ${card.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-gray-400 font-sans group-hover:text-gray-300 transition-colors">
                  {card.description}
                </p>
              </div>

              {/* Action Link Row */}
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                <span className="font-mono tracking-wide uppercase text-[10px]">
                  {card.actionText}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Interactive Brain Logo (Desktop only) */}
      <div 
        id="showcase-glowing-brain-core"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block select-none pointer-events-none"
      >
        <div className="relative flex items-center justify-center">
          {/* External Pulsating Ripple Ring 1 */}
          <div className="absolute w-24 h-24 rounded-full bg-cyan-500/5 animate-ping border border-cyan-500/10 pointer-events-none" />
          
          {/* External Pulsating Ripple Ring 2 */}
          <div className="absolute w-16 h-16 rounded-full bg-blue-500/20 blur-md pointer-events-none transition-all duration-500 scale-125" style={{
            opacity: hoveredCard !== null ? 0.8 : 0.4
          }} />

          {/* Central Blue Interactive Icon Box */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300">
            <div className="w-full h-full rounded-full bg-[#070c19] flex items-center justify-center text-cyan-400">
              <Brain className={`w-5 h-5 animate-pulse transition-all duration-300 ${hoveredCard !== null ? 'scale-110 text-cyan-300' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
