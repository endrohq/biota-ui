import { OnChainProposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import Link from 'next/link';

interface ProposalProps {
  proposal: OnChainProposal;
}

export function ProposalItem({ proposal }: ProposalProps) {
  return (
    <Link
      href={getProposalItemRoute(proposal.fileId)}
      className="flex-wrap rounded bg-gray-100 px-4 py-3 transition-all duration-200 ease-in-out hover:bg-gray-200"
    >
      {Object.keys(proposal).map(key => (
        <div className="mb-2 break-all border-b border-gray-200 pb-2 text-sm last:mb-0 last:border-0 last:pb-0">
          <div className="font-medium">{key}</div>
          <div className="text-gray-600">{proposal[key]}</div>
        </div>
      ))}
    </Link>
  );
}
