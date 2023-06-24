import { ROUTE_PROPOSALS } from '@shared/utils/route';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTE_PROPOSALS);
  }, []);
  return <></>;
}
