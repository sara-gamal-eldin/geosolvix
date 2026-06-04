"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Search, BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { premiumGisTools } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function ToolsPage() {
  const router = useRouter();
  const [premiumToolsSearchQuery, setPremiumToolsSearchQuery] = useState("");
  const [selectedPremiumToolId, setSelectedPremiumToolId] = useState("tool-1");
  const [premiumToolsDemoSuccess, setPremiumToolsDemoSuccess] = useState(false);
  const [premiumToolsDemoLoading, setPremiumToolsDemoLoading] = useState(false);
  const [premiumToolsDemoOrg, setPremiumToolsDemoOrg] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const filteredTools = premiumGisTools.filter(
    (t) =>
      t.title.toLowerCase().includes(premiumToolsSearchQuery.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(premiumToolsSearchQuery.toLowerCase()) ||
      t.badge?.toLowerCase().includes(premiumToolsSearchQuery.toLowerCase())
  );
  const activeTool = premiumGisTools.find((t) => t.id === selectedPremiumToolId) || filteredTools[0];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!premiumToolsDemoOrg.trim()) {
      alert("Please verify your Authority/Agency/Organization name to proceed.");
      return;
    }
    setPremiumToolsDemoLoading(true);
    setTimeout(() => {
      setPremiumToolsDemoLoading(false);
      setPremiumToolsDemoSuccess(true);
    }, 1200);
  };

  return (
    <div className="py-20 bg-[#faf9ff] min-h-screen animate-in fade-in duration-300 text-left">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Sovereign GIS Workspace & Advanced Infrastructure
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            Customized Geospatial Tools
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto font-sans leading-relaxed">
            Translate remote, multi-format spatial assets into highly responsive continuous cloud queries and manage high-integrity municipal layers on unified basemaps.
          </p>
        </ScrollAnimation>

        <div className="scroll-mt-6 border-b border-[#EAECF0] pb-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-left">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#001a43]">
              🗺️ Sovereign Asset Registry
            </h2>
            <p className="text-xs md:text-sm text-[#475467] mt-1 font-medium">
              Select high-efficiency spatial assets from our enterprise catalog to view technical details or coordinate custom sandbox environments.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search geospatial tools..."
              value={premiumToolsSearchQuery}
              onChange={(e) => setPremiumToolsSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#EAECF0] text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-[#006ff0] shadow-sm"
            />
            {premiumToolsSearchQuery && (
              <button
                onClick={() => setPremiumToolsSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredTools.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#EAECF0] py-12">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-bold">
                  No geospatial tools match your search phrase.
                </p>
              </div>
            ) : (
              filteredTools.map((tool) => {
                const isActive = activeTool && activeTool.id === tool.id;
                return (
                  <div
                    key={tool.id}
                    onClick={() => {
                      setSelectedPremiumToolId(tool.id);
                      setPremiumToolsDemoSuccess(false);
                    }}
                    className={`p-5 rounded-2xl border text-left flex gap-4 items-start transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-blue-50/50 border-[#006ff0] ring-1 ring-[#006ff0]/10 shadow-sm"
                        : "bg-white border-[#EAECF0] hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <img
                        src={tool.thumbnail}
                        alt={tool.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-tight ${isActive ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}`}>
                          {tool.badge}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/demo");
                          }}
                          className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[8.5px] font-extrabold uppercase tracking-tight shadow transition-colors block shrink-0 cursor-pointer"
                        >
                          Request a Demo
                        </button>
                      </div>
                      <h3 className={`text-xs md:text-sm font-extrabold leading-snug mb-1 truncate ${isActive ? "text-[#006ff0]" : "text-[#001a43]"}`}>
                        {tool.title}
                      </h3>
                      <p className="text-[11px] text-[#475467] line-clamp-2 leading-tight">
                        {tool.excerpt}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-sm flex flex-col">
            {activeTool ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2 font-semibold pb-4 border-b border-[#EAECF0]">
                  <span className="bg-[#001a43] text-white px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold">
                    Interactive Tool
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#006ff0] font-bold">{activeTool.badge}</span>
                  <span className="text-gray-300">•</span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    Cloud Converter Bundled
                  </span>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-[#001a43] leading-snug mb-1">
                    {activeTool.title}
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold italic">
                    {activeTool.subtitle}
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden aspect-[16/8] bg-gradient-to-r from-blue-950 to-slate-900 p-6 flex flex-col justify-end text-white relative mb-4">
                  <div className="absolute inset-0 bg-black/45 mix-blend-multiply z-10" />
                  <img
                    src={activeTool.thumbnail}
                    alt={activeTool.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="z-20 text-left">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#001a43] bg-emerald-300 px-2.5 py-1 rounded w-fit mb-2 block">
                      TOOL WORKSPACE PREVIEW
                    </span>
                    <p className="text-xs text-gray-100 max-w-lg font-medium tracking-tight">
                      {activeTool.excerpt}
                    </p>
                  </div>
                </div>
                <div className="text-xs md:text-sm text-[#344054] leading-relaxed mb-6 bg-blue-50/50 border-l-4 border-[#006ff0] p-4 rounded-r-xl">
                  <strong className="block text-[#001a43] font-extrabold mb-1">
                    Core Operational Directive:
                  </strong>
                  {activeTool.details}
                </div>
                <div className="bg-[#faf9ff] p-6 rounded-2xl border border-dashed border-[#EAECF0] text-left mt-8">
                  <h3 className="text-sm font-extrabold text-[#001a43] mb-2 uppercase tracking-wide">
                    Request Live Workspace Demo
                  </h3>
                  <p className="text-xs text-[#475467] leading-relaxed mb-4 font-medium">
                    Request a personalized, interactive workspace demo of the <strong className="font-semibold">{activeTool.title}</strong> module, integrating our Cloud Native Converter for custom multi-format spatial asset conversions.
                  </p>
                  {premiumToolsDemoSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-250 rounded-xl space-y-2 animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-650 flex-shrink-0" />
                        <span>Demo Workspace Requested Successfully!</span>
                      </div>
                      <p className="text-xs text-emerald-750 leading-normal leading-relaxed">
                        Your custom demo configuration for the <strong className="font-bold">{activeTool.title}</strong> module (featuring the Cloud Native Converter) has been registered successfully! A direct access link to your dedicated sandbox, along with sample conversion presets, has been scheduled and dispatched to <strong className="font-bold">{loginEmail}</strong>.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleDemoSubmit} className="space-y-4 font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-[#001a43] uppercase mb-1.5">
                            Organization / Agency Name
                          </label>
                          <input
                            type="text"
                            required
                            value={premiumToolsDemoOrg}
                            onChange={(e) => setPremiumToolsDemoOrg(e.target.value)}
                            placeholder="e.g. Ministry of Transport, City Govt or Enterprise Corp"
                            className="w-full p-2.5 bg-white border border-[#EAECF0] rounded-xl text-xs font-semibold focus:outline-[#006ff0]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#001a43] uppercase mb-1.5">
                            Authorized Contact Email
                          </label>
                          <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="e.g. contact@agency.org"
                            className="w-full p-2.5 bg-white border border-[#EAECF0] rounded-xl text-xs font-semibold focus:outline-[#006ff0]"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#001a43] hover:bg-[#000d24] text-white hover:shadow-md transition-all text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
                        disabled={premiumToolsDemoLoading}
                      >
                        {premiumToolsDemoLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Scheduling Custom Geospatial Environment...
                          </>
                        ) : (
                          <>Request Customized Live Demo & Converter</>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-300 mb-4 animate-bounce" />
                <p className="text-sm font-bold text-gray-500 font-sans">
                  Select a geospatial tool from the left column to preview its features and request a customized demo workspace.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
