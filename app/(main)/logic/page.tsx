"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Sliders, Activity, Map, Cloud, Sparkles, Eye, Terminal } from "lucide-react";

export default function LogicPage() {
  const [activeWorkflowPreset, setActiveWorkflowPreset] = useState("pipeline-qc");
  const [isPipelineExecuting, setIsPipelineExecuting] = useState(false);
  const [pipelineLogEntries, setPipelineLogEntries] = useState<string[]>([]);
  const [pipelineProgressStep, setPipelineProgressStep] = useState(0);
  const [pipelineBufferValue, setPipelineBufferValue] = useState(500);

  const handleExecutePipeline = (preset: string) => {
    setIsPipelineExecuting(true);
    setPipelineLogEntries([
      "Initializing Spatial Compiler Engine...",
      "Resolving selected topology presets...",
    ]);
    setPipelineProgressStep(1);

    setTimeout(() => {
      setPipelineLogEntries((prev) => [
        ...prev,
        "Connecting to unified GIS database shards...",
      ]);
      setPipelineProgressStep(2);
    }, 800);

    setTimeout(() => {
      setPipelineLogEntries((prev) => [
        ...prev,
        `Applying dynamic ST_BUFFER(${pipelineBufferValue}) parameters...`,
        "Validating projection coordinates (EPSG:4326)...",
      ]);
      setPipelineProgressStep(3);
    }, 1600);

    setTimeout(() => {
      setPipelineLogEntries((prev) => [
        ...prev,
        "Generating runtime execution DAG...",
        "Executing analytical overlay operations...",
      ]);
      setPipelineProgressStep(4);
    }, 2800);

    setTimeout(() => {
      setPipelineLogEntries((prev) => [
        ...prev,
        "SUCCESS: Analytical overlay complete.",
        "Compiling results to active rendering memory...",
      ]);
      setPipelineProgressStep(5);
    }, 4200);

    setTimeout(() => {
      setIsPipelineExecuting(false);
      setPipelineLogEntries((prev) => [
        ...prev,
        "PIPELINE COMPLETE. Sandbox ready for next command.",
      ]);
    }, 5500);
  };

  return (
    <div className="min-h-screen bg-[#070b15] text-gray-100 py-16 px-4 md:px-20 border-t border-[#1e293b]">
      <div className="max-w-[1280px] mx-auto select-none">
        <ScrollAnimation delay={0.1} className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-extrabold text-[#006ff0] bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Secure Enterprise Sandbox
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Logic Compiler
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-[family-name:var(--font-hanken)]">
            Geosolvix Logic Hub
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl text-sm leading-relaxed">
            Design, simulate, and compile GIS workflow pipelines. Directly connect custom logic modules, solve quality controls like Utility studio, or process formats with the Cloud Native Converter.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0c1222] p-6 rounded-2xl border border-[#1e293b]">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#006ff0]" />
                Select GIS Workflow Preset
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setActiveWorkflowPreset("pipeline-qc");
                    setPipelineLogEntries([]);
                    setPipelineProgressStep(0);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    activeWorkflowPreset === "pipeline-qc"
                      ? "bg-[#13203c] border-[#3b82f6]/60 text-white"
                      : "bg-[#050811] border-[#1e293b] text-gray-400 hover:border-gray-750"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 mt-0.5">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">
                      Utility studio Pipeline (Quality Control)
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-normal">
                      Surveillance QC scanning pipeline pressure sensor coordinates for structural leak buffers.
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveWorkflowPreset("pipeline-route");
                    setPipelineLogEntries([]);
                    setPipelineProgressStep(0);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    activeWorkflowPreset === "pipeline-route"
                      ? "bg-[#13203c] border-[#3b82f6]/60 text-white"
                      : "bg-[#050811] border-[#1e293b] text-gray-400 hover:border-gray-750"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/15 text-blue-500 mt-0.5">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">
                      LogicsRoute Fleet Scheduler
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-normal">
                      Solve complex delivery highway meshes and buffer points on live vehicle matrix coordinates.
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveWorkflowPreset("pipeline-convert");
                    setPipelineLogEntries([]);
                    setPipelineProgressStep(0);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    activeWorkflowPreset === "pipeline-convert"
                      ? "bg-[#13203c] border-[#3b82f6]/60 text-white"
                      : "bg-[#050811] border-[#1e293b] text-gray-400 hover:border-gray-750"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">
                      Cloud Native Converter Suite
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-normal">
                      Transfers Shapefile formats to highly-indexed database partitions without egress cost layers.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-[#0c1222] p-6 rounded-2xl border border-[#1e293b]">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Configure Spatial Buffer Parameter
              </h3>
              <div className="p-4 bg-[#050811] rounded-xl border border-[#1e293b]">
                <div className="flex justify-between items-center text-xs text-blue-200 mb-2 font-mono">
                  <span>ST_BUFFER Radius:</span>
                  <span className="font-bold text-white text-sm">{pipelineBufferValue} meters</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={pipelineBufferValue}
                  onChange={(e) => setPipelineBufferValue(parseInt(e.target.value))}
                  disabled={isPipelineExecuting}
                  className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#006ff0] disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>100m</span>
                  <span>1,000m</span>
                  <span>2,000m</span>
                </div>
              </div>
              <button
                onClick={() => handleExecutePipeline(activeWorkflowPreset)}
                disabled={isPipelineExecuting}
                className="w-full mt-6 py-4 rounded-xl bg-[#006ff0] hover:bg-[#0057c0] text-white font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#006ff0]/20 font-mono"
              >
                <Sparkles className="w-4 h-4 text-[#00ff7f]" />
                {isPipelineExecuting ? "COMPILING PIPELINE LOGIC..." : "Execute Active Logic Pipeline"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#0c1222] p-6 rounded-2xl border border-[#1e293b] flex flex-col justify-between min-h-[460px] relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="logicGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#logicGrid)" />
                </svg>
              </div>

              <div className="relative z-10 flex items-center justify-between border-b border-[#1e293b] pb-3 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#006ff0]" />
                    Interactive Spatial Pipeline Visualizer
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Preset ID: {activeWorkflowPreset} • Radius: {pipelineBufferValue}m
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${isPipelineExecuting ? "bg-amber-500/20 text-amber-400 animate-pulse" : "bg-emerald-500/20 text-emerald-400"}`}>
                  {isPipelineExecuting ? "EXECUTING" : "READY"}
                </span>
              </div>

              <div className="relative z-10 flex-grow bg-[#050811]/90 rounded-xl border border-[#1e293b] min-h-[280px] p-6 flex items-center justify-center">
                {activeWorkflowPreset === "pipeline-qc" && (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <svg className="w-full max-w-[420px] h-[240px]" viewBox="0 0 400 240">
                      <path d="M 40,120 Q 120,60 200,120 T 360,120" stroke="#f59e0b" strokeWidth="4" strokeDasharray={isPipelineExecuting ? "6,4" : "0"} fill="none" className="transition-all duration-300" />
                      <g className="transition-all duration-300">
                        <circle cx="40" cy="120" r="12" fill={pipelineProgressStep >= 2 ? "#d97706" : "#451a03"} stroke="#f59e0b" strokeWidth="2" />
                        <text x="40" y="145" textAnchor="middle" className="text-[10px] font-mono fill-gray-400">Sensor 1A</text>
                        {pipelineProgressStep >= 3 && (
                          <circle cx="150" cy="100" r={30 + pipelineBufferValue / 40} fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" className="animate-ping" />
                        )}
                        <circle cx="150" cy="100" r="14" fill={pipelineProgressStep >= 3 ? "#ef4444" : "#451a03"} stroke="#ef4444" strokeWidth="3" />
                        <text x="150" y="75" textAnchor="middle" className="text-[10px] font-mono fill-red-400 font-bold">Anomaly B-2</text>
                        <circle cx="260" cy="130" r="12" fill={pipelineProgressStep >= 4 ? "#d97706" : "#451a03"} stroke="#f59e0b" strokeWidth="2" />
                        <text x="260" y="155" textAnchor="middle" className="text-[10px] font-mono fill-gray-400">Sensor 3A</text>
                        {pipelineProgressStep >= 5 && (
                          <g>
                            <line x1="150" y1="100" x2="210" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
                            <rect x="210" y="20" width="115" height="30" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                            <text x="267" y="38" textAnchor="middle" className="text-[9px] font-mono fill-white font-semibold">PRESSURE TRIGGER ALERT</text>
                          </g>
                        )}
                      </g>
                    </svg>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>Ingested: 3,420 indices</span>
                      <span className="text-red-400 font-bold">Wetland buffers scanned</span>
                    </div>
                  </div>
                )}
                {activeWorkflowPreset === "pipeline-route" && (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <svg className="w-full max-w-[420px] h-[240px]" viewBox="0 0 400 240">
                      <path d="M 50,50 L 150,80 L 100,180 L 280,140 L 350,70" stroke="#3b82f6" strokeWidth="3.5" fill="none" strokeDasharray={isPipelineExecuting ? "5,3" : "0"} />
                      <rect x="40" y="40" width="20" height="20" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="50" y="75" textAnchor="middle" className="text-[10px] font-mono fill-gray-400">Depot A</text>
                      <circle cx="160" cy="150" r="24" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="160" y="153" textAnchor="middle" className="text-[8px] font-mono fill-red-400">LOW TUNNEL</text>
                      <circle cx="150" cy="80" r="10" fill={pipelineProgressStep >= 3 ? "#2563eb" : "#172554"} stroke="#3b82f6" strokeWidth="1.5" />
                      <circle cx="100" cy="180" r="10" fill={pipelineProgressStep >= 4 ? "#2563eb" : "#172554"} stroke="#3b82f6" strokeWidth="1.5" />
                      <circle cx="280" cy="140" r="10" fill={pipelineProgressStep >= 5 ? "#2563eb" : "#172554"} stroke="#3b82f6" strokeWidth="1.5" />
                      {isPipelineExecuting && (
                        <circle cx="210" cy="155" r="5" fill="#00ff7f" className="animate-ping" />
                      )}
                    </svg>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>OSRM Solver: Optimal</span>
                      <span className="text-blue-400 font-bold">12 Active Waypoints Routed</span>
                    </div>
                  </div>
                )}
                {activeWorkflowPreset === "pipeline-convert" && (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <svg className="w-full max-w-[420px] h-[240px]" viewBox="0 0 400 240">
                      <g className="opacity-40">
                        <rect x="20" y="30" width="100" height="180" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                        <text x="70" y="125" textAnchor="middle" className="text-[9px] font-mono fill-emerald-300">Legacy SHP</text>
                      </g>
                      <path d="M 140,120 L 220,120" stroke="#10b981" strokeWidth="3" strokeDasharray={isPipelineExecuting ? "5,5" : "0"} />
                      <g transform="translate(240, 30)">
                        <rect x="0" y="0" width="140" height="180" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                        <text x="70" y="25" textAnchor="middle" className="text-[10px] font-bold fill-white">Query Clusters</text>
                        <rect x="15" y="45" width="50" height="35" rx="3" fill={pipelineProgressStep >= 3 ? "#047857" : "#0f172a"} stroke="#10b981" strokeWidth="1" />
                        <text x="40" y="65" textAnchor="middle" className="text-[8px] font-mono fill-gray-400">PART_01</text>
                        <rect x="75" y="45" width="50" height="35" rx="3" fill={pipelineProgressStep >= 4 ? "#047857" : "#0f172a"} stroke="#10b981" strokeWidth="1" />
                        <text x="100" y="65" textAnchor="middle" className="text-[8px] font-mono fill-gray-400">PART_02</text>
                        <rect x="15" y="95" width="50" height="35" rx="3" fill={pipelineProgressStep >= 5 ? "#047857" : "#0f172a"} stroke="#10b981" strokeWidth="1" />
                        <text x="40" y="115" textAnchor="middle" className="text-[8px] font-mono fill-gray-400">PART_03</text>
                        <rect x="75" y="95" width="50" height="35" rx="3" fill={pipelineProgressStep >= 5 ? "#047857" : "#0f172a"} stroke="#10b981" strokeWidth="1" />
                        <text x="100" y="115" textAnchor="middle" className="text-[8px] font-mono fill-gray-400">PART_04</text>
                      </g>
                    </svg>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-gray-500 font-mono">
                      <span>Zero Egress: Enabled</span>
                      <span className="text-emerald-400 font-bold">100% Native GIS Table</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-[#050811] p-4 rounded-xl border border-[#1e293b] font-mono text-[11px] leading-relaxed select-text">
                <div className="flex items-center justify-between border-b border-[#1e293b] pb-2 mb-2">
                  <span className="text-gray-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-500" />
                    Compiler Standard Logs Output
                  </span>
                  <span className="text-[10px] text-gray-600">utf-8 shell log trace</span>
                </div>
                <div className="h-[120px] overflow-y-auto flex flex-col gap-1 text-[#00ff7f]">
                  {pipelineLogEntries.length === 0 ? (
                    <div className="text-gray-600 text-[11px] italic h-full flex items-center justify-center">
                      Click "Execute Active Logic Pipeline" to compile and view pipeline tracing output...
                    </div>
                  ) : (
                    pipelineLogEntries.map((log, idx) => (
                      <div key={idx} className="animate-in fade-in duration-100">
                        <span className="text-blue-400 font-bold select-none mr-2">{">"}</span>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
