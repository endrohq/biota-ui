import { Forest } from '@shared/typings';

interface ForestItemProps {
  forest: Forest;
  setActive: () => void;
}

export function ForestItem({ forest, setActive }: ForestItemProps) {
  return (
    <div
      onClick={() => setActive()}
      className="bg-transition flex w-full cursor-pointer items-center space-x-8 rounded bg-gray-50/75 p-4 hover:bg-green-50"
    >
      <img src={forest.image} className="h-16 w-16 rounded-lg" />
      <div>
        <div className="font-semibold">{forest?.name}</div>
        <div className="text-sm text-gray-500">{forest?.description}</div>
      </div>
    </div>
  );
}
