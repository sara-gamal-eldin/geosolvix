"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { BookOpen, PlayCircle, ExternalLink } from "lucide-react";
import { gisBlogs } from "@/lib/data";

const categories = [
  { id: "all",        label: "All Resources" },
  { id: "scout",      label: "Scout Platform" },
  { id: "cloudnative",label: "Cloud-Native GIS" },
  { id: "geoai",      label: "GeoAI & Analytics" },
  { id: "webgis",     label: "Web GIS" },
];

const categoryColors: Record<string, string> = {
  scout:       "bg-violet-100 text-violet-800",
  cloudnative: "bg-blue-100 text-blue-800",
  geoai:       "bg-amber-100 text-amber-800",
  webgis:      "bg-emerald-100 text-emerald-800",
};

const videos = [
  {
    type: "r2" as const,
    src: "https://pub-bb20ce11def241fda9bd57de004f9be3.r2.dev/scout-demo-video.mp4",
    badge: "Scout Demo",
    badgeColor: "bg-violet-100 text-violet-800",
    title: "Scout — Geospatial Pipeline Demo",
    description: "Watch Scout ingest a geospatial dataset, generate PMTiles and a STAC catalog, run AI SQL queries, and publish to Cloudflare R2 — end to end.",
  },
  {
    type: "link" as const,
    badge: "DuckDB Tutorial",
    badgeColor: "bg-blue-100 text-blue-800",
    title: "DuckDB Spatial: In-Memory Geospatial Analytics",
    description: "A deep-dive into DuckDB Spatial's vectorised geometry engine, GeoParquet support, and how it powers cloud-native GIS pipelines.",
    href: "https://www.youtube.com/results?search_query=DuckDB+Spatial+geospatial+tutorial",
    duration: "~15 min",
  },
  {
    type: "link" as const,
    badge: "PMTiles & MapLibre",
    badgeColor: "bg-emerald-100 text-emerald-800",
    title: "PMTiles + MapLibre GL: Serverless Tile Serving",
    description: "How to serve vector tiles from a single PMTiles file on Cloudflare R2 using MapLibre GL JS — no tile server required.",
    href: "https://www.youtube.com/results?search_query=PMTiles+MapLibre+GL+tutorial",
    duration: "~20 min",
  },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"blogs" | "videos">("blogs");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedBlogId, setSelectedBlogId] = useState("blog-scout-01");

  const filteredBlogs = categoryFilter === "all"
    ? gisBlogs
    : gisBlogs.filter((b) => b.category === categoryFilter);

  const activeBlog = gisBlogs.find((b) => b.id === selectedBlogId) ?? filteredBlogs[0];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">

        {/* Header */}
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Geosolvix Resource Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            Articles & Video Guides
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto">
            Technical articles and video walkthroughs covering Scout, cloud-native GIS engineering, GeoAI, and open geospatial standards.
          </p>
        </ScrollAnimation>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#faf9ff] p-1.5 rounded-xl border border-[#EAECF0] flex gap-2">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "blogs" ? "bg-[#001a43] text-white shadow" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Articles
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "videos" ? "bg-[#001a43] text-white shadow" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <PlayCircle className="w-4 h-4" /> Videos
            </button>
          </div>
        </div>

        {/* ── ARTICLES TAB ── */}
        {activeTab === "blogs" ? (
          <div className="space-y-6">

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAECF0]">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoryFilter(cat.id);
                      const matched = gisBlogs.find((b) => cat.id === "all" || b.category === cat.id);
                      if (matched) setSelectedBlogId(matched.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? "bg-[#001a43] text-white shadow-sm"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-400">
                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Article list */}
              <div className="lg:col-span-5 flex flex-col gap-4 max-h-[720px] overflow-y-auto pr-2">
                {filteredBlogs.map((blog) => {
                  const isActive = activeBlog?.id === blog.id;
                  return (
                    <div
                      key={blog.id}
                      onClick={() => setSelectedBlogId(blog.id)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-50/50 border-[#006ff0] ring-1 ring-[#006ff0]/10 shadow-sm"
                          : "bg-[#faf9ff] border-[#EAECF0] hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${categoryColors[blog.category] ?? "bg-gray-100 text-gray-700"}`}>
                            {blog.categoryLabel}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{blog.duration}</span>
                        </div>
                        <h3 className={`text-sm font-bold leading-snug mb-2 ${isActive ? "text-[#006ff0]" : "text-[#001a43]"}`}>
                          {blog.title}
                        </h3>
                        <p className="text-xs text-[#475467] line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 border-t border-dashed border-[#EAECF0] pt-3 text-[10px] text-gray-500">
                        <span className="font-semibold">{blog.author}</span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Article detail */}
              <div className="lg:col-span-7 bg-[#faf9ff] rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-sm flex flex-col">
                {activeBlog ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pb-4 border-b border-[#EAECF0]">
                      <span className="text-[#006ff0]">{activeBlog.categoryLabel}</span>
                      <span className="text-gray-300">•</span>
                      <span>By {activeBlog.author}</span>
                      <span className="text-gray-300">•</span>
                      <span>{activeBlog.date}</span>
                      <span className="text-gray-300">•</span>
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">{activeBlog.duration}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-extrabold text-[#001a43] leading-snug text-left">
                      {activeBlog.title}
                    </h2>

                    {/* External link button */}
                    {"url" in activeBlog && activeBlog.url && (
                      <a
                        href={activeBlog.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001a43] hover:bg-[#006ff0] text-white font-bold text-xs transition-all w-fit"
                      >
                        Read Full Article <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

<div className="text-xs md:text-sm text-[#344054] leading-relaxed bg-blue-50/50 border-l-4 border-[#006ff0] p-4 rounded-r-xl text-left">
                      {activeBlog.intro}
                    </div>

                    <div className="space-y-6 text-left">
                      {activeBlog.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-sm font-extrabold text-[#001a43]">{section.title}</h3>
                          <p className="text-xs md:text-sm text-[#475467] leading-relaxed">{section.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#EAECF0] text-left">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Summary</h4>
                      <p className="text-xs md:text-sm text-[#475467] leading-relaxed italic bg-emerald-50/50 p-4 border border-emerald-100 rounded-xl">
                        {activeBlog.conclusion}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
                    <p className="text-sm font-bold text-gray-500">Select an article from the left to start reading.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        ) : (
          /* ── VIDEOS TAB ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v, i) => (
              <ScrollAnimation key={i} delay={0.1 + i * 0.1} className="bg-[#faf9ff] rounded-2xl border border-[#EAECF0] overflow-hidden flex flex-col hover:shadow-lg transition-all">

                {/* Thumbnail / player */}
                {v.type === "r2" ? (
                  <div className="aspect-video bg-[#001a43] relative overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="aspect-video relative bg-slate-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-80" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 text-center z-0 px-4">{v.title}</div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${v.badgeColor}`}>{v.badge}</span>
                    {"duration" in v && <span className="text-[10px] text-gray-400 font-bold">{v.duration}</span>}
                  </div>
                  <h3 className="text-base font-bold text-[#001a43] leading-snug mb-2">{v.title}</h3>
                  <p className="text-xs text-[#475467] leading-relaxed flex-1">{v.description}</p>
                </div>

                {"href" in v && v.href && (
                  <div className="px-6 pb-6">
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center block py-2.5 rounded-lg bg-[#001a43] text-white font-bold text-xs hover:bg-[#006ff0] transition-colors"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </ScrollAnimation>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
