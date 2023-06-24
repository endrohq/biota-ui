import { Button } from '@shared/components/button';
import { Paragraph } from '@shared/components/typography/Paragraph';
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
      <div className="flex flex-col space-y-16 ">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <H1 className="!text-3xl font-black">Proposals</H1>
            <Paragraph className="w-7/12 text-sm text-gray-700">
              Forests get reshaped countless times. Yet in most cases, the
              destruction or adaptation of local fauna and floras happens
              without the consent of local communities.
            </Paragraph>
          </div>
          <Link href={ROUTE_CREATE_PROPOSAL}>
            <Button variant="primary" className="px-3 py-1">
              New Proposal
            </Button>
          </Link>
        </div>
        <div className="space-y-10">
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {Array(6)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="h-[300px] w-full animate-pulse rounded bg-gray-200"
                  />
                ))}
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
