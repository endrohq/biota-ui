import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { H1 } from '@shared/components/typography/Title';

import { isArrayWithElements } from '@shared/utils/array.utils';
import { ROUTE_CREATE_PROPOSAL } from '@shared/utils/route';
import Link from 'next/link';

import { ProposalItem } from './_ProposalItem';

import { useProposals } from '../../../hooks/useProposals';

export function ProposalsPage() {
  const { proposals, loading } = useProposals();

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
          {loading ? (
            <div className="flex rounded bg-gray-100 px-6 py-3">
              <LoadingOutlined />
            </div>
          ) : !isArrayWithElements(proposals) ? (
            <div className="flex rounded bg-gray-100 px-6 py-3">
              <div className="text-gray-500">No proposals found..</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {proposals.map((proposal, idx) => (
                <ProposalItem key={idx} proposal={proposal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
