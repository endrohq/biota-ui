import { WarningOutlined } from '@shared/components/icons/WarningOutlined';

interface CreateModalProps {
  error: Error | unknown;
  close: () => void;
}

export function ErrorMessage({ error, close }: CreateModalProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <WarningOutlined className="text-2xl text-green-600" />
      <div className="text-gray-600">
        Error: <span onClick={close}>Close</span>
      </div>
      <div>{JSON.stringify(error, null, 2)}</div>
    </div>
  );
}
