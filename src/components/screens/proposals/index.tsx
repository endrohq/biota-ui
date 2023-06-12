import {ProposalItem} from "./_ProposalItem";
import {Proposal} from "@shared/typings";

const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Proposal 1',
  },
  {
    id: '2',
    title: 'Proposal 2',
  },
  {
    id: '3',
    title: 'Proposal 3',
  },
  {
    id: '4',
    title: 'Proposal 4'
  }
]


export function  Proposals () {
  return (
    <div className="space-y-10">
      <h1>Proposals</h1>
      <div className="grid grid-cols-4 gap-4">
        {proposals.map((proposal, index) => (
          <ProposalItem proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
