import { BackButton } from '@shared/components/link/BackButton';
import { H2 } from '@shared/components/typography/Title';
import { Forest } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';
import React from 'react';

interface ActiveForestProps {
  forest: Forest;
  remove: () => void;
}

function TableItem({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 text-sm last:border-0">
      <div className="font-semibold text-gray-500">{label}</div>
      <div className="">{value}</div>
    </div>
  );
}

export function ActiveForest({ forest, remove }: ActiveForestProps) {
  const token = forest?.tokenId?.split('/')[0];
  return (
    <div className="space-y-4 px-10">
      <BackButton onClick={remove} />
      <div className="flex space-x-6">
        <div className="mb-4 w-9/12">
          <img src={forest.image} className="aspect-square w-full rounded-lg" />
        </div>
        <div className="w-2/12 space-y-4">
          <div className="aspect-square rounded bg-gray-200" />
          <div className="aspect-square rounded bg-gray-200" />
          <div className="aspect-square rounded bg-gray-200" />
        </div>
      </div>
      <div className="">
        <H2 className="mb-1 font-bold">{forest?.name}</H2>
        <div className="text-sm text-gray-500">{forest?.description}</div>
        <div className="mt-4">
          <TableItem
            label="TokenId"
            value={
              <a
                className="text-blue-700 underline"
                target="_blank"
                href={`https://hashscan.io/testnet/token/${token}`}
              >
                {forest?.tokenId}
              </a>
            }
          />
          <TableItem
            label="IPFS"
            value={
              <a
                className="text-blue-700 underline"
                target="_blank"
                href={`https://dweb.link/ipfs/${forest?.cid}/metadata.json`}
              >
                {getShortenedFormat(forest?.cid)}
              </a>
            }
          />
          <TableItem label="Creator" value={forest?.creator} />
        </div>
      </div>
    </div>
  );
}
