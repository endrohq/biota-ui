import { Container } from '@shared/components/container';

import { ForestsPage } from '../components/screens/forests';

export default function Page() {
  return (
    <Container access="private">
      <ForestsPage />
    </Container>
  );
}
