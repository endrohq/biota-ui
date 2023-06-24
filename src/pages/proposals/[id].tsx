import { Container } from '@shared/components/container';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ProposalItemPage = dynamic(
  () => import('../../components/screens/proposal'),
  { ssr: false },
);

const ProposalProvider = dynamic(
  () => import('../../context/ProposalProvider'),
  { ssr: false },
);

export default function Page() {
  const { query } = useRouter();
  return (
    <Container withWidth={false} withTopPadding={false} access="public">
      {!query?.id || query?.id?.length === 0 ? (
        <LoadingOutlined />
      ) : (
        <ProposalProvider proposalId={query.id as string}>
          <ProposalItemPage />
        </ProposalProvider>
      )}
    </Container>
  );
}
