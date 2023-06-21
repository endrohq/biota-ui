import { Container } from '@shared/components/container';

import { DeployPage } from '../components/screens/deploy';

export default function Page() {
  return (
    <Container access="private">
      <DeployPage />
    </Container>
  );
}
