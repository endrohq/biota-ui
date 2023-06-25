import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { LocationOutlined } from '@shared/components/icons/LocationOutlined';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { Forest } from '@shared/typings';
import React, { useMemo } from 'react';

import { ForestItem } from './ForestItem';

import { useForests } from '../../../../hooks/useForests';

interface LocationFormProps {
  save(props: Forest): void;
}

const tokenId = process.env.NEXT_PUBLIC_FOREST_TOKEN_ID || '';

export function LocationForm({ save }: LocationFormProps) {
  const { forests, loading } = useForests(tokenId);
  const [selectedForest, setSelectedForest] = React.useState<Forest>();

  const locations = useMemo(() => {
    return selectedForest?.properties.location
      ? selectedForest?.properties.location
      : forests.map(forest => forest.properties.location).flat();
  }, [selectedForest, forests]);

  function handleSelect(forest?: Forest) {
    if (forest?.cid === selectedForest?.cid) {
      setSelectedForest(undefined);
    } else {
      setSelectedForest(forest);
    }
  }

  return (
    <div className="flex w-full justify-between space-x-10">
      <div className="w-4/12">
        <MapBox mode="read-only" height={850} positions={locations} />
      </div>
      <div className=" mt-10 w-7/12 ">
        <div className="mx-auto w-10/12 space-y-4">
          <div className="">
            <div className="flex items-start space-x-6">
              <div className="rounded bg-green-50 px-1.5 py-1">
                <LocationOutlined className="text-xl text-green-900" />
              </div>
              <div>
                <div className="font-bold">Location</div>
                <Paragraph className="text-sm text-gray-700">
                  What is the location of your forest?
                </Paragraph>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            {loading ? (
              <LoadingOutlined />
            ) : (
              forests.map((forest, key) => (
                <ForestItem
                  forest={forest}
                  key={key}
                  selectedForest={selectedForest}
                  handleSelect={handleSelect}
                />
              ))
            )}
          </div>
          <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
            <Button
              disabled={!selectedForest}
              onClick={() => selectedForest && save(selectedForest)}
              className="px-6 py-2"
              variant="primary"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
