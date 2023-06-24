import { Button } from '@shared/components/button';
import { Modal } from '@shared/components/modal';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { useState } from 'react';

import { CastYourVote } from './_CastYourVote';

import { Results } from './results';

import { useVotes } from '../../../../hooks/useVotes';

interface CastYourVoteProps {
  proposalId?: string;
  start: Date;
  end: Date;
}

export function ProposalVote({ proposalId, start, end }: CastYourVoteProps) {
  const [active, setActive] = useState<boolean>(false);
  const { votes } = useVotes(proposalId);

  return (
    <div className="rounded bg-white">
      <div className="space-y-6">
        <div>
          <div className="text-sm font-medium">Share your opinion</div>
          <Paragraph className="w-5/12 text-sm text-gray-600">
            Showcasing the opinions of local communities should be an important
            part on the discussion table.
          </Paragraph>
          <div className="my-4 flex items-center space-x-4 text-sm">
            <div>
              Start: <span className="font-bold">{start.toDateString()}</span>
            </div>
            <div>
              End: <span className="font-bold">{end.toDateString()}</span>
            </div>
          </div>
          <div>{votes && <Results votes={votes} />}</div>
          {JSON.stringify(votes)}
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
