import { Button } from '@shared/components/button';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H4 } from '@shared/components/typography/Title';
import { CreateIncidentForm } from '@shared/typings';
import React from 'react';

interface CreateSummaryProps {
  incident: CreateIncidentForm;
  createIncident: () => void;
}

export function CreateSummary({
  incident,
  createIncident,
}: CreateSummaryProps) {
  return (
    <div className="w-10/12 rounded border border-gray-100 bg-gray-50 p-6">
      <MapBox positions={incident.location} height={200} />
      <div className="py-6">
        <H4>{incident.proposal?.title}</H4>
        <Paragraph className="text-sm text-gray-800">
          {incident.proposal?.description}
        </Paragraph>
      </div>
      <div className="mt-6 flex justify-end space-y-1 border-t border-gray-100 pt-6">
        <Button
          fullSize
          onClick={() => createIncident()}
          className="px-6 py-2"
          variant="primary"
        >
          Create Incident
        </Button>
      </div>
    </div>
  );
}
