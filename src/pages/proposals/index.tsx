import { Container } from '@shared/components/container';
import { H1 } from '@shared/components/typography/Title';

import { Proposals } from '../../components/screens/proposals';

export default function ProposalsPage() {
  return (
    <Container>
      <section className="w-full py-20">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-6 ">
            <H1 className="!text-3xl font-black">Proposals</H1>
            <Proposals />
          </div>
        </div>
      </section>
    </Container>
  );
}
