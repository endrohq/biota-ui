import { ArrowLeftOutlined } from '@shared/components/icons/ArrowLeftOutlined';

interface BackLinkProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackLinkProps) {
  return (
    <div
      className="mb-2 flex cursor-pointer items-center space-x-1 text-gray-500 transition-all duration-500 hover:text-gray-900"
      onClick={onClick}
    >
      <ArrowLeftOutlined />
      <span>Back</span>
    </div>
  );
}
