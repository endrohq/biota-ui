import { Container } from '@shared/components/container';

import { IncidentsPage } from '../components/screens/incidents';

export default function LandingPage() {
  return (
    <Container>
      <section className="w-full">
        <div className="flex flex-col space-y-6">
          <IncidentsPage />
        </div>
      </section>
    </Container>
  );
}
