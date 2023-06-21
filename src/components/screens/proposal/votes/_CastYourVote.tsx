import { Button } from '@shared/components/button';
import { VoteTypes } from '@shared/typings';
import { useState } from 'react';

interface CastYourVoteProps {
  vote: (vote: VoteTypes) => void;
}

export function CastYourVote({ vote }: CastYourVoteProps) {
  const [active, setActive] = useState<boolean>(false);
  const [voteType, setVoteType] = useState<VoteTypes>();

  if (!active) {
    return (
      <Button
        onClick={() => setActive(true)}
        variant="primary"
        className="px-28 py-1.5"
      >
        Vote
      </Button>
    );
  }
  return (
    <div className="rounded border-b border-gray-100 bg-white">
      <div className="border-b border-gray-100 px-4 py-2">
        <div className="font-medium">Cast your vote</div>
      </div>
      <div className="space-y-2 p-6">
        {Object.keys(VoteTypes).map(key => (
          <Button
            key={key}
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
            onClick={() => voteType && vote(voteType)}
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
