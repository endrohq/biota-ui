import { Container } from '@shared/components/container';

import { CreateIncident } from '../../components/screens/createIncident';

export default function Page() {
  return (
    <Container withWidth={false} withTopPadding={false} access="private">
      <CreateIncident />
    </Container>
  );
}
