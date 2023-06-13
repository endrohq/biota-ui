import { Container } from '@shared/components/container';
import { H1 } from '@shared/components/typography/Title';

import { ProposalsPage } from '../components/screens/proposals';

export default function LandingPage() {
  return (
    <Container>
      <section className="w-full">
        <div className="flex flex-col space-y-6">
          <H1 className="!text-5xl font-black">Hello world</H1>
          <ProposalsPage />
        </div>
      </section>
    </Container>
  );
}
