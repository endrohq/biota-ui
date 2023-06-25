import { Container } from '@shared/components/container';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { ForestsPage } from '../../components/screens/forests';
import { useForests } from '../../hooks/useForests';

export default function Page() {
  const tokenId = process.env.NEXT_PUBLIC_FOREST_TOKEN_ID || '';
  const { forests, loading } = useForests(tokenId);
  return (
    <Container withWidth={false} withTopPadding={false}>
      {loading ? <LoadingOutlined /> : <ForestsPage forests={forests} />}
    </Container>
  );
}
