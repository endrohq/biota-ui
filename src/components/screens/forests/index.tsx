import { Button } from '@shared/components/button';
import { MapBox } from '@shared/components/map';

import { H4 } from '@shared/components/typography/Title';
import { Forest } from '@shared/typings';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { ROUTE_CREATE_FOREST } from '@shared/utils/route';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ActiveForest } from './ActiveForest';
import { ForestItem } from './ForestItem';

interface ForestsPageProps {
  forests: Forest[];
}

export function ForestsPage({ forests }: ForestsPageProps) {
  const [activeForest, setActiveForest] = useState<Forest>();

  const locations = useMemo(() => {
    return (
      activeForest?.properties?.location ??
      forests.map(forest => forest.properties.location).flat()
    );
  }, [forests, activeForest]);

  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-4/12 flex-col space-y-3 rounded bg-white p-10">
        {activeForest ? (
          <ActiveForest
            forest={activeForest}
            remove={() => setActiveForest(undefined)}
          />
        ) : isArrayWithElements(forests) ? (
          <>
            <div className="flex items-center justify-between">
              <H4 className="font-bold">Forests</H4>
              <Link href={ROUTE_CREATE_FOREST}>
                <Button>Add Forest</Button>
              </Link>
            </div>
            {forests.map(forest => (
              <ForestItem
                forest={forest}
                setActive={() => setActiveForest(forest)}
              />
            ))}
          </>
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
