import { IpfsProposal, OnChainProposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useStorage } from '../../../hooks/useStorage';

interface ProposalProps {
  proposal: OnChainProposal;
}

export function ProposalItem({ proposal }: ProposalProps) {
  const { getJsonFile } = useStorage();
  const [ipfsProposal, setIpfsProposal] = useState<IpfsProposal>();

  useEffect(() => {
    if (proposal.cid) {
      getJsonFile(proposal.cid, 'metadata').then(res => {
        setIpfsProposal(res);
      });
    }
  }, [proposal?.cid]);

  return (
    <Link
      href={getProposalItemRoute(proposal.id)}
      className="bg-transition flex-wrap rounded bg-gray-100 px-4 py-3 hover:bg-gray-200"
    >
      <div className="mb-2 break-all border-b border-gray-200 pb-2 text-sm last:mb-0 last:border-0 last:pb-0">
        <div className="font-medium">{ipfsProposal?.title || '-'}</div>
      </div>
      <div className="mb-2 break-all border-b border-gray-200 pb-2 text-sm last:mb-0 last:border-0 last:pb-0">
        <div className="font-medium">{ipfsProposal?.description || '-'}</div>
      </div>
    </Link>
  );
}
