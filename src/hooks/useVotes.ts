import { useMemo } from 'react';

import { useContractRead } from 'wagmi';

import { proposalContract } from '../config/contracts/proposals';

type UseIncidentsProps = {
  votes?: any[];
  loading: boolean;
};

export function useVotes(proposalId: string): UseIncidentsProps {
  const { data, isLoading } = useContractRead({
    address: proposalContract.address,
    abi: proposalContract.abi,
    functionName: 'getVotersForProposal',
    args: [proposalId],
  });

  return useMemo(() => {
    return { loading: isLoading, votes: data as any[] };
  }, [data, isLoading]);
}
