import { Button } from '@shared/components/button';
import { H1 } from '@shared/components/typography/Title';

import { ROUTE_CREATE_PROPOSAL } from '@shared/utils/route';
import Link from 'next/link';

import { ProposalItem } from './_ProposalItem';

import { useProposals } from '../../../hooks/useProposals';

export function ProposalsPage() {
  const { proposalIds } = useProposals();

  return (
    <section className="mx-auto w-3/4">
      <div className="flex flex-col space-y-6 ">
        <div className="flex items-center justify-between">
          <H1 className="!text-3xl font-black">Proposals</H1>
          <Link href={ROUTE_CREATE_PROPOSAL}>
            <Button>New Proposal</Button>
          </Link>
        </div>
        <div className="space-y-10">
          <div className="grid grid-cols-4 gap-4">
            {proposalIds.map(proposalId => (
              <ProposalItem proposalId={proposalId} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
