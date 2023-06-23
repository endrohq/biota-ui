import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { WriteStatus } from '@shared/typings';

interface UploadStateProps {
  title: string;
  writeStatus: WriteStatus;
}

export function UploadState({ title, writeStatus }: UploadStateProps) {
  return (
    <div className="flex h-full flex-col px-4">
      <div className="mb-3 border-b border-gray-100 pb-4 text-sm font-semibold">
        {title}
      </div>
      <div className="mb-2 flex justify-between">
        <div className="text-sm">Writing to IPFS</div>
        <div className="text-gray-500">
          {writeStatus === 'stale' ? (
            <MinusCircleOutlined />
          ) : writeStatus === 'writeToIpfs' ? (
            <LoadingOutlined />
          ) : (
            (writeStatus === 'writeToHedera' || writeStatus === 'done') && (
              <CheckCircleOutlined className="text-green-500" />
            )
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm">Writing to Hedera</div>
        <div className="text-gray-500">
          {writeStatus === 'stale' || writeStatus === 'writeToIpfs' ? (
            <MinusCircleOutlined />
          ) : writeStatus === 'writeToHedera' ? (
            <LoadingOutlined />
          ) : (
            writeStatus === 'done' && (
              <CheckCircleOutlined className="text-green-500" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
