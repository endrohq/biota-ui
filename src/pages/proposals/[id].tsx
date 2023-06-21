import { Container } from '@shared/components/container';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { useRouter } from 'next/router';

import { ProposalItemPage } from '../../components/screens/proposal';
import { useProposal } from '../../hooks/useProposal';

export default function Page() {
  const { query } = useRouter();
  const { incident, loading } = useProposal(query.id as string);
  return (
    <Container withWidth={false} withTopPadding={false} access="public">
      {loading ? (
        <LoadingOutlined />
      ) : (
        incident && <ProposalItemPage proposal={incident} />
      )}
    </Container>
  );
}
