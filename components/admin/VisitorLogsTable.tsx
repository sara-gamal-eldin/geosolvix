"use client";

import { useState, useMemo } from "react";
import { VisitorLog } from "@/lib/admin/stats";
import { Search, Filter } from "lucide-react";

type Props = {
  logs: VisitorLog[];
  isLoading: boolean;
};

export default function VisitorLogsTable({ logs, isLoading }: Props) {
  const [search, setSearch] = useState("");
  const [pathFilter, setPathFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Extract unique paths for the dropdown
  const uniquePaths = useMemo(() => {
    const paths = new Set<string>();
    logs.forEach((log) => {
      if (log.pathname) paths.add(log.pathname);
    });
    return Array.from(paths).sort();
  }, [logs]);

  // Filter logs client-side
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = log.userAgent
        ?.toLowerCase()
        .includes(search.toLowerCase());
      
      const matchesPath = pathFilter === "all" || log.pathname === pathFilter;
      
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "new" && log.isNewVisitor) ||
        (typeFilter === "returning" && !log.isNewVisitor);

      return matchesSearch && matchesPath && matchesType;
    });
  }, [logs, search, pathFilter, typeFilter]);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
      
      {/* Table Header & Controls */}
      <div className="p-6 border-b border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Recent Activity (Last 100)</h2>
          <span className="text-xs text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded-full border border-white/5">
            Showing {filteredLogs.length} of {logs.length}
          </span>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search User Agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-white/5 rounded-lg text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Path Filter */}
          <div className="relative">
            <select
              value={pathFilter}
              onChange={(e) => setPathFilter(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 transition appearance-none cursor-pointer"
            >
              <option value="all">All Pages</option>
              {uniquePaths.map((path) => (
                <option key={path} value={path}>
                  {path}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none border-solid border-t-zinc-500 border-t-4 border-x-transparent border-x-4 border-b-0"></div>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-white/5 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 transition appearance-none cursor-pointer"
            >
              <option value="all">All Visitor Types</option>
              <option value="new">New Visitors</option>
              <option value="returning">Returning Visitors</option>
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none border-solid border-t-zinc-500 border-t-4 border-x-transparent border-x-4 border-b-0"></div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-zinc-900/30 text-xs uppercase tracking-wider text-zinc-500">
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium">Path</th>
              <th className="p-4 font-medium">User Agent</th>
              <th className="p-4 font-medium">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-4"><div className="h-4 bg-zinc-800/50 rounded w-24"></div></td>
                  <td className="p-4"><div className="h-4 bg-zinc-800/50 rounded w-32"></div></td>
                  <td className="p-4"><div className="h-4 bg-zinc-800/50 rounded w-48"></div></td>
                  <td className="p-4"><div className="h-4 bg-zinc-800/50 rounded w-16"></div></td>
                </tr>
              ))
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500">
                  No matching activities found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 text-zinc-400 whitespace-nowrap">
                    {log.timestamp ? log.timestamp.toDate().toLocaleString() : "Just now"}
                  </td>
                  <td className="p-4 text-white font-mono text-xs">
                    <span className="px-2 py-1 bg-zinc-950/50 border border-white/5 rounded">
                      {log.pathname}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-500 max-w-xs truncate" title={log.userAgent}>
                    {log.userAgent}
                  </td>
                  <td className="p-4">
                    {log.isNewVisitor ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        New
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                        Returning
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
