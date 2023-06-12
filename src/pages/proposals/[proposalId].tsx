import { Proposal } from '@shared/typings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ProposalItemPage } from '../../components/screens/proposal';
import { proposals } from '../../config/proposals';

export default function Page() {
  const { query } = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (query.proposalId) {
      const proposal = proposals.find(
        proposal => proposal.id === query.proposalId,
      );
      if (proposal) {
        setProposal(proposal);
      }
    }
  }, [query.proposalId]);

  return <ProposalItemPage proposal={proposal} />;
}
