import { Feature } from '@nebula.gl/edit-modes';
import { Forest } from '@shared/typings';

interface ForestItemProps {
  forest: Forest;
  registerLocation: (location: Feature[]) => void;
}

export function ForestItem({ forest }: ForestItemProps) {
  return (
    <div className="w-full border-b border-gray-100 bg-white py-4">
      <div>{forest?.name}</div>
      <div className="text-sm text-gray-500">{forest?.description}</div>
    </div>
  );
}
