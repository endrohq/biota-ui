import { Button } from '@shared/components/button';
import { H5 } from '@shared/components/typography/Title';
import { VoteTypes } from '@shared/typings';
import { useState } from 'react';

interface ProposalItemPageProps {
  vote: (vote: VoteTypes) => void;
}

export function CastYourVote({ vote }: ProposalItemPageProps) {
  const [voteType, setVoteType] = useState<VoteTypes>();
  return (
    <div className="rounded border border-gray-100 ">
      <div className="border-b border-gray-100 px-4 py-2">
        <H5>Cast your vote</H5>
      </div>
      <div className="space-y-2 p-6">
        {Object.keys(VoteTypes).map(key => (
          <Button
            onClick={() => setVoteType(VoteTypes[key])}
            className="px-10 py-1"
            fullSize
            variant={voteType === VoteTypes[key] ? 'black' : 'default'}
          >
            {key}
          </Button>
        ))}
        <div className="!mt-4 border-t border-gray-100 pt-4">
          <Button
            variant={voteType ? 'primary' : 'default'}
            onClick={() => vote(voteType)}
            className="px-10 py-1"
            fullSize
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
}
