import { Feature } from '@nebula.gl/edit-modes';
import { MapBox } from '@shared/components/map';

interface GalleryProps {
  positions: Feature[] | undefined;
}

export function MapOverview({ positions }: GalleryProps) {
  return (
    <div className="-z-10 bg-third brightness-105">
      <MapBox zoom={13} rounded={false} positions={positions} height={250} />
    </div>
  );
}
