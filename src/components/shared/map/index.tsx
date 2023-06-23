import { Feature } from '@nebula.gl/edit-modes';
import { isArrayWithElements } from '@shared/utils/array.utils';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX || '';

type ViewPort = {
  longitude: number;
  latitude: number;
  maxLatitude?: number;
  maxLongitude?: number;
  minLatitude?: number;
  minLongitude?: number;
};

const DEFAULT_VIEWPORT: ViewPort = {
  longitude: 4.4775362,
  latitude: 51.0258761,
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
  }, []);

  useEffect(() => {
    if (mode === 'read-only' && positions) {
      // @ts-ignore
      const collection = featureCollection(positions || []);
      const bounds = bbox(collection);

      if (isArrayWithElements(bounds)) {
        setViewport({
          latitude: (bounds[1] + bounds[3]) / 2 || DEFAULT_VIEWPORT.latitude,
          longitude: (bounds[0] + bounds[2]) / 2 || DEFAULT_VIEWPORT.longitude,
          // Additional properties to fit to bounds
          maxLongitude: bounds[2],
          minLongitude: bounds[0],
          maxLatitude: bounds[3],
          minLatitude: bounds[1],
        });
      }
    }
  }, [positions, mode]);

  const _onUpdate = ({ data }: any) => {
    onChange?.(data);
  };

  return (
    <div style={{ height }} className="w-full">
      {!viewport ? (
        <div>Loading...</div>
      ) : (
        <MapGL
          zoom={11}
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
