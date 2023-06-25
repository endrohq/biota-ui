import { Container } from '@shared/components/container';

import { CreateForestPage } from '../../components/screens/createForest';

export default function Page() {
  return (
    <Container withWidth={false} withTopPadding={false}>
      <CreateForestPage />
    </Container>
  );
}
