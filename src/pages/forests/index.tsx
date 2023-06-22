import { Container } from '@shared/components/container';

import { ForestsPage } from '../../components/screens/forests';

export default function Page() {
  return (
    <Container withWidth={false} withTopPadding={false} access="public">
      <ForestsPage />
    </Container>
  );
}
