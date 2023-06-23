import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash, IpfsObjection } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';
import { useState } from 'react';

interface ObjectionItemProps {
  objection: IpfsObjection;
}

export function ObjectionItem({ objection }: ObjectionItemProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const content = expanded
    ? `${objection.content.slice(0, 100)}...`
    : objection.content;
  return (
    <div className="space-y-4 rounded border-b border-gray-100 bg-white p-4 last:border-0">
      <div className=" flex items-center justify-between ">
        <div className="flex items-center space-x-4">
          <EthAddressIcon size="large" address={objection.author as Hash} />
          <div>
            <div className="text-sm font-medium">
              {getShortenedFormat(objection.author)}
            </div>
            <div className="text-xs text-gray-400">
              {new Date().toDateString()}
            </div>
          </div>
        </div>
        <div className="mb-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-500">
          {objection.category}
        </div>
      </div>
      <Paragraph className="text-sm leading-loose text-gray-600">
        {content}
      </Paragraph>
    </div>
  );
}
