"use client";

import { ScrollAnimation } from "@/components/scroll-animation";
import { Database, Layers, Monitor, Sparkles, Users, Compass, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Database,
    title: "Spatial Data Engineering",
    tagline: "Raw data to clean, indexed, production-ready layers.",
    bullets: [
      "ETL pipelines for any geospatial format (GeoJSON, Shapefile, GDB, PostGIS, GeoParquet)",
      "Schema design, spatial indexing, and coordinate system management",
      "Automated quality control, topology validation, and metadata enrichment",
      "Large-scale data processing with DuckDB Spatial and Apache Arrow",
    ],
    badge: "Data Infrastructure",
  },
  {
    icon: Layers,
    title: "Vector Tile Infrastructure",
    tagline: "End-to-end tile pipelines, CDN-ready and open-standard.",
    bullets: [
      "End-to-end tile pipeline design: PMTiles, MBTiles, XYZ, WMTS",
      "Tile CDN setup, cache optimisation, and multi-platform serving",
      "TileJSON endpoints compatible with QGIS, ArcGIS Pro, and MapLibre",
      "STAC catalog generation and open data publishing",
    ],
    badge: "Tile Delivery",
  },
  {
    icon: Monitor,
    title: "Web GIS Development",
    tagline: "Custom mapping apps and spatial dashboards, built to ship.",
    bullets: [
      "Custom MapLibre GL and Mapbox GL JS mapping applications",
      "Interactive spatial dashboards with real-time data streaming",
      "QGIS / ArcGIS Pro plugin and workflow integration",
      "Serverless spatial API design (Next.js, Vercel, AWS Lambda)",
    ],
    badge: "Engineering",
  },
  {
    icon: Sparkles,
    title: "GeoAI & Spatial Analytics",
    tagline: "Natural language querying, AI styling, and intelligent insights.",
    bullets: [
      "Natural language querying of geospatial datasets via LLM integration",
      "Automated map styling, choropleth classification, and AI descriptions",
      "Spatial pattern detection, clustering, and anomaly reporting",
      "AI-powered feature extraction from satellite and aerial imagery",
    ],
    badge: "AI-Powered",
  },
  {
    icon: Users,
    title: "GIS Unit Establishment",
    tagline: "Build your GIS team and infrastructure from the ground up.",
    bullets: [
      "End-to-end setup of GIS teams, workflows, and data infrastructure",
      "Platform selection, licensing, and standards framework definition",
      "Staff training on cloud-native and AI-assisted GIS practices",
      "Documented SOPs and handover to internal teams",
    ],
    badge: "Capacity Building",
  },
  {
    icon: Compass,
    title: "Consulting & Advisory",
    tagline: "Strategy, standards, and sector-specific GIS delivery.",
    bullets: [
      "Geospatial architecture review and modernisation roadmap",
      "Data standards compliance: OGC, STAC, PMTiles, GeoParquet",
      "Energy and utility sector spatial data strategy",
      "Risk mapping, basemap production, and sector-specific GIS delivery",
    ],
    badge: "Strategy",
  },
];

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">

        {/* ── Header ── */}
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Geospatial &amp; Software Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            What used to take weeks —<br className="hidden md:block" /> we deliver in days.
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto font-sans leading-relaxed">
            From raw data pipelines to AI-powered analytics and full GIS unit establishment — Geosolvix delivers end-to-end geospatial engineering across six service areas.
          </p>
        </ScrollAnimation>

        {/* ── Service cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <ScrollAnimation key={svc.title} delay={0.1 + i * 0.05}>
                <div className="h-full p-7 bg-white rounded-2xl border border-[#EAECF0] hover:border-[#006ff0]/40 hover:shadow-lg hover:shadow-[#006ff0]/5 transition-all flex flex-col">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#006ff0]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#001a43] text-sm leading-snug">{svc.title}</h3>
                      <p className="text-[11px] text-[#006ff0] font-semibold mt-0.5">{svc.tagline}</p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 flex-1">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#475467] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Badge */}
                  <div className="mt-5 pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      {svc.badge}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <ScrollAnimation delay={0.2}>
          <div className="relative bg-[#001a43] rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#006ff0]/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#3b82f6]/8 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-extrabold text-[#6ea8ff] uppercase tracking-widest mb-3">
                Ready to work together?
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 font-[family-name:var(--font-hanken)]">
                Let&apos;s Build Something Smarter.
              </h2>
              <p className="text-sm text-[#aec6ff] max-w-xl mx-auto mb-8 leading-relaxed">
                Reach out to schedule a live demo — we can have your first dataset on a map within minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/demo")}
                  className="px-8 py-3.5 rounded-xl bg-[#006ff0] hover:bg-[#0057c0] text-white font-bold text-sm shadow-lg shadow-[#006ff0]/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="mailto:info@geosolvix.com"
                  className="px-8 py-3.5 rounded-xl border border-[#2b5ba3] text-[#aec6ff] hover:bg-white/10 hover:text-white font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Contact Us
                </a>
              </div>
            </div>
          </div>
        </ScrollAnimation>

      </div>
    </div>
  );
}
