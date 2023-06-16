import { Feature } from '@nebula.gl/edit-modes';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import React from 'react';

interface PositionMapProps {
  onChange: (features: Feature[]) => void;
  positions?: Feature[];
}

export function CreateProposalMap({ onChange, positions }: PositionMapProps) {
  return (
    <div className="w-full space-y-2 rounded border bg-gray-50 p-4">
      <div className="">
        <div>Location</div>
        <Paragraph className="text-sm text-gray-700">
          Pinpoint the location where the incident is happening
        </Paragraph>
      </div>
      <MapBox mode="editable" onChange={onChange} positions={positions} />
    </div>
  );
}
