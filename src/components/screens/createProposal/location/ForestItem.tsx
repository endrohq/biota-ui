import { CheckOutlined } from '@shared/components/icons/CheckOutlined';
import { Forest } from '@shared/typings';
import clsx from 'clsx';
import React from 'react';

interface LocationFormProps {
  forest: Forest;
  handleSelect(forest: Forest): void;
  selectedForest?: Forest;
}

export function ForestItem({
  forest,
  handleSelect,
  selectedForest,
}: LocationFormProps) {
  return (
    <div
      onClick={() => handleSelect(forest)}
      className={clsx(
        'bg-transition flex w-full cursor-pointer justify-between rounded border border-transparent bg-gray-50 px-6 py-4',
        selectedForest?.cid === forest.cid && 'border-green-500 bg-green-50',
        selectedForest?.cid !== forest.cid && 'hover:bg-gray-100',
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="text-sm">{forest.name}</div>
      </div>
      <div
        className={clsx(
          'flex h-4 w-4 items-center justify-center rounded',
          selectedForest?.cid === forest.cid ? 'bg-green-600' : 'bg-gray-300',
        )}
      >
        {selectedForest?.cid === forest.cid && (
          <CheckOutlined className="text-xs leading-none text-white" />
        )}
      </div>
    </div>
  );
}
