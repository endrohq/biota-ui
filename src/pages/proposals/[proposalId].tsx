import { Container } from '@shared/components/container';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { ProposalItemPage } from '../../components/screens/proposal';
import { useProposal } from '../../hooks/useProposal';

export default function Page() {
  const { proposal, loading } = useProposal();
  return (
    <Container>
      {loading ? <LoadingOutlined /> : <ProposalItemPage proposal={proposal} />}
    </Container>
  );
}
