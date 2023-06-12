import {Proposal} from "@shared/typings";
import Link from "next/link";
import {getProposalItemRoute} from "@shared/utils/route";

interface ProposalProps {
  proposal: Proposal;
}

export function ProposalItem ({ proposal }: ProposalProps) {
  return (
    <Link href={getProposalItemRoute(proposal.id)} className="px-4 py-2 bg-gray-100 rounded">{proposal.title}</Link>
  );
}
