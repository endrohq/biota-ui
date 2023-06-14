import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { BackLink } from '@shared/components/link/BackLink';
import { H1 } from '@shared/components/typography/Title';

import { Proposal, VoteTypes } from '@shared/typings';
import { ROUTE_PROPOSALS } from '@shared/utils/route';
import { getShortenedFormat } from '@shared/utils/string.utils';
import { useState } from 'react';

import { CastYourVote } from './_CastYourVote';
import { Description } from './_Description';
import { Results } from './_Results';
import { RequiredCourses } from './RequiredCourses';

interface ProposalItemPageProps {
  proposal: Proposal;
}

export function ProposalItemPage({ proposal }: ProposalItemPageProps) {
  const [requiredCourses, setRequiredCourses] = useState<string[]>();

  function vote(_: VoteTypes) {
    // TODO: Check if user has required courses
    const hasOpenCourses = proposal.requiredCourseIds?.length > 0;
    if (hasOpenCourses) {
      setRequiredCourses(proposal.requiredCourseIds || []);
    }
  }

  return (
    <>
      <div className="mx-auto flex w-3/4 items-start justify-between space-x-20">
        <div className="w-8/12 space-y-10">
          <div className="">
            <BackLink href={ROUTE_PROPOSALS} />
            <H1 weight="black" className="!text-3xl">
              {proposal?.title || '-'}
            </H1>
            <div className="my-3 space-y-1 rounded border border-gray-100 bg-gray-50 px-4 py-2 text-sm">
              <div>Author</div>
              <div className="flex items-center space-x-2">
                <EthAddressIcon address={proposal.author} />
                <div className="font-medium text-gray-600">
                  {getShortenedFormat(proposal.author)}
                </div>
              </div>
            </div>
            <Description description={proposal?.description || '-'} />
          </div>
          <CastYourVote vote={vote} />
        </div>
        <div className="w-4/12">
          <Results />
        </div>
      </div>
      {requiredCourses && (
        <RequiredCourses
          close={() => setRequiredCourses(undefined)}
          requiredCourseIds={requiredCourses}
        />
      )}
    </>
  );
}
