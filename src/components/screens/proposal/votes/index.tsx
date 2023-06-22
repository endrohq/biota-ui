import { Button } from '@shared/components/button';
import { Modal } from '@shared/components/modal';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { CastYourVote } from './_CastYourVote';

interface CastYourVoteProps {
  proposalId: string;
}

export function ProposalVote({ proposalId }: CastYourVoteProps) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="rounded bg-white p-2">
      <div className="space-y-6 p-4">
        <div>
          <div className="text-sm font-medium">Share your opinion</div>
          <Paragraph className="w-5/12 text-sm text-gray-600">
            Showcasing the opinions of local communities should be an important
            part on the discussion table.
          </Paragraph>
        </div>
        <Button
          onClick={() => setActive(true)}
          variant="primary"
          className="px-28 py-1.5"
        >
          Vote
        </Button>
      </div>
      <Modal open={active} close={() => setActive(false)}>
        <CastYourVote
          onSuccess={() => window.location.reload()}
          onError={() => ''}
          proposalId={proposalId}
        />
      </Modal>
    </div>
  );
}
