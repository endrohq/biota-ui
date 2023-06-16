import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function DrawOnMap() {
  const map = useMap();

  useEffect(() => {
    const drawControl = new control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, event => {
      const { layerType, layer } = event;
      if (layerType === 'polygon') {
        const coordinates = layer.getLatLngs();
        // Save coordinates
      }
    });
  }, [map]);

  return null;
}
