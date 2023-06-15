import { Container } from '@shared/components/container';

import { ProposalsPage } from '../components/screens/proposals';

export default function LandingPage() {
  return (
    <Container>
      <section className="w-full">
        <div className="flex flex-col space-y-6">
          <ProposalsPage />
        </div>
      </section>
    </Container>
  );
}
