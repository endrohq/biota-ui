import { Vote } from '@shared/typings';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import { useUser } from './useUser';

import { proposalContract } from '../config/contracts/proposals';

type UseIncidentsProps = {
  votes?: Vote[];
  loading: boolean;
};

export function useVotes(proposalId?: string): UseIncidentsProps {
  const { signer } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [votes, setVotes] = useState<Vote[]>([]);
  useEffect(() => {
    getProposalVotes();
  }, []);

  async function getProposalVotes() {
    if (!proposalId) return;

    // Create a new contract instance with the Contract constructor
    const contract = new ethers.Contract(
      proposalContract.address,
      proposalContract.abi,
      signer,
    );
    const data = await contract.getVotersForProposal(proposalId);
    setVotes(
      data?.map((v: any) => ({
        voter: v.voter,
        choice: v.choice,
      })),
    );
    setLoading(false);
  }

  return useMemo(() => {
    return { loading, votes };
  }, [votes, loading]);
}
