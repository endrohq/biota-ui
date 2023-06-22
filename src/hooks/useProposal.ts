import { OnChainProposal } from '@shared/typings';
import { useMemo } from 'react';

import { useContractRead } from 'wagmi';

import { proposalContract } from '../config/contracts/proposals';

type UseIncidentsProps = {
  proposal?: OnChainProposal | undefined;
  loading: boolean;
};

export function useProposal(id: string): UseIncidentsProps {
  const { data, isLoading } = useContractRead({
    address: proposalContract.address,
    abi: proposalContract.abi,
    functionName: 'getProposalById',
    args: [id],
  });

  function convertToProposal(data: unknown) {
    if (!data) return undefined;
    const props = data as Record<string, any>;
    return {
      id: props.id,
      cid: props.cid,
      author: props.author,
      forestTokenId: props.forestTokenId,
      abstainVotes: Number(props.abstainVotes),
      againstVotes: Number(props.againstVotes),
      forVotes: Number(props.forVotes),
    } as OnChainProposal;
  }

  return useMemo(() => {
    return { loading: isLoading, proposal: convertToProposal(data) };
  }, [data, isLoading]);
}
