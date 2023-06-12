import { Proposal } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import Link from 'next/link';

interface ProposalProps {
  proposal: Proposal;
}

export function ProposalItem({ proposal }: ProposalProps) {
  return (
    <Link
      href={getProposalItemRoute(proposal.id)}
      className="rounded bg-gray-100 px-4 py-2"
    >
      {proposal.title}
    </Link>
  );
}
