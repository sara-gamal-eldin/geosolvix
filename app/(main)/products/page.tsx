"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Sparkles, DatabaseZap, ArrowRight, Clock, Shield, Eye, Sliders, Cpu, Activity, Database, RefreshCw } from "lucide-react";
import { UtilityStudioShowcase } from "@/components/UtilityStudioShowcase";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Primary Enterprise Software
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            Utility studio
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto font-sans">
            Enterprise-grade high-precision GIS data cleansing, schema transformation, and topological validation. Turn raw utility datasets into compliant, connected database models instantly.
          </p>
        </ScrollAnimation>

        <div className="relative bg-[#faf9ff] p-8 md:p-12 rounded-3xl border border-[#EAECF0] hover:shadow-xl transition-all mb-16 overflow-hidden pt-14">
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push("/demo");
            }}
            className="absolute top-0 right-8 bg-gradient-to-r from-[#006ff0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-b-lg shadow-md transition-all z-20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request Product Demo</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="flex items-center gap-2.5 mb-5 select-none">
                <span className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <DatabaseZap className="w-5 h-5 animate-pulse" />
                </span>
                <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-md">
                  Utility Network Model Migration
                </span>
              </div>
              <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#001a43] tracking-tight mb-4 flex-wrap">
                Utility Studio: Production-Ready Utility Networks, Automatically.
              </h2>
              <p className="text-sm text-[#475467] leading-relaxed mb-6">
                An elite, customized GIS suite built specifically to automate the complex migration of raw utility assets into standard-compliant, topology-safe Utility Network models. Avoid months of manual snapping and custom Python dangles. Utility Studio is a profile-driven, 100% air-gapped certified engine that lets you cleanse, build, and audit your networks deterministically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/demo")}
                  className="px-6 py-3.5 rounded-xl bg-[#001a43] text-white font-bold text-xs hover:bg-[#0057c0] transition-all text-center cursor-pointer shadow-md inline-flex items-center justify-center gap-2 w-fit"
                >
                  Request Utility studio Trial <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 w-full">
              <UtilityStudioShowcase />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#001a43] tracking-tight">
              The Ultimate Migration Paradigm Shift: Core Value Propositions
            </h3>
            <p className="text-xs text-[#475467] max-w-lg mx-auto mt-2">
              How Utility studio compares to the traditional, fragile geoprocessing approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">⏱️ Days vs. Months</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  A portable desktop engine that automates complex topology runs. Compress months of GIS loops into repeatable, high-speed hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                The Modern Way
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🔒 100% Air-Gapped</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  No external port exposure or cloud uploads. Offline certified to safeguard sensitive state grids and defense utility infrastructure.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Secure & Sovereign
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🛡️ Full Auditability</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  No silent geometric changes. Isolates auto-generated splits and custom Tees into transparent, review-first layers for human verification.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Sovereign Control
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">📋 Profile-Driven</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  The software bends to your database naming patterns and custom topological attributes. Your historical schema remains intact.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Customer-Centric Adapt
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🤖 100% Local-First AI</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  AI pipeline advice runs directly on client hardware. Absolute safety and data privacy with zero external telemetry.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Privacy Preserved
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🏗️ Modular Scale</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Engineered with a high-performance spatial query core to process millions of pipe coordinates without freezing or memory leaks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Decoupled Architecture
              </div>
            </div>

            {/* Feature 7 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🚀 Zero-Touch DB setup</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  1-click execution instantiates, provisions, and indexes an embedded spatial database locally without heavy DBA overhead.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Instant Deploy
              </div>
            </div>

            {/* Feature 8 */}
            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🔁 100% Idempotancy</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Run, abort, edit parameters, and retry a million times. The database output remains deterministic, duplicate-free, and clean.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">
                Execution Safety
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
