import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX || '';

const DEFAULT_VIEWPORT = {
  longitude: 4.4775362,
  latitude: 51.0258761,
  zoom: 10,
};

export function PositionMap() {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [mode, _] = useState(new DrawPolygonMode());

  return (
    <div className="h-[350px] w-full rounded">
      <MapGL
        height="100%"
        width="100%"
        className="overflow-hidden rounded"
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport: any) => setViewport(viewport)}
      >
        <Editor
          // to make the lines/vertices easier to interact with
          clickRadius={12}
          mode={mode}
          selectable={false}
          onSelect={_ => {}}
        />
      </MapGL>
    </div>
  );
}
