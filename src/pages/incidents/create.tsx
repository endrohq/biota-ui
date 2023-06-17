import { Container } from '@shared/components/container';

import { CreateIncident } from '../../components/screens/createIncident';

export default function Page() {
  return (
    <Container access="private">
      <CreateIncident />
    </Container>
  );
}
