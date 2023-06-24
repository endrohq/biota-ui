import { H5 } from '@shared/components/typography/Title';
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
  console.log(votesAsObject);
  return (
    <div className="rounded border border-gray-100 bg-gray-50">
      <div className="border-b border-gray-100 px-4 py-2">
        <H5>Results</H5>
      </div>
      <div className="space-y-3 p-6">
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
