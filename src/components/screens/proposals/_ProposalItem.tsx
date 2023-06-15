import { getProposalItemRoute } from '@shared/utils/route';
import Link from 'next/link';

import { useProposal } from '../../../hooks/useProposal';

interface ProposalProps {
  proposalId: string;
}

export function ProposalItem({ proposalId }: ProposalProps) {
  const { proposal } = useProposal(proposalId);

  return (
    <Link
      href={getProposalItemRoute(proposalId)}
      className="rounded bg-gray-100 px-4 py-2"
    >
      {JSON.stringify(proposal)}
    </Link>
  );
}
