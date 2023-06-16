import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';

import { getProposalItemRoute } from '@shared/utils/route';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface CreateModalProps {
  id: string;
}

export function SuccessfulCreate({ id }: CreateModalProps) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(getProposalItemRoute(id));
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      <CheckCircleOutlined className="text-2xl text-green-600" />
      <div>Success! You'll be redirected to the details page</div>
    </div>
  );
}
