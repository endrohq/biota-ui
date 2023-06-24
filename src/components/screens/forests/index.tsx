import { Button } from '@shared/components/button';
import { MapBox } from '@shared/components/map';

import { Paragraph } from '@shared/components/typography/Paragraph';
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
      <div className="flex h-full w-4/12 flex-col space-y-3 overflow-y-scroll rounded bg-white p-10">
        {activeForest ? (
          <ActiveForest
            forest={activeForest}
            remove={() => setActiveForest(undefined)}
          />
        ) : isArrayWithElements(forests) ? (
          <>
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <H4 className="font-bold">Forests</H4>
                <Paragraph className="w-10/12 text-sm text-gray-600">
                  An active directory of existing forests around the world.
                  Users with administrator's rights can add new forests to the
                  directory.
                </Paragraph>
              </div>
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
          zoom={activeForest && 14}
        />
      </div>
    </div>
  );
}
