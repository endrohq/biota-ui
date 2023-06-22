import { Feature } from '@nebula.gl/edit-modes';
import { isArrayWithElements } from '@shared/utils/array.utils';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX || '';

type ViewPort = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const DEFAULT_VIEWPORT: ViewPort = {
  longitude: 4.4775362,
  latitude: 51.0258761,
  zoom: 12,
};

// Define your themes
const darkThemeLine = {
  'line-width': 1,
  'line-color': 'rgba(0, 255, 0, 0.75)',
  'line-dasharray': [3, 3],
};
const darkThemeFill = {
  'fill-color': 'rgba(0, 255, 0, 0.05)',
};

interface PositionMapProps {
  onChange?: (features: Feature[]) => void;
  positions?: Feature[];
  height?: number | '100%';
  mode?: 'read-only' | 'editable';
  theme?: 'light' | 'dark';
  rounded?: boolean;
}

export function MapBox({
  onChange,
  positions = [],
  height = 375,
  mode = 'read-only',
  theme = 'dark',
  rounded = true,
}: PositionMapProps) {
  const [viewport, setViewport] = useState<ViewPort>();
  const [editorMode, setEditorMode] = useState<DrawPolygonMode | undefined>();

  useEffect(() => {
    if (mode === 'editable') {
      setEditorMode(new DrawPolygonMode());
      setViewport(DEFAULT_VIEWPORT);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'read-only' && positions) {
      const [
        longitude = DEFAULT_VIEWPORT.longitude,
        latitude = DEFAULT_VIEWPORT.latitude,
      ] = getGeographicalMidpoint(positions);

      setViewport({
        ...DEFAULT_VIEWPORT,
        longitude,
        latitude,
      });
    }
  }, [positions, mode]);

  const _onUpdate = ({ data }: any) => {
    onChange?.(data);
  };

  function getGeographicalMidpoint(features: Feature[]) {
    if (!isArrayWithElements(features)) return [];
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;
    let total = 0;

    const feature = features[0];

    for (const polygon of feature.geometry.coordinates) {
      for (const point of polygon as number[]) {
        const latitude = (point[1] * Math.PI) / 180;
        const longitude = (point[0] * Math.PI) / 180;

        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);

        total += 1;
      }
    }

    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    return [
      (centralLongitude * 180) / Math.PI,
      (centralLatitude * 180) / Math.PI,
    ];
  }

  return (
    <div style={{ height }} className="w-full">
      {!viewport ? (
        <div>Loading...</div>
      ) : (
        <MapGL
          height="100%"
          width="100%"
          className={clsx(rounded && `rounded`)}
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${theme}-v11`}
          onViewportChange={setViewport}
        >
          {mode === 'editable' && (
            <Editor
              clickRadius={13}
              mode={editorMode}
              selectable={mode === 'editable'}
              features={positions || []}
              onUpdate={_onUpdate}
            />
          )}
          {mode === 'read-only' &&
            positions?.map((position, index) => (
              <Source
                key={index}
                id={`source-${index}`}
                type="geojson"
                // @ts-ignore
                data={position}
              >
                <Layer paint={darkThemeLine} id={`line-${index}`} type="line" />
                <Layer
                  paint={darkThemeFill}
                  id={`polygon-${index}`}
                  type="fill"
                />
              </Source>
            ))}
        </MapGL>
      )}
    </div>
  );
}
