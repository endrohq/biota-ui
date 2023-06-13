import { Button } from '@shared/components/button';
import { Container } from '@shared/components/container';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { Proposal } from '@shared/typings';
import { useState } from 'react';

import { RequiredCourses } from './RequiredCourses';

interface ProposalItemPageProps {
  proposal: Proposal;
}

export function ProposalItemPage({ proposal }: ProposalItemPageProps) {
  const [requiredCourses, setRequiredCourses] = useState<string[]>();

  function vote(_: 'yes' | 'no') {
    // TODO: Check if user has required courses
    const hasOpenCourses = proposal.requiredCourseIds?.length > 0;
    if (hasOpenCourses) {
      setRequiredCourses(proposal.requiredCourseIds || []);
    }
  }

  return (
    <Container>
      <section className="w-full">
        <div className="flex flex-col space-y-3">
          <H1 className="!text-3xl font-black">{proposal?.title || '-'}</H1>
          <Paragraph className="w-1/2">
            {proposal?.description || '-'}
          </Paragraph>
          <div className="!mt-20 space-x-4">
            <Button
              onClick={() => vote('yes')}
              className="px-10 py-1"
              variant="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => vote('no')}
              className="px-10 py-1"
              variant="black"
            >
              No
            </Button>
          </div>
        </div>
      </section>
      {requiredCourses && (
        <RequiredCourses
          close={() => setRequiredCourses(undefined)}
          requiredCourseIds={requiredCourses}
        />
      )}
    </Container>
  );
}
