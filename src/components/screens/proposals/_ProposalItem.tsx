import { MapBox } from '@shared/components/map';
import { Proposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import { utils } from 'ethers';
import Link from 'next/link';

import { useForest } from '../../../hooks/useForest';

interface IncidentItemProps {
  proposal: Proposal;
}

export function ProposalItem({ proposal }: IncidentItemProps) {
  const { forest } = useForest(proposal?.forestTokenId);

  const shortedDescription =
    proposal?.description?.length > 100
      ? `${proposal?.description?.substring(0, 100)}...`
      : proposal?.description;
  return (
    <Link
      href={getProposalItemRoute(utils.parseBytes32String(proposal.id))}
      className="bg-transition flex-wrap rounded bg-gray-100 hover:bg-gray-200"
    >
      <div className="overflow-hidden rounded-t">
        <MapBox
          theme="dark"
          positions={forest?.properties.location}
          height={150}
          rounded={false}
        />
      </div>
      <div className="px-4 py-10">
        <div className="mb-2 break-all border-b border-gray-200 pb-2 last:mb-0 last:border-0 last:pb-0">
          <div className="font-medium capitalize">{proposal?.title || '-'}</div>
          <div className="text-xs text-gray-500">{shortedDescription}</div>
        </div>
      </div>
    </Link>
  );
}
