import { ProposalItem } from './_ProposalItem';

import { proposals } from '../../../config/proposals';

export function Proposals() {
  return (
    <div className="space-y-10">
      <h1>Proposals</h1>
      <div className="grid grid-cols-4 gap-4">
        {proposals.map(proposal => (
          <ProposalItem proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
