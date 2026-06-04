"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useMapStore } from "@/lib/store/mapStore";
import MapViewer from "@/components/studio/MapViewer";
import { Layers, Activity, AlertTriangle, ShieldCheck, Database } from "lucide-react";

export default function StudioPage() {
  const params = useParams();
  const industry = params.industry as string; // 'gas', 'electric', 'water'
  const { layers, toggleLayer } = useMapStore();

  // Determine demo title based on URL param
  const industryTitle = industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : "Demo";

  return (
    <div className="flex h-screen pt-16 bg-[#0e111a] overflow-hidden">
      
      {/* Left Sidebar Control Panel */}
      <div className="w-80 bg-[#151a24] border-r border-gray-800 flex flex-col z-10 shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Live Demo Environment</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{industryTitle} Network</h1>
          <p className="text-sm text-gray-400">Sample Topology Analysis</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Topology Status */}
          <div className="bg-[#1c2230] p-4 rounded-xl border border-gray-700/50">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-400" />
              MigrationBrain Status
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#151a24] p-3 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Total Assets</div>
                <div className="text-lg font-bold text-white">42,891</div>
              </div>
              <div className="bg-[#151a24] p-3 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Topology Errors</div>
                <div className="text-lg font-bold text-red-400 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  14
                </div>
              </div>
            </div>
          </div>

          {/* Layer Controls */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center px-2">
              <Layers className="w-4 h-4 mr-2" />
              Map Layers
            </h3>
            <div className="space-y-2">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    layer.visible 
                      ? "bg-blue-500/10 border-blue-500/30" 
                      : "bg-[#1c2230] border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: `rgb(${layer.color[0]}, ${layer.color[1]}, ${layer.color[2]})` }} 
                    />
                    <span className={`text-sm font-medium ${layer.visible ? "text-blue-100" : "text-gray-400"}`}>
                      {layer.name}
                    </span>
                  </div>
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${layer.visible ? "bg-blue-500" : "bg-gray-700"}`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform ${layer.visible ? "translate-x-4" : ""}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
        
        {/* Footer Database Connection Mock */}
        <div className="p-4 border-t border-gray-800 bg-[#11141c]">
          <div className="flex items-center text-xs text-green-500 font-mono">
            <Database className="w-3 h-3 mr-2" />
            Connected: demo_postgis_node_01
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapViewer />
        
        {/* Overlay Tools */}
        <div className="absolute bottom-6 right-6 z-10 flex space-x-4">
          <div className="bg-[#151a24] text-white px-4 py-2 rounded-lg border border-gray-800 shadow-xl text-sm font-medium hover:bg-[#1c2230] cursor-pointer transition-colors">
            Run Topology Check
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-blue-500/20 shadow-xl text-sm font-bold hover:bg-blue-500 cursor-pointer transition-colors">
            Export Report
          </div>
        </div>
      </div>
    </div>
  );
}
