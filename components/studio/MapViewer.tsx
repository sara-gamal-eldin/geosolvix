"use client";

import React, { useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapStore } from '@/lib/store/mapStore';

// We use Carto's open source basemap style for MapLibre
const BASEMAP_URL = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export default function MapViewer() {
  const { viewState, setViewState, layers: storeLayers } = useMapStore();

  const layers = useMemo(() => {
    return storeLayers
      .filter((layer) => layer.visible)
      .map((layer) => {
        if (layer.type === 'path') {
          return new PathLayer({
            id: layer.id,
            data: layer.dataUrl,
            pickable: true,
            widthScale: 20,
            widthMinPixels: 2,
            getPath: (d: any) => d.path,
            getColor: layer.color,
            getWidth: (d: any) => 5,
          });
        }
        if (layer.type === 'scatterplot') {
          return new ScatterplotLayer({
            id: layer.id,
            data: layer.dataUrl,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale: 6,
            radiusMinPixels: 3,
            radiusMaxPixels: 100,
            lineWidthMinPixels: 1,
            getPosition: (d: any) => d.coordinates,
            getFillColor: layer.color,
            getLineColor: [255, 255, 255],
          });
        }
        return null;
      })
      .filter(Boolean);
  }, [storeLayers]);

  return (
    <div className="relative w-full h-full bg-[#0e111a]">
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        controller={true}
        layers={layers}
      >
        <Map
          mapStyle={BASEMAP_URL}
          reuseMaps
        />
      </DeckGL>
    </div>
  );
}
