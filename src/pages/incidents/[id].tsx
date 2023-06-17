import { Container } from '@shared/components/container';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';

import { useRouter } from 'next/router';

import { IncidentItemPage } from '../../components/screens/incident';
import { useIncident } from '../../hooks/useIncident';

export default function Page() {
  const { query } = useRouter();
  const { incident, loading } = useIncident(query.id as string);
  return (
    <Container access="public">
      {loading ? (
        <LoadingOutlined />
      ) : (
        incident && <IncidentItemPage incident={incident} />
      )}
    </Container>
  );
}
