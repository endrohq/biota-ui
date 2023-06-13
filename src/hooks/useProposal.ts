import { Proposal } from '@shared/typings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { proposals } from '../config/proposals';

type UseProposalProps = {
  proposal: Proposal;
  loading: boolean;
};

export function useProposal(): UseProposalProps {
  const { query } = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (query.proposalId) {
      const proposal = proposals.find(
        proposal => proposal.id === query.proposalId,
      );
      if (proposal) {
        setProposal(proposal);
        setLoading(false);
      }
    }
  }, [query.proposalId]);

  return { proposal, loading };
}
