import { Proposal } from '@shared/typings';
import { useMemo, useState } from 'react';

import { useContractRead } from 'wagmi';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposal: Proposal | undefined;
  loading: boolean;
};

export function useProposal(id: string): UseProposalProps {
  const [proposal, setProposal] = useState<Proposal>();
  const [loading, setLoading] = useState<boolean>(true);

  useContractRead({
    address: proposalContractAddress,
    abi,
    functionName: 'getProposalById',
    args: [id],
    onSuccess: (data: any) => {
      setProposal({
        id: data.id,
        cid: data.cid,
        author: data.author,
        abstainVotes: Number(data.abstainVotes),
        againstVotes: Number(data.againstVotes),
        forVotes: Number(data.forVotes),
      } as any);
      setLoading(false);
    },
    onError: (error: any) => {
      console.error(error);
      setLoading(false);
    },
  });

  return useMemo(() => ({ loading, proposal }), [loading, proposal]);
}
