import { Proposal } from '@shared/typings';
import { useMemo } from 'react';

import { useContractRead } from 'wagmi';

import { abi } from '../config/contracts/abi';
import { proposalContractAddress } from '../env';

type UseProposalProps = {
  proposal?: Proposal | undefined;
  loading: boolean;
};

export function useProposal(id: string): UseProposalProps {
  const { data, isLoading } = useContractRead({
    address: proposalContractAddress,
    abi,
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
      abstainVotes: Number(props.abstainVotes),
      againstVotes: Number(props.againstVotes),
      forVotes: Number(props.forVotes),
    } as Proposal;
  }

  return useMemo(() => {
    return { loading: isLoading, proposal: convertToProposal(data) };
  }, [data, isLoading]);
}
