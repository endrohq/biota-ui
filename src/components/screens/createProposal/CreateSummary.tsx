import { Button } from '@shared/components/button';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H4 } from '@shared/components/typography/Title';
import { CreateProposalForm } from '@shared/typings';
import React from 'react';

interface CreateSummaryProps {
  proposal: CreateProposalForm;
  createIncident: () => void;
}

export function CreateSummary({
  proposal,
  createIncident,
}: CreateSummaryProps) {
  return (
    <div className="mx-auto w-6/12 rounded border border-gray-100 bg-gray-50 p-6">
      <MapBox positions={proposal.forest?.properties.location} height={200} />
      <div className="py-6">
        <H4>{proposal?.title}</H4>
        <Paragraph className="text-sm text-gray-800">
          {proposal?.description}
        </Paragraph>
      </div>
      <div className="mt-6 flex justify-end space-y-1 border-t border-gray-100 pt-6">
        <Button
          fullSize
          onClick={() => createIncident()}
          className="px-6 py-2"
          variant="primary"
        >
          Create Proposal
        </Button>
      </div>
    </div>
  );
}
