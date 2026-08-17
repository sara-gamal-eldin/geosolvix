"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Sparkles, ArrowRight, Zap, Box, Palette, Cloud, Globe, Search, CheckCircle2, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">

        {/* ── Header ── */}
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Cloud-Native Geospatial Platform
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            Scout
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto font-sans">
            Turn any geospatial dataset into production-ready vector tiles, PMTiles, and STAC catalogs — powered by DuckDB Spatial and Claude AI. Open standards, no vendor lock-in.
          </p>
        </ScrollAnimation>

        {/* ── Main card: info + video ── */}
        <div className="relative bg-[#faf9ff] p-8 md:p-12 rounded-3xl border border-[#EAECF0] hover:shadow-xl transition-all mb-16 overflow-hidden pt-14">
          <div
            onClick={(e) => { e.stopPropagation(); router.push("/demo"); }}
            className="absolute top-0 right-8 bg-gradient-to-r from-[#006ff0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-b-lg shadow-md transition-all z-20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request Scout Demo</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: text */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="flex items-center gap-2.5 mb-5 select-none">
                <span className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <Zap className="w-5 h-5 animate-pulse" />
                </span>
                <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-md">
                  Geospatial Tile Engine
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#001a43] tracking-tight mb-4">
                Scout: From Raw Data to Production Tiles in 60 Seconds.
              </h2>
              <p className="text-sm text-[#475467] leading-relaxed mb-6">
                Scout ingests any vector dataset — GeoJSON, Shapefile, GeoPackage, GeoParquet — and runs the full pipeline automatically: DuckDB Spatial processing, tippecanoe tile generation, STAC catalog creation, and one-click publish to Cloudflare R2. Add Claude-powered AI SQL on top, and you have the fastest path from raw data to a published, queryable geospatial layer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/scout"
                  className="px-6 py-3.5 rounded-xl bg-[#001a43] text-white font-bold text-xs hover:bg-[#0057c0] transition-all shadow-md inline-flex items-center justify-center gap-2 w-fit"
                >
                  Try Scout Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => router.push("/demo")}
                  className="px-6 py-3.5 rounded-xl border border-[#006ff0] text-[#006ff0] font-bold text-xs hover:bg-blue-50 transition-all inline-flex items-center justify-center gap-2 w-fit cursor-pointer"
                >
                  Request a Demo
                </button>
              </div>
            </div>

            {/* Right: video */}
            <div className="lg:col-span-7 w-full">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#1e3a6e]/20">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://pub-bb20ce11def241fda9bd57de004f9be3.r2.dev/scout-demo-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div className="mt-8">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#001a43] tracking-tight">
              Everything You Need. Nothing You Don&apos;t.
            </h3>
            <p className="text-xs text-[#475467] max-w-lg mx-auto mt-2">
              Eight core capabilities that replace an entire stack of disconnected GIS tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">⚡ 60-Second Pipeline</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Paste any dataset URL and get production-ready tiles automatically. DuckDB Spatial + tippecanoe handle everything — no config, no installs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Zero-Setup</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🤖 AI SQL Explorer</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Ask Claude in plain English. Scout generates and runs DuckDB Spatial queries on your data, rendering results on the map instantly.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Claude-Powered</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Box className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">📦 PMTiles + STAC</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Every dataset becomes a PMTiles archive, live XYZ endpoint, and full STAC catalog. Open standards you own — no vendor lock-in.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Open Standards</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🎨 Choropleth Styling</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Visual classification with 10 color ramps. Quantile, equal interval, and categorical — all point-and-click, no code required.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">No-Code Visual</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Cloud className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">☁️ One-Click Publish</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Publish tiles permanently to Cloudflare R2 in one click. Get a CDN-backed PMTiles URL you own and can share anywhere.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Instant CDN</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🔗 Live XYZ Endpoints</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Every layer gets a live tile endpoint, compatible with QGIS, ArcGIS, Mapbox, and any MapLibre-based client out of the box.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Universal Compatibility</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">🔍 Feature Inspector</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Click any feature on the map to instantly inspect all its attributes, geometry type, and property values in a clean side panel.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Interactive</div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#001a43] text-sm mb-2">✅ Portolan SDI</h4>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  Fully OGC-compliant. Passes Rashid with 0 errors. Ready for government, enterprise, and international GIS deployments.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 text-[10px] font-semibold text-emerald-600">Certified</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
