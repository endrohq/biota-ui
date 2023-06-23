import { Proposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import { utils } from 'ethers';
import Link from 'next/link';

interface IncidentItemProps {
  proposal: Proposal;
}

export function ProposalItem({ proposal }: IncidentItemProps) {
  return (
    <Link
      href={getProposalItemRoute(utils.parseBytes32String(proposal.id))}
      className="bg-transition flex-wrap rounded bg-gray-100 px-4 py-3 hover:bg-gray-200"
    >
      <div className="mb-2 break-all border-b border-gray-200 pb-2 text-sm last:mb-0 last:border-0 last:pb-0">
        <div className="font-medium">{proposal?.title || '-'}</div>
      </div>
    </Link>
  );
}
