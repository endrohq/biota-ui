import * as process from 'process';

import { Feature } from '@nebula.gl/edit-modes';
import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MapBox } from '@shared/components/map';

import { ROUTE_CREATE_FOREST } from '@shared/utils/route';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ForestItem } from './ForestItem';

import { useForests } from '../../../hooks/useForests';

const tokenId = process.env.NEXT_PUBLIC_FOREST_TOKEN_ID || '';

export function ForestsPage() {
  const [locations, setLocations] = useState<Feature[]>([]);
  const { forests, loading } = useForests(tokenId);

  useEffect(() => {
    setLocations(forests.map(forest => forest.properties.location).flat());
  }, [forests]);

  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-4/12 flex-col space-y-10 rounded bg-white p-20">
        <div className="flex items-center justify-between">
          <div className="font-bold">Forests</div>
          <Link href={ROUTE_CREATE_FOREST}>
            <Button>Add Forest</Button>
          </Link>
        </div>
        {loading ? (
          <LoadingOutlined />
        ) : (
          forests.map(forest => (
            <ForestItem
              forest={forest}
              registerLocation={location => {
                setLocations(prev => [...prev, ...location]);
              }}
            />
          ))
        )}
      </div>
      <div className="flex h-full w-8/12 p-4">
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
