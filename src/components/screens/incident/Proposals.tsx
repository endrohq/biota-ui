import { VoteTypes } from '@shared/typings';

import { CastYourVote } from './_CastYourVote';
import { Results } from './_Results';

export function Proposals() {
  function vote(_: VoteTypes) {
    /* // TODO: Check if user has required courses
    const hasOpenCourses = proposal.requiredCourseIds?.length > 0;
    if (hasOpenCourses) {
      setRequiredCourses(proposal.requiredCourseIds || []);
    }*/
  }

  return (
    <div>
      <h5>Proposals</h5>
      <Results />
      <CastYourVote vote={vote} />
    </div>
  );
}
