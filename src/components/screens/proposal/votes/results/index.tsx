import { Vote, VoteType } from '@shared/typings';

import { ResultItem } from './_ResultItem';

interface ResultsProps {
  votes: Vote[];
}

export function Results({ votes }: ResultsProps) {
  const votesAsObject = votes.reduce((acc, vote) => {
    acc[vote.choice] = acc[vote.choice] + 1 || 1;
    return acc;
  }, {} as Record<VoteType, number>);

  return (
    <div className="rounded border border-gray-100 bg-gray-50">
      <div className="flex items-center space-x-4 p-4">
        <ResultItem
          totalVotes={votes.length}
          votes={votesAsObject[VoteType.FOR]}
          vote={VoteType.FOR}
        />
        <ResultItem
          totalVotes={votes.length}
          votes={votesAsObject[VoteType.AGAINST]}
          vote={VoteType.AGAINST}
        />
        <ResultItem
          totalVotes={votes.length}
          votes={votesAsObject[VoteType.ABSTAIN]}
          vote={VoteType.ABSTAIN}
        />
      </div>
    </div>
  );
}
