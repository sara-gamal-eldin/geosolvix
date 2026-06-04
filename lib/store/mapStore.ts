import { create } from 'zustand';

export type MapLayer = {
  id: string;
  name: string;
  type: 'geojson' | 'hexagon' | 'scatterplot' | 'path';
  visible: boolean;
  color: [number, number, number];
  dataUrl?: string; // We will use this to point to our demo datasets
};

interface MapState {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  };
  layers: MapLayer[];
  setViewState: (viewState: any) => void;
  toggleLayer: (id: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  viewState: {
    longitude: -122.4,
    latitude: 37.74,
    zoom: 11,
    pitch: 30,
    bearing: 0,
  },
  layers: [
    {
      id: 'gas-network',
      name: 'Gas Pipelines',
      type: 'path',
      visible: true,
      color: [255, 65, 54],
      dataUrl: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-lines.json' // Temporary demo data
    },
    {
      id: 'gas-stations',
      name: 'Regulator Stations',
      type: 'scatterplot',
      visible: true,
      color: [255, 133, 27],
      dataUrl: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json' // Temporary demo data
    }
  ],
  setViewState: (viewState) => set({ viewState }),
  toggleLayer: (id) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ),
    })),
}));
