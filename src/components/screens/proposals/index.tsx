import { Button } from '@shared/components/button';
import { H1 } from '@shared/components/typography/Title';

import { ProposalItem } from './_ProposalItem';

import { proposals } from '../../../config/proposals';

export function ProposalsPage() {
  return (
    <section className="w-full">
      <div className="flex flex-col space-y-6 ">
        <div className="flex items-center justify-between">
          <H1 className="!text-3xl font-black">Proposals</H1>
          <Button>New Proposal</Button>
        </div>
        <div className="space-y-10">
          <div className="grid grid-cols-4 gap-4">
            {proposals.map(proposal => (
              <ProposalItem proposal={proposal} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
