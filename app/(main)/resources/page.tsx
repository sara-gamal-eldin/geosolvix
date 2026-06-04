"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/scroll-animation";
import { BookOpen, PlayCircle } from "lucide-react";
import { gisBlogs } from "@/lib/data";

export default function ResourcesPage() {
  const [resourcesActiveTab, setResourcesActiveTab] = useState<"blogs" | "videos">("blogs");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("all");
  const [selectedBlogId, setSelectedBlogId] = useState("1");

  const filteredBlogs =
    blogCategoryFilter === "all"
      ? gisBlogs
      : gisBlogs.filter((b) => b.category === blogCategoryFilter);
      
  const activeBlog = gisBlogs.find((b) => b.id === selectedBlogId);

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-20">
        <ScrollAnimation delay={0.1} className="text-center mb-16">
          <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Educational Center
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-[family-name:var(--font-hanken)] text-[#001a43] mt-5 mb-4">
            GIS Blogs & Educational Video Guides
          </h1>
          <p className="text-base text-[#475467] max-w-2xl mx-auto">
            Access top spatial developer guidelines and video walk-throughs aggregated from public GIS frameworks and cloud database libraries.
          </p>
        </ScrollAnimation>
        
        <div className="flex justify-center mb-12">
          <div className="bg-[#faf9ff] p-1.5 rounded-xl border border-[#EAECF0] flex gap-2 font-semibold text-sm">
            <button
              onClick={() => setResourcesActiveTab("blogs")}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                resourcesActiveTab === "blogs"
                  ? "bg-[#001a43] text-white shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              GIS Blogs & Articles
            </button>
            <button
              onClick={() => setResourcesActiveTab("videos")}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                resourcesActiveTab === "videos"
                  ? "bg-[#001a43] text-white shadow"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Public GIS Videos
            </button>
          </div>
        </div>
        
        {resourcesActiveTab === "blogs" ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAECF0]">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All Tech Publications" },
                  { id: "esri", label: "Esri Tech Stack" },
                  { id: "opensource", label: "Open Source GIS" },
                  { id: "cloudnative", label: "Cloud Native Geospatial" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setBlogCategoryFilter(cat.id);
                      const matched = gisBlogs.find((b) => cat.id === "all" || b.category === cat.id);
                      if (matched) setSelectedBlogId(matched.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                      blogCategoryFilter === cat.id
                        ? "bg-[#001a43] text-white shadow-sm"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-400">
                Showing {filteredBlogs.length} educational papers
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 flex flex-col gap-4 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredBlogs.map((blog) => {
                  const isActive = activeBlog && activeBlog.id === blog.id;
                  return (
                    <div
                      key={blog.id}
                      onClick={() => setSelectedBlogId(blog.id)}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-50/50 border-[#006ff0] ring-1 ring-[#006ff0]/10 shadow-sm"
                          : "bg-[#faf9ff] border-[#EAECF0] hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              blog.category === "esri"
                                ? "bg-blue-100 text-blue-800"
                                : blog.category === "opensource"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-indigo-100 text-indigo-800"
                            }`}
                          >
                            {blog.categoryLabel}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                            {blog.duration}
                          </span>
                        </div>
                        <h3
                          className={`text-sm md:text-base font-bold leading-snug mb-2 ${
                            isActive ? "text-[#006ff0]" : "text-[#001a43]"
                          }`}
                        >
                          {blog.title}
                        </h3>
                        <p className="text-xs text-[#475467] line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 border-t border-dashed border-[#EAECF0] pt-3 text-[10px] text-gray-500">
                        <span className="font-semibold">{blog.author}</span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-7 bg-[#faf9ff] rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-sm flex flex-col">
                {activeBlog ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 font-semibold pb-4 border-b border-[#EAECF0]">
                      <span className="text-[#006ff0]">{activeBlog.categoryLabel}</span>
                      <span className="text-gray-300">•</span>
                      <span>By {activeBlog.author}</span>
                      <span className="text-gray-300">•</span>
                      <span>{activeBlog.date}</span>
                      <span className="text-gray-300">•</span>
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {activeBlog.duration}
                      </span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-extrabold text-[#001a43] leading-snug mb-4 text-left">
                      {activeBlog.title}
                    </h1>

                    <div className="rounded-xl overflow-hidden aspect-[21/9] bg-gradient-to-r from-blue-900 to-indigo-950 p-6 flex flex-col justify-end text-white relative mb-6">
                      <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-0" />
                      {activeBlog.headerImage && (
                        <img
                          src={activeBlog.headerImage}
                          alt={activeBlog.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#001a43] bg-white px-2.5 py-1 rounded-md z-10 w-fit mb-2 shadow">
                        GIS EDUCATION ARTICLE
                      </span>
                      <p className="text-xs text-gray-200 max-w-lg z-10 font-medium italic text-left">
                        &quot;{activeBlog.excerpt}&quot;
                      </p>
                    </div>

                    <div className="text-xs md:text-sm text-[#344054] leading-relaxed mb-6 font-medium bg-blue-50/50 border-l-4 border-[#006ff0] p-4 rounded-r-xl text-left">
                      {activeBlog.intro}
                    </div>

                    <div className="space-y-6 text-left">
                      {activeBlog.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h3 className="text-sm md:text-base font-extrabold text-[#001a43]">
                            {section.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#475467] leading-relaxed font-normal">
                            {section.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#EAECF0] text-left">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        SUMMARY & TAKEAWAY
                      </h4>
                      <p className="text-xs md:text-sm text-[#475467] leading-relaxed italic bg-emerald-50/50 p-4 border border-emerald-100 rounded-xl">
                        {activeBlog.conclusion}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mb-4 animate-bounce" />
                    <p className="text-sm font-bold text-gray-500">
                      Select an educational GIS article from the left column to begin reading.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={0.2} className="bg-[#faf9ff] rounded-2xl border border-[#EAECF0] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="aspect-video relative bg-slate-900 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                  <PlayCircle className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-gray-400 text-center z-0">
                  [Public GIS Training Video]
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-blue-100 text-blue-700">
                    YouTube GIS Course
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">12:35 duration</span>
                </div>
                <h3 className="text-base font-bold text-[#001a43] leading-snug mb-2">
                  Intro to Spatial Geometries and Projections
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed">
                  A fundamental training guide explaining standard EPSG code systems, coordinate projections, and bounding circles.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2">
                <a href="https://www.youtube.com/results?search_query=Introduction+to+GIS+Systems+and+Projections" target="_blank" rel="noreferrer" className="w-full text-center block py-2.5 rounded bg-[#001a43] text-white font-bold text-xs hover:bg-[#006ff0] transition-colors">
                  Watch Public Video
                </a>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3} className="bg-[#faf9ff] rounded-2xl border border-[#EAECF0] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="aspect-video relative bg-slate-900 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                  <PlayCircle className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-gray-400 text-center z-0">
                  [Advanced Database Video]
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-purple-100 text-purple-700">
                    Google Cloud Tech
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">18:40 duration</span>
                </div>
                <h3 className="text-base font-bold text-[#001a43] leading-snug mb-2">
                  Executing ST_Distance and ST_Within on BigQuery
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed">
                  Learn how Google Cloud BigQuery organizes multi-million polygon records recursively to speed up geographic matches.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2">
                <a href="https://www.youtube.com/results?search_query=BigQuery+Geospatial+Analysis+ST_Distance" target="_blank" rel="noreferrer" className="w-full text-center block py-2.5 rounded bg-[#001a43] text-white font-bold text-xs hover:bg-[#006ff0] transition-colors">
                  Watch Public Video
                </a>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.4} className="bg-[#faf9ff] rounded-2xl border border-[#EAECF0] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="aspect-video relative bg-slate-900 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                  <PlayCircle className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-gray-400 text-center z-0">
                  [Open Source Standalone GIS]
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-emerald-100 text-emerald-700">
                    OSGeo Tutorial
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">10:15 duration</span>
                </div>
                <h3 className="text-base font-bold text-[#001a43] leading-snug mb-2">
                  What is Cloud-Native GIS? A 10-Minute Guide
                </h3>
                <p className="text-xs text-[#475467] leading-relaxed">
                  An excellent, high-level summary explaining cloud-native rasters, spatial indices, and standalone server connections.
                </p>
              </div>
              <div className="px-6 pb-6 pt-2">
                <a href="https://www.youtube.com/results?search_query=What+is+Cloud+Native+GIS+OSGeo" target="_blank" rel="noreferrer" className="w-full text-center block py-2.5 rounded bg-[#001a43] text-white font-bold text-xs hover:bg-[#006ff0] transition-colors">
                  Watch Public Video
                </a>
              </div>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </div>
  );
}
