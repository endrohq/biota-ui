import { Feature } from '@nebula.gl/edit-modes';
import { Button } from '@shared/components/button';
import { MapBox } from '@shared/components/map';

import { H4 } from '@shared/components/typography/Title';
import { Forest } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { ROUTE_CREATE_FOREST } from '@shared/utils/route';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ForestItem } from './ForestItem';

interface ForestsPageProps {
  forests: Forest[];
}

export function ForestsPage({ forests }: ForestsPageProps) {
  const [locations, setLocations] = useState<Feature[]>([]);
  const [activeForest, setActiveForest] = useState<string>();

  useEffect(() => {
    setLocations(forests.map(forest => forest.properties.location).flat());
  }, [forests]);

  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-4/12 flex-col space-y-3 rounded bg-white p-10">
        <div className="flex items-center justify-between">
          <H4 className="font-bold">Forests</H4>
          <Link href={ROUTE_CREATE_FOREST}>
            <Button>Add Forest</Button>
          </Link>
        </div>
        {activeForest ? (
          <div>sdfsfs</div>
        ) : isArrayWithElements(forests) ? (
          forests.map(forest => (
            <ForestItem forest={forest} setActive={id => setActiveForest(id)} />
          ))
        ) : (
          <div>No forests founds</div>
        )}
      </div>
      <div className="flex h-full w-8/12">
        <MapBox
          theme="dark"
          positions={locations}
          height="100%"
          rounded={false}
          mode="read-only"
        />
      </div>
    </div>
  );
}
