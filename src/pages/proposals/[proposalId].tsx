import { Button } from '@shared/components/button';
import { Container } from '@shared/components/container';
import { Modal } from '@shared/components/modal';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { Proposal } from '@shared/typings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { proposals } from '../../config/proposals';

export default function ProposalItemPage() {
  const { query } = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLocked, _] = useState<boolean>(true);
  const [viewContent, setViewContent] = useState<boolean>(true);

  useEffect(() => {
    if (query.proposalId) {
      const proposal = proposals.find(
        proposal => proposal.id === query.proposalId,
      );
      if (proposal) {
        setProposal(proposal);
      }
    }
  }, [query.proposalId]);

  function vote(_: 'yes' | 'no') {
    if (isLocked) {
      setViewContent(true);
    }
  }

  return (
    <Container>
      <section className="w-full py-10 lg:py-20">
        <div className="container mx-auto">
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
        </div>
      </section>
      {viewContent && (
        <Modal close={() => setViewContent(false)} open={viewContent}>
          <div>sdfs</div>
        </Modal>
      )}
    </Container>
  );
}
