"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Layers,
  Cloud,
  Sparkles,
  Database,
  BookOpen,
  CheckSquare,
  Terminal,
  Mail,
  GraduationCap,
  MapPin,
  Globe,
  FileSpreadsheet,
  Search,
  PenTool,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { UtilityStudioShowcase } from "@/components/UtilityStudioShowcase";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HomePage() {
  const [showcaseSlide, setShowcaseSlide] = useState(0);
  const [showcaseIsPlaying, setShowcaseIsPlaying] = useState(true);
  const [showcaseProgress, setShowcaseProgress] = useState(0);
  const [activeHomeCategory, setActiveHomeCategory] = useState<string | null>(null);
  const [reserveEmail, setReserveEmail] = useState("");
  const [reserveStatus, setReserveStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Auto-play logic for the hidden showcase section
  useEffect(() => {
    if (!showcaseIsPlaying) return;
    const interval = setInterval(() => {
      setShowcaseProgress((prev) => {
        if (prev >= 100) {
          setShowcaseSlide((s) => (s + 1) % 3);
          return 0;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [showcaseIsPlaying]);

  const handleReserveSeat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveEmail.trim()) return;
    setReserveStatus("submitting");
    try {
      await addDoc(collection(db, "course_reservations"), {
        email: reserveEmail.trim(),
        course: "GIS Fundamentals",
        reservedAt: serverTimestamp(),
      });
      setReserveStatus("success");
      setReserveEmail("");
    } catch {
      setReserveStatus("error");
    }
  };

  const curriculumModules = [
    { icon: Globe, title: "Introduction to GIS and Its Real-World Applications" },
    { icon: MapPin, title: "Understanding Coordinate Systems and Map Projections" },
    { icon: Layers, title: "Working with Vector and Raster Data Types" },
    { icon: FileSpreadsheet, title: "Exploring GIS Data Sources, Formats, and Quality" },
    { icon: Search, title: "Managing Attribute Tables and Running Spatial Queries" },
    { icon: Activity, title: "Performing Basic Spatial Analysis: Buffer, Overlay, and Clip" },
    { icon: PenTool, title: "Designing Clear and Effective Map Layouts" },
    { icon: Monitor, title: "Getting Started with GIS Software Interface and Tools" },
  ];

  return (
    <div id="view-home">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-32 overflow-hidden bg-[#001a43]">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <svg
            className="w-full h-full object-cover opacity-35"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#006ff0" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#001a43" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#aec6ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#006ff0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGlow)" />
            <path
              d="M 0,50 L 1000,50 M 0,100 L 1000,100 M 0,150 L 1000,150 M 0,200 L 1000,200 M 0,250 L 1000,250 M 0,300 L 1000,300 M 0,350 L 1000,350 M 0,400 L 1000,400 M 0,450 L 1000,450"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
            <path
              d="M 100,0 L 100,500 M 200,0 L 200,500 M 300,0 L 300,500 M 400,0 L 400,500 M 500,0 L 500,500 M 600,0 L 600,500 M 700,0 L 700,500 M 800,0 L 800,500 M 900,0 L 900,500"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
            <g stroke="#006ff0" strokeWidth="1.2" fill="none" opacity="0.6" strokeDasharray="5,4">
              <path d="M 180,120 Q 320,50 460,100" />
              <path d="M 480,110 Q 520,70 600,100" />
              <path d="M 160,130 Q 190,185 220,240" />
              <path d="M 490,140 Q 480,170 470,200" />
              <path d="M 510,240 Q 535,170 600,150" />
              <path d="M 660,200 Q 685,260 720,350" />
              <path d="M 120,100 Q 30,50 900,150" opacity="0.3" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="120" cy="100" r="2.5" />
              <circle cx="140" cy="110" r="3" />
              <circle cx="160" cy="130" r="4" fill="#006ff0" className="animate-pulse" />
              <circle cx="150" cy="150" r="2" />
              <circle cx="180" cy="120" r="2.5" />
              <circle cx="200" cy="140" r="3" />
              <circle cx="210" cy="160" r="2" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="220" cy="240" r="3" />
              <circle cx="240" cy="260" r="2" />
              <circle cx="250" cy="290" r="3.5" fill="#3b82f6" />
              <circle cx="260" cy="320" r="2" />
              <circle cx="270" cy="350" r="2" />
              <circle cx="280" cy="380" r="3" fill="#006ff0" />
              <circle cx="250" cy="270" r="2.5" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="460" cy="100" r="2.5" />
              <circle cx="480" cy="110" r="3" />
              <circle cx="500" cy="125" r="4" fill="#006ff0" className="animate-pulse" />
              <circle cx="490" cy="140" r="2.5" />
              <circle cx="470" cy="130" r="2" />
              <circle cx="510" cy="140" r="3" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="470" cy="200" r="3" />
              <circle cx="490" cy="220" r="2.5" />
              <circle cx="510" cy="240" r="3.5" />
              <circle cx="520" cy="270" r="2" />
              <circle cx="530" cy="300" r="3" fill="#3b82f6" />
              <circle cx="500" cy="250" r="2" />
              <circle cx="480" cy="230" r="2.5" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="560" cy="100" r="2" />
              <circle cx="590" cy="110" r="3" />
              <circle cx="620" cy="120" r="4.5" fill="#006ff0" className="animate-pulse" />
              <circle cx="650" cy="135" r="3" />
              <circle cx="680" cy="150" r="2" />
              <circle cx="710" cy="170" r="2.5" />
              <circle cx="600" cy="150" r="3" />
              <circle cx="630" cy="180" r="2" />
              <circle cx="660" cy="200" r="4" fill="#3b82f6" />
              <circle cx="580" cy="180" r="2.5" />
              <circle cx="700" cy="220" r="3" />
            </g>
            <g fill="#abc3ff" opacity="0.8">
              <circle cx="710" cy="320" r="2.5" />
              <circle cx="730" cy="340" r="3" />
              <circle cx="750" cy="350" r="4" fill="#006ff0" />
              <circle cx="740" cy="370" r="2" />
              <circle cx="720" cy="350" r="2.5" />
            </g>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-20 text-center">
          <ScrollAnimation delay={0.1}>
            <h1 className="text-[42px] md:text-[76px] leading-[48px] md:leading-[84px] -tracking-[0.025em] font-extrabold text-white mb-6 max-w-4xl mx-auto font-[family-name:var(--font-hanken)]">
              Geosolvix
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="text-lg md:text-xl leading-8 text-[#aec6ff] mb-10 max-w-3xl mx-auto">
              Solve enterprise GIS problems beautifully. Deploy intuitive GIS workflows, customized spatial softwares, and cloud-native databases powered by zero-egress BigQuery clusters.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              id="btn-hero-trial"
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#006ff0] hover:bg-[#0057c0] text-white text-sm font-bold shadow-lg shadow-[#006ff0]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              Try for free
            </Link>
            <Link
              id="btn-hero-products"
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-md border border-[#c1c6d7]/40 text-white text-sm font-bold hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
            >
              Explore GIS Products
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* ===== UTILITY STUDIO SHOWCASE SECTION ===== */}
      <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-left relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Product Info & CTA */}
            <div className="lg:col-span-5 space-y-6 text-[#001a43]">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#001a43] leading-tight font-[family-name:var(--font-hanken)]">
                Utility Studio
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Turn raw geodatabases into clean, compliant, fully-connected network models — without touching a single manual snap tool.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500/10 rounded border border-blue-500/25">
                    <Activity className="w-4 h-4 text-[#006ff0]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#006ff0] mb-1 font-mono">
                      Copilot Assisted Audit
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Run complex geometric migrations with telemetry, real-time validations, and AI co-pilot recommendations automatically.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500/10 rounded border border-blue-500/25">
                    <Layers className="w-4 h-4 text-[#006ff0]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#006ff0] mb-1 font-mono">
                      GIS Leak QC Buffers
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Analyze spatial intersection buffers on utility lines natively in your cloud data lake with zero staging files.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="px-6 py-3 rounded-lg bg-[#001a43] hover:bg-[#006ff0] text-white font-bold text-xs shadow-lg shadow-blue-500/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Request a demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            {/* Right Column: Simulated Terminal & GIS Engine Walkthrough */}
            <div className="lg:col-span-7">
              <UtilityStudioShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HIDDEN OLD SHOWCASE SECTION ===== */}
      <section className="hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-left relative z-10">
          <ScrollAnimation delay={0.1} className="text-center mb-12">
            <span className="text-xs font-extrabold text-[#aec6ff] uppercase tracking-widest bg-blue-900/40 border border-blue-800/60 px-3.5 py-1.5 rounded-full font-mono">
              Product Preview Video
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-4 mb-4">
              Interactive Showcase: Utility Studio Preview
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Play through our core product module interface. Turn auto-play on to loop through critical modules, or step through manually below.
            </p>
          </ScrollAnimation>

          {/* Video Viewport Container */}
          <ScrollAnimation
            delay={0.2}
            className="bg-[#0b1329] border border-[#1e2d53] rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Video Viewport Header Bar */}
            <div className="bg-[#080d1e] px-4 py-3 border-b border-[#1e2d53]/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-[#03060c] px-3 py-1 rounded text-[10px] font-mono text-[#aec6ff] flex items-center gap-1.5 border border-[#1e2d53]/55 select-none">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                UTILITY_STUDIO_LIVE_PREVIEW_V2.1
              </div>
            </div>

            {/* Video Inner Slides Port */}
            <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111c3a] via-[#0b1329] to-[#070c19] text-gray-100">
              {showcaseSlide === 0 ? (
                /* SLIDE 0: Welcome Input & Targets */
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                      01. AI GIS Migration Module
                    </h3>
                    <p className="text-xs text-gray-400">
                      The high-productivity onboarding environment of Utility Studio.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Input panel */}
                    <div className="bg-[#080d1a] border border-[#1e2d53] rounded-xl p-5 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                          Migration Engine Prompt
                        </label>
                        <div className="w-full p-3 bg-[#03060c] border border-[#1e2d53]/70 rounded-lg text-xs text-gray-200 font-mono">
                          Show pipelines intersecting with high pressure rating buffers across Westminster corridors
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                          Database Target Destination
                        </label>
                        <div className="w-full px-3 py-2 bg-[#040810] border border-[#1e2d53] rounded-lg text-xs text-white">
                          Google Cloud BigQuery
                        </div>
                      </div>
                    </div>
                    {/* Upload block */}
                    <div className="border border-dashed border-[#1e2d53] rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 bg-[#080d1a]/50 min-h-[180px]">
                      <Cloud className="w-10 h-10 text-[#006ff0] animate-bounce" />
                      <div>
                        <p className="text-xs font-bold text-white">GIS Spatial Files Detected</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Found westminster_utility_grid.shp (4.2 MB)
                        </p>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#006ff0]/10 text-[#aec6ff] border border-[#006ff0]/30 rounded-full">
                        READY TO TRANSLATE
                      </span>
                    </div>
                  </div>
                </div>
              ) : showcaseSlide === 1 ? (
                /* SLIDE 1: Four-Quadrant Bento Workspace */
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-5">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                      02. The Four-Quadrant Workspace Hub
                    </h3>
                    <p className="text-xs text-gray-400">
                      A single unified context for structural analysis, review workflows, map viewers, and catalog databases.
                    </p>
                  </div>
                  {/* bento grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Quadrant 1: Map */}
                    <div className="md:col-span-2 bg-[#040810]/80 border border-[#1e2d53] p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden group select-none min-h-[160px]">
                      <div
                        className="absolute inset-0 z-0 opacity-20"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(0,111,240,0.15) 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                      <div className="relative z-10 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Live Map Grid</span>
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      </div>
                      {/* Simulated map lines */}
                      <div className="relative z-10 w-full h-[80px] bg-[#020408] border border-[#1e2d53]/40 rounded-lg flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-mono text-gray-400">
                          Lat: 51.5007 / Lon: -0.1246
                        </span>
                        {/* Simulated target circle */}
                        <div className="absolute w-12 h-12 rounded-full border border-[#006ff0]/55 bg-[#006ff0]/5 animate-pulse" />
                      </div>
                    </div>
                    {/* Quadrant 2: Nodes */}
                    <div className="bg-[#040810]/80 border border-[#1e2d53] p-4 rounded-xl flex flex-col justify-between min-h-[160px]">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Migration Nodes</span>
                        <p className="text-xs font-bold text-white mt-1">Schema Mapping</p>
                      </div>
                      {/* Node steps */}
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
                        <span className="px-1 bg-blue-900/30 text-blue-300 rounded">SHAPE</span>
                        →
                        <span className="px-1 bg-purple-900/30 text-purple-300 rounded">JSON</span>
                        →
                        <span className="px-1 bg-emerald-950/30 text-emerald-300 rounded">TABLE</span>
                      </div>
                    </div>
                    {/* Quadrant 3: Approvals */}
                    <div className="bg-[#040810]/80 border border-[#1e2d53] p-4 rounded-xl flex flex-col justify-between min-h-[160px]">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Security Scans</span>
                        <p className="text-xs font-bold text-white mt-1">Pressure Checks</p>
                      </div>
                      {/* Statuses */}
                      <div className="flex flex-col gap-1 text-[9px]">
                        <span className="text-emerald-400 font-mono">✓ Geometry Intact</span>
                        <span className="text-amber-400 font-mono">⚠️ Buffer Intersected</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SLIDE 2: Line Console Execution Log & Live AI Messages */
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-5">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                      03. Copilot Assisted Pipeline QC
                    </h3>
                    <p className="text-xs text-gray-400">
                      Run complex geometric migrations with telemetry, real-time validations, and assistant suggestions.
                    </p>
                  </div>
                  {/* console log box */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                    {/* log container */}
                    <div className="md:col-span-2 bg-[#040810] border border-[#1e2d53] rounded-xl p-4 flex flex-col gap-2 min-h-[150px]">
                      <span className="text-[10px] font-mono text-gray-400 uppercase border-b border-[#1e2d53]/80 pb-1.5">
                        Pipeline Execution Log
                      </span>
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-gray-300 leading-tight">
                        <p className="text-gray-400">[09:00:15] INGESTING SHAPEFILE DATASET ... SUCCESS</p>
                        <p className="text-gray-400">[09:00:17] COMPILING TILE COLUMNS ... SUCCESS (7,842 POLYGONS)</p>
                        <p className="text-emerald-400">[09:00:19] CALCULATING INFRASTRUCTURE BUFFERS ... SUCCESS</p>
                        <p className="text-amber-400 font-bold border-l-2 border-amber-500 pl-1.5 mt-1">
                          COPILOT RUNNABLE: Intersected risk buffer detected Westminster
                        </p>
                      </div>
                    </div>
                    {/* copilot response badge */}
                    <div className="bg-gradient-to-br from-[#0c1c3f] to-[#040810] border border-[#1e2d53] p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#006ff0] bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded flex items-center gap-1.5 w-fit">
                          <Sparkles className="w-3 h-3 text-blue-400" />
                          AI CO-PILOT
                        </span>
                        <p className="text-xs font-bold text-white mt-2.5">Suggested Fix</p>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-relaxed italic mt-1.5">
                        &quot;Exclude Westminster quadrant intersection geometries to clear 100% of pipeline buffer violations instantly.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Player Controls Bar */}
            <div className="bg-[#080d1e] px-4 py-4 border-t border-[#1e2d53]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Play Pause and Steps buttons */}
              <div className="flex items-center gap-3">
                {/* Play Pause Toggle */}
                <button
                  id="btn-showcase-play-pause"
                  onClick={() => setShowcaseIsPlaying(!showcaseIsPlaying)}
                  className="w-10 h-10 rounded-full bg-[#006ff0] hover:bg-[#0057c0] text-white flex items-center justify-center transition-all shadow shadow-[#006ff0]/30 hover:scale-[1.04] cursor-pointer"
                >
                  {showcaseIsPlaying ? (
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-white translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                {/* Back button */}
                <button
                  id="btn-showcase-back"
                  onClick={() => {
                    setShowcaseSlide((s) => (s - 1 + 3) % 3);
                    setShowcaseProgress(0);
                  }}
                  className="w-9 h-9 rounded-full border border-[#1e2d53] bg-[#0c1223] hover:bg-white/10 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Next button */}
                <button
                  id="btn-showcase-next"
                  onClick={() => {
                    setShowcaseSlide((s) => (s + 1) % 3);
                    setShowcaseProgress(0);
                  }}
                  className="w-9 h-9 rounded-full border border-[#1e2d53] bg-[#0c1223] hover:bg-white/10 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress bar info */}
              <div className="flex-1 max-w-xs w-full flex flex-col gap-1.5 select-none">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>MODULE {showcaseSlide + 1} OF 3</span>
                  <span>{showcaseIsPlaying ? "AUTO-PLAYING" : "PAUSED"} ({Math.round(showcaseProgress)}%)</span>
                </div>
                {/* Progress Bar outer */}
                <div className="w-full bg-[#03060c] rounded-full h-1.5 border border-[#1e2d53]/60 overflow-hidden">
                  <div
                    className="bg-[#006ff0] h-full transition-all duration-75 ease-linear"
                    style={{ width: `${showcaseProgress}%` }}
                  />
                </div>
              </div>

              {/* Module Jump markers */}
              <div className="flex gap-2 text-[10px] font-semibold">
                <button
                  id="btn-jump-slide-0"
                  onClick={() => {
                    setShowcaseSlide(0);
                    setShowcaseProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${showcaseSlide === 0 ? "bg-[#006ff0] text-white" : "bg-[#0c1223] text-gray-400 hover:text-white border border-[#1e2d53]"}`}
                >
                  01 Migrate
                </button>
                <button
                  id="btn-jump-slide-1"
                  onClick={() => {
                    setShowcaseSlide(1);
                    setShowcaseProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${showcaseSlide === 1 ? "bg-[#006ff0] text-white" : "bg-[#0c1223] text-gray-400 hover:text-white border border-[#1e2d53]"}`}
                >
                  02 Workspace Hub
                </button>
                <button
                  id="btn-jump-slide-2"
                  onClick={() => {
                    setShowcaseSlide(2);
                    setShowcaseProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${showcaseSlide === 2 ? "bg-[#006ff0] text-white" : "bg-[#0c1223] text-gray-400 hover:text-white border border-[#1e2d53]"}`}
                >
                  03 Copilot Pipeline
                </button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ===== OFFERINGS PORTFOLIO / CATEGORY CARDS SECTION ===== */}
      <section className="py-24 bg-white border-b border-[#EAECF0]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-left">
          <ScrollAnimation delay={0.1} className="text-center mb-16">
            <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              Geosolvix Offerings Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-4 mb-4 text-center">
              Explore Our Capabilities & Categories
            </h2>
            <p className="text-base text-[#475467] max-w-2xl mx-auto text-center leading-relaxed">
              Understand the four pillars of Geosolvix service systems. We provide state-of-the-art products, precise regional tools, detailed training academy courses, and structured support resources.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1: Core Products */}
            <Link
              href="/products"
              className="relative p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer bg-white border-[#EAECF0] hover:border-[#006ff0] hover:shadow-md hover:shadow-[#006ff0]/5 pt-8"
            >
              {/* Floating Request a Demo tab ribbon */}
              <span
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 right-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-b-md shadow-sm transition-all z-20 flex items-center gap-1 cursor-pointer hover:shadow-md"
              >
                <span>Request a Demo</span>
                <Sparkles className="w-2.5 h-2.5 text-cyan-200 animate-pulse" />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                  <Layers className="w-5 h-5 text-[#006ff0]" />
                  <h3 className="font-extrabold text-xs text-[#001a43] uppercase tracking-wider">
                    1. Core Products
                  </h3>
                </div>
                <p className="text-xs text-[#475467] leading-relaxed mb-2">
                  Complete, production-ready enterprise platforms including Utility studio (Utility Pipeline QC checks) and GeoFuse, resolving the entire coordinate pipeline natively inside BigQuery or Snowflake.
                </p>
              </div>
              <span className="text-[#006ff0] hover:text-[#0057c0] font-bold text-xs flex items-center gap-1 mt-2">
                Explore Products <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            {/* Card 2: Geospatial Tools */}
            <div
              onClick={() => setActiveHomeCategory("tools")}
              className={
                "relative p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer pt-8 " +
                (activeHomeCategory === "tools"
                  ? "bg-[#faf9ff] border-[#006ff0] shadow-md shadow-[#006ff0]/5"
                  : "bg-white border-[#EAECF0] hover:border-gray-300")
              }
            >
              {/* Floating Request a Demo tab ribbon */}
              <Link
                href="/demo"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 right-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-b-md shadow-sm transition-all z-20 flex items-center gap-1 cursor-pointer hover:shadow-md"
              >
                <span>Request a Demo</span>
                <Sparkles className="w-2.5 h-2.5 text-cyan-200 animate-pulse" />
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                  <Database className="w-5 h-5 text-[#006ff0]" />
                  <h3 className="font-extrabold text-xs text-[#001a43] uppercase tracking-wider">
                    2. Geospatial Tools
                  </h3>
                </div>
                <p className="text-xs text-[#475467] leading-relaxed mb-2">
                  Specialized tools and interactive features such as Cadastral and Land parcel splits, facility directories, custom metadata registers, basemap serving engines, and zoning verification pipelines.
                </p>
              </div>
              <span className="text-[#006ff0] hover:text-[#0057c0] font-bold text-xs flex items-center gap-1 mt-2">
                Interactive Demo <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Card 3: Learning Resources */}
            <div
              onClick={() => setActiveHomeCategory("resources")}
              className={
                "p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer " +
                (activeHomeCategory === "resources"
                  ? "bg-[#faf9ff] border-[#006ff0] shadow-md shadow-[#006ff0]/5"
                  : "bg-white border-[#EAECF0] hover:border-gray-300")
              }
            >
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                  <BookOpen className="w-5 h-5 text-[#006ff0]" />
                  <h3 className="font-extrabold text-xs text-[#001a43] uppercase tracking-wider">
                    3. Learning Resources
                  </h3>
                </div>
                <p className="text-xs text-[#475467] leading-relaxed mb-4">
                  Access public webinars, technical guides, code integrations, and municipal success stories to master zero-egress database design and optimize query caching structures.
                </p>
              </div>
              <span className="text-[#006ff0] hover:text-[#0057c0] font-bold text-xs flex items-center gap-1 mt-2">
                Interactive Demo <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Card 4: Training Courses */}
            <div
              onClick={() => setActiveHomeCategory("training")}
              className={
                "relative p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer pt-8 " +
                (activeHomeCategory === "training"
                  ? "bg-[#faf9ff] border-[#006ff0] shadow-md shadow-[#006ff0]/5"
                  : "bg-white border-[#EAECF0] hover:border-gray-300")
              }
            >
              {/* Floating Request a Demo tab ribbon */}
              <Link
                href="/demo"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 right-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-b-md shadow-sm transition-all z-20 flex items-center gap-1 cursor-pointer hover:shadow-md"
              >
                <span>Request a Demo</span>
                <Sparkles className="w-2.5 h-2.5 text-cyan-200 animate-pulse" />
              </Link>
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                  <CheckSquare className="w-5 h-5 text-[#006ff0]" />
                  <h3 className="font-extrabold text-xs text-[#001a43] uppercase tracking-wider">
                    4. Training Courses
                  </h3>
                </div>
                <p className="text-xs text-[#475467] leading-relaxed mb-2">
                  Enroll regional planning teams in accredited academies. Master spatial metadata standards, utility pipeline leak risk buffer detection, and administrative land parcel splitting logic.
                </p>
              </div>
              <span className="text-[#006ff0] hover:text-[#0057c0] font-bold text-xs flex items-center gap-1 mt-2">
                Interactive Demo <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Expandable Detail Panel */}
          <ScrollAnimation delay={0.2}>
            <div
              id="interactive-category-referrals"
              className="p-8 rounded-2xl border border-[#006ff0]/20 bg-[#faf9ff] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {activeHomeCategory === "tools" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#001a43] mb-1">
                        Sovereign Geospatial Tools Suite
                      </h4>
                      <p className="text-xs text-[#475467]">
                        Micro-modules designed for municipal, cadastral, and transit planning operations.
                      </p>
                    </div>
                    <Link
                      href="/tools"
                      className="px-4 py-2 rounded-lg bg-[#001a43] hover:bg-[#006ff0] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start"
                    >
                      Go to Tools Section{" "}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <h5 className="text-xs font-bold text-[#001a43] mb-1.5 uppercase">
                        Cadastral Splits
                      </h5>
                      <p className="text-[11px] text-[#475467] leading-relaxed mb-3">
                        Accurate point buffer generators for sub-parcel splits and coordinate land division checks.
                      </p>
                      <span className="text-[10px] text-[#006ff0] font-mono">Status: Ready to Run</span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <h5 className="text-xs font-bold text-[#001a43] mb-1.5 uppercase">
                        Facility Directory
                      </h5>
                      <p className="text-[11px] text-[#475467] leading-relaxed mb-3">
                        Search or locate water meters, distribution centers, or valve connections by administrative filters.
                      </p>
                      <span className="text-[10px] text-[#006ff0] font-mono">Status: Active</span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <h5 className="text-xs font-bold text-[#001a43] mb-1.5 uppercase">
                        Zoning Validation
                      </h5>
                      <p className="text-[11px] text-[#475467] leading-relaxed mb-3">
                        Instantly check intersection shapes with municipal safety polygons or water bodies.
                      </p>
                      <span className="text-[10px] text-[#006ff0] font-mono">Status: Ready with DuckDB WASM</span>
                    </div>
                  </div>
                </div>
              )}

              {activeHomeCategory === "resources" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#001a43] mb-1">
                        Curated Learning & Technical Resources
                      </h4>
                      <p className="text-xs text-[#475467]">
                        Deep-dive tutorials, engineering whitepapers, and municipal case studies.
                      </p>
                    </div>
                    <Link
                      href="/resources"
                      className="px-4 py-2 rounded-lg bg-[#001a43] hover:bg-[#006ff0] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start"
                    >
                      Browse All Blogs{" "}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all">
                      <span className="text-[10px] font-bold text-[#006ff0] uppercase tracking-widest">
                        ENGINEERING STUDY
                      </span>
                      <h5 className="text-sm font-bold text-[#001a43] mt-1 mb-2 hover:text-[#006ff0] transition-colors">
                        Inside modern dynamic isochrone solvers for city transit
                      </h5>
                      <p className="text-xs text-[#475467] line-clamp-2">
                        We examine depth-first vs breadth-first linear tree structures inside localized spatial network models.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all">
                      <span className="text-[10px] font-bold text-[#006ff0] uppercase tracking-widest">
                        DEVELOPER TUTORIAL
                      </span>
                      <h5 className="text-sm font-bold text-[#001a43] mt-1 mb-2 hover:text-[#006ff0] transition-colors">
                        The rise of browser-side analytics with DuckDB Spatial in WebAssembly
                      </h5>
                      <p className="text-xs text-[#475467] line-clamp-2">
                        Compile your analytical sequences onto vector columns and render geometries directly without database egress lag.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeHomeCategory === "training" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-[#001a43] mb-1">
                        Accredited Training Programs Academy
                      </h4>
                      <p className="text-xs text-[#475467]">
                        Curated GIS spatial standards certification streams for municipal teams & utilities engineers.
                      </p>
                    </div>
                    <Link
                      href="/training"
                      className="px-4 py-2 rounded-lg bg-[#001a43] hover:bg-[#006ff0] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start"
                    >
                      Enter GIS Academy{" "}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Syllabus Group: AD-GIS-01
                      </span>
                      <h5 className="text-sm font-bold text-[#001a43] mt-2 mb-1.5">
                        Advanced Spatial Analytics for Urban & City Logistics
                      </h5>
                      <p className="text-[11px] text-[#475467] leading-relaxed">
                        Focuses on optimizing municipal transport routing solvers, cadastral density metrics, and buffer hazard definitions.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <span className="text-[10px] font-mono text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded">
                        Syllabus Group: EO-RISK-02
                      </span>
                      <h5 className="text-sm font-bold text-[#001a43] mt-2 mb-1.5">
                        Earth Observation & Satellite Radar for Climate Risk
                      </h5>
                      <p className="text-[11px] text-[#475467] leading-relaxed">
                        Leverage SAR radar imagery datasets to model ocean flooding curves, calculate landslide hazard offsets, and configure early buffers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ===== FEATURED COURSE: GIS FUNDAMENTALS ===== */}
      <section className="py-24 bg-[#001a43] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#006ff0]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#3b82f6]/6 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-20 relative z-10">
          <ScrollAnimation delay={0.1} className="text-center mb-16">
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest font-mono">
                Featured Course
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2 mb-4 font-[family-name:var(--font-hanken)]">
              GIS Fundamentals
            </h2>
            <p className="text-base text-[#aec6ff] max-w-2xl mx-auto leading-relaxed">
              Master the core foundations of Geographic Information Systems. From coordinate systems to spatial analysis — build the skills that every GIS professional needs.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Curriculum Grid */}
            <ScrollAnimation delay={0.2} className="lg:col-span-7">
              <div className="bg-[#0b1329]/80 border border-[#1e2d53] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1e2d53]/80">
                  <GraduationCap className="w-5 h-5 text-[#006ff0]" />
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                    Course Curriculum — 8 Modules
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {curriculumModules.map((mod, i) => {
                    const Icon = mod.icon;
                    return (
                      <div
                        key={i}
                        className="group flex items-start gap-3 p-3.5 rounded-xl bg-[#040810]/60 border border-[#1e2d53]/50 hover:border-[#006ff0]/40 hover:bg-[#0c1c3f]/50 transition-all duration-200"
                      >
                        <div className="mt-0.5 p-1.5 bg-[#006ff0]/10 rounded-lg border border-[#006ff0]/20 shrink-0 group-hover:bg-[#006ff0]/20 transition-colors">
                          <Icon className="w-3.5 h-3.5 text-[#006ff0]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#006ff0]/70 uppercase tracking-wider">
                            Module {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-xs text-gray-200 leading-relaxed mt-0.5 font-medium">
                            {mod.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#1e2d53]/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-mono text-gray-400">8 Modules</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#006ff0]" />
                    <span className="text-[10px] font-mono text-gray-400">Beginner Friendly</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-mono text-gray-400">Certificate Included</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right: Reservation Card */}
            <ScrollAnimation delay={0.3} className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0c1c3f] to-[#040810] border border-[#1e2d53] rounded-2xl p-6 md:p-8 sticky top-24">
                {/* Course highlight */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">GIS Fundamentals</h4>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                      Featured • Enrolling Now
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Be among the first to enroll. Leave your email below and we&apos;ll reserve your seat and notify you when enrollment officially opens.
                </p>

                {/* Email Form */}
                {reserveStatus === "success" ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Seat Reserved!</p>
                      <p className="text-xs text-gray-400 mt-1">
                        We&apos;ll reach out when enrollment opens.
                      </p>
                    </div>
                    <button
                      onClick={() => setReserveStatus("idle")}
                      className="text-[10px] font-mono text-[#006ff0] hover:text-[#aec6ff] transition-colors cursor-pointer mt-2"
                    >
                      Reserve another seat →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReserveSeat} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        id="input-reserve-email"
                        type="email"
                        required
                        placeholder="your.email@company.com"
                        value={reserveEmail}
                        onChange={(e) => {
                          setReserveEmail(e.target.value);
                          if (reserveStatus === "error") setReserveStatus("idle");
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-[#03060c] border border-[#1e2d53] rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#006ff0] focus:ring-1 focus:ring-[#006ff0]/30 transition-all font-mono"
                      />
                    </div>
                    <button
                      id="btn-reserve-seat"
                      type="submit"
                      disabled={reserveStatus === "submitting"}
                      className="w-full py-3 rounded-xl bg-[#006ff0] hover:bg-[#0057c0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-[#006ff0]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {reserveStatus === "submitting" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Reserving...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Reserve My Seat
                        </>
                      )}
                    </button>
                    {reserveStatus === "error" && (
                      <p className="text-[10px] text-red-400 text-center font-mono animate-in fade-in duration-200">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}

                {/* Trust signals */}
                <div className="mt-6 pt-4 border-t border-[#1e2d53]/60 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500/70 shrink-0" />
                    <span>No payment required — just reserve</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500/70 shrink-0" />
                    <span>Early access pricing for first 50 seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500/70 shrink-0" />
                    <span>Unsubscribe anytime — we respect your inbox</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ===== HIDDEN GIS WORKFLOWS SECTION ===== */}
      <section className="hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-left">
          <ScrollAnimation delay={0.1} className="text-center mb-16">
            <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              No GIS Degree Required
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-4 mb-4">
              Try Simple GIS Workflows
            </h2>
            <p className="text-base text-[#475467] max-w-2xl mx-auto">
              We translate normal location commands into clean, ready-to-use spatial logic templates. Adjust the custom parameters below to compile the valid SQL block on the fly.
            </p>
          </ScrollAnimation>
          <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-md">
            <div className="lg:col-span-5 p-8 border-r border-[#EAECF0] flex flex-col justify-between bg-white text-[#181b24]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                  1. Select GIS Operation
                </h4>
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 mb-6 font-semibold text-xs">
                  <button className="flex-grow py-2 rounded-md font-bold transition-all cursor-pointer bg-white text-blue-600 shadow-sm">
                    Buffer Generator
                  </button>
                  <button className="flex-grow py-2 rounded-md font-bold transition-all cursor-pointer text-gray-500 hover:text-gray-900">
                    Boundary Overlap
                  </button>
                  <button className="flex-grow py-2 rounded-md font-bold transition-all cursor-pointer text-gray-500 hover:text-gray-900">
                    Distance Matrix
                  </button>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  2. Customize Spatial Variables
                </h4>
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs text-gray-500 leading-normal">
                    Calculates a surrounding safety zone buffer ring around coordinate nodes. Used to estimate distribution reach.
                  </p>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                      <span>Target Catchment Radius:</span>
                      <span className="text-blue-600 font-mono">500 meters</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="3000"
                      step="50"
                      defaultValue={500}
                      className="w-full accent-blue-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                      readOnly
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>100m (Walkable)</span>
                      <span>3000m (Drivable)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-gray-100 mt-8">
                <button className="w-full py-3 rounded-lg bg-[#006ff0] hover:bg-[#0057c0] text-white font-bold text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  Replicate in Map
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 p-8 bg-[#070b15] text-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                    Live Compiled BigQuery SQL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900/40 text-blue-300 font-bold">
                    GEOSOLVIX COMPILER
                  </span>
                </div>
                <pre className="p-4 bg-[#050811] text-blue-100 rounded-xl text-xs font-mono overflow-x-auto border border-[#1e293b] leading-relaxed select-all">
{`-- GEOSOLVIX AUTO-COMPILED BUFFER QUERY
SELECT id, name, latitude, longitude,
       ST_BUFFER(ST_GEOGPOINT(longitude, latitude), 500) as safety_geom_ring
FROM \`bigquery-public-data.london_bicycles.cycle_stations\`
WHERE latitude IS NOT NULL
LIMIT 10;`}
                </pre>
              </div>
              <div className="border-t border-[#1e293b] pt-4 mt-6 text-xs text-gray-400 flex items-center gap-1.5 leading-relaxed">
                <Terminal className="w-4 h-4 text-[#006ff0] shrink-0" />
                <span>
                  This SQL statement leverages native geospatial index optimizations. Coordinates stay inside your database.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}