import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface CreateModalProps {
  route: string;
}

export function SuccessfulCreate({ route }: CreateModalProps) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(route);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      <CheckCircleOutlined className="text-2xl text-green-600" />
      <div>Success! You'll be redirected to the details page</div>
    </div>
  );
}
