import { IpfsProposal, OnChainProposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useStorage } from '../../../hooks/useStorage';

interface ProposalProps {
  proposal: OnChainProposal;
}

export function ProposalItem({ proposal }: ProposalProps) {
  const { getIpfsProposal } = useStorage();
  const [ipfsProposal, setIpfsProposal] = useState<IpfsProposal>();

  useEffect(() => {
    async function handleIpfsFetch() {
      const ipfsProposal = await getIpfsProposal(proposal.cid);
      setIpfsProposal(ipfsProposal);
    }
    handleIpfsFetch();
  }, []);

  return (
    <Link
      href={getProposalItemRoute(proposal.id)}
      className="flex-wrap rounded bg-gray-100 px-4 py-3 transition-all duration-200 ease-in-out hover:bg-gray-200"
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
