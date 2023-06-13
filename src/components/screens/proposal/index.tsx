import { Container } from '@shared/components/container';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { Proposal, VoteTypes } from '@shared/typings';
import { useState } from 'react';

import { CastYourVote } from './_CastYourVote';
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
    <Container>
      <div className="flex flex-col space-y-3">
        <H1 className="!text-3xl font-black">{proposal?.title || '-'}</H1>
        <Paragraph className="w-1/2">{proposal?.description || '-'}</Paragraph>
        <CastYourVote vote={vote} />
      </div>
      {requiredCourses && (
        <RequiredCourses
          close={() => setRequiredCourses(undefined)}
          requiredCourseIds={requiredCourses}
        />
      )}
    </Container>
  );
}
