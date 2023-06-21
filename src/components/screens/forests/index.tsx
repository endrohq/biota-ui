import { MapBox } from '@shared/components/map';

export function ForestsPage() {
  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-4/12 flex-col space-y-10 rounded bg-gray-50 p-20">
        Forests
      </div>
      <div className="flex h-full w-8/12">
        <MapBox
          theme="dark"
          positions={[]}
          height="100%"
          rounded={false}
          mode="read-only"
        />
      </div>
    </div>
  );
}
