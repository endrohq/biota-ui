import { OnChainProposal } from '@shared/typings';
import { useMemo, useState } from 'react';

import { useContractRead } from 'wagmi';

import { proposalContract } from '../config/contracts/proposals';

type useIncidentsProps = {
  proposals: OnChainProposal[];
  loading: boolean;
};

export function useProposals(): useIncidentsProps {
  const [proposals, setProposals] = useState<OnChainProposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useContractRead({
    address: proposalContract.address,
    abi: proposalContract.abi,
    functionName: 'getProposalsByForestTokenIdAndPage',
    args: [0],
    onSuccess: (data: any) => {
      setProposals(
        data?.map((incident: Record<string, any>) => ({
          id: incident.id,
          cid: incident.cid,
          author: incident.author,
          abstainVotes: Number(incident.abstainVotes),
          againstVotes: Number(incident.againstVotes),
          forVotes: Number(incident.forVotes),
        })),
      );
      setLoading(false);
    },
    onError: (error: any) => {
      console.error(error);
      setLoading(false);
    },
  });

  return useMemo(() => ({ loading, proposals }), [loading, proposals]);
}
