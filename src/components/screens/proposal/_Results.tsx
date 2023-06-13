import { H5 } from '@shared/components/typography/Title';
import { VoteTypes } from '@shared/typings';

interface ResultsProps {}

export function Results(_: ResultsProps) {
  function getRandomNumberBetweenZeroAndHundred() {
    return Math.random() * 100;
  }

  return (
    <div className="rounded border border-gray-100 ">
      <div className="border-b border-gray-100 px-4 py-2">
        <H5>Results</H5>
      </div>
      <div className="space-y-3 p-6">
        {Object.keys(VoteTypes).map(key => (
          <div className="space-y-1 py-1">
            <div className="capitalize">{key}</div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                style={{ width: `${getRandomNumberBetweenZeroAndHundred()}%` }}
                className="h-full rounded-full bg-green-500"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
