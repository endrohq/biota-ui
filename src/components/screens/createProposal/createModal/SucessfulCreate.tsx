import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';

import { CreateProposalForm } from '@shared/typings';
import { getProposalItemRoute } from '@shared/utils/route';
import center from '@turf/center';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useHederaNotifications } from '../../../../context/HederaNotificationProvider';

interface CreateModalProps {
  id: string;
  proposal: CreateProposalForm;
}

export function SuccessfulCreate({ id, proposal }: CreateModalProps) {
  const router = useRouter();
  const { submitMessage } = useHederaNotifications();

  useEffect(() => {
    handleSuccess();
  }, []);

  async function handleSuccess() {
    const route = getProposalItemRoute(id);
    const centroid = center(proposal.forest?.properties.location?.[0] as any);

    await submitMessage({
      type: 'PROPOSAL_CREATED',
      location: centroid.geometry.coordinates as any,
      name: proposal.forest?.name || '',
      route,
    });
    setTimeout(() => {
      router.push(route);
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <CheckCircleOutlined className="text-2xl text-green-600" />
      <div>Success! You'll be redirected to the details page</div>
    </div>
  );
}
