import { Container } from '@shared/components/container';

import { CreateProposalPage } from '../../components/screens/createProposal';

export default function Page() {
  return (
    <Container withWidth={false} withTopPadding={false}>
      <CreateProposalPage />
    </Container>
  );
}
