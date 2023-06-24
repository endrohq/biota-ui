import { VoteType } from '@shared/typings';

interface ResultItemProps {
  vote: VoteType;
  votes: number;
  totalVotes: number;
}

export function ResultItem({ vote, totalVotes, votes = 0 }: ResultItemProps) {
  const percentage = (votes / totalVotes) * 100;
  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-sm">
        <div className=" capitalize">
          {vote === VoteType.FOR
            ? 'For'
            : vote === VoteType.AGAINST
            ? 'Against'
            : 'Abstain'}
        </div>
        <div>{percentage}%</div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full rounded-full bg-green-500"
        />
      </div>
    </div>
  );
}
