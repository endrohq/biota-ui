import { OnChainProposal } from '@shared/typings';
import { useMemo, useState } from 'react';

import { useContractRead } from 'wagmi';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposals: OnChainProposal[];
  loading: boolean;
};

export function useProposals(): UseProposalProps {
  const [proposals, setProposals] = useState<OnChainProposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useContractRead({
    address: proposalContractAddress,
    abi,
    functionName: 'getProposalsPage',
    args: [0],
    onSuccess: (data: any) => {
      setProposals(
        data?.map((proposal: Record<string, any>) => ({
          id: proposal.id,
          cid: proposal.cid,
          author: proposal.author,
          abstainVotes: Number(proposal.abstainVotes),
          againstVotes: Number(proposal.againstVotes),
          forVotes: Number(proposal.forVotes),
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
